FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

ENV HTTP_PORT=4001
EXPOSE 4001

CMD ["bun", "run", "index.ts"]
