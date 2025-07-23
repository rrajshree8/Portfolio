const nextConfig = {
  images: {
    domains: [
      'cdn-images-1.medium.com',
      'cdn-images-2.medium.com',
      'cdn-images-3.medium.com',
      'cdn-images-4.medium.com',
      'cdn-images-5.medium.com',
      'cdn-images-6.medium.com',
      'cdn-images-7.medium.com',
      'cdn-images-8.medium.com',
      'cdn-images-9.medium.com',
      'cdn-images-10.medium.com'
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/i,
      use: {
        loader: "url-loader",
      },
    });

    return config;
  },
};

export default nextConfig;
