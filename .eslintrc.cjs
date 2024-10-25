module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'off',
            },
            parserOptions: {
                sourceType: 'script',
            },
        },
        {
            // Override for JavaScript files in scripts folder
            files: ['scripts/*.js'],
            parser: 'espree', // Default parser for JS
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            rules: {
                '@typescript-eslint/no-var-requires': 'off', // Disable TS rules for JS
                'no-undef': 'off',
            },
        },
        {
            // Override for YAML files
            files: ['**/*.yml'],
            rules: {
                indent: ['error', 2],
                quotes: ['error', 'single'],
                semi: ['error', 'never'],
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Ensure TypeScript files are covered
        tsconfigRootDir: __dirname,
    },
    plugins: ['react', 'yaml', 'prettier'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    ignorePatterns: ['test/**/*'],
};
