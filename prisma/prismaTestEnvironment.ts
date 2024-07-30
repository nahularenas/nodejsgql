import NodeEnvironment from 'jest-environment-node'
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment'
import { PrismaClient, Prisma } from '@prisma/client'
import { exec } from 'child_process'

class PrismaTestEnvironment extends NodeEnvironment {
  dbUrl: string
  client: PrismaClient

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)

    this.dbUrl = `mysql://root:admin@localhost:3306/nodegql_test`
    process.env.DATABASE_URL = this.dbUrl
    this.global.process.env.DATABASE_URL = this.dbUrl

    this.client = new PrismaClient()
  }

  async setup() {
    console.log('Setting up the test environment...')

    await this.ensureDatabaseConnection()
    await this.runMigrations()

    return super.setup()
  }

  async teardown() {
    console.log('Tearing down the test environment...')

    // Drop all tables to reset the schema
    const tables = await this.client.$queryRaw<
      Array<{ table_name: string }>
    >(Prisma.sql`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'nodegql_test'
    `)

    if (!tables.length) {
      console.log('No tables found')
      return
    }

    await this.client.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;')

    for (const row of tables) {
      await this.client.$executeRawUnsafe(
        `DROP TABLE IF EXISTS \`${(row as any).TABLE_NAME}\`;`
      )
    }

    await this.client.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;')

    await this.client.$disconnect()
  }

  private async ensureDatabaseConnection(retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.client.$connect()
        console.log('Database connection established')
        return
      } catch (error) {
        console.log(
          `Database connection failed, retrying (${i + 1}/${retries})...`
        )
        console.log(error)
        await new Promise((res) => setTimeout(res, delay))
      }
    }
    throw new Error('Failed to establish a database connection')
  }

  private runMigrations(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec('npx prisma migrate deploy', (error, stdout, stderr) => {
        if (error) {
          console.error(`Migration error: ${error}`)
          reject(error)
          return
        }
        console.log(`Migration stdout: ${stdout}`)
        console.error(`Migration stderr: ${stderr}`)
        resolve()
      })
    })
  }
}

export default PrismaTestEnvironment
