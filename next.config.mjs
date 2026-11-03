/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next.js keeps static RSC payloads in the client router cache. The
    // default window is long enough that a tab opened on the pre-GFM HTML
    // kept showing pipe tables after a deploy. Serve the current payload.
    staleTimes: {
      static: 0,
    },
  },
};

export default nextConfig;
