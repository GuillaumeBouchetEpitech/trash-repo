
import * as fs from 'fs';
import * as path from 'path';

//
//
//

const GlslFilesLoaderPlugin = {
  name: "GLSL Loader",
  setup(build) {
    build.onLoad({ filter: /\.glsl\.(?:frag|vert)$/ }, ({ path }) => {

      const fileContent = fs.readFileSync(path, { encoding: "utf8" });

      const lines = fileContent
        .split("\n")
        // .map(line => line.trim())
        // .filter(line => line.replace(/(.*?)\/\/.*/, "$1"))
        // .filter(line => line.length > 0)
        ;

      const contents = `export default \`${lines.join('\n')}\`.trim();`;

      return { contents, loader: "js" };
    });
  },
};

export const asyncBuild = async ({
  target,
  name,
  // tsConfigFilePath,
  inputFilePath,
  outputFilePath,
  isRelease
}) => {

  console.log(` -> BUILDING ${name}`);
  const startTime = Date.now();

  const config = {
    entrypoints: [inputFilePath],
    outdir: '.',
    target,
    format: "esm",
    root: path.dirname(inputFilePath),
    naming: outputFilePath,
    plugins: [GlslFilesLoaderPlugin],
  };

  if (isRelease) {
    config.minify = {
      whitespace: true,
      identifiers: true,
      syntax: true,
    }
  } else {
    config.sourcemap = "inline";
  }

  const result = await Bun.build(config);

  if (!result || result.success === false) {
    console.log('ERROR.result', result);
    return;
  }

  const endTime = Date.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(3);

  console.log(`    -> BUILT ${name} (${elapsedTime}sec)`);
  const statData = fs.statSync(outputFilePath);
  console.log(`      -> SIZE ${Math.ceil(statData.size / 1024)}ko`);
};

