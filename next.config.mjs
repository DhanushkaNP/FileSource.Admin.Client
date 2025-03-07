/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sysadmin/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
