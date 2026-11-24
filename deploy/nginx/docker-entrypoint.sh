#!/bin/sh
set -eu

# Render the nginx site config from the template, substituting PRODUCT_API_URL.
envsubst '${PRODUCT_API_URL}' \
    < /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
