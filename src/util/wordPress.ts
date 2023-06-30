import * as fs from 'fs';

export function isWordPress() {
    // scan dir and check for wp-config.php
    return fs.readdirSync('./').some((file) => file === 'wp-config.php');
}

export function locateHTAccess() {
    // scan dir and check for .htaccess
    return fs.readdirSync('./').some((file) => file === '.htaccess');
}
