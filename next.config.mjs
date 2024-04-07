/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["avatars.githubusercontent.com"]
      },
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
    },
};


export default nextConfig;
