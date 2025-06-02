module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    
    // axios와 다른 ES6 모듈들을 변환하도록 설정
    transformIgnorePatterns: [
      'node_modules/(?!(axios|@testing-library)/)'
    ],
    
    // 모듈 매핑
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
    },
    
    // 변환 설정
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
        presets: [
          ['@babel/preset-env', { 
            modules: 'commonjs',
            targets: { node: 'current' }
          }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }]
    },
    
    // 테스트 환경 설정
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}'
    ],
    
    // 커버리지 수집
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/index.js',
      '!src/reportWebVitals.js'
    ],
    
    // 테스트 타임아웃
    testTimeout: 10000
  };