FROM node:14

WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 3000

# CMD npm start
ENTRYPOINT ["/bin/bash", "./startup.sh" ]
