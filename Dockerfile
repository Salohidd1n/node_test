FROM node:14

WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 3000

RUN chmod +x startup.sh

ENTRYPOINT ["/bin/bash", "./startup.sh"]