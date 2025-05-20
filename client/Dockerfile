FROM node:lts-alpine
WORKDIR /app
COPY package* .json ./
RUN yarn install --frozen-lockfile
COPY ..
EXPOSE 5173
EXPOSE 4173
CMD [ "yarn", "dev" ]

