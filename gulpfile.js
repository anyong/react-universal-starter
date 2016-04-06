/* eslint-env es5 */
'use strict';

require('./src/bin/globals');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var clientConfig = {
    entry: {
        client: './src/client.jsx',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: { presets: ['es2015', 'stage-0', 'react'] },
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__,
            __PROD__,
            __CLIENT__: true,
            __SERVER__: false,
            'process.env.NODE_ENV': __PROD__ ? '"production"' : '"development"',
        }),
    ],
};

if (__PROD__) {
    clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

function onBuild (cb) {
    return function logStats (err, stats) {
        if (err) {
            gutil.log('Webpack error: ', err);
        } else {
            gutil.log(stats);
        }

        cb();
    };
}

gulp.task('client', function buildClient (done) {
    webpack(clientConfig).run(onBuild(done));
});

gulp.task('build', ['client']);

gulp.task('hot', function hotClient (done) {
    var compiler = webpack(clientConfig);

    new WebpackDevServer(compiler, {
       // server and middleware options
    }).listen(8080, '127.0.0.1', function onErr (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        // Server listening
        gutil.log('[webpack-dev-server]', 'http://127.0.0.1:8080/webpack-dev-server/index.html');
        onBuild(done);
    });
});
