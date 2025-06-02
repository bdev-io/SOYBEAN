import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const internalHost = process.env.TAURI_DEV_HOST || 'localhost:4000';


const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
  cleanDistDir: true,
  trailingSlash: true,
  assetPrefix: isProduction ? undefined : `http://${internalHost}/`,
};

export default nextConfig;


