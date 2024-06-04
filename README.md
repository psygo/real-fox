# Real Fox

Ranking Fox Weiqi players beyond 9d.

> Huge thanks to [@ale64bit](https://github.com/ale64bit) for his work on the [openfoxwq](https://github.com/openfoxwq) project, otherwise this wouldn't have been possible.

## Services and Tech Used

- [Vercel](https://vercel.com) for handling deployment.
- [EdgeDB](https://www.edgedb.com/)

## Dev

### Environment Variables

This is the shape of the project's environment variables:

```env
#-----------------------------------------------------------
# 1. EdgeDB

EDGEDB_INSTANCE=
EDGEDB_SECRET_KEY=

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
