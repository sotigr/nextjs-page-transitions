FROM node:lts-slim

WORKDIR /src

CMD ["sh", "-c", "npm i && npm run dev"]