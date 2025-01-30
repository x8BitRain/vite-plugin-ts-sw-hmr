import { BuildOptions, buildSync } from 'esbuild';
import { join } from 'path';

/* eslint-env node */

interface ServiceWorkerHmrPluginConfig {
  inputFile: string;
  outputFile: string;
}

const defaultEsbuildConfig: BuildOptions = {
  minify: true,
  bundle: true
};

const bundleSwPlugin = (config: ServiceWorkerHmrPluginConfig[], esbuildConfig: BuildOptions = defaultEsbuildConfig) => {
  const doBundle = () => {
    for (const item of config) {
      if (!item.inputFile || !item.outputFile) {
        throw new Error('inputFile and outputFile are required');
      }
      buildSync({
        ...esbuildConfig,
        entryPoints: [join(process.cwd(), item.inputFile)],
        outfile: join(process.cwd(), item.outputFile)
      });
    }
  };
  return {
    apply: 'serve',
    enforce: 'pre',
    configResolved() {
      doBundle();
    },
    handleHotUpdate() {
      doBundle();
    },
    writeBundle() {
      doBundle();
    }
  };
};

export default bundleSwPlugin;
