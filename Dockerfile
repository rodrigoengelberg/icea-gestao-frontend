FROM node:14.20.1-alpine3.15 AS build
RUN apk add git 

WORKDIR /front

# RUN git clone https://github.com/rodrigoengelberg/icea-gestao-frontend .

ARG react_app_front_name
ARG react_app_api_url

ENV REACT_APP_FRONT_NAME=${react_app_front_name}
ENV REACT_APP_API_URL=${react_app_api_url}

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

COPY --from=build /front/build/ ./

EXPOSE 3005

CMD ["npm", "run", "dev"]