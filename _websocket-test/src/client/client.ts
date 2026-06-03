import { WebApplication } from './web-application/WebApplication';

let g_hasErrored = false;

const _queryDomElement = <T extends HTMLElement>(select: string): T => {
  const domElement = document.querySelector<T>(select);
  if (!domElement) {
    throw new Error(`dome element not found "${select}"`);
  }
  return domElement;
};

const onPageLoad = async () => {
  //
  //
  // INITIALIZE LOGGER

  const loggerOutput = _queryDomElement<HTMLTextAreaElement>('#logger-output');
  const mainCanvas = _queryDomElement<HTMLCanvasElement>('#main-canvas');

  const _log = (...args: any) => {
    loggerOutput.value += `${new Date().toISOString()} ${args.join(' ')}\n`;
    loggerOutput.scrollTop = loggerOutput.scrollHeight;
  };

  loggerOutput.value = ''; // reset browser cache

  if (!window.WebSocket) {
    g_hasErrored = true;
    _log("Sorry, but your browser doesn't support WebSockets.");
    return;
  }

  //
  //
  // INITIALIZE APPLICATION

  const app = new WebApplication(mainCanvas, loggerOutput);

  try {
    await app.initialize();
    _log('done')
  } catch (err: any) {
    _log(`error while initializing, msg: "${err?.message}"`);
  }

  _log('render')

  // main loop
  const tick = () => {
    window.setTimeout(tick, 1000/60); // 60fps

    const elapsedTime = 1/60; // TODO

    app.update(elapsedTime);
    app.render();
  };
  tick();

};

window.addEventListener('load', onPageLoad);
