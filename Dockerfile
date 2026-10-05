FROM node

WORKDIR /moviesapp

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]