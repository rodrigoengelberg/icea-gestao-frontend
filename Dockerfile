FROM node:14-alpine AS build

RUN apk add git 

WORKDIR /front

RUN git clone https://github.com/rodrigoengelberg/icea-gestao-frontend .

RUN npm install
RUN npm run build

ARG react_app_front_name
ARG react_app_api_url

ENV REACT_APP_FRONT_NAME=${react_app_front_name}
ENV REACT_APP_API_URL=${react_app_api_url}

FROM node:14-alpine AS publish

WORKDIR /front

COPY --from=build /front/ ./

EXPOSE 3005

CMD ["npm", "run", "dev"]