
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 使用静态导出
  // 移除 experimental.serverActions: true 配置，因为它已经默认启用
  // 如果有的话，将它从experimental对象中删除
  experimental: {
    // 移除 serverActions: true
  },
  // 为Cloudflare优化文件大小
  webpack: (config) => {
    // 优化代码分割
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 20 * 1024 * 1024, // 确保分割后的块小于20MB
    };
    return config;
  }
};

export default nextConfig;