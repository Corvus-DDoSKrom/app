FROM node

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 4000

CMD ["node", "index.js"]
