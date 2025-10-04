# Multi-stage build for Novena Medical Website
# Stage 1: Build stage - Compile SCSS and process templates
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for SCSS compilation
RUN npm install -g sass

# Copy source files
COPY . .

# Create css directory if it doesn't exist
RUN mkdir -p css

# Compile SCSS to CSS
RUN sass scss/style.scss css/style.css --style compressed

# Process HTML templates (replace @@include directives)
RUN node build-template.js

# Stage 2: Production stage - Serve static files
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy processed files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
