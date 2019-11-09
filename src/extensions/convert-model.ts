const fs = require('fs')

const concat = buffers => {
  let totalByteLength = 0
  buffers.forEach(buffer => {
    totalByteLength += buffer.byteLength
  })

  const temp = new Uint8Array(totalByteLength)
  let offset = 0
  buffers.forEach(buffer => {
    temp.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  })
  return temp.buffer
}

const loadAll = weightsFilePaths => {
  const shardBuffers = []
  for (let i = 0; i < weightsFilePaths.length; i++) {
    const f = weightsFilePaths[i]
    const g = fs.readFileSync(f)

    shardBuffers.push(g)
  }
  return shardBuffers
}

export const convertModel = modelPath => {
  const modelConfigFile = fs.readFileSync('${modelPath}/model.json')
  const modelConfig = JSON.parse(modelConfigFile)
  const modelTopology = modelConfig['modelTopology']
  const weightsManifest = modelConfig['weightsManifest']
  const weightSpecs = []

  // We do not allow both modelTopology and weightsManifest to be missing.
  if (modelTopology == null && weightsManifest == null) {
    throw new Error(
      `The JSON from contains neither model ` +
        `topology or manifest for weights.`
    )
  }

  for (const entry of weightsManifest) {
    weightSpecs.push(...entry.weights)
  }

  const shardPaths = []
  weightsManifest.forEach(weightsGroup => {
    weightsGroup.paths.forEach(path => {
      shardPaths.push('../model/' + path)
    })
  })

  const arrayBuffers = loadAll(shardPaths)
  const monobuffer = concat(arrayBuffers)

  const weightDataString64 = Buffer.from(monobuffer).toString('base64')

  const modelArtifacts = {
    modelTopology: modelTopology,
    weightSpecs: weightSpecs,
    weightData: weightDataString64
  }
  const modelArtifactsJSON = JSON.stringify(modelArtifacts)

  fs.writeFile('model-artifacts.json', modelArtifactsJSON, err => {
    console.error(err)
  })
}
