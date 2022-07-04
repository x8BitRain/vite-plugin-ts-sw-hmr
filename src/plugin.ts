import { rollup, InputOptions, OutputOptions } from 'rollup'
import rollupPluginTypescript from 'rollup-plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

interface CompileTsServiceWorkerConfig {
  inputFile: string
  outputFile: string
}

let pluginConfig: CompileTsServiceWorkerConfig[]

const _writeSw = () => {
  pluginConfig.forEach(async (config) => {
    const inputOptions: InputOptions = {
      input: config.inputFile,
      plugins: [rollupPluginTypescript(), nodeResolve()],
    }
    const outputOptions: OutputOptions = {
      file: config.outputFile,
      format: 'es',
    }
    const bundle = await rollup(inputOptions)
    await bundle.write(outputOptions)
    await bundle.close()
  })
}

const CompileTsServiceWorker = (config: CompileTsServiceWorkerConfig[]) => ({
  name: 'compile-typescript-service-worker',
  async config() {
    pluginConfig = config
    await _writeSw()
  },
  async handleHotUpdate(id) {
    const outputFiles = pluginConfig.map((config) => config.outputFile)
    if (outputFiles.find((file: string) => id.file.match(file))) return
    await _writeSw()
  },
  async writeBundle(_options, _outputBundle) {
    await _writeSw()
  },
})

export default CompileTsServiceWorker
