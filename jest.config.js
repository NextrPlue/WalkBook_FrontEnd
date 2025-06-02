// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)' // ✅ axios만 변환 대상에 포함시킴
  ]
};