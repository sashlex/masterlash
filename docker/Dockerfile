FROM node:latest

COPY ./dist /www

RUN cd /www && npm install

WORKDIR /www

EXPOSE 3100:3100

ENTRYPOINT ["npm", "run"]

# default command (pssible pass "prod" as argument)
CMD ["dev"]
