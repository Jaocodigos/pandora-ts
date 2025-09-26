# pandora-ts

pandora is a prototype of a password vault, written in Typescript and NestJS just for 
study purposes.

## How run

### Requirements

If you want easily run this project, you need in your machine:

- node >= 24
- docker and docker compose

### Environment Variables

Here are the main environment variables you have to know:

**OBS**: They will have a default value to avoid too much configuration, just 
alter those values if you really need(If it's the case, you can create a `.env` file
inside `app` directory).

```
DB_TYPE=postgres # I will add compatibility with MySQL in the future
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=pandora
```

### docker compose

You can use the **docker compose** file in `external/compose` directory to rapidly run a database container.

#### Envs

**OBS**: They will have a default value to avoid too much configuration, just
alter those values if you really need(If it's the case, you can create a `.env` file
inside `compose` directory).

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=pandora
```

#### Running container

### Finally

In `app` directory, let's install the needed packages:

```bash
    npm install
```

Now, you can run:

```bash
    npm run start # OR
    npm run start:dev
```

### Roadmap

- Add cryptography.
- Integration with CLI.
- Security policies for storage and reset credentials.