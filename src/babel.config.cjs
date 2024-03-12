module.exports = {
    presets: [
        [ '@babel/preset-env', {
            'targets': {
                'edge': '17',
                'firefox': '60',
                'chrome': '67',
                'safari': '11.1',
                'node': 'current'
            }
        }],
        [ '@babel/react', {
            'pragma': 'dom', // default pragma is React.createElement
            'pragmaFrag': 'DomFrag', // default is React.Fragment
            'throwIfNamespace': false // defaults to true
        }],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-class-properties',
        '@babel/plugin-transform-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        //'react-hot-loader/babel',
        [ 'module-resolver', {
            'root': [
                './src'
            ]
        }]
    ],
};
