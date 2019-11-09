import { GluegunCommand } from 'gluegun'
import * as fs from 'fs'

const command: GluegunCommand = {
  name: 'tfjs-runway',
  run: async toolbox => {
    const modelPath = toolbox.parameters.first
    const appPath = toolbox.parameters.second

    toolbox.convertModel(modelPath)

    let artifactData = fs.readFileSync('./model-artifacts.json')
    let artifactsString = artifactData.toString().replace('"', '\\"')

    let data = fs.readFileSync(appPath)
    let fd = fs.openSync(appPath, 'w+')
    let buffer = new Buffer(artifactsString)

    fs.writeSync(fd, buffer, 0, buffer.length, 0)
    fs.writeSync(fd, data, 0, data.length, buffer.length)
    fs.closeSync(fd)
  }
}

module.exports = command
