
import { asyncBuild as fastUnsafeLargerAsyncBuild } from "./bunjs-build"
import { asyncBuild as slowSafeSmallerAsyncBuild } from "./rollupjs-build"
import * as fs from 'fs';

const _getBuildOptions = () => {
  const buildOptionsRegex = /build-(fast|safe)-(debug|release)/;

  // start at 2 (since 0 is "bun", and 1 is "bun-build.js")
  for (let ii = 2; ii < process.argv.length; ++ii) {
    const capture = buildOptionsRegex.exec(process.argv[ii]);
    if (!capture) {
      continue;
    }

    return {
      isFast: capture[1] === 'fast',
      isRelease: capture[2] === 'release'
    };
  }

  throw new Error('missing build options argument, stopping now');
};

const {isFast, isRelease} = _getBuildOptions();

const bundlerMethod = isFast ? fastUnsafeLargerAsyncBuild : slowSafeSmallerAsyncBuild;

const asyncRun = async () => {
  await Promise.all([
    bundlerMethod({
      target: "browser",
      name: 'client',
      tsConfigFilePath: `./tsconfig.json`,
      inputFilePath: `./src/client/client.ts`,
      outputFilePath: `./dist/client/bundle.js`,
      isRelease
    }),
    bundlerMethod({
      target: "node",
      name: 'server',
      tsConfigFilePath: `./tsconfig.json`,
      inputFilePath: `./src/server/server.ts`,
      outputFilePath: `./dist/server/server.js`,
      isRelease
    }),
  ]);
};
asyncRun();

if (fs.existsSync('./dist/client/index.html')) {
  fs.unlinkSync('./dist/client/index.html');
}
fs.copyFileSync('./src/client/index.html', './dist/client/index.html', 0);

