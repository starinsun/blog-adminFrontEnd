FROM node:12-alpine

RUN mkdir -p /var/publish/back
RUN npm install serve -g
ADD . /var/publish/back

WORKDIR /var/publish/back
ENV HOST 0.0.0.0
ENV PORT 5000
EXPOSE 5000

CMD ["serve","-s","build"]