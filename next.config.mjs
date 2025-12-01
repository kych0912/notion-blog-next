/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    domains: [
      "www.notion.so",
      "transitivebullsh.it",
      "www.notion.so",
      "notion.so",
      "images.unsplash.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "https://nextblog.me"
                : "http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
