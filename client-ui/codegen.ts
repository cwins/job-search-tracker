import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
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
