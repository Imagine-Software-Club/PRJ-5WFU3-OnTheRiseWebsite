/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [

      {
        source: "/upcoming",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/upcoming"
            : "/api/",
      },
      {
        source: "/past",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/past"
            : "/api/",
      },
      {
        source: "/pictures",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/pictures"
            : "/api/",
      },
      {
        source: "/contact",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/contact"
            : "/api/",
      },

      {
        source: "/about_us",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/about_us"
            : "/api/",
      },


      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;
