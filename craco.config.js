const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@custom-hooks': path.resolve(__dirname, 'src/custom-hooks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};
