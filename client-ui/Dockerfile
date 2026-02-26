FROM oven/bun:alpine

WORKDIR /app

# copy dependency files first (optimizes build caching)
COPY package.json bun.lock ./
RUN bun install
RUN ls node_modules | wc -l

# copy the rest of the application code
COPY . .

# build it yo
RUN bun run build

RUN bun install --production
RUN ls node_modules | wc -l

# Cloud Run expects the app to listen on the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["bun", "run", "start"]
