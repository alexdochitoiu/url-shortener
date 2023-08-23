# URL Shortener

## Description

- Express REST API with MongoDB boilerplate

- Clean architecture
- mongo
- pnpm
- DI Container (typedi & reflect-metdata)
- Logging (winston)

## How to run the service?

- Install pnpm

```bash
> pnpm install
```

#### Get mongo running

- Prerequisite: `Docker`

```bash
> docker pull mongo:latest
> docker run -d -p 27017:27017 --name=url-shortener mongo:latest
```

```bash
> pnpm start
```
