FROM node:14
WORKDIR /home/node/app/
ADD ./ /home/node/app/
RUN npm install
CMD npm start
