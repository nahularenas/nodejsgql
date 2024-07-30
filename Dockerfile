FROM node:20
RUN apt-get update && apt-get install -y netcat-openbsd
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
COPY entrypoint.sh ./
EXPOSE 3000
CMD ["./entrypoint.sh"]