module.exports = {
    env: {
        "shared-node-browser": true,
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
        es2021: true,
    },
    parser: "@babel/eslint-parser",
    /*parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    }, */
    plugins: [
        "eslint-plugin-react",
        "eslint-plugin-react-hooks",
        "@emotion"
    ],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    settings: {
        react: {
            createClass: "createReactClass", // Regex for Component Factory use,
            // default to "createReactClass"
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version. "detect" automatically picks
            // the version you have installed.
            // You can also use `16.0`, `16.3`, etc, if you
            // want to override the detected value.
            flowVersion: "0.53", // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g.
            // `forbidExtraProps`. If this isn't set, any propTypes wrapped in
            // a function will be skipped.
            "forbidExtraProps",
            { property: "freeze", object: "Object" },
            { property: "myFavoriteWrapper" },
        ],
    },
    rules: {
        /*******       LOGIC      *******
         * https://eslint.org/docs/latest/rules/
        */
        "no-await-in-loop": "warn",
        "no-template-curly-in-string": "warn",
        "no-unused-vars": ["error", {
            varsIgnorePattern: "should|expect",
        }],
        "no-use-before-define": ["warn", "nofunc"],
        "require-atomic-updates": "warn",

        /*******   SUGGESTIONS   *******/
        "no-console": "off",
        strict: ["warn", "safe"],

        /*******    LAYOUT & FORMATTING    *******/
        "array-bracket-spacing": ["off"],
        "func-call-spacing": ["off"],
        indent: ["warn", 4, {
            SwitchCase: 1,
            MemberExpression: "off",
        }],
        "jsx-quotes": ["off", "prefer-single"],
        "linebreak-style": ["error", "unix" ],
        "no-multiple-empty-lines": ["warn", {
            max: 5,
            maxBOF: 5,
            maxEOF: 1,
        }],
        "object-curly-spacing": ["off"],
        quotes: ["off", "single"],
        semi: ["error", "always"],
        "space-in-parens": ["off", "always"],

        /*******   REACT RULES   *******/
        "react/jsx-uses-react": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        /*******   @emotions/ RULES   *******/
        "@emotion/pkg-renaming": "error",
        "@emotion/jsx-import": "error",
        "@emotion/no-vanilla": "error",
        "@emotion/import-from-emotion": "error",
        "@emotion/styled-import": "error"
    },
};
