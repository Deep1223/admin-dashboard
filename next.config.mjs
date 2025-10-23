/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/category',
        destination: '/view/category',
      },
      {
        source: '/researchstudy',
        destination: '/view/researchstudy',
      },
      {
        source: '/researchtype',
        destination: '/view/researchtype',
      },
      {
        source: '/author',
        destination: '/view/author',
      },
      {
        source: '/tag',
        destination: '/view/tag',
      },
      {
        source: '/laymansummary',
        destination: '/view/laymansummary',
      },
      {
        source: '/research',
        destination: '/view/research',
      }
    ];
  },
};

export default nextConfig;
