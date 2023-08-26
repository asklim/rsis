/** https://github.com/timocov/dts-bundle-generator/blob/HEAD/src/config-file/README.md */
const config =  {
    compilationOptions: {
        /**
         * EXPERIMENTAL!
         * Allows disable resolving of symlinks to the original path.
         * By default following is enabled.
         * @see https://github.com/timocov/dts-bundle-generator/issues/39
         * Optional. Default value is `true`.
         */
        followSymlinks: true,

        /**
         * Path to the tsconfig file that will be used for the compilation.
         * Must be set if entries count more than 1.
         */
        preferredConfigPath: './tsconfig.dts-bundle.json',
    },

    // non-empty array of entries
    entries: [
        {
            /**
             * Path to input file (absolute or relative to config file).
             * Required.
             */
            filePath: './server/index.js',

            /**
             * Path of generated d.ts.
             * If not specified - the path will be input file with replaced extension to `.d.ts`.
             */
            outFile: './@types/index.d.ts',

            /**
             * Fail if generated dts contains class declaration.
             * Optional. Default value is `false`.
             */
            failOnClass: false,

            /**
             * Skip validation of generated d.ts file.
             * Optional. Default value is `false`.
             */
            noCheck: false,

            libraries: {
                /**
                 * Array of package names from @types to import typings from via the triple-slash reference directive.
                 * By default all packages are allowed and will be used according to their usages.
                 * Optional. Default value is `undefined`.
                 */
                //allowedTypesLibraries: ['jquery', 'react'],

                /**
                 * Array of package names from node_modules to import typings from.
                 * Used types will be imported using `import { First, Second } from 'library-name';`.
                 * By default all libraries will be imported (except inlined libraries and libraries from @types).
                 * Optional. Default value is `undefined`.
                 */
                //importedLibraries: ['rxjs', 'typescript'],

                /**
                 * Array of package names from node_modules to inline typings from.
                 * Used types will be inlined into the output file.
                 * Optional. Default value is `[]`.
                 */
                //inlinedLibraries: ['@my-company/package'],
            },

            output: {
                /**
                 * Enables inlining of `declare global` statements contained in files which should be inlined (all local files and packages from inlined libraries).
                 * Optional. Default value is `false`.
                 */
                inlineDeclareGlobals: false,

                /**
                 * Sort output nodes in ascendant order.
                 * Optional. Default value is `false`.
                 */
                sortNodes: false,

                /**
                 * Name of the UMD module.
                 * If specified then `export as namespace ModuleName;` will be emitted.
                 * Optional. Default value is `undefined`.
                 */
                //umdModuleName: 'MyModuleName',

                /**
                 * Enables inlining of `declare module` statements of the global modules
                 * (e.g. `declare module 'external-module' {}`, but NOT `declare module './internal-module' {}`)
                 * contained in files which should be inlined (all local files and packages from inlined libraries)
                 */
                //inlineDeclareExternals: false,

                /**
                 * Allows remove "Generated by dts-bundle-generator" comment from the output
                 */
                noBanner: false,

                /**
                 * Enables stripping the `const` keyword from every direct-exported (or re-exported) from entry file `const enum`.
                 * This allows you "avoid" the issue described in https://github.com/microsoft/TypeScript/issues/37774.
                 */
                //respectPreserveConstEnum: false,

                /**
                 * By default all interfaces, types and const enums are marked as exported even if they aren't exported directly.
                 * This option allows you to disable this behavior so a node will be exported if it is exported from root source file only.
                 */
                exportReferencedTypes: true,
            },
        },
        // {
        //     filePath: './src/rsis/rsis.ts',
        //     outFile: './dist/rsis.d.ts',
        // },
        // {
        //     filePath: './src/weeks/weeks.ts',
        //     outFile: './dist/weeks.d.ts',
        // }
    ],
};

module.exports = config;