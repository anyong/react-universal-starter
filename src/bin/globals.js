global.__SERVER__ = true;
global.__CLIENT__ = false;
if (process.env.NODE_ENV === 'production') {
    global.__PROD__ = true;
    global.__DEV__ = false;
} else {
    global.__PROD__ = false;
    global.__DEV__ = true;
}
