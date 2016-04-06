// Node Libs
import http from 'http';

// Project Libs
import './globals';
import app from '../server';

const server = http.createServer(app);

function onError (err) {
    console.log('Server error: ', err);
}

server.listen(3000, '127.0.0.1');
server.on('error', onError);
