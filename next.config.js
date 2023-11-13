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
        source: "/members",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/members"
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
        source: "/profiles",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/profiles"
            : "/api/",
      },
      {
        source: "/upcoming/post",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/upcoming/post"
            : "/api/docs",
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
      {
        source: "/events/:id",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/event/:id"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
