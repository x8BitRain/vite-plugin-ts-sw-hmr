import { rollup, InputOptions, OutputOptions } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

interface CompileTsServiceWorkerConfig {
  inputFile: string
  outputFile: string
}

let pluginConfig: CompileTsServiceWorkerConfig[]

let tsOptions: any = {
  compilerOptions: {
    isolatedModules: false,
    lib: ['WebWorker', 'ES2015'],
    checkJs: false,
  },
}

const _writeSw = () => {
  pluginConfig.forEach(async (config) => {
    const inputOptions: InputOptions = {
      input: config.inputFile,
      plugins: [typescript({ tsconfigOverride: tsOptions }), nodeResolve()],
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

const TsServiceWorkers = (
  config: CompileTsServiceWorkerConfig[],
  typeScriptOptions: any | null = null
) => ({
  name: 'compile-typescript-service-worker',
  async config() {
    if (typeScriptOptions) tsOptions = typeScriptOptions
    pluginConfig = config
    await _writeSw()
  },
  async handleHotUpdate(id: any) {
    const outputFiles = pluginConfig.map((config) => config.outputFile)
    if (outputFiles.find((file: string) => id.file.match(file))) return
    await _writeSw()
  },
  async writeBundle() {
    await _writeSw()
  },
})

export default TsServiceWorkers
