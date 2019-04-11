// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/np_databases/dev_race.db"
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
    directory: __dirname + '/db/seeds/development'
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "tbd",
      user: "tbd",
      password: 'tbd'
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }, 
  
  test: {
    client: "sqlite3",
    connection: {
      filename: "./db/np_databases/dev_race.db"
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
    directory: __dirname + '/db/seeds/test'
    }
  }
};
