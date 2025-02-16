import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  source: {
    define: publicVars,
    transformImport: [
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
      },
    ],
  },
  plugins: [
    pluginBasicSsl(),
    pluginReact(),
    pluginTypeCheck(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'named',
        typescript: true,
      },
    }),
    pluginSass(),
  ],
  output: {
    cleanDistPath: true,
    sourceMap: {
      js:
        process.env.NODE_ENV === 'production'
          ? 'source-map'
          : 'cheap-module-source-map',
      css: process.env.NODE_ENV !== 'production',
    },
    polyfill: 'usage',
  },
});
