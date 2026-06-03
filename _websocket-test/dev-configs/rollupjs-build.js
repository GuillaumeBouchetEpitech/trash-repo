import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import * as fs from 'fs';

//
//
//

const _isShader = (filename) => (
  filename.indexOf("glsl.vert") >= 0 ||
  filename.indexOf("glsl.frag") >= 0
);

const _handleGlslFilesPlugin = {
  name: "bundle-glsl-files",
  transform(code, id) {
    if (!_isShader(id)) {
      return;
    }
    return {
      code: `export default \`${code}\`.trim();`,
      map: { mappings: "" }
    };
  }
};

//
//
//

export const asyncBuild = async ({
  name,
  tsConfigFilePath,
  inputFilePath,
  outputFilePath,
  isRelease
}) => {

  console.log(` -> BUILDING ${name}`);
  const startTime = Date.now();

  const plugins = [
    typescript({ tsconfig: tsConfigFilePath }),
    commonjs(),
    nodeResolve(),
    json(),
    _handleGlslFilesPlugin
  ];

  if (isRelease) {
    plugins.push(terser({
      format: { comments: false },
      compress: { passes: 3 },
    }));
  }

  const inputOptions = {
    input: inputFilePath,
    plugins,
  };
  const outputOptions = {
    file: outputFilePath,
    format: 'es',
  };

  let bundle;
  let buildFailed = false;
  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch (error) {
    buildFailed = true;
    console.log('ERROR.result', error);
  } finally {
    if (bundle) {
      await bundle.close();
    }
  }

  if (buildFailed) {
    return;
  }

  const endTime = Date.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(3);

  console.log(`    -> BUILT ${name} (${elapsedTime}sec)`);
  const statData = fs.statSync(outputFilePath);
  console.log(`      -> SIZE ${Math.ceil(statData.size / 1024)}ko`);
}
