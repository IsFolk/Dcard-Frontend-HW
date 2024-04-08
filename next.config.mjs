/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["avatars.githubusercontent.com"]
      },
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        NEXT_PUBLIC_GITHUB_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
        NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
        AUTH0_BASE_URL: process.env.VERCEL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.AUTH0_BASE_URL,
    },
};


export default nextConfig;
