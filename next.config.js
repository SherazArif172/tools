/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development
    if (dev) {
      config.cache = false;
    }

    // Handle PDF.js worker
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Add worker-loader for PDF.js
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: "asset/resource",
      generator: {
        filename: "static/worker/[hash][ext][query]",
      },
    });

    return config;
  },
  // Remove experimental features that might cause issues
  experimental: {
    optimizePackageImports: ["docx"],
  },
};

module.exports = nextConfig;
