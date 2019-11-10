import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'tfjs-runway',
  run: async toolbox => {
    const { filesystem: fs, runway } = toolbox
    const modelPath = toolbox.parameters.first
    const templatePath = toolbox.parameters.second
    const output = 'index.js'

    runway.convertModel(modelPath)

    let artifactData = fs.read('./model-artifacts.json')
    let artifactsString = artifactData.toString().replace('"', '\\"')
    const artifactImport = `const modelArtifactsJSON = JSON.parse(${artifactsString})`

    let data = fs.read(templatePath)
    fs.write(output, '')
    fs.append(output, artifactImport)
    fs.append(output, data)
  }
}

module.exports = command
