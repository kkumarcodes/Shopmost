# Getting Started with Docker

* [Docker](#docker)
* [Docker Compose](#docker-compose)

## Docker

We'll use `Shopmost/Shopmost` image. [About image](https://github.com/alperendev98/docker-Shopmost).

1. Run MongoDB
```shell
docker run --name store-db -v /var/www/store-db:/data/db -d mongo:latest
```

2. Run Shopmost
```shell
docker run -d \
--name store \
--link store-db:db \
-p 80:80 \
-e DB_HOST=db \
-e DB_PORT=27017 \
-e DB_NAME=shop \
-e DB_USER=user \
-e DB_PASS=password \
-v /var/www/store:/var/www/Shopmost \
Shopmost/Shopmost:latest
```

Open http://localhost to see your store.  
Dashboard - http://localhost/admin  
API - http://localhost

## Docker Compose

Create `docker-compose.yml` by examples.

```yml
version: '3'

services:
  app:
    image: Shopmost/Shopmost
    environment:
      - DB_HOST=db
      - DB_PORT=27017
      - DB_NAME=shop
      - DB_USER=
      - DB_PASS=
    ports:
      - 4000:80
    volumes:
      - /var/www/store:/var/www/Shopmost
    depends_on:
      - db
    restart: always

  db:
    image: mongo
    ports:
      - 27017
    volumes:
      - /var/www/store-db:/data/db
    restart: always
```

`/var/www/store` - folder with Shopmost  
`/var/www/store-db` - folder with MongoDB data
