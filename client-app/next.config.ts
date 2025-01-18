import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-quill'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@css": path.resolve(__dirname, "src/app"),
      "@modules": path.resolve(__dirname, "src/modules/"),
      "@dashboard": path.resolve(__dirname, "src/modules/dashboard"),
      "@auth": path.resolve(__dirname, "src/modules/auth"),
      "@backlog": path.resolve(__dirname, "src/modules/backlog"),
      "@kanban": path.resolve(__dirname, "src/modules/kanban"),
      "@project": path.resolve(__dirname, "src/modules/project"),
      "@settings": path.resolve(__dirname, "src/modules/settings"),
      "@sprints": path.resolve(__dirname, "src/modules/sprints"),
      "@team": path.resolve(__dirname, "src/modules/team"),
      "@common": path.resolve(__dirname, "src/components/common"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
    };
    return config;
  }
};

export default nextConfig;