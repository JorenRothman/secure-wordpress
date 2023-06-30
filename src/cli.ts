#!/usr/bin/env node
import inquirer from 'inquirer';
import { isWordPress, locateHTAccess } from '@/util/wordPress';
import {
    blockWPIncludes,
    denyDotFiles,
    denyHTAccess,
    denyPHPInUploads,
    denyServerConfig,
    denySqlFiles,
    denyWPConfig,
} from '@/rules';
import { appendRules, backupFiles, doesBackupExist } from '@/util/htaccess';

if (!isWordPress()) {
    console.log('This is not a WordPress project');
    process.exit(1);
}

if (!locateHTAccess()) {
    console.log('No .htaccess file found');
    process.exit(1);
}

inquirer
    .prompt([
        {
            type: 'confirm',
            message: 'Do you want to backup your .htaccess file?',
            name: 'backup',
        },
        {
            type: 'checkbox',
            message: 'What rules would you like to include?',
            name: 'action',
            choices: [
                {
                    name: 'Block wp-includes folder and files',
                    value: 'block_wp_includes',
                    checked: false,
                },
                {
                    name: 'Deny access to wp-config.php file (recommended)',
                    value: 'deny_wp_config',
                    checked: true,
                },
                {
                    name: 'Deny access to .htaccess file (recommended)',
                    value: 'deny_htaccess',
                    checked: true,
                },
                {
                    name: 'Deny access to all dot files (recommended)',
                    value: 'deny_dot_files',
                    checked: true,
                },
                {
                    name: 'Deny access to all sql files (recommended)',
                    value: 'deny_sql_files',
                    checked: true,
                },
                {
                    name: 'Deny access to server config files (recommended)',
                    value: 'deny_server_config',
                    checked: true,
                },
                {
                    name: 'Kill PHP Execution in uploads folder (recommended)',
                    value: 'deny_php_in_uploads',
                    checked: true,
                },
            ],
            validate(answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one option.';
                }

                return true;
            },
        },
    ])
    .then((answers) => {
        const backup = answers.backup;

        if (backup) {
            if (doesBackupExist()) {
                console.log('Backup file already exists');
            } else {
                backupFiles();
            }
        }

        const actions = answers.action;

        if (actions.includes('block_wp_includes')) {
            appendRules('./.htaccess', blockWPIncludes);
        }

        if (actions.includes('deny_wp_config')) {
            appendRules('./.htaccess', denyWPConfig);
        }

        if (actions.includes('deny_htaccess')) {
            appendRules('./.htaccess', denyHTAccess);
        }

        if (actions.includes('deny_dot_files')) {
            appendRules('./.htaccess', denyDotFiles);
        }

        if (actions.includes('deny_sql_files')) {
            appendRules('./.htaccess', denySqlFiles);
        }

        if (actions.includes('deny_server_config')) {
            appendRules('./.htaccess', denyServerConfig);
        }

        if (actions.includes('deny_php_in_uploads')) {
            appendRules(
                './wp-content/uploads/.htaccess',
                denyPHPInUploads,
                true
            );
        }
    });
