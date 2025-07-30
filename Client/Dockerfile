# Use official Nginx image
FROM nginx:1.28-alpine

# Copy the build output
COPY dist/ /usr/share/nginx/html/

# Overwrite the default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
