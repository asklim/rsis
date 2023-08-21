export = getClientEnvironment;
declare function getClientEnvironment(publicUrl: any): {
    raw: {
        NODE_ENV: string;
        PUBLIC_URL: any;
    };
    stringified: {
        'process.env': {};
    };
};
