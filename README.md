# Real Fox

Ranking Fox Weiqi players beyond 9d.

> Huge thanks to [@ale64bit](https://github.com/ale64bit) for his work on the [openfoxwq](https://github.com/openfoxwq) project, otherwise this wouldn't have been possible.

## Services and Tech Used

- [Vercel](https://vercel.com) for handling deployment, and cron jobs.
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) for handling the DB.
- [Drizzle](https://orm.drizzle.team) for ORM.
- [Open Fox API](https://github.com/openfoxwq/api)

## Dev

### Environment Variables

This is the shape of the project's environment variables:

```env
#-----------------------------------------------------------
# 1. Drizzle

POSTGRES_URL=
NODE_ENV=

#-----------------------------------------------------------
# 2. Open Fox API

NEXT_FOX_API_USER=
NEXT_FOX_API_PASSWORD_HASH=
NEXT_FOX_API_AUTH=

NEXT_FOX_API_ID=
NEXT_FOX_API_KEY=

#-----------------------------------------------------------
```

### EdgeDB

To create migrations:

```sh
edgedb migration create
edgedb migrate
```

If you would like to reset things, you can:

```sh
edgedb
```

And then use `reset schema to initial;`.

You will also probably need to update Next.js' inferred types with:

```sh
pnpx @edgedb/generate edgeql-js
```

It's also possible to watch for diffs on EdgeDB with:

```sh
edgedb watch
```
