
# Task API

APIs to CRUD tasks along with metrics

## Run Locally

**Clone the project**

```bash
  git@github.com:what-the-sid/crud-tasks.git
```
\
**Install Requirements**

Its preffered to install `nvm` for node version control. [Guide](https://github.com/nvm-sh/nvm)

After installing `nvm`. Desired node version can be installed and used by:
```bash
nvm install && nvm use
```

\
**Install dependencies**
 - Install dependencies using the makefile shell script:
```bash
  chmod +x Makefile.sh
  ./Makefile.sh
```

This will install dependencies, export required env Variables and migrates table to the SQLite

**Start dev server**

```bash
  npm run start
```

**Check Linting**

```bash
  npm run lint
```

**Run Unit test cases**

```bash
  npm run test
```

## Environment Variables


| ENV Name                | Description                        | Default      |
|-------------------------|------------------------------------|--------------|
| `APP_PORT`     | Port Number to run express app           |     4000         |
| `NODE_ENV`    | Node env to run the app            | `development` |
| `DB_NAME`            | Name of the SQLite DB          | `data.test.sqlite` |
| `DB_USERNAME`         | Username used in the DB to connect         | `null`       |
| `DB_PASS`       | Password used in the DB to connect      |       `null`       |
| `DB_DIALECT`     | Type of DB (should use `sqlite`) | `sqlite`          |
| `DB_STORAGE`     | Path where the db file is located | `{root}/data.test.sqlite`          |


## API Reference

API Documentation can be accessed in this [postman link](https://documenter.getpostman.com/view/25655079/2s9YJXZQjr)



## Authors

- [@what-the-sid](https://github.com/what-the-sid)

## Todo
- Add `husky` dependency to test and lint before commit
- `Dockerize` app for deployment
- Fix `production Build` using webpack
