const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "base.scss";`,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sla.webelectron.com',
                port: '',
                pathname: '**',

            },
        ],
    },
}

module.exports = withNextIntl(nextConfig);