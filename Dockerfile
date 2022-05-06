FROM node:12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy repo
COPY . /usr/src/app


# Install dependencies
RUN npm install

# Build angular app
RUN npm run build


CMD [ "npm", "start" ]
