var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// projects/local-framework/system/index.ts
var exports_system = {};
__export(exports_system, {
  metrics: () => exports_metrics,
  math: () => exports_math,
  controllers: () => exports_controllers,
  browser: () => exports_browser
});

// projects/local-framework/system/browser/index.ts
var exports_browser = {};
__export(exports_browser, {
  isWebWorkerSupported: () => isWebWorkerSupported,
  isWebGL2Supported: () => isWebGL2Supported,
  isNumber: () => isNumber,
  isLetter: () => isLetter,
  isAlphanumeric: () => isAlphanumeric,
  GlobalVisibilityManager: () => GlobalVisibilityManager,
  GlobalTouchManager: () => GlobalTouchManager,
  GlobalPointerLockManager: () => GlobalPointerLockManager,
  GlobalMouseManager: () => GlobalMouseManager,
  GlobalKeyboardManager: () => GlobalKeyboardManager,
  GlobalFullScreenManager: () => GlobalFullScreenManager,
  AllKeyCodes: () => AllKeyCodes
});

// projects/local-framework/system/browser/FullScreenManager.ts
var allRequestEvents = [
  "requestFullscreen",
  "webkitRequestFullscreen",
  "mozRequestFullScreen",
  "msRequestFullscreen"
];
var allChangeEvents = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "msfullscreenchange"
];

class FullScreenManager {
  _onFullScreenChangeCallbacks = [];
  _isInitialized = false;
  _initialize() {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
    const onLockChange = () => {
      this._onFullScreenChangeCallbacks.forEach((callback) => callback());
    };
    for (const currEvent of allChangeEvents)
      document.addEventListener(currEvent, onLockChange, false);
  }
  isCompatible(inTargetElement) {
    for (const currEvent of allRequestEvents) {
      if (currEvent in inTargetElement) {
        return true;
      }
    }
    return false;
  }
  isFullScreen(inTargetElement) {
    return document.fullscreenElement === inTargetElement;
  }
  async requestFullScreen(inTargetElement) {
    if (this.isFullScreen(inTargetElement)) {
      return { success: false, message: "element already in full screen" };
    }
    this._initialize();
    for (const currEvent of allRequestEvents) {
      if (currEvent in inTargetElement) {
        inTargetElement[currEvent]();
        return { success: true, message: "request for full screen done" };
      }
    }
    return { success: false, message: "unsupported request for full screen" };
  }
  addOnFullScreenChange(inCallback) {
    this._onFullScreenChangeCallbacks.push(inCallback);
  }
  removeOnFullScreenChange(inCallback) {
    const index = this._onFullScreenChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onFullScreenChangeCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onFullScreenChangeCallbacks.length = 0;
  }
}
var GlobalFullScreenManager = new FullScreenManager;
// projects/local-framework/system/browser/KeyCodes.ts
var AllKeyCodes = {
  Num0: 48,
  Num1: 49,
  Num2: 50,
  Num3: 51,
  Num4: 52,
  Num5: 53,
  Num6: 54,
  Num7: 55,
  Num8: 56,
  Num9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  Semicolon: 186,
  Equal: 187,
  Comma: 188,
  Minus: 189,
  Period: 190,
  BackQuote: 192,
  BracketLeft: 219,
  Backslash: 220,
  BracketRight: 221,
  Quote: 222,
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  CapsLock: 20,
  Tab: 9,
  Enter: 13,
  Pause: 19,
  Escape: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  PrintScreen: 44,
  Insert: 45,
  Delete: 46,
  ContextMenu: 93,
  ScrollLock: 145,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  F13: 124,
  F14: 125,
  F15: 126,
  F16: 127,
  F17: 128,
  F18: 129,
  F19: 130,
  F20: 131,
  F21: 132,
  F22: 133,
  F23: 134,
  F24: 135,
  NumPad0: 96,
  NumPad1: 97,
  NumPad2: 98,
  NumPad3: 99,
  NumPad4: 100,
  NumPad5: 101,
  NumPad6: 102,
  NumPad7: 103,
  NumPad8: 104,
  NumPad9: 105,
  NumPadMultiply: 106,
  NumPadAdd: 107,
  NumPadSubtract: 109,
  NumPadDecimal: 110,
  NumPadDivide: 111,
  NumLock: 144,
  NumPadComma: 194,
  NumPadEqual: 12
};
var isLetter = (key) => {
  return key >= AllKeyCodes.A && key <= AllKeyCodes.Z;
};
var isNumber = (key) => {
  return key >= AllKeyCodes.Num0 && key <= AllKeyCodes.Num9 || key >= AllKeyCodes.NumPad0 && key <= AllKeyCodes.NumPad9;
};
var isAlphanumeric = (key) => {
  return isNumber(key) || isLetter(key);
};

// projects/local-framework/system/browser/KeyboardManager.ts
class KeyboardManager {
  _pressedKeysSet = new Set;
  _preventDefaultKeysSet = new Set;
  _activated = false;
  _handleKeyDown;
  _handleKeyUp;
  constructor() {
    const handleKeyDown = (event) => {
      const { keyCode } = event;
      if (this._preventDefaultKeysSet.has(keyCode))
        event.preventDefault();
      this._pressedKeysSet.add(keyCode);
    };
    const handleKeyUp = (event) => {
      const { keyCode } = event;
      if (this._preventDefaultKeysSet.has(keyCode))
        event.preventDefault();
      this._pressedKeysSet.delete(keyCode);
    };
    this._activated = false;
    this._handleKeyDown = handleKeyDown.bind(this);
    this._handleKeyUp = handleKeyUp.bind(this);
  }
  isPressed(...inKeys) {
    for (const key of inKeys) {
      if (this._pressedKeysSet.has(AllKeyCodes[key])) {
        return true;
      }
    }
    return false;
  }
  preventDefault(inKey) {
    this._preventDefaultKeysSet.add(AllKeyCodes[inKey]);
  }
  enableDefault(inKey) {
    this._preventDefaultKeysSet.delete(AllKeyCodes[inKey]);
  }
  activate() {
    if (this._activated) {
      return;
    }
    this._pressedKeysSet.clear();
    document.addEventListener("keydown", this._handleKeyDown);
    document.addEventListener("keyup", this._handleKeyUp);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    this._pressedKeysSet.clear();
    document.removeEventListener("keydown", this._handleKeyDown);
    document.removeEventListener("keyup", this._handleKeyUp);
    this._activated = false;
  }
}
var GlobalKeyboardManager = new KeyboardManager;
// projects/local-framework/system/browser/MouseManager.ts
var AllMouseButtons = {
  Left: 0,
  Middle: 1,
  Right: 2
};

class MouseManager {
  _pressedButtonsSet = new Set;
  _activated = false;
  _handleMouseDown;
  _handleMouseUp;
  _handleMouseMove;
  _deltaX = 0;
  _deltaY = 0;
  constructor() {
    const handleMouseDown = (event) => {
      this._pressedButtonsSet.add(event.button);
    };
    const handleMouseUp = (event) => {
      this._pressedButtonsSet.delete(event.button);
    };
    const handleMouseMove = (event) => {
      this._deltaX += event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this._deltaY += event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    };
    this._activated = false;
    this._handleMouseDown = handleMouseDown.bind(this);
    this._handleMouseUp = handleMouseUp.bind(this);
    this._handleMouseMove = handleMouseMove.bind(this);
  }
  activate() {
    if (this._activated) {
      return;
    }
    this._pressedButtonsSet.clear();
    document.addEventListener("mousedown", this._handleMouseDown);
    document.addEventListener("mouseup", this._handleMouseUp);
    document.addEventListener("mousemove", this._handleMouseMove);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    this._pressedButtonsSet.clear();
    document.removeEventListener("mousedown", this._handleMouseDown);
    document.removeEventListener("mouseup", this._handleMouseUp);
    document.removeEventListener("mousemove", this._handleMouseMove);
    this._activated = false;
  }
  isButtonPressed(inKey) {
    return this._pressedButtonsSet.has(AllMouseButtons[inKey]);
  }
  deltaX() {
    return this._deltaX;
  }
  deltaY() {
    return this._deltaY;
  }
  resetDeltas() {
    this._deltaX = 0;
    this._deltaY = 0;
  }
}
var GlobalMouseManager = new MouseManager;
// projects/local-framework/system/browser/PointerLockManager.ts
var allRequestEvents2 = [
  "requestPointerLock",
  "mozRequestPointerLock",
  "webkitRequestPointerLock"
];
var allExitEvents = [
  "exitPointerLock",
  "mozExitPointerLock",
  "webkitExitPointerLock"
];
var allStateEvents = [
  "pointerLockElement",
  "mozPointerLockElement",
  "webkitPointerLockElement"
];
var allChangeEvents2 = [
  { methodName: "onpointerlockchange", propertyName: "pointerlockchange" },
  {
    methodName: "onmozpointerlockchange",
    propertyName: "mozpointerlockchange"
  },
  {
    methodName: "onwebkitpointerlockchange",
    propertyName: "webkitpointerlockchange"
  }
];
var allErrorEvents = [
  { methodName: "onpointerlockerror", propertyName: "pointerlockerror" },
  { methodName: "onmozpointerlockerror", propertyName: "mozpointerlockerror" },
  {
    methodName: "onwebkitpointerlockerror",
    propertyName: "webkitpointerlockerror"
  }
];

class PointerLockManager {
  _onLockChangeCallbacks = [];
  _onLockErrorCallbacks = [];
  _timeSinceLastLockChange = 0;
  _latestRequestHtmlElement;
  _isInitialized = false;
  _initialize() {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
    const onLockChange = () => {
      this._timeSinceLastLockChange = Date.now();
      this._onLockChangeCallbacks.forEach((callback) => callback());
    };
    const onLockError = (event) => {
      this._timeSinceLastLockChange = Date.now();
      this._onLockErrorCallbacks.forEach((callback) => callback(event));
    };
    for (const currEvent of allChangeEvents2) {
      if (currEvent.methodName in document) {
        document.addEventListener(currEvent.propertyName, onLockChange, false);
        break;
      }
    }
    for (const currEvent of allErrorEvents) {
      if (currEvent.methodName in document) {
        document.addEventListener(currEvent.propertyName, onLockError, false);
        break;
      }
    }
  }
  canBePointerLocked(inTargetElement) {
    for (const currEvent of allRequestEvents2) {
      if (currEvent in inTargetElement) {
        return true;
      }
    }
    return false;
  }
  isPointerLocked(inTargetElement) {
    for (const currEvent of allStateEvents) {
      if (currEvent in document) {
        return document[currEvent] === inTargetElement;
      }
    }
    return false;
  }
  async requestPointerLock(inTargetElement) {
    if (this.isPointerLocked(inTargetElement)) {
      return { success: false, message: "element already locked" };
    }
    this._initialize();
    if (this._timeSinceLastLockChange > 0) {
      const elapsedSecTime = (Date.now() - this._timeSinceLastLockChange) / 1000;
      if (elapsedSecTime < 1.1) {
        return {
          success: false,
          message: `request for lock was too early, time to wait: ${elapsedSecTime.toFixed(2)}sec`
        };
      }
    }
    this._timeSinceLastLockChange = Date.now();
    for (const currEvent of allRequestEvents2) {
      if (currEvent in inTargetElement) {
        const options = {
          unadjustedMovement: false
        };
        try {
          await inTargetElement[currEvent](options);
        } catch (err) {
          const elapsedSecTime = (Date.now() - this._timeSinceLastLockChange) / 1000;
          return {
            success: false,
            message: `request for lock was too early, time to wait: ${elapsedSecTime.toFixed(2)}sec`
          };
        }
        this._timeSinceLastLockChange = Date.now();
        return { success: true, message: "request for lock done" };
      }
    }
    return { success: false, message: "unsupported request for lock" };
  }
  allowPointerLockedOnClickEvent(inTargetElement) {
    if (inTargetElement === this._latestRequestHtmlElement) {
      return;
    }
    this._latestRequestHtmlElement = inTargetElement;
    const onClick = async () => {
      inTargetElement.removeEventListener("click", onClick);
      const result = await this.requestPointerLock(inTargetElement);
      this._latestRequestHtmlElement = undefined;
      if (!result.success) {
        this.allowPointerLockedOnClickEvent(inTargetElement);
      }
    };
    inTargetElement.addEventListener("click", onClick);
  }
  exitPointerLock() {
    for (const currEvent of allExitEvents) {
      if (currEvent in document) {
        document[currEvent]();
        break;
      }
    }
  }
  addOnLockChange(inCallback) {
    this._onLockChangeCallbacks.push(inCallback);
  }
  removeOnLockChange(inCallback) {
    const index = this._onLockChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onLockChangeCallbacks.splice(index, 1);
  }
  addOnLockError(inCallback) {
    this._onLockErrorCallbacks.push(inCallback);
  }
  removeOnLockError(inCallback) {
    const index = this._onLockErrorCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onLockErrorCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onLockChangeCallbacks.length = 0;
    this._onLockErrorCallbacks.length = 0;
  }
}
var GlobalPointerLockManager = new PointerLockManager;
// projects/local-framework/system/browser/TouchManager.ts
class TouchData {
  id;
  createdAt = Date.now();
  positionX;
  positionY;
  deltaX = 0;
  deltaY = 0;
  constructor(id, positionX, positionY) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
  }
  resetDelta() {
    this.deltaX = 0;
    this.deltaY = 0;
  }
}

class TouchManager {
  _activated = false;
  _allTouchDataMap = new Map;
  _allCachedTouchDataArray = [];
  _handleTouchStart;
  _handleTouchEnd;
  _handleTouchMove;
  constructor() {
    const handleTouchStart = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier, pageX, pageY } = event.changedTouches[ii];
        const newData = new TouchData(identifier, pageX, pageY);
        this._allTouchDataMap.set(`${identifier}`, newData);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchEnd = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier } = event.changedTouches[ii];
        this._allTouchDataMap.delete(`${identifier}`);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchMove = (event) => {
      event.preventDefault();
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier, pageX, pageY } = event.changedTouches[ii];
        const currData = this._allTouchDataMap.get(`${identifier}`);
        if (!currData) {
          continue;
        }
        const deltaX = pageX - currData.positionX;
        const deltaY = pageY - currData.positionY;
        currData.deltaX += deltaX;
        currData.deltaY += deltaY;
        currData.positionX = pageX;
        currData.positionY = pageY;
      }
    };
    this._activated = false;
    this._handleTouchStart = handleTouchStart.bind(this);
    this._handleTouchEnd = handleTouchEnd.bind(this);
    this._handleTouchMove = handleTouchMove.bind(this);
  }
  isSupported(inTargetElement) {
    return "ontouchstart" in inTargetElement;
  }
  activate(inTargetElement) {
    if (!this.isSupported(inTargetElement)) {
      return;
    }
    if (this._activated) {
      return;
    }
    this._allTouchDataMap.clear();
    this._allCachedTouchDataArray.length = 0;
    inTargetElement.addEventListener("touchstart", this._handleTouchStart);
    inTargetElement.addEventListener("touchend", this._handleTouchEnd);
    inTargetElement.addEventListener("touchcancel", this._handleTouchEnd);
    inTargetElement.addEventListener("touchmove", this._handleTouchMove, {
      passive: false
    });
    this._activated = true;
  }
  deactivate(inTargetElement) {
    if (!this._activated) {
      return;
    }
    this._allTouchDataMap.clear();
    this._allCachedTouchDataArray.length = 0;
    inTargetElement.removeEventListener("touchstart", this._handleTouchStart);
    inTargetElement.removeEventListener("touchend", this._handleTouchEnd);
    inTargetElement.removeEventListener("touchcancel", this._handleTouchEnd);
    inTargetElement.removeEventListener("touchmove", this._handleTouchMove);
    this._activated = false;
  }
  _refreshCache() {
    if (this._allCachedTouchDataArray.length === 0) {
      this._allCachedTouchDataArray = [...this._allTouchDataMap.values()];
    }
  }
  getTouchData() {
    this._refreshCache();
    return this._allCachedTouchDataArray;
  }
  resetDeltas() {
    this._refreshCache();
    this._allCachedTouchDataArray.forEach((item) => item.resetDelta());
  }
}
var GlobalTouchManager = new TouchManager;
// projects/local-framework/system/browser/VisibilityManager.ts
class VisibilityManager {
  _activated = false;
  _onVisibilityChangeCallbacks = [];
  _handleVisibilityChange;
  constructor() {
    const handleVisibilityChange = () => {
      const isVisible = this.isVisible();
      this._onVisibilityChangeCallbacks.forEach((callback) => callback(isVisible));
    };
    this._handleVisibilityChange = handleVisibilityChange.bind(this);
  }
  activate() {
    if (!this.isSupported()) {
      return;
    }
    if (this._activated) {
      return;
    }
    document.addEventListener("visibilitychange", this._handleVisibilityChange, false);
    this._activated = true;
  }
  deactivate() {
    if (!this._activated) {
      return;
    }
    document.removeEventListener("visibilitychange", this._handleVisibilityChange, false);
    this._activated = false;
  }
  isSupported() {
    return "onvisibilitychange" in document;
  }
  isVisible() {
    return document.visibilityState === "visible";
  }
  addVisibilityChange(inCallback) {
    this._onVisibilityChangeCallbacks.push(inCallback);
  }
  removeVisibilityChange(inCallback) {
    const index = this._onVisibilityChangeCallbacks.indexOf(inCallback);
    if (index < 0) {
      return;
    }
    this._onVisibilityChangeCallbacks.splice(index, 1);
  }
  removeAllCallbacks() {
    this._onVisibilityChangeCallbacks.length = 0;
  }
}
var GlobalVisibilityManager = new VisibilityManager;
// projects/local-framework/system/browser/isWebWorkerSupported.ts
var isWebWorkerSupported = () => {
  return !!window.Worker;
};
// projects/local-framework/system/browser/isWebGL2Supported.ts
var isWebGL2Supported = () => {
  return !!window.WebGL2RenderingContext;
};
// projects/local-framework/system/metrics/index.ts
var exports_metrics = {};
__export(exports_metrics, {
  FrameProfiler: () => FrameProfiler
});

// projects/local-framework/system/metrics/FrameProfiler.ts
class FrameProfiler {
  _framesDelta = [];
  _averageDelta = 0;
  _minDelta = 0;
  _maxDelta = 0;
  pushDelta(inDelta) {
    if (this._framesDelta.length >= 100) {
      this._framesDelta.shift();
    }
    this._framesDelta.push(inDelta);
    this._minDelta = 999999999;
    this._maxDelta = -999999999;
    this._averageDelta = 0;
    for (const currDelta of this._framesDelta) {
      this._minDelta = Math.min(this._minDelta, currDelta);
      this._maxDelta = Math.max(this._maxDelta, currDelta);
      this._averageDelta += currDelta;
    }
    this._averageDelta /= this._framesDelta.length;
  }
  get framesDelta() {
    return this._framesDelta;
  }
  get averageDelta() {
    return this._averageDelta;
  }
  get minDelta() {
    return this._minDelta;
  }
  get maxDelta() {
    return this._maxDelta;
  }
}
// projects/local-framework/system/controllers/index.ts
var exports_controllers = {};
__export(exports_controllers, {
  FreeFlyController: () => FreeFlyController
});

// node_modules/gl-matrix/esm/common.js
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// node_modules/gl-matrix/esm/mat3.js
var exports_mat3 = {};
__export(exports_mat3, {
  transpose: () => transpose,
  translate: () => translate,
  subtract: () => subtract,
  sub: () => sub,
  str: () => str,
  set: () => set,
  scale: () => scale,
  rotate: () => rotate,
  projection: () => projection,
  normalFromMat4: () => normalFromMat4,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  multiplyScalar: () => multiplyScalar,
  multiply: () => multiply,
  mul: () => mul,
  invert: () => invert,
  identity: () => identity,
  fromValues: () => fromValues,
  fromTranslation: () => fromTranslation,
  fromScaling: () => fromScaling,
  fromRotation: () => fromRotation,
  fromQuat: () => fromQuat,
  fromMat4: () => fromMat4,
  fromMat2d: () => fromMat2d,
  frob: () => frob,
  exactEquals: () => exactEquals,
  equals: () => equals,
  determinant: () => determinant,
  create: () => create,
  copy: () => copy,
  clone: () => clone,
  adjoint: () => adjoint,
  add: () => add
});
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  out[6] = a[6] + b[6] * scale2;
  out[7] = a[7] + b[7] * scale2;
  out[8] = a[8] + b[8] * scale2;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/mat4.js
var exports_mat4 = {};
__export(exports_mat4, {
  transpose: () => transpose2,
  translate: () => translate2,
  targetTo: () => targetTo,
  subtract: () => subtract2,
  sub: () => sub2,
  str: () => str2,
  set: () => set2,
  scale: () => scale2,
  rotateZ: () => rotateZ,
  rotateY: () => rotateY,
  rotateX: () => rotateX,
  rotate: () => rotate2,
  perspectiveZO: () => perspectiveZO,
  perspectiveNO: () => perspectiveNO,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspective: () => perspective,
  orthoZO: () => orthoZO,
  orthoNO: () => orthoNO,
  ortho: () => ortho,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd2,
  multiplyScalar: () => multiplyScalar2,
  multiply: () => multiply2,
  mul: () => mul2,
  lookAt: () => lookAt,
  invert: () => invert2,
  identity: () => identity2,
  getTranslation: () => getTranslation,
  getScaling: () => getScaling,
  getRotation: () => getRotation,
  frustum: () => frustum,
  fromZRotation: () => fromZRotation,
  fromYRotation: () => fromYRotation,
  fromXRotation: () => fromXRotation,
  fromValues: () => fromValues2,
  fromTranslation: () => fromTranslation2,
  fromScaling: () => fromScaling2,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotation: () => fromRotation2,
  fromQuat2: () => fromQuat2,
  fromQuat: () => fromQuat3,
  frob: () => frob2,
  exactEquals: () => exactEquals2,
  equals: () => equals2,
  determinant: () => determinant2,
  create: () => create2,
  copy: () => copy2,
  clone: () => clone2,
  adjoint: () => adjoint2,
  add: () => add2
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity2(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose2(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant2(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply2(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate2(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation2(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat3(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity2(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str2(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd2(out, a, b, scale3) {
  out[0] = a[0] + b[0] * scale3;
  out[1] = a[1] + b[1] * scale3;
  out[2] = a[2] + b[2] * scale3;
  out[3] = a[3] + b[3] * scale3;
  out[4] = a[4] + b[4] * scale3;
  out[5] = a[5] + b[5] * scale3;
  out[6] = a[6] + b[6] * scale3;
  out[7] = a[7] + b[7] * scale3;
  out[8] = a[8] + b[8] * scale3;
  out[9] = a[9] + b[9] * scale3;
  out[10] = a[10] + b[10] * scale3;
  out[11] = a[11] + b[11] * scale3;
  out[12] = a[12] + b[12] * scale3;
  out[13] = a[13] + b[13] * scale3;
  out[14] = a[14] + b[14] * scale3;
  out[15] = a[15] + b[15] * scale3;
  return out;
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul2 = multiply2;
var sub2 = subtract2;

// node_modules/gl-matrix/esm/quat.js
var exports_quat = {};
__export(exports_quat, {
  str: () => str5,
  squaredLength: () => squaredLength3,
  sqrLen: () => sqrLen3,
  sqlerp: () => sqlerp,
  slerp: () => slerp,
  setAxisAngle: () => setAxisAngle,
  setAxes: () => setAxes,
  set: () => set5,
  scale: () => scale5,
  rotationTo: () => rotationTo,
  rotateZ: () => rotateZ3,
  rotateY: () => rotateY3,
  rotateX: () => rotateX3,
  random: () => random3,
  pow: () => pow,
  normalize: () => normalize3,
  multiply: () => multiply5,
  mul: () => mul5,
  ln: () => ln,
  lerp: () => lerp3,
  length: () => length3,
  len: () => len3,
  invert: () => invert3,
  identity: () => identity3,
  getAxisAngle: () => getAxisAngle,
  getAngle: () => getAngle,
  fromValues: () => fromValues5,
  fromMat3: () => fromMat3,
  fromEuler: () => fromEuler,
  exp: () => exp,
  exactEquals: () => exactEquals5,
  equals: () => equals5,
  dot: () => dot3,
  create: () => create5,
  copy: () => copy5,
  conjugate: () => conjugate,
  clone: () => clone5,
  calculateW: () => calculateW,
  add: () => add5
});

// node_modules/gl-matrix/esm/vec3.js
var exports_vec3 = {};
__export(exports_vec3, {
  zero: () => zero,
  transformQuat: () => transformQuat,
  transformMat4: () => transformMat4,
  transformMat3: () => transformMat3,
  subtract: () => subtract3,
  sub: () => sub3,
  str: () => str3,
  squaredLength: () => squaredLength,
  squaredDistance: () => squaredDistance,
  sqrLen: () => sqrLen,
  sqrDist: () => sqrDist,
  set: () => set3,
  scaleAndAdd: () => scaleAndAdd,
  scale: () => scale3,
  round: () => round,
  rotateZ: () => rotateZ2,
  rotateY: () => rotateY2,
  rotateX: () => rotateX2,
  random: () => random,
  normalize: () => normalize,
  negate: () => negate,
  multiply: () => multiply3,
  mul: () => mul3,
  min: () => min,
  max: () => max,
  lerp: () => lerp,
  length: () => length,
  len: () => len,
  inverse: () => inverse,
  hermite: () => hermite,
  fromValues: () => fromValues3,
  forEach: () => forEach,
  floor: () => floor,
  exactEquals: () => exactEquals3,
  equals: () => equals3,
  dot: () => dot,
  divide: () => divide,
  div: () => div,
  distance: () => distance,
  dist: () => dist,
  cross: () => cross,
  create: () => create3,
  copy: () => copy3,
  clone: () => clone3,
  ceil: () => ceil,
  bezier: () => bezier,
  angle: () => angle,
  add: () => add3
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues3(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set3(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale4) {
  out[0] = a[0] + b[0] * scale4;
  out[1] = a[1] + b[1] * scale4;
  out[2] = a[2] + b[2] * scale4;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale4) {
  scale4 = scale4 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale4;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale4;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str3(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/vec4.js
var exports_vec4 = {};
__export(exports_vec4, {
  zero: () => zero2,
  transformQuat: () => transformQuat2,
  transformMat4: () => transformMat42,
  subtract: () => subtract4,
  sub: () => sub4,
  str: () => str4,
  squaredLength: () => squaredLength2,
  squaredDistance: () => squaredDistance2,
  sqrLen: () => sqrLen2,
  sqrDist: () => sqrDist2,
  set: () => set4,
  scaleAndAdd: () => scaleAndAdd2,
  scale: () => scale4,
  round: () => round2,
  random: () => random2,
  normalize: () => normalize2,
  negate: () => negate2,
  multiply: () => multiply4,
  mul: () => mul4,
  min: () => min2,
  max: () => max2,
  lerp: () => lerp2,
  length: () => length2,
  len: () => len2,
  inverse: () => inverse2,
  fromValues: () => fromValues4,
  forEach: () => forEach2,
  floor: () => floor2,
  exactEquals: () => exactEquals4,
  equals: () => equals4,
  dot: () => dot2,
  divide: () => divide2,
  div: () => div2,
  distance: () => distance2,
  dist: () => dist2,
  cross: () => cross2,
  create: () => create4,
  copy: () => copy4,
  clone: () => clone4,
  ceil: () => ceil2,
  add: () => add4
});
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone4(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues4(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set4(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
  out[2] = a[2] + b[2] * scale5;
  out[3] = a[3] + b[3] * scale5;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len2 = x * x + y * y + z * z + w * w;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = x * len2;
  out[1] = y * len2;
  out[2] = z * len2;
  out[3] = w * len2;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale5) {
  scale5 = scale5 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale5 * v1;
  out[1] = scale5 * v2;
  out[2] = scale5 * v3 * d;
  out[3] = scale5 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str4(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub4 = subtract4;
var mul4 = multiply4;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/quat.js
function create5() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity3(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply5(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale5(out, out, b);
  exp(out, out);
  return out;
}
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random3(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert3(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot3 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot3 ? 1 / dot3 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0])
      i = 1;
    if (m[8] > m[i * 3 + i])
      i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str5(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone5 = clone4;
var fromValues5 = fromValues4;
var copy5 = copy4;
var set5 = set4;
var add5 = add4;
var mul5 = multiply5;
var scale5 = scale4;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals5 = exactEquals4;
var equals5 = equals4;
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues3(1, 0, 0);
  var yUnitVec3 = fromValues3(0, 1, 0);
  return function(out, a, b) {
    var dot4 = dot(a, b);
    if (dot4 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001)
        cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot4 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot4;
      return normalize3(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create5();
  var temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
  var matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
}();

// node_modules/gl-matrix/esm/vec2.js
var exports_vec2 = {};
__export(exports_vec2, {
  zero: () => zero3,
  transformMat4: () => transformMat43,
  transformMat3: () => transformMat32,
  transformMat2d: () => transformMat2d,
  transformMat2: () => transformMat2,
  subtract: () => subtract5,
  sub: () => sub5,
  str: () => str6,
  squaredLength: () => squaredLength4,
  squaredDistance: () => squaredDistance3,
  sqrLen: () => sqrLen4,
  sqrDist: () => sqrDist3,
  set: () => set6,
  scaleAndAdd: () => scaleAndAdd3,
  scale: () => scale6,
  round: () => round3,
  rotate: () => rotate3,
  random: () => random4,
  normalize: () => normalize4,
  negate: () => negate3,
  multiply: () => multiply6,
  mul: () => mul6,
  min: () => min3,
  max: () => max3,
  lerp: () => lerp4,
  length: () => length4,
  len: () => len4,
  inverse: () => inverse3,
  fromValues: () => fromValues6,
  forEach: () => forEach3,
  floor: () => floor3,
  exactEquals: () => exactEquals6,
  equals: () => equals6,
  dot: () => dot4,
  divide: () => divide3,
  div: () => div3,
  distance: () => distance3,
  dist: () => dist3,
  cross: () => cross3,
  create: () => create6,
  copy: () => copy6,
  clone: () => clone6,
  ceil: () => ceil3,
  angle: () => angle2,
  add: () => add6
});
function create6() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone6(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues6(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy6(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set6(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add6(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply6(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil3(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor3(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round3(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale6(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length4(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength4(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse3(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize4(out, a) {
  var x = a[0], y = a[1];
  var len4 = x * x + y * y;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
  }
  out[0] = a[0] * len4;
  out[1] = a[1] * len4;
  return out;
}
function dot4(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp4(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random4(out, scale7) {
  scale7 = scale7 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale7;
  out[1] = Math.sin(r) * scale7;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat32(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat43(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate3(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str6(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals6(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals6(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len4 = length4;
var sub5 = subtract5;
var mul6 = multiply6;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen4 = squaredLength4;
var forEach3 = function() {
  var vec = create6();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset;i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
}();

// projects/local-framework/system/controllers/FreeFlyController.ts
var AllAxises = {
  X: 0,
  Y: 1,
  Z: 2
};

class FreeFlyController {
  _isActivated = false;
  _theta = 0;
  _phi = 0;
  _mouseSensibility;
  _keyboardSensibility;
  _touchSensibility;
  _movingSpeed;
  _touchWasActive = false;
  _touchStartTime = 0;
  _touchMoveForward = false;
  _axisIndices;
  _position = exports_vec3.fromValues(0, 0, 0);
  _target = exports_vec3.fromValues(0, 0, 0);
  _forwardAxis = exports_vec3.fromValues(1, 0, 0);
  _leftAxis = exports_vec3.fromValues(0, 0, 1);
  _upAxis = exports_vec3.fromValues(0, 1, 0);
  constructor(def) {
    this._mouseSensibility = def.mouseSensibility;
    this._keyboardSensibility = def.keyboardSensibility;
    this._touchSensibility = def.touchSensibility;
    this._movingSpeed = def.movingSpeed;
    exports_vec3.copy(this._position, def.position);
    this._axisIndices = [
      def.coordinates ? AllAxises[def.coordinates[0]] : AllAxises.X,
      def.coordinates ? AllAxises[def.coordinates[1]] : AllAxises.Y,
      def.coordinates ? AllAxises[def.coordinates[2]] : AllAxises.Z
    ];
    this._theta = def.theta;
    this._phi = def.phi;
  }
  isActivated() {
    return this._isActivated;
  }
  update(deltaMsTime) {
    let moveForward = false;
    let moveBackward = false;
    let strafeLeft = false;
    let strafeRight = false;
    let isRunning = false;
    let isDiving = false;
    let isRising = false;
    let lookDeltaX = 0;
    let lookDeltaY = 0;
    const toRadians = Math.PI / 180;
    {
      const deltaX = GlobalMouseManager.deltaX() * this._mouseSensibility;
      const deltaY = GlobalMouseManager.deltaY() * this._mouseSensibility;
      lookDeltaX -= deltaX * toRadians * deltaMsTime;
      lookDeltaY -= deltaY * toRadians * deltaMsTime;
    }
    const isTouched = GlobalTouchManager.getTouchData().length > 0;
    if (isTouched) {
      if (!this._touchWasActive) {
        const currTime = Date.now();
        const elapsed = (currTime - this._touchStartTime) / 1000;
        if (elapsed < 0.25) {
          this._touchMoveForward = true;
        } else {
          this._touchStartTime = currTime;
        }
      }
      const firstTouch = GlobalTouchManager.getTouchData()[0];
      const deltaX = firstTouch.deltaX * this._touchSensibility;
      const deltaY = firstTouch.deltaY * this._touchSensibility;
      lookDeltaX -= deltaX * toRadians * deltaMsTime;
      lookDeltaY -= deltaY * toRadians * deltaMsTime;
    } else {
      this._touchMoveForward = false;
    }
    this._touchWasActive = isTouched;
    if (this._touchMoveForward) {
      moveForward = true;
    }
    if (GlobalKeyboardManager.isPressed("Z", "W")) {
      moveForward = true;
    }
    if (GlobalKeyboardManager.isPressed("S")) {
      moveBackward = true;
    }
    if (GlobalKeyboardManager.isPressed("A", "Q")) {
      strafeLeft = true;
    }
    if (GlobalKeyboardManager.isPressed("D")) {
      strafeRight = true;
    }
    if (GlobalKeyboardManager.isPressed("Shift")) {
      isRunning = true;
    }
    if (GlobalKeyboardManager.isPressed("C")) {
      isDiving = true;
    }
    if (GlobalKeyboardManager.isPressed("Space")) {
      isRising = true;
    }
    const currentLinearSpeed = this._movingSpeed * (isRunning ? 4 : 1) * deltaMsTime;
    const scaledForward = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledForward, this._forwardAxis, currentLinearSpeed);
    const scaledLeft = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledLeft, this._leftAxis, currentLinearSpeed);
    const scaledUp = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledUp, this._upAxis, currentLinearSpeed);
    const currentAngularSpeed = this._keyboardSensibility * deltaMsTime;
    if (GlobalKeyboardManager.isPressed("ArrowUp")) {
      lookDeltaY += currentAngularSpeed;
    } else if (GlobalKeyboardManager.isPressed("ArrowDown")) {
      lookDeltaY -= currentAngularSpeed;
    }
    if (GlobalKeyboardManager.isPressed("ArrowLeft")) {
      lookDeltaX += currentAngularSpeed;
    } else if (GlobalKeyboardManager.isPressed("ArrowRight")) {
      lookDeltaX -= currentAngularSpeed;
    }
    this._theta += lookDeltaX;
    this._phi += lookDeltaY;
    const hPi = Math.PI * 0.5;
    const verticalLimit = hPi * 0.95;
    this._phi = Math.min(Math.max(this._phi, -verticalLimit), +verticalLimit);
    const cosTheta = Math.cos(this._theta);
    const sinTheta = Math.sin(this._theta);
    const [axisX, axisY, axisZ] = this._axisIndices;
    const upRadius = Math.cos(this._phi + hPi);
    this._upAxis[axisX] = upRadius * cosTheta;
    this._upAxis[axisY] = upRadius * sinTheta;
    this._upAxis[axisZ] = Math.sin(this._phi + hPi);
    const forwardRadius = Math.cos(this._phi);
    this._forwardAxis[axisX] = forwardRadius * cosTheta;
    this._forwardAxis[axisY] = forwardRadius * sinTheta;
    this._forwardAxis[axisZ] = Math.sin(this._phi);
    exports_vec3.cross(this._leftAxis, this._upAxis, this._forwardAxis);
    if (moveForward) {
      exports_vec3.add(this._position, this._position, scaledForward);
    } else if (moveBackward) {
      exports_vec3.sub(this._position, this._position, scaledForward);
    }
    if (strafeLeft) {
      exports_vec3.add(this._position, this._position, scaledLeft);
    } else if (strafeRight) {
      exports_vec3.sub(this._position, this._position, scaledLeft);
    }
    if (isRising) {
      exports_vec3.add(this._position, this._position, scaledUp);
    } else if (isDiving) {
      exports_vec3.sub(this._position, this._position, scaledUp);
    }
    exports_vec3.add(this._target, this._position, this._forwardAxis);
  }
  getPosition() {
    return this._position;
  }
  setPosition(inPos) {
    exports_vec3.copy(this._position, inPos);
  }
  getTarget() {
    return this._target;
  }
  getUpAxis() {
    return this._upAxis;
  }
  getTheta() {
    return this._theta;
  }
  getPhi() {
    return this._phi;
  }
  getTouchMoveForward() {
    return this._touchMoveForward;
  }
}
// projects/local-framework/system/math/index.ts
var exports_math = {};
__export(exports_math, {
  lerpVec3: () => lerpVec3,
  lerpVec2: () => lerpVec2,
  lerpQuat: () => lerpQuat,
  lerpFloat: () => lerpFloat,
  ik: () => exports_inverse_kinematic,
  easePinPong: () => easePinPong,
  easeOutElastic: () => easeOutElastic,
  easeOutBounce: () => easeOutBounce,
  easeInOutElastic: () => easeInOutElastic,
  easeInOutBounce: () => easeInOutBounce,
  easeInElastic: () => easeInElastic,
  easeInBounce: () => easeInBounce,
  easeClamp: () => easeClamp,
  clamp: () => clamp,
  GenericEasing: () => GenericEasing
});

// projects/local-framework/system/math/inverse-kinematic/index.ts
var exports_inverse_kinematic = {};
__export(exports_inverse_kinematic, {
  circleCircleIntersectionPoints: () => circleCircleIntersectionPoints,
  LimbData: () => LimbData
});

// projects/local-framework/system/math/inverse-kinematic/circleCircleIntersectionPoints.ts
var EPS = 0.0000001;
var _safeAcos = (x) => {
  if (x >= 1) {
    return 0;
  }
  if (x <= -1) {
    return Math.PI;
  }
  return Math.acos(x);
};
var _rotatePoint = (fp, pt, a) => {
  const x = pt[0] - fp[0];
  const y = pt[1] - fp[1];
  const xRot = x * Math.cos(a) + y * Math.sin(a);
  const yRot = y * Math.cos(a) - x * Math.sin(a);
  return exports_vec2.fromValues(fp[0] + xRot, fp[1] + yRot);
};
var circleCircleIntersectionPoints = (c1, c2) => {
  let r1;
  let R2;
  let d;
  let dx;
  let dy;
  let c1x;
  let c1y;
  let C2x;
  let C2y;
  if (c1.radius < c2.radius) {
    r1 = c1.radius;
    R2 = c2.radius;
    c1x = c1.center[0];
    c1y = c1.center[1];
    C2x = c2.center[0];
    C2y = c2.center[1];
  } else {
    r1 = c2.radius;
    R2 = c1.radius;
    C2x = c1.center[0];
    C2y = c1.center[1];
    c1x = c2.center[0];
    c1y = c2.center[1];
  }
  dx = c1x - C2x;
  dy = c1y - C2y;
  d = Math.sqrt(dx * dx + dy * dy);
  if (d < EPS && Math.abs(R2 - r1) < EPS)
    return;
  if (d < EPS)
    return;
  const x = dx / d * R2 + C2x;
  const y = dy / d * R2 + C2y;
  const P = exports_vec2.fromValues(x, y);
  if (Math.abs(R2 + r1 - d) < EPS || Math.abs(R2 - (r1 + d)) < EPS) {
    return [P];
  }
  if (d + r1 < R2 || R2 + r1 < d)
    return;
  const C = exports_vec2.fromValues(C2x, C2y);
  const angle3 = _safeAcos((r1 * r1 - d * d - R2 * R2) / (-2 * d * R2));
  const pt1 = _rotatePoint(C, P, +angle3);
  const pt2 = _rotatePoint(C, P, -angle3);
  return [pt1, pt2];
};
// projects/local-framework/system/math/inverse-kinematic/limb-animator.ts
class LimbData {
  rootMat4;
  primaryLength;
  secondaryLength;
  constructor(rootMat4, primaryLength, secondaryLength) {
    this.rootMat4 = rootMat4;
    this.primaryLength = primaryLength;
    this.secondaryLength = secondaryLength;
  }
  computeIk_fixedYaw(inWorldTarget, inWorldForward) {
    const invRootMat4 = exports_mat4.invert(exports_mat4.create(), this.rootMat4);
    const rawLocalTarget = exports_vec3.transformMat4(exports_vec3.create(), inWorldTarget, invRootMat4);
    const rawLocalForward = exports_vec3.transformMat4(exports_vec3.create(), inWorldForward, invRootMat4);
    const primaryYaw = Math.atan2(rawLocalForward[1], rawLocalForward[0]);
    const tmpYawAlignedMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(tmpYawAlignedMat4, tmpYawAlignedMat4, primaryYaw, [0, 0, 1]);
    const tmpRollTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(tmpYawAlignedMat4, tmpYawAlignedMat4));
    const primaryRoll = Math.atan2(tmpRollTarget[1], -tmpRollTarget[2]);
    const baseMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(baseMat4, baseMat4, primaryYaw, [0, 0, 1]);
    exports_mat4.rotate(baseMat4, baseMat4, primaryRoll, [1, 0, 0]);
    const localTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(exports_mat4.create(), baseMat4));
    return this._computeIk_joints(baseMat4, localTarget, [
      { axis: [0, 0, 1], angle: primaryYaw },
      { axis: [1, 0, 0], angle: primaryRoll }
    ]);
  }
  computeIk_fixedRoll(inWorldTarget, inWorldRoll) {
    const invRootMat4 = exports_mat4.invert(exports_mat4.create(), this.rootMat4);
    const rawLocalTarget = exports_vec3.transformMat4(exports_vec3.create(), inWorldTarget, invRootMat4);
    const rawLocalRoll = exports_vec3.transformMat3(exports_vec3.create(), inWorldRoll, exports_mat3.fromMat4(exports_mat3.create(), invRootMat4));
    const primaryRoll = Math.atan2(rawLocalRoll[1], rawLocalRoll[0]);
    const tmpRollAlignedMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(tmpRollAlignedMat4, tmpRollAlignedMat4, primaryRoll, [1, 0, 0]);
    const tmpThetaTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(tmpRollAlignedMat4, tmpRollAlignedMat4));
    const primaryYaw = Math.atan2(tmpThetaTarget[1], tmpThetaTarget[0]);
    const baseMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotate(baseMat4, baseMat4, primaryRoll, [1, 0, 0]);
    exports_mat4.rotate(baseMat4, baseMat4, primaryYaw, [0, 0, 1]);
    const localTarget = exports_vec3.transformMat4(exports_vec3.create(), rawLocalTarget, exports_mat4.invert(exports_mat4.create(), baseMat4));
    return this._computeIk_joints(baseMat4, localTarget, [
      { axis: [1, 0, 0], angle: primaryRoll },
      { axis: [0, 0, 1], angle: primaryYaw }
    ]);
  }
  _computeIk_joints(baseMat4, localTarget, primaryQuatAxises) {
    const result = {
      success: false,
      baseMat4,
      primaryQuatAxises,
      jointA: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      jointB: {
        localPos: exports_vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      localTarget
    };
    const circleA = { center: [0, 0], radius: this.primaryLength };
    const circleB = { center: [result.localTarget[0], result.localTarget[2]], radius: this.secondaryLength };
    const subResult = circleCircleIntersectionPoints(circleA, circleB);
    if (!subResult) {
      result.success = false;
      return result;
    }
    result.jointA.localPos[0] = subResult[0][0];
    result.jointA.localPos[1] = 0;
    result.jointA.localPos[2] = subResult[0][1];
    result.jointA.primaryPitch = Math.atan2(-result.jointA.localPos[2], result.jointA.localPos[0]);
    result.jointA.primaryQuatAxis.angle = result.jointA.primaryPitch;
    const diffSecondaryA = exports_vec3.sub(exports_vec3.create(), result.localTarget, result.jointA.localPos);
    result.jointA.secondaryPitch = Math.atan2(diffSecondaryA[2], diffSecondaryA[0]);
    result.jointA.secondaryQuatAxis.angle = -result.jointA.secondaryPitch - result.jointA.primaryPitch;
    const tmpResult = subResult[1] || subResult[0];
    result.jointB.localPos[0] = tmpResult[0];
    result.jointB.localPos[1] = 0;
    result.jointB.localPos[2] = tmpResult[1];
    result.jointB.primaryPitch = Math.atan2(-result.jointB.localPos[2], result.jointB.localPos[0]);
    result.jointB.primaryQuatAxis.angle = result.jointB.primaryPitch;
    const diffSecondaryB = exports_vec3.sub(exports_vec3.create(), result.localTarget, result.jointB.localPos);
    result.jointB.secondaryPitch = Math.atan2(diffSecondaryB[2], diffSecondaryB[0]);
    result.jointB.secondaryQuatAxis.angle = -result.jointB.secondaryPitch - result.jointB.primaryPitch;
    result.success = true;
    return result;
  }
  extractBaseTransform(result, outMat4) {
    exports_mat4.multiply(outMat4, this.rootMat4, result.baseMat4);
  }
  extractPrimaryTransform(result, joint, outMat4) {
    this.extractBaseTransform(result, outMat4);
    exports_mat4.rotate(outMat4, outMat4, joint.primaryPitch, [0, 1, 0]);
  }
  extractSecondaryTransform(result, joint, outMat4) {
    this.extractPrimaryTransform(result, joint, outMat4);
    exports_mat4.translate(outMat4, outMat4, [this.primaryLength, 0, 0]);
    exports_mat4.rotate(outMat4, outMat4, -joint.secondaryPitch - joint.primaryPitch, [0, 1, 0]);
  }
  extractTransforms(result, joint, baseMat4, primaryMat4, secondaryMat4) {
    this.extractBaseTransform(result, baseMat4);
    primaryMat4 = exports_mat4.rotate(primaryMat4, baseMat4, joint.primaryPitch, [0, 1, 0]);
    exports_mat4.translate(secondaryMat4, primaryMat4, [this.primaryLength, 0, 0]);
    exports_mat4.rotate(secondaryMat4, secondaryMat4, -joint.secondaryPitch - joint.primaryPitch, [0, 1, 0]);
  }
}
// projects/local-framework/system/math/clamp.ts
var clamp = (val, minVal, maxVal) => {
  return Math.min(Math.max(val, minVal), maxVal);
};
// projects/local-framework/system/math/easing.ts
var easeClamp = (t) => {
  if (t > 1) {
    return t - Math.floor(t);
  }
  return t;
};
var easePinPong = (t) => {
  t *= 2;
  if (t < 1) {
    return t;
  }
  t -= 1;
  return 1 - t;
};
var easeInElastic = (t) => {
  const t2 = t * t;
  return t2 * t2 * Math.sin(t * Math.PI * 4.5);
};
var easeOutElastic = (t) => {
  const t2 = (t - 1) * (t - 1);
  return 1 - t2 * t2 * Math.cos(t * Math.PI * 4.5);
};
var easeInOutElastic = (t) => {
  if (t < 0.45) {
    const t22 = t * t;
    return 8 * t22 * t22 * Math.sin(t * Math.PI * 9);
  }
  if (t < 0.55) {
    return 0.5 + 0.75 * Math.sin(t * Math.PI * 4);
  }
  const t2 = (t - 1) * (t - 1);
  return 1 - 8 * t2 * t2 * Math.sin(t * Math.PI * 9);
};
var easeInBounce = (t) => {
  return Math.pow(2, 6 * (t - 1)) * Math.abs(Math.sin(t * Math.PI * 3.5));
};
var easeOutBounce = (t) => {
  return 1 - Math.pow(2, -6 * t) * Math.abs(Math.cos(t * Math.PI * 3.5));
};
var easeInOutBounce = (t) => {
  if (t < 0.5) {
    return 8 * Math.pow(2, 8 * (t - 1)) * Math.abs(Math.sin(t * Math.PI * 7));
  }
  return 1 - 8 * Math.pow(2, -8 * t) * Math.abs(Math.sin(t * Math.PI * 7));
};
// projects/local-framework/system/math/lerp.ts
var lerpFloat = (valA, valB, ratio) => valA + (valB - valA) * ratio;
var lerpVec2 = (out, valA, valB, ratio) => {
  return exports_vec2.lerp(out, valA, valB, ratio);
};
var lerpVec3 = (out, valA, valB, ratio) => {
  return exports_vec3.lerp(out, valA, valB, ratio);
};
var lerpQuat = (out, valA, valB, ratio) => {
  return exports_quat.slerp(out, valA, valB, ratio);
};
// projects/local-framework/system/math/GenericEasing.ts
class GenericEasing {
  _steps = [];
  _lerp;
  constructor(lerp5) {
    this._lerp = lerp5;
  }
  reset() {
    this._steps.length = 0;
  }
  push(coefStep, value, easing) {
    if (this._steps.length != 0 && coefStep <= this._steps[this._steps.length - 1].coefStep)
      throw new Error("coef step will be missed");
    if (coefStep < 0)
      throw new Error("coef cannot be < 0");
    if (coefStep > 1)
      throw new Error("coef cannot be > 1");
    this._steps.push({ coefStep, value, easing });
    return this;
  }
  get(coef) {
    if (this._steps.length < 2) {
      throw new Error("not enough coef steps");
    }
    const first = this._steps[0];
    if (coef < first.coefStep) {
      return first.value;
    }
    const last = this._steps[this._steps.length - 1];
    if (coef >= last.coefStep) {
      return last.value;
    }
    for (let index = 0;index + 1 < this._steps.length; ++index) {
      const currStep = this._steps[index];
      const nextStep = this._steps[index + 1];
      if (coef >= currStep.coefStep && coef < nextStep.coefStep) {
        let subCoef = (coef - currStep.coefStep) / (nextStep.coefStep - currStep.coefStep);
        if (currStep.easing) {
          subCoef = currStep.easing(subCoef);
        }
        return this._lerp(currStep.value, nextStep.value, subCoef);
      }
    }
    throw new Error("unreachable");
  }
}
// projects/local-framework/graphics/index.ts
var exports_graphics = {};
__export(exports_graphics, {
  webgl2: () => exports_webgl2,
  renderers: () => exports_renderers,
  geometries: () => exports_build_geometries,
  camera: () => exports_camera
});

// projects/local-framework/graphics/build-geometries/index.ts
var exports_build_geometries = {};
__export(exports_build_geometries, {
  generateWireFrameFrustumVertices: () => generateWireFrameFrustumVertices,
  generateSphereVertices: () => generateSphereVertices,
  generateSphereTriangles: () => generateSphereTriangles,
  generateBoxVertices: () => generateBoxVertices
});

// projects/local-framework/graphics/build-geometries/generateBoxVertices.ts
var generateBoxVertices = (inSize) => {
  const hSizeX = inSize[0] * 0.5;
  const hSizeY = inSize[1] * 0.5;
  const hSizeZ = inSize[2] * 0.5;
  const k_normals = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1]
  ];
  const k_vertices = [
    [-hSizeX, -hSizeY, -hSizeZ],
    [+hSizeX, -hSizeY, -hSizeZ],
    [-hSizeX, +hSizeY, -hSizeZ],
    [+hSizeX, +hSizeY, -hSizeZ],
    [-hSizeX, -hSizeY, +hSizeZ],
    [+hSizeX, -hSizeY, +hSizeZ],
    [-hSizeX, +hSizeY, +hSizeZ],
    [+hSizeX, +hSizeY, +hSizeZ]
  ];
  const k_indices = [
    [0, 2, 1, 4],
    [2, 3, 1, 4],
    [4, 5, 6, 5],
    [6, 5, 7, 5],
    [1, 3, 5, 1],
    [5, 3, 7, 1],
    [0, 4, 2, 0],
    [4, 6, 2, 0],
    [2, 6, 3, 3],
    [6, 7, 3, 3],
    [0, 1, 4, 2],
    [4, 1, 5, 2]
  ];
  const vertices = [];
  for (const index of k_indices) {
    const vertex1 = k_vertices[index[0]];
    const vertex2 = k_vertices[index[1]];
    const vertex3 = k_vertices[index[2]];
    const normal = k_normals[index[3]];
    vertices.push(vertex1[0], vertex1[1], vertex1[2], normal[0], normal[1], normal[2], vertex2[0], vertex2[1], vertex2[2], normal[0], normal[1], normal[2], vertex3[0], vertex3[1], vertex3[2], normal[0], normal[1], normal[2]);
  }
  return vertices;
};
// projects/local-framework/graphics/build-geometries/computeNormal.ts
var computeNormal = (inPosA, inPosB, inPosC) => {
  const normal = exports_vec3.cross(exports_vec3.create(), exports_vec3.sub(exports_vec3.create(), inPosA, inPosB), exports_vec3.sub(exports_vec3.create(), inPosA, inPosC));
  const magnitude = exports_vec3.length(normal);
  if (magnitude > 0) {
    normal[0] /= magnitude;
    normal[1] /= magnitude;
    normal[2] /= magnitude;
  }
  return normal;
};

// projects/local-framework/graphics/build-geometries/convertToPerFacesNormals.ts
var convertToPerFacesNormals = (vertices) => {
  for (let index = 0;index < vertices.length; index += 6 * 3) {
    const indexA = index + 6 * 0;
    const indexB = index + 6 * 1;
    const indexC = index + 6 * 2;
    const posA = [vertices[indexA + 0], vertices[indexA + 1], vertices[indexA + 2]];
    const posB = [vertices[indexB + 0], vertices[indexB + 1], vertices[indexB + 2]];
    const posC = [vertices[indexC + 0], vertices[indexC + 1], vertices[indexC + 2]];
    const normal = computeNormal(posA, posB, posC);
    vertices[indexA + 3] = normal[0];
    vertices[indexA + 4] = normal[1];
    vertices[indexA + 5] = normal[2];
    vertices[indexB + 3] = normal[0];
    vertices[indexB + 4] = normal[1];
    vertices[indexB + 5] = normal[2];
    vertices[indexC + 3] = normal[0];
    vertices[indexC + 4] = normal[1];
    vertices[indexC + 5] = normal[2];
  }
};

// projects/local-framework/graphics/build-geometries/generateSphereTriangles.ts
var _exploreSpherePatch = (quality, v01, v02, v03, onTriangle) => {
  if (quality <= 0) {
    onTriangle(v02, v01, v03);
  } else {
    const v12 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v01, v02, 0.5));
    const v23 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v02, v03, 0.5));
    const v31 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v03, v01, 0.5));
    quality -= 1;
    _exploreSpherePatch(quality, v01, v12, v31, onTriangle);
    _exploreSpherePatch(quality, v12, v02, v23, onTriangle);
    _exploreSpherePatch(quality, v31, v23, v03, onTriangle);
    _exploreSpherePatch(quality, v12, v23, v31, onTriangle);
  }
};
var generateSphereTriangles = (quality, onTriangle) => {
  const k_icx = 0.5257311121191336;
  const k_icz = 0.8506508083520399;
  const tmpVertices = [
    [-k_icx, 0, +k_icz],
    [+k_icx, 0, +k_icz],
    [-k_icx, 0, -k_icz],
    [+k_icx, 0, -k_icz],
    [0, +k_icz, +k_icx],
    [0, +k_icz, -k_icx],
    [0, -k_icz, +k_icx],
    [0, -k_icz, -k_icx],
    [+k_icz, +k_icx, 0],
    [-k_icz, +k_icx, 0],
    [+k_icz, -k_icx, 0],
    [-k_icz, -k_icx, 0]
  ];
  const tmpIndices = [
    [0, 4, 1],
    [0, 9, 4],
    [9, 5, 4],
    [4, 5, 8],
    [4, 8, 1],
    [8, 10, 1],
    [8, 3, 10],
    [5, 3, 8],
    [5, 2, 3],
    [2, 7, 3],
    [7, 10, 3],
    [7, 6, 10],
    [7, 11, 6],
    [11, 0, 6],
    [0, 1, 6],
    [6, 1, 10],
    [9, 0, 11],
    [9, 11, 2],
    [9, 2, 5],
    [7, 2, 11]
  ];
  for (const index of tmpIndices) {
    _exploreSpherePatch(quality, tmpVertices[index[0]], tmpVertices[index[1]], tmpVertices[index[2]], onTriangle);
  }
};
var generateSphereVertices = (quality, radius, modelMat4, perFaceNormals = false) => {
  const vertices = [];
  const tmpVec3A = exports_vec3.create();
  const tmpVec3B = exports_vec3.create();
  generateSphereTriangles(quality, (normal1, normal2, normal3) => {
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal1, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal2, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
    tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
    exports_vec3.transformMat4(tmpVec3A, normal3, modelMat4);
    exports_vec3.scale(tmpVec3B, tmpVec3A, radius), vertices.push(tmpVec3B[0], tmpVec3B[1], tmpVec3B[2], tmpVec3A[0], tmpVec3A[1], tmpVec3A[2]);
  });
  if (perFaceNormals) {
    convertToPerFacesNormals(vertices);
  }
  return vertices;
};
// projects/local-framework/graphics/build-geometries/generateWireFrameFrustumVertices.ts
var generateWireFrameFrustumVertices = (fovY, aspect, zNear, zFar) => {
  const fH = Math.tan(fovY / 360 * Math.PI) * zNear;
  const fW = fH * aspect;
  const left = -fW;
  const right = +fW;
  const top = +fH;
  const bottom = -fH;
  const half_z = zFar * Math.sin(fovY * Math.PI / 180);
  const half_y = half_z * aspect;
  const tmpVertices = [];
  tmpVertices.push([zNear, left, top]);
  tmpVertices.push([zNear, right, top]);
  tmpVertices.push([zNear, left, bottom]);
  tmpVertices.push([zNear, right, bottom]);
  tmpVertices.push([zFar, -half_y, +half_z]);
  tmpVertices.push([zFar, +half_y, +half_z]);
  tmpVertices.push([zFar, -half_y, -half_z]);
  tmpVertices.push([zFar, +half_y, -half_z]);
  tmpVertices.push([zFar, -half_y * 1.66, -half_z]);
  tmpVertices.push([zFar, -half_y * 1.66, +half_z]);
  const indices = [];
  indices.push(0, 1, 1, 3, 3, 2, 2, 0);
  indices.push(0, 4, 1, 5, 2, 6, 3, 7);
  indices.push(4, 5, 5, 7, 7, 6, 6, 4);
  indices.push(8, 9);
  indices.push(7, 8);
  indices.push(5, 9);
  const vertices = [];
  for (let ii = 0;ii < indices.length; ++ii) {
    vertices.push(tmpVertices[indices[ii]]);
  }
  return vertices;
};
// projects/local-framework/graphics/camera/index.ts
var exports_camera = {};
__export(exports_camera, {
  FrustumCulling: () => FrustumCulling,
  Camera: () => Camera
});

// projects/local-framework/graphics/camera/Camera.ts
var _degreeToRad = (angle3) => angle3 * Math.PI / 180;
class Camera {
  _projectionType = 0 /* perspective */;
  _perspectiveData;
  _orthogonalData;
  _viewportPos = exports_vec2.fromValues(0, 0);
  _viewportSize = exports_vec2.fromValues(0, 0);
  _projectionMatrix = exports_mat4.create();
  _viewMatrix = exports_mat4.create();
  _composedMatrix = exports_mat4.create();
  _eye = exports_vec3.fromValues(0, 0, 0);
  _target = exports_vec3.fromValues(0, 0, 0);
  _upAxis = exports_vec3.fromValues(0, 0, 0);
  setAsPerspective(inData) {
    this._projectionType = 0 /* perspective */;
    let aspectRatio = inData.aspectRatio;
    if (aspectRatio === undefined) {
      aspectRatio = this._viewportSize[0] / this._viewportSize[1];
    }
    this._perspectiveData = {
      fovy: inData.fovy,
      aspectRatio,
      near: inData.near,
      far: inData.far
    };
  }
  setAsOrthogonal(inData) {
    this._projectionType = 1 /* orthogonal */;
    this._orthogonalData = { ...inData };
  }
  setViewportPos(width, height) {
    this._viewportPos[0] = width;
    this._viewportPos[1] = height;
  }
  getViewportPos() {
    return this._viewportPos;
  }
  setViewportSize(width, height) {
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    if (this._projectionType !== 0 /* perspective */ && this._perspectiveData) {
      this._perspectiveData.aspectRatio = this._viewportSize[0] / this._viewportSize[1];
    }
  }
  getViewportSize() {
    return this._viewportSize;
  }
  lookAt(inEye, inTarget, inUpAxis) {
    this.setEye(inEye);
    this.setTarget(inTarget);
    this.setUpAxis(inUpAxis);
  }
  setEye(inEye) {
    exports_vec3.copy(this._eye, inEye);
  }
  setTarget(inTarget) {
    exports_vec3.copy(this._target, inTarget);
  }
  setUpAxis(inUpAxis) {
    exports_vec3.copy(this._upAxis, inUpAxis);
  }
  getEye() {
    return this._eye;
  }
  getTarget() {
    return this._target;
  }
  getUpAxis() {
    return this._upAxis;
  }
  computeMatrices() {
    if (this._projectionType === 0 /* perspective */) {
      const { fovy, aspectRatio, near, far } = this._perspectiveData;
      exports_mat4.perspective(this._projectionMatrix, _degreeToRad(fovy), aspectRatio, near, far);
    } else if (this._projectionType === 1 /* orthogonal */) {
      const { left, right, top, bottom, near, far } = this._orthogonalData;
      exports_mat4.ortho(this._projectionMatrix, left, right, top, bottom, near, far);
    }
    exports_mat4.lookAt(this._viewMatrix, this._eye, this._target, this._upAxis);
    this.computeComposedMatrix();
  }
  computeComposedMatrix() {
    exports_mat4.multiply(this._composedMatrix, this._projectionMatrix, this._viewMatrix);
  }
  setProjectionMatrix(inMat4) {
    exports_mat4.copy(this._projectionMatrix, inMat4);
  }
  setViewMatrix(inMat4) {
    exports_mat4.copy(this._viewMatrix, inMat4);
  }
  setComposedMatrix(inMat4) {
    exports_mat4.copy(this._composedMatrix, inMat4);
  }
  getProjectionMatrix() {
    return this._projectionMatrix;
  }
  getViewMatrix() {
    return this._viewMatrix;
  }
  getComposedMatrix() {
    return this._composedMatrix;
  }
  getPerspectiveData() {
    if (this._projectionType !== 0 /* perspective */) {
      throw new Error("not a perspective projection");
    }
    return this._perspectiveData;
  }
  getOrthogonalData() {
    if (this._projectionType !== 1 /* orthogonal */) {
      throw new Error("not an orthogonal projection");
    }
    return this._orthogonalData;
  }
}
// projects/local-framework/graphics/camera/FrustumCulling.ts
class FrustumCulling {
  _frustum = new Float32Array(24);
  _setPlane(side, left, right, coef) {
    const index = side * 4;
    this._frustum[index + 0] = left[0] + right[0] * coef;
    this._frustum[index + 1] = left[1] + right[1] * coef;
    this._frustum[index + 2] = left[2] + right[2] * coef;
    this._frustum[index + 3] = left[3] + right[3] * coef;
    const magnitude = Math.sqrt(this._frustum[index + 0] * this._frustum[index + 0] + this._frustum[index + 1] * this._frustum[index + 1] + this._frustum[index + 2] * this._frustum[index + 2]);
    if (magnitude === 0)
      return;
    this._frustum[index + 0] /= magnitude;
    this._frustum[index + 1] /= magnitude;
    this._frustum[index + 2] /= magnitude;
    this._frustum[index + 3] /= magnitude;
  }
  calculateFrustum(proj, view) {
    const clip = exports_mat4.multiply(exports_mat4.create(), proj, view);
    const row0 = exports_vec4.fromValues(clip[0], clip[4], clip[8], clip[12]);
    const row1 = exports_vec4.fromValues(clip[1], clip[5], clip[9], clip[13]);
    const row2 = exports_vec4.fromValues(clip[2], clip[6], clip[10], clip[14]);
    const row3 = exports_vec4.fromValues(clip[3], clip[7], clip[11], clip[15]);
    this._setPlane(0 /* Right */, row3, row0, -1);
    this._setPlane(1 /* Left */, row3, row0, 1);
    this._setPlane(2 /* Bottom */, row3, row1, 1);
    this._setPlane(3 /* Top */, row3, row1, -1);
    this._setPlane(4 /* Back */, row3, row2, -1);
    this._setPlane(5 /* Front */, row3, row2, 1);
  }
  sphereInFrustum(x, y, z, radius) {
    for (let ii = 0;ii < 6; ++ii) {
      const index = ii * 4;
      if (this._frustum[index + 0] * x + this._frustum[index + 1] * y + this._frustum[index + 2] * z + this._frustum[index + 3] <= -radius) {
        return false;
      }
    }
    return true;
  }
  pointInFrustum(x, y, z) {
    return this.sphereInFrustum(x, y, z, 0);
  }
  cubeInFrustumVec3(center, inSize) {
    return this.cubeInFrustum(center[0], center[1], center[2], inSize);
  }
  cubeInFrustum(inX, inY, inZ, inSize) {
    const hSize = inSize * 0.5;
    const minX = inX - hSize;
    const minY = inY - hSize;
    const minZ = inZ - hSize;
    const maxX = inX + hSize;
    const maxY = inY + hSize;
    const maxZ = inZ + hSize;
    for (let ii = 0;ii < 6; ++ii) {
      const index = ii * 4;
      const planA = this._frustum[index + 0];
      const planB = this._frustum[index + 1];
      const planC = this._frustum[index + 2];
      const planD = this._frustum[index + 3];
      if (planA * minX + planB * minY + planC * minZ + planD > 0 || planA * maxX + planB * minY + planC * minZ + planD > 0 || planA * minX + planB * maxY + planC * minZ + planD > 0 || planA * maxX + planB * maxY + planC * minZ + planD > 0 || planA * minX + planB * minY + planC * maxZ + planD > 0 || planA * maxX + planB * minY + planC * maxZ + planD > 0 || planA * minX + planB * maxY + planC * maxZ + planD > 0 || planA * maxX + planB * maxY + planC * maxZ + planD > 0) {
        continue;
      }
      return false;
    }
    return true;
  }
}
// projects/local-framework/graphics/renderers/index.ts
var exports_renderers = {};
__export(exports_renderers, {
  renderFpsMeter: () => renderFpsMeter,
  addKeysTouchesWidgets: () => addKeysTouchesWidgets,
  addKeyStrokesWidgets: () => addKeyStrokesWidgets,
  addArrowStrokesWidgets: () => addArrowStrokesWidgets,
  TextRenderer: () => TextRenderer,
  StackRenderers: () => StackRenderers,
  GeometryStackRenderer: () => GeometryStackRenderer
});

// projects/local-framework/graphics/renderers/geometry-stack-renderer/shaders/geometry-stack-renderer.glsl.vert
var geometry_stack_renderer_glsl_default = `#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;
uniform vec3 u_lightPos;

in vec3 a_vertexPosition;
in vec3 a_vertexNormal;

in vec3 a_offsetPosition;
in vec4 a_offsetOrientation; // quaternion
in vec3 a_offsetScale;
in vec3 a_offsetColor;

out vec3 v_color;

// #include "./assets/graphics/shaders/_common/_common-quat-rotations.glsl.vert"

vec4 quat_from_axis_angle(vec3 axis, float angle)
{
  vec4 qr;
  // float half_angle = (angle * 0.5) * 3.14159 / 180.0;
  float half_angle = (angle * 0.5);
  qr.x = axis.x * sin(half_angle);
  qr.y = axis.y * sin(half_angle);
  qr.z = axis.z * sin(half_angle);
  qr.w = cos(half_angle);
  return qr;
}

vec3 apply_quat_to_vec3(vec3 position, vec4 q)
{
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

// #include "./assets/graphics/shaders/_common/_common-apply-lighting.glsl.frag"

float getDiffuseLightingRatio(vec3 lightDir, vec3 normal)
{
  normal = normalize(normal);
  lightDir = normalize(lightDir);

  return max(dot(lightDir, normal), 0.0);
}

void main(void)
{
	vec3 worldSpacePosition = a_offsetPosition + apply_quat_to_vec3(a_vertexPosition * a_offsetScale, a_offsetOrientation);
	vec3 worldSpaceNormal = apply_quat_to_vec3(a_vertexNormal, a_offsetOrientation);

	gl_Position = u_composedMatrix * vec4(worldSpacePosition, 1.0);

	float diffuseRatio = getDiffuseLightingRatio(u_lightPos - worldSpacePosition, worldSpaceNormal);

	v_color = a_offsetColor * (0.3 + diffuseRatio);
}
`.trim();

// projects/local-framework/graphics/renderers/geometry-stack-renderer/shaders/geometry-stack-renderer.glsl.frag
var geometry_stack_renderer_glsl_default2 = `#version 300 es

precision lowp float;

in vec3 v_color;

out vec4 out_color;

//
//
//

void main(void)
{
	out_color = vec4(v_color, 1.0);
}
`.trim();

// projects/local-framework/graphics/renderers/geometry-stack-renderer/GeometryStackRenderer.ts
class GeometryStackRenderer {
  _shader;
  _geoDef;
  _aliasedGeometriesMap = new Map;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("GeometryStackRenderer", {
      vertexSrc: geometry_stack_renderer_glsl_default,
      fragmentSrc: geometry_stack_renderer_glsl_default2,
      attributes: [
        "a_vertexPosition",
        "a_vertexNormal",
        "a_offsetPosition",
        "a_offsetOrientation",
        "a_offsetScale",
        "a_offsetColor"
      ],
      uniforms: ["u_composedMatrix", "u_lightPos"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertexPosition", "vec3f").addVboAttribute("a_vertexNormal", "vec3f").addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offsetPosition", "vec3f").addVboAttribute("a_offsetOrientation", "vec4f").addVboAttribute("a_offsetScale", "vec3f").addVboAttribute("a_offsetColor", "vec3f");
    this._geoDef = geoBuilder.getDef();
  }
  createAlias(alias, bufferSize, vertices) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (aliasGeometry) {
      throw new Error("alias already exist, alias: " + alias);
    }
    const newAlias = {
      geometry: new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, this._geoDef),
      buffer: new Float32Array(bufferSize * 13),
      currentSize: 0
    };
    newAlias.geometry.updateBuffer(0, vertices, vertices.length);
    newAlias.geometry.setPrimitiveCount(vertices.length / 6);
    this._aliasedGeometriesMap.set(alias, newAlias);
  }
  deleteAlias(alias) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    this._aliasedGeometriesMap.delete(alias);
  }
  clearAlias(alias) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    aliasGeometry.currentSize = 0;
  }
  pushAlias(alias, position, orientation, scale7, color) {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[3];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale7[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale7[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale7[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[2];
  }
  flush(composedMatrix, lightPos, clearStack = true) {
    let canRender = false;
    [...this._aliasedGeometriesMap.values()].forEach((val) => {
      if (val.currentSize > 0) {
        canRender = true;
      }
    });
    if (!canRender) {
      return;
    }
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      boundShader.setFloat3Uniform("u_lightPos", lightPos[0], lightPos[1], lightPos[2]);
      [...this._aliasedGeometriesMap.values()].forEach((val) => {
        if (val.currentSize === 0) {
          return;
        }
        val.geometry.updateBuffer(1, val.buffer, val.currentSize);
        val.geometry.setInstancedCount(val.currentSize / 13);
        val.geometry.render();
        if (clearStack === true) {
          val.currentSize = 0;
        }
      });
    });
  }
  clear() {
    [...this._aliasedGeometriesMap.values()].forEach((val) => {
      val.currentSize = 0;
    });
  }
}
// projects/local-framework/graphics/renderers/stack-renderers/shaders/stack-renderer.glsl.vert
var stack_renderer_glsl_default = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec3 a_vertex_position;
in vec4 a_vertex_color;

flat out vec4 v_color;

void main(void)
{
  gl_Position = u_composedMatrix * vec4(a_vertex_position, 1.0);

  v_color = a_vertex_color;
}
`.trim();

// projects/local-framework/graphics/renderers/stack-renderers/shaders/stack-renderer.glsl.frag
var stack_renderer_glsl_default2 = `
#version 300 es

precision lowp float;

flat in vec4 v_color;

out vec4 o_color;

void main(void)
{
  o_color = v_color;
}
`.trim();

// projects/local-framework/graphics/renderers/stack-renderers/internals/WireFramesStackRenderer.ts
var k_bufferSize = 14 * 1024;

class WireFramesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_graphics.webgl2.GeometryWrapper.PrimitiveType.lines
    };
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(inShader, geometryDef);
    this._geometry.setFloatBufferSize(0, k_bufferSize);
  }
  pushLine(inPointA, inPointB, inColor) {
    if (this._currentSize + 7 * 2 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    const alphaValue = inColor[3] ?? 1;
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
  }
  canRender() {
    return this._currentSize > 0;
  }
  flush() {
    if (!this.canRender())
      return;
    this._geometry.updateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// projects/local-framework/graphics/renderers/stack-renderers/internals/TrianglesStackRenderer.ts
var k_bufferSize2 = 7 * 1024;

class TrianglesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize2);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_graphics.webgl2.GeometryWrapper.PrimitiveType.triangles
    };
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(inShader, geometryDef);
    this._geometry.setFloatBufferSize(0, k_bufferSize2);
  }
  pushTriangle(inPointA, inPointB, inPointC, inColor) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    const alphaValue = inColor[3] ?? 1;
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointC[0];
    this._buffer[this._currentSize + 1] = inPointC[1];
    this._buffer[this._currentSize + 2] = inPointC[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
  }
  pushLine(inPointA, inPointB, thickness, inColor) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }
    const diffX = inPointB[0] - inPointA[0];
    const diffY = inPointB[1] - inPointA[1];
    const angle3 = Math.atan2(diffY, diffX) + Math.PI * 0.5;
    const stepX = Math.cos(angle3) * thickness * 0.5;
    const stepY = Math.sin(angle3) * thickness * 0.5;
    this.pushTriangle([inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]], [inPointB[0] - stepX, inPointB[1] - stepY, inPointB[2]], [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]], inColor);
    this.pushTriangle([inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]], [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]], [inPointA[0] + stepX, inPointA[1] + stepY, inPointA[2]], inColor);
  }
  pushRotatedLine(center, angle3, length5, thickness, color) {
    this.pushLine([
      center[0] - length5 * Math.cos(angle3),
      center[1] - length5 * Math.sin(angle3),
      center[2]
    ], [
      center[0] + length5 * Math.cos(angle3),
      center[1] + length5 * Math.sin(angle3),
      center[2]
    ], thickness, color);
  }
  pushOriginBoundRectangle(inOrigin, inSize, inColor) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }
    const maxCoord = [
      inOrigin[0] + inSize[0],
      inOrigin[1] + inSize[1]
    ];
    this.pushTriangle([inOrigin[0], inOrigin[1], inOrigin[2]], [maxCoord[0], maxCoord[1], inOrigin[2]], [inOrigin[0], maxCoord[1], inOrigin[2]], inColor);
    this.pushTriangle([inOrigin[0], inOrigin[1], inOrigin[2]], [maxCoord[0], inOrigin[1], inOrigin[2]], [maxCoord[0], maxCoord[1], inOrigin[2]], inColor);
  }
  pushCenteredRectangle(inCenter, inSize, inColor) {
    const origin = [
      inCenter[0] - inSize[0] * 0.5,
      inCenter[1] - inSize[1] * 0.5,
      inCenter[2]
    ];
    this.pushOriginBoundRectangle(origin, inSize, inColor);
  }
  canRender() {
    return this._currentSize > 0;
  }
  flush() {
    if (!this.canRender()) {
      return;
    }
    this._geometry.updateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// projects/local-framework/graphics/renderers/stack-renderers/StackRenderers.ts
class StackRenderers {
  _shader;
  _wireFramesStackRenderer;
  _trianglesStackRenderer;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("StackRenderers", {
      vertexSrc: stack_renderer_glsl_default,
      fragmentSrc: stack_renderer_glsl_default2,
      attributes: ["a_vertex_position", "a_vertex_color"],
      uniforms: ["u_composedMatrix"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("lines").addVbo().setVboAsDynamic().addVboAttribute("a_vertex_position", "vec3f").addVboAttribute("a_vertex_color", "vec4f");
    this._wireFramesStackRenderer = new WireFramesStackRenderer(this._shader, geoBuilder.getDef());
    this._trianglesStackRenderer = new TrianglesStackRenderer(this._shader, geoBuilder.getDef());
  }
  pushLine(inPointA, inPointB, inColor) {
    this._wireFramesStackRenderer.pushLine(inPointA, inPointB, inColor);
  }
  pushCross(inCenter, inSize, inColor) {
    const crossVertices = [
      [inCenter[0] - inSize, inCenter[1], inCenter[2]],
      [inCenter[0] + inSize, inCenter[1], inCenter[2]],
      [inCenter[0], inCenter[1] - inSize, inCenter[2]],
      [inCenter[0], inCenter[1] + inSize, inCenter[2]],
      [inCenter[0], inCenter[1], inCenter[2] - inSize],
      [inCenter[0], inCenter[1], inCenter[2] + inSize]
    ];
    const crossIndices = [0, 1, 2, 3, 4, 5];
    for (let ii = 0;ii < crossIndices.length; ii += 2) {
      const vertexA = crossVertices[ii + 0];
      const vertexB = crossVertices[ii + 1];
      this._wireFramesStackRenderer.pushLine(vertexA, vertexB, inColor);
    }
  }
  pushThickLine(inPointA, inPointB, thickness, inColor) {
    this._trianglesStackRenderer.pushLine(inPointA, inPointB, thickness, inColor);
  }
  pushRotatedLine(center, angle3, length5, thickness, color) {
    this._trianglesStackRenderer.pushRotatedLine(center, angle3, length5, thickness, color);
  }
  pushOriginBoundRectangle(inOrigin, inSize, inColor) {
    this._trianglesStackRenderer.pushOriginBoundRectangle(inOrigin, inSize, inColor);
  }
  pushCenteredRectangle(inCenter, inSize, inColor) {
    this._trianglesStackRenderer.pushCenteredRectangle(inCenter, inSize, inColor);
  }
  pushTriangle(inPosA, inPosB, inPosC, inColor) {
    this._trianglesStackRenderer.pushTriangle(inPosA, inPosB, inPosC, inColor);
  }
  pushQuad(inPos, inSize, inColor) {
    this.pushTriangle([inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 0, inPos[2]], inColor);
    this.pushTriangle([inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, inPos[2]], [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, inPos[2]], [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 1, inPos[2]], inColor);
  }
  flush(inComposedMatrix) {
    if (!this._wireFramesStackRenderer.canRender() && !this._trianglesStackRenderer.canRender()) {
      return;
    }
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inComposedMatrix);
      this._wireFramesStackRenderer.flush();
      this._trianglesStackRenderer.flush();
    });
  }
  safeRender(inComposedMatrix, inCallback) {
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inComposedMatrix);
      inCallback();
      this._wireFramesStackRenderer.flush();
      this._trianglesStackRenderer.flush();
    });
  }
  clear() {
    this._wireFramesStackRenderer.clear();
    this._trianglesStackRenderer.clear();
  }
}
// projects/local-framework/graphics/renderers/text-renderer/shaders/text-renderer.glsl.vert
var text_renderer_glsl_default = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec2 a_vertex_position;
in vec2 a_vertex_texCoord;
in vec3 a_offset_position;
in vec2 a_offset_texCoord;
in vec3 a_offset_color;
in float a_offset_scale;

out vec2 v_texCoord;
flat out vec3 v_color;

void main(void)
{
  vec3 position = vec3(a_vertex_position, 0.0) * a_offset_scale + a_offset_position;

  gl_Position = u_composedMatrix * vec4(position, 1.0);

  v_texCoord = a_vertex_texCoord + a_offset_texCoord;
  v_color = a_offset_color;
}
`.trim();

// projects/local-framework/graphics/renderers/text-renderer/shaders/text-renderer.glsl.frag
var text_renderer_glsl_default2 = `
#version 300 es

precision mediump float;

uniform sampler2D u_texture;

in vec2 v_texCoord;
flat in vec3 v_color;

out vec4 o_color;

void main(void)
{
  vec4 textureColor = texture(u_texture, v_texCoord);
  if (textureColor.a < 0.5)
  {
    discard;
  }
  else
  {
    o_color = vec4(v_color, textureColor.a);
  }
}
`.trim();

// projects/local-framework/graphics/renderers/text-renderer/internals/asciiTextureHex.ts
var asciiTextureHex = "7e7e28fd03fd07fe04fe0aff02ff7e4dfd0cfd03fd07fe04fe0aff02ff1afc0dfd10fc08fc0ffe55ff15fb0bfd03fd07fe04fe08f707fd04ff07fe02fe0cfd0ffd0cfd0aff03fe03ff0afe44fe15fb0bfd03fd04f204f607fd03fe07fe02fe0cfd0efd0efd0aff02fe02ff0bfe43fd15fb0cfe03fe05f204fe01ff02ff0afd02fd07fe02fe0bfd0efd10fd0afa0cfe42fd16fb1bfe04fe07fe01ff02ff0efd09fc1cfd12fd09fa0cfe41fd17fb1bfe04fe07f70bfd0afc04ff17fd12fd06f405f616f61cfd19fd1cfe04fe08f709fd0bfb02fe17fd12fd06f405f616f61bfd1afd1cfe04fe0aff02ff01fe08fd0bfe02fa17fd12fd09fa0cfe3efd37f207ff02ff01fe07fd02fd07fe03fc19fd10fd0afa0cfe3dfd38f204f607fe03fd07fe03fd1bfd0efd0aff02fe02ff0bfe0cfd1dfd0dfd1dfd1cfe04fe07f708ff04fd07fe02fb1bfd0cfd0aff03fe03ff0afe0cfd1dfd0cfd1efd1cfe04fe0aff02ff1afb02fe1bfc08fc0ffe1cfd1dfd0bfd1ffd1cfe04fe0aff02ff7afd7e7e7e7e7e7e0efd17fd10fc0af80bfe0bf909f90dfd08f609fb08f506f808f82cfd19fd0df807fd04fd0afe0afd03fd07fd03fd0bfc08fd0ffd0bfd05fd05fd04fd06fd04fd2afd1bfd0bfc02fc06fd03fc09fd0afd04fd06fd04fd09fb08fd0efd0cfd05fd05fd04fd06fd04fd09fd0cfd0efd1dfd0afe05fd06fd02fb06fa11fd0dfd08fe01fd08fd0dfd0dfd05fd05fd04fd06fd04fd09fd0cfd0dfd0af409fd10fd06fd02fb06fa10fd0dfd08fe02fd08fd0dfd15fd05fb02fd06fd04fd09fd0cfd0cfd0bf40afd0efd07fd01fe01fd09fd0ffd0bfb08fe03fd08f808f70efd08fa08f626fd23fd0cfd08fd01fe01fd09fd0efd0cfb08f606f707f60cfd09fa09f726fd23fd0bfd09fb02fd09fd0dfd10fd07f60cfc06fd04fd0bfd08fd02fb0dfd09fd0cfd0cfd0bf40afd0cfd09fb02fd09fd0cfd12fd0bfd0ffd06fd04fd0afd09fd04fd0dfd09fd0cfd0dfd0af409fd19fc03fd09fd0bfd03fd06fd04fd0bfd08fd04fd06fd04fd09fd0afd04fd0cfd0afd0cfd0efd1dfd1afd04fd09fd0afd04fd06fd03fd0cfd08fd03fd07fd04fd09fd0afd04fd0bfd19fd10fd1bfd0ffd0af807f707f607f90bf907f909f80afd0bf809fb2efd19fd10fd7e51fd17fd11fd7e7e7e7e13f87e78fd05fd08fc09f709f907f808f606f608f907fd03fd07f90df905fc03fd06fb0bfd05fd05fd05fd08fb08fd05fd07fa09fd03fd07fd03fd07fd02fd08fd04fe07fd04fe07fd03fd06fd03fd09fd11fd08fd03fd07fd0cfc03fc05fd05fd07fd01fd07fd05fd06fd02fd08fd03fd06fd04fd07fd03fd07fd05ff07fd05ff06fd04fd06fd03fd09fd11fd08fd02fd08fd0cfb01fb05fc04fd06fd03fd06fd05fd05fd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd11fd08fd01fd09fd0cf505fb03fd05fd05fd05fd02fa05fd04fd07fd03fd06fd0efd03fd07fd03fe08fd03fe07fd0dfd03fd09fd11fd08fa0afd0cf505fa02fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd01fd01fd05fd01fd01fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd02ff02fd05fd02fa05fd05fd05fd02fa05f607fd03fd06fd0efd03fd07fd03fe08fd03fe07fd02fb06fd03fd09fd0bfd03fd08fa0afd0cfd05fd05fd03fb05fd05fd05fd0dfd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd0bfd03fd08fd01fd09fd05ff06fd05fd05fd04fc05fd05fd05fd0dfd04fd07fd03fd06fd04fd07fd03fd07fd05ff07fd0cfd04fd06fd03fd09fd0bfd03fd08fd02fd08fd04fe06fd05fd05fd05fd06fd03fd06fd0dfd04fd07fd03fd07fd03fd07fd02fd08fd04fe07fd0dfd03fd06fd03fd09fd0bfd03fd08fd03fd07fd03fd06fd05fd05fd05fd07fd01fd07fd0dfd04fd06f709f907f808f606fb0df806fd03fd07f90af908fc03fd06f606fd05fd05fd05fd08fb0af87e7e7e7e7e7e7e68fe1af70afb08f708f807f505fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07f608f907ff11f90afc1afd03fd07fc01fc07fd03fd06fd04fd06fe02fd02fe05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fd04fd08fd0bfe14fd09fa19fd03fd07fd03fd07fd03fd06fd04fd06ff03fd03ff05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fe05fd08fd0bfd13fd08fd02fd18fd03fd06fd05fd06fd03fd06fd04fd0afd09fd03fd07fd03fd07fd05fd06fd01fd08fd03fd07ff05fd09fd0cfd12fd07fd04fd17fd03fd06fd05fd06fd03fd06fd11fd09fd03fd07fd03fd07fd05fd07fb09fd03fd0cfd0afd0dfd11fd28f807fd05fd06f808f90cfd09fd03fd07fd03fd07fd02ff02fd08fd0bfd01fd0cfd0bfd0efd10fd28f807fd05fd06f809f90bfd09fd03fd07fd03fd07fd02ff02fd08fd0cfb0cfd0cfd0ffd0ffd28fd0cfd03fb06fd02fd0efd0afd09fd03fd07fd03fd07fd02ff02fd07fb0cfd0cfd0dfd10fd0efd28fd0cfd02fa06fd03fd06fd04fd0afd09fd03fd07fd03fd08f707fd01fd0bfd0bfd05ff08fd11fd0dfd28fd0df707fd03fd06fd04fd0afd09fd03fd08fd01fd09fc01fc06fd03fd0afd0afd05fe08fd12fd0cfd28fd0df707fd03fd06fd04fd0afd09fd03fd09fb0bfd01fd07fd03fd0afd0afd04fd08fd13fd0bfd27fb12fd06fc03fd07f809f908f90bfd0cfd01fd07fd03fd08f908f608f910fd06f93cfa7e54f07e72f07e7e7e7e0bfd1dfc21fb19fb18fc10fd0ffd07fc0dfa39fd1efd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd1cfd2dfd10fd4af909f808f909f808f90afd0cfb02fe07fd01fc08fa0cfa08fd03fd0afd09f606f809f91efd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd1dfd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd18f808fd03fd06fd0dfd03fd07f709fd0bfd03fd08fd03fd0afd0ffd08fa0dfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd0dfd03fd07fd0ffd0bfd03fd08fd03fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0cf808fd03fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0df908fd03fd0afd0ffd08fd03fd0afd09fd02ff02fd05fd03fd07fd03fd18fb02fe06fe02fb08f909fb02fe07f908f90ffd07fc03fd07f706fd03fd07fc03fd07f706fd05fd05fd03fd08f978fd03fd27fd03fd7e4af92afa7e7e7e7e7e7e18fa09fc09fa1efe4eff6efd0dfc0dfd1cfc4cfe6efd0dfc0dfd1bfa4afd6efd0dfc0dfd1afd02fd07fe02fb07fb02fe07fc02fd08f908f707fd03fd07fd03fd07fd05fd05fd02fd09fd03fd06f80afd0efc0efd08fb03fd05fd04fd07fd03fd05fd03fd09f706fd04fe09fd0bfd03fd07fd03fd07fd05fd05fd02fd09fd03fd06fe03fd08fd24fd05fd01fd02fd05fe06fe07fd03fd05fd03fd09fc02fd06fd04fe09fd0bfd03fd07fd03fd07fd05fd06fa0afd03fd06ff03fd09fd24fd05fd02fd01fd05fe06fe07fd03fd05fd03fd09fd0dfb0cfd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd09fd0cfd0efc0efd07fd03fb06fe06fe07fd03fd05fd03fd09fd0ffb0afd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd08fd0efd0dfc0dfd19fe06fe07fd03fd05fd03fd09fd0cfe04fd09fd01fd07fd03fd08fd01fd09fc01fc07fa0bf908fd03ff0bfd0dfc0dfd19fe06fe07f807f809fd0cfe04fd09fd01fd07fd03fd09fb0bfd01fd07fd02fd0bfb08fd03fe0bfd0dfc0dfd19f607fd11fd08fb0cf90bfb09fb02fe09fd0cfd01fd07fd02fd0dfd08f80cfa09fc09fa1af607fd11fd7cfd69fb0ffb77fa";

// projects/local-framework/graphics/renderers/text-renderer/TextRenderer.ts
var k_gridSize = [16, 6];
var k_texCoord = [1 / k_gridSize[0], 1 / k_gridSize[1]];
var k_bufferSize3 = 9 * 1024 * 4;

class TextRenderer {
  _shader;
  _geometry;
  _texture = new exports_graphics.webgl2.Texture;
  _texCoordMap;
  _buffer = new Float32Array(k_bufferSize3);
  _currentSize = 0;
  _textScale = 14;
  _textColor = [1, 1, 1];
  _horizontalTextAlign = "left";
  _verticalTextAlign = "top";
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("TextRenderer", {
      vertexSrc: text_renderer_glsl_default,
      fragmentSrc: text_renderer_glsl_default2,
      attributes: [
        "a_vertex_position",
        "a_vertex_texCoord",
        "a_offset_position",
        "a_offset_texCoord",
        "a_offset_color",
        "a_offset_scale"
      ],
      uniforms: ["u_composedMatrix", "u_texture"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec2f").addVboAttribute("a_vertex_texCoord", "vec2f").setStride(4 * 4).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position", "vec3f").addVboAttribute("a_offset_texCoord", "vec2f").addVboAttribute("a_offset_color", "vec3f").addVboAttribute("a_offset_scale", "float").setStride(9 * 4);
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
    const vertices = [
      {
        position: [0.5, -0.5],
        texCoord: [k_texCoord[0] * 1, k_texCoord[1] * 1]
      },
      {
        position: [-0.5, -0.5],
        texCoord: [k_texCoord[0] * 0, k_texCoord[1] * 1]
      },
      {
        position: [0.5, 0.5],
        texCoord: [k_texCoord[0] * 1, k_texCoord[1] * 0]
      },
      {
        position: [-0.5, 0.5],
        texCoord: [k_texCoord[0] * 0, k_texCoord[1] * 0]
      }
    ];
    const indices = [1, 0, 2, 1, 2, 3];
    const letterVertices = [];
    for (const index of indices) {
      const vertex = vertices[index];
      letterVertices.push(vertex.position[0], vertex.position[1], vertex.texCoord[0], vertex.texCoord[1]);
    }
    this._geometry.updateBuffer(0, letterVertices, letterVertices.length);
    this._geometry.setPrimitiveCount(letterVertices.length / 4);
    this._geometry.setFloatBufferSize(1, k_bufferSize3);
    this._texCoordMap = new Map([
      [" ", [0 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["!", [1 * k_texCoord[0], 0 * k_texCoord[1]]],
      ['"', [2 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["#", [3 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["$", [4 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["%", [5 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["&", [6 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["'", [7 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["(", [8 * k_texCoord[0], 0 * k_texCoord[1]]],
      [")", [9 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["*", [10 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["+", [11 * k_texCoord[0], 0 * k_texCoord[1]]],
      [",", [12 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["-", [13 * k_texCoord[0], 0 * k_texCoord[1]]],
      [".", [14 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["/", [15 * k_texCoord[0], 0 * k_texCoord[1]]],
      ["0", [0 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["1", [1 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["2", [2 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["3", [3 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["4", [4 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["5", [5 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["6", [6 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["7", [7 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["8", [8 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["9", [9 * k_texCoord[0], 1 * k_texCoord[1]]],
      [":", [10 * k_texCoord[0], 1 * k_texCoord[1]]],
      [";", [11 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["<", [12 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["=", [13 * k_texCoord[0], 1 * k_texCoord[1]]],
      [">", [14 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["?", [15 * k_texCoord[0], 1 * k_texCoord[1]]],
      ["@", [0 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["A", [1 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["B", [2 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["C", [3 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["D", [4 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["E", [5 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["F", [6 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["G", [7 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["H", [8 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["I", [9 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["J", [10 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["K", [11 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["L", [12 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["M", [13 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["N", [14 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["O", [15 * k_texCoord[0], 2 * k_texCoord[1]]],
      ["P", [0 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Q", [1 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["R", [2 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["S", [3 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["T", [4 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["U", [5 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["V", [6 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["W", [7 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["X", [8 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Y", [9 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["Z", [10 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["[", [11 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["\\", [12 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["]", [13 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["^", [14 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["_", [15 * k_texCoord[0], 3 * k_texCoord[1]]],
      ["`", [0 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["a", [1 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["b", [2 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["c", [3 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["d", [4 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["e", [5 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["f", [6 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["g", [7 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["h", [8 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["i", [9 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["j", [10 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["k", [11 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["l", [12 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["m", [13 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["n", [14 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["o", [15 * k_texCoord[0], 4 * k_texCoord[1]]],
      ["p", [0 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["q", [1 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["r", [2 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["s", [3 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["t", [4 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["u", [5 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["v", [6 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["w", [7 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["x", [8 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["y", [9 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["z", [10 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["{", [11 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["|", [12 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["}", [13 * k_texCoord[0], 5 * k_texCoord[1]]],
      ["~", [14 * k_texCoord[0], 5 * k_texCoord[1]]]
    ]);
    const width = 256;
    const height = 96;
    const imagePixels = new Uint8Array(width * height * 4);
    {
      let index = 0;
      for (let ii = 0;ii < asciiTextureHex.length; ii += 2) {
        let currSize = parseInt(`${asciiTextureHex.substring(ii, ii + 2)}000000`, 16) >> 24;
        let currVal = 0;
        if (currSize < 0) {
          currSize = -currSize;
          currVal = 255;
        }
        for (let ii2 = 0;ii2 < currSize; ++ii2) {
          imagePixels[index * 4 + 0] = currVal;
          imagePixels[index * 4 + 1] = currVal;
          imagePixels[index * 4 + 2] = currVal;
          imagePixels[index * 4 + 3] = currVal;
          ++index;
        }
      }
    }
    this._texture.initialize();
    this._texture.bind((boundTexture) => {
      boundTexture.loadFromMemory(width, height, imagePixels);
    });
  }
  setTextAlign(inHorizontalTextAlign, inVerticalTextAlign) {
    this._horizontalTextAlign = inHorizontalTextAlign;
    this._verticalTextAlign = inVerticalTextAlign;
    return this;
  }
  setTextScale(inScale) {
    this._textScale = inScale;
    return this;
  }
  setTextColor(inRed, inGreen, inBlue) {
    this._textColor[0] = inRed;
    this._textColor[1] = inGreen;
    this._textColor[2] = inBlue;
    return this;
  }
  pushText(inMessage, inPosition) {
    if (inMessage.length === 0) {
      return this;
    }
    if (this._textScale <= 0) {
      return this;
    }
    const allLineWidth = [0];
    for (let ii = 0;ii < inMessage.length; ++ii) {
      if (inMessage[ii] == "\n") {
        allLineWidth.push(0);
      } else {
        allLineWidth[allLineWidth.length - 1] += 1;
      }
    }
    if (allLineWidth.length === 0) {
      return this;
    }
    let lineIndex = 0;
    const currPos = [0, 0];
    const hScale = this._textScale * 0.5;
    switch (this._horizontalTextAlign) {
      case "left":
        currPos[0] = inPosition[0];
        break;
      case "centered":
        currPos[0] = inPosition[0] - allLineWidth[lineIndex] * hScale + hScale;
        break;
      case "right":
        currPos[0] = inPosition[0] - allLineWidth[lineIndex] * this._textScale + this._textScale;
        break;
    }
    switch (this._verticalTextAlign) {
      case "top":
        currPos[1] = inPosition[1];
        break;
      case "centered":
        currPos[1] = inPosition[1] + allLineWidth.length * hScale - hScale;
        break;
      case "bottom":
        currPos[1] = inPosition[1] - (allLineWidth.length - 1) * this._textScale;
        break;
    }
    for (let ii = 0;ii < inMessage.length; ++ii) {
      const letter = inMessage[ii];
      if (letter == "\n") {
        lineIndex += 1;
        switch (this._horizontalTextAlign) {
          case "left":
            currPos[0] = inPosition[0];
            break;
          case "centered":
            currPos[0] = inPosition[0] - allLineWidth[lineIndex] * hScale + hScale;
            break;
          case "right":
            currPos[0] = inPosition[0] - allLineWidth[lineIndex] * this._textScale + this._textScale;
            break;
        }
        currPos[1] -= this._textScale;
      } else {
        this._pushLetter(letter, currPos);
        currPos[0] += this._textScale;
      }
    }
    return this;
  }
  _pushLetter(inCharacter, inPosition) {
    if (this._currentSize + 9 * 10 >= this._buffer.length) {
      return;
    }
    const texCoord = this._texCoordMap.get(inCharacter);
    if (!texCoord)
      throw new Error(`fail to find a letter, letter=${inCharacter}`);
    for (let yy = -1;yy <= 1; ++yy) {
      for (let xx = -1;xx <= 1; ++xx) {
        this._buffer[this._currentSize++] = inPosition[0] + 2 * xx;
        this._buffer[this._currentSize++] = inPosition[1] + 2 * yy;
        this._buffer[this._currentSize++] = -0.1;
        this._buffer[this._currentSize++] = texCoord[0];
        this._buffer[this._currentSize++] = texCoord[1];
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = 0;
        this._buffer[this._currentSize++] = this._textScale;
      }
    }
    this._buffer[this._currentSize++] = inPosition[0];
    this._buffer[this._currentSize++] = inPosition[1];
    this._buffer[this._currentSize++] = 0;
    this._buffer[this._currentSize++] = texCoord[0];
    this._buffer[this._currentSize++] = texCoord[1];
    this._buffer[this._currentSize++] = this._textColor[0];
    this._buffer[this._currentSize++] = this._textColor[1];
    this._buffer[this._currentSize++] = this._textColor[2];
    this._buffer[this._currentSize++] = this._textScale;
  }
  flush(composedMatrix) {
    if (this._currentSize === 0) {
      return this;
    }
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      boundShader.setTextureUniform("u_texture", this._texture, 0);
      this._geometry.updateBuffer(1, this._buffer, this._currentSize);
      this._geometry.setInstancedCount(this._currentSize / 9);
      this._geometry.render();
    });
    exports_graphics.webgl2.Texture.unbind();
    this.clear();
    return this;
  }
  clear() {
    this._currentSize = 0;
    return this;
  }
}
// projects/local-framework/graphics/renderers/widgets/renderControls.ts
var defaultColor = [0.2, 0.2, 0.2];
var activatedColor = [0.2, 0.6, 0.2];
var _renderIndicator = (currIndicator, stackRenderers, textRenderer) => {
  const { center } = currIndicator;
  stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.3), currIndicator.size, [0, 0, 0]);
  stackRenderers.pushCenteredRectangle(exports_vec3.fromValues(center[0], center[1], -0.2), [currIndicator.size[0] - 2, currIndicator.size[1] - 2], currIndicator.color);
  if (currIndicator.text) {
    textRenderer.setTextScale(16).setTextAlign("centered", "centered").pushText(currIndicator.text, center).setTextAlign("left", "top");
  }
  if (currIndicator.lines) {
    currIndicator.lines.forEach((currLine) => {
      stackRenderers.pushThickLine([center[0] + currLine.a[0], center[1] + currLine.a[1], 0], [center[0] + currLine.b[0], center[1] + currLine.b[1], 0], currLine.thickness, currLine.color);
    });
  }
};
var addKeyStrokesWidgets = (inPos, stackRenderers, textRenderer) => {
  _renderIndicator({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    text: "A\nQ",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("A", "Q") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 1, inPos[1]],
    size: [40, 40],
    text: "S",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("S") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 1, inPos[1] + 45],
    size: [40, 40],
    text: "W\nZ",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("W", "Z") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 2, inPos[1]],
    size: [40, 40],
    text: "D",
    color: exports_system.browser.GlobalKeyboardManager.isPressed("D") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
};
var addArrowStrokesWidgets = (inPos, stackRenderers, textRenderer) => {
  _renderIndicator({
    center: [inPos[0], inPos[1]],
    size: [40, 40],
    lines: [
      { a: [15, 0], b: [-8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [-12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [-12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowLeft") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [0, 15], b: [0, -8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, -12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, -12], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowDown") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    lines: [
      { a: [0, -15], b: [0, 8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, 12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, 12], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowUp") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 2, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [-15, 0], b: [8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: exports_system.browser.GlobalKeyboardManager.isPressed("ArrowRight") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
};
var addKeysTouchesWidgets = (inCanvasElement, inPos, stackRenderers, textRenderer) => {
  if (exports_system.browser.GlobalTouchManager.isSupported(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nSupported\n(double tap)",
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: "Touch Events\nNot Supported",
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
  if (exports_system.browser.GlobalPointerLockManager.canBePointerLocked(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse\nSupported",
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: "Mouse Events\nNot Supported",
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
};
// projects/local-framework/graphics/renderers/widgets/renderFpsMeter.ts
var renderFpsMeter = (inPos, inSize, inFrameProfiler, inStackRenderers, inTextRenderer, inShowFps = false) => {
  const k_divider = 5;
  const k_verticalSize = Math.ceil(inFrameProfiler.maxDelta / k_divider) * k_divider;
  {
    inStackRenderers.pushOriginBoundRectangle(inPos, inSize, [0, 0, 0, 0.5]);
    const allVertices = [
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 0, 0],
      [inPos[0] + inSize[0] * 1, inPos[1] + inSize[1] * 1, 0],
      [inPos[0] + inSize[0] * 0, inPos[1] + inSize[1] * 1, 0]
    ];
    inStackRenderers.pushLine(allVertices[0], allVertices[1], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[1], allVertices[2], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[2], allVertices[3], [1, 1, 1]);
    inStackRenderers.pushLine(allVertices[3], allVertices[0], [1, 1, 1]);
  }
  {
    for (let currDivider = k_divider;currDivider < k_verticalSize; currDivider += k_divider) {
      const ratio = currDivider / k_verticalSize;
      const pointA = [
        inPos[0] + 0,
        inPos[1] + inSize[1] * ratio,
        0
      ];
      const pointB = [
        inPos[0] + inSize[0],
        inPos[1] + inSize[1] * ratio,
        0
      ];
      inStackRenderers.pushLine(pointA, pointB, [0.5, 0.5, 0.5]);
    }
  }
  {
    if (inFrameProfiler.framesDelta.length >= 2) {
      const widthStep = inSize[0] / inFrameProfiler.framesDelta.length;
      let prevDelta = inFrameProfiler.framesDelta[0];
      let prevCoordX = 0;
      let prevCoordY = inSize[1] * prevDelta / k_verticalSize;
      for (let ii = 1;ii < inFrameProfiler.framesDelta.length; ++ii) {
        const currDelta = inFrameProfiler.framesDelta[ii];
        const currCoordX = ii * widthStep;
        const currCoordY = inSize[1] * currDelta / k_verticalSize;
        const pointA = [
          inPos[0] + prevCoordX,
          inPos[1] + prevCoordY,
          0
        ];
        const pointB = [
          inPos[0] + currCoordX,
          inPos[1] + currCoordY,
          0
        ];
        inStackRenderers.pushLine(pointA, pointB, [1, 1, 1]);
        prevDelta = currDelta;
        prevCoordX = currCoordX;
        prevCoordY = currCoordY;
      }
    }
  }
  {
    const k_textScale = 14;
    const k_textHScale = k_textScale * 0.5;
    const averageValue = inFrameProfiler.averageDelta;
    const maxValue = inFrameProfiler.maxDelta;
    const minValue = inFrameProfiler.minDelta;
    let averageStr = `~${averageValue.toFixed(0)}ms`;
    let maxStr = `<${maxValue}ms`;
    let minStr = `>${minValue}ms`;
    if (inShowFps === true) {
      const _getFpsStr = (inVal) => inVal < 999 ? inVal.toFixed(0) : "???";
      averageStr += `\n~${_getFpsStr(1000 / averageValue)}fps`;
      maxStr += `\n<${_getFpsStr(1000 / maxValue)}fps`;
      minStr += `\n>${_getFpsStr(1000 / minValue)}fps`;
    }
    inTextRenderer.setTextScale(k_textScale).setTextAlign("left", "top").setTextColor(1, 1, 0.75).pushText(averageStr, [inPos[0] + 7, inPos[1] - 8]).setTextAlign("left", "centered").setTextColor(1, 0.75, 0.75).pushText(maxStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + inSize[1] - k_textHScale * 1
    ]).setTextColor(0.75, 1, 0.75).pushText(minStr, [
      inPos[0] + inSize[0] + k_textHScale,
      inPos[1] + k_textHScale * 1
    ]).setTextColor(1, 1, 1);
  }
};
// projects/local-framework/graphics/webgl2/index.ts
var exports_webgl2 = {};
__export(exports_webgl2, {
  getCubeMapType: () => getCubeMapType,
  WebGLContext: () => WebGLContext,
  Texture: () => Texture,
  ShaderProgram: () => ShaderProgram,
  GeometryWrapper: () => GeometryWrapper,
  FrameBuffer: () => FrameBuffer,
  DataTexture: () => DataTexture,
  CubeMapType: () => CubeMapType,
  CubeMap: () => CubeMap
});

// projects/local-framework/graphics/webgl2/WebGLContext.ts
class WebGLContext {
  static _gl = null;
  static _extensionLoseContext = null;
  static initialize(canvas) {
    const renderingContextAttribs = {
      alpha: false,
      antialias: false,
      depth: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      stencil: false
    };
    WebGLContext._gl = canvas.getContext("webgl2", renderingContextAttribs);
    if (!WebGLContext._gl)
      throw new Error("could not create webgl context");
    WebGLContext._extensionLoseContext = WebGLContext._gl.getExtension("WEBGL_lose_context");
    WebGLContext._gl.getExtension("EXT_color_buffer_float");
    WebGLContext._gl.getExtension("EXT_float_blend");
  }
  static getContext() {
    if (!WebGLContext._gl)
      throw new Error("webgl context not initialized");
    return WebGLContext._gl;
  }
  static getExtensionLoseContext() {
    return WebGLContext._extensionLoseContext;
  }
  static getExtensionLoseContextStrict() {
    if (!WebGLContext._extensionLoseContext)
      throw new Error("lose context extension not available");
    return WebGLContext._extensionLoseContext;
  }
}

// projects/local-framework/graphics/webgl2/CubeMap.ts
var CubeMapType;
((CubeMapType2) => {
  CubeMapType2[CubeMapType2["positiveX"] = 0] = "positiveX";
  CubeMapType2[CubeMapType2["negativeX"] = 1] = "negativeX";
  CubeMapType2[CubeMapType2["positiveY"] = 2] = "positiveY";
  CubeMapType2[CubeMapType2["negativeY"] = 3] = "negativeY";
  CubeMapType2[CubeMapType2["positiveZ"] = 4] = "positiveZ";
  CubeMapType2[CubeMapType2["negativeZ"] = 5] = "negativeZ";
})(CubeMapType ||= {});
var getCubeMapType = (inType) => {
  const gl = WebGLContext.getContext();
  switch (inType) {
    case 0 /* positiveX */:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
    case 1 /* negativeX */:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
    case 2 /* positiveY */:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
    case 3 /* negativeY */:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
    case 4 /* positiveZ */:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
    case 5 /* negativeZ */:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
  }
};

class CubeMap {
  _width = 0;
  _height = 0;
  _minBufferSize = 0;
  _texture = null;
  initialize(width, height) {
    if (width < 1)
      throw new Error(`cube map: width is < 1, input: ${width}`);
    if (height < 1)
      throw new Error(`cube map: height is < 1, input: ${height}`);
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
    this._width = width;
    this._height = height;
    this._minBufferSize = this._width * this._height * 4;
  }
  rawBind() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
  }
  bind(inCallback) {
    this.rawBind();
    inCallback(this);
    CubeMap.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
  }
  loadFromMemory(inType, inPixels) {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    if (inPixels.length < this._minBufferSize)
      throw new Error(`cube map: miss-matching pixels buffer size, input: ${inPixels.length}`);
    const gl = WebGLContext.getContext();
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(getCubeMapType(inType), level, internalFormat, this._width, this._height, border, srcFormat, srcType, inPixels);
  }
  allocate() {
    const gl = WebGLContext.getContext();
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixels = new Uint8Array(this._width * this._height * 4);
    [
      1 /* negativeX */,
      3 /* negativeY */,
      5 /* negativeZ */,
      0 /* positiveX */,
      2 /* positiveY */,
      4 /* positiveZ */
    ].forEach((type) => {
      gl.texImage2D(getCubeMapType(type), level, internalFormat, this._width, this._height, border, srcFormat, srcType, pixels);
    });
  }
  complete() {
    const gl = WebGLContext.getContext();
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  }
  getWidth() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    return this._width;
  }
  getHeight() {
    if (!this._texture)
      throw new Error("cube map: not initialized");
    return this._height;
  }
  getRawObject() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._texture;
  }
}
// projects/local-framework/graphics/webgl2/DataTexture.ts
class DataTexture {
  _texture = null;
  initialize(data = []) {
    if (this._texture)
      throw new Error("data texture already initialized");
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    this.update(data);
  }
  update(data) {
    if (!this._texture)
      throw new Error("data texture not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    const expandedData = new Float32Array(data);
    const level = 0;
    const internalFormat = gl.R32F;
    const width = data.length;
    const height = 1;
    const border = 0;
    const format = gl.RED;
    const type = gl.FLOAT;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, expandedData);
  }
  rawBind() {
    if (!this._texture)
      throw new Error("data texture not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }
  preBind(inCallback) {
    this.rawBind();
    inCallback(this);
  }
  bind(inCallback) {
    this.preBind(inCallback);
    DataTexture.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
// projects/local-framework/graphics/webgl2/FrameBuffer.ts
class FrameBuffer {
  _frameBuffer;
  constructor() {
    const gl = WebGLContext.getContext();
    const tmpFbo = gl.createFramebuffer();
    if (tmpFbo === null)
      throw new Error("null frame buffer object");
    this._frameBuffer = tmpFbo;
  }
  rawBind() {
    const gl = WebGLContext.getContext();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  }
  bind(inCallback) {
    this.rawBind();
    inCallback(this);
    FrameBuffer.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  attachTexture(texture) {
    const gl = WebGLContext.getContext();
    const mipmapLevel = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.getRawObject(), mipmapLevel);
  }
  attachCubeMap(texture, type) {
    const gl = WebGLContext.getContext();
    const mipmapLevel = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, getCubeMapType(type), texture.getRawObject(), mipmapLevel);
  }
  getPixels(x, y, width, height, outDst) {
    const gl = WebGLContext.getContext();
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, outDst);
  }
}
// projects/local-framework/graphics/webgl2/Geometry.ts
var GeometryWrapper;
((GeometryWrapper) => {
  GeometryWrapper.BytesPerPixel = 4;
  let AttributeType;
  ((AttributeType2) => {
    AttributeType2[AttributeType2["float"] = 0] = "float";
    AttributeType2[AttributeType2["vec2f"] = 1] = "vec2f";
    AttributeType2[AttributeType2["vec3f"] = 2] = "vec3f";
    AttributeType2[AttributeType2["vec4f"] = 3] = "vec4f";
    AttributeType2[AttributeType2["mat3f"] = 4] = "mat3f";
    AttributeType2[AttributeType2["mat4f"] = 5] = "mat4f";
  })(AttributeType = GeometryWrapper.AttributeType ||= {});
  const getAttrTypeSize = (inType) => {
    switch (inType) {
      case 0 /* float */:
        return 1;
      case 1 /* vec2f */:
        return 2;
      case 2 /* vec3f */:
        return 3;
      case 3 /* vec4f */:
        return 4;
      case 4 /* mat3f */:
        return 9;
      case 5 /* mat4f */:
        return 16;
    }
  };
  let PrimitiveType;
  ((PrimitiveType2) => {
    PrimitiveType2[PrimitiveType2["lines"] = 0] = "lines";
    PrimitiveType2[PrimitiveType2["triangles"] = 1] = "triangles";
    PrimitiveType2[PrimitiveType2["triangleStrip"] = 2] = "triangleStrip";
  })(PrimitiveType = GeometryWrapper.PrimitiveType ||= {});

  class Geometry {
    _def;
    _vao;
    _vbos;
    _primitiveType;
    _primitiveStart = 0;
    _primitiveCount = 0;
    _instanceCount = 0;
    _isInstanced = false;
    constructor(shader, def) {
      const gl = WebGLContext.getContext();
      if (def.vbos.length === 0) {
        throw new Error("empty vbo definition");
      }
      for (const vbo of def.vbos) {
        if (vbo.attrs.length === 0) {
          throw new Error("empty vbo attribute definition");
        }
        for (const attr of vbo.attrs) {
          if (!shader.hasAttribute(attr.name)) {
            throw new Error(`attribute not found, name="${attr.name}"`);
          }
        }
      }
      this._def = def;
      switch (def.primitiveType) {
        case 0 /* lines */:
          this._primitiveType = gl.LINES;
          break;
        case 1 /* triangles */:
          this._primitiveType = gl.TRIANGLES;
          break;
        case 2 /* triangleStrip */:
          this._primitiveType = gl.TRIANGLE_STRIP;
          break;
        default:
          throw new Error("primitive type not found");
      }
      const newVao = gl.createVertexArray();
      if (!newVao) {
        throw new Error("fail o create a vao unit");
      }
      this._vao = newVao;
      gl.bindVertexArray(this._vao);
      this._vbos = [];
      for (const vboDef of this._def.vbos) {
        const newVbo = gl.createBuffer();
        if (!newVbo) {
          throw new Error("fail o create a vbo unit");
        }
        this._vbos.push({
          object: newVbo,
          maxSize: 0,
          dynamic: vboDef.dynamic || false
        });
        gl.bindBuffer(gl.ARRAY_BUFFER, newVbo);
        let stride = vboDef.stride || 0;
        if (!stride) {
          for (const attr of vboDef.attrs) {
            switch (attr.type) {
              case 0 /* float */:
                stride += 1;
                break;
              case 1 /* vec2f */:
                stride += 2;
                break;
              case 2 /* vec3f */:
                stride += 3;
                break;
              case 3 /* vec4f */:
                stride += 4;
                break;
              case 4 /* mat3f */:
                stride += 9;
                break;
              case 5 /* mat4f */:
                stride += 16;
                break;
            }
          }
          stride *= GeometryWrapper.BytesPerPixel;
        }
        for (const attr of vboDef.attrs) {
          let rowSize = 1;
          let totalRows = 1;
          switch (attr.type) {
            case 0 /* float */:
              rowSize = 1;
              totalRows = 1;
              break;
            case 1 /* vec2f */:
              rowSize = 2;
              totalRows = 1;
              break;
            case 2 /* vec3f */:
              rowSize = 3;
              totalRows = 1;
              break;
            case 3 /* vec4f */:
              rowSize = 4;
              totalRows = 1;
              break;
            case 4 /* mat3f */:
              rowSize = 3;
              totalRows = 3;
              break;
            case 5 /* mat4f */:
              rowSize = 4;
              totalRows = 4;
              break;
          }
          const attrLocation = shader.getAttribute(attr.name);
          for (let ii = 0;ii < totalRows; ++ii) {
            const attrId = attrLocation + ii;
            const rowIndex = (attr.index + ii * rowSize) * GeometryWrapper.BytesPerPixel;
            gl.enableVertexAttribArray(attrId);
            gl.vertexAttribPointer(attrId, rowSize, gl.FLOAT, false, stride, rowIndex);
            if (vboDef.instanced === true) {
              gl.vertexAttribDivisor(attrId, 1);
              this._isInstanced = true;
            }
          }
        }
      }
      gl.bindVertexArray(null);
    }
    dispose() {
      const gl = WebGLContext.getContext();
      for (const vbo of this._vbos)
        gl.deleteBuffer(vbo.object);
      this._vbos.length = 0;
      gl.deleteVertexArray(this._vao);
    }
    setBufferSize(index, inSize) {
      if (index < 0 || index >= this._vbos.length) {
        throw new Error("no buffer available to that index");
      }
      if (inSize <= 0) {
        return;
      }
      const currVbo = this._vbos[index];
      if (inSize < currVbo.maxSize) {
        return;
      }
      currVbo.maxSize = inSize;
      const gl = WebGLContext.getContext();
      const usage = currVbo.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
      gl.bufferData(gl.ARRAY_BUFFER, inSize, usage);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    setFloatBufferSize(index, inSize) {
      this.setBufferSize(index, inSize * 4);
    }
    updateBuffer(index, vertices, inSize) {
      if (index < 0 || index >= this._vbos.length) {
        throw new Error("no buffer available to that index");
      }
      if (inSize <= 0) {
        return;
      }
      const gl = WebGLContext.getContext();
      const buffer = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
      const currVbo = this._vbos[index];
      gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
      if (inSize > currVbo.maxSize) {
        currVbo.maxSize = inSize;
        const usage = currVbo.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
        gl.bufferData(gl.ARRAY_BUFFER, buffer, usage, 0, inSize);
      } else {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, buffer, 0, inSize);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    render() {
      if (this._primitiveCount == 0) {
        return;
      }
      if (this._isInstanced && this._instanceCount == 0) {
        return;
      }
      const gl = WebGLContext.getContext();
      gl.bindVertexArray(this._vao);
      if (this._isInstanced === true) {
        gl.drawArraysInstanced(this._primitiveType, this._primitiveStart, this._primitiveCount, this._instanceCount);
      } else {
        gl.drawArrays(this._primitiveType, this._primitiveStart, this._primitiveCount);
      }
      gl.bindVertexArray(null);
    }
    setPrimitiveStart(start) {
      this._primitiveStart = start;
    }
    setPrimitiveCount(count) {
      this._primitiveCount = count;
    }
    setInstancedCount(count) {
      this._instanceCount = count;
    }
  }
  GeometryWrapper.Geometry = Geometry;

  class GeometryBuilder {
    _def = {
      vbos: [],
      primitiveType: 0 /* lines */
    };
    reset() {
      this._def = {
        vbos: [],
        primitiveType: 0 /* lines */
      };
      return this;
    }
    getDef() {
      return this._def;
    }
    setPrimitiveType(inPrimitive) {
      this._def.primitiveType = PrimitiveType[inPrimitive];
      return this;
    }
    addVbo() {
      this._def.vbos.push({
        attrs: [],
        instanced: false
      });
      return this;
    }
    setVboAsInstanced() {
      this._getLastVbo().instanced = true;
      return this;
    }
    setVboAsDynamic() {
      this._getLastVbo().dynamic = true;
      return this;
    }
    setStride(inStride) {
      this._getLastVbo().stride = inStride;
      return this;
    }
    addVboAttribute(inName, inType) {
      const currVbo = this._getLastVbo();
      const lastAttr = currVbo.attrs.length > 0 ? currVbo.attrs[currVbo.attrs.length - 1] : null;
      currVbo.attrs.push({
        name: inName,
        type: AttributeType[inType],
        index: lastAttr ? lastAttr.index + getAttrTypeSize(lastAttr.type) : 0
      });
      return this;
    }
    _getLastVbo() {
      if (this._def.vbos.length === 0) {
        throw new Error("no VBO setup");
      }
      return this._def.vbos[this._def.vbos.length - 1];
    }
  }
  GeometryWrapper.GeometryBuilder = GeometryBuilder;
})(GeometryWrapper ||= {});
// projects/local-framework/graphics/webgl2/ShaderProgram.ts
class ShaderProgram {
  static _isBound = null;
  _name;
  _program;
  _attributes = new Map;
  _uniforms = new Map;
  constructor(inName, opt) {
    this._name = inName;
    const gl = WebGLContext.getContext();
    const vertexShader = this._getShader(opt.vertexSrc, gl.VERTEX_SHADER);
    const fragmentShader = this._getShader(opt.fragmentSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program)
      throw new Error("could not create a shader program");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const lastError = gl.getProgramInfoLog(program);
      throw new Error("Failed to initialized shaders, Error linking:" + lastError);
    }
    this._program = program;
    this.bind(() => {
      this._getAttributes(opt.attributes);
      this._getUniforms(opt.uniforms);
    });
  }
  bind(inCallback) {
    if (ShaderProgram._isBound !== null) {
      throw new Error(`Double shader binding (bound: ${ShaderProgram._isBound._name}, binding: ${this._name})`);
    }
    ShaderProgram._isBound = this;
    const gl = WebGLContext.getContext();
    gl.useProgram(this._program);
    inCallback(this);
    ShaderProgram.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.useProgram(null);
    ShaderProgram._isBound = null;
  }
  isBound() {
    return ShaderProgram._isBound === this;
  }
  hasAttribute(name) {
    return this._attributes.has(name);
  }
  getAttribute(name) {
    const attribute = this._attributes.get(name);
    if (attribute === undefined)
      throw new Error(`attribute not found: ${name}`);
    return attribute;
  }
  getUniform(name) {
    const uniform = this._uniforms.get(name);
    if (uniform === undefined)
      throw new Error(`uniform not found: ${name}`);
    return uniform;
  }
  setTextureUniform(inName, inTexture, inIndex) {
    const gl = WebGLContext.getContext();
    gl.activeTexture(gl.TEXTURE0 + inIndex);
    gl.uniform1i(this.getUniform(inName), inIndex);
    inTexture.rawBind();
  }
  setInteger1Uniform(inName, inValue) {
    const gl = WebGLContext.getContext();
    gl.uniform1i(this.getUniform(inName), inValue);
  }
  setInteger2Uniform(inName, inValueX, inValueY) {
    const gl = WebGLContext.getContext();
    gl.uniform2i(this.getUniform(inName), inValueX, inValueY);
  }
  setInteger3Uniform(inName, inValueX, inValueY, inValueZ) {
    const gl = WebGLContext.getContext();
    gl.uniform3i(this.getUniform(inName), inValueX, inValueY, inValueZ);
  }
  setFloat1Uniform(inName, inValue) {
    const gl = WebGLContext.getContext();
    gl.uniform1f(this.getUniform(inName), inValue);
  }
  setFloat2Uniform(inName, inValueX, inValueY) {
    const gl = WebGLContext.getContext();
    gl.uniform2f(this.getUniform(inName), inValueX, inValueY);
  }
  setFloat3Uniform(inName, inValueX, inValueY, inValueZ) {
    const gl = WebGLContext.getContext();
    gl.uniform3f(this.getUniform(inName), inValueX, inValueY, inValueZ);
  }
  setMatrix4Uniform(inName, inMatrix) {
    const gl = WebGLContext.getContext();
    gl.uniformMatrix4fv(this.getUniform(inName), false, inMatrix);
  }
  _getAttributes(attributes) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < attributes.length; ++ii) {
      const value = gl.getAttribLocation(this._program, attributes[ii]);
      if (value < 0)
        throw new Error(`attribute not found => ${attributes[ii]}`);
      this._attributes.set(attributes[ii], value);
    }
  }
  _getUniforms(uniforms) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < uniforms.length; ++ii) {
      const value = gl.getUniformLocation(this._program, uniforms[ii]);
      if (value === null)
        throw new Error(`uniform not found => ${uniforms[ii]}`);
      this._uniforms.set(uniforms[ii], value);
    }
  }
  _getShader(src, type) {
    const gl = WebGLContext.getContext();
    const shader = gl.createShader(type);
    if (!shader)
      throw new Error("could not create a shader");
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let error_str = gl.getShaderInfoLog(shader);
      if (!error_str)
        error_str = "failed to compile a shader";
      throw new Error(error_str);
    }
    return shader;
  }
}
// projects/local-framework/graphics/webgl2/Texture.ts
class Texture {
  _width = 0;
  _height = 0;
  _texture = null;
  initialize() {
    if (this._texture)
      throw new Error("texture: already initialized");
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
  }
  rawBind() {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }
  preBind(inCallback) {
    this.rawBind();
    inCallback(this);
  }
  bind(inCallback) {
    this.preBind(inCallback);
    Texture.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  load(inImage) {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    this._width = inImage.width;
    this._height = inImage.height;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, inImage);
  }
  loadFromMemory(inWidth, inHeight, inPixels) {
    this._allocate(inWidth, inHeight, inPixels);
  }
  allocate(inWidth, inHeight) {
    this._allocate(inWidth, inHeight);
  }
  resize(inWidth, inHeight) {
    this._allocate(inWidth, inHeight);
  }
  _allocate(inWidth, inHeight, inPixels = null) {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    this._width = inWidth;
    this._height = inHeight;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, inWidth, inHeight, border, srcFormat, srcType, inPixels);
  }
  getWidth() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._width;
  }
  getHeight() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._height;
  }
  getRawObject() {
    if (!this._texture)
      throw new Error("texture not initialized");
    return this._texture;
  }
  static getImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const image = new Image;
      image.onerror = reject;
      image.onload = () => {
        resolve(image);
      };
      image.src = url;
    });
  }
}
// projects/proof-of-concept-ik/src/configuration.ts
var controllerMovingSpeed = 16;
var controllerMouseSensibility = 10;
var controllerKeyboardSensibility = Math.PI * 0.55;
var controllerTouchSensibility = 15;

// projects/proof-of-concept-ik/src/app/graphics/renderers/scene/wire-frame-cubes-renderer/shaders/wire-frame-cubes-renderer.glsl.vert
var wire_frame_cubes_renderer_glsl_default = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec3  a_vertex_position;

in vec3  a_offset_center;
in float a_offset_scale;
in vec3  a_offset_color;

flat out vec3 v_color;

void main(void)
{
  vec3 position = a_offset_center + a_vertex_position * a_offset_scale;

  gl_Position = u_composedMatrix * vec4(position, 1.0);

  v_color = a_offset_color;
}
`.trim();

// projects/proof-of-concept-ik/src/app/graphics/renderers/scene/wire-frame-cubes-renderer/shaders/wire-frame-cubes-renderer.glsl.frag
var wire_frame_cubes_renderer_glsl_default2 = `
#version 300 es

precision lowp float;

flat in vec3 v_color;

out vec4 o_color;

void main(void)
{
  o_color = vec4(v_color, 1.0);
}
`.trim();

// projects/proof-of-concept-ik/src/app/graphics/renderers/scene/wire-frame-cubes-renderer/WireFrameCubesRenderer.ts
var k_bufferSize4 = 7 * 512 * 4;
var generateWireFrameCubeVertices = (inSize) => {
  const hSize = inSize * 0.5;
  const vertices = [];
  vertices.push([+hSize, +hSize, +hSize]);
  vertices.push([-hSize, +hSize, +hSize]);
  vertices.push([+hSize, -hSize, +hSize]);
  vertices.push([-hSize, -hSize, +hSize]);
  vertices.push([+hSize, +hSize, -hSize]);
  vertices.push([-hSize, +hSize, -hSize]);
  vertices.push([+hSize, -hSize, -hSize]);
  vertices.push([-hSize, -hSize, -hSize]);
  const indices = [];
  indices.push(0, 1, 1, 3, 3, 2, 2, 0);
  indices.push(4, 5, 5, 7, 7, 6, 6, 4);
  indices.push(0, 4, 1, 5, 3, 7, 2, 6);
  const finalVertices = [];
  for (let ii = 0;ii < indices.length; ++ii) {
    const vertex = vertices[indices[ii]];
    finalVertices.push(vertex[0]);
    finalVertices.push(vertex[1]);
    finalVertices.push(vertex[2]);
  }
  return finalVertices;
};

class WireFrameCubesRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize4);
  _currentSize = 0;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("WireFrameCubesRenderer", {
      vertexSrc: wire_frame_cubes_renderer_glsl_default,
      fragmentSrc: wire_frame_cubes_renderer_glsl_default2,
      attributes: [
        "a_vertex_position",
        "a_offset_center",
        "a_offset_scale",
        "a_offset_color"
      ],
      uniforms: ["u_composedMatrix"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("lines").addVbo().addVboAttribute("a_vertex_position", "vec3f").addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_center", "vec3f").addVboAttribute("a_offset_scale", "float").addVboAttribute("a_offset_color", "vec3f");
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
    const vertices = generateWireFrameCubeVertices(1);
    this._geometry.updateBuffer(0, vertices, vertices.length);
    this._geometry.setPrimitiveCount(vertices.length / 3);
  }
  pushCenteredCube(inCenter, inScale, inColor) {
    this._buffer[this._currentSize + 0] = inCenter[0];
    this._buffer[this._currentSize + 1] = inCenter[1];
    this._buffer[this._currentSize + 2] = inCenter[2];
    this._buffer[this._currentSize + 3] = inScale;
    this._buffer[this._currentSize + 4] = inColor[0];
    this._buffer[this._currentSize + 5] = inColor[1];
    this._buffer[this._currentSize + 6] = inColor[2];
    this._currentSize += 7;
  }
  pushOriginBoundCube(inOrigin, inScale, inColor) {
    this._buffer[this._currentSize + 0] = inOrigin[0] + inScale * 0.5;
    this._buffer[this._currentSize + 1] = inOrigin[1] + inScale * 0.5;
    this._buffer[this._currentSize + 2] = inOrigin[2] + inScale * 0.5;
    this._buffer[this._currentSize + 3] = inScale;
    this._buffer[this._currentSize + 4] = inColor[0];
    this._buffer[this._currentSize + 5] = inColor[1];
    this._buffer[this._currentSize + 6] = inColor[2];
    this._currentSize += 7;
  }
  flush(composedMatrix, clearStack = true) {
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      this._geometry.updateBuffer(1, this._buffer, this._currentSize);
      this._geometry.setInstancedCount(this._currentSize / 7);
      this._geometry.render();
    });
    if (clearStack === true) {
      this.clear();
    }
  }
  clear() {
    this._currentSize = 0;
  }
}
// projects/proof-of-concept-ik/src/app/graphics/renderers/scene/shape-renderer/ShapeRenderer.ts
class ShapeRenderer {
  _renderer = new exports_graphics.renderers.GeometryStackRenderer;
  constructor() {
    {
      const modelMat4 = exports_mat4.create();
      exports_mat4.identity(modelMat4);
      const rawData = exports_graphics.geometries.generateSphereVertices(0, 0.5, modelMat4, true);
      this._renderer.createAlias(666, 128, rawData);
    }
    {
      const rawData = exports_graphics.geometries.generateBoxVertices([1, 1, 1]);
      this._renderer.createAlias(777, 128, rawData);
    }
  }
  pushSphere(inCenter, inOrientation, inScale, inColor) {
    this._renderer.pushAlias(666, inCenter, inOrientation, inScale, inColor);
  }
  pushBox(inCenter, inOrientation, inScale, inColor) {
    this._renderer.pushAlias(777, inCenter, inOrientation, inScale, inColor);
  }
  flush(composedMatrix, lightPos) {
    this._renderer.flush(composedMatrix, lightPos);
  }
}
// projects/proof-of-concept-ik/src/app/graphics/WebGLRenderer.ts
class WebGLRenderer {
  _def;
  _viewportSize;
  _frustumCulling;
  _mainCamera = new exports_graphics.camera.Camera;
  _mainHudCamera = new exports_graphics.camera.Camera;
  onContextLost = null;
  onContextRestored = null;
  _textRenderer;
  _wireFrameCubesRenderer;
  _stackRenderers;
  _shapeRenderer;
  constructor(def) {
    this._def = def;
    this._viewportSize = [
      this._def.canvasDomElement.width,
      this._def.canvasDomElement.height
    ];
    this.resize(this._viewportSize[0], this._viewportSize[1]);
    exports_graphics.webgl2.WebGLContext.initialize(this._def.canvasDomElement);
    this._def.canvasDomElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      console.log("context is lost");
      if (this.onContextLost)
        this.onContextLost();
    }, false);
    this._def.canvasDomElement.addEventListener("webglcontextrestored", () => {
      console.log("context is restored");
      exports_graphics.webgl2.WebGLContext.initialize(this._def.canvasDomElement);
      if (this.onContextRestored)
        this.onContextRestored();
    }, false);
    this._frustumCulling = new exports_graphics.camera.FrustumCulling;
    this._textRenderer = new exports_graphics.renderers.TextRenderer;
    this._wireFrameCubesRenderer = new WireFrameCubesRenderer;
    this._stackRenderers = new exports_graphics.renderers.StackRenderers;
    this._shapeRenderer = new ShapeRenderer;
  }
  async initialize() {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    gl.enable(gl.CULL_FACE);
  }
  resize(width, height) {
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    this._mainCamera.setViewportSize(width, height);
    this._mainCamera.setAsPerspective({ fovy: 70, near: 0.1, far: 100 });
    this._mainCamera.computeMatrices();
    this._mainHudCamera.setViewportSize(width, height);
    this._mainHudCamera.setAsOrthogonal({
      left: -width * 0.5,
      right: +width * 0.5,
      top: -height * 0.5,
      bottom: +height * 0.5,
      near: -200,
      far: 200
    });
    this._mainHudCamera.setEye([+width * 0.5, +height * 0.5, 1]);
    this._mainHudCamera.setTarget([+width * 0.5, +height * 0.5, 0]);
    this._mainHudCamera.setUpAxis([0, 1, 0]);
    this._mainHudCamera.computeMatrices();
  }
  toggleContextLoss() {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    const extensionLoseContext = exports_graphics.webgl2.WebGLContext.getExtensionLoseContext();
    if (extensionLoseContext) {
      if (gl.isContextLost()) {
        extensionLoseContext.restoreContext();
      } else {
        extensionLoseContext.loseContext();
      }
    }
  }
  contextIsLost() {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    return gl.isContextLost();
  }
  setOnContextLost(callback) {
    this.onContextLost = callback;
  }
  setOnContextRestored(callback) {
    this.onContextRestored = callback;
  }
  lookAt(inEye, inTarget, inUpAxis) {
    this._mainCamera.lookAt(inEye, inTarget, inUpAxis);
    this._mainCamera.computeMatrices();
  }
  update() {
    this._mainCamera.computeComposedMatrix();
    this._mainHudCamera.computeComposedMatrix();
    this._frustumCulling.calculateFrustum(this._mainCamera.getProjectionMatrix(), this._mainCamera.getViewMatrix());
  }
  renderScene(callback) {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    const [width, height] = this._viewportSize;
    const modelMat4 = exports_mat4.create();
    exports_mat4.identity(modelMat4);
    exports_mat4.translate(modelMat4, modelMat4, [10, 10, 0]);
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    callback(this._mainCamera, this._frustumCulling);
    this._wireFrameCubesRenderer.flush(this._mainCamera.getComposedMatrix());
    this._stackRenderers.flush(this._mainCamera.getComposedMatrix());
    this._shapeRenderer.flush(this._mainCamera.getComposedMatrix(), this._mainCamera.getEye());
  }
  renderHUD(callback) {
    const [width, height] = this._viewportSize;
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    gl.viewport(0, 0, width, height);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    const hudProjectionMatrix = exports_mat4.create();
    exports_mat4.ortho(hudProjectionMatrix, -width * 0.5, +width * 0.5, -height * 0.5, +height * 0.5, -200, 200);
    const hudViewMatrix = exports_mat4.create();
    exports_mat4.lookAt(hudViewMatrix, [+width * 0.5, +height * 0.5, 1], [+width * 0.5, +height * 0.5, 0], [0, 1, 0]);
    const hudComposedMatrix = exports_mat4.create();
    exports_mat4.multiply(hudComposedMatrix, hudProjectionMatrix, hudViewMatrix);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_DST_ALPHA);
    callback();
    this._stackRenderers.flush(hudComposedMatrix);
    this._textRenderer.flush(hudComposedMatrix);
    gl.disable(gl.BLEND);
    exports_graphics.webgl2.ShaderProgram.unbind();
  }
  get size() {
    return this._viewportSize;
  }
  get mainCamera() {
    return this._mainCamera;
  }
  get hudCamera() {
    return this._mainHudCamera;
  }
  get stackRenderers() {
    return this._stackRenderers;
  }
  get textRenderer() {
    return this._textRenderer;
  }
  get frustumCulling() {
    return this._frustumCulling;
  }
  get wireFrameCubesRenderer() {
    return this._wireFrameCubesRenderer;
  }
  get shapeRenderer() {
    return this._shapeRenderer;
  }
}

// projects/proof-of-concept-ik/src/app/Application.ts
var _lerp1D = (valA, valB, ratio) => {
  return valA + (valB - valA) * ratio;
};
var _lerp2D = (valA, valB, ratio) => {
  return exports_vec2.lerp(exports_vec2.create(), valA, valB, ratio);
};
var _lerp3D = (valA, valB, ratio) => {
  return exports_vec3.lerp(exports_vec3.create(), valA, valB, ratio);
};
var _debugStuff = (inRenderer, inTime) => {
  {
    const posX = 30;
    const posY = 30;
    const animRatio = exports_system.math.easeClamp(inTime * 0.25);
    const allWaypoints = [
      [6 + 2 * 0, 0.5 + 3 * 0],
      [6 + 2 * 1, 0.5 + 3 * 1],
      [6 + 2 * 0, 0.5 + 3 * 1],
      [6 + 2 * 1, 0.5 + 3 * 0]
    ];
    const customEasing = new exports_system.math.GenericEasing(_lerp2D);
    customEasing.push(1 / 4 * 0, allWaypoints[0]);
    customEasing.push(1 / 4 * 1, allWaypoints[1]);
    customEasing.push(1 / 4 * 2, allWaypoints[2]);
    customEasing.push(1 / 4 * 3, allWaypoints[3]);
    customEasing.push(1 / 4 * 4, allWaypoints[0]);
    const ikTarget = customEasing.get(animRatio);
    const circleA = {
      center: [0, 0],
      radius: 5
    };
    const circleB = {
      center: ikTarget,
      radius: 5
    };
    const result = exports_system.math.ik.circleCircleIntersectionPoints(circleA, circleB);
    {
      const k_color = [1, 1, 1];
      inRenderer.stackRenderers.pushCross([posX + circleA.center[0], posY, circleA.center[1]], 1.5, k_color);
      inRenderer.stackRenderers.pushCross([posX + circleB.center[0], posY, circleB.center[1]], 1.5, k_color);
    }
    {
      const k_color = [0.5, 0.5, 0.5];
      const k_quality = 32;
      for (let ii = 0;ii < k_quality; ii += 2) {
        const jj = (ii + 1) % k_quality;
        const angleA = ii / k_quality * Math.PI * 2;
        const angleB = jj / k_quality * Math.PI * 2;
        const cosA = Math.cos(angleA);
        const sinA = Math.sin(angleA);
        const cosB = Math.cos(angleB);
        const sinB = Math.sin(angleB);
        inRenderer.stackRenderers.pushLine([posX + circleA.center[0] + cosA * circleA.radius, posY + 0, circleA.center[1] + sinA * circleA.radius], [posX + circleA.center[0] + cosB * circleA.radius, posY + 0, circleA.center[1] + sinB * circleA.radius], k_color);
        inRenderer.stackRenderers.pushLine([posX + circleB.center[0] + cosA * circleB.radius, posY + 0, circleB.center[1] + sinA * circleB.radius], [posX + circleB.center[0] + cosB * circleB.radius, posY + 0, circleB.center[1] + sinB * circleB.radius], k_color);
      }
    }
    {
      for (let ii = 0;ii < allWaypoints.length; ++ii) {
        const jj = (ii + 1) % allWaypoints.length;
        const posA = allWaypoints[ii];
        const posB = allWaypoints[jj];
        inRenderer.stackRenderers.pushLine([posX + posA[0], posY, posA[1]], [posX + posB[0], posY, posB[1]], [0.5, 0.5, 0.5]);
      }
    }
    if (result) {
      result.forEach((intersectionPoint, index) => {
        const k_color = index % 2 == 0 ? [1, 0.5, 0.5] : [0.5, 0.5, 1];
        inRenderer.stackRenderers.pushCross([posX + intersectionPoint[0], posY, intersectionPoint[1]], 1.5, k_color);
        inRenderer.stackRenderers.pushLine([posX + circleA.center[0], posY + 0, circleA.center[1]], [posX + intersectionPoint[0], posY + 0, intersectionPoint[1]], k_color);
        inRenderer.stackRenderers.pushLine([posX + circleB.center[0], posY + 0, circleB.center[1]], [posX + intersectionPoint[0], posY + 0, intersectionPoint[1]], k_color);
      });
    }
  }
  {
    const animRawRatio = inTime * 0.25 - Math.floor(inTime * 0.25);
    const mainOrigin = [15, 30, 0];
    const allWaypoints = [
      [mainOrigin[0] - 2, mainOrigin[1] - 7 + 3 * -0, mainOrigin[2] + 2 * 0],
      [mainOrigin[0] - 2, mainOrigin[1] - 7 + 3 * 1, mainOrigin[2] + 2 * 0],
      [mainOrigin[0] + 2, mainOrigin[1] - 7 + 3 * 0, mainOrigin[2] + 2 * 1],
      [mainOrigin[0] + 2, mainOrigin[1] - 7 + 3 * 1, mainOrigin[2] + 2 * 1]
    ];
    const customEasing = new exports_system.math.GenericEasing(_lerp3D).push(0, allWaypoints[0]).push(0.25, allWaypoints[1]).push(0.5, allWaypoints[2]).push(0.75, allWaypoints[3]).push(1, allWaypoints[0]);
    for (let ii = 0;ii < allWaypoints.length; ++ii) {
      const jj = (ii + 1) % allWaypoints.length;
      const posA = allWaypoints[ii];
      const posB = allWaypoints[jj];
      inRenderer.stackRenderers.pushLine(posA, posB, [1, 1, 1]);
    }
    const mainTarget = customEasing.get(animRawRatio);
    {
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 3, mainOrigin[1] + 0, mainOrigin[2] + 0], [1, 0, 0]);
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 0, mainOrigin[1] + 3, mainOrigin[2] + 0], [1, 0, 0]);
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 0, mainOrigin[1] + 0, mainOrigin[2] + 3], [1, 0, 0]);
    }
    {
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 3, mainTarget[1] + 0, mainTarget[2] + 0], [0, 1, 0]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 3, mainTarget[2] + 0], [0, 1, 0]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 0, mainTarget[2] + 3], [0, 1, 0]);
    }
    const rootMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.translate(rootMat4, rootMat4, mainOrigin);
    exports_mat4.rotate(rootMat4, rootMat4, Math.PI * 0.5, [0, 0, 1]);
    const limbData = new exports_system.math.ik.LimbData(rootMat4, 5, 5);
    const rollValue = exports_vec3.fromValues(1, 1, 0);
    exports_vec3.normalize(rollValue, rollValue);
    const result = limbData.computeIk_fixedRoll(mainTarget, rollValue);
    if (result) {
      const baseMat4 = exports_mat4.identity(exports_mat4.create());
      const primaryMat4 = exports_mat4.identity(exports_mat4.create());
      const secondaryMat4 = exports_mat4.identity(exports_mat4.create());
      [result.jointA, result.jointB].forEach((currJoint, index) => {
        limbData.extractTransforms(result, currJoint, baseMat4, primaryMat4, secondaryMat4);
        const _subRender = (currMat4, length5) => {
          const k_color = index % 2 === 0 ? [0.5, 0.5, 0.5] : [0.25, 0.25, 0.25];
          const rawOrigin = exports_vec3.fromValues(0, 0, 0);
          const rawForward = exports_vec3.fromValues(length5, 0, 0);
          const rawLeft = exports_vec3.fromValues(0, 1, 0);
          const rawUp = exports_vec3.fromValues(0, 0, 1);
          const origin = exports_vec3.transformMat4(rawOrigin, rawOrigin, currMat4);
          const forward = exports_vec3.transformMat4(rawForward, rawForward, currMat4);
          const left = exports_vec3.transformMat4(rawLeft, rawLeft, currMat4);
          const up = exports_vec3.transformMat4(rawUp, rawUp, currMat4);
          inRenderer.stackRenderers.pushLine(origin, forward, [1, 0, 0]);
          inRenderer.stackRenderers.pushLine(origin, left, [0, 1, 0]);
          inRenderer.stackRenderers.pushLine(origin, up, [0, 0, 1]);
          inRenderer.shapeRenderer.pushBox(exports_vec3.lerp(exports_vec3.create(), origin, forward, 0.5), exports_quat.fromMat3(exports_quat.create(), exports_mat3.fromMat4(exports_mat3.create(), currMat4)), [length5, 1, 0.5], k_color);
        };
        _subRender(baseMat4, 1);
        _subRender(primaryMat4, limbData.primaryLength);
        _subRender(secondaryMat4, limbData.secondaryLength);
      });
    }
  }
  {
    const animRawRatio = exports_system.math.easeClamp(inTime * 0.125);
    const mainOrigin = [0, 30, 0];
    const allWaypoints = [];
    const startRadius = Math.PI * 0.75;
    const completeRadius = Math.PI * 0.5;
    const quality = 64;
    for (let ii = 0;ii < quality; ++ii) {
      const angleRatio = ii / quality * completeRadius + startRadius;
      const cosVal = Math.cos(angleRatio);
      const sinVal = Math.sin(angleRatio);
      const sinVal2 = Math.sin(angleRatio * 16);
      allWaypoints.push([
        mainOrigin[0] + 0 + sinVal * 6,
        mainOrigin[1] + 0 + cosVal * 6,
        mainOrigin[2] - 3 + 1 + sinVal2
      ]);
    }
    for (let ii = quality - 1;ii >= 0; --ii) {
      const angleRatio = ii / quality * completeRadius + startRadius;
      const cosVal = Math.cos(angleRatio);
      const sinVal = Math.sin(angleRatio);
      allWaypoints.push([
        mainOrigin[0] + 0 + sinVal * 5,
        mainOrigin[1] + 0 + cosVal * 5,
        mainOrigin[2] - 3
      ]);
    }
    const customEasing = new exports_system.math.GenericEasing(_lerp3D);
    for (let ii = 0;ii <= allWaypoints.length; ++ii) {
      const safeII = ii % allWaypoints.length;
      const currRatio = ii / (allWaypoints.length + 1);
      customEasing.push(currRatio, allWaypoints[safeII]);
    }
    for (let ii = 0;ii < allWaypoints.length; ++ii) {
      const jj = (ii + 1) % allWaypoints.length;
      const posA = allWaypoints[ii];
      const posB = allWaypoints[jj];
      inRenderer.stackRenderers.pushLine(posA, posB, [1, 1, 1]);
    }
    const mainTarget = customEasing.get(animRawRatio);
    {
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 3, mainOrigin[1] + 0, mainOrigin[2] + 0], [1, 0, 0]);
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 0, mainOrigin[1] + 3, mainOrigin[2] + 0], [1, 0, 0]);
      inRenderer.stackRenderers.pushLine(mainOrigin, [mainOrigin[0] + 0, mainOrigin[1] + 0, mainOrigin[2] + 3], [1, 0, 0]);
    }
    {
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 3, mainTarget[1] + 0, mainTarget[2] + 0], [0, 1, 0]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 3, mainTarget[2] + 0], [0, 1, 0]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 0, mainTarget[2] + 3], [0, 1, 0]);
    }
    const rootMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.translate(rootMat4, rootMat4, mainOrigin);
    exports_mat4.rotate(rootMat4, rootMat4, Math.PI * 0.5, [0, 0, 1]);
    const limbData = new exports_system.math.ik.LimbData(rootMat4, 5, 5);
    const rollValue = exports_vec3.fromValues(1, -1, 0);
    exports_vec3.normalize(rollValue, rollValue);
    const result = limbData.computeIk_fixedRoll(mainTarget, rollValue);
    if (result) {
      const baseMat4 = exports_mat4.identity(exports_mat4.create());
      const primaryMat4 = exports_mat4.identity(exports_mat4.create());
      const secondaryMat4 = exports_mat4.identity(exports_mat4.create());
      [result.jointA, result.jointB].forEach((currJoint, index) => {
        limbData.extractTransforms(result, currJoint, baseMat4, primaryMat4, secondaryMat4);
        const _subRender = (currMat4, length5) => {
          const k_color = index % 2 === 0 ? [0.5, 0.5, 0.5] : [0.25, 0.25, 0.25];
          const rawOrigin = exports_vec3.fromValues(0, 0, 0);
          const rawForward = exports_vec3.fromValues(length5, 0, 0);
          const rawLeft = exports_vec3.fromValues(0, 1, 0);
          const rawUp = exports_vec3.fromValues(0, 0, 1);
          const origin = exports_vec3.transformMat4(rawOrigin, rawOrigin, currMat4);
          const forward = exports_vec3.transformMat4(rawForward, rawForward, currMat4);
          const left = exports_vec3.transformMat4(rawLeft, rawLeft, currMat4);
          const up = exports_vec3.transformMat4(rawUp, rawUp, currMat4);
          inRenderer.stackRenderers.pushLine(origin, forward, [1, 0, 0]);
          inRenderer.stackRenderers.pushLine(origin, left, [0, 1, 0]);
          inRenderer.stackRenderers.pushLine(origin, up, [0, 0, 1]);
          inRenderer.shapeRenderer.pushBox(exports_vec3.lerp(exports_vec3.create(), origin, forward, 0.5), exports_quat.fromMat3(exports_quat.create(), exports_mat3.fromMat4(exports_mat3.create(), currMat4)), [length5, 1, 0.5], k_color);
        };
        _subRender(baseMat4, 1);
        _subRender(primaryMat4, limbData.primaryLength);
        _subRender(secondaryMat4, limbData.secondaryLength);
      });
    }
  }
};
var _walkingSpider = (inRenderer, inTime) => {
  const k_rootPos = [15, 10, 0];
  const extraElevationRatio = exports_system.math.easePinPong(exports_system.math.easeClamp(inTime * 0.125));
  const customEasing = new exports_system.math.GenericEasing(_lerp1D).push(0, 0).push(0.4, 0).push(0.5, -6).push(1, -6);
  const extraElevation = customEasing.get(extraElevationRatio);
  const debugLegAnimation = (mainOrigin, reverseY, animRawRatio) => {
    const coefY = reverseY ? -1 : 1;
    const allWaypoints = [
      [mainOrigin[0] + 5 - 8, mainOrigin[1] + 5 * coefY, mainOrigin[2] - 7 + 3 * 0],
      [mainOrigin[0] + 5 - 5, mainOrigin[1] + 5 * coefY, mainOrigin[2] - 7 + 3 * 1],
      [mainOrigin[0] + 5 - 2, mainOrigin[1] + 5 * coefY, mainOrigin[2] - 7 + 3 * 0]
    ];
    const customEasing2 = new exports_system.math.GenericEasing(_lerp3D).push(0, allWaypoints[0]).push(1 / 3 * 0.5 * 1, allWaypoints[1]).push(1 / 3 * 0.5 * 2, allWaypoints[2]).push(1, allWaypoints[0]);
    for (let currIndex = 0;currIndex < allWaypoints.length; ++currIndex) {
      const nextIndex = (currIndex + 1) % allWaypoints.length;
      const posA = allWaypoints[currIndex];
      const posB = allWaypoints[nextIndex];
      inRenderer.stackRenderers.pushLine(posA, posB, [1, 1, 1]);
    }
    const mainTarget = customEasing2.get(animRawRatio);
    {
      inRenderer.stackRenderers.pushLine([mainOrigin[0], mainOrigin[1], mainOrigin[2] + extraElevation], [mainOrigin[0] + 3, mainOrigin[1] + 0, mainOrigin[2] + 0 + extraElevation], [1, 0, 0]);
      inRenderer.stackRenderers.pushLine([mainOrigin[0], mainOrigin[1], mainOrigin[2] + extraElevation], [mainOrigin[0] + 0, mainOrigin[1] + 3, mainOrigin[2] + 0 + extraElevation], [0, 1, 0]);
      inRenderer.stackRenderers.pushLine([mainOrigin[0], mainOrigin[1], mainOrigin[2] + extraElevation], [mainOrigin[0] + 0, mainOrigin[1] + 0, mainOrigin[2] + 3 + extraElevation], [0, 0, 1]);
    }
    {
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 3, mainTarget[1] + 0, mainTarget[2] + 0], [1, 0.5, 0.5]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 3, mainTarget[2] + 0], [0.5, 1, 0.5]);
      inRenderer.stackRenderers.pushLine(mainTarget, [mainTarget[0] + 0, mainTarget[1] + 0, mainTarget[2] + 3], [0.5, 0.5, 1]);
    }
    const rootMat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.translate(rootMat4, rootMat4, mainOrigin);
    exports_mat4.translate(rootMat4, rootMat4, [0, 0, extraElevation]);
    exports_mat4.rotate(rootMat4, rootMat4, Math.PI * -0.5, [1, 0, 0]);
    const limbData = new exports_system.math.ik.LimbData(rootMat4, 5, 5);
    const result = limbData.computeIk_fixedRoll(mainTarget, [0, 0, 1]);
    if (result) {
      const baseMat4 = exports_mat4.identity(exports_mat4.create());
      const primaryMat4 = exports_mat4.identity(exports_mat4.create());
      const secondaryMat4 = exports_mat4.identity(exports_mat4.create());
      [result.jointA].forEach((currJoint, index) => {
        const k_color = index % 2 === 0 ? [1, 1, 1] : [0.5, 0.5, 0.5];
        limbData.extractTransforms(result, currJoint, baseMat4, primaryMat4, secondaryMat4);
        const _subRender = (currMat4, length5) => {
          const rawOrigin = exports_vec3.fromValues(0, 0, 0);
          const rawForward = exports_vec3.fromValues(length5, 0, 0);
          const rawLeft = exports_vec3.fromValues(0, 1, 0);
          const rawUp = exports_vec3.fromValues(0, 0, 1);
          const origin = exports_vec3.transformMat4(rawOrigin, rawOrigin, currMat4);
          const forward = exports_vec3.transformMat4(rawForward, rawForward, currMat4);
          const left = exports_vec3.transformMat4(rawLeft, rawLeft, currMat4);
          const up = exports_vec3.transformMat4(rawUp, rawUp, currMat4);
          inRenderer.stackRenderers.pushLine(origin, forward, [1, 0, 0]);
          inRenderer.stackRenderers.pushLine(origin, left, [0, 1, 0]);
          inRenderer.stackRenderers.pushLine(origin, up, [0, 0, 1]);
          inRenderer.shapeRenderer.pushBox(exports_vec3.lerp(exports_vec3.create(), origin, forward, 0.5), exports_quat.fromMat3(exports_quat.create(), exports_mat3.fromMat4(exports_mat3.create(), currMat4)), [length5, 1, 0.5], k_color);
        };
        _subRender(baseMat4, 1);
        _subRender(primaryMat4, limbData.primaryLength);
        _subRender(secondaryMat4, limbData.secondaryLength);
      });
    }
  };
  debugLegAnimation([k_rootPos[0] - 3.5, k_rootPos[1] + 1, k_rootPos[2] - 0.75], false, exports_system.math.easeClamp(inTime * 0.5 + 0));
  debugLegAnimation([k_rootPos[0] - 3.5, k_rootPos[1] - 1, k_rootPos[2] - 0.75], true, exports_system.math.easeClamp(inTime * 0.5 + 0.25));
  debugLegAnimation([k_rootPos[0] + 3.5, k_rootPos[1] + 1, k_rootPos[2] - 0.75], false, exports_system.math.easeClamp(inTime * 0.5 + 0.5));
  debugLegAnimation([k_rootPos[0] + 3.5, k_rootPos[1] - 1, k_rootPos[2] - 0.75], true, exports_system.math.easeClamp(inTime * 0.5 + 0.75));
  inRenderer.shapeRenderer.pushBox([k_rootPos[0], k_rootPos[1], k_rootPos[2] + extraElevation], exports_quat.identity(exports_quat.create()), [8, 3, 2], [0.5, 0.5, 0.5]);
  {
    const ratio = exports_system.math.easeClamp(inTime * 1.5);
    for (let ii = 0;ii < 9; ++ii) {
      inRenderer.stackRenderers.pushLine([k_rootPos[0] + 23 - ratio * 5 - ii * 5, k_rootPos[1] - 15 + 0, k_rootPos[2] - 7.75], [k_rootPos[0] + 23 - ratio * 5 - ii * 5, k_rootPos[1] - 15 + 30, k_rootPos[2] - 7.75], [0.5, 0.5, 0.5]);
    }
    for (let ii = 0;ii < 7; ++ii) {
      inRenderer.stackRenderers.pushLine([k_rootPos[0] + 23 - ratio * 5 - 0 * 5, k_rootPos[1] - 15 + ii * 5, k_rootPos[2] - 7.75], [k_rootPos[0] + 23 - ratio * 5 - 8 * 5, k_rootPos[1] - 15 + ii * 5, k_rootPos[2] - 7.75], [0.5, 0.5, 0.5]);
    }
  }
};
class Application {
  _canvasElement;
  _renderer;
  _freeFlyController;
  _running;
  _errorGraphicContext;
  _currFrameTime = Date.now();
  _frameProfiler = new exports_system.metrics.FrameProfiler;
  _time = 0;
  constructor(canvasElement) {
    this._canvasElement = canvasElement;
    this._renderer = new WebGLRenderer({
      canvasDomElement: canvasElement
    });
    this._freeFlyController = new exports_system.controllers.FreeFlyController({
      position: exports_vec3.fromValues(30, -15, 20),
      coordinates: ["X", "Y", "Z"],
      theta: Math.PI * 0.65,
      phi: Math.PI * -0.2,
      mouseSensibility: controllerMouseSensibility,
      movingSpeed: controllerMovingSpeed,
      keyboardSensibility: controllerKeyboardSensibility,
      touchSensibility: controllerTouchSensibility
    });
    this._running = false;
    this._errorGraphicContext = false;
    this._renderer.setOnContextLost(() => {
      console.log("on_context_lost");
      this._errorGraphicContext = true;
      this.stop();
    });
    this._renderer.setOnContextRestored(() => {
      console.log("on_context_restored");
      this._errorGraphicContext = false;
      this.start();
    });
  }
  async init() {
    await this._renderer.initialize();
  }
  start() {
    if (this.isRunning())
      return;
    this._running = true;
    this._tick();
  }
  stop() {
    this._running = false;
  }
  isRunning() {
    return this._running && !this._errorGraphicContext;
  }
  resize(width, height) {
    this._renderer.resize(width, height);
  }
  _tick() {
    const tick = () => {
      if (!this._running || this._errorGraphicContext)
        return;
      this._mainLoop();
      window.requestAnimationFrame(tick);
    };
    tick();
  }
  _mainLoop() {
    const currentTime = Date.now();
    const deltaSecTime = exports_system.math.clamp(currentTime - this._currFrameTime, 0, 1000);
    this._currFrameTime = currentTime;
    this._frameProfiler.pushDelta(deltaSecTime);
    this._freeFlyController.update(deltaSecTime / 1000);
    exports_system.browser.GlobalMouseManager.resetDeltas();
    exports_system.browser.GlobalTouchManager.resetDeltas();
    this._time += deltaSecTime / 1000;
    this._renderer.lookAt(this._freeFlyController.getPosition(), this._freeFlyController.getTarget(), this._freeFlyController.getUpAxis());
    this._renderer.update();
    this._renderer.renderScene((camera, frustumCulling) => {
      this._renderer.stackRenderers.pushLine([0, 0, 0], [5, 0, 0], [1, 0, 0]);
      this._renderer.stackRenderers.pushLine([0, 0, 0], [0, 5, 0], [0, 1, 0]);
      this._renderer.stackRenderers.pushLine([0, 0, 0], [0, 0, 5], [0, 0, 1]);
      _debugStuff(this._renderer, this._time);
      _walkingSpider(this._renderer, this._time);
    });
    this._renderer.renderHUD(() => {
      {
        const keyEventsPos = [7 + 20, 165];
        const touchEventsPos = [7 + 20, 260];
        const boardPos = [7, 35];
        exports_graphics.renderers.addKeyStrokesWidgets(keyEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
        exports_graphics.renderers.addArrowStrokesWidgets(touchEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
        exports_graphics.renderers.addKeysTouchesWidgets(this._canvasElement, boardPos, this._renderer.stackRenderers, this._renderer.textRenderer);
      }
      exports_graphics.renderers.renderFpsMeter([10, this._canvasElement.height - 60, 0], [100, 50], this._frameProfiler, this._renderer.stackRenderers, this._renderer.textRenderer, true);
    });
  }
}

// projects/proof-of-concept-ik/src/utilities/setupFullScreenFeature.ts
var setupFullScreenFeature = (app, button, canvasElement) => {
  if (!exports_system.browser.GlobalFullScreenManager.isCompatible(canvasElement)) {
    return;
  }
  button.addEventListener("click", () => {
    exports_system.browser.GlobalFullScreenManager.requestFullScreen(canvasElement);
  });
  exports_system.browser.GlobalFullScreenManager.addOnFullScreenChange(() => {
    let currentWidth = null;
    let currentHeight = null;
    const isInFullScreen = exports_system.browser.GlobalFullScreenManager.isFullScreen(canvasElement);
    if (isInFullScreen) {
      canvasElement.style.position = "absolute";
      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;
    } else {
      canvasElement.style.position = "relative";
      currentWidth = 800;
      currentHeight = 600;
    }
    canvasElement.style.left = "0px";
    canvasElement.style.top = "0px";
    canvasElement.width = currentWidth;
    canvasElement.height = currentHeight;
    app.resize(currentWidth, currentHeight);
  });
};
// projects/proof-of-concept-ik/src/utilities/setupOutdatedPage.ts
var setupOutdatedPage = (maxDuration, onTimeout) => {
  if (!exports_system.browser.GlobalVisibilityManager.isSupported()) {
    return;
  }
  let timeoutHandle = -1;
  exports_system.browser.GlobalVisibilityManager.addVisibilityChange((isVisible) => {
    if (isVisible) {
      if (timeoutHandle >= 0) {
        clearTimeout(timeoutHandle);
        timeoutHandle = -1;
      }
    } else {
      timeoutHandle = window.setTimeout(onTimeout, maxDuration);
    }
  });
  exports_system.browser.GlobalVisibilityManager.activate();
};
// projects/proof-of-concept-ik/src/main.ts
var localApp = null;
var _queryDomElement = (inName) => {
  const newElement = document.querySelector(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};
var _onPageLoad = async () => {
  const canvasElement = _queryDomElement("#main-canvas");
  const buttonFullscreen = _queryDomElement("#button-fullscreen");
  const errorText = _queryDomElement("#error-text");
  const _onPageError = (err) => {
    if (localApp) {
      console.log("onPageError", err);
      localApp.stop();
      localApp = null;
      exports_system.browser.GlobalKeyboardManager.deactivate();
      exports_system.browser.GlobalMouseManager.deactivate();
      exports_system.browser.GlobalTouchManager.deactivate(canvasElement);
      exports_system.browser.GlobalFullScreenManager.removeAllCallbacks();
      exports_system.browser.GlobalPointerLockManager.removeAllCallbacks();
      exports_system.browser.GlobalVisibilityManager.removeAllCallbacks();
      exports_system.browser.GlobalVisibilityManager.deactivate();
      errorText.style.width = "800px";
      errorText.style.height = "600px";
      errorText.innerHTML = err.message;
      canvasElement.style.display = "none";
      errorText.style.display = "block";
      buttonFullscreen.disabled = true;
      document.title += " (ERR)";
    }
  };
  window.addEventListener("error", _onPageError);
  {
    exports_system.browser.GlobalKeyboardManager.activate();
    exports_system.browser.GlobalTouchManager.activate(canvasElement);
    exports_system.browser.GlobalPointerLockManager.allowPointerLockedOnClickEvent(canvasElement);
    exports_system.browser.GlobalPointerLockManager.addOnLockChange(() => {
      const isLocked = exports_system.browser.GlobalPointerLockManager.isPointerLocked(canvasElement);
      if (isLocked) {
        exports_system.browser.GlobalMouseManager.activate();
      } else {
        exports_system.browser.GlobalMouseManager.deactivate();
        exports_system.browser.GlobalPointerLockManager.allowPointerLockedOnClickEvent(canvasElement);
      }
    });
    exports_system.browser.GlobalPointerLockManager.addOnLockError((event) => {
    });
  }
  localApp = new Application(canvasElement);
  await localApp.init();
  localApp.start();
  const pageMaxTimeInvisible = 60 * 1000;
  setupOutdatedPage(pageMaxTimeInvisible, () => {
    throw new Error("<br/><br/><br/>The page was inactive for too long<br/><br/>please reload");
  });
  setupFullScreenFeature(localApp, buttonFullscreen, canvasElement);
};
window.addEventListener("load", _onPageLoad);

//# debugId=CCC8FDD3AB0B3AD364756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL0Z1bGxTY3JlZW5NYW5hZ2VyLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9LZXlDb2Rlcy50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvS2V5Ym9hcmRNYW5hZ2VyLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9Nb3VzZU1hbmFnZXIudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL1BvaW50ZXJMb2NrTWFuYWdlci50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvVG91Y2hNYW5hZ2VyLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9WaXNpYmlsaXR5TWFuYWdlci50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvaXNXZWJXb3JrZXJTdXBwb3J0ZWQudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL2lzV2ViR0wyU3VwcG9ydGVkLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWV0cmljcy9GcmFtZVByb2ZpbGVyLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL2NvbW1vbi5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS9tYXQzLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL21hdDQuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMy5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS92ZWM0LmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3F1YXQuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMi5qcyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2NvbnRyb2xsZXJzL0ZyZWVGbHlDb250cm9sbGVyLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9pbnZlcnNlLWtpbmVtYXRpYy9jaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHMudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9tYXRoL2ludmVyc2Uta2luZW1hdGljL2xpbWItYW5pbWF0b3IudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9tYXRoL2NsYW1wLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9lYXNpbmcudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9tYXRoL2xlcnAudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9tYXRoL0dlbmVyaWNFYXNpbmcudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL2J1aWxkLWdlb21ldHJpZXMvZ2VuZXJhdGVCb3hWZXJ0aWNlcy50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvYnVpbGQtZ2VvbWV0cmllcy9jb21wdXRlTm9ybWFsLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9idWlsZC1nZW9tZXRyaWVzL2NvbnZlcnRUb1BlckZhY2VzTm9ybWFscy50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvYnVpbGQtZ2VvbWV0cmllcy9nZW5lcmF0ZVNwaGVyZVRyaWFuZ2xlcy50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvYnVpbGQtZ2VvbWV0cmllcy9nZW5lcmF0ZVdpcmVGcmFtZUZydXN0dW1WZXJ0aWNlcy50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvY2FtZXJhL0NhbWVyYS50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvY2FtZXJhL0ZydXN0dW1DdWxsaW5nLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvZ2VvbWV0cnktc3RhY2stcmVuZGVyZXIvc2hhZGVycy9nZW9tZXRyeS1zdGFjay1yZW5kZXJlci5nbHNsLnZlcnQiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9nZW9tZXRyeS1zdGFjay1yZW5kZXJlci9zaGFkZXJzL2dlb21ldHJ5LXN0YWNrLXJlbmRlcmVyLmdsc2wuZnJhZyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL2dlb21ldHJ5LXN0YWNrLXJlbmRlcmVyL0dlb21ldHJ5U3RhY2tSZW5kZXJlci50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9zaGFkZXJzL3N0YWNrLXJlbmRlcmVyLmdsc2wudmVydCIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9zaGFkZXJzL3N0YWNrLXJlbmRlcmVyLmdsc2wuZnJhZyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9pbnRlcm5hbHMvV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9zdGFjay1yZW5kZXJlcnMvaW50ZXJuYWxzL1RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9zdGFjay1yZW5kZXJlcnMvU3RhY2tSZW5kZXJlcnMudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy90ZXh0LXJlbmRlcmVyL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLnZlcnQiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy90ZXh0LXJlbmRlcmVyL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLmZyYWciLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy90ZXh0LXJlbmRlcmVyL2ludGVybmFscy9hc2NpaVRleHR1cmVIZXgudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy90ZXh0LXJlbmRlcmVyL1RleHRSZW5kZXJlci50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3dpZGdldHMvcmVuZGVyQ29udHJvbHMudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy93aWRnZXRzL3JlbmRlckZwc01ldGVyLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvV2ViR0xDb250ZXh0LnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvQ3ViZU1hcC50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3Mvd2ViZ2wyL0RhdGFUZXh0dXJlLnRzIiwgIi4uLy4uL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvRnJhbWVCdWZmZXIudHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9HZW9tZXRyeS50cyIsICIuLi8uLi9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3Mvd2ViZ2wyL1NoYWRlclByb2dyYW0udHMiLCAiLi4vLi4vbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9UZXh0dXJlLnRzIiwgIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIiwgIi4uL3NyYy9hcHAvZ3JhcGhpY3MvcmVuZGVyZXJzL3NjZW5lL3dpcmUtZnJhbWUtY3ViZXMtcmVuZGVyZXIvc2hhZGVycy93aXJlLWZyYW1lLWN1YmVzLXJlbmRlcmVyLmdsc2wudmVydCIsICIuLi9zcmMvYXBwL2dyYXBoaWNzL3JlbmRlcmVycy9zY2VuZS93aXJlLWZyYW1lLWN1YmVzLXJlbmRlcmVyL3NoYWRlcnMvd2lyZS1mcmFtZS1jdWJlcy1yZW5kZXJlci5nbHNsLmZyYWciLCAiLi4vc3JjL2FwcC9ncmFwaGljcy9yZW5kZXJlcnMvc2NlbmUvd2lyZS1mcmFtZS1jdWJlcy1yZW5kZXJlci9XaXJlRnJhbWVDdWJlc1JlbmRlcmVyLnRzIiwgIi4uL3NyYy9hcHAvZ3JhcGhpY3MvcmVuZGVyZXJzL3NjZW5lL3NoYXBlLXJlbmRlcmVyL1NoYXBlUmVuZGVyZXIudHMiLCAiLi4vc3JjL2FwcC9ncmFwaGljcy9XZWJHTFJlbmRlcmVyLnRzIiwgIi4uL3NyYy9hcHAvQXBwbGljYXRpb24udHMiLCAiLi4vc3JjL3V0aWxpdGllcy9zZXR1cEZ1bGxTY3JlZW5GZWF0dXJlLnRzIiwgIi4uL3NyYy91dGlsaXRpZXMvc2V0dXBPdXRkYXRlZFBhZ2UudHMiLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbCiAgICAiY29uc3QgYWxsUmVxdWVzdEV2ZW50czogc3RyaW5nW10gPSBbXG4gICdyZXF1ZXN0RnVsbHNjcmVlbicsXG4gICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbicsXG4gICdtb3pSZXF1ZXN0RnVsbFNjcmVlbicsXG4gICdtc1JlcXVlc3RGdWxsc2NyZWVuJ1xuXTtcblxuY29uc3QgYWxsQ2hhbmdlRXZlbnRzOiBzdHJpbmdbXSA9IFtcbiAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxuICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXG4gICdtb3pmdWxsc2NyZWVuY2hhbmdlJyxcbiAgJ21zZnVsbHNjcmVlbmNoYW5nZSdcbl07XG5cbnR5cGUgT25DaGFuZ2VDYWxsYmFjayA9ICgpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBJUmVzdWx0IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jbGFzcyBGdWxsU2NyZWVuTWFuYWdlciB7XG4gIHByaXZhdGUgX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrczogT25DaGFuZ2VDYWxsYmFja1tdID0gW107XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2luaXRpYWxpemUoKSB7XG4gICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBjb25zdCBvbkxvY2tDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKCkpO1xuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxDaGFuZ2VFdmVudHMpXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGN1cnJFdmVudCwgb25Mb2NrQ2hhbmdlLCBmYWxzZSk7XG4gIH1cblxuICAvL1xuXG4gIGlzQ29tcGF0aWJsZShpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsUmVxdWVzdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBpblRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG5cbiAgaXNGdWxsU2NyZWVuKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgPT09IGluVGFyZ2V0RWxlbWVudDtcbiAgfVxuXG4gIC8vXG5cbiAgYXN5bmMgcmVxdWVzdEZ1bGxTY3JlZW4oaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IFByb21pc2U8SVJlc3VsdD4ge1xuICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbihpblRhcmdldEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ2VsZW1lbnQgYWxyZWFkeSBpbiBmdWxsIHNjcmVlbicgfTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplKCk7XG5cbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxSZXF1ZXN0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGluVGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAoaW5UYXJnZXRFbGVtZW50IGFzIGFueSlbY3VyckV2ZW50XSgpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICdyZXF1ZXN0IGZvciBmdWxsIHNjcmVlbiBkb25lJyB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndW5zdXBwb3J0ZWQgcmVxdWVzdCBmb3IgZnVsbCBzY3JlZW4nIH07XG4gIH1cblxuICAvL1xuXG4gIGFkZE9uRnVsbFNjcmVlbkNoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5fb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzLnB1c2goaW5DYWxsYmFjayk7XG4gIH1cbiAgcmVtb3ZlT25GdWxsU2NyZWVuQ2hhbmdlKGluQ2FsbGJhY2s6IE9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrcy5pbmRleE9mKGluQ2FsbGJhY2spO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbiAgcmVtb3ZlQWxsQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICB9XG59XG5cbmNvbnN0IEdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyID0gbmV3IEZ1bGxTY3JlZW5NYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyIH07XG4iLAogICAgImV4cG9ydCBjb25zdCBBbGxLZXlDb2RlcyA9IHtcbiAgLy8gTnVtYmVycyBhbmQgbGV0dGVyc1xuICBOdW0wOiA0OCxcbiAgTnVtMTogNDksXG4gIE51bTI6IDUwLFxuICBOdW0zOiA1MSxcbiAgTnVtNDogNTIsXG4gIE51bTU6IDUzLFxuICBOdW02OiA1NCxcbiAgTnVtNzogNTUsXG4gIE51bTg6IDU2LFxuICBOdW05OiA1NyxcbiAgQTogNjUsXG4gIEI6IDY2LFxuICBDOiA2NyxcbiAgRDogNjgsXG4gIEU6IDY5LFxuICBGOiA3MCxcbiAgRzogNzEsXG4gIEg6IDcyLFxuICBJOiA3MyxcbiAgSjogNzQsXG4gIEs6IDc1LFxuICBMOiA3NixcbiAgTTogNzcsXG4gIE46IDc4LFxuICBPOiA3OSxcbiAgUDogODAsXG4gIFE6IDgxLFxuICBSOiA4MixcbiAgUzogODMsXG4gIFQ6IDg0LFxuICBVOiA4NSxcbiAgVjogODYsXG4gIFc6IDg3LFxuICBYOiA4OCxcbiAgWTogODksXG4gIFo6IDkwLFxuXG4gIC8vIFB1bmN0dWF0aW9ucyBrZXlzIGluIFVTIGxheW91dFxuICBTZW1pY29sb246IDE4NixcbiAgRXF1YWw6IDE4NyxcbiAgQ29tbWE6IDE4OCxcbiAgTWludXM6IDE4OSxcbiAgUGVyaW9kOiAxOTAsXG4gIEJhY2tRdW90ZTogMTkyLFxuICBCcmFja2V0TGVmdDogMjE5LFxuICBCYWNrc2xhc2g6IDIyMCxcbiAgQnJhY2tldFJpZ2h0OiAyMjEsXG4gIFF1b3RlOiAyMjIsXG5cbiAgLy8gTW9kaWZpZXIga2V5c1xuICBTaGlmdDogMTYsXG4gIEN0cmw6IDE3LFxuICBBbHQ6IDE4LFxuICBDYXBzTG9jazogMjAsXG5cbiAgLy8gQ29udHJvbCBrZXlzXG4gIFRhYjogOSxcbiAgRW50ZXI6IDEzLFxuICBQYXVzZTogMTksXG4gIEVzY2FwZTogMjcsXG4gIFNwYWNlOiAzMixcbiAgUGFnZVVwOiAzMyxcbiAgUGFnZURvd246IDM0LFxuICBFbmQ6IDM1LFxuICBIb21lOiAzNixcbiAgQXJyb3dMZWZ0OiAzNyxcbiAgQXJyb3dVcDogMzgsXG4gIEFycm93UmlnaHQ6IDM5LFxuICBBcnJvd0Rvd246IDQwLFxuICBQcmludFNjcmVlbjogNDQsXG4gIEluc2VydDogNDUsXG4gIERlbGV0ZTogNDYsXG4gIENvbnRleHRNZW51OiA5MyxcbiAgU2Nyb2xsTG9jazogMTQ1LFxuXG4gIC8vIEZ1bmN0aW9uIGtleXNcbiAgRjE6IDExMixcbiAgRjI6IDExMyxcbiAgRjM6IDExNCxcbiAgRjQ6IDExNSxcbiAgRjU6IDExNixcbiAgRjY6IDExNyxcbiAgRjc6IDExOCxcbiAgRjg6IDExOSxcbiAgRjk6IDEyMCxcbiAgRjEwOiAxMjEsXG4gIEYxMTogMTIyLFxuICBGMTI6IDEyMyxcbiAgRjEzOiAxMjQsXG4gIEYxNDogMTI1LFxuICBGMTU6IDEyNixcbiAgRjE2OiAxMjcsXG4gIEYxNzogMTI4LFxuICBGMTg6IDEyOSxcbiAgRjE5OiAxMzAsXG4gIEYyMDogMTMxLFxuICBGMjE6IDEzMixcbiAgRjIyOiAxMzMsXG4gIEYyMzogMTM0LFxuICBGMjQ6IDEzNSxcblxuICAvLyBOdW1wYWQga2V5c1xuICBOdW1QYWQwOiA5NixcbiAgTnVtUGFkMTogOTcsXG4gIE51bVBhZDI6IDk4LFxuICBOdW1QYWQzOiA5OSxcbiAgTnVtUGFkNDogMTAwLFxuICBOdW1QYWQ1OiAxMDEsXG4gIE51bVBhZDY6IDEwMixcbiAgTnVtUGFkNzogMTAzLFxuICBOdW1QYWQ4OiAxMDQsXG4gIE51bVBhZDk6IDEwNSxcbiAgTnVtUGFkTXVsdGlwbHk6IDEwNixcbiAgTnVtUGFkQWRkOiAxMDcsXG4gIE51bVBhZFN1YnRyYWN0OiAxMDksXG4gIE51bVBhZERlY2ltYWw6IDExMCxcbiAgTnVtUGFkRGl2aWRlOiAxMTEsXG4gIE51bUxvY2s6IDE0NCxcbiAgTnVtUGFkQ29tbWE6IDE5NCxcbiAgTnVtUGFkRXF1YWw6IDEyXG59O1xuXG5leHBvcnQgY29uc3QgaXNMZXR0ZXIgPSAoa2V5OiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIGtleSA+PSBBbGxLZXlDb2Rlcy5BICYmIGtleSA8PSBBbGxLZXlDb2Rlcy5aO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTnVtYmVyID0gKGtleTogbnVtYmVyKSA9PiB7XG4gIHJldHVybiAoXG4gICAgKGtleSA+PSBBbGxLZXlDb2Rlcy5OdW0wICYmIGtleSA8PSBBbGxLZXlDb2Rlcy5OdW05KSB8fFxuICAgIChrZXkgPj0gQWxsS2V5Q29kZXMuTnVtUGFkMCAmJiBrZXkgPD0gQWxsS2V5Q29kZXMuTnVtUGFkOSlcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0FscGhhbnVtZXJpYyA9IChrZXk6IG51bWJlcikgPT4ge1xuICByZXR1cm4gaXNOdW1iZXIoa2V5KSB8fCBpc0xldHRlcihrZXkpO1xufTtcbiIsCiAgICAiaW1wb3J0IHsgQWxsS2V5Q29kZXMgfSBmcm9tICcuL0tleUNvZGVzJztcblxuY2xhc3MgS2V5Ym9hcmRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcHJlc3NlZEtleXNTZXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcHJldmVudERlZmF1bHRLZXlzU2V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVLZXlEb3duOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZUtleVVwOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudDtcblxuICAgICAgaWYgKHRoaXMuX3ByZXZlbnREZWZhdWx0S2V5c1NldC5oYXMoa2V5Q29kZSkpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuX3ByZXNzZWRLZXlzU2V0LmFkZChrZXlDb2RlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUtleVVwID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IGtleUNvZGUgfSA9IGV2ZW50O1xuXG4gICAgICBpZiAodGhpcy5fcHJldmVudERlZmF1bHRLZXlzU2V0LmhhcyhrZXlDb2RlKSkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuZGVsZXRlKGtleUNvZGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9oYW5kbGVLZXlEb3duID0gaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUtleVVwID0gaGFuZGxlS2V5VXAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGlzUHJlc3NlZCguLi5pbktleXM6IChrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpW10pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBpbktleXMpIHtcbiAgICAgIGlmICh0aGlzLl9wcmVzc2VkS2V5c1NldC5oYXMoQWxsS2V5Q29kZXNba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByZXZlbnREZWZhdWx0KGluS2V5OiBrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpIHtcbiAgICB0aGlzLl9wcmV2ZW50RGVmYXVsdEtleXNTZXQuYWRkKEFsbEtleUNvZGVzW2luS2V5XSk7XG4gIH1cblxuICBlbmFibGVEZWZhdWx0KGluS2V5OiBrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpIHtcbiAgICB0aGlzLl9wcmV2ZW50RGVmYXVsdEtleXNTZXQuZGVsZXRlKEFsbEtleUNvZGVzW2luS2V5XSk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlEb3duKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2hhbmRsZUtleVVwKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlEb3duKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2hhbmRsZUtleVVwKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG59XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyID0gbmV3IEtleWJvYXJkTWFuYWdlcigpO1xuXG5leHBvcnQgeyBHbG9iYWxLZXlib2FyZE1hbmFnZXIgfTtcbiIsCiAgICAiaW1wb3J0IHsgQWxsS2V5Q29kZXMgfSBmcm9tICcuL0tleUNvZGVzJztcblxuY29uc3QgQWxsTW91c2VCdXR0b25zID0ge1xuICBMZWZ0OiAwLFxuICBNaWRkbGU6IDEsXG4gIFJpZ2h0OiAyXG59O1xuXG5jbGFzcyBNb3VzZU1hbmFnZXIge1xuICBwcml2YXRlIF9wcmVzc2VkQnV0dG9uc1NldCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VEb3duOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZU1vdXNlVXA6IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VNb3ZlOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG5cbiAgLy8gcHJpdmF0ZSBfcG9zaXRpb25YID0gMDtcbiAgLy8gcHJpdmF0ZSBfcG9zaXRpb25ZID0gMDtcbiAgcHJpdmF0ZSBfZGVsdGFYID0gMDtcbiAgcHJpdmF0ZSBfZGVsdGFZID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3ByZXNzZWRCdXR0b25zU2V0LmFkZChldmVudC5idXR0b24pO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuZGVsZXRlKGV2ZW50LmJ1dHRvbik7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX2RlbHRhWCArPVxuICAgICAgICBldmVudC5tb3ZlbWVudFggfHxcbiAgICAgICAgKGV2ZW50IGFzIGFueSkubW96TW92ZW1lbnRYIHx8XG4gICAgICAgIChldmVudCBhcyBhbnkpLndlYmtpdE1vdmVtZW50WCB8fFxuICAgICAgICAwO1xuXG4gICAgICB0aGlzLl9kZWx0YVkgKz1cbiAgICAgICAgZXZlbnQubW92ZW1lbnRZIHx8XG4gICAgICAgIChldmVudCBhcyBhbnkpLm1vek1vdmVtZW50WSB8fFxuICAgICAgICAoZXZlbnQgYXMgYW55KS53ZWJraXRNb3ZlbWVudFkgfHxcbiAgICAgICAgMDtcbiAgICB9O1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5faGFuZGxlTW91c2VEb3duID0gaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlTW91c2VVcCA9IGhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZU1vdmUgPSBoYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVzc2VkQnV0dG9uc1NldC5jbGVhcigpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5faGFuZGxlTW91c2VEb3duKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZU1vdXNlRG93bik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlzQnV0dG9uUHJlc3NlZChpbktleToga2V5b2YgdHlwZW9mIEFsbE1vdXNlQnV0dG9ucykge1xuICAgIHJldHVybiB0aGlzLl9wcmVzc2VkQnV0dG9uc1NldC5oYXMoQWxsTW91c2VCdXR0b25zW2luS2V5XSk7XG4gIH1cblxuICBkZWx0YVgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsdGFYO1xuICB9XG4gIGRlbHRhWSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWx0YVk7XG4gIH1cbiAgcmVzZXREZWx0YXMoKSB7XG4gICAgdGhpcy5fZGVsdGFYID0gMDtcbiAgICB0aGlzLl9kZWx0YVkgPSAwO1xuICB9XG59XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgR2xvYmFsTW91c2VNYW5hZ2VyID0gbmV3IE1vdXNlTWFuYWdlcigpO1xuXG5leHBvcnQgeyBHbG9iYWxNb3VzZU1hbmFnZXIgfTtcbiIsCiAgICAiY29uc3QgYWxsUmVxdWVzdEV2ZW50czogc3RyaW5nW10gPSBbXG4gICdyZXF1ZXN0UG9pbnRlckxvY2snLFxuICAnbW96UmVxdWVzdFBvaW50ZXJMb2NrJyxcbiAgJ3dlYmtpdFJlcXVlc3RQb2ludGVyTG9jaydcbl07XG5cbmNvbnN0IGFsbEV4aXRFdmVudHM6IHN0cmluZ1tdID0gW1xuICAnZXhpdFBvaW50ZXJMb2NrJyxcbiAgJ21vekV4aXRQb2ludGVyTG9jaycsXG4gICd3ZWJraXRFeGl0UG9pbnRlckxvY2snXG5dO1xuXG5jb25zdCBhbGxTdGF0ZUV2ZW50czogc3RyaW5nW10gPSBbXG4gICdwb2ludGVyTG9ja0VsZW1lbnQnLFxuICAnbW96UG9pbnRlckxvY2tFbGVtZW50JyxcbiAgJ3dlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCdcbl07XG5cbmNvbnN0IGFsbENoYW5nZUV2ZW50czogeyBtZXRob2ROYW1lOiBzdHJpbmc7IHByb3BlcnR5TmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgeyBtZXRob2ROYW1lOiAnb25wb2ludGVybG9ja2NoYW5nZScsIHByb3BlcnR5TmFtZTogJ3BvaW50ZXJsb2NrY2hhbmdlJyB9LFxuICB7XG4gICAgbWV0aG9kTmFtZTogJ29ubW96cG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAgIHByb3BlcnR5TmFtZTogJ21venBvaW50ZXJsb2NrY2hhbmdlJ1xuICB9LFxuICB7XG4gICAgbWV0aG9kTmFtZTogJ29ud2Via2l0cG9pbnRlcmxvY2tjaGFuZ2UnLFxuICAgIHByb3BlcnR5TmFtZTogJ3dlYmtpdHBvaW50ZXJsb2NrY2hhbmdlJ1xuICB9XG5dO1xuXG5jb25zdCBhbGxFcnJvckV2ZW50czogeyBtZXRob2ROYW1lOiBzdHJpbmc7IHByb3BlcnR5TmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgeyBtZXRob2ROYW1lOiAnb25wb2ludGVybG9ja2Vycm9yJywgcHJvcGVydHlOYW1lOiAncG9pbnRlcmxvY2tlcnJvcicgfSxcbiAgeyBtZXRob2ROYW1lOiAnb25tb3pwb2ludGVybG9ja2Vycm9yJywgcHJvcGVydHlOYW1lOiAnbW96cG9pbnRlcmxvY2tlcnJvcicgfSxcbiAge1xuICAgIG1ldGhvZE5hbWU6ICdvbndlYmtpdHBvaW50ZXJsb2NrZXJyb3InLFxuICAgIHByb3BlcnR5TmFtZTogJ3dlYmtpdHBvaW50ZXJsb2NrZXJyb3InXG4gIH1cbl07XG5cbnR5cGUgT25DaGFuZ2VDYWxsYmFjayA9ICgpID0+IHZvaWQ7XG50eXBlIE9uRXJyb3JDYWxsYmFjayA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBJUmVzdWx0IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jbGFzcyBQb2ludGVyTG9ja01hbmFnZXIge1xuICBwcml2YXRlIF9vbkxvY2tDaGFuZ2VDYWxsYmFja3M6IE9uQ2hhbmdlQ2FsbGJhY2tbXSA9IFtdO1xuICBwcml2YXRlIF9vbkxvY2tFcnJvckNhbGxiYWNrczogT25FcnJvckNhbGxiYWNrW10gPSBbXTtcbiAgcHJpdmF0ZSBfdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSAwO1xuXG4gIHByaXZhdGUgX2xhdGVzdFJlcXVlc3RIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIGNvbnN0cnVjdG9yKCkge31cblxuICBwcml2YXRlIF9pbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgb25Mb2NrQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aW1lciByZXNldFwiKTtcblxuICAgICAgdGhpcy5fb25Mb2NrQ2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Mb2NrRXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA9IERhdGUubm93KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRpbWVyIHJlc2V0XCIpO1xuXG4gICAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soZXZlbnQpKTtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsQ2hhbmdlRXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50Lm1ldGhvZE5hbWUgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjdXJyRXZlbnQucHJvcGVydHlOYW1lLCBvbkxvY2tDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsRXJyb3JFdmVudHMpIHtcbiAgICAgIGlmIChjdXJyRXZlbnQubWV0aG9kTmFtZSBpbiBkb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGN1cnJFdmVudC5wcm9wZXJ0eU5hbWUsIG9uTG9ja0Vycm9yLCBmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG5cbiAgY2FuQmVQb2ludGVyTG9ja2VkKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxSZXF1ZXN0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGluVGFyZ2V0RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cblxuICBpc1BvaW50ZXJMb2NrZWQoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbFN0YXRlRXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQgYXMgYW55KVtjdXJyRXZlbnRdID09PSBpblRhcmdldEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG5cbiAgYXN5bmMgcmVxdWVzdFBvaW50ZXJMb2NrKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPElSZXN1bHQ+IHtcbiAgICBpZiAodGhpcy5pc1BvaW50ZXJMb2NrZWQoaW5UYXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdlbGVtZW50IGFscmVhZHkgbG9ja2VkJyB9O1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcblxuICAgIGlmICh0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA+IDApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWRTZWNUaW1lID1cbiAgICAgICAgKERhdGUubm93KCkgLSB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSkgLyAxMDAwO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImVsYXBzZWRTZWNUaW1lIDFcIiwgZWxhcHNlZFNlY1RpbWUpO1xuXG4gICAgICBpZiAoZWxhcHNlZFNlY1RpbWUgPCAxLjEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBgcmVxdWVzdCBmb3IgbG9jayB3YXMgdG9vIGVhcmx5LCB0aW1lIHRvIHdhaXQ6ICR7ZWxhcHNlZFNlY1RpbWUudG9GaXhlZChcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApfXNlY2BcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsUmVxdWVzdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBpblRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAvLyBtb3JlIGFjY3VyYXRlIGJ5IGRpc2FibGluZyBPUy1sZXZlbCBhZGp1c3RlZCBtb3VzZSBtb3ZlbWVudHNcbiAgICAgICAgICB1bmFkanVzdGVkTW92ZW1lbnQ6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFjdHVhbCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgYXdhaXQgKGluVGFyZ2V0RWxlbWVudCBhcyBhbnkpW2N1cnJFdmVudF0ob3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRVJSXCIsIGVycik7XG5cbiAgICAgICAgICBjb25zdCBlbGFwc2VkU2VjVGltZSA9XG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHRoaXMuX3RpbWVTaW5jZUxhc3RMb2NrQ2hhbmdlKSAvIDEwMDA7XG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImVsYXBzZWRTZWNUaW1lIDJcIiwgZWxhcHNlZFNlY1RpbWUpO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogYHJlcXVlc3QgZm9yIGxvY2sgd2FzIHRvbyBlYXJseSwgdGltZSB0byB3YWl0OiAke2VsYXBzZWRTZWNUaW1lLnRvRml4ZWQoXG4gICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICl9c2VjYFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSA9IERhdGUubm93KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGltZXIgcmVzZXRcIik7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3JlcXVlc3QgZm9yIGxvY2sgZG9uZScgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3Vuc3VwcG9ydGVkIHJlcXVlc3QgZm9yIGxvY2snIH07XG4gIH1cblxuICAvL1xuXG4gIGFsbG93UG9pbnRlckxvY2tlZE9uQ2xpY2tFdmVudChpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGluVGFyZ2V0RWxlbWVudCA9PT0gdGhpcy5fbGF0ZXN0UmVxdWVzdEh0bWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbGF0ZXN0UmVxdWVzdEh0bWxFbGVtZW50ID0gaW5UYXJnZXRFbGVtZW50O1xuXG4gICAgY29uc3Qgb25DbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlcXVlc3RQb2ludGVyTG9jayhpblRhcmdldEVsZW1lbnQpO1xuXG4gICAgICB0aGlzLl9sYXRlc3RSZXF1ZXN0SHRtbEVsZW1lbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5hbGxvd1BvaW50ZXJMb2NrZWRPbkNsaWNrRXZlbnQoaW5UYXJnZXRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaW5UYXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG4gIH1cblxuICAvL1xuXG4gIGV4aXRQb2ludGVyTG9jaygpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxFeGl0RXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50IGluIGRvY3VtZW50KSB7XG4gICAgICAgIChkb2N1bWVudCBhcyBhbnkpW2N1cnJFdmVudF0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cblxuICBhZGRPbkxvY2tDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIHRoaXMuX29uTG9ja0NoYW5nZUNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZU9uTG9ja0NoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uTG9ja0NoYW5nZUNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLy9cblxuICBhZGRPbkxvY2tFcnJvcihpbkNhbGxiYWNrOiBPbkVycm9yQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZU9uTG9ja0Vycm9yKGluQ2FsbGJhY2s6IE9uRXJyb3JDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25Mb2NrRXJyb3JDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uTG9ja0Vycm9yQ2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvL1xuXG4gIHJlbW92ZUFsbENhbGxiYWNrcygpIHtcbiAgICB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICB9XG59XG5cbmNvbnN0IEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlciA9IG5ldyBQb2ludGVyTG9ja01hbmFnZXIoKTtcblxuZXhwb3J0IHsgR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyIH07XG4iLAogICAgImNsYXNzIFRvdWNoRGF0YSB7XG4gIHB1YmxpYyBpZDogbnVtYmVyO1xuICBwdWJsaWMgY3JlYXRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgcHVibGljIHBvc2l0aW9uWDogbnVtYmVyO1xuICBwdWJsaWMgcG9zaXRpb25ZOiBudW1iZXI7XG4gIHB1YmxpYyBkZWx0YVg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkZWx0YVk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgcG9zaXRpb25YOiBudW1iZXIsIHBvc2l0aW9uWTogbnVtYmVyKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMucG9zaXRpb25YID0gcG9zaXRpb25YO1xuICAgIHRoaXMucG9zaXRpb25ZID0gcG9zaXRpb25ZO1xuICB9XG5cbiAgcmVzZXREZWx0YSgpIHtcbiAgICB0aGlzLmRlbHRhWCA9IDA7XG4gICAgdGhpcy5kZWx0YVkgPSAwO1xuICB9XG59XG5cbmNsYXNzIFRvdWNoTWFuYWdlciB7XG4gIHByaXZhdGUgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9hbGxUb3VjaERhdGFNYXAgPSBuZXcgTWFwPHN0cmluZywgVG91Y2hEYXRhPigpO1xuICBwcml2YXRlIF9hbGxDYWNoZWRUb3VjaERhdGFBcnJheTogVG91Y2hEYXRhW10gPSBbXTtcblxuICBwcml2YXRlIF9oYW5kbGVUb3VjaFN0YXJ0OiAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZVRvdWNoRW5kOiAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZVRvdWNoTW92ZTogKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyLCBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2lpXTtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBUb3VjaERhdGEoaWRlbnRpZmllciwgcGFnZVgsIHBhZ2VZKTtcblxuICAgICAgICB0aGlzLl9hbGxUb3VjaERhdGFNYXAuc2V0KGAke2lkZW50aWZpZXJ9YCwgbmV3RGF0YSk7XG4gICAgICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVUb3VjaEVuZCA9IChldmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIgfSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2lpXTtcblxuICAgICAgICB0aGlzLl9hbGxUb3VjaERhdGFNYXAuZGVsZXRlKGAke2lkZW50aWZpZXJ9YCk7XG4gICAgICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVUb3VjaE1vdmUgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyLCBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2lpXTtcblxuICAgICAgICBjb25zdCBjdXJyRGF0YSA9IHRoaXMuX2FsbFRvdWNoRGF0YU1hcC5nZXQoYCR7aWRlbnRpZmllcn1gKTtcbiAgICAgICAgaWYgKCFjdXJyRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsdGFYID0gcGFnZVggLSBjdXJyRGF0YS5wb3NpdGlvblg7XG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IHBhZ2VZIC0gY3VyckRhdGEucG9zaXRpb25ZO1xuXG4gICAgICAgIGN1cnJEYXRhLmRlbHRhWCArPSBkZWx0YVg7XG4gICAgICAgIGN1cnJEYXRhLmRlbHRhWSArPSBkZWx0YVk7XG4gICAgICAgIGN1cnJEYXRhLnBvc2l0aW9uWCA9IHBhZ2VYO1xuICAgICAgICBjdXJyRGF0YS5wb3NpdGlvblkgPSBwYWdlWTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5faGFuZGxlVG91Y2hTdGFydCA9IGhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVUb3VjaEVuZCA9IGhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlVG91Y2hNb3ZlID0gaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBpc1N1cHBvcnRlZChpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGluVGFyZ2V0RWxlbWVudDtcbiAgfVxuXG4gIGFjdGl2YXRlKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQoaW5UYXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmNsZWFyKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlVG91Y2hFbmQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlLCB7XG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmNsZWFyKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlVG91Y2hFbmQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVmcmVzaENhY2hlKCkge1xuICAgIGlmICh0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5ID0gWy4uLnRoaXMuX2FsbFRvdWNoRGF0YU1hcC52YWx1ZXMoKV07XG4gICAgfVxuICB9XG5cbiAgZ2V0VG91Y2hEYXRhKCk6IFJlYWRvbmx5QXJyYXk8VG91Y2hEYXRhPiB7XG4gICAgdGhpcy5fcmVmcmVzaENhY2hlKCk7XG4gICAgcmV0dXJuIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5O1xuICB9XG5cbiAgcmVzZXREZWx0YXMoKSB7XG4gICAgdGhpcy5fcmVmcmVzaENhY2hlKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5yZXNldERlbHRhKCkpO1xuICB9XG59XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgR2xvYmFsVG91Y2hNYW5hZ2VyID0gbmV3IFRvdWNoTWFuYWdlcigpO1xuXG5leHBvcnQgeyBHbG9iYWxUb3VjaE1hbmFnZXIgfTtcbiIsCiAgICAidHlwZSBPbkNoYW5nZUNhbGxiYWNrID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcblxuY2xhc3MgVmlzaWJpbGl0eU1hbmFnZXIge1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzOiBPbkNoYW5nZUNhbGxiYWNrW10gPSBbXTtcblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZSgpO1xuICAgICAgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PlxuICAgICAgICBjYWxsYmFjayhpc1Zpc2libGUpXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlID0gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAndmlzaWJpbGl0eWNoYW5nZScsXG4gICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgJ3Zpc2liaWxpdHljaGFuZ2UnLFxuICAgICAgdGhpcy5faGFuZGxlVmlzaWJpbGl0eUNoYW5nZSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy9cblxuICBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gJ29udmlzaWJpbGl0eWNoYW5nZScgaW4gZG9jdW1lbnQ7XG4gIH1cblxuICAvL1xuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZSc7XG4gIH1cblxuICAvL1xuXG4gIGFkZFZpc2liaWxpdHlDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZUNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZVZpc2liaWxpdHlDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLmluZGV4T2YoaW5DYWxsYmFjayk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VDYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8vXG5cbiAgcmVtb3ZlQWxsQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZUNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICB9XG59XG5cbmNvbnN0IEdsb2JhbFZpc2liaWxpdHlNYW5hZ2VyID0gbmV3IFZpc2liaWxpdHlNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbFZpc2liaWxpdHlNYW5hZ2VyIH07XG4iLAogICAgImV4cG9ydCBjb25zdCBpc1dlYldvcmtlclN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhd2luZG93Lldvcmtlcjtcbn07XG4iLAogICAgImV4cG9ydCBjb25zdCBpc1dlYkdMMlN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhd2luZG93LldlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG59O1xuIiwKICAgICJleHBvcnQgaW50ZXJmYWNlIElGcmFtZVByb2ZpbGVyIHtcbiAgZnJhbWVzRGVsdGE6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPjtcbiAgYXZlcmFnZURlbHRhOiBudW1iZXI7XG4gIG1pbkRlbHRhOiBudW1iZXI7XG4gIG1heERlbHRhOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGcmFtZVByb2ZpbGVyIGltcGxlbWVudHMgSUZyYW1lUHJvZmlsZXIge1xuICBwcml2YXRlIF9mcmFtZXNEZWx0YTogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfYXZlcmFnZURlbHRhOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taW5EZWx0YTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWF4RGVsdGE6IG51bWJlciA9IDA7XG5cbiAgcHVzaERlbHRhKGluRGVsdGE6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9mcmFtZXNEZWx0YS5sZW5ndGggPj0gMTAwKSB7XG4gICAgICB0aGlzLl9mcmFtZXNEZWx0YS5zaGlmdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZyYW1lc0RlbHRhLnB1c2goaW5EZWx0YSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIHRoaXMuX21pbkRlbHRhID0gKzk5OTk5OTk5OTtcbiAgICB0aGlzLl9tYXhEZWx0YSA9IC05OTk5OTk5OTk7XG4gICAgdGhpcy5fYXZlcmFnZURlbHRhID0gMDtcblxuICAgIGZvciAoY29uc3QgY3VyckRlbHRhIG9mIHRoaXMuX2ZyYW1lc0RlbHRhKSB7XG4gICAgICB0aGlzLl9taW5EZWx0YSA9IE1hdGgubWluKHRoaXMuX21pbkRlbHRhLCBjdXJyRGVsdGEpO1xuICAgICAgdGhpcy5fbWF4RGVsdGEgPSBNYXRoLm1heCh0aGlzLl9tYXhEZWx0YSwgY3VyckRlbHRhKTtcbiAgICAgIHRoaXMuX2F2ZXJhZ2VEZWx0YSArPSBjdXJyRGVsdGE7XG4gICAgfVxuICAgIHRoaXMuX2F2ZXJhZ2VEZWx0YSAvPSB0aGlzLl9mcmFtZXNEZWx0YS5sZW5ndGg7XG4gIH1cblxuICBnZXQgZnJhbWVzRGVsdGEoKTogUmVhZG9ubHlBcnJheTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZnJhbWVzRGVsdGE7XG4gIH1cbiAgZ2V0IGF2ZXJhZ2VEZWx0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hdmVyYWdlRGVsdGE7XG4gIH1cbiAgZ2V0IG1pbkRlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRlbHRhO1xuICB9XG4gIGdldCBtYXhEZWx0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXhEZWx0YTtcbiAgfVxufVxuIiwKICAgICIvKipcbiAqIENvbW1vbiB1dGlsaXRpZXNcbiAqIEBtb2R1bGUgZ2xNYXRyaXhcbiAqL1xuLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbmV4cG9ydCB2YXIgRVBTSUxPTiA9IDAuMDAwMDAxO1xuZXhwb3J0IHZhciBBUlJBWV9UWVBFID0gdHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBGbG9hdDMyQXJyYXkgOiBBcnJheTtcbmV4cG9ydCB2YXIgUkFORE9NID0gTWF0aC5yYW5kb207XG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xuICpcbiAqIEBwYXJhbSB7RmxvYXQzMkFycmF5Q29uc3RydWN0b3IgfCBBcnJheUNvbnN0cnVjdG9yfSB0eXBlIEFycmF5IHR5cGUsIHN1Y2ggYXMgRmxvYXQzMkFycmF5IG9yIEFycmF5XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1hdHJpeEFycmF5VHlwZSh0eXBlKSB7XG4gIEFSUkFZX1RZUEUgPSB0eXBlO1xufVxudmFyIGRlZ3JlZSA9IE1hdGguUEkgLyAxODA7XG4vKipcbiAqIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYSkge1xuICByZXR1cm4gYSAqIGRlZ3JlZTtcbn1cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzc1xuICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XG59XG5pZiAoIU1hdGguaHlwb3QpIE1hdGguaHlwb3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB5ID0gMCxcbiAgICAgIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB5ICs9IGFyZ3VtZW50c1tpXSAqIGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQoeSk7XG59OyIsCiAgICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcbiAqIDN4MyBNYXRyaXhcbiAqIEBtb2R1bGUgbWF0M1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQzXG4gKlxuICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoOSk7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gIH1cblxuICBvdXRbMF0gPSAxO1xuICBvdXRbNF0gPSAxO1xuICBvdXRbOF0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgICB0aGUgc291cmNlIDR4NCBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1hdDQob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbNF07XG4gIG91dFs0XSA9IGFbNV07XG4gIG91dFs1XSA9IGFbNl07XG4gIG91dFs2XSA9IGFbOF07XG4gIG91dFs3XSA9IGFbOV07XG4gIG91dFs4XSA9IGFbMTBdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDkpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIG91dFs0XSA9IGFbNF07XG4gIG91dFs1XSA9IGFbNV07XG4gIG91dFs2XSA9IGFbNl07XG4gIG91dFs3XSA9IGFbN107XG4gIG91dFs4XSA9IGFbOF07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXQzIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNilcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggOClcbiAqIEByZXR1cm5zIHttYXQzfSBBIG5ldyBtYXQzXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMobTAwLCBtMDEsIG0wMiwgbTEwLCBtMTEsIG0xMiwgbTIwLCBtMjEsIG0yMikge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoOSk7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0xMDtcbiAgb3V0WzRdID0gbTExO1xuICBvdXRbNV0gPSBtMTI7XG4gIG91dFs2XSA9IG0yMDtcbiAgb3V0WzddID0gbTIxO1xuICBvdXRbOF0gPSBtMjI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgb3V0WzBdID0gbTAwO1xuICBvdXRbMV0gPSBtMDE7XG4gIG91dFsyXSA9IG0wMjtcbiAgb3V0WzNdID0gbTEwO1xuICBvdXRbNF0gPSBtMTE7XG4gIG91dFs1XSA9IG0xMjtcbiAgb3V0WzZdID0gbTIwO1xuICBvdXRbN10gPSBtMjE7XG4gIG91dFs4XSA9IG0yMjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDE7XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgaWYgKG91dCA9PT0gYSkge1xuICAgIHZhciBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMTIgPSBhWzVdO1xuICAgIG91dFsxXSA9IGFbM107XG4gICAgb3V0WzJdID0gYVs2XTtcbiAgICBvdXRbM10gPSBhMDE7XG4gICAgb3V0WzVdID0gYVs3XTtcbiAgICBvdXRbNl0gPSBhMDI7XG4gICAgb3V0WzddID0gYTEyO1xuICB9IGVsc2Uge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVszXTtcbiAgICBvdXRbMl0gPSBhWzZdO1xuICAgIG91dFszXSA9IGFbMV07XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzddO1xuICAgIG91dFs2XSA9IGFbMl07XG4gICAgb3V0WzddID0gYVs1XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJ0KG91dCwgYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdO1xuICB2YXIgYTEwID0gYVszXSxcbiAgICAgIGExMSA9IGFbNF0sXG4gICAgICBhMTIgPSBhWzVdO1xuICB2YXIgYTIwID0gYVs2XSxcbiAgICAgIGEyMSA9IGFbN10sXG4gICAgICBhMjIgPSBhWzhdO1xuICB2YXIgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xuICB2YXIgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMDtcbiAgdmFyIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMDsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gIHZhciBkZXQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XG5cbiAgaWYgKCFkZXQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGRldCA9IDEuMCAvIGRldDtcbiAgb3V0WzBdID0gYjAxICogZGV0O1xuICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gIG91dFsyXSA9IChhMTIgKiBhMDEgLSBhMDIgKiBhMTEpICogZGV0O1xuICBvdXRbM10gPSBiMTEgKiBkZXQ7XG4gIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICBvdXRbNV0gPSAoLWExMiAqIGEwMCArIGEwMiAqIGExMCkgKiBkZXQ7XG4gIG91dFs2XSA9IGIyMSAqIGRldDtcbiAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICBvdXRbOF0gPSAoYTExICogYTAwIC0gYTAxICogYTEwKSAqIGRldDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkam9pbnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl07XG4gIHZhciBhMTAgPSBhWzNdLFxuICAgICAgYTExID0gYVs0XSxcbiAgICAgIGExMiA9IGFbNV07XG4gIHZhciBhMjAgPSBhWzZdLFxuICAgICAgYTIxID0gYVs3XSxcbiAgICAgIGEyMiA9IGFbOF07XG4gIG91dFswXSA9IGExMSAqIGEyMiAtIGExMiAqIGEyMTtcbiAgb3V0WzFdID0gYTAyICogYTIxIC0gYTAxICogYTIyO1xuICBvdXRbMl0gPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIG91dFszXSA9IGExMiAqIGEyMCAtIGExMCAqIGEyMjtcbiAgb3V0WzRdID0gYTAwICogYTIyIC0gYTAyICogYTIwO1xuICBvdXRbNV0gPSBhMDIgKiBhMTAgLSBhMDAgKiBhMTI7XG4gIG91dFs2XSA9IGExMCAqIGEyMSAtIGExMSAqIGEyMDtcbiAgb3V0WzddID0gYTAxICogYTIwIC0gYTAwICogYTIxO1xuICBvdXRbOF0gPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXTtcbiAgdmFyIGExMCA9IGFbM10sXG4gICAgICBhMTEgPSBhWzRdLFxuICAgICAgYTEyID0gYVs1XTtcbiAgdmFyIGEyMCA9IGFbNl0sXG4gICAgICBhMjEgPSBhWzddLFxuICAgICAgYTIyID0gYVs4XTtcbiAgcmV0dXJuIGEwMCAqIChhMjIgKiBhMTEgLSBhMTIgKiBhMjEpICsgYTAxICogKC1hMjIgKiBhMTAgKyBhMTIgKiBhMjApICsgYTAyICogKGEyMSAqIGExMCAtIGExMSAqIGEyMCk7XG59XG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDMnc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdO1xuICB2YXIgYTEwID0gYVszXSxcbiAgICAgIGExMSA9IGFbNF0sXG4gICAgICBhMTIgPSBhWzVdO1xuICB2YXIgYTIwID0gYVs2XSxcbiAgICAgIGEyMSA9IGFbN10sXG4gICAgICBhMjIgPSBhWzhdO1xuICB2YXIgYjAwID0gYlswXSxcbiAgICAgIGIwMSA9IGJbMV0sXG4gICAgICBiMDIgPSBiWzJdO1xuICB2YXIgYjEwID0gYlszXSxcbiAgICAgIGIxMSA9IGJbNF0sXG4gICAgICBiMTIgPSBiWzVdO1xuICB2YXIgYjIwID0gYls2XSxcbiAgICAgIGIyMSA9IGJbN10sXG4gICAgICBiMjIgPSBiWzhdO1xuICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gIG91dFsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcbiAgb3V0WzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xuICBvdXRbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gIG91dFs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuICBvdXRbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjA7XG4gIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgb3V0WzhdID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTEwID0gYVszXSxcbiAgICAgIGExMSA9IGFbNF0sXG4gICAgICBhMTIgPSBhWzVdLFxuICAgICAgYTIwID0gYVs2XSxcbiAgICAgIGEyMSA9IGFbN10sXG4gICAgICBhMjIgPSBhWzhdLFxuICAgICAgeCA9IHZbMF0sXG4gICAgICB5ID0gdlsxXTtcbiAgb3V0WzBdID0gYTAwO1xuICBvdXRbMV0gPSBhMDE7XG4gIG91dFsyXSA9IGEwMjtcbiAgb3V0WzNdID0gYTEwO1xuICBvdXRbNF0gPSBhMTE7XG4gIG91dFs1XSA9IGExMjtcbiAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gIG91dFs3XSA9IHggKiBhMDEgKyB5ICogYTExICsgYTIxO1xuICBvdXRbOF0gPSB4ICogYTAyICsgeSAqIGExMiArIGEyMjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCByYWQpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGExMCA9IGFbM10sXG4gICAgICBhMTEgPSBhWzRdLFxuICAgICAgYTEyID0gYVs1XSxcbiAgICAgIGEyMCA9IGFbNl0sXG4gICAgICBhMjEgPSBhWzddLFxuICAgICAgYTIyID0gYVs4XSxcbiAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG4gIG91dFswXSA9IGMgKiBhMDAgKyBzICogYTEwO1xuICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgb3V0WzJdID0gYyAqIGEwMiArIHMgKiBhMTI7XG4gIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICBvdXRbNF0gPSBjICogYTExIC0gcyAqIGEwMTtcbiAgb3V0WzVdID0gYyAqIGExMiAtIHMgKiBhMDI7XG4gIG91dFs2XSA9IGEyMDtcbiAgb3V0WzddID0gYTIxO1xuICBvdXRbOF0gPSBhMjI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MyBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdO1xuICBvdXRbMF0gPSB4ICogYVswXTtcbiAgb3V0WzFdID0geCAqIGFbMV07XG4gIG91dFsyXSA9IHggKiBhWzJdO1xuICBvdXRbM10gPSB5ICogYVszXTtcbiAgb3V0WzRdID0geSAqIGFbNF07XG4gIG91dFs1XSA9IHkgKiBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDMudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UcmFuc2xhdGlvbihvdXQsIHYpIHtcbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMTtcbiAgb3V0WzVdID0gMDtcbiAgb3V0WzZdID0gdlswXTtcbiAgb3V0WzddID0gdlsxXTtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGVcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDMucm90YXRlKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICBvdXRbMF0gPSBjO1xuICBvdXRbMV0gPSBzO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAtcztcbiAgb3V0WzRdID0gYztcbiAgb3V0WzVdID0gMDtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDMuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgb3V0WzBdID0gdlswXTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gdlsxXTtcbiAgb3V0WzVdID0gMDtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgZnJvbSBhIG1hdDJkIGludG8gYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgbWF0cml4IHRvIGNvcHlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21NYXQyZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gYVsyXTtcbiAgb3V0WzRdID0gYVszXTtcbiAgb3V0WzVdID0gMDtcbiAgb3V0WzZdID0gYVs0XTtcbiAgb3V0WzddID0gYVs1XTtcbiAgb3V0WzhdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gKlxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB5eCA9IHkgKiB4MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgenggPSB6ICogeDI7XG4gIHZhciB6eSA9IHogKiB5MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgb3V0WzNdID0geXggLSB3ejtcbiAgb3V0WzZdID0genggKyB3eTtcbiAgb3V0WzFdID0geXggKyB3ejtcbiAgb3V0WzRdID0gMSAtIHh4IC0geno7XG4gIG91dFs3XSA9IHp5IC0gd3g7XG4gIG91dFsyXSA9IHp4IC0gd3k7XG4gIG91dFs1XSA9IHp5ICsgd3g7XG4gIG91dFs4XSA9IDEgLSB4eCAtIHl5O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgTWF0NCB0byBkZXJpdmUgdGhlIG5vcm1hbCBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsRnJvbU1hdDQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICBpZiAoIWRldCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZGV0ID0gMS4wIC8gZGV0O1xuICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gIG91dFsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs1XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgb3V0WzddID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs4XSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSAyRCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggb2YgeW91ciBnbCBjb250ZXh0XG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBvZiBnbCBjb250ZXh0XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3Rpb24ob3V0LCB3aWR0aCwgaGVpZ2h0KSB7XG4gIG91dFswXSA9IDIgLyB3aWR0aDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gLTIgLyBoZWlnaHQ7XG4gIG91dFs1XSA9IDA7XG4gIG91dFs2XSA9IC0xO1xuICBvdXRbN10gPSAxO1xuICBvdXRbOF0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcIm1hdDMoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIsIFwiICsgYVs0XSArIFwiLCBcIiArIGFbNV0gKyBcIiwgXCIgKyBhWzZdICsgXCIsIFwiICsgYVs3XSArIFwiLCBcIiArIGFbOF0gKyBcIilcIjtcbn1cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvYihhKSB7XG4gIHJldHVybiBNYXRoLmh5cG90KGFbMF0sIGFbMV0sIGFbMl0sIGFbM10sIGFbNF0sIGFbNV0sIGFbNl0sIGFbN10sIGFbOF0pO1xufVxuLyoqXG4gKiBBZGRzIHR3byBtYXQzJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gIG91dFs2XSA9IGFbNl0gKyBiWzZdO1xuICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICBvdXRbNF0gPSBhWzRdIC0gYls0XTtcbiAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICBvdXRbN10gPSBhWzddIC0gYls3XTtcbiAgb3V0WzhdID0gYVs4XSAtIGJbOF07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgb3V0WzRdID0gYVs0XSAqIGI7XG4gIG91dFs1XSA9IGFbNV0gKiBiO1xuICBvdXRbNl0gPSBhWzZdICogYjtcbiAgb3V0WzddID0gYVs3XSAqIGI7XG4gIG91dFs4XSA9IGFbOF0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byBtYXQzJ3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN10gJiYgYVs4XSA9PT0gYls4XTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXSxcbiAgICAgIGE0ID0gYVs0XSxcbiAgICAgIGE1ID0gYVs1XSxcbiAgICAgIGE2ID0gYVs2XSxcbiAgICAgIGE3ID0gYVs3XSxcbiAgICAgIGE4ID0gYVs4XTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXSxcbiAgICAgIGI0ID0gYls0XSxcbiAgICAgIGI1ID0gYls1XSxcbiAgICAgIGI2ID0gYls2XSxcbiAgICAgIGI3ID0gYls3XSxcbiAgICAgIGI4ID0gYls4XTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpO1xufVxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDMubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDMuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0OyIsCiAgICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcbiAqIDR4NCBNYXRyaXg8YnI+Rm9ybWF0OiBjb2x1bW4tbWFqb3IsIHdoZW4gdHlwZWQgb3V0IGl0IGxvb2tzIGxpa2Ugcm93LW1ham9yPGJyPlRoZSBtYXRyaWNlcyBhcmUgYmVpbmcgcG9zdCBtdWx0aXBsaWVkLlxuICogQG1vZHVsZSBtYXQ0XG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICB9XG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgb3V0WzRdID0gYVs0XTtcbiAgb3V0WzVdID0gYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgb3V0WzldID0gYVs5XTtcbiAgb3V0WzEwXSA9IGFbMTBdO1xuICBvdXRbMTFdID0gYVsxMV07XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICBvdXRbOV0gPSBhWzldO1xuICBvdXRbMTBdID0gYVsxMF07XG4gIG91dFsxMV0gPSBhWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0NCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gQSBuZXcgbWF0NFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCBhIG1hdDQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKG91dCwgYSkge1xuICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gIGlmIChvdXQgPT09IGEpIHtcbiAgICB2YXIgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIzID0gYVsxMV07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGEwMTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGEwMjtcbiAgICBvdXRbOV0gPSBhMTI7XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhMDM7XG4gICAgb3V0WzEzXSA9IGExMztcbiAgICBvdXRbMTRdID0gYTIzO1xuICB9IGVsc2Uge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGFbMV07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGFbMl07XG4gICAgb3V0WzldID0gYVs2XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhWzNdO1xuICAgIG91dFsxM10gPSBhWzddO1xuICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICBpZiAoIWRldCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZGV0ID0gMS4wIC8gZGV0O1xuICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkam9pbnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICBvdXRbMF0gPSBhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMik7XG4gIG91dFsxXSA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgb3V0WzJdID0gYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpO1xuICBvdXRbM10gPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs0XSA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgb3V0WzVdID0gYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpO1xuICBvdXRbNl0gPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs3XSA9IGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKTtcbiAgb3V0WzhdID0gYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpO1xuICBvdXRbOV0gPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gIG91dFsxMF0gPSBhMDAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSk7XG4gIG91dFsxMV0gPSAtKGEwMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gIG91dFsxM10gPSBhMDAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSk7XG4gIG91dFsxNF0gPSAtKGEwMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gIG91dFsxNV0gPSBhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xufVxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0c1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTsgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG5cbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgb3V0WzBdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzNdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls0XTtcbiAgYjEgPSBiWzVdO1xuICBiMiA9IGJbNl07XG4gIGIzID0gYls3XTtcbiAgb3V0WzRdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFs1XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbNl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzddID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls4XTtcbiAgYjEgPSBiWzldO1xuICBiMiA9IGJbMTBdO1xuICBiMyA9IGJbMTFdO1xuICBvdXRbOF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzldID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsxMF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzExXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICBiMCA9IGJbMTJdO1xuICBiMSA9IGJbMTNdO1xuICBiMiA9IGJbMTRdO1xuICBiMyA9IGJbMTVdO1xuICBvdXRbMTJdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxM10gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzE0XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbMTVdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgaWYgKGEgPT09IG91dCkge1xuICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICB9IGVsc2Uge1xuICAgIGEwMCA9IGFbMF07XG4gICAgYTAxID0gYVsxXTtcbiAgICBhMDIgPSBhWzJdO1xuICAgIGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTtcbiAgICBhMTEgPSBhWzVdO1xuICAgIGExMiA9IGFbNl07XG4gICAgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdO1xuICAgIGEyMSA9IGFbOV07XG4gICAgYTIyID0gYVsxMF07XG4gICAgYTIzID0gYVsxMV07XG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG4gICAgb3V0WzNdID0gYTAzO1xuICAgIG91dFs0XSA9IGExMDtcbiAgICBvdXRbNV0gPSBhMTE7XG4gICAgb3V0WzZdID0gYTEyO1xuICAgIG91dFs3XSA9IGExMztcbiAgICBvdXRbOF0gPSBhMjA7XG4gICAgb3V0WzldID0gYTIxO1xuICAgIG91dFsxMF0gPSBhMjI7XG4gICAgb3V0WzExXSA9IGEyMztcbiAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdGhlIHZlYzMgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICoqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIG91dFswXSA9IGFbMF0gKiB4O1xuICBvdXRbMV0gPSBhWzFdICogeDtcbiAgb3V0WzJdID0gYVsyXSAqIHg7XG4gIG91dFszXSA9IGFbM10gKiB4O1xuICBvdXRbNF0gPSBhWzRdICogeTtcbiAgb3V0WzVdID0gYVs1XSAqIHk7XG4gIG91dFs2XSA9IGFbNl0gKiB5O1xuICBvdXRbN10gPSBhWzddICogeTtcbiAgb3V0WzhdID0gYVs4XSAqIHo7XG4gIG91dFs5XSA9IGFbOV0gKiB6O1xuICBvdXRbMTBdID0gYVsxMF0gKiB6O1xuICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICB5ID0gYXhpc1sxXSxcbiAgICAgIHogPSBheGlzWzJdO1xuICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgdmFyIHMsIGMsIHQ7XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG4gIHZhciBiMDAsIGIwMSwgYjAyO1xuICB2YXIgYjEwLCBiMTEsIGIxMjtcbiAgdmFyIGIyMCwgYjIxLCBiMjI7XG5cbiAgaWYgKGxlbiA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxlbiA9IDEgLyBsZW47XG4gIHggKj0gbGVuO1xuICB5ICo9IGxlbjtcbiAgeiAqPSBsZW47XG4gIHMgPSBNYXRoLnNpbihyYWQpO1xuICBjID0gTWF0aC5jb3MocmFkKTtcbiAgdCA9IDEgLSBjO1xuICBhMDAgPSBhWzBdO1xuICBhMDEgPSBhWzFdO1xuICBhMDIgPSBhWzJdO1xuICBhMDMgPSBhWzNdO1xuICBhMTAgPSBhWzRdO1xuICBhMTEgPSBhWzVdO1xuICBhMTIgPSBhWzZdO1xuICBhMTMgPSBhWzddO1xuICBhMjAgPSBhWzhdO1xuICBhMjEgPSBhWzldO1xuICBhMjIgPSBhWzEwXTtcbiAgYTIzID0gYVsxMV07IC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuXG4gIGIwMCA9IHggKiB4ICogdCArIGM7XG4gIGIwMSA9IHkgKiB4ICogdCArIHogKiBzO1xuICBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7XG4gIGIxMSA9IHkgKiB5ICogdCArIGM7XG4gIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICBiMjAgPSB4ICogeiAqIHQgKyB5ICogcztcbiAgYjIxID0geSAqIHogKiB0IC0geCAqIHM7XG4gIGIyMiA9IHogKiB6ICogdCArIGM7IC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF07XG4gIHZhciBhMjEgPSBhWzldO1xuICB2YXIgYTIyID0gYVsxMF07XG4gIHZhciBhMjMgPSBhWzExXTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGEwMCA9IGFbMF07XG4gIHZhciBhMDEgPSBhWzFdO1xuICB2YXIgYTAyID0gYVsyXTtcbiAgdmFyIGEwMyA9IGFbM107XG4gIHZhciBhMjAgPSBhWzhdO1xuICB2YXIgYTIxID0gYVs5XTtcbiAgdmFyIGEyMiA9IGFbMTBdO1xuICB2YXIgYTIzID0gYVsxMV07XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMDAgPSBhWzBdO1xuICB2YXIgYTAxID0gYVsxXTtcbiAgdmFyIGEwMiA9IGFbMl07XG4gIHZhciBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UcmFuc2xhdGlvbihvdXQsIHYpIHtcbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgb3V0WzBdID0gdlswXTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gdlsxXTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IHZbMl07XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIGEgZ2l2ZW4gYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkLCBheGlzKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgdmFyIHggPSBheGlzWzBdLFxuICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICB6ID0gYXhpc1syXTtcbiAgdmFyIGxlbiA9IE1hdGguaHlwb3QoeCwgeSwgeik7XG4gIHZhciBzLCBjLCB0O1xuXG4gIGlmIChsZW4gPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZW4gPSAxIC8gbGVuO1xuICB4ICo9IGxlbjtcbiAgeSAqPSBsZW47XG4gIHogKj0gbGVuO1xuICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgYyA9IE1hdGguY29zKHJhZCk7XG4gIHQgPSAxIC0gYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSB4ICogeCAqIHQgKyBjO1xuICBvdXRbMV0gPSB5ICogeCAqIHQgKyB6ICogcztcbiAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHggKiB5ICogdCAtIHogKiBzO1xuICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICBvdXRbNl0gPSB6ICogeSAqIHQgKyB4ICogcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gIG91dFs5XSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICBvdXRbMTBdID0geiAqIHogKiB0ICsgYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWFJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gYztcbiAgb3V0WzZdID0gcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gLXM7XG4gIG91dFsxMF0gPSBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlWShkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21ZUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBjO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAtcztcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gcztcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGVaKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVpSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGM7XG4gIG91dFsxXSA9IHM7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IC1zO1xuICBvdXRbNV0gPSBjO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB4eSA9IHggKiB5MjtcbiAgdmFyIHh6ID0geCAqIHoyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB5eiA9IHkgKiB6MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICBvdXRbMV0gPSB4eSArIHd6O1xuICBvdXRbMl0gPSB4eiAtIHd5O1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB4eSAtIHd6O1xuICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICBvdXRbNl0gPSB5eiArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4eiArIHd5O1xuICBvdXRbOV0gPSB5eiAtIHd4O1xuICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgZnJvbSBhIGR1YWwgcXVhdC5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBNYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBEdWFsIFF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21RdWF0MihvdXQsIGEpIHtcbiAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIHZhciBieCA9IC1hWzBdLFxuICAgICAgYnkgPSAtYVsxXSxcbiAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICBidyA9IGFbM10sXG4gICAgICBheCA9IGFbNF0sXG4gICAgICBheSA9IGFbNV0sXG4gICAgICBheiA9IGFbNl0sXG4gICAgICBhdyA9IGFbN107XG4gIHZhciBtYWduaXR1ZGUgPSBieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnogKyBidyAqIGJ3OyAvL09ubHkgc2NhbGUgaWYgaXQgbWFrZXMgc2Vuc2VcblxuICBpZiAobWFnbml0dWRlID4gMCkge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMiAvIG1hZ25pdHVkZTtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyIC8gbWFnbml0dWRlO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMjtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDI7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyO1xuICB9XG5cbiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBhLCB0cmFuc2xhdGlvbik7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbixcbiAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24ob3V0LCBtYXQpIHtcbiAgb3V0WzBdID0gbWF0WzEyXTtcbiAgb3V0WzFdID0gbWF0WzEzXTtcbiAgb3V0WzJdID0gbWF0WzE0XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb25cbiAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZVxuICogIHdpdGggYSBub3JtYWxpemVkIFF1YXRlcm5pb24gcGFyYW10ZXIsIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZVxuICogIHRoZSBzYW1lIGFzIHRoZSBzY2FsaW5nIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGluZyhvdXQsIG1hdCkge1xuICB2YXIgbTExID0gbWF0WzBdO1xuICB2YXIgbTEyID0gbWF0WzFdO1xuICB2YXIgbTEzID0gbWF0WzJdO1xuICB2YXIgbTIxID0gbWF0WzRdO1xuICB2YXIgbTIyID0gbWF0WzVdO1xuICB2YXIgbTIzID0gbWF0WzZdO1xuICB2YXIgbTMxID0gbWF0WzhdO1xuICB2YXIgbTMyID0gbWF0WzldO1xuICB2YXIgbTMzID0gbWF0WzEwXTtcbiAgb3V0WzBdID0gTWF0aC5oeXBvdChtMTEsIG0xMiwgbTEzKTtcbiAgb3V0WzFdID0gTWF0aC5oeXBvdChtMjEsIG0yMiwgbTIzKTtcbiAgb3V0WzJdID0gTWF0aC5oeXBvdChtMzEsIG0zMiwgbTMzKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByb3RhdGlvbmFsIGNvbXBvbmVudFxuICogIG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoXG4gKiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sIHRoZSByZXR1cm5lZCBxdWF0ZXJuaW9uIHdpbGwgYmUgdGhlXG4gKiAgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBvcmlnaW5hbGx5IHN1cHBsaWVkLlxuICogQHBhcmFtIHtxdWF0fSBvdXQgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdGF0aW9uKG91dCwgbWF0KSB7XG4gIHZhciBzY2FsaW5nID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIGdldFNjYWxpbmcoc2NhbGluZywgbWF0KTtcbiAgdmFyIGlzMSA9IDEgLyBzY2FsaW5nWzBdO1xuICB2YXIgaXMyID0gMSAvIHNjYWxpbmdbMV07XG4gIHZhciBpczMgPSAxIC8gc2NhbGluZ1syXTtcbiAgdmFyIHNtMTEgPSBtYXRbMF0gKiBpczE7XG4gIHZhciBzbTEyID0gbWF0WzFdICogaXMyO1xuICB2YXIgc20xMyA9IG1hdFsyXSAqIGlzMztcbiAgdmFyIHNtMjEgPSBtYXRbNF0gKiBpczE7XG4gIHZhciBzbTIyID0gbWF0WzVdICogaXMyO1xuICB2YXIgc20yMyA9IG1hdFs2XSAqIGlzMztcbiAgdmFyIHNtMzEgPSBtYXRbOF0gKiBpczE7XG4gIHZhciBzbTMyID0gbWF0WzldICogaXMyO1xuICB2YXIgc20zMyA9IG1hdFsxMF0gKiBpczM7XG4gIHZhciB0cmFjZSA9IHNtMTEgKyBzbTIyICsgc20zMztcbiAgdmFyIFMgPSAwO1xuXG4gIGlmICh0cmFjZSA+IDApIHtcbiAgICBTID0gTWF0aC5zcXJ0KHRyYWNlICsgMS4wKSAqIDI7XG4gICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgb3V0WzBdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgb3V0WzFdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMTEgLSBzbTIyIC0gc20zMykgKiAyO1xuICAgIG91dFszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgIG91dFsxXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgIG91dFsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICB9IGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTIyIC0gc20xMSAtIHNtMzMpICogMjtcbiAgICBvdXRbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICBvdXRbMF0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICBvdXRbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgfSBlbHNlIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMzMgLSBzbTExIC0gc20yMikgKiAyO1xuICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgIG91dFswXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgIG91dFsxXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGVcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUob3V0LCBxLCB2LCBzKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICBvdXRbMV0gPSAoeHkgKyB3eikgKiBzeDtcbiAgb3V0WzJdID0gKHh6IC0gd3kpICogc3g7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9ICh4eSAtIHd6KSAqIHN5O1xuICBvdXRbNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgb3V0WzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlLCByb3RhdGluZyBhbmQgc2NhbGluZyBhcm91bmQgdGhlIGdpdmVuIG9yaWdpblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBvcmlnaW4pO1xuICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG5lZ2F0aXZlT3JpZ2luKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBvIFRoZSBvcmlnaW4gdmVjdG9yIGFyb3VuZCB3aGljaCB0byBzY2FsZSBhbmQgcm90YXRlXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4ob3V0LCBxLCB2LCBzLCBvKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIHZhciBveCA9IG9bMF07XG4gIHZhciBveSA9IG9bMV07XG4gIHZhciBveiA9IG9bMl07XG4gIHZhciBvdXQwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIHZhciBvdXQxID0gKHh5ICsgd3opICogc3g7XG4gIHZhciBvdXQyID0gKHh6IC0gd3kpICogc3g7XG4gIHZhciBvdXQ0ID0gKHh5IC0gd3opICogc3k7XG4gIHZhciBvdXQ1ID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gIHZhciBvdXQ2ID0gKHl6ICsgd3gpICogc3k7XG4gIHZhciBvdXQ4ID0gKHh6ICsgd3kpICogc3o7XG4gIHZhciBvdXQ5ID0gKHl6IC0gd3gpICogc3o7XG4gIHZhciBvdXQxMCA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMF0gPSBvdXQwO1xuICBvdXRbMV0gPSBvdXQxO1xuICBvdXRbMl0gPSBvdXQyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSBvdXQ0O1xuICBvdXRbNV0gPSBvdXQ1O1xuICBvdXRbNl0gPSBvdXQ2O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSBvdXQ4O1xuICBvdXRbOV0gPSBvdXQ5O1xuICBvdXRbMTBdID0gb3V0MTA7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dDAgKiBveCArIG91dDQgKiBveSArIG91dDggKiBveik7XG4gIG91dFsxM10gPSB2WzFdICsgb3kgLSAob3V0MSAqIG94ICsgb3V0NSAqIG95ICsgb3V0OSAqIG96KTtcbiAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXQyICogb3ggKyBvdXQ2ICogb3kgKyBvdXQxMCAqIG96KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgYSA0eDQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeXggPSB5ICogeDI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHp4ID0geiAqIHgyO1xuICB2YXIgenkgPSB6ICogeTI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gIG91dFsxXSA9IHl4ICsgd3o7XG4gIG91dFsyXSA9IHp4IC0gd3k7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHl4IC0gd3o7XG4gIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICBvdXRbNl0gPSB6eSArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6eCArIHd5O1xuICBvdXRbOV0gPSB6eSAtIHd4O1xuICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCk7XG4gIHZhciB0YiA9IDEgLyAodG9wIC0gYm90dG9tKTtcbiAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzBdID0gbmVhciAqIDIgKiBybDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gbmVhciAqIDIgKiB0YjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiAyICogbmY7XG4gIG91dFsxNV0gPSAwO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbLTEsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHTC9PcGVuR0wncyBjbGlwIHZvbHVtZS5cbiAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZU5PKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICBuZjtcbiAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gZjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNV0gPSAwO1xuXG4gIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTRdID0gMiAqIGZhciAqIG5lYXIgKiBuZjtcbiAgfSBlbHNlIHtcbiAgICBvdXRbMTBdID0gLTE7XG4gICAgb3V0WzE0XSA9IC0yICogbmVhcjtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5wZXJzcGVjdGl2ZU5PfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBwZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlTk87XG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHN1aXRhYmxlIGZvciBXZWJHUFUgd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZVpPKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICBuZjtcbiAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gZjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNV0gPSAwO1xuXG4gIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMF0gPSBmYXIgKiBuZjtcbiAgICBvdXRbMTRdID0gZmFyICogbmVhciAqIG5mO1xuICB9IGVsc2Uge1xuICAgIG91dFsxMF0gPSAtMTtcbiAgICBvdXRbMTRdID0gLW5lYXI7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBmaWVsZCBvZiB2aWV3LlxuICogVGhpcyBpcyBwcmltYXJpbHkgdXNlZnVsIGZvciBnZW5lcmF0aW5nIHByb2plY3Rpb24gbWF0cmljZXMgdG8gYmUgdXNlZFxuICogd2l0aCB0aGUgc3RpbGwgZXhwZXJpZW1lbnRhbCBXZWJWUiBBUEkuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtPYmplY3R9IGZvdiBPYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHZhbHVlczogdXBEZWdyZWVzLCBkb3duRGVncmVlcywgbGVmdERlZ3JlZXMsIHJpZ2h0RGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICB2YXIgdXBUYW4gPSBNYXRoLnRhbihmb3YudXBEZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIGRvd25UYW4gPSBNYXRoLnRhbihmb3YuZG93bkRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgbGVmdFRhbiA9IE1hdGgudGFuKGZvdi5sZWZ0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciByaWdodFRhbiA9IE1hdGgudGFuKGZvdi5yaWdodERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgeFNjYWxlID0gMi4wIC8gKGxlZnRUYW4gKyByaWdodFRhbik7XG4gIHZhciB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcbiAgb3V0WzBdID0geFNjYWxlO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgb3V0WzNdID0gMC4wO1xuICBvdXRbNF0gPSAwLjA7XG4gIG91dFs1XSA9IHlTY2FsZTtcbiAgb3V0WzZdID0gMC4wO1xuICBvdXRbN10gPSAwLjA7XG4gIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICBvdXRbOV0gPSAodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNTtcbiAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzExXSA9IC0xLjA7XG4gIG91dFsxMl0gPSAwLjA7XG4gIG91dFsxM10gPSAwLjA7XG4gIG91dFsxNF0gPSBmYXIgKiBuZWFyIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMTVdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBvcnRob05PKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gIG91dFswXSA9IC0yICogbHI7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IC0yICogYnQ7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAyICogbmY7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5vcnRob05PfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBvcnRobyA9IG9ydGhvTk87XG4vKipcbiAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb3J0aG9aTyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgdmFyIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMF0gPSAtMiAqIGxyO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAtMiAqIGJ0O1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gbmY7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gIG91dFsxNF0gPSBuZWFyICogbmY7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpcy5cbiAqIElmIHlvdSB3YW50IGEgbWF0cml4IHRoYXQgYWN0dWFsbHkgbWFrZXMgYW4gb2JqZWN0IGxvb2sgYXQgYW5vdGhlciBvYmplY3QsIHlvdSBzaG91bGQgdXNlIHRhcmdldFRvIGluc3RlYWQuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW47XG4gIHZhciBleWV4ID0gZXllWzBdO1xuICB2YXIgZXlleSA9IGV5ZVsxXTtcbiAgdmFyIGV5ZXogPSBleWVbMl07XG4gIHZhciB1cHggPSB1cFswXTtcbiAgdmFyIHVweSA9IHVwWzFdO1xuICB2YXIgdXB6ID0gdXBbMl07XG4gIHZhciBjZW50ZXJ4ID0gY2VudGVyWzBdO1xuICB2YXIgY2VudGVyeSA9IGNlbnRlclsxXTtcbiAgdmFyIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IGdsTWF0cml4LkVQU0lMT04gJiYgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJiBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5KG91dCk7XG4gIH1cblxuICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuICBsZW4gPSAxIC8gTWF0aC5oeXBvdCh6MCwgejEsIHoyKTtcbiAgejAgKj0gbGVuO1xuICB6MSAqPSBsZW47XG4gIHoyICo9IGxlbjtcbiAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgbGVuID0gTWF0aC5oeXBvdCh4MCwgeDEsIHgyKTtcblxuICBpZiAoIWxlbikge1xuICAgIHgwID0gMDtcbiAgICB4MSA9IDA7XG4gICAgeDIgPSAwO1xuICB9IGVsc2Uge1xuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuICBsZW4gPSBNYXRoLmh5cG90KHkwLCB5MSwgeTIpO1xuXG4gIGlmICghbGVuKSB7XG4gICAgeTAgPSAwO1xuICAgIHkxID0gMDtcbiAgICB5MiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB5MCAqPSBsZW47XG4gICAgeTEgKj0gbGVuO1xuICAgIHkyICo9IGxlbjtcbiAgfVxuXG4gIG91dFswXSA9IHgwO1xuICBvdXRbMV0gPSB5MDtcbiAgb3V0WzJdID0gejA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHgxO1xuICBvdXRbNV0gPSB5MTtcbiAgb3V0WzZdID0gejE7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHgyO1xuICBvdXRbOV0gPSB5MjtcbiAgb3V0WzEwXSA9IHoyO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIG1hdHJpeCB0aGF0IG1ha2VzIHNvbWV0aGluZyBsb29rIGF0IHNvbWV0aGluZyBlbHNlLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRhcmdldFRvKG91dCwgZXllLCB0YXJnZXQsIHVwKSB7XG4gIHZhciBleWV4ID0gZXllWzBdLFxuICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICB1cHggPSB1cFswXSxcbiAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgdXB6ID0gdXBbMl07XG4gIHZhciB6MCA9IGV5ZXggLSB0YXJnZXRbMF0sXG4gICAgICB6MSA9IGV5ZXkgLSB0YXJnZXRbMV0sXG4gICAgICB6MiA9IGV5ZXogLSB0YXJnZXRbMl07XG4gIHZhciBsZW4gPSB6MCAqIHowICsgejEgKiB6MSArIHoyICogejI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG4gIH1cblxuICB2YXIgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxLFxuICAgICAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyLFxuICAgICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICBsZW4gPSB4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICBvdXRbMF0gPSB4MDtcbiAgb3V0WzFdID0geDE7XG4gIG91dFsyXSA9IHgyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgb3V0WzVdID0gejIgKiB4MCAtIHowICogeDI7XG4gIG91dFs2XSA9IHowICogeDEgLSB6MSAqIHgwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6MDtcbiAgb3V0WzldID0gejE7XG4gIG91dFsxMF0gPSB6MjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSBleWV4O1xuICBvdXRbMTNdID0gZXlleTtcbiAgb3V0WzE0XSA9IGV5ZXo7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcIm1hdDQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIsIFwiICsgYVs0XSArIFwiLCBcIiArIGFbNV0gKyBcIiwgXCIgKyBhWzZdICsgXCIsIFwiICsgYVs3XSArIFwiLCBcIiArIGFbOF0gKyBcIiwgXCIgKyBhWzldICsgXCIsIFwiICsgYVsxMF0gKyBcIiwgXCIgKyBhWzExXSArIFwiLCBcIiArIGFbMTJdICsgXCIsIFwiICsgYVsxM10gKyBcIiwgXCIgKyBhWzE0XSArIFwiLCBcIiArIGFbMTVdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb2IoYSkge1xuICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCBhWzZdLCBhWzddLCBhWzhdLCBhWzldLCBhWzEwXSwgYVsxMV0sIGFbMTJdLCBhWzEzXSwgYVsxNF0sIGFbMTVdKTtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0NCdzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgb3V0WzddID0gYVs3XSArIGJbN107XG4gIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF07XG4gIG91dFsxMV0gPSBhWzExXSArIGJbMTFdO1xuICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM107XG4gIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdO1xuICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICBvdXRbNV0gPSBhWzVdIC0gYls1XTtcbiAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICBvdXRbOF0gPSBhWzhdIC0gYls4XTtcbiAgb3V0WzldID0gYVs5XSAtIGJbOV07XG4gIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICBvdXRbMTFdID0gYVsxMV0gLSBiWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdIC0gYlsxMl07XG4gIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICBvdXRbMTRdID0gYVsxNF0gLSBiWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdIC0gYlsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgb3V0WzRdID0gYVs0XSAqIGI7XG4gIG91dFs1XSA9IGFbNV0gKiBiO1xuICBvdXRbNl0gPSBhWzZdICogYjtcbiAgb3V0WzddID0gYVs3XSAqIGI7XG4gIG91dFs4XSA9IGFbOF0gKiBiO1xuICBvdXRbOV0gPSBhWzldICogYjtcbiAgb3V0WzEwXSA9IGFbMTBdICogYjtcbiAgb3V0WzExXSA9IGFbMTFdICogYjtcbiAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgb3V0WzEzXSA9IGFbMTNdICogYjtcbiAgb3V0WzE0XSA9IGFbMTRdICogYjtcbiAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0NCdzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV0gKiBzY2FsZTtcbiAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgb3V0WzddID0gYVs3XSArIGJbN10gKiBzY2FsZTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF0gKiBzY2FsZTtcbiAgb3V0WzldID0gYVs5XSArIGJbOV0gKiBzY2FsZTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF0gKiBzY2FsZTtcbiAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV0gKiBzY2FsZTtcbiAgb3V0WzEyXSA9IGFbMTJdICsgYlsxMl0gKiBzY2FsZTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM10gKiBzY2FsZTtcbiAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF0gKiBzY2FsZTtcbiAgb3V0WzE1XSA9IGFbMTVdICsgYlsxNV0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF0gJiYgYVs5XSA9PT0gYls5XSAmJiBhWzEwXSA9PT0gYlsxMF0gJiYgYVsxMV0gPT09IGJbMTFdICYmIGFbMTJdID09PSBiWzEyXSAmJiBhWzEzXSA9PT0gYlsxM10gJiYgYVsxNF0gPT09IGJbMTRdICYmIGFbMTVdID09PSBiWzE1XTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGE0ID0gYVs0XSxcbiAgICAgIGE1ID0gYVs1XSxcbiAgICAgIGE2ID0gYVs2XSxcbiAgICAgIGE3ID0gYVs3XTtcbiAgdmFyIGE4ID0gYVs4XSxcbiAgICAgIGE5ID0gYVs5XSxcbiAgICAgIGExMCA9IGFbMTBdLFxuICAgICAgYTExID0gYVsxMV07XG4gIHZhciBhMTIgPSBhWzEyXSxcbiAgICAgIGExMyA9IGFbMTNdLFxuICAgICAgYTE0ID0gYVsxNF0sXG4gICAgICBhMTUgPSBhWzE1XTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgdmFyIGI0ID0gYls0XSxcbiAgICAgIGI1ID0gYls1XSxcbiAgICAgIGI2ID0gYls2XSxcbiAgICAgIGI3ID0gYls3XTtcbiAgdmFyIGI4ID0gYls4XSxcbiAgICAgIGI5ID0gYls5XSxcbiAgICAgIGIxMCA9IGJbMTBdLFxuICAgICAgYjExID0gYlsxMV07XG4gIHZhciBiMTIgPSBiWzEyXSxcbiAgICAgIGIxMyA9IGJbMTNdLFxuICAgICAgYjE0ID0gYlsxNF0sXG4gICAgICBiMTUgPSBiWzE1XTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpICYmIE1hdGguYWJzKGE5IC0gYjkpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJiBNYXRoLmFicyhhMTAgLSBiMTApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMCksIE1hdGguYWJzKGIxMCkpICYmIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTExKSwgTWF0aC5hYnMoYjExKSkgJiYgTWF0aC5hYnMoYTEyIC0gYjEyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJiBNYXRoLmFicyhhMTMgLSBiMTMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMyksIE1hdGguYWJzKGIxMykpICYmIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE0KSwgTWF0aC5hYnMoYjE0KSkgJiYgTWF0aC5hYnMoYTE1IC0gYjE1KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0LnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDsiLAogICAgImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXG4gKiAzIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG1vZHVsZSB2ZWMzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5LCB6KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcm91bmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCBhLCBiKSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl07XG4gIHZhciBieCA9IGJbMF0sXG4gICAgICBieSA9IGJbMV0sXG4gICAgICBieiA9IGJbMl07XG4gIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXTtcbiAgdmFyIGF5ID0gYVsxXTtcbiAgdmFyIGF6ID0gYVsyXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJtaXRlKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gIHZhciBmYWN0b3IxID0gZmFjdG9yVGltZXMyICogKDIgKiB0IC0gMykgKyAxO1xuICB2YXIgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0O1xuICB2YXIgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSk7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogKDMgLSAyICogdCk7XG4gIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgYmV6aWVyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiZXppZXIob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gIHZhciBpbnZlcnNlRmFjdG9yID0gMSAtIHQ7XG4gIHZhciBpbnZlcnNlRmFjdG9yVGltZXNUd28gPSBpbnZlcnNlRmFjdG9yICogaW52ZXJzZUZhY3RvcjtcbiAgdmFyIGZhY3RvclRpbWVzMiA9IHQgKiB0O1xuICB2YXIgZmFjdG9yMSA9IGludmVyc2VGYWN0b3JUaW1lc1R3byAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3IyID0gMyAqIHQgKiBpbnZlcnNlRmFjdG9yVGltZXNUd287XG4gIHZhciBmYWN0b3IzID0gMyAqIGZhY3RvclRpbWVzMiAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogdDtcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICB2YXIgeiA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wIC0gMS4wO1xuICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMCAtIHogKiB6KSAqIHNjYWxlO1xuICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgdmFyIHcgPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV07XG4gIHcgPSB3IHx8IDEuMDtcbiAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gIG91dFsxXSA9IChtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSkgLyB3O1xuICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQzKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gKiBDYW4gYWxzbyBiZSB1c2VkIGZvciBkdWFsIHF1YXRlcm5pb25zLiAoTXVsdGlwbHkgaXQgd2l0aCB0aGUgcmVhbCBwYXJ0KVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAvLyBiZW5jaG1hcmtzOiBodHRwczovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnMtZml4ZWRcbiAgdmFyIHF4ID0gcVswXSxcbiAgICAgIHF5ID0gcVsxXSxcbiAgICAgIHF6ID0gcVsyXSxcbiAgICAgIHF3ID0gcVszXTtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTsgLy8gdmFyIHF2ZWMgPSBbcXgsIHF5LCBxel07XG4gIC8vIHZhciB1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIGEpO1xuXG4gIHZhciB1dnggPSBxeSAqIHogLSBxeiAqIHksXG4gICAgICB1dnkgPSBxeiAqIHggLSBxeCAqIHosXG4gICAgICB1dnogPSBxeCAqIHkgLSBxeSAqIHg7IC8vIHZhciB1dXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCB1dik7XG5cbiAgdmFyIHV1dnggPSBxeSAqIHV2eiAtIHF6ICogdXZ5LFxuICAgICAgdXV2eSA9IHF6ICogdXZ4IC0gcXggKiB1dnosXG4gICAgICB1dXZ6ID0gcXggKiB1dnkgLSBxeSAqIHV2eDsgLy8gdmVjMy5zY2FsZSh1diwgdXYsIDIgKiB3KTtcblxuICB2YXIgdzIgPSBxdyAqIDI7XG4gIHV2eCAqPSB3MjtcbiAgdXZ5ICo9IHcyO1xuICB1dnogKj0gdzI7IC8vIHZlYzMuc2NhbGUodXV2LCB1dXYsIDIpO1xuXG4gIHV1dnggKj0gMjtcbiAgdXV2eSAqPSAyO1xuICB1dXZ6ICo9IDI7IC8vIHJldHVybiB2ZWMzLmFkZChvdXQsIGEsIHZlYzMuYWRkKG91dCwgdXYsIHV1dikpO1xuXG4gIG91dFswXSA9IHggKyB1dnggKyB1dXZ4O1xuICBvdXRbMV0gPSB5ICsgdXZ5ICsgdXV2eTtcbiAgb3V0WzJdID0geiArIHV2eiArIHV1dno7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHgtYXhpc1xuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzBdO1xuICByWzFdID0gcFsxXSAqIE1hdGguY29zKHJhZCkgLSBwWzJdICogTWF0aC5zaW4ocmFkKTtcbiAgclsyXSA9IHBbMV0gKiBNYXRoLnNpbihyYWQpICsgcFsyXSAqIE1hdGguY29zKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFsyXSAqIE1hdGguc2luKHJhZCkgKyBwWzBdICogTWF0aC5jb3MocmFkKTtcbiAgclsxXSA9IHBbMV07XG4gIHJbMl0gPSBwWzJdICogTWF0aC5jb3MocmFkKSAtIHBbMF0gKiBNYXRoLnNpbihyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMF0gKiBNYXRoLmNvcyhyYWQpIC0gcFsxXSAqIE1hdGguc2luKHJhZCk7XG4gIHJbMV0gPSBwWzBdICogTWF0aC5zaW4ocmFkKSArIHBbMV0gKiBNYXRoLmNvcyhyYWQpO1xuICByWzJdID0gcFsyXTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdLFxuICAgICAgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdLFxuICAgICAgbWFnMSA9IE1hdGguc3FydChheCAqIGF4ICsgYXkgKiBheSArIGF6ICogYXopLFxuICAgICAgbWFnMiA9IE1hdGguc3FydChieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnopLFxuICAgICAgbWFnID0gbWFnMSAqIG1hZzIsXG4gICAgICBjb3NpbmUgPSBtYWcgJiYgZG90KGEsIGIpIC8gbWFnO1xuICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gemVyb1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICBvdXRbMl0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWMzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSAzO1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xufSgpOyIsCiAgICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcbiAqIDQgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbW9kdWxlIHZlYzRcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzRcbiAqXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHksIHosIHcpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICBvdXRbM10gPSB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjNCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5LCB6LCB3KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIG91dFszXSA9IHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgb3V0WzNdID0gYVszXSArIGJbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgb3V0WzNdID0gYVszXSAqIGJbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgb3V0WzNdID0gYVszXSAvIGJbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNlaWxcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2VpbChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5jZWlsKGFbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gIG91dFszXSA9IE1hdGguZmxvb3IoYVszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5yb3VuZChhWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5yb3VuZChhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgb3V0WzJdID0gYVsyXSAqIGI7XG4gIG91dFszXSA9IGFbM10gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHZhciB3ID0gYlszXSAtIGFbM107XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHosIHcpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICB2YXIgdyA9IGJbM10gLSBhWzNdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIHcgPSBhWzNdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6LCB3KTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIHcgPSBhWzNdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG59XG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXTtcbiAgb3V0WzFdID0gLWFbMV07XG4gIG91dFsyXSA9IC1hWzJdO1xuICBvdXRbM10gPSAtYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICBvdXRbM10gPSAxLjAgLyBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgdyA9IGFbM107XG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcblxuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgfVxuXG4gIG91dFswXSA9IHggKiBsZW47XG4gIG91dFsxXSA9IHkgKiBsZW47XG4gIG91dFsyXSA9IHogKiBsZW47XG4gIG91dFszXSA9IHcgKiBsZW47XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0aHJlZSB2ZWN0b3JzIGluIGEgNC1kaW1lbnNpb25hbCBzcGFjZVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSByZXN1bHQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBVIHRoZSBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBWIHRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gVyB0aGUgdGhpcmQgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gcmVzdWx0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgdSwgdiwgdykge1xuICB2YXIgQSA9IHZbMF0gKiB3WzFdIC0gdlsxXSAqIHdbMF0sXG4gICAgICBCID0gdlswXSAqIHdbMl0gLSB2WzJdICogd1swXSxcbiAgICAgIEMgPSB2WzBdICogd1szXSAtIHZbM10gKiB3WzBdLFxuICAgICAgRCA9IHZbMV0gKiB3WzJdIC0gdlsyXSAqIHdbMV0sXG4gICAgICBFID0gdlsxXSAqIHdbM10gLSB2WzNdICogd1sxXSxcbiAgICAgIEYgPSB2WzJdICogd1szXSAtIHZbM10gKiB3WzJdO1xuICB2YXIgRyA9IHVbMF07XG4gIHZhciBIID0gdVsxXTtcbiAgdmFyIEkgPSB1WzJdO1xuICB2YXIgSiA9IHVbM107XG4gIG91dFswXSA9IEggKiBGIC0gSSAqIEUgKyBKICogRDtcbiAgb3V0WzFdID0gLShHICogRikgKyBJICogQyAtIEogKiBCO1xuICBvdXRbMl0gPSBHICogRSAtIEggKiBDICsgSiAqIEE7XG4gIG91dFszXSA9IC0oRyAqIEQpICsgSCAqIEIgLSBJICogQTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdO1xuICB2YXIgYXkgPSBhWzFdO1xuICB2YXIgYXogPSBhWzJdO1xuICB2YXIgYXcgPSBhWzNdO1xuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICBvdXRbM10gPSBhdyArIHQgKiAoYlszXSAtIGF3KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7IC8vIE1hcnNhZ2xpYSwgR2VvcmdlLiBDaG9vc2luZyBhIFBvaW50IGZyb20gdGhlIFN1cmZhY2Ugb2YgYVxuICAvLyBTcGhlcmUuIEFubi4gTWF0aC4gU3RhdGlzdC4gNDMgKDE5NzIpLCBuby4gMiwgNjQ1LS02NDYuXG4gIC8vIGh0dHA6Ly9wcm9qZWN0ZXVjbGlkLm9yZy9ldWNsaWQuYW9tcy8xMTc3NjkyNjQ0O1xuXG4gIHZhciB2MSwgdjIsIHYzLCB2NDtcbiAgdmFyIHMxLCBzMjtcblxuICBkbyB7XG4gICAgdjEgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHYyID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICBzMSA9IHYxICogdjEgKyB2MiAqIHYyO1xuICB9IHdoaWxlIChzMSA+PSAxKTtcblxuICBkbyB7XG4gICAgdjMgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHY0ID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICBzMiA9IHYzICogdjMgKyB2NCAqIHY0O1xuICB9IHdoaWxlIChzMiA+PSAxKTtcblxuICB2YXIgZCA9IE1hdGguc3FydCgoMSAtIHMxKSAvIHMyKTtcbiAgb3V0WzBdID0gc2NhbGUgKiB2MTtcbiAgb3V0WzFdID0gc2NhbGUgKiB2MjtcbiAgb3V0WzJdID0gc2NhbGUgKiB2MyAqIGQ7XG4gIG91dFszXSA9IHNjYWxlICogdjQgKiBkO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl0sXG4gICAgICB3ID0gYVszXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0gKiB3O1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHc7XG4gIG91dFszXSA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XSAqIHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgdmFyIHF4ID0gcVswXSxcbiAgICAgIHF5ID0gcVsxXSxcbiAgICAgIHF6ID0gcVsyXSxcbiAgICAgIHF3ID0gcVszXTsgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcblxuICB2YXIgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHk7XG4gIHZhciBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogejtcbiAgdmFyIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4O1xuICB2YXIgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6OyAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG5cbiAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB6ZXJvXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gemVybyhvdXQpIHtcbiAgb3V0WzBdID0gMC4wO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgb3V0WzNdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwidmVjNChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIilcIjtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdICYmIGFbM10gPT09IGJbM107XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdLFxuICAgICAgYTMgPSBhWzNdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpO1xufVxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGl2aWRlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBkaXYgPSBkaXZpZGU7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGlzdCA9IGRpc3RhbmNlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzcXJEaXN0ID0gc3F1YXJlZERpc3RhbmNlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBsZW4gPSBsZW5ndGg7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzRzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZlYyA9IGNyZWF0ZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgIHZhciBpLCBsO1xuXG4gICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgIHN0cmlkZSA9IDQ7XG4gICAgfVxuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbCA9IGEubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICB2ZWNbMF0gPSBhW2ldO1xuICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICB2ZWNbMl0gPSBhW2kgKyAyXTtcbiAgICAgIHZlY1szXSA9IGFbaSArIDNdO1xuICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICBhW2kgKyAyXSA9IHZlY1syXTtcbiAgICAgIGFbaSArIDNdID0gdmVjWzNdO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xufSgpOyIsCiAgICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG5pbXBvcnQgKiBhcyBtYXQzIGZyb20gXCIuL21hdDMuanNcIjtcbmltcG9ydCAqIGFzIHZlYzMgZnJvbSBcIi4vdmVjMy5qc1wiO1xuaW1wb3J0ICogYXMgdmVjNCBmcm9tIFwiLi92ZWM0LmpzXCI7XG4vKipcbiAqIFF1YXRlcm5pb25cbiAqIEBtb2R1bGUgcXVhdFxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBxdWF0XG4gKlxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gIH1cblxuICBvdXRbM10gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgYSBxdWF0IHRvIHRoZSBpZGVudGl0eSBxdWF0ZXJuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICBvdXRbMF0gPSAwO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAqIHRoZW4gcmV0dXJucyBpdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIGFyb3VuZCB3aGljaCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF4aXNBbmdsZShvdXQsIGF4aXMsIHJhZCkge1xuICByYWQgPSByYWQgKiAwLjU7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgb3V0WzBdID0gcyAqIGF4aXNbMF07XG4gIG91dFsxXSA9IHMgKiBheGlzWzFdO1xuICBvdXRbMl0gPSBzICogYXhpc1syXTtcbiAgb3V0WzNdID0gTWF0aC5jb3MocmFkKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2V0cyB0aGUgcm90YXRpb24gYXhpcyBhbmQgYW5nbGUgZm9yIGEgZ2l2ZW5cbiAqICBxdWF0ZXJuaW9uLiBJZiBhIHF1YXRlcm5pb24gaXMgY3JlYXRlZCB3aXRoXG4gKiAgc2V0QXhpc0FuZ2xlLCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgc2FtZVxuICogIHZhbHVlcyBhcyBwcm92aWRpZWQgaW4gdGhlIG9yaWdpbmFsIHBhcmFtZXRlciBsaXN0XG4gKiAgT1IgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdmFsdWVzLlxuICogRXhhbXBsZTogVGhlIHF1YXRlcm5pb24gZm9ybWVkIGJ5IGF4aXMgWzAsIDAsIDFdIGFuZFxuICogIGFuZ2xlIC05MCBpcyB0aGUgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBmb3JtZWQgYnlcbiAqICBbMCwgMCwgMV0gYW5kIDI3MC4gVGhpcyBtZXRob2QgZmF2b3JzIHRoZSBsYXR0ZXIuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXRfYXhpcyAgVmVjdG9yIHJlY2VpdmluZyB0aGUgYXhpcyBvZiByb3RhdGlvblxuICogQHBhcmFtICB7UmVhZG9ubHlRdWF0fSBxICAgICBRdWF0ZXJuaW9uIHRvIGJlIGRlY29tcG9zZWRcbiAqIEByZXR1cm4ge051bWJlcn0gICAgIEFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgcm90YXRpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXhpc0FuZ2xlKG91dF9heGlzLCBxKSB7XG4gIHZhciByYWQgPSBNYXRoLmFjb3MocVszXSkgKiAyLjA7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkIC8gMi4wKTtcblxuICBpZiAocyA+IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICBvdXRfYXhpc1swXSA9IHFbMF0gLyBzO1xuICAgIG91dF9heGlzWzFdID0gcVsxXSAvIHM7XG4gICAgb3V0X2F4aXNbMl0gPSBxWzJdIC8gcztcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBzIGlzIHplcm8sIHJldHVybiBhbnkgYXhpcyAobm8gcm90YXRpb24gLSBheGlzIGRvZXMgbm90IG1hdHRlcilcbiAgICBvdXRfYXhpc1swXSA9IDE7XG4gICAgb3V0X2F4aXNbMV0gPSAwO1xuICAgIG91dF9heGlzWzJdID0gMDtcbiAgfVxuXG4gIHJldHVybiByYWQ7XG59XG4vKipcbiAqIEdldHMgdGhlIGFuZ3VsYXIgZGlzdGFuY2UgYmV0d2VlbiB0d28gdW5pdCBxdWF0ZXJuaW9uc1xuICpcbiAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdH0gYSAgICAgT3JpZ2luIHVuaXQgcXVhdGVybmlvblxuICogQHBhcmFtICB7UmVhZG9ubHlRdWF0fSBiICAgICBEZXN0aW5hdGlvbiB1bml0IHF1YXRlcm5pb25cbiAqIEByZXR1cm4ge051bWJlcn0gICAgIEFuZ2xlLCBpbiByYWRpYW5zLCBiZXR3ZWVuIHRoZSB0d28gcXVhdGVybmlvbnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5nbGUoYSwgYikge1xuICB2YXIgZG90cHJvZHVjdCA9IGRvdChhLCBiKTtcbiAgcmV0dXJuIE1hdGguYWNvcygyICogZG90cHJvZHVjdCAqIGRvdHByb2R1Y3QgLSAxKTtcbn1cbi8qKlxuICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdLFxuICAgICAgYXcgPSBhWzNdO1xuICB2YXIgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdLFxuICAgICAgYncgPSBiWzNdO1xuICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5O1xuICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6O1xuICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWChvdXQsIGEsIHJhZCkge1xuICByYWQgKj0gMC41O1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdLFxuICAgICAgYXcgPSBhWzNdO1xuICB2YXIgYnggPSBNYXRoLnNpbihyYWQpLFxuICAgICAgYncgPSBNYXRoLmNvcyhyYWQpO1xuICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgb3V0WzFdID0gYXkgKiBidyArIGF6ICogYng7XG4gIG91dFsyXSA9IGF6ICogYncgLSBheSAqIGJ4O1xuICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVkob3V0LCBhLCByYWQpIHtcbiAgcmFkICo9IDAuNTtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICAgIGF5ID0gYVsxXSxcbiAgICAgIGF6ID0gYVsyXSxcbiAgICAgIGF3ID0gYVszXTtcbiAgdmFyIGJ5ID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgIGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgb3V0WzBdID0gYXggKiBidyAtIGF6ICogYnk7XG4gIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5O1xuICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgb3V0WzNdID0gYXcgKiBidyAtIGF5ICogYnk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVaKG91dCwgYSwgcmFkKSB7XG4gIHJhZCAqPSAwLjU7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl0sXG4gICAgICBhdyA9IGFbM107XG4gIHZhciBieiA9IE1hdGguc2luKHJhZCksXG4gICAgICBidyA9IE1hdGguY29zKHJhZCk7XG4gIG91dFswXSA9IGF4ICogYncgKyBheSAqIGJ6O1xuICBvdXRbMV0gPSBheSAqIGJ3IC0gYXggKiBiejtcbiAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYno7XG4gIG91dFszXSA9IGF3ICogYncgLSBheiAqIGJ6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBXIGNvbXBvbmVudCBvZiBhIHF1YXQgZnJvbSB0aGUgWCwgWSwgYW5kIFogY29tcG9uZW50cy5cbiAqIEFzc3VtZXMgdGhhdCBxdWF0ZXJuaW9uIGlzIDEgdW5pdCBpbiBsZW5ndGguXG4gKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgVyBjb21wb25lbnQgb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVyhvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgb3V0WzNdID0gTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIHggKiB4IC0geSAqIHkgLSB6ICogeikpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mIGEgdW5pdCBxdWF0ZXJuaW9uLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cChvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXSxcbiAgICAgIHcgPSBhWzNdO1xuICB2YXIgciA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICB2YXIgZXQgPSBNYXRoLmV4cCh3KTtcbiAgdmFyIHMgPSByID4gMCA/IGV0ICogTWF0aC5zaW4ocikgLyByIDogMDtcbiAgb3V0WzBdID0geCAqIHM7XG4gIG91dFsxXSA9IHkgKiBzO1xuICBvdXRbMl0gPSB6ICogcztcbiAgb3V0WzNdID0gZXQgKiBNYXRoLmNvcyhyKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiBhIHVuaXQgcXVhdGVybmlvbi5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIHRoZSBleHBvbmVudGlhbCBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsbihvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXSxcbiAgICAgIHcgPSBhWzNdO1xuICB2YXIgciA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICB2YXIgdCA9IHIgPiAwID8gTWF0aC5hdGFuMihyLCB3KSAvIHIgOiAwO1xuICBvdXRbMF0gPSB4ICogdDtcbiAgb3V0WzFdID0geSAqIHQ7XG4gIG91dFsyXSA9IHogKiB0O1xuICBvdXRbM10gPSAwLjUgKiBNYXRoLmxvZyh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgc2NhbGFyIHBvd2VyIG9mIGEgdW5pdCBxdWF0ZXJuaW9uLlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHF1YXRlcm5pb24gYnlcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcG93KG91dCwgYSwgYikge1xuICBsbihvdXQsIGEpO1xuICBzY2FsZShvdXQsIG91dCwgYik7XG4gIGV4cChvdXQsIG91dCk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2xlcnAob3V0LCBhLCBiLCB0KSB7XG4gIC8vIGJlbmNobWFya3M6XG4gIC8vICAgIGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tc2xlcnAtaW1wbGVtZW50YXRpb25zXG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl0sXG4gICAgICBhdyA9IGFbM107XG4gIHZhciBieCA9IGJbMF0sXG4gICAgICBieSA9IGJbMV0sXG4gICAgICBieiA9IGJbMl0sXG4gICAgICBidyA9IGJbM107XG4gIHZhciBvbWVnYSwgY29zb20sIHNpbm9tLCBzY2FsZTAsIHNjYWxlMTsgLy8gY2FsYyBjb3NpbmVcblxuICBjb3NvbSA9IGF4ICogYnggKyBheSAqIGJ5ICsgYXogKiBieiArIGF3ICogYnc7IC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuXG4gIGlmIChjb3NvbSA8IDAuMCkge1xuICAgIGNvc29tID0gLWNvc29tO1xuICAgIGJ4ID0gLWJ4O1xuICAgIGJ5ID0gLWJ5O1xuICAgIGJ6ID0gLWJ6O1xuICAgIGJ3ID0gLWJ3O1xuICB9IC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcblxuXG4gIGlmICgxLjAgLSBjb3NvbSA+IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSk7XG4gICAgc2lub20gPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgc2NhbGUwID0gTWF0aC5zaW4oKDEuMCAtIHQpICogb21lZ2EpIC8gc2lub207XG4gICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xuICB9IGVsc2Uge1xuICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcbiAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgc2NhbGUwID0gMS4wIC0gdDtcbiAgICBzY2FsZTEgPSB0O1xuICB9IC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcblxuXG4gIG91dFswXSA9IHNjYWxlMCAqIGF4ICsgc2NhbGUxICogYng7XG4gIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gIG91dFsyXSA9IHNjYWxlMCAqIGF6ICsgc2NhbGUxICogYno7XG4gIG91dFszXSA9IHNjYWxlMCAqIGF3ICsgc2NhbGUxICogYnc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB1bml0IHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCkge1xuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiBodHRwOi8vcGxhbm5pbmcuY3MudWl1Yy5lZHUvbm9kZTE5OC5odG1sXG4gIC8vIFRPRE86IENhbGxpbmcgcmFuZG9tIDMgdGltZXMgaXMgcHJvYmFibHkgbm90IHRoZSBmYXN0ZXN0IHNvbHV0aW9uXG4gIHZhciB1MSA9IGdsTWF0cml4LlJBTkRPTSgpO1xuICB2YXIgdTIgPSBnbE1hdHJpeC5SQU5ET00oKTtcbiAgdmFyIHUzID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gIHZhciBzcXJ0MU1pbnVzVTEgPSBNYXRoLnNxcnQoMSAtIHUxKTtcbiAgdmFyIHNxcnRVMSA9IE1hdGguc3FydCh1MSk7XG4gIG91dFswXSA9IHNxcnQxTWludXNVMSAqIE1hdGguc2luKDIuMCAqIE1hdGguUEkgKiB1Mik7XG4gIG91dFsxXSA9IHNxcnQxTWludXNVMSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB1Mik7XG4gIG91dFsyXSA9IHNxcnRVMSAqIE1hdGguc2luKDIuMCAqIE1hdGguUEkgKiB1Myk7XG4gIG91dFszXSA9IHNxcnRVMSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB1Myk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBpbnZlcnNlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGRvdCA9IGEwICogYTAgKyBhMSAqIGExICsgYTIgKiBhMiArIGEzICogYTM7XG4gIHZhciBpbnZEb3QgPSBkb3QgPyAxLjAgLyBkb3QgOiAwOyAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gIG91dFswXSA9IC1hMCAqIGludkRvdDtcbiAgb3V0WzFdID0gLWExICogaW52RG90O1xuICBvdXRbMl0gPSAtYTIgKiBpbnZEb3Q7XG4gIG91dFszXSA9IGEzICogaW52RG90O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb25qdWdhdGUgb2YgYSBxdWF0XG4gKiBJZiB0aGUgcXVhdGVybmlvbiBpcyBub3JtYWxpemVkLCB0aGlzIGZ1bmN0aW9uIGlzIGZhc3RlciB0aGFuIHF1YXQuaW52ZXJzZSBhbmQgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmp1Z2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHF1YXRlcm5pb24gZnJvbSB0aGUgZ2l2ZW4gM3gzIHJvdGF0aW9uIG1hdHJpeC5cbiAqXG4gKiBOT1RFOiBUaGUgcmVzdWx0YW50IHF1YXRlcm5pb24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIHlvdSBzaG91bGQgYmUgc3VyZVxuICogdG8gcmVub3JtYWxpemUgdGhlIHF1YXRlcm5pb24geW91cnNlbGYgd2hlcmUgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gcm90YXRpb24gbWF0cml4XG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1hdDMob3V0LCBtKSB7XG4gIC8vIEFsZ29yaXRobSBpbiBLZW4gU2hvZW1ha2UncyBhcnRpY2xlIGluIDE5ODcgU0lHR1JBUEggY291cnNlIG5vdGVzXG4gIC8vIGFydGljbGUgXCJRdWF0ZXJuaW9uIENhbGN1bHVzIGFuZCBGYXN0IEFuaW1hdGlvblwiLlxuICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICB2YXIgZlJvb3Q7XG5cbiAgaWYgKGZUcmFjZSA+IDAuMCkge1xuICAgIC8vIHx3fCA+IDEvMiwgbWF5IGFzIHdlbGwgY2hvb3NlIHcgPiAxLzJcbiAgICBmUm9vdCA9IE1hdGguc3FydChmVHJhY2UgKyAxLjApOyAvLyAyd1xuXG4gICAgb3V0WzNdID0gMC41ICogZlJvb3Q7XG4gICAgZlJvb3QgPSAwLjUgLyBmUm9vdDsgLy8gMS8oNHcpXG5cbiAgICBvdXRbMF0gPSAobVs1XSAtIG1bN10pICogZlJvb3Q7XG4gICAgb3V0WzFdID0gKG1bNl0gLSBtWzJdKSAqIGZSb290O1xuICAgIG91dFsyXSA9IChtWzFdIC0gbVszXSkgKiBmUm9vdDtcbiAgfSBlbHNlIHtcbiAgICAvLyB8d3wgPD0gMS8yXG4gICAgdmFyIGkgPSAwO1xuICAgIGlmIChtWzRdID4gbVswXSkgaSA9IDE7XG4gICAgaWYgKG1bOF0gPiBtW2kgKiAzICsgaV0pIGkgPSAyO1xuICAgIHZhciBqID0gKGkgKyAxKSAlIDM7XG4gICAgdmFyIGsgPSAoaSArIDIpICUgMztcbiAgICBmUm9vdCA9IE1hdGguc3FydChtW2kgKiAzICsgaV0gLSBtW2ogKiAzICsgal0gLSBtW2sgKiAzICsga10gKyAxLjApO1xuICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgIGZSb290ID0gMC41IC8gZlJvb3Q7XG4gICAgb3V0WzNdID0gKG1baiAqIDMgKyBrXSAtIG1bayAqIDMgKyBqXSkgKiBmUm9vdDtcbiAgICBvdXRbal0gPSAobVtqICogMyArIGldICsgbVtpICogMyArIGpdKSAqIGZSb290O1xuICAgIG91dFtrXSA9IChtW2sgKiAzICsgaV0gKyBtW2kgKiAzICsga10pICogZlJvb3Q7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiBldWxlciBhbmdsZSB4LCB5LCB6LlxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHt4fSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFggYXhpcyBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHt5fSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFkgYXhpcyBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHt6fSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdWxlcihvdXQsIHgsIHksIHopIHtcbiAgdmFyIGhhbGZUb1JhZCA9IDAuNSAqIE1hdGguUEkgLyAxODAuMDtcbiAgeCAqPSBoYWxmVG9SYWQ7XG4gIHkgKj0gaGFsZlRvUmFkO1xuICB6ICo9IGhhbGZUb1JhZDtcbiAgdmFyIHN4ID0gTWF0aC5zaW4oeCk7XG4gIHZhciBjeCA9IE1hdGguY29zKHgpO1xuICB2YXIgc3kgPSBNYXRoLnNpbih5KTtcbiAgdmFyIGN5ID0gTWF0aC5jb3MoeSk7XG4gIHZhciBzeiA9IE1hdGguc2luKHopO1xuICB2YXIgY3ogPSBNYXRoLmNvcyh6KTtcbiAgb3V0WzBdID0gc3ggKiBjeSAqIGN6IC0gY3ggKiBzeSAqIHN6O1xuICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XG4gIG91dFsyXSA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgb3V0WzNdID0gY3ggKiBjeSAqIGN6ICsgc3ggKiBzeSAqIHN6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwicXVhdChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIilcIjtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGNsb25lID0gdmVjNC5jbG9uZTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBmcm9tVmFsdWVzID0gdmVjNC5mcm9tVmFsdWVzO1xuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgc291cmNlIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgY29weSA9IHZlYzQuY29weTtcbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzZXQgPSB2ZWM0LnNldDtcbi8qKlxuICogQWRkcyB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGFkZCA9IHZlYzQuYWRkO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXG4gKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzY2FsZSA9IHZlYzQuc2NhbGU7XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRvdCA9IHZlYzQuZG90O1xuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBsZXJwID0gdmVjNC5sZXJwO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IHZhciBsZW5ndGggPSB2ZWM0Lmxlbmd0aDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxdWFyZWRMZW5ndGggPSB2ZWM0LnNxdWFyZWRMZW5ndGg7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0ZXJuaW9uIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBub3JtYWxpemUgPSB2ZWM0Lm5vcm1hbGl6ZTtcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIFRoZSBmaXJzdCBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgVGhlIHNlY29uZCBxdWF0ZXJuaW9uLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IHZhciBleGFjdEVxdWFscyA9IHZlYzQuZXhhY3RFcXVhbHM7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHF1YXRlcm5pb25zIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgdmFyIGVxdWFscyA9IHZlYzQuZXF1YWxzO1xuLyoqXG4gKiBTZXRzIGEgcXVhdGVybmlvbiB0byByZXByZXNlbnQgdGhlIHNob3J0ZXN0IHJvdGF0aW9uIGZyb20gb25lXG4gKiB2ZWN0b3IgdG8gYW5vdGhlci5cbiAqXG4gKiBCb3RoIHZlY3RvcnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGluaXRpYWwgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgZGVzdGluYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IHZhciByb3RhdGlvblRvID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdG1wdmVjMyA9IHZlYzMuY3JlYXRlKCk7XG4gIHZhciB4VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMSwgMCwgMCk7XG4gIHZhciB5VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGRvdCA9IHZlYzMuZG90KGEsIGIpO1xuXG4gICAgaWYgKGRvdCA8IC0wLjk5OTk5OSkge1xuICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCB4VW5pdFZlYzMsIGEpO1xuICAgICAgaWYgKHZlYzMubGVuKHRtcHZlYzMpIDwgMC4wMDAwMDEpIHZlYzMuY3Jvc3ModG1wdmVjMywgeVVuaXRWZWMzLCBhKTtcbiAgICAgIHZlYzMubm9ybWFsaXplKHRtcHZlYzMsIHRtcHZlYzMpO1xuICAgICAgc2V0QXhpc0FuZ2xlKG91dCwgdG1wdmVjMywgTWF0aC5QSSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgIG91dFswXSA9IDA7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICAgIG91dFszXSA9IDE7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2ZWMzLmNyb3NzKHRtcHZlYzMsIGEsIGIpO1xuICAgICAgb3V0WzBdID0gdG1wdmVjM1swXTtcbiAgICAgIG91dFsxXSA9IHRtcHZlYzNbMV07XG4gICAgICBvdXRbMl0gPSB0bXB2ZWMzWzJdO1xuICAgICAgb3V0WzNdID0gMSArIGRvdDtcbiAgICAgIHJldHVybiBub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIH1cbiAgfTtcbn0oKTtcbi8qKlxuICogUGVyZm9ybXMgYSBzcGhlcmljYWwgbGluZWFyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBjIHRoZSB0aGlyZCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgdmFyIHNxbGVycCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRlbXAxID0gY3JlYXRlKCk7XG4gIHZhciB0ZW1wMiA9IGNyZWF0ZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICAgIHNsZXJwKHRlbXAxLCBhLCBkLCB0KTtcbiAgICBzbGVycCh0ZW1wMiwgYiwgYywgdCk7XG4gICAgc2xlcnAob3V0LCB0ZW1wMSwgdGVtcDIsIDIgKiB0ICogKDEgLSB0KSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfTtcbn0oKTtcbi8qKlxuICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAqIGF4ZXMuIEVhY2ggYXhpcyBpcyBhIHZlYzMgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXQgbGVuZ3RoIGFuZFxuICogcGVycGVuZGljdWxhciB0byBhbGwgb3RoZXIgc3BlY2lmaWVkIGF4ZXMuXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHZpZXcgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB2aWV3aW5nIGRpcmVjdGlvblxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHJpZ2h0IHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInJpZ2h0XCIgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgICAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwidXBcIiBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xuXG5leHBvcnQgdmFyIHNldEF4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtYXRyID0gbWF0My5jcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgIG1hdHJbMF0gPSByaWdodFswXTtcbiAgICBtYXRyWzNdID0gcmlnaHRbMV07XG4gICAgbWF0cls2XSA9IHJpZ2h0WzJdO1xuICAgIG1hdHJbMV0gPSB1cFswXTtcbiAgICBtYXRyWzRdID0gdXBbMV07XG4gICAgbWF0cls3XSA9IHVwWzJdO1xuICAgIG1hdHJbMl0gPSAtdmlld1swXTtcbiAgICBtYXRyWzVdID0gLXZpZXdbMV07XG4gICAgbWF0cls4XSA9IC12aWV3WzJdO1xuICAgIHJldHVybiBub3JtYWxpemUob3V0LCBmcm9tTWF0MyhvdXQsIG1hdHIpKTtcbiAgfTtcbn0oKTsiLAogICAgImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXG4gKiAyIERpbWVuc2lvbmFsIFZlY3RvclxuICogQG1vZHVsZSB2ZWMyXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXG4gKlxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMik7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5KSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzIgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHkpIHtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNlaWxcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2VpbChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBmbG9vclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWluKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gcm91bmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNjYWxlcyBhIHZlYzIgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzIncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSk7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICB5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiB4ICogeCArIHkgKiB5O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5KTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHJldHVybiB4ICogeCArIHkgKiB5O1xufVxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF07XG4gIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeTtcblxuICBpZiAobGVuID4gMCkge1xuICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XG59XG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqIE5vdGUgdGhhdCB0aGUgY3Jvc3MgcHJvZHVjdCBtdXN0IGJ5IGRlZmluaXRpb24gcHJvZHVjZSBhIDNEIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gIG91dFswXSA9IG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICAgIGF5ID0gYVsxXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb20ob3V0LCBzY2FsZSkge1xuICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgdmFyIHIgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gIG91dFswXSA9IE1hdGguY29zKHIpICogc2NhbGU7XG4gIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MmQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeSArIG1bNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDNcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdO1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NFxuICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCdcbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bMTNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGUgYSAyRCB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IFRoZSByZWNlaXZpbmcgdmVjMlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIHZlYzIgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCBiLCByYWQpIHtcbiAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICB2YXIgcDAgPSBhWzBdIC0gYlswXSxcbiAgICAgIHAxID0gYVsxXSAtIGJbMV0sXG4gICAgICBzaW5DID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgIGNvc0MgPSBNYXRoLmNvcyhyYWQpOyAvL3BlcmZvcm0gcm90YXRpb24gYW5kIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gcDAgKiBjb3NDIC0gcDEgKiBzaW5DICsgYlswXTtcbiAgb3V0WzFdID0gcDAgKiBzaW5DICsgcDEgKiBjb3NDICsgYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAyRCB2ZWN0b3JzXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhbmdsZShhLCBiKSB7XG4gIHZhciB4MSA9IGFbMF0sXG4gICAgICB5MSA9IGFbMV0sXG4gICAgICB4MiA9IGJbMF0sXG4gICAgICB5MiA9IGJbMV0sXG4gICAgICAvLyBtYWcgaXMgdGhlIHByb2R1Y3Qgb2YgdGhlIG1hZ25pdHVkZXMgb2YgYSBhbmQgYlxuICBtYWcgPSBNYXRoLnNxcnQoeDEgKiB4MSArIHkxICogeTEpICogTWF0aC5zcXJ0KHgyICogeDIgKyB5MiAqIHkyKSxcbiAgICAgIC8vIG1hZyAmJi4uIHNob3J0IGNpcmN1aXRzIGlmIG1hZyA9PSAwXG4gIGNvc2luZSA9IG1hZyAmJiAoeDEgKiB4MiArIHkxICogeTIpIC8gbWFnOyAvLyBNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkgY2xhbXBzIHRoZSBjb3NpbmUgYmV0d2VlbiAtMSBhbmQgMVxuXG4gIHJldHVybiBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpKTtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB6ZXJvXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gemVybyhvdXQpIHtcbiAgb3V0WzBdID0gMC4wO1xuICBvdXRbMV0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWMyKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIilcIjtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBleGFjdGx5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpO1xufVxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBsZW4gPSBsZW5ndGg7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpdiA9IGRpdmlkZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBkaXN0ID0gZGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckRpc3QgPSBzcXVhcmVkRGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjMnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMi4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZlYyA9IGNyZWF0ZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgIHZhciBpLCBsO1xuXG4gICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgIHN0cmlkZSA9IDI7XG4gICAgfVxuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbCA9IGEubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICB2ZWNbMF0gPSBhW2ldO1xuICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLAogICAgImltcG9ydCB7XG4gIEdsb2JhbEtleWJvYXJkTWFuYWdlcixcbiAgR2xvYmFsTW91c2VNYW5hZ2VyLFxuICBHbG9iYWxUb3VjaE1hbmFnZXJcbn0gZnJvbSAnLi4vYnJvd3Nlcic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBBbGxBeGlzZXMgPSB7XG4gIFg6IDAsXG4gIFk6IDEsXG4gIFo6IDJcbn07XG50eXBlIEF4aXNUeXBlID0ga2V5b2YgdHlwZW9mIEFsbEF4aXNlcztcbnR5cGUgQ29vcmRpbmF0ZXMgPSBbQXhpc1R5cGUsIEF4aXNUeXBlLCBBeGlzVHlwZV07XG5cbmludGVyZmFjZSBJRnJlZUZseUNvbnRyb2xsZXJEZWYge1xuICBwb3NpdGlvbjogZ2xtLnZlYzM7XG4gIGNvb3JkaW5hdGVzPzogQ29vcmRpbmF0ZXM7XG4gIHRoZXRhOiBudW1iZXI7XG4gIHBoaTogbnVtYmVyO1xuICBtb3VzZVNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIGtleWJvYXJkU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAgdG91Y2hTZW5zaWJpbGl0eTogbnVtYmVyO1xuICBtb3ZpbmdTcGVlZDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRnJlZUZseUNvbnRyb2xsZXIge1xuICBwcml2YXRlIF9pc0FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF90aGV0YTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcGhpOiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgX21vdXNlU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfa2V5Ym9hcmRTZW5zaWJpbGl0eTogbnVtYmVyO1xuICBwcml2YXRlIF90b3VjaFNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIHByaXZhdGUgX21vdmluZ1NwZWVkOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfdG91Y2hXYXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdG91Y2hTdGFydFRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3RvdWNoTW92ZUZvcndhcmQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9heGlzSW5kaWNlczogW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuXG4gIHByaXZhdGUgX3Bvc2l0aW9uID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfdGFyZ2V0ID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfZm9yd2FyZEF4aXMgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDEsIDAsIDApO1xuICBwcml2YXRlIF9sZWZ0QXhpcyA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMSk7XG4gIHByaXZhdGUgX3VwQXhpcyA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMCk7XG5cbiAgY29uc3RydWN0b3IoZGVmOiBJRnJlZUZseUNvbnRyb2xsZXJEZWYpIHtcbiAgICB0aGlzLl9tb3VzZVNlbnNpYmlsaXR5ID0gZGVmLm1vdXNlU2Vuc2liaWxpdHk7XG4gICAgdGhpcy5fa2V5Ym9hcmRTZW5zaWJpbGl0eSA9IGRlZi5rZXlib2FyZFNlbnNpYmlsaXR5O1xuICAgIHRoaXMuX3RvdWNoU2Vuc2liaWxpdHkgPSBkZWYudG91Y2hTZW5zaWJpbGl0eTtcbiAgICB0aGlzLl9tb3ZpbmdTcGVlZCA9IGRlZi5tb3ZpbmdTcGVlZDtcbiAgICBnbG0udmVjMy5jb3B5KHRoaXMuX3Bvc2l0aW9uLCBkZWYucG9zaXRpb24pO1xuXG4gICAgdGhpcy5fYXhpc0luZGljZXMgPSBbXG4gICAgICBkZWYuY29vcmRpbmF0ZXMgPyBBbGxBeGlzZXNbZGVmLmNvb3JkaW5hdGVzWzBdXSA6IEFsbEF4aXNlcy5YLFxuICAgICAgZGVmLmNvb3JkaW5hdGVzID8gQWxsQXhpc2VzW2RlZi5jb29yZGluYXRlc1sxXV0gOiBBbGxBeGlzZXMuWSxcbiAgICAgIGRlZi5jb29yZGluYXRlcyA/IEFsbEF4aXNlc1tkZWYuY29vcmRpbmF0ZXNbMl1dIDogQWxsQXhpc2VzLlpcbiAgICBdO1xuXG4gICAgdGhpcy5fdGhldGEgPSBkZWYudGhldGE7XG4gICAgdGhpcy5fcGhpID0gZGVmLnBoaTtcbiAgfVxuXG4gIGlzQWN0aXZhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0FjdGl2YXRlZDtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YU1zVGltZTogbnVtYmVyKSB7XG4gICAgbGV0IG1vdmVGb3J3YXJkID0gZmFsc2U7XG4gICAgbGV0IG1vdmVCYWNrd2FyZCA9IGZhbHNlO1xuICAgIGxldCBzdHJhZmVMZWZ0ID0gZmFsc2U7XG4gICAgbGV0IHN0cmFmZVJpZ2h0ID0gZmFsc2U7XG4gICAgbGV0IGlzUnVubmluZyA9IGZhbHNlO1xuICAgIGxldCBpc0RpdmluZyA9IGZhbHNlO1xuICAgIGxldCBpc1Jpc2luZyA9IGZhbHNlO1xuICAgIGxldCBsb29rRGVsdGFYID0gMDtcbiAgICBsZXQgbG9va0RlbHRhWSA9IDA7XG5cbiAgICAvL1xuICAgIC8vIG1vdXNlXG4gICAgLy9cblxuICAgIGNvbnN0IHRvUmFkaWFucyA9IE1hdGguUEkgLyAxODA7XG5cbiAgICB7XG4gICAgICBjb25zdCBkZWx0YVggPSBHbG9iYWxNb3VzZU1hbmFnZXIuZGVsdGFYKCkgKiB0aGlzLl9tb3VzZVNlbnNpYmlsaXR5O1xuICAgICAgY29uc3QgZGVsdGFZID0gR2xvYmFsTW91c2VNYW5hZ2VyLmRlbHRhWSgpICogdGhpcy5fbW91c2VTZW5zaWJpbGl0eTtcblxuICAgICAgbG9va0RlbHRhWCAtPSBkZWx0YVggKiB0b1JhZGlhbnMgKiBkZWx0YU1zVGltZTtcbiAgICAgIGxvb2tEZWx0YVkgLT0gZGVsdGFZICogdG9SYWRpYW5zICogZGVsdGFNc1RpbWU7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBtb3VzZVxuICAgIC8vXG5cbiAgICAvL1xuICAgIC8vIHRvdWNoXG4gICAgLy9cblxuICAgIGNvbnN0IGlzVG91Y2hlZCA9IEdsb2JhbFRvdWNoTWFuYWdlci5nZXRUb3VjaERhdGEoKS5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGlzVG91Y2hlZCkge1xuICAgICAgaWYgKCF0aGlzLl90b3VjaFdhc0FjdGl2ZSkge1xuICAgICAgICBjb25zdCBjdXJyVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSAoY3VyclRpbWUgLSB0aGlzLl90b3VjaFN0YXJ0VGltZSkgLyAxMDAwO1xuICAgICAgICBpZiAoZWxhcHNlZCA8IDAuMjUpIHtcbiAgICAgICAgICB0aGlzLl90b3VjaE1vdmVGb3J3YXJkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl90b3VjaFN0YXJ0VGltZSA9IGN1cnJUaW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0VG91Y2ggPSBHbG9iYWxUb3VjaE1hbmFnZXIuZ2V0VG91Y2hEYXRhKClbMF07XG5cbiAgICAgIGNvbnN0IGRlbHRhWCA9IGZpcnN0VG91Y2guZGVsdGFYICogdGhpcy5fdG91Y2hTZW5zaWJpbGl0eTtcbiAgICAgIGNvbnN0IGRlbHRhWSA9IGZpcnN0VG91Y2guZGVsdGFZICogdGhpcy5fdG91Y2hTZW5zaWJpbGl0eTtcblxuICAgICAgbG9va0RlbHRhWCAtPSBkZWx0YVggKiB0b1JhZGlhbnMgKiBkZWx0YU1zVGltZTtcbiAgICAgIGxvb2tEZWx0YVkgLT0gZGVsdGFZICogdG9SYWRpYW5zICogZGVsdGFNc1RpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RvdWNoTW92ZUZvcndhcmQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl90b3VjaFdhc0FjdGl2ZSA9IGlzVG91Y2hlZDtcblxuICAgIGlmICh0aGlzLl90b3VjaE1vdmVGb3J3YXJkKSB7XG4gICAgICBtb3ZlRm9yd2FyZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyB0b3VjaFxuICAgIC8vXG5cbiAgICAvL1xuICAgIC8vIGtleWJvYXJkXG4gICAgLy9cblxuICAgIC8vIGZvcndhcmRcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnWicsICdXJykpIHtcbiAgICAgIG1vdmVGb3J3YXJkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZFxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdTJykpIHtcbiAgICAgIG1vdmVCYWNrd2FyZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gc3RyYWZlIGxlZnRcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQScsICdRJykpIHtcbiAgICAgIHN0cmFmZUxlZnQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHN0cmFmZSByaWdodFxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdEJykpIHtcbiAgICAgIHN0cmFmZVJpZ2h0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBydW5cbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnU2hpZnQnKSkge1xuICAgICAgaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkaXZlXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0MnKSkge1xuICAgICAgaXNEaXZpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHJpc2VcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnU3BhY2UnKSkge1xuICAgICAgaXNSaXNpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRMaW5lYXJTcGVlZCA9ICh0aGlzLl9tb3ZpbmdTcGVlZCAqIChpc1J1bm5pbmcgPyA0IDogMSkpICogZGVsdGFNc1RpbWU7XG5cbiAgICBjb25zdCBzY2FsZWRGb3J3YXJkID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgICBnbG0udmVjMy5zY2FsZShzY2FsZWRGb3J3YXJkLCB0aGlzLl9mb3J3YXJkQXhpcywgY3VycmVudExpbmVhclNwZWVkKTtcbiAgICBjb25zdCBzY2FsZWRMZWZ0ID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgICBnbG0udmVjMy5zY2FsZShzY2FsZWRMZWZ0LCB0aGlzLl9sZWZ0QXhpcywgY3VycmVudExpbmVhclNwZWVkKTtcbiAgICBjb25zdCBzY2FsZWRVcCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gICAgZ2xtLnZlYzMuc2NhbGUoc2NhbGVkVXAsIHRoaXMuX3VwQXhpcywgY3VycmVudExpbmVhclNwZWVkKTtcblxuXG4gICAgLy9cbiAgICAvL1xuXG4gICAgY29uc3QgY3VycmVudEFuZ3VsYXJTcGVlZCA9IHRoaXMuX2tleWJvYXJkU2Vuc2liaWxpdHkgKiBkZWx0YU1zVGltZTtcblxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd1VwJykpIHtcbiAgICAgIGxvb2tEZWx0YVkgKz0gY3VycmVudEFuZ3VsYXJTcGVlZDtcbiAgICB9IGVsc2UgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93RG93bicpKSB7XG4gICAgICBsb29rRGVsdGFZIC09IGN1cnJlbnRBbmd1bGFyU3BlZWQ7XG4gICAgfVxuXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93TGVmdCcpKSB7XG4gICAgICBsb29rRGVsdGFYICs9IGN1cnJlbnRBbmd1bGFyU3BlZWQ7XG4gICAgfSBlbHNlIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd1JpZ2h0JykpIHtcbiAgICAgIGxvb2tEZWx0YVggLT0gY3VycmVudEFuZ3VsYXJTcGVlZDtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIGtleWJvYXJkXG4gICAgLy9cblxuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG4gICAgLy9cblxuICAgIHRoaXMuX3RoZXRhICs9IGxvb2tEZWx0YVg7XG4gICAgdGhpcy5fcGhpICs9IGxvb2tEZWx0YVk7XG5cbiAgICBjb25zdCBoUGkgPSBNYXRoLlBJICogMC41O1xuICAgIGNvbnN0IHZlcnRpY2FsTGltaXQgPSBoUGkgKiAwLjk1O1xuXG4gICAgdGhpcy5fcGhpID0gTWF0aC5taW4oTWF0aC5tYXgodGhpcy5fcGhpLCAtdmVydGljYWxMaW1pdCksICt2ZXJ0aWNhbExpbWl0KTtcblxuICAgIGNvbnN0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhpcy5fdGhldGEpO1xuICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhpcy5fdGhldGEpO1xuXG4gICAgY29uc3QgW2F4aXNYLCBheGlzWSwgYXhpc1pdID0gdGhpcy5fYXhpc0luZGljZXM7XG5cbiAgICBjb25zdCB1cFJhZGl1cyA9IE1hdGguY29zKHRoaXMuX3BoaSArIGhQaSk7XG4gICAgdGhpcy5fdXBBeGlzW2F4aXNYXSA9IHVwUmFkaXVzICogY29zVGhldGE7XG4gICAgdGhpcy5fdXBBeGlzW2F4aXNZXSA9IHVwUmFkaXVzICogc2luVGhldGE7XG4gICAgdGhpcy5fdXBBeGlzW2F4aXNaXSA9IE1hdGguc2luKHRoaXMuX3BoaSArIGhQaSk7XG5cbiAgICBjb25zdCBmb3J3YXJkUmFkaXVzID0gTWF0aC5jb3ModGhpcy5fcGhpKTtcbiAgICB0aGlzLl9mb3J3YXJkQXhpc1theGlzWF0gPSBmb3J3YXJkUmFkaXVzICogY29zVGhldGE7XG4gICAgdGhpcy5fZm9yd2FyZEF4aXNbYXhpc1ldID0gZm9yd2FyZFJhZGl1cyAqIHNpblRoZXRhO1xuICAgIHRoaXMuX2ZvcndhcmRBeGlzW2F4aXNaXSA9IE1hdGguc2luKHRoaXMuX3BoaSk7XG5cbiAgICBnbG0udmVjMy5jcm9zcyh0aGlzLl9sZWZ0QXhpcywgdGhpcy5fdXBBeGlzLCB0aGlzLl9mb3J3YXJkQXhpcyk7XG5cbiAgICBpZiAobW92ZUZvcndhcmQpIHtcbiAgICAgIGdsbS52ZWMzLmFkZCh0aGlzLl9wb3NpdGlvbiwgdGhpcy5fcG9zaXRpb24sIHNjYWxlZEZvcndhcmQpO1xuICAgIH0gZWxzZSBpZiAobW92ZUJhY2t3YXJkKSB7XG4gICAgICBnbG0udmVjMy5zdWIodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRGb3J3YXJkKTtcbiAgICB9XG5cbiAgICBpZiAoc3RyYWZlTGVmdCkge1xuICAgICAgZ2xtLnZlYzMuYWRkKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkTGVmdCk7XG4gICAgfSBlbHNlIGlmIChzdHJhZmVSaWdodCkge1xuICAgICAgZ2xtLnZlYzMuc3ViKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkTGVmdCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUmlzaW5nKSB7XG4gICAgICBnbG0udmVjMy5hZGQodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRVcCk7XG4gICAgfSBlbHNlIGlmIChpc0RpdmluZykge1xuICAgICAgZ2xtLnZlYzMuc3ViKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkVXApO1xuICAgIH1cblxuICAgIGdsbS52ZWMzLmFkZCh0aGlzLl90YXJnZXQsIHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9mb3J3YXJkQXhpcyk7XG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG4gIH1cblxuICBnZXRQb3NpdGlvbigpOiBnbG0uUmVhZG9ubHlWZWMzIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXRQb3NpdGlvbihpblBvczogZ2xtLlJlYWRvbmx5VmVjMykge1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fcG9zaXRpb24sIGluUG9zKTtcbiAgfVxuXG4gIGdldFRhcmdldCgpOiBnbG0uUmVhZG9ubHlWZWMzIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICB9XG5cbiAgZ2V0VXBBeGlzKCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl91cEF4aXM7XG4gIH1cblxuICBnZXRUaGV0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90aGV0YTtcbiAgfVxuXG4gIGdldFBoaSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9waGk7XG4gIH1cblxuICBnZXRUb3VjaE1vdmVGb3J3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b3VjaE1vdmVGb3J3YXJkO1xuICB9XG59XG4iLAogICAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vIExldCBFUFMgKGVwc2lsb24pIGJlIGEgc21hbGwgdmFsdWVcbmNvbnN0IEVQUyA9IDAuMDAwMDAwMTtcblxuLy8gRHVlIHRvIGRvdWJsZSByb3VuZGluZyBwcmVjaXNpb24gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBNYXRoLmFjb3Ncbi8vIGZ1bmN0aW9uIG1heSBiZSBvdXRzaWRlIGl0cyBkb21haW4gb2YgWy0xLCArMV0gd2hpY2ggd291bGQgcmV0dXJuXG4vLyB0aGUgdmFsdWUgTmFOIHdoaWNoIHdlIGRvIG5vdCB3YW50LlxuY29uc3QgX3NhZmVBY29zID0gKHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGlmICh4ID49ICsxLjApIHtcbiAgICByZXR1cm4gMC4wO1xuICB9XG4gIGlmICh4IDw9IC0xLjApIHtcbiAgICByZXR1cm4gTWF0aC5QSTtcbiAgfVxuICByZXR1cm4gTWF0aC5hY29zKHgpO1xufVxuXG4vLyBSb3RhdGVzIGEgcG9pbnQgYWJvdXQgYSBmaXhlZCBwb2ludCBhdCBzb21lIGFuZ2xlICdhJ1xuY29uc3QgX3JvdGF0ZVBvaW50ID0gKGZwOiBnbG0uUmVhZG9ubHlWZWMyLCBwdDogZ2xtLlJlYWRvbmx5VmVjMiwgYTogbnVtYmVyKTogZ2xtLnZlYzIgPT4ge1xuICBjb25zdCB4ID0gcHRbMF0gLSBmcFswXTtcbiAgY29uc3QgeSA9IHB0WzFdIC0gZnBbMV07XG4gIGNvbnN0IHhSb3QgPSB4ICogTWF0aC5jb3MoYSkgKyB5ICogTWF0aC5zaW4oYSk7XG4gIGNvbnN0IHlSb3QgPSB5ICogTWF0aC5jb3MoYSkgLSB4ICogTWF0aC5zaW4oYSk7XG4gIHJldHVybiBnbG0udmVjMi5mcm9tVmFsdWVzKGZwWzBdICsgeFJvdCwgZnBbMV0gKyB5Um90KTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElDaXJjbGUge1xuICBjZW50ZXI6IGdsbS5SZWFkb25seVZlYzI7XG4gIHJhZGl1czogbnVtYmVyO1xufTtcblxuLy8gR2l2ZW4gdHdvIGNpcmNsZXMgdGhpcyBtZXRob2QgZmluZHMgdGhlIGludGVyc2VjdGlvblxuLy8gcG9pbnQocykgb2YgdGhlIHR3byBjaXJjbGVzIChpZiBhbnkgZXhpc3RzKVxuLyoqXG4gKiAgICAgICAgICBfX19fX1xuICogICAgICAgICAvICAgICBcXFxuICogICAgICAgIC8gICAgICAgXFxcbiAqICAgICAgIC8gICAgICAgICBcXFxuICogICAgICB8ICAgICAgQzEgICB8XG4gKiAgICAgIHwgICAgICogICAgIHxcbiAqICAgICAgfCAgIF9fX19fICAgfFxuICogICAgICAgXFwgLyAgICAgXFwgL1xuICogcHQxIC0+IHggICAgICAgeCA8LSBwdDJcbiAqICAgICAgIC8gXFxfX19fXy8gXFxcbiAqICAgICAgfCAgICAgICAgICAgfFxuICogICAgICB8ICAgICAqICAgICB8XG4gKiAgICAgIHwgICAgICBDMiAgIHxcbiAqICAgICAgIFxcICAgICAgICAgL1xuICogICAgICAgIFxcICAgICAgIC9cbiAqICAgICAgICAgXFxfX19fXy9cbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHMgPSAoYzE6IFJlYWRvbmx5PElDaXJjbGU+LCBjMjogUmVhZG9ubHk8SUNpcmNsZT4pOiBbZ2xtLnZlYzIsIGdsbS52ZWMyXSB8IFtnbG0udmVjMl0gfCB1bmRlZmluZWQgPT4ge1xuXG4gIGxldCByMTogbnVtYmVyO1xuICBsZXQgUjI6IG51bWJlcjtcbiAgbGV0IGQ6IG51bWJlcjtcbiAgbGV0IGR4OiBudW1iZXI7XG4gIGxldCBkeTogbnVtYmVyO1xuICBsZXQgYzF4OiBudW1iZXI7XG4gIGxldCBjMXk6IG51bWJlcjtcbiAgbGV0IEMyeDogbnVtYmVyO1xuICBsZXQgQzJ5OiBudW1iZXI7XG5cbiAgaWYgKGMxLnJhZGl1cyA8IGMyLnJhZGl1cykge1xuICAgIHIxID0gYzEucmFkaXVzO1xuICAgIFIyID0gYzIucmFkaXVzO1xuICAgIGMxeCA9IGMxLmNlbnRlclswXTtcbiAgICBjMXkgPSBjMS5jZW50ZXJbMV07XG4gICAgQzJ4ID0gYzIuY2VudGVyWzBdO1xuICAgIEMyeSA9IGMyLmNlbnRlclsxXTtcbiAgfSBlbHNlIHtcbiAgICByMSA9IGMyLnJhZGl1cztcbiAgICBSMiA9IGMxLnJhZGl1cztcbiAgICBDMnggPSBjMS5jZW50ZXJbMF07XG4gICAgQzJ5ID0gYzEuY2VudGVyWzFdO1xuICAgIGMxeCA9IGMyLmNlbnRlclswXTtcbiAgICBjMXkgPSBjMi5jZW50ZXJbMV07XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSB2ZWN0b3IgPGR4LCBkeT5cbiAgZHggPSBjMXggLSBDMng7XG4gIGR5ID0gYzF5IC0gQzJ5O1xuXG4gIC8vIEZpbmQgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cy5cbiAgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgLy8gVGhlcmUgYXJlIGFuIGluZmluaXRlIG51bWJlciBvZiBzb2x1dGlvbnNcbiAgLy8gU2VlbXMgYXBwcm9wcmlhdGUgdG8gYWxzbyByZXR1cm4gbnVsbFxuICBpZiAoZCA8IEVQUyAmJiBNYXRoLmFicyhSMiAtIHIxKSA8IEVQUylcbiAgICByZXR1cm47XG5cbiAgLy8gTm8gaW50ZXJzZWN0aW9uIChjaXJjbGVzIGNlbnRlcmVkIGF0IHRoZVxuICAvLyBzYW1lIHBsYWNlIHdpdGggZGlmZmVyZW50IHNpemUpXG4gIGlmIChkIDwgRVBTKVxuICAgIHJldHVybjtcblxuICBjb25zdCB4ID0gKGR4IC8gZCkgKiBSMiArIEMyeDtcbiAgY29uc3QgeSA9IChkeSAvIGQpICogUjIgKyBDMnk7XG4gIGNvbnN0IFAgPSBnbG0udmVjMi5mcm9tVmFsdWVzKHgsIHkpO1xuXG4gIC8vIFNpbmdsZSBpbnRlcnNlY3Rpb24gKGtpc3NpbmcgY2lyY2xlcylcbiAgaWYgKE1hdGguYWJzKChSMiArIHIxKSAtIGQpIDwgRVBTIHx8IE1hdGguYWJzKFIyIC0gKHIxICsgZCkpIDwgRVBTKSB7XG4gICAgcmV0dXJuIFtQXTtcbiAgfVxuXG4gIC8vIE5vIGludGVyc2VjdGlvbi4gRWl0aGVyIHRoZSBzbWFsbCBjaXJjbGUgY29udGFpbmVkIHdpdGhpblxuICAvLyBiaWcgY2lyY2xlIG9yIGNpcmNsZXMgYXJlIHNpbXBseSBkaXNqb2ludC5cbiAgaWYgKChkICsgcjEpIDwgUjIgfHwgKFIyICsgcjEgPCBkKSlcbiAgICByZXR1cm47XG5cbiAgY29uc3QgQyA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoQzJ4LCBDMnkpO1xuICBjb25zdCBhbmdsZSA9IF9zYWZlQWNvcygocjEgKiByMSAtIGQgKiBkIC0gUjIgKiBSMikgLyAoLTIuMCAqIGQgKiBSMikpO1xuICBjb25zdCBwdDEgPSBfcm90YXRlUG9pbnQoQywgUCwgK2FuZ2xlKTtcbiAgY29uc3QgcHQyID0gX3JvdGF0ZVBvaW50KEMsIFAsIC1hbmdsZSk7XG5cbiAgcmV0dXJuIFtwdDEsIHB0Ml07XG59XG4iLAogICAgIlxuaW1wb3J0IHtJQ2lyY2xlLCBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHN9IGZyb20gXCIuL2NpcmNsZUNpcmNsZUludGVyc2VjdGlvblBvaW50c1wiXG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbnRlcmZhY2UgUXVhdEF4aXMge1xuICBheGlzOiBnbG0uUmVhZG9ubHlWZWMzO1xuICBhbmdsZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBMaW1iRGF0YVJlc3VsdEpvaW50IHtcbiAgbG9jYWxQb3M6IGdsbS52ZWMzO1xuICBwcmltYXJ5UGl0Y2g6IG51bWJlcjtcbiAgc2Vjb25kYXJ5UGl0Y2g6IG51bWJlcjtcbiAgcHJpbWFyeVF1YXRBeGlzOiBRdWF0QXhpcztcbiAgc2Vjb25kYXJ5UXVhdEF4aXM6IFF1YXRBeGlzO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTGltYkRhdGFSZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBiYXNlTWF0NDogZ2xtLm1hdDQ7XG4gIHByaW1hcnlRdWF0QXhpc2VzOiBbUXVhdEF4aXMsIFF1YXRBeGlzXTtcbiAgam9pbnRBOiBMaW1iRGF0YVJlc3VsdEpvaW50O1xuICBqb2ludEI6IExpbWJEYXRhUmVzdWx0Sm9pbnQ7XG4gIGxvY2FsVGFyZ2V0OiBnbG0udmVjMztcbn07XG5cbi8vIGNvbnN0IF9sZXJwRmxvYXQgPSAodmFsQTogbnVtYmVyLCB2YWxCOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpID0+IHZhbEEgKyAodmFsQiAtIHZhbEEpICogcmF0aW87XG4vLyBjb25zdCBfbGVycE1hdDQgPSAob3V0OiBnbG0ubWF0NCwgdmFsQTogZ2xtLlJlYWRvbmx5TWF0NCwgdmFsQjogZ2xtLlJlYWRvbmx5TWF0NCwgcmF0aW86IG51bWJlcikgPT4ge1xuLy8gICByZXR1cm4gZ2xtLm1hdDQuYWRkKG91dCwgdmFsQSwgZ2xtLm1hdDQubXVsdGlwbHlTY2FsYXIob3V0LCBnbG0ubWF0NC5zdWIob3V0LCB2YWxCLCB2YWxBKSwgcmF0aW8pKTtcbi8vIH1cblxuLy8gZXhwb3J0IGNvbnN0IGludGVycG9sYXRlTGltYkRhdGFSZXN1bHQgPSAob3V0UmVzOiBJTGltYkRhdGFSZXN1bHQsIHJlc0E6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIHJlc0I6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIHJhdGlvOiBudW1iZXIpOiB2b2lkID0+IHtcblxuLy8gICBvdXRSZXMuYmFzZU1hdDQgPSAgX2xlcnBNYXQ0KG91dFJlcy5iYXNlTWF0NCwgcmVzQS5iYXNlTWF0NCwgcmVzQi5iYXNlTWF0NCwgcmF0aW8pO1xuLy8gICBvdXRSZXMubG9jYWxUYXJnZXQgPSBnbG0udmVjMy5sZXJwKG91dFJlcy5sb2NhbFRhcmdldCwgcmVzQS5sb2NhbFRhcmdldCwgcmVzQi5sb2NhbFRhcmdldCwgcmF0aW8pO1xuXG4vLyAgIG91dFJlcy5qb2ludEEubG9jYWxQb3MgPSBnbG0udmVjMy5sZXJwKG91dFJlcy5sb2NhbFRhcmdldCwgcmVzQS5qb2ludEEubG9jYWxQb3MsIHJlc0Iuam9pbnRBLmxvY2FsUG9zLCByYXRpbyk7XG4vLyAgIG91dFJlcy5qb2ludEEucHJpbWFyeVBpdGNoID0gX2xlcnBGbG9hdChyZXNBLmpvaW50QS5wcmltYXJ5UGl0Y2gsIHJlc0Iuam9pbnRBLnByaW1hcnlQaXRjaCwgcmF0aW8pO1xuLy8gICBvdXRSZXMuam9pbnRBLnNlY29uZGFyeVBpdGNoID0gX2xlcnBGbG9hdChyZXNBLmpvaW50QS5zZWNvbmRhcnlQaXRjaCwgcmVzQi5qb2ludEEuc2Vjb25kYXJ5UGl0Y2gsIHJhdGlvKTtcblxuLy8gICBvdXRSZXMuam9pbnRCLmxvY2FsUG9zID0gZ2xtLnZlYzMubGVycChvdXRSZXMubG9jYWxUYXJnZXQsIHJlc0Euam9pbnRCLmxvY2FsUG9zLCByZXNCLmpvaW50Qi5sb2NhbFBvcywgcmF0aW8pO1xuLy8gICBvdXRSZXMuam9pbnRCLnByaW1hcnlQaXRjaCA9IF9sZXJwRmxvYXQocmVzQS5qb2ludEIucHJpbWFyeVBpdGNoLCByZXNCLmpvaW50Qi5wcmltYXJ5UGl0Y2gsIHJhdGlvKTtcbi8vICAgb3V0UmVzLmpvaW50Qi5zZWNvbmRhcnlQaXRjaCA9IF9sZXJwRmxvYXQocmVzQS5qb2ludEIuc2Vjb25kYXJ5UGl0Y2gsIHJlc0Iuam9pbnRCLnNlY29uZGFyeVBpdGNoLCByYXRpbyk7XG5cbi8vIH07XG5cbmV4cG9ydCBjbGFzcyBMaW1iRGF0YSB7XG5cbiAgcHVibGljIHJvb3RNYXQ0OiBnbG0ubWF0NDtcbiAgcHVibGljIHByaW1hcnlMZW5ndGg6IG51bWJlcjtcbiAgcHVibGljIHNlY29uZGFyeUxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJvb3RNYXQ0OiBnbG0ubWF0NCxcbiAgICBwcmltYXJ5TGVuZ3RoOiBudW1iZXIsXG4gICAgc2Vjb25kYXJ5TGVuZ3RoOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMucm9vdE1hdDQgPSByb290TWF0NDtcbiAgICB0aGlzLnByaW1hcnlMZW5ndGggPSBwcmltYXJ5TGVuZ3RoO1xuICAgIHRoaXMuc2Vjb25kYXJ5TGVuZ3RoID0gc2Vjb25kYXJ5TGVuZ3RoO1xuICB9XG5cbiAgLy8gcGVyZmVjdCBmb3IgbGVnc1xuICBjb21wdXRlSWtfZml4ZWRZYXcoXG4gICAgaW5Xb3JsZFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbldvcmxkRm9yd2FyZDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgKTogSUxpbWJEYXRhUmVzdWx0IHwgdW5kZWZpbmVkIHtcblxuICAgIGNvbnN0IGludlJvb3RNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0ID0gZ2xtLm1hdDQuaW52ZXJ0KGdsbS5tYXQ0LmNyZWF0ZSgpLCB0aGlzLnJvb3RNYXQ0KTtcbiAgICBjb25zdCByYXdMb2NhbFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRUYXJnZXQsIGludlJvb3RNYXQ0KTtcblxuICAgIGNvbnN0IHJhd0xvY2FsRm9yd2FyZDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRGb3J3YXJkLCBpbnZSb290TWF0NCk7XG5cbiAgICBjb25zdCBwcmltYXJ5WWF3ID0gTWF0aC5hdGFuMihyYXdMb2NhbEZvcndhcmRbMV0sIHJhd0xvY2FsRm9yd2FyZFswXSk7XG5cbiAgICBjb25zdCB0bXBZYXdBbGlnbmVkTWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcbiAgICBnbG0ubWF0NC5yb3RhdGUodG1wWWF3QWxpZ25lZE1hdDQsIHRtcFlhd0FsaWduZWRNYXQ0LCBwcmltYXJ5WWF3LCBbMCwwLDFdKTtcbiAgICBjb25zdCB0bXBSb2xsVGFyZ2V0OiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMudHJhbnNmb3JtTWF0NChnbG0udmVjMy5jcmVhdGUoKSwgcmF3TG9jYWxUYXJnZXQsIGdsbS5tYXQ0LmludmVydCh0bXBZYXdBbGlnbmVkTWF0NCwgdG1wWWF3QWxpZ25lZE1hdDQpKTtcblxuICAgIGNvbnN0IHByaW1hcnlSb2xsID0gTWF0aC5hdGFuMih0bXBSb2xsVGFyZ2V0WzFdLCAtdG1wUm9sbFRhcmdldFsyXSk7XG5cbiAgICBjb25zdCBiYXNlTWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcbiAgICBnbG0ubWF0NC5yb3RhdGUoYmFzZU1hdDQsIGJhc2VNYXQ0LCBwcmltYXJ5WWF3LCBbMCwwLDFdKTtcbiAgICBnbG0ubWF0NC5yb3RhdGUoYmFzZU1hdDQsIGJhc2VNYXQ0LCBwcmltYXJ5Um9sbCwgWzEsMCwwXSk7XG5cbiAgICBjb25zdCBsb2NhbFRhcmdldCA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIHJhd0xvY2FsVGFyZ2V0LCBnbG0ubWF0NC5pbnZlcnQoZ2xtLm1hdDQuY3JlYXRlKCksIGJhc2VNYXQ0KSk7XG5cbiAgICByZXR1cm4gdGhpcy5fY29tcHV0ZUlrX2pvaW50cyhiYXNlTWF0NCwgbG9jYWxUYXJnZXQsIFtcbiAgICAgIHtheGlzOiBbMCwwLDFdLCBhbmdsZTogcHJpbWFyeVlhd30sXG4gICAgICB7YXhpczogWzEsMCwwXSwgYW5nbGU6IHByaW1hcnlSb2xsfSxcbiAgICBdKTtcbiAgfVxuXG4gIGNvbXB1dGVJa19maXhlZFJvbGwoXG4gICAgaW5Xb3JsZFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbldvcmxkUm9sbDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgKTogSUxpbWJEYXRhUmVzdWx0IHwgdW5kZWZpbmVkIHtcblxuICAgIGNvbnN0IGludlJvb3RNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0ID0gZ2xtLm1hdDQuaW52ZXJ0KGdsbS5tYXQ0LmNyZWF0ZSgpLCB0aGlzLnJvb3RNYXQ0KTtcbiAgICBjb25zdCByYXdMb2NhbFRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRUYXJnZXQsIGludlJvb3RNYXQ0KTtcblxuICAgIGNvbnN0IHJhd0xvY2FsUm9sbDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDMoZ2xtLnZlYzMuY3JlYXRlKCksIGluV29ybGRSb2xsLCBnbG0ubWF0My5mcm9tTWF0NChnbG0ubWF0My5jcmVhdGUoKSwgaW52Um9vdE1hdDQpKTtcblxuICAgIGNvbnN0IHByaW1hcnlSb2xsID0gTWF0aC5hdGFuMihyYXdMb2NhbFJvbGxbMV0sIHJhd0xvY2FsUm9sbFswXSk7XG5cbiAgICBjb25zdCB0bXBSb2xsQWxpZ25lZE1hdDQgPSBnbG0ubWF0NC5pZGVudGl0eShnbG0ubWF0NC5jcmVhdGUoKSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHRtcFJvbGxBbGlnbmVkTWF0NCwgdG1wUm9sbEFsaWduZWRNYXQ0LCBwcmltYXJ5Um9sbCwgWzEsMCwwXSk7XG4gICAgY29uc3QgdG1wVGhldGFUYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KGdsbS52ZWMzLmNyZWF0ZSgpLCByYXdMb2NhbFRhcmdldCwgZ2xtLm1hdDQuaW52ZXJ0KHRtcFJvbGxBbGlnbmVkTWF0NCwgdG1wUm9sbEFsaWduZWRNYXQ0KSk7XG5cbiAgICBjb25zdCBwcmltYXJ5WWF3ID0gTWF0aC5hdGFuMih0bXBUaGV0YVRhcmdldFsxXSwgdG1wVGhldGFUYXJnZXRbMF0pO1xuXG4gICAgY29uc3QgYmFzZU1hdDQgPSBnbG0ubWF0NC5pZGVudGl0eShnbG0ubWF0NC5jcmVhdGUoKSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKGJhc2VNYXQ0LCBiYXNlTWF0NCwgcHJpbWFyeVJvbGwsIFsxLDAsMF0pO1xuICAgIGdsbS5tYXQ0LnJvdGF0ZShiYXNlTWF0NCwgYmFzZU1hdDQsIHByaW1hcnlZYXcsIFswLDAsMV0pO1xuXG4gICAgY29uc3QgbG9jYWxUYXJnZXQgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KGdsbS52ZWMzLmNyZWF0ZSgpLCByYXdMb2NhbFRhcmdldCwgZ2xtLm1hdDQuaW52ZXJ0KGdsbS5tYXQ0LmNyZWF0ZSgpLCBiYXNlTWF0NCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVJa19qb2ludHMoYmFzZU1hdDQsIGxvY2FsVGFyZ2V0LCBbXG4gICAgICB7YXhpczogWzEsMCwwXSwgYW5nbGU6IHByaW1hcnlSb2xsfSxcbiAgICAgIHtheGlzOiBbMCwwLDFdLCBhbmdsZTogcHJpbWFyeVlhd30sXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb21wdXRlSWtfam9pbnRzKFxuICAgIGJhc2VNYXQ0OiBnbG0ubWF0NCxcbiAgICBsb2NhbFRhcmdldDogZ2xtLnZlYzMsXG4gICAgcHJpbWFyeVF1YXRBeGlzZXM6IFtRdWF0QXhpcywgUXVhdEF4aXNdLFxuICApOiBJTGltYkRhdGFSZXN1bHQge1xuXG4gICAgY29uc3QgcmVzdWx0OiBJTGltYkRhdGFSZXN1bHQgPSB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGJhc2VNYXQ0LFxuICAgICAgcHJpbWFyeVF1YXRBeGlzZXMsXG4gICAgICBqb2ludEE6IHtcbiAgICAgICAgbG9jYWxQb3M6IGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgICBwcmltYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHNlY29uZGFyeVBpdGNoOiAwLFxuICAgICAgICBwcmltYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgICAgc2Vjb25kYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgIH0sXG4gICAgICBqb2ludEI6IHtcbiAgICAgICAgbG9jYWxQb3M6IGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgICBwcmltYXJ5UGl0Y2g6IDAsXG4gICAgICAgIHNlY29uZGFyeVBpdGNoOiAwLFxuICAgICAgICBwcmltYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgICAgc2Vjb25kYXJ5UXVhdEF4aXM6IHsgYXhpczogWzAsMSwwXSwgYW5nbGU6IDAgfSxcbiAgICAgIH0sXG4gICAgICBsb2NhbFRhcmdldCxcbiAgICB9O1xuXG4gICAgY29uc3QgY2lyY2xlQTogSUNpcmNsZSA9IHsgY2VudGVyOiBbMCwwXSwgcmFkaXVzOiB0aGlzLnByaW1hcnlMZW5ndGggfTtcbiAgICBjb25zdCBjaXJjbGVCOiBJQ2lyY2xlID0geyBjZW50ZXI6IFtyZXN1bHQubG9jYWxUYXJnZXRbMF0sIHJlc3VsdC5sb2NhbFRhcmdldFsyXV0sIHJhZGl1czogdGhpcy5zZWNvbmRhcnlMZW5ndGggfTtcbiAgICBjb25zdCBzdWJSZXN1bHQgPSBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHMoY2lyY2xlQSwgY2lyY2xlQik7XG4gICAgaWYgKCFzdWJSZXN1bHQpIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vXG5cbiAgICByZXN1bHQuam9pbnRBLmxvY2FsUG9zWzBdID0gc3ViUmVzdWx0WzBdWzBdO1xuICAgIHJlc3VsdC5qb2ludEEubG9jYWxQb3NbMV0gPSAwO1xuICAgIHJlc3VsdC5qb2ludEEubG9jYWxQb3NbMl0gPSBzdWJSZXN1bHRbMF1bMV07XG4gICAgcmVzdWx0LmpvaW50QS5wcmltYXJ5UGl0Y2ggPSBNYXRoLmF0YW4yKC1yZXN1bHQuam9pbnRBLmxvY2FsUG9zWzJdLCByZXN1bHQuam9pbnRBLmxvY2FsUG9zWzBdKTtcbiAgICByZXN1bHQuam9pbnRBLnByaW1hcnlRdWF0QXhpcy5hbmdsZSA9IHJlc3VsdC5qb2ludEEucHJpbWFyeVBpdGNoO1xuXG4gICAgY29uc3QgZGlmZlNlY29uZGFyeUE6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy5zdWIoZ2xtLnZlYzMuY3JlYXRlKCksIHJlc3VsdC5sb2NhbFRhcmdldCwgcmVzdWx0LmpvaW50QS5sb2NhbFBvcyk7XG4gICAgcmVzdWx0LmpvaW50QS5zZWNvbmRhcnlQaXRjaCA9IE1hdGguYXRhbjIoZGlmZlNlY29uZGFyeUFbMl0sIGRpZmZTZWNvbmRhcnlBWzBdKTtcbiAgICByZXN1bHQuam9pbnRBLnNlY29uZGFyeVF1YXRBeGlzLmFuZ2xlID0gLXJlc3VsdC5qb2ludEEuc2Vjb25kYXJ5UGl0Y2ggLSByZXN1bHQuam9pbnRBLnByaW1hcnlQaXRjaDtcblxuICAgIC8vXG5cbiAgICBjb25zdCB0bXBSZXN1bHQ6IGdsbS5SZWFkb25seVZlYzIgPSBzdWJSZXN1bHRbMV0gfHwgc3ViUmVzdWx0WzBdO1xuXG4gICAgcmVzdWx0LmpvaW50Qi5sb2NhbFBvc1swXSA9IHRtcFJlc3VsdFswXTtcbiAgICByZXN1bHQuam9pbnRCLmxvY2FsUG9zWzFdID0gMDtcbiAgICByZXN1bHQuam9pbnRCLmxvY2FsUG9zWzJdID0gdG1wUmVzdWx0WzFdO1xuICAgIHJlc3VsdC5qb2ludEIucHJpbWFyeVBpdGNoID0gTWF0aC5hdGFuMigtcmVzdWx0LmpvaW50Qi5sb2NhbFBvc1syXSwgcmVzdWx0LmpvaW50Qi5sb2NhbFBvc1swXSk7XG4gICAgcmVzdWx0LmpvaW50Qi5wcmltYXJ5UXVhdEF4aXMuYW5nbGUgPSByZXN1bHQuam9pbnRCLnByaW1hcnlQaXRjaDtcblxuICAgIGNvbnN0IGRpZmZTZWNvbmRhcnlCOiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMuc3ViKGdsbS52ZWMzLmNyZWF0ZSgpLCByZXN1bHQubG9jYWxUYXJnZXQsIHJlc3VsdC5qb2ludEIubG9jYWxQb3MpO1xuICAgIHJlc3VsdC5qb2ludEIuc2Vjb25kYXJ5UGl0Y2ggPSBNYXRoLmF0YW4yKGRpZmZTZWNvbmRhcnlCWzJdLCBkaWZmU2Vjb25kYXJ5QlswXSk7XG4gICAgcmVzdWx0LmpvaW50Qi5zZWNvbmRhcnlRdWF0QXhpcy5hbmdsZSA9IC1yZXN1bHQuam9pbnRCLnNlY29uZGFyeVBpdGNoIC0gcmVzdWx0LmpvaW50Qi5wcmltYXJ5UGl0Y2g7XG5cbiAgICAvL1xuXG4gICAgcmVzdWx0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBleHRyYWN0QmFzZVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIG91dE1hdDQ6IGdsbS5tYXQ0KTogdm9pZCB7XG4gICAgZ2xtLm1hdDQubXVsdGlwbHkob3V0TWF0NCwgdGhpcy5yb290TWF0NCwgcmVzdWx0LmJhc2VNYXQ0KTtcbiAgfVxuICBleHRyYWN0UHJpbWFyeVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIGpvaW50OiBSZWFkb25seTxMaW1iRGF0YVJlc3VsdEpvaW50Piwgb3V0TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RCYXNlVHJhbnNmb3JtKHJlc3VsdCwgb3V0TWF0NCk7XG4gICAgZ2xtLm1hdDQucm90YXRlKG91dE1hdDQsIG91dE1hdDQsIGpvaW50LnByaW1hcnlQaXRjaCwgWzAsMSwwXSk7XG4gIH1cbiAgZXh0cmFjdFNlY29uZGFyeVRyYW5zZm9ybShyZXN1bHQ6IFJlYWRvbmx5PElMaW1iRGF0YVJlc3VsdD4sIGpvaW50OiBSZWFkb25seTxMaW1iRGF0YVJlc3VsdEpvaW50Piwgb3V0TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RQcmltYXJ5VHJhbnNmb3JtKHJlc3VsdCwgam9pbnQsIG91dE1hdDQpO1xuICAgIGdsbS5tYXQ0LnRyYW5zbGF0ZShvdXRNYXQ0LCBvdXRNYXQ0LCBbdGhpcy5wcmltYXJ5TGVuZ3RoLDAsMF0pO1xuICAgIGdsbS5tYXQ0LnJvdGF0ZShvdXRNYXQ0LCBvdXRNYXQ0LCAtam9pbnQuc2Vjb25kYXJ5UGl0Y2ggLSBqb2ludC5wcmltYXJ5UGl0Y2gsIFswLDEsMF0pO1xuICB9XG4gIGV4dHJhY3RUcmFuc2Zvcm1zKHJlc3VsdDogUmVhZG9ubHk8SUxpbWJEYXRhUmVzdWx0Piwgam9pbnQ6IFJlYWRvbmx5PExpbWJEYXRhUmVzdWx0Sm9pbnQ+LCBiYXNlTWF0NDogZ2xtLm1hdDQsIHByaW1hcnlNYXQ0OiBnbG0ubWF0NCwgc2Vjb25kYXJ5TWF0NDogZ2xtLm1hdDQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dHJhY3RCYXNlVHJhbnNmb3JtKHJlc3VsdCwgYmFzZU1hdDQpO1xuICAgIHByaW1hcnlNYXQ0ID0gZ2xtLm1hdDQucm90YXRlKHByaW1hcnlNYXQ0LCBiYXNlTWF0NCwgam9pbnQucHJpbWFyeVBpdGNoLCBbMCwxLDBdKTtcbiAgICBnbG0ubWF0NC50cmFuc2xhdGUoc2Vjb25kYXJ5TWF0NCwgcHJpbWFyeU1hdDQsIFt0aGlzLnByaW1hcnlMZW5ndGgsMCwwXSk7XG4gICAgZ2xtLm1hdDQucm90YXRlKHNlY29uZGFyeU1hdDQsIHNlY29uZGFyeU1hdDQsIC1qb2ludC5zZWNvbmRhcnlQaXRjaCAtIGpvaW50LnByaW1hcnlQaXRjaCwgWzAsMSwwXSk7XG4gIH1cblxufTtcblxuIiwKICAgICJcbmV4cG9ydCBjb25zdCBjbGFtcCA9ICh2YWw6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWwsIG1pblZhbCksIG1heFZhbCk7XG59O1xuIiwKICAgICJcblxuZXhwb3J0IGNvbnN0IGVhc2VDbGFtcCA9ICh0OiBudW1iZXIpID0+IHtcbiAgaWYgKHQgPiAxLjApIHtcbiAgICByZXR1cm4gdCAtIE1hdGguZmxvb3IodCk7XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBjb25zdCBlYXNlUGluUG9uZyA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICB0ICo9IDIuMDtcbiAgaWYgKHQgPCAxLjApIHtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0IC09IDEuMDtcbiAgcmV0dXJuIDEuMCAtIHQ7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuLy9cbi8vXG4vL1xuXG5jb25zdCBlYXNlSW5TaW5lID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBNYXRoLnNpbigxLjU3MDc5NjMgKiB0KTsgfVxuXG5jb25zdCBlYXNlT3V0U2luZSA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gMS4wICsgTWF0aC5zaW4oMS41NzA3OTYzICogKHQgLSAxLjApKTsgfVxuXG5jb25zdCBlYXNlSW5PdXRTaW5lID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiAwLjUgKiAoMS4wICsgTWF0aC5zaW4oMy4xNDE1OTI2ICogKHQgLSAwLjUpKSk7IH1cblxuLy9cbi8vXG4vL1xuXG5jb25zdCBlYXNlSW5RdWFkID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0ICogdDsgfVxuXG5jb25zdCBlYXNlT3V0UXVhZCA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdCAqICgyLjAgLSB0KTsgfVxuXG5jb25zdCBlYXNlSW5PdXRRdWFkID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0IDwgMC41ID8gMi4wICogdCAqIHQgOiB0ICogKDQuMCAtIDIuMCAqIHQpIC0gMS4wOyB9XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgZWFzZUluQ3ViaWMgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHQgKiB0ICogdDsgfVxuXG5jb25zdCBlYXNlT3V0Q3ViaWMgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgdDIgPSB0IC0gMTtcbiAgcmV0dXJuIDEuMCArIHQyICogdDIgKiB0Mjtcbn1cblxuY29uc3QgZWFzZUluT3V0Q3ViaWMgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgdDIgPSB0IC0gMS4wO1xuICBjb25zdCB0MyA9IHQyIC0gMS4wO1xuICByZXR1cm4gdCA8IDAuNSA/IDQuMCAqIHQgKiB0ICogdCA6IDEuMCArIHQyICogKDIuMCAqIHQzKSAqICgyLjAgKiB0Myk7XG59XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgZWFzZUluUXVhcnQgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgdCAqPSB0O1xuICByZXR1cm4gdCAqIHQ7XG59XG5cbi8vIGNvbnN0IGVhc2VPdXRRdWFydCA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuLy8gICB0OiBudW1iZXIyOiBudW1iZXIgPT4gPSB0IC0gMS4wZjtcbi8vICAgdCA9IHQyICogdDI7XG4vLyAgIHJldHVybiAxLjBmIC0gdCAqIHQ7XG4vLyB9XG5cbi8vIGNvbnN0IGVhc2VJbk91dFF1YXJ0ID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4vLyAgIGlmICh0IDwgMC41Zikge1xuLy8gICAgIHQgKj0gdDtcbi8vICAgICByZXR1cm4gOC4wZiAqIHQgKiB0O1xuLy8gICB9XG4vLyAgIHQ6IG51bWJlcjI6IG51bWJlciA9PiA9IHQgLSAxO1xuLy8gICB0ID0gdDIgKiB0Mjtcbi8vICAgcmV0dXJuIDEuMGYgLSA4LjBmICogdCAqIHQ7XG4vLyB9XG5cbi8vXG4vL1xuLy9cblxuLy8gY29uc3QgZWFzZUluUXVpbnQgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbi8vICAgdDogbnVtYmVyMjogbnVtYmVyID0+ID0gdCAqIHQ7XG4vLyAgIHJldHVybiB0ICogdDIgKiB0Mjtcbi8vIH1cblxuLy8gY29uc3QgZWFzZU91dFF1aW50ID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4vLyAgIHQ6IG51bWJlcng6IG51bWJlciA9PiA9IHQgLSAxO1xuLy8gICB0OiBudW1iZXIyOiBudW1iZXIgPT4gPSB0eCAqIHR4O1xuLy8gICByZXR1cm4gMS4wZiArIHR4ICogdDIgKiB0Mjtcbi8vIH1cblxuLy8gY29uc3QgZWFzZUluT3V0UXVpbnQgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbi8vICAgdDogbnVtYmVyMjogbnVtYmVyID0+O1xuLy8gICBpZiAodCA8IDAuNWYpIHtcbi8vICAgICB0MiA9IHQgKiB0O1xuLy8gICAgIHJldHVybiAxNi4wZiAqIHQgKiB0MiAqIHQyO1xuLy8gICB9XG5cbi8vICAgdDogbnVtYmVyeDogbnVtYmVyID0+ID0gdCAtIDEuMGY7XG4vLyAgIHQyID0gdHggKiB0eDtcbi8vICAgcmV0dXJuIDEuMGYgKyAxNi4wZiAqIHR4ICogdDIgKiB0Mjtcbi8vIH1cblxuLy9cbi8vXG4vL1xuXG4vLyBjb25zdCBlYXNlSW5FeHBvID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiAoc3RkOjpwb3coMi4wZiwgOC4wZiAqIHQpIC0gMSkgLyAyNTUuMGY7IH1cblxuLy8gY29uc3QgZWFzZU91dEV4cG8gPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIDEuMGYgLSBzdGQ6OnBvdygyLjBmLCAtOC4wZiAqIHQpOyB9XG5cbi8vIGNvbnN0IGVhc2VJbk91dEV4cG8gPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbi8vICAgaWYgKHQgPCAwLjVmKVxuLy8gICAgIHJldHVybiAoc3RkOjpwb3coMi4wZiwgMTYuMGYgKiB0KSAtIDEpIC8gNTEwLjBmO1xuLy8gICByZXR1cm4gMS4wZiAtIDAuNWYgKiBzdGQ6OnBvdygyLjBmLCAtMTYuMGYgKiAodCAtIDAuNWYpKTtcbi8vIH1cblxuLy9cbi8vXG4vL1xuXG4vLyBjb25zdCBlYXNlSW5DaXJjID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiAxLjBmIC0gc3RkOjpzcXJ0KDEuMGYgLSB0KTsgfVxuXG4vLyBjb25zdCBlYXNlT3V0Q2lyYyA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gc3RkOjpzcXJ0KHQpOyB9XG5cbi8vIGNvbnN0IGVhc2VJbk91dENpcmMgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbi8vICAgaWYgKHQgPCAwLjVmKVxuLy8gICAgIHJldHVybiAoMS4wZiAtIHN0ZDo6c3FydCgxLjBmIC0gMi4wZiAqIHQpKSAqIDAuNWY7XG4vLyAgIHJldHVybiAoMS4wZiArIHN0ZDo6c3FydCgyLjBmICogdCAtIDEuMGYpKSAqIDAuNWY7XG4vLyB9XG5cbi8vXG4vL1xuLy9cblxuLy8gY29uc3QgZWFzZUluQmFjayA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdCAqIHQgKiAoMi43MDE1OGYgKiB0IC0gMS43MDE1OGYpOyB9XG5cbi8vIGNvbnN0IGVhc2VPdXRCYWNrID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4vLyAgIHQ6IG51bWJlcng6IG51bWJlciA9PiA9IHQgLSAxO1xuLy8gICByZXR1cm4gMS4wZiArIHR4ICogdHggKiAoMi43MDE1OGYgKiB0eCArIDEuNzAxNThmKTtcbi8vIH1cblxuLy8gY29uc3QgZWFzZUluT3V0QmFjayA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuLy8gICBpZiAodCA8IDAuNWYpXG4vLyAgICAgcmV0dXJuIHQgKiB0ICogKDcuMGYgKiB0IC0gMi41ZikgKiAyLjBmO1xuLy8gICB0OiBudW1iZXJ4OiBudW1iZXIgPT4gPSB0IC0gMS4wZjtcbi8vICAgcmV0dXJuIDEuMGYgKyB0eCAqIHR4ICogMi4wZiAqICg3LjBmICogdHggKyAyLjVmKTtcbi8vIH1cblxuLy9cbi8vXG4vL1xuXG5leHBvcnQgY29uc3QgZWFzZUluRWxhc3RpYyA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCB0MiA9IHQgKiB0O1xuICByZXR1cm4gdDIgKiB0MiAqIE1hdGguc2luKHQgKiBNYXRoLlBJICogNC41KTtcbn1cblxuZXhwb3J0IGNvbnN0IGVhc2VPdXRFbGFzdGljID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGNvbnN0IHQyID0gKHQgLSAxLjApICogKHQgLSAxLjApO1xuICByZXR1cm4gMS4wIC0gdDIgKiB0MiAqIE1hdGguY29zKHQgKiBNYXRoLlBJICogNC41KTtcbn1cblxuZXhwb3J0IGNvbnN0IGVhc2VJbk91dEVsYXN0aWMgPSAodDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKHQgPCAwLjQ1KSB7XG4gICAgY29uc3QgdDIgPSB0ICogdDtcbiAgICByZXR1cm4gOC4wICogdDIgKiB0MiAqIE1hdGguc2luKHQgKiBNYXRoLlBJICogOS4wKTtcbiAgfVxuICBpZiAodCA8IDAuNTUpIHtcbiAgICByZXR1cm4gMC41ICsgMC43NSAqIE1hdGguc2luKHQgKiBNYXRoLlBJICogNC4wKTtcbiAgfVxuXG4gIGNvbnN0IHQyID0gKHQgLSAxLjApICogKHQgLSAxLjApO1xuICByZXR1cm4gMS4wIC0gOC4wICogdDIgKiB0MiAqIE1hdGguc2luKHQgKiBNYXRoLlBJICogOS4wKTtcbn1cblxuLy9cbi8vXG4vL1xuXG5leHBvcnQgY29uc3QgZWFzZUluQm91bmNlID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBNYXRoLnBvdygyLjAsIDYuMCAqICh0IC0gMS4wKSkgKiBNYXRoLmFicyhNYXRoLnNpbih0ICogTWF0aC5QSSAqIDMuNSkpOyB9XG5cbmV4cG9ydCBjb25zdCBlYXNlT3V0Qm91bmNlID0gKHQ6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiAxLjAgLSBNYXRoLnBvdygyLjAsIC02LjAgKiB0KSAqIE1hdGguYWJzKE1hdGguY29zKHQgKiBNYXRoLlBJICogMy41KSk7IH1cblxuZXhwb3J0IGNvbnN0IGVhc2VJbk91dEJvdW5jZSA9ICh0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZiAodCA8IDAuNSkge1xuICAgIHJldHVybiA4LjAgKiBNYXRoLnBvdygyLjAsIDguMCAqICh0IC0gMS4wKSkgKiBNYXRoLmFicyhNYXRoLnNpbih0ICogTWF0aC5QSSAqIDcuMCkpO1xuICB9XG4gIHJldHVybiAxLjAgLSA4LjAgKiBNYXRoLnBvdygyLjAsIC04LjAgKiB0KSAqIE1hdGguYWJzKE1hdGguc2luKHQgKiBNYXRoLlBJICogNy4wKSk7XG59XG4iLAogICAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBjb25zdCBsZXJwRmxvYXQgPSAodmFsQTogbnVtYmVyLCB2YWxCOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpID0+IHZhbEEgKyAodmFsQiAtIHZhbEEpICogcmF0aW87XG5leHBvcnQgY29uc3QgbGVycFZlYzIgPSAob3V0OiBnbG0udmVjMiwgdmFsQTogZ2xtLlJlYWRvbmx5VmVjMiwgdmFsQjogZ2xtLlJlYWRvbmx5VmVjMiwgcmF0aW86IG51bWJlcikgPT4ge1xuICByZXR1cm4gZ2xtLnZlYzIubGVycChvdXQsIHZhbEEsIHZhbEIsIHJhdGlvKTtcbn07XG5leHBvcnQgY29uc3QgbGVycFZlYzMgPSAob3V0OiBnbG0udmVjMywgdmFsQTogZ2xtLlJlYWRvbmx5VmVjMywgdmFsQjogZ2xtLlJlYWRvbmx5VmVjMywgcmF0aW86IG51bWJlcikgPT4ge1xuICByZXR1cm4gZ2xtLnZlYzMubGVycChvdXQsIHZhbEEsIHZhbEIsIHJhdGlvKTtcbn07XG5leHBvcnQgY29uc3QgbGVycFF1YXQgPSAob3V0OiBnbG0ucXVhdCwgdmFsQTogZ2xtLlJlYWRvbmx5UXVhdCwgdmFsQjogZ2xtLlJlYWRvbmx5UXVhdCwgcmF0aW86IG51bWJlcikgPT4ge1xuICByZXR1cm4gZ2xtLnF1YXQuc2xlcnAob3V0LCB2YWxBLCB2YWxCLCByYXRpbyk7XG59O1xuXG4iLAogICAgIlxuaW50ZXJmYWNlIElFYXNpbmdTdGVwPFQ+IHtcbiAgY29lZlN0ZXA6IG51bWJlcjtcbiAgdmFsdWU6IFQ7XG4gIGVhc2luZz86IChyYXRpbzogbnVtYmVyKSA9PiBudW1iZXI7XG59O1xuXG50eXBlIFR5cGVMZXJwPFQ+ID0gKGE6IFJlYWRvbmx5PFQ+LCBiOiBSZWFkb25seTxUPiwgcjogbnVtYmVyKSA9PiBUO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJpY0Vhc2luZzxUPiB7XG4gIHByaXZhdGUgX3N0ZXBzOiBJRWFzaW5nU3RlcDxUPltdID0gW107XG4gIHByaXZhdGUgX2xlcnA6IFR5cGVMZXJwPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGxlcnA6IFR5cGVMZXJwPFQ+KSB7XG4gICAgdGhpcy5fbGVycCA9IGxlcnA7XG4gIH1cblxuICByZXNldCgpIHsgdGhpcy5fc3RlcHMubGVuZ3RoID0gMDsgfVxuXG4gIHB1c2goY29lZlN0ZXA6IG51bWJlciwgdmFsdWU6IFJlYWRvbmx5PFQ+LCBlYXNpbmc/OiAodDogbnVtYmVyKSA9PiBudW1iZXIpOiB0aGlzIHtcbiAgICAvLyBpZiAoX3NpemUgPT0gX01heFNpemUpXG4gICAgLy8gICBEX1RIUk9XKHN0ZDo6cnVudGltZV9lcnJvciwgXCJtYXggc3RlcHMgcmVhY2hlZCwgbWF4OiBcIiA8PCBfTWF4U2l6ZSk7XG4gICAgaWYgKHRoaXMuX3N0ZXBzLmxlbmd0aCAhPSAwICYmIGNvZWZTdGVwIDw9IHRoaXMuX3N0ZXBzW3RoaXMuX3N0ZXBzLmxlbmd0aCAtIDFdLmNvZWZTdGVwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29lZiBzdGVwIHdpbGwgYmUgbWlzc2VkXCIpO1xuICAgIGlmIChjb2VmU3RlcCA8IDAuMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZWYgY2Fubm90IGJlIDwgMFwiKTtcbiAgICBpZiAoY29lZlN0ZXAgPiAxLjApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2VmIGNhbm5vdCBiZSA+IDFcIik7XG5cbiAgICB0aGlzLl9zdGVwcy5wdXNoKHsgY29lZlN0ZXAsIHZhbHVlLCBlYXNpbmcgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIGdldChjb2VmOiBudW1iZXIpOiBUIHtcbiAgICBpZiAodGhpcy5fc3RlcHMubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGVub3VnaCBjb2VmIHN0ZXBzXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5fc3RlcHNbMF07XG4gICAgaWYgKGNvZWYgPCBmaXJzdC5jb2VmU3RlcCkge1xuICAgICAgcmV0dXJuIGZpcnN0LnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSB0aGlzLl9zdGVwc1t0aGlzLl9zdGVwcy5sZW5ndGggLSAxXTtcbiAgICBpZiAoY29lZiA+PSBsYXN0LmNvZWZTdGVwKSB7XG4gICAgICByZXR1cm4gbGFzdC52YWx1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4ICsgMSA8IHRoaXMuX3N0ZXBzLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgY29uc3QgY3VyclN0ZXAgPSB0aGlzLl9zdGVwc1tpbmRleF07XG4gICAgICBjb25zdCBuZXh0U3RlcCA9IHRoaXMuX3N0ZXBzW2luZGV4ICsgMV07XG5cbiAgICAgIGlmIChjb2VmID49IGN1cnJTdGVwLmNvZWZTdGVwICYmIGNvZWYgPCBuZXh0U3RlcC5jb2VmU3RlcCkge1xuICAgICAgICBsZXQgc3ViQ29lZiA9IChjb2VmIC0gY3VyclN0ZXAuY29lZlN0ZXApIC8gKG5leHRTdGVwLmNvZWZTdGVwIC0gY3VyclN0ZXAuY29lZlN0ZXApO1xuXG4gICAgICAgIGlmIChjdXJyU3RlcC5lYXNpbmcpIHtcbiAgICAgICAgICBzdWJDb2VmID0gY3VyclN0ZXAuZWFzaW5nKHN1YkNvZWYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiBnZXJvOjptYXRoOjpsZXJwKGN1cnJTdGVwLnZhbHVlLCBuZXh0U3RlcC52YWx1ZSwgc3ViQ29lZik7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZXJwKGN1cnJTdGVwLnZhbHVlLCBuZXh0U3RlcC52YWx1ZSwgc3ViQ29lZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWFjaGFibGVcIik7XG4gIH1cblxuXG5cbn1cbiIsCiAgICAiXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQm94VmVydGljZXMgPSAoaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMzKTogbnVtYmVyW10gPT4ge1xuXG4gIGNvbnN0IGhTaXplWCA9IGluU2l6ZVswXSAqIDAuNTtcbiAgY29uc3QgaFNpemVZID0gaW5TaXplWzFdICogMC41O1xuICBjb25zdCBoU2l6ZVogPSBpblNpemVbMl0gKiAwLjU7XG5cbiAgY29uc3Qga19ub3JtYWxzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgWy0xLCAwLCAwXSwgLy8gMFxuICAgIFsrMSwgMCwgMF0sIC8vIDFcbiAgICBbMCwgLTEsIDBdLCAvLyAyXG4gICAgWzAsICsxLCAwXSwgLy8gM1xuICAgIFswLCAwLCAtMV0sIC8vIDRcbiAgICBbMCwgMCwgKzFdLCAvLyA1XG4gIF07XG5cbiAgY29uc3Qga192ZXJ0aWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFstaFNpemVYLCAtaFNpemVZLCAtaFNpemVaXSwgLy8gMFxuICAgIFsraFNpemVYLCAtaFNpemVZLCAtaFNpemVaXSwgLy8gMVxuICAgIFstaFNpemVYLCAraFNpemVZLCAtaFNpemVaXSwgLy8gMlxuICAgIFsraFNpemVYLCAraFNpemVZLCAtaFNpemVaXSwgLy8gM1xuICAgIFstaFNpemVYLCAtaFNpemVZLCAraFNpemVaXSwgLy8gNFxuICAgIFsraFNpemVYLCAtaFNpemVZLCAraFNpemVaXSwgLy8gNVxuICAgIFstaFNpemVYLCAraFNpemVZLCAraFNpemVaXSwgLy8gNlxuICAgIFsraFNpemVYLCAraFNpemVZLCAraFNpemVaXSwgLy8gN1xuICBdO1xuXG4gIGNvbnN0IGtfaW5kaWNlczogZ2xtLlJlYWRvbmx5VmVjNFtdID0gW1xuICAgIC8vIC16IDAxMjNcbiAgICBbMCwgMiwgMSwgLypub3JtYWwgPT4gKi8gNF0sXG4gICAgWzIsIDMsIDEsIC8qbm9ybWFsID0+ICovIDRdLFxuICAgIC8vICt6IDQ1NjdcbiAgICBbNCwgNSwgNiwgLypub3JtYWwgPT4gKi8gNV0sXG4gICAgWzYsIDUsIDcsIC8qbm9ybWFsID0+ICovIDVdLFxuXG4gICAgLy8gK3ggMTM1N1xuICAgIFsxLCAzLCA1LCAvKm5vcm1hbCA9PiAqLyAxXSxcbiAgICBbNSwgMywgNywgLypub3JtYWwgPT4gKi8gMV0sXG4gICAgLy8gLXggMDI0NlxuICAgIFswLCA0LCAyLCAvKm5vcm1hbCA9PiAqLyAwXSxcbiAgICBbNCwgNiwgMiwgLypub3JtYWwgPT4gKi8gMF0sXG5cbiAgICAvLyAreSAyMzY3XG4gICAgWzIsIDYsIDMsIC8qbm9ybWFsID0+ICovIDNdLFxuICAgIFs2LCA3LCAzLCAvKm5vcm1hbCA9PiAqLyAzXSxcbiAgICAvLyAteSAwMTQ1XG4gICAgWzAsIDEsIDQsIC8qbm9ybWFsID0+ICovIDJdLFxuICAgIFs0LCAxLCA1LCAvKm5vcm1hbCA9PiAqLyAyXSxcbiAgXTtcblxuICBjb25zdCB2ZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIGtfaW5kaWNlcykge1xuICAgIGNvbnN0IHZlcnRleDEgPSBrX3ZlcnRpY2VzW2luZGV4WzBdXTtcbiAgICBjb25zdCB2ZXJ0ZXgyID0ga192ZXJ0aWNlc1tpbmRleFsxXV07XG4gICAgY29uc3QgdmVydGV4MyA9IGtfdmVydGljZXNbaW5kZXhbMl1dO1xuICAgIGNvbnN0IG5vcm1hbCA9IGtfbm9ybWFsc1tpbmRleFszXV07XG4gICAgdmVydGljZXMucHVzaChcbiAgICAgIHZlcnRleDFbMF0sXG4gICAgICB2ZXJ0ZXgxWzFdLFxuICAgICAgdmVydGV4MVsyXSxcbiAgICAgIG5vcm1hbFswXSxcbiAgICAgIG5vcm1hbFsxXSxcbiAgICAgIG5vcm1hbFsyXSxcbiAgICAgIHZlcnRleDJbMF0sXG4gICAgICB2ZXJ0ZXgyWzFdLFxuICAgICAgdmVydGV4MlsyXSxcbiAgICAgIG5vcm1hbFswXSxcbiAgICAgIG5vcm1hbFsxXSxcbiAgICAgIG5vcm1hbFsyXSxcbiAgICAgIHZlcnRleDNbMF0sXG4gICAgICB2ZXJ0ZXgzWzFdLFxuICAgICAgdmVydGV4M1syXSxcbiAgICAgIG5vcm1hbFswXSxcbiAgICAgIG5vcm1hbFsxXSxcbiAgICAgIG5vcm1hbFsyXSxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHZlcnRpY2VzO1xufTtcbiIsCiAgICAiXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVOb3JtYWwgPSAoaW5Qb3NBOiBnbG0uUmVhZG9ubHlWZWMzLCBpblBvc0I6IGdsbS5SZWFkb25seVZlYzMsIGluUG9zQzogZ2xtLlJlYWRvbmx5VmVjMyk6IGdsbS52ZWMzID0+IHtcbiAgY29uc3Qgbm9ybWFsID0gZ2xtLnZlYzMuY3Jvc3MoXG4gICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgZ2xtLnZlYzMuc3ViKGdsbS52ZWMzLmNyZWF0ZSgpLCBpblBvc0EsIGluUG9zQiksXG4gICAgZ2xtLnZlYzMuc3ViKGdsbS52ZWMzLmNyZWF0ZSgpLCBpblBvc0EsIGluUG9zQylcbiAgKTtcbiAgY29uc3QgbWFnbml0dWRlID0gZ2xtLnZlYzMubGVuZ3RoKG5vcm1hbCk7XG4gIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgbm9ybWFsWzBdIC89IG1hZ25pdHVkZTtcbiAgICBub3JtYWxbMV0gLz0gbWFnbml0dWRlO1xuICAgIG5vcm1hbFsyXSAvPSBtYWduaXR1ZGU7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbDtcbn07XG4iLAogICAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmltcG9ydCB7Y29tcHV0ZU5vcm1hbH0gZnJvbSBcIi4vY29tcHV0ZU5vcm1hbFwiXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0VG9QZXJGYWNlc05vcm1hbHMgPSAodmVydGljZXM6IG51bWJlcltdKSA9PiB7XG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2ZXJ0aWNlcy5sZW5ndGg7IGluZGV4ICs9IDYgKiAzKSB7XG5cbiAgICBjb25zdCBpbmRleEEgPSBpbmRleCArIDYgKiAwO1xuICAgIGNvbnN0IGluZGV4QiA9IGluZGV4ICsgNiAqIDE7XG4gICAgY29uc3QgaW5kZXhDID0gaW5kZXggKyA2ICogMjtcblxuICAgIGNvbnN0IHBvc0E6IGdsbS5SZWFkb25seVZlYzMgPSBbdmVydGljZXNbaW5kZXhBICsgMF0sIHZlcnRpY2VzW2luZGV4QSArIDFdLCB2ZXJ0aWNlc1tpbmRleEEgKyAyXV07XG4gICAgY29uc3QgcG9zQjogZ2xtLlJlYWRvbmx5VmVjMyA9IFt2ZXJ0aWNlc1tpbmRleEIgKyAwXSwgdmVydGljZXNbaW5kZXhCICsgMV0sIHZlcnRpY2VzW2luZGV4QiArIDJdXTtcbiAgICBjb25zdCBwb3NDOiBnbG0uUmVhZG9ubHlWZWMzID0gW3ZlcnRpY2VzW2luZGV4QyArIDBdLCB2ZXJ0aWNlc1tpbmRleEMgKyAxXSwgdmVydGljZXNbaW5kZXhDICsgMl1dO1xuXG4gICAgY29uc3Qgbm9ybWFsID0gY29tcHV0ZU5vcm1hbChwb3NBLCBwb3NCLCBwb3NDKTtcblxuICAgIHZlcnRpY2VzW2luZGV4QSArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QSArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QSArIDVdID0gbm9ybWFsWzJdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QiArIDVdID0gbm9ybWFsWzJdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDNdID0gbm9ybWFsWzBdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDRdID0gbm9ybWFsWzFdO1xuICAgIHZlcnRpY2VzW2luZGV4QyArIDVdID0gbm9ybWFsWzJdO1xuICB9XG59O1xuXG4iLAogICAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmltcG9ydCB7Y29udmVydFRvUGVyRmFjZXNOb3JtYWxzfSBmcm9tIFwiLi9jb252ZXJ0VG9QZXJGYWNlc05vcm1hbHNcIlxuXG5jb25zdCBfZXhwbG9yZVNwaGVyZVBhdGNoID0gKFxuICBxdWFsaXR5OiBudW1iZXIsXG4gIHYwMTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgdjAyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICB2MDM6IGdsbS5SZWFkb25seVZlYzMsXG4gIG9uVHJpYW5nbGU6IChub3JtYWwxOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwyOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwzOiBnbG0uUmVhZG9ubHlWZWMzKSA9PiB2b2lkXG4pID0+IHtcbiAgaWYgKHF1YWxpdHkgPD0gMCkge1xuICAgIG9uVHJpYW5nbGUodjAyLCB2MDEsIHYwMyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdjEyID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDEsIHYwMiwgMC41KVxuICAgICk7XG4gICAgY29uc3QgdjIzID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDIsIHYwMywgMC41KVxuICAgICk7XG4gICAgY29uc3QgdjMxID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDMsIHYwMSwgMC41KVxuICAgICk7XG5cbiAgICBxdWFsaXR5IC09IDE7XG5cbiAgICBfZXhwbG9yZVNwaGVyZVBhdGNoKHF1YWxpdHksIHYwMSwgdjEyLCB2MzEsIG9uVHJpYW5nbGUpO1xuICAgIF9leHBsb3JlU3BoZXJlUGF0Y2gocXVhbGl0eSwgdjEyLCB2MDIsIHYyMywgb25UcmlhbmdsZSk7XG4gICAgX2V4cGxvcmVTcGhlcmVQYXRjaChxdWFsaXR5LCB2MzEsIHYyMywgdjAzLCBvblRyaWFuZ2xlKTtcbiAgICBfZXhwbG9yZVNwaGVyZVBhdGNoKHF1YWxpdHksIHYxMiwgdjIzLCB2MzEsIG9uVHJpYW5nbGUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTcGhlcmVUcmlhbmdsZXMgPSAoXG4gIHF1YWxpdHk6IG51bWJlcixcbiAgb25UcmlhbmdsZTogKG5vcm1hbDE6IGdsbS5SZWFkb25seVZlYzMsIG5vcm1hbDI6IGdsbS5SZWFkb25seVZlYzMsIG5vcm1hbDM6IGdsbS5SZWFkb25seVZlYzMpID0+IHZvaWRcbik6IHZvaWQgPT4ge1xuICBjb25zdCBrX2ljeCA9IDAuNTI1NzMxMTEyMTE5MTMzNjA2O1xuICBjb25zdCBrX2ljeiA9IDAuODUwNjUwODA4MzUyMDM5OTMyO1xuXG4gIGNvbnN0IHRtcFZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgWy1rX2ljeCwgMC4wLCAra19pY3pdLFxuICAgIFsra19pY3gsIDAuMCwgK2tfaWN6XSxcbiAgICBbLWtfaWN4LCAwLjAsIC1rX2ljel0sXG4gICAgWytrX2ljeCwgMC4wLCAta19pY3pdLFxuICAgIFswLjAsICtrX2ljeiwgK2tfaWN4XSxcbiAgICBbMC4wLCAra19pY3osIC1rX2ljeF0sXG4gICAgWzAuMCwgLWtfaWN6LCAra19pY3hdLFxuICAgIFswLjAsIC1rX2ljeiwgLWtfaWN4XSxcbiAgICBbK2tfaWN6LCAra19pY3gsIDAuMF0sXG4gICAgWy1rX2ljeiwgK2tfaWN4LCAwLjBdLFxuICAgIFsra19pY3osIC1rX2ljeCwgMC4wXSxcbiAgICBbLWtfaWN6LCAta19pY3gsIDAuMF1cbiAgXTtcblxuICBjb25zdCB0bXBJbmRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgWzAsIDQsIDFdLFxuICAgIFswLCA5LCA0XSxcbiAgICBbOSwgNSwgNF0sXG4gICAgWzQsIDUsIDhdLFxuICAgIFs0LCA4LCAxXSxcbiAgICBbOCwgMTAsIDFdLFxuICAgIFs4LCAzLCAxMF0sXG4gICAgWzUsIDMsIDhdLFxuICAgIFs1LCAyLCAzXSxcbiAgICBbMiwgNywgM10sXG4gICAgWzcsIDEwLCAzXSxcbiAgICBbNywgNiwgMTBdLFxuICAgIFs3LCAxMSwgNl0sXG4gICAgWzExLCAwLCA2XSxcbiAgICBbMCwgMSwgNl0sXG4gICAgWzYsIDEsIDEwXSxcbiAgICBbOSwgMCwgMTFdLFxuICAgIFs5LCAxMSwgMl0sXG4gICAgWzksIDIsIDVdLFxuICAgIFs3LCAyLCAxMV1cbiAgXTtcblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIHRtcEluZGljZXMpIHtcbiAgICBfZXhwbG9yZVNwaGVyZVBhdGNoKFxuICAgICAgcXVhbGl0eSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzBdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzFdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzJdXSxcbiAgICAgIG9uVHJpYW5nbGVcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTcGhlcmVWZXJ0aWNlcyA9IChcbiAgcXVhbGl0eTogbnVtYmVyLFxuICByYWRpdXM6IG51bWJlcixcbiAgbW9kZWxNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0LFxuICBwZXJGYWNlTm9ybWFsczogYm9vbGVhbiA9IGZhbHNlXG4pOiBudW1iZXJbXSA9PiB7XG5cbiAgY29uc3QgdmVydGljZXM6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgdG1wVmVjM0EgPSBnbG0udmVjMy5jcmVhdGUoKTtcbiAgY29uc3QgdG1wVmVjM0IgPSBnbG0udmVjMy5jcmVhdGUoKTtcblxuICBnZW5lcmF0ZVNwaGVyZVRyaWFuZ2xlcyhcbiAgICBxdWFsaXR5LFxuICAgIChub3JtYWwxOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwyOiBnbG0uUmVhZG9ubHlWZWMzLCBub3JtYWwzOiBnbG0uUmVhZG9ubHlWZWMzKSA9PiB7XG5cbiAgICAgIHRtcFZlYzNBWzBdID0gdG1wVmVjM0FbMV0gPSB0bXBWZWMzQVsyXSA9IDA7XG4gICAgICBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHRtcFZlYzNBLCBub3JtYWwxLCBtb2RlbE1hdDQpO1xuICAgICAgZ2xtLnZlYzMuc2NhbGUodG1wVmVjM0IsIHRtcFZlYzNBLCByYWRpdXMpLFxuICAgICAgdmVydGljZXMucHVzaChcbiAgICAgICAgdG1wVmVjM0JbMF0sXG4gICAgICAgIHRtcFZlYzNCWzFdLFxuICAgICAgICB0bXBWZWMzQlsyXSxcbiAgICAgICAgdG1wVmVjM0FbMF0sXG4gICAgICAgIHRtcFZlYzNBWzFdLFxuICAgICAgICB0bXBWZWMzQVsyXSxcbiAgICAgICk7XG5cbiAgICAgIHRtcFZlYzNBWzBdID0gdG1wVmVjM0FbMV0gPSB0bXBWZWMzQVsyXSA9IDA7XG4gICAgICBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHRtcFZlYzNBLCBub3JtYWwyLCBtb2RlbE1hdDQpO1xuICAgICAgZ2xtLnZlYzMuc2NhbGUodG1wVmVjM0IsIHRtcFZlYzNBLCByYWRpdXMpLFxuICAgICAgdmVydGljZXMucHVzaChcbiAgICAgICAgdG1wVmVjM0JbMF0sXG4gICAgICAgIHRtcFZlYzNCWzFdLFxuICAgICAgICB0bXBWZWMzQlsyXSxcbiAgICAgICAgdG1wVmVjM0FbMF0sXG4gICAgICAgIHRtcFZlYzNBWzFdLFxuICAgICAgICB0bXBWZWMzQVsyXSxcbiAgICAgICk7XG5cbiAgICAgIHRtcFZlYzNBWzBdID0gdG1wVmVjM0FbMV0gPSB0bXBWZWMzQVsyXSA9IDA7XG4gICAgICBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHRtcFZlYzNBLCBub3JtYWwzLCBtb2RlbE1hdDQpO1xuICAgICAgZ2xtLnZlYzMuc2NhbGUodG1wVmVjM0IsIHRtcFZlYzNBLCByYWRpdXMpLFxuICAgICAgdmVydGljZXMucHVzaChcbiAgICAgICAgdG1wVmVjM0JbMF0sXG4gICAgICAgIHRtcFZlYzNCWzFdLFxuICAgICAgICB0bXBWZWMzQlsyXSxcbiAgICAgICAgdG1wVmVjM0FbMF0sXG4gICAgICAgIHRtcFZlYzNBWzFdLFxuICAgICAgICB0bXBWZWMzQVsyXSxcbiAgICAgICk7XG5cbiAgICB9KTtcblxuICBpZiAocGVyRmFjZU5vcm1hbHMpIHtcbiAgICBjb252ZXJ0VG9QZXJGYWNlc05vcm1hbHModmVydGljZXMpO1xuICB9XG5cbiAgcmV0dXJuIHZlcnRpY2VzO1xufTtcbiIsCiAgICAiaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVdpcmVGcmFtZUZydXN0dW1WZXJ0aWNlcyA9IChcbiAgZm92WTogbnVtYmVyLFxuICBhc3BlY3Q6IG51bWJlcixcbiAgek5lYXI6IG51bWJlcixcbiAgekZhcjogbnVtYmVyXG4pOiBnbG0uUmVhZG9ubHlWZWMzW10gPT4ge1xuICBjb25zdCBmSCA9IE1hdGgudGFuKChmb3ZZIC8gMzYwLjApICogTWF0aC5QSSkgKiB6TmVhcjtcbiAgY29uc3QgZlcgPSBmSCAqIGFzcGVjdDtcblxuICBjb25zdCBsZWZ0ID0gLWZXO1xuICBjb25zdCByaWdodCA9ICtmVztcblxuICBjb25zdCB0b3AgPSArZkg7XG4gIGNvbnN0IGJvdHRvbSA9IC1mSDtcblxuICBjb25zdCBoYWxmX3ogPSB6RmFyICogTWF0aC5zaW4oKGZvdlkgKiBNYXRoLlBJKSAvIDE4MC4wKTtcbiAgY29uc3QgaGFsZl95ID0gaGFsZl96ICogYXNwZWN0O1xuXG4gIGNvbnN0IHRtcFZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXTtcblxuICB0bXBWZXJ0aWNlcy5wdXNoKFt6TmVhciwgbGVmdCwgdG9wXSk7XG4gIHRtcFZlcnRpY2VzLnB1c2goW3pOZWFyLCByaWdodCwgdG9wXSk7XG4gIHRtcFZlcnRpY2VzLnB1c2goW3pOZWFyLCBsZWZ0LCBib3R0b21dKTtcbiAgdG1wVmVydGljZXMucHVzaChbek5lYXIsIHJpZ2h0LCBib3R0b21dKTtcblxuICB0bXBWZXJ0aWNlcy5wdXNoKFt6RmFyLCAtaGFsZl95LCAraGFsZl96XSk7XG4gIHRtcFZlcnRpY2VzLnB1c2goW3pGYXIsICtoYWxmX3ksICtoYWxmX3pdKTtcbiAgdG1wVmVydGljZXMucHVzaChbekZhciwgLWhhbGZfeSwgLWhhbGZfel0pO1xuICB0bXBWZXJ0aWNlcy5wdXNoKFt6RmFyLCAraGFsZl95LCAtaGFsZl96XSk7XG5cbiAgdG1wVmVydGljZXMucHVzaChbekZhciwgLWhhbGZfeSAqIDEuNjYsIC1oYWxmX3pdKTtcbiAgdG1wVmVydGljZXMucHVzaChbekZhciwgLWhhbGZfeSAqIDEuNjYsICtoYWxmX3pdKTtcblxuICAvL1xuXG4gIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gIGluZGljZXMucHVzaCgwLCAxLCAxLCAzLCAzLCAyLCAyLCAwKTtcbiAgaW5kaWNlcy5wdXNoKDAsIDQsIDEsIDUsIDIsIDYsIDMsIDcpO1xuICBpbmRpY2VzLnB1c2goNCwgNSwgNSwgNywgNywgNiwgNiwgNCk7XG4gIGluZGljZXMucHVzaCg4LCA5KTtcbiAgaW5kaWNlcy5wdXNoKDcsIDgpO1xuICBpbmRpY2VzLnB1c2goNSwgOSk7XG5cbiAgLy9cblxuICBjb25zdCB2ZXJ0aWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW107XG5cbiAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGluZGljZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgdmVydGljZXMucHVzaCh0bXBWZXJ0aWNlc1tpbmRpY2VzW2lpXV0pO1xuICB9XG5cbiAgcmV0dXJuIHZlcnRpY2VzO1xufTtcbiIsCiAgICAiaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IF9kZWdyZWVUb1JhZCA9IChhbmdsZTogbnVtYmVyKSA9PiBhbmdsZSAqIE1hdGguUEkgLyAxODA7XG5cbmVudW0gUHJvamVjdGlvblR5cGUge1xuICBwZXJzcGVjdGl2ZSA9IDAsXG4gIG9ydGhvZ29uYWwgPSAxXG59XG5cbmludGVyZmFjZSBJUGVyc3BlY3RpdmVEYXRhT3B0cyB7XG4gIGZvdnk6IG51bWJlcjtcbiAgYXNwZWN0UmF0aW8/OiBudW1iZXI7XG4gIG5lYXI6IG51bWJlcjtcbiAgZmFyOiBudW1iZXI7XG59XG5cbnR5cGUgSVBlcnNwZWN0aXZlRGF0YSA9IFJlcXVpcmVkPElQZXJzcGVjdGl2ZURhdGFPcHRzPjtcblxuaW50ZXJmYWNlIElPcnRob2dvbmFsRGF0YSB7XG4gIGxlZnQ6IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xuICBuZWFyOiBudW1iZXI7XG4gIGZhcjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYW1lcmEge1xuICBnZXRFeWUoKTogZ2xtLlJlYWRvbmx5VmVjMztcbiAgZ2V0VGFyZ2V0KCk6IGdsbS5SZWFkb25seVZlYzM7XG4gIGdldFVwQXhpcygpOiBnbG0uUmVhZG9ubHlWZWMzO1xuXG4gIGdldFByb2plY3Rpb25NYXRyaXgoKTogZ2xtLlJlYWRvbmx5TWF0NDtcbiAgZ2V0Vmlld01hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0O1xuICBnZXRDb21wb3NlZE1hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0O1xuXG4gIGdldFBlcnNwZWN0aXZlRGF0YSgpOiBSZWFkb25seTxJUGVyc3BlY3RpdmVEYXRhIHwgdW5kZWZpbmVkPjtcbiAgZ2V0T3J0aG9nb25hbERhdGEoKTogUmVhZG9ubHk8SU9ydGhvZ29uYWxEYXRhIHwgdW5kZWZpbmVkPjtcbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYSBpbXBsZW1lbnRzIElDYW1lcmEge1xuICBwcml2YXRlIF9wcm9qZWN0aW9uVHlwZSA9IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlO1xuICBwcml2YXRlIF9wZXJzcGVjdGl2ZURhdGE/OiBJUGVyc3BlY3RpdmVEYXRhO1xuICBwcml2YXRlIF9vcnRob2dvbmFsRGF0YT86IElPcnRob2dvbmFsRGF0YTtcblxuICBwcml2YXRlIF92aWV3cG9ydFBvcyA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoMCwgMCk7XG4gIHByaXZhdGUgX3ZpZXdwb3J0U2l6ZSA9IGdsbS52ZWMyLmZyb21WYWx1ZXMoMCwgMCk7XG5cbiAgcHJpdmF0ZSBfcHJvamVjdGlvbk1hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICBwcml2YXRlIF92aWV3TWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gIHByaXZhdGUgX2NvbXBvc2VkTWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG5cbiAgcHJpdmF0ZSBfZXllID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfdGFyZ2V0ID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgcHJpdmF0ZSBfdXBBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcblxuICAvL1xuXG4gIHNldEFzUGVyc3BlY3RpdmUoaW5EYXRhOiBJUGVyc3BlY3RpdmVEYXRhT3B0cykge1xuICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlID0gUHJvamVjdGlvblR5cGUucGVyc3BlY3RpdmU7XG5cbiAgICBsZXQgYXNwZWN0UmF0aW8gPSBpbkRhdGEuYXNwZWN0UmF0aW87XG4gICAgaWYgKGFzcGVjdFJhdGlvID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFzcGVjdFJhdGlvID0gdGhpcy5fdmlld3BvcnRTaXplWzBdIC8gdGhpcy5fdmlld3BvcnRTaXplWzFdO1xuICAgIH1cblxuICAgIHRoaXMuX3BlcnNwZWN0aXZlRGF0YSA9IHtcbiAgICAgIGZvdnk6IGluRGF0YS5mb3Z5LFxuICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICBuZWFyOiBpbkRhdGEubmVhcixcbiAgICAgIGZhcjogaW5EYXRhLmZhclxuICAgIH07XG4gIH1cblxuICBzZXRBc09ydGhvZ29uYWwoaW5EYXRhOiBJT3J0aG9nb25hbERhdGEpIHtcbiAgICB0aGlzLl9wcm9qZWN0aW9uVHlwZSA9IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWw7XG4gICAgdGhpcy5fb3J0aG9nb25hbERhdGEgPSB7IC4uLmluRGF0YSB9O1xuICB9XG5cbiAgLy9cblxuICBzZXRWaWV3cG9ydFBvcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3ZpZXdwb3J0UG9zWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRQb3NbMV0gPSBoZWlnaHQ7XG4gIH1cblxuICBnZXRWaWV3cG9ydFBvcygpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRQb3M7XG4gIH1cblxuICAvL1xuXG4gIHNldFZpZXdwb3J0U2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3ZpZXdwb3J0U2l6ZVswXSA9IHdpZHRoO1xuICAgIHRoaXMuX3ZpZXdwb3J0U2l6ZVsxXSA9IGhlaWdodDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlICE9PSBQcm9qZWN0aW9uVHlwZS5wZXJzcGVjdGl2ZSAmJlxuICAgICAgdGhpcy5fcGVyc3BlY3RpdmVEYXRhXG4gICAgKSB7XG4gICAgICB0aGlzLl9wZXJzcGVjdGl2ZURhdGEuYXNwZWN0UmF0aW8gPVxuICAgICAgICB0aGlzLl92aWV3cG9ydFNpemVbMF0gLyB0aGlzLl92aWV3cG9ydFNpemVbMV07XG4gICAgfVxuICB9XG5cbiAgZ2V0Vmlld3BvcnRTaXplKCk6IGdsbS5SZWFkb25seVZlYzIge1xuICAgIHJldHVybiB0aGlzLl92aWV3cG9ydFNpemU7XG4gIH1cblxuICAvL1xuXG4gIGxvb2tBdChcbiAgICBpbkV5ZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblVwQXhpczogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLnNldEV5ZShpbkV5ZSk7XG4gICAgdGhpcy5zZXRUYXJnZXQoaW5UYXJnZXQpO1xuICAgIHRoaXMuc2V0VXBBeGlzKGluVXBBeGlzKTtcbiAgfVxuXG4gIC8vXG5cbiAgc2V0RXllKGluRXllOiBnbG0uUmVhZG9ubHlWZWMzKSB7XG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl9leWUsIGluRXllKTtcbiAgfVxuICBzZXRUYXJnZXQoaW5UYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMpIHtcbiAgICBnbG0udmVjMy5jb3B5KHRoaXMuX3RhcmdldCwgaW5UYXJnZXQpO1xuICB9XG4gIHNldFVwQXhpcyhpblVwQXhpczogZ2xtLlJlYWRvbmx5VmVjMykge1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fdXBBeGlzLCBpblVwQXhpcyk7XG4gIH1cblxuICBnZXRFeWUoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX2V5ZTtcbiAgfVxuICBnZXRUYXJnZXQoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgfVxuICBnZXRVcEF4aXMoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3VwQXhpcztcbiAgfVxuXG4gIC8vXG5cbiAgY29tcHV0ZU1hdHJpY2VzKCkge1xuICAgIGlmICh0aGlzLl9wcm9qZWN0aW9uVHlwZSA9PT0gUHJvamVjdGlvblR5cGUucGVyc3BlY3RpdmUpIHtcbiAgICAgIGNvbnN0IHsgZm92eSwgYXNwZWN0UmF0aW8sIG5lYXIsIGZhciB9ID0gdGhpcy5fcGVyc3BlY3RpdmVEYXRhITtcbiAgICAgIGdsbS5tYXQ0LnBlcnNwZWN0aXZlKFxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgICBfZGVncmVlVG9SYWQoZm92eSksXG4gICAgICAgIGFzcGVjdFJhdGlvISxcbiAgICAgICAgbmVhcixcbiAgICAgICAgZmFyXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgPT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIgfSA9IHRoaXMuX29ydGhvZ29uYWxEYXRhITtcbiAgICAgIGdsbS5tYXQ0Lm9ydGhvKFxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgdG9wLFxuICAgICAgICBib3R0b20sXG4gICAgICAgIG5lYXIsXG4gICAgICAgIGZhclxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbG0ubWF0NC5sb29rQXQodGhpcy5fdmlld01hdHJpeCwgdGhpcy5fZXllLCB0aGlzLl90YXJnZXQsIHRoaXMuX3VwQXhpcyk7XG5cbiAgICB0aGlzLmNvbXB1dGVDb21wb3NlZE1hdHJpeCgpO1xuICB9XG5cbiAgY29tcHV0ZUNvbXBvc2VkTWF0cml4KCkge1xuICAgIGdsbS5tYXQ0Lm11bHRpcGx5KFxuICAgICAgdGhpcy5fY29tcG9zZWRNYXRyaXgsXG4gICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgdGhpcy5fdmlld01hdHJpeFxuICAgICk7XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uTWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fcHJvamVjdGlvbk1hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRWaWV3TWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fdmlld01hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRDb21wb3NlZE1hdHJpeChpbk1hdDQ6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBnbG0ubWF0NC5jb3B5KHRoaXMuX2NvbXBvc2VkTWF0cml4LCBpbk1hdDQpO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbk1hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbk1hdHJpeDtcbiAgfVxuICBnZXRWaWV3TWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWF0cml4O1xuICB9XG4gIGdldENvbXBvc2VkTWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl9jb21wb3NlZE1hdHJpeDtcbiAgfVxuXG4gIC8vXG5cbiAgZ2V0UGVyc3BlY3RpdmVEYXRhKCk6IFJlYWRvbmx5PElQZXJzcGVjdGl2ZURhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlRGF0YTtcbiAgfVxuICBnZXRPcnRob2dvbmFsRGF0YSgpOiBSZWFkb25seTxJT3J0aG9nb25hbERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGFuIG9ydGhvZ29uYWwgcHJvamVjdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb3J0aG9nb25hbERhdGE7XG4gIH1cbn1cbiIsCiAgICAiaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmVudW0gRnJ1c3R1bVNpZGUge1xuICBSaWdodCA9IDAsXG4gIExlZnQgPSAxLFxuICBCb3R0b20gPSAyLFxuICBUb3AgPSAzLFxuICBCYWNrID0gNCxcbiAgRnJvbnQgPSA1XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZydXN0dW1DdWxsaW5nIHtcbiAgY2FsY3VsYXRlRnJ1c3R1bShwcm9qOiBnbG0uUmVhZG9ubHlNYXQ0LCB2aWV3OiBnbG0uUmVhZG9ubHlNYXQ0KTogdm9pZDtcbiAgc3BoZXJlSW5GcnVzdHVtKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogYm9vbGVhbjtcbiAgcG9pbnRJbkZydXN0dW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IGJvb2xlYW47XG4gIGN1YmVJbkZydXN0dW0oaW5YOiBudW1iZXIsIGluWTogbnVtYmVyLCBpblo6IG51bWJlciwgaW5TaXplOiBudW1iZXIpOiBib29sZWFuO1xuICBjdWJlSW5GcnVzdHVtVmVjMyhjZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsIGluU2l6ZTogbnVtYmVyKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEZydXN0dW1DdWxsaW5nIGltcGxlbWVudHMgSUZydXN0dW1DdWxsaW5nIHtcbiAgcHJpdmF0ZSBfZnJ1c3R1bSA9IG5ldyBGbG9hdDMyQXJyYXkoMjQpOyAvLyA2ICogNCB2YWx1ZXNcblxuICBwcml2YXRlIF9zZXRQbGFuZShcbiAgICBzaWRlOiBGcnVzdHVtU2lkZSxcbiAgICBsZWZ0OiBnbG0uUmVhZG9ubHlWZWM0LFxuICAgIHJpZ2h0OiBnbG0uUmVhZG9ubHlWZWM0LFxuICAgIGNvZWY6IG51bWJlclxuICApIHtcbiAgICBjb25zdCBpbmRleCA9IHNpZGUgKiA0O1xuXG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDBdID0gbGVmdFswXSArIHJpZ2h0WzBdICogY29lZjtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gPSBsZWZ0WzFdICsgcmlnaHRbMV0gKiBjb2VmO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSA9IGxlZnRbMl0gKyByaWdodFsyXSAqIGNvZWY7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDNdID0gbGVmdFszXSArIHJpZ2h0WzNdICogY29lZjtcblxuICAgIGNvbnN0IG1hZ25pdHVkZSA9IE1hdGguc3FydChcbiAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSAqIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSArXG4gICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAxXSAqIHRoaXMuX2ZydXN0dW1baW5kZXggKyAxXSArXG4gICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSAqIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXVxuICAgICk7XG5cbiAgICBpZiAobWFnbml0dWRlID09PSAwKSByZXR1cm47XG5cbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMF0gLz0gbWFnbml0dWRlO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAxXSAvPSBtYWduaXR1ZGU7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDJdIC89IG1hZ25pdHVkZTtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgM10gLz0gbWFnbml0dWRlO1xuICB9XG5cbiAgY2FsY3VsYXRlRnJ1c3R1bShwcm9qOiBnbG0uUmVhZG9ubHlNYXQ0LCB2aWV3OiBnbG0uUmVhZG9ubHlNYXQ0KSB7XG4gICAgY29uc3QgY2xpcCA9IGdsbS5tYXQ0Lm11bHRpcGx5KGdsbS5tYXQ0LmNyZWF0ZSgpLCBwcm9qLCB2aWV3KTtcblxuICAgIC8vL1xuXG4gICAgY29uc3Qgcm93MCA9IGdsbS52ZWM0LmZyb21WYWx1ZXMoY2xpcFswXSwgY2xpcFs0XSwgY2xpcFs4XSwgY2xpcFsxMl0pO1xuICAgIGNvbnN0IHJvdzEgPSBnbG0udmVjNC5mcm9tVmFsdWVzKGNsaXBbMV0sIGNsaXBbNV0sIGNsaXBbOV0sIGNsaXBbMTNdKTtcbiAgICBjb25zdCByb3cyID0gZ2xtLnZlYzQuZnJvbVZhbHVlcyhjbGlwWzJdLCBjbGlwWzZdLCBjbGlwWzEwXSwgY2xpcFsxNF0pO1xuICAgIGNvbnN0IHJvdzMgPSBnbG0udmVjNC5mcm9tVmFsdWVzKGNsaXBbM10sIGNsaXBbN10sIGNsaXBbMTFdLCBjbGlwWzE1XSk7XG5cbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5SaWdodCwgcm93Mywgcm93MCwgLTEpO1xuICAgIHRoaXMuX3NldFBsYW5lKEZydXN0dW1TaWRlLkxlZnQsIHJvdzMsIHJvdzAsICsxKTtcbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5Cb3R0b20sIHJvdzMsIHJvdzEsICsxKTtcbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5Ub3AsIHJvdzMsIHJvdzEsIC0xKTtcbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5CYWNrLCByb3czLCByb3cyLCAtMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuRnJvbnQsIHJvdzMsIHJvdzIsICsxKTtcbiAgfVxuXG4gIHNwaGVyZUluRnJ1c3R1bSh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCByYWRpdXM6IG51bWJlcikge1xuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCA2OyArK2lpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGlpICogNDtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDBdICogeCArXG4gICAgICAgICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDFdICogeSArXG4gICAgICAgICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDJdICogeiArXG4gICAgICAgICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDNdIDw9XG4gICAgICAgIC1yYWRpdXNcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwb2ludEluRnJ1c3R1bSh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG4gICAgLy8gc3BoZXJlIG9mIHJhZGl1cyAwID0+IHBvaW50XG4gICAgcmV0dXJuIHRoaXMuc3BoZXJlSW5GcnVzdHVtKHgsIHksIHosIDApO1xuICB9XG5cbiAgY3ViZUluRnJ1c3R1bVZlYzMoY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLCBpblNpemU6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmN1YmVJbkZydXN0dW0oY2VudGVyWzBdLCBjZW50ZXJbMV0sIGNlbnRlclsyXSwgaW5TaXplKTtcbiAgfVxuXG4gIGN1YmVJbkZydXN0dW0oaW5YOiBudW1iZXIsIGluWTogbnVtYmVyLCBpblo6IG51bWJlciwgaW5TaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBoU2l6ZSA9IGluU2l6ZSAqIDAuNTtcbiAgICBjb25zdCBtaW5YID0gaW5YIC0gaFNpemU7XG4gICAgY29uc3QgbWluWSA9IGluWSAtIGhTaXplO1xuICAgIGNvbnN0IG1pblogPSBpblogLSBoU2l6ZTtcbiAgICBjb25zdCBtYXhYID0gaW5YICsgaFNpemU7XG4gICAgY29uc3QgbWF4WSA9IGluWSArIGhTaXplO1xuICAgIGNvbnN0IG1heFogPSBpblogKyBoU2l6ZTtcblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCA2OyArK2lpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGlpICogNDtcbiAgICAgIGNvbnN0IHBsYW5BID0gdGhpcy5fZnJ1c3R1bVtpbmRleCArIDBdO1xuICAgICAgY29uc3QgcGxhbkIgPSB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV07XG4gICAgICBjb25zdCBwbGFuQyA9IHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXTtcbiAgICAgIGNvbnN0IHBsYW5EID0gdGhpcy5fZnJ1c3R1bVtpbmRleCArIDNdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHBsYW5BICogbWluWCArIHBsYW5CICogbWluWSArIHBsYW5DICogbWluWiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1heFggKyBwbGFuQiAqIG1pblkgKyBwbGFuQyAqIG1pblogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtaW5YICsgcGxhbkIgKiBtYXhZICsgcGxhbkMgKiBtaW5aICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWF4WCArIHBsYW5CICogbWF4WSArIHBsYW5DICogbWluWiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1pblggKyBwbGFuQiAqIG1pblkgKyBwbGFuQyAqIG1heFogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtYXhYICsgcGxhbkIgKiBtaW5ZICsgcGxhbkMgKiBtYXhaICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWluWCArIHBsYW5CICogbWF4WSArIHBsYW5DICogbWF4WiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1heFggKyBwbGFuQiAqIG1heFkgKyBwbGFuQyAqIG1heFogKyBwbGFuRCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLAogICAgImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIG1hdDQgdV9jb21wb3NlZE1hdHJpeDtcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0UG9zO1xuXG5pbiB2ZWMzIGFfdmVydGV4UG9zaXRpb247XG5pbiB2ZWMzIGFfdmVydGV4Tm9ybWFsO1xuXG5pbiB2ZWMzIGFfb2Zmc2V0UG9zaXRpb247XG5pbiB2ZWM0IGFfb2Zmc2V0T3JpZW50YXRpb247IC8vIHF1YXRlcm5pb25cbmluIHZlYzMgYV9vZmZzZXRTY2FsZTtcbmluIHZlYzMgYV9vZmZzZXRDb2xvcjtcblxub3V0IHZlYzMgdl9jb2xvcjtcblxuLy8gI2luY2x1ZGUgXCIuL2Fzc2V0cy9ncmFwaGljcy9zaGFkZXJzL19jb21tb24vX2NvbW1vbi1xdWF0LXJvdGF0aW9ucy5nbHNsLnZlcnRcIlxuXG52ZWM0IHF1YXRfZnJvbV9heGlzX2FuZ2xlKHZlYzMgYXhpcywgZmxvYXQgYW5nbGUpXG57XG4gIHZlYzQgcXI7XG4gIC8vIGZsb2F0IGhhbGZfYW5nbGUgPSAoYW5nbGUgKiAwLjUpICogMy4xNDE1OSAvIDE4MC4wO1xuICBmbG9hdCBoYWxmX2FuZ2xlID0gKGFuZ2xlICogMC41KTtcbiAgcXIueCA9IGF4aXMueCAqIHNpbihoYWxmX2FuZ2xlKTtcbiAgcXIueSA9IGF4aXMueSAqIHNpbihoYWxmX2FuZ2xlKTtcbiAgcXIueiA9IGF4aXMueiAqIHNpbihoYWxmX2FuZ2xlKTtcbiAgcXIudyA9IGNvcyhoYWxmX2FuZ2xlKTtcbiAgcmV0dXJuIHFyO1xufVxuXG52ZWMzIGFwcGx5X3F1YXRfdG9fdmVjMyh2ZWMzIHBvc2l0aW9uLCB2ZWM0IHEpXG57XG4gIHZlYzMgdiA9IHBvc2l0aW9uLnh5ejtcbiAgcmV0dXJuIHYgKyAyLjAgKiBjcm9zcyhxLnh5eiwgY3Jvc3MocS54eXosIHYpICsgcS53ICogdik7XG59XG5cbi8vICNpbmNsdWRlIFwiLi9hc3NldHMvZ3JhcGhpY3Mvc2hhZGVycy9fY29tbW9uL19jb21tb24tYXBwbHktbGlnaHRpbmcuZ2xzbC5mcmFnXCJcblxuZmxvYXQgZ2V0RGlmZnVzZUxpZ2h0aW5nUmF0aW8odmVjMyBsaWdodERpciwgdmVjMyBub3JtYWwpXG57XG4gIG5vcm1hbCA9IG5vcm1hbGl6ZShub3JtYWwpO1xuICBsaWdodERpciA9IG5vcm1hbGl6ZShsaWdodERpcik7XG5cbiAgcmV0dXJuIG1heChkb3QobGlnaHREaXIsIG5vcm1hbCksIDAuMCk7XG59XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuXHR2ZWMzIHdvcmxkU3BhY2VQb3NpdGlvbiA9IGFfb2Zmc2V0UG9zaXRpb24gKyBhcHBseV9xdWF0X3RvX3ZlYzMoYV92ZXJ0ZXhQb3NpdGlvbiAqIGFfb2Zmc2V0U2NhbGUsIGFfb2Zmc2V0T3JpZW50YXRpb24pO1xuXHR2ZWMzIHdvcmxkU3BhY2VOb3JtYWwgPSBhcHBseV9xdWF0X3RvX3ZlYzMoYV92ZXJ0ZXhOb3JtYWwsIGFfb2Zmc2V0T3JpZW50YXRpb24pO1xuXG5cdGdsX1Bvc2l0aW9uID0gdV9jb21wb3NlZE1hdHJpeCAqIHZlYzQod29ybGRTcGFjZVBvc2l0aW9uLCAxLjApO1xuXG5cdGZsb2F0IGRpZmZ1c2VSYXRpbyA9IGdldERpZmZ1c2VMaWdodGluZ1JhdGlvKHVfbGlnaHRQb3MgLSB3b3JsZFNwYWNlUG9zaXRpb24sIHdvcmxkU3BhY2VOb3JtYWwpO1xuXG5cdHZfY29sb3IgPSBhX29mZnNldENvbG9yICogKDAuMyArIGRpZmZ1c2VSYXRpbyk7XG59XG5gLnRyaW0oKTsiLAogICAgImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGxvd3AgZmxvYXQ7XG5cbmluIHZlYzMgdl9jb2xvcjtcblxub3V0IHZlYzQgb3V0X2NvbG9yO1xuXG4vL1xuLy9cbi8vXG5cbnZvaWQgbWFpbih2b2lkKVxue1xuXHRvdXRfY29sb3IgPSB2ZWM0KHZfY29sb3IsIDEuMCk7XG59XG5gLnRyaW0oKTsiLAogICAgImltcG9ydCB7IGdyYXBoaWNzIH0gZnJvbSAnLi4vLi4vLi4nO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9nZW9tZXRyeS1zdGFjay1yZW5kZXJlci5nbHNsLnZlcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy9nZW9tZXRyeS1zdGFjay1yZW5kZXJlci5nbHNsLmZyYWcnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuaW50ZXJmYWNlIElBbGlhc2VkR2VvbWV0cnkge1xuICBnZW9tZXRyeTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcbiAgYnVmZmVyOiBGbG9hdDMyQXJyYXk7XG4gIGN1cnJlbnRTaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVN0YWNrUmVuZGVyZXIge1xuICBwcml2YXRlIF9zaGFkZXI6IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtO1xuICBwcml2YXRlIF9nZW9EZWY6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uO1xuXG4gIHByaXZhdGUgX2FsaWFzZWRHZW9tZXRyaWVzTWFwID0gbmV3IE1hcDxudW1iZXIsIElBbGlhc2VkR2VvbWV0cnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtKCdHZW9tZXRyeVN0YWNrUmVuZGVyZXInLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHZlcnRleFNoYWRlcixcbiAgICAgIGZyYWdtZW50U3JjOiBmcmFnbWVudFNoYWRlcixcbiAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgJ2FfdmVydGV4UG9zaXRpb24nLFxuICAgICAgICAnYV92ZXJ0ZXhOb3JtYWwnLFxuICAgICAgICAnYV9vZmZzZXRQb3NpdGlvbicsXG4gICAgICAgICdhX29mZnNldE9yaWVudGF0aW9uJyxcbiAgICAgICAgJ2Ffb2Zmc2V0U2NhbGUnLFxuICAgICAgICAnYV9vZmZzZXRDb2xvcicsXG4gICAgICBdLFxuICAgICAgdW5pZm9ybXM6IFsndV9jb21wb3NlZE1hdHJpeCcsICd1X2xpZ2h0UG9zJ11cbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb0J1aWxkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeUJ1aWxkZXIoKTtcbiAgICBnZW9CdWlsZGVyXG4gICAgICAucmVzZXQoKVxuICAgICAgLnNldFByaW1pdGl2ZVR5cGUoJ3RyaWFuZ2xlcycpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4UG9zaXRpb24nLCAndmVjM2YnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhOb3JtYWwnLCAndmVjM2YnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuc2V0VmJvQXNEeW5hbWljKClcbiAgICAgIC5zZXRWYm9Bc0luc3RhbmNlZCgpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldFBvc2l0aW9uJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0T3JpZW50YXRpb24nLCAndmVjNGYnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRTY2FsZScsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldENvbG9yJywgJ3ZlYzNmJyk7XG5cbiAgICB0aGlzLl9nZW9EZWYgPSBnZW9CdWlsZGVyLmdldERlZigpO1xuXG4gICAgLy8gdGhpcy5fZ2VvbWV0cnkgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShcbiAgICAvLyAgIHRoaXMuX3NoYWRlcixcbiAgICAvLyAgIHRoaXMuX2dlb0RlZlxuICAgIC8vICk7XG5cbiAgICAvLyBjb25zdCBtb2RlbE1hdDQgPSBnbG0ubWF0NC5jcmVhdGUoKTtcbiAgICAvLyBnbG0ubWF0NC5pZGVudGl0eShtb2RlbE1hdDQpO1xuICAgIC8vIGdsbS5tYXQ0LnNjYWxlKG1vZGVsTWF0NCwgbW9kZWxNYXQ0LCBbMiwxLDFdKTtcbiAgICAvLyBjb25zdCB2ZXJ0aWNlcyA9IGdlbmVyYXRlU3BoZXJlVmVydGljZXMoMCwgMC41LCBtb2RlbE1hdDQpO1xuXG4gICAgLy8gY29uc3QgcmF3RGF0YSA9IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW1xuICAgIC8vICAgdmVydGV4LnBvc2l0aW9uWzBdLFxuICAgIC8vICAgdmVydGV4LnBvc2l0aW9uWzFdLFxuICAgIC8vICAgdmVydGV4LnBvc2l0aW9uWzJdLFxuICAgIC8vICAgdmVydGV4Lm5vcm1hbFswXSxcbiAgICAvLyAgIHZlcnRleC5ub3JtYWxbMV0sXG4gICAgLy8gICB2ZXJ0ZXgubm9ybWFsWzJdXVxuICAgIC8vICkuZmxhdCgpO1xuXG4gICAgLy8gdGhpcy5fZ2VvbWV0cnkudXBkYXRlQnVmZmVyKDAsIHJhd0RhdGEsIHJhd0RhdGEubGVuZ3RoKTtcbiAgICAvLyB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudChyYXdEYXRhLmxlbmd0aCAvIDYpO1xuICB9XG5cbiAgY3JlYXRlQWxpYXMoYWxpYXM6IG51bWJlciwgYnVmZmVyU2l6ZTogbnVtYmVyLCB2ZXJ0aWNlczogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBjb25zdCBhbGlhc0dlb21ldHJ5ID0gdGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAuZ2V0KGFsaWFzKTtcbiAgICBpZiAoYWxpYXNHZW9tZXRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWxpYXMgYWxyZWFkeSBleGlzdCwgYWxpYXM6IFwiICsgYWxpYXMpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0FsaWFzOiBJQWxpYXNlZEdlb21ldHJ5ID0ge1xuICAgICAgZ2VvbWV0cnk6IG5ldyBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5KHRoaXMuX3NoYWRlciwgdGhpcy5fZ2VvRGVmKSxcbiAgICAgIGJ1ZmZlcjogbmV3IEZsb2F0MzJBcnJheShidWZmZXJTaXplICogMTMpLFxuICAgICAgY3VycmVudFNpemU6IDAsXG4gICAgfTtcblxuICAgIG5ld0FsaWFzLmdlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigwLCB2ZXJ0aWNlcywgdmVydGljZXMubGVuZ3RoKTtcbiAgICBuZXdBbGlhcy5nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudCh2ZXJ0aWNlcy5sZW5ndGggLyA2KTtcbiAgICB0aGlzLl9hbGlhc2VkR2VvbWV0cmllc01hcC5zZXQoYWxpYXMsIG5ld0FsaWFzKTtcbiAgfVxuICBkZWxldGVBbGlhcyhhbGlhczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYWxpYXNHZW9tZXRyeSA9IHRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLmdldChhbGlhcyk7XG4gICAgaWYgKCFhbGlhc0dlb21ldHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbGlhcyBub3QgZm91bmQsIGFsaWFzOiBcIiArIGFsaWFzKTtcbiAgICB9XG4gICAgdGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAuZGVsZXRlKGFsaWFzKTtcbiAgfVxuICBjbGVhckFsaWFzKGFsaWFzOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBhbGlhc0dlb21ldHJ5ID0gdGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAuZ2V0KGFsaWFzKTtcbiAgICBpZiAoIWFsaWFzR2VvbWV0cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFsaWFzIG5vdCBmb3VuZCwgYWxpYXM6IFwiICsgYWxpYXMpO1xuICAgIH1cbiAgICBhbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplID0gMDtcbiAgfVxuICBwdXNoQWxpYXMoXG4gICAgYWxpYXM6IG51bWJlcixcbiAgICBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBvcmllbnRhdGlvbjogZ2xtLlJlYWRvbmx5UXVhdCxcbiAgICBzY2FsZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgKTogdm9pZCB7XG5cbiAgICBjb25zdCBhbGlhc0dlb21ldHJ5ID0gdGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAuZ2V0KGFsaWFzKTtcbiAgICBpZiAoIWFsaWFzR2VvbWV0cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFsaWFzIG5vdCBmb3VuZCwgYWxpYXM6IFwiICsgYWxpYXMpO1xuICAgIH1cblxuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBwb3NpdGlvblswXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gcG9zaXRpb25bMV07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IHBvc2l0aW9uWzJdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBvcmllbnRhdGlvblswXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gb3JpZW50YXRpb25bMV07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IG9yaWVudGF0aW9uWzJdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBvcmllbnRhdGlvblszXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gc2NhbGVbMF07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IHNjYWxlWzFdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBzY2FsZVsyXTtcbiAgICBhbGlhc0dlb21ldHJ5LmJ1ZmZlclthbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplKytdID0gY29sb3JbMF07XG4gICAgYWxpYXNHZW9tZXRyeS5idWZmZXJbYWxpYXNHZW9tZXRyeS5jdXJyZW50U2l6ZSsrXSA9IGNvbG9yWzFdO1xuICAgIGFsaWFzR2VvbWV0cnkuYnVmZmVyW2FsaWFzR2VvbWV0cnkuY3VycmVudFNpemUrK10gPSBjb2xvclsyXTtcbiAgICAvLyBhbGlhc0dlb21ldHJ5LmN1cnJlbnRTaXplICs9IDEzO1xuXG4gIH1cblxuICBmbHVzaChcbiAgICBjb21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCxcbiAgICBsaWdodFBvczogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBjbGVhclN0YWNrOiBib29sZWFuID0gdHJ1ZVxuICApIHtcblxuICAgIGxldCBjYW5SZW5kZXIgPSBmYWxzZTtcbiAgICBbLi4udGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAudmFsdWVzKCldLmZvckVhY2godmFsID0+IHtcbiAgICAgIGlmICh2YWwuY3VycmVudFNpemUgPiAwKSB7XG4gICAgICAgIGNhblJlbmRlciA9IHRydWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghY2FuUmVuZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kU2hhZGVyKSA9PiB7XG4gICAgICBib3VuZFNoYWRlci5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGNvbXBvc2VkTWF0cml4KTtcbiAgICAgIGJvdW5kU2hhZGVyLnNldEZsb2F0M1VuaWZvcm0oJ3VfbGlnaHRQb3MnLCBsaWdodFBvc1swXSwgbGlnaHRQb3NbMV0sIGxpZ2h0UG9zWzJdKTtcblxuICAgICAgWy4uLnRoaXMuX2FsaWFzZWRHZW9tZXRyaWVzTWFwLnZhbHVlcygpXS5mb3JFYWNoKHZhbCA9PiB7XG5cbiAgICAgICAgaWYgKHZhbC5jdXJyZW50U2l6ZSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbC5nZW9tZXRyeS51cGRhdGVCdWZmZXIoMSwgdmFsLmJ1ZmZlciwgdmFsLmN1cnJlbnRTaXplKTtcbiAgICAgICAgdmFsLmdlb21ldHJ5LnNldEluc3RhbmNlZENvdW50KHZhbC5jdXJyZW50U2l6ZSAvIDEzKTtcbiAgICAgICAgdmFsLmdlb21ldHJ5LnJlbmRlcigpO1xuXG4gICAgICAgIGlmIChjbGVhclN0YWNrID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFsLmN1cnJlbnRTaXplID0gMDtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICBbLi4udGhpcy5fYWxpYXNlZEdlb21ldHJpZXNNYXAudmFsdWVzKCldLmZvckVhY2godmFsID0+IHtcbiAgICAgIHZhbC5jdXJyZW50U2l6ZSA9IDA7XG4gICAgfSk7XG4gIH1cbn1cbiIsCiAgICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxudW5pZm9ybSBtYXQ0IHVfY29tcG9zZWRNYXRyaXg7XG5cbmluIHZlYzMgYV92ZXJ0ZXhfcG9zaXRpb247XG5pbiB2ZWM0IGFfdmVydGV4X2NvbG9yO1xuXG5mbGF0IG91dCB2ZWM0IHZfY29sb3I7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KGFfdmVydGV4X3Bvc2l0aW9uLCAxLjApO1xuXG4gIHZfY29sb3IgPSBhX3ZlcnRleF9jb2xvcjtcbn1cbmAudHJpbSgpOyIsCiAgICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBsb3dwIGZsb2F0O1xuXG5mbGF0IGluIHZlYzQgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIG9fY29sb3IgPSB2X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAgICJpbXBvcnQgeyBncmFwaGljcyB9IGZyb20gJy4uLy4uLy4uLy4uJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDE0ICogMTAyNDtcblxuZXhwb3J0IGNsYXNzIFdpcmVGcmFtZXNTdGFja1JlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfc2hhZGVyOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRTaGFkZXI7XG4gIHByaXZhdGUgX2dlb21ldHJ5OiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5O1xuXG4gIHByaXZhdGUgX2J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoa19idWZmZXJTaXplKTtcbiAgcHJpdmF0ZSBfY3VycmVudFNpemU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaW5TaGFkZXI6IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcixcbiAgICBpbkdlb21ldHJ5RGVmOiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5RGVmaW5pdGlvblxuICApIHtcbiAgICB0aGlzLl9zaGFkZXIgPSBpblNoYWRlcjtcbiAgICBjb25zdCBnZW9tZXRyeURlZjogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeURlZmluaXRpb24gPSB7XG4gICAgICAuLi5pbkdlb21ldHJ5RGVmLFxuICAgICAgcHJpbWl0aXZlVHlwZTogZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5QcmltaXRpdmVUeXBlLmxpbmVzXG4gICAgfTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoaW5TaGFkZXIsIGdlb21ldHJ5RGVmKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRGbG9hdEJ1ZmZlclNpemUoMCwga19idWZmZXJTaXplKTtcbiAgfVxuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgKiAyID49IHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLl9zaGFkZXIuaXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbHBoYVZhbHVlID0gaW5Db2xvclszXSA/PyAxO1xuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMF0gPSBpblBvaW50QVswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAxXSA9IGluUG9pbnRBWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDJdID0gaW5Qb2ludEFbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgM10gPSBpbkNvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDRdID0gaW5Db2xvclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA1XSA9IGluQ29sb3JbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNl0gPSBhbHBoYVZhbHVlO1xuICAgIHRoaXMuX2N1cnJlbnRTaXplICs9IDc7XG5cbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAwXSA9IGluUG9pbnRCWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDFdID0gaW5Qb2ludEJbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMl0gPSBpblBvaW50QlsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAzXSA9IGluQ29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNF0gPSBpbkNvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDVdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA2XSA9IGFscGhhVmFsdWU7XG4gICAgdGhpcy5fY3VycmVudFNpemUgKz0gNztcbiAgfVxuXG4gIGNhblJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpemUgPiAwO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmNhblJlbmRlcigpKSByZXR1cm47XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGVCdWZmZXIoMCwgdGhpcy5fYnVmZmVyLCB0aGlzLl9jdXJyZW50U2l6ZSk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA3KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgLy8gcmVzZXQgdmVydGljZXNcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSA9IDA7XG4gIH1cbn1cbiIsCiAgICAiaW1wb3J0IHsgZ3JhcGhpY3MgfSBmcm9tICcuLi8uLi8uLi8uLic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBrX2J1ZmZlclNpemUgPSA3ICogMTAyNDtcblxuZXhwb3J0IGNsYXNzIFRyaWFuZ2xlc1N0YWNrUmVuZGVyZXIge1xuICBwcml2YXRlIF9zaGFkZXI6IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcjtcbiAgcHJpdmF0ZSBfZ2VvbWV0cnk6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnk7XG5cbiAgcHJpdmF0ZSBfYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShrX2J1ZmZlclNpemUpO1xuICBwcml2YXRlIF9jdXJyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpblNoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLklVbmJvdW5kU2hhZGVyLFxuICAgIGluR2VvbWV0cnlEZWY6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uXG4gICkge1xuICAgIHRoaXMuX3NoYWRlciA9IGluU2hhZGVyO1xuICAgIGNvbnN0IGdlb21ldHJ5RGVmOiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5RGVmaW5pdGlvbiA9IHtcbiAgICAgIC4uLmluR2VvbWV0cnlEZWYsXG4gICAgICBwcmltaXRpdmVUeXBlOiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLlByaW1pdGl2ZVR5cGUudHJpYW5nbGVzXG4gICAgfTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoaW5TaGFkZXIsIGdlb21ldHJ5RGVmKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRGbG9hdEJ1ZmZlclNpemUoMCwga19idWZmZXJTaXplKTtcbiAgfVxuXG4gIHB1c2hUcmlhbmdsZShcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QzogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgKyA3ICogNiA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5fc2hhZGVyLmlzQm91bmQoKSkge1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWxwaGFWYWx1ZSA9IGluQ29sb3JbM10gPz8gMTtcblxuICAgIC8vIDBcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAwXSA9IGluUG9pbnRBWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDFdID0gaW5Qb2ludEFbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMl0gPSBpblBvaW50QVsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAzXSA9IGluQ29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNF0gPSBpbkNvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDVdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA2XSA9IGFscGhhVmFsdWU7XG4gICAgdGhpcy5fY3VycmVudFNpemUgKz0gNztcblxuICAgIC8vIDJcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAwXSA9IGluUG9pbnRCWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDFdID0gaW5Qb2ludEJbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMl0gPSBpblBvaW50QlsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAzXSA9IGluQ29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNF0gPSBpbkNvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDVdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA2XSA9IGFscGhhVmFsdWU7XG4gICAgdGhpcy5fY3VycmVudFNpemUgKz0gNztcblxuICAgIC8vIDNcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAwXSA9IGluUG9pbnRDWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDFdID0gaW5Qb2ludENbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMl0gPSBpblBvaW50Q1syXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAzXSA9IGluQ29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNF0gPSBpbkNvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDVdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA2XSA9IGFscGhhVmFsdWU7XG4gICAgdGhpcy5fY3VycmVudFNpemUgKz0gNztcbiAgfVxuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgKiA2ID49IHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaWZmWCA9IGluUG9pbnRCWzBdIC0gaW5Qb2ludEFbMF07XG4gICAgY29uc3QgZGlmZlkgPSBpblBvaW50QlsxXSAtIGluUG9pbnRBWzFdO1xuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpICsgTWF0aC5QSSAqIDAuNTtcblxuICAgIGNvbnN0IHN0ZXBYID0gTWF0aC5jb3MoYW5nbGUpICogdGhpY2tuZXNzICogMC41O1xuICAgIGNvbnN0IHN0ZXBZID0gTWF0aC5zaW4oYW5nbGUpICogdGhpY2tuZXNzICogMC41O1xuXG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5Qb2ludEFbMF0gLSBzdGVwWCwgaW5Qb2ludEFbMV0gLSBzdGVwWSwgaW5Qb2ludEFbMl1dLFxuICAgICAgW2luUG9pbnRCWzBdIC0gc3RlcFgsIGluUG9pbnRCWzFdIC0gc3RlcFksIGluUG9pbnRCWzJdXSxcbiAgICAgIFtpblBvaW50QlswXSArIHN0ZXBYLCBpblBvaW50QlsxXSArIHN0ZXBZLCBpblBvaW50QlsyXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpblBvaW50QVswXSAtIHN0ZXBYLCBpblBvaW50QVsxXSAtIHN0ZXBZLCBpblBvaW50QVsyXV0sXG4gICAgICBbaW5Qb2ludEJbMF0gKyBzdGVwWCwgaW5Qb2ludEJbMV0gKyBzdGVwWSwgaW5Qb2ludEJbMl1dLFxuICAgICAgW2luUG9pbnRBWzBdICsgc3RlcFgsIGluUG9pbnRBWzFdICsgc3RlcFksIGluUG9pbnRBWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaFJvdGF0ZWRMaW5lKFxuICAgIGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBhbmdsZTogbnVtYmVyLFxuICAgIGxlbmd0aDogbnVtYmVyLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMucHVzaExpbmUoXG4gICAgICBbXG4gICAgICAgIGNlbnRlclswXSAtIGxlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgY2VudGVyWzFdIC0gbGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMl1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIGNlbnRlclswXSArIGxlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgY2VudGVyWzFdICsgbGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMl1cbiAgICAgIF0sXG4gICAgICB0aGlja25lc3MsXG4gICAgICBjb2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoXG4gICAgaW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgKiA2ID49IHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXhDb29yZDogZ2xtLlJlYWRvbmx5VmVjMiA9IFtcbiAgICAgIGluT3JpZ2luWzBdICsgaW5TaXplWzBdLFxuICAgICAgaW5PcmlnaW5bMV0gKyBpblNpemVbMV1cbiAgICBdO1xuXG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5PcmlnaW5bMF0sIGluT3JpZ2luWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbbWF4Q29vcmRbMF0sIG1heENvb3JkWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbaW5PcmlnaW5bMF0sIG1heENvb3JkWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcblxuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luT3JpZ2luWzBdLCBpbk9yaWdpblsxXSwgaW5PcmlnaW5bMl1dLFxuICAgICAgW21heENvb3JkWzBdLCBpbk9yaWdpblsxXSwgaW5PcmlnaW5bMl1dLFxuICAgICAgW21heENvb3JkWzBdLCBtYXhDb29yZFsxXSwgaW5PcmlnaW5bMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGNvbnN0IG9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgIGluQ2VudGVyWzBdIC0gaW5TaXplWzBdICogMC41LFxuICAgICAgaW5DZW50ZXJbMV0gLSBpblNpemVbMV0gKiAwLjUsXG4gICAgICBpbkNlbnRlclsyXVxuICAgIF07XG5cbiAgICB0aGlzLnB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShvcmlnaW4sIGluU2l6ZSwgaW5Db2xvcik7XG4gIH1cblxuICBjYW5SZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaXplID4gMDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5jYW5SZW5kZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigwLCB0aGlzLl9idWZmZXIsIHRoaXMuX2N1cnJlbnRTaXplKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudCh0aGlzLl9jdXJyZW50U2l6ZSAvIDcpO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkucmVuZGVyKCk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICAvLyByZXNldCB2ZXJ0aWNlc1xuICAgIHRoaXMuX2N1cnJlbnRTaXplID0gMDtcbiAgfVxufVxuIiwKICAgICJpbXBvcnQge1xuICBncmFwaGljc1xufSBmcm9tICcuLi8uLi8uLic7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBzdGFja1JlbmRlcmVyVmVydGV4IGZyb20gJy4vc2hhZGVycy9zdGFjay1yZW5kZXJlci5nbHNsLnZlcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHN0YWNrUmVuZGVyZXJGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvc3RhY2stcmVuZGVyZXIuZ2xzbC5mcmFnJztcblxuaW1wb3J0IHsgV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIgfSBmcm9tICcuL2ludGVybmFscy9XaXJlRnJhbWVzU3RhY2tSZW5kZXJlcic7XG5pbXBvcnQgeyBUcmlhbmdsZXNTdGFja1JlbmRlcmVyIH0gZnJvbSAnLi9pbnRlcm5hbHMvVHJpYW5nbGVzU3RhY2tSZW5kZXJlcic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGFja1JlbmRlcmVycyB7XG4gIHB1c2hUcmlhbmdsZShcbiAgICBpblBvc0E6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb3NCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9zQzogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApOiB2b2lkO1xuXG4gIHB1c2hRdWFkKFxuICAgIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApOiB2b2lkO1xuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcblxuICBwdXNoQ3Jvc3MoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hUaGlja0xpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hSb3RhdGVkTGluZShcbiAgICBjZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgYW5nbGU6IG51bWJlcixcbiAgICBsZW5ndGg6IG51bWJlcixcbiAgICB0aGlja25lc3M6IG51bWJlcixcbiAgICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKTogdm9pZDtcblxuICBwdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICk6IHZvaWQ7XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpOiB2b2lkO1xuICBjbGVhcigpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU3RhY2tSZW5kZXJlcnMgaW1wbGVtZW50cyBJU3RhY2tSZW5kZXJlcnMge1xuICBwcml2YXRlIF9zaGFkZXI6IGdyYXBoaWNzLndlYmdsMi5JVW5ib3VuZFNoYWRlcjtcblxuICBwcml2YXRlIF93aXJlRnJhbWVzU3RhY2tSZW5kZXJlcjogV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXI7XG4gIHByaXZhdGUgX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXI6IFRyaWFuZ2xlc1N0YWNrUmVuZGVyZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtKCdTdGFja1JlbmRlcmVycycsIHtcbiAgICAgIHZlcnRleFNyYzogc3RhY2tSZW5kZXJlclZlcnRleCxcbiAgICAgIGZyYWdtZW50U3JjOiBzdGFja1JlbmRlcmVyRnJhZ21lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiBbJ2FfdmVydGV4X3Bvc2l0aW9uJywgJ2FfdmVydGV4X2NvbG9yJ10sXG4gICAgICB1bmlmb3JtczogWyd1X2NvbXBvc2VkTWF0cml4J11cbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb0J1aWxkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeUJ1aWxkZXIoKTtcbiAgICBnZW9CdWlsZGVyXG4gICAgICAucmVzZXQoKVxuICAgICAgLnNldFByaW1pdGl2ZVR5cGUoJ2xpbmVzJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLnNldFZib0FzRHluYW1pYygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9jb2xvcicsICd2ZWM0ZicpO1xuXG4gICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIgPSBuZXcgV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyID0gbmV3IFRyaWFuZ2xlc1N0YWNrUmVuZGVyZXIoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIucHVzaExpbmUoaW5Qb2ludEEsIGluUG9pbnRCLCBpbkNvbG9yKTtcbiAgfVxuXG4gIHB1c2hDcm9zcyhcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIGNvbnN0IGNyb3NzVmVydGljZXM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgICAgIFtpbkNlbnRlclswXSAtIGluU2l6ZSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSArIGluU2l6ZSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0gLSBpblNpemUsIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0gKyBpblNpemUsIGluQ2VudGVyWzJdXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdIC0gaW5TaXplXSxcbiAgICAgIFtpbkNlbnRlclswXSwgaW5DZW50ZXJbMV0sIGluQ2VudGVyWzJdICsgaW5TaXplXVxuICAgIF07XG4gICAgY29uc3QgY3Jvc3NJbmRpY2VzOiBudW1iZXJbXSA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBjcm9zc0luZGljZXMubGVuZ3RoOyBpaSArPSAyKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhBID0gY3Jvc3NWZXJ0aWNlc1tpaSArIDBdO1xuICAgICAgY29uc3QgdmVydGV4QiA9IGNyb3NzVmVydGljZXNbaWkgKyAxXTtcbiAgICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLnB1c2hMaW5lKHZlcnRleEEsIHZlcnRleEIsIGluQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hUaGlja0xpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLnB1c2hMaW5lKFxuICAgICAgaW5Qb2ludEEsXG4gICAgICBpblBvaW50QixcbiAgICAgIHRoaWNrbmVzcyxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaFJvdGF0ZWRMaW5lKFxuICAgIGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBhbmdsZTogbnVtYmVyLFxuICAgIGxlbmd0aDogbnVtYmVyLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaFJvdGF0ZWRMaW5lKFxuICAgICAgY2VudGVyLFxuICAgICAgYW5nbGUsXG4gICAgICBsZW5ndGgsXG4gICAgICB0aGlja25lc3MsXG4gICAgICBjb2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoXG4gICAgaW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKFxuICAgICAgaW5PcmlnaW4sXG4gICAgICBpblNpemUsXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5wdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgICBpbkNlbnRlcixcbiAgICAgIGluU2l6ZSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaFRyaWFuZ2xlKFxuICAgIGluUG9zQTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvc0I6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb3NDOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaFRyaWFuZ2xlKGluUG9zQSwgaW5Qb3NCLCBpblBvc0MsIGluQ29sb3IpO1xuICB9XG5cbiAgcHVzaFF1YWQoXG4gICAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAwLCBpblBvc1syXV0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDEsIGluUG9zWzJdXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgaW5Qb3NbMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAwLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDAsIGluUG9zWzJdXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMSwgaW5Qb3NbMl1dLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCBpblBvc1syXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIGZsdXNoKGluQ29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIuY2FuUmVuZGVyKCkgJiZcbiAgICAgICF0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLmNhblJlbmRlcigpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kKSA9PiB7XG4gICAgICBib3VuZC5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGluQ29tcG9zZWRNYXRyaXgpO1xuXG4gICAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2FmZVJlbmRlcihpbkNvbXBvc2VkTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0LCBpbkNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kKSA9PiB7XG4gICAgICBib3VuZC5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGluQ29tcG9zZWRNYXRyaXgpO1xuXG4gICAgICBpbkNhbGxiYWNrKCk7XG5cbiAgICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLmZsdXNoKCk7XG4gICAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLmZsdXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5jbGVhcigpO1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIuY2xlYXIoKTtcbiAgfVxufVxuIiwKICAgICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIG1hdDQgdV9jb21wb3NlZE1hdHJpeDtcblxuaW4gdmVjMiBhX3ZlcnRleF9wb3NpdGlvbjtcbmluIHZlYzIgYV92ZXJ0ZXhfdGV4Q29vcmQ7XG5pbiB2ZWMzIGFfb2Zmc2V0X3Bvc2l0aW9uO1xuaW4gdmVjMiBhX29mZnNldF90ZXhDb29yZDtcbmluIHZlYzMgYV9vZmZzZXRfY29sb3I7XG5pbiBmbG9hdCBhX29mZnNldF9zY2FsZTtcblxub3V0IHZlYzIgdl90ZXhDb29yZDtcbmZsYXQgb3V0IHZlYzMgdl9jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIHZlYzMgcG9zaXRpb24gPSB2ZWMzKGFfdmVydGV4X3Bvc2l0aW9uLCAwLjApICogYV9vZmZzZXRfc2NhbGUgKyBhX29mZnNldF9wb3NpdGlvbjtcblxuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xuXG4gIHZfdGV4Q29vcmQgPSBhX3ZlcnRleF90ZXhDb29yZCArIGFfb2Zmc2V0X3RleENvb3JkO1xuICB2X2NvbG9yID0gYV9vZmZzZXRfY29sb3I7XG59XG5gLnRyaW0oKTsiLAogICAgImV4cG9ydCBkZWZhdWx0IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcblxudW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlO1xuXG5pbiB2ZWMyIHZfdGV4Q29vcmQ7XG5mbGF0IGluIHZlYzMgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZSh1X3RleHR1cmUsIHZfdGV4Q29vcmQpO1xuICBpZiAodGV4dHVyZUNvbG9yLmEgPCAwLjUpXG4gIHtcbiAgICBkaXNjYXJkO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIG9fY29sb3IgPSB2ZWM0KHZfY29sb3IsIHRleHR1cmVDb2xvci5hKTtcbiAgfVxufVxuYC50cmltKCk7IiwKICAgICJleHBvcnQgY29uc3QgYXNjaWlUZXh0dXJlSGV4ID1cbiAgJzdlN2UyOGZkMDNmZDA3ZmUwNGZlMGFmZjAyZmY3ZTRkZmQwY2ZkMDNmZDA3ZmUwNGZlMGFmZjAyZmYxYWZjMGRmZDEwZmMwOGZjMGZmZTU1ZmYxNWZiMGJmZDAzZmQwN2ZlMDRmZTA4ZjcwN2ZkMDRmZjA3ZmUwMmZlMGNmZDBmZmQwY2ZkMGFmZjAzZmUwM2ZmMGFmZTQ0ZmUxNWZiMGJmZDAzZmQwNGYyMDRmNjA3ZmQwM2ZlMDdmZTAyZmUwY2ZkMGVmZDBlZmQwYWZmMDJmZTAyZmYwYmZlNDNmZDE1ZmIwY2ZlMDNmZTA1ZjIwNGZlMDFmZjAyZmYwYWZkMDJmZDA3ZmUwMmZlMGJmZDBlZmQxMGZkMGFmYTBjZmU0MmZkMTZmYjFiZmUwNGZlMDdmZTAxZmYwMmZmMGVmZDA5ZmMxY2ZkMTJmZDA5ZmEwY2ZlNDFmZDE3ZmIxYmZlMDRmZTA3ZjcwYmZkMGFmYzA0ZmYxN2ZkMTJmZDA2ZjQwNWY2MTZmNjFjZmQxOWZkMWNmZTA0ZmUwOGY3MDlmZDBiZmIwMmZlMTdmZDEyZmQwNmY0MDVmNjE2ZjYxYmZkMWFmZDFjZmUwNGZlMGFmZjAyZmYwMWZlMDhmZDBiZmUwMmZhMTdmZDEyZmQwOWZhMGNmZTNlZmQzN2YyMDdmZjAyZmYwMWZlMDdmZDAyZmQwN2ZlMDNmYzE5ZmQxMGZkMGFmYTBjZmUzZGZkMzhmMjA0ZjYwN2ZlMDNmZDA3ZmUwM2ZkMWJmZDBlZmQwYWZmMDJmZTAyZmYwYmZlMGNmZDFkZmQwZGZkMWRmZDFjZmUwNGZlMDdmNzA4ZmYwNGZkMDdmZTAyZmIxYmZkMGNmZDBhZmYwM2ZlMDNmZjBhZmUwY2ZkMWRmZDBjZmQxZWZkMWNmZTA0ZmUwYWZmMDJmZjFhZmIwMmZlMWJmYzA4ZmMwZmZlMWNmZDFkZmQwYmZkMWZmZDFjZmUwNGZlMGFmZjAyZmY3YWZkN2U3ZTdlN2U3ZTdlMGVmZDE3ZmQxMGZjMGFmODBiZmUwYmY5MDlmOTBkZmQwOGY2MDlmYjA4ZjUwNmY4MDhmODJjZmQxOWZkMGRmODA3ZmQwNGZkMGFmZTBhZmQwM2ZkMDdmZDAzZmQwYmZjMDhmZDBmZmQwYmZkMDVmZDA1ZmQwNGZkMDZmZDA0ZmQyYWZkMWJmZDBiZmMwMmZjMDZmZDAzZmMwOWZkMGFmZDA0ZmQwNmZkMDRmZDA5ZmIwOGZkMGVmZDBjZmQwNWZkMDVmZDA0ZmQwNmZkMDRmZDA5ZmQwY2ZkMGVmZDFkZmQwYWZlMDVmZDA2ZmQwMmZiMDZmYTExZmQwZGZkMDhmZTAxZmQwOGZkMGRmZDBkZmQwNWZkMDVmZDA0ZmQwNmZkMDRmZDA5ZmQwY2ZkMGRmZDBhZjQwOWZkMTBmZDA2ZmQwMmZiMDZmYTEwZmQwZGZkMDhmZTAyZmQwOGZkMGRmZDE1ZmQwNWZiMDJmZDA2ZmQwNGZkMDlmZDBjZmQwY2ZkMGJmNDBhZmQwZWZkMDdmZDAxZmUwMWZkMDlmZDBmZmQwYmZiMDhmZTAzZmQwOGY4MDhmNzBlZmQwOGZhMDhmNjI2ZmQyM2ZkMGNmZDA4ZmQwMWZlMDFmZDA5ZmQwZWZkMGNmYjA4ZjYwNmY3MDdmNjBjZmQwOWZhMDlmNzI2ZmQyM2ZkMGJmZDA5ZmIwMmZkMDlmZDBkZmQxMGZkMDdmNjBjZmMwNmZkMDRmZDBiZmQwOGZkMDJmYjBkZmQwOWZkMGNmZDBjZmQwYmY0MGFmZDBjZmQwOWZiMDJmZDA5ZmQwY2ZkMTJmZDBiZmQwZmZkMDZmZDA0ZmQwYWZkMDlmZDA0ZmQwZGZkMDlmZDBjZmQwZGZkMGFmNDA5ZmQxOWZjMDNmZDA5ZmQwYmZkMDNmZDA2ZmQwNGZkMGJmZDA4ZmQwNGZkMDZmZDA0ZmQwOWZkMGFmZDA0ZmQwY2ZkMGFmZDBjZmQwZWZkMWRmZDFhZmQwNGZkMDlmZDBhZmQwNGZkMDZmZDAzZmQwY2ZkMDhmZDAzZmQwN2ZkMDRmZDA5ZmQwYWZkMDRmZDBiZmQxOWZkMTBmZDFiZmQwZmZkMGFmODA3ZjcwN2Y2MDdmOTBiZjkwN2Y5MDlmODBhZmQwYmY4MDlmYjJlZmQxOWZkMTBmZDdlNTFmZDE3ZmQxMWZkN2U3ZTdlN2UxM2Y4N2U3OGZkMDVmZDA4ZmMwOWY3MDlmOTA3ZjgwOGY2MDZmNjA4ZjkwN2ZkMDNmZDA3ZjkwZGY5MDVmYzAzZmQwNmZiMGJmZDA1ZmQwNWZkMDVmZDA4ZmIwOGZkMDVmZDA3ZmEwOWZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmQwOGZkMDRmZTA3ZmQwNGZlMDdmZDAzZmQwNmZkMDNmZDA5ZmQxMWZkMDhmZDAzZmQwN2ZkMGNmYzAzZmMwNWZkMDVmZDA3ZmQwMWZkMDdmZDA1ZmQwNmZkMDJmZDA4ZmQwM2ZkMDZmZDA0ZmQwN2ZkMDNmZDA3ZmQwNWZmMDdmZDA1ZmYwNmZkMDRmZDA2ZmQwM2ZkMDlmZDExZmQwOGZkMDJmZDA4ZmQwY2ZiMDFmYjA1ZmMwNGZkMDZmZDAzZmQwNmZkMDVmZDA1ZmQwNGZkMDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMGRmZDBjZmQwNGZkMDZmZDAzZmQwOWZkMTFmZDA4ZmQwMWZkMDlmZDBjZjUwNWZiMDNmZDA1ZmQwNWZkMDVmZDAyZmEwNWZkMDRmZDA3ZmQwM2ZkMDZmZDBlZmQwM2ZkMDdmZDAzZmUwOGZkMDNmZTA3ZmQwZGZkMDNmZDA5ZmQxMWZkMDhmYTBhZmQwY2Y1MDVmYTAyZmQwNWZkMDVmZDA1ZmQwMmZhMDVmZDA0ZmQwN2Y4MDdmZDBlZmQwM2ZkMDdmODA4ZjgwN2ZkMGRmNzA5ZmQxMWZkMDhmYjBiZmQwY2ZkMDFmZDAxZmQwNWZkMDFmZDAxZmQwNWZkMDVmZDA1ZmQwMmZhMDVmZDA0ZmQwN2Y4MDdmZDBlZmQwM2ZkMDdmODA4ZjgwN2ZkMGRmNzA5ZmQxMWZkMDhmYjBiZmQwY2ZkMDJmZjAyZmQwNWZkMDJmYTA1ZmQwNWZkMDVmZDAyZmEwNWY2MDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMDNmZTA4ZmQwM2ZlMDdmZDAyZmIwNmZkMDNmZDA5ZmQwYmZkMDNmZDA4ZmEwYWZkMGNmZDA1ZmQwNWZkMDNmYjA1ZmQwNWZkMDVmZDBkZmQwNGZkMDdmZDAzZmQwNmZkMGVmZDAzZmQwN2ZkMGRmZDBjZmQwNGZkMDZmZDAzZmQwOWZkMGJmZDAzZmQwOGZkMDFmZDA5ZmQwNWZmMDZmZDA1ZmQwNWZkMDRmYzA1ZmQwNWZkMDVmZDBkZmQwNGZkMDdmZDAzZmQwNmZkMDRmZDA3ZmQwM2ZkMDdmZDA1ZmYwN2ZkMGNmZDA0ZmQwNmZkMDNmZDA5ZmQwYmZkMDNmZDA4ZmQwMmZkMDhmZDA0ZmUwNmZkMDVmZDA1ZmQwNWZkMDZmZDAzZmQwNmZkMGRmZDA0ZmQwN2ZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmQwOGZkMDRmZTA3ZmQwZGZkMDNmZDA2ZmQwM2ZkMDlmZDBiZmQwM2ZkMDhmZDAzZmQwN2ZkMDNmZDA2ZmQwNWZkMDVmZDA1ZmQwN2ZkMDFmZDA3ZmQwZGZkMDRmZDA2ZjcwOWY5MDdmODA4ZjYwNmZiMGRmODA2ZmQwM2ZkMDdmOTBhZjkwOGZjMDNmZDA2ZjYwNmZkMDVmZDA1ZmQwNWZkMDhmYjBhZjg3ZTdlN2U3ZTdlN2U3ZTY4ZmUxYWY3MGFmYjA4ZjcwOGY4MDdmNTA1ZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwM2ZkMDdmZDAzZmQwN2Y2MDhmOTA3ZmYxMWY5MGFmYzFhZmQwM2ZkMDdmYzAxZmMwN2ZkMDNmZDA2ZmQwNGZkMDZmZTAyZmQwMmZlMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNGZkMDhmZDBiZmUxNGZkMDlmYTE5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA2ZmQwNGZkMDZmZjAzZmQwM2ZmMDVmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDVmZDAzZmQwN2ZkMDNmZDA3ZmUwNWZkMDhmZDBiZmQxM2ZkMDhmZDAyZmQxOGZkMDNmZDA2ZmQwNWZkMDZmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNmZkMDFmZDA4ZmQwM2ZkMDdmZjA1ZmQwOWZkMGNmZDEyZmQwN2ZkMDRmZDE3ZmQwM2ZkMDZmZDA1ZmQwNmZkMDNmZDA2ZmQxMWZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDdmYjA5ZmQwM2ZkMGNmZDBhZmQwZGZkMTFmZDI4ZjgwN2ZkMDVmZDA2ZjgwOGY5MGNmZDA5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwOGZkMGJmZDAxZmQwY2ZkMGJmZDBlZmQxMGZkMjhmODA3ZmQwNWZkMDZmODA5ZjkwYmZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZmMDJmZDA4ZmQwY2ZiMGNmZDBjZmQwZmZkMGZmZDI4ZmQwY2ZkMDNmYjA2ZmQwMmZkMGVmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmYwMmZkMDdmYjBjZmQwY2ZkMGRmZDEwZmQwZWZkMjhmZDBjZmQwMmZhMDZmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA3ZmQwM2ZkMDhmNzA3ZmQwMWZkMGJmZDBiZmQwNWZmMDhmZDExZmQwZGZkMjhmZDBkZjcwN2ZkMDNmZDA2ZmQwNGZkMGFmZDA5ZmQwM2ZkMDhmZDAxZmQwOWZjMDFmYzA2ZmQwM2ZkMGFmZDBhZmQwNWZlMDhmZDEyZmQwY2ZkMjhmZDBkZjcwN2ZkMDNmZDA2ZmQwNGZkMGFmZDA5ZmQwM2ZkMDlmYjBiZmQwMWZkMDdmZDAzZmQwYWZkMGFmZDA0ZmQwOGZkMTNmZDBiZmQyN2ZiMTJmZDA2ZmMwM2ZkMDdmODA5ZjkwOGY5MGJmZDBjZmQwMWZkMDdmZDAzZmQwOGY5MDhmNjA4ZjkxMGZkMDZmOTNjZmE3ZTU0ZjA3ZTcyZjA3ZTdlN2U3ZTBiZmQxZGZjMjFmYjE5ZmIxOGZjMTBmZDBmZmQwN2ZjMGRmYTM5ZmQxZWZkMjJmZDE5ZmQwMWZkMThmZDEwZmQwZmZkMDhmZDEwZmQzYmZkMWNmZDIyZmQxOWZkMDFmZDE4ZmQxMGZkMGZmZDA4ZmQxMGZkM2JmZDFjZmQyMmZkMTlmZDFjZmQyZGZkMTBmZDRhZjkwOWY4MDhmOTA5ZjgwOGY5MGFmZDBjZmIwMmZlMDdmZDAxZmMwOGZhMGNmYTA4ZmQwM2ZkMGFmZDA5ZjYwNmY4MDlmOTFlZmQwOGZkMDNmZDA2ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA3ZjgwOGZkMDNmZDA4ZmMwMmZkMGFmZDBmZmQwOGZkMDJmZDBiZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMWRmZDA4ZmQwM2ZkMDZmZDAzZmQwN2ZkMDNmZDA3ZmQwM2ZkMDdmODA4ZmQwM2ZkMDhmYzAyZmQwYWZkMGZmZDA4ZmQwMWZkMGNmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxOGY4MDhmZDAzZmQwNmZkMGRmZDAzZmQwN2Y3MDlmZDBiZmQwM2ZkMDhmZDAzZmQwYWZkMGZmZDA4ZmEwZGZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDE3ZmQwM2ZkMDhmZDAzZmQwNmZkMGRmZDAzZmQwN2ZkMGZmZDBiZmQwM2ZkMDhmZDAzZmQwYWZkMGZmZDA4ZmQwMWZkMGNmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxN2ZkMDNmZDA4ZmQwM2ZkMDZmZDAzZmQwN2ZkMDNmZDA3ZmQwM2ZkMDlmZDBjZjgwOGZkMDNmZDBhZmQwZmZkMDhmZDAyZmQwYmZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDE3ZmQwM2ZkMDhmZDAzZmQwNmZkMDNmZDA3ZmQwM2ZkMDdmZDAzZmQwOWZkMGRmOTA4ZmQwM2ZkMGFmZDBmZmQwOGZkMDNmZDBhZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMThmYjAyZmUwNmZlMDJmYjA4ZjkwOWZiMDJmZTA3ZjkwOGY5MGZmZDA3ZmMwM2ZkMDdmNzA2ZmQwM2ZkMDdmYzAzZmQwN2Y3MDZmZDA1ZmQwNWZkMDNmZDA4Zjk3OGZkMDNmZDI3ZmQwM2ZkN2U0YWY5MmFmYTdlN2U3ZTdlN2U3ZTE4ZmEwOWZjMDlmYTFlZmU0ZWZmNmVmZDBkZmMwZGZkMWNmYzRjZmU2ZWZkMGRmYzBkZmQxYmZhNGFmZDZlZmQwZGZjMGRmZDFhZmQwMmZkMDdmZTAyZmIwN2ZiMDJmZTA3ZmMwMmZkMDhmOTA4ZjcwN2ZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNWZkMDJmZDA5ZmQwM2ZkMDZmODBhZmQwZWZjMGVmZDA4ZmIwM2ZkMDVmZDA0ZmQwN2ZkMDNmZDA1ZmQwM2ZkMDlmNzA2ZmQwNGZlMDlmZDBiZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwMmZkMDlmZDAzZmQwNmZlMDNmZDA4ZmQyNGZkMDVmZDAxZmQwMmZkMDVmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmYzAyZmQwNmZkMDRmZTA5ZmQwYmZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNmZhMGFmZDAzZmQwNmZmMDNmZDA5ZmQyNGZkMDVmZDAyZmQwMWZkMDVmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmZDBkZmIwY2ZkMGJmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZmMDJmZDA3ZmMwYmZkMDNmZDA5ZmQwY2ZkMGVmYzBlZmQwN2ZkMDNmYjA2ZmUwNmZlMDdmZDAzZmQwNWZkMDNmZDA5ZmQwZmZiMGFmZDBiZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwN2ZjMGJmZDAzZmQwOGZkMGVmZDBkZmMwZGZkMTlmZTA2ZmUwN2ZkMDNmZDA1ZmQwM2ZkMDlmZDBjZmUwNGZkMDlmZDAxZmQwN2ZkMDNmZDA4ZmQwMWZkMDlmYzAxZmMwN2ZhMGJmOTA4ZmQwM2ZmMGJmZDBkZmMwZGZkMTlmZTA2ZmUwN2Y4MDdmODA5ZmQwY2ZlMDRmZDA5ZmQwMWZkMDdmZDAzZmQwOWZiMGJmZDAxZmQwN2ZkMDJmZDBiZmIwOGZkMDNmZTBiZmQwZGZjMGRmZDE5ZjYwN2ZkMTFmZDA4ZmIwY2Y5MGJmYjA5ZmIwMmZlMDlmZDBjZmQwMWZkMDdmZDAyZmQwZGZkMDhmODBjZmEwOWZjMDlmYTFhZjYwN2ZkMTFmZDdjZmQ2OWZiMGZmYjc3ZmEnO1xuIiwKICAgICJpbXBvcnQge1xuICBncmFwaGljc1xufSBmcm9tICcuLi8uLi8uLic7XG5cbi8vIGltcG9ydCAqIGFzIHNoYWRlcnMgZnJvbSAnLi9zaGFkZXJzJztcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHRleHRSZW5kZXJlclZlcnRleCBmcm9tICcuL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLnZlcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHRleHRSZW5kZXJlckZyYWdtZW50IGZyb20gJy4vc2hhZGVycy90ZXh0LXJlbmRlcmVyLmdsc2wuZnJhZyc7XG5cbmltcG9ydCB7IGFzY2lpVGV4dHVyZUhleCB9IGZyb20gJy4vaW50ZXJuYWxzL2FzY2lpVGV4dHVyZUhleCc7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBrX2dyaWRTaXplOiBnbG0uUmVhZG9ubHlWZWMyID0gWzE2LCA2XTtcbmNvbnN0IGtfdGV4Q29vcmQ6IGdsbS5SZWFkb25seVZlYzIgPSBbMSAvIGtfZ3JpZFNpemVbMF0sIDEgLyBrX2dyaWRTaXplWzFdXTtcblxuY29uc3Qga19idWZmZXJTaXplID0gOSAqIDEwMjQgKiA0O1xuXG50eXBlIEhvcml6b250YWxUZXh0QWxpZ24gPSAnbGVmdCcgfCAnY2VudGVyZWQnIHwgJ3JpZ2h0JztcbnR5cGUgVmVydGljYWxUZXh0QWxpZ24gPSAndG9wJyB8ICdjZW50ZXJlZCcgfCAnYm90dG9tJztcblxuZXhwb3J0IGludGVyZmFjZSBJVGV4dFJlbmRlcmVyIHtcbiAgc2V0VGV4dEFsaWduKFxuICAgIGluSG9yaXpvbnRhbFRleHRBbGlnbjogSG9yaXpvbnRhbFRleHRBbGlnbixcbiAgICBpblZlcnRpY2FsVGV4dEFsaWduOiBWZXJ0aWNhbFRleHRBbGlnblxuICApOiB0aGlzO1xuICBzZXRUZXh0U2NhbGUoaW5TY2FsZTogbnVtYmVyKTogdGhpcztcbiAgc2V0VGV4dENvbG9yKGluUmVkOiBudW1iZXIsIGluR3JlZW46IG51bWJlciwgaW5CbHVlOiBudW1iZXIpOiB0aGlzO1xuXG4gIHB1c2hUZXh0KGluTWVzc2FnZTogc3RyaW5nLCBpblBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMyKTogdGhpcztcblxuICBmbHVzaChjb21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCk6IHRoaXM7XG4gIGNsZWFyKCk6IHRoaXM7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0UmVuZGVyZXIgaW1wbGVtZW50cyBJVGV4dFJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfc2hhZGVyOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRTaGFkZXI7XG4gIHByaXZhdGUgX2dlb21ldHJ5OiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5O1xuICBwcml2YXRlIF90ZXh0dXJlOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRUZXh0dXJlID0gbmV3IGdyYXBoaWNzLndlYmdsMi5UZXh0dXJlKCk7XG4gIHByaXZhdGUgX3RleENvb3JkTWFwOiBNYXA8c3RyaW5nLCBnbG0uUmVhZG9ubHlWZWMyPjtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgX3RleHRTY2FsZTogbnVtYmVyID0gMTQ7XG4gIHByaXZhdGUgX3RleHRDb2xvcjogZ2xtLnZlYzMgPSBbMSwgMSwgMV07XG5cbiAgcHJpdmF0ZSBfaG9yaXpvbnRhbFRleHRBbGlnbjogSG9yaXpvbnRhbFRleHRBbGlnbiA9ICdsZWZ0JztcbiAgcHJpdmF0ZSBfdmVydGljYWxUZXh0QWxpZ246IFZlcnRpY2FsVGV4dEFsaWduID0gJ3RvcCc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtKCdUZXh0UmVuZGVyZXInLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHRleHRSZW5kZXJlclZlcnRleCxcbiAgICAgIGZyYWdtZW50U3JjOiB0ZXh0UmVuZGVyZXJGcmFnbWVudCxcbiAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgJ2FfdmVydGV4X3Bvc2l0aW9uJyxcbiAgICAgICAgJ2FfdmVydGV4X3RleENvb3JkJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X3Bvc2l0aW9uJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X3RleENvb3JkJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X2NvbG9yJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X3NjYWxlJ1xuICAgICAgXSxcbiAgICAgIHVuaWZvcm1zOiBbJ3VfY29tcG9zZWRNYXRyaXgnLCAndV90ZXh0dXJlJ11cbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb0J1aWxkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeUJ1aWxkZXIoKTtcbiAgICBnZW9CdWlsZGVyXG4gICAgICAucmVzZXQoKVxuICAgICAgLnNldFByaW1pdGl2ZVR5cGUoJ3RyaWFuZ2xlcycpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4X3Bvc2l0aW9uJywgJ3ZlYzJmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4X3RleENvb3JkJywgJ3ZlYzJmJylcbiAgICAgIC5zZXRTdHJpZGUoNCAqIDQpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5zZXRWYm9Bc0R5bmFtaWMoKVxuICAgICAgLnNldFZib0FzSW5zdGFuY2VkKClcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X3Bvc2l0aW9uJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X3RleENvb3JkJywgJ3ZlYzJmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X2NvbG9yJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X3NjYWxlJywgJ2Zsb2F0JylcbiAgICAgIC5zZXRTdHJpZGUoOSAqIDQpO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShcbiAgICAgIHRoaXMuX3NoYWRlcixcbiAgICAgIGdlb0J1aWxkZXIuZ2V0RGVmKClcbiAgICApO1xuXG4gICAgdHlwZSBWZXJ0ZXggPSB7IHBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMyOyB0ZXhDb29yZDogZ2xtLlJlYWRvbmx5VmVjMiB9O1xuXG4gICAgY29uc3QgdmVydGljZXM6IFtWZXJ0ZXgsIFZlcnRleCwgVmVydGV4LCBWZXJ0ZXhdID0gW1xuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogWyswLjUsIC0wLjVdLFxuICAgICAgICB0ZXhDb29yZDogW2tfdGV4Q29vcmRbMF0gKiAxLCBrX3RleENvb3JkWzFdICogMV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbLTAuNSwgLTAuNV0sXG4gICAgICAgIHRleENvb3JkOiBba190ZXhDb29yZFswXSAqIDAsIGtfdGV4Q29vcmRbMV0gKiAxXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsrMC41LCArMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMSwga190ZXhDb29yZFsxXSAqIDBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogWy0wLjUsICswLjVdLFxuICAgICAgICB0ZXhDb29yZDogW2tfdGV4Q29vcmRbMF0gKiAwLCBrX3RleENvb3JkWzFdICogMF1cbiAgICAgIH1cbiAgICBdO1xuXG4gICAgY29uc3QgaW5kaWNlcyA9IFsxLCAwLCAyLCAxLCAyLCAzXTtcblxuICAgIGNvbnN0IGxldHRlclZlcnRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kaWNlcykge1xuICAgICAgY29uc3QgdmVydGV4ID0gdmVydGljZXNbaW5kZXhdO1xuICAgICAgbGV0dGVyVmVydGljZXMucHVzaChcbiAgICAgICAgdmVydGV4LnBvc2l0aW9uWzBdLFxuICAgICAgICB2ZXJ0ZXgucG9zaXRpb25bMV0sXG4gICAgICAgIHZlcnRleC50ZXhDb29yZFswXSxcbiAgICAgICAgdmVydGV4LnRleENvb3JkWzFdXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigwLCBsZXR0ZXJWZXJ0aWNlcywgbGV0dGVyVmVydGljZXMubGVuZ3RoKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudChsZXR0ZXJWZXJ0aWNlcy5sZW5ndGggLyA0KTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRGbG9hdEJ1ZmZlclNpemUoMSwga19idWZmZXJTaXplKTtcblxuICAgIHRoaXMuX3RleENvb3JkTWFwID0gbmV3IE1hcDxzdHJpbmcsIGdsbS5SZWFkb25seVZlYzI+KFtcbiAgICAgIFsnICcsIFswICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnIScsIFsxICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXCInLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyMnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyQnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyUnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyYnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbXCInXCIsIFs3ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKCcsIFs4ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKScsIFs5ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJysnLCBbMTEgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycsJywgWzEyICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnLScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJy4nLCBbMTQgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycvJywgWzE1ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWycwJywgWzAgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycxJywgWzEgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycyJywgWzIgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyczJywgWzMgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc0JywgWzQgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc1JywgWzUgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc2JywgWzYgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc3JywgWzcgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc4JywgWzggKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc5JywgWzkgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc6JywgWzEwICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnOycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJzwnLCBbMTIgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc9JywgWzEzICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnPicsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJz8nLCBbMTUgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuXG4gICAgICBbJ0AnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0EnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0InLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0MnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0QnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0UnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0YnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0cnLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0gnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0knLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0onLCBbMTAgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydLJywgWzExICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnTCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ00nLCBbMTMgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydOJywgWzE0ICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnTycsIFsxNSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG5cbiAgICAgIFsnUCcsIFswICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUScsIFsxICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUicsIFsyICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUycsIFszICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVCcsIFs0ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVScsIFs1ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVicsIFs2ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVycsIFs3ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWCcsIFs4ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWScsIFs5ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1snLCBbMTEgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydcXFxcJywgWzEyICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ14nLCBbMTQgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydfJywgWzE1ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWydgJywgWzAgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydhJywgWzEgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydiJywgWzIgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydjJywgWzMgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydkJywgWzQgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydlJywgWzUgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydmJywgWzYgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydnJywgWzcgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydoJywgWzggKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydpJywgWzkgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydqJywgWzEwICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnaycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ2wnLCBbMTIgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydtJywgWzEzICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnbicsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ28nLCBbMTUgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuXG4gICAgICBbJ3AnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3EnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3InLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3MnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3QnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3UnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3YnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3cnLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3gnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3knLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3onLCBbMTAgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd7JywgWzExICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnfCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ30nLCBbMTMgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd+JywgWzE0ICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXVxuICAgIF0pO1xuXG4gICAgY29uc3Qgd2lkdGggPSAyNTY7XG4gICAgY29uc3QgaGVpZ2h0ID0gOTY7XG4gICAgY29uc3QgaW1hZ2VQaXhlbHMgPSBuZXcgVWludDhBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpO1xuICAgIHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgYXNjaWlUZXh0dXJlSGV4Lmxlbmd0aDsgaWkgKz0gMikge1xuICAgICAgICBsZXQgY3VyclNpemUgPVxuICAgICAgICAgIHBhcnNlSW50KGAke2FzY2lpVGV4dHVyZUhleC5zdWJzdHJpbmcoaWksIGlpICsgMil9MDAwMDAwYCwgMTYpID4+IDI0O1xuXG4gICAgICAgIGxldCBjdXJyVmFsID0gMDtcbiAgICAgICAgaWYgKGN1cnJTaXplIDwgMCkge1xuICAgICAgICAgIGN1cnJTaXplID0gLWN1cnJTaXplO1xuICAgICAgICAgIGN1cnJWYWwgPSAyNTU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgY3VyclNpemU7ICsraWkpIHtcbiAgICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAwXSA9IGN1cnJWYWw7XG4gICAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMV0gPSBjdXJyVmFsO1xuICAgICAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDJdID0gY3VyclZhbDtcbiAgICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAzXSA9IGN1cnJWYWw7XG4gICAgICAgICAgKytpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3RleHR1cmUuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuX3RleHR1cmUuYmluZCgoYm91bmRUZXh0dXJlKSA9PiB7XG4gICAgICBib3VuZFRleHR1cmUubG9hZEZyb21NZW1vcnkod2lkdGgsIGhlaWdodCwgaW1hZ2VQaXhlbHMpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VGV4dEFsaWduKFxuICAgIGluSG9yaXpvbnRhbFRleHRBbGlnbjogSG9yaXpvbnRhbFRleHRBbGlnbixcbiAgICBpblZlcnRpY2FsVGV4dEFsaWduOiBWZXJ0aWNhbFRleHRBbGlnblxuICApOiB0aGlzIHtcbiAgICB0aGlzLl9ob3Jpem9udGFsVGV4dEFsaWduID0gaW5Ib3Jpem9udGFsVGV4dEFsaWduO1xuICAgIHRoaXMuX3ZlcnRpY2FsVGV4dEFsaWduID0gaW5WZXJ0aWNhbFRleHRBbGlnbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRleHRTY2FsZShpblNjYWxlOiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl90ZXh0U2NhbGUgPSBpblNjYWxlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGV4dENvbG9yKGluUmVkOiBudW1iZXIsIGluR3JlZW46IG51bWJlciwgaW5CbHVlOiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl90ZXh0Q29sb3JbMF0gPSBpblJlZDtcbiAgICB0aGlzLl90ZXh0Q29sb3JbMV0gPSBpbkdyZWVuO1xuICAgIHRoaXMuX3RleHRDb2xvclsyXSA9IGluQmx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1c2hUZXh0KGluTWVzc2FnZTogc3RyaW5nLCBpblBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMyKTogdGhpcyB7XG4gICAgLy9cbiAgICAvLyB2YWxpZGF0ZVxuICAgIC8vXG5cbiAgICBpZiAoaW5NZXNzYWdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl90ZXh0U2NhbGUgPD0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsTGluZVdpZHRoOiBudW1iZXJbXSA9IFswXTtcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgaW5NZXNzYWdlLmxlbmd0aDsgKytpaSkge1xuICAgICAgaWYgKGluTWVzc2FnZVtpaV0gPT0gJ1xcbicpIHtcbiAgICAgICAgYWxsTGluZVdpZHRoLnB1c2goMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxMaW5lV2lkdGhbYWxsTGluZVdpZHRoLmxlbmd0aCAtIDFdICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFsbExpbmVXaWR0aC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBmb3IgKGNvbnN0IGN1cnJMaW5lIG9mIGFsbExpbmVXaWR0aCkge1xuICAgIC8vICAgaWYgKGN1cnJMaW5lID09PSAwKSB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIGxldCBsaW5lSW5kZXggPSAwO1xuXG4gICAgY29uc3QgY3VyclBvczogZ2xtLnZlYzIgPSBbMCwgMF07XG5cbiAgICAvL1xuICAgIC8vIHByZSBwcm9jZXNzXG4gICAgLy9cblxuICAgIGNvbnN0IGhTY2FsZSA9IHRoaXMuX3RleHRTY2FsZSAqIDAuNTtcblxuICAgIHN3aXRjaCAodGhpcy5faG9yaXpvbnRhbFRleHRBbGlnbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGN1cnJQb3NbMF0gPSBpblBvc2l0aW9uWzBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcmVkJzpcbiAgICAgICAgY3VyclBvc1swXSA9IGluUG9zaXRpb25bMF0gLSBhbGxMaW5lV2lkdGhbbGluZUluZGV4XSAqIGhTY2FsZSArIGhTY2FsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGN1cnJQb3NbMF0gPVxuICAgICAgICAgIGluUG9zaXRpb25bMF0gLVxuICAgICAgICAgIGFsbExpbmVXaWR0aFtsaW5lSW5kZXhdICogdGhpcy5fdGV4dFNjYWxlICtcbiAgICAgICAgICB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5fdmVydGljYWxUZXh0QWxpZ24pIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIGN1cnJQb3NbMV0gPSBpblBvc2l0aW9uWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcmVkJzpcbiAgICAgICAgY3VyclBvc1sxXSA9IGluUG9zaXRpb25bMV0gKyBhbGxMaW5lV2lkdGgubGVuZ3RoICogaFNjYWxlIC0gaFNjYWxlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGN1cnJQb3NbMV0gPVxuICAgICAgICAgIGluUG9zaXRpb25bMV0gLSAoYWxsTGluZVdpZHRoLmxlbmd0aCAtIDEpICogdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHByb2Nlc3NcbiAgICAvL1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGluTWVzc2FnZS5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGNvbnN0IGxldHRlciA9IGluTWVzc2FnZVtpaV07XG5cbiAgICAgIGlmIChsZXR0ZXIgPT0gJ1xcbicpIHtcbiAgICAgICAgbGluZUluZGV4ICs9IDE7XG5cbiAgICAgICAgLy8gZ28gYmFja1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2hvcml6b250YWxUZXh0QWxpZ24pIHtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGN1cnJQb3NbMF0gPSBpblBvc2l0aW9uWzBdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyZWQnOlxuICAgICAgICAgICAgY3VyclBvc1swXSA9XG4gICAgICAgICAgICAgIGluUG9zaXRpb25bMF0gLSBhbGxMaW5lV2lkdGhbbGluZUluZGV4XSAqIGhTY2FsZSArIGhTY2FsZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIGN1cnJQb3NbMF0gPVxuICAgICAgICAgICAgICBpblBvc2l0aW9uWzBdIC1cbiAgICAgICAgICAgICAgYWxsTGluZVdpZHRoW2xpbmVJbmRleF0gKiB0aGlzLl90ZXh0U2NhbGUgK1xuICAgICAgICAgICAgICB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJQb3NbMV0gLT0gdGhpcy5fdGV4dFNjYWxlOyAvLyBnbyBkb3duXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wdXNoTGV0dGVyKGxldHRlciwgY3VyclBvcyk7XG4gICAgICAgIC8vIGdvIHJpZ2h0XG4gICAgICAgIGN1cnJQb3NbMF0gKz0gdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgX3B1c2hMZXR0ZXIoaW5DaGFyYWN0ZXI6IHN0cmluZywgaW5Qb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMikge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDkgKiAxMCA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGV4Q29vcmQgPSB0aGlzLl90ZXhDb29yZE1hcC5nZXQoaW5DaGFyYWN0ZXIpO1xuXG4gICAgaWYgKCF0ZXhDb29yZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbCB0byBmaW5kIGEgbGV0dGVyLCBsZXR0ZXI9JHtpbkNoYXJhY3Rlcn1gKTtcblxuICAgIGZvciAobGV0IHl5ID0gLTE7IHl5IDw9IDE7ICsreXkpIHtcbiAgICAgIGZvciAobGV0IHh4ID0gLTE7IHh4IDw9IDE7ICsreHgpIHtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblswXSArIDIgKiB4eDtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblsxXSArIDIgKiB5eTtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gLTAuMTtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGV4Q29vcmRbMF07XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRleENvb3JkWzFdO1xuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSAwOyAvLyBibGFja0NvbG9yXG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IDA7IC8vIGJsYWNrQ29sb3JcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gMDsgLy8gYmxhY2tDb2xvclxuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblBvc2l0aW9uWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IDAuMDtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0ZXhDb29yZFswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0ZXhDb29yZFsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0Q29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dENvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRoaXMuX3RleHRDb2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0U2NhbGU7XG4gIH1cblxuICBmbHVzaChjb21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCk6IHRoaXMge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kU2hhZGVyKSA9PiB7XG4gICAgICBib3VuZFNoYWRlci5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGNvbXBvc2VkTWF0cml4KTtcbiAgICAgIGJvdW5kU2hhZGVyLnNldFRleHR1cmVVbmlmb3JtKCd1X3RleHR1cmUnLCB0aGlzLl90ZXh0dXJlLCAwKTtcblxuICAgICAgdGhpcy5fZ2VvbWV0cnkudXBkYXRlQnVmZmVyKDEsIHRoaXMuX2J1ZmZlciwgdGhpcy5fY3VycmVudFNpemUpO1xuICAgICAgdGhpcy5fZ2VvbWV0cnkuc2V0SW5zdGFuY2VkQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA5KTtcbiAgICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgZ3JhcGhpY3Mud2ViZ2wyLlRleHR1cmUudW5iaW5kKCk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsZWFyKCk6IHRoaXMge1xuICAgIC8vIHJlc2V0IHZlcnRpY2VzXG4gICAgdGhpcy5fY3VycmVudFNpemUgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLAogICAgImltcG9ydCB7IHN5c3RlbSwgZ3JhcGhpY3MgfSBmcm9tICcuLi8uLi8uLic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbnRlcmZhY2UgSW5kaWNhdG9yIHtcbiAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMyO1xuICBzaXplOiBnbG0uUmVhZG9ubHlWZWMyO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBsaW5lcz86IHtcbiAgICBhOiBnbG0uUmVhZG9ubHlWZWMyO1xuICAgIGI6IGdsbS5SZWFkb25seVZlYzI7XG4gICAgdGhpY2tuZXNzOiBudW1iZXI7XG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIH1bXTtcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG59XG5cbmNvbnN0IGRlZmF1bHRDb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9IFswLjIsIDAuMiwgMC4yXTtcbmNvbnN0IGFjdGl2YXRlZENvbG9yOiBnbG0uUmVhZG9ubHlWZWMzID0gWzAuMiwgMC42LCAwLjJdO1xuXG5jb25zdCBfcmVuZGVySW5kaWNhdG9yID0gKFxuICBjdXJySW5kaWNhdG9yOiBJbmRpY2F0b3IsXG4gIHN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcblxuICBjb25zdCB7IGNlbnRlciB9ID0gY3VyckluZGljYXRvcjtcblxuICBzdGFja1JlbmRlcmVycy5wdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgZ2xtLnZlYzMuZnJvbVZhbHVlcyhjZW50ZXJbMF0sIGNlbnRlclsxXSwgLTAuMyksXG4gICAgY3VyckluZGljYXRvci5zaXplLFxuICAgIFswLCAwLCAwXVxuICApO1xuXG4gIHN0YWNrUmVuZGVyZXJzLnB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBnbG0udmVjMy5mcm9tVmFsdWVzKGNlbnRlclswXSwgY2VudGVyWzFdLCAtMC4yKSxcbiAgICBbY3VyckluZGljYXRvci5zaXplWzBdIC0gMiwgY3VyckluZGljYXRvci5zaXplWzFdIC0gMl0sXG4gICAgY3VyckluZGljYXRvci5jb2xvclxuICApO1xuXG4gIGlmIChjdXJySW5kaWNhdG9yLnRleHQpIHtcbiAgICB0ZXh0UmVuZGVyZXJcbiAgICAgIC5zZXRUZXh0U2NhbGUoMTYpXG4gICAgICAuc2V0VGV4dEFsaWduKCdjZW50ZXJlZCcsICdjZW50ZXJlZCcpXG4gICAgICAucHVzaFRleHQoY3VyckluZGljYXRvci50ZXh0LCBjZW50ZXIpXG4gICAgICAuc2V0VGV4dEFsaWduKCdsZWZ0JywgJ3RvcCcpO1xuICB9XG5cbiAgaWYgKGN1cnJJbmRpY2F0b3IubGluZXMpIHtcbiAgICBjdXJySW5kaWNhdG9yLmxpbmVzLmZvckVhY2goKGN1cnJMaW5lKSA9PiB7XG4gICAgICBzdGFja1JlbmRlcmVycy5wdXNoVGhpY2tMaW5lKFxuICAgICAgICBbY2VudGVyWzBdICsgY3VyckxpbmUuYVswXSwgY2VudGVyWzFdICsgY3VyckxpbmUuYVsxXSwgMF0sXG4gICAgICAgIFtjZW50ZXJbMF0gKyBjdXJyTGluZS5iWzBdLCBjZW50ZXJbMV0gKyBjdXJyTGluZS5iWzFdLCAwXSxcbiAgICAgICAgY3VyckxpbmUudGhpY2tuZXNzLFxuICAgICAgICBjdXJyTGluZS5jb2xvclxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZEtleVN0cm9rZXNXaWRnZXRzID0gKFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMixcbiAgc3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIHRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbikgPT4ge1xuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIHRleHQ6ICdBXFxuUScsXG4gICAgY29sb3I6IHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0EnLCAnUScpXG4gICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICA6IGRlZmF1bHRDb2xvclxuICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcblxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMSwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIHRleHQ6ICdTJyxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnUycpID8gYWN0aXZhdGVkQ29sb3IgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG5cbiAgX3JlbmRlckluZGljYXRvcih7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSAqIDEsIGluUG9zWzFdICsgNDVdLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIHRleHQ6ICdXXFxuWicsXG4gICAgY29sb3I6IHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1cnLCAnWicpXG4gICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICA6IGRlZmF1bHRDb2xvclxuICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcblxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMiwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIHRleHQ6ICdEJyxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnRCcpID8gYWN0aXZhdGVkQ29sb3IgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkQXJyb3dTdHJva2VzV2lkZ2V0cyA9IChcbiAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzIsXG4gIHN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcbiAgLy8gYXJyb3cgbGVmdFxuICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICBjZW50ZXI6IFtpblBvc1swXSwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIGxpbmVzOiBbXG4gICAgICB7IGE6IFsxNSwgMF0sIGI6IFstOCwgMF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMCwgMTBdLCBiOiBbLTEyLCAtMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMCwgLTEwXSwgYjogWy0xMiwgMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9XG4gICAgXSxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dMZWZ0JylcbiAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgIDogZGVmYXVsdENvbG9yXG4gIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuXG4gIC8vIGFycm93IGRvd25cbiAgX3JlbmRlckluZGljYXRvcih7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSwgaW5Qb3NbMV1dLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIGxpbmVzOiBbXG4gICAgICB7IGE6IFswLCAxNV0sIGI6IFswLCAtOF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMTAsIDBdLCBiOiBbLTIsIC0xMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbLTEwLCAwXSwgYjogWzIsIC0xMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9XG4gICAgXSxcbiAgICBjb2xvcjogc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dEb3duJylcbiAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgIDogZGVmYXVsdENvbG9yXG4gIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuXG4gIC8vIGFycm93IHVwXG4gIF9yZW5kZXJJbmRpY2F0b3Ioe1xuICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUsIGluUG9zWzFdICsgNDVdLFxuICAgIHNpemU6IFs0MCwgNDBdLFxuICAgIGxpbmVzOiBbXG4gICAgICB7IGE6IFswLCAtMTVdLCBiOiBbMCwgOF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMTAsIDBdLCBiOiBbLTIsIDEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICB7IGE6IFstMTAsIDBdLCBiOiBbMiwgMTJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgIF0sXG4gICAgY29sb3I6IHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93VXAnKVxuICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgfSwgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG5cbiAgLy8gYXJyb3cgcmlnaHRcbiAgX3JlbmRlckluZGljYXRvcih7XG4gICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSAqIDIsIGluUG9zWzFdXSxcbiAgICBzaXplOiBbNDAsIDQwXSxcbiAgICBsaW5lczogW1xuICAgICAgeyBhOiBbLTE1LCAwXSwgYjogWzgsIDBdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfSxcbiAgICAgIHsgYTogWzAsIDEwXSwgYjogWzEyLCAtMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgeyBhOiBbMCwgLTEwXSwgYjogWzEyLCAyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICBdLFxuICAgIGNvbG9yOiBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd1JpZ2h0JylcbiAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgIDogZGVmYXVsdENvbG9yXG4gIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZEtleXNUb3VjaGVzV2lkZ2V0cyA9IChcbiAgaW5DYW52YXNFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzIsXG4gIHN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcbiAgaWYgKHN5c3RlbS5icm93c2VyLkdsb2JhbFRvdWNoTWFuYWdlci5pc1N1cHBvcnRlZChpbkNhbnZhc0VsZW1lbnQpKSB7XG4gICAgX3JlbmRlckluZGljYXRvcih7XG4gICAgICBjZW50ZXI6IFtpblBvc1swXSArIDExNSwgaW5Qb3NbMV1dLFxuICAgICAgc2l6ZTogWzIzMCwgNjBdLFxuICAgICAgdGV4dDogJ1RvdWNoIEV2ZW50c1xcblN1cHBvcnRlZFxcbihkb3VibGUgdGFwKScsXG4gICAgICBjb2xvcjogWzAsIDAuNSwgMF1cbiAgICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbiAgfSBlbHNlIHtcbiAgICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTE1LCBpblBvc1sxXV0sXG4gICAgICBzaXplOiBbMjMwLCA2MF0sXG4gICAgICB0ZXh0OiAnVG91Y2ggRXZlbnRzXFxuTm90IFN1cHBvcnRlZCcsXG4gICAgICBjb2xvcjogWzAuNSwgMCwgMF1cbiAgICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbiAgfVxuXG4gIGlmIChzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuY2FuQmVQb2ludGVyTG9ja2VkKGluQ2FudmFzRWxlbWVudCkpIHtcbiAgICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTA1LCBpblBvc1sxXSArIDcwXSxcbiAgICAgIHNpemU6IFsyMTAsIDYwXSxcbiAgICAgIHRleHQ6ICdNb3VzZVxcblN1cHBvcnRlZCcsXG4gICAgICBjb2xvcjogWzAsIDAuNSwgMF1cbiAgICB9LCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbiAgfSBlbHNlIHtcbiAgICBfcmVuZGVySW5kaWNhdG9yKHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTA1LCBpblBvc1sxXSArIDcwXSxcbiAgICAgIHNpemU6IFsyMTAsIDYwXSxcbiAgICAgIHRleHQ6ICdNb3VzZSBFdmVudHNcXG5Ob3QgU3VwcG9ydGVkJyxcbiAgICAgIGNvbG9yOiBbMC41LCAwLCAwXVxuICAgIH0sIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuICB9XG59O1xuXG4vLyBleHBvcnQgY29uc3QgcmVuZGVyQ29udHJvbHMgPSAoXG4vLyAgIGluQ2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsXG4vLyAgIHN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuLy8gICB0ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4vLyApID0+IHtcbi8vICAgLy8gY29uc3QgYWxsSW5kaWNhdG9yOiBJbmRpY2F0b3JbXSA9IFtdO1xuXG4vLyAgIGNvbnN0IGtleUV2ZW50c1BvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3ICsgMjAsIDE2NV07XG4vLyAgIGNvbnN0IHRvdWNoRXZlbnRzUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcgKyAyMCwgMjYwXTtcbi8vICAgY29uc3QgYm9hcmRQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNywgMzVdO1xuXG4vLyAgIGFkZEtleVN0cm9rZXNXaWRnZXRzKGtleUV2ZW50c1Bvcywgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG4vLyAgIGFkZEFycm93U3Ryb2tlc1dpZGdldHModG91Y2hFdmVudHNQb3MsIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuLy8gICBhZGRLZXlzVG91Y2hlc1dpZGdldHMoaW5DYW52YXNFbGVtZW50LCBib2FyZFBvcywgc3RhY2tSZW5kZXJlcnMsIHRleHRSZW5kZXJlcik7XG4vLyB9O1xuIiwKICAgICJpbXBvcnQgeyBzeXN0ZW0sIGdyYXBoaWNzIH0gZnJvbSAnLi4vLi4vLi4nO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNvbnN0IHJlbmRlckZwc01ldGVyID0gKFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICBpbkZyYW1lUHJvZmlsZXI6IHN5c3RlbS5tZXRyaWNzLklGcmFtZVByb2ZpbGVyLFxuICBpblN0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICBpblRleHRSZW5kZXJlcjogZ3JhcGhpY3MucmVuZGVyZXJzLklUZXh0UmVuZGVyZXIsXG4gIGluU2hvd0ZwcyA9IGZhbHNlXG4pID0+IHtcbiAgLy8gZnBzIG1ldGVyXG5cbiAgY29uc3Qga19kaXZpZGVyID0gNTtcbiAgY29uc3Qga192ZXJ0aWNhbFNpemUgPVxuICAgIE1hdGguY2VpbChpbkZyYW1lUHJvZmlsZXIubWF4RGVsdGEgLyBrX2RpdmlkZXIpICoga19kaXZpZGVyO1xuXG4gIHtcbiAgICAvLyBib3JkZXJcblxuICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKGluUG9zLCBpblNpemUsIFswLCAwLCAwLCAwLjVdKTtcblxuICAgIGNvbnN0IGFsbFZlcnRpY2VzOiBbXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICAgIGdsbS5SZWFkb25seVZlYzMsXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzXG4gICAgXSA9IFtcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgMF0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDAsIDBdLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMSwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCAwXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMSwgMF1cbiAgICBdO1xuXG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1swXSwgYWxsVmVydGljZXNbMV0sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1sxXSwgYWxsVmVydGljZXNbMl0sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1syXSwgYWxsVmVydGljZXNbM10sIFsxLCAxLCAxXSk7XG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShhbGxWZXJ0aWNlc1szXSwgYWxsVmVydGljZXNbMF0sIFsxLCAxLCAxXSk7XG4gIH0gLy8gYm9yZGVyXG5cbiAge1xuICAgIC8vIGRpdmlkZXJzXG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGN1cnJEaXZpZGVyID0ga19kaXZpZGVyO1xuICAgICAgY3VyckRpdmlkZXIgPCBrX3ZlcnRpY2FsU2l6ZTtcbiAgICAgIGN1cnJEaXZpZGVyICs9IGtfZGl2aWRlclxuICAgICkge1xuICAgICAgY29uc3QgcmF0aW8gPSBjdXJyRGl2aWRlciAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICBjb25zdCBwb2ludEE6IGdsbS5SZWFkb25seVZlYzMgPSBbXG4gICAgICAgIGluUG9zWzBdICsgMCxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiByYXRpbyxcbiAgICAgICAgMFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgaW5Qb3NbMF0gKyBpblNpemVbMF0sXG4gICAgICAgIGluUG9zWzFdICsgaW5TaXplWzFdICogcmF0aW8sXG4gICAgICAgIDBcbiAgICAgIF07XG5cbiAgICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaExpbmUocG9pbnRBLCBwb2ludEIsIFswLjUsIDAuNSwgMC41XSk7XG4gICAgfVxuICB9IC8vIGRpdmlkZXJzXG5cbiAge1xuICAgIC8vIGN1cnZlXG5cbiAgICBpZiAoaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhLmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCB3aWR0aFN0ZXAgPSBpblNpemVbMF0gLyBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoO1xuXG4gICAgICBsZXQgcHJldkRlbHRhID0gaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhWzBdO1xuICAgICAgbGV0IHByZXZDb29yZFggPSAwO1xuICAgICAgbGV0IHByZXZDb29yZFkgPSAoaW5TaXplWzFdICogcHJldkRlbHRhKSAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICBmb3IgKGxldCBpaSA9IDE7IGlpIDwgaW5GcmFtZVByb2ZpbGVyLmZyYW1lc0RlbHRhLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBjb25zdCBjdXJyRGVsdGEgPSBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGFbaWldO1xuICAgICAgICBjb25zdCBjdXJyQ29vcmRYID0gaWkgKiB3aWR0aFN0ZXA7XG4gICAgICAgIGNvbnN0IGN1cnJDb29yZFkgPSAoaW5TaXplWzFdICogY3VyckRlbHRhKSAvIGtfdmVydGljYWxTaXplO1xuXG4gICAgICAgIGNvbnN0IHBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgICBpblBvc1swXSArIHByZXZDb29yZFgsXG4gICAgICAgICAgaW5Qb3NbMV0gKyBwcmV2Q29vcmRZLFxuICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgcG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICAgIGluUG9zWzBdICsgY3VyckNvb3JkWCxcbiAgICAgICAgICBpblBvc1sxXSArIGN1cnJDb29yZFksXG4gICAgICAgICAgMFxuICAgICAgICBdO1xuXG4gICAgICAgIGluU3RhY2tSZW5kZXJlcnMucHVzaExpbmUocG9pbnRBLCBwb2ludEIsIFsxLCAxLCAxXSk7XG5cbiAgICAgICAgcHJldkRlbHRhID0gY3VyckRlbHRhO1xuICAgICAgICBwcmV2Q29vcmRYID0gY3VyckNvb3JkWDtcbiAgICAgICAgcHJldkNvb3JkWSA9IGN1cnJDb29yZFk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIGN1cnZlXG5cbiAge1xuICAgIC8vIGNvdW50ZXJcblxuICAgIGNvbnN0IGtfdGV4dFNjYWxlID0gMTQ7XG4gICAgY29uc3Qga190ZXh0SFNjYWxlID0ga190ZXh0U2NhbGUgKiAwLjU7XG5cbiAgICBjb25zdCBhdmVyYWdlVmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIuYXZlcmFnZURlbHRhO1xuICAgIGNvbnN0IG1heFZhbHVlID0gaW5GcmFtZVByb2ZpbGVyLm1heERlbHRhO1xuICAgIGNvbnN0IG1pblZhbHVlID0gaW5GcmFtZVByb2ZpbGVyLm1pbkRlbHRhO1xuXG4gICAgbGV0IGF2ZXJhZ2VTdHIgPSBgfiR7YXZlcmFnZVZhbHVlLnRvRml4ZWQoMCl9bXNgO1xuICAgIGxldCBtYXhTdHIgPSBgPCR7bWF4VmFsdWV9bXNgO1xuICAgIGxldCBtaW5TdHIgPSBgPiR7bWluVmFsdWV9bXNgO1xuXG4gICAgaWYgKGluU2hvd0ZwcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgX2dldEZwc1N0ciA9IChpblZhbDogbnVtYmVyKSA9PlxuICAgICAgICBpblZhbCA8IDk5OSA/IGluVmFsLnRvRml4ZWQoMCkgOiAnPz8/JztcblxuICAgICAgYXZlcmFnZVN0ciArPSBgXFxufiR7X2dldEZwc1N0cigxMDAwIC8gYXZlcmFnZVZhbHVlKX1mcHNgO1xuICAgICAgbWF4U3RyICs9IGBcXG48JHtfZ2V0RnBzU3RyKDEwMDAgLyBtYXhWYWx1ZSl9ZnBzYDtcbiAgICAgIG1pblN0ciArPSBgXFxuPiR7X2dldEZwc1N0cigxMDAwIC8gbWluVmFsdWUpfWZwc2A7XG4gICAgfVxuXG4gICAgaW5UZXh0UmVuZGVyZXJcbiAgICAgIC5zZXRUZXh0U2NhbGUoa190ZXh0U2NhbGUpXG4gICAgICAuc2V0VGV4dEFsaWduKCdsZWZ0JywgJ3RvcCcpXG4gICAgICAuc2V0VGV4dENvbG9yKDEuMCwgMS4wLCAwLjc1KVxuICAgICAgLnB1c2hUZXh0KGF2ZXJhZ2VTdHIsIFtpblBvc1swXSArIDcsIGluUG9zWzFdIC0gOF0pXG4gICAgICAuc2V0VGV4dEFsaWduKCdsZWZ0JywgJ2NlbnRlcmVkJylcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAwLjc1LCAwLjc1KVxuICAgICAgLnB1c2hUZXh0KG1heFN0ciwgW1xuICAgICAgICBpblBvc1swXSArIGluU2l6ZVswXSArIGtfdGV4dEhTY2FsZSxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gLSBrX3RleHRIU2NhbGUgKiAxXG4gICAgICBdKVxuICAgICAgLnNldFRleHRDb2xvcigwLjc1LCAxLjAsIDAuNzUpXG4gICAgICAucHVzaFRleHQobWluU3RyLCBbXG4gICAgICAgIGluUG9zWzBdICsgaW5TaXplWzBdICsga190ZXh0SFNjYWxlLFxuICAgICAgICBpblBvc1sxXSArIGtfdGV4dEhTY2FsZSAqIDFcbiAgICAgIF0pXG4gICAgICAuc2V0VGV4dENvbG9yKDEuMCwgMS4wLCAxLjApO1xuICB9IC8vIGNvdW50ZXJcbn07XG4iLAogICAgImV4cG9ydCBjbGFzcyBXZWJHTENvbnRleHQge1xuICBwcml2YXRlIHN0YXRpYyBfZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdGF0aWMgX2V4dGVuc2lvbkxvc2VDb250ZXh0OiBXRUJHTF9sb3NlX2NvbnRleHQgfCBudWxsID0gbnVsbDtcblxuICBzdGF0aWMgaW5pdGlhbGl6ZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgY29uc3QgcmVuZGVyaW5nQ29udGV4dEF0dHJpYnM6IFdlYkdMQ29udGV4dEF0dHJpYnV0ZXMgPSB7XG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBjYW52YXMgY29udGFpbnMgYW4gYWxwaGEgYnVmZmVyLlxuICAgICAgYWxwaGE6IGZhbHNlLFxuXG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIHBlcmZvcm0gYW50aS1hbGlhc2luZy5cbiAgICAgIGFudGlhbGlhczogZmFsc2UsXG5cbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgZHJhd2luZyBidWZmZXIgaGFzIGEgZGVwdGhcbiAgICAgIC8vIGJ1ZmZlciBvZiBhdCBsZWFzdCAxNiBiaXRzLlxuICAgICAgZGVwdGg6IHRydWUsXG5cbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgYSBjb250ZXh0IHdpbGwgYmUgY3JlYXRlZCBpZiB0aGVcbiAgICAgIC8vIHN5c3RlbSBwZXJmb3JtYW5jZSBpcyBsb3cuXG4gICAgICBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0OiBmYWxzZSxcblxuICAgICAgLy8gQSBoaW50IHRvIHRoZSB1c2VyIGFnZW50IGluZGljYXRpbmcgd2hhdCBjb25maWd1cmF0aW9uIG9mIEdQVSBpc1xuICAgICAgLy8gc3VpdGFibGUgZm9yIHRoZSBXZWJHTCBjb250ZXh0LiBQb3NzaWJsZSB2YWx1ZXMgYXJlOlxuICAgICAgLy8gXCJkZWZhdWx0XCI6XG4gICAgICAvLyAgICAgTGV0IHRoZSB1c2VyIGFnZW50IGRlY2lkZSB3aGljaCBHUFUgY29uZmlndXJhdGlvbiBpcyBtb3N0XG4gICAgICAvLyAgICAgc3VpdGFibGUuIFRoaXMgaXMgdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICAvLyBcImhpZ2gtcGVyZm9ybWFuY2VcIjpcbiAgICAgIC8vICAgICBQcmlvcml0aXplcyByZW5kZXJpbmcgcGVyZm9ybWFuY2Ugb3ZlciBwb3dlciBjb25zdW1wdGlvbi5cbiAgICAgIC8vIFwibG93LXBvd2VyXCI6XG4gICAgICAvLyAgICAgUHJpb3JpdGl6ZXMgcG93ZXIgc2F2aW5nIG92ZXIgcmVuZGVyaW5nIHBlcmZvcm1hbmNlLlxuICAgICAgcG93ZXJQcmVmZXJlbmNlOiAnaGlnaC1wZXJmb3JtYW5jZScsXG5cbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBjb21wb3NpdG9yIHdpbGwgYXNzdW1lIHRoZVxuICAgICAgLy8gZHJhd2luZyBidWZmZXIgY29udGFpbnMgY29sb3JzIHdpdGggcHJlLW11bHRpcGxpZWQgYWxwaGEuXG4gICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHRydWUsIC8vIHNsb3dlciBmcmFtZXJhdGUgd2hlbiBmYWxzZVxuXG4gICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgdHJ1ZSB0aGUgYnVmZmVycyB3aWxsIG5vdCBiZSBjbGVhcmVkIGFuZCB3aWxsXG4gICAgICAvLyBwcmVzZXJ2ZSB0aGVpciB2YWx1ZXMgdW50aWwgY2xlYXJlZCBvciBvdmVyd3JpdHRlbiBieSB0aGUgYXV0aG9yLlxuICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuXG4gICAgICAvLyBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIGRyYXdpbmcgYnVmZmVyIGhhcyBhXG4gICAgICAvLyBzdGVuY2lsIGJ1ZmZlciBvZiBhdCBsZWFzdCA4IGJpdHMuXG4gICAgICBzdGVuY2lsOiBmYWxzZVxuICAgIH07XG5cbiAgICBXZWJHTENvbnRleHQuX2dsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsMicsIHJlbmRlcmluZ0NvbnRleHRBdHRyaWJzKTtcblxuICAgIGlmICghV2ViR0xDb250ZXh0Ll9nbCkgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgY3JlYXRlIHdlYmdsIGNvbnRleHQnKTtcblxuICAgIFdlYkdMQ29udGV4dC5fZXh0ZW5zaW9uTG9zZUNvbnRleHQgPVxuICAgICAgV2ViR0xDb250ZXh0Ll9nbC5nZXRFeHRlbnNpb24oJ1dFQkdMX2xvc2VfY29udGV4dCcpO1xuXG4gICAgV2ViR0xDb250ZXh0Ll9nbC5nZXRFeHRlbnNpb24oJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnKTtcbiAgICBXZWJHTENvbnRleHQuX2dsLmdldEV4dGVuc2lvbignRVhUX2Zsb2F0X2JsZW5kJyk7XG4gIH1cblxuICAvL1xuICAvL1xuICAvL1xuXG4gIHN0YXRpYyBnZXRDb250ZXh0KCkge1xuICAgIGlmICghV2ViR0xDb250ZXh0Ll9nbCkgdGhyb3cgbmV3IEVycm9yKCd3ZWJnbCBjb250ZXh0IG5vdCBpbml0aWFsaXplZCcpO1xuICAgIHJldHVybiBXZWJHTENvbnRleHQuX2dsO1xuICB9XG5cbiAgLy9cbiAgLy9cbiAgLy9cblxuICBzdGF0aWMgZ2V0RXh0ZW5zaW9uTG9zZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIFdlYkdMQ29udGV4dC5fZXh0ZW5zaW9uTG9zZUNvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXh0ZW5zaW9uTG9zZUNvbnRleHRTdHJpY3QoKSB7XG4gICAgaWYgKCFXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb3NlIGNvbnRleHQgZXh0ZW5zaW9uIG5vdCBhdmFpbGFibGUnKTtcblxuICAgIHJldHVybiBXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0O1xuICB9XG59XG4iLAogICAgImltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcblxuZXhwb3J0IGVudW0gQ3ViZU1hcFR5cGUge1xuICBwb3NpdGl2ZVgsXG4gIG5lZ2F0aXZlWCxcbiAgcG9zaXRpdmVZLFxuICBuZWdhdGl2ZVksXG4gIHBvc2l0aXZlWixcbiAgbmVnYXRpdmVaXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdWJlTWFwVHlwZSA9IChpblR5cGU6IEN1YmVNYXBUeXBlKTogbnVtYmVyID0+IHtcbiAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICBzd2l0Y2ggKGluVHlwZSkge1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUucG9zaXRpdmVYOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWDtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWDpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1g7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5wb3NpdGl2ZVk6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9ZO1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUubmVnYXRpdmVZOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWTtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLnBvc2l0aXZlWjpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1o7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5uZWdhdGl2ZVo6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aO1xuICB9XG4gIC8vIHRocm93IG5ldyBFcnJvcignY3ViZSBtYXA6IGludmFsaWQgdHlwZScpO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJVW5ib3VuZEN1YmVNYXAge1xuICBpbml0aWFsaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZDtcbiAgcmF3QmluZCgpOiB2b2lkO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kQ3ViZU1hcCkgPT4gdm9pZCk6IHZvaWQ7XG4gIGdldFJhd09iamVjdCgpOiBXZWJHTFRleHR1cmU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kQ3ViZU1hcCB7XG4gIGFsbG9jYXRlKCk6IHZvaWQ7XG4gIGxvYWRGcm9tTWVtb3J5KGluVHlwZTogQ3ViZU1hcFR5cGUsIGluUGl4ZWxzOiBVaW50OEFycmF5KTogdm9pZDtcbiAgY29tcGxldGUoKTogdm9pZDtcbiAgZ2V0UmF3T2JqZWN0KCk6IFdlYkdMVGV4dHVyZTtcbn1cblxuZXhwb3J0IGNsYXNzIEN1YmVNYXAgaW1wbGVtZW50cyBJVW5ib3VuZEN1YmVNYXAsIElCb3VuZEN1YmVNYXAge1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taW5CdWZmZXJTaXplOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF90ZXh0dXJlOiBXZWJHTFRleHR1cmUgfCBudWxsID0gbnVsbDtcblxuICBpbml0aWFsaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHdpZHRoIDwgMSkgdGhyb3cgbmV3IEVycm9yKGBjdWJlIG1hcDogd2lkdGggaXMgPCAxLCBpbnB1dDogJHt3aWR0aH1gKTtcbiAgICBpZiAoaGVpZ2h0IDwgMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY3ViZSBtYXA6IGhlaWdodCBpcyA8IDEsIGlucHV0OiAke2hlaWdodH1gKTtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLl9taW5CdWZmZXJTaXplID0gdGhpcy5fd2lkdGggKiB0aGlzLl9oZWlnaHQgKiA0O1xuICB9XG5cbiAgcmF3QmluZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcignY3ViZSBtYXA6IG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCB0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRDdWJlTWFwKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5yYXdCaW5kKCk7XG5cbiAgICBpbkNhbGxiYWNrKHRoaXMpO1xuXG4gICAgQ3ViZU1hcC51bmJpbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyB1bmJpbmQoKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgbnVsbCk7XG4gIH1cblxuICBsb2FkRnJvbU1lbW9yeShpblR5cGU6IEN1YmVNYXBUeXBlLCBpblBpeGVsczogVWludDhBcnJheSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogbm90IGluaXRpYWxpemVkJyk7XG4gICAgaWYgKGluUGl4ZWxzLmxlbmd0aCA8IHRoaXMuX21pbkJ1ZmZlclNpemUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBjdWJlIG1hcDogbWlzcy1tYXRjaGluZyBwaXhlbHMgYnVmZmVyIHNpemUsIGlucHV0OiAke2luUGl4ZWxzLmxlbmd0aH1gXG4gICAgICApO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG5cbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgZ2V0Q3ViZU1hcFR5cGUoaW5UeXBlKSxcbiAgICAgIGxldmVsLFxuICAgICAgaW50ZXJuYWxGb3JtYXQsXG4gICAgICB0aGlzLl93aWR0aCxcbiAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgIGJvcmRlcixcbiAgICAgIHNyY0Zvcm1hdCxcbiAgICAgIHNyY1R5cGUsXG4gICAgICBpblBpeGVsc1xuICAgICk7XG4gIH1cblxuICBhbGxvY2F0ZSgpOiB2b2lkIHtcblxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3QgYm9yZGVyID0gMDtcbiAgICBjb25zdCBzcmNGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHNyY1R5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xuXG4gICAgY29uc3QgcGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fd2lkdGggKiB0aGlzLl9oZWlnaHQgKiA0KTtcblxuICAgIFtcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWCxcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWSxcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWixcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWCxcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWSxcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWixcbiAgICBdLmZvckVhY2goKHR5cGUpID0+IHtcblxuICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2V0Q3ViZU1hcFR5cGUodHlwZSksXG4gICAgICAgIGxldmVsLFxuICAgICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgYm9yZGVyLFxuICAgICAgICBzcmNGb3JtYXQsXG4gICAgICAgIHNyY1R5cGUsXG4gICAgICAgIHBpeGVsc1xuICAgICAgKTtcblxuICAgIH0pO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV9DVUJFX01BUCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgIGdsLlRFWFRVUkVfQ1VCRV9NQVAsXG4gICAgICBnbC5URVhUVVJFX01JTl9GSUxURVIsXG4gICAgICBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUlxuICAgICk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gIH1cblxuICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcignY3ViZSBtYXA6IG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuXG4gIGdldFJhd09iamVjdCgpIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZSBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIC8vIFRPRE86IHRoaXMgaXMgdWdseVxuICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICB9XG5cbn1cbiIsCiAgICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICBpbml0aWFsaXplKGRhdGE/OiBudW1iZXJbXSk6IHZvaWQ7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgcHJlQmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmREYXRhVGV4dHVyZSBleHRlbmRzIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICB1cGRhdGUoZGF0YTogbnVtYmVyW10pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YVRleHR1cmUgaW1wbGVtZW50cyBJQm91bmREYXRhVGV4dHVyZSB7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUoZGF0YTogbnVtYmVyW10gPSBbXSwgbnVtQ29tcG9uZW50czogbnVtYmVyID0gMSkge1xuICBpbml0aWFsaXplKGRhdGE6IG51bWJlcltdID0gW10pIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUpO1xuXG4gICAgLy8gbWFrZSBpdCBwb3NzaWJsZSB0byB1c2UgYSBub24tcG93ZXItb2YtMiB0ZXh0dXJlICsgd2UgZG9uJ3QgbmVlZCBhbnkgZmlsdGVyaW5nXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICAgIC8vIHRoaXMudXBkYXRlKGRhdGEsIG51bUNvbXBvbmVudHMpO1xuICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICB9XG5cbiAgLy8gdXBkYXRlKGRhdGE6IG51bWJlcltdLCBudW1Db21wb25lbnRzOiBudW1iZXIgPSAxKSB7XG4gIHVwZGF0ZShkYXRhOiBudW1iZXJbXSkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcblxuICAgIGNvbnN0IGV4cGFuZGVkRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YSk7XG5cbiAgICAvLyAvLyBleHBhbmQgdGhlIGRhdGEgdG8gNCB2YWx1ZXMgcGVyIHBpeGVsLlxuICAgIC8vIGNvbnN0IG51bUVsZW1lbnRzID0gZGF0YS5sZW5ndGggLyBudW1Db21wb25lbnRzO1xuICAgIC8vIGNvbnN0IGV4cGFuZGVkRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkobnVtRWxlbWVudHMgKiA0KTtcbiAgICAvLyBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtRWxlbWVudHM7ICsraWkpIHtcbiAgICAvLyAgIGNvbnN0IHNyY09mZnNldCA9IGlpICogbnVtQ29tcG9uZW50cztcbiAgICAvLyAgIGNvbnN0IGRzdE9mZnNldCA9IGlpICogNDtcbiAgICAvLyAgIGZvciAobGV0IGpqID0gMDsgamogPCBudW1Db21wb25lbnRzOyArK2pqKVxuICAgIC8vICAgICBleHBhbmRlZERhdGFbZHN0T2Zmc2V0ICsgampdID0gZGF0YVtzcmNPZmZzZXQgKyBqal07XG4gICAgLy8gfVxuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIC8vIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICAvLyBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkEzMkY7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SMzJGO1xuICAgIC8vIGNvbnN0IHdpZHRoID0gbnVtRWxlbWVudHM7XG4gICAgY29uc3Qgd2lkdGggPSBkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBoZWlnaHQgPSAxO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgLy8gY29uc3QgZm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBmb3JtYXQgPSBnbC5SRUQ7XG4gICAgLy8gY29uc3QgdHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG4gICAgY29uc3QgdHlwZSA9IGdsLkZMT0FUO1xuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgbGV2ZWwsXG4gICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgYm9yZGVyLFxuICAgICAgZm9ybWF0LFxuICAgICAgdHlwZSxcbiAgICAgIGV4cGFuZGVkRGF0YVxuICAgICk7XG4gIH1cblxuICByYXdCaW5kKCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIHByZUJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmREYXRhVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmF3QmluZCgpO1xuICAgIGluQ2FsbGJhY2sodGhpcyk7XG4gIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRGF0YVRleHR1cmUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnByZUJpbmQoaW5DYWxsYmFjayk7XG4gICAgRGF0YVRleHR1cmUudW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICB9XG59XG4iLAogICAgImltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcbmltcG9ydCB7IElCb3VuZFRleHR1cmUgfSBmcm9tICcuL1RleHR1cmUnO1xuaW1wb3J0IHsgQ3ViZU1hcFR5cGUsIElCb3VuZEN1YmVNYXAsIGdldEN1YmVNYXBUeXBlIH0gZnJvbSAnLi9DdWJlTWFwJztcblxuZXhwb3J0IGludGVyZmFjZSBJVW5ib3VuZEZyYW1lQnVmZmVyIHtcbiAgcmF3QmluZCgpOiB2b2lkO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRnJhbWVCdWZmZXIpID0+IHZvaWQpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuZEZyYW1lQnVmZmVyIHtcbiAgYXR0YWNoVGV4dHVyZSh0ZXh0dXJlOiBJQm91bmRUZXh0dXJlKTogdm9pZDtcbiAgYXR0YWNoQ3ViZU1hcCh0ZXh0dXJlOiBJQm91bmRDdWJlTWFwLCB0eXBlOiBDdWJlTWFwVHlwZSk6IHZvaWQ7XG4gIGdldFBpeGVscyhcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgb3V0RHN0OiBVaW50OEFycmF5XG4gICk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBGcmFtZUJ1ZmZlciBpbXBsZW1lbnRzIElVbmJvdW5kRnJhbWVCdWZmZXIsIElCb3VuZEZyYW1lQnVmZmVyIHtcbiAgcHJpdmF0ZSBfZnJhbWVCdWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgY29uc3QgdG1wRmJvID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgICBpZiAodG1wRmJvID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ251bGwgZnJhbWUgYnVmZmVyIG9iamVjdCcpO1xuICAgIHRoaXMuX2ZyYW1lQnVmZmVyID0gdG1wRmJvO1xuICB9XG5cbiAgcmF3QmluZCgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9mcmFtZUJ1ZmZlcik7XG4gIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRnJhbWVCdWZmZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnJhd0JpbmQoKTtcblxuICAgIGluQ2FsbGJhY2sodGhpcyk7XG5cbiAgICBGcmFtZUJ1ZmZlci51bmJpbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyB1bmJpbmQoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbiAgfVxuXG4gIGF0dGFjaFRleHR1cmUodGV4dHVyZTogSUJvdW5kVGV4dHVyZSkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIC8vIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fZnJhbWVCdWZmZXIpO1xuXG4gICAgLy8gdGV4dHVyZS5yYXdCaW5kKCk7XG5cbiAgICBjb25zdCBtaXBtYXBMZXZlbCA9IDA7XG5cbiAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChcbiAgICAgIGdsLkZSQU1FQlVGRkVSLFxuICAgICAgZ2wuQ09MT1JfQVRUQUNITUVOVDAsXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgdGV4dHVyZS5nZXRSYXdPYmplY3QoKSxcbiAgICAgIG1pcG1hcExldmVsXG4gICAgKTtcbiAgfVxuXG4gIGF0dGFjaEN1YmVNYXAodGV4dHVyZTogSUJvdW5kQ3ViZU1hcCwgdHlwZTogQ3ViZU1hcFR5cGUpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX2ZyYW1lQnVmZmVyKTtcblxuICAgIC8vIHRleHR1cmUucmF3QmluZCgpO1xuXG4gICAgY29uc3QgbWlwbWFwTGV2ZWwgPSAwO1xuXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXG4gICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgZ2V0Q3ViZU1hcFR5cGUodHlwZSksXG4gICAgICB0ZXh0dXJlLmdldFJhd09iamVjdCgpLFxuICAgICAgbWlwbWFwTGV2ZWxcbiAgICApO1xuICB9XG5cbiAgZ2V0UGl4ZWxzKFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBvdXREc3Q6IFVpbnQ4QXJyYXlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnJlYWRQaXhlbHMoeCwgeSwgd2lkdGgsIGhlaWdodCwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgb3V0RHN0KTtcbiAgfVxufVxuIiwKICAgICJpbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5pbXBvcnQgeyBJVW5ib3VuZFNoYWRlciwgU2hhZGVyUHJvZ3JhbSB9IGZyb20gJy4vU2hhZGVyUHJvZ3JhbSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgR2VvbWV0cnlXcmFwcGVyIHtcbiAgZXhwb3J0IGNvbnN0IEJ5dGVzUGVyUGl4ZWwgPSA0OyAvLyBmbG9hdCAoZmxvYXQzMiA9IDQgYnl0ZXMpXG5cbiAgZXhwb3J0IGVudW0gQXR0cmlidXRlVHlwZSB7XG4gICAgZmxvYXQsXG4gICAgdmVjMmYsXG4gICAgdmVjM2YsXG4gICAgdmVjNGYsXG4gICAgbWF0M2YsXG4gICAgbWF0NGZcbiAgfVxuXG4gIGNvbnN0IGdldEF0dHJUeXBlU2l6ZSA9IChpblR5cGU6IEF0dHJpYnV0ZVR5cGUpID0+IHtcbiAgICBzd2l0Y2ggKGluVHlwZSkge1xuICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLmZsb2F0OlxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjM2Y6XG4gICAgICAgIHJldHVybiAzO1xuICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzRmOlxuICAgICAgICByZXR1cm4gNDtcbiAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgICAgcmV0dXJuIDk7XG4gICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUubWF0NGY6XG4gICAgICAgIHJldHVybiAxNjtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGVudW0gUHJpbWl0aXZlVHlwZSB7XG4gICAgbGluZXMsXG4gICAgdHJpYW5nbGVzLFxuICAgIHRyaWFuZ2xlU3RyaXBcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmJvQXR0ciB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGU7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmJvRGVmaW5pdGlvbiB7XG4gICAgYXR0cnM6IFZib0F0dHJbXTtcbiAgICBzdHJpZGU/OiBudW1iZXI7XG4gICAgaW5zdGFuY2VkOiBib29sZWFuO1xuICAgIGR5bmFtaWM/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBHZW9tZXRyeURlZmluaXRpb24ge1xuICAgIHZib3M6IFZib0RlZmluaXRpb25bXTtcbiAgICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlO1xuICB9XG5cbiAgZXhwb3J0IGNsYXNzIEdlb21ldHJ5IHtcbiAgICBwcml2YXRlIF9kZWY6IEdlb21ldHJ5RGVmaW5pdGlvbjtcbiAgICBwcml2YXRlIF92YW86IFdlYkdMVmVydGV4QXJyYXlPYmplY3RPRVM7XG4gICAgcHJpdmF0ZSBfdmJvczogeyBvYmplY3Q6IFdlYkdMQnVmZmVyOyBtYXhTaXplOiBudW1iZXI7IGR5bmFtaWM6IGJvb2xlYW4gfVtdO1xuICAgIHByaXZhdGUgX3ByaW1pdGl2ZVR5cGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9wcmltaXRpdmVTdGFydDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9wcmltaXRpdmVDb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9pbnN0YW5jZUNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2lzSW5zdGFuY2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihzaGFkZXI6IElVbmJvdW5kU2hhZGVyLCBkZWY6IEdlb21ldHJ5RGVmaW5pdGlvbikge1xuICAgICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgICBpZiAoZGVmLnZib3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZW1wdHkgdmJvIGRlZmluaXRpb24nKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCB2Ym8gb2YgZGVmLnZib3MpIHtcbiAgICAgICAgaWYgKHZiby5hdHRycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VtcHR5IHZibyBhdHRyaWJ1dGUgZGVmaW5pdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZiby5hdHRycykge1xuICAgICAgICAgIGlmICghc2hhZGVyLmhhc0F0dHJpYnV0ZShhdHRyLm5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGF0dHJpYnV0ZSBub3QgZm91bmQsIG5hbWU9XCIke2F0dHIubmFtZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9kZWYgPSBkZWY7XG5cbiAgICAgIHN3aXRjaCAoZGVmLnByaW1pdGl2ZVR5cGUpIHtcbiAgICAgICAgY2FzZSBQcmltaXRpdmVUeXBlLmxpbmVzOlxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUgPSBnbC5MSU5FUztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBQcmltaXRpdmVUeXBlLnRyaWFuZ2xlczpcbiAgICAgICAgICB0aGlzLl9wcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVTO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFByaW1pdGl2ZVR5cGUudHJpYW5nbGVTdHJpcDpcbiAgICAgICAgICB0aGlzLl9wcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVfU1RSSVA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmltaXRpdmUgdHlwZSBub3QgZm91bmQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3VmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICAgIGlmICghbmV3VmFvKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZmFpbCBvIGNyZWF0ZSBhIHZhbyB1bml0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZhbyA9IG5ld1ZhbztcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLl92YW8pO1xuXG4gICAgICAvL1xuXG4gICAgICB0aGlzLl92Ym9zID0gW107XG4gICAgICBmb3IgKGNvbnN0IHZib0RlZiBvZiB0aGlzLl9kZWYudmJvcykge1xuICAgICAgICBjb25zdCBuZXdWYm8gPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgaWYgKCFuZXdWYm8pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhaWwgbyBjcmVhdGUgYSB2Ym8gdW5pdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmJvcy5wdXNoKHtcbiAgICAgICAgICBvYmplY3Q6IG5ld1ZibyxcbiAgICAgICAgICBtYXhTaXplOiAwLFxuICAgICAgICAgIGR5bmFtaWM6IHZib0RlZi5keW5hbWljIHx8IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBuZXdWYm8pO1xuXG4gICAgICAgIGxldCBzdHJpZGUgPSB2Ym9EZWYuc3RyaWRlIHx8IDA7XG4gICAgICAgIGlmICghc3RyaWRlKSB7XG4gICAgICAgICAgLy8gYXV0byBkZXRlcm1pbmUgc3RyaWRlIHZhbHVlXG4gICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZib0RlZi5hdHRycykge1xuICAgICAgICAgICAgc3dpdGNoIChhdHRyLnR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLmZsb2F0OlxuICAgICAgICAgICAgICAgIHN0cmlkZSArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjMmY6XG4gICAgICAgICAgICAgICAgc3RyaWRlICs9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMzZjpcbiAgICAgICAgICAgICAgICBzdHJpZGUgKz0gMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzRmOlxuICAgICAgICAgICAgICAgIHN0cmlkZSArPSA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUubWF0M2Y6XG4gICAgICAgICAgICAgICAgc3RyaWRlICs9IDk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQ0ZjpcbiAgICAgICAgICAgICAgICBzdHJpZGUgKz0gMTY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmlkZSAqPSBCeXRlc1BlclBpeGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZib0RlZi5hdHRycykge1xuICAgICAgICAgIGxldCByb3dTaXplID0gMTtcbiAgICAgICAgICBsZXQgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICBzd2l0Y2ggKGF0dHIudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLmZsb2F0OlxuICAgICAgICAgICAgICByb3dTaXplID0gMTtcbiAgICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjMmY6XG4gICAgICAgICAgICAgIHJvd1NpemUgPSAyO1xuICAgICAgICAgICAgICB0b3RhbFJvd3MgPSAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMzZjpcbiAgICAgICAgICAgICAgcm93U2l6ZSA9IDM7XG4gICAgICAgICAgICAgIHRvdGFsUm93cyA9IDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzRmOlxuICAgICAgICAgICAgICByb3dTaXplID0gNDtcbiAgICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUubWF0M2Y6XG4gICAgICAgICAgICAgIHJvd1NpemUgPSAzO1xuICAgICAgICAgICAgICB0b3RhbFJvd3MgPSAzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQ0ZjpcbiAgICAgICAgICAgICAgcm93U2l6ZSA9IDQ7XG4gICAgICAgICAgICAgIHRvdGFsUm93cyA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGF0dHJMb2NhdGlvbiA9IHNoYWRlci5nZXRBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblxuICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoZSBpbmRleCBpcyAwIG9uIGs+MCBhbmQgYXNzZXJ0L3Rocm93IG9uIGl0XG5cbiAgICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgdG90YWxSb3dzOyArK2lpKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRySWQgPSBhdHRyTG9jYXRpb24gKyBpaTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gKGF0dHIuaW5kZXggKyBpaSAqIHJvd1NpemUpICogQnl0ZXNQZXJQaXhlbDtcblxuICAgICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cklkKTtcbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgICAgICAgIGF0dHJJZCxcbiAgICAgICAgICAgICAgcm93U2l6ZSxcbiAgICAgICAgICAgICAgZ2wuRkxPQVQsXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICBzdHJpZGUsXG4gICAgICAgICAgICAgIHJvd0luZGV4XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodmJvRGVmLmluc3RhbmNlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGF0dHJJZCwgMSk7XG4gICAgICAgICAgICAgIHRoaXMuX2lzSW5zdGFuY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9cblxuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAgIGZvciAoY29uc3QgdmJvIG9mIHRoaXMuX3Zib3MpIGdsLmRlbGV0ZUJ1ZmZlcih2Ym8ub2JqZWN0KTtcbiAgICAgIHRoaXMuX3Zib3MubGVuZ3RoID0gMDtcblxuICAgICAgZ2wuZGVsZXRlVmVydGV4QXJyYXkodGhpcy5fdmFvKTtcbiAgICB9XG5cbiAgICBzZXRCdWZmZXJTaXplKGluZGV4OiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKSB7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX3Zib3MubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYnVmZmVyIGF2YWlsYWJsZSB0byB0aGF0IGluZGV4Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpblNpemUgPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJWYm8gPSB0aGlzLl92Ym9zW2luZGV4XTtcblxuICAgICAgaWYgKGluU2l6ZSA8IGN1cnJWYm8ubWF4U2l6ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGN1cnJWYm8ubWF4U2l6ZSA9IGluU2l6ZTtcblxuICAgICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgICBjb25zdCB1c2FnZSA9IGN1cnJWYm8uZHluYW1pYyA/IGdsLkRZTkFNSUNfRFJBVyA6IGdsLlNUQVRJQ19EUkFXO1xuXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3VyclZiby5vYmplY3QpO1xuICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGluU2l6ZSwgdXNhZ2UpO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xuICAgIH1cblxuICAgIHNldEZsb2F0QnVmZmVyU2l6ZShpbmRleDogbnVtYmVyLCBpblNpemU6IG51bWJlcikge1xuICAgICAgdGhpcy5zZXRCdWZmZXJTaXplKGluZGV4LCBpblNpemUgKiA0KTtcbiAgICB9XG5cbiAgICB1cGRhdGVCdWZmZXIoXG4gICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgdmVydGljZXM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiB8IFJlYWRvbmx5PEZsb2F0MzJBcnJheT4sXG4gICAgICBpblNpemU6IG51bWJlclxuICAgICkge1xuICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl92Ym9zLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGJ1ZmZlciBhdmFpbGFibGUgdG8gdGhhdCBpbmRleCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5TaXplIDw9IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAgIGNvbnN0IGJ1ZmZlciA9XG4gICAgICAgIHZlcnRpY2VzIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5XG4gICAgICAgICAgPyB2ZXJ0aWNlc1xuICAgICAgICAgIDogbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlcyk7XG5cbiAgICAgIGNvbnN0IGN1cnJWYm8gPSB0aGlzLl92Ym9zW2luZGV4XTtcblxuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGN1cnJWYm8ub2JqZWN0KTtcblxuICAgICAgaWYgKGluU2l6ZSA+IGN1cnJWYm8ubWF4U2l6ZSkge1xuICAgICAgICBjdXJyVmJvLm1heFNpemUgPSBpblNpemU7XG4gICAgICAgIGNvbnN0IHVzYWdlID0gY3VyclZiby5keW5hbWljID8gZ2wuRFlOQU1JQ19EUkFXIDogZ2wuU1RBVElDX0RSQVc7XG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIsIHVzYWdlLCAwLCBpblNpemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2wuYnVmZmVyU3ViRGF0YShnbC5BUlJBWV9CVUZGRVIsIDAsIGJ1ZmZlciwgMCwgaW5TaXplKTtcbiAgICAgIH1cblxuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGlmICh0aGlzLl9wcmltaXRpdmVDb3VudCA9PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzSW5zdGFuY2VkICYmIHRoaXMuX2luc3RhbmNlQ291bnQgPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuX3Zhbyk7XG5cbiAgICAgIGlmICh0aGlzLl9pc0luc3RhbmNlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKFxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUsXG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlU3RhcnQsXG4gICAgICAgICAgdGhpcy5fcHJpbWl0aXZlQ291bnQsXG4gICAgICAgICAgdGhpcy5faW5zdGFuY2VDb3VudFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhcbiAgICAgICAgICB0aGlzLl9wcmltaXRpdmVUeXBlLFxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZVN0YXJ0LFxuICAgICAgICAgIHRoaXMuX3ByaW1pdGl2ZUNvdW50XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcbiAgICB9XG5cbiAgICBzZXRQcmltaXRpdmVTdGFydChzdGFydDogbnVtYmVyKSB7XG4gICAgICB0aGlzLl9wcmltaXRpdmVTdGFydCA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHNldFByaW1pdGl2ZUNvdW50KGNvdW50OiBudW1iZXIpIHtcbiAgICAgIHRoaXMuX3ByaW1pdGl2ZUNvdW50ID0gY291bnQ7XG4gICAgfVxuXG4gICAgc2V0SW5zdGFuY2VkQ291bnQoY291bnQ6IG51bWJlcikge1xuICAgICAgdGhpcy5faW5zdGFuY2VDb3VudCA9IGNvdW50O1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBHZW9tZXRyeUJ1aWxkZXIge1xuICAgIHByaXZhdGUgX2RlZjogR2VvbWV0cnlEZWZpbml0aW9uID0ge1xuICAgICAgdmJvczogW10sXG4gICAgICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlLmxpbmVzXG4gICAgfTtcblxuICAgIHJlc2V0KCk6IHRoaXMge1xuICAgICAgdGhpcy5fZGVmID0ge1xuICAgICAgICB2Ym9zOiBbXSxcbiAgICAgICAgcHJpbWl0aXZlVHlwZTogUHJpbWl0aXZlVHlwZS5saW5lc1xuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERlZigpOiBHZW9tZXRyeURlZmluaXRpb24ge1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZjtcbiAgICB9XG5cbiAgICBzZXRQcmltaXRpdmVUeXBlKFxuICAgICAgaW5QcmltaXRpdmU6ICdsaW5lcycgfCAndHJpYW5nbGVzJyB8ICd0cmlhbmdsZVN0cmlwJ1xuICAgICk6IHRoaXMge1xuICAgICAgdGhpcy5fZGVmLnByaW1pdGl2ZVR5cGUgPSBQcmltaXRpdmVUeXBlW2luUHJpbWl0aXZlXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRWYm8oKTogdGhpcyB7XG4gICAgICB0aGlzLl9kZWYudmJvcy5wdXNoKHtcbiAgICAgICAgYXR0cnM6IFtdLFxuICAgICAgICAvLyBzdHJpZGU6IDAsXG4gICAgICAgIGluc3RhbmNlZDogZmFsc2VcbiAgICAgICAgLy8gZHluYW1pYzogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWYm9Bc0luc3RhbmNlZCgpOiB0aGlzIHtcbiAgICAgIHRoaXMuX2dldExhc3RWYm8oKS5pbnN0YW5jZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZib0FzRHluYW1pYygpOiB0aGlzIHtcbiAgICAgIHRoaXMuX2dldExhc3RWYm8oKS5keW5hbWljID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRTdHJpZGUoaW5TdHJpZGU6IG51bWJlcik6IHRoaXMge1xuICAgICAgdGhpcy5fZ2V0TGFzdFZibygpLnN0cmlkZSA9IGluU3RyaWRlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFZib0F0dHJpYnV0ZShcbiAgICAgIGluTmFtZTogc3RyaW5nLFxuICAgICAgaW5UeXBlOiAnZmxvYXQnIHwgJ3ZlYzJmJyB8ICd2ZWMzZicgfCAndmVjNGYnIHwgJ21hdDNmJyB8ICdtYXQ0ZidcbiAgICApOiB0aGlzIHtcbiAgICAgIGNvbnN0IGN1cnJWYm8gPSB0aGlzLl9nZXRMYXN0VmJvKCk7XG4gICAgICBjb25zdCBsYXN0QXR0ciA9XG4gICAgICAgIGN1cnJWYm8uYXR0cnMubGVuZ3RoID4gMFxuICAgICAgICAgID8gY3VyclZiby5hdHRyc1tjdXJyVmJvLmF0dHJzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgY3VyclZiby5hdHRycy5wdXNoKHtcbiAgICAgICAgbmFtZTogaW5OYW1lLFxuICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlW2luVHlwZV0sXG4gICAgICAgIGluZGV4OiBsYXN0QXR0ciA/IGxhc3RBdHRyLmluZGV4ICsgZ2V0QXR0clR5cGVTaXplKGxhc3RBdHRyLnR5cGUpIDogMFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRMYXN0VmJvKCk6IFZib0RlZmluaXRpb24ge1xuICAgICAgaWYgKHRoaXMuX2RlZi52Ym9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFZCTyBzZXR1cCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2RlZi52Ym9zW3RoaXMuX2RlZi52Ym9zLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgfVxufVxuIiwKICAgICJpbXBvcnQgeyBJVW5ib3VuZEN1YmVNYXAgfSBmcm9tICcuL0N1YmVNYXAnO1xuaW1wb3J0IHsgSVVuYm91bmRUZXh0dXJlIH0gZnJvbSAnLi9UZXh0dXJlJztcbmltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNoYWRlclByb2dyYW1PcHRzIHtcbiAgdmVydGV4U3JjOiBzdHJpbmc7XG4gIGZyYWdtZW50U3JjOiBzdHJpbmc7XG4gIGF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICB1bmlmb3Jtczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVuYm91bmRTaGFkZXIge1xuICBpc0JvdW5kKCk6IGJvb2xlYW47XG4gIGhhc0F0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogbnVtYmVyO1xuICBnZXRVbmlmb3JtKG5hbWU6IHN0cmluZyk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kU2hhZGVyKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRTaGFkZXIge1xuICBzZXRUZXh0dXJlVW5pZm9ybShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblRleHR1cmU6IElVbmJvdW5kVGV4dHVyZSB8IElVbmJvdW5kQ3ViZU1hcCxcbiAgICBpbkluZGV4OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0SW50ZWdlcjFVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyMlVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWVYOiBudW1iZXIsIGluVmFsdWVZOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyM1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0RmxvYXQxVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZTogbnVtYmVyKTogdm9pZDtcbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcik6IHZvaWQ7XG4gIHNldEZsb2F0M1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0TWF0cml4NFVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYWRlclByb2dyYW0ge1xuICBwcml2YXRlIHN0YXRpYyBfaXNCb3VuZDogU2hhZGVyUHJvZ3JhbSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9wcm9ncmFtOiBXZWJHTFByb2dyYW07XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX3VuaWZvcm1zID0gbmV3IE1hcDxzdHJpbmcsIFdlYkdMVW5pZm9ybUxvY2F0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKGluTmFtZTogc3RyaW5nLCBvcHQ6IElTaGFkZXJQcm9ncmFtT3B0cykge1xuICAgIHRoaXMuX25hbWUgPSBpbk5hbWU7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LnZlcnRleFNyYywgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LmZyYWdtZW50U3JjLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgLy9cblxuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKSB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBjcmVhdGUgYSBzaGFkZXIgcHJvZ3JhbScpO1xuXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBnbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTsgLy8gZnJlZSB1cCBub3cgdW51c2VkIG1lbW9yeVxuICAgIGdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7IC8vIGZyZWUgdXAgbm93IHVudXNlZCBtZW1vcnlcblxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIC8vIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGxpbmtpbmdcbiAgICAgIGNvbnN0IGxhc3RFcnJvciA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgc2hhZGVycywgRXJyb3IgbGlua2luZzonICsgbGFzdEVycm9yXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuXG4gICAgLy8gdGhpcy5fZ2V0QXR0cmliQW5kTG9jYXRpb24ob3B0LmF0dHJpYnV0ZXMsIG9wdC51bmlmb3Jtcyk7XG5cbiAgICAvLyB0aGlzLnJhd0JpbmQoKTtcbiAgICB0aGlzLmJpbmQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ2V0QXR0cmlidXRlcyhvcHQuYXR0cmlidXRlcyk7XG4gICAgICB0aGlzLl9nZXRVbmlmb3JtcyhvcHQudW5pZm9ybXMpO1xuICAgIH0pO1xuICAgIC8vIFNoYWRlclByb2dyYW0udW5iaW5kKCk7XG4gIH1cblxuICAvLyByYXdCaW5kKCkge1xuICAvLyAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAvLyAgIGdsLnVzZVByb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG4gIC8vIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kU2hhZGVyKSA9PiB2b2lkKSB7XG4gICAgaWYgKFNoYWRlclByb2dyYW0uX2lzQm91bmQgIT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYERvdWJsZSBzaGFkZXIgYmluZGluZyAoYm91bmQ6ICR7U2hhZGVyUHJvZ3JhbS5faXNCb3VuZC5fbmFtZX0sIGJpbmRpbmc6ICR7dGhpcy5fbmFtZX0pYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBTaGFkZXJQcm9ncmFtLl9pc0JvdW5kID0gdGhpcztcbiAgICAvLyB0aGlzLnJhd0JpbmQoKTtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcblxuICAgIGluQ2FsbGJhY2sodGhpcyk7XG5cbiAgICBTaGFkZXJQcm9ncmFtLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC51c2VQcm9ncmFtKG51bGwpO1xuICAgIFNoYWRlclByb2dyYW0uX2lzQm91bmQgPSBudWxsO1xuICB9XG5cbiAgaXNCb3VuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU2hhZGVyUHJvZ3JhbS5faXNCb3VuZCA9PT0gdGhpcztcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlcy5oYXMobmFtZSk7XG4gIH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gdGhpcy5fYXR0cmlidXRlcy5nZXQobmFtZSk7XG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBhdHRyaWJ1dGUgbm90IGZvdW5kOiAke25hbWV9YCk7XG5cbiAgICByZXR1cm4gYXR0cmlidXRlO1xuICB9XG5cbiAgZ2V0VW5pZm9ybShuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1bmlmb3JtID0gdGhpcy5fdW5pZm9ybXMuZ2V0KG5hbWUpO1xuICAgIGlmICh1bmlmb3JtID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihgdW5pZm9ybSBub3QgZm91bmQ6ICR7bmFtZX1gKTtcblxuICAgIHJldHVybiB1bmlmb3JtO1xuICB9XG5cbiAgc2V0VGV4dHVyZVVuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5UZXh0dXJlOiBJVW5ib3VuZFRleHR1cmUgfCBJVW5ib3VuZEN1YmVNYXAsXG4gICAgaW5JbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpbkluZGV4KTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluSW5kZXgpO1xuICAgIGluVGV4dHVyZS5yYXdCaW5kKCk7XG4gIH1cblxuICBzZXRJbnRlZ2VyMVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0SW50ZWdlcjJVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlWDogbnVtYmVyLCBpblZhbHVlWTogbnVtYmVyKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm0yaSh0aGlzLmdldFVuaWZvcm0oaW5OYW1lKSwgaW5WYWx1ZVgsIGluVmFsdWVZKTtcbiAgfVxuXG4gIHNldEludGVnZXIzVW5pZm9ybShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblZhbHVlWDogbnVtYmVyLFxuICAgIGluVmFsdWVZOiBudW1iZXIsXG4gICAgaW5WYWx1ZVo6IG51bWJlclxuICApIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudW5pZm9ybTNpKHRoaXMuZ2V0VW5pZm9ybShpbk5hbWUpLCBpblZhbHVlWCwgaW5WYWx1ZVksIGluVmFsdWVaKTtcbiAgfVxuXG4gIHNldEZsb2F0MVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMmYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSk7XG4gIH1cblxuICBzZXRGbG9hdDNVbmlmb3JtKFxuICAgIGluTmFtZTogc3RyaW5nLFxuICAgIGluVmFsdWVYOiBudW1iZXIsXG4gICAgaW5WYWx1ZVk6IG51bWJlcixcbiAgICBpblZhbHVlWjogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtM2YodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSwgaW5WYWx1ZVopO1xuICB9XG5cbiAgc2V0TWF0cml4NFVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGZhbHNlLCBpbk1hdHJpeCBhcyBnbG0ubWF0NCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX3Byb2dyYW0sIGF0dHJpYnV0ZXNbaWldKTtcblxuICAgICAgaWYgKHZhbHVlIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhdHRyaWJ1dGUgbm90IGZvdW5kID0+ICR7YXR0cmlidXRlc1tpaV19YCk7XG5cbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuc2V0KGF0dHJpYnV0ZXNbaWldLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VW5pZm9ybXModW5pZm9ybXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHVuaWZvcm1zLmxlbmd0aDsgKytpaSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fcHJvZ3JhbSwgdW5pZm9ybXNbaWldKTtcblxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaWZvcm0gbm90IGZvdW5kID0+ICR7dW5pZm9ybXNbaWldfWApO1xuXG4gICAgICB0aGlzLl91bmlmb3Jtcy5zZXQodW5pZm9ybXNbaWldLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy9cblxuICBwcml2YXRlIF9nZXRTaGFkZXIoc3JjOiBzdHJpbmcsIHR5cGU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcikgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgY3JlYXRlIGEgc2hhZGVyJyk7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBsZXQgZXJyb3Jfc3RyID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuICAgICAgaWYgKCFlcnJvcl9zdHIpIGVycm9yX3N0ciA9ICdmYWlsZWQgdG8gY29tcGlsZSBhIHNoYWRlcic7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9zdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cbn1cbiIsCiAgICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kVGV4dHVyZSB7XG4gIGluaXRpYWxpemUoKTogdm9pZDtcbiAgcmF3QmluZCgpOiB2b2lkO1xuICBwcmVCaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZSkgPT4gdm9pZCk6IHZvaWQ7XG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbiAgZ2V0V2lkdGgoKTogbnVtYmVyO1xuICBnZXRIZWlnaHQoKTogbnVtYmVyO1xuICBnZXRSYXdPYmplY3QoKTogV2ViR0xUZXh0dXJlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuZFRleHR1cmUge1xuICBsb2FkKGluSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpOiB2b2lkO1xuICBsb2FkRnJvbU1lbW9yeShpbldpZHRoOiBudW1iZXIsIGluSGVpZ2h0OiBudW1iZXIsIGluUGl4ZWxzOiBVaW50OEFycmF5KTogdm9pZDtcbiAgYWxsb2NhdGUoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyKTogdm9pZDtcbiAgcmVzaXplKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlcik6IHZvaWQ7XG4gIGdldFJhd09iamVjdCgpOiBXZWJHTFRleHR1cmU7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0dXJlIGltcGxlbWVudHMgSVVuYm91bmRUZXh0dXJlLCBJQm91bmRUZXh0dXJlIHtcbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdGV4dHVyZTogV2ViR0xUZXh0dXJlIHwgbnVsbCA9IG51bGw7XG5cbiAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBhbHJlYWR5IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgfVxuXG4gIHJhd0JpbmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmU6IG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIHByZUJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5yYXdCaW5kKCk7XG4gICAgaW5DYWxsYmFjayh0aGlzKTtcbiAgfVxuXG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5wcmVCaW5kKGluQ2FsbGJhY2spO1xuICAgIFRleHR1cmUudW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICB9XG5cbiAgbG9hZChpbkltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmU6IG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fd2lkdGggPSBpbkltYWdlLndpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGluSW1hZ2UuaGVpZ2h0O1xuXG4gICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgZ2wuVEVYVFVSRV8yRCxcbiAgICAgIGxldmVsLFxuICAgICAgaW50ZXJuYWxGb3JtYXQsXG4gICAgICBzcmNGb3JtYXQsXG4gICAgICBzcmNUeXBlLFxuICAgICAgaW5JbWFnZVxuICAgICk7XG4gIH1cblxuICBsb2FkRnJvbU1lbW9yeShcbiAgICBpbldpZHRoOiBudW1iZXIsXG4gICAgaW5IZWlnaHQ6IG51bWJlcixcbiAgICBpblBpeGVsczogVWludDhBcnJheVxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxvY2F0ZShpbldpZHRoLCBpbkhlaWdodCwgaW5QaXhlbHMpO1xuICB9XG5cbiAgYWxsb2NhdGUoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsb2NhdGUoaW5XaWR0aCwgaW5IZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FsbG9jYXRlKGluV2lkdGgsIGluSGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FsbG9jYXRlKFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluUGl4ZWxzOiBVaW50OEFycmF5IHwgbnVsbCA9IG51bGxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmU6IG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fd2lkdGggPSBpbldpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGluSGVpZ2h0O1xuXG4gICAgLy8gd3JhcHBpbmcgdG8gY2xhbXAgdG8gZWRnZVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3QgYm9yZGVyID0gMDtcbiAgICBjb25zdCBzcmNGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHNyY1R5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgbGV2ZWwsXG4gICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgIGluV2lkdGgsXG4gICAgICBpbkhlaWdodCxcbiAgICAgIGJvcmRlcixcbiAgICAgIHNyY0Zvcm1hdCxcbiAgICAgIHNyY1R5cGUsXG4gICAgICBpblBpeGVsc1xuICAgICk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICB9XG5cbiAgZ2V0UmF3T2JqZWN0KCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgLy8gVE9ETzogdGhpcyBpcyB1Z2x5XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW1hZ2VGcm9tVXJsKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgIH07XG4gICAgICBpbWFnZS5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH1cbn1cbiIsCiAgICAiZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXJNb3ZpbmdTcGVlZCA9IDE2O1xuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXJNb3VzZVNlbnNpYmlsaXR5ID0gMTAuMDtcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyS2V5Ym9hcmRTZW5zaWJpbGl0eSA9IE1hdGguUEkgKiAwLjU1O1xuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXJUb3VjaFNlbnNpYmlsaXR5ID0gMTUuMDtcbiIsCiAgICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxudW5pZm9ybSBtYXQ0IHVfY29tcG9zZWRNYXRyaXg7XG5cbmluIHZlYzMgIGFfdmVydGV4X3Bvc2l0aW9uO1xuXG5pbiB2ZWMzICBhX29mZnNldF9jZW50ZXI7XG5pbiBmbG9hdCBhX29mZnNldF9zY2FsZTtcbmluIHZlYzMgIGFfb2Zmc2V0X2NvbG9yO1xuXG5mbGF0IG91dCB2ZWMzIHZfY29sb3I7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICB2ZWMzIHBvc2l0aW9uID0gYV9vZmZzZXRfY2VudGVyICsgYV92ZXJ0ZXhfcG9zaXRpb24gKiBhX29mZnNldF9zY2FsZTtcblxuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xuXG4gIHZfY29sb3IgPSBhX29mZnNldF9jb2xvcjtcbn1cbmAudHJpbSgpOyIsCiAgICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBsb3dwIGZsb2F0O1xuXG5mbGF0IGluIHZlYzMgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIG9fY29sb3IgPSB2ZWM0KHZfY29sb3IsIDEuMCk7XG59XG5gLnRyaW0oKTsiLAogICAgImltcG9ydCB7IGdyYXBoaWNzIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL3dpcmUtZnJhbWUtY3ViZXMtcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvd2lyZS1mcmFtZS1jdWJlcy1yZW5kZXJlci5nbHNsLmZyYWcnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuLy8gY29uc3Qga19idWZmZXJTaXplID0gNyAqIDUxMjtcbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDcgKiA1MTIgKiA0O1xuXG5jb25zdCBnZW5lcmF0ZVdpcmVGcmFtZUN1YmVWZXJ0aWNlcyA9IChpblNpemU6IG51bWJlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgaFNpemUgPSBpblNpemUgKiAwLjU7XG5cbiAgY29uc3QgdmVydGljZXM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtdO1xuXG4gIHZlcnRpY2VzLnB1c2goWytoU2l6ZSwgK2hTaXplLCAraFNpemVdKTtcbiAgdmVydGljZXMucHVzaChbLWhTaXplLCAraFNpemUsICtoU2l6ZV0pO1xuICB2ZXJ0aWNlcy5wdXNoKFsraFNpemUsIC1oU2l6ZSwgK2hTaXplXSk7XG4gIHZlcnRpY2VzLnB1c2goWy1oU2l6ZSwgLWhTaXplLCAraFNpemVdKTtcblxuICB2ZXJ0aWNlcy5wdXNoKFsraFNpemUsICtoU2l6ZSwgLWhTaXplXSk7XG4gIHZlcnRpY2VzLnB1c2goWy1oU2l6ZSwgK2hTaXplLCAtaFNpemVdKTtcbiAgdmVydGljZXMucHVzaChbK2hTaXplLCAtaFNpemUsIC1oU2l6ZV0pO1xuICB2ZXJ0aWNlcy5wdXNoKFstaFNpemUsIC1oU2l6ZSwgLWhTaXplXSk7XG5cbiAgLy9cblxuICBjb25zdCBpbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGluZGljZXMucHVzaCgwLCAxLCAxLCAzLCAzLCAyLCAyLCAwKTtcbiAgaW5kaWNlcy5wdXNoKDQsIDUsIDUsIDcsIDcsIDYsIDYsIDQpO1xuICBpbmRpY2VzLnB1c2goMCwgNCwgMSwgNSwgMywgNywgMiwgNik7XG5cbiAgLy9cblxuICBjb25zdCBmaW5hbFZlcnRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGZvciAobGV0IGlpID0gMDsgaWkgPCBpbmRpY2VzLmxlbmd0aDsgKytpaSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHZlcnRpY2VzW2luZGljZXNbaWldXTtcblxuICAgIGZpbmFsVmVydGljZXMucHVzaCh2ZXJ0ZXhbMF0pO1xuICAgIGZpbmFsVmVydGljZXMucHVzaCh2ZXJ0ZXhbMV0pO1xuICAgIGZpbmFsVmVydGljZXMucHVzaCh2ZXJ0ZXhbMl0pO1xuICB9XG5cbiAgcmV0dXJuIGZpbmFsVmVydGljZXM7XG59O1xuXG4vL1xuLy9cbi8vXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdpcmVGcmFtZUN1YmVzUmVuZGVyZXIge1xuICBwdXNoQ2VudGVyZWRDdWJlKFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2NhbGU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICk6IHZvaWQ7XG5cbiAgcHVzaE9yaWdpbkJvdW5kQ3ViZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNjYWxlOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgV2lyZUZyYW1lQ3ViZXNSZW5kZXJlciBpbXBsZW1lbnRzIElXaXJlRnJhbWVDdWJlc1JlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfc2hhZGVyOiBncmFwaGljcy53ZWJnbDIuU2hhZGVyUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfZ2VvbWV0cnk6IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnk7XG5cbiAgcHJpdmF0ZSBfYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShrX2J1ZmZlclNpemUpO1xuICBwcml2YXRlIF9jdXJyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zaGFkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLlNoYWRlclByb2dyYW0oJ1dpcmVGcmFtZUN1YmVzUmVuZGVyZXInLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHZlcnRleFNoYWRlcixcbiAgICAgIGZyYWdtZW50U3JjOiBmcmFnbWVudFNoYWRlcixcbiAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgJ2FfdmVydGV4X3Bvc2l0aW9uJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X2NlbnRlcicsXG4gICAgICAgICdhX29mZnNldF9zY2FsZScsXG4gICAgICAgICdhX29mZnNldF9jb2xvcidcbiAgICAgIF0sXG4gICAgICB1bmlmb3JtczogWyd1X2NvbXBvc2VkTWF0cml4J11cbiAgICB9KTtcblxuICAgIGNvbnN0IGdlb0J1aWxkZXIgPSBuZXcgZ3JhcGhpY3Mud2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeUJ1aWxkZXIoKTtcbiAgICBnZW9CdWlsZGVyXG4gICAgICAucmVzZXQoKVxuICAgICAgLnNldFByaW1pdGl2ZVR5cGUoJ2xpbmVzJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhfcG9zaXRpb24nLCAndmVjM2YnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuc2V0VmJvQXNEeW5hbWljKClcbiAgICAgIC5zZXRWYm9Bc0luc3RhbmNlZCgpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9jZW50ZXInLCAndmVjM2YnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRfc2NhbGUnLCAnZmxvYXQnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRfY29sb3InLCAndmVjM2YnKTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcblxuICAgIGNvbnN0IHZlcnRpY2VzID0gZ2VuZXJhdGVXaXJlRnJhbWVDdWJlVmVydGljZXMoMSk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGVCdWZmZXIoMCwgdmVydGljZXMsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodmVydGljZXMubGVuZ3RoIC8gMyk7XG4gIH1cblxuICBwdXNoQ2VudGVyZWRDdWJlKFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2NhbGU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5DZW50ZXJbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpbkNlbnRlclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluQ2VudGVyWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5TY2FsZTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuICB9XG5cbiAgcHVzaE9yaWdpbkJvdW5kQ3ViZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNjYWxlOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAwXSA9IGluT3JpZ2luWzBdICsgaW5TY2FsZSAqIDAuNTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAxXSA9IGluT3JpZ2luWzFdICsgaW5TY2FsZSAqIDAuNTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluT3JpZ2luWzJdICsgaW5TY2FsZSAqIDAuNTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAzXSA9IGluU2NhbGU7XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNF0gPSBpbkNvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDVdID0gaW5Db2xvclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA2XSA9IGluQ29sb3JbMl07XG4gICAgdGhpcy5fY3VycmVudFNpemUgKz0gNztcbiAgfVxuXG4gIGZsdXNoKFxuICAgIGNvbXBvc2VkTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0LFxuICAgIGNsZWFyU3RhY2s6IGJvb2xlYW4gPSB0cnVlXG4gICkge1xuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZFNoYWRlcikgPT4ge1xuICAgICAgYm91bmRTaGFkZXIuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBjb21wb3NlZE1hdHJpeCk7XG5cbiAgICAgIHRoaXMuX2dlb21ldHJ5LnVwZGF0ZUJ1ZmZlcigxLCB0aGlzLl9idWZmZXIsIHRoaXMuX2N1cnJlbnRTaXplKTtcbiAgICAgIHRoaXMuX2dlb21ldHJ5LnNldEluc3RhbmNlZENvdW50KHRoaXMuX2N1cnJlbnRTaXplIC8gNyk7XG4gICAgICB0aGlzLl9nZW9tZXRyeS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIGlmIChjbGVhclN0YWNrID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgLy8gcmVzZXQgdmVydGljZXNcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSA9IDA7XG4gIH1cblxufVxuIiwKICAgICJcbmltcG9ydCB7Z3JhcGhpY3N9IGZyb20gXCJAbG9jYWwtZnJhbWV3b3JrXCJcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBjbGFzcyBTaGFwZVJlbmRlcmVyIHtcblxuICBwcml2YXRlIF9yZW5kZXJlciA9IG5ldyBncmFwaGljcy5yZW5kZXJlcnMuR2VvbWV0cnlTdGFja1JlbmRlcmVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB7XG4gICAgICBjb25zdCBtb2RlbE1hdDQgPSBnbG0ubWF0NC5jcmVhdGUoKTtcbiAgICAgIGdsbS5tYXQ0LmlkZW50aXR5KG1vZGVsTWF0NCk7XG4gICAgICAvLyBnbG0ubWF0NC5zY2FsZShtb2RlbE1hdDQsIG1vZGVsTWF0NCwgWzEsMSwxXSk7XG4gICAgICBjb25zdCByYXdEYXRhID0gZ3JhcGhpY3MuZ2VvbWV0cmllcy5nZW5lcmF0ZVNwaGVyZVZlcnRpY2VzKDAsIDAuNSwgbW9kZWxNYXQ0LCB0cnVlKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUFsaWFzKDY2NiwgMTI4LCByYXdEYXRhKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCByYXdEYXRhID0gZ3JhcGhpY3MuZ2VvbWV0cmllcy5nZW5lcmF0ZUJveFZlcnRpY2VzKFsxLDEsMV0pO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuY3JlYXRlQWxpYXMoNzc3LCAxMjgsIHJhd0RhdGEpO1xuICAgIH1cblxuICB9XG5cbiAgcHVzaFNwaGVyZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbk9yaWVudGF0aW9uOiBnbG0uUmVhZG9ubHlRdWF0LFxuICAgIGluU2NhbGU6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgKSB7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5wdXNoQWxpYXMoXG4gICAgICA2NjYsXG4gICAgICBpbkNlbnRlcixcbiAgICAgIGluT3JpZW50YXRpb24sXG4gICAgICBpblNjYWxlLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoQm94KFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluT3JpZW50YXRpb246IGdsbS5SZWFkb25seVF1YXQsXG4gICAgaW5TY2FsZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzLFxuICApIHtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnB1c2hBbGlhcyhcbiAgICAgIDc3NyxcbiAgICAgIGluQ2VudGVyLFxuICAgICAgaW5PcmllbnRhdGlvbixcbiAgICAgIGluU2NhbGUsXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG5cbiAgZmx1c2goXG4gICAgY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQsXG4gICAgbGlnaHRQb3M6IGdsbS5SZWFkb25seVZlYzMsXG4gICkge1xuICAgIHRoaXMuX3JlbmRlcmVyLmZsdXNoKGNvbXBvc2VkTWF0cml4LCBsaWdodFBvcyk7XG4gIH1cblxufTtcbiIsCiAgICAiaW1wb3J0IHsgZ3JhcGhpY3MgfSBmcm9tICdAbG9jYWwtZnJhbWV3b3JrJztcblxuaW1wb3J0IHtcbiAgV2lyZUZyYW1lQ3ViZXNSZW5kZXJlcixcbiAgSVdpcmVGcmFtZUN1YmVzUmVuZGVyZXIsXG4gIFNoYXBlUmVuZGVyZXIsXG59IGZyb20gJy4vcmVuZGVyZXJzJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vXG5cbmludGVyZmFjZSBJRGVmaW5pdGlvbiB7XG4gIGNhbnZhc0RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlciB7XG4gIHByaXZhdGUgX2RlZjogSURlZmluaXRpb247XG5cbiAgcHJpdmF0ZSBfdmlld3BvcnRTaXplOiBnbG0udmVjMjtcblxuICBwcml2YXRlIF9mcnVzdHVtQ3VsbGluZzogZ3JhcGhpY3MuY2FtZXJhLkZydXN0dW1DdWxsaW5nO1xuXG4gIHByaXZhdGUgX21haW5DYW1lcmEgPSBuZXcgZ3JhcGhpY3MuY2FtZXJhLkNhbWVyYSgpO1xuICBwcml2YXRlIF9tYWluSHVkQ2FtZXJhID0gbmV3IGdyYXBoaWNzLmNhbWVyYS5DYW1lcmEoKTtcblxuICBwcml2YXRlIG9uQ29udGV4dExvc3Q6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uQ29udGV4dFJlc3RvcmVkOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF90ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5UZXh0UmVuZGVyZXI7XG4gIHByaXZhdGUgX3dpcmVGcmFtZUN1YmVzUmVuZGVyZXI6IFdpcmVGcmFtZUN1YmVzUmVuZGVyZXI7XG4gIHByaXZhdGUgX3N0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuU3RhY2tSZW5kZXJlcnM7XG4gIC8vIHByaXZhdGUgX2dlb21ldHJ5U3RhY2tSZW5kZXJlcjogR2VvbWV0cnlTdGFja1JlbmRlcmVyO1xuICBwcml2YXRlIF9zaGFwZVJlbmRlcmVyOiBTaGFwZVJlbmRlcmVyO1xuXG5cbiAgY29uc3RydWN0b3IoZGVmOiBJRGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2RlZiA9IGRlZjtcblxuICAgIHRoaXMuX3ZpZXdwb3J0U2l6ZSA9IFtcbiAgICAgIHRoaXMuX2RlZi5jYW52YXNEb21FbGVtZW50LndpZHRoLFxuICAgICAgdGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQuaGVpZ2h0XG4gICAgXTtcblxuICAgIHRoaXMucmVzaXplKHRoaXMuX3ZpZXdwb3J0U2l6ZVswXSwgdGhpcy5fdmlld3BvcnRTaXplWzFdKTtcblxuICAgIGdyYXBoaWNzLndlYmdsMi5XZWJHTENvbnRleHQuaW5pdGlhbGl6ZSh0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudCk7XG5cbiAgICB0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3dlYmdsY29udGV4dGxvc3QnLFxuICAgICAgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnY29udGV4dCBpcyBsb3N0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMub25Db250ZXh0TG9zdCkgdGhpcy5vbkNvbnRleHRMb3N0KCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgdGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZXh0IGlzIHJlc3RvcmVkJyk7XG5cbiAgICAgICAgZ3JhcGhpY3Mud2ViZ2wyLldlYkdMQ29udGV4dC5pbml0aWFsaXplKHRoaXMuX2RlZi5jYW52YXNEb21FbGVtZW50KTtcblxuICAgICAgICBpZiAodGhpcy5vbkNvbnRleHRSZXN0b3JlZCkgdGhpcy5vbkNvbnRleHRSZXN0b3JlZCgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX2ZydXN0dW1DdWxsaW5nID0gbmV3IGdyYXBoaWNzLmNhbWVyYS5GcnVzdHVtQ3VsbGluZygpO1xuXG4gICAgdGhpcy5fdGV4dFJlbmRlcmVyID0gbmV3IGdyYXBoaWNzLnJlbmRlcmVycy5UZXh0UmVuZGVyZXIoKTtcbiAgICB0aGlzLl93aXJlRnJhbWVDdWJlc1JlbmRlcmVyID0gbmV3IFdpcmVGcmFtZUN1YmVzUmVuZGVyZXIoKTtcbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycyA9IG5ldyBncmFwaGljcy5yZW5kZXJlcnMuU3RhY2tSZW5kZXJlcnMoKTtcbiAgICB0aGlzLl9zaGFwZVJlbmRlcmVyID0gbmV3IFNoYXBlUmVuZGVyZXIoKTtcbiAgfVxuXG4gIC8vXG5cbiAgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBnbCA9IGdyYXBoaWNzLndlYmdsMi5XZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgLy8gYXdhaXQgdGhpcy5fc2NlbmUuY2h1bmtzUmVuZGVyZXIuaW5pdGlhbGl6ZSh0bXBDdWJlTWFwQnVpbGRlci5nZXRDdWJlTWFwKCkpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGluaXRcblxuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICBnbC5jbGVhckRlcHRoKDEuMCk7XG5cbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZGVwdGhGdW5jKGdsLkxFU1MpO1xuXG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0NPTE9SKTtcblxuICAgIGdsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzFdID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzFdID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5fbWFpbkNhbWVyYS5zZXRWaWV3cG9ydFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5fbWFpbkNhbWVyYS5zZXRBc1BlcnNwZWN0aXZlKHsgZm92eTogNzAsIG5lYXI6IDAuMSwgZmFyOiAxMDAgfSk7XG4gICAgdGhpcy5fbWFpbkNhbWVyYS5jb21wdXRlTWF0cmljZXMoKTtcblxuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuc2V0Vmlld3BvcnRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuc2V0QXNPcnRob2dvbmFsKHtcbiAgICAgIGxlZnQ6IC13aWR0aCAqIDAuNSxcbiAgICAgIHJpZ2h0OiArd2lkdGggKiAwLjUsXG4gICAgICB0b3A6IC1oZWlnaHQgKiAwLjUsXG4gICAgICBib3R0b206ICtoZWlnaHQgKiAwLjUsXG4gICAgICBuZWFyOiAtMjAwLFxuICAgICAgZmFyOiAyMDBcbiAgICB9KTtcbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLnNldEV5ZShbK3dpZHRoICogMC41LCAraGVpZ2h0ICogMC41LCAxXSk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5zZXRUYXJnZXQoWyt3aWR0aCAqIDAuNSwgK2hlaWdodCAqIDAuNSwgMF0pO1xuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuc2V0VXBBeGlzKFswLCAxLCAwXSk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5jb21wdXRlTWF0cmljZXMoKTtcbiAgfVxuXG4gIC8vXG5cbiAgdG9nZ2xlQ29udGV4dExvc3MoKSB7XG4gICAgY29uc3QgZ2wgPSBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCBleHRlbnNpb25Mb3NlQ29udGV4dCA9IGdyYXBoaWNzLndlYmdsMi5XZWJHTENvbnRleHQuZ2V0RXh0ZW5zaW9uTG9zZUNvbnRleHQoKTtcblxuICAgIGlmIChleHRlbnNpb25Mb3NlQ29udGV4dCkge1xuICAgICAgaWYgKGdsLmlzQ29udGV4dExvc3QoKSkge1xuICAgICAgICBleHRlbnNpb25Mb3NlQ29udGV4dC5yZXN0b3JlQ29udGV4dCgpOyAvLyByZXN0b3JlcyB0aGUgY29udGV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXh0ZW5zaW9uTG9zZUNvbnRleHQubG9zZUNvbnRleHQoKTsgLy8gdHJpZ2dlciBhIGNvbnRleHQgbG9zc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnRleHRJc0xvc3QoKSB7XG4gICAgY29uc3QgZ2wgPSBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIHJldHVybiBnbC5pc0NvbnRleHRMb3N0KCk7XG4gIH1cblxuICBzZXRPbkNvbnRleHRMb3N0KGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNvbnRleHRMb3N0ID0gY2FsbGJhY2s7XG4gIH1cblxuICBzZXRPbkNvbnRleHRSZXN0b3JlZChjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Db250ZXh0UmVzdG9yZWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8vXG5cbiAgbG9va0F0KFxuICAgIGluRXllOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluVGFyZ2V0OiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluVXBBeGlzOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMuX21haW5DYW1lcmEubG9va0F0KGluRXllLCBpblRhcmdldCwgaW5VcEF4aXMpO1xuICAgIHRoaXMuX21haW5DYW1lcmEuY29tcHV0ZU1hdHJpY2VzKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fbWFpbkNhbWVyYS5jb21wdXRlQ29tcG9zZWRNYXRyaXgoKTtcbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLmNvbXB1dGVDb21wb3NlZE1hdHJpeCgpO1xuXG4gICAgdGhpcy5fZnJ1c3R1bUN1bGxpbmcuY2FsY3VsYXRlRnJ1c3R1bShcbiAgICAgIHRoaXMuX21haW5DYW1lcmEuZ2V0UHJvamVjdGlvbk1hdHJpeCgpLFxuICAgICAgdGhpcy5fbWFpbkNhbWVyYS5nZXRWaWV3TWF0cml4KClcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyU2NlbmUoY2FsbGJhY2s6IChjYW1lcmE6IGdyYXBoaWNzLmNhbWVyYS5JQ2FtZXJhLCBmcnVzdHVtQ3VsbGluZzogZ3JhcGhpY3MuY2FtZXJhLklGcnVzdHVtQ3VsbGluZykgPT4gdm9pZCkge1xuICAgIGNvbnN0IGdsID0gZ3JhcGhpY3Mud2ViZ2wyLldlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gdGhpcy5fdmlld3BvcnRTaXplO1xuXG4gICAgY29uc3QgbW9kZWxNYXQ0ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gICAgZ2xtLm1hdDQuaWRlbnRpdHkobW9kZWxNYXQ0KTtcbiAgICAvLyBnbG0ubWF0NC50cmFuc2xhdGUobW9kZWxNYXQ0LCBtb2RlbE1hdDQsIHRoaXMuX21haW5DYW1lcmEuZ2V0RXllKCkpO1xuICAgIGdsbS5tYXQ0LnRyYW5zbGF0ZShtb2RlbE1hdDQsIG1vZGVsTWF0NCwgWzEwLDEwLDBdKTtcbiAgICAvLyBnbG0ubWF0NC5yb3RhdGVYKG1vZGVsTWF0NCwgbW9kZWxNYXQ0LCBNYXRoLlBJICogMC41KTsgLy8gdXAgYXhpcyBpcyBaXG5cbiAgICAvLyB0aGlzLl9jdWJlTWFwQnVpbGRlci5jYXB0dXJlU2NlbmUoXG4gICAgLy8gICBtb2RlbE1hdDQsXG4gICAgLy8gICAoY2FtZXJhOiBncmFwaGljcy5JQ2FtZXJhLCBmcnVzdHVtQ3VsbGluZzogZ3JhcGhpY3MuSUZydXN0dW1DdWxsaW5nKSA9PiB7XG5cbiAgICAvLyAgIGNhbGxiYWNrKGNhbWVyYSwgZnJ1c3R1bUN1bGxpbmcpO1xuXG4gICAgLy8gICB0aGlzLl93aXJlRnJhbWVDdWJlc1JlbmRlcmVyLmZsdXNoKGNhbWVyYS5nZXRDb21wb3NlZE1hdHJpeCgpKTtcbiAgICAvLyAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLmZsdXNoKGNhbWVyYS5nZXRDb21wb3NlZE1hdHJpeCgpKTtcbiAgICAvLyAgIHRoaXMuX2dlb21ldHJ5U3RhY2tSZW5kZXJlci5mbHVzaChjYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgLy8gfSk7XG5cblxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIGNhbGxiYWNrKHRoaXMuX21haW5DYW1lcmEsIHRoaXMuX2ZydXN0dW1DdWxsaW5nKTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fd2lyZUZyYW1lQ3ViZXNSZW5kZXJlci5mbHVzaCh0aGlzLl9tYWluQ2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCkpO1xuICAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLmZsdXNoKHRoaXMuX21haW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgLy8gdGhpcy5fZ2VvbWV0cnlTdGFja1JlbmRlcmVyLmZsdXNoKHRoaXMuX21haW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgdGhpcy5fc2hhcGVSZW5kZXJlci5mbHVzaCh0aGlzLl9tYWluQ2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCksIHRoaXMuX21haW5DYW1lcmEuZ2V0RXllKCkpO1xuICB9XG5cbiAgcmVuZGVySFVEKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gdGhpcy5fdmlld3BvcnRTaXplO1xuXG4gICAgY29uc3QgZ2wgPSBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgIGNvbnN0IGh1ZFByb2plY3Rpb25NYXRyaXggPSBnbG0ubWF0NC5jcmVhdGUoKTtcbiAgICBnbG0ubWF0NC5vcnRobyhcbiAgICAgIGh1ZFByb2plY3Rpb25NYXRyaXgsXG4gICAgICAtd2lkdGggKiAwLjUsXG4gICAgICArd2lkdGggKiAwLjUsXG4gICAgICAtaGVpZ2h0ICogMC41LFxuICAgICAgK2hlaWdodCAqIDAuNSxcbiAgICAgIC0yMDAsXG4gICAgICAyMDBcbiAgICApO1xuXG4gICAgY29uc3QgaHVkVmlld01hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICAgIGdsbS5tYXQ0Lmxvb2tBdChcbiAgICAgIGh1ZFZpZXdNYXRyaXgsXG4gICAgICBbK3dpZHRoICogMC41LCAraGVpZ2h0ICogMC41LCAxXSxcbiAgICAgIFsrd2lkdGggKiAwLjUsICtoZWlnaHQgKiAwLjUsIDBdLFxuICAgICAgWzAsIDEsIDBdXG4gICAgKTtcblxuICAgIGNvbnN0IGh1ZENvbXBvc2VkTWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gICAgZ2xtLm1hdDQubXVsdGlwbHkoaHVkQ29tcG9zZWRNYXRyaXgsIGh1ZFByb2plY3Rpb25NYXRyaXgsIGh1ZFZpZXdNYXRyaXgpO1xuXG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfRFNUX0FMUEhBKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5mbHVzaChodWRDb21wb3NlZE1hdHJpeCk7XG4gICAgdGhpcy5fdGV4dFJlbmRlcmVyLmZsdXNoKGh1ZENvbXBvc2VkTWF0cml4KTtcblxuICAgIGdsLmRpc2FibGUoZ2wuQkxFTkQpO1xuXG4gICAgZ3JhcGhpY3Mud2ViZ2wyLlNoYWRlclByb2dyYW0udW5iaW5kKCk7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRTaXplO1xuICB9XG4gIGdldCBtYWluQ2FtZXJhKCk6IFJlYWRvbmx5PGdyYXBoaWNzLmNhbWVyYS5JQ2FtZXJhPiB7XG4gICAgcmV0dXJuIHRoaXMuX21haW5DYW1lcmE7XG4gIH1cbiAgZ2V0IGh1ZENhbWVyYSgpOiBSZWFkb25seTxncmFwaGljcy5jYW1lcmEuSUNhbWVyYT4ge1xuICAgIHJldHVybiB0aGlzLl9tYWluSHVkQ2FtZXJhO1xuICB9XG4gIGdldCBzdGFja1JlbmRlcmVycygpOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2tSZW5kZXJlcnM7XG4gIH1cbiAgZ2V0IHRleHRSZW5kZXJlcigpOiBncmFwaGljcy5yZW5kZXJlcnMuSVRleHRSZW5kZXJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHRSZW5kZXJlcjtcbiAgfVxuICBnZXQgZnJ1c3R1bUN1bGxpbmcoKTogZ3JhcGhpY3MuY2FtZXJhLklGcnVzdHVtQ3VsbGluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZydXN0dW1DdWxsaW5nO1xuICB9XG4gIGdldCB3aXJlRnJhbWVDdWJlc1JlbmRlcmVyKCk6IElXaXJlRnJhbWVDdWJlc1JlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fd2lyZUZyYW1lQ3ViZXNSZW5kZXJlcjtcbiAgfVxuICBnZXQgc2hhcGVSZW5kZXJlcigpOiBTaGFwZVJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2hhcGVSZW5kZXJlcjtcbiAgfVxufVxuIiwKICAgICJpbXBvcnQgKiBhcyBjb25maWd1cmF0aW9uIGZyb20gJy4uL2NvbmZpZ3VyYXRpb24nO1xuXG5pbXBvcnQgeyBzeXN0ZW0sIGdyYXBoaWNzIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG5cbmltcG9ydCB7IFdlYkdMUmVuZGVyZXIgfSBmcm9tICcuL2dyYXBoaWNzL1dlYkdMUmVuZGVyZXInO1xuXG5pbXBvcnQgeyB0ZXN0U2tlbGV0b24sIHRlc3RBbmltV2Fsa2luZywgdGVzdEFuaW0yLCB0ZXN0QW5pbTJfcGF0aCB9IGZyb20gJy4vbG9naWMnO1xuXG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5cbmNvbnN0IF9sZXJwMUQgPSAodmFsQTogbnVtYmVyLCB2YWxCOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIHZhbEEgKyAodmFsQiAtIHZhbEEpICogcmF0aW87XG59O1xuY29uc3QgX2xlcnAyRCA9ICh2YWxBOiBnbG0uUmVhZG9ubHlWZWMyLCB2YWxCOiBnbG0uUmVhZG9ubHlWZWMyLCByYXRpbzogbnVtYmVyKSA9PiB7XG4gIHJldHVybiBnbG0udmVjMi5sZXJwKGdsbS52ZWMyLmNyZWF0ZSgpLCB2YWxBLCB2YWxCLCByYXRpbyk7XG59O1xuY29uc3QgX2xlcnAzRCA9ICh2YWxBOiBnbG0uUmVhZG9ubHlWZWMzLCB2YWxCOiBnbG0uUmVhZG9ubHlWZWMzLCByYXRpbzogbnVtYmVyKSA9PiB7XG4gIHJldHVybiBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2YWxBLCB2YWxCLCByYXRpbyk7XG59O1xuXG5cbmNvbnN0IF9kZWJ1Z1N0dWZmID0gKFxuICBpblJlbmRlcmVyOiBXZWJHTFJlbmRlcmVyLFxuICBpblRpbWU6IG51bWJlcixcbikgPT4ge1xuXG4gIHsgLy8gZGVidWcgd2lyZSBmcmFtZSBhbmltYXRpb25cblxuICAgIGNvbnN0IHBvc1ggPSAzMDtcbiAgICBjb25zdCBwb3NZID0gMzA7XG5cbiAgICBjb25zdCBhbmltUmF0aW8gPSBzeXN0ZW0ubWF0aC5lYXNlQ2xhbXAoaW5UaW1lICogMC4yNSk7XG5cblxuICAgIGNvbnN0IGFsbFdheXBvaW50czogZ2xtLlJlYWRvbmx5VmVjMltdID0gW1xuICAgICAgWzYgKyAyICogMCwgMC41ICsgMyAqIDBdLFxuICAgICAgWzYgKyAyICogMSwgMC41ICsgMyAqIDFdLFxuICAgICAgWzYgKyAyICogMCwgMC41ICsgMyAqIDFdLFxuICAgICAgWzYgKyAyICogMSwgMC41ICsgMyAqIDBdLFxuICAgIF07XG5cbiAgICBjb25zdCBjdXN0b21FYXNpbmcgPSBuZXcgc3lzdGVtLm1hdGguR2VuZXJpY0Vhc2luZzxnbG0udmVjMj4oX2xlcnAyRCk7XG4gICAgY3VzdG9tRWFzaW5nLnB1c2goMS80KjAsIGFsbFdheXBvaW50c1swXSk7XG4gICAgY3VzdG9tRWFzaW5nLnB1c2goMS80KjEsIGFsbFdheXBvaW50c1sxXSk7XG4gICAgY3VzdG9tRWFzaW5nLnB1c2goMS80KjIsIGFsbFdheXBvaW50c1syXSk7XG4gICAgY3VzdG9tRWFzaW5nLnB1c2goMS80KjMsIGFsbFdheXBvaW50c1szXSk7XG4gICAgY3VzdG9tRWFzaW5nLnB1c2goMS80KjQsIGFsbFdheXBvaW50c1swXSk7XG5cbiAgICBjb25zdCBpa1RhcmdldCA9IGN1c3RvbUVhc2luZy5nZXQoYW5pbVJhdGlvKTtcblxuICAgIGNvbnN0IGNpcmNsZUE6IHN5c3RlbS5tYXRoLmlrLklDaXJjbGUgPSB7XG4gICAgICBjZW50ZXI6IFswLDBdLFxuICAgICAgcmFkaXVzOiA1XG4gICAgfTtcbiAgICBjb25zdCBjaXJjbGVCOiBzeXN0ZW0ubWF0aC5pay5JQ2lyY2xlID0ge1xuICAgICAgY2VudGVyOiBpa1RhcmdldCxcbiAgICAgIHJhZGl1czogNVxuICAgIH07XG4gICAgY29uc3QgcmVzdWx0ID0gc3lzdGVtLm1hdGguaWsuY2lyY2xlQ2lyY2xlSW50ZXJzZWN0aW9uUG9pbnRzKGNpcmNsZUEsIGNpcmNsZUIpO1xuXG4gICAge1xuICAgICAgY29uc3Qga19jb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9IFsxLDEsMV07XG5cbiAgICAgIC8vIGRyYXcgY2lyY2xlcyBjZW50ZXJcbiAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaENyb3NzKFtwb3NYK2NpcmNsZUEuY2VudGVyWzBdLHBvc1ksY2lyY2xlQS5jZW50ZXJbMV1dLCAxLjUsIGtfY29sb3IpO1xuICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoQ3Jvc3MoW3Bvc1grY2lyY2xlQi5jZW50ZXJbMF0scG9zWSxjaXJjbGVCLmNlbnRlclsxXV0sIDEuNSwga19jb2xvcik7XG4gICAgfVxuXG4gICAge1xuICAgICAgY29uc3Qga19jb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9IFswLjUsMC41LDAuNV07XG5cbiAgICAgIC8vIGRyYXcgY2lyY2xlcyBzaGFwZVxuICAgICAgY29uc3Qga19xdWFsaXR5ID0gMzI7XG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwga19xdWFsaXR5OyBpaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IGpqID0gKGlpICsgMSkgJSBrX3F1YWxpdHk7XG5cbiAgICAgICAgY29uc3QgYW5nbGVBID0gKGlpIC8ga19xdWFsaXR5KSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBhbmdsZUIgPSAoamogLyBrX3F1YWxpdHkpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IGNvc0EgPSBNYXRoLmNvcyhhbmdsZUEpO1xuICAgICAgICBjb25zdCBzaW5BID0gTWF0aC5zaW4oYW5nbGVBKTtcbiAgICAgICAgY29uc3QgY29zQiA9IE1hdGguY29zKGFuZ2xlQik7XG4gICAgICAgIGNvbnN0IHNpbkIgPSBNYXRoLnNpbihhbmdsZUIpO1xuXG4gICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoXG4gICAgICAgICAgW3Bvc1grY2lyY2xlQS5jZW50ZXJbMF0rY29zQSpjaXJjbGVBLnJhZGl1cyxwb3NZKzAsY2lyY2xlQS5jZW50ZXJbMV0rc2luQSpjaXJjbGVBLnJhZGl1c10sXG4gICAgICAgICAgW3Bvc1grY2lyY2xlQS5jZW50ZXJbMF0rY29zQipjaXJjbGVBLnJhZGl1cyxwb3NZKzAsY2lyY2xlQS5jZW50ZXJbMV0rc2luQipjaXJjbGVBLnJhZGl1c10sXG4gICAgICAgICAga19jb2xvcik7XG5cbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgICAgICBbcG9zWCtjaXJjbGVCLmNlbnRlclswXStjb3NBKmNpcmNsZUIucmFkaXVzLHBvc1krMCxjaXJjbGVCLmNlbnRlclsxXStzaW5BKmNpcmNsZUIucmFkaXVzXSxcbiAgICAgICAgICBbcG9zWCtjaXJjbGVCLmNlbnRlclswXStjb3NCKmNpcmNsZUIucmFkaXVzLHBvc1krMCxjaXJjbGVCLmNlbnRlclsxXStzaW5CKmNpcmNsZUIucmFkaXVzXSxcbiAgICAgICAgICBrX2NvbG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgYWxsV2F5cG9pbnRzLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBjb25zdCBqaiA9IChpaSArIDEpICUgYWxsV2F5cG9pbnRzLmxlbmd0aDtcblxuICAgICAgICBjb25zdCBwb3NBID0gYWxsV2F5cG9pbnRzW2lpXTtcbiAgICAgICAgY29uc3QgcG9zQiA9IGFsbFdheXBvaW50c1tqal07XG5cbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgICAgICBbcG9zWCtwb3NBWzBdLCBwb3NZLCBwb3NBWzFdXSxcbiAgICAgICAgICBbcG9zWCtwb3NCWzBdLCBwb3NZLCBwb3NCWzFdXSxcbiAgICAgICAgICBbMC41LDAuNSwwLjVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAvLyBkcmF3IGludGVyc2VjdGlvbiBwb2ludHNcbiAgICAgIHJlc3VsdC5mb3JFYWNoKChpbnRlcnNlY3Rpb25Qb2ludCwgaW5kZXgpID0+IHtcblxuICAgICAgICBjb25zdCBrX2NvbG9yOiBnbG0uUmVhZG9ubHlWZWMzID0gKChpbmRleCAlIDIpID09IDApID8gWzEuMCwwLjUsMC41XSA6IFswLjUsMC41LDEuMF07XG5cbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoQ3Jvc3MoXG4gICAgICAgICAgW3Bvc1graW50ZXJzZWN0aW9uUG9pbnRbMF0scG9zWSxpbnRlcnNlY3Rpb25Qb2ludFsxXV0sXG4gICAgICAgICAgMS41LFxuICAgICAgICAgIGtfY29sb3JcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBpbnRlcnNlY3Rpb24gcG9pbnRzIHRvIGNpcmNsZUFcbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgICAgICBbcG9zWCtjaXJjbGVBLmNlbnRlclswXSxwb3NZKzAsY2lyY2xlQS5jZW50ZXJbMV1dLFxuICAgICAgICAgIFtwb3NYK2ludGVyc2VjdGlvblBvaW50WzBdLHBvc1krMCxpbnRlcnNlY3Rpb25Qb2ludFsxXV0sXG4gICAgICAgICAga19jb2xvcik7XG5cbiAgICAgICAgLy8gaW50ZXJzZWN0aW9uIHBvaW50cyB0byBjaXJjbGVCXG4gICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoXG4gICAgICAgICAgW3Bvc1grY2lyY2xlQi5jZW50ZXJbMF0scG9zWSswLGNpcmNsZUIuY2VudGVyWzFdXSxcbiAgICAgICAgICBbcG9zWCtpbnRlcnNlY3Rpb25Qb2ludFswXSxwb3NZKzAsaW50ZXJzZWN0aW9uUG9pbnRbMV1dLFxuICAgICAgICAgIGtfY29sb3IpO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIHsgLy8gZ3JlYXQgZm9yIGFybXMgKDEpXG4gICAgY29uc3QgYW5pbVJhd1JhdGlvID0gaW5UaW1lICogMC4yNSAtIE1hdGguZmxvb3IoaW5UaW1lICogMC4yNSk7XG4gICAgLy8gY29uc3QgYW5pbVJhdGlvID0gc3lzdGVtLm1hdGguZWFzZVBpblBvbmcoYW5pbVJhd1JhdGlvKTtcblxuICAgIGNvbnN0IG1haW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMgPSBbKzE1LCszMCwwXTtcblxuICAgIGNvbnN0IGFsbFdheXBvaW50czogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgICAgLy8gW21haW5PcmlnaW5bMF0rNSArIDMqLTAuMCxtYWluT3JpZ2luWzFdLTIsbWFpbk9yaWdpblsyXSArIDQqKzAuMF0sXG4gICAgICAvLyBbbWFpbk9yaWdpblswXSs1ICsgMyorMS4wLG1haW5PcmlnaW5bMV0tMixtYWluT3JpZ2luWzJdICsgNCorMC4wXSxcbiAgICAgIC8vIFttYWluT3JpZ2luWzBdKzUgKyAzKiswLjAsbWFpbk9yaWdpblsxXSsyLG1haW5PcmlnaW5bMl0gKyA0KisxLjBdLFxuICAgICAgLy8gW21haW5PcmlnaW5bMF0rNSArIDMqKzEuMCxtYWluT3JpZ2luWzFdKzIsbWFpbk9yaWdpblsyXSArIDQqKzEuMF0sXG4gICAgICBbbWFpbk9yaWdpblswXS0yLG1haW5PcmlnaW5bMV0tNyArIDMqLTAuMCxtYWluT3JpZ2luWzJdICsgMiorMC4wXSxcbiAgICAgIFttYWluT3JpZ2luWzBdLTIsbWFpbk9yaWdpblsxXS03ICsgMyorMS4wLG1haW5PcmlnaW5bMl0gKyAyKiswLjBdLFxuICAgICAgW21haW5PcmlnaW5bMF0rMixtYWluT3JpZ2luWzFdLTcgKyAzKiswLjAsbWFpbk9yaWdpblsyXSArIDIqKzEuMF0sXG4gICAgICBbbWFpbk9yaWdpblswXSsyLG1haW5PcmlnaW5bMV0tNyArIDMqKzEuMCxtYWluT3JpZ2luWzJdICsgMiorMS4wXSxcbiAgICBdO1xuXG4gICAgY29uc3QgY3VzdG9tRWFzaW5nID0gbmV3IHN5c3RlbS5tYXRoLkdlbmVyaWNFYXNpbmc8Z2xtLnZlYzM+KF9sZXJwM0QpXG4gICAgICAucHVzaCgwLjAwLCBhbGxXYXlwb2ludHNbMF0pXG4gICAgICAucHVzaCgwLjI1LCBhbGxXYXlwb2ludHNbMV0pXG4gICAgICAucHVzaCgwLjUwLCBhbGxXYXlwb2ludHNbMl0pXG4gICAgICAucHVzaCgwLjc1LCBhbGxXYXlwb2ludHNbM10pXG4gICAgICAucHVzaCgxLjAwLCBhbGxXYXlwb2ludHNbMF0pXG4gICAgICA7XG5cblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBhbGxXYXlwb2ludHMubGVuZ3RoOyArK2lpKVxuICAgIHtcbiAgICAgIGNvbnN0IGpqID0gKGlpICsgMSkgJSBhbGxXYXlwb2ludHMubGVuZ3RoO1xuXG4gICAgICBjb25zdCBwb3NBID0gYWxsV2F5cG9pbnRzW2lpXTtcbiAgICAgIGNvbnN0IHBvc0IgPSBhbGxXYXlwb2ludHNbampdO1xuXG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKHBvc0EsIHBvc0IsIFsxLDEsMV0pO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IGN1cnJJbmRleCA9IE1hdGguZmxvb3IoKGFuaW1SYXdSYXRpbyAqIDEuMCkgKiBhbGxXYXlwb2ludHMubGVuZ3RoKTtcbiAgICAvLyBjb25zdCBuZXh0SW5kZXggPSAoY3VyckluZGV4ICsgMSkgJSBhbGxXYXlwb2ludHMubGVuZ3RoO1xuICAgIC8vIGNvbnN0IGxlcnBSYXRpbyA9IChhbmltUmF3UmF0aW8gLSBjdXJySW5kZXggKiAoMSAvIGFsbFdheXBvaW50cy5sZW5ndGgpKSAqIGFsbFdheXBvaW50cy5sZW5ndGg7XG4gICAgLy8gY29uc3QgbWFpblRhcmdldCA9IGdsbS52ZWMzLmxlcnAoZ2xtLnZlYzMuY3JlYXRlKCksIGFsbFdheXBvaW50c1tjdXJySW5kZXhdLCBhbGxXYXlwb2ludHNbbmV4dEluZGV4XSwgbGVycFJhdGlvKTtcbiAgICBjb25zdCBtYWluVGFyZ2V0ID0gY3VzdG9tRWFzaW5nLmdldChhbmltUmF3UmF0aW8pO1xuXG4gICAgLy8gY29uc3QgbWFpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAvLyAgIG1haW5PcmlnaW5bMF0rNSArIGFuaW1SYXRpbyAqIDMsXG4gICAgLy8gICBtYWluT3JpZ2luWzFdKzAgKyBhbmltUmF0aW8gKiAwLFxuICAgIC8vICAgbWFpbk9yaWdpblsyXSswICsgYW5pbVJhdGlvICogMlxuICAgIC8vIF07XG5cbiAgICB7XG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5PcmlnaW4sIFttYWluT3JpZ2luWzBdKzMsbWFpbk9yaWdpblsxXSswLG1haW5PcmlnaW5bMl0rMF0sIFsxLDAsMF0pO1xuICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShtYWluT3JpZ2luLCBbbWFpbk9yaWdpblswXSswLG1haW5PcmlnaW5bMV0rMyxtYWluT3JpZ2luWzJdKzBdLCBbMSwwLDBdKTtcbiAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUobWFpbk9yaWdpbiwgW21haW5PcmlnaW5bMF0rMCxtYWluT3JpZ2luWzFdKzAsbWFpbk9yaWdpblsyXSszXSwgWzEsMCwwXSk7XG4gICAgfVxuICAgIHtcbiAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUobWFpblRhcmdldCwgW21haW5UYXJnZXRbMF0rMyxtYWluVGFyZ2V0WzFdKzAsbWFpblRhcmdldFsyXSswXSwgWzAsMSwwXSk7XG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5UYXJnZXQsIFttYWluVGFyZ2V0WzBdKzAsbWFpblRhcmdldFsxXSszLG1haW5UYXJnZXRbMl0rMF0sIFswLDEsMF0pO1xuICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShtYWluVGFyZ2V0LCBbbWFpblRhcmdldFswXSswLG1haW5UYXJnZXRbMV0rMCxtYWluVGFyZ2V0WzJdKzNdLCBbMCwxLDBdKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJvb3RNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgIGdsbS5tYXQ0LnRyYW5zbGF0ZShyb290TWF0NCwgcm9vdE1hdDQsIG1haW5PcmlnaW4pO1xuICAgIC8vIGdsbS5tYXQ0LnJvdGF0ZShyb290TWF0NCwgcm9vdE1hdDQsIE1hdGguUEkgKiAtMC4yLCBbMCwxLDBdKTtcbiAgICAvLyBnbG0ubWF0NC5yb3RhdGUocm9vdE1hdDQsIHJvb3RNYXQ0LCBNYXRoLlBJICogMC4yLCBbMSwwLDBdKTtcbiAgICBnbG0ubWF0NC5yb3RhdGUocm9vdE1hdDQsIHJvb3RNYXQ0LCBNYXRoLlBJICogMC41LCBbMCwwLDFdKTtcblxuICAgIGNvbnN0IGxpbWJEYXRhID0gbmV3IHN5c3RlbS5tYXRoLmlrLkxpbWJEYXRhKHJvb3RNYXQ0LCA1LCA1KTtcbiAgICAvLyBjb25zdCByZXN1bHQgPSBsaW1iRGF0YS5jb21wdXRlSWtfZml4ZWRZYXcobWFpblRhcmdldCxbMSwwLDBdKTtcbiAgICAvLyBjb25zdCByZXN1bHQgPSBsaW1iRGF0YS5jb21wdXRlSWtfZml4ZWRSb2xsKG1haW5UYXJnZXQsWyswLjcsIC0wLjQsIDAuMF0pO1xuXG5cbiAgICAvLyBjb25zdCByb2xsVmFsdWUgPSBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCBbKzAuOSwgLTAuMSwgMC4wXSwgWyswLjUsICswLjYsIDAuMF0sIGFuaW1SYXRpbyk7XG4gICAgY29uc3Qgcm9sbFZhbHVlID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygxLDEsMCk7XG4gICAgZ2xtLnZlYzMubm9ybWFsaXplKHJvbGxWYWx1ZSwgcm9sbFZhbHVlKTtcbiAgICBjb25zdCByZXN1bHQgPSBsaW1iRGF0YS5jb21wdXRlSWtfZml4ZWRSb2xsKG1haW5UYXJnZXQsIHJvbGxWYWx1ZSk7IC8vIGdyZWF0IGZvciBhcm1zXG5cbiAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgIGNvbnN0IGJhc2VNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgICAgY29uc3QgcHJpbWFyeU1hdDQgPSBnbG0ubWF0NC5pZGVudGl0eShnbG0ubWF0NC5jcmVhdGUoKSk7XG4gICAgICBjb25zdCBzZWNvbmRhcnlNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuXG4gICAgICBbcmVzdWx0LmpvaW50QSwgcmVzdWx0LmpvaW50Ql0uZm9yRWFjaCgoY3VyckpvaW50LCBpbmRleCkgPT4ge1xuXG4gICAgICAgIGxpbWJEYXRhLmV4dHJhY3RUcmFuc2Zvcm1zKHJlc3VsdCwgY3VyckpvaW50LCBiYXNlTWF0NCwgcHJpbWFyeU1hdDQsIHNlY29uZGFyeU1hdDQpO1xuXG4gICAgICAgIGNvbnN0IF9zdWJSZW5kZXIgPSAoY3Vyck1hdDQ6IGdsbS5SZWFkb25seU1hdDQsIGxlbmd0aDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBrX2NvbG9yOiBnbG0uUmVhZG9ubHlWZWMzID0gKChpbmRleCAlIDIpID09PSAwKSA/IFswLjUsMC41LDAuNV0gOiBbMC4yNSwwLjI1LDAuMjVdO1xuXG4gICAgICAgICAgY29uc3QgcmF3T3JpZ2luID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgICAgY29uc3QgcmF3Rm9yd2FyZCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMobGVuZ3RoLDAsMCk7XG4gICAgICAgICAgY29uc3QgcmF3TGVmdCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwxLDApO1xuICAgICAgICAgIGNvbnN0IHJhd1VwID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLDAsMSk7XG5cbiAgICAgICAgICBjb25zdCBvcmlnaW46IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd09yaWdpbiwgcmF3T3JpZ2luLCBjdXJyTWF0NCk7XG4gICAgICAgICAgY29uc3QgZm9yd2FyZDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQocmF3Rm9yd2FyZCwgcmF3Rm9yd2FyZCwgY3Vyck1hdDQpO1xuICAgICAgICAgIGNvbnN0IGxlZnQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd0xlZnQsIHJhd0xlZnQsIGN1cnJNYXQ0KTtcbiAgICAgICAgICBjb25zdCB1cDogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQocmF3VXAsIHJhd1VwLCBjdXJyTWF0NCk7XG5cbiAgICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG9yaWdpbiwgZm9yd2FyZCwgWzEsMCwwXSk7XG4gICAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShvcmlnaW4sIGxlZnQsIFswLDEsMF0pO1xuICAgICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUob3JpZ2luLCB1cCwgWzAsMCwxXSk7XG5cbiAgICAgICAgICBpblJlbmRlcmVyLnNoYXBlUmVuZGVyZXIucHVzaEJveChcbiAgICAgICAgICAgIGdsbS52ZWMzLmxlcnAoZ2xtLnZlYzMuY3JlYXRlKCksIG9yaWdpbiwgZm9yd2FyZCwgMC41KSxcbiAgICAgICAgICAgIGdsbS5xdWF0LmZyb21NYXQzKGdsbS5xdWF0LmNyZWF0ZSgpLCBnbG0ubWF0My5mcm9tTWF0NChnbG0ubWF0My5jcmVhdGUoKSwgY3Vyck1hdDQpKSxcbiAgICAgICAgICAgIFtsZW5ndGgsMSwwLjVdLFxuICAgICAgICAgICAga19jb2xvclxuICAgICAgICAgICk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBfc3ViUmVuZGVyKGJhc2VNYXQ0LCAxKTtcbiAgICAgICAgX3N1YlJlbmRlcihwcmltYXJ5TWF0NCwgbGltYkRhdGEucHJpbWFyeUxlbmd0aCk7XG4gICAgICAgIF9zdWJSZW5kZXIoc2Vjb25kYXJ5TWF0NCwgbGltYkRhdGEuc2Vjb25kYXJ5TGVuZ3RoKTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHsgLy8gZ3JlYXQgZm9yIGFybXMgKDIpXG4gICAgLy8gY29uc3QgYW5pbVJhd1JhdGlvID0gdGhpcy5fdGltZSAqIDAuMTI1IC0gTWF0aC5mbG9vcih0aGlzLl90aW1lICogMC4xMjUpO1xuICAgIGNvbnN0IGFuaW1SYXdSYXRpbyA9IHN5c3RlbS5tYXRoLmVhc2VDbGFtcChpblRpbWUgKiAwLjEyNSk7XG4gICAgLy8gY29uc3QgYW5pbVJhdGlvID0gc3lzdGVtLm1hdGguZWFzZVBpblBvbmcoYW5pbVJhd1JhdGlvKTtcblxuICAgIGNvbnN0IG1haW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMgPSBbMCwrMzAsMF07XG5cbiAgICBjb25zdCBhbGxXYXlwb2ludHM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgICAgIC8vIFttYWluT3JpZ2luWzBdKzIgKyAzKi0wLjAsbWFpbk9yaWdpblsxXS0yLG1haW5PcmlnaW5bMl0gLSA1IC0gMiorMC4wXSxcbiAgICAgIC8vIFttYWluT3JpZ2luWzBdKzIgKyAzKisxLjAsbWFpbk9yaWdpblsxXS0yLG1haW5PcmlnaW5bMl0gLSA1IC0gMiotMC4wXSxcbiAgICAgIC8vIFttYWluT3JpZ2luWzBdKzIgKyAzKisxLjAsbWFpbk9yaWdpblsxXSsyLG1haW5PcmlnaW5bMl0gLSA1IC0gMiorMS4wXSxcbiAgICAgIC8vIFttYWluT3JpZ2luWzBdKzIgKyAzKiswLjAsbWFpbk9yaWdpblsxXSsyLG1haW5PcmlnaW5bMl0gLSA1IC0gMiorMS4wXSxcbiAgICBdO1xuXG4gICAgY29uc3Qgc3RhcnRSYWRpdXMgPSBNYXRoLlBJICogMC43NTtcbiAgICBjb25zdCBjb21wbGV0ZVJhZGl1cyA9IE1hdGguUEkgKiAwLjU7XG5cbiAgICBjb25zdCBxdWFsaXR5ID0gNjQ7XG5cbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgcXVhbGl0eTsgKytpaSkge1xuICAgICAgY29uc3QgYW5nbGVSYXRpbyA9IChpaSAvIHF1YWxpdHkpICogY29tcGxldGVSYWRpdXMgKyBzdGFydFJhZGl1cztcbiAgICAgIGNvbnN0IGNvc1ZhbCA9IE1hdGguY29zKGFuZ2xlUmF0aW8pO1xuICAgICAgY29uc3Qgc2luVmFsID0gTWF0aC5zaW4oYW5nbGVSYXRpbyk7XG4gICAgICBjb25zdCBzaW5WYWwyID0gTWF0aC5zaW4oYW5nbGVSYXRpbyAqIDE2KTtcbiAgICAgIGFsbFdheXBvaW50cy5wdXNoKFtcbiAgICAgICAgbWFpbk9yaWdpblswXSArIDAgKyBzaW5WYWwgKiA2LFxuICAgICAgICBtYWluT3JpZ2luWzFdICsgMCArIGNvc1ZhbCAqIDYsXG4gICAgICAgIG1haW5PcmlnaW5bMl0gLSAzICsgMSArIHNpblZhbDIsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpaSA9IHF1YWxpdHkgLSAxOyBpaSA+PSAwOyAtLWlpKSB7XG4gICAgICBjb25zdCBhbmdsZVJhdGlvID0gKGlpIC8gcXVhbGl0eSkgKiBjb21wbGV0ZVJhZGl1cyArIHN0YXJ0UmFkaXVzO1xuICAgICAgY29uc3QgY29zVmFsID0gTWF0aC5jb3MoYW5nbGVSYXRpbyk7XG4gICAgICBjb25zdCBzaW5WYWwgPSBNYXRoLnNpbihhbmdsZVJhdGlvKTtcbiAgICAgIGFsbFdheXBvaW50cy5wdXNoKFtcbiAgICAgICAgbWFpbk9yaWdpblswXSArIDAgKyBzaW5WYWwgKiA1LFxuICAgICAgICBtYWluT3JpZ2luWzFdICsgMCArIGNvc1ZhbCAqIDUsXG4gICAgICAgIG1haW5PcmlnaW5bMl0gLSAzLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3VzdG9tRWFzaW5nID0gbmV3IHN5c3RlbS5tYXRoLkdlbmVyaWNFYXNpbmc8Z2xtLnZlYzM+KF9sZXJwM0QpO1xuICAgIC8vIGN1c3RvbUVhc2luZ1xuICAgIC8vICAgLnB1c2goMC4wMCwgYWxsV2F5cG9pbnRzWzBdKVxuICAgIC8vICAgLnB1c2goMC4yNSwgYWxsV2F5cG9pbnRzWzFdKVxuICAgIC8vICAgLnB1c2goMC41MCwgYWxsV2F5cG9pbnRzWzJdKVxuICAgIC8vICAgLnB1c2goMC43NSwgYWxsV2F5cG9pbnRzWzNdLCBzeXN0ZW0ubWF0aC5lYXNlT3V0Qm91bmNlKVxuICAgIC8vICAgLnB1c2goMS4wMCwgYWxsV2F5cG9pbnRzWzBdKVxuICAgIC8vICAgO1xuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPD0gYWxsV2F5cG9pbnRzLmxlbmd0aDsgKytpaSkge1xuXG4gICAgICBjb25zdCBzYWZlSUkgPSAoaWkgJSBhbGxXYXlwb2ludHMubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGN1cnJSYXRpbyA9IChpaSAvIChhbGxXYXlwb2ludHMubGVuZ3RoICsgMSkpO1xuXG4gICAgICBjdXN0b21FYXNpbmcucHVzaChjdXJyUmF0aW8sIGFsbFdheXBvaW50c1tzYWZlSUldKTtcbiAgICB9XG5cblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBhbGxXYXlwb2ludHMubGVuZ3RoOyArK2lpKVxuICAgIHtcbiAgICAgIGNvbnN0IGpqID0gKGlpICsgMSkgJSBhbGxXYXlwb2ludHMubGVuZ3RoO1xuXG4gICAgICBjb25zdCBwb3NBID0gYWxsV2F5cG9pbnRzW2lpXTtcbiAgICAgIGNvbnN0IHBvc0IgPSBhbGxXYXlwb2ludHNbampdO1xuXG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKHBvc0EsIHBvc0IsIFsxLDEsMV0pO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IGN1cnJJbmRleCA9IE1hdGguZmxvb3IoKGFuaW1SYXdSYXRpbyAqIDEuMCkgKiBhbGxXYXlwb2ludHMubGVuZ3RoKTtcbiAgICAvLyBjb25zdCBuZXh0SW5kZXggPSAoY3VyckluZGV4ICsgMSkgJSBhbGxXYXlwb2ludHMubGVuZ3RoO1xuICAgIC8vIGNvbnN0IGxlcnBSYXRpbyA9IChhbmltUmF3UmF0aW8gLSBjdXJySW5kZXggKiAoMSAvIGFsbFdheXBvaW50cy5sZW5ndGgpKSAqIGFsbFdheXBvaW50cy5sZW5ndGg7XG4gICAgLy8gY29uc3QgbWFpblRhcmdldCA9IGdsbS52ZWMzLmxlcnAoZ2xtLnZlYzMuY3JlYXRlKCksIGFsbFdheXBvaW50c1tjdXJySW5kZXhdLCBhbGxXYXlwb2ludHNbbmV4dEluZGV4XSwgbGVycFJhdGlvKTtcbiAgICBjb25zdCBtYWluVGFyZ2V0ID0gY3VzdG9tRWFzaW5nLmdldChhbmltUmF3UmF0aW8pO1xuXG4gICAgLy8gY29uc3QgbWFpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAvLyAgIG1haW5PcmlnaW5bMF0rNSArIGFuaW1SYXRpbyAqIDMsXG4gICAgLy8gICBtYWluT3JpZ2luWzFdKzAgKyBhbmltUmF0aW8gKiAwLFxuICAgIC8vICAgbWFpbk9yaWdpblsyXSswICsgYW5pbVJhdGlvICogMlxuICAgIC8vIF07XG5cbiAgICB7XG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5PcmlnaW4sIFttYWluT3JpZ2luWzBdKzMsbWFpbk9yaWdpblsxXSswLG1haW5PcmlnaW5bMl0rMF0sIFsxLDAsMF0pO1xuICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShtYWluT3JpZ2luLCBbbWFpbk9yaWdpblswXSswLG1haW5PcmlnaW5bMV0rMyxtYWluT3JpZ2luWzJdKzBdLCBbMSwwLDBdKTtcbiAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUobWFpbk9yaWdpbiwgW21haW5PcmlnaW5bMF0rMCxtYWluT3JpZ2luWzFdKzAsbWFpbk9yaWdpblsyXSszXSwgWzEsMCwwXSk7XG4gICAgfVxuICAgIHtcbiAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUobWFpblRhcmdldCwgW21haW5UYXJnZXRbMF0rMyxtYWluVGFyZ2V0WzFdKzAsbWFpblRhcmdldFsyXSswXSwgWzAsMSwwXSk7XG4gICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5UYXJnZXQsIFttYWluVGFyZ2V0WzBdKzAsbWFpblRhcmdldFsxXSszLG1haW5UYXJnZXRbMl0rMF0sIFswLDEsMF0pO1xuICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShtYWluVGFyZ2V0LCBbbWFpblRhcmdldFswXSswLG1haW5UYXJnZXRbMV0rMCxtYWluVGFyZ2V0WzJdKzNdLCBbMCwxLDBdKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJvb3RNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgIGdsbS5tYXQ0LnRyYW5zbGF0ZShyb290TWF0NCwgcm9vdE1hdDQsIG1haW5PcmlnaW4pO1xuICAgIC8vIGdsbS5tYXQ0LnJvdGF0ZShyb290TWF0NCwgcm9vdE1hdDQsIE1hdGguUEkgKiAwLjUsIFswLDEsMF0pOyAvLyBsb29rIFwiZG93blwiXG4gICAgZ2xtLm1hdDQucm90YXRlKHJvb3RNYXQ0LCByb290TWF0NCwgTWF0aC5QSSAqIDAuNSwgWzAsMCwxXSk7IC8vIGxvb2sgXCJyaWdodFwiXG5cbiAgICBjb25zdCBsaW1iRGF0YSA9IG5ldyBzeXN0ZW0ubWF0aC5pay5MaW1iRGF0YShyb290TWF0NCwgNSwgNSk7XG5cbiAgICBjb25zdCByb2xsVmFsdWUgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDEsLTEsMCk7XG4gICAgLy8gY29uc3Qgcm9sbFZhbHVlID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygxLDEsMCk7XG4gICAgZ2xtLnZlYzMubm9ybWFsaXplKHJvbGxWYWx1ZSwgcm9sbFZhbHVlKTtcbiAgICAvLyBjb25zdCByZXN1bHQgPSBsaW1iRGF0YS5jb21wdXRlSWtfZml4ZWRSb2xsKG1haW5UYXJnZXQsIHJvbGxWYWx1ZSk7IC8vIGdyZWF0IGZvciBhcm1zXG4gICAgY29uc3QgcmVzdWx0ID0gbGltYkRhdGEuY29tcHV0ZUlrX2ZpeGVkUm9sbChtYWluVGFyZ2V0LCByb2xsVmFsdWUpOyAvLyBncmVhdCBmb3IgYXJtc1xuXG4gICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICBjb25zdCBiYXNlTWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcbiAgICAgIGNvbnN0IHByaW1hcnlNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgICAgY29uc3Qgc2Vjb25kYXJ5TWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcblxuICAgICAgW3Jlc3VsdC5qb2ludEEsIHJlc3VsdC5qb2ludEJdLmZvckVhY2goKGN1cnJKb2ludCwgaW5kZXgpID0+IHtcblxuICAgICAgICBsaW1iRGF0YS5leHRyYWN0VHJhbnNmb3JtcyhyZXN1bHQsIGN1cnJKb2ludCwgYmFzZU1hdDQsIHByaW1hcnlNYXQ0LCBzZWNvbmRhcnlNYXQ0KTtcblxuICAgICAgICBjb25zdCBfc3ViUmVuZGVyID0gKGN1cnJNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0LCBsZW5ndGg6IG51bWJlcikgPT4ge1xuXG4gICAgICAgICAgY29uc3Qga19jb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9ICgoaW5kZXggJSAyKSA9PT0gMCkgPyBbMC41LDAuNSwwLjVdIDogWzAuMjUsMC4yNSwwLjI1XTtcblxuICAgICAgICAgIGNvbnN0IHJhd09yaWdpbiA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgICAgICAgIGNvbnN0IHJhd0ZvcndhcmQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKGxlbmd0aCwwLDApO1xuICAgICAgICAgIGNvbnN0IHJhd0xlZnQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsMSwwKTtcbiAgICAgICAgICBjb25zdCByYXdVcCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwwLDEpO1xuXG4gICAgICAgICAgY29uc3Qgb3JpZ2luOiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMudHJhbnNmb3JtTWF0NChyYXdPcmlnaW4sIHJhd09yaWdpbiwgY3Vyck1hdDQpO1xuICAgICAgICAgIGNvbnN0IGZvcndhcmQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd0ZvcndhcmQsIHJhd0ZvcndhcmQsIGN1cnJNYXQ0KTtcbiAgICAgICAgICBjb25zdCBsZWZ0OiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMudHJhbnNmb3JtTWF0NChyYXdMZWZ0LCByYXdMZWZ0LCBjdXJyTWF0NCk7XG4gICAgICAgICAgY29uc3QgdXA6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd1VwLCByYXdVcCwgY3Vyck1hdDQpO1xuXG4gICAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShvcmlnaW4sIGZvcndhcmQsIFsxLDAsMF0pO1xuICAgICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUob3JpZ2luLCBsZWZ0LCBbMCwxLDBdKTtcbiAgICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG9yaWdpbiwgdXAsIFswLDAsMV0pO1xuXG4gICAgICAgICAgaW5SZW5kZXJlci5zaGFwZVJlbmRlcmVyLnB1c2hCb3goXG4gICAgICAgICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCBvcmlnaW4sIGZvcndhcmQsIDAuNSksXG4gICAgICAgICAgICBnbG0ucXVhdC5mcm9tTWF0MyhnbG0ucXVhdC5jcmVhdGUoKSwgZ2xtLm1hdDMuZnJvbU1hdDQoZ2xtLm1hdDMuY3JlYXRlKCksIGN1cnJNYXQ0KSksXG4gICAgICAgICAgICBbbGVuZ3RoLDEsMC41XSxcbiAgICAgICAgICAgIGtfY29sb3JcbiAgICAgICAgICApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgX3N1YlJlbmRlcihiYXNlTWF0NCwgMSk7XG4gICAgICAgIF9zdWJSZW5kZXIocHJpbWFyeU1hdDQsIGxpbWJEYXRhLnByaW1hcnlMZW5ndGgpO1xuICAgICAgICBfc3ViUmVuZGVyKHNlY29uZGFyeU1hdDQsIGxpbWJEYXRhLnNlY29uZGFyeUxlbmd0aCk7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuY29uc3QgX3dhbGtpbmdTcGlkZXIgPSAoXG4gIGluUmVuZGVyZXI6IFdlYkdMUmVuZGVyZXIsXG4gIGluVGltZTogbnVtYmVyLFxuKSA9PiB7XG5cblxuICAgIGNvbnN0IGtfcm9vdFBvczogZ2xtLlJlYWRvbmx5VmVjMyA9IFsrMTUsMTAsMF07XG5cbiAgICBjb25zdCBleHRyYUVsZXZhdGlvblJhdGlvID0gc3lzdGVtLm1hdGguZWFzZVBpblBvbmcoc3lzdGVtLm1hdGguZWFzZUNsYW1wKGluVGltZSAqIDAuMTI1KSk7XG4gICAgLy8gY29uc3QgZXh0cmFFbGV2YXRpb24gPSBleHRyYUVsZXZhdGlvblJhdGlvICogLTY7XG5cbiAgICBjb25zdCBjdXN0b21FYXNpbmcgPSBuZXcgc3lzdGVtLm1hdGguR2VuZXJpY0Vhc2luZzxudW1iZXI+KF9sZXJwMUQpXG4gICAgICAgIC5wdXNoKDAuMCwgMCkgLy8gZ28gaGlnaFxuICAgICAgICAucHVzaCgwLjQsIDApIC8vIGlzIGhpZ2hcbiAgICAgICAgLnB1c2goMC41LCAtNikgLy8gZ28gbG93XG4gICAgICAgIC5wdXNoKDEuMCwgLTYpIC8vIGlzIGxvd1xuICAgICAgICA7XG5cbiAgICBjb25zdCBleHRyYUVsZXZhdGlvbiA9IGN1c3RvbUVhc2luZy5nZXQoZXh0cmFFbGV2YXRpb25SYXRpbyk7XG5cbiAgICBjb25zdCBkZWJ1Z0xlZ0FuaW1hdGlvbiA9IChcbiAgICAgIG1haW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgICByZXZlcnNlWTogYm9vbGVhbixcbiAgICAgIGFuaW1SYXdSYXRpbzogbnVtYmVyLFxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgLy8gZGVidWcgbGVnIGFuaW1hdGlvblxuXG4gICAgICAvLyAvLyBbMC4uNF0gLS0+IFswLi4xXVxuICAgICAgLy8gLy8gY29uc3QgYW5pbVJhd1JhdGlvID0gaW5UaW1lICogMC4yNSAtIE1hdGguZmxvb3IoaW5UaW1lICogMC4yNSk7XG4gICAgICAvLyBjb25zdCBhbmltUmF3UmF0aW8gPSBzeXN0ZW0ubWF0aC5lYXNlQ2xhbXAoaW5UaW1lICogMC41KTtcblxuICAgICAgLy8gY29uc3QgbWFpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyA9IFstMzAqMSwgMjAsIDBdO1xuXG4gICAgICAvLyBjb25zdCBhbmltUmF0aW8gPSBfZWFzZVBpblBvbmcoYW5pbVJhd1JhdGlvKTtcbiAgICAgIC8vIC8vIGNvbnN0IG1haW5UYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMgPSBbMTUgLSBhbmltUmF0aW8gKiAxMCwxNSAtIGFuaW1SYXRpbyAqIDIsNSAtIGFuaW1SYXRpbyAqIDJdO1xuICAgICAgLy8gY29uc3QgbWFpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyA9IFttYWluT3JpZ2luWzBdKzUgLSBhbmltUmF0aW8gKiAxMCxtYWluT3JpZ2luWzFdKzUgLSBhbmltUmF0aW8gKiAyLG1haW5PcmlnaW5bMl0tNSAtIGFuaW1SYXRpbyAqIDJdO1xuXG4gICAgICBjb25zdCBjb2VmWSA9IHJldmVyc2VZID8gLTEgOiAxO1xuXG4gICAgICBjb25zdCBhbGxXYXlwb2ludHM6IGdsbS5SZWFkb25seVZlYzNbXSA9IFtcbiAgICAgICAgW21haW5PcmlnaW5bMF0rNSAtIDgsbWFpbk9yaWdpblsxXSs1ICogY29lZlksbWFpbk9yaWdpblsyXS03ICsgMyowXSxcbiAgICAgICAgW21haW5PcmlnaW5bMF0rNSAtIDUsbWFpbk9yaWdpblsxXSs1ICogY29lZlksbWFpbk9yaWdpblsyXS03ICsgMyoxXSxcbiAgICAgICAgW21haW5PcmlnaW5bMF0rNSAtIDIsbWFpbk9yaWdpblsxXSs1ICogY29lZlksbWFpbk9yaWdpblsyXS03ICsgMyowXSxcbiAgICAgICAgLy8gW21haW5PcmlnaW5bMF0rNSAtIDIsbWFpbk9yaWdpblsxXSs1IC0gMiowLG1haW5PcmlnaW5bMl0tNSAtIDIqMV0sXG4gICAgICAgIC8vIFttYWluT3JpZ2luWzBdKzUgLSA4LG1haW5PcmlnaW5bMV0rNSAtIDIqMCxtYWluT3JpZ2luWzJdLTUgLSAyKjFdLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgY3VzdG9tRWFzaW5nID0gbmV3IHN5c3RlbS5tYXRoLkdlbmVyaWNFYXNpbmc8Z2xtLnZlYzM+KF9sZXJwM0QpXG4gICAgICAgIC5wdXNoKDAuMDAsIGFsbFdheXBvaW50c1swXSkgLy8gZ3JvdW5kXG4gICAgICAgIC5wdXNoKDEvMyowLjUqMSwgYWxsV2F5cG9pbnRzWzFdKVxuICAgICAgICAucHVzaCgxLzMqMC41KjIsIGFsbFdheXBvaW50c1syXSlcbiAgICAgICAgLy8gLy8gLnB1c2goMC44NSwgYWxsV2F5cG9pbnRzWzNdLCBzeXN0ZW0ubWF0aC5lYXNlT3V0Qm91bmNlKVxuICAgICAgICAvLyAucHVzaCgwLjg1LCBhbGxXYXlwb2ludHNbM10pXG4gICAgICAgIC5wdXNoKDEuMDAsIGFsbFdheXBvaW50c1swXSlcbiAgICAgICAgO1xuXG5cbiAgICAgIC8vIHJlbmRlciB3YXlwb2ludHNcbiAgICAgIGZvciAobGV0IGN1cnJJbmRleCA9IDA7IGN1cnJJbmRleCA8IGFsbFdheXBvaW50cy5sZW5ndGg7ICsrY3VyckluZGV4KSB7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJySW5kZXggKyAxKSAlIGFsbFdheXBvaW50cy5sZW5ndGg7XG5cbiAgICAgICAgY29uc3QgcG9zQSA9IGFsbFdheXBvaW50c1tjdXJySW5kZXhdO1xuICAgICAgICBjb25zdCBwb3NCID0gYWxsV2F5cG9pbnRzW25leHRJbmRleF07XG5cbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShwb3NBLCBwb3NCLCBbMSwxLDFdKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGV0ZXJtaW5lIG5leHQgdGFyZ2V0XG4gICAgICAvLyBjb25zdCBjdXJySW5kZXggPSBNYXRoLmZsb29yKChhbmltUmF3UmF0aW8gKiAxLjApICogYWxsV2F5cG9pbnRzLmxlbmd0aCk7XG4gICAgICAvLyBjb25zdCBuZXh0SW5kZXggPSAoY3VyckluZGV4ICsgMSkgJSBhbGxXYXlwb2ludHMubGVuZ3RoO1xuICAgICAgLy8gY29uc3QgbGVycFJhdGlvID0gKGFuaW1SYXdSYXRpbyAtIGN1cnJJbmRleCAqICgxIC8gYWxsV2F5cG9pbnRzLmxlbmd0aCkpICogYWxsV2F5cG9pbnRzLmxlbmd0aDtcbiAgICAgIC8vIGNvbnN0IG1haW5UYXJnZXQgPSBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCBhbGxXYXlwb2ludHNbY3VyckluZGV4XSwgYWxsV2F5cG9pbnRzW25leHRJbmRleF0sIGxlcnBSYXRpbyk7XG4gICAgICBjb25zdCBtYWluVGFyZ2V0ID0gY3VzdG9tRWFzaW5nLmdldChhbmltUmF3UmF0aW8pO1xuXG5cbiAgICAgIHsgLy8gY3Jvc3Mgb24gdGhlIG1haW4gb3JpZ2luXG4gICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoW21haW5PcmlnaW5bMF0sbWFpbk9yaWdpblsxXSxtYWluT3JpZ2luWzJdK2V4dHJhRWxldmF0aW9uXSwgW21haW5PcmlnaW5bMF0rMyxtYWluT3JpZ2luWzFdKzAsbWFpbk9yaWdpblsyXSswK2V4dHJhRWxldmF0aW9uXSwgWzEuMCwwLjAsMC4wXSk7XG4gICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoW21haW5PcmlnaW5bMF0sbWFpbk9yaWdpblsxXSxtYWluT3JpZ2luWzJdK2V4dHJhRWxldmF0aW9uXSwgW21haW5PcmlnaW5bMF0rMCxtYWluT3JpZ2luWzFdKzMsbWFpbk9yaWdpblsyXSswK2V4dHJhRWxldmF0aW9uXSwgWzAuMCwxLjAsMC4wXSk7XG4gICAgICAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoW21haW5PcmlnaW5bMF0sbWFpbk9yaWdpblsxXSxtYWluT3JpZ2luWzJdK2V4dHJhRWxldmF0aW9uXSwgW21haW5PcmlnaW5bMF0rMCxtYWluT3JpZ2luWzFdKzAsbWFpbk9yaWdpblsyXSszK2V4dHJhRWxldmF0aW9uXSwgWzAuMCwwLjAsMS4wXSk7XG4gICAgICB9XG4gICAgICB7IC8vIGNyb3NzIG9uIHRoZSBtYWluIHRhcmdldFxuICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5UYXJnZXQsIFttYWluVGFyZ2V0WzBdKzMsbWFpblRhcmdldFsxXSswLG1haW5UYXJnZXRbMl0rMF0sIFsxLjAsMC41LDAuNV0pO1xuICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5UYXJnZXQsIFttYWluVGFyZ2V0WzBdKzAsbWFpblRhcmdldFsxXSszLG1haW5UYXJnZXRbMl0rMF0sIFswLjUsMS4wLDAuNV0pO1xuICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKG1haW5UYXJnZXQsIFttYWluVGFyZ2V0WzBdKzAsbWFpblRhcmdldFsxXSswLG1haW5UYXJnZXRbMl0rM10sIFswLjUsMC41LDEuMF0pO1xuICAgICAgfVxuXG5cbiAgICAgIGNvbnN0IHJvb3RNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgICAgZ2xtLm1hdDQudHJhbnNsYXRlKHJvb3RNYXQ0LCByb290TWF0NCwgbWFpbk9yaWdpbik7XG4gICAgICBnbG0ubWF0NC50cmFuc2xhdGUocm9vdE1hdDQsIHJvb3RNYXQ0LCBbMCwwLGV4dHJhRWxldmF0aW9uXSk7XG5cbiAgICAgIGdsbS5tYXQ0LnJvdGF0ZShyb290TWF0NCwgcm9vdE1hdDQsIE1hdGguUEkgKiAtMC41LCBbMSwwLDBdKTtcblxuICAgICAgY29uc3QgbGltYkRhdGEgPSBuZXcgc3lzdGVtLm1hdGguaWsuTGltYkRhdGEocm9vdE1hdDQsIDUsIDUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gbGltYkRhdGEuY29tcHV0ZUlrX2ZpeGVkUm9sbChtYWluVGFyZ2V0LFswLDAsMV0pOyAvLyBncmVhdCBmb3IgbGVnc1xuICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgIGNvbnN0IGJhc2VNYXQ0ID0gZ2xtLm1hdDQuaWRlbnRpdHkoZ2xtLm1hdDQuY3JlYXRlKCkpO1xuICAgICAgICBjb25zdCBwcmltYXJ5TWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kYXJ5TWF0NCA9IGdsbS5tYXQ0LmlkZW50aXR5KGdsbS5tYXQ0LmNyZWF0ZSgpKTtcblxuICAgICAgICAvLyBbcmVzdWx0LmpvaW50QSwgcmVzdWx0LmpvaW50Ql0uZm9yRWFjaCgoY3VyckpvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICBbcmVzdWx0LmpvaW50QV0uZm9yRWFjaCgoY3VyckpvaW50LCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgY29uc3Qga19jb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9ICgoaW5kZXggJSAyKSA9PT0gMCkgPyBbMSwxLDFdIDogWzAuNSwwLjUsMC41XTtcblxuICAgICAgICAgIGxpbWJEYXRhLmV4dHJhY3RUcmFuc2Zvcm1zKHJlc3VsdCwgY3VyckpvaW50LCBiYXNlTWF0NCwgcHJpbWFyeU1hdDQsIHNlY29uZGFyeU1hdDQpO1xuXG4gICAgICAgICAgY29uc3QgX3N1YlJlbmRlciA9IChjdXJyTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCwgbGVuZ3RoOiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcmF3T3JpZ2luID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgICAgICBjb25zdCByYXdGb3J3YXJkID0gZ2xtLnZlYzMuZnJvbVZhbHVlcyhsZW5ndGgsMCwwKTtcbiAgICAgICAgICAgIGNvbnN0IHJhd0xlZnQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsMSwwKTtcbiAgICAgICAgICAgIGNvbnN0IHJhd1VwID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLDAsMSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyA9IGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQocmF3T3JpZ2luLCByYXdPcmlnaW4sIGN1cnJNYXQ0KTtcbiAgICAgICAgICAgIGNvbnN0IGZvcndhcmQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd0ZvcndhcmQsIHJhd0ZvcndhcmQsIGN1cnJNYXQ0KTtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQ6IGdsbS5SZWFkb25seVZlYzMgPSBnbG0udmVjMy50cmFuc2Zvcm1NYXQ0KHJhd0xlZnQsIHJhd0xlZnQsIGN1cnJNYXQ0KTtcbiAgICAgICAgICAgIGNvbnN0IHVwOiBnbG0uUmVhZG9ubHlWZWMzID0gZ2xtLnZlYzMudHJhbnNmb3JtTWF0NChyYXdVcCwgcmF3VXAsIGN1cnJNYXQ0KTtcblxuICAgICAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShvcmlnaW4sIGZvcndhcmQsIFsxLDAsMF0pO1xuICAgICAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShvcmlnaW4sIGxlZnQsIFswLDEsMF0pO1xuICAgICAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShvcmlnaW4sIHVwLCBbMCwwLDFdKTtcblxuICAgICAgICAgICAgaW5SZW5kZXJlci5zaGFwZVJlbmRlcmVyLnB1c2hCb3goXG4gICAgICAgICAgICAgIGdsbS52ZWMzLmxlcnAoZ2xtLnZlYzMuY3JlYXRlKCksIG9yaWdpbiwgZm9yd2FyZCwgMC41KSxcbiAgICAgICAgICAgICAgZ2xtLnF1YXQuZnJvbU1hdDMoZ2xtLnF1YXQuY3JlYXRlKCksIGdsbS5tYXQzLmZyb21NYXQ0KGdsbS5tYXQzLmNyZWF0ZSgpLCBjdXJyTWF0NCkpLFxuICAgICAgICAgICAgICBbbGVuZ3RoLDEsMC41XSxcbiAgICAgICAgICAgICAga19jb2xvclxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBfc3ViUmVuZGVyKGJhc2VNYXQ0LCAxKTtcbiAgICAgICAgICBfc3ViUmVuZGVyKHByaW1hcnlNYXQ0LCBsaW1iRGF0YS5wcmltYXJ5TGVuZ3RoKTtcbiAgICAgICAgICBfc3ViUmVuZGVyKHNlY29uZGFyeU1hdDQsIGxpbWJEYXRhLnNlY29uZGFyeUxlbmd0aCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZGVidWdMZWdBbmltYXRpb24oW2tfcm9vdFBvc1swXS0zLjUsIGtfcm9vdFBvc1sxXSsxLCBrX3Jvb3RQb3NbMl0gLSAwLjc1XSwgZmFsc2UsIHN5c3RlbS5tYXRoLmVhc2VDbGFtcChpblRpbWUgKiAwLjUgKyAwLjAwKSk7XG4gICAgZGVidWdMZWdBbmltYXRpb24oW2tfcm9vdFBvc1swXS0zLjUsIGtfcm9vdFBvc1sxXS0xLCBrX3Jvb3RQb3NbMl0gLSAwLjc1XSwgdHJ1ZSwgIHN5c3RlbS5tYXRoLmVhc2VDbGFtcChpblRpbWUgKiAwLjUgKyAwLjI1KSk7XG5cbiAgICBkZWJ1Z0xlZ0FuaW1hdGlvbihba19yb290UG9zWzBdKzMuNSwga19yb290UG9zWzFdKzEsIGtfcm9vdFBvc1syXSAtIDAuNzVdLCBmYWxzZSwgc3lzdGVtLm1hdGguZWFzZUNsYW1wKGluVGltZSAqIDAuNSArIDAuNTApKTtcbiAgICBkZWJ1Z0xlZ0FuaW1hdGlvbihba19yb290UG9zWzBdKzMuNSwga19yb290UG9zWzFdLTEsIGtfcm9vdFBvc1syXSAtIDAuNzVdLCB0cnVlLCAgc3lzdGVtLm1hdGguZWFzZUNsYW1wKGluVGltZSAqIDAuNSArIDAuNzUpKTtcblxuICAgIC8vIHNwaWRlciBib2R5XG4gICAgaW5SZW5kZXJlci5zaGFwZVJlbmRlcmVyLnB1c2hCb3goXG4gICAgICBba19yb290UG9zWzBdLCBrX3Jvb3RQb3NbMV0sIGtfcm9vdFBvc1syXSArIGV4dHJhRWxldmF0aW9uXSxcbiAgICAgIGdsbS5xdWF0LmlkZW50aXR5KGdsbS5xdWF0LmNyZWF0ZSgpKSxcbiAgICAgIFs4LDMsMl0sXG4gICAgICBbMC41LDAuNSwwLjVdLFxuICAgICk7XG5cbiAgICB7IC8vIHJlbmRlciBmbG9vclxuXG4gICAgICBjb25zdCByYXRpbyA9IHN5c3RlbS5tYXRoLmVhc2VDbGFtcChpblRpbWUgKiAxLjUpO1xuXG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgOTsgKytpaSkge1xuICAgICAgICBpblJlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKFxuICAgICAgICAgIFtrX3Jvb3RQb3NbMF0rMjMgLSByYXRpbyAqIDUgLSBpaSAqIDUsIGtfcm9vdFBvc1sxXS0gMTUrIDAsIGtfcm9vdFBvc1syXSAtIDcuNzVdLFxuICAgICAgICAgIFtrX3Jvb3RQb3NbMF0rMjMgLSByYXRpbyAqIDUgLSBpaSAqIDUsIGtfcm9vdFBvc1sxXS0gMTUrMzAsIGtfcm9vdFBvc1syXSAtIDcuNzVdLFxuICAgICAgICAgIFswLjUsMC41LDAuNV1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IDc7ICsraWkpIHtcbiAgICAgICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgICAgICBba19yb290UG9zWzBdKzIzIC0gcmF0aW8gKiA1IC0gIDAgKiA1LCBrX3Jvb3RQb3NbMV0tIDE1KyBpaSo1LCBrX3Jvb3RQb3NbMl0gLSA3Ljc1XSxcbiAgICAgICAgICBba19yb290UG9zWzBdKzIzIC0gcmF0aW8gKiA1IC0gIDggKiA1LCBrX3Jvb3RQb3NbMV0tIDE1KyBpaSo1LCBrX3Jvb3RQb3NbMl0gLSA3Ljc1XSxcbiAgICAgICAgICBbMC41LDAuNSwwLjVdXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICB9IC8vIHJlbmRlciBmbG9vclxuXG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuY29uc3QgX3dhbGtpbmdIdW1hbm9pZCA9IChcbiAgaW5SZW5kZXJlcjogV2ViR0xSZW5kZXJlcixcbiAgaW5UaW1lOiBudW1iZXIsXG4pID0+IHtcblxuXG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XG4gIHByaXZhdGUgX2NhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyO1xuXG4gIHByaXZhdGUgX2ZyZWVGbHlDb250cm9sbGVyOiBzeXN0ZW0uY29udHJvbGxlcnMuRnJlZUZseUNvbnRyb2xsZXI7XG5cbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZXJyb3JHcmFwaGljQ29udGV4dDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9jdXJyRnJhbWVUaW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuICBwcml2YXRlIF9mcmFtZVByb2ZpbGVyID0gbmV3IHN5c3RlbS5tZXRyaWNzLkZyYW1lUHJvZmlsZXIoKTtcblxuICBwcml2YXRlIF90aW1lOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGNhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy5fY2FudmFzRWxlbWVudCA9IGNhbnZhc0VsZW1lbnQ7XG5cbiAgICB0aGlzLl9yZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhc0RvbUVsZW1lbnQ6IGNhbnZhc0VsZW1lbnRcbiAgICB9KTtcblxuICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyID0gbmV3IHN5c3RlbS5jb250cm9sbGVycy5GcmVlRmx5Q29udHJvbGxlcih7XG4gICAgICBwb3NpdGlvbjogZ2xtLnZlYzMuZnJvbVZhbHVlcygrMzAsIC0xNSwgMjApLFxuICAgICAgY29vcmRpbmF0ZXM6IFsnWCcsICdZJywgJ1onXSxcbiAgICAgIHRoZXRhOiBNYXRoLlBJICogKzAuNjUsXG4gICAgICBwaGk6IE1hdGguUEkgKiAtMC4yMCxcbiAgICAgIG1vdXNlU2Vuc2liaWxpdHk6IGNvbmZpZ3VyYXRpb24uY29udHJvbGxlck1vdXNlU2Vuc2liaWxpdHksXG4gICAgICBtb3ZpbmdTcGVlZDogY29uZmlndXJhdGlvbi5jb250cm9sbGVyTW92aW5nU3BlZWQsXG4gICAgICBrZXlib2FyZFNlbnNpYmlsaXR5OiBjb25maWd1cmF0aW9uLmNvbnRyb2xsZXJLZXlib2FyZFNlbnNpYmlsaXR5LFxuICAgICAgdG91Y2hTZW5zaWJpbGl0eTogY29uZmlndXJhdGlvbi5jb250cm9sbGVyVG91Y2hTZW5zaWJpbGl0eVxuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQgPSBmYWxzZTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldE9uQ29udGV4dExvc3QoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ29uX2NvbnRleHRfbG9zdCcpO1xuXG4gICAgICB0aGlzLl9lcnJvckdyYXBoaWNDb250ZXh0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0T25Db250ZXh0UmVzdG9yZWQoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ29uX2NvbnRleHRfcmVzdG9yZWQnKTtcblxuICAgICAgdGhpcy5fZXJyb3JHcmFwaGljQ29udGV4dCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICAvLyBjb25zdCByZXN1bHQgPSBjaXJjbGVDaXJjbGVJbnRlcnNlY3Rpb25Qb2ludHMoe2NlbnRlcjogWzEwLDEwXSwgcmFkaXVzOiA1fSwge2NlbnRlcjogWzEzLDEzXSwgcmFkaXVzOiA1fSk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcblxuICB9XG5cbiAgYXN5bmMgaW5pdCgpIHtcbiAgICBhd2FpdCB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcoKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWU7XG5cbiAgICB0aGlzLl90aWNrKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGlzUnVubmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZyAmJiAhdGhpcy5fZXJyb3JHcmFwaGljQ29udGV4dDtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8vXG4gIC8vXG4gIC8vXG5cbiAgcHJpdmF0ZSBfdGljaygpIHtcbiAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9ydW5uaW5nIHx8IHRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQpIHJldHVybjtcblxuICAgICAgdGhpcy5fbWFpbkxvb3AoKTtcblxuICAgICAgLy8gcGxhbiB0aGUgbmV4dCBmcmFtZVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICB9O1xuXG4gICAgdGljaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFpbkxvb3AoKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGRlbHRhU2VjVGltZSA9IHN5c3RlbS5tYXRoLmNsYW1wKGN1cnJlbnRUaW1lIC0gdGhpcy5fY3VyckZyYW1lVGltZSwgMCwgMTAwMCk7XG4gICAgdGhpcy5fY3VyckZyYW1lVGltZSA9IGN1cnJlbnRUaW1lO1xuICAgIHRoaXMuX2ZyYW1lUHJvZmlsZXIucHVzaERlbHRhKGRlbHRhU2VjVGltZSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICB0aGlzLl9mcmVlRmx5Q29udHJvbGxlci51cGRhdGUoZGVsdGFTZWNUaW1lIC8gMTAwMCk7XG5cbiAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxNb3VzZU1hbmFnZXIucmVzZXREZWx0YXMoKTtcbiAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxUb3VjaE1hbmFnZXIucmVzZXREZWx0YXMoKTtcblxuICAgIHRoaXMuX3RpbWUgKz0gZGVsdGFTZWNUaW1lIC8gMTAwMDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLmxvb2tBdChcbiAgICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLmdldFBvc2l0aW9uKCksXG4gICAgICB0aGlzLl9mcmVlRmx5Q29udHJvbGxlci5nZXRUYXJnZXQoKSxcbiAgICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLmdldFVwQXhpcygpXG4gICAgKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnVwZGF0ZSgpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vLy8vLyByZW5kZXIgM2Qgc2NlbmVcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlclNjZW5lKChjYW1lcmE6IGdyYXBoaWNzLmNhbWVyYS5JQ2FtZXJhLCBmcnVzdHVtQ3VsbGluZzogZ3JhcGhpY3MuY2FtZXJhLklGcnVzdHVtQ3VsbGluZykgPT4ge1xuXG4gICAgICAvL1xuICAgICAgLy9cbiAgICAgIC8vXG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKFswLDAsMF0sIFs1LDAsMF0sIFsxLDAsMF0pO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoWzAsMCwwXSwgWzAsNSwwXSwgWzAsMSwwXSk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShbMCwwLDBdLCBbMCwwLDVdLCBbMCwwLDFdKTtcblxuICAgICAgLy9cbiAgICAgIC8vXG4gICAgICAvL1xuXG4gICAgICBfZGVidWdTdHVmZih0aGlzLl9yZW5kZXJlciwgdGhpcy5fdGltZSk7XG5cbiAgICAgIF93YWxraW5nU3BpZGVyKHRoaXMuX3JlbmRlcmVyLCB0aGlzLl90aW1lKTtcblxuICAgICAgLy9cbiAgICAgIC8vXG4gICAgICAvL1xuXG4gICAgICAvKipcbiAgICAgIHRlc3RBbmltV2Fsa2luZy51cGRhdGUoZGVsdGFTZWNUaW1lIC8gMTAwMCk7XG4gICAgICB0ZXN0QW5pbTIudXBkYXRlKGRlbHRhU2VjVGltZSAvIDEwMDApO1xuXG4gICAgICB0ZXN0U2tlbGV0b24ucmVuZGVyKHtcbiAgICAgICAgcmVuZGVyQm94OiAoXG4gICAgICAgICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgICAgICAgaW5PcmllbnRhdGlvbjogZ2xtLlJlYWRvbmx5UXVhdCxcbiAgICAgICAgICBpblNjYWxlOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNoYXBlUmVuZGVyZXIucHVzaEJveChpbkNlbnRlciwgaW5PcmllbnRhdGlvbiwgaW5TY2FsZSwgaW5Db2xvcik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlclNwaGVyZTogKFxuICAgICAgICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgICAgIGluT3JpZW50YXRpb246IGdsbS5SZWFkb25seVF1YXQsXG4gICAgICAgICAgaW5TY2FsZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICAgICAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgICApID0+IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zaGFwZVJlbmRlcmVyLnB1c2hTcGhlcmUoaW5DZW50ZXIsIGluT3JpZW50YXRpb24sIGluU2NhbGUsIGluQ29sb3IpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHtcbiAgICAgICAgLy8gY29uc3QgYmFzZUJvbmUgPSB0ZXN0U2tlbGV0b24uZ2V0Qm9uZSgncmlnaHQtdXBwZXItYXJtJyk7XG5cbiAgICAgICAgLy8gY29uc3QgYXJtT3JpZ2luID0gZ2xtLnZlYzMuY3JlYXRlKCk7XG4gICAgICAgIC8vIGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQoYXJtT3JpZ2luLCBhcm1PcmlnaW4sIGJhc2VCb25lLndvcmxkTWF0NClcblxuXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCB0ZXN0QW5pbTJfcGF0aC5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgICBjb25zdCBqaiA9IChpaSArIDEpICUgdGVzdEFuaW0yX3BhdGgubGVuZ3RoO1xuXG4gICAgICAgICAgY29uc3QgcG9zQSA9IHRlc3RBbmltMl9wYXRoW2lpXTtcbiAgICAgICAgICBjb25zdCBwb3NCID0gdGVzdEFuaW0yX3BhdGhbampdO1xuXG4gICAgICAgICAgLy8gY29uc3QgeHBvc0EgPSBnbG0udmVjMy5hZGQoZ2xtLnZlYzMuY3JlYXRlKCksIGFybU9yaWdpbiwgcG9zQSk7XG4gICAgICAgICAgLy8gY29uc3QgeHBvc0IgPSBnbG0udmVjMy5hZGQoZ2xtLnZlYzMuY3JlYXRlKCksIGFybU9yaWdpbiwgcG9zQik7XG4gICAgICAgICAgY29uc3QgeHBvc0EgPSBnbG0udmVjMy5jb3B5KGdsbS52ZWMzLmNyZWF0ZSgpLCBwb3NBKTtcbiAgICAgICAgICBjb25zdCB4cG9zQiA9IGdsbS52ZWMzLmNvcHkoZ2xtLnZlYzMuY3JlYXRlKCksIHBvc0IpO1xuXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoeHBvc0EsIHhwb3NCLCBbMSwxLDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8qL1xuXG5cblxuXG4gICAgICAvLyBjb25zdCBzaGFwZVJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXIuc2hhcGVSZW5kZXJlcjtcblxuICAgICAgLy8gY29uc3QgdG1wUXVhdCA9IGdsbS5xdWF0LmNyZWF0ZSgpO1xuXG4gICAgICAvLyBmb3IgKGxldCBpaSA9IDA7IGlpIDw9IDE2OyArK2lpKSB7XG4gICAgICAvLyAgIGNvbnN0IGNvZWYgPSAoaWkgLyAxNik7XG4gICAgICAvLyAgIGNvbnN0IGFuZ2xlID0gY29lZiAqIE1hdGguUEkgKiAyLjAgKyB0aGlzLl90aW1lICogMC4xO1xuXG4gICAgICAvLyAgIGNvbnN0IGRpclggPSBNYXRoLmNvcyhhbmdsZSkgKiAxNTtcbiAgICAgIC8vICAgY29uc3QgZGlyWSA9IE1hdGguc2luKGFuZ2xlKSAqIDE1O1xuICAgICAgLy8gICBjb25zdCBkaXJaID0gTWF0aC5zaW4oYW5nbGUgKiAyKSAqIDc7XG5cbiAgICAgIC8vICAgY29uc3QgdG1wUG9zID0gZ2xtLnZlYzMuZnJvbVZhbHVlcyhkaXJYLCBkaXJZLCBkaXJaKTtcblxuICAgICAgLy8gICBnbG0ucXVhdC5zZXRBeGlzQW5nbGUodG1wUXVhdCwgWzAsMCwxXSwgYW5nbGUgKiA0KTtcblxuICAgICAgLy8gICBpZiAoZnJ1c3R1bUN1bGxpbmcuY3ViZUluRnJ1c3R1bVZlYzModG1wUG9zLCA0KSkge1xuICAgICAgLy8gICAgIGlmIChkaXJYID4gMCkge1xuICAgICAgLy8gICAgICAgc2hhcGVSZW5kZXJlci5wdXNoU3BoZXJlKHRtcFBvcywgdG1wUXVhdCwgNCwgWzEsIDEsIDBdKTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgc2hhcGVSZW5kZXJlci5wdXNoQm94KHRtcFBvcywgdG1wUXVhdCwgWzQsMiwxXSwgWzEsIDAsIDFdKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cblxuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vLy8vLyBIVURcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlckhVRCgoKSA9PiB7XG5cbiAgICAgIHtcbiAgICAgICAgY29uc3Qga2V5RXZlbnRzUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcgKyAyMCwgMTY1XTtcbiAgICAgICAgY29uc3QgdG91Y2hFdmVudHNQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNyArIDIwLCAyNjBdO1xuICAgICAgICBjb25zdCBib2FyZFBvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3LCAzNV07XG5cbiAgICAgICAgZ3JhcGhpY3MucmVuZGVyZXJzLmFkZEtleVN0cm9rZXNXaWRnZXRzKGtleUV2ZW50c1BvcywgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMsIHRoaXMuX3JlbmRlcmVyLnRleHRSZW5kZXJlcik7XG4gICAgICAgIGdyYXBoaWNzLnJlbmRlcmVycy5hZGRBcnJvd1N0cm9rZXNXaWRnZXRzKHRvdWNoRXZlbnRzUG9zLCB0aGlzLl9yZW5kZXJlci5zdGFja1JlbmRlcmVycywgdGhpcy5fcmVuZGVyZXIudGV4dFJlbmRlcmVyKTtcbiAgICAgICAgZ3JhcGhpY3MucmVuZGVyZXJzLmFkZEtleXNUb3VjaGVzV2lkZ2V0cyh0aGlzLl9jYW52YXNFbGVtZW50LCBib2FyZFBvcywgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMsIHRoaXMuX3JlbmRlcmVyLnRleHRSZW5kZXJlcik7XG4gICAgICB9XG5cbiAgICAgIGdyYXBoaWNzLnJlbmRlcmVycy5yZW5kZXJGcHNNZXRlcihcbiAgICAgICAgWzEwLCB0aGlzLl9jYW52YXNFbGVtZW50LmhlaWdodCAtIDYwLCAwXSxcbiAgICAgICAgWzEwMCwgNTBdLFxuICAgICAgICB0aGlzLl9mcmFtZVByb2ZpbGVyLFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zdGFja1JlbmRlcmVycyxcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIudGV4dFJlbmRlcmVyLFxuICAgICAgICB0cnVlXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLAogICAgImltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ0Bsb2NhbC1mcmFtZXdvcmsnO1xuXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJy4uL2FwcC9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCBjb25zdCBzZXR1cEZ1bGxTY3JlZW5GZWF0dXJlID0gKGFwcDogQXBwbGljYXRpb24sIGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsIGNhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB7XG5cbiAgaWYgKCFzeXN0ZW0uYnJvd3Nlci5HbG9iYWxGdWxsU2NyZWVuTWFuYWdlci5pc0NvbXBhdGlibGUoY2FudmFzRWxlbWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsRnVsbFNjcmVlbk1hbmFnZXIucmVxdWVzdEZ1bGxTY3JlZW4oY2FudmFzRWxlbWVudCk7XG4gIH0pO1xuXG4gIHN5c3RlbS5icm93c2VyLkdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyLmFkZE9uRnVsbFNjcmVlbkNoYW5nZSgoKSA9PiB7XG5cbiAgICBsZXQgY3VycmVudFdpZHRoID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEhlaWdodCA9IG51bGw7XG5cbiAgICBjb25zdCBpc0luRnVsbFNjcmVlbiA9XG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxGdWxsU2NyZWVuTWFuYWdlci5pc0Z1bGxTY3JlZW4oY2FudmFzRWxlbWVudCk7XG5cbiAgICBpZiAoaXNJbkZ1bGxTY3JlZW4pIHtcbiAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBjdXJyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGN1cnJlbnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXG4gICAgICBjdXJyZW50V2lkdGggPSA4MDA7XG4gICAgICBjdXJyZW50SGVpZ2h0ID0gNjAwO1xuICAgIH1cblxuICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG5cbiAgICBjYW52YXNFbGVtZW50LndpZHRoID0gY3VycmVudFdpZHRoO1xuICAgIGNhbnZhc0VsZW1lbnQuaGVpZ2h0ID0gY3VycmVudEhlaWdodDtcblxuICAgIGFwcC5yZXNpemUoY3VycmVudFdpZHRoLCBjdXJyZW50SGVpZ2h0KTtcbiAgfSk7XG59O1xuIiwKICAgICJpbXBvcnQgeyBzeXN0ZW0gfSBmcm9tICdAbG9jYWwtZnJhbWV3b3JrJztcblxuZXhwb3J0IGNvbnN0IHNldHVwT3V0ZGF0ZWRQYWdlID0gKG1heER1cmF0aW9uOiBudW1iZXIsIG9uVGltZW91dDogKCkgPT4gdm9pZCkgPT4ge1xuXG4gIGlmICghc3lzdGVtLmJyb3dzZXIuR2xvYmFsVmlzaWJpbGl0eU1hbmFnZXIuaXNTdXBwb3J0ZWQoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB0aW1lb3V0SGFuZGxlOiBudW1iZXIgPSAtMTtcblxuICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxWaXNpYmlsaXR5TWFuYWdlci5hZGRWaXNpYmlsaXR5Q2hhbmdlKChpc1Zpc2libGUpID0+IHtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICBpZiAodGltZW91dEhhbmRsZSA+PSAwKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgdGltZW91dEhhbmRsZSA9IC0xO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0SGFuZGxlID0gd2luZG93LnNldFRpbWVvdXQob25UaW1lb3V0LCBtYXhEdXJhdGlvbik7XG4gICAgfVxuXG4gIH0pO1xuICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxWaXNpYmlsaXR5TWFuYWdlci5hY3RpdmF0ZSgpO1xufTtcbiIsCiAgICAiaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG5cbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnLi9hcHAvQXBwbGljYXRpb24nO1xuaW1wb3J0ICogYXMgdXRpbGl0aWVzIGZyb20gJy4vdXRpbGl0aWVzJztcblxubGV0IGxvY2FsQXBwOiBBcHBsaWNhdGlvbiB8IG51bGwgPSBudWxsO1xuXG5jb25zdCBfcXVlcnlEb21FbGVtZW50ID0gPFQgZXh0ZW5kcyBFbGVtZW50Pihpbk5hbWU6IHN0cmluZyk6IFQgPT4ge1xuICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxUPihpbk5hbWUpO1xuICBpZiAoIW5ld0VsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGh0bWwgZWxlbWVudCBcIiR7aW5OYW1lfVwiIG5vdCBmb3VuZGApO1xuICB9XG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuY29uc3QgX29uUGFnZUxvYWQgPSBhc3luYyAoKSA9PiB7XG5cbiAgY29uc3QgY2FudmFzRWxlbWVudCA9IF9xdWVyeURvbUVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KCcjbWFpbi1jYW52YXMnKTtcbiAgY29uc3QgYnV0dG9uRnVsbHNjcmVlbiA9IF9xdWVyeURvbUVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCcjYnV0dG9uLWZ1bGxzY3JlZW4nKTtcbiAgY29uc3QgZXJyb3JUZXh0ID0gX3F1ZXJ5RG9tRWxlbWVudDxIVE1MUGFyYWdyYXBoRWxlbWVudD4oXCIjZXJyb3ItdGV4dFwiKSE7XG5cbiAgLy9cbiAgLy9cbiAgLy9cblxuICBjb25zdCBfb25QYWdlRXJyb3IgPSAoZXJyOiBXaW5kb3dFdmVudE1hcFsnZXJyb3InXSkgPT4ge1xuICAgIGlmIChsb2NhbEFwcCkge1xuICAgICAgY29uc29sZS5sb2coJ29uUGFnZUVycm9yJywgZXJyKTtcblxuICAgICAgLy8gc3RvcCB0aGUgYXBwXG4gICAgICBsb2NhbEFwcC5zdG9wKCk7XG4gICAgICBsb2NhbEFwcCA9IG51bGw7XG5cbiAgICAgIC8vIHN0b3AgdGhlIGJyb3dzZXIgaGVscGVyc1xuICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmRlYWN0aXZhdGUoKTtcbiAgICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbE1vdXNlTWFuYWdlci5kZWFjdGl2YXRlKCk7XG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxUb3VjaE1hbmFnZXIuZGVhY3RpdmF0ZShjYW52YXNFbGVtZW50KTtcbiAgICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyLnJlbW92ZUFsbENhbGxiYWNrcygpO1xuICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLnJlbW92ZUFsbENhbGxiYWNrcygpO1xuICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsVmlzaWJpbGl0eU1hbmFnZXIucmVtb3ZlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxWaXNpYmlsaXR5TWFuYWdlci5kZWFjdGl2YXRlKCk7XG5cbiAgICAgIC8vIHNldHVwIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICBlcnJvclRleHQuc3R5bGUud2lkdGggPSBcIjgwMHB4XCI7XG4gICAgICBlcnJvclRleHQuc3R5bGUuaGVpZ2h0ID0gXCI2MDBweFwiO1xuICAgICAgZXJyb3JUZXh0LmlubmVySFRNTCA9IGVyci5tZXNzYWdlO1xuXG4gICAgICAvLyBzd2FwIHRoZSBjYW52YXMgd2l0aCB0aGUgZXJyb3IgbWVzc2FnZVxuICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZXJyb3JUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAvLyBkaXNhYmxlIHRoZSB1c2VyIGludGVyZmFjZVxuICAgICAgYnV0dG9uRnVsbHNjcmVlbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgIGRvY3VtZW50LnRpdGxlICs9IFwiIChFUlIpXCI7XG4gICAgfVxuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBfb25QYWdlRXJyb3IpO1xuXG4gIC8vXG4gIC8vXG4gIC8vXG5cbiAge1xuICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5hY3RpdmF0ZSgpO1xuICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbFRvdWNoTWFuYWdlci5hY3RpdmF0ZShjYW52YXNFbGVtZW50KTtcblxuICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlci5hbGxvd1BvaW50ZXJMb2NrZWRPbkNsaWNrRXZlbnQoY2FudmFzRWxlbWVudCk7XG4gICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFkZE9uTG9ja0NoYW5nZSgoKSA9PiB7XG4gICAgICBjb25zdCBpc0xvY2tlZCA9XG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuaXNQb2ludGVyTG9ja2VkKGNhbnZhc0VsZW1lbnQpO1xuXG4gICAgICBpZiAoaXNMb2NrZWQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1RoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyBsb2NrZWQnKTtcblxuICAgICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxNb3VzZU1hbmFnZXIuYWN0aXZhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdUaGUgcG9pbnRlciBsb2NrIHN0YXR1cyBpcyBub3cgdW5sb2NrZWQnKTtcblxuICAgICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxNb3VzZU1hbmFnZXIuZGVhY3RpdmF0ZSgpO1xuXG4gICAgICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlci5hbGxvd1BvaW50ZXJMb2NrZWRPbkNsaWNrRXZlbnQoXG4gICAgICAgICAgY2FudmFzRWxlbWVudFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFkZE9uTG9ja0Vycm9yKChldmVudCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAvLyAgIGBUaGUgcG9pbnRlciBsb2NrIHNlbnQgYW4gZXJyb3IsIGV2ZW50OiBcIiR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfVwiYFxuICAgICAgLy8gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvY2FsQXBwID0gbmV3IEFwcGxpY2F0aW9uKGNhbnZhc0VsZW1lbnQpO1xuXG4gIGF3YWl0IGxvY2FsQXBwLmluaXQoKTtcbiAgbG9jYWxBcHAuc3RhcnQoKTtcblxuICAvL1xuICAvL1xuICAvL1xuXG4gIGNvbnN0IHBhZ2VNYXhUaW1lSW52aXNpYmxlID0gNjAgKiAxMDAwOyAvLyA2MHNlY1xuICB1dGlsaXRpZXMuc2V0dXBPdXRkYXRlZFBhZ2UocGFnZU1heFRpbWVJbnZpc2libGUsICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCI8YnIvPjxici8+PGJyLz5UaGUgcGFnZSB3YXMgaW5hY3RpdmUgZm9yIHRvbyBsb25nPGJyLz48YnIvPnBsZWFzZSByZWxvYWRcIik7XG4gIH0pO1xuXG4gIHV0aWxpdGllcy5zZXR1cEZ1bGxTY3JlZW5GZWF0dXJlKGxvY2FsQXBwLCBidXR0b25GdWxsc2NyZWVuLCBjYW52YXNFbGVtZW50KTtcbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX29uUGFnZUxvYWQpO1xuIgogIF0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFN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QUNiLFdBQVc7QUFBQSxFQUNYLGNBQWM7QUFBQSxFQUNkLE9BQU87QUFBQSxFQUdQLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLEtBQUs7QUFBQSxFQUNMLFVBQVU7QUFBQSxFQUdWLEtBQUs7QUFBQSxFQUNMLE9BQU87QUFBQSxFQUNQLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFVBQVU7QUFBQSxFQUNWLEtBQUs7QUFBQSxFQUNMLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxFQUNSLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxFQUdaLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUdMLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULGdCQUFnQjtBQUFB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RUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTTtBQUMzQixNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU07QUFDM0IsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNO0FBQzNCLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTTtBQUMzQixNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU07QUFDM0IsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNO0FBQzNCLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTTtBQUMzQixNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU07QUFDM0IsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNO0FBQzNCLFNBQU87QUFBQTtBQVNGLFNBQVMsV0FBVyxDQUFDLEdBQUc7QUFDN0IsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osU0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sUUFBUSxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFBQTtBQVc1RixTQUFTLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUNsQyxNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3ZDLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDdkMsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUN2QyxNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3ZDLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDdkMsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUN2QyxNQUFJLEtBQUssTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQ3ZDLE1BQUksS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDdkMsTUFBSSxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUN2QyxTQUFPO0FBQUE7QUFXRixTQUFTLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUNuQyxNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLElBQUksRUFBRSxJQUNOLElBQUksRUFBRTtBQUNWLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNO0FBQzdCLE1BQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNO0FBQzdCLE1BQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNO0FBQzdCLFNBQU87QUFBQTtBQVdGLFNBQVMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLO0FBQ2xDLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFF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SyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUksS0FBSztBQUNsQixNQUFJLEtBQUssS0FBSztBQUNkLE1BQUksS0FBSyxLQUFLO0FBQ2QsTUFBSSxLQUFLLEtBQUs7QUFDZCxNQUFJLEtBQUssSUFBSSxLQUFLO0FBQ2xCLE1BQUksS0FBSyxLQUFLO0FBQ2QsTUFBSSxLQUFLLEtBQUs7QUFDZCxNQUFJLEtBQUssS0FBSztBQUNkLE1BQUksS0FBSyxJQUFJLEtBQUs7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxjQUFjLENBQUMsS0FBSyxHQUFHO0FBQ3JDLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFN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QUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFO0FBQ1gsU0FBTyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQWMsVUFBVSxLQUFLLElBQUksR0FBSyxLQUFLLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLENB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QUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSztBQUN2RyxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixTQUFPO0FBQUE7QUFTRixTQUFTLFNBQVEsQ0FBQyxLQUFLO0FBQzVCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLFNBQU87QUFBQTtBQVVGLFNBQVMsVUFBUyxDQUFDLEtBQUssR0FBRztBQUVoQyxNQUFJLFFBQVEsR0FBRztBQUNiLFFBQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSztBQUNULFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUs7QUFDVCxRQUFJLEtBQUs7QUFDVCxRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTTtBQUNWLFFBQUksTUFBTTtBQUNWLFFBQUksTUFBTTtBQUFBLEVBQ1osT0FBTztBQUNMLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFO0FBQUE7QUFHZCxTQUFPO0FBQUE7QUFVRixTQUFTLE9BQU0sQ0FBQyxLQUFLLEdBQUc7QUFDN0IsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUU1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBRTVFLE9BQUssS0FBSztBQUNSLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxJQUFNO0FBQ1osTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELFNBQU87QUFBQTtBQVVGLFNBQVMsUUFBTyxDQUFDLEtBQUssR0FBRztBQUM5QixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksS0FBSyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbEcsTUFBSSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNwRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNwRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNsRyxNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxNQUFNLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNuRyxNQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3JHLE1BQUksUUFBUSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDckcsTUFBSSxNQUFNLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNuRyxNQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3JHLE1BQUksTUFBTSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbkcsU0FBTztBQUFBO0FBU0YsU0FBUyxZQUFXLENBQUMsR0FBRztBQUM3QixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBRTVCLFNBQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQUE7QUFXcEUsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFFWixNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE9BQUssRUFBRTtBQUNQLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLO0FBQy9DLE1BQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtB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O0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBa0JGLFNBQVMsdUJBQXVCLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFFakQsTUFBSSxJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUU7QUFDVixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJ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QUksRUFBRSxJQUNOLElBQUksRUFBRSxJQUNOLElBQUksRUFBRTtBQUNWLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxJQUFJO0FBQ2IsTUFBSSxLQUFLLElBQUk7QUFDYixNQUFJLEtBQUssSUFBSTtBQUNiLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksUUFBUSxLQUFLLEtBQUssT0FBTztBQUM3QixNQUFJLFFBQVEsS0FBSyxNQUFNO0FBQ3ZCLE1BQUksUUFBUSxLQUFLLE1BQU07QUFDdkIsTUFBSSxRQUFRLEtBQUssTUFBTTtBQUN2QixNQUFJLFFBQVEsS0FBSyxLQUFLLE9BQU87QUFDN0IsTUFBSSxRQUFRLEtBQUssTUFBTTtBQUN2QixNQUFJLFFBQVEsS0FBSyxNQUFNO0FBQ3ZCLE1BQUksUUFBUSxLQUFLLE1BQU07QUFDdkIsTUFBSSxTQUFTLEtBQUssS0FBSyxPQUFPO0FBQzlCLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTSxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU87QUFDdEQsTUFBSSxNQUFNLEVB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QUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUc7QUFBQTtBQVdqSCxTQUFTLElBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUM3QixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLFNBQU87QUFBQTtBQVdGLFNBQVMsZUFBYyxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQ3hDLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixNQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsTUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixNQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsU0FBTztBQUFBO0FBWUYsU0FBUyxxQkFBb0IsQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFPO0FBQ3JELE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLFNBQU87QUFBQTtBQVVGLFNBQVMsWUFBVyxDQUFDLEdBQUcsR0FBRztBQUNoQyxTQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQUE7QUFVdlIsU0FBUyxPQUFNLENBQUMsR0FBRyxHQUFHO0FBQzNCLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixTQUFPLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQztBQUFBO0FBT3IyQyxJQUFJLE9BQU07QUFNVixJQUFJLE9BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDejJEVixTQUFTLE9BQU0sR0FBRztBQUN2QixNQUFJLE1BQU0sSUFBYSxXQUFXLENBQUM7QUFFbkMsTUFBYSxjQUFjLGNBQWM7QUFDdkMsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQUEsRUFDWDtBQUVBLFNBQU87QUFBQTtBQVNGLFNBQVMsTUFBSyxDQUFDLEdBQUc7QUFDdkIsTUFBSSxNQUFNLElBQWEsV0FBVyxDQUFDO0FBQ25DLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLFNBQU87QUFBQTtBQVNGLFNBQVMsTUFBTSxDQUFDLEdBQUc7QUFDeEIsTUFBSSxJQUFJLEVBQUU7QUFDVixNQUFJLElBQUksRUFBRTtBQUNWLE1BQUksSUFBSSxFQUFFO0FBQ1YsU0FBTyxLQUFLLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFBQTtBQVdwQixTQUFTLFdBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRztBQUNsQyxNQUFJLE1BQU0sSUFBYSxXQUFXLENBQUM7QUFDbkMsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsU0FBTztBQUFBO0FBVUYsU0FBUyxLQUFJLENBQUMsS0FBSyxHQUFHO0FBQzNCLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLFNBQU87QUFBQTtBQVlGLFNBQVMsSUFBRyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUc7QUFDaEMsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsU0FBTztBQUFBO0FBV0YsU0FBUyxJQUFHLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDN0IsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDaEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBVUYsU0FBUyxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQzNCLE1BQUksS0FBSyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLE1BQUksS0FBSyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLE1BQUksS0FBSyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLFNBQU87QUFBQTtBQVVGLFNBQVMsS0FBSyxDQUFDLEtBQUssR0FBRztBQUM1QixNQUFJLEtBQUssS0FBSyxNQUFNLEVBQUUsRUFBRTtBQUN4QixNQUFJLEtBQUssS0FB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LENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDaEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLFNBQU87QUFBQTtBQVVGLFNBQVMsS0FBSSxDQUFDLEtBQUssR0FBRztBQUMzQixNQUFJLEtBQUssS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUN2QixNQUFJLEtBQUssS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUN2QixNQUFJLEtBQUssS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUN2QixNQUFJLEtBQUssS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUN2QixTQUFPO0FBQUE7QUFVRixTQUFTLE1BQUssQ0FBQyxLQUFLLEdBQUc7QUFDNUIsTUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLEVBQUU7QUFDeEIsTUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLEVBQUU7QUFDeEIsTUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLEVBQUU7QUFDeEIsTUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLEVBQUU7QUFDeEIsU0FBTztBQUFBO0FBV0YsU0FBUyxJQUFHLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDN0IsTUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0FBQzVCLE1BQUksS0FBSyxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUM1QixNQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFDNUIsTUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0FBQzVCLFNBQU87QUFBQTtBQVdGLFNBQVMsSUFBRyxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQzdCLE1BQUksS0FBSyxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUM1QixNQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVB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RyxDQUFDO0FBQUEsSUFDVCxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQUEsSUFDVCxDQUFDLEdBQUcsR0FBSSxDQUFDO0FBQUEsSUFDVCxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQUEsSUFDVCxDQUFDLEdBQUcsR0FBRyxDQUFFO0FBQUEsRUFDWDtBQUVBLFFBQU0sYUFBaUM7QUFBQSxJQUNyQyxFQUFFLFNBQVMsU0FBUyxNQUFNO0FBQUEsSUFDMUIsRUFBRSxTQUFTLFNBQVMsTUFBTTtBQUFBLElBQzFCLEVBQUUsU0FBUyxTQUFTLE1BQU07QUFBQSxJQUMxQixFQUFFLFNBQVMsU0FBUyxNQUFNO0FBQUEsSUFDMUIsRUFBRSxTQUFTLFNBQVMsTUFBTTtBQUFBLElBQzFCLEVBQUUsU0FBUyxTQUFTLE1BQU07QUFBQSxJQUMxQixFQUFFLFNBQVMsU0FBUyxNQUFNO0FBQUEsSUFDMUIsRUFBRSxTQUFTLFNBQVMsTUFBTTtBQUFBLEVBQzVCO0FBRUEsUUFBTSxZQUFnQztBQUFBLElBRXBDLENBQUMsR0FBRyxHQUFHLEdBQWtCLENBQUM7QUFBQSxJQUMxQixDQUFDLEdBQUcsR0FBRyxHQUFrQixDQUFDO0FBQUEsSUFFMUIsQ0FBQyxHQUFHLEdBQUcsR0FBa0IsQ0FBQztBQUFBLElBQzFCLENBQUMsR0FBRyxHQUFHLEdBQWtCLENBQUM7QUFBQSxJQUcxQixDQUFDLEdBQUcsR0FBRyxHQUFrQixDQUFDO0FBQUEsSUFDMUIsQ0FBQyxHQUFHLEdBQUcsR0FBa0IsQ0FBQztBQUFBLElBRTFCLENBQUMsR0FBRyxHQUFHLEdBQWtCLENBQUM7QUFBQSxJQUMxQixDQUFDLEdBQUcsR0FBRyxHQUFrQixDQUFDO0FBQUEsSUFHMUIsQ0FBQyxHQUFHLEdBQUcsR0FBa0IsQ0FBQztBQUFBLElBQzFCLENBQUMsR0FBRyxHQUFHLEdBQWtCLENBQUM7QUFBQSxJQUUxQixDQUFDLEdBQUcsR0FBRyxHQUFrQixDQUFDO0FBQUEsSUFDMUIsQ0FBQyxHQUFHLEdBQUcsR0FBa0IsQ0FBQztBQUFBLEVBQzVCO0FBRUEsUUFBTSxXQUFxQixD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QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BRTdDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM5QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsSUFDL0MsQ0FBQztBQUVELFVBQU0sUUFBUTtBQUNkLFVBQU0s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
