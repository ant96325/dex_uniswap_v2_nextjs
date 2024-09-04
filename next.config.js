/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
// const withTM = require('next-transpile-modules')([
//   'react-financial-charts',
//   '@react-financial-charts/annotations', // Add this if you're using annotations
//   '@react-financial-charts/core',
//   '@react-financial-charts/series',
//   '@react-financial-charts/axes',
//   '@react-financial-charts/scales',
// ]);

// module.exports = withAntdLess({
//   lessVarsFilePath: './styles/variables.less', // Optionally customize antd theme here

//   reactStrictMode: true,

//   webpack(config) {
//     config.resolve.extensions.push('.ts', '.tsx');
//     return config;
//   },
  
//   // Optional: enable webpack bundle analyzer
//   // analyze: process.env.ANALYZE === 'true',
// });


// module.exports = withTM({
  // Other Next.js configurations
// });