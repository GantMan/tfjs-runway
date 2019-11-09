
import { GluegunToolbox } from 'gluegun'
import {convertModel} from './convert-model'

  
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.convertModel = convertModel

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "tfjs-runway" property),
  // tfjs-runway.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig(process.cwd(), "tfjs-runway")
  // }
}
