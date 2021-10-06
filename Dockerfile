FROM node:13
RUN mkdir -p C:\\Users\\gabrielgriilorosa\\Documents\\node\\testeSequelize run/node_modules 
COPY package*.json ./
RUN npm install
COPY . .
USER node
EXPOSE 3333
CMD [ "node", "src/server.js" ]
