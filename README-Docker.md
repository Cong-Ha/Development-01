# Docker Setup for Novena Medical Website

This project includes Docker configuration for building and running the medical website.

## Quick Start

### Using Docker Compose (Recommended)
```bash
# Pull and run the pre-built image
docker-compose up

# Run in background
docker-compose up -d

# Stop the container
docker-compose down
```

### Using Docker directly
```bash
# Pull the image from repository
docker pull uzomaki/development-01:latest

# Run the container
docker run -p 8080:80 uzomaki/development-01:latest
```

### Building from Source (Development)
```bash
# Build the image locally
docker build -t novena-website .

# Run the container
docker run -p 8080:80 novena-website
```

## Access the Website

Once running, visit: http://localhost:8080

## What the Dockerfile Does

1. **Build Stage**: 
   - Uses Node.js to compile SCSS files to CSS
   - Processes HTML templates (resolves `@@include()` directives)
   - Creates the `css/style.css` file from `scss/style.scss`
   - Generates processed HTML files in `dist/` directory

2. **Production Stage**:
   - Uses Nginx to serve static files
   - Includes optimized configuration for static assets
   - Enables gzip compression and caching
   - Serves processed files from `dist/` directory

## Features

- **Template Processing**: Resolves `@@include()` directives in HTML files
- **SCSS Compilation**: Automatically compiles SCSS to CSS during build
- **Non-destructive Build**: Original source files are preserved
- **Nginx Optimization**: Configured for static file serving with caching
- **Security Headers**: Basic security headers included
- **Gzip Compression**: Reduces file sizes for faster loading
- **Asset Caching**: Static assets cached for 1 year
- **Pre-built Image**: Available as `uzomaki/development-01:latest`

## File Structure

```
├── Dockerfile              # Multi-stage Docker build
├── nginx.conf             # Nginx configuration
├── docker-compose.yml     # Docker Compose setup (uses pre-built image)
├── build-template.js      # Template processing script
├── .dockerignore          # Files to ignore in Docker build
├── dist/                  # Processed files (generated during build)
└── README-Docker.md       # This file
```

## Troubleshooting

If you encounter issues:

1. **Port already in use**: Change the port in `docker-compose.yml` from `8080:80` to `8081:80`
2. **Template processing errors**: Check that all partial files exist in `partials/` directory
3. **SCSS compilation errors**: Check that all SCSS files are properly formatted
4. **Missing CSS**: Ensure the build stage completed successfully
5. **Image not found**: Run `docker pull uzomaki/development-01:latest` to get the latest image

## Development

### Using Pre-built Image (Recommended)
```bash
# Quick start with pre-built image
docker-compose up
```

### Building from Source
```bash
# For development with local changes
docker-compose -f docker-compose.dev.yml up --build
```

### Template Development
The build process preserves original source files with `@@include()` syntax. Processed files are generated in the `dist/` directory during Docker build.
