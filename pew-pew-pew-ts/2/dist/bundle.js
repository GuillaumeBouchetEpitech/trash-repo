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

// src/local-framework/system/index.ts
var exports_system = {};
__export(exports_system, {
  utilities: () => exports_utilities,
  metrics: () => exports_metrics,
  math: () => exports_math,
  controllers: () => exports_controllers,
  browser: () => exports_browser
});

// src/local-framework/system/browser/index.ts
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

// src/local-framework/system/browser/FullScreenManager.ts
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
// src/local-framework/system/browser/KeyCodes.ts
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

// src/local-framework/system/browser/KeyboardManager.ts
class KeyboardManager {
  _pressedKeysSet = new Set;
  _wasPressedKeysSet = new Set;
  _preventDefaultKeysSet = new Set;
  _activated = false;
  _handleKeyDown;
  _handleKeyUp;
  _onEvent;
  constructor() {
    const handleKeyDown = (event) => {
      const { keyCode } = event;
      if (this._onEvent) {
        this._onEvent();
      }
      if (this._preventDefaultKeysSet.has(keyCode)) {
        event.preventDefault();
      }
      this._pressedKeysSet.add(keyCode);
    };
    const handleKeyUp = (event) => {
      const { keyCode } = event;
      if (this._onEvent) {
        this._onEvent();
      }
      if (this._preventDefaultKeysSet.has(keyCode)) {
        event.preventDefault();
      }
      this._pressedKeysSet.delete(keyCode);
      this._wasPressedKeysSet.add(keyCode);
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
  wasPressed(...inKeys) {
    for (const key of inKeys) {
      if (this._wasPressedKeysSet.has(AllKeyCodes[key])) {
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
  onEvent(callback) {
    this._onEvent = callback;
  }
  resetWasPressedKeys() {
    this._wasPressedKeysSet.clear();
  }
}
var GlobalKeyboardManager = new KeyboardManager;
// src/local-framework/system/browser/MouseManager.ts
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
  _onEvent;
  constructor() {
    const handleMouseDown = (event) => {
      if (this._onEvent) {
        this._onEvent();
      }
      this._pressedButtonsSet.add(event.button);
    };
    const handleMouseUp = (event) => {
      if (this._onEvent) {
        this._onEvent();
      }
      this._pressedButtonsSet.delete(event.button);
    };
    const handleMouseMove = (event) => {
      if (this._onEvent) {
        this._onEvent();
      }
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
  onEvent(callback) {
    this._onEvent = callback;
  }
}
var GlobalMouseManager = new MouseManager;
// src/local-framework/system/browser/PointerLockManager.ts
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
// src/local-framework/system/browser/TouchManager.ts
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
  _onEvent;
  constructor() {
    const handleTouchStart = (event) => {
      event.preventDefault();
      if (this._onEvent) {
        this._onEvent();
      }
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier, pageX, pageY } = event.changedTouches[ii];
        const newData = new TouchData(identifier, pageX, pageY);
        this._allTouchDataMap.set(`${identifier}`, newData);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchEnd = (event) => {
      event.preventDefault();
      if (this._onEvent) {
        this._onEvent();
      }
      for (let ii = 0;ii < event.changedTouches.length; ++ii) {
        const { identifier } = event.changedTouches[ii];
        this._allTouchDataMap.delete(`${identifier}`);
        this._allCachedTouchDataArray.length = 0;
      }
    };
    const handleTouchMove = (event) => {
      event.preventDefault();
      if (this._onEvent) {
        this._onEvent();
      }
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
  onEvent(callback) {
    this._onEvent = callback;
  }
}
var GlobalTouchManager = new TouchManager;
// src/local-framework/system/browser/VisibilityManager.ts
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
// src/local-framework/system/browser/isWebWorkerSupported.ts
var isWebWorkerSupported = () => {
  return !!window.Worker;
};
// src/local-framework/system/browser/isWebGL2Supported.ts
var isWebGL2Supported = () => {
  return !!window.WebGL2RenderingContext;
};
// src/local-framework/system/controllers/index.ts
var exports_controllers = {};
__export(exports_controllers, {
  FreeFlyController: () => FreeFlyController
});

// src/local-framework/system/math/angles.ts
var degreeToRad = (angle) => angle * Math.PI / 180;

// node_modules/gl-matrix/esm/common.js
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var ANGLE_ORDER = "zyx";
function round(a) {
  if (a >= 0)
    return Math.round(a);
  return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
}
var degree = Math.PI / 180;
var radian = 180 / Math.PI;

// node_modules/gl-matrix/esm/mat3.js
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

// node_modules/gl-matrix/esm/mat4.js
var exports_mat4 = {};
__export(exports_mat4, {
  transpose: () => transpose,
  translate: () => translate,
  targetTo: () => targetTo,
  subtract: () => subtract,
  sub: () => sub,
  str: () => str,
  set: () => set,
  scale: () => scale,
  rotateZ: () => rotateZ,
  rotateY: () => rotateY,
  rotateX: () => rotateX,
  rotate: () => rotate,
  perspectiveZO: () => perspectiveZO,
  perspectiveNO: () => perspectiveNO,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspective: () => perspective,
  orthoZO: () => orthoZO,
  orthoNO: () => orthoNO,
  ortho: () => ortho,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  multiplyScalar: () => multiplyScalar,
  multiply: () => multiply,
  mul: () => mul,
  lookAt: () => lookAt,
  invert: () => invert,
  identity: () => identity,
  getTranslation: () => getTranslation,
  getScaling: () => getScaling,
  getRotation: () => getRotation,
  frustum: () => frustum,
  fromZRotation: () => fromZRotation,
  fromYRotation: () => fromYRotation,
  fromXRotation: () => fromXRotation,
  fromValues: () => fromValues,
  fromTranslation: () => fromTranslation,
  fromScaling: () => fromScaling,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotation: () => fromRotation,
  fromQuat2: () => fromQuat2,
  fromQuat: () => fromQuat,
  frob: () => frob,
  exactEquals: () => exactEquals,
  equals: () => equals,
  determinant: () => determinant,
  decompose: () => decompose,
  create: () => create2,
  copy: () => copy,
  clone: () => clone,
  adjoint: () => adjoint,
  add: () => add
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
function clone(a) {
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
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
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
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
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
function identity(out) {
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
function transpose(out, a) {
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
function invert(out, a) {
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
function adjoint(out, a) {
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
  out[0] = a11 * b11 - a12 * b10 + a13 * b09;
  out[1] = a02 * b10 - a01 * b11 - a03 * b09;
  out[2] = a31 * b05 - a32 * b04 + a33 * b03;
  out[3] = a22 * b04 - a21 * b05 - a23 * b03;
  out[4] = a12 * b08 - a10 * b11 - a13 * b07;
  out[5] = a00 * b11 - a02 * b08 + a03 * b07;
  out[6] = a32 * b02 - a30 * b05 - a33 * b01;
  out[7] = a20 * b05 - a22 * b02 + a23 * b01;
  out[8] = a10 * b10 - a11 * b08 + a13 * b06;
  out[9] = a01 * b08 - a00 * b10 - a03 * b06;
  out[10] = a30 * b04 - a31 * b02 + a33 * b00;
  out[11] = a21 * b02 - a20 * b04 - a23 * b00;
  out[12] = a11 * b07 - a10 * b09 - a12 * b06;
  out[13] = a00 * b09 - a01 * b07 + a02 * b06;
  out[14] = a31 * b01 - a30 * b03 - a32 * b00;
  out[15] = a20 * b03 - a21 * b01 + a22 * b00;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = a00 * a11 - a01 * a10;
  var b1 = a00 * a12 - a02 * a10;
  var b2 = a01 * a12 - a02 * a11;
  var b3 = a20 * a31 - a21 * a30;
  var b4 = a20 * a32 - a22 * a30;
  var b5 = a21 * a32 - a22 * a31;
  var b6 = a00 * b5 - a01 * b4 + a02 * b3;
  var b7 = a10 * b5 - a11 * b4 + a12 * b3;
  var b8 = a20 * b2 - a21 * b1 + a22 * b0;
  var b9 = a30 * b2 - a31 * b1 + a32 * b0;
  return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
}
function multiply(out, a, b) {
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
function translate(out, a, v) {
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
function scale(out, a, v) {
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
function rotate(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
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
function fromTranslation(out, v) {
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
function fromScaling(out, v) {
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
function fromRotation(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
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
  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
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
function decompose(out_r, out_t, out_s, mat) {
  out_t[0] = mat[12];
  out_t[1] = mat[13];
  out_t[2] = mat[14];
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  var is1 = 1 / out_s[0];
  var is2 = 1 / out_s[1];
  var is3 = 1 / out_s[2];
  var sm11 = m11 * is1;
  var sm12 = m12 * is2;
  var sm13 = m13 * is3;
  var sm21 = m21 * is1;
  var sm22 = m22 * is2;
  var sm23 = m23 * is3;
  var sm31 = m31 * is1;
  var sm32 = m32 * is2;
  var sm33 = m33 * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out_r[3] = 0.25 * S;
    out_r[0] = (sm23 - sm32) / S;
    out_r[1] = (sm31 - sm13) / S;
    out_r[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out_r[3] = (sm23 - sm32) / S;
    out_r[0] = 0.25 * S;
    out_r[1] = (sm12 + sm21) / S;
    out_r[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out_r[3] = (sm31 - sm13) / S;
    out_r[0] = (sm12 + sm21) / S;
    out_r[1] = 0.25 * S;
    out_r[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out_r[3] = (sm12 - sm21) / S;
    out_r[0] = (sm31 + sm13) / S;
    out_r[1] = (sm23 + sm32) / S;
    out_r[2] = 0.25 * S;
  }
  return out_r;
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
  var f = 1 / Math.tan(fovy / 2);
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
    var nf = 1 / (near - far);
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
  var f = 1 / Math.tan(fovy / 2);
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
    var nf = 1 / (near - far);
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
    return identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
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
  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
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
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]);
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
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
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
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
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
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
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
  out[9] = a[9] + b[9] * scale2;
  out[10] = a[10] + b[10] * scale2;
  out[11] = a[11] + b[11] * scale2;
  out[12] = a[12] + b[12] * scale2;
  out[13] = a[13] + b[13] * scale2;
  out[14] = a[14] + b[14] * scale2;
  out[15] = a[15] + b[15] * scale2;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
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
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/quat.js
var exports_quat = {};
__export(exports_quat, {
  str: () => str4,
  squaredLength: () => squaredLength3,
  sqrLen: () => sqrLen3,
  sqlerp: () => sqlerp,
  slerp: () => slerp2,
  setAxisAngle: () => setAxisAngle,
  setAxes: () => setAxes,
  set: () => set4,
  scale: () => scale4,
  rotationTo: () => rotationTo,
  rotateZ: () => rotateZ3,
  rotateY: () => rotateY3,
  rotateX: () => rotateX3,
  random: () => random3,
  pow: () => pow,
  normalize: () => normalize3,
  multiply: () => multiply4,
  mul: () => mul4,
  ln: () => ln,
  lerp: () => lerp3,
  length: () => length3,
  len: () => len3,
  invert: () => invert2,
  identity: () => identity2,
  getAxisAngle: () => getAxisAngle,
  getAngle: () => getAngle,
  fromValues: () => fromValues4,
  fromMat3: () => fromMat3,
  fromEuler: () => fromEuler,
  exp: () => exp,
  exactEquals: () => exactEquals4,
  equals: () => equals4,
  dot: () => dot3,
  create: () => create5,
  copy: () => copy4,
  conjugate: () => conjugate,
  clone: () => clone4,
  calculateW: () => calculateW,
  add: () => add4
});

// node_modules/gl-matrix/esm/vec3.js
var exports_vec3 = {};
__export(exports_vec3, {
  zero: () => zero,
  transformQuat: () => transformQuat,
  transformMat4: () => transformMat4,
  transformMat3: () => transformMat3,
  subtract: () => subtract2,
  sub: () => sub2,
  str: () => str2,
  squaredLength: () => squaredLength,
  squaredDistance: () => squaredDistance,
  sqrLen: () => sqrLen,
  sqrDist: () => sqrDist,
  slerp: () => slerp,
  set: () => set2,
  scaleAndAdd: () => scaleAndAdd,
  scale: () => scale2,
  round: () => round2,
  rotateZ: () => rotateZ2,
  rotateY: () => rotateY2,
  rotateX: () => rotateX2,
  random: () => random,
  normalize: () => normalize,
  negate: () => negate,
  multiply: () => multiply2,
  mul: () => mul2,
  min: () => min,
  max: () => max,
  lerp: () => lerp,
  length: () => length,
  len: () => len,
  inverse: () => inverse,
  hermite: () => hermite,
  fromValues: () => fromValues2,
  forEach: () => forEach,
  floor: () => floor,
  exactEquals: () => exactEquals2,
  equals: () => equals2,
  dot: () => dot,
  divide: () => divide,
  div: () => div,
  distance: () => distance,
  dist: () => dist,
  cross: () => cross,
  create: () => create3,
  copy: () => copy2,
  clone: () => clone2,
  ceil: () => ceil,
  bezier: () => bezier,
  angle: () => angle,
  add: () => add2
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
function clone2(a) {
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
  return Math.sqrt(x * x + y * y + z * z);
}
function fromValues2(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set2(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply2(out, a, b) {
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
function round2(out, a) {
  out[0] = round(a[0]);
  out[1] = round(a[1]);
  out[2] = round(a[2]);
  return out;
}
function scale2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale3) {
  out[0] = a[0] + b[0] * scale3;
  out[1] = a[1] + b[1] * scale3;
  out[2] = a[2] + b[2] * scale3;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
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
function slerp(out, a, b, t) {
  var angle = Math.acos(Math.min(Math.max(dot(a, b), -1), 1));
  var sinTotal = Math.sin(angle);
  var ratioA = Math.sin((1 - t) * angle) / sinTotal;
  var ratioB = Math.sin(t * angle) / sinTotal;
  out[0] = ratioA * a[0] + ratioB * b[0];
  out[1] = ratioA * a[1] + ratioB * b[1];
  out[2] = ratioA * a[2] + ratioB * b[2];
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
function random(out, scale3) {
  scale3 = scale3 === undefined ? 1 : scale3;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale3;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale3;
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
  var vx = a[0], vy = a[1], vz = a[2];
  var tx = qy * vz - qz * vy;
  var ty = qz * vx - qx * vz;
  var tz = qx * vy - qy * vx;
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;
  out[0] = vx + qw * tx + qy * tz - qz * ty;
  out[1] = vy + qw * ty + qz * tx - qx * tz;
  out[2] = vz + qw * tz + qx * ty - qy * tx;
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
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)), cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str2(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub2 = subtract2;
var mul2 = multiply2;
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
  subtract: () => subtract3,
  sub: () => sub3,
  str: () => str3,
  squaredLength: () => squaredLength2,
  squaredDistance: () => squaredDistance2,
  sqrLen: () => sqrLen2,
  sqrDist: () => sqrDist2,
  set: () => set3,
  scaleAndAdd: () => scaleAndAdd2,
  scale: () => scale3,
  round: () => round3,
  random: () => random2,
  normalize: () => normalize2,
  negate: () => negate2,
  multiply: () => multiply3,
  mul: () => mul3,
  min: () => min2,
  max: () => max2,
  lerp: () => lerp2,
  length: () => length2,
  len: () => len2,
  inverse: () => inverse2,
  fromValues: () => fromValues3,
  forEach: () => forEach2,
  floor: () => floor2,
  exactEquals: () => exactEquals3,
  equals: () => equals3,
  dot: () => dot2,
  divide: () => divide2,
  div: () => div2,
  distance: () => distance2,
  dist: () => dist2,
  cross: () => cross2,
  create: () => create4,
  copy: () => copy3,
  clone: () => clone3,
  ceil: () => ceil2,
  add: () => add3
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
function clone3(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues3(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply3(out, a, b) {
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
function round3(out, a) {
  out[0] = round(a[0]);
  out[1] = round(a[1]);
  out[2] = round(a[2]);
  out[3] = round(a[3]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale4) {
  out[0] = a[0] + b[0] * scale4;
  out[1] = a[1] + b[1] * scale4;
  out[2] = a[2] + b[2] * scale4;
  out[3] = a[3] + b[3] * scale4;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
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
  return Math.sqrt(x * x + y * y + z * z + w * w);
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
function random2(out, scale4) {
  scale4 = scale4 === undefined ? 1 : scale4;
  var v1, v2, v3, v4;
  var s1, s2;
  var rand;
  rand = RANDOM();
  v1 = rand * 2 - 1;
  v2 = (4 * RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s1 = v1 * v1 + v2 * v2;
  rand = RANDOM();
  v3 = rand * 2 - 1;
  v4 = (4 * RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s2 = v3 * v3 + v4 * v4;
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale4 * v1;
  out[1] = scale4 * v2;
  out[2] = scale4 * v3 * d;
  out[3] = scale4 * v4 * d;
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
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var vx = a[0], vy = a[1], vz = a[2];
  var tx = qy * vz - qz * vy;
  var ty = qz * vx - qx * vz;
  var tz = qx * vy - qy * vx;
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;
  out[0] = vx + qw * tx + qy * tz - qz * ty;
  out[1] = vy + qw * ty + qz * tx - qx * tz;
  out[2] = vz + qw * tz + qx * ty - qy * tx;
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
function str3(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub3 = subtract3;
var mul3 = multiply3;
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
function identity2(out) {
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
function multiply4(out, a, b) {
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
  scale4(out, out, b);
  exp(out, out);
  return out;
}
function slerp2(out, a, b, t) {
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
function invert2(out, a) {
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
  var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ANGLE_ORDER;
  var halfToRad = Math.PI / 360;
  x *= halfToRad;
  z *= halfToRad;
  y *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  switch (order) {
    case "xyz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "xzy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yxz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yzx":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zxy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zyx":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    default:
      throw new Error("Unknown angle order " + order);
  }
  return out;
}
function str4(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone4 = clone3;
var fromValues4 = fromValues3;
var copy4 = copy3;
var set4 = set3;
var add4 = add3;
var mul4 = multiply4;
var scale4 = scale3;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals4 = exactEquals3;
function equals4(a, b) {
  return Math.abs(dot2(a, b)) >= 1 - EPSILON;
}
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues2(1, 0, 0);
  var yUnitVec3 = fromValues2(0, 1, 0);
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
    slerp2(temp1, a, d, t);
    slerp2(temp2, b, c, t);
    slerp2(out, temp1, temp2, 2 * t * (1 - t));
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
  subtract: () => subtract4,
  sub: () => sub4,
  str: () => str5,
  squaredLength: () => squaredLength4,
  squaredDistance: () => squaredDistance3,
  sqrLen: () => sqrLen4,
  sqrDist: () => sqrDist3,
  signedAngle: () => signedAngle,
  set: () => set5,
  scaleAndAdd: () => scaleAndAdd3,
  scale: () => scale5,
  round: () => round4,
  rotate: () => rotate2,
  random: () => random4,
  normalize: () => normalize4,
  negate: () => negate3,
  multiply: () => multiply5,
  mul: () => mul5,
  min: () => min3,
  max: () => max3,
  lerp: () => lerp4,
  length: () => length4,
  len: () => len4,
  inverse: () => inverse3,
  fromValues: () => fromValues5,
  forEach: () => forEach3,
  floor: () => floor3,
  exactEquals: () => exactEquals5,
  equals: () => equals5,
  dot: () => dot4,
  divide: () => divide3,
  div: () => div3,
  distance: () => distance3,
  dist: () => dist3,
  cross: () => cross3,
  create: () => create6,
  copy: () => copy5,
  clone: () => clone5,
  ceil: () => ceil3,
  angle: () => angle2,
  add: () => add5
});
function create6() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone5(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues5(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy5(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set5(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add5(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply5(out, a, b) {
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
function round4(out, a) {
  out[0] = round(a[0]);
  out[1] = round(a[1]);
  return out;
}
function scale5(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length4(a) {
  var x = a[0], y = a[1];
  return Math.sqrt(x * x + y * y);
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
function random4(out, scale6) {
  scale6 = scale6 === undefined ? 1 : scale6;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale6;
  out[1] = Math.sin(r) * scale6;
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
function rotate2(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var ax = a[0], ay = a[1], bx = b[0], by = b[1];
  return Math.abs(Math.atan2(ay * bx - ax * by, ax * bx + ay * by));
}
function signedAngle(a, b) {
  var ax = a[0], ay = a[1], bx = b[0], by = b[1];
  return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str5(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals5(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals5(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len4 = length4;
var sub4 = subtract4;
var mul5 = multiply5;
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

// src/local-framework/system/controllers/FreeFlyController.ts
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
  _move_forwardAxis = exports_vec3.fromValues(1, 0, 0);
  _move_leftAxis = exports_vec3.fromValues(0, 0, 1);
  _move_upAxis = exports_vec3.fromValues(0, 1, 0);
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
  activate() {
    this._isActivated = true;
    GlobalKeyboardManager.preventDefault("Z");
    GlobalKeyboardManager.preventDefault("W");
    GlobalKeyboardManager.preventDefault("S");
    GlobalKeyboardManager.preventDefault("A");
    GlobalKeyboardManager.preventDefault("Q");
    GlobalKeyboardManager.preventDefault("D");
    GlobalKeyboardManager.preventDefault("Shift");
    GlobalKeyboardManager.preventDefault("C");
    GlobalKeyboardManager.preventDefault("Space");
    GlobalKeyboardManager.preventDefault("ArrowUp");
    GlobalKeyboardManager.preventDefault("ArrowDown");
    GlobalKeyboardManager.preventDefault("ArrowLeft");
    GlobalKeyboardManager.preventDefault("ArrowRight");
  }
  deactivate() {
    this._isActivated = false;
    GlobalKeyboardManager.enableDefault("Z");
    GlobalKeyboardManager.enableDefault("W");
    GlobalKeyboardManager.enableDefault("S");
    GlobalKeyboardManager.enableDefault("A");
    GlobalKeyboardManager.enableDefault("Q");
    GlobalKeyboardManager.enableDefault("D");
    GlobalKeyboardManager.enableDefault("Shift");
    GlobalKeyboardManager.enableDefault("C");
    GlobalKeyboardManager.enableDefault("Space");
    GlobalKeyboardManager.enableDefault("ArrowUp");
    GlobalKeyboardManager.enableDefault("ArrowDown");
    GlobalKeyboardManager.enableDefault("ArrowLeft");
    GlobalKeyboardManager.enableDefault("ArrowRight");
  }
  isInteractedWith() {
    return GlobalKeyboardManager.isPressed("Z", "W", "S", "A", "Q", "D") || GlobalKeyboardManager.isPressed("Shift", "C", "Space") || GlobalKeyboardManager.isPressed("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight");
  }
  update(deltaMsTime, fpsControls = false) {
    let moveForward = false;
    let moveBackward = false;
    let strafeLeft = false;
    let strafeRight = false;
    let isRunning = false;
    let isDiving = false;
    let isRising = false;
    let lookDeltaX = 0;
    let lookDeltaY = 0;
    {
      const deltaX = GlobalMouseManager.deltaX() * this._mouseSensibility;
      const deltaY = GlobalMouseManager.deltaY() * this._mouseSensibility;
      lookDeltaX -= degreeToRad(deltaX) * deltaMsTime;
      lookDeltaY -= degreeToRad(deltaY) * deltaMsTime;
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
      lookDeltaX -= degreeToRad(deltaX) * deltaMsTime;
      lookDeltaY -= degreeToRad(deltaY) * deltaMsTime;
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
    if (!fpsControls) {
      if (GlobalKeyboardManager.isPressed("C")) {
        isDiving = true;
      }
      if (GlobalKeyboardManager.isPressed("Space")) {
        isRising = true;
      }
    }
    const currentLinearSpeed = this._movingSpeed * (isRunning ? 4 : 1) * deltaMsTime;
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
    if (fpsControls) {
      this._move_forwardAxis[axisX] = cosTheta;
      this._move_forwardAxis[axisY] = sinTheta;
      this._move_forwardAxis[axisZ] = 0;
      this._move_leftAxis[axisX] = -sinTheta;
      this._move_leftAxis[axisY] = cosTheta;
      this._move_leftAxis[axisZ] = 0;
      this._move_upAxis[axisX] = 0;
      this._move_upAxis[axisY] = 0;
      this._move_upAxis[axisZ] = 1;
    } else {
      exports_vec3.copy(this._move_forwardAxis, this._forwardAxis);
      exports_vec3.copy(this._move_leftAxis, this._leftAxis);
      exports_vec3.copy(this._move_upAxis, this._upAxis);
    }
    const scaledForward = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledForward, this._move_forwardAxis, currentLinearSpeed);
    const scaledLeft = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledLeft, this._move_leftAxis, currentLinearSpeed);
    const scaledUp = exports_vec3.fromValues(0, 0, 0);
    exports_vec3.scale(scaledUp, this._move_upAxis, currentLinearSpeed);
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
    exports_vec3.add(this._target, this._position, this._forwardAxis);
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
// src/local-framework/system/math/index.ts
var exports_math = {};
__export(exports_math, {
  magnitude: () => magnitude,
  lerp: () => lerp5,
  easePinPong: () => easePinPong,
  easeOutSine: () => easeOutSine,
  easeOutQuint: () => easeOutQuint,
  easeOutQuart: () => easeOutQuart,
  easeOutQuad: () => easeOutQuad,
  easeOutExpo: () => easeOutExpo,
  easeOutElastic: () => easeOutElastic,
  easeOutCubic: () => easeOutCubic,
  easeOutCirc: () => easeOutCirc,
  easeOutBounce: () => easeOutBounce,
  easeOutBack: () => easeOutBack,
  easeInSine: () => easeInSine,
  easeInQuint: () => easeInQuint,
  easeInQuart: () => easeInQuart,
  easeInQuad: () => easeInQuad,
  easeInOutSine: () => easeInOutSine,
  easeInOutQuint: () => easeInOutQuint,
  easeInOutQuart: () => easeInOutQuart,
  easeInOutQuad: () => easeInOutQuad,
  easeInOutExpo: () => easeInOutExpo,
  easeInOutElastic: () => easeInOutElastic,
  easeInOutCubic: () => easeInOutCubic,
  easeInOutCirc: () => easeInOutCirc,
  easeInOutBounce: () => easeInOutBounce,
  easeInOutBack: () => easeInOutBack,
  easeInExpo: () => easeInExpo,
  easeInElastic: () => easeInElastic,
  easeInCubic: () => easeInCubic,
  easeInCirc: () => easeInCirc,
  easeInBounce: () => easeInBounce,
  easeInBack: () => easeInBack,
  easeClamp: () => easeClamp,
  degreeToRad: () => degreeToRad,
  collisions: () => exports_collisions,
  clamp: () => clamp,
  DeterministicRng: () => DeterministicRng
});

// src/local-framework/system/math/clamp.ts
var clamp = (currVal, minVal, maxVal) => Math.min(Math.max(currVal, minVal), maxVal);
// src/local-framework/system/math/collisions.ts
var exports_collisions = {};
__export(exports_collisions, {
  intersectTriangle_raw: () => intersectTriangle_raw,
  intersectTriangle: () => intersectTriangle,
  intersectSegment: () => intersectSegment,
  intersectRaySphere: () => intersectRaySphere,
  collisionLinesStrip: () => collisionLinesStrip
});
var intersectSegment = (A, B, I, P) => {
  const D = exports_vec2.fromValues(0, 0);
  const E = exports_vec2.fromValues(0, 0);
  D[0] = B[0] - A[0];
  D[1] = B[1] - A[1];
  E[0] = P[0] - I[0];
  E[1] = P[1] - I[1];
  const denom = D[0] * E[1] - D[1] * E[0];
  if (denom == 0) {
    return -1;
  }
  const t = -(A[0] * E[1] - I[0] * E[1] - E[0] * A[1] + E[0] * I[1]) / denom;
  if (t < 0 || t >= 1) {
    return 0;
  }
  const u = -(-D[0] * A[1] + D[0] * I[1] + D[1] * A[0] - D[1] * I[0]) / denom;
  if (u < 0 || u >= 1) {
    return 0;
  }
  return 1;
};
var collisionLinesStrip = (tab, P) => {
  const I = exports_vec2.fromValues(0, 0);
  I[0] = 1e4 + Math.random() * 100;
  I[1] = 1e4 + Math.random() * 100;
  let nbIntersections = 0;
  for (let ii = 0;ii < tab.length; ++ii) {
    let jj = (ii + 1) % tab.length;
    const result = intersectSegment(tab[ii], tab[jj], I, P);
    if (result == -1) {
      return collisionLinesStrip(tab, P);
    }
    nbIntersections += result;
  }
  if (nbIntersections % 2 == 1) {
    return true;
  }
  return false;
};
var intersectRaySphere = (p, d, sc, sr) => {
  const m = exports_vec3.sub(exports_vec3.create(), p, sc);
  const b = exports_vec3.dot(m, d);
  const c = exports_vec3.dot(m, m) - sr * sr;
  if (c > 0 && b > 0) {
    return -1;
  }
  const discr = b * b - c;
  if (discr < 0) {
    return -1;
  }
  let outT = -b - Math.sqrt(discr);
  if (outT < 0) {
    outT = 0;
  }
  return outT;
};
var intersectTriangle = (ray_origin, ray_direction, v0, v1, v2) => {
  const v1v0 = exports_vec3.subtract(exports_vec3.create(), v1, v0);
  const v2v0 = exports_vec3.subtract(exports_vec3.create(), v2, v0);
  const rov0 = exports_vec3.subtract(exports_vec3.create(), ray_origin, v0);
  const n = exports_vec3.cross(exports_vec3.create(), v1v0, v2v0);
  const nDotRayDirection = exports_vec3.dot(ray_direction, n);
  if (Math.abs(nDotRayDirection) < 0.0001) {
    return -1;
  }
  const q = exports_vec3.cross(exports_vec3.create(), rov0, ray_direction);
  const d = 1 / nDotRayDirection;
  const u = d * exports_vec3.dot(exports_vec3.negate(exports_vec3.create(), q), v2v0);
  const v = d * exports_vec3.dot(q, v1v0);
  const t = d * exports_vec3.dot(exports_vec3.negate(exports_vec3.create(), n), rov0);
  if (u < 0 || v < 0 || u + v > 1 || t < 0 || t > 1) {
    return -1;
  }
  return t;
};
var intersectTriangle_raw = (ray_origin, ray_direction, v0, v1, v2, outData) => {
  const v1v0 = exports_vec3.subtract(exports_vec3.create(), v1, v0);
  const v2v0 = exports_vec3.subtract(exports_vec3.create(), v2, v0);
  const rov0 = exports_vec3.subtract(exports_vec3.create(), ray_origin, v0);
  const n = exports_vec3.cross(exports_vec3.create(), v1v0, v2v0);
  const nDotRayDirection = exports_vec3.dot(ray_direction, n);
  if (Math.abs(nDotRayDirection) < 0.0001) {
    return -1;
  }
  const q = exports_vec3.cross(exports_vec3.create(), rov0, ray_direction);
  const d = 1 / nDotRayDirection;
  const u = d * exports_vec3.dot(exports_vec3.negate(exports_vec3.create(), q), v2v0);
  const v = d * exports_vec3.dot(q, v1v0);
  const t = d * exports_vec3.dot(exports_vec3.negate(exports_vec3.create(), n), rov0);
  if (u < 0 || v < 0 || u + v > 1 || t < 0 || t > 1) {
    outData.distance = -1;
    exports_vec3.set(outData.normal, 0, 0, 0);
    return -1;
  }
  outData.distance = t;
  exports_vec3.negate(outData.normal, n);
  const length5 = exports_vec3.length(outData.normal);
  if (length5 > 0) {
    exports_vec3.scale(outData.normal, outData.normal, 1 / length5);
  }
  return t;
};
// src/local-framework/system/math/DeterministicRng.ts
var RAND_MAX = 2147483648 | 0;

class DeterministicRng {
  _seed = 1 | 0;
  random() {
    if (this._seed == 0)
      this._seed = 123459876 | 0;
    const hi = this._seed / 127773 | 0;
    const lo = this._seed % 127773 | 0;
    let x = 16807 * lo - 2836 * hi | 0;
    if (x < 0)
      x += 2147483647 | 0;
    this._seed = x;
    return x % (RAND_MAX + 1) / -RAND_MAX;
  }
  normalizedRandom() {
    return this.random() / RAND_MAX;
  }
  setSeed(inSeed) {
    this._seed = inSeed | 0;
  }
}
// src/local-framework/system/math/lerp.ts
var lerp5 = (ratio, minVal, maxVal) => minVal + (maxVal - minVal) * ratio;
// src/local-framework/system/math/easing.ts
var easeClamp = (t) => {
  if (t > 1) {
    return t - Math.floor(t);
  }
  return t;
};
var easePinPong = (t) => {
  t *= 2;
  if (t < 1)
    return t;
  t -= 1;
  return 1 - t;
};
var easeInSine = (t) => {
  return Math.sin(1.5707963 * t);
};
var easeOutSine = (t) => {
  return 1 + Math.sin(1.5707963 * (t - 1));
};
var easeInOutSine = (t) => {
  return 0.5 * (1 + Math.sin(3.1415926 * (t - 0.5)));
};
var easeInQuad = (t) => {
  return t * t;
};
var easeOutQuad = (t) => {
  return t * (2 - t);
};
var easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : t * (4 - 2 * t) - 1;
};
var easeInCubic = (t) => {
  return t * t * t;
};
var easeOutCubic = (t) => {
  const t2 = t - 1;
  return 1 + t2 * t2 * t2;
};
var easeInOutCubic = (t) => {
  const t2 = t - 1;
  const t3 = t2 - 1;
  return t < 0.5 ? 4 * t * t * t : 1 + t2 * (2 * t3) * (2 * t3);
};
var easeInQuart = (t) => {
  t *= t;
  return t * t;
};
var easeOutQuart = (t) => {
  const t2 = t - 1;
  t = t2 * t2;
  return 1 - t * t;
};
var easeInOutQuart = (t) => {
  if (t < 0.5) {
    t *= t;
    return 8 * t * t;
  }
  const t2 = t - 1;
  t = t2 * t2;
  return 1 - 8 * t * t;
};
var easeInQuint = (t) => {
  const t2 = t * t;
  return t * t2 * t2;
};
var easeOutQuint = (t) => {
  const tx = t - 1;
  const t2 = tx * tx;
  return 1 + tx * t2 * t2;
};
var easeInOutQuint = (t) => {
  let t2;
  if (t < 0.5) {
    t2 = t * t;
    return 16 * t * t2 * t2;
  }
  const tx = t - 1;
  t2 = tx * tx;
  return 1 + 16 * tx * t2 * t2;
};
var easeInExpo = (t) => {
  return (Math.pow(2, 8 * t) - 1) / 255;
};
var easeOutExpo = (t) => {
  return 1 - Math.pow(2, -8 * t);
};
var easeInOutExpo = (t) => {
  if (t < 0.5)
    return (Math.pow(2, 16 * t) - 1) / 510;
  return 1 - 0.5 * Math.pow(2, -16 * (t - 0.5));
};
var easeInCirc = (t) => {
  return 1 - Math.sqrt(1 - t);
};
var easeOutCirc = (t) => {
  return Math.sqrt(t);
};
var easeInOutCirc = (t) => {
  if (t < 0.5)
    return (1 - Math.sqrt(1 - 2 * t)) * 0.5;
  return (1 + Math.sqrt(2 * t - 1)) * 0.5;
};
var easeInBack = (t) => {
  return t * t * (2.70158 * t - 1.70158);
};
var easeOutBack = (t) => {
  const tx = t - 1;
  return 1 + tx * tx * (2.70158 * tx + 1.70158);
};
var easeInOutBack = (t) => {
  if (t < 0.5)
    return t * t * (7 * t - 2.5) * 2;
  const tx = t - 1;
  return 1 + tx * tx * 2 * (7 * tx + 2.5);
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
  let t2;
  if (t < 0.45) {
    t2 = t * t;
    return 8 * t2 * t2 * Math.sin(t * Math.PI * 9);
  }
  if (t < 0.55)
    return 0.5 + 0.75 * Math.sin(t * Math.PI * 4);
  t2 = (t - 1) * (t - 1);
  return 1 - 8 * t2 * t2 * Math.sin(t * Math.PI * 9);
};
var easeInBounce = (t) => {
  return Math.pow(2, 6 * (t - 1)) * Math.abs(Math.sin(t * Math.PI * 3.5));
};
var easeOutBounce = (t) => {
  return 1 - Math.pow(2, -6 * t) * Math.abs(Math.cos(t * Math.PI * 3.5));
};
var easeInOutBounce = (t) => {
  if (t < 0.5)
    return 8 * Math.pow(2, 8 * (t - 1)) * Math.abs(Math.sin(t * Math.PI * 7));
  return 1 - 8 * Math.pow(2, -8 * t) * Math.abs(Math.sin(t * Math.PI * 7));
};
// src/local-framework/system/math/magnitude.ts
var magnitude = (valA, valB) => {
  return Math.sqrt(valA * valA + valB * valB);
};
// src/local-framework/system/metrics/index.ts
var exports_metrics = {};
__export(exports_metrics, {
  FrameProfiler: () => FrameProfiler
});

// src/local-framework/system/metrics/FrameProfiler.ts
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
// src/local-framework/system/utilities/index.ts
var exports_utilities = {};
__export(exports_utilities, {
  AsyncHelpers: () => AsyncHelpers
});

// src/local-framework/system/utilities/AsyncHelpers.ts
class AsyncHelpers {
  static async sleep(delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  static cancellableSleep(delay) {
    let timeoutHandle = -1;
    let resolveCallback = undefined;
    const promise = new Promise((resolve) => {
      resolveCallback = resolve;
      timeoutHandle = window.setTimeout(resolve, delay);
    });
    return {
      promise,
      cancel: () => {
        if (timeoutHandle >= 0) {
          window.clearTimeout(timeoutHandle);
        }
        if (resolveCallback) {
          resolveCallback();
        }
      }
    };
  }
}
// src/local-framework/graphics/index.ts
var exports_graphics = {};
__export(exports_graphics, {
  webgl2: () => exports_webgl2,
  renderers: () => exports_renderers,
  images: () => exports_images,
  geometries: () => exports_geometries,
  camera: () => exports_camera
});

// src/local-framework/graphics/camera/index.ts
var exports_camera = {};
__export(exports_camera, {
  sceneToScreenCoordinates: () => sceneToScreenCoordinates,
  FrustumCulling: () => FrustumCulling,
  Camera: () => Camera
});

// src/local-framework/graphics/camera/Camera.ts
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
      exports_mat4.perspective(this._projectionMatrix, degreeToRad(fovy), aspectRatio, near, far);
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
// src/local-framework/graphics/camera/FrustumCulling.ts
class FrustumCulling {
  _frustum = new Float32Array(24);
  _setPlane(side, left, right, coef) {
    const index = side * 4;
    this._frustum[index + 0] = left[0] + right[0] * coef;
    this._frustum[index + 1] = left[1] + right[1] * coef;
    this._frustum[index + 2] = left[2] + right[2] * coef;
    this._frustum[index + 3] = left[3] + right[3] * coef;
    const magnitude3 = Math.sqrt(this._frustum[index + 0] * this._frustum[index + 0] + this._frustum[index + 1] * this._frustum[index + 1] + this._frustum[index + 2] * this._frustum[index + 2]);
    if (magnitude3 === 0)
      return;
    this._frustum[index + 0] /= magnitude3;
    this._frustum[index + 1] /= magnitude3;
    this._frustum[index + 2] /= magnitude3;
    this._frustum[index + 3] /= magnitude3;
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
// src/local-framework/graphics/camera/sceneToScreenCoordinates.ts
var sceneToScreenCoordinates = (scenePos, modelView, projection, viewport) => {
  const inputVec4 = exports_vec4.fromValues(scenePos[0], scenePos[1], scenePos[2], 1);
  const composedMatrix = exports_mat4.create();
  const multipliedVec4 = exports_vec4.create();
  exports_mat4.multiply(composedMatrix, projection, modelView);
  exports_vec4.transformMat4(multipliedVec4, inputVec4, composedMatrix);
  if (multipliedVec4[3] === 0)
    return null;
  multipliedVec4[3] = 1 / multipliedVec4[3];
  multipliedVec4[0] *= multipliedVec4[3];
  multipliedVec4[1] *= multipliedVec4[3];
  multipliedVec4[2] *= multipliedVec4[3];
  return [
    (multipliedVec4[0] * 0.5 + 0.5) * viewport[2] + viewport[0],
    (multipliedVec4[1] * 0.5 + 0.5) * viewport[3] + viewport[1],
    multipliedVec4[3]
  ];
};
// src/local-framework/graphics/renderers/index.ts
var exports_renderers = {};
__export(exports_renderers, {
  widgets: () => exports_widgets,
  TextRenderer: () => TextRenderer,
  StackRenderers: () => StackRenderers,
  GeometryRenderer: () => GeometryRenderer
});

// src/local-framework/graphics/webgl2/index.ts
var exports_webgl2 = {};
__export(exports_webgl2, {
  getCubeMapType: () => getCubeMapType,
  checkError: () => checkError,
  WebGLContext: () => WebGLContext,
  TextureRepeat: () => TextureRepeat,
  TextureFilter: () => TextureFilter,
  TextureArray: () => TextureArray,
  Texture: () => Texture,
  ShaderProgram: () => ShaderProgram,
  GeometryWrapper: () => exports_GeometryWrapper,
  FrameBuffer: () => FrameBuffer,
  FenceSync: () => FenceSync,
  DataTexture: () => DataTexture,
  CubeMapType: () => CubeMapType,
  CubeMap: () => CubeMap
});

// src/local-framework/graphics/webgl2/WebGLContext.ts
class WebGLContext {
  static _gl = null;
  static _extensionLoseContext = null;
  static initialize(canvas) {
    const renderingContextAttribs = {
      alpha: true,
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
    if (!WebGLContext._gl) {
      throw new Error("webgl context not initialized");
    }
    return WebGLContext._gl;
  }
  static getExtensionLoseContext() {
    return WebGLContext._extensionLoseContext;
  }
  static getExtensionLoseContextStrict() {
    if (!WebGLContext._extensionLoseContext) {
      throw new Error("lose context extension not available");
    }
    return WebGLContext._extensionLoseContext;
  }
}

// src/local-framework/graphics/webgl2/CubeMap.ts
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
  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteTexture(this._texture);
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
// src/local-framework/graphics/webgl2/DataTexture.ts
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
  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteTexture(this._texture);
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
// src/local-framework/graphics/webgl2/Error.ts
var checkError = () => {
  const gl = WebGLContext.getContext();
  const errorId = gl.getError();
  switch (errorId) {
    case gl.INVALID_ENUM:
      throw new Error(`gl.INVALID_ENUM
An unacceptable value is specified for an enumerated argument. The offending command is ignored and has no other side effect than to set the error flag.`);
    case gl.INVALID_VALUE:
      throw new Error(`gl.INVALID_VALUE
A numeric argument is out of range. The offending command is ignored and has no other side effect than to set the error flag.`);
    case gl.INVALID_OPERATION:
      throw new Error(`gl.INVALID_OPERATION
The specified operation is not allowed in the current state. The offending command is ignored and has no other side effect than to set the error flag.`);
    case gl.INVALID_FRAMEBUFFER_OPERATION:
      throw new Error(`gl.INVALID_FRAMEBUFFER_OPERATION
The framebuffer object is not complete. The offending command is ignored and has no other side effect than to set the error flag.`);
    case gl.OUT_OF_MEMORY:
      throw new Error(`gl.OUT_OF_MEMORY
There is not enough memory left to execute the command. The state of the GL is undefined, except for the state of the error flags, after this error is recorded.`);
    case gl.CONTEXT_LOST_WEBGL:
      throw new Error(`gl.CONTEXT_LOST_WEBGL
 If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.`);
  }
};
// src/local-framework/graphics/webgl2/Fence.ts
class FenceSync {
  _sync;
  constructor() {}
  dispose() {
    if (!this._sync) {
      return;
    }
    const gl = WebGLContext.getContext();
    gl.deleteSync(this._sync);
    this._sync = undefined;
  }
  isStarted() {
    return this._sync !== undefined;
  }
  start() {
    if (this._sync) {
      this.dispose();
    }
    const gl = WebGLContext.getContext();
    const tmpSync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (tmpSync === null) {
      throw new Error("could not create a webgl fence");
    }
    this._sync = tmpSync;
    gl.flush();
    gl.finish();
  }
  isSignaled() {
    if (!this._sync) {
      throw new Error("fence not started");
    }
    const gl = WebGLContext.getContext();
    const signaled = gl.getSyncParameter(this._sync, gl.SYNC_STATUS);
    return signaled === gl.SIGNALED;
  }
  wait(timeoutNanoSec) {
    if (!this._sync) {
      throw new Error("fence not started");
    }
    const gl = WebGLContext.getContext();
    const bitflags = 0;
    const status = gl.clientWaitSync(this._sync, bitflags, timeoutNanoSec);
    switch (status) {
      case gl.TIMEOUT_EXPIRED:
        return "timed-out";
      case gl.WAIT_FAILED:
        console.warn("fence.wait -> should never get here");
        this.dispose();
        return "done";
      case gl.ALREADY_SIGNALED:
      case gl.CONDITION_SATISFIED:
      default:
        this.dispose();
        return "done";
    }
  }
}
// src/local-framework/graphics/webgl2/FrameBuffer.ts
class FrameBuffer {
  _frameBuffer;
  constructor() {
    const gl = WebGLContext.getContext();
    const tmpFbo = gl.createFramebuffer();
    if (tmpFbo === null)
      throw new Error("null frame buffer object");
    this._frameBuffer = tmpFbo;
  }
  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteFramebuffer(this._frameBuffer);
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
  attachDepthTexture(texture) {
    const gl = WebGLContext.getContext();
    const mipmapLevel = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, texture.getRawObject(), mipmapLevel);
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
// src/local-framework/graphics/webgl2/GeometryWrapper.ts
var exports_GeometryWrapper = {};
__export(exports_GeometryWrapper, {
  PrimitiveType: () => PrimitiveType,
  GeometryBuilder: () => GeometryBuilder,
  Geometry: () => Geometry,
  BytesPerPixel: () => BytesPerPixel,
  AttributeType: () => AttributeType
});
var BytesPerPixel = 4;
var AttributeType;
((AttributeType2) => {
  AttributeType2[AttributeType2["float"] = 0] = "float";
  AttributeType2[AttributeType2["vec2f"] = 1] = "vec2f";
  AttributeType2[AttributeType2["vec3f"] = 2] = "vec3f";
  AttributeType2[AttributeType2["vec4f"] = 3] = "vec4f";
  AttributeType2[AttributeType2["mat3f"] = 4] = "mat3f";
  AttributeType2[AttributeType2["mat4f"] = 5] = "mat4f";
})(AttributeType ||= {});
var getAttrTypeSize = (inType) => {
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
var PrimitiveType;
((PrimitiveType2) => {
  PrimitiveType2[PrimitiveType2["lines"] = 0] = "lines";
  PrimitiveType2[PrimitiveType2["triangles"] = 1] = "triangles";
  PrimitiveType2[PrimitiveType2["triangleStrip"] = 2] = "triangleStrip";
})(PrimitiveType ||= {});
var _ensureFloatBuffer = (vertices) => {
  if (vertices instanceof Float32Array) {
    return vertices;
  }
  return new Float32Array(vertices);
};
var _getBufferUsage = (inMode) => {
  const gl = WebGLContext.getContext();
  if (inMode === "dynamic") {
    return gl.DYNAMIC_DRAW;
  }
  if (inMode === "streaming") {
    return gl.STREAM_DRAW;
  }
  return gl.STATIC_DRAW;
};

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
        mode: vboDef.mode || "static"
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
        stride *= BytesPerPixel;
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
          const rowIndex = (attr.index + ii * rowSize) * BytesPerPixel;
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
    for (const vbo of this._vbos) {
      gl.deleteBuffer(vbo.object);
    }
    this._vbos.length = 0;
    gl.deleteVertexArray(this._vao);
  }
  setBufferSize(inIndex, inSize) {
    if (inIndex < 0 || inIndex >= this._vbos.length) {
      throw new Error(`no vbo available to that index (input: ${inIndex})`);
    }
    if (inSize <= 0) {
      throw new Error(`vbo must be > 0 (input: ${inSize})`);
    }
    const currVbo = this._vbos[inIndex];
    if (inSize < currVbo.maxSize) {
      return;
    }
    currVbo.maxSize = inSize;
    const gl = WebGLContext.getContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
    gl.bufferData(gl.ARRAY_BUFFER, inSize, _getBufferUsage(currVbo.mode));
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  setFloatBufferSize(index, inSize) {
    this.setBufferSize(index, inSize * 4);
  }
  allocateBuffer(inIndex, inVertices, inSize) {
    if (inIndex < 0 || inIndex >= this._vbos.length) {
      throw new Error(`no vbo available to that index (input: ${inIndex}, total vbos: ${this._vbos.length})`);
    }
    if (inSize <= 0) {
      throw new Error(`size must be > 0 (input: ${inSize})`);
    }
    const currVbo = this._vbos[inIndex];
    if (inSize <= 0) {
      throw new Error(`vbo must be > 0 (input: ${inSize})`);
    }
    currVbo.maxSize = inSize;
    const buffer = _ensureFloatBuffer(inVertices);
    const gl = WebGLContext.getContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, _getBufferUsage(currVbo.mode), 0, inSize);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  updateBuffer(inIndex, inVertices, inSize, inStartOffset) {
    if (inIndex < 0 || inIndex >= this._vbos.length) {
      throw new Error(`no vbo available to that index (input: ${inIndex}, total vbos: ${this._vbos.length})`);
    }
    if (inSize <= 0) {
      throw new Error(`size must be > 0 (input: ${inSize})`);
    }
    const currVbo = this._vbos[inIndex];
    if (inStartOffset !== undefined) {
      if (inStartOffset < 0) {
        throw new Error(`offset must be >= 0 (input: ${inStartOffset})`);
      }
      const endIndex = inStartOffset + inSize;
      if (endIndex > currVbo.maxSize) {
        throw new Error(`offset + size > to vbo max size (input: ${endIndex}, max size: ${currVbo.maxSize})`);
      }
    } else if (inSize > currVbo.maxSize) {
      throw new Error(`size must be < to vbo max size (input: ${inSize}, max size: ${currVbo.maxSize})`);
    }
    const buffer = _ensureFloatBuffer(inVertices);
    const gl = WebGLContext.getContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, currVbo.object);
    gl.bufferSubData(gl.ARRAY_BUFFER, inStartOffset ?? 0, buffer, 0, inSize);
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
    this._getLastVbo().mode = "dynamic";
    return this;
  }
  setVboAsStreaming() {
    this._getLastVbo().mode = "streaming";
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
// src/local-framework/graphics/webgl2/ShaderProgram.ts
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
    if (!program) {
      throw new Error("could not create a shader program");
    }
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
  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteProgram(this._program);
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
    if (attribute === undefined) {
      throw new Error(`attribute not found: ${name}`);
    }
    return attribute;
  }
  getUniform(name) {
    const uniform = this._uniforms.get(name);
    if (uniform === undefined) {
      throw new Error(`uniform not found: ${name}`);
    }
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
  setMatrix3Uniform(inName, inMatrix) {
    const gl = WebGLContext.getContext();
    gl.uniformMatrix3fv(this.getUniform(inName), false, inMatrix);
  }
  setMatrix4Uniform(inName, inMatrix) {
    const gl = WebGLContext.getContext();
    gl.uniformMatrix4fv(this.getUniform(inName), false, inMatrix);
  }
  _getAttributes(attributes) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < attributes.length; ++ii) {
      const value = gl.getAttribLocation(this._program, attributes[ii]);
      if (value < 0) {
        throw new Error(`attribute not found => ${attributes[ii]}`);
      }
      this._attributes.set(attributes[ii], value);
    }
  }
  _getUniforms(uniforms) {
    const gl = WebGLContext.getContext();
    for (let ii = 0;ii < uniforms.length; ++ii) {
      const value = gl.getUniformLocation(this._program, uniforms[ii]);
      if (value === null) {
        throw new Error(`uniform not found => ${uniforms[ii]}`);
      }
      this._uniforms.set(uniforms[ii], value);
    }
  }
  _getShader(src, type) {
    const gl = WebGLContext.getContext();
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error("could not create a shader");
    }
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
// src/local-framework/graphics/webgl2/Texture.ts
var TextureFilter;
((TextureFilter2) => {
  TextureFilter2[TextureFilter2["pixelated"] = 0] = "pixelated";
  TextureFilter2[TextureFilter2["linear"] = 1] = "linear";
  TextureFilter2[TextureFilter2["mipmap"] = 2] = "mipmap";
})(TextureFilter ||= {});
var TextureRepeat;
((TextureRepeat2) => {
  TextureRepeat2[TextureRepeat2["noRepeat"] = 0] = "noRepeat";
  TextureRepeat2[TextureRepeat2["repeat"] = 1] = "repeat";
})(TextureRepeat ||= {});

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
  load(inImage, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inImage.width, inImage.height, inImage, mode, repeat);
  }
  loadFromMemory(inWidth, inHeight, inPixels, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, inPixels, mode, repeat);
  }
  allocate(inWidth, inHeight, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, null, mode, repeat);
  }
  allocateDepth(inWidth, inHeight, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, null, mode, repeat, true);
  }
  resize(inWidth, inHeight, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, null, mode, repeat);
  }
  _allocate(inWidth, inHeight, inPixels = null, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */, isDepthTexture = false) {
    if (!this._texture) {
      throw new Error("texture: not initialized");
    }
    const gl = WebGLContext.getContext();
    this._width = inWidth;
    this._height = inHeight;
    const level = 0;
    const internalFormat = isDepthTexture ? gl.DEPTH_COMPONENT32F : gl.RGBA;
    const border = 0;
    const srcFormat = isDepthTexture ? gl.DEPTH_COMPONENT : gl.RGBA;
    const srcType = isDepthTexture ? gl.FLOAT : gl.UNSIGNED_BYTE;
    if (inPixels instanceof HTMLImageElement) {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, inPixels);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, inWidth, inHeight, border, srcFormat, srcType, inPixels);
    }
    if (repeat === 0 /* noRepeat */) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else if (repeat === 1 /* repeat */) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    if (mode === 0 /* pixelated */) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else if (mode === 1 /* linear */) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    } else if (mode === 2 /* mipmap */) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }
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
}
// src/local-framework/graphics/webgl2/TextureArray.ts
class TextureArray {
  _width = 0;
  _height = 0;
  _texture = null;
  initialize() {
    if (this._texture)
      throw new Error("texture: already initialized");
    const gl = WebGLContext.getContext();
    this._texture = gl.createTexture();
  }
  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteTexture(this._texture);
  }
  rawBind() {
    if (!this._texture)
      throw new Error("texture: not initialized");
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this._texture);
  }
  preBind(inCallback) {
    this.rawBind();
    inCallback(this);
  }
  bind(inCallback) {
    this.preBind(inCallback);
    TextureArray.unbind();
  }
  static unbind() {
    const gl = WebGLContext.getContext();
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);
  }
  loadFromImage(inWidth, inHeight, inTotalLayers, inImage, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, inTotalLayers, inImage, mode, repeat);
  }
  loadFromMemory(inWidth, inHeight, inTotalLayers, inPixels, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    this._allocate(inWidth, inHeight, inTotalLayers, inPixels, mode, repeat);
  }
  _allocate(inWidth, inHeight, inTotalLayers, inPixels = null, mode = 0 /* pixelated */, repeat = 0 /* noRepeat */) {
    if (!this._texture) {
      throw new Error("texture: not initialized");
    }
    const gl = WebGLContext.getContext();
    this._width = inWidth;
    this._height = inHeight;
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    if (inPixels instanceof HTMLImageElement) {
      gl.texImage3D(gl.TEXTURE_2D_ARRAY, level, internalFormat, inWidth, inHeight, inTotalLayers, border, srcFormat, srcType, inPixels);
    } else {
      gl.texImage3D(gl.TEXTURE_2D_ARRAY, level, internalFormat, inWidth, inHeight, inTotalLayers, border, srcFormat, srcType, inPixels);
    }
    if (repeat === 0 /* noRepeat */) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else if (repeat === 1 /* repeat */) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    if (mode === 0 /* pixelated */) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else if (mode === 1 /* linear */) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    } else if (mode === 2 /* mipmap */) {
      gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }
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
}
// src/local-framework/graphics/renderers/geometry-renderer/shaders/geometry-renderer.glsl.vert
var geometry_renderer_glsl_default = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;

in vec3 a_vertex_position;
in vec3 a_vertex_normal;

in vec3 a_offset_center;
in vec4 a_offset_orientation;
in vec3 a_offset_color;
in vec3 a_offset_scale;

flat out vec4 v_color;
out vec3 v_worldSpacePosition;
out vec3 v_worldSpaceNormal;


vec3 apply_quat_to_vec3(vec3 position, vec4 q)
{
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

void main(void)
{
	vec3 worldSpacePosition = a_offset_center + apply_quat_to_vec3(a_vertex_position * a_offset_scale, a_offset_orientation);
	vec3 worldSpaceNormal = apply_quat_to_vec3(a_vertex_normal, a_offset_orientation);

  gl_Position = u_composedMatrix * vec4(worldSpacePosition, 1.0);

  v_color = vec4(a_offset_color, 1.0);
  v_worldSpacePosition = worldSpacePosition;
  v_worldSpaceNormal = worldSpaceNormal;
}
`.trim();

// src/local-framework/graphics/renderers/geometry-renderer/shaders/geometry-renderer.glsl.frag
var geometry_renderer_glsl_default2 = `
#version 300 es

precision lowp float;

uniform vec3 u_lightPos;

flat in vec4 v_color;
in vec3 v_worldSpacePosition;
in vec3 v_worldSpaceNormal;

out vec4 o_color;

//
//
//

const float k_ambiantCoef = 0.1;

const vec3 k_specColor = vec3(1.0, 1.0, 1.0);

vec3 _getLightColor(vec4 currentColor)
{
  vec3 normal = normalize(v_worldSpaceNormal);
  vec3 lightDir = normalize(u_lightPos - v_worldSpacePosition);

  float diffuseCoef = max(dot(lightDir, v_worldSpaceNormal.xyz), 0.0);
  float specularCoef = 0.0;

  // if (diffuseCoef > 0.0 && v_skipSpecular < 0.5)
  // {
  //   // specular

  //   vec3 reflectDir = reflect(-lightDir, normal);
  //   vec3 viewDir = normalize(u_lightPos - v_worldSpacePosition);

  //   float specAngle = max(dot(reflectDir, viewDir), 0.0);
  //   specularCoef = pow(specAngle, 32.0);
  // }

  vec3 diffuseColor = currentColor.rgb * (k_ambiantCoef + diffuseCoef);
  vec3 specularColor = k_specColor * specularCoef * currentColor.a;

  return diffuseColor + specularColor;
}

//
//
//

void main(void)
{
  o_color = vec4(_getLightColor(v_color), 1.0);
}
`.trim();

// src/local-framework/graphics/renderers/geometry-renderer/GeometryRenderer.ts
var k_bufferSize = 14 * 1024;

class GeometryRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize);
  _currentSize = 0;
  constructor() {
    this._shader = new ShaderProgram("StackRenderers", {
      vertexSrc: geometry_renderer_glsl_default,
      fragmentSrc: geometry_renderer_glsl_default2,
      attributes: [
        "a_vertex_position",
        "a_vertex_normal",
        "a_offset_center",
        "a_offset_orientation",
        "a_offset_color",
        "a_offset_scale"
      ],
      uniforms: [
        "u_composedMatrix",
        "u_lightPos"
      ]
    });
    const geoBuilder = new exports_GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec3f").addVboAttribute("a_vertex_normal", "vec3f").addVbo().setVboAsStreaming().setVboAsInstanced().addVboAttribute("a_offset_center", "vec3f").addVboAttribute("a_offset_orientation", "vec4f").addVboAttribute("a_offset_color", "vec3f").addVboAttribute("a_offset_scale", "vec3f");
    this._geometry = new exports_GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
    this._geometry.setFloatBufferSize(1, k_bufferSize);
  }
  setGeometryVertices(vertices) {
    const buf = new Float32Array([...vertices.map((val) => [...val.pos, ...val.normal]).flat()]);
    this._geometry.allocateBuffer(0, buf, buf.length);
    this._geometry.setPrimitiveCount(buf.length / 6);
  }
  push(inPointA, inQuat, inColor, inScale) {
    if (this._currentSize + 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this._flush();
      } else {
        return;
      }
    }
    this._buffer[this._currentSize++] = inPointA[0];
    this._buffer[this._currentSize++] = inPointA[1];
    this._buffer[this._currentSize++] = inPointA[2];
    this._buffer[this._currentSize++] = inQuat[0];
    this._buffer[this._currentSize++] = inQuat[1];
    this._buffer[this._currentSize++] = inQuat[2];
    this._buffer[this._currentSize++] = inQuat[3];
    this._buffer[this._currentSize++] = inColor[0];
    this._buffer[this._currentSize++] = inColor[1];
    this._buffer[this._currentSize++] = inColor[2];
    this._buffer[this._currentSize++] = inScale[0];
    this._buffer[this._currentSize++] = inScale[1];
    this._buffer[this._currentSize++] = inScale[2];
  }
  flush(inCamera) {
    if (!this.canRender()) {
      return;
    }
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inCamera.getComposedMatrix());
      const eyePos = inCamera.getEye();
      bound.setFloat3Uniform("u_lightPos", eyePos[0], eyePos[1], eyePos[2]);
      this._flush();
    });
  }
  safeRender(inCamera, inCallback) {
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inCamera.getComposedMatrix());
      const eyePos = inCamera.getEye();
      bound.setFloat3Uniform("u_lightPos", eyePos[0], eyePos[1], eyePos[2]);
      inCallback();
      this._flush();
    });
  }
  _flush() {
    this._geometry.updateBuffer(1, this._buffer, this._currentSize, 0);
    this._geometry.setInstancedCount(this._currentSize / 13);
    this._geometry.render();
    this.clear();
  }
  canRender() {
    return this._currentSize > 0;
  }
  clear() {
    this._currentSize = 0;
  }
}
// src/local-framework/graphics/renderers/stack-renderers/shaders/stack-renderer.glsl.vert
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

// src/local-framework/graphics/renderers/stack-renderers/shaders/stack-renderer.glsl.frag
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

// src/local-framework/graphics/renderers/stack-renderers/internals/WireFramesStackRenderer.ts
var k_bufferSize2 = 2 * 1024 * 60;

class WireFramesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize2);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_GeometryWrapper.PrimitiveType.lines
    };
    this._geometry = new exports_GeometryWrapper.Geometry(inShader, geometryDef);
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
    this._geometry.allocateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// src/local-framework/graphics/renderers/stack-renderers/internals/TrianglesStackRenderer.ts
var k_bufferSize3 = 1024 * 1024;

class TrianglesStackRenderer {
  _shader;
  _geometry;
  _buffer = new Float32Array(k_bufferSize3);
  _currentSize = 0;
  constructor(inShader, inGeometryDef) {
    this._shader = inShader;
    const geometryDef = {
      ...inGeometryDef,
      primitiveType: exports_GeometryWrapper.PrimitiveType.triangles
    };
    this._geometry = new exports_GeometryWrapper.Geometry(inShader, geometryDef);
  }
  pushRawTriangle(inPointA, inPointB, inPointC, inColorA, inColorB, inColorC) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    const alphaValueA = inColorA.length == 4 ? inColorA[3] : 1;
    const alphaValueB = inColorA.length == 4 ? inColorA[3] : 1;
    const alphaValueC = inColorA.length == 4 ? inColorA[3] : 1;
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColorA[0];
    this._buffer[this._currentSize + 4] = inColorA[1];
    this._buffer[this._currentSize + 5] = inColorA[2];
    this._buffer[this._currentSize + 6] = alphaValueA;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColorB[0];
    this._buffer[this._currentSize + 4] = inColorB[1];
    this._buffer[this._currentSize + 5] = inColorB[2];
    this._buffer[this._currentSize + 6] = alphaValueB;
    this._currentSize += 7;
    this._buffer[this._currentSize + 0] = inPointC[0];
    this._buffer[this._currentSize + 1] = inPointC[1];
    this._buffer[this._currentSize + 2] = inPointC[2];
    this._buffer[this._currentSize + 3] = inColorC[0];
    this._buffer[this._currentSize + 4] = inColorC[1];
    this._buffer[this._currentSize + 5] = inColorC[2];
    this._buffer[this._currentSize + 6] = alphaValueC;
    this._currentSize += 7;
  }
  pushTriangle(inPointA, inPointB, inPointC, inColor) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }
    this.pushRawTriangle(inPointA, inPointB, inPointC, inColor, inColor, inColor);
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
  push3dLine(inPointA, inPointB, thicknessA, thicknessB, inColorA, inColorB) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }
    const diffX = inPointB[0] - inPointA[0];
    const diffY = inPointB[1] - inPointA[1];
    const diffZ = inPointB[2] - inPointA[2];
    const horizontalAngle = Math.atan2(diffY, diffX);
    const verticalAngle = Math.atan2(diffZ, magnitude(diffX, diffY));
    const mat4 = exports_mat4.identity(exports_mat4.create());
    exports_mat4.rotateZ(mat4, mat4, horizontalAngle);
    exports_mat4.rotateY(mat4, mat4, -verticalAngle);
    const totalLength = exports_vec3.distance(inPointA, inPointB);
    const sideA = [
      [totalLength * 0, +thicknessA * 0.5, +thicknessA * 0.5],
      [totalLength * 0, -thicknessA * 0.5, +thicknessA * 0.5],
      [totalLength * 0, -thicknessA * 0.5, -thicknessA * 0.5],
      [totalLength * 0, +thicknessA * 0.5, -thicknessA * 0.5]
    ];
    const sideB = [
      [totalLength * 1, +thicknessB * 0.5, +thicknessB * 0.5],
      [totalLength * 1, -thicknessB * 0.5, +thicknessB * 0.5],
      [totalLength * 1, -thicknessB * 0.5, -thicknessB * 0.5],
      [totalLength * 1, +thicknessB * 0.5, -thicknessB * 0.5]
    ];
    for (const pos of sideA) {
      exports_vec3.transformMat4(pos, pos, mat4);
      exports_vec3.add(pos, pos, inPointA);
    }
    for (const pos of sideB) {
      exports_vec3.transformMat4(pos, pos, mat4);
      exports_vec3.add(pos, pos, inPointA);
    }
    const allQuads = [
      [{ pos: sideA[0], color: inColorA }, { pos: sideA[1], color: inColorA }, { pos: sideB[0], color: inColorB }, { pos: sideB[1], color: inColorB }],
      [{ pos: sideA[1], color: inColorA }, { pos: sideA[2], color: inColorA }, { pos: sideB[1], color: inColorB }, { pos: sideB[2], color: inColorB }],
      [{ pos: sideA[2], color: inColorA }, { pos: sideA[3], color: inColorA }, { pos: sideB[2], color: inColorB }, { pos: sideB[3], color: inColorB }],
      [{ pos: sideA[3], color: inColorA }, { pos: sideA[0], color: inColorA }, { pos: sideB[3], color: inColorB }, { pos: sideB[0], color: inColorB }]
    ];
    const indices = [[0, 3, 2], [0, 1, 3]];
    for (const quad of allQuads) {
      for (const index of indices) {
        this.pushRawTriangle(quad[index[0]].pos, quad[index[1]].pos, quad[index[2]].pos, quad[index[0]].color, quad[index[1]].color, quad[index[2]].color);
      }
    }
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
    this._geometry.allocateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);
    this._geometry.render();
    this.clear();
  }
  clear() {
    this._currentSize = 0;
  }
}

// src/local-framework/graphics/renderers/stack-renderers/StackRenderers.ts
class StackRenderers {
  _shader;
  _wireFramesStackRenderer;
  _trianglesStackRenderer;
  constructor() {
    this._shader = new ShaderProgram("StackRenderers", {
      vertexSrc: stack_renderer_glsl_default,
      fragmentSrc: stack_renderer_glsl_default2,
      attributes: ["a_vertex_position", "a_vertex_color"],
      uniforms: ["u_composedMatrix"]
    });
    const geoBuilder = new exports_GeometryWrapper.GeometryBuilder;
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
  push3dLine(inPointA, inPointB, thicknessA, thicknessB, inColorA, inColorB) {
    this._trianglesStackRenderer.push3dLine(inPointA, inPointB, thicknessA, thicknessB, inColorA, inColorB);
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
// src/local-framework/graphics/renderers/text-renderer/shaders/text-renderer.glsl.vert
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

// src/local-framework/graphics/renderers/text-renderer/shaders/text-renderer.glsl.frag
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

// src/local-framework/graphics/renderers/text-renderer/internals/asciiTextureHex.ts
var asciiTextureHex = "7e7e28fd03fd07fe04fe0aff02ff7e4dfd0cfd03fd07fe04fe0aff02ff1afc0dfd10fc08fc0ffe55ff15fb0bfd03fd07fe04fe08f707fd04ff07fe02fe0cfd0ffd0cfd0aff03fe03ff0afe44fe15fb0bfd03fd04f204f607fd03fe07fe02fe0cfd0efd0efd0aff02fe02ff0bfe43fd15fb0cfe03fe05f204fe01ff02ff0afd02fd07fe02fe0bfd0efd10fd0afa0cfe42fd16fb1bfe04fe07fe01ff02ff0efd09fc1cfd12fd09fa0cfe41fd17fb1bfe04fe07f70bfd0afc04ff17fd12fd06f405f616f61cfd19fd1cfe04fe08f709fd0bfb02fe17fd12fd06f405f616f61bfd1afd1cfe04fe0aff02ff01fe08fd0bfe02fa17fd12fd09fa0cfe3efd37f207ff02ff01fe07fd02fd07fe03fc19fd10fd0afa0cfe3dfd38f204f607fe03fd07fe03fd1bfd0efd0aff02fe02ff0bfe0cfd1dfd0dfd1dfd1cfe04fe07f708ff04fd07fe02fb1bfd0cfd0aff03fe03ff0afe0cfd1dfd0cfd1efd1cfe04fe0aff02ff1afb02fe1bfc08fc0ffe1cfd1dfd0bfd1ffd1cfe04fe0aff02ff7afd7e7e7e7e7e7e0efd17fd10fc0af80bfe0bf909f90dfd08f609fb08f506f808f82cfd19fd0df807fd04fd0afe0afd03fd07fd03fd0bfc08fd0ffd0bfd05fd05fd04fd06fd04fd2afd1bfd0bfc02fc06fd03fc09fd0afd04fd06fd04fd09fb08fd0efd0cfd05fd05fd04fd06fd04fd09fd0cfd0efd1dfd0afe05fd06fd02fb06fa11fd0dfd08fe01fd08fd0dfd0dfd05fd05fd04fd06fd04fd09fd0cfd0dfd0af409fd10fd06fd02fb06fa10fd0dfd08fe02fd08fd0dfd15fd05fb02fd06fd04fd09fd0cfd0cfd0bf40afd0efd07fd01fe01fd09fd0ffd0bfb08fe03fd08f808f70efd08fa08f626fd23fd0cfd08fd01fe01fd09fd0efd0cfb08f606f707f60cfd09fa09f726fd23fd0bfd09fb02fd09fd0dfd10fd07f60cfc06fd04fd0bfd08fd02fb0dfd09fd0cfd0cfd0bf40afd0cfd09fb02fd09fd0cfd12fd0bfd0ffd06fd04fd0afd09fd04fd0dfd09fd0cfd0dfd0af409fd19fc03fd09fd0bfd03fd06fd04fd0bfd08fd04fd06fd04fd09fd0afd04fd0cfd0afd0cfd0efd1dfd1afd04fd09fd0afd04fd06fd03fd0cfd08fd03fd07fd04fd09fd0afd04fd0bfd19fd10fd1bfd0ffd0af807f707f607f90bf907f909f80afd0bf809fb2efd19fd10fd7e51fd17fd11fd7e7e7e7e13f87e78fd05fd08fc09f709f907f808f606f608f907fd03fd07f90df905fc03fd06fb0bfd05fd05fd05fd08fb08fd05fd07fa09fd03fd07fd03fd07fd02fd08fd04fe07fd04fe07fd03fd06fd03fd09fd11fd08fd03fd07fd0cfc03fc05fd05fd07fd01fd07fd05fd06fd02fd08fd03fd06fd04fd07fd03fd07fd05ff07fd05ff06fd04fd06fd03fd09fd11fd08fd02fd08fd0cfb01fb05fc04fd06fd03fd06fd05fd05fd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd11fd08fd01fd09fd0cf505fb03fd05fd05fd05fd02fa05fd04fd07fd03fd06fd0efd03fd07fd03fe08fd03fe07fd0dfd03fd09fd11fd08fa0afd0cf505fa02fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd01fd01fd05fd01fd01fd05fd05fd05fd02fa05fd04fd07f807fd0efd03fd07f808f807fd0df709fd11fd08fb0bfd0cfd02ff02fd05fd02fa05fd05fd05fd02fa05f607fd03fd06fd0efd03fd07fd03fe08fd03fe07fd02fb06fd03fd09fd0bfd03fd08fa0afd0cfd05fd05fd03fb05fd05fd05fd0dfd04fd07fd03fd06fd0efd03fd07fd0dfd0cfd04fd06fd03fd09fd0bfd03fd08fd01fd09fd05ff06fd05fd05fd04fc05fd05fd05fd0dfd04fd07fd03fd06fd04fd07fd03fd07fd05ff07fd0cfd04fd06fd03fd09fd0bfd03fd08fd02fd08fd04fe06fd05fd05fd05fd06fd03fd06fd0dfd04fd07fd03fd07fd03fd07fd02fd08fd04fe07fd0dfd03fd06fd03fd09fd0bfd03fd08fd03fd07fd03fd06fd05fd05fd05fd07fd01fd07fd0dfd04fd06f709f907f808f606fb0df806fd03fd07f90af908fc03fd06f606fd05fd05fd05fd08fb0af87e7e7e7e7e7e7e68fe1af70afb08f708f807f505fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07f608f907ff11f90afc1afd03fd07fc01fc07fd03fd06fd04fd06fe02fd02fe05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fd04fd08fd0bfe14fd09fa19fd03fd07fd03fd07fd03fd06fd04fd06ff03fd03ff05fd03fd07fd03fd07fd05fd05fd03fd07fd03fd07fe05fd08fd0bfd13fd08fd02fd18fd03fd06fd05fd06fd03fd06fd04fd0afd09fd03fd07fd03fd07fd05fd06fd01fd08fd03fd07ff05fd09fd0cfd12fd07fd04fd17fd03fd06fd05fd06fd03fd06fd11fd09fd03fd07fd03fd07fd05fd07fb09fd03fd0cfd0afd0dfd11fd28f807fd05fd06f808f90cfd09fd03fd07fd03fd07fd02ff02fd08fd0bfd01fd0cfd0bfd0efd10fd28f807fd05fd06f809f90bfd09fd03fd07fd03fd07fd02ff02fd08fd0cfb0cfd0cfd0ffd0ffd28fd0cfd03fb06fd02fd0efd0afd09fd03fd07fd03fd07fd02ff02fd07fb0cfd0cfd0dfd10fd0efd28fd0cfd02fa06fd03fd06fd04fd0afd09fd03fd07fd03fd08f707fd01fd0bfd0bfd05ff08fd11fd0dfd28fd0df707fd03fd06fd04fd0afd09fd03fd08fd01fd09fc01fc06fd03fd0afd0afd05fe08fd12fd0cfd28fd0df707fd03fd06fd04fd0afd09fd03fd09fb0bfd01fd07fd03fd0afd0afd04fd08fd13fd0bfd27fb12fd06fc03fd07f809f908f90bfd0cfd01fd07fd03fd08f908f608f910fd06f93cfa7e54f07e72f07e7e7e7e0bfd1dfc21fb19fb18fc10fd0ffd07fc0dfa39fd1efd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd01fd18fd10fd0ffd08fd10fd3bfd1cfd22fd19fd1cfd2dfd10fd4af909f808f909f808f90afd0cfb02fe07fd01fc08fa0cfa08fd03fd0afd09f606f809f91efd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd1dfd08fd03fd06fd03fd07fd03fd07fd03fd07f808fd03fd08fc02fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd18f808fd03fd06fd0dfd03fd07f709fd0bfd03fd08fd03fd0afd0ffd08fa0dfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd0dfd03fd07fd0ffd0bfd03fd08fd03fd0afd0ffd08fd01fd0cfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0cf808fd03fd0afd0ffd08fd02fd0bfd09fd02ff02fd05fd03fd07fd03fd17fd03fd08fd03fd06fd03fd07fd03fd07fd03fd09fd0df908fd03fd0afd0ffd08fd03fd0afd09fd02ff02fd05fd03fd07fd03fd18fb02fe06fe02fb08f909fb02fe07f908f90ffd07fc03fd07f706fd03fd07fc03fd07f706fd05fd05fd03fd08f978fd03fd27fd03fd7e4af92afa7e7e7e7e7e7e18fa09fc09fa1efe4eff6efd0dfc0dfd1cfc4cfe6efd0dfc0dfd1bfa4afd6efd0dfc0dfd1afd02fd07fe02fb07fb02fe07fc02fd08f908f707fd03fd07fd03fd07fd05fd05fd02fd09fd03fd06f80afd0efc0efd08fb03fd05fd04fd07fd03fd05fd03fd09f706fd04fe09fd0bfd03fd07fd03fd07fd05fd05fd02fd09fd03fd06fe03fd08fd24fd05fd01fd02fd05fe06fe07fd03fd05fd03fd09fc02fd06fd04fe09fd0bfd03fd07fd03fd07fd05fd06fa0afd03fd06ff03fd09fd24fd05fd02fd01fd05fe06fe07fd03fd05fd03fd09fd0dfb0cfd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd09fd0cfd0efc0efd07fd03fb06fe06fe07fd03fd05fd03fd09fd0ffb0afd0bfd03fd07fd03fd07fd02ff02fd07fc0bfd03fd08fd0efd0dfc0dfd19fe06fe07fd03fd05fd03fd09fd0cfe04fd09fd01fd07fd03fd08fd01fd09fc01fc07fa0bf908fd03ff0bfd0dfc0dfd19fe06fe07f807f809fd0cfe04fd09fd01fd07fd03fd09fb0bfd01fd07fd02fd0bfb08fd03fe0bfd0dfc0dfd19f607fd11fd08fb0cf90bfb09fb02fe09fd0cfd01fd07fd02fd0dfd08f80cfa09fc09fa1af607fd11fd7cfd69fb0ffb77fa";

// src/local-framework/graphics/renderers/text-renderer/TextRenderer.ts
var k_gridSize = [16, 6];
var k_texCoord = [1 / k_gridSize[0], 1 / k_gridSize[1]];
var k_bufferSize4 = 9 * 1024 * 4;

class TextRenderer {
  _shader;
  _geometry;
  _texture = new Texture;
  _texCoordMap;
  _buffer = new Float32Array(k_bufferSize4);
  _currentSize = 0;
  _textScale = 14;
  _textColor = [1, 1, 1];
  _horizontalTextAlign = "left";
  _verticalTextAlign = "top";
  constructor() {
    this._shader = new ShaderProgram("TextRenderer", {
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
    const geoBuilder = new exports_GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec2f").addVboAttribute("a_vertex_texCoord", "vec2f").setStride(4 * 4).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position", "vec3f").addVboAttribute("a_offset_texCoord", "vec2f").addVboAttribute("a_offset_color", "vec3f").addVboAttribute("a_offset_scale", "float").setStride(9 * 4);
    this._geometry = new exports_GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
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
    this._geometry.allocateBuffer(0, letterVertices, letterVertices.length);
    this._geometry.setPrimitiveCount(letterVertices.length / 4);
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
      if (inMessage[ii] == `
`) {
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
      if (letter == `
`) {
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
      this._geometry.allocateBuffer(1, this._buffer, this._currentSize);
      this._geometry.setInstancedCount(this._currentSize / 9);
      this._geometry.render();
    });
    Texture.unbind();
    this.clear();
    return this;
  }
  clear() {
    this._currentSize = 0;
    return this;
  }
}
// src/local-framework/graphics/renderers/widgets/index.ts
var exports_widgets = {};
__export(exports_widgets, {
  renderFpsMeter: () => renderFpsMeter,
  addKeysTouchesWidgets: () => addKeysTouchesWidgets,
  addKeyStrokesWidgets: () => addKeyStrokesWidgets,
  addArrowStrokesWidgets: () => addArrowStrokesWidgets
});

// src/local-framework/graphics/renderers/widgets/renderControls.ts
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
    text: `A
Q`,
    color: GlobalKeyboardManager.isPressed("A", "Q") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 1, inPos[1]],
    size: [40, 40],
    text: "S",
    color: GlobalKeyboardManager.isPressed("S") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 1, inPos[1] + 45],
    size: [40, 40],
    text: `W
Z`,
    color: GlobalKeyboardManager.isPressed("W", "Z") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 2, inPos[1]],
    size: [40, 40],
    text: "D",
    color: GlobalKeyboardManager.isPressed("D") ? activatedColor : defaultColor
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
    color: GlobalKeyboardManager.isPressed("ArrowLeft") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [0, 15], b: [0, -8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, -12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, -12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed("ArrowDown") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    lines: [
      { a: [0, -15], b: [0, 8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, 12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, 12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed("ArrowUp") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45 * 2, inPos[1]],
    size: [40, 40],
    lines: [
      { a: [-15, 0], b: [8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed("ArrowRight") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
};
var addKeysTouchesWidgets = (inCanvasElement, inPos, stackRenderers, textRenderer) => {
  if (GlobalTouchManager.isSupported(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: `Touch Events
Supported
(double tap)`,
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 115, inPos[1]],
      size: [230, 60],
      text: `Touch Events
Not Supported`,
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
  if (GlobalPointerLockManager.canBePointerLocked(inCanvasElement)) {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: `Mouse
Supported`,
      color: [0, 0.5, 0]
    }, stackRenderers, textRenderer);
  } else {
    _renderIndicator({
      center: [inPos[0] + 105, inPos[1] + 70],
      size: [210, 60],
      text: `Mouse Events
Not Supported`,
      color: [0.5, 0, 0]
    }, stackRenderers, textRenderer);
  }
};
// src/local-framework/graphics/renderers/widgets/renderFpsMeter.ts
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
      averageStr += `
~${_getFpsStr(1000 / averageValue)}fps`;
      maxStr += `
<${_getFpsStr(1000 / maxValue)}fps`;
      minStr += `
>${_getFpsStr(1000 / minValue)}fps`;
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
// src/local-framework/graphics/images/index.ts
var exports_images = {};
__export(exports_images, {
  getImageFromUrl: () => getImageFromUrl,
  getImageFromBuffer: () => getImageFromBuffer,
  fetchImageBuffer: () => fetchImageBuffer
});

// src/local-framework/graphics/images/getImageFromUrl.ts
var getImageFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image;
    image.onerror = reject;
    image.onload = () => {
      resolve(image);
    };
    image.src = url;
  });
};
var fetchImageBuffer = async (url, onProgress) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get("Content-Length");
  const contentType = response.headers.get("Content-Type");
  let lastPercent = 0;
  let receivedLength = 0;
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    receivedLength += value.length;
    if (onProgress) {
      onProgress(receivedLength, contentLength);
    }
  }
  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  return {
    buffer: chunksAll,
    type: contentType
  };
};
var getImageFromBuffer = async (buffer, type) => {
  return new Promise((resolve, reject) => {
    const image = new Image;
    image.onerror = reject;
    image.onload = () => {
      resolve(image);
    };
    image.src = URL.createObjectURL(new Blob([buffer], { type }));
  });
};
// src/local-framework/graphics/geometries/index.ts
var exports_geometries = {};
__export(exports_geometries, {
  makeSphere: () => makeSphere,
  makeBox: () => makeBox
});

// src/local-framework/graphics/geometries/makeBox.ts
var makeBox = (inSize) => {
  const hSizeX = inSize[0] * 0.5;
  const hSizeY = inSize[1] * 0.5;
  const hSizeZ = inSize[2] * 0.5;
  const allNormals = [];
  allNormals.push([-1, 0, 0]);
  allNormals.push([1, 0, 0]);
  allNormals.push([0, -1, 0]);
  allNormals.push([0, 1, 0]);
  allNormals.push([0, 0, -1]);
  allNormals.push([0, 0, 1]);
  const allVertices = [];
  allVertices.push([-hSizeX, -hSizeY, -hSizeZ]);
  allVertices.push([+hSizeX, -hSizeY, -hSizeZ]);
  allVertices.push([-hSizeX, +hSizeY, -hSizeZ]);
  allVertices.push([+hSizeX, +hSizeY, -hSizeZ]);
  allVertices.push([-hSizeX, -hSizeY, +hSizeZ]);
  allVertices.push([+hSizeX, -hSizeY, +hSizeZ]);
  allVertices.push([-hSizeX, +hSizeY, +hSizeZ]);
  allVertices.push([+hSizeX, +hSizeY, +hSizeZ]);
  const allIndices = [];
  allIndices.push([0, 2, 1, 4]);
  allIndices.push([2, 3, 1, 4]);
  allIndices.push([4, 5, 6, 5]);
  allIndices.push([6, 5, 7, 5]);
  allIndices.push([1, 3, 5, 1]);
  allIndices.push([5, 3, 7, 1]);
  allIndices.push([0, 4, 2, 0]);
  allIndices.push([4, 6, 2, 0]);
  allIndices.push([2, 6, 3, 3]);
  allIndices.push([6, 7, 3, 3]);
  allIndices.push([0, 1, 4, 2]);
  allIndices.push([4, 1, 5, 2]);
  const vertices = [];
  for (const index of allIndices) {
    vertices.push({
      pos: exports_vec3.copy([0, 0, 0], allVertices[index[0]]),
      normal: exports_vec3.copy([0, 0, 0], allNormals[index[3]])
    });
    vertices.push({
      pos: exports_vec3.copy([0, 0, 0], allVertices[index[1]]),
      normal: exports_vec3.copy([0, 0, 0], allNormals[index[3]])
    });
    vertices.push({
      pos: exports_vec3.copy([0, 0, 0], allVertices[index[2]]),
      normal: exports_vec3.copy([0, 0, 0], allNormals[index[3]])
    });
  }
  return vertices;
};
// src/local-framework/graphics/geometries/makeSphere.ts
var _drawSpherePatch = (vertices, quality, radius, v01, v02, v03) => {
  if (quality <= 0) {
    vertices.push({
      pos: exports_vec3.scale(exports_vec3.create(), v01, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v01)
    });
    vertices.push({
      pos: exports_vec3.scale(exports_vec3.create(), v03, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v03)
    });
    vertices.push({
      pos: exports_vec3.scale(exports_vec3.create(), v02, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v02)
    });
  } else {
    const v12 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v01, v02, 0.5));
    const v23 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v02, v03, 0.5));
    const v31 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v03, v01, 0.5));
    quality -= 1;
    _drawSpherePatch(vertices, quality, radius, v01, v12, v31);
    _drawSpherePatch(vertices, quality, radius, v12, v02, v23);
    _drawSpherePatch(vertices, quality, radius, v31, v23, v03);
    _drawSpherePatch(vertices, quality, radius, v12, v23, v31);
  }
};
var makeSphere = (quality, radius) => {
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
  const vertices = [];
  for (const index of tmpIndices) {
    _drawSpherePatch(vertices, quality, radius, tmpVertices[index[0]], tmpVertices[index[1]], tmpVertices[index[2]]);
  }
  return vertices;
};
// src/main/configuration.ts
var controllerMovingSpeed = 16;
var controllerMouseSensibility = 6;
var controllerKeyboardSensibility = Math.PI * 0.55;
var controllerTouchSensibility = 15;

// src/main/experiment/graphics/renderers/triangles-renderers/shaders/stack-renderer.glsl.vert
var stack_renderer_glsl_default3 = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;
// uniform mat4 u_viewMatrix;
// uniform mat4 u_modelMatrix;
// uniform mat3 u_modelMatrix;

in vec3 a_vertex_position;
in vec4 a_vertex_color;
in vec3 a_vertex_normal;

out vec4 v_color;
out vec3 v_worldSpacePosition;
out vec3 v_worldSpaceNormal;

void main(void)
{
  v_color = a_vertex_color;
  v_worldSpacePosition = a_vertex_position;
  v_worldSpaceNormal = a_vertex_normal;

  gl_Position = u_composedMatrix * vec4(a_vertex_position, 1.0);
}
`.trim();

// src/main/experiment/graphics/renderers/triangles-renderers/shaders/stack-renderer.glsl.frag
var stack_renderer_glsl_default4 = `
#version 300 es

precision lowp float;

uniform vec3 u_lightPos;

in vec4 v_color;
in vec3 v_worldSpacePosition;
in vec3 v_worldSpaceNormal;

out vec4 o_color;

const float k_ambiantCoef = 0.1;
const float k_maxDiffuseCoef = 1.0 - k_ambiantCoef;

const vec3 k_specColor = vec3(1.0, 1.0, 1.0);

vec3 _getLightColor(vec4 currentColor)
{
  vec3 normal = normalize(v_worldSpaceNormal);
  vec3 lightDir = normalize(u_lightPos - v_worldSpacePosition);

  // float diffuseCoef = max(dot(lightDir, v_worldSpaceNormal.xyz), 0.0);
  float diffuseCoef = min(max(dot(lightDir, v_worldSpaceNormal.xyz), 0.0), k_maxDiffuseCoef);
  // float specularCoef = 0.0;

  // if (diffuseCoef > 0.0)
  // {
  //   // specular

  //   vec3 reflectDir = reflect(-lightDir, normal);
  //   vec3 viewDir = normalize(u_lightPos - v_worldSpacePosition);

  //   float specAngle = max(dot(reflectDir, viewDir), 0.0);
  //   specularCoef = pow(specAngle, 32.0);
  // }

  vec3 diffuseColor = currentColor.rgb * (k_ambiantCoef + diffuseCoef);
  // vec3 specularColor = k_specColor * specularCoef;

  // return diffuseColor + specularColor;
  return diffuseColor;
}

void main(void)
{
  // o_color = v_color;
  o_color = vec4(_getLightColor(v_color), v_color.a);
}
`.trim();

// src/main/experiment/graphics/renderers/triangles-renderers/LitTrianglesStackRenderer.ts
var k_bufferSize5 = 30 * 1024 * 6;

class VertexBuffer {
  buffer = new Float32Array(k_bufferSize5);
  currentSize = 0;
  pushTriangle(inPointA, inPointB, inPointC, inColor, inNormal) {
    if (this.currentSize + 10 * 3 >= this.buffer.length) {
      console.log("not enough buffer space for a triangle");
    }
    const alphaValue = inColor[3] ?? 1;
    this.buffer[this.currentSize + 0] = inPointA[0];
    this.buffer[this.currentSize + 1] = inPointA[1];
    this.buffer[this.currentSize + 2] = inPointA[2];
    this.buffer[this.currentSize + 3] = inColor[0];
    this.buffer[this.currentSize + 4] = inColor[1];
    this.buffer[this.currentSize + 5] = inColor[2];
    this.buffer[this.currentSize + 6] = alphaValue;
    this.buffer[this.currentSize + 7] = inNormal[0];
    this.buffer[this.currentSize + 8] = inNormal[1];
    this.buffer[this.currentSize + 9] = inNormal[2];
    this.currentSize += 10;
    this.buffer[this.currentSize + 0] = inPointB[0];
    this.buffer[this.currentSize + 1] = inPointB[1];
    this.buffer[this.currentSize + 2] = inPointB[2];
    this.buffer[this.currentSize + 3] = inColor[0];
    this.buffer[this.currentSize + 4] = inColor[1];
    this.buffer[this.currentSize + 5] = inColor[2];
    this.buffer[this.currentSize + 6] = alphaValue;
    this.buffer[this.currentSize + 7] = inNormal[0];
    this.buffer[this.currentSize + 8] = inNormal[1];
    this.buffer[this.currentSize + 9] = inNormal[2];
    this.currentSize += 10;
    this.buffer[this.currentSize + 0] = inPointC[0];
    this.buffer[this.currentSize + 1] = inPointC[1];
    this.buffer[this.currentSize + 2] = inPointC[2];
    this.buffer[this.currentSize + 3] = inColor[0];
    this.buffer[this.currentSize + 4] = inColor[1];
    this.buffer[this.currentSize + 5] = inColor[2];
    this.buffer[this.currentSize + 6] = alphaValue;
    this.buffer[this.currentSize + 7] = inNormal[0];
    this.buffer[this.currentSize + 8] = inNormal[1];
    this.buffer[this.currentSize + 9] = inNormal[2];
    this.currentSize += 10;
  }
  reset() {
    this.currentSize = 0;
  }
}

class LitTrianglesStackRenderer {
  _shader;
  _geometry;
  _bufferLight = new VertexBuffer;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("LitTrianglesStackRenderer", {
      vertexSrc: stack_renderer_glsl_default3,
      fragmentSrc: stack_renderer_glsl_default4,
      attributes: ["a_vertex_position", "a_vertex_color", "a_vertex_normal"],
      uniforms: ["u_composedMatrix", "u_lightPos"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().setVboAsDynamic().addVboAttribute("a_vertex_position", "vec3f").addVboAttribute("a_vertex_color", "vec4f").addVboAttribute("a_vertex_normal", "vec3f");
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
  }
  pushTriangle(inPointA, inPointB, inPointC, inColor, inNormal) {
    this._bufferLight.pushTriangle(inPointA, inPointB, inPointC, inColor, inNormal);
  }
  flush(inCamera) {
    this._shader.bind((bound) => {
      bound.setMatrix4Uniform("u_composedMatrix", inCamera.getComposedMatrix());
      bound.setFloat3Uniform("u_lightPos", inCamera.getEye()[0], inCamera.getEye()[1], inCamera.getEye()[2]);
      this._flush();
    });
  }
  _flush() {
    if (!this.canRender()) {
      return;
    }
    if (this._bufferLight.currentSize > 0) {
      this._geometry.allocateBuffer(0, this._bufferLight.buffer, this._bufferLight.currentSize);
      this._geometry.setPrimitiveCount(this._bufferLight.currentSize / 10);
      this._geometry.render();
      this._bufferLight.currentSize = 0;
    }
    this.clear();
  }
  canRender() {
    return this._bufferLight.currentSize > 0;
  }
  clear() {
    this._bufferLight.reset();
  }
}

// src/main/experiment/graphics/WebGLRenderer.ts
class WebGLRenderer {
  _def;
  _viewportSize;
  _frustumCulling;
  _mainCamera = new exports_graphics.camera.Camera;
  _mainHudCamera = new exports_graphics.camera.Camera;
  onContextLost = null;
  onContextRestored = null;
  _textRenderer;
  _stackRenderers;
  _litTrianglesStackRenderer;
  _geometryStackRenderer;
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
    this._stackRenderers = new exports_graphics.renderers.StackRenderers;
    this._litTrianglesStackRenderer = new LitTrianglesStackRenderer;
    this._geometryStackRenderer = new exports_graphics.renderers.GeometryRenderer;
    const geoVertices = exports_graphics.geometries.makeBox([2, 2, 5]);
    this._geometryStackRenderer.setGeometryVertices(geoVertices);
  }
  async initialize() {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    gl.disable(gl.CULL_FACE);
  }
  resize(width, height) {
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    this._mainCamera.setViewportSize(width, height);
    this._mainCamera.setAsPerspective({ fovy: 70, near: 0.1, far: 200 });
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
    this._frustumCulling.calculateFrustum(this._mainCamera.getProjectionMatrix(), this._mainCamera.getViewMatrix());
  }
  update() {
    this._mainCamera.computeComposedMatrix();
    this._mainHudCamera.computeComposedMatrix();
    this._frustumCulling.calculateFrustum(this._mainCamera.getProjectionMatrix(), this._mainCamera.getViewMatrix());
  }
  renderScene(callback) {
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    const [width, height] = this._viewportSize;
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    callback(this._mainCamera, this._frustumCulling);
    this.flushScene();
  }
  flushScene() {
    this._litTrianglesStackRenderer.flush(this._mainCamera);
    this._stackRenderers.flush(this._mainCamera.getComposedMatrix());
    this._geometryStackRenderer.flush(this._mainCamera);
  }
  renderHUD(callback) {
    const [width, height] = this._viewportSize;
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    gl.viewport(0, 0, width, height);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.CULL_FACE);
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
  get litTrianglesStackRenderer() {
    return this._litTrianglesStackRenderer;
  }
  get textRenderer() {
    return this._textRenderer;
  }
  get frustumCulling() {
    return this._frustumCulling;
  }
  get geometryStackRenderer() {
    return this._geometryStackRenderer;
  }
}

// src/main/experiment/logics/ParticlesManager.ts
var k_maxTime = 0.1 * 1;

class Particle {
  _posA = exports_vec3.create();
  _posB = exports_vec3.create();
  _dir = exports_vec3.create();
  _timeLeft = k_maxTime;
  constructor(pos, dir) {
    exports_vec3.copy(this._posA, pos);
    exports_vec3.copy(this._posB, pos);
    exports_vec3.copy(this._dir, dir);
  }
  update(deltaTimeSec) {
    exports_vec3.copy(this._posB, this._posA);
    exports_vec3.scaleAndAdd(this._posA, this._posA, this._dir, deltaTimeSec);
    this._timeLeft -= deltaTimeSec;
    if (this._timeLeft < 0) {
      this._timeLeft = 0;
    }
  }
  render(stackRenderers) {
    stackRenderers.pushLine(this._posA, this._posB, [1, 1, 1]);
  }
  isAlive() {
    return this._timeLeft > 0;
  }
}

class ParticlesManager {
  _allParticles = [];
  constructor() {}
  push(pos, dir) {
    this._allParticles.push(new Particle(pos, dir));
  }
  update(deltaTimeSec) {
    for (let ii = 0;ii < this._allParticles.length; ) {
      if (this._allParticles[ii].isAlive()) {
        ++ii;
      } else {
        this._allParticles.splice(ii, 1);
      }
    }
    for (const currParticle of this._allParticles) {
      currParticle.update(deltaTimeSec);
    }
  }
  render(stackRenderers) {
    for (const currParticle of this._allParticles) {
      currParticle.render(stackRenderers);
    }
  }
}

class ParticlesManagerSingleton {
  _particlesManager;
  create() {
    if (this._particlesManager) {
      throw new Error(`particlesManager already created`);
    }
    this._particlesManager = new ParticlesManager;
  }
  destroy() {
    if (!this._particlesManager) {
      throw new Error(`particlesManager already destroyed`);
    }
    this._particlesManager = undefined;
  }
  get() {
    if (!this._particlesManager) {
      throw new Error(`particlesManager not created`);
    }
    return this._particlesManager;
  }
}
var GlobalParticlesManager = new ParticlesManagerSingleton;

// src/main/experiment/logics/ProjectileManager.ts
var _getRandomVec3 = () => {
  const newVec3 = exports_vec3.fromValues(Math.random() - Math.random(), Math.random() - Math.random(), Math.random() - Math.random());
  const length5 = exports_vec3.length(newVec3);
  if (length5 === 0) {
    return _getRandomVec3();
  }
  return exports_vec3.scale(newVec3, newVec3, 1 / length5);
};

class ProjectileInstance {
  _def;
  _pos = exports_vec3.fromValues(0, 0, 0);
  _prevPos = exports_vec3.fromValues(0, 0, 0);
  _dir = exports_vec3.fromValues(0, 0, 0);
  _distanceLeft = 0;
  _target;
  constructor(def, pos, dir, target) {
    this._def = def;
    exports_vec3.copy(this._prevPos, pos);
    exports_vec3.copy(this._pos, pos);
    exports_vec3.copy(this._dir, dir);
    this._distanceLeft = this._def.maxDistance;
    this._target = target;
    const length5 = exports_vec3.length(this._dir);
    if (length5 > 0) {
      exports_vec3.scale(this._dir, this._dir, 1 / length5);
    } else {
      this._distanceLeft = 0;
    }
  }
  update(deltaTimeSec, otherFaction) {
    if (this._def.homing) {
      if (this._target.isAlive()) {
        const desiredAim = exports_vec3.sub(exports_vec3.create(), this._target.getPosition(), this._pos);
        const length5 = exports_vec3.length(desiredAim);
        if (length5 > 0) {
          exports_vec3.scale(desiredAim, desiredAim, 1 / length5);
        }
        const dotVal = exports_vec3.dot(this._dir, desiredAim);
        const radialDistance = 1 - (dotVal + 1) * 0.5;
        if (radialDistance <= 0.003) {
          exports_vec3.copy(this._dir, desiredAim);
        } else {
          exports_vec3.lerp(this._dir, this._dir, desiredAim, 1 * deltaTimeSec);
        }
        exports_vec3.copy(this._dir, desiredAim);
      }
    }
    const totalLength = this._def.speed * deltaTimeSec;
    let bestAgent;
    let bestDistance = 999999999;
    const bestData = {
      distance: -1,
      normal: exports_vec3.fromValues(0, 0, 0)
    };
    const subResult = otherFaction.searchByRadius(this._pos, totalLength);
    for (const tmpAgent of subResult) {
      const intersectionCoef = tmpAgent.testCollision_exp(this._pos, this._dir, bestData);
      if (intersectionCoef > 0 && intersectionCoef <= totalLength && intersectionCoef < bestDistance) {
        bestAgent = tmpAgent;
        bestDistance = intersectionCoef;
      }
    }
    if (bestAgent) {
      bestAgent.takeDamage(this._def.damage);
      this._distanceLeft = 0;
      {
        const impactPos = exports_vec3.scaleAndAdd(exports_vec3.create(), this._pos, this._dir, bestData.distance);
        const _glm_reflect = (I, N) => {
          const dotVal = exports_vec3.dot(N, I) * 2;
          const N2 = exports_vec3.scale(exports_vec3.create(), N, dotVal);
          return exports_vec3.sub(exports_vec3.create(), I, N2);
        };
        const normDir = exports_vec3.copy(exports_vec3.create(), this._dir);
        {
          const length5 = exports_vec3.length(normDir);
          if (length5 > 0) {
            exports_vec3.scale(normDir, normDir, 1 / length5);
          }
        }
        const reflectedDir = _glm_reflect(normDir, bestData.normal);
        for (let ii = 0;ii < 3; ++ii) {
          const particleDir = exports_vec3.scale(exports_vec3.create(), reflectedDir, 50);
          exports_vec3.scaleAndAdd(particleDir, particleDir, _getRandomVec3(), 0.1);
          GlobalParticlesManager.get().push(impactPos, particleDir);
        }
      }
    }
    exports_vec3.copy(this._prevPos, this._pos);
    exports_vec3.scaleAndAdd(this._pos, this._pos, this._dir, totalLength);
    this._distanceLeft -= totalLength;
  }
  render(stackRenderers, frustumCulling, color) {
    if (!frustumCulling.sphereInFrustum(this._pos[0], this._pos[1], this._pos[2], 1)) {
      return;
    }
    stackRenderers.push3dLine(this._prevPos, this._pos, 0.05, 0.05, color, color);
  }
  getPosition() {
    return this._pos;
  }
  isAlive() {
    return this._distanceLeft > 0;
  }
}

class ProjectileManager {
  _graphicTrailsManager;
  _allProjectiles = [];
  constructor(GraphicTrailsManager) {
    this._graphicTrailsManager = GraphicTrailsManager;
  }
  update(deltaTimeSec, otherFaction) {
    for (let ii = 0;ii < this._allProjectiles.length; ) {
      if (this._allProjectiles[ii].isAlive()) {
        ++ii;
      } else {
        this._allProjectiles.splice(ii, 1);
      }
    }
    for (const tmpProj of this._allProjectiles) {
      tmpProj.update(deltaTimeSec, otherFaction);
    }
  }
  render(stackRenderers, frustumCulling, color) {
    for (const tmpProj of this._allProjectiles) {
      tmpProj.render(stackRenderers, frustumCulling, color);
    }
  }
  shoot(def, pos, dir, target) {
    const newProj = new ProjectileInstance(def, pos, dir, target);
    this._allProjectiles.push(newProj);
    if (def.homing) {
      this._graphicTrailsManager.createTrail(5, 10, newProj);
    }
    return newProj;
  }
}

// src/main/experiment/logics/flocking-logic.ts
var _limitVec3 = (vec3, maxVec3) => {
  const length5 = exports_vec3.length(vec3);
  if (length5 > maxVec3) {
    exports_vec3.scale(vec3, vec3, 1 / length5);
    exports_vec3.scale(vec3, vec3, maxVec3);
  }
  return vec3;
};
var _maximizeVec3 = (vec3, maxVec3) => {
  const length5 = exports_vec3.length(vec3);
  if (length5 > 0) {
    exports_vec3.scale(vec3, vec3, 1 / length5);
    exports_vec3.scale(vec3, vec3, maxVec3);
  }
  return vec3;
};
var _findClosestAgent = (currAgent, flockFaction, maxRadius) => {
  let allAgents = flockFaction.allAgents;
  if (maxRadius !== undefined && maxRadius > 0) {
    allAgents = flockFaction.searchByRadius(currAgent.getPosition(), maxRadius);
  }
  let closestAgent = undefined;
  let closestDiff = exports_vec3.fromValues(0, 0, 0);
  let closestDistance = 999999999;
  for (const tmpAgent of allAgents) {
    if (!tmpAgent.isTrackable()) {
      continue;
    }
    exports_vec3.sub(closestDiff, tmpAgent.getPosition(), currAgent.getPosition());
    const distance4 = exports_vec3.squaredLength(closestDiff);
    if (closestDistance > distance4) {
      closestDistance = distance4;
      closestAgent = tmpAgent;
    }
  }
  if (!closestAgent) {
    return;
  }
  return {
    agent: closestAgent,
    diff: closestDiff,
    distance: Math.sqrt(closestDistance)
  };
};
var _findClosestAgents = (currAgent, flockFaction, maxRadius) => {
  const results = [];
  let closestDiff = exports_vec3.fromValues(0, 0, 0);
  const subResults = flockFaction.searchByRadius(currAgent.getPosition(), maxRadius);
  for (const tmpAgent of subResults) {
    if (!tmpAgent.isTrackable()) {
      continue;
    }
    exports_vec3.sub(closestDiff, tmpAgent.getPosition(), currAgent.getPosition());
    const distance4 = exports_vec3.squaredLength(closestDiff);
    if (distance4 > maxRadius) {
      continue;
    }
    results.push({
      agent: tmpAgent,
      diff: exports_vec3.copy(exports_vec3.create(), closestDiff),
      distance: distance4
    });
  }
  return results.sort((a, b) => a.distance - b.distance);
};
var _seek = (currAgent, target, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  const diffVec3 = exports_vec3.create();
  exports_vec3.sub(diffVec3, target, currAgent.getPosition());
  const length5 = exports_vec3.length(diffVec3);
  if (length5 <= 0) {
    return;
  }
  exports_vec3.scale(diffVec3, diffVec3, 1 / length5);
  exports_vec3.scale(outAcceleration, diffVec3, coefficient);
};
var _stayInRangeFlock = (currAgent, flockFaction, minRange, maxRange, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  const result = _findClosestAgent(currAgent, flockFaction);
  if (!result) {
    return;
  }
  if (result.distance === 0) {
    return;
  }
  const diffVec3 = exports_vec3.create();
  exports_vec3.scale(diffVec3, result.diff, 1 / result.distance);
  if (result.distance > minRange && result.distance < maxRange) {
    return result;
  }
  if (result.distance < maxRange) {
    coefficient = -coefficient;
  }
  exports_vec3.scale(outAcceleration, diffVec3, coefficient);
  return result;
};
var _strafe = (currAgent, target, radius, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  const diffVec3 = exports_vec3.create();
  exports_vec3.sub(diffVec3, target, currAgent.getPosition());
  const length5 = exports_vec3.length(diffVec3);
  if (length5 <= 0) {
    return;
  }
  exports_vec3.scale(diffVec3, diffVec3, 1 / length5);
  if (length5 > radius - 2 && length5 < radius + 2) {
    const angle3 = Math.atan2(diffVec3[1], diffVec3[0]);
    diffVec3[0] = Math.cos(angle3 + Math.PI * 0.5);
    diffVec3[1] = Math.sin(angle3 + Math.PI * 0.5);
  } else if (length5 < radius - 2) {
    coefficient = -coefficient;
  }
  exports_vec3.scale(outAcceleration, diffVec3, coefficient);
};
var _strafeFlock = (currAgent, flockFaction, minRange, maxRange, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  const result = _findClosestAgent(currAgent, flockFaction);
  if (!result) {
    return;
  }
  if (result.distance <= 0) {
    return;
  }
  const diffVec3 = exports_vec3.copy(exports_vec3.create(), result.diff);
  exports_vec3.scale(diffVec3, result.diff, 1 / result.distance);
  if (result.distance > minRange && result.distance < maxRange) {
    const strafingAngle = Math.atan2(diffVec3[1], diffVec3[0]) + Math.PI * 0.5;
    diffVec3[0] = Math.cos(strafingAngle);
    diffVec3[1] = Math.sin(strafingAngle);
  } else if (result.distance < minRange) {
    coefficient = -coefficient;
  } else {}
  exports_vec3.scale(outAcceleration, diffVec3, coefficient);
  return result;
};
var _separation = (currAgent, flockFaction, minRange, maxRange, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  let totalToEvade = 0;
  const subResult = flockFaction.searchByRadius(currAgent.getPosition(), maxRange);
  for (const tmpAgent of subResult) {
    if (currAgent === tmpAgent) {
      continue;
    }
    const diffVec3 = exports_vec3.create();
    exports_vec3.sub(diffVec3, currAgent.getPosition(), tmpAgent.getPosition());
    const length5 = exports_vec3.squaredLength(diffVec3);
    if (length5 < minRange * minRange || length5 > maxRange * maxRange) {
      continue;
    }
    if (length5 <= 0) {
      continue;
    }
    exports_vec3.scale(diffVec3, diffVec3, 1 / Math.sqrt(length5));
    exports_vec3.add(outAcceleration, outAcceleration, diffVec3);
    totalToEvade += 1;
  }
  if (totalToEvade > 0) {
    exports_vec3.scale(outAcceleration, outAcceleration, 1 / totalToEvade);
    exports_vec3.scale(outAcceleration, outAcceleration, coefficient);
  }
};
var _stayInBattle = (currAgent, center, halfSize, coefficient, outAcceleration) => {
  exports_vec3.set(outAcceleration, 0, 0, 0);
  const isOutside = currAgent.getPosition()[0] > center[0] + halfSize[0] || currAgent.getPosition()[1] > center[1] + halfSize[1] || currAgent.getPosition()[2] > center[2] + halfSize[2] || currAgent.getPosition()[0] < center[0] - halfSize[0] || currAgent.getPosition()[1] < center[1] - halfSize[1] || currAgent.getPosition()[2] < center[2] - halfSize[2];
  if (!isOutside) {
    return false;
  }
  const diffVec3 = exports_vec3.create();
  exports_vec3.sub(diffVec3, center, currAgent.getPosition());
  const length5 = exports_vec3.length(diffVec3);
  if (length5 <= 0) {
    return true;
  }
  exports_vec3.scale(diffVec3, diffVec3, 1 / length5);
  exports_vec3.scale(outAcceleration, diffVec3, coefficient);
  return true;
};

// src/main/experiment/logics/Weapon.ts
class Weapon {
  _def;
  _coolDownLeft = 0;
  _warmUpLeft = 0;
  constructor(def) {
    this._def = def;
  }
  update(deltaTimeSec) {
    if (this._warmUpLeft > 0) {
      this._warmUpLeft -= deltaTimeSec;
      if (this._warmUpLeft < 0) {
        this._warmUpLeft = 0;
      }
    } else {
      if (this._coolDownLeft > 0) {
        this._coolDownLeft -= deltaTimeSec;
      }
      if (this._coolDownLeft < 0) {
        this._coolDownLeft = 0;
      }
    }
  }
  shoot(rootPos, rootDir, ownAgents, projectileManager, target) {
    if (this._coolDownLeft > 0) {
      return;
    }
    if (this._def.actionable.type === "projectile") {
      const projDir = exports_vec3.copy(exports_vec3.create(), rootDir);
      if (this._def.actionable.sprayPercent !== undefined) {
        const spray = exports_vec3.fromValues(this._def.actionable.sprayPercent * (Math.random() - Math.random()), this._def.actionable.sprayPercent * (Math.random() - Math.random()), this._def.actionable.sprayPercent * (Math.random() - Math.random()));
        exports_vec3.add(projDir, projDir, spray);
      }
      projectileManager.shoot(this._def.actionable.projectileDef, rootPos, projDir, target);
    } else if (this._def.actionable.type === "flocking-agent") {
      const newAgent = ownAgents.spawn(this._def.actionable.flockAgentDef);
      newAgent.setPosition(rootPos);
      newAgent.setForwardAxis(rootDir);
    }
    this._coolDownLeft = this._def.coolDownSec;
    if (this._def.randomExtraCoolDownRange) {
      const extraCollDown = Math.random() * this._def.randomExtraCoolDownRange;
      this._coolDownLeft += extraCollDown;
    }
  }
}

// src/main/experiment/logics/GraphicModel.ts
class GraphicModelBuilder {
  _triangles = [];
  reset() {
    this._triangles.length = 0;
  }
  pushTriangle(v0, v1, v2, normal) {
    const diff1 = exports_vec3.sub(exports_vec3.create(), v0, v1);
    const diff2 = exports_vec3.sub(exports_vec3.create(), v0, v2);
    const actualNormal = exports_vec3.cross(exports_vec3.create(), diff1, diff2);
    const length5 = exports_vec3.length(actualNormal);
    if (length5 > 0) {
      exports_vec3.scale(actualNormal, actualNormal, 1 / length5);
    }
    const dotProd = exports_vec3.dot(normal, actualNormal);
    if (dotProd > 0) {
      this._triangles.push({
        v0: exports_vec3.copy(exports_vec3.create(), v0),
        v1: exports_vec3.copy(exports_vec3.create(), v1),
        v2: exports_vec3.copy(exports_vec3.create(), v2),
        normal: actualNormal,
        hurtTimeLeft: 0
      });
    } else {
      this._triangles.push({
        v0: exports_vec3.copy(exports_vec3.create(), v0),
        v1: exports_vec3.copy(exports_vec3.create(), v2),
        v2: exports_vec3.copy(exports_vec3.create(), v1),
        normal: exports_vec3.negate(actualNormal, actualNormal),
        hurtTimeLeft: 0
      });
    }
  }
  pushQuad(v0, v1, v2, v3, normal) {
    this.pushTriangle(v0, v1, v2, normal);
    this.pushTriangle(v0, v2, v3, normal);
  }
  getDef(maxHealth) {
    return {
      maxHealth,
      triangles: [...this._triangles]
    };
  }
}

class GraphicModel {
  _pos = exports_vec3.fromValues(0, 0, 0);
  _quat = exports_quat.identity(exports_quat.create());
  _realTriangles = [];
  _radius = -1;
  _def;
  _health;
  constructor(def) {
    this._def = def;
    this._health = this._def.maxHealth;
    for (const currTri of this._def.triangles) {
      const length0 = exports_vec3.length(currTri.v0);
      const length1 = exports_vec3.length(currTri.v1);
      const length22 = exports_vec3.length(currTri.v2);
      this._radius = Math.max(this._radius, length0, length1, length22);
    }
  }
  computeAABB(aabbMin, aabbMax) {
    exports_vec3.set(aabbMin, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    exports_vec3.set(aabbMax, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (const currTri of this._realTriangles) {
      for (let ii = 0;ii < 3; ++ii) {
        aabbMin[ii] = Math.min(aabbMin[ii], currTri.v0[ii], currTri.v1[ii], currTri.v2[ii]);
        aabbMax[ii] = Math.max(aabbMax[ii], currTri.v0[ii], currTri.v1[ii], currTri.v2[ii]);
      }
    }
  }
  testCollision(rayOrigin, rayVelocity) {
    let intersectionCoef = exports_system.math.collisions.intersectRaySphere(rayOrigin, rayVelocity, this._pos, this._radius);
    if (intersectionCoef < 0) {
      return -1;
    }
    let bestCoef = -1;
    let bestTriangle;
    for (const realTriangles of this._realTriangles) {
      let intersectionCoef2 = exports_system.math.collisions.intersectTriangle(rayOrigin, rayVelocity, realTriangles.v0, realTriangles.v1, realTriangles.v2);
      if (intersectionCoef2 >= 0 && (bestCoef < 0 || bestCoef > intersectionCoef2)) {
        bestCoef = intersectionCoef2;
        bestTriangle = realTriangles;
      }
    }
    if (bestTriangle) {
      bestTriangle.hurtTimeLeft = 0.05;
    }
    return bestCoef;
  }
  testCollision_exp(rayOrigin, rayVelocity, outData) {
    let intersectionCoef = exports_system.math.collisions.intersectRaySphere(rayOrigin, rayVelocity, this._pos, this._radius);
    if (intersectionCoef < 0) {
      return -1;
    }
    let bestCoef = -1;
    let bestTriangle;
    const bestOutData = {
      distance: -1,
      normal: exports_vec3.fromValues(0, 0, 0)
    };
    const tmpOutData = {
      distance: -1,
      normal: exports_vec3.fromValues(0, 0, 0)
    };
    for (const realTriangles of this._realTriangles) {
      let intersectionCoef2 = exports_system.math.collisions.intersectTriangle_raw(rayOrigin, rayVelocity, realTriangles.v0, realTriangles.v1, realTriangles.v2, tmpOutData);
      if (intersectionCoef2 >= 0 && (bestCoef < 0 || bestCoef > intersectionCoef2)) {
        bestCoef = intersectionCoef2;
        bestTriangle = realTriangles;
        bestOutData.distance = tmpOutData.distance;
        exports_vec3.copy(bestOutData.normal, tmpOutData.normal);
      }
    }
    if (bestTriangle) {
      bestTriangle.hurtTimeLeft = 0.05;
    }
    if (bestOutData.distance > 0 && (outData.distance < 0 || bestOutData.distance < outData.distance)) {
      outData.distance = bestOutData.distance;
      exports_vec3.copy(outData.normal, bestOutData.normal);
    }
    return bestCoef;
  }
  takeDamage(damage) {
    if (this._health > 0) {
      this._health -= damage;
    }
  }
  isAlive() {
    return this._health > 0;
  }
  update(deltaTimeSec, pos, quat) {
    exports_vec3.copy(this._pos, pos);
    exports_quat.copy(this._quat, quat);
    for (let ii = 0;ii < this._def.triangles.length; ++ii) {
      const triangle = this._def.triangles[ii];
      if (triangle.hurtTimeLeft > 0) {
        triangle.hurtTimeLeft -= deltaTimeSec;
        if (triangle.hurtTimeLeft < 0) {
          triangle.hurtTimeLeft = 0;
        }
      }
      while (this._realTriangles.length - 1 < ii) {
        this._realTriangles.push({
          v0: exports_vec3.create(),
          v1: exports_vec3.create(),
          v2: exports_vec3.create(),
          normal: exports_vec3.create(),
          hurtTimeLeft: 0
        });
      }
      const realTriangle = this._realTriangles[ii];
      exports_vec3.add(realTriangle.v0, exports_vec3.transformQuat(realTriangle.v0, triangle.v0, this._quat), this._pos);
      exports_vec3.add(realTriangle.v1, exports_vec3.transformQuat(realTriangle.v1, triangle.v1, this._quat), this._pos);
      exports_vec3.add(realTriangle.v2, exports_vec3.transformQuat(realTriangle.v2, triangle.v2, this._quat), this._pos);
      exports_vec3.transformQuat(realTriangle.normal, triangle.normal, this._quat);
      realTriangle.hurtTimeLeft = triangle.hurtTimeLeft;
    }
  }
  renderWireframe(stackRenderers, color, debugMode) {
    if (!this.isAlive()) {
      return;
    }
    for (const realTriangles of this._realTriangles) {
      if (!debugMode && realTriangles.hurtTimeLeft === 0) {
        continue;
      }
      stackRenderers.pushLine(realTriangles.v0, realTriangles.v1, color);
      stackRenderers.pushLine(realTriangles.v1, realTriangles.v2, color);
      stackRenderers.pushLine(realTriangles.v2, realTriangles.v0, color);
    }
  }
  renderPoly(trianglesStackRenderer, color) {
    if (!this.isAlive()) {
      return;
    }
    for (const realTriangles of this._realTriangles) {
      const alpha = color[3] || 1;
      if (alpha <= 0) {
        continue;
      }
      trianglesStackRenderer.pushTriangle(realTriangles.v0, realTriangles.v1, realTriangles.v2, color, realTriangles.normal);
    }
  }
  renderPolyHurtOnly(trianglesStackRenderer, color) {
    if (!this.isAlive()) {
      return;
    }
    for (const realTriangles of this._realTriangles) {
      if (realTriangles.hurtTimeLeft === 0) {
        continue;
      }
      const alpha = color[3] || 1;
      if (alpha <= 0) {
        continue;
      }
      trianglesStackRenderer.pushTriangle(realTriangles.v0, realTriangles.v1, realTriangles.v2, color, realTriangles.normal);
    }
  }
}

// src/main/experiment/logics/Turret.ts
class Turret {
  _def;
  _pos = exports_vec3.fromValues(0, 0, 0);
  _quat = exports_quat.identity(exports_quat.create());
  _anchorAxises = {
    forward: exports_vec3.fromValues(1, 0, 0),
    left: exports_vec3.fromValues(0, 1, 0),
    up: exports_vec3.fromValues(0, 0, 1)
  };
  _aimAxises = {
    forward: exports_vec3.fromValues(1, 0, 0),
    left: exports_vec3.fromValues(0, 1, 0),
    up: exports_vec3.fromValues(0, 0, 1)
  };
  _desiredAimAxis = exports_vec3.fromValues(1, 0, 0);
  _targetAgent;
  _radialDistance = -1;
  _weapons = [];
  _timeLeftToNewTarget = 0;
  _basketGraphicModel;
  _gunMantletGraphicModel;
  _gunBarrelGraphicModel;
  constructor(def) {
    this._def = def;
    this._basketGraphicModel = new GraphicModel(def.basketModel);
    this._gunMantletGraphicModel = new GraphicModel(def.gunMantlet);
    this._gunBarrelGraphicModel = new GraphicModel(def.gunBarrel);
    this._weapons.push(new Weapon(this._def.weaponDef));
  }
  update(deltaTimeSec, rootPos, rootQuat, projectileManager, ownAgents, otherFaction) {
    this._computeAnchorAxises(rootPos, rootQuat);
    this._findClosestTarget(deltaTimeSec, otherFaction);
    this._predictDesiredAimAxis();
    this._computeAimAxises(deltaTimeSec);
    for (const currWeapon of this._weapons) {
      currWeapon.update(deltaTimeSec);
    }
    if (this._targetAgent && this._radialDistance === 0) {
      for (const currWeapon of this._weapons) {
        currWeapon.shoot(this._pos, this._aimAxises.forward, ownAgents, projectileManager, this._targetAgent);
      }
    }
  }
  renderLogicDebug(stackRenderers, trianglesStackRenderer) {
    {
      const tmpPos = exports_vec3.scaleAndAdd(exports_vec3.create(), this._pos, this._desiredAimAxis, 10);
      stackRenderers.pushLine(this._pos, tmpPos, [0, 0.5, 0]);
    }
    {
      const tmpPos = exports_vec3.scaleAndAdd(exports_vec3.create(), this._pos, this._aimAxises.forward, 10);
      stackRenderers.pushLine(this._pos, tmpPos, [0.5, 0.5, 0.5]);
    }
    if (this._targetAgent) {
      const tmpPos = exports_vec3.scaleAndAdd(exports_vec3.create(), this._pos, this._aimAxises.forward, 10);
      stackRenderers.pushLine(this._targetAgent.getPosition(), tmpPos, [0.5, 0, 0]);
    }
  }
  render(stackRenderers, trianglesStackRenderer, debugMode = false) {
    {
      this._basketGraphicModel.update(0, this._pos, this._quat);
      if (debugMode) {
        const color = [0, 1, 0];
        this._basketGraphicModel.renderWireframe(stackRenderers, color, true);
      } else {
        const color = this._targetAgent ? [1, 1, 1] : [1, 0, 0];
        this._basketGraphicModel.renderPoly(trianglesStackRenderer, color);
      }
    }
    {
      const invQuat = exports_quat.invert(exports_quat.create(), this._quat);
      const invBaseLeft = exports_vec3.create();
      const invAimLeft = exports_vec3.create();
      const invAimForward = exports_vec3.create();
      exports_vec3.transformQuat(invBaseLeft, this._anchorAxises.left, invQuat);
      exports_vec3.transformQuat(invAimLeft, this._aimAxises.left, invQuat);
      exports_vec3.transformQuat(invAimForward, this._aimAxises.forward, invQuat);
      const theta = Math.atan2(invAimLeft[1], invAimLeft[0]) - Math.PI * 0.5;
      const phi = Math.atan2(-invAimForward[2], Math.sqrt(invAimForward[1] * invAimForward[1] + invAimForward[0] * invAimForward[0]));
      const tmpQuatH = exports_quat.rotateZ(exports_quat.create(), this._quat, theta);
      const tmpQuatV = exports_quat.rotateY(exports_quat.create(), tmpQuatH, phi);
      {
        this._gunMantletGraphicModel.update(0, this._pos, tmpQuatH);
        if (debugMode) {
          const color = [0, 1, 0];
          this._gunMantletGraphicModel.renderWireframe(stackRenderers, color, true);
        } else {
          const color = [1, 1, 0];
          this._gunMantletGraphicModel.renderPoly(trianglesStackRenderer, color);
        }
      }
      {
        this._gunBarrelGraphicModel.update(0, this._pos, tmpQuatV);
        if (debugMode) {
          const color = [0, 1, 0];
          this._gunBarrelGraphicModel.renderWireframe(stackRenderers, color, true);
        } else {
          const color = [1, 1, 1];
          this._gunBarrelGraphicModel.renderPoly(trianglesStackRenderer, color);
        }
      }
    }
  }
  _computeAnchorAxises(rootPos, rootQuat) {
    exports_vec3.set(this._anchorAxises.forward, 1, 0, 0);
    exports_vec3.set(this._anchorAxises.left, 0, 1, 0);
    exports_vec3.set(this._anchorAxises.up, 0, 0, 1);
    const realOffsetVec3 = this._pos;
    exports_vec3.transformQuat(realOffsetVec3, this._def.offsetVec3, rootQuat);
    exports_vec3.add(this._pos, rootPos, realOffsetVec3);
    exports_quat.multiply(this._quat, rootQuat, this._def.offsetQuat);
    exports_vec3.transformQuat(this._anchorAxises.forward, this._anchorAxises.forward, this._quat);
    exports_vec3.transformQuat(this._anchorAxises.left, this._anchorAxises.left, this._quat);
    exports_vec3.transformQuat(this._anchorAxises.up, this._anchorAxises.up, this._quat);
  }
  _findClosestTarget(deltaTimeSec, otherFaction) {
    exports_vec3.copy(this._desiredAimAxis, this._anchorAxises.forward);
    const maxDistance = this._getMaxDistance();
    if (this._targetAgent && this._isValidTarget(this._targetAgent, maxDistance) && this._timeLeftToNewTarget > 0) {
      this._timeLeftToNewTarget -= deltaTimeSec;
      return;
    }
    this._timeLeftToNewTarget = 1.5;
    const subResults = otherFaction.searchByRadius(this._pos, maxDistance);
    this._targetAgent = undefined;
    this._radialDistance = -1;
    for (const tmpAgent of subResults) {
      if (!this._isValidTarget(tmpAgent, maxDistance)) {
        continue;
      }
      this._targetAgent = tmpAgent;
    }
  }
  _getMaxDistance() {
    if (this._def.weaponDef.actionable.type === "projectile") {
      return this._def.weaponDef.actionable.projectileDef.maxDistance;
    }
    if (this._def.weaponDef.actionable.type === "flocking-agent") {
      return this._def.weaponDef.actionable.maxDistance;
    }
    return 0;
  }
  _isValidTarget(tmpAgent, maxDistance) {
    if (!tmpAgent.isAlive()) {
      return false;
    }
    const distance4 = exports_vec3.dist(this._pos, tmpAgent.getPosition());
    if (distance4 < 1 || distance4 > maxDistance) {
      return false;
    }
    const diff = exports_vec3.sub(exports_vec3.create(), tmpAgent.getPosition(), this._pos);
    exports_vec3.scale(diff, diff, 1 / distance4);
    const dotVal = exports_vec3.dot(this._anchorAxises.up, diff);
    return dotVal >= this._def.upAxisDotRange[0] && dotVal <= this._def.upAxisDotRange[1];
  }
  _predictDesiredAimAxis() {
    if (!this._targetAgent) {
      return;
    }
    const diff = exports_vec3.sub(exports_vec3.create(), this._targetAgent.getPosition(), this._pos);
    const length5 = exports_vec3.length(diff);
    if (length5 > 0) {
      exports_vec3.scale(diff, diff, 1 / length5);
    } else {
      return;
    }
    exports_vec3.copy(this._desiredAimAxis, diff);
    if (this._def.weaponDef.actionable.type !== "projectile") {
      return;
    }
    const projPosition = this._pos;
    const projSpeed = this._def.weaponDef.actionable.projectileDef.speed;
    const targetPosition = this._targetAgent.getPosition();
    const targetForward = this._targetAgent.getForwardAxis();
    const targetSpeed = exports_vec3.length(this._targetAgent.getForwardAxis());
    const targetDir = exports_vec3.scale(exports_vec3.create(), targetForward, targetSpeed > 0 ? 1 / targetSpeed : 1);
    let bestDistance = 99999999;
    const k_steps = 5;
    for (let ii = 0;ii < k_steps * 3; ++ii) {
      const ratio = ii / k_steps;
      const futureTargetPos = exports_vec3.scaleAndAdd(exports_vec3.create(), targetPosition, targetDir, ratio * targetSpeed);
      const distanceToTarget = exports_vec3.distance(projPosition, futureTargetPos);
      if (distanceToTarget === 0) {
        continue;
      }
      const dirToFutureTargetPos = exports_vec3.sub(exports_vec3.create(), futureTargetPos, projPosition);
      exports_vec3.scale(dirToFutureTargetPos, dirToFutureTargetPos, 1 / distanceToTarget);
      const futureProjPos = exports_vec3.scaleAndAdd(exports_vec3.create(), projPosition, dirToFutureTargetPos, ratio * projSpeed);
      const futureProfDistanceToFutureTarget = exports_vec3.distance(futureTargetPos, futureProjPos);
      if (bestDistance > futureProfDistanceToFutureTarget) {
        bestDistance = futureProfDistanceToFutureTarget;
        exports_vec3.copy(this._desiredAimAxis, dirToFutureTargetPos);
      }
    }
  }
  _computeAimAxises(deltaTimeSec) {
    const dotVal = exports_vec3.dot(this._aimAxises.forward, this._desiredAimAxis);
    this._radialDistance = 1 - (dotVal + 1) * 0.5;
    if (this._radialDistance <= 0.003) {
      exports_vec3.copy(this._aimAxises.forward, this._desiredAimAxis);
      this._radialDistance = 0;
    } else {
      exports_vec3.lerp(this._aimAxises.forward, this._aimAxises.forward, this._desiredAimAxis, this._def.radialAimingSpeed * deltaTimeSec);
    }
    const length5 = exports_vec3.length(this._aimAxises.forward);
    if (length5 > 0) {
      exports_vec3.scale(this._aimAxises.forward, this._aimAxises.forward, 1 / length5);
    }
    exports_vec3.cross(this._aimAxises.left, this._anchorAxises.up, this._aimAxises.forward);
    exports_vec3.cross(this._aimAxises.up, this._aimAxises.forward, this._aimAxises.left);
  }
}

// src/main/experiment/logics/ExplosionsManager.ts
var getRandomVec3 = (rng) => {
  const newVec3 = exports_vec3.fromValues(rng.normalizedRandom() - rng.normalizedRandom(), rng.normalizedRandom() - rng.normalizedRandom(), rng.normalizedRandom() - rng.normalizedRandom());
  const length5 = exports_vec3.length(newVec3);
  if (length5 === 0) {
    return getRandomVec3(rng);
  }
  return exports_vec3.scale(newVec3, newVec3, 1 / length5);
};
var k_maxTime2 = 0.35;

class Explosions {
  _pos = exports_vec3.create();
  _timeLeft = k_maxTime2;
  constructor(pos) {
    exports_vec3.copy(this._pos, pos);
  }
  update(deltaTimeSec) {
    this._timeLeft -= deltaTimeSec;
    if (this._timeLeft < 0) {
      this._timeLeft = 0;
    }
  }
  render(stackRenderers) {
    const rng = new exports_system.math.DeterministicRng;
    rng.setSeed(0);
    const allDirs = [];
    for (let ii = 0;ii < 6; ++ii) {
      allDirs.push(getRandomVec3(rng));
    }
    const ratio = 1 - this._timeLeft / k_maxTime2;
    for (const currDir of allDirs) {
      const newPos = exports_vec3.scaleAndAdd(exports_vec3.create(), this._pos, currDir, ratio * 2);
      stackRenderers.pushCross(newPos, 0.5, [1, 1, 1]);
    }
  }
  isAlive() {
    return this._timeLeft > 0;
  }
}

class ExplosionsManager {
  _allExplosions = [];
  constructor() {}
  push(pos) {
    this._allExplosions.push(new Explosions(pos));
  }
  update(deltaTimeSec) {
    for (let ii = 0;ii < this._allExplosions.length; ) {
      if (this._allExplosions[ii].isAlive()) {
        ++ii;
      } else {
        this._allExplosions.splice(ii, 1);
      }
    }
    for (const currAgent of this._allExplosions) {
      currAgent.update(deltaTimeSec);
    }
  }
  render(stackRenderers) {
    for (const currAgent of this._allExplosions) {
      currAgent.render(stackRenderers);
    }
  }
}

class ExplosionsManagerSingleton {
  _explosionsManager;
  create() {
    if (this._explosionsManager) {
      throw new Error(`explosionsManager already created`);
    }
    this._explosionsManager = new ExplosionsManager;
  }
  destroy() {
    if (!this._explosionsManager) {
      throw new Error(`explosionsManager already destroyed`);
    }
    this._explosionsManager = undefined;
  }
  get() {
    if (!this._explosionsManager) {
      throw new Error(`explosionsManager not created`);
    }
    return this._explosionsManager;
  }
}
var GlobalExplosionsManager = new ExplosionsManagerSingleton;

// src/main/experiment/logics/bvh/BvhTreeNode.ts
var _intersectAABB = (bvhMinA, bvhMaxA, bvhMinB, bvhMaxB) => {
  const notOverlapping = bvhMaxA[0] < bvhMinB[0] || bvhMinA[0] > bvhMaxB[0] || bvhMaxA[1] < bvhMinB[1] || bvhMinB[1] > bvhMaxB[1] || bvhMaxA[2] < bvhMinB[2] || bvhMinB[2] > bvhMaxB[2];
  return !notOverlapping;
};

class BvhTreeNode {
  min = exports_vec3.create();
  max = exports_vec3.create();
  leftNode;
  rightNode;
  leftLeaf;
  rightLeaf;
  static s_min = exports_vec3.create();
  static s_max = exports_vec3.create();
  static buildBvhGraph(nodePool, allEntries) {
    const min4 = exports_vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    const max4 = exports_vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (const currShape of allEntries) {
      min4[0] = Math.min(min4[0], currShape.min[0]);
      min4[1] = Math.min(min4[1], currShape.min[1]);
      min4[2] = Math.min(min4[2], currShape.min[2]);
      max4[0] = Math.max(max4[0], currShape.max[0]);
      max4[1] = Math.max(max4[1], currShape.max[1]);
      max4[2] = Math.max(max4[2], currShape.max[2]);
    }
    const rootNode = nodePool.acquire(min4, max4);
    rootNode._subDivide(nodePool, allEntries);
    return rootNode;
  }
  constructor(min4, max4) {
    this.init(min4, max4);
  }
  init(min4, max4) {
    exports_vec3.copy(this.min, min4);
    exports_vec3.copy(this.max, max4);
    this.leftNode = undefined;
    this.rightNode = undefined;
    this.leftLeaf = undefined;
    this.rightLeaf = undefined;
  }
  traverse(min4, max4, results) {
    if (!_intersectAABB(min4, max4, this.min, this.max)) {
      return;
    }
    if (this.leftLeaf) {
      results.push(this.leftLeaf);
    }
    if (this.rightLeaf) {
      results.push(this.rightLeaf);
    }
    if (this.leftNode) {
      this.leftNode.traverse(min4, max4, results);
    }
    if (this.rightNode) {
      this.rightNode.traverse(min4, max4, results);
    }
  }
  _subDivide(nodePool, allEntries) {
    if (allEntries.length <= 2) {
      this.leftLeaf = allEntries[0];
      this.rightLeaf = allEntries[1];
      return;
    }
    const deltaX = Math.abs(this.max[0] - this.min[0]);
    const deltaY = Math.abs(this.max[1] - this.min[1]);
    const deltaZ = Math.abs(this.max[2] - this.min[2]);
    const largestDelta = Math.max(deltaX, deltaY, deltaZ);
    if (largestDelta === deltaX) {
      this._splitAcross(nodePool, 0, allEntries);
    } else if (largestDelta === deltaY) {
      this._splitAcross(nodePool, 1, allEntries);
    } else {
      this._splitAcross(nodePool, 2, allEntries);
    }
  }
  _splitAcross(nodePool, axis, allEntries) {
    const sortedEntries = allEntries.slice().sort((shapeA, shapeB) => {
      const minA = shapeA.min[axis];
      const maxA = shapeA.max[axis];
      const minB = shapeB.min[axis];
      const maxB = shapeB.max[axis];
      return (minA + maxA) / 2 - (minB + maxB) / 2;
    });
    const halfIndex = Math.floor(sortedEntries.length / 2);
    const leftSubEntries = sortedEntries.slice(0, halfIndex);
    const rightSubEntries = sortedEntries.slice(halfIndex);
    if (leftSubEntries.length > 0) {
      exports_vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      exports_vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      leftSubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });
      this.leftNode = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }
    if (rightSubEntries.length > 0) {
      exports_vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      exports_vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rightSubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });
      this.rightNode = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }
    if (this.leftNode) {
      this.leftNode._subDivide(nodePool, leftSubEntries);
    }
    if (this.rightNode) {
      this.rightNode._subDivide(nodePool, rightSubEntries);
    }
  }
}

// src/main/experiment/logics/bvh/ObjectPool.ts
class ObjectPool {
  _poolFree = [];
  _poolUsed = [];
  _def;
  constructor(def) {
    this._def = def;
  }
  acquire(...args) {
    if (this._poolFree.length > 0) {
      const reusedNode = this._poolFree.pop();
      this._def.onInitCallback(reusedNode, ...args);
      return reusedNode;
    }
    const newNode = this._def.onCreateCallback(...args);
    this._poolUsed.push(newNode);
    return newNode;
  }
  releaseAll() {
    for (const currNode of this._poolUsed) {
      this._poolFree.push(currNode);
    }
    this._poolUsed.length = 0;
  }
}

// src/main/experiment/logics/bvh/BvhTree.ts
class BvhTree {
  _objectPool;
  _rootNode;
  constructor() {
    this._objectPool = new ObjectPool({
      onCreateCallback: (min4, max4) => {
        return new BvhTreeNode(min4, max4);
      },
      onInitCallback: (reused, min4, max4) => {
        reused.init(min4, max4);
        return reused;
      }
    });
  }
  reset() {
    this._objectPool.releaseAll();
    this._rootNode = undefined;
  }
  synchronize(allEntries) {
    this.reset();
    this._rootNode = BvhTreeNode.buildBvhGraph(this._objectPool, allEntries);
  }
  getRootNode() {
    return this._rootNode;
  }
  searchByRadius(pos, radius) {
    if (!this._rootNode) {
      return [];
    }
    const min4 = exports_vec3.fromValues(pos[0] - radius, pos[1] - radius, pos[2] - radius);
    const max4 = exports_vec3.fromValues(pos[0] + radius, pos[1] + radius, pos[2] + radius);
    const results = [];
    this._rootNode.traverse(min4, max4, results);
    return results;
  }
}

// src/main/experiment/logics/bvh/BvhDebug.ts
class BvhDebug {
  static _bvhRenderAABB(renderer, min4, max4, color) {
    const padding = 0.05;
    const vertices = [
      [min4[0] - padding, min4[1] - padding, min4[2] - padding],
      [max4[0] + padding, min4[1] - padding, min4[2] - padding],
      [min4[0] - padding, max4[1] + padding, min4[2] - padding],
      [max4[0] + padding, max4[1] + padding, min4[2] - padding],
      [min4[0] - padding, min4[1] - padding, max4[2] + padding],
      [max4[0] + padding, min4[1] - padding, max4[2] + padding],
      [min4[0] - padding, max4[1] + padding, max4[2] + padding],
      [max4[0] + padding, max4[1] + padding, max4[2] + padding]
    ];
    const indices = [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
      [4, 5],
      [5, 7],
      [7, 6],
      [6, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7]
    ];
    for (const pair of indices) {
      renderer.push3dLine(vertices[pair[0]], vertices[pair[1]], 0.025, 0.025, color, color);
    }
  }
  static renderNode(currNode, renderer, color) {
    this._bvhRenderAABB(renderer, currNode.min, currNode.max, color);
    if (currNode.leftNode) {
      this.renderNode(currNode.leftNode, renderer, [0, 0.5, 0]);
      const pointA = [currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1];
      const pointB = [currNode.leftNode.max[0] + 0.1, currNode.leftNode.max[1] + 0.1, currNode.leftNode.max[2] + 0.1];
      renderer.push3dLine(pointA, pointB, 0.2, 0, [1, 0, 1], [1, 0, 1]);
    }
    if (currNode.rightNode) {
      this.renderNode(currNode.rightNode, renderer, [0, 0, 0.5]);
      const pointA = [currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1];
      const pointB = [currNode.rightNode.max[0] + 0.1, currNode.rightNode.max[1] + 0.1, currNode.rightNode.max[2] + 0.1];
      renderer.push3dLine(pointA, pointB, 0.2, 0, [1, 0, 1], [1, 0, 1]);
    }
    if (currNode.leftLeaf) {
      this._bvhRenderAABB(renderer, currNode.leftLeaf.min, currNode.leftLeaf.max, [0.5, 0.5, 0]);
      const pointA = [currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1];
      const pointB = [currNode.leftLeaf.max[0] + 0.1, currNode.leftLeaf.max[1] + 0.1, currNode.leftLeaf.max[2] + 0.1];
      renderer.push3dLine(pointA, pointB, 0.2, 0, [1, 0, 0], [1, 0, 0]);
    }
    if (currNode.rightLeaf) {
      this._bvhRenderAABB(renderer, currNode.rightLeaf.min, currNode.rightLeaf.max, [0.5, 0.5, 0]);
      const pointA = [currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1];
      const pointB = [currNode.rightLeaf.max[0] + 0.1, currNode.rightLeaf.max[1] + 0.1, currNode.rightLeaf.max[2] + 0.1];
      renderer.push3dLine(pointA, pointB, 0.2, 0, [1, 0, 0], [1, 0, 0]);
    }
  }
  static renderDebugWireframe(rootNode, renderer) {
    if (!rootNode) {
      return;
    }
    this.renderNode(rootNode, renderer, [0.5, 0, 0]);
  }
}

// src/main/experiment/logics/FlockManager.ts
class AbstractFlockAgent {
  _def;
  _prevPos = exports_vec3.fromValues(0, 0, 0);
  _pos = exports_vec3.fromValues(0, 0, 0);
  _quat = exports_quat.identity(exports_quat.create());
  _forwardAxis = exports_vec3.fromValues(1, 0, 0);
  _hullGraphicModel;
  _shieldGraphicModel;
  _turrets = [];
  _totalDistance = 0;
  _min = exports_vec3.fromValues(0, 0, 0);
  _max = exports_vec3.fromValues(0, 0, 0);
  constructor(def) {
    this._def = def;
    this._hullGraphicModel = new GraphicModel(def.hull);
    if (def.shield) {
      this._shieldGraphicModel = new GraphicModel(def.shield);
    }
    for (const turretDef of this._def.turrets) {
      this._turrets.push(new Turret(turretDef));
    }
  }
  _applyCorrection(deltaTimeSec, ownAgents) {
    const k_speed = this._def.speed;
    const k_correctionSpeed = k_speed * 0.4;
    const correctedAcceleration = exports_vec3.fromValues(0, 0, 0);
    const separationAccelerationClose = exports_vec3.fromValues(0, 0, 0);
    const stayInBattleAccelerationClose = exports_vec3.fromValues(0, 0, 0);
    _separation(this, ownAgents, 0, this._def.separateRadius, 2, separationAccelerationClose);
    _stayInBattle(this, [0, 0, 5], [this._def.battlefieldSize, this._def.battlefieldSize, 20], 4, stayInBattleAccelerationClose);
    exports_vec3.add(correctedAcceleration, correctedAcceleration, separationAccelerationClose);
    exports_vec3.add(correctedAcceleration, correctedAcceleration, stayInBattleAccelerationClose);
    _limitVec3(correctedAcceleration, 1);
    exports_vec3.scaleAndAdd(this._pos, this._pos, correctedAcceleration, k_correctionSpeed * deltaTimeSec);
  }
  testCollision_exp(rayOrigin, rayVelocity, outData) {
    if (this._shieldGraphicModel && this._shieldGraphicModel.isAlive()) {
      const intersectionCoef = this._shieldGraphicModel.testCollision_exp(rayOrigin, rayVelocity, outData);
      if (intersectionCoef > 0) {
        return intersectionCoef;
      }
    }
    return this._hullGraphicModel.testCollision_exp(rayOrigin, rayVelocity, outData);
  }
  takeDamage(damage) {
    if (this._shieldGraphicModel && this._shieldGraphicModel.isAlive()) {
      this._shieldGraphicModel.takeDamage(damage);
    } else {
      this._hullGraphicModel.takeDamage(damage);
    }
  }
  isAlive() {
    return this._hullGraphicModel.isAlive();
  }
  setPosition(pos) {
    exports_vec3.copy(this._pos, pos);
  }
  getPosition() {
    return this._pos;
  }
  getQuat() {
    return this._quat;
  }
  setForwardAxis(forwardAxis) {
    exports_vec3.copy(this._forwardAxis, forwardAxis);
  }
  getForwardAxis() {
    return this._forwardAxis;
  }
  _internalUpdate(deltaTimeSec, ownAgents, otherFaction, projectileManager) {}
  update(deltaTimeSec, ownAgents, otherFaction, projectileManager) {
    const k_speed = this._def.speed;
    const k_correctionSpeed = k_speed * 0.2;
    exports_vec3.copy(this._prevPos, this._pos);
    this._applyCorrection(deltaTimeSec, ownAgents);
    {
      this._internalUpdate(deltaTimeSec, ownAgents, otherFaction, projectileManager);
    }
    for (const currTurret of this._turrets) {
      currTurret.update(deltaTimeSec, this._pos, this._quat, projectileManager, ownAgents, otherFaction);
    }
    {}
    if (this._def.deathTrigger?.maxDistance !== undefined) {
      this._totalDistance += exports_vec3.distance(this._prevPos, this._pos);
      if (this._totalDistance > this._def.deathTrigger?.maxDistance) {
        this._hullGraphicModel.takeDamage(999999);
        this.onDeath(otherFaction);
      }
    }
    this._hullGraphicModel.update(deltaTimeSec, this._pos, this._quat);
    this._shieldGraphicModel?.update(deltaTimeSec, this._pos, this._quat);
    if (this._shieldGraphicModel) {
      this._shieldGraphicModel.computeAABB(this._min, this._max);
    } else {
      this._hullGraphicModel.computeAABB(this._min, this._max);
    }
  }
  renderShieldIdle(stackRenderers, trianglesStackRenderer, color, debugMode) {
    if (debugMode) {
      this._shieldGraphicModel?.renderWireframe(stackRenderers, color, true);
    } else {
      this._shieldGraphicModel?.renderPoly(trianglesStackRenderer, color);
    }
  }
  renderShieldImpact(stackRenderers, trianglesStackRenderer, color) {
    this._shieldGraphicModel?.renderWireframe(stackRenderers, color);
    this._shieldGraphicModel?.renderPolyHurtOnly(trianglesStackRenderer, color);
  }
  renderHull(stackRenderers, trianglesStackRenderer, color, colorHurt, debugMode) {
    if (debugMode) {
      this._hullGraphicModel.renderWireframe(stackRenderers, color, true);
    } else {
      this._hullGraphicModel.renderPoly(trianglesStackRenderer, color);
    }
    this._hullGraphicModel.renderPolyHurtOnly(trianglesStackRenderer, colorHurt);
  }
  renderTurrets(stackRenderers, trianglesStackRenderer, debugMode) {
    for (const currTurret of this._turrets) {
      currTurret.render(stackRenderers, trianglesStackRenderer, debugMode);
    }
  }
  renderTurretsLogicDebug(stackRenderers, trianglesStackRenderer) {
    for (const currTurret of this._turrets) {
      currTurret.renderLogicDebug(stackRenderers, trianglesStackRenderer);
    }
  }
  onDeath(otherFaction) {
    const proxRadius = this._def.deathTrigger?.proximityRadius;
    if (proxRadius === undefined) {
      return;
    }
    const closestResults = _findClosestAgents(this, otherFaction, proxRadius);
    for (const currResult of closestResults) {
      if (currResult.distance < proxRadius) {
        currResult.agent.takeDamage(40);
      }
    }
  }
  isTrackable() {
    return this._def.type !== "homing-missile";
  }
  get min() {
    return this._min;
  }
  get max() {
    return this._max;
  }
}

class CapitalFlockAgent extends AbstractFlockAgent {
  _internalUpdate(deltaTimeSec, ownAgents, otherFaction, projectileManager) {
    const k_speed = this._def.speed;
    const k_correctionSpeed = k_speed * 0.2;
    {
      const lookAcceleration = exports_vec3.fromValues(0, 0, 0);
      const closestResult = _stayInRangeFlock(this, otherFaction, this._def.range - 5, this._def.range + 5, k_speed, lookAcceleration);
      if (!closestResult) {
        _strafe(this, [0, 0, 10], 15, 1, lookAcceleration);
      }
      _limitVec3(lookAcceleration, k_speed);
      exports_vec3.scaleAndAdd(this._pos, this._pos, lookAcceleration, deltaTimeSec);
      const lookAxis = exports_vec3.copy(exports_vec3.create(), this._forwardAxis);
      if (closestResult) {
        if (closestResult.distance > 0) {
          const desiredLook = exports_vec3.create();
          exports_vec3.scale(desiredLook, closestResult.diff, 1 / closestResult.distance);
          exports_vec3.lerp(this._forwardAxis, this._forwardAxis, desiredLook, deltaTimeSec * 0.25);
          exports_vec3.scaleAndAdd(this._pos, this._pos, desiredLook, k_correctionSpeed * deltaTimeSec);
        }
      } else {
        exports_vec3.lerp(this._forwardAxis, this._forwardAxis, lookAcceleration, deltaTimeSec * 0.25);
        exports_vec3.scaleAndAdd(this._pos, this._pos, lookAcceleration, k_correctionSpeed * deltaTimeSec);
      }
      const yaw = Math.atan2(lookAxis[1], lookAxis[0]);
      const pitch = Math.atan2(-lookAxis[2], Math.sqrt(lookAxis[0] * lookAxis[0] + lookAxis[1] * lookAxis[1]));
      const safePitch = exports_system.math.clamp(pitch, -Math.PI * 0.3, +Math.PI * 0.3);
      const tmpQuatYaw = exports_quat.setAxisAngle(exports_quat.create(), [0, 0, 1], yaw);
      const tmpQuatPitch = exports_quat.setAxisAngle(exports_quat.create(), [0, 1, 0], safePitch);
      exports_quat.identity(this._quat);
      exports_quat.multiply(this._quat, this._quat, tmpQuatYaw);
      exports_quat.multiply(this._quat, this._quat, tmpQuatPitch);
    }
  }
}

class JetFighterFlockAgent extends AbstractFlockAgent {
  _internalUpdate(deltaTimeSec, ownAgents, otherFaction, projectileManager) {
    const k_speed = this._def.speed;
    {
      const lookAcceleration = exports_vec3.fromValues(0, 0, 0);
      const closestResult = _strafeFlock(this, otherFaction, this._def.range - 1, this._def.range + 1, k_speed, lookAcceleration);
      if (!closestResult) {
        _strafe(this, [0, 0, 10], 15, 1, lookAcceleration);
      }
      exports_vec3.lerp(this._forwardAxis, this._forwardAxis, lookAcceleration, deltaTimeSec * 3);
      const yaw = Math.atan2(this._forwardAxis[1], this._forwardAxis[0]);
      const pitch = Math.atan2(-this._forwardAxis[2], Math.sqrt(this._forwardAxis[0] * this._forwardAxis[0] + this._forwardAxis[1] * this._forwardAxis[1]));
      const tmpQuatYaw = exports_quat.setAxisAngle(exports_quat.create(), [0, 0, 1], yaw);
      const tmpQuatPitch = exports_quat.setAxisAngle(exports_quat.create(), [0, 1, 0], pitch);
      exports_quat.identity(this._quat);
      exports_quat.multiply(this._quat, this._quat, tmpQuatYaw);
      exports_quat.multiply(this._quat, this._quat, tmpQuatPitch);
      const tmpSpeed = exports_vec3.length(this._forwardAxis);
      const forwardAxis = exports_vec3.fromValues(1, 0, 0);
      exports_vec3.transformQuat(forwardAxis, forwardAxis, this._quat);
      exports_vec3.scaleAndAdd(this._pos, this._pos, forwardAxis, tmpSpeed * deltaTimeSec);
    }
  }
}

class HomingMissileFlockAgent extends AbstractFlockAgent {
  _internalUpdate(deltaTimeSec, ownAgents, otherFaction, projectileManager) {
    const k_speed = this._def.speed;
    {
      const lookAcceleration = exports_vec3.fromValues(0, 0, 0);
      const closestResult = _findClosestAgent(this, otherFaction);
      if (closestResult) {
        if (this._def.deathTrigger?.proximityRadius !== undefined && closestResult.distance < this._def.deathTrigger.proximityRadius) {
          this._hullGraphicModel.takeDamage(999999);
          this.onDeath(otherFaction);
        } else {
          const closestAgents = _findClosestAgent(this, otherFaction, 3);
          const totalLength = this._def.speed * deltaTimeSec;
          let bestAgent;
          let bestDistance = 999999999;
          const bestData = {
            distance: -1,
            normal: exports_vec3.fromValues(0, 0, 0)
          };
          const subResult = otherFaction.searchByRadius(this._pos, totalLength);
          for (const tmpAgent of subResult) {
            const intersectionCoef = tmpAgent.testCollision_exp(this._pos, this._forwardAxis, bestData);
            if (intersectionCoef > 0 && intersectionCoef <= totalLength && intersectionCoef < bestDistance) {
              bestAgent = tmpAgent;
              bestDistance = intersectionCoef;
            }
          }
          if (bestAgent) {
            this._hullGraphicModel.takeDamage(999999);
            this.onDeath(otherFaction);
          }
        }
        _seek(this, closestResult.agent.getPosition(), k_speed, lookAcceleration);
      } else {
        _strafe(this, [0, 0, 10], 10, 1, lookAcceleration);
      }
      _maximizeVec3(lookAcceleration, k_speed);
      exports_vec3.lerp(this._forwardAxis, this._forwardAxis, lookAcceleration, deltaTimeSec * 3);
      _maximizeVec3(this._forwardAxis, k_speed);
      const yaw = Math.atan2(this._forwardAxis[1], this._forwardAxis[0]);
      const pitch = Math.atan2(-this._forwardAxis[2], Math.sqrt(this._forwardAxis[0] * this._forwardAxis[0] + this._forwardAxis[1] * this._forwardAxis[1]));
      const tmpQuatYaw = exports_quat.setAxisAngle(exports_quat.create(), [0, 0, 1], yaw);
      const tmpQuatPitch = exports_quat.setAxisAngle(exports_quat.create(), [0, 1, 0], pitch);
      exports_quat.identity(this._quat);
      exports_quat.multiply(this._quat, this._quat, tmpQuatYaw);
      exports_quat.multiply(this._quat, this._quat, tmpQuatPitch);
      const tmpSpeed = exports_vec3.length(this._forwardAxis);
      const forwardAxis = exports_vec3.fromValues(1, 0, 0);
      exports_vec3.transformQuat(forwardAxis, forwardAxis, this._quat);
      exports_vec3.scaleAndAdd(this._pos, this._pos, forwardAxis, tmpSpeed * deltaTimeSec);
    }
  }
}

class FlockFaction {
  _GraphicTrailsManager;
  _allAgents = [];
  _bvhTree = new BvhTree;
  constructor(GraphicTrailsManager) {
    this._GraphicTrailsManager = GraphicTrailsManager;
  }
  spawn(def) {
    switch (def.type) {
      case "capital": {
        const newAgent = new CapitalFlockAgent(def);
        this._allAgents.push(newAgent);
        this._GraphicTrailsManager.createTrail(10, 30, newAgent);
        return newAgent;
      }
      case "jet-fighter": {
        const newAgent = new JetFighterFlockAgent(def);
        this._allAgents.push(newAgent);
        this._GraphicTrailsManager.createTrail(10, 30, newAgent);
        return newAgent;
      }
      case "homing-missile": {
        const newAgent = new HomingMissileFlockAgent(def);
        this._allAgents.push(newAgent);
        this._GraphicTrailsManager.createTrail(10, 30, newAgent);
        return newAgent;
      }
      default: {
        throw new Error("not implemented");
      }
    }
  }
  update(deltaTimeSec, otherFaction, projectileManager) {
    for (let ii = 0;ii < this._allAgents.length; ) {
      if (this._allAgents[ii].isAlive()) {
        ++ii;
      } else {
        GlobalExplosionsManager.get().push(this._allAgents[ii].getPosition());
        this._allAgents.splice(ii, 1);
      }
    }
    for (const currAgent of this._allAgents) {
      currAgent.update(deltaTimeSec, this, otherFaction, projectileManager);
    }
    this._bvhTree.synchronize(this._allAgents);
  }
  get allAgents() {
    return this._allAgents;
  }
  searchByRadius(pos, radius) {
    return this._bvhTree.searchByRadius(pos, radius);
  }
  renderDebug(renderer) {
    BvhDebug.renderDebugWireframe(this._bvhTree.getRootNode(), renderer);
  }
}

// src/main/experiment/logics/GraphicTrailsManager.ts
class GraphicTrailsManager {
  _allTrails = [];
  createTrail(...args) {
    const newTrail = new GraphicTrail(...args);
    this._allTrails.push(newTrail);
    return newTrail;
  }
  update() {
    for (let ii = 0;ii < this._allTrails.length; ) {
      this._allTrails[ii].update();
      if (!this._allTrails[ii].isAlive()) {
        this._allTrails.splice(ii, 1);
      } else {
        ++ii;
      }
    }
  }
  render(stackRenderers) {
    for (const currTrail of this._allTrails) {
      currTrail.render(stackRenderers);
    }
  }
}

class GraphicTrail {
  _target;
  _trailMaxLength;
  _trailCoolDownInFrames;
  _trail = [];
  _trailCountdownInFrames = 0;
  constructor(trailMaxLength = 10, trailCoolDownInFrames = 30, target) {
    this._trailMaxLength = trailMaxLength;
    this._trailCoolDownInFrames = trailCoolDownInFrames;
    this._target = target;
  }
  isAlive() {
    return this._target && this._target.isAlive() || this._trail.length >= 2;
  }
  update() {
    if (this._trailCountdownInFrames > 0) {
      this._trailCountdownInFrames--;
    }
    if (this._target && !this._target.isAlive()) {
      this._target = undefined;
    }
    if (this._target) {
      if (this._trail.length > 0) {
        exports_vec3.copy(this._trail[0].pos, this._target.getPosition());
      }
      if (this._trailCountdownInFrames <= 0) {
        const maxTime = this._trailMaxLength * this._trailCoolDownInFrames;
        this._trail.unshift({
          pos: exports_vec3.copy(exports_vec3.create(), this._target.getPosition()),
          timeLeftInFrames: maxTime
        });
        this._trailCountdownInFrames = this._trailCoolDownInFrames;
        while (this._trail.length > this._trailMaxLength) {
          this._trail.pop();
        }
      }
    }
    for (let ii = 0;ii < this._trail.length; ) {
      --this._trail[ii].timeLeftInFrames;
      if (this._trail[ii].timeLeftInFrames <= 0) {
        this._trail.splice(ii, 1);
      } else {
        ++ii;
      }
    }
  }
  render(stackRenderers) {
    const maxTime = this._trailCoolDownInFrames;
    for (let ii = 0;ii + 1 < this._trail.length; ++ii) {
      const jj = ii + 1;
      const partA = this._trail[ii];
      const partB = this._trail[jj];
      const coefA = Math.max(0, 0.8 - maxTime / partA.timeLeftInFrames);
      const coefB = Math.max(0, 0.8 - maxTime / partB.timeLeftInFrames);
      const colorA = [coefA * 0.7, coefA * 0.7, 0];
      const colorB = [coefB * 0.7, coefB * 0.7, 0];
      stackRenderers.push3dLine(partA.pos, partB.pos, 0.05 * coefA, 0.05 * coefB, colorA, colorB);
    }
  }
}

// src/main/experiment/logics/Simulation.ts
class Simulation {
  _graphicTrailsManager = new GraphicTrailsManager;
  _factionA = new FlockFaction(this._graphicTrailsManager);
  _factionB = new FlockFaction(this._graphicTrailsManager);
  _projectileManagerA = new ProjectileManager(this._graphicTrailsManager);
  _projectileManagerB = new ProjectileManager(this._graphicTrailsManager);
  constructor() {
    GlobalExplosionsManager.create();
    GlobalParticlesManager.create();
    const builder = new GraphicModelBuilder;
    builder.reset();
    {
      const vertices = exports_graphics.geometries.makeSphere(1, 2);
      const offset = [0, 0, -0.25];
      for (let ii = 0;ii < vertices.length; ii += 3) {
        const v0 = exports_vec3.multiply(exports_vec3.create(), vertices[ii + 0].pos, [1.4, 0.6, 0.6]);
        const v1 = exports_vec3.multiply(exports_vec3.create(), vertices[ii + 1].pos, [1.4, 0.6, 0.6]);
        const v2 = exports_vec3.multiply(exports_vec3.create(), vertices[ii + 2].pos, [1.4, 0.6, 0.6]);
        exports_vec3.add(v0, v0, offset);
        exports_vec3.add(v1, v1, offset);
        exports_vec3.add(v2, v2, offset);
        const v01 = exports_vec3.sub(exports_vec3.create(), v0, v1);
        const v02 = exports_vec3.sub(exports_vec3.create(), v0, v2);
        const normal = exports_vec3.cross(exports_vec3.create(), v01, v02);
        builder.pushTriangle(v0, v1, v2, normal);
      }
    }
    const capitalShieldDef = builder.getDef(200);
    builder.reset();
    {
      const frontNose = exports_vec3.fromValues(2, 0, 0.05);
      const backNose = exports_vec3.fromValues(-2, 0, 0.05);
      const frontUp = exports_vec3.fromValues(0.75, 0, 0.3);
      const frontLeft = exports_vec3.fromValues(0.75, 0.4, -0.4);
      const frontRight = exports_vec3.fromValues(0.75, -0.4, -0.4);
      const backUp = exports_vec3.fromValues(-0.75, 0, 0.3);
      const backLeft = exports_vec3.fromValues(-0.75, 0.4, -0.4);
      const backRight = exports_vec3.fromValues(-0.75, -0.4, -0.4);
      const frontDown = exports_vec3.fromValues(0.5, 0, -0.9);
      const backDown = exports_vec3.fromValues(-0.5, 0, -0.9);
      builder.pushTriangle(frontNose, frontLeft, frontUp, [0, 1, 0]);
      builder.pushTriangle(frontNose, frontRight, frontUp, [0, -1, 0]);
      builder.pushTriangle(frontNose, frontLeft, frontRight, [0, 0, -1]);
      builder.pushTriangle(backNose, backLeft, backUp, [0, 1, 0]);
      builder.pushTriangle(backNose, backRight, backUp, [0, -1, 0]);
      builder.pushTriangle(backNose, backLeft, backRight, [0, 0, -1]);
      builder.pushQuad(frontUp, backUp, backRight, frontRight, [0, -1, 0]);
      builder.pushQuad(frontUp, backUp, backLeft, frontLeft, [0, 1, 0]);
      builder.pushQuad(frontDown, backDown, backRight, frontRight, [0, 0, -1]);
      builder.pushQuad(frontDown, backDown, backLeft, frontLeft, [0, 0, -1]);
      builder.pushTriangle(frontDown, frontRight, frontLeft, [1, 0, 0]);
      builder.pushTriangle(backDown, backRight, backLeft, [-1, 0, 0]);
    }
    const capitalHullDef = builder.getDef(100);
    builder.reset();
    {
      const frontNose = exports_vec3.fromValues(0.4, 0, 0);
      const backUp = exports_vec3.fromValues(-0.35, 0, 0.15);
      const backDown = exports_vec3.fromValues(-0.35, 0, -0.15);
      const backLeft = exports_vec3.fromValues(-0.35, 0.15, 0);
      const backRight = exports_vec3.fromValues(-0.35, -0.15, 0);
      builder.pushTriangle(frontNose, backLeft, backUp, [0, 0, 1]);
      builder.pushTriangle(frontNose, backRight, backUp, [0, 0, 1]);
      builder.pushTriangle(frontNose, backLeft, backDown, [0, 0, -1]);
      builder.pushTriangle(frontNose, backRight, backDown, [0, 0, -1]);
      builder.pushTriangle(backDown, backLeft, backUp, [-1, 0, 0]);
      builder.pushTriangle(backDown, backRight, backUp, [-1, 0, 0]);
    }
    const missileHullDef = builder.getDef(5);
    builder.reset();
    {
      const frontNose = exports_vec3.fromValues(0.5, 0, 0);
      const backUp = exports_vec3.fromValues(-0.25, 0, 0.25);
      const backDown = exports_vec3.fromValues(-0.25, 0, -0.25);
      const backLeft = exports_vec3.fromValues(-0.45, 0.75, 0);
      const backRight = exports_vec3.fromValues(-0.45, -0.75, 0);
      builder.pushTriangle(frontNose, backLeft, backUp, [0, 0, 1]);
      builder.pushTriangle(frontNose, backRight, backUp, [0, 0, 1]);
      builder.pushTriangle(frontNose, backLeft, backDown, [0, 0, -1]);
      builder.pushTriangle(frontNose, backRight, backDown, [0, 0, -1]);
      builder.pushTriangle(backDown, backLeft, backUp, [-1, 0, 0]);
      builder.pushTriangle(backDown, backRight, backUp, [-1, 0, 0]);
    }
    const fighterHullDef = builder.getDef(30);
    builder.reset();
    builder.pushTriangle([0.25, 0, -0.1], [-0.13, 0.25, -0.1], [-0.13, -0.25, -0.1], [0, 0, 1]);
    const turretBasketDef = builder.getDef(1);
    builder.reset();
    builder.pushQuad([0.06, -0.13, -0.08], [0.06, 0.13, -0.08], [-0.06, 0.13, -0.08], [-0.06, -0.13, -0.08], [0, 0, 1]);
    builder.pushQuad([0.06, 0.13, -0.08], [0.06, 0.06, 0.13], [-0.06, 0.06, 0.13], [-0.06, 0.13, -0.08], [0, 1, 0]);
    builder.pushQuad([0.06, -0.13, -0.08], [0.06, -0.06, 0.13], [-0.06, -0.06, 0.13], [-0.06, -0.13, -0.08], [0, -1, 0]);
    builder.pushTriangle([0.06, -0.13, -0.08], [0.2, 0, -0.08], [0.06, 0.13, -0.08], [0, 0, 1]);
    const gunMantletDef = builder.getDef(1);
    builder.reset();
    builder.pushQuad([0.45, 0.06, 0], [0.45, 0, 0.13], [0, 0, 0.13], [0, 0.06, 0], [0, 1, -1]);
    builder.pushQuad([0.45, -0.06, 0], [0.45, -0, 0.13], [0, -0, 0.13], [0, -0.06, 0], [0, -1, -1]);
    builder.pushQuad([0.45, -0.06, 0], [0.45, 0.06, 0], [0, 0.06, 0], [0, -0.06, 0], [0, 0, -1]);
    const gunBarrelDef = builder.getDef(1);
    const smallBallisticWeaponDef = {
      warmUpSec: 0,
      coolDownSec: 0.06125,
      randomExtraCoolDownRange: 0.001,
      actionable: {
        type: "projectile",
        sprayPercent: 0.01,
        projectileDef: {
          maxDistance: 15,
          damage: 0.5,
          speed: 50,
          homing: false
        }
      }
    };
    const superBallisticWeaponDef = {
      warmUpSec: 0,
      coolDownSec: 0.06125,
      randomExtraCoolDownRange: 0.001,
      actionable: {
        type: "projectile",
        sprayPercent: 0.01,
        projectileDef: {
          maxDistance: 25,
          damage: 0.5,
          speed: 50,
          homing: false
        }
      }
    };
    const missileAgentDef = {
      speed: 3 * 4,
      type: "homing-missile",
      range: 0.5,
      battlefieldSize: 60,
      separateRadius: 1,
      turrets: [],
      hull: missileHullDef,
      deathTrigger: {
        maxDistance: 60,
        proximityRadius: 0.5
      }
    };
    const fighterDef = {
      speed: 3 * 2,
      type: "jet-fighter",
      range: 10,
      battlefieldSize: 50,
      separateRadius: 2,
      hull: fighterHullDef,
      turrets: [
        {
          offsetVec3: [0, 0, 0.25],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [0, 1, 0], Math.PI * 0.1),
          radialAimingSpeed: 15,
          upAxisDotRange: [-0.5, 0.9],
          weaponDef: smallBallisticWeaponDef,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        }
      ]
    };
    const missileWeaponDef2 = {
      warmUpSec: 0,
      coolDownSec: 6,
      actionable: {
        type: "flocking-agent",
        flockAgentDef: missileAgentDef,
        maxDistance: 50
      }
    };
    const capitalDef = {
      speed: 1 * 1.5,
      type: "capital",
      range: 20,
      battlefieldSize: 40,
      separateRadius: 4,
      shield: capitalShieldDef,
      hull: capitalHullDef,
      turrets: [
        {
          offsetVec3: [0.4, -0.25, 0.15],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * 0.35),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: superBallisticWeaponDef,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        },
        {
          offsetVec3: [0.4, 0.25, 0.15],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * -0.35),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: superBallisticWeaponDef,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        },
        {
          offsetVec3: [-0, -0.35, -0.65],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * 0.75),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: superBallisticWeaponDef,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        },
        {
          offsetVec3: [-0, 0.35, -0.65],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * -0.75),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: superBallisticWeaponDef,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        },
        {
          offsetVec3: [-0.4, -0.45, -0.05],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * 0.35),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: missileWeaponDef2,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        },
        {
          offsetVec3: [-0.4, 0.45, -0.05],
          offsetQuat: exports_quat.setAxisAngle(exports_quat.create(), [1, 0, 0], Math.PI * -0.35),
          radialAimingSpeed: 5,
          upAxisDotRange: [-0.1, 0.9],
          weaponDef: missileWeaponDef2,
          basketModel: turretBasketDef,
          gunMantlet: gunMantletDef,
          gunBarrel: gunBarrelDef
        }
      ]
    };
    for (let zz = 0;zz < 1; ++zz)
      for (let yy = 0;yy < 2; ++yy)
        for (let xx = 0;xx < 1; ++xx) {
          const newFighterCapitalA = this._factionA.spawn(capitalDef);
          newFighterCapitalA.setPosition([1 + xx * 2 - 40, 1 + yy * 2, 1 + zz * 2 + 5]);
          newFighterCapitalA.setForwardAxis([1, 0, 0]);
          const newFighterCapitalB = this._factionB.spawn(capitalDef);
          newFighterCapitalB.setPosition([1 + xx + 40, 1 + yy, 1 + zz + 5]);
          newFighterCapitalB.setForwardAxis([-1, 0, 0]);
        }
    for (let zz = 0;zz < 3; ++zz)
      for (let yy = 0;yy < 3; ++yy)
        for (let xx = 0;xx < 3; ++xx) {
          const newFighterAgentA = this._factionA.spawn(fighterDef);
          newFighterAgentA.setPosition([1 + xx - 35, 1 + yy, 1 + zz + 5]);
          newFighterAgentA.setForwardAxis([1, 0, 0]);
          const newFighterAgentB = this._factionB.spawn(fighterDef);
          newFighterAgentB.setPosition([1 + xx + 35, 1 + yy, 1 + zz + 5]);
          newFighterAgentB.setForwardAxis([-1, 0, 0]);
        }
  }
  update(deltaTimeSec, renderer) {
    this._factionA.update(deltaTimeSec, this._factionB, this._projectileManagerA);
    this._factionB.update(deltaTimeSec, this._factionA, this._projectileManagerB);
    this._projectileManagerA.update(deltaTimeSec, this._factionB);
    this._projectileManagerB.update(deltaTimeSec, this._factionA);
    GlobalExplosionsManager.get().update(deltaTimeSec);
    GlobalParticlesManager.get().update(deltaTimeSec);
    this._graphicTrailsManager.update();
  }
  render(renderer, debugMode = 0) {
    const debugBvh = debugMode === 1;
    const debugTurrets = debugMode === 3;
    const debugAgents = debugTurrets || debugMode === 2;
    const colorA = [0.4, 0.4, 1];
    const colorAHurt = [0.8, 0.8, 1];
    const colorB = [1, 0.4, 0.4];
    const colorBHurt = [1, 0.8, 0.8];
    const gl = exports_graphics.webgl2.WebGLContext.getContext();
    gl.disable(gl.CULL_FACE);
    if (debugTurrets) {
      for (const currAgent of this._factionA.allAgents) {
        currAgent.renderTurretsLogicDebug(renderer.stackRenderers, renderer.litTrianglesStackRenderer);
      }
      renderer.flushScene();
      for (const currAgent of this._factionB.allAgents) {
        currAgent.renderTurretsLogicDebug(renderer.stackRenderers, renderer.litTrianglesStackRenderer);
      }
      renderer.flushScene();
    }
    for (const currAgent of this._factionA.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      currAgent.renderHull(renderer.stackRenderers, renderer.litTrianglesStackRenderer, colorA, colorAHurt, debugAgents);
      currAgent.renderTurrets(renderer.stackRenderers, renderer.litTrianglesStackRenderer, debugAgents);
    }
    renderer.flushScene();
    for (const currAgent of this._factionB.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      currAgent.renderHull(renderer.stackRenderers, renderer.litTrianglesStackRenderer, colorB, colorBHurt, debugAgents);
      currAgent.renderTurrets(renderer.stackRenderers, renderer.litTrianglesStackRenderer, debugAgents);
    }
    renderer.flushScene();
    this._projectileManagerA.render(renderer.stackRenderers, renderer.frustumCulling, colorA);
    renderer.flushScene();
    this._projectileManagerB.render(renderer.stackRenderers, renderer.frustumCulling, colorB);
    renderer.flushScene();
    this._graphicTrailsManager.render(renderer.stackRenderers);
    renderer.flushScene();
    gl.disable(gl.CULL_FACE);
    for (const currAgent of this._factionA.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      currAgent.renderShieldImpact(renderer.stackRenderers, renderer.litTrianglesStackRenderer, [1, 1, 1, 1]);
    }
    for (const currAgent of this._factionB.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      currAgent.renderShieldImpact(renderer.stackRenderers, renderer.litTrianglesStackRenderer, [1, 1, 1, 1]);
    }
    renderer.flushScene();
    gl.enable(gl.CULL_FACE);
    const rawListA = [];
    for (const currAgent of this._factionA.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      const screenCoord = exports_graphics.camera.sceneToScreenCoordinates(pos, renderer.mainCamera.getViewMatrix(), renderer.mainCamera.getProjectionMatrix(), [0, 0, renderer.size[0], renderer.size[1]]);
      if (!screenCoord) {
        continue;
      }
      rawListA.push({
        depth: screenCoord[2],
        agent: currAgent
      });
    }
    const rawListB = [];
    for (const currAgent of this._factionB.allAgents) {
      const pos = currAgent.getPosition();
      if (!renderer.frustumCulling.sphereInFrustum(pos[0], pos[1], pos[2], 3)) {
        continue;
      }
      const screenCoord = exports_graphics.camera.sceneToScreenCoordinates(pos, renderer.mainCamera.getViewMatrix(), renderer.mainCamera.getProjectionMatrix(), [0, 0, renderer.size[0], renderer.size[1]]);
      if (!screenCoord) {
        continue;
      }
      rawListB.push({
        depth: screenCoord[2],
        agent: currAgent
      });
    }
    rawListA.sort((a, b) => a.depth - b.depth);
    rawListB.sort((a, b) => a.depth - b.depth);
    for (const currAgent of rawListA) {
      currAgent.agent.renderShieldIdle(renderer.stackRenderers, renderer.litTrianglesStackRenderer, [1, 1, 1, 0.2], debugAgents);
    }
    for (const currAgent of rawListB) {
      currAgent.agent.renderShieldIdle(renderer.stackRenderers, renderer.litTrianglesStackRenderer, [1, 1, 1, 0.2], debugAgents);
    }
    renderer.flushScene();
    GlobalExplosionsManager.get().render(renderer.stackRenderers);
    renderer.flushScene();
    GlobalParticlesManager.get().render(renderer.stackRenderers);
    renderer.flushScene();
    if (debugBvh) {
      this._factionA.renderDebug(renderer.stackRenderers);
      renderer.flushScene();
      this._factionB.renderDebug(renderer.stackRenderers);
      renderer.flushScene();
    }
  }
  getAllAgents() {
    return [...this._factionA.allAgents, ...this._factionB.allAgents];
  }
}

// src/main/experiment/utilities/FrameProfiler.ts
class FrameProfiler3 {
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

// src/main/experiment/Application.ts
class Application {
  _canvasElement;
  _renderer;
  _freeFlyController;
  _running;
  _errorGraphicContext;
  _simulation;
  _isPaused = false;
  _debugMode = 0;
  _currFrameTime = Date.now();
  _frameProfiler = new FrameProfiler3;
  _time = 0;
  constructor(canvasElement) {
    this._canvasElement = canvasElement;
    this._renderer = new WebGLRenderer({
      canvasDomElement: canvasElement
    });
    this._freeFlyController = new exports_system.controllers.FreeFlyController({
      position: exports_vec3.fromValues(-20, 20, 20),
      coordinates: ["X", "Y", "Z"],
      theta: Math.PI * -0.25,
      phi: Math.PI * -0.2,
      mouseSensibility: controllerMouseSensibility,
      movingSpeed: controllerMovingSpeed,
      keyboardSensibility: controllerKeyboardSensibility,
      touchSensibility: controllerTouchSensibility
    });
    {
      exports_system.browser.GlobalKeyboardManager.activate();
    }
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
    this._simulation = new Simulation;
  }
  async init() {
    await this._renderer.initialize();
  }
  start() {
    if (this.isRunning()) {
      return;
    }
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
    let deltaSecTime = Math.max(0, currentTime - this._currFrameTime);
    this._currFrameTime = currentTime;
    this._frameProfiler.pushDelta(deltaSecTime);
    const safeDelta = Math.min(deltaSecTime / 1000, 1 / 60);
    this._freeFlyController.update(safeDelta);
    exports_system.browser.GlobalMouseManager.resetDeltas();
    exports_system.browser.GlobalTouchManager.resetDeltas();
    this._time += safeDelta;
    if (exports_system.browser.GlobalKeyboardManager.wasPressed("H")) {
      this._isPaused = !this._isPaused;
    }
    if (exports_system.browser.GlobalKeyboardManager.wasPressed("J")) {
      this._debugMode = (this._debugMode + 1) % 4;
    }
    exports_system.browser.GlobalKeyboardManager.resetWasPressedKeys();
    this._renderer.lookAt(this._freeFlyController.getPosition(), this._freeFlyController.getTarget(), this._freeFlyController.getUpAxis());
    if (!this._isPaused) {
      this._simulation.update(safeDelta, this._renderer);
    }
    this._renderer.update();
    this._renderer.renderScene((camera, frustumCulling) => {
      {
        const color = [0.25, 0.25, 0.25];
        for (let ii = -5;ii <= 5; ++ii) {
          const tmpVal = ii * 10;
          this._renderer.stackRenderers.pushLine([tmpVal, -50, -1], [tmpVal, 50, -1], color);
          this._renderer.stackRenderers.pushLine([-50, tmpVal, -1], [50, tmpVal, -1], color);
        }
        for (const currAgent of this._simulation.getAllAgents()) {
          this._renderer.stackRenderers.pushLine(currAgent.getPosition(), [currAgent.getPosition()[0], currAgent.getPosition()[1], -1], color);
        }
      }
      this._simulation.render(this._renderer, this._debugMode);
    });
    this._renderer.renderHUD(() => {
      exports_graphics.renderers.widgets.renderFpsMeter([10, this._canvasElement.height - 60, 0], [100, 50], this._frameProfiler, this._renderer.stackRenderers, this._renderer.textRenderer, true);
    });
  }
}

// src/main/utilities/setupOutdatedPage.ts
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
// src/main/main.ts
var _queryDomElement = (inName) => {
  const newElement = document.querySelector(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};
window.addEventListener("load", async () => {
  let demo = null;
  const canvasElement = _queryDomElement("#main-canvas");
  const errorText = _queryDomElement("#error-text");
  window.addEventListener("error", (err) => {
    if (demo) {
      demo.stop();
    }
    errorText.style.width = "800px";
    errorText.style.height = "600px";
    errorText.innerHTML = err.message;
    canvasElement.style.display = "none";
    errorText.style.display = "block";
    document.title += " (ERR)";
  });
  const resizeAll = (canvasElement2, demo2) => {
    canvasElement2.width = window.innerWidth;
    canvasElement2.height = window.innerHeight;
    canvasElement2.style.width = `${window.innerWidth}px`;
    canvasElement2.style.height = `${window.innerHeight}px`;
    demo2.resize(window.innerWidth, window.innerHeight);
  };
  if (!exports_system.browser.isWebGL2Supported()) {
    throw new Error("missing WebGL2 feature (unsupported)");
  }
  demo = new Application(canvasElement);
  resizeAll(canvasElement, demo);
  await demo.init();
  demo.start();
  window.addEventListener("resize", () => {
    if (demo && canvasElement) {
      resizeAll(canvasElement, demo);
    }
  });
  const pageMaxTimeInvisible = 60 * 1000;
  setupOutdatedPage(pageMaxTimeInvisible, () => {
    throw new Error("<br/><br/><br/>The page was inactive for too long<br/><br/>please reload");
  });
});
