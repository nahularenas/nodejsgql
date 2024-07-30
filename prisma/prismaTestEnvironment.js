"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
class PrismaTestEnvironment extends jest_environment_node_1.default {
    constructor(config, context) {
        super(config, context);
        this.dbUrl = `mysql://root:admin@localhost:3306/nodegql_test`;
        process.env.DATABASE_URL = this.dbUrl;
        this.global.process.env.DATABASE_URL = this.dbUrl;
        this.client = new client_1.PrismaClient();
    }
    setup() {
        const _super = Object.create(null, {
            setup: { get: () => super.setup }
        });
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Setting up the test environment...');
            yield this.ensureDatabaseConnection();
            yield this.runMigrations();
            return _super.setup.call(this);
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Tearing down the test environment...');
            // Drop all tables to reset the schema
            const tables = yield this.client.$queryRaw(client_1.Prisma.sql `
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'nodegql_test'
    `);
            if (!tables.length) {
                console.log('No tables found');
                return;
            }
            yield this.client.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
            for (const row of tables) {
                yield this.client.$executeRawUnsafe(`DROP TABLE IF EXISTS \`${row.TABLE_NAME}\`;`);
            }
            yield this.client.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
            yield this.client.$disconnect();
        });
    }
    ensureDatabaseConnection() {
        return __awaiter(this, arguments, void 0, function* (retries = 5, delay = 2000) {
            for (let i = 0; i < retries; i++) {
                try {
                    yield this.client.$connect();
                    console.log('Database connection established');
                    return;
                }
                catch (error) {
                    console.log(`Database connection failed, retrying (${i + 1}/${retries})...`);
                    console.log(error);
                    yield new Promise((res) => setTimeout(res, delay));
                }
            }
            throw new Error('Failed to establish a database connection');
        });
    }
    runMigrations() {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)('npx prisma migrate deploy', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Migration error: ${error}`);
                    reject(error);
                    return;
                }
                console.log(`Migration stdout: ${stdout}`);
                console.error(`Migration stderr: ${stderr}`);
                resolve();
            });
        });
    }
}
exports.default = PrismaTestEnvironment;
