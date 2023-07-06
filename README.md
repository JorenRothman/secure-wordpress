# Secure WordPress

A simple script to secure your WordPress installation.

## Usage

```bash
npx @jorenrothman/secure-wordpress
```

## Rules
Here are the rules that are applied to your `.htaccess` file.
### Block wp-includes folder and files
```
# Block wp-includes folder and files
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^wp-admin/includes/ - [F,L]
    RewriteRule !^wp-includes/ - [S=3]
    RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
    RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
    RewriteRule ^wp-includes/theme-compat/ - [F,L]
</IfModule> 
```
### Deny access to all dot files
```
# Deny access to all dot files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
```
### Deny access to wp-config.php file
```
# Deny access to wp-config.php file
<Files wp-config.php>
    order allow,deny
    deny from all
</Files>
```
### Deny access to .htaccess file
```
# Deny access to .htaccess file
<Files .htaccess>
    order allow,deny
    deny from all
</Files>
```
### Deny access to all SQL files
```
# Deny access to all sql files
<FilesMatch "\.(sql)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```
### Deny access to server config files
```
# Deny access to server config files
<FilesMatch "^.*(error_log|php.ini|\.[hH][tT][aApP].*)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```
### Kill PHP Execution in uploads folder
*Added in the uploads folder*
```
# Kill PHP Execution
<Files *.php>
  deny from all
</Files>
```
