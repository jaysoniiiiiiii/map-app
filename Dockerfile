FROM node:18
# where our app will be located in the image
RUN mkdir -p /app
WORKDIR /app
# move all source code
COPY . .
RUN npm install --force 
CMD ["npm", "start"]
EXPOSE 4040