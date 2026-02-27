FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

ENV HTTP_PORT=4002
EXPOSE 4002

CMD ["bun", "run", "index.ts"]
