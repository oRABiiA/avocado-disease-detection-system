// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "images.pexels.com"
            }
        ],
        domains: ['8204-84-108-116-163.ngrok-free.app']
    }
};

module.exports = nextConfig
