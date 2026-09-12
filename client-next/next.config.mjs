/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};
export default nextConfig;
