'use strict';

const nginx = require('./lib/nginx');

nginx.write_config((err) => {
    if (err) {
        process.stderr.write(err);
    } else {
        nginx.start();
    }

    setInterval(() => {
        nginx.write_config((err) => {
            if (err) {
                process.stderr.write(err);
            } else {
                nginx.start();
            }
        });
    }, process.env.RELOAD_INTERVAL || 15000);
});