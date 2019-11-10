# TFJS Runway Demo App

Directory structure:
```
.
├── README.md
├── _nsfwjs_model
│   ├── group1-shard1of6
│   ├── group1-shard2of6
│   ├── group1-shard3of6
│   ├── group1-shard4of6
│   ├── group1-shard5of6
│   ├── group1-shard6of6
│   └── model.json
├── index.html
└── template.js

1 directory, 10 files
```
To inject the model into the project, ready for use, run this command from
the demo directory (with TFJS Runway installed):

`tfjs-runway ./_nsfwjs_model ./template.js`

Then just open `./index.html` and open the [dev console](https://developers.google.com/web/tools/chrome-devtools/open) to see the predictions!

This will convert the all the information about the model to a string,
and it will make that string available in your code as `modelArtifactsJSON`. The first argument is
the path of the model file, and the second is the path of your app's JS. TFJS Runway
will create a new file, `index.js`, containing the code from `template.js` with the
addition of `modelArtifactsJSON`.

This example app uses the [NSFWJS](https://github.com/infinitered/nsfwjs) model
to categorize images according to "work-appropriateness", so to speak. The model
consists of a `model.json` file, which defines the structure of the neural network,
and a set of files encoding the weight data, the actual learnin' done during training.