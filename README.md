# Fullstack React site that uses backend API with SQLite data source

This is an example of a fullstack app that has an API in the backend which serves data from a db.sqlite file, i.e. a SQLite database. An SQLite database has the advantage that it is simply a file which can be copied, moved and deleted like any other file yet enables an quite robust SQL experience providing the ability to have dozens or hundreds of tables, and the powerful SQL query language with JOIN, UNION, GROUP BY, DISTINCT, etc. A disadvantage of SQLite is the lack of user management including authentication/authorization, but you can handle this externally, and particularly if you have a readonly SQLite database for which all data in the database is accessible to any user, as is the case in this project, SQLite gives you a very fast solution to data querying for an API.

![grafik](https://starters.tanguay.eu/images/starters/sqliteReadonly.png)

## features

- **BACKEND**
  - Node/Express API
  - TypeScript / ES6 modules
  - SQLite
    - uses [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
    - since the SQLite database is a file, i.e. has not connection string, it has to be accessed via absolute file path, this has been tested to work on Windows, Linux and Mac, see `tools.absolutifyPathAndFileName()`
  - four API routes: [https://sqlite-readonly-backend.tkserv.eu](https://sqlite-readonly-backend.tkserv.eu)
  - MVC structure
    - `server.ts` - responsible for req/res routes
    - `model.ts` - responsible for data functions
  - `test.rest` used for manual testing (need [REST Client VSCode extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))
  - cors implemented
- **FRONTEND**
  - Vite React
  - React Router menu
  - useContext
  - axios

## install

- go to your projects directory
- create a directory with the name of your site, e.g. `site001`

## install backend

- go to your projects directory
- `cd site001`
- `git clone git@github.com:edwardtanguay/sqlite-readonly-backend.git .`
- `npm i`
- create **.env** file

```text
PORT = 3701
```

- `npm run dev`

## install frontend

- go to your projects directory
- `cd site001`
- `git clone git@github.com:edwardtanguay/sqlite-readonly-frontend.git .`
- `npm i`
- create **.env** file

```text
VITE_BACKEND_URL = http://localhost:3701
```

- `npm run dev`

## more starters, templates and frameworks

https://starters.tanguay.eu
