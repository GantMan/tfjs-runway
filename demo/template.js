const nsfwjs = window.nsfwjs;
const Index = () => {
  const weightDataString = modelArtifactsJSON.weightData;

  // const buf = Buffer.from(weightDataString, 'base64');
  // const weightDataArrayBuffer = buf.buffer.slice(
  //   buf.byteOffset,
  //   buf.byteOffset + buf.byteLength
  // );

  const weightDataArrayBuffer = Uint8Array.from(atob(weightDataString), c =>
    c.charCodeAt(0)
  );

  const modelArtifacts = {
    ...modelArtifactsJSON,
    weightData: weightDataArrayBuffer,
  };
  console.log({ modelArtifacts });

  const ioHandler = {
    load: () =>
      new Promise((resolve, reject) => {
        try {
          resolve(modelArtifacts);
        } catch (e) {
          reject(e);
        }
      }),
  };
  console.log(ioHandler);

  const options = { size: 299 };
  nsfwjs.load(ioHandler, options).then(model => {
    const img = new Image();
    console.log('img', img);
    img.crossOrigin = 'anonymous';

    img.onload = function() {
      model.classify(img).then(predictions => {
        console.log('Predictions', predictions);
      });
    };

    img.src = 'https://i.imgur.com/Kwxetau.jpg';
  });
};

Index();
