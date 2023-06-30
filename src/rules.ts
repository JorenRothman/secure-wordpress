export const blockWPIncludes = `
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
`;

export const denyWPConfig = `
# Deny access to wp-config.php file
<Files wp-config.php>
    order allow,deny
    deny from all
</Files>
`;

export const denyHTAccess = `
# Deny access to .htaccess file
<Files .htaccess>
    order allow,deny
    deny from all
</Files>
`;

export const denyDotFiles = `
# Deny access to all dot files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
`;

export const denySqlFiles = `
# Deny access to all sql files
<FilesMatch "\.(sql)$">
    Order allow,deny
    Deny from all
</FilesMatch>
`;

export const denyServerConfig = `
# Deny access to server config files
<FilesMatch "^.*(error_log|php.ini|\.[hH][tT][aApP].*)$">
    Order allow,deny
    Deny from all
</FilesMatch>
`;

export const denyPHPInUploads = `
# Kill PHP Execution
<Files *.php>
  deny from all
</Files>
`;
