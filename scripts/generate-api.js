import path from 'path';
import swaggerTypescriptAPI from 'swagger-typescript-api';

const { generateApi, generateTemplates } = swaggerTypescriptAPI;

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
await generateApi({
    name: "generatedAPI.ts",
    // set to `false` to prevent the tool from writing to disk
    output: path.resolve(process.cwd(), "./src"),
    url: 'https://localhost:7065/swagger/v1/swagger.json',
    httpClientType: 'axios',
    defaultResponseAsSuccess: false,
    generateClient: true,
    generateRouteTypes: true,
    pathParamsInCamelCase: false,
    prettier: { // By default prettier config is load from your project
        printWidth: 120,
        tabWidth: 2,
        trailingComma: "all",
        parser: "typescript",
    },
    primitiveTypeConstructs: (constructs) => ({
        ...constructs,
        string: {
            'date-time': 'Date'
        }
    }),
    hooks: {
        onFormatRouteName: (routeInfo, templateRouteName) => {
            return routeInfo.operationId.charAt(0).toLowerCase() + routeInfo.operationId.slice(1);
        },
    }
});

process.exit()