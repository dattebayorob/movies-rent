FROM node:12.16.1-alpine AS builder

COPY package.json ./
RUN yarn && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN yarn run build

FROM node:12.16.1-alpine
WORKDIR /app
COPY --from=builder /app/build .
CMD ["npx","serve", "-p", "80", "-s", "."]