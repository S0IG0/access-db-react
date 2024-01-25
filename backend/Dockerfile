FROM node:alpine3.17

WORKDIR /backend

COPY ./package.json /backend/
RUN npm install --force

COPY ./ /backend/

CMD ["npm", "start"]
