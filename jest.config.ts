export default {
    roots: ['.'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleDirectories: [
        "node_modules",
        "src",
    ],
    testPathIgnorePatterns: ['node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/*.test.(ts|tsx)'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        assets: '<rootDir>/assets',
    },
};
