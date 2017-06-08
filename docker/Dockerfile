FROM node:latest

COPY ./dist /www

RUN cd /www && npm install

WORKDIR /www

# EXPOSE 3100

ENTRYPOINT ["npm", "run"]

# default command "dev" (possible pass "prod" as argument when run image)
CMD ["dev"]
