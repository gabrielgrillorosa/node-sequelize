FROM node:8
RUN mkdir -p C:\\Users\\gabrielgriilorosa\\Documents\\node\\testeSequelize run/node_modules 
COPY package*.json ./
RUN npm install
COPY . .
USER node
EXPOSE 8080

CMD [ "node", "app.js" ]
