import { GluegunCommand } from 'gluegun'
import { readFileSync } from 'fs'

const command: GluegunCommand = {
  name: 'tfjs-runway',
  run: async toolbox => {
    const modelPath = toolbox.parameters.first

    let modelArtifacts = readFileSync('./model-artifacts.json')
    let modelArtifactsString = modelArtifacts.toString()
    modelArtifactsString.replace('\"', '\\\"')
    toolbox.convertModel()

    await toolbox.template.generate({
      template: 'index.ejs',
      target: `index.js`,
      props: { modelPath }
    })
  }
}

module.exports = command
