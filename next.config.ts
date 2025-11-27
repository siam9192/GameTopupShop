
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // (optional) allow all HTTP domains too
      },
    ],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
