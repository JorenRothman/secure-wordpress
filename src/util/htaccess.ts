import { readFileSync, writeFileSync } from 'fs';

export function appendRules(path: string, rules: string, createFile = false) {
    const trimmedRules = rules.trim();

    try {
        const currentFile = readFileSync(path, 'utf8');

        if (currentFile.includes(trimmedRules)) {
            return;
        }

        writeFileSync(path, currentFile + '\n\n' + trimmedRules);
    } catch (error) {
        if (createFile) {
            writeFileSync(path, trimmedRules);
            return;
        }
    }
}

export function doesBackupExist() {
    try {
        readFileSync('./.htaccess.backup', 'utf8');
        return true;
    } catch (error) {
        return false;
    }
}

export function backupFiles() {
    const currentFile = readFileSync('./.htaccess', 'utf8');

    writeFileSync('./.htaccess.backup', currentFile);

    console.log('Created backup file at ./.htaccess.backup');
}
