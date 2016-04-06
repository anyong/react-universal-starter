const path = require('path');

const __DEV__ = process.env.NODE_ENV !== 'production';

const devConfig = {
    db: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: '5432',
            user: 'postgres',
            password: 'password',
            database: 'my_database',
            charset: 'utf8',
        },
        pool: {
            min: 1,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, 'data', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'data', 'seeds'),
        },
    },
};

const prodConfig = {};

module.exports = __DEV__ ? devConfig : prodConfig;
