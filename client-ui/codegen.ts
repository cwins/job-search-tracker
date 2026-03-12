import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Prefer local schema file so codegen works without services running, but could
  // also be from service URL if it's running. e.g. 'http://localhost:4000/graphql'
  schema: '../graphql-api/src/schema.graphql',
  documents: ['src/components/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/__generated/': {
      config: {
        avoidOptionals: true,
        enumsAsTypes: true,
        nonOptionalTypename: true,
        useTypeImports: true
      },
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
