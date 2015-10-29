FROM node:4.1.2

# Install rvm, ruby, bundler
RUN apt-get update
RUN apt-get install -y ruby-full
RUN gem install compass

#install NodeJS
RUN npm install -g grunt-cli bower gulp yo generator-karma generator-angular

WORKDIR /app
