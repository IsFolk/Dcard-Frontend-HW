/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["avatars.githubusercontent.com"]
      },
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        AUTH0_BASE_URL: process.env.VERCEL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.AUTH0_BASE_URL,
    },
};


export default nextConfig;
