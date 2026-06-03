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

// src/main/configuration.ts
var controllerMovingSpeed = 16;
var controllerMouseSensibility = 6;
var controllerKeyboardSensibility = Math.PI * 0.55;
var controllerTouchSensibility = 15;

// src/local-framework/system/index.ts
var exports_system = {};
__export(exports_system, {
  utilities: () => {
    {
      return exports_utilities;
    }
  },
  metrics: () => {
    {
      return exports_metrics;
    }
  },
  math: () => {
    {
      return exports_math;
    }
  },
  controllers: () => {
    {
      return exports_controllers;
    }
  },
  browser: () => {
    {
      return exports_browser;
    }
  }
});

// src/local-framework/system/browser/index.ts
var exports_browser = {};
__export(exports_browser, {
  isWebWorkerSupported: () => {
    {
      return isWebWorkerSupported;
    }
  },
  isWebGL2Supported: () => {
    {
      return isWebGL2Supported;
    }
  },
  isNumber: () => {
    {
      return isNumber;
    }
  },
  isLetter: () => {
    {
      return isLetter;
    }
  },
  isAlphanumeric: () => {
    {
      return isAlphanumeric;
    }
  },
  GlobalVisibilityManager: () => {
    {
      return GlobalVisibilityManager;
    }
  },
  GlobalTouchManager: () => {
    {
      return GlobalTouchManager;
    }
  },
  GlobalPointerLockManager: () => {
    {
      return GlobalPointerLockManager;
    }
  },
  GlobalMouseManager: () => {
    {
      return GlobalMouseManager;
    }
  },
  GlobalKeyboardManager: () => {
    {
      return GlobalKeyboardManager;
    }
  },
  GlobalFullScreenManager: () => {
    {
      return GlobalFullScreenManager;
    }
  },
  AllKeyCodes: () => {
    {
      return AllKeyCodes;
    }
  }
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
  onEvent(callback) {
    this._onEvent = callback;
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
  FreeFlyController: () => {
    {
      return FreeFlyController;
    }
  }
});

// src/local-framework/system/math/angles.ts
var degreeToRad = (angle) => angle * Math.PI / 180;

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

// node_modules/gl-matrix/esm/mat4.js
var exports_mat4 = {};
__export(exports_mat4, {
  transpose: () => {
    {
      return transpose;
    }
  },
  translate: () => {
    {
      return translate;
    }
  },
  targetTo: () => {
    {
      return targetTo;
    }
  },
  subtract: () => {
    {
      return subtract;
    }
  },
  sub: () => {
    {
      return sub;
    }
  },
  str: () => {
    {
      return str;
    }
  },
  set: () => {
    {
      return set;
    }
  },
  scale: () => {
    {
      return scale;
    }
  },
  rotateZ: () => {
    {
      return rotateZ;
    }
  },
  rotateY: () => {
    {
      return rotateY;
    }
  },
  rotateX: () => {
    {
      return rotateX;
    }
  },
  rotate: () => {
    {
      return rotate;
    }
  },
  perspectiveZO: () => {
    {
      return perspectiveZO;
    }
  },
  perspectiveNO: () => {
    {
      return perspectiveNO;
    }
  },
  perspectiveFromFieldOfView: () => {
    {
      return perspectiveFromFieldOfView;
    }
  },
  perspective: () => {
    {
      return perspective;
    }
  },
  orthoZO: () => {
    {
      return orthoZO;
    }
  },
  orthoNO: () => {
    {
      return orthoNO;
    }
  },
  ortho: () => {
    {
      return ortho;
    }
  },
  multiplyScalarAndAdd: () => {
    {
      return multiplyScalarAndAdd;
    }
  },
  multiplyScalar: () => {
    {
      return multiplyScalar;
    }
  },
  multiply: () => {
    {
      return multiply;
    }
  },
  mul: () => {
    {
      return mul;
    }
  },
  lookAt: () => {
    {
      return lookAt;
    }
  },
  invert: () => {
    {
      return invert;
    }
  },
  identity: () => {
    {
      return identity;
    }
  },
  getTranslation: () => {
    {
      return getTranslation;
    }
  },
  getScaling: () => {
    {
      return getScaling;
    }
  },
  getRotation: () => {
    {
      return getRotation;
    }
  },
  frustum: () => {
    {
      return frustum;
    }
  },
  fromZRotation: () => {
    {
      return fromZRotation;
    }
  },
  fromYRotation: () => {
    {
      return fromYRotation;
    }
  },
  fromXRotation: () => {
    {
      return fromXRotation;
    }
  },
  fromValues: () => {
    {
      return fromValues;
    }
  },
  fromTranslation: () => {
    {
      return fromTranslation;
    }
  },
  fromScaling: () => {
    {
      return fromScaling;
    }
  },
  fromRotationTranslationScaleOrigin: () => {
    {
      return fromRotationTranslationScaleOrigin;
    }
  },
  fromRotationTranslationScale: () => {
    {
      return fromRotationTranslationScale;
    }
  },
  fromRotationTranslation: () => {
    {
      return fromRotationTranslation;
    }
  },
  fromRotation: () => {
    {
      return fromRotation;
    }
  },
  fromQuat2: () => {
    {
      return fromQuat2;
    }
  },
  fromQuat: () => {
    {
      return fromQuat;
    }
  },
  frob: () => {
    {
      return frob;
    }
  },
  exactEquals: () => {
    {
      return exactEquals;
    }
  },
  equals: () => {
    {
      return equals;
    }
  },
  determinant: () => {
    {
      return determinant;
    }
  },
  create: () => {
    {
      return create;
    }
  },
  copy: () => {
    {
      return copy;
    }
  },
  clone: () => {
    {
      return clone;
    }
  },
  adjoint: () => {
    {
      return adjoint;
    }
  },
  add: () => {
    {
      return add;
    }
  }
});
function create() {
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
function determinant(a) {
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
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
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
var perspective = perspectiveNO;
var ortho = orthoNO;
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/vec3.js
var exports_vec3 = {};
__export(exports_vec3, {
  zero: () => {
    {
      return zero;
    }
  },
  transformQuat: () => {
    {
      return transformQuat;
    }
  },
  transformMat4: () => {
    {
      return transformMat4;
    }
  },
  transformMat3: () => {
    {
      return transformMat3;
    }
  },
  subtract: () => {
    {
      return subtract2;
    }
  },
  sub: () => {
    {
      return sub2;
    }
  },
  str: () => {
    {
      return str2;
    }
  },
  squaredLength: () => {
    {
      return squaredLength;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance;
    }
  },
  sqrLen: () => {
    {
      return sqrLen;
    }
  },
  sqrDist: () => {
    {
      return sqrDist;
    }
  },
  set: () => {
    {
      return set2;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd;
    }
  },
  scale: () => {
    {
      return scale2;
    }
  },
  round: () => {
    {
      return round;
    }
  },
  rotateZ: () => {
    {
      return rotateZ2;
    }
  },
  rotateY: () => {
    {
      return rotateY2;
    }
  },
  rotateX: () => {
    {
      return rotateX2;
    }
  },
  random: () => {
    {
      return random;
    }
  },
  normalize: () => {
    {
      return normalize;
    }
  },
  negate: () => {
    {
      return negate;
    }
  },
  multiply: () => {
    {
      return multiply2;
    }
  },
  mul: () => {
    {
      return mul2;
    }
  },
  min: () => {
    {
      return min;
    }
  },
  max: () => {
    {
      return max;
    }
  },
  lerp: () => {
    {
      return lerp;
    }
  },
  length: () => {
    {
      return length;
    }
  },
  len: () => {
    {
      return len;
    }
  },
  inverse: () => {
    {
      return inverse;
    }
  },
  hermite: () => {
    {
      return hermite;
    }
  },
  fromValues: () => {
    {
      return fromValues2;
    }
  },
  forEach: () => {
    {
      return forEach;
    }
  },
  floor: () => {
    {
      return floor;
    }
  },
  exactEquals: () => {
    {
      return exactEquals2;
    }
  },
  equals: () => {
    {
      return equals2;
    }
  },
  dot: () => {
    {
      return dot;
    }
  },
  divide: () => {
    {
      return divide;
    }
  },
  div: () => {
    {
      return div;
    }
  },
  distance: () => {
    {
      return distance;
    }
  },
  dist: () => {
    {
      return dist;
    }
  },
  cross: () => {
    {
      return cross;
    }
  },
  create: () => {
    {
      return create2;
    }
  },
  copy: () => {
    {
      return copy2;
    }
  },
  clone: () => {
    {
      return clone2;
    }
  },
  ceil: () => {
    {
      return ceil;
    }
  },
  bezier: () => {
    {
      return bezier;
    }
  },
  angle: () => {
    {
      return angle;
    }
  },
  add: () => {
    {
      return add2;
    }
  }
});
function create2() {
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
  return Math.hypot(x, y, z);
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
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
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
function random(out, scale3) {
  scale3 = scale3 || 1;
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
  var vec = create2();
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
  zero: () => {
    {
      return zero2;
    }
  },
  transformQuat: () => {
    {
      return transformQuat2;
    }
  },
  transformMat4: () => {
    {
      return transformMat42;
    }
  },
  subtract: () => {
    {
      return subtract3;
    }
  },
  sub: () => {
    {
      return sub3;
    }
  },
  str: () => {
    {
      return str3;
    }
  },
  squaredLength: () => {
    {
      return squaredLength2;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance2;
    }
  },
  sqrLen: () => {
    {
      return sqrLen2;
    }
  },
  sqrDist: () => {
    {
      return sqrDist2;
    }
  },
  set: () => {
    {
      return set3;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd2;
    }
  },
  scale: () => {
    {
      return scale3;
    }
  },
  round: () => {
    {
      return round2;
    }
  },
  random: () => {
    {
      return random2;
    }
  },
  normalize: () => {
    {
      return normalize2;
    }
  },
  negate: () => {
    {
      return negate2;
    }
  },
  multiply: () => {
    {
      return multiply3;
    }
  },
  mul: () => {
    {
      return mul3;
    }
  },
  min: () => {
    {
      return min2;
    }
  },
  max: () => {
    {
      return max2;
    }
  },
  lerp: () => {
    {
      return lerp2;
    }
  },
  length: () => {
    {
      return length2;
    }
  },
  len: () => {
    {
      return len2;
    }
  },
  inverse: () => {
    {
      return inverse2;
    }
  },
  fromValues: () => {
    {
      return fromValues3;
    }
  },
  forEach: () => {
    {
      return forEach2;
    }
  },
  floor: () => {
    {
      return floor2;
    }
  },
  exactEquals: () => {
    {
      return exactEquals3;
    }
  },
  equals: () => {
    {
      return equals3;
    }
  },
  dot: () => {
    {
      return dot2;
    }
  },
  divide: () => {
    {
      return divide2;
    }
  },
  div: () => {
    {
      return div2;
    }
  },
  distance: () => {
    {
      return distance2;
    }
  },
  dist: () => {
    {
      return dist2;
    }
  },
  cross: () => {
    {
      return cross2;
    }
  },
  create: () => {
    {
      return create3;
    }
  },
  copy: () => {
    {
      return copy3;
    }
  },
  clone: () => {
    {
      return clone3;
    }
  },
  ceil: () => {
    {
      return ceil2;
    }
  },
  add: () => {
    {
      return add3;
    }
  }
});
function create3() {
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
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
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
function random2(out, scale4) {
  scale4 = scale4 || 1;
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
  var vec = create3();
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

// node_modules/gl-matrix/esm/vec2.js
var exports_vec2 = {};
__export(exports_vec2, {
  zero: () => {
    {
      return zero3;
    }
  },
  transformMat4: () => {
    {
      return transformMat43;
    }
  },
  transformMat3: () => {
    {
      return transformMat32;
    }
  },
  transformMat2d: () => {
    {
      return transformMat2d;
    }
  },
  transformMat2: () => {
    {
      return transformMat2;
    }
  },
  subtract: () => {
    {
      return subtract4;
    }
  },
  sub: () => {
    {
      return sub4;
    }
  },
  str: () => {
    {
      return str4;
    }
  },
  squaredLength: () => {
    {
      return squaredLength3;
    }
  },
  squaredDistance: () => {
    {
      return squaredDistance3;
    }
  },
  sqrLen: () => {
    {
      return sqrLen3;
    }
  },
  sqrDist: () => {
    {
      return sqrDist3;
    }
  },
  set: () => {
    {
      return set4;
    }
  },
  scaleAndAdd: () => {
    {
      return scaleAndAdd3;
    }
  },
  scale: () => {
    {
      return scale4;
    }
  },
  round: () => {
    {
      return round3;
    }
  },
  rotate: () => {
    {
      return rotate2;
    }
  },
  random: () => {
    {
      return random3;
    }
  },
  normalize: () => {
    {
      return normalize3;
    }
  },
  negate: () => {
    {
      return negate3;
    }
  },
  multiply: () => {
    {
      return multiply4;
    }
  },
  mul: () => {
    {
      return mul4;
    }
  },
  min: () => {
    {
      return min3;
    }
  },
  max: () => {
    {
      return max3;
    }
  },
  lerp: () => {
    {
      return lerp3;
    }
  },
  length: () => {
    {
      return length3;
    }
  },
  len: () => {
    {
      return len3;
    }
  },
  inverse: () => {
    {
      return inverse3;
    }
  },
  fromValues: () => {
    {
      return fromValues4;
    }
  },
  forEach: () => {
    {
      return forEach3;
    }
  },
  floor: () => {
    {
      return floor3;
    }
  },
  exactEquals: () => {
    {
      return exactEquals4;
    }
  },
  equals: () => {
    {
      return equals4;
    }
  },
  dot: () => {
    {
      return dot3;
    }
  },
  divide: () => {
    {
      return divide3;
    }
  },
  div: () => {
    {
      return div3;
    }
  },
  distance: () => {
    {
      return distance3;
    }
  },
  dist: () => {
    {
      return dist3;
    }
  },
  cross: () => {
    {
      return cross3;
    }
  },
  create: () => {
    {
      return create4;
    }
  },
  copy: () => {
    {
      return copy4;
    }
  },
  clone: () => {
    {
      return clone4;
    }
  },
  ceil: () => {
    {
      return ceil3;
    }
  },
  angle: () => {
    {
      return angle2;
    }
  },
  add: () => {
    {
      return add4;
    }
  }
});
function create4() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone4(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues4(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set4(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply4(out, a, b) {
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
function scale4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale5) {
  out[0] = a[0] + b[0] * scale5;
  out[1] = a[1] + b[1] * scale5;
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
function length3(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength3(a) {
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
function normalize3(out, a) {
  var x = a[0], y = a[1];
  var len3 = x * x + y * y;
  if (len3 > 0) {
    len3 = 1 / Math.sqrt(len3);
  }
  out[0] = a[0] * len3;
  out[1] = a[1] * len3;
  return out;
}
function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp3(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random3(out, scale5) {
  scale5 = scale5 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale5;
  out[1] = Math.sin(r) * scale5;
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
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str4(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals4(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals4(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len3 = length3;
var sub4 = subtract4;
var mul4 = multiply4;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen3 = squaredLength3;
var forEach3 = function() {
  var vec = create4();
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
  lerp: () => {
    {
      return lerp4;
    }
  },
  degreeToRad: () => {
    {
      return degreeToRad;
    }
  },
  collisions: () => {
    {
      return exports_collisions;
    }
  },
  clamp: () => {
    {
      return clamp;
    }
  }
});

// src/local-framework/system/math/clamp.ts
var clamp = (currVal, minVal, maxVal) => Math.min(Math.max(currVal, minVal), maxVal);
// src/local-framework/system/math/collisions.ts
var exports_collisions = {};
__export(exports_collisions, {
  intersectSegment: () => {
    {
      return intersectSegment;
    }
  },
  collisionLinesStrip: () => {
    {
      return collisionLinesStrip;
    }
  }
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
// src/local-framework/system/math/lerp.ts
var lerp4 = (ratio, minVal, maxVal) => minVal + (maxVal - minVal) * ratio;
// src/local-framework/system/metrics/index.ts
var exports_metrics = {};
__export(exports_metrics, {
  FrameProfiler: () => {
    {
      return FrameProfiler;
    }
  }
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
  AsyncHelpers: () => {
    {
      return AsyncHelpers;
    }
  }
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
  webgl2: () => {
    {
      return exports_webgl2;
    }
  },
  renderers: () => {
    {
      return exports_renderers;
    }
  },
  images: () => {
    {
      return exports_images;
    }
  },
  geometries: () => {
    {
      return exports_geometries;
    }
  },
  camera: () => {
    {
      return exports_camera;
    }
  }
});

// src/local-framework/graphics/camera/index.ts
var exports_camera = {};
__export(exports_camera, {
  FrustumCulling: () => {
    {
      return FrustumCulling;
    }
  },
  Camera: () => {
    {
      return Camera;
    }
  }
});

// src/local-framework/graphics/camera/Camera.ts
var ProjectionType;
(function(ProjectionType2) {
  ProjectionType2[ProjectionType2["perspective"] = 0] = "perspective";
  ProjectionType2[ProjectionType2["orthogonal"] = 1] = "orthogonal";
})(ProjectionType || (ProjectionType = {}));

class Camera {
  _projectionType = ProjectionType.perspective;
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
    this._projectionType = ProjectionType.perspective;
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
    this._projectionType = ProjectionType.orthogonal;
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
    if (this._projectionType !== ProjectionType.perspective && this._perspectiveData) {
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
    if (this._projectionType === ProjectionType.perspective) {
      const { fovy, aspectRatio, near, far } = this._perspectiveData;
      exports_mat4.perspective(this._projectionMatrix, degreeToRad(fovy), aspectRatio, near, far);
    } else if (this._projectionType === ProjectionType.orthogonal) {
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
    if (this._projectionType !== ProjectionType.perspective) {
      throw new Error("not a perspective projection");
    }
    return this._perspectiveData;
  }
  getOrthogonalData() {
    if (this._projectionType !== ProjectionType.orthogonal) {
      throw new Error("not an orthogonal projection");
    }
    return this._orthogonalData;
  }
}
// src/local-framework/graphics/camera/FrustumCulling.ts
var FrustumSide;
(function(FrustumSide2) {
  FrustumSide2[FrustumSide2["Right"] = 0] = "Right";
  FrustumSide2[FrustumSide2["Left"] = 1] = "Left";
  FrustumSide2[FrustumSide2["Bottom"] = 2] = "Bottom";
  FrustumSide2[FrustumSide2["Top"] = 3] = "Top";
  FrustumSide2[FrustumSide2["Back"] = 4] = "Back";
  FrustumSide2[FrustumSide2["Front"] = 5] = "Front";
})(FrustumSide || (FrustumSide = {}));

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
    this._setPlane(FrustumSide.Right, row3, row0, -1);
    this._setPlane(FrustumSide.Left, row3, row0, 1);
    this._setPlane(FrustumSide.Bottom, row3, row1, 1);
    this._setPlane(FrustumSide.Top, row3, row1, -1);
    this._setPlane(FrustumSide.Back, row3, row2, -1);
    this._setPlane(FrustumSide.Front, row3, row2, 1);
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
// src/local-framework/graphics/renderers/index.ts
var exports_renderers = {};
__export(exports_renderers, {
  widgets: () => {
    {
      return exports_widgets;
    }
  },
  TextRenderer: () => {
    {
      return TextRenderer;
    }
  },
  StackRenderers: () => {
    {
      return StackRenderers;
    }
  },
  GeometryRenderer: () => {
    {
      return GeometryRenderer;
    }
  }
});

// src/local-framework/graphics/webgl2/index.ts
var exports_webgl2 = {};
__export(exports_webgl2, {
  getCubeMapType: () => {
    {
      return getCubeMapType;
    }
  },
  checkError: () => {
    {
      return checkError;
    }
  },
  WebGLContext: () => {
    {
      return WebGLContext;
    }
  },
  TextureRepeat: () => {
    {
      return TextureRepeat;
    }
  },
  TextureFilter: () => {
    {
      return TextureFilter;
    }
  },
  TextureArray: () => {
    {
      return TextureArray;
    }
  },
  Texture: () => {
    {
      return Texture;
    }
  },
  ShaderProgram: () => {
    {
      return ShaderProgram;
    }
  },
  GeometryWrapper: () => {
    {
      return exports_GeometryWrapper;
    }
  },
  FrameBuffer: () => {
    {
      return FrameBuffer;
    }
  },
  FenceSync: () => {
    {
      return FenceSync;
    }
  },
  DataTexture: () => {
    {
      return DataTexture;
    }
  },
  CubeMapType: () => {
    {
      return CubeMapType;
    }
  },
  CubeMap: () => {
    {
      return CubeMap;
    }
  }
});

// src/local-framework/graphics/webgl2/WebGLContext.ts
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
(function(CubeMapType2) {
  CubeMapType2[CubeMapType2["positiveX"] = 0] = "positiveX";
  CubeMapType2[CubeMapType2["negativeX"] = 1] = "negativeX";
  CubeMapType2[CubeMapType2["positiveY"] = 2] = "positiveY";
  CubeMapType2[CubeMapType2["negativeY"] = 3] = "negativeY";
  CubeMapType2[CubeMapType2["positiveZ"] = 4] = "positiveZ";
  CubeMapType2[CubeMapType2["negativeZ"] = 5] = "negativeZ";
})(CubeMapType || (CubeMapType = {}));
var getCubeMapType = (inType) => {
  const gl = WebGLContext.getContext();
  switch (inType) {
    case CubeMapType.positiveX:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
    case CubeMapType.negativeX:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
    case CubeMapType.positiveY:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
    case CubeMapType.negativeY:
      return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
    case CubeMapType.positiveZ:
      return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
    case CubeMapType.negativeZ:
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
      CubeMapType.negativeX,
      CubeMapType.negativeY,
      CubeMapType.negativeZ,
      CubeMapType.positiveX,
      CubeMapType.positiveY,
      CubeMapType.positiveZ
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
      throw new Error("gl.INVALID_ENUM\nAn unacceptable value is specified for an enumerated argument. The offending command is ignored and has no other side effect than to set the error flag.");
    case gl.INVALID_VALUE:
      throw new Error("gl.INVALID_VALUE\nA numeric argument is out of range. The offending command is ignored and has no other side effect than to set the error flag.");
    case gl.INVALID_OPERATION:
      throw new Error("gl.INVALID_OPERATION\nThe specified operation is not allowed in the current state. The offending command is ignored and has no other side effect than to set the error flag.");
    case gl.INVALID_FRAMEBUFFER_OPERATION:
      throw new Error("gl.INVALID_FRAMEBUFFER_OPERATION\nThe framebuffer object is not complete. The offending command is ignored and has no other side effect than to set the error flag.");
    case gl.OUT_OF_MEMORY:
      throw new Error("gl.OUT_OF_MEMORY\nThere is not enough memory left to execute the command. The state of the GL is undefined, except for the state of the error flags, after this error is recorded.");
    case gl.CONTEXT_LOST_WEBGL:
      throw new Error("gl.CONTEXT_LOST_WEBGL\n If the WebGL context is lost, this error is returned on the first call to getError. Afterwards and until the context has been restored, it returns gl.NO_ERROR.");
  }
};
// src/local-framework/graphics/webgl2/Fence.ts
class FenceSync {
  _sync;
  constructor() {
  }
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
  PrimitiveType: () => {
    {
      return PrimitiveType;
    }
  },
  GeometryBuilder: () => {
    {
      return GeometryBuilder;
    }
  },
  Geometry: () => {
    {
      return Geometry;
    }
  },
  BytesPerPixel: () => {
    {
      return BytesPerPixel;
    }
  },
  AttributeType: () => {
    {
      return AttributeType;
    }
  }
});
var BytesPerPixel = 4;
var AttributeType;
(function(AttributeType2) {
  AttributeType2[AttributeType2["float"] = 0] = "float";
  AttributeType2[AttributeType2["vec2f"] = 1] = "vec2f";
  AttributeType2[AttributeType2["vec3f"] = 2] = "vec3f";
  AttributeType2[AttributeType2["vec4f"] = 3] = "vec4f";
  AttributeType2[AttributeType2["mat3f"] = 4] = "mat3f";
  AttributeType2[AttributeType2["mat4f"] = 5] = "mat4f";
})(AttributeType || (AttributeType = {}));
var getAttrTypeSize = (inType) => {
  switch (inType) {
    case AttributeType.float:
      return 1;
    case AttributeType.vec2f:
      return 2;
    case AttributeType.vec3f:
      return 3;
    case AttributeType.vec4f:
      return 4;
    case AttributeType.mat3f:
      return 9;
    case AttributeType.mat4f:
      return 16;
  }
};
var PrimitiveType;
(function(PrimitiveType2) {
  PrimitiveType2[PrimitiveType2["lines"] = 0] = "lines";
  PrimitiveType2[PrimitiveType2["triangles"] = 1] = "triangles";
  PrimitiveType2[PrimitiveType2["triangleStrip"] = 2] = "triangleStrip";
})(PrimitiveType || (PrimitiveType = {}));
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
      case PrimitiveType.lines:
        this._primitiveType = gl.LINES;
        break;
      case PrimitiveType.triangles:
        this._primitiveType = gl.TRIANGLES;
        break;
      case PrimitiveType.triangleStrip:
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
            case AttributeType.float:
              stride += 1;
              break;
            case AttributeType.vec2f:
              stride += 2;
              break;
            case AttributeType.vec3f:
              stride += 3;
              break;
            case AttributeType.vec4f:
              stride += 4;
              break;
            case AttributeType.mat3f:
              stride += 9;
              break;
            case AttributeType.mat4f:
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
          case AttributeType.float:
            rowSize = 1;
            totalRows = 1;
            break;
          case AttributeType.vec2f:
            rowSize = 2;
            totalRows = 1;
            break;
          case AttributeType.vec3f:
            rowSize = 3;
            totalRows = 1;
            break;
          case AttributeType.vec4f:
            rowSize = 4;
            totalRows = 1;
            break;
          case AttributeType.mat3f:
            rowSize = 3;
            totalRows = 3;
            break;
          case AttributeType.mat4f:
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
    primitiveType: PrimitiveType.lines
  };
  reset() {
    this._def = {
      vbos: [],
      primitiveType: PrimitiveType.lines
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
(function(TextureFilter2) {
  TextureFilter2[TextureFilter2["pixelated"] = 0] = "pixelated";
  TextureFilter2[TextureFilter2["linear"] = 1] = "linear";
  TextureFilter2[TextureFilter2["mipmap"] = 2] = "mipmap";
})(TextureFilter || (TextureFilter = {}));
var TextureRepeat;
(function(TextureRepeat2) {
  TextureRepeat2[TextureRepeat2["noRepeat"] = 0] = "noRepeat";
  TextureRepeat2[TextureRepeat2["repeat"] = 1] = "repeat";
})(TextureRepeat || (TextureRepeat = {}));

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
  load(inImage, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inImage.width, inImage.height, inImage, mode, repeat);
  }
  loadFromMemory(inWidth, inHeight, inPixels, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, inPixels, mode, repeat);
  }
  allocate(inWidth, inHeight, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, null, mode, repeat);
  }
  allocateDepth(inWidth, inHeight, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, null, mode, repeat, true);
  }
  resize(inWidth, inHeight, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, null, mode, repeat);
  }
  _allocate(inWidth, inHeight, inPixels = null, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat, isDepthTexture = false) {
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
    if (repeat === TextureRepeat.noRepeat) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else if (repeat === TextureRepeat.repeat) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    if (mode === TextureFilter.pixelated) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else if (mode === TextureFilter.linear) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    } else if (mode === TextureFilter.mipmap) {
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
  loadFromImage(inWidth, inHeight, inTotalLayers, inImage, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, inTotalLayers, inImage, mode, repeat);
  }
  loadFromMemory(inWidth, inHeight, inTotalLayers, inPixels, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
    this._allocate(inWidth, inHeight, inTotalLayers, inPixels, mode, repeat);
  }
  _allocate(inWidth, inHeight, inTotalLayers, inPixels = null, mode = TextureFilter.pixelated, repeat = TextureRepeat.noRepeat) {
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
    if (repeat === TextureRepeat.noRepeat) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else if (repeat === TextureRepeat.repeat) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    if (mode === TextureFilter.pixelated) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else if (mode === TextureFilter.linear) {
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    } else if (mode === TextureFilter.mipmap) {
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
var k_bufferSize = 14336;

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
var k_bufferSize2 = 14336;

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
    if (this._currentSize + 14 >= this._buffer.length) {
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
var k_bufferSize3 = 1048576;

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
  pushTriangle(inPointA, inPointB, inPointC, inColor) {
    if (this._currentSize + 42 >= this._buffer.length) {
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
    if (this._currentSize + 42 >= this._buffer.length) {
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
  pushRotatedLine(center, angle3, length4, thickness, color) {
    this.pushLine([
      center[0] - length4 * Math.cos(angle3),
      center[1] - length4 * Math.sin(angle3),
      center[2]
    ], [
      center[0] + length4 * Math.cos(angle3),
      center[1] + length4 * Math.sin(angle3),
      center[2]
    ], thickness, color);
  }
  pushOriginBoundRectangle(inOrigin, inSize, inColor) {
    if (this._currentSize + 42 >= this._buffer.length) {
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
  pushRotatedLine(center, angle3, length4, thickness, color) {
    this._trianglesStackRenderer.pushRotatedLine(center, angle3, length4, thickness, color);
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
var k_bufferSize4 = 36864;

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
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec2f").addVboAttribute("a_vertex_texCoord", "vec2f").setStride(16).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position", "vec3f").addVboAttribute("a_offset_texCoord", "vec2f").addVboAttribute("a_offset_color", "vec3f").addVboAttribute("a_offset_scale", "float").setStride(36);
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
    if (this._currentSize + 90 >= this._buffer.length) {
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
  renderFpsMeter: () => {
    {
      return renderFpsMeter;
    }
  },
  addKeysTouchesWidgets: () => {
    {
      return addKeysTouchesWidgets;
    }
  },
  addKeyStrokesWidgets: () => {
    {
      return addKeyStrokesWidgets;
    }
  },
  addArrowStrokesWidgets: () => {
    {
      return addArrowStrokesWidgets;
    }
  }
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
    text: "A\nQ",
    color: GlobalKeyboardManager.isPressed("A", "Q") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1]],
    size: [40, 40],
    text: "S",
    color: GlobalKeyboardManager.isPressed("S") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 45, inPos[1] + 45],
    size: [40, 40],
    text: "W\nZ",
    color: GlobalKeyboardManager.isPressed("W", "Z") ? activatedColor : defaultColor
  }, stackRenderers, textRenderer);
  _renderIndicator({
    center: [inPos[0] + 90, inPos[1]],
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
    center: [inPos[0] + 90, inPos[1]],
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
  if (GlobalPointerLockManager.canBePointerLocked(inCanvasElement)) {
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
// src/local-framework/graphics/images/index.ts
var exports_images = {};
__export(exports_images, {
  getImageFromUrl: () => {
    {
      return getImageFromUrl;
    }
  },
  getImageFromBuffer: () => {
    {
      return getImageFromBuffer;
    }
  },
  fetchImageBuffer: () => {
    {
      return fetchImageBuffer;
    }
  }
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
  makeSphere: () => {
    {
      return makeSphere;
    }
  },
  makeBox: () => {
    {
      return makeBox;
    }
  }
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
// src/main/experiment/graphics/utils/generateSphereVertices.ts
var _drawSpherePatch2 = (vertices, quality, radius, v01, v02, v03) => {
  if (quality <= 0) {
    vertices.push({
      position: exports_vec3.scale(exports_vec3.create(), v01, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v01)
    });
    vertices.push({
      position: exports_vec3.scale(exports_vec3.create(), v03, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v03)
    });
    vertices.push({
      position: exports_vec3.scale(exports_vec3.create(), v02, radius),
      normal: exports_vec3.copy(exports_vec3.create(), v02)
    });
  } else {
    const v12 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v01, v02, 0.5));
    const v23 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v02, v03, 0.5));
    const v31 = exports_vec3.normalize(exports_vec3.create(), exports_vec3.lerp(exports_vec3.create(), v03, v01, 0.5));
    quality -= 1;
    _drawSpherePatch2(vertices, quality, radius, v01, v12, v31);
    _drawSpherePatch2(vertices, quality, radius, v12, v02, v23);
    _drawSpherePatch2(vertices, quality, radius, v31, v23, v03);
    _drawSpherePatch2(vertices, quality, radius, v12, v23, v31);
  }
};
var generateSphereVertices = (quality, radius) => {
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
    _drawSpherePatch2(vertices, quality, radius, tmpVertices[index[0]], tmpVertices[index[1]], tmpVertices[index[2]]);
  }
  return vertices;
};

// src/main/experiment/graphics/renderers/scene/wire-frame-cubes-renderer/shaders/wire-frame-cubes-renderer.glsl.vert
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

// src/main/experiment/graphics/renderers/scene/wire-frame-cubes-renderer/shaders/wire-frame-cubes-renderer.glsl.frag
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

// src/main/experiment/graphics/renderers/scene/wire-frame-cubes-renderer/WireFrameCubesRenderer.ts
var k_bufferSize5 = 21504;
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
  _buffer = new Float32Array(k_bufferSize5);
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
    this._geometry.allocateBuffer(0, vertices, vertices.length);
    this._geometry.setPrimitiveCount(vertices.length / 3);
  }
  pushCenteredCube(inCenter, inScale, inColor) {
    if (this._currentSize + 7 >= k_bufferSize5) {
      return;
    }
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
    if (this._currentSize + 7 >= k_bufferSize5) {
      return;
    }
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
      if (this._currentSize > 0) {
        this._geometry.allocateBuffer(1, this._buffer, this._currentSize);
      }
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
  _wireFrameCubesRenderer;
  _stackRenderers;
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
    this._wireFrameCubesRenderer = new WireFrameCubesRenderer;
    this._stackRenderers = new exports_graphics.renderers.StackRenderers;
    this._geometryStackRenderer = new exports_graphics.renderers.GeometryRenderer;
    const geoVertices = exports_graphics.geometries.makeBox([1, 1, 1]);
    this._geometryStackRenderer.setGeometryVertices(geoVertices);
    const allVertices = [];
    {
      const vertices = generateSphereVertices(3, 60);
      const allPosMap = new Map;
      vertices.forEach((vertex) => {
        allPosMap.set(vertex.position, vertex);
      });
      allVertices.push(...[...allPosMap.values()]);
    }
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
    this._viewportSize[0] = width;
    this._viewportSize[1] = height;
    this._mainCamera.setViewportSize(width, height);
    this._mainCamera.setAsPerspective({ fovy: 70, near: 1, far: 300 });
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
    this._geometryStackRenderer.flush(this._mainCamera);
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
  get geometryStackRenderer() {
    return this._geometryStackRenderer;
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

// src/main/experiment/logic/helpers/DeterministicRng.ts
var RAND_MAX = 2147483648 | 0;

class DeterministicRng {
  _seed = 1 | 0;
  random() {
    if (this._seed == 0) {
      this._seed = 123459876 | 0;
    }
    const hi = this._seed / 127773 | 0;
    const lo = this._seed % 127773 | 0;
    let x = 16807 * lo - 2836 * hi | 0;
    if (x < 0) {
      x += 2147483647 | 0;
    }
    this._seed = x;
    return x % (RAND_MAX + 1) / -RAND_MAX;
  }
  setSeed(inSeed) {
    this._seed = inSeed | 0;
  }
}

// src/main/experiment/logic/helpers/ClassicalNoise.ts
var k_grad3 = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1]
];

class ClassicalNoise {
  _octaves = 1;
  _frequency = 1;
  _amplitude = 0.5;
  _perm;
  constructor(def) {
    this._octaves = def.octaves || 1;
    this._frequency = def.frequency || 1;
    this._amplitude = def.amplitude || 0.5;
    const randomCallback = def.randomCallback || (() => Math.random());
    const k_sampleSize = 256;
    const k_sampleDoubleSize = k_sampleSize * 2;
    const initialP = new Uint8Array(k_sampleSize);
    for (let ii = 0;ii < k_sampleSize; ++ii)
      initialP[ii] = Math.floor(randomCallback() * k_sampleSize) | 0;
    this._perm = new Uint8Array(k_sampleDoubleSize);
    for (let ii = 0;ii < k_sampleDoubleSize; ++ii)
      this._perm[ii] = initialP[ii & k_sampleSize - 1] | 0;
  }
  getNoise(inX, inY, inZ) {
    let result = 0;
    let amp = this._amplitude;
    let x = inX * this._frequency;
    let y = inY * this._frequency;
    let z = inZ * this._frequency;
    for (let ii = 0;ii < this._octaves; ++ii) {
      result += this._noise(x, y, z) * amp;
      x *= 2;
      y *= 2;
      z *= 2;
      amp *= 0.5;
    }
    return result;
  }
  _dot(i, x, y, z) {
    const g = k_grad3[i];
    return g[0] * x + g[1] * y + g[2] * z;
  }
  _mix(a, b, t) {
    return (1 - t) * a + t * b;
  }
  _fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  _noise(x, y, z) {
    let X = Math.floor(x) | 0;
    let Y = Math.floor(y) | 0;
    let Z = Math.floor(z) | 0;
    x = x - X;
    y = y - Y;
    z = z - Z;
    X = X & 255 | 0;
    Y = Y & 255 | 0;
    Z = Z & 255 | 0;
    const gi000 = this._perm[X + this._perm[Y + this._perm[Z]]] % 12 | 0;
    const gi001 = this._perm[X + this._perm[Y + this._perm[Z + 1]]] % 12 | 0;
    const gi010 = this._perm[X + this._perm[Y + 1 + this._perm[Z]]] % 12 | 0;
    const gi011 = this._perm[X + this._perm[Y + 1 + this._perm[Z + 1]]] % 12 | 0;
    const gi100 = this._perm[X + 1 + this._perm[Y + this._perm[Z]]] % 12 | 0;
    const gi101 = this._perm[X + 1 + this._perm[Y + this._perm[Z + 1]]] % 12 | 0;
    const gi110 = this._perm[X + 1 + this._perm[Y + 1 + this._perm[Z]]] % 12 | 0;
    const gi111 = this._perm[X + 1 + this._perm[Y + 1 + this._perm[Z + 1]]] % 12 | 0;
    const n000 = this._dot(gi000, x, y, z);
    const n100 = this._dot(gi100, x - 1, y, z);
    const n010 = this._dot(gi010, x, y - 1, z);
    const n110 = this._dot(gi110, x - 1, y - 1, z);
    const n001 = this._dot(gi001, x, y, z - 1);
    const n101 = this._dot(gi101, x - 1, y, z - 1);
    const n011 = this._dot(gi011, x, y - 1, z - 1);
    const n111 = this._dot(gi111, x - 1, y - 1, z - 1);
    const u = this._fade(x);
    const v = this._fade(y);
    const w = this._fade(z);
    const nx00 = this._mix(n000, n100, u);
    const nx01 = this._mix(n001, n101, u);
    const nx10 = this._mix(n010, n110, u);
    const nx11 = this._mix(n011, n111, u);
    const nxy0 = this._mix(nx00, nx10, v);
    const nxy1 = this._mix(nx01, nx11, v);
    const nxyz = this._mix(nxy0, nxy1, w);
    return nxyz;
  }
}

// src/main/experiment/logic/GameMap.ts
class GridBuffer {
  _width = 0;
  _height = 0;
  _rawData = null;
  constructor() {
  }
  allocate(width, height) {
    this._width = width | 0;
    this._height = height | 0;
    this._rawData = new Uint8Array(this._width * this._height);
    this._rawData.fill(0);
  }
  isAllocated() {
    return this._rawData !== null;
  }
  contains(x, y) {
    return !((x | 0) < 0 || (x | 0) >= this._width || (y | 0) < 0 || (y | 0) >= this._height);
  }
  getWidth() {
    return this._width;
  }
  getHeight() {
    return this._height;
  }
  getData(x, y, defaultValue = 0) {
    if (!this.isAllocated() || !this.contains(x, y)) {
      return defaultValue;
    }
    return this._rawData[y * this._width + x];
  }
  setData(x, y, value) {
    if (!this.isAllocated() || !this.contains(x, y)) {
      return;
    }
    this._rawData[(y | 0) * this._width + (x | 0)] = value;
  }
}

class GameMap {
  _config = {
    mapSizeInBlocks: [12, 12],
    tileSize: 1,
    noise: {
      rngSeed: 1,
      resolution: [10, 10],
      octaves: 1,
      frequency: 1,
      amplitude: 0.5
    },
    buildingSize: 9,
    roadSize: 5,
    pavementSize: 2,
    blueMaxVal: 50,
    greenMaxVal: 58
  };
  _gridBuffer = new GridBuffer;
  _buildingProps = [];
  constructor() {
    this._gridBuffer.allocate(10, 10);
  }
  generateCity(inTilesRenderer) {
    const noiseBuffer = new GridBuffer;
    noiseBuffer.allocate(12, 12);
    {
      const tmpRng = new DeterministicRng;
      tmpRng.setSeed(1);
      const noiseInstance = new ClassicalNoise({
        randomCallback: () => tmpRng.random(),
        octaves: 1,
        frequency: 1,
        amplitude: 0.5
      });
      const resolutionX = 10;
      const resolutionY = 10;
      for (let yy = 0;yy < noiseBuffer.getHeight(); ++yy)
        for (let xx = 0;xx < noiseBuffer.getWidth(); ++xx) {
          const coefY = yy / noiseBuffer.getHeight() * resolutionX;
          const coefX = xx / noiseBuffer.getWidth() * resolutionY;
          const rawNoiseVal = noiseInstance.getNoise(coefX, coefY, 0);
          const noiseVal = (rawNoiseVal + 1) * 0.5;
          noiseBuffer.setData(xx, yy, Math.floor(noiseVal * 100));
        }
    }
    const buildingSize = 9;
    const roadSize = 5;
    const pavementSize = 2;
    const blockSize = buildingSize + pavementSize * 2 + roadSize;
    const resX = blockSize;
    const resY = blockSize;
    this._gridBuffer.allocate(noiseBuffer.getWidth() * resX + roadSize, noiseBuffer.getHeight() * resY + 1);
    const blueMaxVal = 50;
    const greenMaxVal = 58;
    {
      this._makeRect([0, 0], [this._gridBuffer.getWidth(), this._gridBuffer.getHeight()], 2);
    }
    {
      for (let yy = 0;yy < noiseBuffer.getHeight(); ++yy)
        for (let xx = 0;xx < noiseBuffer.getWidth(); ++xx) {
          const pos = [
            xx * blockSize + roadSize,
            yy * blockSize + roadSize
          ];
          this._makeRect(pos, [buildingSize + pavementSize * 2, buildingSize + pavementSize * 2], 3);
        }
    }
    {
      for (let yy = 0;yy < noiseBuffer.getHeight(); ++yy)
        for (let xx = 0;xx < noiseBuffer.getWidth(); ++xx) {
          const noiseVal = noiseBuffer.getData(xx, yy);
          const pos = [
            xx * blockSize + roadSize + pavementSize,
            yy * blockSize + roadSize + pavementSize
          ];
          const size = [
            buildingSize,
            buildingSize
          ];
          if (noiseVal >= blueMaxVal && noiseVal <= greenMaxVal) {
            this._makeRect(pos, size, 5);
            continue;
          }
          if (noiseVal > greenMaxVal) {
            this._buildingProps.push({
              posX: pos[0] + size[0] * 0.5,
              posY: pos[1] + size[1] * 0.5,
              sizeX: size[0],
              sizeY: size[1],
              height: buildingSize * 3,
              type: 1,
              noiseVal
            });
            continue;
          }
          const tmpRng = new DeterministicRng;
          tmpRng.setSeed(Math.floor(noiseVal * 100));
          const startX = Math.round(tmpRng.random() * 1);
          const startY = Math.round(tmpRng.random() * 1);
          const stopX = Math.round(tmpRng.random() * 1);
          const stopY = Math.round(tmpRng.random() * 1);
          const extraHeight = Math.round(tmpRng.random() * 10);
          pos[0] += startX;
          size[0] -= startX;
          size[0] -= stopX;
          pos[1] += startY;
          size[1] -= startY;
          size[1] -= stopY;
          if (noiseVal < blueMaxVal) {
            this._buildingProps.push({
              posX: pos[0] + size[0] * 0.5,
              posY: pos[1] + size[1] * 0.5,
              sizeX: size[0],
              sizeY: size[1],
              height: buildingSize * 1 + extraHeight,
              type: 0,
              noiseVal
            });
          }
        }
    }
    {
      const tmpRng = new DeterministicRng;
      tmpRng.setSeed(1);
      const allCoords = [];
      for (let yy = 0;yy < noiseBuffer.getHeight(); ++yy)
        for (let xx = 0;xx < noiseBuffer.getWidth(); ++xx) {
          const noiseVal = noiseBuffer.getData(xx, yy);
          if (noiseVal < blueMaxVal || noiseVal > greenMaxVal) {
            continue;
          }
          let horizontal = false;
          let vertical = false;
          let diagonal = false;
          if (xx > 0) {
            const tmpNoiseVal = noiseBuffer.getData(xx - 1, yy);
            if (tmpNoiseVal >= blueMaxVal && tmpNoiseVal <= greenMaxVal) {
              horizontal = true;
            }
          }
          if (yy > 0) {
            const tmpNoiseVal = noiseBuffer.getData(xx, yy - 1);
            if (tmpNoiseVal >= blueMaxVal && tmpNoiseVal <= greenMaxVal) {
              vertical = true;
            }
          }
          if (horizontal && vertical) {
            const tmpNoiseVal = noiseBuffer.getData(xx - 1, yy - 1);
            if (tmpNoiseVal >= blueMaxVal && tmpNoiseVal <= greenMaxVal) {
              diagonal = true;
            }
          }
          if (diagonal) {
            allCoords.push([[xx, yy], [2, 2]]);
          } else {
            if (horizontal) {
              allCoords.push([[xx, yy], [2, 1]]);
            }
            if (vertical) {
              allCoords.push([[xx, yy], [1, 2]]);
            }
          }
        }
      for (const currCoord of allCoords) {
        const rawPos = currCoord[0];
        const rawSize = currCoord[1];
        const pos = [
          rawPos[0] * blockSize + roadSize,
          rawPos[1] * blockSize + roadSize
        ];
        const size = [buildingSize + pavementSize * 2, buildingSize + pavementSize * 2];
        if (rawSize[0] > 1) {
          pos[0] = (rawPos[0] - 1) * blockSize + roadSize;
          size[0] += blockSize;
        }
        if (rawSize[1] > 1) {
          pos[1] = (rawPos[1] - 1) * blockSize + roadSize;
          size[1] += blockSize;
        }
        this._makeRect(pos, size, 3);
      }
      for (const currCoord of allCoords) {
        const rawPos = currCoord[0];
        const rawSize = currCoord[1];
        const pos = [
          rawPos[0] * blockSize + roadSize + pavementSize,
          rawPos[1] * blockSize + roadSize + pavementSize
        ];
        const size = [buildingSize, buildingSize];
        if (rawSize[0] > 1) {
          pos[0] = (rawPos[0] - 1) * blockSize + roadSize + pavementSize;
          size[0] += blockSize;
        }
        if (rawSize[1] > 1) {
          pos[1] = (rawPos[1] - 1) * blockSize + roadSize + pavementSize;
          size[1] += blockSize;
        }
        this._makeRect(pos, size, 5);
      }
    }
    this._setupGeometry(inTilesRenderer);
  }
  _makeRect(pos, size, value) {
    for (let yy = pos[1];yy < pos[1] + size[1]; ++yy)
      for (let xx = pos[0];xx < pos[0] + size[0]; ++xx) {
        this._gridBuffer.setData(xx, yy, value);
      }
  }
  _setupGeometry(inTilesRenderer) {
    const cellsMatrixH = [0, 0, 0, 0, 0, 0, 0];
    const cellsMatrixV = [0, 0, 0, 0, 0, 0, 0];
    const _compareCell2Matrix = (rowH, rowV) => {
      if ((rowH[0] < 0 || rowH[0] === cellsMatrixH[0]) && (rowH[1] < 0 || rowH[1] === cellsMatrixH[1]) && (rowH[2] < 0 || rowH[2] === cellsMatrixH[2]) && (rowH[3] < 0 || rowH[3] === cellsMatrixH[3]) && (rowH[4] < 0 || rowH[4] === cellsMatrixH[4]) && (rowH[5] < 0 || rowH[5] === cellsMatrixH[5]) && (rowH[6] < 0 || rowH[6] === cellsMatrixH[6]) && (rowV[0] < 0 || rowV[0] === cellsMatrixV[0]) && (rowV[1] < 0 || rowV[1] === cellsMatrixV[1]) && (rowV[2] < 0 || rowV[2] === cellsMatrixV[2]) && (rowV[3] < 0 || rowV[3] === cellsMatrixV[3]) && (rowV[4] < 0 || rowV[4] === cellsMatrixV[4]) && (rowV[5] < 0 || rowV[5] === cellsMatrixV[5]) && (rowV[6] < 0 || rowV[6] === cellsMatrixV[6])) {
        return true;
      }
      return false;
    };
    const cellsMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _compareCellMatrix = (row0, row1, row2) => {
      if ((row0[0] < 0 || row0[0] === cellsMatrix[0]) && (row0[1] < 0 || row0[1] === cellsMatrix[1]) && (row0[2] < 0 || row0[2] === cellsMatrix[2]) && (row1[0] < 0 || row1[0] === cellsMatrix[3]) && (row1[1] < 0 || row1[1] === cellsMatrix[4]) && (row1[2] < 0 || row1[2] === cellsMatrix[5]) && (row2[0] < 0 || row2[0] === cellsMatrix[6]) && (row2[1] < 0 || row2[1] === cellsMatrix[7]) && (row2[2] < 0 || row2[2] === cellsMatrix[8])) {
        return true;
      }
      return false;
    };
    inTilesRenderer.clear();
    for (let yy = 0;yy < this._gridBuffer.getHeight(); ++yy)
      for (let xx = 0;xx < this._gridBuffer.getWidth(); ++xx) {
        const cellValue = this._gridBuffer.getData(xx, yy);
        const tmpScale = this._config.tileSize * 1;
        const tmpPos = [
          xx * this._config.tileSize + this._config.tileSize * 0.5,
          yy * this._config.tileSize + this._config.tileSize * 0.5
        ];
        if (cellValue === 0) {
          inTilesRenderer.pushInstance(tmpPos, [0, 0], tmpScale);
        } else if (cellValue === 1) {
          inTilesRenderer.pushInstance(tmpPos, [0.125, 0], tmpScale);
        } else if (cellValue === 2) {
          cellsMatrixH[0] = this._gridBuffer.getData(xx - 3, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[1] = this._gridBuffer.getData(xx - 2, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[2] = this._gridBuffer.getData(xx - 1, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[3] = this._gridBuffer.getData(xx + 0, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[4] = this._gridBuffer.getData(xx + 1, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[5] = this._gridBuffer.getData(xx + 2, yy, 2) == 2 ? 2 : 0;
          cellsMatrixH[6] = this._gridBuffer.getData(xx + 3, yy, 2) == 2 ? 2 : 0;
          cellsMatrixV[0] = this._gridBuffer.getData(xx, yy - 3, 2) == 2 ? 2 : 0;
          cellsMatrixV[1] = this._gridBuffer.getData(xx, yy - 2, 2) == 2 ? 2 : 0;
          cellsMatrixV[2] = this._gridBuffer.getData(xx, yy - 1, 2) == 2 ? 2 : 0;
          cellsMatrixV[3] = this._gridBuffer.getData(xx, yy + 0, 2) == 2 ? 2 : 0;
          cellsMatrixV[4] = this._gridBuffer.getData(xx, yy + 1, 2) == 2 ? 2 : 0;
          cellsMatrixV[5] = this._gridBuffer.getData(xx, yy + 2, 2) == 2 ? 2 : 0;
          cellsMatrixV[6] = this._gridBuffer.getData(xx, yy + 3, 2) == 2 ? 2 : 0;
          if (_compareCell2Matrix([0, 2, 2, 2, 2, 2, 0], [-1, 2, 2, 2, 2, 2, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.125, 0.125], tmpScale);
            this._gridBuffer.setData(xx, yy, 9);
          } else if (_compareCell2Matrix([-1, 2, 2, 2, 2, 2, -1], [0, 2, 2, 2, 2, 2, 0])) {
            inTilesRenderer.pushInstance(tmpPos, [0, 0.125], tmpScale);
            this._gridBuffer.setData(xx, yy, 9);
          } else {
            inTilesRenderer.pushInstance(tmpPos, [0.25, 0], tmpScale);
          }
        } else if (cellValue === 3) {
          inTilesRenderer.pushInstance(tmpPos, [0.375, 0], tmpScale);
        } else if (cellValue === 4) {
          inTilesRenderer.pushInstance(tmpPos, [0.5, 0], tmpScale);
        } else if (cellValue === 5) {
          cellsMatrix[0] = this._gridBuffer.getData(xx - 1, yy + 1, 5) == 5 ? 5 : 0;
          cellsMatrix[1] = this._gridBuffer.getData(xx + 0, yy + 1, 5) == 5 ? 5 : 0;
          cellsMatrix[2] = this._gridBuffer.getData(xx + 1, yy + 1, 5) == 5 ? 5 : 0;
          cellsMatrix[3] = this._gridBuffer.getData(xx - 1, yy + 0, 5) == 5 ? 5 : 0;
          cellsMatrix[4] = this._gridBuffer.getData(xx + 0, yy + 0, 5) == 5 ? 5 : 0;
          cellsMatrix[5] = this._gridBuffer.getData(xx + 1, yy + 0, 5) == 5 ? 5 : 0;
          cellsMatrix[6] = this._gridBuffer.getData(xx - 1, yy - 1, 5) == 5 ? 5 : 0;
          cellsMatrix[7] = this._gridBuffer.getData(xx + 0, yy - 1, 5) == 5 ? 5 : 0;
          cellsMatrix[8] = this._gridBuffer.getData(xx + 1, yy - 1, 5) == 5 ? 5 : 0;
          if (_compareCellMatrix([-1, 0, -1], [0, 5, 0], [-1, 0, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.75, 0.375], tmpScale);
          } else if (_compareCellMatrix([5, 5, 5], [5, 5, 5], [5, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.375], tmpScale);
          } else if (_compareCellMatrix([-1, 0, -1], [0, 5, 5], [-1, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.75, 0.75], tmpScale);
          } else if (_compareCellMatrix([-1, 0, -1], [5, 5, 0], [5, 5, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.75], tmpScale);
          } else if (_compareCellMatrix([5, 5, -1], [5, 5, 0], [-1, 0, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.875], tmpScale);
          } else if (_compareCellMatrix([-1, 5, 5], [0, 5, 5], [-1, 0, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.75, 0.875], tmpScale);
          } else if (_compareCellMatrix([0, 5, 5], [5, 5, 5], [5, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.75, 0.5], tmpScale);
          } else if (_compareCellMatrix([5, 5, 5], [5, 5, 5], [0, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.75, 0.625], tmpScale);
          } else if (_compareCellMatrix([5, 5, 5], [5, 5, 5], [5, 5, 0])) {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.625], tmpScale);
          } else if (_compareCellMatrix([5, 5, 0], [5, 5, 5], [5, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.5], tmpScale);
          } else if (_compareCellMatrix([-1, 0, -1], [5, 5, 5], [5, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.5, 0.75], tmpScale);
          } else if (_compareCellMatrix([5, 5, 5], [5, 5, 5], [-1, 0, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.5, 0.875], tmpScale);
          } else if (_compareCellMatrix([5, 5, -1], [5, 5, 0], [5, 5, -1])) {
            inTilesRenderer.pushInstance(tmpPos, [0.625, 0.875], tmpScale);
          } else if (_compareCellMatrix([-1, 5, 5], [0, 5, 5], [-1, 5, 5])) {
            inTilesRenderer.pushInstance(tmpPos, [0.625, 0.75], tmpScale);
          } else {
            inTilesRenderer.pushInstance(tmpPos, [0.875, 0.375], tmpScale);
          }
        }
      }
  }
  render(inRenderer, inTilesRenderer, tileScale) {
    inTilesRenderer.flush(inRenderer.mainCamera.getComposedMatrix(), { doNotClear: true, scale: tileScale });
    for (const currBuilding of this._buildingProps) {
      const tmpScale = this._config.tileSize * 1;
      const tmpSizeX = currBuilding.sizeX * tmpScale;
      const tmpSizeY = currBuilding.sizeY * tmpScale;
      if (currBuilding.type == 0) {
        inRenderer.geometryStackRenderer.push([currBuilding.posX * this._config.tileSize, currBuilding.posY * this._config.tileSize, currBuilding.height * this._config.tileSize * 0.5], [0, 0, 1, 0], [0.5, 0.5, 0.5], [tmpSizeX, tmpSizeY, currBuilding.height * this._config.tileSize]);
      } else {
        inRenderer.geometryStackRenderer.push([currBuilding.posX * this._config.tileSize, currBuilding.posY * this._config.tileSize, currBuilding.height * this._config.tileSize * 0.5], [0, 0, 1, 0], [0.2, 0.2, 0.2], [tmpSizeX, tmpSizeY, currBuilding.height * this._config.tileSize]);
      }
    }
  }
}

// src/main/experiment/logic/tiles-renderer/shaders/tiles-renderer.glsl.vert
var tiles_renderer_glsl_default = `
#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;
uniform float u_scale;

in vec2 a_vertex_position;
in vec2 a_vertex_texCoord;
in vec3 a_offset_position;
in vec2 a_offset_texCoord;
in float a_offset_scale;

out vec2 v_texCoord;

void main(void)
{
  vec3 position = vec3(a_vertex_position, 0.0) * a_offset_scale * u_scale + a_offset_position;

  gl_Position = u_composedMatrix * vec4(position, 1.0);

  v_texCoord = a_vertex_texCoord + a_offset_texCoord;
}
`.trim();

// src/main/experiment/logic/tiles-renderer/shaders/tiles-renderer.glsl.frag
var tiles_renderer_glsl_default2 = `
#version 300 es

precision mediump float;

uniform sampler2D u_texture;

in vec2 v_texCoord;

out vec4 o_color;

void main(void)
{
  vec4 textureColor = texture(u_texture, v_texCoord);
  if (textureColor.a < 0.01)
  {
    discard;
  }
  else
  {
    o_color = textureColor;
  }
}
`.trim();

// src/main/experiment/logic/tiles-renderer/TilesRenderer.ts
var k_gridSize2 = [8, 8];
var k_texCoord2 = [1 / k_gridSize2[0], 1 / k_gridSize2[1]];
var k_bufferSize6 = 20971520;

class TilesRenderer {
  _shader;
  _geometry;
  _texture = new exports_graphics.webgl2.Texture;
  _buffer = new Float32Array(k_bufferSize6);
  _currentSize = 0;
  constructor() {
    this._shader = new exports_graphics.webgl2.ShaderProgram("TilesRenderer", {
      vertexSrc: tiles_renderer_glsl_default,
      fragmentSrc: tiles_renderer_glsl_default2,
      attributes: [
        "a_vertex_position",
        "a_vertex_texCoord",
        "a_offset_position",
        "a_offset_texCoord",
        "a_offset_scale"
      ],
      uniforms: ["u_composedMatrix", "u_texture", "u_scale"]
    });
    const geoBuilder = new exports_graphics.webgl2.GeometryWrapper.GeometryBuilder;
    geoBuilder.reset().setPrimitiveType("triangles").addVbo().addVboAttribute("a_vertex_position", "vec2f").addVboAttribute("a_vertex_texCoord", "vec2f").setStride(16).addVbo().setVboAsDynamic().setVboAsInstanced().addVboAttribute("a_offset_position", "vec3f").addVboAttribute("a_offset_texCoord", "vec2f").addVboAttribute("a_offset_scale", "float").setStride(24);
    this._geometry = new exports_graphics.webgl2.GeometryWrapper.Geometry(this._shader, geoBuilder.getDef());
    const vertices = [
      {
        position: [0.5, -0.5],
        texCoord: [k_texCoord2[0] * 1, k_texCoord2[1] * 1]
      },
      {
        position: [-0.5, -0.5],
        texCoord: [k_texCoord2[0] * 0, k_texCoord2[1] * 1]
      },
      {
        position: [0.5, 0.5],
        texCoord: [k_texCoord2[0] * 1, k_texCoord2[1] * 0]
      },
      {
        position: [-0.5, 0.5],
        texCoord: [k_texCoord2[0] * 0, k_texCoord2[1] * 0]
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
    const width = 8;
    const height = 8;
    const imagePixels = new Uint8Array(width * height * 4);
    {
      let index = 0;
      for (let yy = 0;yy < height; ++yy)
        for (let xx = 0;xx < width; ++xx) {
          imagePixels[index * 4 + 0] = 0;
          imagePixels[index * 4 + 1] = 0;
          imagePixels[index * 4 + 2] = 0;
          imagePixels[index * 4 + 3] = 0;
          ++index;
        }
    }
    {
      let index = 0;
      imagePixels[index * 4 + 0] = 0;
      imagePixels[index * 4 + 1] = 127.5;
      imagePixels[index * 4 + 2] = 0;
      imagePixels[index * 4 + 3] = 255;
    }
    {
      let index = 1;
      imagePixels[index * 4 + 0] = 76.5;
      imagePixels[index * 4 + 1] = 76.5;
      imagePixels[index * 4 + 2] = 76.5;
      imagePixels[index * 4 + 3] = 255;
    }
    {
      let index = 2;
      imagePixels[index * 4 + 0] = 0;
      imagePixels[index * 4 + 1] = 0;
      imagePixels[index * 4 + 2] = 255;
      imagePixels[index * 4 + 3] = 255;
    }
    {
      let index = 3;
      imagePixels[index * 4 + 0] = 25.5;
      imagePixels[index * 4 + 1] = 25.5;
      imagePixels[index * 4 + 2] = 25.5;
      imagePixels[index * 4 + 3] = 255;
    }
    {
      let index = 4;
      imagePixels[index * 4 + 0] = 127.5;
      imagePixels[index * 4 + 1] = 0;
      imagePixels[index * 4 + 2] = 0;
      imagePixels[index * 4 + 3] = 255;
    }
    {
      let index = 5;
      imagePixels[index * 4 + 0] = 0;
      imagePixels[index * 4 + 1] = 0;
      imagePixels[index * 4 + 2] = 127.5;
      imagePixels[index * 4 + 3] = 255;
    }
    this._texture.initialize();
    this._texture.bind((boundTexture) => {
      boundTexture.loadFromMemory(width, height, imagePixels);
    });
    exports_graphics.images.getImageFromUrl("./assets/graphics/textures/spritesheet.png").then((img) => {
      this._texture.bind((boundTexture) => {
        boundTexture.load(img);
      });
    });
  }
  pushInstance(inPosition, inTexCoord, inScale) {
    if (this._currentSize + 6 >= this._buffer.length) {
      return;
    }
    this._buffer[this._currentSize++] = inPosition[0];
    this._buffer[this._currentSize++] = inPosition[1];
    this._buffer[this._currentSize++] = 0;
    this._buffer[this._currentSize++] = inTexCoord[0];
    this._buffer[this._currentSize++] = inTexCoord[1];
    this._buffer[this._currentSize++] = inScale;
  }
  flush(composedMatrix, opts) {
    if (this._currentSize === 0) {
      return this;
    }
    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform("u_composedMatrix", composedMatrix);
      boundShader.setFloat1Uniform("u_scale", opts?.scale ?? 1);
      boundShader.setTextureUniform("u_texture", this._texture, 0);
      this._geometry.allocateBuffer(1, this._buffer, this._currentSize);
      this._geometry.setInstancedCount(this._currentSize / 6);
      this._geometry.render();
    });
    exports_graphics.webgl2.Texture.unbind();
    const doNotClear = opts?.doNotClear === true;
    if (!doNotClear) {
      this.clear();
    }
    return this;
  }
  clear() {
    this._currentSize = 0;
    return this;
  }
  getSize() {
    return this._currentSize;
  }
}

// src/main/experiment/WebGLExperiment.ts
class WebGLExperiment {
  _canvasElement;
  _renderer;
  _freeFlyController;
  _gameMap = new GameMap;
  _tilesRenderer;
  _running;
  _errorGraphicContext;
  _currFrameTime = Date.now();
  _frameProfiler = new FrameProfiler3;
  _time = 0;
  _debugScaleOn = true;
  constructor(canvasElement) {
    this._canvasElement = canvasElement;
    this._renderer = new WebGLRenderer({
      canvasDomElement: canvasElement
    });
    this._freeFlyController = new exports_system.controllers.FreeFlyController({
      position: exports_vec3.fromValues(50, -2, 60),
      coordinates: ["X", "Y", "Z"],
      theta: Math.PI * 0.5,
      phi: Math.PI * -0.35,
      mouseSensibility: controllerMouseSensibility,
      movingSpeed: controllerMovingSpeed,
      keyboardSensibility: controllerKeyboardSensibility,
      touchSensibility: controllerTouchSensibility
    });
    {
      exports_system.browser.GlobalKeyboardManager.activate();
      exports_system.browser.GlobalTouchManager.activate(this._canvasElement);
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
    this._tilesRenderer = new TilesRenderer;
    this._gameMap.generateCity(this._tilesRenderer);
  }
  async init() {
    await this._renderer.initialize();
  }
  toggleDebugScale() {
    this._debugScaleOn = !this._debugScaleOn;
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
    let deltaSecTime = Math.max(0, currentTime - this._currFrameTime);
    this._currFrameTime = currentTime;
    this._frameProfiler.pushDelta(deltaSecTime);
    this._freeFlyController.update(deltaSecTime / 1000);
    exports_system.browser.GlobalMouseManager.resetDeltas();
    exports_system.browser.GlobalTouchManager.resetDeltas();
    this._time += deltaSecTime / 1000;
    this._renderer.lookAt(this._freeFlyController.getPosition(), this._freeFlyController.getTarget(), this._freeFlyController.getUpAxis());
    this._renderer.update();
    this._renderer.renderScene((camera, frustumCulling) => {
      const stackRenderers = this._renderer.stackRenderers;
      stackRenderers.pushLine([0, 0, 0], [100, 0, 0], [1, 0, 0]);
      stackRenderers.pushLine([0, 0, 0], [0, 100, 0], [0, 1, 0]);
      stackRenderers.pushLine([0, 0, 0], [0, 0, 100], [0, 0, 1]);
      const tileScale = this._debugScaleOn ? 0.9 : 1;
      this._gameMap.render(this._renderer, this._tilesRenderer, tileScale);
    });
    this._renderer.renderHUD(() => {
      {
        const keyEventsPos = [27, 165];
        const touchEventsPos = [27, 260];
        const boardPos = [7, 35];
        exports_graphics.renderers.widgets.addKeyStrokesWidgets(keyEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
        exports_graphics.renderers.widgets.addArrowStrokesWidgets(touchEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
        exports_graphics.renderers.widgets.addKeysTouchesWidgets(this._canvasElement, boardPos, this._renderer.stackRenderers, this._renderer.textRenderer);
      }
      exports_graphics.renderers.widgets.renderFpsMeter([10, this._canvasElement.height - 60, 0], [100, 50], this._frameProfiler, this._renderer.stackRenderers, this._renderer.textRenderer, true);
    });
  }
}

// src/main/main.ts
var demo = null;
var _queryHtmlElement = (inName) => {
  const newElement = document.querySelector(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};
window.addEventListener("load", async () => {
  const canvasElement = _queryHtmlElement("#main-canvas");
  demo = new WebGLExperiment(canvasElement);
  await demo.init();
  demo.start();
  const btn_debugScale = _queryHtmlElement("#btn-debug-scale");
  btn_debugScale.addEventListener("click", () => {
    demo.toggleDebugScale();
  });
});
window.addEventListener("error", () => {
  if (demo) {
    demo.stop();
  }
});

//# debugId=1C75B4408EA2441764756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4vY29uZmlndXJhdGlvbi50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL0Z1bGxTY3JlZW5NYW5hZ2VyLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvS2V5Q29kZXMudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9LZXlib2FyZE1hbmFnZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9Nb3VzZU1hbmFnZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9Qb2ludGVyTG9ja01hbmFnZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9Ub3VjaE1hbmFnZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vYnJvd3Nlci9WaXNpYmlsaXR5TWFuYWdlci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9icm93c2VyL2lzV2ViV29ya2VyU3VwcG9ydGVkLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL2Jyb3dzZXIvaXNXZWJHTDJTdXBwb3J0ZWQudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9hbmdsZXMudHMiLCAibm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vY29tbW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL21hdDQuanMiLCAibm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMy5qcyIsICJub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS92ZWM0LmpzIiwgIm5vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3ZlYzIuanMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vY29udHJvbGxlcnMvRnJlZUZseUNvbnRyb2xsZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9jbGFtcC50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS9tYXRoL2NvbGxpc2lvbnMudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9zeXN0ZW0vbWF0aC9sZXJwLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvc3lzdGVtL21ldHJpY3MvRnJhbWVQcm9maWxlci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL3N5c3RlbS91dGlsaXRpZXMvQXN5bmNIZWxwZXJzLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvY2FtZXJhL0NhbWVyYS50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL2NhbWVyYS9GcnVzdHVtQ3VsbGluZy50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9XZWJHTENvbnRleHQudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvQ3ViZU1hcC50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9EYXRhVGV4dHVyZS50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9FcnJvci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9GZW5jZS50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9GcmFtZUJ1ZmZlci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9HZW9tZXRyeVdyYXBwZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy93ZWJnbDIvU2hhZGVyUHJvZ3JhbS50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3dlYmdsMi9UZXh0dXJlLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3Mvd2ViZ2wyL1RleHR1cmVBcnJheS50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9nZW9tZXRyeS1yZW5kZXJlci9zaGFkZXJzL2dlb21ldHJ5LXJlbmRlcmVyLmdsc2wudmVydCIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9nZW9tZXRyeS1yZW5kZXJlci9zaGFkZXJzL2dlb21ldHJ5LXJlbmRlcmVyLmdsc2wuZnJhZyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9nZW9tZXRyeS1yZW5kZXJlci9HZW9tZXRyeVJlbmRlcmVyLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3N0YWNrLXJlbmRlcmVycy9zaGFkZXJzL3N0YWNrLXJlbmRlcmVyLmdsc2wudmVydCIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9zdGFjay1yZW5kZXJlcnMvc2hhZGVycy9zdGFjay1yZW5kZXJlci5nbHNsLmZyYWciLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvc3RhY2stcmVuZGVyZXJzL2ludGVybmFscy9XaXJlRnJhbWVzU3RhY2tSZW5kZXJlci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy9zdGFjay1yZW5kZXJlcnMvaW50ZXJuYWxzL1RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvc3RhY2stcmVuZGVyZXJzL1N0YWNrUmVuZGVyZXJzLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvc2hhZGVycy90ZXh0LXJlbmRlcmVyLmdsc2wudmVydCIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL3JlbmRlcmVycy90ZXh0LXJlbmRlcmVyL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLmZyYWciLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvdGV4dC1yZW5kZXJlci9pbnRlcm5hbHMvYXNjaWlUZXh0dXJlSGV4LnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3RleHQtcmVuZGVyZXIvVGV4dFJlbmRlcmVyLnRzIiwgInNyYy9sb2NhbC1mcmFtZXdvcmsvZ3JhcGhpY3MvcmVuZGVyZXJzL3dpZGdldHMvcmVuZGVyQ29udHJvbHMudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9yZW5kZXJlcnMvd2lkZ2V0cy9yZW5kZXJGcHNNZXRlci50cyIsICJzcmMvbG9jYWwtZnJhbWV3b3JrL2dyYXBoaWNzL2ltYWdlcy9nZXRJbWFnZUZyb21VcmwudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9nZW9tZXRyaWVzL21ha2VCb3gudHMiLCAic3JjL2xvY2FsLWZyYW1ld29yay9ncmFwaGljcy9nZW9tZXRyaWVzL21ha2VTcGhlcmUudHMiLCAic3JjL21haW4vZXhwZXJpbWVudC9ncmFwaGljcy91dGlscy9nZW5lcmF0ZVNwaGVyZVZlcnRpY2VzLnRzIiwgInNyYy9tYWluL2V4cGVyaW1lbnQvZ3JhcGhpY3MvcmVuZGVyZXJzL3NjZW5lL3dpcmUtZnJhbWUtY3ViZXMtcmVuZGVyZXIvc2hhZGVycy93aXJlLWZyYW1lLWN1YmVzLXJlbmRlcmVyLmdsc2wudmVydCIsICJzcmMvbWFpbi9leHBlcmltZW50L2dyYXBoaWNzL3JlbmRlcmVycy9zY2VuZS93aXJlLWZyYW1lLWN1YmVzLXJlbmRlcmVyL3NoYWRlcnMvd2lyZS1mcmFtZS1jdWJlcy1yZW5kZXJlci5nbHNsLmZyYWciLCAic3JjL21haW4vZXhwZXJpbWVudC9ncmFwaGljcy9yZW5kZXJlcnMvc2NlbmUvd2lyZS1mcmFtZS1jdWJlcy1yZW5kZXJlci9XaXJlRnJhbWVDdWJlc1JlbmRlcmVyLnRzIiwgInNyYy9tYWluL2V4cGVyaW1lbnQvZ3JhcGhpY3MvV2ViR0xSZW5kZXJlci50cyIsICJzcmMvbWFpbi9leHBlcmltZW50L3V0aWxpdGllcy9GcmFtZVByb2ZpbGVyLnRzIiwgInNyYy9tYWluL2V4cGVyaW1lbnQvbG9naWMvaGVscGVycy9EZXRlcm1pbmlzdGljUm5nLnRzIiwgInNyYy9tYWluL2V4cGVyaW1lbnQvbG9naWMvaGVscGVycy9DbGFzc2ljYWxOb2lzZS50cyIsICJzcmMvbWFpbi9leHBlcmltZW50L2xvZ2ljL0dhbWVNYXAudHMiLCAic3JjL21haW4vZXhwZXJpbWVudC9sb2dpYy90aWxlcy1yZW5kZXJlci9zaGFkZXJzL3RpbGVzLXJlbmRlcmVyLmdsc2wudmVydCIsICJzcmMvbWFpbi9leHBlcmltZW50L2xvZ2ljL3RpbGVzLXJlbmRlcmVyL3NoYWRlcnMvdGlsZXMtcmVuZGVyZXIuZ2xzbC5mcmFnIiwgInNyYy9tYWluL2V4cGVyaW1lbnQvbG9naWMvdGlsZXMtcmVuZGVyZXIvVGlsZXNSZW5kZXJlci50cyIsICJzcmMvbWFpbi9leHBlcmltZW50L1dlYkdMRXhwZXJpbWVudC50cyIsICJzcmMvbWFpbi9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWwogICAgImV4cG9ydCBjb25zdCBjb250cm9sbGVyTW92aW5nU3BlZWQgPSAxNjtcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyTW91c2VTZW5zaWJpbGl0eSA9IDYuMDtcbmV4cG9ydCBjb25zdCBjb250cm9sbGVyS2V5Ym9hcmRTZW5zaWJpbGl0eSA9IE1hdGguUEkgKiAwLjU1O1xuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXJUb3VjaFNlbnNpYmlsaXR5ID0gMTUuMDtcbiIsCiAgImNvbnN0IGFsbFJlcXVlc3RFdmVudHM6IHN0cmluZ1tdID0gW1xuICAncmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nLFxuICAnbXNSZXF1ZXN0RnVsbHNjcmVlbidcbl07XG5cbmNvbnN0IGFsbENoYW5nZUV2ZW50czogc3RyaW5nW10gPSBbXG4gICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXG4gICdtc2Z1bGxzY3JlZW5jaGFuZ2UnXG5dO1xuXG50eXBlIE9uQ2hhbmdlQ2FsbGJhY2sgPSAoKSA9PiB2b2lkO1xuXG5pbnRlcmZhY2UgSVJlc3VsdCB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY2xhc3MgRnVsbFNjcmVlbk1hbmFnZXIge1xuICBwcml2YXRlIF9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3M6IE9uQ2hhbmdlQ2FsbGJhY2tbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9pbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgb25Mb2NrQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fb25GdWxsU2NyZWVuQ2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsQ2hhbmdlRXZlbnRzKVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjdXJyRXZlbnQsIG9uTG9ja0NoYW5nZSwgZmFsc2UpO1xuICB9XG5cbiAgLy9cblxuICBpc0NvbXBhdGlibGUoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbFJlcXVlc3RFdmVudHMpIHtcbiAgICAgIGlmIChjdXJyRXZlbnQgaW4gaW5UYXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuXG4gIGlzRnVsbFNjcmVlbihpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ID09PSBpblRhcmdldEVsZW1lbnQ7XG4gIH1cblxuICAvL1xuXG4gIGFzeW5jIHJlcXVlc3RGdWxsU2NyZWVuKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPElSZXN1bHQ+IHtcbiAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4oaW5UYXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdlbGVtZW50IGFscmVhZHkgaW4gZnVsbCBzY3JlZW4nIH07XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZSgpO1xuXG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsUmVxdWVzdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBpblRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgKGluVGFyZ2V0RWxlbWVudCBhcyBhbnkpW2N1cnJFdmVudF0oKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAncmVxdWVzdCBmb3IgZnVsbCBzY3JlZW4gZG9uZScgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3Vuc3VwcG9ydGVkIHJlcXVlc3QgZm9yIGZ1bGwgc2NyZWVuJyB9O1xuICB9XG5cbiAgLy9cblxuICBhZGRPbkZ1bGxTY3JlZW5DaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIHRoaXMuX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZU9uRnVsbFNjcmVlbkNoYW5nZShpbkNhbGxiYWNrOiBPbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3MuaW5kZXhPZihpbkNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uRnVsbFNjcmVlbkNoYW5nZUNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJlbW92ZUFsbENhbGxiYWNrcygpIHtcbiAgICB0aGlzLl9vbkZ1bGxTY3JlZW5DaGFuZ2VDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgfVxufVxuXG5jb25zdCBHbG9iYWxGdWxsU2NyZWVuTWFuYWdlciA9IG5ldyBGdWxsU2NyZWVuTWFuYWdlcigpO1xuXG5leHBvcnQgeyBHbG9iYWxGdWxsU2NyZWVuTWFuYWdlciB9O1xuIiwKICAiZXhwb3J0IGNvbnN0IEFsbEtleUNvZGVzID0ge1xuICAvLyBOdW1iZXJzIGFuZCBsZXR0ZXJzXG4gIE51bTA6IDQ4LFxuICBOdW0xOiA0OSxcbiAgTnVtMjogNTAsXG4gIE51bTM6IDUxLFxuICBOdW00OiA1MixcbiAgTnVtNTogNTMsXG4gIE51bTY6IDU0LFxuICBOdW03OiA1NSxcbiAgTnVtODogNTYsXG4gIE51bTk6IDU3LFxuICBBOiA2NSxcbiAgQjogNjYsXG4gIEM6IDY3LFxuICBEOiA2OCxcbiAgRTogNjksXG4gIEY6IDcwLFxuICBHOiA3MSxcbiAgSDogNzIsXG4gIEk6IDczLFxuICBKOiA3NCxcbiAgSzogNzUsXG4gIEw6IDc2LFxuICBNOiA3NyxcbiAgTjogNzgsXG4gIE86IDc5LFxuICBQOiA4MCxcbiAgUTogODEsXG4gIFI6IDgyLFxuICBTOiA4MyxcbiAgVDogODQsXG4gIFU6IDg1LFxuICBWOiA4NixcbiAgVzogODcsXG4gIFg6IDg4LFxuICBZOiA4OSxcbiAgWjogOTAsXG5cbiAgLy8gUHVuY3R1YXRpb25zIGtleXMgaW4gVVMgbGF5b3V0XG4gIFNlbWljb2xvbjogMTg2LFxuICBFcXVhbDogMTg3LFxuICBDb21tYTogMTg4LFxuICBNaW51czogMTg5LFxuICBQZXJpb2Q6IDE5MCxcbiAgQmFja1F1b3RlOiAxOTIsXG4gIEJyYWNrZXRMZWZ0OiAyMTksXG4gIEJhY2tzbGFzaDogMjIwLFxuICBCcmFja2V0UmlnaHQ6IDIyMSxcbiAgUXVvdGU6IDIyMixcblxuICAvLyBNb2RpZmllciBrZXlzXG4gIFNoaWZ0OiAxNixcbiAgQ3RybDogMTcsXG4gIEFsdDogMTgsXG4gIENhcHNMb2NrOiAyMCxcblxuICAvLyBDb250cm9sIGtleXNcbiAgVGFiOiA5LFxuICBFbnRlcjogMTMsXG4gIFBhdXNlOiAxOSxcbiAgRXNjYXBlOiAyNyxcbiAgU3BhY2U6IDMyLFxuICBQYWdlVXA6IDMzLFxuICBQYWdlRG93bjogMzQsXG4gIEVuZDogMzUsXG4gIEhvbWU6IDM2LFxuICBBcnJvd0xlZnQ6IDM3LFxuICBBcnJvd1VwOiAzOCxcbiAgQXJyb3dSaWdodDogMzksXG4gIEFycm93RG93bjogNDAsXG4gIFByaW50U2NyZWVuOiA0NCxcbiAgSW5zZXJ0OiA0NSxcbiAgRGVsZXRlOiA0NixcbiAgQ29udGV4dE1lbnU6IDkzLFxuICBTY3JvbGxMb2NrOiAxNDUsXG5cbiAgLy8gRnVuY3Rpb24ga2V5c1xuICBGMTogMTEyLFxuICBGMjogMTEzLFxuICBGMzogMTE0LFxuICBGNDogMTE1LFxuICBGNTogMTE2LFxuICBGNjogMTE3LFxuICBGNzogMTE4LFxuICBGODogMTE5LFxuICBGOTogMTIwLFxuICBGMTA6IDEyMSxcbiAgRjExOiAxMjIsXG4gIEYxMjogMTIzLFxuICBGMTM6IDEyNCxcbiAgRjE0OiAxMjUsXG4gIEYxNTogMTI2LFxuICBGMTY6IDEyNyxcbiAgRjE3OiAxMjgsXG4gIEYxODogMTI5LFxuICBGMTk6IDEzMCxcbiAgRjIwOiAxMzEsXG4gIEYyMTogMTMyLFxuICBGMjI6IDEzMyxcbiAgRjIzOiAxMzQsXG4gIEYyNDogMTM1LFxuXG4gIC8vIE51bXBhZCBrZXlzXG4gIE51bVBhZDA6IDk2LFxuICBOdW1QYWQxOiA5NyxcbiAgTnVtUGFkMjogOTgsXG4gIE51bVBhZDM6IDk5LFxuICBOdW1QYWQ0OiAxMDAsXG4gIE51bVBhZDU6IDEwMSxcbiAgTnVtUGFkNjogMTAyLFxuICBOdW1QYWQ3OiAxMDMsXG4gIE51bVBhZDg6IDEwNCxcbiAgTnVtUGFkOTogMTA1LFxuICBOdW1QYWRNdWx0aXBseTogMTA2LFxuICBOdW1QYWRBZGQ6IDEwNyxcbiAgTnVtUGFkU3VidHJhY3Q6IDEwOSxcbiAgTnVtUGFkRGVjaW1hbDogMTEwLFxuICBOdW1QYWREaXZpZGU6IDExMSxcbiAgTnVtTG9jazogMTQ0LFxuICBOdW1QYWRDb21tYTogMTk0LFxuICBOdW1QYWRFcXVhbDogMTJcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xldHRlciA9IChrZXk6IG51bWJlcikgPT4ge1xuICByZXR1cm4ga2V5ID49IEFsbEtleUNvZGVzLkEgJiYga2V5IDw9IEFsbEtleUNvZGVzLlo7XG59O1xuXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSAoa2V5OiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIChcbiAgICAoa2V5ID49IEFsbEtleUNvZGVzLk51bTAgJiYga2V5IDw9IEFsbEtleUNvZGVzLk51bTkpIHx8XG4gICAgKGtleSA+PSBBbGxLZXlDb2Rlcy5OdW1QYWQwICYmIGtleSA8PSBBbGxLZXlDb2Rlcy5OdW1QYWQ5KVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQWxwaGFudW1lcmljID0gKGtleTogbnVtYmVyKSA9PiB7XG4gIHJldHVybiBpc051bWJlcihrZXkpIHx8IGlzTGV0dGVyKGtleSk7XG59O1xuIiwKICAiaW1wb3J0IHsgQWxsS2V5Q29kZXMgfSBmcm9tICcuL0tleUNvZGVzJztcblxuY2xhc3MgS2V5Ym9hcmRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcHJlc3NlZEtleXNTZXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcHJldmVudERlZmF1bHRLZXlzU2V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2FjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVLZXlEb3duOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZUtleVVwOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgcHJpdmF0ZSBfb25FdmVudDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQ7XG5cbiAgICAgIGlmICh0aGlzLl9vbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uRXZlbnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3ByZXZlbnREZWZhdWx0S2V5c1NldC5oYXMoa2V5Q29kZSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuYWRkKGtleUNvZGUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlS2V5VXAgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQ7XG5cbiAgICAgIGlmICh0aGlzLl9vbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uRXZlbnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3ByZXZlbnREZWZhdWx0S2V5c1NldC5oYXMoa2V5Q29kZSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuZGVsZXRlKGtleUNvZGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9oYW5kbGVLZXlEb3duID0gaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUtleVVwID0gaGFuZGxlS2V5VXAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGlzUHJlc3NlZCguLi5pbktleXM6IChrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpW10pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBpbktleXMpIHtcbiAgICAgIGlmICh0aGlzLl9wcmVzc2VkS2V5c1NldC5oYXMoQWxsS2V5Q29kZXNba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByZXZlbnREZWZhdWx0KGluS2V5OiBrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpIHtcbiAgICB0aGlzLl9wcmV2ZW50RGVmYXVsdEtleXNTZXQuYWRkKEFsbEtleUNvZGVzW2luS2V5XSk7XG4gIH1cblxuICBlbmFibGVEZWZhdWx0KGluS2V5OiBrZXlvZiB0eXBlb2YgQWxsS2V5Q29kZXMpIHtcbiAgICB0aGlzLl9wcmV2ZW50RGVmYXVsdEtleXNTZXQuZGVsZXRlKEFsbEtleUNvZGVzW2luS2V5XSk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlEb3duKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2hhbmRsZUtleVVwKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEtleXNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlEb3duKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2hhbmRsZUtleVVwKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgb25FdmVudChjYWxsYmFjazogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fb25FdmVudCA9IGNhbGxiYWNrO1xuICB9XG5cbn1cblxuLy9cbi8vXG4vL1xuXG5jb25zdCBHbG9iYWxLZXlib2FyZE1hbmFnZXIgPSBuZXcgS2V5Ym9hcmRNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbEtleWJvYXJkTWFuYWdlciB9O1xuIiwKICAiaW1wb3J0IHsgQWxsS2V5Q29kZXMgfSBmcm9tICcuL0tleUNvZGVzJztcblxuY29uc3QgQWxsTW91c2VCdXR0b25zID0ge1xuICBMZWZ0OiAwLFxuICBNaWRkbGU6IDEsXG4gIFJpZ2h0OiAyXG59O1xuXG5jbGFzcyBNb3VzZU1hbmFnZXIge1xuICBwcml2YXRlIF9wcmVzc2VkQnV0dG9uc1NldCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VEb3duOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZU1vdXNlVXA6IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VNb3ZlOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG5cbiAgLy8gcHJpdmF0ZSBfcG9zaXRpb25YID0gMDtcbiAgLy8gcHJpdmF0ZSBfcG9zaXRpb25ZID0gMDtcbiAgcHJpdmF0ZSBfZGVsdGFYID0gMDtcbiAgcHJpdmF0ZSBfZGVsdGFZID0gMDtcblxuICBwcml2YXRlIF9vbkV2ZW50OiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG5cbiAgICAgIGlmICh0aGlzLl9vbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uRXZlbnQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuYWRkKGV2ZW50LmJ1dHRvbik7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG5cbiAgICAgIGlmICh0aGlzLl9vbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uRXZlbnQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuZGVsZXRlKGV2ZW50LmJ1dHRvbik7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcblxuICAgICAgaWYgKHRoaXMuX29uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fb25FdmVudCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9kZWx0YVggKz1cbiAgICAgICAgZXZlbnQubW92ZW1lbnRYIHx8XG4gICAgICAgIChldmVudCBhcyBhbnkpLm1vek1vdmVtZW50WCB8fFxuICAgICAgICAoZXZlbnQgYXMgYW55KS53ZWJraXRNb3ZlbWVudFggfHxcbiAgICAgICAgMDtcblxuICAgICAgdGhpcy5fZGVsdGFZICs9XG4gICAgICAgIGV2ZW50Lm1vdmVtZW50WSB8fFxuICAgICAgICAoZXZlbnQgYXMgYW55KS5tb3pNb3ZlbWVudFkgfHxcbiAgICAgICAgKGV2ZW50IGFzIGFueSkud2Via2l0TW92ZW1lbnRZIHx8XG4gICAgICAgIDA7XG4gICAgfTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlRG93biA9IGhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlVXAgPSBoYW5kbGVNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlTW91c2VNb3ZlID0gaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuY2xlYXIoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2hhbmRsZU1vdXNlRG93bik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX2hhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZXNzZWRCdXR0b25zU2V0LmNsZWFyKCk7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9oYW5kbGVNb3VzZURvd24pO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9oYW5kbGVNb3VzZU1vdmUpO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gIH1cblxuICBpc0J1dHRvblByZXNzZWQoaW5LZXk6IGtleW9mIHR5cGVvZiBBbGxNb3VzZUJ1dHRvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlc3NlZEJ1dHRvbnNTZXQuaGFzKEFsbE1vdXNlQnV0dG9uc1tpbktleV0pO1xuICB9XG5cbiAgZGVsdGFYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbHRhWDtcbiAgfVxuICBkZWx0YVkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsdGFZO1xuICB9XG4gIHJlc2V0RGVsdGFzKCkge1xuICAgIHRoaXMuX2RlbHRhWCA9IDA7XG4gICAgdGhpcy5fZGVsdGFZID0gMDtcbiAgfVxuXG4gIG9uRXZlbnQoY2FsbGJhY2s6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX29uRXZlbnQgPSBjYWxsYmFjaztcbiAgfVxuXG59XG5cbi8vXG4vL1xuLy9cblxuY29uc3QgR2xvYmFsTW91c2VNYW5hZ2VyID0gbmV3IE1vdXNlTWFuYWdlcigpO1xuXG5leHBvcnQgeyBHbG9iYWxNb3VzZU1hbmFnZXIgfTtcbiIsCiAgImNvbnN0IGFsbFJlcXVlc3RFdmVudHM6IHN0cmluZ1tdID0gW1xuICAncmVxdWVzdFBvaW50ZXJMb2NrJyxcbiAgJ21velJlcXVlc3RQb2ludGVyTG9jaycsXG4gICd3ZWJraXRSZXF1ZXN0UG9pbnRlckxvY2snXG5dO1xuXG5jb25zdCBhbGxFeGl0RXZlbnRzOiBzdHJpbmdbXSA9IFtcbiAgJ2V4aXRQb2ludGVyTG9jaycsXG4gICdtb3pFeGl0UG9pbnRlckxvY2snLFxuICAnd2Via2l0RXhpdFBvaW50ZXJMb2NrJ1xuXTtcblxuY29uc3QgYWxsU3RhdGVFdmVudHM6IHN0cmluZ1tdID0gW1xuICAncG9pbnRlckxvY2tFbGVtZW50JyxcbiAgJ21velBvaW50ZXJMb2NrRWxlbWVudCcsXG4gICd3ZWJraXRQb2ludGVyTG9ja0VsZW1lbnQnXG5dO1xuXG5jb25zdCBhbGxDaGFuZ2VFdmVudHM6IHsgbWV0aG9kTmFtZTogc3RyaW5nOyBwcm9wZXJ0eU5hbWU6IHN0cmluZyB9W10gPSBbXG4gIHsgbWV0aG9kTmFtZTogJ29ucG9pbnRlcmxvY2tjaGFuZ2UnLCBwcm9wZXJ0eU5hbWU6ICdwb2ludGVybG9ja2NoYW5nZScgfSxcbiAge1xuICAgIG1ldGhvZE5hbWU6ICdvbm1venBvaW50ZXJsb2NrY2hhbmdlJyxcbiAgICBwcm9wZXJ0eU5hbWU6ICdtb3pwb2ludGVybG9ja2NoYW5nZSdcbiAgfSxcbiAge1xuICAgIG1ldGhvZE5hbWU6ICdvbndlYmtpdHBvaW50ZXJsb2NrY2hhbmdlJyxcbiAgICBwcm9wZXJ0eU5hbWU6ICd3ZWJraXRwb2ludGVybG9ja2NoYW5nZSdcbiAgfVxuXTtcblxuY29uc3QgYWxsRXJyb3JFdmVudHM6IHsgbWV0aG9kTmFtZTogc3RyaW5nOyBwcm9wZXJ0eU5hbWU6IHN0cmluZyB9W10gPSBbXG4gIHsgbWV0aG9kTmFtZTogJ29ucG9pbnRlcmxvY2tlcnJvcicsIHByb3BlcnR5TmFtZTogJ3BvaW50ZXJsb2NrZXJyb3InIH0sXG4gIHsgbWV0aG9kTmFtZTogJ29ubW96cG9pbnRlcmxvY2tlcnJvcicsIHByb3BlcnR5TmFtZTogJ21venBvaW50ZXJsb2NrZXJyb3InIH0sXG4gIHtcbiAgICBtZXRob2ROYW1lOiAnb253ZWJraXRwb2ludGVybG9ja2Vycm9yJyxcbiAgICBwcm9wZXJ0eU5hbWU6ICd3ZWJraXRwb2ludGVybG9ja2Vycm9yJ1xuICB9XG5dO1xuXG50eXBlIE9uQ2hhbmdlQ2FsbGJhY2sgPSAoKSA9PiB2b2lkO1xudHlwZSBPbkVycm9yQ2FsbGJhY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xuXG5pbnRlcmZhY2UgSVJlc3VsdCB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY2xhc3MgUG9pbnRlckxvY2tNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfb25Mb2NrQ2hhbmdlQ2FsbGJhY2tzOiBPbkNoYW5nZUNhbGxiYWNrW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25Mb2NrRXJyb3JDYWxsYmFja3M6IE9uRXJyb3JDYWxsYmFja1tdID0gW107XG4gIHByaXZhdGUgX3RpbWVTaW5jZUxhc3RMb2NrQ2hhbmdlID0gMDtcblxuICBwcml2YXRlIF9sYXRlc3RSZXF1ZXN0SHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG9uTG9ja0NoYW5nZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3RpbWVTaW5jZUxhc3RMb2NrQ2hhbmdlID0gRGF0ZS5ub3coKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwidGltZXIgcmVzZXRcIik7XG5cbiAgICAgIHRoaXMuX29uTG9ja0NoYW5nZUNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTG9ja0Vycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aW1lciByZXNldFwiKTtcblxuICAgICAgdGhpcy5fb25Mb2NrRXJyb3JDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGV2ZW50KSk7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbENoYW5nZUV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudC5tZXRob2ROYW1lIGluIGRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoY3VyckV2ZW50LnByb3BlcnR5TmFtZSwgb25Mb2NrQ2hhbmdlLCBmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbEVycm9yRXZlbnRzKSB7XG4gICAgICBpZiAoY3VyckV2ZW50Lm1ldGhvZE5hbWUgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjdXJyRXZlbnQucHJvcGVydHlOYW1lLCBvbkxvY2tFcnJvciwgZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1xuXG4gIGNhbkJlUG9pbnRlckxvY2tlZChpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsUmVxdWVzdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBpblRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG5cbiAgaXNQb2ludGVyTG9ja2VkKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmb3IgKGNvbnN0IGN1cnJFdmVudCBvZiBhbGxTdGF0ZUV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gKGRvY3VtZW50IGFzIGFueSlbY3VyckV2ZW50XSA9PT0gaW5UYXJnZXRFbGVtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuXG4gIGFzeW5jIHJlcXVlc3RQb2ludGVyTG9jayhpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUHJvbWlzZTxJUmVzdWx0PiB7XG4gICAgaWYgKHRoaXMuaXNQb2ludGVyTG9ja2VkKGluVGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnZWxlbWVudCBhbHJlYWR5IGxvY2tlZCcgfTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplKCk7XG5cbiAgICBpZiAodGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPiAwKSB7XG4gICAgICBjb25zdCBlbGFwc2VkU2VjVGltZSA9XG4gICAgICAgIChEYXRlLm5vdygpIC0gdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UpIC8gMTAwMDtcblxuICAgICAgLy8gY29uc29sZS5sb2coXCJlbGFwc2VkU2VjVGltZSAxXCIsIGVsYXBzZWRTZWNUaW1lKTtcblxuICAgICAgaWYgKGVsYXBzZWRTZWNUaW1lIDwgMS4xKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogYHJlcXVlc3QgZm9yIGxvY2sgd2FzIHRvbyBlYXJseSwgdGltZSB0byB3YWl0OiAke2VsYXBzZWRTZWNUaW1lLnRvRml4ZWQoXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKX1zZWNgXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3RpbWVTaW5jZUxhc3RMb2NrQ2hhbmdlID0gRGF0ZS5ub3coKTtcblxuICAgIGZvciAoY29uc3QgY3VyckV2ZW50IG9mIGFsbFJlcXVlc3RFdmVudHMpIHtcbiAgICAgIGlmIChjdXJyRXZlbnQgaW4gaW5UYXJnZXRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgLy8gbW9yZSBhY2N1cmF0ZSBieSBkaXNhYmxpbmcgT1MtbGV2ZWwgYWRqdXN0ZWQgbW91c2UgbW92ZW1lbnRzXG4gICAgICAgICAgdW5hZGp1c3RlZE1vdmVtZW50OiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhY3R1YWwgcmVxdWVzdFwiKTtcblxuICAgICAgICAgIGF3YWl0IChpblRhcmdldEVsZW1lbnQgYXMgYW55KVtjdXJyRXZlbnRdKG9wdGlvbnMpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVSUlwiLCBlcnIpO1xuXG4gICAgICAgICAgY29uc3QgZWxhcHNlZFNlY1RpbWUgPVxuICAgICAgICAgICAgKERhdGUubm93KCkgLSB0aGlzLl90aW1lU2luY2VMYXN0TG9ja0NoYW5nZSkgLyAxMDAwO1xuXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJlbGFwc2VkU2VjVGltZSAyXCIsIGVsYXBzZWRTZWNUaW1lKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGByZXF1ZXN0IGZvciBsb2NrIHdhcyB0b28gZWFybHksIHRpbWUgdG8gd2FpdDogJHtlbGFwc2VkU2VjVGltZS50b0ZpeGVkKFxuICAgICAgICAgICAgICAyXG4gICAgICAgICAgICApfXNlY2BcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGltZVNpbmNlTGFzdExvY2tDaGFuZ2UgPSBEYXRlLm5vdygpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRpbWVyIHJlc2V0XCIpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICdyZXF1ZXN0IGZvciBsb2NrIGRvbmUnIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1bnN1cHBvcnRlZCByZXF1ZXN0IGZvciBsb2NrJyB9O1xuICB9XG5cbiAgLy9cblxuICBhbGxvd1BvaW50ZXJMb2NrZWRPbkNsaWNrRXZlbnQoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChpblRhcmdldEVsZW1lbnQgPT09IHRoaXMuX2xhdGVzdFJlcXVlc3RIdG1sRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2xhdGVzdFJlcXVlc3RIdG1sRWxlbWVudCA9IGluVGFyZ2V0RWxlbWVudDtcblxuICAgIGNvbnN0IG9uQ2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpblRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXF1ZXN0UG9pbnRlckxvY2soaW5UYXJnZXRFbGVtZW50KTtcblxuICAgICAgdGhpcy5fbGF0ZXN0UmVxdWVzdEh0bWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuYWxsb3dQb2ludGVyTG9ja2VkT25DbGlja0V2ZW50KGluVGFyZ2V0RWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuICB9XG5cbiAgLy9cblxuICBleGl0UG9pbnRlckxvY2soKSB7XG4gICAgZm9yIChjb25zdCBjdXJyRXZlbnQgb2YgYWxsRXhpdEV2ZW50cykge1xuICAgICAgaWYgKGN1cnJFdmVudCBpbiBkb2N1bWVudCkge1xuICAgICAgICAoZG9jdW1lbnQgYXMgYW55KVtjdXJyRXZlbnRdKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG5cbiAgYWRkT25Mb2NrQ2hhbmdlKGluQ2FsbGJhY2s6IE9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3MucHVzaChpbkNhbGxiYWNrKTtcbiAgfVxuICByZW1vdmVPbkxvY2tDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25Mb2NrQ2hhbmdlQ2FsbGJhY2tzLmluZGV4T2YoaW5DYWxsYmFjayk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vbkxvY2tDaGFuZ2VDYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8vXG5cbiAgYWRkT25Mb2NrRXJyb3IoaW5DYWxsYmFjazogT25FcnJvckNhbGxiYWNrKSB7XG4gICAgdGhpcy5fb25Mb2NrRXJyb3JDYWxsYmFja3MucHVzaChpbkNhbGxiYWNrKTtcbiAgfVxuICByZW1vdmVPbkxvY2tFcnJvcihpbkNhbGxiYWNrOiBPbkVycm9yQ2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX29uTG9ja0Vycm9yQ2FsbGJhY2tzLmluZGV4T2YoaW5DYWxsYmFjayk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vbkxvY2tFcnJvckNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLy9cblxuICByZW1vdmVBbGxDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5fb25Mb2NrQ2hhbmdlQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fb25Mb2NrRXJyb3JDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgfVxufVxuXG5jb25zdCBHbG9iYWxQb2ludGVyTG9ja01hbmFnZXIgPSBuZXcgUG9pbnRlckxvY2tNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbFBvaW50ZXJMb2NrTWFuYWdlciB9O1xuIiwKICAiY2xhc3MgVG91Y2hEYXRhIHtcbiAgcHVibGljIGlkOiBudW1iZXI7XG4gIHB1YmxpYyBjcmVhdGVkQXQgPSBEYXRlLm5vdygpO1xuICBwdWJsaWMgcG9zaXRpb25YOiBudW1iZXI7XG4gIHB1YmxpYyBwb3NpdGlvblk6IG51bWJlcjtcbiAgcHVibGljIGRlbHRhWDogbnVtYmVyID0gMDtcbiAgcHVibGljIGRlbHRhWTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBwb3NpdGlvblg6IG51bWJlciwgcG9zaXRpb25ZOiBudW1iZXIpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5wb3NpdGlvblggPSBwb3NpdGlvblg7XG4gICAgdGhpcy5wb3NpdGlvblkgPSBwb3NpdGlvblk7XG4gIH1cblxuICByZXNldERlbHRhKCkge1xuICAgIHRoaXMuZGVsdGFYID0gMDtcbiAgICB0aGlzLmRlbHRhWSA9IDA7XG4gIH1cbn1cblxuY2xhc3MgVG91Y2hNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2FsbFRvdWNoRGF0YU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUb3VjaERhdGE+KCk7XG4gIHByaXZhdGUgX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5OiBUb3VjaERhdGFbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2hhbmRsZVRvdWNoU3RhcnQ6IChldmVudDogVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hFbmQ6IChldmVudDogVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hNb3ZlOiAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG5cbiAgcHJpdmF0ZSBfb25FdmVudDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICh0aGlzLl9vbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uRXZlbnQoKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIsIHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaWldO1xuICAgICAgICBjb25zdCBuZXdEYXRhID0gbmV3IFRvdWNoRGF0YShpZGVudGlmaWVyLCBwYWdlWCwgcGFnZVkpO1xuXG4gICAgICAgIHRoaXMuX2FsbFRvdWNoRGF0YU1hcC5zZXQoYCR7aWRlbnRpZmllcn1gLCBuZXdEYXRhKTtcbiAgICAgICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAodGhpcy5fb25FdmVudCkge1xuICAgICAgICB0aGlzLl9vbkV2ZW50KCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyIH0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpaV07XG5cbiAgICAgICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmRlbGV0ZShgJHtpZGVudGlmaWVyfWApO1xuICAgICAgICB0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheS5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAodGhpcy5fb25FdmVudCkge1xuICAgICAgICB0aGlzLl9vbkV2ZW50KCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyLCBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2lpXTtcblxuICAgICAgICBjb25zdCBjdXJyRGF0YSA9IHRoaXMuX2FsbFRvdWNoRGF0YU1hcC5nZXQoYCR7aWRlbnRpZmllcn1gKTtcbiAgICAgICAgaWYgKCFjdXJyRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsdGFYID0gcGFnZVggLSBjdXJyRGF0YS5wb3NpdGlvblg7XG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IHBhZ2VZIC0gY3VyckRhdGEucG9zaXRpb25ZO1xuXG4gICAgICAgIGN1cnJEYXRhLmRlbHRhWCArPSBkZWx0YVg7XG4gICAgICAgIGN1cnJEYXRhLmRlbHRhWSArPSBkZWx0YVk7XG4gICAgICAgIGN1cnJEYXRhLnBvc2l0aW9uWCA9IHBhZ2VYO1xuICAgICAgICBjdXJyRGF0YS5wb3NpdGlvblkgPSBwYWdlWTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5faGFuZGxlVG91Y2hTdGFydCA9IGhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVUb3VjaEVuZCA9IGhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlVG91Y2hNb3ZlID0gaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBpc1N1cHBvcnRlZChpblRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGluVGFyZ2V0RWxlbWVudDtcbiAgfVxuXG4gIGFjdGl2YXRlKGluVGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQoaW5UYXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmNsZWFyKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlVG91Y2hFbmQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlLCB7XG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoaW5UYXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWxsVG91Y2hEYXRhTWFwLmNsZWFyKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5faGFuZGxlVG91Y2hTdGFydCk7XG4gICAgaW5UYXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlVG91Y2hFbmQpO1xuICAgIGluVGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX2hhbmRsZVRvdWNoRW5kKTtcbiAgICBpblRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVmcmVzaENhY2hlKCkge1xuICAgIGlmICh0aGlzLl9hbGxDYWNoZWRUb3VjaERhdGFBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5ID0gWy4uLnRoaXMuX2FsbFRvdWNoRGF0YU1hcC52YWx1ZXMoKV07XG4gICAgfVxuICB9XG5cbiAgZ2V0VG91Y2hEYXRhKCk6IFJlYWRvbmx5QXJyYXk8VG91Y2hEYXRhPiB7XG4gICAgdGhpcy5fcmVmcmVzaENhY2hlKCk7XG4gICAgcmV0dXJuIHRoaXMuX2FsbENhY2hlZFRvdWNoRGF0YUFycmF5O1xuICB9XG5cbiAgcmVzZXREZWx0YXMoKSB7XG4gICAgdGhpcy5fcmVmcmVzaENhY2hlKCk7XG4gICAgdGhpcy5fYWxsQ2FjaGVkVG91Y2hEYXRhQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5yZXNldERlbHRhKCkpO1xuICB9XG5cbiAgb25FdmVudChjYWxsYmFjazogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fb25FdmVudCA9IGNhbGxiYWNrO1xuICB9XG5cbn1cblxuLy9cbi8vXG4vL1xuXG5jb25zdCBHbG9iYWxUb3VjaE1hbmFnZXIgPSBuZXcgVG91Y2hNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbFRvdWNoTWFuYWdlciB9O1xuIiwKICAidHlwZSBPbkNoYW5nZUNhbGxiYWNrID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcblxuY2xhc3MgVmlzaWJpbGl0eU1hbmFnZXIge1xuICBwcml2YXRlIF9hY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzOiBPbkNoYW5nZUNhbGxiYWNrW10gPSBbXTtcblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZSgpO1xuICAgICAgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PlxuICAgICAgICBjYWxsYmFjayhpc1Zpc2libGUpXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlID0gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAndmlzaWJpbGl0eWNoYW5nZScsXG4gICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgJ3Zpc2liaWxpdHljaGFuZ2UnLFxuICAgICAgdGhpcy5faGFuZGxlVmlzaWJpbGl0eUNoYW5nZSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy9cblxuICBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gJ29udmlzaWJpbGl0eWNoYW5nZScgaW4gZG9jdW1lbnQ7XG4gIH1cblxuICAvL1xuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZSc7XG4gIH1cblxuICAvL1xuXG4gIGFkZFZpc2liaWxpdHlDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZUNhbGxiYWNrcy5wdXNoKGluQ2FsbGJhY2spO1xuICB9XG4gIHJlbW92ZVZpc2liaWxpdHlDaGFuZ2UoaW5DYWxsYmFjazogT25DaGFuZ2VDYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlQ2FsbGJhY2tzLmluZGV4T2YoaW5DYWxsYmFjayk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VDYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8vXG5cbiAgcmVtb3ZlQWxsQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZUNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICB9XG59XG5cbmNvbnN0IEdsb2JhbFZpc2liaWxpdHlNYW5hZ2VyID0gbmV3IFZpc2liaWxpdHlNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IEdsb2JhbFZpc2liaWxpdHlNYW5hZ2VyIH07XG4iLAogICJleHBvcnQgY29uc3QgaXNXZWJXb3JrZXJTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhIXdpbmRvdy5Xb3JrZXI7XG59O1xuIiwKICAiZXhwb3J0IGNvbnN0IGlzV2ViR0wyU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gISF3aW5kb3cuV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcbn07XG4iLAogICJleHBvcnQgY29uc3QgZGVncmVlVG9SYWQgPSAoYW5nbGU6IG51bWJlcik6IG51bWJlciA9PiAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcbiIsCiAgIi8qKlxuICogQ29tbW9uIHV0aWxpdGllc1xuICogQG1vZHVsZSBnbE1hdHJpeFxuICovXG4vLyBDb25maWd1cmF0aW9uIENvbnN0YW50c1xuZXhwb3J0IHZhciBFUFNJTE9OID0gMC4wMDAwMDE7XG5leHBvcnQgdmFyIEFSUkFZX1RZUEUgPSB0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSAndW5kZWZpbmVkJyA/IEZsb2F0MzJBcnJheSA6IEFycmF5O1xuZXhwb3J0IHZhciBSQU5ET00gPSBNYXRoLnJhbmRvbTtcbi8qKlxuICogU2V0cyB0aGUgdHlwZSBvZiBhcnJheSB1c2VkIHdoZW4gY3JlYXRpbmcgbmV3IHZlY3RvcnMgYW5kIG1hdHJpY2VzXG4gKlxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvciB8IEFycmF5Q29uc3RydWN0b3J9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF0cml4QXJyYXlUeXBlKHR5cGUpIHtcbiAgQVJSQVlfVFlQRSA9IHR5cGU7XG59XG52YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcbi8qKlxuICogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGEgQW5nbGUgaW4gRGVncmVlc1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0b1JhZGlhbihhKSB7XG4gIHJldHVybiBhICogZGVncmVlO1xufVxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCB0aGUgYXJndW1lbnRzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSB2YWx1ZSwgd2l0aGluIGFuIGFic29sdXRlXG4gKiBvciByZWxhdGl2ZSB0b2xlcmFuY2Ugb2YgZ2xNYXRyaXguRVBTSUxPTiAoYW4gYWJzb2x1dGUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIHZhbHVlcyBsZXNzXG4gKiB0aGFuIG9yIGVxdWFsIHRvIDEuMCwgYW5kIGEgcmVsYXRpdmUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIGxhcmdlciB2YWx1ZXMpXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCBudW1iZXIgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcbn1cbmlmICghTWF0aC5oeXBvdCkgTWF0aC5oeXBvdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHkgPSAwLFxuICAgICAgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIHkgKz0gYXJndW1lbnRzW2ldICogYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydCh5KTtcbn07IiwKICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcbiAqIDR4NCBNYXRyaXg8YnI+Rm9ybWF0OiBjb2x1bW4tbWFqb3IsIHdoZW4gdHlwZWQgb3V0IGl0IGxvb2tzIGxpa2Ugcm93LW1ham9yPGJyPlRoZSBtYXRyaWNlcyBhcmUgYmVpbmcgcG9zdCBtdWx0aXBsaWVkLlxuICogQG1vZHVsZSBtYXQ0XG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICB9XG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgb3V0WzRdID0gYVs0XTtcbiAgb3V0WzVdID0gYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgb3V0WzldID0gYVs5XTtcbiAgb3V0WzEwXSA9IGFbMTBdO1xuICBvdXRbMTFdID0gYVsxMV07XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICBvdXRbOV0gPSBhWzldO1xuICBvdXRbMTBdID0gYVsxMF07XG4gIG91dFsxMV0gPSBhWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0NCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gQSBuZXcgbWF0NFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCBhIG1hdDQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKG91dCwgYSkge1xuICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gIGlmIChvdXQgPT09IGEpIHtcbiAgICB2YXIgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIzID0gYVsxMV07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGEwMTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGEwMjtcbiAgICBvdXRbOV0gPSBhMTI7XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhMDM7XG4gICAgb3V0WzEzXSA9IGExMztcbiAgICBvdXRbMTRdID0gYTIzO1xuICB9IGVsc2Uge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGFbMV07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGFbMl07XG4gICAgb3V0WzldID0gYVs2XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhWzNdO1xuICAgIG91dFsxM10gPSBhWzddO1xuICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICBpZiAoIWRldCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZGV0ID0gMS4wIC8gZGV0O1xuICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkam9pbnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICBvdXRbMF0gPSBhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMik7XG4gIG91dFsxXSA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgb3V0WzJdID0gYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpO1xuICBvdXRbM10gPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs0XSA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgb3V0WzVdID0gYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpO1xuICBvdXRbNl0gPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs3XSA9IGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKTtcbiAgb3V0WzhdID0gYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpO1xuICBvdXRbOV0gPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gIG91dFsxMF0gPSBhMDAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSk7XG4gIG91dFsxMV0gPSAtKGEwMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gIG91dFsxM10gPSBhMDAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSk7XG4gIG91dFsxNF0gPSAtKGEwMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gIG91dFsxNV0gPSBhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xufVxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0c1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTsgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG5cbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgb3V0WzBdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzNdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls0XTtcbiAgYjEgPSBiWzVdO1xuICBiMiA9IGJbNl07XG4gIGIzID0gYls3XTtcbiAgb3V0WzRdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFs1XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbNl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzddID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls4XTtcbiAgYjEgPSBiWzldO1xuICBiMiA9IGJbMTBdO1xuICBiMyA9IGJbMTFdO1xuICBvdXRbOF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzldID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsxMF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzExXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICBiMCA9IGJbMTJdO1xuICBiMSA9IGJbMTNdO1xuICBiMiA9IGJbMTRdO1xuICBiMyA9IGJbMTVdO1xuICBvdXRbMTJdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxM10gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzE0XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbMTVdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgaWYgKGEgPT09IG91dCkge1xuICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICB9IGVsc2Uge1xuICAgIGEwMCA9IGFbMF07XG4gICAgYTAxID0gYVsxXTtcbiAgICBhMDIgPSBhWzJdO1xuICAgIGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTtcbiAgICBhMTEgPSBhWzVdO1xuICAgIGExMiA9IGFbNl07XG4gICAgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdO1xuICAgIGEyMSA9IGFbOV07XG4gICAgYTIyID0gYVsxMF07XG4gICAgYTIzID0gYVsxMV07XG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG4gICAgb3V0WzNdID0gYTAzO1xuICAgIG91dFs0XSA9IGExMDtcbiAgICBvdXRbNV0gPSBhMTE7XG4gICAgb3V0WzZdID0gYTEyO1xuICAgIG91dFs3XSA9IGExMztcbiAgICBvdXRbOF0gPSBhMjA7XG4gICAgb3V0WzldID0gYTIxO1xuICAgIG91dFsxMF0gPSBhMjI7XG4gICAgb3V0WzExXSA9IGEyMztcbiAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdGhlIHZlYzMgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICoqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIG91dFswXSA9IGFbMF0gKiB4O1xuICBvdXRbMV0gPSBhWzFdICogeDtcbiAgb3V0WzJdID0gYVsyXSAqIHg7XG4gIG91dFszXSA9IGFbM10gKiB4O1xuICBvdXRbNF0gPSBhWzRdICogeTtcbiAgb3V0WzVdID0gYVs1XSAqIHk7XG4gIG91dFs2XSA9IGFbNl0gKiB5O1xuICBvdXRbN10gPSBhWzddICogeTtcbiAgb3V0WzhdID0gYVs4XSAqIHo7XG4gIG91dFs5XSA9IGFbOV0gKiB6O1xuICBvdXRbMTBdID0gYVsxMF0gKiB6O1xuICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICB5ID0gYXhpc1sxXSxcbiAgICAgIHogPSBheGlzWzJdO1xuICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgdmFyIHMsIGMsIHQ7XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG4gIHZhciBiMDAsIGIwMSwgYjAyO1xuICB2YXIgYjEwLCBiMTEsIGIxMjtcbiAgdmFyIGIyMCwgYjIxLCBiMjI7XG5cbiAgaWYgKGxlbiA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxlbiA9IDEgLyBsZW47XG4gIHggKj0gbGVuO1xuICB5ICo9IGxlbjtcbiAgeiAqPSBsZW47XG4gIHMgPSBNYXRoLnNpbihyYWQpO1xuICBjID0gTWF0aC5jb3MocmFkKTtcbiAgdCA9IDEgLSBjO1xuICBhMDAgPSBhWzBdO1xuICBhMDEgPSBhWzFdO1xuICBhMDIgPSBhWzJdO1xuICBhMDMgPSBhWzNdO1xuICBhMTAgPSBhWzRdO1xuICBhMTEgPSBhWzVdO1xuICBhMTIgPSBhWzZdO1xuICBhMTMgPSBhWzddO1xuICBhMjAgPSBhWzhdO1xuICBhMjEgPSBhWzldO1xuICBhMjIgPSBhWzEwXTtcbiAgYTIzID0gYVsxMV07IC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuXG4gIGIwMCA9IHggKiB4ICogdCArIGM7XG4gIGIwMSA9IHkgKiB4ICogdCArIHogKiBzO1xuICBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7XG4gIGIxMSA9IHkgKiB5ICogdCArIGM7XG4gIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICBiMjAgPSB4ICogeiAqIHQgKyB5ICogcztcbiAgYjIxID0geSAqIHogKiB0IC0geCAqIHM7XG4gIGIyMiA9IHogKiB6ICogdCArIGM7IC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF07XG4gIHZhciBhMjEgPSBhWzldO1xuICB2YXIgYTIyID0gYVsxMF07XG4gIHZhciBhMjMgPSBhWzExXTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGEwMCA9IGFbMF07XG4gIHZhciBhMDEgPSBhWzFdO1xuICB2YXIgYTAyID0gYVsyXTtcbiAgdmFyIGEwMyA9IGFbM107XG4gIHZhciBhMjAgPSBhWzhdO1xuICB2YXIgYTIxID0gYVs5XTtcbiAgdmFyIGEyMiA9IGFbMTBdO1xuICB2YXIgYTIzID0gYVsxMV07XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMDAgPSBhWzBdO1xuICB2YXIgYTAxID0gYVsxXTtcbiAgdmFyIGEwMiA9IGFbMl07XG4gIHZhciBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UcmFuc2xhdGlvbihvdXQsIHYpIHtcbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBTY2FsaW5nIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgb3V0WzBdID0gdlswXTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gdlsxXTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IHZbMl07XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIGEgZ2l2ZW4gYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkLCBheGlzKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgdmFyIHggPSBheGlzWzBdLFxuICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICB6ID0gYXhpc1syXTtcbiAgdmFyIGxlbiA9IE1hdGguaHlwb3QoeCwgeSwgeik7XG4gIHZhciBzLCBjLCB0O1xuXG4gIGlmIChsZW4gPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZW4gPSAxIC8gbGVuO1xuICB4ICo9IGxlbjtcbiAgeSAqPSBsZW47XG4gIHogKj0gbGVuO1xuICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgYyA9IE1hdGguY29zKHJhZCk7XG4gIHQgPSAxIC0gYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSB4ICogeCAqIHQgKyBjO1xuICBvdXRbMV0gPSB5ICogeCAqIHQgKyB6ICogcztcbiAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHggKiB5ICogdCAtIHogKiBzO1xuICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICBvdXRbNl0gPSB6ICogeSAqIHQgKyB4ICogcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gIG91dFs5XSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICBvdXRbMTBdID0geiAqIHogKiB0ICsgYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAqXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWFJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gYztcbiAgb3V0WzZdID0gcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gLXM7XG4gIG91dFsxMF0gPSBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQucm90YXRlWShkZXN0LCBkZXN0LCByYWQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21ZUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBjO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAtcztcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gcztcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC5yb3RhdGVaKGRlc3QsIGRlc3QsIHJhZCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVpSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGM7XG4gIG91dFsxXSA9IHM7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IC1zO1xuICBvdXRbNV0gPSBjO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB4eSA9IHggKiB5MjtcbiAgdmFyIHh6ID0geCAqIHoyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB5eiA9IHkgKiB6MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICBvdXRbMV0gPSB4eSArIHd6O1xuICBvdXRbMl0gPSB4eiAtIHd5O1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB4eSAtIHd6O1xuICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICBvdXRbNl0gPSB5eiArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4eiArIHd5O1xuICBvdXRbOV0gPSB5eiAtIHd4O1xuICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgZnJvbSBhIGR1YWwgcXVhdC5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBNYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBEdWFsIFF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21RdWF0MihvdXQsIGEpIHtcbiAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIHZhciBieCA9IC1hWzBdLFxuICAgICAgYnkgPSAtYVsxXSxcbiAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICBidyA9IGFbM10sXG4gICAgICBheCA9IGFbNF0sXG4gICAgICBheSA9IGFbNV0sXG4gICAgICBheiA9IGFbNl0sXG4gICAgICBhdyA9IGFbN107XG4gIHZhciBtYWduaXR1ZGUgPSBieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnogKyBidyAqIGJ3OyAvL09ubHkgc2NhbGUgaWYgaXQgbWFrZXMgc2Vuc2VcblxuICBpZiAobWFnbml0dWRlID4gMCkge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMiAvIG1hZ25pdHVkZTtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyIC8gbWFnbml0dWRlO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMjtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDI7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyO1xuICB9XG5cbiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBhLCB0cmFuc2xhdGlvbik7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbixcbiAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24ob3V0LCBtYXQpIHtcbiAgb3V0WzBdID0gbWF0WzEyXTtcbiAgb3V0WzFdID0gbWF0WzEzXTtcbiAgb3V0WzJdID0gbWF0WzE0XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb25cbiAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZVxuICogIHdpdGggYSBub3JtYWxpemVkIFF1YXRlcm5pb24gcGFyYW10ZXIsIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZVxuICogIHRoZSBzYW1lIGFzIHRoZSBzY2FsaW5nIHZlY3RvclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGluZyhvdXQsIG1hdCkge1xuICB2YXIgbTExID0gbWF0WzBdO1xuICB2YXIgbTEyID0gbWF0WzFdO1xuICB2YXIgbTEzID0gbWF0WzJdO1xuICB2YXIgbTIxID0gbWF0WzRdO1xuICB2YXIgbTIyID0gbWF0WzVdO1xuICB2YXIgbTIzID0gbWF0WzZdO1xuICB2YXIgbTMxID0gbWF0WzhdO1xuICB2YXIgbTMyID0gbWF0WzldO1xuICB2YXIgbTMzID0gbWF0WzEwXTtcbiAgb3V0WzBdID0gTWF0aC5oeXBvdChtMTEsIG0xMiwgbTEzKTtcbiAgb3V0WzFdID0gTWF0aC5oeXBvdChtMjEsIG0yMiwgbTIzKTtcbiAgb3V0WzJdID0gTWF0aC5oeXBvdChtMzEsIG0zMiwgbTMzKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByb3RhdGlvbmFsIGNvbXBvbmVudFxuICogIG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoXG4gKiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sIHRoZSByZXR1cm5lZCBxdWF0ZXJuaW9uIHdpbGwgYmUgdGhlXG4gKiAgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBvcmlnaW5hbGx5IHN1cHBsaWVkLlxuICogQHBhcmFtIHtxdWF0fSBvdXQgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICogQHJldHVybiB7cXVhdH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdGF0aW9uKG91dCwgbWF0KSB7XG4gIHZhciBzY2FsaW5nID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIGdldFNjYWxpbmcoc2NhbGluZywgbWF0KTtcbiAgdmFyIGlzMSA9IDEgLyBzY2FsaW5nWzBdO1xuICB2YXIgaXMyID0gMSAvIHNjYWxpbmdbMV07XG4gIHZhciBpczMgPSAxIC8gc2NhbGluZ1syXTtcbiAgdmFyIHNtMTEgPSBtYXRbMF0gKiBpczE7XG4gIHZhciBzbTEyID0gbWF0WzFdICogaXMyO1xuICB2YXIgc20xMyA9IG1hdFsyXSAqIGlzMztcbiAgdmFyIHNtMjEgPSBtYXRbNF0gKiBpczE7XG4gIHZhciBzbTIyID0gbWF0WzVdICogaXMyO1xuICB2YXIgc20yMyA9IG1hdFs2XSAqIGlzMztcbiAgdmFyIHNtMzEgPSBtYXRbOF0gKiBpczE7XG4gIHZhciBzbTMyID0gbWF0WzldICogaXMyO1xuICB2YXIgc20zMyA9IG1hdFsxMF0gKiBpczM7XG4gIHZhciB0cmFjZSA9IHNtMTEgKyBzbTIyICsgc20zMztcbiAgdmFyIFMgPSAwO1xuXG4gIGlmICh0cmFjZSA+IDApIHtcbiAgICBTID0gTWF0aC5zcXJ0KHRyYWNlICsgMS4wKSAqIDI7XG4gICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgb3V0WzBdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgb3V0WzFdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMTEgLSBzbTIyIC0gc20zMykgKiAyO1xuICAgIG91dFszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgIG91dFsxXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgIG91dFsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICB9IGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTIyIC0gc20xMSAtIHNtMzMpICogMjtcbiAgICBvdXRbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICBvdXRbMF0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICBvdXRbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgfSBlbHNlIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMzMgLSBzbTExIC0gc20yMikgKiAyO1xuICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgIG91dFswXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgIG91dFsxXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGVcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUob3V0LCBxLCB2LCBzKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICBvdXRbMV0gPSAoeHkgKyB3eikgKiBzeDtcbiAgb3V0WzJdID0gKHh6IC0gd3kpICogc3g7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9ICh4eSAtIHd6KSAqIHN5O1xuICBvdXRbNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgb3V0WzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlLCByb3RhdGluZyBhbmQgc2NhbGluZyBhcm91bmQgdGhlIGdpdmVuIG9yaWdpblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBvcmlnaW4pO1xuICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG5lZ2F0aXZlT3JpZ2luKTtcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBvIFRoZSBvcmlnaW4gdmVjdG9yIGFyb3VuZCB3aGljaCB0byBzY2FsZSBhbmQgcm90YXRlXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4ob3V0LCBxLCB2LCBzLCBvKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIHZhciBveCA9IG9bMF07XG4gIHZhciBveSA9IG9bMV07XG4gIHZhciBveiA9IG9bMl07XG4gIHZhciBvdXQwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIHZhciBvdXQxID0gKHh5ICsgd3opICogc3g7XG4gIHZhciBvdXQyID0gKHh6IC0gd3kpICogc3g7XG4gIHZhciBvdXQ0ID0gKHh5IC0gd3opICogc3k7XG4gIHZhciBvdXQ1ID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gIHZhciBvdXQ2ID0gKHl6ICsgd3gpICogc3k7XG4gIHZhciBvdXQ4ID0gKHh6ICsgd3kpICogc3o7XG4gIHZhciBvdXQ5ID0gKHl6IC0gd3gpICogc3o7XG4gIHZhciBvdXQxMCA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMF0gPSBvdXQwO1xuICBvdXRbMV0gPSBvdXQxO1xuICBvdXRbMl0gPSBvdXQyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSBvdXQ0O1xuICBvdXRbNV0gPSBvdXQ1O1xuICBvdXRbNl0gPSBvdXQ2O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSBvdXQ4O1xuICBvdXRbOV0gPSBvdXQ5O1xuICBvdXRbMTBdID0gb3V0MTA7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dDAgKiBveCArIG91dDQgKiBveSArIG91dDggKiBveik7XG4gIG91dFsxM10gPSB2WzFdICsgb3kgLSAob3V0MSAqIG94ICsgb3V0NSAqIG95ICsgb3V0OSAqIG96KTtcbiAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXQyICogb3ggKyBvdXQ2ICogb3kgKyBvdXQxMCAqIG96KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgYSA0eDQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeXggPSB5ICogeDI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHp4ID0geiAqIHgyO1xuICB2YXIgenkgPSB6ICogeTI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gIG91dFsxXSA9IHl4ICsgd3o7XG4gIG91dFsyXSA9IHp4IC0gd3k7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHl4IC0gd3o7XG4gIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICBvdXRbNl0gPSB6eSArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6eCArIHd5O1xuICBvdXRbOV0gPSB6eSAtIHd4O1xuICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCk7XG4gIHZhciB0YiA9IDEgLyAodG9wIC0gYm90dG9tKTtcbiAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzBdID0gbmVhciAqIDIgKiBybDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gbmVhciAqIDIgKiB0YjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiAyICogbmY7XG4gIG91dFsxNV0gPSAwO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbLTEsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHTC9PcGVuR0wncyBjbGlwIHZvbHVtZS5cbiAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZU5PKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICBuZjtcbiAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gZjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNV0gPSAwO1xuXG4gIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTRdID0gMiAqIGZhciAqIG5lYXIgKiBuZjtcbiAgfSBlbHNlIHtcbiAgICBvdXRbMTBdID0gLTE7XG4gICAgb3V0WzE0XSA9IC0yICogbmVhcjtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5wZXJzcGVjdGl2ZU5PfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBwZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlTk87XG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHN1aXRhYmxlIGZvciBXZWJHUFUgd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZVpPKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICBuZjtcbiAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gZjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNV0gPSAwO1xuXG4gIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMF0gPSBmYXIgKiBuZjtcbiAgICBvdXRbMTRdID0gZmFyICogbmVhciAqIG5mO1xuICB9IGVsc2Uge1xuICAgIG91dFsxMF0gPSAtMTtcbiAgICBvdXRbMTRdID0gLW5lYXI7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBmaWVsZCBvZiB2aWV3LlxuICogVGhpcyBpcyBwcmltYXJpbHkgdXNlZnVsIGZvciBnZW5lcmF0aW5nIHByb2plY3Rpb24gbWF0cmljZXMgdG8gYmUgdXNlZFxuICogd2l0aCB0aGUgc3RpbGwgZXhwZXJpZW1lbnRhbCBXZWJWUiBBUEkuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtPYmplY3R9IGZvdiBPYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHZhbHVlczogdXBEZWdyZWVzLCBkb3duRGVncmVlcywgbGVmdERlZ3JlZXMsIHJpZ2h0RGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICB2YXIgdXBUYW4gPSBNYXRoLnRhbihmb3YudXBEZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIGRvd25UYW4gPSBNYXRoLnRhbihmb3YuZG93bkRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgbGVmdFRhbiA9IE1hdGgudGFuKGZvdi5sZWZ0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciByaWdodFRhbiA9IE1hdGgudGFuKGZvdi5yaWdodERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgeFNjYWxlID0gMi4wIC8gKGxlZnRUYW4gKyByaWdodFRhbik7XG4gIHZhciB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcbiAgb3V0WzBdID0geFNjYWxlO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgb3V0WzNdID0gMC4wO1xuICBvdXRbNF0gPSAwLjA7XG4gIG91dFs1XSA9IHlTY2FsZTtcbiAgb3V0WzZdID0gMC4wO1xuICBvdXRbN10gPSAwLjA7XG4gIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICBvdXRbOV0gPSAodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNTtcbiAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzExXSA9IC0xLjA7XG4gIG91dFsxMl0gPSAwLjA7XG4gIG91dFsxM10gPSAwLjA7XG4gIG91dFsxNF0gPSBmYXIgKiBuZWFyIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMTVdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBvcnRob05PKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gIG91dFswXSA9IC0yICogbHI7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IC0yICogYnQ7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAyICogbmY7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5vcnRob05PfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBvcnRobyA9IG9ydGhvTk87XG4vKipcbiAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb3J0aG9aTyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgdmFyIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMF0gPSAtMiAqIGxyO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAtMiAqIGJ0O1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gbmY7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gIG91dFsxNF0gPSBuZWFyICogbmY7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpcy5cbiAqIElmIHlvdSB3YW50IGEgbWF0cml4IHRoYXQgYWN0dWFsbHkgbWFrZXMgYW4gb2JqZWN0IGxvb2sgYXQgYW5vdGhlciBvYmplY3QsIHlvdSBzaG91bGQgdXNlIHRhcmdldFRvIGluc3RlYWQuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW47XG4gIHZhciBleWV4ID0gZXllWzBdO1xuICB2YXIgZXlleSA9IGV5ZVsxXTtcbiAgdmFyIGV5ZXogPSBleWVbMl07XG4gIHZhciB1cHggPSB1cFswXTtcbiAgdmFyIHVweSA9IHVwWzFdO1xuICB2YXIgdXB6ID0gdXBbMl07XG4gIHZhciBjZW50ZXJ4ID0gY2VudGVyWzBdO1xuICB2YXIgY2VudGVyeSA9IGNlbnRlclsxXTtcbiAgdmFyIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IGdsTWF0cml4LkVQU0lMT04gJiYgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJiBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5KG91dCk7XG4gIH1cblxuICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuICBsZW4gPSAxIC8gTWF0aC5oeXBvdCh6MCwgejEsIHoyKTtcbiAgejAgKj0gbGVuO1xuICB6MSAqPSBsZW47XG4gIHoyICo9IGxlbjtcbiAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgbGVuID0gTWF0aC5oeXBvdCh4MCwgeDEsIHgyKTtcblxuICBpZiAoIWxlbikge1xuICAgIHgwID0gMDtcbiAgICB4MSA9IDA7XG4gICAgeDIgPSAwO1xuICB9IGVsc2Uge1xuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuICBsZW4gPSBNYXRoLmh5cG90KHkwLCB5MSwgeTIpO1xuXG4gIGlmICghbGVuKSB7XG4gICAgeTAgPSAwO1xuICAgIHkxID0gMDtcbiAgICB5MiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB5MCAqPSBsZW47XG4gICAgeTEgKj0gbGVuO1xuICAgIHkyICo9IGxlbjtcbiAgfVxuXG4gIG91dFswXSA9IHgwO1xuICBvdXRbMV0gPSB5MDtcbiAgb3V0WzJdID0gejA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHgxO1xuICBvdXRbNV0gPSB5MTtcbiAgb3V0WzZdID0gejE7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHgyO1xuICBvdXRbOV0gPSB5MjtcbiAgb3V0WzEwXSA9IHoyO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIG1hdHJpeCB0aGF0IG1ha2VzIHNvbWV0aGluZyBsb29rIGF0IHNvbWV0aGluZyBlbHNlLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRhcmdldFRvKG91dCwgZXllLCB0YXJnZXQsIHVwKSB7XG4gIHZhciBleWV4ID0gZXllWzBdLFxuICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICB1cHggPSB1cFswXSxcbiAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgdXB6ID0gdXBbMl07XG4gIHZhciB6MCA9IGV5ZXggLSB0YXJnZXRbMF0sXG4gICAgICB6MSA9IGV5ZXkgLSB0YXJnZXRbMV0sXG4gICAgICB6MiA9IGV5ZXogLSB0YXJnZXRbMl07XG4gIHZhciBsZW4gPSB6MCAqIHowICsgejEgKiB6MSArIHoyICogejI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG4gIH1cblxuICB2YXIgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxLFxuICAgICAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyLFxuICAgICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICBsZW4gPSB4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICBvdXRbMF0gPSB4MDtcbiAgb3V0WzFdID0geDE7XG4gIG91dFsyXSA9IHgyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgb3V0WzVdID0gejIgKiB4MCAtIHowICogeDI7XG4gIG91dFs2XSA9IHowICogeDEgLSB6MSAqIHgwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6MDtcbiAgb3V0WzldID0gejE7XG4gIG91dFsxMF0gPSB6MjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSBleWV4O1xuICBvdXRbMTNdID0gZXlleTtcbiAgb3V0WzE0XSA9IGV5ZXo7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcIm1hdDQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIsIFwiICsgYVs0XSArIFwiLCBcIiArIGFbNV0gKyBcIiwgXCIgKyBhWzZdICsgXCIsIFwiICsgYVs3XSArIFwiLCBcIiArIGFbOF0gKyBcIiwgXCIgKyBhWzldICsgXCIsIFwiICsgYVsxMF0gKyBcIiwgXCIgKyBhWzExXSArIFwiLCBcIiArIGFbMTJdICsgXCIsIFwiICsgYVsxM10gKyBcIiwgXCIgKyBhWzE0XSArIFwiLCBcIiArIGFbMTVdICsgXCIpXCI7XG59XG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb2IoYSkge1xuICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCBhWzZdLCBhWzddLCBhWzhdLCBhWzldLCBhWzEwXSwgYVsxMV0sIGFbMTJdLCBhWzEzXSwgYVsxNF0sIGFbMTVdKTtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0NCdzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgb3V0WzddID0gYVs3XSArIGJbN107XG4gIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF07XG4gIG91dFsxMV0gPSBhWzExXSArIGJbMTFdO1xuICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM107XG4gIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdO1xuICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICBvdXRbNV0gPSBhWzVdIC0gYls1XTtcbiAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICBvdXRbOF0gPSBhWzhdIC0gYls4XTtcbiAgb3V0WzldID0gYVs5XSAtIGJbOV07XG4gIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICBvdXRbMTFdID0gYVsxMV0gLSBiWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdIC0gYlsxMl07XG4gIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICBvdXRbMTRdID0gYVsxNF0gLSBiWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdIC0gYlsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgb3V0WzRdID0gYVs0XSAqIGI7XG4gIG91dFs1XSA9IGFbNV0gKiBiO1xuICBvdXRbNl0gPSBhWzZdICogYjtcbiAgb3V0WzddID0gYVs3XSAqIGI7XG4gIG91dFs4XSA9IGFbOF0gKiBiO1xuICBvdXRbOV0gPSBhWzldICogYjtcbiAgb3V0WzEwXSA9IGFbMTBdICogYjtcbiAgb3V0WzExXSA9IGFbMTFdICogYjtcbiAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgb3V0WzEzXSA9IGFbMTNdICogYjtcbiAgb3V0WzE0XSA9IGFbMTRdICogYjtcbiAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gbWF0NCdzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV0gKiBzY2FsZTtcbiAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgb3V0WzddID0gYVs3XSArIGJbN10gKiBzY2FsZTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF0gKiBzY2FsZTtcbiAgb3V0WzldID0gYVs5XSArIGJbOV0gKiBzY2FsZTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF0gKiBzY2FsZTtcbiAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV0gKiBzY2FsZTtcbiAgb3V0WzEyXSA9IGFbMTJdICsgYlsxMl0gKiBzY2FsZTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM10gKiBzY2FsZTtcbiAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF0gKiBzY2FsZTtcbiAgb3V0WzE1XSA9IGFbMTVdICsgYlsxNV0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF0gJiYgYVs5XSA9PT0gYls5XSAmJiBhWzEwXSA9PT0gYlsxMF0gJiYgYVsxMV0gPT09IGJbMTFdICYmIGFbMTJdID09PSBiWzEyXSAmJiBhWzEzXSA9PT0gYlsxM10gJiYgYVsxNF0gPT09IGJbMTRdICYmIGFbMTVdID09PSBiWzE1XTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGE0ID0gYVs0XSxcbiAgICAgIGE1ID0gYVs1XSxcbiAgICAgIGE2ID0gYVs2XSxcbiAgICAgIGE3ID0gYVs3XTtcbiAgdmFyIGE4ID0gYVs4XSxcbiAgICAgIGE5ID0gYVs5XSxcbiAgICAgIGExMCA9IGFbMTBdLFxuICAgICAgYTExID0gYVsxMV07XG4gIHZhciBhMTIgPSBhWzEyXSxcbiAgICAgIGExMyA9IGFbMTNdLFxuICAgICAgYTE0ID0gYVsxNF0sXG4gICAgICBhMTUgPSBhWzE1XTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgdmFyIGI0ID0gYls0XSxcbiAgICAgIGI1ID0gYls1XSxcbiAgICAgIGI2ID0gYls2XSxcbiAgICAgIGI3ID0gYls3XTtcbiAgdmFyIGI4ID0gYls4XSxcbiAgICAgIGI5ID0gYls5XSxcbiAgICAgIGIxMCA9IGJbMTBdLFxuICAgICAgYjExID0gYlsxMV07XG4gIHZhciBiMTIgPSBiWzEyXSxcbiAgICAgIGIxMyA9IGJbMTNdLFxuICAgICAgYjE0ID0gYlsxNF0sXG4gICAgICBiMTUgPSBiWzE1XTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpICYmIE1hdGguYWJzKGE5IC0gYjkpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJiBNYXRoLmFicyhhMTAgLSBiMTApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMCksIE1hdGguYWJzKGIxMCkpICYmIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTExKSwgTWF0aC5hYnMoYjExKSkgJiYgTWF0aC5hYnMoYTEyIC0gYjEyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJiBNYXRoLmFicyhhMTMgLSBiMTMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMyksIE1hdGguYWJzKGIxMykpICYmIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE0KSwgTWF0aC5hYnMoYjE0KSkgJiYgTWF0aC5hYnMoYTE1IC0gYjE1KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKTtcbn1cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0LnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDsiLAogICJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxuICogMyBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBtb2R1bGUgdmVjM1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjM1xuICpcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeik7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSwgeikge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSwgeikge1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNlaWxcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2VpbChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIHJvdW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMzIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gIG91dFswXSA9IC1hWzBdO1xuICBvdXRbMV0gPSAtYVsxXTtcbiAgb3V0WzJdID0gLWFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogejtcblxuICBpZiAobGVuID4gMCkge1xuICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcbn1cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdO1xuICB2YXIgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdO1xuICBvdXRbMF0gPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgb3V0WzFdID0gYXogKiBieCAtIGF4ICogYno7XG4gIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF07XG4gIHZhciBheSA9IGFbMV07XG4gIHZhciBheiA9IGFbMl07XG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFBlcmZvcm1zIGEgaGVybWl0ZSBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaGVybWl0ZShvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgdmFyIGZhY3RvclRpbWVzMiA9IHQgKiB0O1xuICB2YXIgZmFjdG9yMSA9IGZhY3RvclRpbWVzMiAqICgyICogdCAtIDMpICsgMTtcbiAgdmFyIGZhY3RvcjIgPSBmYWN0b3JUaW1lczIgKiAodCAtIDIpICsgdDtcbiAgdmFyIGZhY3RvcjMgPSBmYWN0b3JUaW1lczIgKiAodCAtIDEpO1xuICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqICgzIC0gMiAqIHQpO1xuICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBQZXJmb3JtcyBhIGJlemllciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYmV6aWVyKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgaW52ZXJzZUZhY3RvciA9IDEgLSB0O1xuICB2YXIgaW52ZXJzZUZhY3RvclRpbWVzVHdvID0gaW52ZXJzZUZhY3RvciAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3JUaW1lczIgPSB0ICogdDtcbiAgdmFyIGZhY3RvcjEgPSBpbnZlcnNlRmFjdG9yVGltZXNUd28gKiBpbnZlcnNlRmFjdG9yO1xuICB2YXIgZmFjdG9yMiA9IDMgKiB0ICogaW52ZXJzZUZhY3RvclRpbWVzVHdvO1xuICB2YXIgZmFjdG9yMyA9IDMgKiBmYWN0b3JUaW1lczIgKiBpbnZlcnNlRmFjdG9yO1xuICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqIHQ7XG4gIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgdmFyIHogPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIuMCAtIDEuMDtcbiAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAgLSB6ICogeikgKiBzY2FsZTtcbiAgb3V0WzBdID0gTWF0aC5jb3MocikgKiB6U2NhbGU7XG4gIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlO1xuICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07XG4gIHZhciB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuICB3ID0gdyB8fCAxLjA7XG4gIG91dFswXSA9IChtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSkgLyB3O1xuICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10pIC8gdztcbiAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSkgLyB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gdGhlIDN4MyBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgb3V0WzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIHogKiBtWzZdO1xuICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgcXVhdFxuICogQ2FuIGFsc28gYmUgdXNlZCBmb3IgZHVhbCBxdWF0ZXJuaW9ucy4gKE11bHRpcGx5IGl0IHdpdGggdGhlIHJlYWwgcGFydClcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgLy8gYmVuY2htYXJrczogaHR0cHM6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zLWZpeGVkXG4gIHZhciBxeCA9IHFbMF0sXG4gICAgICBxeSA9IHFbMV0sXG4gICAgICBxeiA9IHFbMl0sXG4gICAgICBxdyA9IHFbM107XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07IC8vIHZhciBxdmVjID0gW3F4LCBxeSwgcXpdO1xuICAvLyB2YXIgdXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCBhKTtcblxuICB2YXIgdXZ4ID0gcXkgKiB6IC0gcXogKiB5LFxuICAgICAgdXZ5ID0gcXogKiB4IC0gcXggKiB6LFxuICAgICAgdXZ6ID0gcXggKiB5IC0gcXkgKiB4OyAvLyB2YXIgdXV2ID0gdmVjMy5jcm9zcyhbXSwgcXZlYywgdXYpO1xuXG4gIHZhciB1dXZ4ID0gcXkgKiB1dnogLSBxeiAqIHV2eSxcbiAgICAgIHV1dnkgPSBxeiAqIHV2eCAtIHF4ICogdXZ6LFxuICAgICAgdXV2eiA9IHF4ICogdXZ5IC0gcXkgKiB1dng7IC8vIHZlYzMuc2NhbGUodXYsIHV2LCAyICogdyk7XG5cbiAgdmFyIHcyID0gcXcgKiAyO1xuICB1dnggKj0gdzI7XG4gIHV2eSAqPSB3MjtcbiAgdXZ6ICo9IHcyOyAvLyB2ZWMzLnNjYWxlKHV1diwgdXV2LCAyKTtcblxuICB1dXZ4ICo9IDI7XG4gIHV1dnkgKj0gMjtcbiAgdXV2eiAqPSAyOyAvLyByZXR1cm4gdmVjMy5hZGQob3V0LCBhLCB2ZWMzLmFkZChvdXQsIHV2LCB1dXYpKTtcblxuICBvdXRbMF0gPSB4ICsgdXZ4ICsgdXV2eDtcbiAgb3V0WzFdID0geSArIHV2eSArIHV1dnk7XG4gIG91dFsyXSA9IHogKyB1dnogKyB1dXZ6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFswXTtcbiAgclsxXSA9IHBbMV0gKiBNYXRoLmNvcyhyYWQpIC0gcFsyXSAqIE1hdGguc2luKHJhZCk7XG4gIHJbMl0gPSBwWzFdICogTWF0aC5zaW4ocmFkKSArIHBbMl0gKiBNYXRoLmNvcyhyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeS1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMl0gKiBNYXRoLnNpbihyYWQpICsgcFswXSAqIE1hdGguY29zKHJhZCk7XG4gIHJbMV0gPSBwWzFdO1xuICByWzJdID0gcFsyXSAqIE1hdGguY29zKHJhZCkgLSBwWzBdICogTWF0aC5zaW4ocmFkKTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHotYXhpc1xuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzBdICogTWF0aC5jb3MocmFkKSAtIHBbMV0gKiBNYXRoLnNpbihyYWQpO1xuICByWzFdID0gcFswXSAqIE1hdGguc2luKHJhZCkgKyBwWzFdICogTWF0aC5jb3MocmFkKTtcbiAgclsyXSA9IHBbMl07IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDNEIHZlY3RvcnNcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZ2xlKGEsIGIpIHtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICAgIGF5ID0gYVsxXSxcbiAgICAgIGF6ID0gYVsyXSxcbiAgICAgIGJ4ID0gYlswXSxcbiAgICAgIGJ5ID0gYlsxXSxcbiAgICAgIGJ6ID0gYlsyXSxcbiAgICAgIG1hZzEgPSBNYXRoLnNxcnQoYXggKiBheCArIGF5ICogYXkgKyBheiAqIGF6KSxcbiAgICAgIG1hZzIgPSBNYXRoLnNxcnQoYnggKiBieCArIGJ5ICogYnkgKyBieiAqIGJ6KSxcbiAgICAgIG1hZyA9IG1hZzEgKiBtYWcyLFxuICAgICAgY29zaW5lID0gbWFnICYmIGRvdChhLCBiKSAvIG1hZztcbiAgcmV0dXJuIE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkpO1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHplcm9cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwidmVjMyhcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiKVwiO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl07XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSk7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpdiA9IGRpdmlkZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBkaXN0ID0gZGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckRpc3QgPSBzcXVhcmVkRGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGxlbiA9IGxlbmd0aDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgdmFyIGksIGw7XG5cbiAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgc3RyaWRlID0gMztcbiAgICB9XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICBhW2kgKyAyXSA9IHZlY1syXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLAogICJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxuICogNCBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBtb2R1bGUgdmVjNFxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjNFxuICpcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSwgeiwgdykge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIG91dFszXSA9IHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHosIHcpIHtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgb3V0WzNdID0gdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICBvdXRbM10gPSBhWzNdICogYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC8gYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLmNlaWwoYVszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBmbG9vclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5mbG9vcihhWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5mbG9vcihhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWluKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIHJvdW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLnJvdW5kKGFbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTY2FsZXMgYSB2ZWM0IGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgb3V0WzNdID0gYVszXSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEFkZHMgdHdvIHZlYzQncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgdmFyIHcgPSBiWzNdIC0gYVszXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHZhciB3ID0gYlszXSAtIGFbM107XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgdyA9IGFbM107XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHosIHcpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgdyA9IGFbM107XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbn1cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gIG91dFswXSA9IC1hWzBdO1xuICBvdXRbMV0gPSAtYVsxXTtcbiAgb3V0WzJdID0gLWFbMl07XG4gIG91dFszXSA9IC1hWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF07XG4gIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gIG91dFszXSA9IDEuMCAvIGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0geCAqIGxlbjtcbiAgb3V0WzFdID0geSAqIGxlbjtcbiAgb3V0WzJdID0geiAqIGxlbjtcbiAgb3V0WzNdID0gdyAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjcm9zcy1wcm9kdWN0IG9mIHRocmVlIHZlY3RvcnMgaW4gYSA0LWRpbWVuc2lvbmFsIHNwYWNlXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IHJlc3VsdCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFUgdGhlIGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFYgdGhlIHNlY29uZCB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBXIHRoZSB0aGlyZCB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSByZXN1bHRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCB1LCB2LCB3KSB7XG4gIHZhciBBID0gdlswXSAqIHdbMV0gLSB2WzFdICogd1swXSxcbiAgICAgIEIgPSB2WzBdICogd1syXSAtIHZbMl0gKiB3WzBdLFxuICAgICAgQyA9IHZbMF0gKiB3WzNdIC0gdlszXSAqIHdbMF0sXG4gICAgICBEID0gdlsxXSAqIHdbMl0gLSB2WzJdICogd1sxXSxcbiAgICAgIEUgPSB2WzFdICogd1szXSAtIHZbM10gKiB3WzFdLFxuICAgICAgRiA9IHZbMl0gKiB3WzNdIC0gdlszXSAqIHdbMl07XG4gIHZhciBHID0gdVswXTtcbiAgdmFyIEggPSB1WzFdO1xuICB2YXIgSSA9IHVbMl07XG4gIHZhciBKID0gdVszXTtcbiAgb3V0WzBdID0gSCAqIEYgLSBJICogRSArIEogKiBEO1xuICBvdXRbMV0gPSAtKEcgKiBGKSArIEkgKiBDIC0gSiAqIEI7XG4gIG91dFsyXSA9IEcgKiBFIC0gSCAqIEMgKyBKICogQTtcbiAgb3V0WzNdID0gLShHICogRCkgKyBIICogQiAtIEkgKiBBO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF07XG4gIHZhciBheSA9IGFbMV07XG4gIHZhciBheiA9IGFbMl07XG4gIHZhciBhdyA9IGFbM107XG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb20ob3V0LCBzY2FsZSkge1xuICBzY2FsZSA9IHNjYWxlIHx8IDEuMDsgLy8gTWFyc2FnbGlhLCBHZW9yZ2UuIENob29zaW5nIGEgUG9pbnQgZnJvbSB0aGUgU3VyZmFjZSBvZiBhXG4gIC8vIFNwaGVyZS4gQW5uLiBNYXRoLiBTdGF0aXN0LiA0MyAoMTk3MiksIG5vLiAyLCA2NDUtLTY0Ni5cbiAgLy8gaHR0cDovL3Byb2plY3RldWNsaWQub3JnL2V1Y2xpZC5hb21zLzExNzc2OTI2NDQ7XG5cbiAgdmFyIHYxLCB2MiwgdjMsIHY0O1xuICB2YXIgczEsIHMyO1xuXG4gIGRvIHtcbiAgICB2MSA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgdjIgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHMxID0gdjEgKiB2MSArIHYyICogdjI7XG4gIH0gd2hpbGUgKHMxID49IDEpO1xuXG4gIGRvIHtcbiAgICB2MyA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgdjQgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHMyID0gdjMgKiB2MyArIHY0ICogdjQ7XG4gIH0gd2hpbGUgKHMyID49IDEpO1xuXG4gIHZhciBkID0gTWF0aC5zcXJ0KCgxIC0gczEpIC8gczIpO1xuICBvdXRbMF0gPSBzY2FsZSAqIHYxO1xuICBvdXRbMV0gPSBzY2FsZSAqIHYyO1xuICBvdXRbMl0gPSBzY2FsZSAqIHYzICogZDtcbiAgb3V0WzNdID0gc2NhbGUgKiB2NCAqIGQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDQuXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXSxcbiAgICAgIHcgPSBhWzNdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdICogdztcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICB2YXIgcXggPSBxWzBdLFxuICAgICAgcXkgPSBxWzFdLFxuICAgICAgcXogPSBxWzJdLFxuICAgICAgcXcgPSBxWzNdOyAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuXG4gIHZhciBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcbiAgdmFyIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuICB2YXIgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHg7XG4gIHZhciBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7IC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHplcm9cbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICBvdXRbM10gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWM0KFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiKVwiO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl0sXG4gICAgICBhMyA9IGFbM107XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl0sXG4gICAgICBiMyA9IGJbM107XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSk7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpdiA9IGRpdmlkZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpc3RhbmNlfVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBkaXN0ID0gZGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckRpc3QgPSBzcXVhcmVkRGlzdGFuY2U7XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGxlbiA9IGxlbmd0aDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWM0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWM0LiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjNHMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgdmFyIGksIGw7XG5cbiAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgc3RyaWRlID0gNDtcbiAgICB9XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgdmVjWzNdID0gYVtpICsgM107XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgICAgYVtpICsgM10gPSB2ZWNbM107XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG59KCk7IiwKICAiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcbiAqIDIgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbW9kdWxlIHZlYzJcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzJcbiAqXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHkpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMiB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzIgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSkge1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2VpbFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGZsb29yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogQWRkcyB0d28gdmVjMidzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5KTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XG59XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHkpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzJcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XG59XG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXTtcbiAgb3V0WzFdID0gLWFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcbn1cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICogTm90ZSB0aGF0IHRoZSBjcm9zcyBwcm9kdWN0IG11c3QgYnkgZGVmaW5pdGlvbiBwcm9kdWNlIGEgM0QgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCBhLCBiKSB7XG4gIHZhciB6ID0gYVswXSAqIGJbMV0gLSBhWzFdICogYlswXTtcbiAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdO1xuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgb3V0WzBdID0gTWF0aC5jb3MocikgKiBzY2FsZTtcbiAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDIob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyZChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHkgKyBtWzRdO1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0M1xuICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQzKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzNdICogeSArIG1bNl07XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs0XSAqIHkgKyBtWzddO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bMTJdO1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFJvdGF0ZSBhIDJEIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgdmVjMiBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIGIsIHJhZCkge1xuICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIHZhciBwMCA9IGFbMF0gLSBiWzBdLFxuICAgICAgcDEgPSBhWzFdIC0gYlsxXSxcbiAgICAgIHNpbkMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgY29zQyA9IE1hdGguY29zKHJhZCk7IC8vcGVyZm9ybSByb3RhdGlvbiBhbmQgdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSBwMCAqIGNvc0MgLSBwMSAqIHNpbkMgKyBiWzBdO1xuICBvdXRbMV0gPSBwMCAqIHNpbkMgKyBwMSAqIGNvc0MgKyBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDJEIHZlY3RvcnNcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZ2xlKGEsIGIpIHtcbiAgdmFyIHgxID0gYVswXSxcbiAgICAgIHkxID0gYVsxXSxcbiAgICAgIHgyID0gYlswXSxcbiAgICAgIHkyID0gYlsxXSxcbiAgICAgIC8vIG1hZyBpcyB0aGUgcHJvZHVjdCBvZiB0aGUgbWFnbml0dWRlcyBvZiBhIGFuZCBiXG4gIG1hZyA9IE1hdGguc3FydCh4MSAqIHgxICsgeTEgKiB5MSkgKiBNYXRoLnNxcnQoeDIgKiB4MiArIHkyICogeTIpLFxuICAgICAgLy8gbWFnICYmLi4gc2hvcnQgY2lyY3VpdHMgaWYgbWFnID09IDBcbiAgY29zaW5lID0gbWFnICYmICh4MSAqIHgyICsgeTEgKiB5MikgLyBtYWc7IC8vIE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSBjbGFtcHMgdGhlIGNvc2luZSBiZXR3ZWVuIC0xIGFuZCAxXG5cbiAgcmV0dXJuIE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkpO1xufVxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHplcm9cbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcInZlYzIoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiKVwiO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGV4YWN0bHkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSk7XG59XG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGxlbiA9IGxlbmd0aDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnN1YnRyYWN0fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xuXG5leHBvcnQgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMycy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMyLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjMnMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cblxuZXhwb3J0IHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgdmFyIGksIGw7XG5cbiAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgc3RyaWRlID0gMjtcbiAgICB9XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xufSgpOyIsCiAgImltcG9ydCB7XG4gIEdsb2JhbEtleWJvYXJkTWFuYWdlcixcbiAgR2xvYmFsTW91c2VNYW5hZ2VyLFxuICBHbG9iYWxUb3VjaE1hbmFnZXJcbn0gZnJvbSAnLi4vYnJvd3Nlcic7XG5cbmltcG9ydCB7IGRlZ3JlZVRvUmFkIH0gZnJvbSAnLi4vbWF0aC9hbmdsZXMnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuY29uc3QgQWxsQXhpc2VzID0ge1xuICBYOiAwLFxuICBZOiAxLFxuICBaOiAyXG59O1xudHlwZSBBeGlzVHlwZSA9IGtleW9mIHR5cGVvZiBBbGxBeGlzZXM7XG50eXBlIENvb3JkaW5hdGVzID0gW0F4aXNUeXBlLCBBeGlzVHlwZSwgQXhpc1R5cGVdO1xuXG5pbnRlcmZhY2UgSUZyZWVGbHlDb250cm9sbGVyRGVmIHtcbiAgcG9zaXRpb246IGdsbS52ZWMzO1xuICBjb29yZGluYXRlcz86IENvb3JkaW5hdGVzO1xuICB0aGV0YTogbnVtYmVyO1xuICBwaGk6IG51bWJlcjtcbiAgbW91c2VTZW5zaWJpbGl0eTogbnVtYmVyO1xuICBrZXlib2FyZFNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIHRvdWNoU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAgbW92aW5nU3BlZWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZyZWVGbHlDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBfaXNBY3RpdmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdGhldGE6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3BoaTogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIF9tb3VzZVNlbnNpYmlsaXR5OiBudW1iZXI7XG4gIHByaXZhdGUgX2tleWJvYXJkU2Vuc2liaWxpdHk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfdG91Y2hTZW5zaWJpbGl0eTogbnVtYmVyO1xuICBwcml2YXRlIF9tb3ZpbmdTcGVlZDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3RvdWNoV2FzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3RvdWNoU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF90b3VjaE1vdmVGb3J3YXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfYXhpc0luZGljZXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcblxuICBwcml2YXRlIF9wb3NpdGlvbiA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gIHByaXZhdGUgX3RhcmdldCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gIHByaXZhdGUgX2ZvcndhcmRBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygxLCAwLCAwKTtcbiAgcHJpdmF0ZSBfbGVmdEF4aXMgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDEpO1xuICBwcml2YXRlIF91cEF4aXMgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApO1xuXG4gIHByaXZhdGUgX21vdmVfZm9yd2FyZEF4aXMgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDEsIDAsIDApO1xuICBwcml2YXRlIF9tb3ZlX2xlZnRBeGlzID0gZ2xtLnZlYzMuZnJvbVZhbHVlcygwLCAwLCAxKTtcbiAgcHJpdmF0ZSBfbW92ZV91cEF4aXMgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogSUZyZWVGbHlDb250cm9sbGVyRGVmKSB7XG4gICAgdGhpcy5fbW91c2VTZW5zaWJpbGl0eSA9IGRlZi5tb3VzZVNlbnNpYmlsaXR5O1xuICAgIHRoaXMuX2tleWJvYXJkU2Vuc2liaWxpdHkgPSBkZWYua2V5Ym9hcmRTZW5zaWJpbGl0eTtcbiAgICB0aGlzLl90b3VjaFNlbnNpYmlsaXR5ID0gZGVmLnRvdWNoU2Vuc2liaWxpdHk7XG4gICAgdGhpcy5fbW92aW5nU3BlZWQgPSBkZWYubW92aW5nU3BlZWQ7XG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl9wb3NpdGlvbiwgZGVmLnBvc2l0aW9uKTtcblxuICAgIHRoaXMuX2F4aXNJbmRpY2VzID0gW1xuICAgICAgZGVmLmNvb3JkaW5hdGVzID8gQWxsQXhpc2VzW2RlZi5jb29yZGluYXRlc1swXV0gOiBBbGxBeGlzZXMuWCxcbiAgICAgIGRlZi5jb29yZGluYXRlcyA/IEFsbEF4aXNlc1tkZWYuY29vcmRpbmF0ZXNbMV1dIDogQWxsQXhpc2VzLlksXG4gICAgICBkZWYuY29vcmRpbmF0ZXMgPyBBbGxBeGlzZXNbZGVmLmNvb3JkaW5hdGVzWzJdXSA6IEFsbEF4aXNlcy5aXG4gICAgXTtcblxuICAgIHRoaXMuX3RoZXRhID0gZGVmLnRoZXRhO1xuICAgIHRoaXMuX3BoaSA9IGRlZi5waGk7XG4gIH1cblxuICBpc0FjdGl2YXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNBY3RpdmF0ZWQ7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9pc0FjdGl2YXRlZCA9IHRydWU7XG5cbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ1onKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ1cnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ1MnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ0EnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ1EnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ0QnKTtcblxuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5wcmV2ZW50RGVmYXVsdCgnU2hpZnQnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ0MnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ1NwYWNlJyk7XG5cbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ0Fycm93VXAnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIucHJldmVudERlZmF1bHQoJ0Fycm93RG93bicpO1xuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5wcmV2ZW50RGVmYXVsdCgnQXJyb3dMZWZ0Jyk7XG4gICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLnByZXZlbnREZWZhdWx0KCdBcnJvd1JpZ2h0Jyk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2lzQWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIuZW5hYmxlRGVmYXVsdCgnWicpO1xuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5lbmFibGVEZWZhdWx0KCdXJyk7XG4gICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmVuYWJsZURlZmF1bHQoJ1MnKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIuZW5hYmxlRGVmYXVsdCgnQScpO1xuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5lbmFibGVEZWZhdWx0KCdRJyk7XG4gICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmVuYWJsZURlZmF1bHQoJ0QnKTtcblxuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5lbmFibGVEZWZhdWx0KCdTaGlmdCcpO1xuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5lbmFibGVEZWZhdWx0KCdDJyk7XG4gICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmVuYWJsZURlZmF1bHQoJ1NwYWNlJyk7XG5cbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIuZW5hYmxlRGVmYXVsdCgnQXJyb3dVcCcpO1xuICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5lbmFibGVEZWZhdWx0KCdBcnJvd0Rvd24nKTtcbiAgICBHbG9iYWxLZXlib2FyZE1hbmFnZXIuZW5hYmxlRGVmYXVsdCgnQXJyb3dMZWZ0Jyk7XG4gICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmVuYWJsZURlZmF1bHQoJ0Fycm93UmlnaHQnKTtcbiAgfVxuXG4gIGlzSW50ZXJhY3RlZFdpdGgoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1onLCAnVycsICdTJywgJ0EnLCAnUScsICdEJykgfHxcbiAgICAgIEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1NoaWZ0JywgJ0MnLCAnU3BhY2UnKSB8fFxuICAgICAgR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dVcCcsICdBcnJvd0Rvd24nLCAnQXJyb3dMZWZ0JywgJ0Fycm93UmlnaHQnKVxuICAgICk7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFNc1RpbWU6IG51bWJlciwgZnBzQ29udHJvbHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGxldCBtb3ZlRm9yd2FyZCA9IGZhbHNlO1xuICAgIGxldCBtb3ZlQmFja3dhcmQgPSBmYWxzZTtcbiAgICBsZXQgc3RyYWZlTGVmdCA9IGZhbHNlO1xuICAgIGxldCBzdHJhZmVSaWdodCA9IGZhbHNlO1xuICAgIGxldCBpc1J1bm5pbmcgPSBmYWxzZTtcbiAgICBsZXQgaXNEaXZpbmcgPSBmYWxzZTtcbiAgICBsZXQgaXNSaXNpbmcgPSBmYWxzZTtcbiAgICBsZXQgbG9va0RlbHRhWCA9IDA7XG4gICAgbGV0IGxvb2tEZWx0YVkgPSAwO1xuXG4gICAgLy9cbiAgICAvLyBtb3VzZVxuICAgIC8vXG5cbiAgICB7XG4gICAgICBjb25zdCBkZWx0YVggPSBHbG9iYWxNb3VzZU1hbmFnZXIuZGVsdGFYKCkgKiB0aGlzLl9tb3VzZVNlbnNpYmlsaXR5O1xuICAgICAgY29uc3QgZGVsdGFZID0gR2xvYmFsTW91c2VNYW5hZ2VyLmRlbHRhWSgpICogdGhpcy5fbW91c2VTZW5zaWJpbGl0eTtcblxuICAgICAgbG9va0RlbHRhWCAtPSBkZWdyZWVUb1JhZChkZWx0YVgpICogZGVsdGFNc1RpbWU7XG4gICAgICBsb29rRGVsdGFZIC09IGRlZ3JlZVRvUmFkKGRlbHRhWSkgKiBkZWx0YU1zVGltZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIG1vdXNlXG4gICAgLy9cblxuICAgIC8vXG4gICAgLy8gdG91Y2hcbiAgICAvL1xuXG4gICAgY29uc3QgaXNUb3VjaGVkID0gR2xvYmFsVG91Y2hNYW5hZ2VyLmdldFRvdWNoRGF0YSgpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaXNUb3VjaGVkKSB7XG4gICAgICBpZiAoIXRoaXMuX3RvdWNoV2FzQWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IChjdXJyVGltZSAtIHRoaXMuX3RvdWNoU3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgIGlmIChlbGFwc2VkIDwgMC4yNSkge1xuICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZUZvcndhcmQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3RvdWNoU3RhcnRUaW1lID0gY3VyclRpbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlyc3RUb3VjaCA9IEdsb2JhbFRvdWNoTWFuYWdlci5nZXRUb3VjaERhdGEoKVswXTtcblxuICAgICAgY29uc3QgZGVsdGFYID0gZmlyc3RUb3VjaC5kZWx0YVggKiB0aGlzLl90b3VjaFNlbnNpYmlsaXR5O1xuICAgICAgY29uc3QgZGVsdGFZID0gZmlyc3RUb3VjaC5kZWx0YVkgKiB0aGlzLl90b3VjaFNlbnNpYmlsaXR5O1xuXG4gICAgICBsb29rRGVsdGFYIC09IGRlZ3JlZVRvUmFkKGRlbHRhWCkgKiBkZWx0YU1zVGltZTtcbiAgICAgIGxvb2tEZWx0YVkgLT0gZGVncmVlVG9SYWQoZGVsdGFZKSAqIGRlbHRhTXNUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90b3VjaE1vdmVGb3J3YXJkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5fdG91Y2hXYXNBY3RpdmUgPSBpc1RvdWNoZWQ7XG5cbiAgICBpZiAodGhpcy5fdG91Y2hNb3ZlRm9yd2FyZCkge1xuICAgICAgbW92ZUZvcndhcmQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gdG91Y2hcbiAgICAvL1xuXG4gICAgLy9cbiAgICAvLyBrZXlib2FyZFxuICAgIC8vXG5cbiAgICAvLyBmb3J3YXJkXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1onLCAnVycpKSB7XG4gICAgICBtb3ZlRm9yd2FyZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gYmFja3dhcmRcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnUycpKSB7XG4gICAgICBtb3ZlQmFja3dhcmQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHN0cmFmZSBsZWZ0XG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0EnLCAnUScpKSB7XG4gICAgICBzdHJhZmVMZWZ0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJhZmUgcmlnaHRcbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnRCcpKSB7XG4gICAgICBzdHJhZmVSaWdodCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcnVuXG4gICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1NoaWZ0JykpIHtcbiAgICAgIGlzUnVubmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFmcHNDb250cm9scykge1xuXG4gICAgICAvLyBkaXZlXG4gICAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQycpKSB7XG4gICAgICAgIGlzRGl2aW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmlzZVxuICAgICAgaWYgKEdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ1NwYWNlJykpIHtcbiAgICAgICAgaXNSaXNpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRMaW5lYXJTcGVlZCA9XG4gICAgICB0aGlzLl9tb3ZpbmdTcGVlZCAqIChpc1J1bm5pbmcgPyA0IDogMSkgKiBkZWx0YU1zVGltZTtcblxuICAgIC8vXG4gICAgLy9cblxuICAgIGNvbnN0IGN1cnJlbnRBbmd1bGFyU3BlZWQgPSB0aGlzLl9rZXlib2FyZFNlbnNpYmlsaXR5ICogZGVsdGFNc1RpbWU7XG5cbiAgICBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dVcCcpKSB7XG4gICAgICBsb29rRGVsdGFZICs9IGN1cnJlbnRBbmd1bGFyU3BlZWQ7XG4gICAgfSBlbHNlIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0Rvd24nKSkge1xuICAgICAgbG9va0RlbHRhWSAtPSBjdXJyZW50QW5ndWxhclNwZWVkO1xuICAgIH1cblxuICAgIGlmIChHbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0xlZnQnKSkge1xuICAgICAgbG9va0RlbHRhWCArPSBjdXJyZW50QW5ndWxhclNwZWVkO1xuICAgIH0gZWxzZSBpZiAoR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQXJyb3dSaWdodCcpKSB7XG4gICAgICBsb29rRGVsdGFYIC09IGN1cnJlbnRBbmd1bGFyU3BlZWQ7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBrZXlib2FyZFxuICAgIC8vXG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG5cbiAgICB0aGlzLl90aGV0YSArPSBsb29rRGVsdGFYO1xuICAgIHRoaXMuX3BoaSArPSBsb29rRGVsdGFZO1xuXG4gICAgY29uc3QgaFBpID0gTWF0aC5QSSAqIDAuNTtcbiAgICBjb25zdCB2ZXJ0aWNhbExpbWl0ID0gaFBpICogMC45NTtcblxuICAgIHRoaXMuX3BoaSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuX3BoaSwgLXZlcnRpY2FsTGltaXQpLCArdmVydGljYWxMaW1pdCk7XG5cbiAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoaXMuX3RoZXRhKTtcbiAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc2luKHRoaXMuX3RoZXRhKTtcblxuICAgIGNvbnN0IFtheGlzWCwgYXhpc1ksIGF4aXNaXSA9IHRoaXMuX2F4aXNJbmRpY2VzO1xuXG4gICAgY29uc3QgdXBSYWRpdXMgPSBNYXRoLmNvcyh0aGlzLl9waGkgKyBoUGkpO1xuICAgIHRoaXMuX3VwQXhpc1theGlzWF0gPSB1cFJhZGl1cyAqIGNvc1RoZXRhO1xuICAgIHRoaXMuX3VwQXhpc1theGlzWV0gPSB1cFJhZGl1cyAqIHNpblRoZXRhO1xuICAgIHRoaXMuX3VwQXhpc1theGlzWl0gPSBNYXRoLnNpbih0aGlzLl9waGkgKyBoUGkpO1xuXG4gICAgY29uc3QgZm9yd2FyZFJhZGl1cyA9IE1hdGguY29zKHRoaXMuX3BoaSk7XG4gICAgdGhpcy5fZm9yd2FyZEF4aXNbYXhpc1hdID0gZm9yd2FyZFJhZGl1cyAqIGNvc1RoZXRhO1xuICAgIHRoaXMuX2ZvcndhcmRBeGlzW2F4aXNZXSA9IGZvcndhcmRSYWRpdXMgKiBzaW5UaGV0YTtcbiAgICB0aGlzLl9mb3J3YXJkQXhpc1theGlzWl0gPSBNYXRoLnNpbih0aGlzLl9waGkpO1xuXG4gICAgZ2xtLnZlYzMuY3Jvc3ModGhpcy5fbGVmdEF4aXMsIHRoaXMuX3VwQXhpcywgdGhpcy5fZm9yd2FyZEF4aXMpO1xuXG4gICAgaWYgKGZwc0NvbnRyb2xzKSB7XG5cbiAgICAgIHRoaXMuX21vdmVfZm9yd2FyZEF4aXNbYXhpc1hdID0gY29zVGhldGE7XG4gICAgICB0aGlzLl9tb3ZlX2ZvcndhcmRBeGlzW2F4aXNZXSA9IHNpblRoZXRhO1xuICAgICAgdGhpcy5fbW92ZV9mb3J3YXJkQXhpc1theGlzWl0gPSAwO1xuXG4gICAgICB0aGlzLl9tb3ZlX2xlZnRBeGlzW2F4aXNYXSA9IC1zaW5UaGV0YTtcbiAgICAgIHRoaXMuX21vdmVfbGVmdEF4aXNbYXhpc1ldID0gY29zVGhldGE7XG4gICAgICB0aGlzLl9tb3ZlX2xlZnRBeGlzW2F4aXNaXSA9IDA7XG5cbiAgICAgIHRoaXMuX21vdmVfdXBBeGlzW2F4aXNYXSA9IDA7XG4gICAgICB0aGlzLl9tb3ZlX3VwQXhpc1theGlzWV0gPSAwO1xuICAgICAgdGhpcy5fbW92ZV91cEF4aXNbYXhpc1pdID0gMTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBnbG0udmVjMy5jb3B5KHRoaXMuX21vdmVfZm9yd2FyZEF4aXMsIHRoaXMuX2ZvcndhcmRBeGlzKTtcbiAgICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fbW92ZV9sZWZ0QXhpcywgdGhpcy5fbGVmdEF4aXMpO1xuICAgICAgZ2xtLnZlYzMuY29weSh0aGlzLl9tb3ZlX3VwQXhpcywgdGhpcy5fdXBBeGlzKTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIGNvbnN0IHNjYWxlZEZvcndhcmQgPSBnbG0udmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApO1xuICAgIGdsbS52ZWMzLnNjYWxlKHNjYWxlZEZvcndhcmQsIHRoaXMuX21vdmVfZm9yd2FyZEF4aXMsIGN1cnJlbnRMaW5lYXJTcGVlZCk7XG4gICAgY29uc3Qgc2NhbGVkTGVmdCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gICAgZ2xtLnZlYzMuc2NhbGUoc2NhbGVkTGVmdCwgdGhpcy5fbW92ZV9sZWZ0QXhpcywgY3VycmVudExpbmVhclNwZWVkKTtcbiAgICBjb25zdCBzY2FsZWRVcCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gICAgZ2xtLnZlYzMuc2NhbGUoc2NhbGVkVXAsIHRoaXMuX21vdmVfdXBBeGlzLCBjdXJyZW50TGluZWFyU3BlZWQpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICBpZiAobW92ZUZvcndhcmQpIHtcbiAgICAgIGdsbS52ZWMzLmFkZCh0aGlzLl9wb3NpdGlvbiwgdGhpcy5fcG9zaXRpb24sIHNjYWxlZEZvcndhcmQpO1xuICAgIH0gZWxzZSBpZiAobW92ZUJhY2t3YXJkKSB7XG4gICAgICBnbG0udmVjMy5zdWIodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRGb3J3YXJkKTtcbiAgICB9XG5cbiAgICBpZiAoc3RyYWZlTGVmdCkge1xuICAgICAgZ2xtLnZlYzMuYWRkKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkTGVmdCk7XG4gICAgfSBlbHNlIGlmIChzdHJhZmVSaWdodCkge1xuICAgICAgZ2xtLnZlYzMuc3ViKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkTGVmdCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUmlzaW5nKSB7XG4gICAgICBnbG0udmVjMy5hZGQodGhpcy5fcG9zaXRpb24sIHRoaXMuX3Bvc2l0aW9uLCBzY2FsZWRVcCk7XG4gICAgfSBlbHNlIGlmIChpc0RpdmluZykge1xuICAgICAgZ2xtLnZlYzMuc3ViKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgc2NhbGVkVXApO1xuICAgIH1cblxuICAgIGdsbS52ZWMzLmFkZCh0aGlzLl90YXJnZXQsIHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9mb3J3YXJkQXhpcyk7XG5cbiAgICAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG4gIH1cblxuICBnZXRQb3NpdGlvbigpOiBnbG0uUmVhZG9ubHlWZWMzIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBzZXRQb3NpdGlvbihpblBvczogZ2xtLlJlYWRvbmx5VmVjMykge1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fcG9zaXRpb24sIGluUG9zKTtcbiAgICBnbG0udmVjMy5hZGQodGhpcy5fdGFyZ2V0LCB0aGlzLl9wb3NpdGlvbiwgdGhpcy5fZm9yd2FyZEF4aXMpO1xuICB9XG5cbiAgZ2V0VGFyZ2V0KCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gIH1cblxuICBnZXRVcEF4aXMoKTogZ2xtLlJlYWRvbmx5VmVjMyB7XG4gICAgcmV0dXJuIHRoaXMuX3VwQXhpcztcbiAgfVxuXG4gIGdldFRoZXRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZXRhO1xuICB9XG5cbiAgZ2V0UGhpKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BoaTtcbiAgfVxuXG4gIGdldFRvdWNoTW92ZUZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoTW92ZUZvcndhcmQ7XG4gIH1cbn1cbiIsCiAgImV4cG9ydCBjb25zdCBjbGFtcCA9IChjdXJyVmFsOiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcikgPT5cbiAgTWF0aC5taW4oTWF0aC5tYXgoY3VyclZhbCwgbWluVmFsKSwgbWF4VmFsKTtcbiIsCiAgIlxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBjb25zdCBpbnRlcnNlY3RTZWdtZW50ID0gKEE6IGdsbS5SZWFkb25seVZlYzIsIEI6IGdsbS5SZWFkb25seVZlYzIsIEk6IGdsbS5SZWFkb25seVZlYzIsIFA6IGdsbS5SZWFkb25seVZlYzIpOiBudW1iZXIgPT4gIHtcblxuICBjb25zdCBEID0gZ2xtLnZlYzIuZnJvbVZhbHVlcygwLDApO1xuICBjb25zdCBFID0gZ2xtLnZlYzIuZnJvbVZhbHVlcygwLDApO1xuICBEWzBdID0gQlswXSAtIEFbMF07XG4gIERbMV0gPSBCWzFdIC0gQVsxXTtcbiAgRVswXSA9IFBbMF0gLSBJWzBdO1xuICBFWzFdID0gUFsxXSAtIElbMV07XG4gIGNvbnN0IGRlbm9tID0gRFswXSpFWzFdIC0gRFsxXSpFWzBdO1xuICBpZiAoZGVub209PTApIHtcbiAgICByZXR1cm4gLTE7ICAgLy8gZXJyZXVyLCBjYXMgbGltaXRlXG4gIH1cbiAgY29uc3QgdCA9IC0gKEFbMF0qRVsxXS1JWzBdKkVbMV0tRVswXSpBWzFdK0VbMF0qSVsxXSkgLyBkZW5vbTtcbiAgaWYgKHQgPCAwIHx8IHQgPj0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IHUgPSAtICgtRFswXSpBWzFdK0RbMF0qSVsxXStEWzFdKkFbMF0tRFsxXSpJWzBdKSAvIGRlbm9tO1xuICBpZiAodSA8IDAgfHwgdSA+PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBjb25zdCBjb2xsaXNpb25MaW5lc1N0cmlwID0gKHRhYjogUmVhZG9ubHlBcnJheTxnbG0uUmVhZG9ubHlWZWMyPiwgUDogZ2xtLnZlYzIpOiBib29sZWFuID0+IHtcblxuICBjb25zdCBJID0gZ2xtLnZlYzIuZnJvbVZhbHVlcygwLCAwKTtcbiAgSVswXSA9IDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDEwMDsgICAvLyAxMDAwMCArIHVuIG5vbWJyZSBhbMOpYXRvaXJlIGVudHJlIDAgZXQgOTlcbiAgSVsxXSA9IDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgbGV0IG5iSW50ZXJzZWN0aW9ucyA9IDA7XG4gIGZvcihsZXQgaWkgPSAwOyBpaSA8IHRhYi5sZW5ndGg7ICsraWkpXG4gIHtcbiAgICBsZXQgamogPSAoaWkgKyAxKSAlIHRhYi5sZW5ndGg7XG5cbiAgICBjb25zdCByZXN1bHQgPSBpbnRlcnNlY3RTZWdtZW50KHRhYltpaV0sdGFiW2pqXSxJLFApO1xuICAgIGlmIChyZXN1bHQgPT0gLTEpIHtcbiAgICAgIHJldHVybiBjb2xsaXNpb25MaW5lc1N0cmlwKHRhYixQKTsgIC8vIGNhcyBsaW1pdGUsIG9uIHJlbGFuY2UgbGEgZm9uY3Rpb24uXG4gICAgfVxuICAgIG5iSW50ZXJzZWN0aW9ucyArPSByZXN1bHQ7XG4gIH1cbiAgaWYgKChuYkludGVyc2VjdGlvbnMgJSAyKSA9PSAxKSB7ICAvLyBuYkludGVyc2VjdGlvbnMgZXN0LWlsIGltcGFpciA/XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsCiAgIlxuZXhwb3J0IGNvbnN0IGxlcnAgPSAocmF0aW86IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiBtaW5WYWwgKyAobWF4VmFsIC0gbWluVmFsKSAqIHJhdGlvO1xuIiwKICAiZXhwb3J0IGludGVyZmFjZSBJRnJhbWVQcm9maWxlciB7XG4gIGZyYW1lc0RlbHRhOiBSZWFkb25seUFycmF5PG51bWJlcj47XG4gIGF2ZXJhZ2VEZWx0YTogbnVtYmVyO1xuICBtaW5EZWx0YTogbnVtYmVyO1xuICBtYXhEZWx0YTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRnJhbWVQcm9maWxlciBpbXBsZW1lbnRzIElGcmFtZVByb2ZpbGVyIHtcbiAgcHJpdmF0ZSBfZnJhbWVzRGVsdGE6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgX2F2ZXJhZ2VEZWx0YTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWluRGVsdGE6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21heERlbHRhOiBudW1iZXIgPSAwO1xuXG4gIHB1c2hEZWx0YShpbkRlbHRhOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fZnJhbWVzRGVsdGEubGVuZ3RoID49IDEwMCkge1xuICAgICAgdGhpcy5fZnJhbWVzRGVsdGEuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mcmFtZXNEZWx0YS5wdXNoKGluRGVsdGEpO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICB0aGlzLl9taW5EZWx0YSA9ICs5OTk5OTk5OTk7XG4gICAgdGhpcy5fbWF4RGVsdGEgPSAtOTk5OTk5OTk5O1xuICAgIHRoaXMuX2F2ZXJhZ2VEZWx0YSA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGN1cnJEZWx0YSBvZiB0aGlzLl9mcmFtZXNEZWx0YSkge1xuICAgICAgdGhpcy5fbWluRGVsdGEgPSBNYXRoLm1pbih0aGlzLl9taW5EZWx0YSwgY3VyckRlbHRhKTtcbiAgICAgIHRoaXMuX21heERlbHRhID0gTWF0aC5tYXgodGhpcy5fbWF4RGVsdGEsIGN1cnJEZWx0YSk7XG4gICAgICB0aGlzLl9hdmVyYWdlRGVsdGEgKz0gY3VyckRlbHRhO1xuICAgIH1cbiAgICB0aGlzLl9hdmVyYWdlRGVsdGEgLz0gdGhpcy5fZnJhbWVzRGVsdGEubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGZyYW1lc0RlbHRhKCk6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyYW1lc0RlbHRhO1xuICB9XG4gIGdldCBhdmVyYWdlRGVsdGEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYXZlcmFnZURlbHRhO1xuICB9XG4gIGdldCBtaW5EZWx0YSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW5EZWx0YTtcbiAgfVxuICBnZXQgbWF4RGVsdGEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGVsdGE7XG4gIH1cbn1cbiIsCiAgIlxuZXhwb3J0IGNsYXNzIEFzeW5jSGVscGVycyB7XG5cbiAgc3RhdGljIGFzeW5jIHNsZWVwKGRlbGF5OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpKTtcbiAgfVxuXG4gIHN0YXRpYyBjYW5jZWxsYWJsZVNsZWVwKGRlbGF5OiBudW1iZXIpOiB7cHJvbWlzZTogUHJvbWlzZTx2b2lkPiwgY2FuY2VsOiAoKSA9PiB2b2lkfSB7XG5cbiAgICBsZXQgdGltZW91dEhhbmRsZTogbnVtYmVyID0gLTE7XG4gICAgbGV0IHJlc29sdmVDYWxsYmFjazogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlQ2FsbGJhY2sgPSByZXNvbHZlO1xuICAgICAgdGltZW91dEhhbmRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9taXNlLFxuICAgICAgY2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aW1lb3V0SGFuZGxlID49IDApIHtcbiAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvbHZlQ2FsbGJhY2spIHtcbiAgICAgICAgICByZXNvbHZlQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn07XG4iLAogICJpbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuaW1wb3J0IHsgZGVncmVlVG9SYWQgfSBmcm9tICcuLi8uLi9zeXN0ZW0vbWF0aC9hbmdsZXMnO1xuXG5lbnVtIFByb2plY3Rpb25UeXBlIHtcbiAgcGVyc3BlY3RpdmUgPSAwLFxuICBvcnRob2dvbmFsID0gMVxufVxuXG5pbnRlcmZhY2UgSVBlcnNwZWN0aXZlRGF0YU9wdHMge1xuICBmb3Z5OiBudW1iZXI7XG4gIGFzcGVjdFJhdGlvPzogbnVtYmVyO1xuICBuZWFyOiBudW1iZXI7XG4gIGZhcjogbnVtYmVyO1xufVxuXG50eXBlIElQZXJzcGVjdGl2ZURhdGEgPSBSZXF1aXJlZDxJUGVyc3BlY3RpdmVEYXRhT3B0cz47XG5cbmludGVyZmFjZSBJT3J0aG9nb25hbERhdGEge1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbiAgbmVhcjogbnVtYmVyO1xuICBmYXI6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2FtZXJhIHtcbiAgZ2V0RXllKCk6IGdsbS5SZWFkb25seVZlYzM7XG4gIGdldFRhcmdldCgpOiBnbG0uUmVhZG9ubHlWZWMzO1xuICBnZXRVcEF4aXMoKTogZ2xtLlJlYWRvbmx5VmVjMztcblxuICBnZXRQcm9qZWN0aW9uTWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQ7XG4gIGdldFZpZXdNYXRyaXgoKTogZ2xtLlJlYWRvbmx5TWF0NDtcbiAgZ2V0Q29tcG9zZWRNYXRyaXgoKTogZ2xtLlJlYWRvbmx5TWF0NDtcblxuICBnZXRQZXJzcGVjdGl2ZURhdGEoKTogUmVhZG9ubHk8SVBlcnNwZWN0aXZlRGF0YSB8IHVuZGVmaW5lZD47XG4gIGdldE9ydGhvZ29uYWxEYXRhKCk6IFJlYWRvbmx5PElPcnRob2dvbmFsRGF0YSB8IHVuZGVmaW5lZD47XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmEgaW1wbGVtZW50cyBJQ2FtZXJhIHtcbiAgcHJpdmF0ZSBfcHJvamVjdGlvblR5cGUgPSBQcm9qZWN0aW9uVHlwZS5wZXJzcGVjdGl2ZTtcbiAgcHJpdmF0ZSBfcGVyc3BlY3RpdmVEYXRhPzogSVBlcnNwZWN0aXZlRGF0YTtcbiAgcHJpdmF0ZSBfb3J0aG9nb25hbERhdGE/OiBJT3J0aG9nb25hbERhdGE7XG5cbiAgcHJpdmF0ZSBfdmlld3BvcnRQb3MgPSBnbG0udmVjMi5mcm9tVmFsdWVzKDAsIDApO1xuICBwcml2YXRlIF92aWV3cG9ydFNpemUgPSBnbG0udmVjMi5mcm9tVmFsdWVzKDAsIDApO1xuXG4gIHByaXZhdGUgX3Byb2plY3Rpb25NYXRyaXggPSBnbG0ubWF0NC5jcmVhdGUoKTtcbiAgcHJpdmF0ZSBfdmlld01hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICBwcml2YXRlIF9jb21wb3NlZE1hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuXG4gIHByaXZhdGUgX2V5ZSA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gIHByaXZhdGUgX3RhcmdldCA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG4gIHByaXZhdGUgX3VwQXhpcyA9IGdsbS52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgMCk7XG5cbiAgLy9cblxuICBzZXRBc1BlcnNwZWN0aXZlKGluRGF0YTogSVBlcnNwZWN0aXZlRGF0YU9wdHMpIHtcbiAgICB0aGlzLl9wcm9qZWN0aW9uVHlwZSA9IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlO1xuXG4gICAgbGV0IGFzcGVjdFJhdGlvID0gaW5EYXRhLmFzcGVjdFJhdGlvO1xuICAgIGlmIChhc3BlY3RSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhc3BlY3RSYXRpbyA9IHRoaXMuX3ZpZXdwb3J0U2l6ZVswXSAvIHRoaXMuX3ZpZXdwb3J0U2l6ZVsxXTtcbiAgICB9XG5cbiAgICB0aGlzLl9wZXJzcGVjdGl2ZURhdGEgPSB7XG4gICAgICBmb3Z5OiBpbkRhdGEuZm92eSxcbiAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgbmVhcjogaW5EYXRhLm5lYXIsXG4gICAgICBmYXI6IGluRGF0YS5mYXJcbiAgICB9O1xuICB9XG5cbiAgc2V0QXNPcnRob2dvbmFsKGluRGF0YTogSU9ydGhvZ29uYWxEYXRhKSB7XG4gICAgdGhpcy5fcHJvamVjdGlvblR5cGUgPSBQcm9qZWN0aW9uVHlwZS5vcnRob2dvbmFsO1xuICAgIHRoaXMuX29ydGhvZ29uYWxEYXRhID0geyAuLi5pbkRhdGEgfTtcbiAgfVxuXG4gIC8vXG5cbiAgc2V0Vmlld3BvcnRQb3Mod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLl92aWV3cG9ydFBvc1swXSA9IHdpZHRoO1xuICAgIHRoaXMuX3ZpZXdwb3J0UG9zWzFdID0gaGVpZ2h0O1xuICB9XG5cbiAgZ2V0Vmlld3BvcnRQb3MoKTogZ2xtLlJlYWRvbmx5VmVjMiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0UG9zO1xuICB9XG5cbiAgLy9cblxuICBzZXRWaWV3cG9ydFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLl92aWV3cG9ydFNpemVbMF0gPSB3aWR0aDtcbiAgICB0aGlzLl92aWV3cG9ydFNpemVbMV0gPSBoZWlnaHQ7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLl9wcm9qZWN0aW9uVHlwZSAhPT0gUHJvamVjdGlvblR5cGUucGVyc3BlY3RpdmUgJiZcbiAgICAgIHRoaXMuX3BlcnNwZWN0aXZlRGF0YVxuICAgICkge1xuICAgICAgdGhpcy5fcGVyc3BlY3RpdmVEYXRhLmFzcGVjdFJhdGlvID1cbiAgICAgICAgdGhpcy5fdmlld3BvcnRTaXplWzBdIC8gdGhpcy5fdmlld3BvcnRTaXplWzFdO1xuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdwb3J0U2l6ZSgpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRTaXplO1xuICB9XG5cbiAgLy9cblxuICBsb29rQXQoXG4gICAgaW5FeWU6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5UYXJnZXQ6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5VcEF4aXM6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5zZXRFeWUoaW5FeWUpO1xuICAgIHRoaXMuc2V0VGFyZ2V0KGluVGFyZ2V0KTtcbiAgICB0aGlzLnNldFVwQXhpcyhpblVwQXhpcyk7XG4gIH1cblxuICAvL1xuXG4gIHNldEV5ZShpbkV5ZTogZ2xtLlJlYWRvbmx5VmVjMykge1xuICAgIGdsbS52ZWMzLmNvcHkodGhpcy5fZXllLCBpbkV5ZSk7XG4gIH1cbiAgc2V0VGFyZ2V0KGluVGFyZ2V0OiBnbG0uUmVhZG9ubHlWZWMzKSB7XG4gICAgZ2xtLnZlYzMuY29weSh0aGlzLl90YXJnZXQsIGluVGFyZ2V0KTtcbiAgfVxuICBzZXRVcEF4aXMoaW5VcEF4aXM6IGdsbS5SZWFkb25seVZlYzMpIHtcbiAgICBnbG0udmVjMy5jb3B5KHRoaXMuX3VwQXhpcywgaW5VcEF4aXMpO1xuICB9XG5cbiAgZ2V0RXllKCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl9leWU7XG4gIH1cbiAgZ2V0VGFyZ2V0KCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gIH1cbiAgZ2V0VXBBeGlzKCk6IGdsbS5SZWFkb25seVZlYzMge1xuICAgIHJldHVybiB0aGlzLl91cEF4aXM7XG4gIH1cblxuICAvL1xuXG4gIGNvbXB1dGVNYXRyaWNlcygpIHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgPT09IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlKSB7XG4gICAgICBjb25zdCB7IGZvdnksIGFzcGVjdFJhdGlvLCBuZWFyLCBmYXIgfSA9IHRoaXMuX3BlcnNwZWN0aXZlRGF0YSE7XG4gICAgICBnbG0ubWF0NC5wZXJzcGVjdGl2ZShcbiAgICAgICAgdGhpcy5fcHJvamVjdGlvbk1hdHJpeCxcbiAgICAgICAgZGVncmVlVG9SYWQoZm92eSksXG4gICAgICAgIGFzcGVjdFJhdGlvISxcbiAgICAgICAgbmVhcixcbiAgICAgICAgZmFyXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgPT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIgfSA9IHRoaXMuX29ydGhvZ29uYWxEYXRhITtcbiAgICAgIGdsbS5tYXQ0Lm9ydGhvKFxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgdG9wLFxuICAgICAgICBib3R0b20sXG4gICAgICAgIG5lYXIsXG4gICAgICAgIGZhclxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbG0ubWF0NC5sb29rQXQodGhpcy5fdmlld01hdHJpeCwgdGhpcy5fZXllLCB0aGlzLl90YXJnZXQsIHRoaXMuX3VwQXhpcyk7XG5cbiAgICB0aGlzLmNvbXB1dGVDb21wb3NlZE1hdHJpeCgpO1xuICB9XG5cbiAgY29tcHV0ZUNvbXBvc2VkTWF0cml4KCkge1xuICAgIGdsbS5tYXQ0Lm11bHRpcGx5KFxuICAgICAgdGhpcy5fY29tcG9zZWRNYXRyaXgsXG4gICAgICB0aGlzLl9wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgdGhpcy5fdmlld01hdHJpeFxuICAgICk7XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uTWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fcHJvamVjdGlvbk1hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRWaWV3TWF0cml4KGluTWF0NDogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGdsbS5tYXQ0LmNvcHkodGhpcy5fdmlld01hdHJpeCwgaW5NYXQ0KTtcbiAgfVxuICBzZXRDb21wb3NlZE1hdHJpeChpbk1hdDQ6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBnbG0ubWF0NC5jb3B5KHRoaXMuX2NvbXBvc2VkTWF0cml4LCBpbk1hdDQpO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbk1hdHJpeCgpOiBnbG0uUmVhZG9ubHlNYXQ0IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbk1hdHJpeDtcbiAgfVxuICBnZXRWaWV3TWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWF0cml4O1xuICB9XG4gIGdldENvbXBvc2VkTWF0cml4KCk6IGdsbS5SZWFkb25seU1hdDQge1xuICAgIHJldHVybiB0aGlzLl9jb21wb3NlZE1hdHJpeDtcbiAgfVxuXG4gIC8vXG5cbiAgZ2V0UGVyc3BlY3RpdmVEYXRhKCk6IFJlYWRvbmx5PElQZXJzcGVjdGl2ZURhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLnBlcnNwZWN0aXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlRGF0YTtcbiAgfVxuICBnZXRPcnRob2dvbmFsRGF0YSgpOiBSZWFkb25seTxJT3J0aG9nb25hbERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvblR5cGUgIT09IFByb2plY3Rpb25UeXBlLm9ydGhvZ29uYWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGFuIG9ydGhvZ29uYWwgcHJvamVjdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb3J0aG9nb25hbERhdGE7XG4gIH1cbn1cbiIsCiAgImltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5lbnVtIEZydXN0dW1TaWRlIHtcbiAgUmlnaHQgPSAwLFxuICBMZWZ0ID0gMSxcbiAgQm90dG9tID0gMixcbiAgVG9wID0gMyxcbiAgQmFjayA9IDQsXG4gIEZyb250ID0gNVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGcnVzdHVtQ3VsbGluZyB7XG4gIGNhbGN1bGF0ZUZydXN0dW0ocHJvajogZ2xtLlJlYWRvbmx5TWF0NCwgdmlldzogZ2xtLlJlYWRvbmx5TWF0NCk6IHZvaWQ7XG4gIHNwaGVyZUluRnJ1c3R1bSh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IGJvb2xlYW47XG4gIHBvaW50SW5GcnVzdHVtKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBib29sZWFuO1xuICBjdWJlSW5GcnVzdHVtKGluWDogbnVtYmVyLCBpblk6IG51bWJlciwgaW5aOiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKTogYm9vbGVhbjtcbiAgY3ViZUluRnJ1c3R1bVZlYzMoY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLCBpblNpemU6IG51bWJlcik6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGcnVzdHVtQ3VsbGluZyBpbXBsZW1lbnRzIElGcnVzdHVtQ3VsbGluZyB7XG4gIHByaXZhdGUgX2ZydXN0dW0gPSBuZXcgRmxvYXQzMkFycmF5KDI0KTsgLy8gNiAqIDQgdmFsdWVzXG5cbiAgcHJpdmF0ZSBfc2V0UGxhbmUoXG4gICAgc2lkZTogRnJ1c3R1bVNpZGUsXG4gICAgbGVmdDogZ2xtLlJlYWRvbmx5VmVjNCxcbiAgICByaWdodDogZ2xtLlJlYWRvbmx5VmVjNCxcbiAgICBjb2VmOiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgaW5kZXggPSBzaWRlICogNDtcblxuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSA9IGxlZnRbMF0gKyByaWdodFswXSAqIGNvZWY7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDFdID0gbGVmdFsxXSArIHJpZ2h0WzFdICogY29lZjtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl0gPSBsZWZ0WzJdICsgcmlnaHRbMl0gKiBjb2VmO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXSA9IGxlZnRbM10gKyByaWdodFszXSAqIGNvZWY7XG5cbiAgICBjb25zdCBtYWduaXR1ZGUgPSBNYXRoLnNxcnQoXG4gICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMF0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMF0gK1xuICAgICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gK1xuICAgICAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl0gKiB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl1cbiAgICApO1xuXG4gICAgaWYgKG1hZ25pdHVkZSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDBdIC89IG1hZ25pdHVkZTtcbiAgICB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMV0gLz0gbWFnbml0dWRlO1xuICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSAvPSBtYWduaXR1ZGU7XG4gICAgdGhpcy5fZnJ1c3R1bVtpbmRleCArIDNdIC89IG1hZ25pdHVkZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUZydXN0dW0ocHJvajogZ2xtLlJlYWRvbmx5TWF0NCwgdmlldzogZ2xtLlJlYWRvbmx5TWF0NCkge1xuICAgIGNvbnN0IGNsaXAgPSBnbG0ubWF0NC5tdWx0aXBseShnbG0ubWF0NC5jcmVhdGUoKSwgcHJvaiwgdmlldyk7XG5cbiAgICAvLy9cblxuICAgIGNvbnN0IHJvdzAgPSBnbG0udmVjNC5mcm9tVmFsdWVzKGNsaXBbMF0sIGNsaXBbNF0sIGNsaXBbOF0sIGNsaXBbMTJdKTtcbiAgICBjb25zdCByb3cxID0gZ2xtLnZlYzQuZnJvbVZhbHVlcyhjbGlwWzFdLCBjbGlwWzVdLCBjbGlwWzldLCBjbGlwWzEzXSk7XG4gICAgY29uc3Qgcm93MiA9IGdsbS52ZWM0LmZyb21WYWx1ZXMoY2xpcFsyXSwgY2xpcFs2XSwgY2xpcFsxMF0sIGNsaXBbMTRdKTtcbiAgICBjb25zdCByb3czID0gZ2xtLnZlYzQuZnJvbVZhbHVlcyhjbGlwWzNdLCBjbGlwWzddLCBjbGlwWzExXSwgY2xpcFsxNV0pO1xuXG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuUmlnaHQsIHJvdzMsIHJvdzAsIC0xKTtcbiAgICB0aGlzLl9zZXRQbGFuZShGcnVzdHVtU2lkZS5MZWZ0LCByb3czLCByb3cwLCArMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuQm90dG9tLCByb3czLCByb3cxLCArMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuVG9wLCByb3czLCByb3cxLCAtMSk7XG4gICAgdGhpcy5fc2V0UGxhbmUoRnJ1c3R1bVNpZGUuQmFjaywgcm93Mywgcm93MiwgLTEpO1xuICAgIHRoaXMuX3NldFBsYW5lKEZydXN0dW1TaWRlLkZyb250LCByb3czLCByb3cyLCArMSk7XG4gIH1cblxuICBzcGhlcmVJbkZydXN0dW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgNjsgKytpaSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpaSAqIDQ7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXSAqIHggK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAxXSAqIHkgK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAyXSAqIHogK1xuICAgICAgICAgIHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXSA8PVxuICAgICAgICAtcmFkaXVzXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcG9pbnRJbkZydXN0dW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgIC8vIHNwaGVyZSBvZiByYWRpdXMgMCA9PiBwb2ludFxuICAgIHJldHVybiB0aGlzLnNwaGVyZUluRnJ1c3R1bSh4LCB5LCB6LCAwKTtcbiAgfVxuXG4gIGN1YmVJbkZydXN0dW1WZWMzKGNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMywgaW5TaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jdWJlSW5GcnVzdHVtKGNlbnRlclswXSwgY2VudGVyWzFdLCBjZW50ZXJbMl0sIGluU2l6ZSk7XG4gIH1cblxuICBjdWJlSW5GcnVzdHVtKGluWDogbnVtYmVyLCBpblk6IG51bWJlciwgaW5aOiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaFNpemUgPSBpblNpemUgKiAwLjU7XG4gICAgY29uc3QgbWluWCA9IGluWCAtIGhTaXplO1xuICAgIGNvbnN0IG1pblkgPSBpblkgLSBoU2l6ZTtcbiAgICBjb25zdCBtaW5aID0gaW5aIC0gaFNpemU7XG4gICAgY29uc3QgbWF4WCA9IGluWCArIGhTaXplO1xuICAgIGNvbnN0IG1heFkgPSBpblkgKyBoU2l6ZTtcbiAgICBjb25zdCBtYXhaID0gaW5aICsgaFNpemU7XG5cbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgNjsgKytpaSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpaSAqIDQ7XG4gICAgICBjb25zdCBwbGFuQSA9IHRoaXMuX2ZydXN0dW1baW5kZXggKyAwXTtcbiAgICAgIGNvbnN0IHBsYW5CID0gdGhpcy5fZnJ1c3R1bVtpbmRleCArIDFdO1xuICAgICAgY29uc3QgcGxhbkMgPSB0aGlzLl9mcnVzdHVtW2luZGV4ICsgMl07XG4gICAgICBjb25zdCBwbGFuRCA9IHRoaXMuX2ZydXN0dW1baW5kZXggKyAzXTtcblxuICAgICAgaWYgKFxuICAgICAgICBwbGFuQSAqIG1pblggKyBwbGFuQiAqIG1pblkgKyBwbGFuQyAqIG1pblogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtYXhYICsgcGxhbkIgKiBtaW5ZICsgcGxhbkMgKiBtaW5aICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWluWCArIHBsYW5CICogbWF4WSArIHBsYW5DICogbWluWiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1heFggKyBwbGFuQiAqIG1heFkgKyBwbGFuQyAqIG1pblogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtaW5YICsgcGxhbkIgKiBtaW5ZICsgcGxhbkMgKiBtYXhaICsgcGxhbkQgPiAwIHx8XG4gICAgICAgIHBsYW5BICogbWF4WCArIHBsYW5CICogbWluWSArIHBsYW5DICogbWF4WiArIHBsYW5EID4gMCB8fFxuICAgICAgICBwbGFuQSAqIG1pblggKyBwbGFuQiAqIG1heFkgKyBwbGFuQyAqIG1heFogKyBwbGFuRCA+IDAgfHxcbiAgICAgICAgcGxhbkEgKiBtYXhYICsgcGxhbkIgKiBtYXhZICsgcGxhbkMgKiBtYXhaICsgcGxhbkQgPiAwXG4gICAgICApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwKICAiZXhwb3J0IGNsYXNzIFdlYkdMQ29udGV4dCB7XG4gIHByaXZhdGUgc3RhdGljIF9nbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN0YXRpYyBfZXh0ZW5zaW9uTG9zZUNvbnRleHQ6IFdFQkdMX2xvc2VfY29udGV4dCB8IG51bGwgPSBudWxsO1xuXG4gIHN0YXRpYyBpbml0aWFsaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCByZW5kZXJpbmdDb250ZXh0QXR0cmliczogV2ViR0xDb250ZXh0QXR0cmlidXRlcyA9IHtcbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlIGNhbnZhcyBjb250YWlucyBhbiBhbHBoYSBidWZmZXIuXG4gICAgICBhbHBoYTogZmFsc2UsXG5cbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gcGVyZm9ybSBhbnRpLWFsaWFzaW5nLlxuICAgICAgYW50aWFsaWFzOiBmYWxzZSxcblxuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGF0IHRoZSBkcmF3aW5nIGJ1ZmZlciBoYXMgYSBkZXB0aFxuICAgICAgLy8gYnVmZmVyIG9mIGF0IGxlYXN0IDE2IGJpdHMuXG4gICAgICBkZXB0aDogdHJ1ZSxcblxuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiBhIGNvbnRleHQgd2lsbCBiZSBjcmVhdGVkIGlmIHRoZVxuICAgICAgLy8gc3lzdGVtIHBlcmZvcm1hbmNlIGlzIGxvdy5cbiAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ6IGZhbHNlLFxuXG4gICAgICAvLyBBIGhpbnQgdG8gdGhlIHVzZXIgYWdlbnQgaW5kaWNhdGluZyB3aGF0IGNvbmZpZ3VyYXRpb24gb2YgR1BVIGlzXG4gICAgICAvLyBzdWl0YWJsZSBmb3IgdGhlIFdlYkdMIGNvbnRleHQuIFBvc3NpYmxlIHZhbHVlcyBhcmU6XG4gICAgICAvLyBcImRlZmF1bHRcIjpcbiAgICAgIC8vICAgICBMZXQgdGhlIHVzZXIgYWdlbnQgZGVjaWRlIHdoaWNoIEdQVSBjb25maWd1cmF0aW9uIGlzIG1vc3RcbiAgICAgIC8vICAgICBzdWl0YWJsZS4gVGhpcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgIC8vIFwiaGlnaC1wZXJmb3JtYW5jZVwiOlxuICAgICAgLy8gICAgIFByaW9yaXRpemVzIHJlbmRlcmluZyBwZXJmb3JtYW5jZSBvdmVyIHBvd2VyIGNvbnN1bXB0aW9uLlxuICAgICAgLy8gXCJsb3ctcG93ZXJcIjpcbiAgICAgIC8vICAgICBQcmlvcml0aXplcyBwb3dlciBzYXZpbmcgb3ZlciByZW5kZXJpbmcgcGVyZm9ybWFuY2UuXG4gICAgICBwb3dlclByZWZlcmVuY2U6ICdoaWdoLXBlcmZvcm1hbmNlJyxcblxuICAgICAgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGF0IHRoZSBwYWdlIGNvbXBvc2l0b3Igd2lsbCBhc3N1bWUgdGhlXG4gICAgICAvLyBkcmF3aW5nIGJ1ZmZlciBjb250YWlucyBjb2xvcnMgd2l0aCBwcmUtbXVsdGlwbGllZCBhbHBoYS5cbiAgICAgIHByZW11bHRpcGxpZWRBbHBoYTogdHJ1ZSwgLy8gc2xvd2VyIGZyYW1lcmF0ZSB3aGVuIGZhbHNlXG5cbiAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyB0cnVlIHRoZSBidWZmZXJzIHdpbGwgbm90IGJlIGNsZWFyZWQgYW5kIHdpbGxcbiAgICAgIC8vIHByZXNlcnZlIHRoZWlyIHZhbHVlcyB1bnRpbCBjbGVhcmVkIG9yIG92ZXJ3cml0dGVuIGJ5IHRoZSBhdXRob3IuXG4gICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsXG5cbiAgICAgIC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgZHJhd2luZyBidWZmZXIgaGFzIGFcbiAgICAgIC8vIHN0ZW5jaWwgYnVmZmVyIG9mIGF0IGxlYXN0IDggYml0cy5cbiAgICAgIHN0ZW5jaWw6IGZhbHNlXG4gICAgfTtcblxuICAgIFdlYkdMQ29udGV4dC5fZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJywgcmVuZGVyaW5nQ29udGV4dEF0dHJpYnMpO1xuXG4gICAgaWYgKCFXZWJHTENvbnRleHQuX2dsKSB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBjcmVhdGUgd2ViZ2wgY29udGV4dCcpO1xuXG4gICAgV2ViR0xDb250ZXh0Ll9leHRlbnNpb25Mb3NlQ29udGV4dCA9XG4gICAgICBXZWJHTENvbnRleHQuX2dsLmdldEV4dGVuc2lvbignV0VCR0xfbG9zZV9jb250ZXh0Jyk7XG5cbiAgICBXZWJHTENvbnRleHQuX2dsLmdldEV4dGVuc2lvbignRVhUX2NvbG9yX2J1ZmZlcl9mbG9hdCcpO1xuICAgIFdlYkdMQ29udGV4dC5fZ2wuZ2V0RXh0ZW5zaW9uKCdFWFRfZmxvYXRfYmxlbmQnKTtcbiAgfVxuXG4gIC8vXG4gIC8vXG4gIC8vXG5cbiAgc3RhdGljIGdldENvbnRleHQoKSB7XG4gICAgaWYgKCFXZWJHTENvbnRleHQuX2dsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmdsIGNvbnRleHQgbm90IGluaXRpYWxpemVkJyk7XG4gICAgfVxuICAgIHJldHVybiBXZWJHTENvbnRleHQuX2dsO1xuICB9XG5cbiAgLy9cbiAgLy9cbiAgLy9cblxuICBzdGF0aWMgZ2V0RXh0ZW5zaW9uTG9zZUNvbnRleHQoKSB7XG4gICAgcmV0dXJuIFdlYkdMQ29udGV4dC5fZXh0ZW5zaW9uTG9zZUNvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXh0ZW5zaW9uTG9zZUNvbnRleHRTdHJpY3QoKSB7XG4gICAgaWYgKCFXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvc2UgY29udGV4dCBleHRlbnNpb24gbm90IGF2YWlsYWJsZScpO1xuICAgIH1cblxuICAgIHJldHVybiBXZWJHTENvbnRleHQuX2V4dGVuc2lvbkxvc2VDb250ZXh0O1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5cbmV4cG9ydCBlbnVtIEN1YmVNYXBUeXBlIHtcbiAgcG9zaXRpdmVYLFxuICBuZWdhdGl2ZVgsXG4gIHBvc2l0aXZlWSxcbiAgbmVnYXRpdmVZLFxuICBwb3NpdGl2ZVosXG4gIG5lZ2F0aXZlWlxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3ViZU1hcFR5cGUgPSAoaW5UeXBlOiBDdWJlTWFwVHlwZSk6IG51bWJlciA9PiB7XG4gIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgc3dpdGNoIChpblR5cGUpIHtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLnBvc2l0aXZlWDpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1g7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5uZWdhdGl2ZVg6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YO1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUucG9zaXRpdmVZOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWTtcbiAgICBjYXNlIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWTpcbiAgICAgIHJldHVybiBnbC5URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1k7XG4gICAgY2FzZSBDdWJlTWFwVHlwZS5wb3NpdGl2ZVo6XG4gICAgICByZXR1cm4gZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aO1xuICAgIGNhc2UgQ3ViZU1hcFR5cGUubmVnYXRpdmVaOlxuICAgICAgcmV0dXJuIGdsLlRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWjtcbiAgfVxuICAvLyB0aHJvdyBuZXcgRXJyb3IoJ2N1YmUgbWFwOiBpbnZhbGlkIHR5cGUnKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVuYm91bmRDdWJlTWFwIHtcbiAgaW5pdGlhbGl6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQ7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZEN1YmVNYXApID0+IHZvaWQpOiB2b2lkO1xuICBnZXRSYXdPYmplY3QoKTogV2ViR0xUZXh0dXJlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuZEN1YmVNYXAge1xuICBhbGxvY2F0ZSgpOiB2b2lkO1xuICBsb2FkRnJvbU1lbW9yeShpblR5cGU6IEN1YmVNYXBUeXBlLCBpblBpeGVsczogVWludDhBcnJheSk6IHZvaWQ7XG4gIGNvbXBsZXRlKCk6IHZvaWQ7XG4gIGdldFJhd09iamVjdCgpOiBXZWJHTFRleHR1cmU7XG59XG5cbmV4cG9ydCBjbGFzcyBDdWJlTWFwIGltcGxlbWVudHMgSVVuYm91bmRDdWJlTWFwLCBJQm91bmRDdWJlTWFwIHtcbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWluQnVmZmVyU2l6ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdGV4dHVyZTogV2ViR0xUZXh0dXJlIHwgbnVsbCA9IG51bGw7XG5cbiAgaW5pdGlhbGl6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh3aWR0aCA8IDEpIHRocm93IG5ldyBFcnJvcihgY3ViZSBtYXA6IHdpZHRoIGlzIDwgMSwgaW5wdXQ6ICR7d2lkdGh9YCk7XG4gICAgaWYgKGhlaWdodCA8IDEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGN1YmUgbWFwOiBoZWlnaHQgaXMgPCAxLCBpbnB1dDogJHtoZWlnaHR9YCk7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIHRoaXMuX3RleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5fbWluQnVmZmVyU2l6ZSA9IHRoaXMuX3dpZHRoICogdGhpcy5faGVpZ2h0ICogNDtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmRlbGV0ZVRleHR1cmUodGhpcy5fdGV4dHVyZSk7XG4gIH1cblxuICByYXdCaW5kKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdjdWJlIG1hcDogbm90IGluaXRpYWxpemVkJyk7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZEN1YmVNYXApID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnJhd0JpbmQoKTtcblxuICAgIGluQ2FsbGJhY2sodGhpcyk7XG5cbiAgICBDdWJlTWFwLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCBudWxsKTtcbiAgfVxuXG4gIGxvYWRGcm9tTWVtb3J5KGluVHlwZTogQ3ViZU1hcFR5cGUsIGluUGl4ZWxzOiBVaW50OEFycmF5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ2N1YmUgbWFwOiBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICBpZiAoaW5QaXhlbHMubGVuZ3RoIDwgdGhpcy5fbWluQnVmZmVyU2l6ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGN1YmUgbWFwOiBtaXNzLW1hdGNoaW5nIHBpeGVscyBidWZmZXIgc2l6ZSwgaW5wdXQ6ICR7aW5QaXhlbHMubGVuZ3RofWBcbiAgICAgICk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcblxuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICBnZXRDdWJlTWFwVHlwZShpblR5cGUpLFxuICAgICAgbGV2ZWwsXG4gICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgdGhpcy5faGVpZ2h0LFxuICAgICAgYm9yZGVyLFxuICAgICAgc3JjRm9ybWF0LFxuICAgICAgc3JjVHlwZSxcbiAgICAgIGluUGl4ZWxzXG4gICAgKTtcbiAgfVxuXG4gIGFsbG9jYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3QgYm9yZGVyID0gMDtcbiAgICBjb25zdCBzcmNGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHNyY1R5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xuXG4gICAgY29uc3QgcGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fd2lkdGggKiB0aGlzLl9oZWlnaHQgKiA0KTtcblxuICAgIFtcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWCxcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWSxcbiAgICAgIEN1YmVNYXBUeXBlLm5lZ2F0aXZlWixcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWCxcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWSxcbiAgICAgIEN1YmVNYXBUeXBlLnBvc2l0aXZlWlxuICAgIF0uZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2V0Q3ViZU1hcFR5cGUodHlwZSksXG4gICAgICAgIGxldmVsLFxuICAgICAgICBpbnRlcm5hbEZvcm1hdCxcbiAgICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICAgIHRoaXMuX2hlaWdodCxcbiAgICAgICAgYm9yZGVyLFxuICAgICAgICBzcmNGb3JtYXQsXG4gICAgICAgIHNyY1R5cGUsXG4gICAgICAgIHBpeGVsc1xuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfQ1VCRV9NQVApO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICBnbC5URVhUVVJFX0NVQkVfTUFQLFxuICAgICAgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLFxuICAgICAgZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgICApO1xuICB9XG5cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcignY3ViZSBtYXA6IG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ2N1YmUgbWFwOiBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gIH1cblxuICBnZXRSYXdPYmplY3QoKSB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICAvLyBUT0RPOiB0aGlzIGlzIHVnbHlcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICBpbml0aWFsaXplKGRhdGE/OiBudW1iZXJbXSk6IHZvaWQ7XG4gIHJhd0JpbmQoKTogdm9pZDtcbiAgcHJlQmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmREYXRhVGV4dHVyZSBleHRlbmRzIElVbmJvdW5kRGF0YVRleHR1cmUge1xuICB1cGRhdGUoZGF0YTogbnVtYmVyW10pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YVRleHR1cmUgaW1wbGVtZW50cyBJQm91bmREYXRhVGV4dHVyZSB7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIC8vIGluaXRpYWxpemUoZGF0YTogbnVtYmVyW10gPSBbXSwgbnVtQ29tcG9uZW50czogbnVtYmVyID0gMSkge1xuICBpbml0aWFsaXplKGRhdGE6IG51bWJlcltdID0gW10pIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHRleHR1cmUgYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUpO1xuXG4gICAgLy8gbWFrZSBpdCBwb3NzaWJsZSB0byB1c2UgYSBub24tcG93ZXItb2YtMiB0ZXh0dXJlICsgd2UgZG9uJ3QgbmVlZCBhbnkgZmlsdGVyaW5nXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICAgIC8vIHRoaXMudXBkYXRlKGRhdGEsIG51bUNvbXBvbmVudHMpO1xuICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZShkYXRhOiBudW1iZXJbXSwgbnVtQ29tcG9uZW50czogbnVtYmVyID0gMSkge1xuICB1cGRhdGUoZGF0YTogbnVtYmVyW10pIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcignZGF0YSB0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fdGV4dHVyZSk7XG5cbiAgICBjb25zdCBleHBhbmRlZERhdGEgPSBuZXcgRmxvYXQzMkFycmF5KGRhdGEpO1xuXG4gICAgLy8gLy8gZXhwYW5kIHRoZSBkYXRhIHRvIDQgdmFsdWVzIHBlciBwaXhlbC5cbiAgICAvLyBjb25zdCBudW1FbGVtZW50cyA9IGRhdGEubGVuZ3RoIC8gbnVtQ29tcG9uZW50cztcbiAgICAvLyBjb25zdCBleHBhbmRlZERhdGEgPSBuZXcgRmxvYXQzMkFycmF5KG51bUVsZW1lbnRzICogNCk7XG4gICAgLy8gZm9yIChsZXQgaWkgPSAwOyBpaSA8IG51bUVsZW1lbnRzOyArK2lpKSB7XG4gICAgLy8gICBjb25zdCBzcmNPZmZzZXQgPSBpaSAqIG51bUNvbXBvbmVudHM7XG4gICAgLy8gICBjb25zdCBkc3RPZmZzZXQgPSBpaSAqIDQ7XG4gICAgLy8gICBmb3IgKGxldCBqaiA9IDA7IGpqIDwgbnVtQ29tcG9uZW50czsgKytqailcbiAgICAvLyAgICAgZXhwYW5kZWREYXRhW2RzdE9mZnNldCArIGpqXSA9IGRhdGFbc3JjT2Zmc2V0ICsgampdO1xuICAgIC8vIH1cblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICAvLyBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgLy8gY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBMzJGO1xuICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUjMyRjtcbiAgICAvLyBjb25zdCB3aWR0aCA9IG51bUVsZW1lbnRzO1xuICAgIGNvbnN0IHdpZHRoID0gZGF0YS5sZW5ndGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gMTtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIC8vIGNvbnN0IGZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3QgZm9ybWF0ID0gZ2wuUkVEO1xuICAgIC8vIGNvbnN0IHR5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xuICAgIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgZ2wuVEVYVFVSRV8yRCxcbiAgICAgIGxldmVsLFxuICAgICAgaW50ZXJuYWxGb3JtYXQsXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGJvcmRlcixcbiAgICAgIGZvcm1hdCxcbiAgICAgIHR5cGUsXG4gICAgICBleHBhbmRlZERhdGFcbiAgICApO1xuICB9XG5cbiAgcmF3QmluZCgpIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcignZGF0YSB0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fdGV4dHVyZSk7XG4gIH1cblxuICBwcmVCaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRGF0YVRleHR1cmUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnJhd0JpbmQoKTtcbiAgICBpbkNhbGxiYWNrKHRoaXMpO1xuICB9XG5cbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZERhdGFUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5wcmVCaW5kKGluQ2FsbGJhY2spO1xuICAgIERhdGFUZXh0dXJlLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFcnJvciA9ICgpID0+IHtcbiAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICBjb25zdCBlcnJvcklkID0gZ2wuZ2V0RXJyb3IoKTtcblxuICBzd2l0Y2ggKGVycm9ySWQpIHtcbiAgICAvLyBHTF9OT19FUlJPUlxuICAgIC8vICAgTm8gZXJyb3IgaGFzIGJlZW4gcmVjb3JkZWQuIFRoZSB2YWx1ZSBvZiB0aGlzIHN5bWJvbGljIGNvbnN0YW50IGlzIGd1YXJhbnRlZWQgdG8gYmUgMC5cbiAgICBjYXNlIGdsLklOVkFMSURfRU5VTTpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2dsLklOVkFMSURfRU5VTVxcbkFuIHVuYWNjZXB0YWJsZSB2YWx1ZSBpcyBzcGVjaWZpZWQgZm9yIGFuIGVudW1lcmF0ZWQgYXJndW1lbnQuIFRoZSBvZmZlbmRpbmcgY29tbWFuZCBpcyBpZ25vcmVkIGFuZCBoYXMgbm8gb3RoZXIgc2lkZSBlZmZlY3QgdGhhbiB0byBzZXQgdGhlIGVycm9yIGZsYWcuJ1xuICAgICAgKTtcbiAgICBjYXNlIGdsLklOVkFMSURfVkFMVUU6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnbC5JTlZBTElEX1ZBTFVFXFxuQSBudW1lcmljIGFyZ3VtZW50IGlzIG91dCBvZiByYW5nZS4gVGhlIG9mZmVuZGluZyBjb21tYW5kIGlzIGlnbm9yZWQgYW5kIGhhcyBubyBvdGhlciBzaWRlIGVmZmVjdCB0aGFuIHRvIHNldCB0aGUgZXJyb3IgZmxhZy4nXG4gICAgICApO1xuICAgIGNhc2UgZ2wuSU5WQUxJRF9PUEVSQVRJT046XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnbC5JTlZBTElEX09QRVJBVElPTlxcblRoZSBzcGVjaWZpZWQgb3BlcmF0aW9uIGlzIG5vdCBhbGxvd2VkIGluIHRoZSBjdXJyZW50IHN0YXRlLiBUaGUgb2ZmZW5kaW5nIGNvbW1hbmQgaXMgaWdub3JlZCBhbmQgaGFzIG5vIG90aGVyIHNpZGUgZWZmZWN0IHRoYW4gdG8gc2V0IHRoZSBlcnJvciBmbGFnLidcbiAgICAgICk7XG4gICAgY2FzZSBnbC5JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTjpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2dsLklOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OXFxuVGhlIGZyYW1lYnVmZmVyIG9iamVjdCBpcyBub3QgY29tcGxldGUuIFRoZSBvZmZlbmRpbmcgY29tbWFuZCBpcyBpZ25vcmVkIGFuZCBoYXMgbm8gb3RoZXIgc2lkZSBlZmZlY3QgdGhhbiB0byBzZXQgdGhlIGVycm9yIGZsYWcuJ1xuICAgICAgKTtcbiAgICBjYXNlIGdsLk9VVF9PRl9NRU1PUlk6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnbC5PVVRfT0ZfTUVNT1JZXFxuVGhlcmUgaXMgbm90IGVub3VnaCBtZW1vcnkgbGVmdCB0byBleGVjdXRlIHRoZSBjb21tYW5kLiBUaGUgc3RhdGUgb2YgdGhlIEdMIGlzIHVuZGVmaW5lZCwgZXhjZXB0IGZvciB0aGUgc3RhdGUgb2YgdGhlIGVycm9yIGZsYWdzLCBhZnRlciB0aGlzIGVycm9yIGlzIHJlY29yZGVkLidcbiAgICAgICk7XG4gICAgY2FzZSBnbC5DT05URVhUX0xPU1RfV0VCR0w6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnbC5DT05URVhUX0xPU1RfV0VCR0xcXG4gSWYgdGhlIFdlYkdMIGNvbnRleHQgaXMgbG9zdCwgdGhpcyBlcnJvciBpcyByZXR1cm5lZCBvbiB0aGUgZmlyc3QgY2FsbCB0byBnZXRFcnJvci4gQWZ0ZXJ3YXJkcyBhbmQgdW50aWwgdGhlIGNvbnRleHQgaGFzIGJlZW4gcmVzdG9yZWQsIGl0IHJldHVybnMgZ2wuTk9fRVJST1IuJ1xuICAgICAgKTtcbiAgICAvLyBjYXNlIGdsLlNUQUNLX1VOREVSRkxPVzpcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcIkFuIGF0dGVtcHQgaGFzIGJlZW4gbWFkZSB0byBwZXJmb3JtIGFuIG9wZXJhdGlvbiB0aGF0IHdvdWxkIGNhdXNlIGFuIGludGVybmFsIHN0YWNrIHRvIHVuZGVyZmxvdy5cIilcbiAgICAvLyBjYXNlIGdsLlNUQUNLX09WRVJGTE9XOlxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gYXR0ZW1wdCBoYXMgYmVlbiBtYWRlIHRvIHBlcmZvcm0gYW4gb3BlcmF0aW9uIHRoYXQgd291bGQgY2F1c2UgYW4gaW50ZXJuYWwgc3RhY2sgdG8gb3ZlcmZsb3cuXCIpXG4gIH1cbn07XG4iLAogICJpbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5cbmV4cG9ydCBjbGFzcyBGZW5jZVN5bmMge1xuICBwcml2YXRlIF9zeW5jOiBXZWJHTFN5bmMgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9zeW5jKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJmZW5jZSBub3Qgc3RhcnRlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmRlbGV0ZVN5bmModGhpcy5fc3luYyk7XG4gICAgdGhpcy5fc3luYyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlzU3RhcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3luYyAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N5bmMpIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcihcImZlbmNlIGFscmVhZHkgc3RhcnRlZFwiKTtcbiAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgY29uc3QgdG1wU3luYyA9IGdsLmZlbmNlU3luYyhnbC5TWU5DX0dQVV9DT01NQU5EU19DT01QTEVURSwgMCk7XG4gICAgaWYgKHRtcFN5bmMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IGNyZWF0ZSBhIHdlYmdsIGZlbmNlJyk7XG4gICAgfVxuICAgIHRoaXMuX3N5bmMgPSB0bXBTeW5jO1xuICAgIGdsLmZsdXNoKCk7XG4gICAgZ2wuZmluaXNoKCk7XG4gIH1cblxuICBpc1NpZ25hbGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fc3luYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmZW5jZSBub3Qgc3RhcnRlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBjb25zdCBzaWduYWxlZCA9IGdsLmdldFN5bmNQYXJhbWV0ZXIodGhpcy5fc3luYywgZ2wuU1lOQ19TVEFUVVMpO1xuICAgIHJldHVybiBzaWduYWxlZCA9PT0gZ2wuU0lHTkFMRUQ7XG4gIH1cblxuICB3YWl0KHRpbWVvdXROYW5vU2VjOiBudW1iZXIpOiAnZG9uZScgfCAndGltZWQtb3V0JyB7XG4gICAgaWYgKCF0aGlzLl9zeW5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlbmNlIG5vdCBzdGFydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IGJpdGZsYWdzID0gMDtcbiAgICBjb25zdCBzdGF0dXMgPSBnbC5jbGllbnRXYWl0U3luYyh0aGlzLl9zeW5jLCBiaXRmbGFncywgdGltZW91dE5hbm9TZWMpO1xuXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgIGNhc2UgZ2wuVElNRU9VVF9FWFBJUkVEOlxuICAgICAgICAvLyBpdCdzIG5vdCBkb25lLCBjaGVjayBhZ2FpbiBuZXh0IHRpbWVcbiAgICAgICAgcmV0dXJuICd0aW1lZC1vdXQnO1xuICAgICAgY2FzZSBnbC5XQUlUX0ZBSUxFRDpcbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdmZW5jZS53YWl0IC0+IHNob3VsZCBuZXZlciBnZXQgaGVyZScpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ2ZlbmNlLndhaXQgLT4gc2hvdWxkIG5ldmVyIGdldCBoZXJlJyk7XG4gICAgICAgIC8vIHJldHVybiAndGltZWQtb3V0JztcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiAnZG9uZSc7XG4gICAgICBjYXNlIGdsLkFMUkVBRFlfU0lHTkFMRUQ6XG4gICAgICBjYXNlIGdsLkNPTkRJVElPTl9TQVRJU0ZJRUQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgcmV0dXJuICdkb25lJztcbiAgICB9XG4gIH1cbn1cbiIsCiAgImltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcbmltcG9ydCB7IElCb3VuZFRleHR1cmUgfSBmcm9tICcuL1RleHR1cmUnO1xuaW1wb3J0IHsgQ3ViZU1hcFR5cGUsIElCb3VuZEN1YmVNYXAsIGdldEN1YmVNYXBUeXBlIH0gZnJvbSAnLi9DdWJlTWFwJztcblxuZXhwb3J0IGludGVyZmFjZSBJVW5ib3VuZEZyYW1lQnVmZmVyIHtcbiAgcmF3QmluZCgpOiB2b2lkO1xuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kRnJhbWVCdWZmZXIpID0+IHZvaWQpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuZEZyYW1lQnVmZmVyIHtcbiAgYXR0YWNoVGV4dHVyZSh0ZXh0dXJlOiBJQm91bmRUZXh0dXJlKTogdm9pZDtcbiAgYXR0YWNoRGVwdGhUZXh0dXJlKHRleHR1cmU6IElCb3VuZFRleHR1cmUpOiB2b2lkO1xuICBhdHRhY2hDdWJlTWFwKHRleHR1cmU6IElCb3VuZEN1YmVNYXAsIHR5cGU6IEN1YmVNYXBUeXBlKTogdm9pZDtcbiAgZ2V0UGl4ZWxzKFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBvdXREc3Q6IFVpbnQ4QXJyYXlcbiAgKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEZyYW1lQnVmZmVyIGltcGxlbWVudHMgSVVuYm91bmRGcmFtZUJ1ZmZlciwgSUJvdW5kRnJhbWVCdWZmZXIge1xuICBwcml2YXRlIF9mcmFtZUJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCB0bXBGYm8gPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgIGlmICh0bXBGYm8gPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignbnVsbCBmcmFtZSBidWZmZXIgb2JqZWN0Jyk7XG4gICAgdGhpcy5fZnJhbWVCdWZmZXIgPSB0bXBGYm87XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlcih0aGlzLl9mcmFtZUJ1ZmZlcik7XG4gIH1cblxuICByYXdCaW5kKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX2ZyYW1lQnVmZmVyKTtcbiAgfVxuXG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRGcmFtZUJ1ZmZlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmF3QmluZCgpO1xuXG4gICAgaW5DYWxsYmFjayh0aGlzKTtcblxuICAgIEZyYW1lQnVmZmVyLnVuYmluZCgpO1xuICB9XG5cbiAgc3RhdGljIHVuYmluZCgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuICB9XG5cbiAgYXR0YWNoVGV4dHVyZSh0ZXh0dXJlOiBJQm91bmRUZXh0dXJlKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgLy8gZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9mcmFtZUJ1ZmZlcik7XG5cbiAgICAvLyB0ZXh0dXJlLnJhd0JpbmQoKTtcblxuICAgIGNvbnN0IG1pcG1hcExldmVsID0gMDtcblxuICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKFxuICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICBnbC5DT0xPUl9BVFRBQ0hNRU5UMCxcbiAgICAgIGdsLlRFWFRVUkVfMkQsXG4gICAgICB0ZXh0dXJlLmdldFJhd09iamVjdCgpLFxuICAgICAgbWlwbWFwTGV2ZWxcbiAgICApO1xuICB9XG5cbiAgYXR0YWNoRGVwdGhUZXh0dXJlKHRleHR1cmU6IElCb3VuZFRleHR1cmUpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX2ZyYW1lQnVmZmVyKTtcblxuICAgIC8vIHRleHR1cmUucmF3QmluZCgpO1xuXG4gICAgY29uc3QgbWlwbWFwTGV2ZWwgPSAwO1xuXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXG4gICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgIGdsLkRFUFRIX0FUVEFDSE1FTlQsXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgdGV4dHVyZS5nZXRSYXdPYmplY3QoKSxcbiAgICAgIG1pcG1hcExldmVsXG4gICAgKTtcbiAgfVxuXG4gIGF0dGFjaEN1YmVNYXAodGV4dHVyZTogSUJvdW5kQ3ViZU1hcCwgdHlwZTogQ3ViZU1hcFR5cGUpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX2ZyYW1lQnVmZmVyKTtcblxuICAgIC8vIHRleHR1cmUucmF3QmluZCgpO1xuXG4gICAgY29uc3QgbWlwbWFwTGV2ZWwgPSAwO1xuXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXG4gICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgZ2V0Q3ViZU1hcFR5cGUodHlwZSksXG4gICAgICB0ZXh0dXJlLmdldFJhd09iamVjdCgpLFxuICAgICAgbWlwbWFwTGV2ZWxcbiAgICApO1xuICB9XG5cbiAgZ2V0UGl4ZWxzKFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBvdXREc3Q6IFVpbnQ4QXJyYXlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnJlYWRQaXhlbHMoeCwgeSwgd2lkdGgsIGhlaWdodCwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgb3V0RHN0KTtcbiAgfVxufVxuIiwKICAiaW1wb3J0IHsgV2ViR0xDb250ZXh0IH0gZnJvbSAnLi9XZWJHTENvbnRleHQnO1xuaW1wb3J0IHsgSVVuYm91bmRTaGFkZXIgfSBmcm9tICcuL1NoYWRlclByb2dyYW0nO1xuXG5leHBvcnQgY29uc3QgQnl0ZXNQZXJQaXhlbCA9IDQ7IC8vIGZsb2F0IChmbG9hdDMyID0gNCBieXRlcylcblxuZXhwb3J0IGVudW0gQXR0cmlidXRlVHlwZSB7XG4gIGZsb2F0LFxuICB2ZWMyZixcbiAgdmVjM2YsXG4gIHZlYzRmLFxuICBtYXQzZixcbiAgbWF0NGZcbn1cblxuY29uc3QgZ2V0QXR0clR5cGVTaXplID0gKGluVHlwZTogQXR0cmlidXRlVHlwZSkgPT4ge1xuICBzd2l0Y2ggKGluVHlwZSkge1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS5mbG9hdDpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMzZjpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWM0ZjpcbiAgICAgIHJldHVybiA0O1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgIHJldHVybiA5O1xuICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQ0ZjpcbiAgICAgIHJldHVybiAxNjtcbiAgfVxufTtcblxuZXhwb3J0IGVudW0gUHJpbWl0aXZlVHlwZSB7XG4gIGxpbmVzLFxuICB0cmlhbmdsZXMsXG4gIHRyaWFuZ2xlU3RyaXBcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYm9BdHRyIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBBdHRyaWJ1dGVUeXBlO1xuICBpbmRleDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZib0RlZmluaXRpb24ge1xuICBhdHRyczogVmJvQXR0cltdO1xuICBzdHJpZGU/OiBudW1iZXI7XG4gIGluc3RhbmNlZDogYm9vbGVhbjtcbiAgbW9kZT86ICdzdGF0aWMnIHwgJ2R5bmFtaWMnIHwgJ3N0cmVhbWluZyc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvbWV0cnlEZWZpbml0aW9uIHtcbiAgdmJvczogVmJvRGVmaW5pdGlvbltdO1xuICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlO1xufVxuXG5jb25zdCBfZW5zdXJlRmxvYXRCdWZmZXIgPSAoXG4gIHZlcnRpY2VzOiBSZWFkb25seUFycmF5PG51bWJlcj4gfCBSZWFkb25seTxGbG9hdDMyQXJyYXk+XG4pOiBSZWFkb25seTxGbG9hdDMyQXJyYXk+ID0+IHtcbiAgaWYgKHZlcnRpY2VzIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5KSB7XG4gICAgcmV0dXJuIHZlcnRpY2VzO1xuICB9XG4gIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcbn07XG5cbmludGVyZmFjZSBJVmJvRGF0YSB7XG4gIG9iamVjdDogV2ViR0xCdWZmZXI7XG4gIG1heFNpemU6IG51bWJlcjtcbiAgbW9kZTogJ3N0YXRpYycgfCAnZHluYW1pYycgfCAnc3RyZWFtaW5nJztcbn1cblxuY29uc3QgX2dldEJ1ZmZlclVzYWdlID0gKGluTW9kZTogJ3N0YXRpYycgfCAnZHluYW1pYycgfCAnc3RyZWFtaW5nJykgPT4ge1xuICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgaWYgKGluTW9kZSA9PT0gJ2R5bmFtaWMnKSB7XG4gICAgcmV0dXJuIGdsLkRZTkFNSUNfRFJBVztcbiAgfVxuICBpZiAoaW5Nb2RlID09PSAnc3RyZWFtaW5nJykge1xuICAgIHJldHVybiBnbC5TVFJFQU1fRFJBVztcbiAgfVxuICByZXR1cm4gZ2wuU1RBVElDX0RSQVc7XG59O1xuXG5leHBvcnQgY2xhc3MgR2VvbWV0cnkge1xuICBwcml2YXRlIF9kZWY6IEdlb21ldHJ5RGVmaW5pdGlvbjtcbiAgcHJpdmF0ZSBfdmFvOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTO1xuICBwcml2YXRlIF92Ym9zOiBJVmJvRGF0YVtdO1xuICBwcml2YXRlIF9wcmltaXRpdmVUeXBlOiBudW1iZXI7XG4gIHByaXZhdGUgX3ByaW1pdGl2ZVN0YXJ0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9wcmltaXRpdmVDb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VDb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaXNJbnN0YW5jZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihzaGFkZXI6IElVbmJvdW5kU2hhZGVyLCBkZWY6IEdlb21ldHJ5RGVmaW5pdGlvbikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGlmIChkZWYudmJvcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZW1wdHkgdmJvIGRlZmluaXRpb24nKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHZibyBvZiBkZWYudmJvcykge1xuICAgICAgaWYgKHZiby5hdHRycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbXB0eSB2Ym8gYXR0cmlidXRlIGRlZmluaXRpb24nKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZiby5hdHRycykge1xuICAgICAgICBpZiAoIXNoYWRlci5oYXNBdHRyaWJ1dGUoYXR0ci5uYW1lKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXR0cmlidXRlIG5vdCBmb3VuZCwgbmFtZT1cIiR7YXR0ci5uYW1lfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9kZWYgPSBkZWY7XG5cbiAgICBzd2l0Y2ggKGRlZi5wcmltaXRpdmVUeXBlKSB7XG4gICAgICBjYXNlIFByaW1pdGl2ZVR5cGUubGluZXM6XG4gICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUgPSBnbC5MSU5FUztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFByaW1pdGl2ZVR5cGUudHJpYW5nbGVzOlxuICAgICAgICB0aGlzLl9wcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVTO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUHJpbWl0aXZlVHlwZS50cmlhbmdsZVN0cmlwOlxuICAgICAgICB0aGlzLl9wcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVfU1RSSVA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmltaXRpdmUgdHlwZSBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdWYW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGlmICghbmV3VmFvKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhaWwgbyBjcmVhdGUgYSB2YW8gdW5pdCcpO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbyA9IG5ld1ZhbztcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5fdmFvKTtcblxuICAgIC8vXG5cbiAgICB0aGlzLl92Ym9zID0gW107XG4gICAgZm9yIChjb25zdCB2Ym9EZWYgb2YgdGhpcy5fZGVmLnZib3MpIHtcbiAgICAgIGNvbnN0IG5ld1ZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgaWYgKCFuZXdWYm8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWlsIG8gY3JlYXRlIGEgdmJvIHVuaXQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdmJvcy5wdXNoKHtcbiAgICAgICAgb2JqZWN0OiBuZXdWYm8sXG4gICAgICAgIG1heFNpemU6IDAsXG4gICAgICAgIG1vZGU6IHZib0RlZi5tb2RlIHx8ICdzdGF0aWMnXG4gICAgICB9KTtcblxuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG5ld1Zibyk7XG5cbiAgICAgIGxldCBzdHJpZGUgPSB2Ym9EZWYuc3RyaWRlIHx8IDA7XG4gICAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgICAvLyBhdXRvIGRldGVybWluZSBzdHJpZGUgdmFsdWVcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZib0RlZi5hdHRycykge1xuICAgICAgICAgIHN3aXRjaCAoYXR0ci50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUuZmxvYXQ6XG4gICAgICAgICAgICAgIHN0cmlkZSArPSAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgICAgICAgICAgc3RyaWRlICs9IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLnZlYzNmOlxuICAgICAgICAgICAgICBzdHJpZGUgKz0gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZVR5cGUudmVjNGY6XG4gICAgICAgICAgICAgIHN0cmlkZSArPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgICAgICAgICAgc3RyaWRlICs9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVUeXBlLm1hdDRmOlxuICAgICAgICAgICAgICBzdHJpZGUgKz0gMTY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdHJpZGUgKj0gQnl0ZXNQZXJQaXhlbDtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZib0RlZi5hdHRycykge1xuICAgICAgICBsZXQgcm93U2l6ZSA9IDE7XG4gICAgICAgIGxldCB0b3RhbFJvd3MgPSAxO1xuICAgICAgICBzd2l0Y2ggKGF0dHIudHlwZSkge1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5mbG9hdDpcbiAgICAgICAgICAgIHJvd1NpemUgPSAxO1xuICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMyZjpcbiAgICAgICAgICAgIHJvd1NpemUgPSAyO1xuICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWMzZjpcbiAgICAgICAgICAgIHJvd1NpemUgPSAzO1xuICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS52ZWM0ZjpcbiAgICAgICAgICAgIHJvd1NpemUgPSA0O1xuICAgICAgICAgICAgdG90YWxSb3dzID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQzZjpcbiAgICAgICAgICAgIHJvd1NpemUgPSAzO1xuICAgICAgICAgICAgdG90YWxSb3dzID0gMztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0cmlidXRlVHlwZS5tYXQ0ZjpcbiAgICAgICAgICAgIHJvd1NpemUgPSA0O1xuICAgICAgICAgICAgdG90YWxSb3dzID0gNDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXR0ckxvY2F0aW9uID0gc2hhZGVyLmdldEF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoZSBpbmRleCBpcyAwIG9uIGs+MCBhbmQgYXNzZXJ0L3Rocm93IG9uIGl0XG5cbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHRvdGFsUm93czsgKytpaSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJJZCA9IGF0dHJMb2NhdGlvbiArIGlpO1xuICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gKGF0dHIuaW5kZXggKyBpaSAqIHJvd1NpemUpICogQnl0ZXNQZXJQaXhlbDtcblxuICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJJZCk7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgIGF0dHJJZCxcbiAgICAgICAgICAgIHJvd1NpemUsXG4gICAgICAgICAgICBnbC5GTE9BVCxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgc3RyaWRlLFxuICAgICAgICAgICAgcm93SW5kZXhcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHZib0RlZi5pbnN0YW5jZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoYXR0cklkLCAxKTtcbiAgICAgICAgICAgIHRoaXMuX2lzSW5zdGFuY2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuXG4gICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHZibyBvZiB0aGlzLl92Ym9zKSB7XG4gICAgICBnbC5kZWxldGVCdWZmZXIodmJvLm9iamVjdCk7XG4gICAgfVxuICAgIHRoaXMuX3Zib3MubGVuZ3RoID0gMDtcblxuICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KHRoaXMuX3Zhbyk7XG4gIH1cblxuICBzZXRCdWZmZXJTaXplKGluSW5kZXg6IG51bWJlciwgaW5TaXplOiBudW1iZXIpIHtcbiAgICBpZiAoaW5JbmRleCA8IDAgfHwgaW5JbmRleCA+PSB0aGlzLl92Ym9zLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBubyB2Ym8gYXZhaWxhYmxlIHRvIHRoYXQgaW5kZXggKGlucHV0OiAke2luSW5kZXh9KWApO1xuICAgIH1cblxuICAgIGlmIChpblNpemUgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB2Ym8gbXVzdCBiZSA+IDAgKGlucHV0OiAke2luU2l6ZX0pYCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3VyclZibyA9IHRoaXMuX3Zib3NbaW5JbmRleF07XG5cbiAgICBpZiAoaW5TaXplIDwgY3VyclZiby5tYXhTaXplKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VyclZiby5tYXhTaXplID0gaW5TaXplO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGN1cnJWYm8ub2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgaW5TaXplLCBfZ2V0QnVmZmVyVXNhZ2UoY3VyclZiby5tb2RlKSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xuICB9XG5cbiAgc2V0RmxvYXRCdWZmZXJTaXplKGluZGV4OiBudW1iZXIsIGluU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRCdWZmZXJTaXplKGluZGV4LCBpblNpemUgKiA0KTtcbiAgfVxuXG4gIGFsbG9jYXRlQnVmZmVyKFxuICAgIGluSW5kZXg6IG51bWJlcixcbiAgICBpblZlcnRpY2VzOiBSZWFkb25seUFycmF5PG51bWJlcj4gfCBSZWFkb25seTxGbG9hdDMyQXJyYXk+LFxuICAgIGluU2l6ZTogbnVtYmVyXG4gICkge1xuICAgIGlmIChpbkluZGV4IDwgMCB8fCBpbkluZGV4ID49IHRoaXMuX3Zib3MubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBubyB2Ym8gYXZhaWxhYmxlIHRvIHRoYXQgaW5kZXggKGlucHV0OiAke2luSW5kZXh9LCB0b3RhbCB2Ym9zOiAke3RoaXMuX3Zib3MubGVuZ3RofSlgXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpblNpemUgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzaXplIG11c3QgYmUgPiAwIChpbnB1dDogJHtpblNpemV9KWApO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJWYm8gPSB0aGlzLl92Ym9zW2luSW5kZXhdO1xuXG4gICAgaWYgKGluU2l6ZSA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHZibyBtdXN0IGJlID4gMCAoaW5wdXQ6ICR7aW5TaXplfSlgKTtcbiAgICB9XG5cbiAgICBjdXJyVmJvLm1heFNpemUgPSBpblNpemU7XG5cbiAgICBjb25zdCBidWZmZXIgPSBfZW5zdXJlRmxvYXRCdWZmZXIoaW5WZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3VyclZiby5vYmplY3QpO1xuICAgIGdsLmJ1ZmZlckRhdGEoXG4gICAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgICBidWZmZXIsXG4gICAgICBfZ2V0QnVmZmVyVXNhZ2UoY3VyclZiby5tb2RlKSxcbiAgICAgIDAsXG4gICAgICBpblNpemVcbiAgICApO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgfVxuXG4gIHVwZGF0ZUJ1ZmZlcihcbiAgICBpbkluZGV4OiBudW1iZXIsXG4gICAgaW5WZXJ0aWNlczogUmVhZG9ubHlBcnJheTxudW1iZXI+IHwgUmVhZG9ubHk8RmxvYXQzMkFycmF5PixcbiAgICBpblNpemU6IG51bWJlcixcbiAgICBpblN0YXJ0T2Zmc2V0PzogbnVtYmVyXG4gICkge1xuICAgIGlmIChpbkluZGV4IDwgMCB8fCBpbkluZGV4ID49IHRoaXMuX3Zib3MubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBubyB2Ym8gYXZhaWxhYmxlIHRvIHRoYXQgaW5kZXggKGlucHV0OiAke2luSW5kZXh9LCB0b3RhbCB2Ym9zOiAke3RoaXMuX3Zib3MubGVuZ3RofSlgXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpblNpemUgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzaXplIG11c3QgYmUgPiAwIChpbnB1dDogJHtpblNpemV9KWApO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJWYm8gPSB0aGlzLl92Ym9zW2luSW5kZXhdO1xuXG4gICAgaWYgKGluU3RhcnRPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGluU3RhcnRPZmZzZXQgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgb2Zmc2V0IG11c3QgYmUgPj0gMCAoaW5wdXQ6ICR7aW5TdGFydE9mZnNldH0pYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBlbmRJbmRleCA9IGluU3RhcnRPZmZzZXQgKyBpblNpemU7XG4gICAgICBpZiAoZW5kSW5kZXggPiBjdXJyVmJvLm1heFNpemUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBvZmZzZXQgKyBzaXplID4gdG8gdmJvIG1heCBzaXplIChpbnB1dDogJHtlbmRJbmRleH0sIG1heCBzaXplOiAke2N1cnJWYm8ubWF4U2l6ZX0pYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5TaXplID4gY3VyclZiby5tYXhTaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBzaXplIG11c3QgYmUgPCB0byB2Ym8gbWF4IHNpemUgKGlucHV0OiAke2luU2l6ZX0sIG1heCBzaXplOiAke2N1cnJWYm8ubWF4U2l6ZX0pYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXIgPSBfZW5zdXJlRmxvYXRCdWZmZXIoaW5WZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY3VyclZiby5vYmplY3QpO1xuICAgIGdsLmJ1ZmZlclN1YkRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBpblN0YXJ0T2Zmc2V0ID8/IDAsIGJ1ZmZlciwgMCwgaW5TaXplKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuX3ByaW1pdGl2ZUNvdW50ID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNJbnN0YW5jZWQgJiYgdGhpcy5faW5zdGFuY2VDb3VudCA9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuX3Zhbyk7XG5cbiAgICBpZiAodGhpcy5faXNJbnN0YW5jZWQgPT09IHRydWUpIHtcbiAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQoXG4gICAgICAgIHRoaXMuX3ByaW1pdGl2ZVR5cGUsXG4gICAgICAgIHRoaXMuX3ByaW1pdGl2ZVN0YXJ0LFxuICAgICAgICB0aGlzLl9wcmltaXRpdmVDb3VudCxcbiAgICAgICAgdGhpcy5faW5zdGFuY2VDb3VudFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2wuZHJhd0FycmF5cyhcbiAgICAgICAgdGhpcy5fcHJpbWl0aXZlVHlwZSxcbiAgICAgICAgdGhpcy5fcHJpbWl0aXZlU3RhcnQsXG4gICAgICAgIHRoaXMuX3ByaW1pdGl2ZUNvdW50XG4gICAgICApO1xuICAgIH1cblxuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcbiAgfVxuXG4gIHNldFByaW1pdGl2ZVN0YXJ0KHN0YXJ0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9wcmltaXRpdmVTdGFydCA9IHN0YXJ0O1xuICB9XG5cbiAgc2V0UHJpbWl0aXZlQ291bnQoY291bnQ6IG51bWJlcikge1xuICAgIHRoaXMuX3ByaW1pdGl2ZUNvdW50ID0gY291bnQ7XG4gIH1cblxuICBzZXRJbnN0YW5jZWRDb3VudChjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5zdGFuY2VDb3VudCA9IGNvdW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZW9tZXRyeUJ1aWxkZXIge1xuICBwcml2YXRlIF9kZWY6IEdlb21ldHJ5RGVmaW5pdGlvbiA9IHtcbiAgICB2Ym9zOiBbXSxcbiAgICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlLmxpbmVzXG4gIH07XG5cbiAgcmVzZXQoKTogdGhpcyB7XG4gICAgdGhpcy5fZGVmID0ge1xuICAgICAgdmJvczogW10sXG4gICAgICBwcmltaXRpdmVUeXBlOiBQcmltaXRpdmVUeXBlLmxpbmVzXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldERlZigpOiBHZW9tZXRyeURlZmluaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9kZWY7XG4gIH1cblxuICBzZXRQcmltaXRpdmVUeXBlKGluUHJpbWl0aXZlOiAnbGluZXMnIHwgJ3RyaWFuZ2xlcycgfCAndHJpYW5nbGVTdHJpcCcpOiB0aGlzIHtcbiAgICB0aGlzLl9kZWYucHJpbWl0aXZlVHlwZSA9IFByaW1pdGl2ZVR5cGVbaW5QcmltaXRpdmVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFZibygpOiB0aGlzIHtcbiAgICB0aGlzLl9kZWYudmJvcy5wdXNoKHtcbiAgICAgIGF0dHJzOiBbXSxcbiAgICAgIC8vIHN0cmlkZTogMCxcbiAgICAgIGluc3RhbmNlZDogZmFsc2VcbiAgICAgIC8vIGR5bmFtaWM6IGZhbHNlLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFZib0FzSW5zdGFuY2VkKCk6IHRoaXMge1xuICAgIHRoaXMuX2dldExhc3RWYm8oKS5pbnN0YW5jZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFZib0FzRHluYW1pYygpOiB0aGlzIHtcbiAgICB0aGlzLl9nZXRMYXN0VmJvKCkubW9kZSA9ICdkeW5hbWljJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzZXRWYm9Bc1N0cmVhbWluZygpOiB0aGlzIHtcbiAgICB0aGlzLl9nZXRMYXN0VmJvKCkubW9kZSA9ICdzdHJlYW1pbmcnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFN0cmlkZShpblN0cmlkZTogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fZ2V0TGFzdFZibygpLnN0cmlkZSA9IGluU3RyaWRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFZib0F0dHJpYnV0ZShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblR5cGU6ICdmbG9hdCcgfCAndmVjMmYnIHwgJ3ZlYzNmJyB8ICd2ZWM0ZicgfCAnbWF0M2YnIHwgJ21hdDRmJ1xuICApOiB0aGlzIHtcbiAgICBjb25zdCBjdXJyVmJvID0gdGhpcy5fZ2V0TGFzdFZibygpO1xuICAgIGNvbnN0IGxhc3RBdHRyID1cbiAgICAgIGN1cnJWYm8uYXR0cnMubGVuZ3RoID4gMCA/IGN1cnJWYm8uYXR0cnNbY3VyclZiby5hdHRycy5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgY3VyclZiby5hdHRycy5wdXNoKHtcbiAgICAgIG5hbWU6IGluTmFtZSxcbiAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGVbaW5UeXBlXSxcbiAgICAgIGluZGV4OiBsYXN0QXR0ciA/IGxhc3RBdHRyLmluZGV4ICsgZ2V0QXR0clR5cGVTaXplKGxhc3RBdHRyLnR5cGUpIDogMFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TGFzdFZibygpOiBWYm9EZWZpbml0aW9uIHtcbiAgICBpZiAodGhpcy5fZGVmLnZib3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFZCTyBzZXR1cCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVmLnZib3NbdGhpcy5fZGVmLnZib3MubGVuZ3RoIC0gMV07XG4gIH1cbn1cbiIsCiAgImltcG9ydCB7IElVbmJvdW5kVGV4dHVyZUFycmF5IH0gZnJvbSAnLi9UZXh0dXJlQXJyYXknO1xuaW1wb3J0IHsgSVVuYm91bmRDdWJlTWFwIH0gZnJvbSAnLi9DdWJlTWFwJztcbmltcG9ydCB7IElVbmJvdW5kVGV4dHVyZSB9IGZyb20gJy4vVGV4dHVyZSc7XG5pbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaGFkZXJQcm9ncmFtT3B0cyB7XG4gIHZlcnRleFNyYzogc3RyaW5nO1xuICBmcmFnbWVudFNyYzogc3RyaW5nO1xuICBhdHRyaWJ1dGVzOiBzdHJpbmdbXTtcbiAgdW5pZm9ybXM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVbmJvdW5kU2hhZGVyIHtcbiAgaXNCb3VuZCgpOiBib29sZWFuO1xuICBoYXNBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IG51bWJlcjtcbiAgZ2V0VW5pZm9ybShuYW1lOiBzdHJpbmcpOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZFNoYWRlcikgPT4gdm9pZCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kU2hhZGVyIHtcbiAgc2V0VGV4dHVyZVVuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5UZXh0dXJlOiBJVW5ib3VuZFRleHR1cmUgfCBJVW5ib3VuZFRleHR1cmVBcnJheSB8IElVbmJvdW5kQ3ViZU1hcCxcbiAgICBpbkluZGV4OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0SW50ZWdlcjFVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyMlVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWVYOiBudW1iZXIsIGluVmFsdWVZOiBudW1iZXIpOiB2b2lkO1xuICBzZXRJbnRlZ2VyM1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0RmxvYXQxVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZTogbnVtYmVyKTogdm9pZDtcbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcik6IHZvaWQ7XG4gIHNldEZsb2F0M1VuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5WYWx1ZVg6IG51bWJlcixcbiAgICBpblZhbHVlWTogbnVtYmVyLFxuICAgIGluVmFsdWVaOiBudW1iZXJcbiAgKTogdm9pZDtcbiAgc2V0TWF0cml4M1VuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQzKTogdm9pZDtcbiAgc2V0TWF0cml4NFVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYWRlclByb2dyYW0ge1xuICBwcml2YXRlIHN0YXRpYyBfaXNCb3VuZDogU2hhZGVyUHJvZ3JhbSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9wcm9ncmFtOiBXZWJHTFByb2dyYW07XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX3VuaWZvcm1zID0gbmV3IE1hcDxzdHJpbmcsIFdlYkdMVW5pZm9ybUxvY2F0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKGluTmFtZTogc3RyaW5nLCBvcHQ6IElTaGFkZXJQcm9ncmFtT3B0cykge1xuICAgIHRoaXMuX25hbWUgPSBpbk5hbWU7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LnZlcnRleFNyYywgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLl9nZXRTaGFkZXIob3B0LmZyYWdtZW50U3JjLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgLy9cblxuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBjcmVhdGUgYSBzaGFkZXIgcHJvZ3JhbScpO1xuICAgIH1cblxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7IC8vIGZyZWUgdXAgbm93IHVudXNlZCBtZW1vcnlcbiAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpOyAvLyBmcmVlIHVwIG5vdyB1bnVzZWQgbWVtb3J5XG5cbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAvLyBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBsaW5raW5nXG4gICAgICBjb25zdCBsYXN0RXJyb3IgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKTtcblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnRmFpbGVkIHRvIGluaXRpYWxpemVkIHNoYWRlcnMsIEVycm9yIGxpbmtpbmc6JyArIGxhc3RFcnJvclxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9ncmFtID0gcHJvZ3JhbTtcblxuICAgIC8vIHRoaXMuX2dldEF0dHJpYkFuZExvY2F0aW9uKG9wdC5hdHRyaWJ1dGVzLCBvcHQudW5pZm9ybXMpO1xuXG4gICAgLy8gdGhpcy5yYXdCaW5kKCk7XG4gICAgdGhpcy5iaW5kKCgpID0+IHtcbiAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZXMob3B0LmF0dHJpYnV0ZXMpO1xuICAgICAgdGhpcy5fZ2V0VW5pZm9ybXMob3B0LnVuaWZvcm1zKTtcbiAgICB9KTtcbiAgICAvLyBTaGFkZXJQcm9ncmFtLnVuYmluZCgpO1xuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgfVxuXG4gIC8vIHJhd0JpbmQoKSB7XG4gIC8vICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gIC8vICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgLy8gfVxuXG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRTaGFkZXIpID0+IHZvaWQpIHtcbiAgICBpZiAoU2hhZGVyUHJvZ3JhbS5faXNCb3VuZCAhPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRG91YmxlIHNoYWRlciBiaW5kaW5nIChib3VuZDogJHtTaGFkZXJQcm9ncmFtLl9pc0JvdW5kLl9uYW1lfSwgYmluZGluZzogJHt0aGlzLl9uYW1lfSlgXG4gICAgICApO1xuICAgIH1cblxuICAgIFNoYWRlclByb2dyYW0uX2lzQm91bmQgPSB0aGlzO1xuICAgIC8vIHRoaXMucmF3QmluZCgpO1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51c2VQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuXG4gICAgaW5DYWxsYmFjayh0aGlzKTtcblxuICAgIFNoYWRlclByb2dyYW0udW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLnVzZVByb2dyYW0obnVsbCk7XG4gICAgU2hhZGVyUHJvZ3JhbS5faXNCb3VuZCA9IG51bGw7XG4gIH1cblxuICBpc0JvdW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTaGFkZXJQcm9ncmFtLl9pc0JvdW5kID09PSB0aGlzO1xuICB9XG5cbiAgaGFzQXR0cmlidXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzLmhhcyhuYW1lKTtcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB0aGlzLl9hdHRyaWJ1dGVzLmdldChuYW1lKTtcbiAgICBpZiAoYXR0cmlidXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgYXR0cmlidXRlIG5vdCBmb3VuZDogJHtuYW1lfWApO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gIH1cblxuICBnZXRVbmlmb3JtKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHVuaWZvcm0gPSB0aGlzLl91bmlmb3Jtcy5nZXQobmFtZSk7XG4gICAgaWYgKHVuaWZvcm0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmlmb3JtIG5vdCBmb3VuZDogJHtuYW1lfWApO1xuICAgIH1cblxuICAgIHJldHVybiB1bmlmb3JtO1xuICB9XG5cbiAgc2V0VGV4dHVyZVVuaWZvcm0oXG4gICAgaW5OYW1lOiBzdHJpbmcsXG4gICAgaW5UZXh0dXJlOiBJVW5ib3VuZFRleHR1cmUgfCBJVW5ib3VuZEN1YmVNYXAsXG4gICAgaW5JbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpbkluZGV4KTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluSW5kZXgpO1xuICAgIGluVGV4dHVyZS5yYXdCaW5kKCk7XG4gIH1cblxuICBzZXRJbnRlZ2VyMVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0SW50ZWdlcjJVbmlmb3JtKGluTmFtZTogc3RyaW5nLCBpblZhbHVlWDogbnVtYmVyLCBpblZhbHVlWTogbnVtYmVyKSB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm0yaSh0aGlzLmdldFVuaWZvcm0oaW5OYW1lKSwgaW5WYWx1ZVgsIGluVmFsdWVZKTtcbiAgfVxuXG4gIHNldEludGVnZXIzVW5pZm9ybShcbiAgICBpbk5hbWU6IHN0cmluZyxcbiAgICBpblZhbHVlWDogbnVtYmVyLFxuICAgIGluVmFsdWVZOiBudW1iZXIsXG4gICAgaW5WYWx1ZVo6IG51bWJlclxuICApIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudW5pZm9ybTNpKHRoaXMuZ2V0VW5pZm9ybShpbk5hbWUpLCBpblZhbHVlWCwgaW5WYWx1ZVksIGluVmFsdWVaKTtcbiAgfVxuXG4gIHNldEZsb2F0MVVuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluVmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMWYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWUpO1xuICB9XG5cbiAgc2V0RmxvYXQyVW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5WYWx1ZVg6IG51bWJlciwgaW5WYWx1ZVk6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtMmYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSk7XG4gIH1cblxuICBzZXRGbG9hdDNVbmlmb3JtKFxuICAgIGluTmFtZTogc3RyaW5nLFxuICAgIGluVmFsdWVYOiBudW1iZXIsXG4gICAgaW5WYWx1ZVk6IG51bWJlcixcbiAgICBpblZhbHVlWjogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC51bmlmb3JtM2YodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGluVmFsdWVYLCBpblZhbHVlWSwgaW5WYWx1ZVopO1xuICB9XG5cbiAgc2V0TWF0cml4M1VuaWZvcm0oaW5OYW1lOiBzdHJpbmcsIGluTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQzKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5nZXRVbmlmb3JtKGluTmFtZSksIGZhbHNlLCBpbk1hdHJpeCBhcyBnbG0ubWF0Myk7XG4gIH1cblxuICBzZXRNYXRyaXg0VW5pZm9ybShpbk5hbWU6IHN0cmluZywgaW5NYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLmdldFVuaWZvcm0oaW5OYW1lKSwgZmFsc2UsIGluTWF0cml4IGFzIGdsbS5tYXQ0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEF0dHJpYnV0ZXMoYXR0cmlidXRlczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgYXR0cmlidXRlcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5fcHJvZ3JhbSwgYXR0cmlidXRlc1tpaV0pO1xuXG4gICAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgYXR0cmlidXRlIG5vdCBmb3VuZCA9PiAke2F0dHJpYnV0ZXNbaWldfWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzLnNldChhdHRyaWJ1dGVzW2lpXSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldFVuaWZvcm1zKHVuaWZvcm1zOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCB1bmlmb3Jtcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3Byb2dyYW0sIHVuaWZvcm1zW2lpXSk7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaWZvcm0gbm90IGZvdW5kID0+ICR7dW5pZm9ybXNbaWldfWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91bmlmb3Jtcy5zZXQodW5pZm9ybXNbaWldLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy9cblxuICBwcml2YXRlIF9nZXRTaGFkZXIoc3JjOiBzdHJpbmcsIHR5cGU6IG51bWJlcikge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgY3JlYXRlIGEgc2hhZGVyJyk7XG4gICAgfVxuXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3JjKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgbGV0IGVycm9yX3N0ciA9IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcbiAgICAgIGlmICghZXJyb3Jfc3RyKSBlcnJvcl9zdHIgPSAnZmFpbGVkIHRvIGNvbXBpbGUgYSBzaGFkZXInO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3Jfc3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBXZWJHTENvbnRleHQgfSBmcm9tICcuL1dlYkdMQ29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVuYm91bmRUZXh0dXJlIHtcbiAgaW5pdGlhbGl6ZSgpOiB2b2lkO1xuICByYXdCaW5kKCk6IHZvaWQ7XG4gIHByZUJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZFRleHR1cmUpID0+IHZvaWQpOiB2b2lkO1xuICBnZXRXaWR0aCgpOiBudW1iZXI7XG4gIGdldEhlaWdodCgpOiBudW1iZXI7XG4gIGdldFJhd09iamVjdCgpOiBXZWJHTFRleHR1cmU7XG59XG5cbmV4cG9ydCBlbnVtIFRleHR1cmVGaWx0ZXIge1xuICBwaXhlbGF0ZWQgPSAwLFxuICBsaW5lYXIgPSAxLFxuICBtaXBtYXAgPSAyLFxufTtcblxuZXhwb3J0IGVudW0gVGV4dHVyZVJlcGVhdCB7XG4gIG5vUmVwZWF0ID0gMCxcbiAgcmVwZWF0ID0gMSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kVGV4dHVyZSB7XG4gIGxvYWQoaW5JbWFnZTogSFRNTEltYWdlRWxlbWVudCwgbW9kZT86IFRleHR1cmVGaWx0ZXIsIHJlcGVhdD86IFRleHR1cmVSZXBlYXQpOiB2b2lkO1xuICBsb2FkRnJvbU1lbW9yeShpbldpZHRoOiBudW1iZXIsIGluSGVpZ2h0OiBudW1iZXIsIGluUGl4ZWxzOiBVaW50OEFycmF5LCBtb2RlPzogVGV4dHVyZUZpbHRlciwgcmVwZWF0PzogVGV4dHVyZVJlcGVhdCk6IHZvaWQ7XG4gIGFsbG9jYXRlKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlciwgbW9kZT86IFRleHR1cmVGaWx0ZXIsIHJlcGVhdD86IFRleHR1cmVSZXBlYXQpOiB2b2lkO1xuICBhbGxvY2F0ZURlcHRoKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlciwgbW9kZT86IFRleHR1cmVGaWx0ZXIsIHJlcGVhdD86IFRleHR1cmVSZXBlYXQpOiB2b2lkO1xuICByZXNpemUoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyLCBtb2RlPzogVGV4dHVyZUZpbHRlciwgcmVwZWF0PzogVGV4dHVyZVJlcGVhdCk6IHZvaWQ7XG4gIGdldFJhd09iamVjdCgpOiBXZWJHTFRleHR1cmU7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0dXJlIGltcGxlbWVudHMgSVVuYm91bmRUZXh0dXJlLCBJQm91bmRUZXh0dXJlIHtcbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdGV4dHVyZTogV2ViR0xUZXh0dXJlIHwgbnVsbCA9IG51bGw7XG5cbiAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBhbHJlYWR5IGluaXRpYWxpemVkJyk7XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgfVxuXG4gIHJhd0JpbmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmU6IG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgfVxuXG4gIHByZUJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5yYXdCaW5kKCk7XG4gICAgaW5DYWxsYmFjayh0aGlzKTtcbiAgfVxuXG4gIGJpbmQoaW5DYWxsYmFjazogKGJvdW5kOiBJQm91bmRUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5wcmVCaW5kKGluQ2FsbGJhY2spO1xuICAgIFRleHR1cmUudW5iaW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdW5iaW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICB9XG5cbiAgbG9hZChpbkltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCBtb2RlOiBUZXh0dXJlRmlsdGVyID0gVGV4dHVyZUZpbHRlci5waXhlbGF0ZWQsIHJlcGVhdDogVGV4dHVyZVJlcGVhdCA9IFRleHR1cmVSZXBlYXQubm9SZXBlYXQpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxvY2F0ZShpbkltYWdlLndpZHRoLCBpbkltYWdlLmhlaWdodCwgaW5JbWFnZSwgbW9kZSwgcmVwZWF0KTtcbiAgfVxuXG4gIGxvYWRGcm9tTWVtb3J5KGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlciwgaW5QaXhlbHM6IFVpbnQ4QXJyYXksIG1vZGU6IFRleHR1cmVGaWx0ZXIgPSBUZXh0dXJlRmlsdGVyLnBpeGVsYXRlZCwgcmVwZWF0OiBUZXh0dXJlUmVwZWF0ID0gVGV4dHVyZVJlcGVhdC5ub1JlcGVhdCk6IHZvaWQge1xuICAgIHRoaXMuX2FsbG9jYXRlKGluV2lkdGgsIGluSGVpZ2h0LCBpblBpeGVscywgbW9kZSwgcmVwZWF0KTtcbiAgfVxuXG4gIGFsbG9jYXRlKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlciwgbW9kZTogVGV4dHVyZUZpbHRlciA9IFRleHR1cmVGaWx0ZXIucGl4ZWxhdGVkLCByZXBlYXQ6IFRleHR1cmVSZXBlYXQgPSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0KTogdm9pZCB7XG4gICAgdGhpcy5fYWxsb2NhdGUoaW5XaWR0aCwgaW5IZWlnaHQsIG51bGwsIG1vZGUsIHJlcGVhdCk7XG4gIH1cblxuICBhbGxvY2F0ZURlcHRoKGluV2lkdGg6IG51bWJlciwgaW5IZWlnaHQ6IG51bWJlciwgbW9kZTogVGV4dHVyZUZpbHRlciA9IFRleHR1cmVGaWx0ZXIucGl4ZWxhdGVkLCByZXBlYXQ6IFRleHR1cmVSZXBlYXQgPSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0KTogdm9pZCB7XG4gICAgdGhpcy5fYWxsb2NhdGUoaW5XaWR0aCwgaW5IZWlnaHQsIG51bGwsIG1vZGUsIHJlcGVhdCwgdHJ1ZSk7XG4gIH1cblxuICByZXNpemUoaW5XaWR0aDogbnVtYmVyLCBpbkhlaWdodDogbnVtYmVyLCBtb2RlOiBUZXh0dXJlRmlsdGVyID0gVGV4dHVyZUZpbHRlci5waXhlbGF0ZWQsIHJlcGVhdDogVGV4dHVyZVJlcGVhdCA9IFRleHR1cmVSZXBlYXQubm9SZXBlYXQpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxvY2F0ZShpbldpZHRoLCBpbkhlaWdodCwgbnVsbCwgbW9kZSwgcmVwZWF0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FsbG9jYXRlKFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluUGl4ZWxzOiBVaW50OEFycmF5IHwgSFRNTEltYWdlRWxlbWVudCB8IG51bGwgPSBudWxsLFxuICAgIG1vZGU6IFRleHR1cmVGaWx0ZXIgPSBUZXh0dXJlRmlsdGVyLnBpeGVsYXRlZCxcbiAgICByZXBlYXQ6IFRleHR1cmVSZXBlYXQgPSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0LFxuICAgIGlzRGVwdGhUZXh0dXJlOiBib29sZWFuID0gZmFsc2UsXG4gICk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlOiBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBnbCA9IFdlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICB0aGlzLl93aWR0aCA9IGluV2lkdGg7XG4gICAgdGhpcy5faGVpZ2h0ID0gaW5IZWlnaHQ7XG5cblxuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGlzRGVwdGhUZXh0dXJlID8gZ2wuREVQVEhfQ09NUE9ORU5UMzJGIDogZ2wuUkdCQTtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGlzRGVwdGhUZXh0dXJlID8gZ2wuREVQVEhfQ09NUE9ORU5UIDogZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gaXNEZXB0aFRleHR1cmUgPyBnbC5GTE9BVCA6IGdsLlVOU0lHTkVEX0JZVEU7XG5cbiAgICBpZiAoaW5QaXhlbHMgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgc3JjRm9ybWF0LCBzcmNUeXBlLCBpblBpeGVscyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgbGV2ZWwsIGludGVybmFsRm9ybWF0LCBpbldpZHRoLCBpbkhlaWdodCwgYm9yZGVyLCBzcmNGb3JtYXQsIHNyY1R5cGUsIGluUGl4ZWxzKTtcbiAgICB9XG5cbiAgICBpZiAocmVwZWF0ID09PSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0KSB7XG4gICAgICAvLyB3cmFwcGluZyB0byBjbGFtcCB0byBlZGdlXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSBUZXh0dXJlUmVwZWF0LnJlcGVhdCkge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLlJFUEVBVCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT09IFRleHR1cmVGaWx0ZXIucGl4ZWxhdGVkKSB7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSBUZXh0dXJlRmlsdGVyLmxpbmVhcikge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFRleHR1cmVGaWx0ZXIubWlwbWFwKSB7XG4gICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7XG4gICAgfVxuXG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICB9XG5cbiAgZ2V0UmF3T2JqZWN0KCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgLy8gVE9ETzogdGhpcyBpcyB1Z2x5XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cbn0iLAogICJpbXBvcnQgeyBUZXh0dXJlRmlsdGVyLCBUZXh0dXJlUmVwZWF0IH0gZnJvbSAnLi9UZXh0dXJlJztcbmltcG9ydCB7IFdlYkdMQ29udGV4dCB9IGZyb20gJy4vV2ViR0xDb250ZXh0JztcblxuZXhwb3J0IGludGVyZmFjZSBJVW5ib3VuZFRleHR1cmVBcnJheSB7XG4gIGluaXRpYWxpemUoKTogdm9pZDtcbiAgcmF3QmluZCgpOiB2b2lkO1xuICBwcmVCaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZUFycmF5KSA9PiB2b2lkKTogdm9pZDtcbiAgYmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZFRleHR1cmVBcnJheSkgPT4gdm9pZCk6IHZvaWQ7XG4gIGdldFdpZHRoKCk6IG51bWJlcjtcbiAgZ2V0SGVpZ2h0KCk6IG51bWJlcjtcbiAgZ2V0UmF3T2JqZWN0KCk6IFdlYkdMVGV4dHVyZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRUZXh0dXJlQXJyYXkge1xuICBsb2FkRnJvbUltYWdlKFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluVG90YWxMYXllcnM6IG51bWJlcixcbiAgICBpbkltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIG1vZGU/OiBUZXh0dXJlRmlsdGVyLFxuICAgIHJlcGVhdD86IFRleHR1cmVSZXBlYXQsXG4gICk6IHZvaWQ7XG4gIGxvYWRGcm9tTWVtb3J5KFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluVG90YWxMYXllcnM6IG51bWJlcixcbiAgICBpblBpeGVsczogVWludDhBcnJheSxcbiAgICBtb2RlPzogVGV4dHVyZUZpbHRlcixcbiAgICByZXBlYXQ/OiBUZXh0dXJlUmVwZWF0LFxuICApOiB2b2lkO1xuICBnZXRSYXdPYmplY3QoKTogV2ViR0xUZXh0dXJlO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dHVyZUFycmF5IGltcGxlbWVudHMgSVVuYm91bmRUZXh0dXJlQXJyYXksIElCb3VuZFRleHR1cmVBcnJheSB7XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3RleHR1cmU6IFdlYkdMVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZTogYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIHRoaXMuX3RleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIGNvbnN0IGdsID0gV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC5kZWxldGVUZXh0dXJlKHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgcmF3QmluZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHRocm93IG5ldyBFcnJvcigndGV4dHVyZTogbm90IGluaXRpYWxpemVkJyk7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkRfQVJSQVksIHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgcHJlQmluZChpbkNhbGxiYWNrOiAoYm91bmQ6IElCb3VuZFRleHR1cmVBcnJheSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMucmF3QmluZCgpO1xuICAgIGluQ2FsbGJhY2sodGhpcyk7XG4gIH1cblxuICBiaW5kKGluQ2FsbGJhY2s6IChib3VuZDogSUJvdW5kVGV4dHVyZUFycmF5KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5wcmVCaW5kKGluQ2FsbGJhY2spO1xuICAgIFRleHR1cmVBcnJheS51bmJpbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyB1bmJpbmQoKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgbnVsbCk7XG4gIH1cblxuICBsb2FkRnJvbUltYWdlKFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluVG90YWxMYXllcnM6IG51bWJlcixcbiAgICBpbkltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIG1vZGU6IFRleHR1cmVGaWx0ZXIgPSBUZXh0dXJlRmlsdGVyLnBpeGVsYXRlZCxcbiAgICByZXBlYXQ6IFRleHR1cmVSZXBlYXQgPSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0XG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2FsbG9jYXRlKGluV2lkdGgsIGluSGVpZ2h0LCBpblRvdGFsTGF5ZXJzLCBpbkltYWdlLCBtb2RlLCByZXBlYXQpO1xuICB9XG5cbiAgbG9hZEZyb21NZW1vcnkoXG4gICAgaW5XaWR0aDogbnVtYmVyLFxuICAgIGluSGVpZ2h0OiBudW1iZXIsXG4gICAgaW5Ub3RhbExheWVyczogbnVtYmVyLFxuICAgIGluUGl4ZWxzOiBVaW50OEFycmF5LFxuICAgIG1vZGU6IFRleHR1cmVGaWx0ZXIgPSBUZXh0dXJlRmlsdGVyLnBpeGVsYXRlZCxcbiAgICByZXBlYXQ6IFRleHR1cmVSZXBlYXQgPSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0XG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2FsbG9jYXRlKGluV2lkdGgsIGluSGVpZ2h0LCBpblRvdGFsTGF5ZXJzLCBpblBpeGVscywgbW9kZSwgcmVwZWF0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FsbG9jYXRlKFxuICAgIGluV2lkdGg6IG51bWJlcixcbiAgICBpbkhlaWdodDogbnVtYmVyLFxuICAgIGluVG90YWxMYXllcnM6IG51bWJlcixcbiAgICBpblBpeGVsczogVWludDhBcnJheSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsID0gbnVsbCxcbiAgICBtb2RlOiBUZXh0dXJlRmlsdGVyID0gVGV4dHVyZUZpbHRlci5waXhlbGF0ZWQsXG4gICAgcmVwZWF0OiBUZXh0dXJlUmVwZWF0ID0gVGV4dHVyZVJlcGVhdC5ub1JlcGVhdFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndGV4dHVyZTogbm90IGluaXRpYWxpemVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2wgPSBXZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuXG4gICAgdGhpcy5fd2lkdGggPSBpbldpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGluSGVpZ2h0O1xuXG4gICAgY29uc3QgbGV2ZWwgPSAwO1xuICAgIGNvbnN0IGludGVybmFsRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBib3JkZXIgPSAwO1xuICAgIGNvbnN0IHNyY0Zvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgc3JjVHlwZSA9IGdsLlVOU0lHTkVEX0JZVEU7XG5cbiAgICBpZiAoaW5QaXhlbHMgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICBnbC50ZXhJbWFnZTNEKGdsLlRFWFRVUkVfMkRfQVJSQVksIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgaW5XaWR0aCwgaW5IZWlnaHQsIGluVG90YWxMYXllcnMsIGJvcmRlciwgc3JjRm9ybWF0LCBzcmNUeXBlLCBpblBpeGVscyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsLnRleEltYWdlM0QoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgbGV2ZWwsIGludGVybmFsRm9ybWF0LCBpbldpZHRoLCBpbkhlaWdodCwgaW5Ub3RhbExheWVycywgYm9yZGVyLCBzcmNGb3JtYXQsIHNyY1R5cGUsIGluUGl4ZWxzKTtcbiAgICB9XG5cbiAgICBpZiAocmVwZWF0ID09PSBUZXh0dXJlUmVwZWF0Lm5vUmVwZWF0KSB7XG4gICAgICAvLyB3cmFwcGluZyB0byBjbGFtcCB0byBlZGdlXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkRfQVJSQVksIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSBUZXh0dXJlUmVwZWF0LnJlcGVhdCkge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJEX0FSUkFZLCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLlJFUEVBVCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT09IFRleHR1cmVGaWx0ZXIucGl4ZWxhdGVkKSB7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkRfQVJSQVksIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkRfQVJSQVksIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSBUZXh0dXJlRmlsdGVyLmxpbmVhcikge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJEX0FSUkFZLCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkRfQVJSQVksIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFRleHR1cmVGaWx0ZXIubWlwbWFwKSB7XG4gICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEX0FSUkFZKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRF9BUlJBWSwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7XG4gICAgfVxuXG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ3RleHR1cmUgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICB9XG5cbiAgZ2V0UmF3T2JqZWN0KCkge1xuICAgIGlmICghdGhpcy5fdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCd0ZXh0dXJlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgLy8gVE9ETzogdGhpcyBpcyB1Z2x5XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cbn1cbiIsCiAgImV4cG9ydCBkZWZhdWx0IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbnVuaWZvcm0gbWF0NCB1X2NvbXBvc2VkTWF0cml4O1xuXG5pbiB2ZWMzIGFfdmVydGV4X3Bvc2l0aW9uO1xuaW4gdmVjMyBhX3ZlcnRleF9ub3JtYWw7XG5cbmluIHZlYzMgYV9vZmZzZXRfY2VudGVyO1xuaW4gdmVjNCBhX29mZnNldF9vcmllbnRhdGlvbjtcbmluIHZlYzMgYV9vZmZzZXRfY29sb3I7XG5pbiB2ZWMzIGFfb2Zmc2V0X3NjYWxlO1xuXG5mbGF0IG91dCB2ZWM0IHZfY29sb3I7XG5vdXQgdmVjMyB2X3dvcmxkU3BhY2VQb3NpdGlvbjtcbm91dCB2ZWMzIHZfd29ybGRTcGFjZU5vcm1hbDtcblxuXG52ZWMzIGFwcGx5X3F1YXRfdG9fdmVjMyh2ZWMzIHBvc2l0aW9uLCB2ZWM0IHEpXG57XG4gIHZlYzMgdiA9IHBvc2l0aW9uLnh5ejtcbiAgcmV0dXJuIHYgKyAyLjAgKiBjcm9zcyhxLnh5eiwgY3Jvc3MocS54eXosIHYpICsgcS53ICogdik7XG59XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuXHR2ZWMzIHdvcmxkU3BhY2VQb3NpdGlvbiA9IGFfb2Zmc2V0X2NlbnRlciArIGFwcGx5X3F1YXRfdG9fdmVjMyhhX3ZlcnRleF9wb3NpdGlvbiAqIGFfb2Zmc2V0X3NjYWxlLCBhX29mZnNldF9vcmllbnRhdGlvbik7XG5cdHZlYzMgd29ybGRTcGFjZU5vcm1hbCA9IGFwcGx5X3F1YXRfdG9fdmVjMyhhX3ZlcnRleF9ub3JtYWwsIGFfb2Zmc2V0X29yaWVudGF0aW9uKTtcblxuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KHdvcmxkU3BhY2VQb3NpdGlvbiwgMS4wKTtcblxuICB2X2NvbG9yID0gdmVjNChhX29mZnNldF9jb2xvciwgMS4wKTtcbiAgdl93b3JsZFNwYWNlUG9zaXRpb24gPSB3b3JsZFNwYWNlUG9zaXRpb247XG4gIHZfd29ybGRTcGFjZU5vcm1hbCA9IHdvcmxkU3BhY2VOb3JtYWw7XG59XG5gLnRyaW0oKTsiLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGxvd3AgZmxvYXQ7XG5cbnVuaWZvcm0gdmVjMyB1X2xpZ2h0UG9zO1xuXG5mbGF0IGluIHZlYzQgdl9jb2xvcjtcbmluIHZlYzMgdl93b3JsZFNwYWNlUG9zaXRpb247XG5pbiB2ZWMzIHZfd29ybGRTcGFjZU5vcm1hbDtcblxub3V0IHZlYzQgb19jb2xvcjtcblxuLy9cbi8vXG4vL1xuXG5jb25zdCBmbG9hdCBrX2FtYmlhbnRDb2VmID0gMC4xO1xuXG5jb25zdCB2ZWMzIGtfc3BlY0NvbG9yID0gdmVjMygxLjAsIDEuMCwgMS4wKTtcblxudmVjMyBfZ2V0TGlnaHRDb2xvcih2ZWM0IGN1cnJlbnRDb2xvcilcbntcbiAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodl93b3JsZFNwYWNlTm9ybWFsKTtcbiAgdmVjMyBsaWdodERpciA9IG5vcm1hbGl6ZSh1X2xpZ2h0UG9zIC0gdl93b3JsZFNwYWNlUG9zaXRpb24pO1xuXG4gIGZsb2F0IGRpZmZ1c2VDb2VmID0gbWF4KGRvdChsaWdodERpciwgdl93b3JsZFNwYWNlTm9ybWFsLnh5eiksIDAuMCk7XG4gIGZsb2F0IHNwZWN1bGFyQ29lZiA9IDAuMDtcblxuICAvLyBpZiAoZGlmZnVzZUNvZWYgPiAwLjAgJiYgdl9za2lwU3BlY3VsYXIgPCAwLjUpXG4gIC8vIHtcbiAgLy8gICAvLyBzcGVjdWxhclxuXG4gIC8vICAgdmVjMyByZWZsZWN0RGlyID0gcmVmbGVjdCgtbGlnaHREaXIsIG5vcm1hbCk7XG4gIC8vICAgdmVjMyB2aWV3RGlyID0gbm9ybWFsaXplKHVfbGlnaHRQb3MgLSB2X3dvcmxkU3BhY2VQb3NpdGlvbik7XG5cbiAgLy8gICBmbG9hdCBzcGVjQW5nbGUgPSBtYXgoZG90KHJlZmxlY3REaXIsIHZpZXdEaXIpLCAwLjApO1xuICAvLyAgIHNwZWN1bGFyQ29lZiA9IHBvdyhzcGVjQW5nbGUsIDMyLjApO1xuICAvLyB9XG5cbiAgdmVjMyBkaWZmdXNlQ29sb3IgPSBjdXJyZW50Q29sb3IucmdiICogKGtfYW1iaWFudENvZWYgKyBkaWZmdXNlQ29lZik7XG4gIHZlYzMgc3BlY3VsYXJDb2xvciA9IGtfc3BlY0NvbG9yICogc3BlY3VsYXJDb2VmICogY3VycmVudENvbG9yLmE7XG5cbiAgcmV0dXJuIGRpZmZ1c2VDb2xvciArIHNwZWN1bGFyQ29sb3I7XG59XG5cbi8vXG4vL1xuLy9cblxudm9pZCBtYWluKHZvaWQpXG57XG4gIG9fY29sb3IgPSB2ZWM0KF9nZXRMaWdodENvbG9yKHZfY29sb3IpLCAxLjApO1xufVxuYC50cmltKCk7IiwKICAiXG5pbXBvcnQgKiBhcyB3ZWJnbDIgZnJvbSAnLi4vLi4vLi4vZ3JhcGhpY3Mvd2ViZ2wyJztcbmltcG9ydCB7IElDYW1lcmEgfSBmcm9tICcuLi8uLi8uLi9ncmFwaGljcy9jYW1lcmEnO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgc3RhY2tSZW5kZXJlclZlcnRleCBmcm9tICcuL3NoYWRlcnMvZ2VvbWV0cnktcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBzdGFja1JlbmRlcmVyRnJhZ21lbnQgZnJvbSAnLi9zaGFkZXJzL2dlb21ldHJ5LXJlbmRlcmVyLmdsc2wuZnJhZyc7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBrX2J1ZmZlclNpemUgPSAxNCAqIDEwMjQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZlcnRleCB7XG4gIHBvczogZ2xtLnZlYzM7XG4gIG5vcm1hbDogZ2xtLnZlYzM7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElHZW9tZXRyeVJlbmRlcmVyIHtcbiAgcHVzaChcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblF1YXQ6IGdsbS5SZWFkb25seVF1YXQsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNjYWxlOiBnbG0uUmVhZG9ubHlWZWMzXG4gICk6IHZvaWQ7XG4gIGZsdXNoKGluQ2FtZXJhOiBJQ2FtZXJhKTogdm9pZDtcbiAgY2xlYXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5UmVuZGVyZXIgaW1wbGVtZW50cyBJR2VvbWV0cnlSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogd2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NoYWRlciA9IG5ldyB3ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnU3RhY2tSZW5kZXJlcnMnLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHN0YWNrUmVuZGVyZXJWZXJ0ZXgsXG4gICAgICBmcmFnbWVudFNyYzogc3RhY2tSZW5kZXJlckZyYWdtZW50LFxuICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAnYV92ZXJ0ZXhfcG9zaXRpb24nLFxuICAgICAgICAnYV92ZXJ0ZXhfbm9ybWFsJyxcbiAgICAgICAgJ2Ffb2Zmc2V0X2NlbnRlcicsXG4gICAgICAgICdhX29mZnNldF9vcmllbnRhdGlvbicsXG4gICAgICAgICdhX29mZnNldF9jb2xvcicsXG4gICAgICAgICdhX29mZnNldF9zY2FsZScsXG4gICAgICBdLFxuICAgICAgdW5pZm9ybXM6IFtcbiAgICAgICAgJ3VfY29tcG9zZWRNYXRyaXgnLFxuICAgICAgICAndV9saWdodFBvcycsXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZXMnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9ub3JtYWwnLCAndmVjM2YnKVxuICAgICAgLy8gLnNldFN0cmlkZSgzICogNCAqIDYpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5zZXRWYm9Bc1N0cmVhbWluZygpXG4gICAgICAuc2V0VmJvQXNJbnN0YW5jZWQoKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRfY2VudGVyJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X29yaWVudGF0aW9uJywgJ3ZlYzRmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X2NvbG9yJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X3NjYWxlJywgJ3ZlYzNmJylcbiAgICAgIDtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkodGhpcy5fc2hhZGVyLCBnZW9CdWlsZGVyLmdldERlZigpKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRGbG9hdEJ1ZmZlclNpemUoMSwga19idWZmZXJTaXplKTtcbiAgfVxuXG4gIHNldEdlb21ldHJ5VmVydGljZXModmVydGljZXM6IElWZXJ0ZXhbXSkge1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBGbG9hdDMyQXJyYXkoWy4uLnZlcnRpY2VzLm1hcCh2YWwgPT4gWy4uLnZhbC5wb3MsIC4uLnZhbC5ub3JtYWxdKS5mbGF0KCldKTtcbiAgICAvLyBjb25zdCBidWYgPSBuZXcgRmxvYXQzMkFycmF5KFsuLi52ZXJ0aWNlcy5tYXAodmFsID0+IFsuLi52YWwucG9zXSkuZmxhdCgpXSk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuYWxsb2NhdGVCdWZmZXIoMCwgYnVmLCBidWYubGVuZ3RoKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudChidWYubGVuZ3RoIC8gNik7XG4gIH1cblxuICBwdXNoKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUXVhdDogZ2xtLlJlYWRvbmx5UXVhdCxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2NhbGU6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTaXplICsgNiA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5fc2hhZGVyLmlzQm91bmQoKSkge1xuICAgICAgICB0aGlzLl9mbHVzaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9pbnRBWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9pbnRBWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9pbnRBWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUXVhdFswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblF1YXRbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5RdWF0WzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUXVhdFszXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpbkNvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Db2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblNjYWxlWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluU2NhbGVbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5TY2FsZVsyXTtcbiAgICAvLyB0aGlzLl9jdXJyZW50U2l6ZSArPSA2O1xuICB9XG5cbiAgZmx1c2goaW5DYW1lcmE6IElDYW1lcmEpIHtcbiAgICBpZiAoIXRoaXMuY2FuUmVuZGVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zaGFkZXIuYmluZCgoYm91bmQpID0+IHtcbiAgICAgIGJvdW5kLnNldE1hdHJpeDRVbmlmb3JtKCd1X2NvbXBvc2VkTWF0cml4JywgaW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgICBjb25zdCBleWVQb3MgPSBpbkNhbWVyYS5nZXRFeWUoKTtcbiAgICAgIGJvdW5kLnNldEZsb2F0M1VuaWZvcm0oJ3VfbGlnaHRQb3MnLCBleWVQb3NbMF0sIGV5ZVBvc1sxXSwgZXllUG9zWzJdKTtcblxuICAgICAgdGhpcy5fZmx1c2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNhZmVSZW5kZXIoaW5DYW1lcmE6IElDYW1lcmEsIGluQ2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9zaGFkZXIuYmluZCgoYm91bmQpID0+IHtcbiAgICAgIGJvdW5kLnNldE1hdHJpeDRVbmlmb3JtKCd1X2NvbXBvc2VkTWF0cml4JywgaW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgICBjb25zdCBleWVQb3MgPSBpbkNhbWVyYS5nZXRFeWUoKTtcbiAgICAgIGJvdW5kLnNldEZsb2F0M1VuaWZvcm0oJ3VfbGlnaHRQb3MnLCBleWVQb3NbMF0sIGV5ZVBvc1sxXSwgZXllUG9zWzJdKTtcblxuICAgICAgaW5DYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLl9mbHVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmx1c2goKSB7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS51cGRhdGVCdWZmZXIoMSwgdGhpcy5fYnVmZmVyLCB0aGlzLl9jdXJyZW50U2l6ZSwgMCk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0SW5zdGFuY2VkQ291bnQodGhpcy5fY3VycmVudFNpemUgLyAxMyk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeS5yZW5kZXIoKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuXG4gIGNhblJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpemUgPiAwO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFNpemUgPSAwO1xuICB9XG59XG4iLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIG1hdDQgdV9jb21wb3NlZE1hdHJpeDtcblxuaW4gdmVjMyBhX3ZlcnRleF9wb3NpdGlvbjtcbmluIHZlYzQgYV92ZXJ0ZXhfY29sb3I7XG5cbmZsYXQgb3V0IHZlYzQgdl9jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIGdsX1Bvc2l0aW9uID0gdV9jb21wb3NlZE1hdHJpeCAqIHZlYzQoYV92ZXJ0ZXhfcG9zaXRpb24sIDEuMCk7XG5cbiAgdl9jb2xvciA9IGFfdmVydGV4X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBsb3dwIGZsb2F0O1xuXG5mbGF0IGluIHZlYzQgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIG9fY29sb3IgPSB2X2NvbG9yO1xufVxuYC50cmltKCk7IiwKICAiaW1wb3J0ICogYXMgd2ViZ2wyIGZyb20gJy4uLy4uLy4uLy4uL2dyYXBoaWNzL3dlYmdsMic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5jb25zdCBrX2J1ZmZlclNpemUgPSAxNCAqIDEwMjQ7XG5cbmV4cG9ydCBjbGFzcyBXaXJlRnJhbWVzU3RhY2tSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogd2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluU2hhZGVyOiB3ZWJnbDIuSVVuYm91bmRTaGFkZXIsXG4gICAgaW5HZW9tZXRyeURlZjogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeURlZmluaXRpb25cbiAgKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gaW5TaGFkZXI7XG4gICAgY29uc3QgZ2VvbWV0cnlEZWY6IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uID0ge1xuICAgICAgLi4uaW5HZW9tZXRyeURlZixcbiAgICAgIHByaW1pdGl2ZVR5cGU6IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuUHJpbWl0aXZlVHlwZS5saW5lc1xuICAgIH07XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyB3ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5KGluU2hhZGVyLCBnZW9tZXRyeURlZik7XG4gIH1cblxuICBwdXNoTGluZShcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgKyA3ICogMiA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5fc2hhZGVyLmlzQm91bmQoKSkge1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWxwaGFWYWx1ZSA9IGluQ29sb3JbM10gPz8gMTtcblxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEFbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QVsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRBWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMF0gPSBpblBvaW50QlswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAxXSA9IGluUG9pbnRCWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDJdID0gaW5Qb2ludEJbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgM10gPSBpbkNvbG9yWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDRdID0gaW5Db2xvclsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA1XSA9IGluQ29sb3JbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNl0gPSBhbHBoYVZhbHVlO1xuICAgIHRoaXMuX2N1cnJlbnRTaXplICs9IDc7XG4gIH1cblxuICBjYW5SZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaXplID4gMDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5jYW5SZW5kZXIoKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkuYWxsb2NhdGVCdWZmZXIoMCwgdGhpcy5fYnVmZmVyLCB0aGlzLl9jdXJyZW50U2l6ZSk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA3KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgLy8gcmVzZXQgdmVydGljZXNcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSA9IDA7XG4gIH1cbn1cbiIsCiAgImltcG9ydCAqIGFzIHdlYmdsMiBmcm9tICcuLi8uLi8uLi8uLi9ncmFwaGljcy93ZWJnbDInO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuY29uc3Qga19idWZmZXJTaXplID0gMSAqIDEwMjQgKiAxMDI0O1xuXG5leHBvcnQgY2xhc3MgVHJpYW5nbGVzU3RhY2tSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogd2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcblxuICBwcml2YXRlIF9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGtfYnVmZmVyU2l6ZSk7XG4gIHByaXZhdGUgX2N1cnJlbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluU2hhZGVyOiB3ZWJnbDIuSVVuYm91bmRTaGFkZXIsXG4gICAgaW5HZW9tZXRyeURlZjogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeURlZmluaXRpb25cbiAgKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gaW5TaGFkZXI7XG4gICAgY29uc3QgZ2VvbWV0cnlEZWY6IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlEZWZpbml0aW9uID0ge1xuICAgICAgLi4uaW5HZW9tZXRyeURlZixcbiAgICAgIHByaW1pdGl2ZVR5cGU6IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuUHJpbWl0aXZlVHlwZS50cmlhbmdsZXNcbiAgICB9O1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeShpblNoYWRlciwgZ2VvbWV0cnlEZWYpO1xuICB9XG5cbiAgcHVzaFRyaWFuZ2xlKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRDOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgKiA2ID49IHRoaXMuX2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLl9zaGFkZXIuaXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbHBoYVZhbHVlID0gaW5Db2xvclszXSA/PyAxO1xuXG4gICAgLy8gMFxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEFbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QVsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRBWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgLy8gMlxuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludEJbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50QlsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRCWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuXG4gICAgLy8gM1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDBdID0gaW5Qb2ludENbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpblBvaW50Q1sxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAyXSA9IGluUG9pbnRDWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDNdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA0XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNV0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDZdID0gYWxwaGFWYWx1ZTtcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSArPSA3O1xuICB9XG5cbiAgcHVzaExpbmUoXG4gICAgaW5Qb2ludEE6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb2ludEI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTaXplICsgNyAqIDYgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRpZmZYID0gaW5Qb2ludEJbMF0gLSBpblBvaW50QVswXTtcbiAgICBjb25zdCBkaWZmWSA9IGluUG9pbnRCWzFdIC0gaW5Qb2ludEFbMV07XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCkgKyBNYXRoLlBJICogMC41O1xuXG4gICAgY29uc3Qgc3RlcFggPSBNYXRoLmNvcyhhbmdsZSkgKiB0aGlja25lc3MgKiAwLjU7XG4gICAgY29uc3Qgc3RlcFkgPSBNYXRoLnNpbihhbmdsZSkgKiB0aGlja25lc3MgKiAwLjU7XG5cbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpblBvaW50QVswXSAtIHN0ZXBYLCBpblBvaW50QVsxXSAtIHN0ZXBZLCBpblBvaW50QVsyXV0sXG4gICAgICBbaW5Qb2ludEJbMF0gLSBzdGVwWCwgaW5Qb2ludEJbMV0gLSBzdGVwWSwgaW5Qb2ludEJbMl1dLFxuICAgICAgW2luUG9pbnRCWzBdICsgc3RlcFgsIGluUG9pbnRCWzFdICsgc3RlcFksIGluUG9pbnRCWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luUG9pbnRBWzBdIC0gc3RlcFgsIGluUG9pbnRBWzFdIC0gc3RlcFksIGluUG9pbnRBWzJdXSxcbiAgICAgIFtpblBvaW50QlswXSArIHN0ZXBYLCBpblBvaW50QlsxXSArIHN0ZXBZLCBpblBvaW50QlsyXV0sXG4gICAgICBbaW5Qb2ludEFbMF0gKyBzdGVwWCwgaW5Qb2ludEFbMV0gKyBzdGVwWSwgaW5Qb2ludEFbMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoUm90YXRlZExpbmUoXG4gICAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGFuZ2xlOiBudW1iZXIsXG4gICAgbGVuZ3RoOiBudW1iZXIsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5wdXNoTGluZShcbiAgICAgIFtcbiAgICAgICAgY2VudGVyWzBdIC0gbGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMV0gLSBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGNlbnRlclsyXVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgY2VudGVyWzBdICsgbGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICBjZW50ZXJbMV0gKyBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGNlbnRlclsyXVxuICAgICAgXSxcbiAgICAgIHRoaWNrbmVzcyxcbiAgICAgIGNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShcbiAgICBpbk9yaWdpbjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRTaXplICsgNyAqIDYgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1heENvb3JkOiBnbG0uUmVhZG9ubHlWZWMyID0gW1xuICAgICAgaW5PcmlnaW5bMF0gKyBpblNpemVbMF0sXG4gICAgICBpbk9yaWdpblsxXSArIGluU2l6ZVsxXVxuICAgIF07XG5cbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpbk9yaWdpblswXSwgaW5PcmlnaW5bMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIFttYXhDb29yZFswXSwgbWF4Q29vcmRbMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIFtpbk9yaWdpblswXSwgbWF4Q29vcmRbMV0sIGluT3JpZ2luWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuXG4gICAgdGhpcy5wdXNoVHJpYW5nbGUoXG4gICAgICBbaW5PcmlnaW5bMF0sIGluT3JpZ2luWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbbWF4Q29vcmRbMF0sIGluT3JpZ2luWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBbbWF4Q29vcmRbMF0sIG1heENvb3JkWzFdLCBpbk9yaWdpblsyXV0sXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hDZW50ZXJlZFJlY3RhbmdsZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKSB7XG4gICAgY29uc3Qgb3JpZ2luOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgaW5DZW50ZXJbMF0gLSBpblNpemVbMF0gKiAwLjUsXG4gICAgICBpbkNlbnRlclsxXSAtIGluU2l6ZVsxXSAqIDAuNSxcbiAgICAgIGluQ2VudGVyWzJdXG4gICAgXTtcblxuICAgIHRoaXMucHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKG9yaWdpbiwgaW5TaXplLCBpbkNvbG9yKTtcbiAgfVxuXG4gIGNhblJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpemUgPiAwO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmNhblJlbmRlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fZ2VvbWV0cnkuYWxsb2NhdGVCdWZmZXIoMCwgdGhpcy5fYnVmZmVyLCB0aGlzLl9jdXJyZW50U2l6ZSk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA3KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgLy8gcmVzZXQgdmVydGljZXNcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSA9IDA7XG4gIH1cbn1cbiIsCiAgImltcG9ydCAqIGFzIHdlYmdsMiBmcm9tICcuLi8uLi8uLi9ncmFwaGljcy93ZWJnbDInO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgc3RhY2tSZW5kZXJlclZlcnRleCBmcm9tICcuL3NoYWRlcnMvc3RhY2stcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBzdGFja1JlbmRlcmVyRnJhZ21lbnQgZnJvbSAnLi9zaGFkZXJzL3N0YWNrLXJlbmRlcmVyLmdsc2wuZnJhZyc7XG5cbmltcG9ydCB7IFdpcmVGcmFtZXNTdGFja1JlbmRlcmVyIH0gZnJvbSAnLi9pbnRlcm5hbHMvV2lyZUZyYW1lc1N0YWNrUmVuZGVyZXInO1xuaW1wb3J0IHsgVHJpYW5nbGVzU3RhY2tSZW5kZXJlciB9IGZyb20gJy4vaW50ZXJuYWxzL1RyaWFuZ2xlc1N0YWNrUmVuZGVyZXInO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RhY2tSZW5kZXJlcnMge1xuICBwdXNoVHJpYW5nbGUoXG4gICAgaW5Qb3NBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9zQjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvc0M6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKTogdm9pZDtcblxuICBwdXNoUXVhZChcbiAgICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjMyB8IGdsbS5SZWFkb25seVZlYzRcbiAgKTogdm9pZDtcblxuICBwdXNoTGluZShcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICk6IHZvaWQ7XG5cbiAgcHVzaENyb3NzKFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogbnVtYmVyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcblxuICBwdXNoVGhpY2tMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcblxuICBwdXNoUm90YXRlZExpbmUoXG4gICAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGFuZ2xlOiBudW1iZXIsXG4gICAgbGVuZ3RoOiBudW1iZXIsXG4gICAgdGhpY2tuZXNzOiBudW1iZXIsXG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcblxuICBwdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoXG4gICAgaW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICk6IHZvaWQ7XG5cbiAgcHVzaENlbnRlcmVkUmVjdGFuZ2xlKFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApOiB2b2lkO1xuXG4gIHNhZmVSZW5kZXIoaW5Db21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCwgaW5DYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gIGZsdXNoKGNvbXBvc2VkTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KTogdm9pZDtcbiAgY2xlYXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFN0YWNrUmVuZGVyZXJzIGltcGxlbWVudHMgSVN0YWNrUmVuZGVyZXJzIHtcbiAgcHJpdmF0ZSBfc2hhZGVyOiB3ZWJnbDIuSVVuYm91bmRTaGFkZXI7XG5cbiAgcHJpdmF0ZSBfd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXI6IFdpcmVGcmFtZXNTdGFja1JlbmRlcmVyO1xuICBwcml2YXRlIF90cmlhbmdsZXNTdGFja1JlbmRlcmVyOiBUcmlhbmdsZXNTdGFja1JlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NoYWRlciA9IG5ldyB3ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnU3RhY2tSZW5kZXJlcnMnLCB7XG4gICAgICB2ZXJ0ZXhTcmM6IHN0YWNrUmVuZGVyZXJWZXJ0ZXgsXG4gICAgICBmcmFnbWVudFNyYzogc3RhY2tSZW5kZXJlckZyYWdtZW50LFxuICAgICAgYXR0cmlidXRlczogWydhX3ZlcnRleF9wb3NpdGlvbicsICdhX3ZlcnRleF9jb2xvciddLFxuICAgICAgdW5pZm9ybXM6IFsndV9jb21wb3NlZE1hdHJpeCddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCdsaW5lcycpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5zZXRWYm9Bc0R5bmFtaWMoKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhfcG9zaXRpb24nLCAndmVjM2YnKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV92ZXJ0ZXhfY29sb3InLCAndmVjNGYnKTtcblxuICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyID0gbmV3IFdpcmVGcmFtZXNTdGFja1JlbmRlcmVyKFxuICAgICAgdGhpcy5fc2hhZGVyLFxuICAgICAgZ2VvQnVpbGRlci5nZXREZWYoKVxuICAgICk7XG4gICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlciA9IG5ldyBUcmlhbmdsZXNTdGFja1JlbmRlcmVyKFxuICAgICAgdGhpcy5fc2hhZGVyLFxuICAgICAgZ2VvQnVpbGRlci5nZXREZWYoKVxuICAgICk7XG4gIH1cblxuICBwdXNoTGluZShcbiAgICBpblBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblBvaW50QjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIHRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLnB1c2hMaW5lKGluUG9pbnRBLCBpblBvaW50QiwgaW5Db2xvcik7XG4gIH1cblxuICBwdXNoQ3Jvc3MoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICBjb25zdCBjcm9zc1ZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgICBbaW5DZW50ZXJbMF0gLSBpblNpemUsIGluQ2VudGVyWzFdLCBpbkNlbnRlclsyXV0sXG4gICAgICBbaW5DZW50ZXJbMF0gKyBpblNpemUsIGluQ2VudGVyWzFdLCBpbkNlbnRlclsyXV0sXG4gICAgICBbaW5DZW50ZXJbMF0sIGluQ2VudGVyWzFdIC0gaW5TaXplLCBpbkNlbnRlclsyXV0sXG4gICAgICBbaW5DZW50ZXJbMF0sIGluQ2VudGVyWzFdICsgaW5TaXplLCBpbkNlbnRlclsyXV0sXG4gICAgICBbaW5DZW50ZXJbMF0sIGluQ2VudGVyWzFdLCBpbkNlbnRlclsyXSAtIGluU2l6ZV0sXG4gICAgICBbaW5DZW50ZXJbMF0sIGluQ2VudGVyWzFdLCBpbkNlbnRlclsyXSArIGluU2l6ZV1cbiAgICBdO1xuICAgIGNvbnN0IGNyb3NzSW5kaWNlczogbnVtYmVyW10gPSBbMCwgMSwgMiwgMywgNCwgNV07XG5cbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgY3Jvc3NJbmRpY2VzLmxlbmd0aDsgaWkgKz0gMikge1xuICAgICAgY29uc3QgdmVydGV4QSA9IGNyb3NzVmVydGljZXNbaWkgKyAwXTtcbiAgICAgIGNvbnN0IHZlcnRleEIgPSBjcm9zc1ZlcnRpY2VzW2lpICsgMV07XG4gICAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5wdXNoTGluZSh2ZXJ0ZXhBLCB2ZXJ0ZXhCLCBpbkNvbG9yKTtcbiAgICB9XG4gIH1cblxuICBwdXNoVGhpY2tMaW5lKFxuICAgIGluUG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKSB7XG4gICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5wdXNoTGluZShcbiAgICAgIGluUG9pbnRBLFxuICAgICAgaW5Qb2ludEIsXG4gICAgICB0aGlja25lc3MsXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hSb3RhdGVkTGluZShcbiAgICBjZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgYW5nbGU6IG51bWJlcixcbiAgICBsZW5ndGg6IG51bWJlcixcbiAgICB0aGlja25lc3M6IG51bWJlcixcbiAgICBjb2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLnB1c2hSb3RhdGVkTGluZShcbiAgICAgIGNlbnRlcixcbiAgICAgIGFuZ2xlLFxuICAgICAgbGVuZ3RoLFxuICAgICAgdGhpY2tuZXNzLFxuICAgICAgY29sb3JcbiAgICApO1xuICB9XG5cbiAgcHVzaE9yaWdpbkJvdW5kUmVjdGFuZ2xlKFxuICAgIGluT3JpZ2luOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLnB1c2hPcmlnaW5Cb3VuZFJlY3RhbmdsZShcbiAgICAgIGluT3JpZ2luLFxuICAgICAgaW5TaXplLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBwdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgaW5DZW50ZXI6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TaXplOiBnbG0uUmVhZG9ubHlWZWMyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzMgfCBnbG0uUmVhZG9ubHlWZWM0XG4gICkge1xuICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIucHVzaENlbnRlcmVkUmVjdGFuZ2xlKFxuICAgICAgaW5DZW50ZXIsXG4gICAgICBpblNpemUsXG4gICAgICBpbkNvbG9yXG4gICAgKTtcbiAgfVxuXG4gIHB1c2hUcmlhbmdsZShcbiAgICBpblBvc0E6IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5Qb3NCOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluUG9zQzogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLnB1c2hUcmlhbmdsZShpblBvc0EsIGluUG9zQiwgaW5Qb3NDLCBpbkNvbG9yKTtcbiAgfVxuXG4gIHB1c2hRdWFkKFxuICAgIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzIHwgZ2xtLlJlYWRvbmx5VmVjNFxuICApIHtcbiAgICB0aGlzLnB1c2hUcmlhbmdsZShcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgaW5Qb3NbMl1dLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMSwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCBpblBvc1syXV0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDAsIGluUG9zWzJdXSxcbiAgICAgIGluQ29sb3JcbiAgICApO1xuICAgIHRoaXMucHVzaFRyaWFuZ2xlKFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAwLCBpblBvc1syXV0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDEsIGluUG9zWzJdXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDAsIGluUG9zWzFdICsgaW5TaXplWzFdICogMSwgaW5Qb3NbMl1dLFxuICAgICAgaW5Db2xvclxuICAgICk7XG4gIH1cblxuICBmbHVzaChpbkNvbXBvc2VkTWF0cml4OiBnbG0uUmVhZG9ubHlNYXQ0KSB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuX3dpcmVGcmFtZXNTdGFja1JlbmRlcmVyLmNhblJlbmRlcigpICYmXG4gICAgICAhdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5jYW5SZW5kZXIoKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZCkgPT4ge1xuICAgICAgYm91bmQuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBpbkNvbXBvc2VkTWF0cml4KTtcblxuICAgICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIuZmx1c2goKTtcbiAgICAgIHRoaXMuX3RyaWFuZ2xlc1N0YWNrUmVuZGVyZXIuZmx1c2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNhZmVSZW5kZXIoaW5Db21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCwgaW5DYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZCkgPT4ge1xuICAgICAgYm91bmQuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBpbkNvbXBvc2VkTWF0cml4KTtcblxuICAgICAgaW5DYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLl93aXJlRnJhbWVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgICAgdGhpcy5fdHJpYW5nbGVzU3RhY2tSZW5kZXJlci5mbHVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fd2lyZUZyYW1lc1N0YWNrUmVuZGVyZXIuY2xlYXIoKTtcbiAgICB0aGlzLl90cmlhbmdsZXNTdGFja1JlbmRlcmVyLmNsZWFyKCk7XG4gIH1cbn1cbiIsCiAgImV4cG9ydCBkZWZhdWx0IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbnVuaWZvcm0gbWF0NCB1X2NvbXBvc2VkTWF0cml4O1xuXG5pbiB2ZWMyIGFfdmVydGV4X3Bvc2l0aW9uO1xuaW4gdmVjMiBhX3ZlcnRleF90ZXhDb29yZDtcbmluIHZlYzMgYV9vZmZzZXRfcG9zaXRpb247XG5pbiB2ZWMyIGFfb2Zmc2V0X3RleENvb3JkO1xuaW4gdmVjMyBhX29mZnNldF9jb2xvcjtcbmluIGZsb2F0IGFfb2Zmc2V0X3NjYWxlO1xuXG5vdXQgdmVjMiB2X3RleENvb3JkO1xuZmxhdCBvdXQgdmVjMyB2X2NvbG9yO1xuXG52b2lkIG1haW4odm9pZClcbntcbiAgdmVjMyBwb3NpdGlvbiA9IHZlYzMoYV92ZXJ0ZXhfcG9zaXRpb24sIDAuMCkgKiBhX29mZnNldF9zY2FsZSArIGFfb2Zmc2V0X3Bvc2l0aW9uO1xuXG4gIGdsX1Bvc2l0aW9uID0gdV9jb21wb3NlZE1hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XG5cbiAgdl90ZXhDb29yZCA9IGFfdmVydGV4X3RleENvb3JkICsgYV9vZmZzZXRfdGV4Q29vcmQ7XG4gIHZfY29sb3IgPSBhX29mZnNldF9jb2xvcjtcbn1cbmAudHJpbSgpOyIsCiAgImV4cG9ydCBkZWZhdWx0IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcblxudW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlO1xuXG5pbiB2ZWMyIHZfdGV4Q29vcmQ7XG5mbGF0IGluIHZlYzMgdl9jb2xvcjtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZSh1X3RleHR1cmUsIHZfdGV4Q29vcmQpO1xuICBpZiAodGV4dHVyZUNvbG9yLmEgPCAwLjUpXG4gIHtcbiAgICBkaXNjYXJkO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIG9fY29sb3IgPSB2ZWM0KHZfY29sb3IsIHRleHR1cmVDb2xvci5hKTtcbiAgfVxufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGNvbnN0IGFzY2lpVGV4dHVyZUhleCA9XG4gICc3ZTdlMjhmZDAzZmQwN2ZlMDRmZTBhZmYwMmZmN2U0ZGZkMGNmZDAzZmQwN2ZlMDRmZTBhZmYwMmZmMWFmYzBkZmQxMGZjMDhmYzBmZmU1NWZmMTVmYjBiZmQwM2ZkMDdmZTA0ZmUwOGY3MDdmZDA0ZmYwN2ZlMDJmZTBjZmQwZmZkMGNmZDBhZmYwM2ZlMDNmZjBhZmU0NGZlMTVmYjBiZmQwM2ZkMDRmMjA0ZjYwN2ZkMDNmZTA3ZmUwMmZlMGNmZDBlZmQwZWZkMGFmZjAyZmUwMmZmMGJmZTQzZmQxNWZiMGNmZTAzZmUwNWYyMDRmZTAxZmYwMmZmMGFmZDAyZmQwN2ZlMDJmZTBiZmQwZWZkMTBmZDBhZmEwY2ZlNDJmZDE2ZmIxYmZlMDRmZTA3ZmUwMWZmMDJmZjBlZmQwOWZjMWNmZDEyZmQwOWZhMGNmZTQxZmQxN2ZiMWJmZTA0ZmUwN2Y3MGJmZDBhZmMwNGZmMTdmZDEyZmQwNmY0MDVmNjE2ZjYxY2ZkMTlmZDFjZmUwNGZlMDhmNzA5ZmQwYmZiMDJmZTE3ZmQxMmZkMDZmNDA1ZjYxNmY2MWJmZDFhZmQxY2ZlMDRmZTBhZmYwMmZmMDFmZTA4ZmQwYmZlMDJmYTE3ZmQxMmZkMDlmYTBjZmUzZWZkMzdmMjA3ZmYwMmZmMDFmZTA3ZmQwMmZkMDdmZTAzZmMxOWZkMTBmZDBhZmEwY2ZlM2RmZDM4ZjIwNGY2MDdmZTAzZmQwN2ZlMDNmZDFiZmQwZWZkMGFmZjAyZmUwMmZmMGJmZTBjZmQxZGZkMGRmZDFkZmQxY2ZlMDRmZTA3ZjcwOGZmMDRmZDA3ZmUwMmZiMWJmZDBjZmQwYWZmMDNmZTAzZmYwYWZlMGNmZDFkZmQwY2ZkMWVmZDFjZmUwNGZlMGFmZjAyZmYxYWZiMDJmZTFiZmMwOGZjMGZmZTFjZmQxZGZkMGJmZDFmZmQxY2ZlMDRmZTBhZmYwMmZmN2FmZDdlN2U3ZTdlN2U3ZTBlZmQxN2ZkMTBmYzBhZjgwYmZlMGJmOTA5ZjkwZGZkMDhmNjA5ZmIwOGY1MDZmODA4ZjgyY2ZkMTlmZDBkZjgwN2ZkMDRmZDBhZmUwYWZkMDNmZDA3ZmQwM2ZkMGJmYzA4ZmQwZmZkMGJmZDA1ZmQwNWZkMDRmZDA2ZmQwNGZkMmFmZDFiZmQwYmZjMDJmYzA2ZmQwM2ZjMDlmZDBhZmQwNGZkMDZmZDA0ZmQwOWZiMDhmZDBlZmQwY2ZkMDVmZDA1ZmQwNGZkMDZmZDA0ZmQwOWZkMGNmZDBlZmQxZGZkMGFmZTA1ZmQwNmZkMDJmYjA2ZmExMWZkMGRmZDA4ZmUwMWZkMDhmZDBkZmQwZGZkMDVmZDA1ZmQwNGZkMDZmZDA0ZmQwOWZkMGNmZDBkZmQwYWY0MDlmZDEwZmQwNmZkMDJmYjA2ZmExMGZkMGRmZDA4ZmUwMmZkMDhmZDBkZmQxNWZkMDVmYjAyZmQwNmZkMDRmZDA5ZmQwY2ZkMGNmZDBiZjQwYWZkMGVmZDA3ZmQwMWZlMDFmZDA5ZmQwZmZkMGJmYjA4ZmUwM2ZkMDhmODA4ZjcwZWZkMDhmYTA4ZjYyNmZkMjNmZDBjZmQwOGZkMDFmZTAxZmQwOWZkMGVmZDBjZmIwOGY2MDZmNzA3ZjYwY2ZkMDlmYTA5ZjcyNmZkMjNmZDBiZmQwOWZiMDJmZDA5ZmQwZGZkMTBmZDA3ZjYwY2ZjMDZmZDA0ZmQwYmZkMDhmZDAyZmIwZGZkMDlmZDBjZmQwY2ZkMGJmNDBhZmQwY2ZkMDlmYjAyZmQwOWZkMGNmZDEyZmQwYmZkMGZmZDA2ZmQwNGZkMGFmZDA5ZmQwNGZkMGRmZDA5ZmQwY2ZkMGRmZDBhZjQwOWZkMTlmYzAzZmQwOWZkMGJmZDAzZmQwNmZkMDRmZDBiZmQwOGZkMDRmZDA2ZmQwNGZkMDlmZDBhZmQwNGZkMGNmZDBhZmQwY2ZkMGVmZDFkZmQxYWZkMDRmZDA5ZmQwYWZkMDRmZDA2ZmQwM2ZkMGNmZDA4ZmQwM2ZkMDdmZDA0ZmQwOWZkMGFmZDA0ZmQwYmZkMTlmZDEwZmQxYmZkMGZmZDBhZjgwN2Y3MDdmNjA3ZjkwYmY5MDdmOTA5ZjgwYWZkMGJmODA5ZmIyZWZkMTlmZDEwZmQ3ZTUxZmQxN2ZkMTFmZDdlN2U3ZTdlMTNmODdlNzhmZDA1ZmQwOGZjMDlmNzA5ZjkwN2Y4MDhmNjA2ZjYwOGY5MDdmZDAzZmQwN2Y5MGRmOTA1ZmMwM2ZkMDZmYjBiZmQwNWZkMDVmZDA1ZmQwOGZiMDhmZDA1ZmQwN2ZhMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZkMDhmZDA0ZmUwN2ZkMDRmZTA3ZmQwM2ZkMDZmZDAzZmQwOWZkMTFmZDA4ZmQwM2ZkMDdmZDBjZmMwM2ZjMDVmZDA1ZmQwN2ZkMDFmZDA3ZmQwNWZkMDZmZDAyZmQwOGZkMDNmZDA2ZmQwNGZkMDdmZDAzZmQwN2ZkMDVmZjA3ZmQwNWZmMDZmZDA0ZmQwNmZkMDNmZDA5ZmQxMWZkMDhmZDAyZmQwOGZkMGNmYjAxZmIwNWZjMDRmZDA2ZmQwM2ZkMDZmZDA1ZmQwNWZkMDRmZDA3ZmQwM2ZkMDZmZDBlZmQwM2ZkMDdmZDBkZmQwY2ZkMDRmZDA2ZmQwM2ZkMDlmZDExZmQwOGZkMDFmZDA5ZmQwY2Y1MDVmYjAzZmQwNWZkMDVmZDA1ZmQwMmZhMDVmZDA0ZmQwN2ZkMDNmZDA2ZmQwZWZkMDNmZDA3ZmQwM2ZlMDhmZDAzZmUwN2ZkMGRmZDAzZmQwOWZkMTFmZDA4ZmEwYWZkMGNmNTA1ZmEwMmZkMDVmZDA1ZmQwNWZkMDJmYTA1ZmQwNGZkMDdmODA3ZmQwZWZkMDNmZDA3ZjgwOGY4MDdmZDBkZjcwOWZkMTFmZDA4ZmIwYmZkMGNmZDAxZmQwMWZkMDVmZDAxZmQwMWZkMDVmZDA1ZmQwNWZkMDJmYTA1ZmQwNGZkMDdmODA3ZmQwZWZkMDNmZDA3ZjgwOGY4MDdmZDBkZjcwOWZkMTFmZDA4ZmIwYmZkMGNmZDAyZmYwMmZkMDVmZDAyZmEwNWZkMDVmZDA1ZmQwMmZhMDVmNjA3ZmQwM2ZkMDZmZDBlZmQwM2ZkMDdmZDAzZmUwOGZkMDNmZTA3ZmQwMmZiMDZmZDAzZmQwOWZkMGJmZDAzZmQwOGZhMGFmZDBjZmQwNWZkMDVmZDAzZmIwNWZkMDVmZDA1ZmQwZGZkMDRmZDA3ZmQwM2ZkMDZmZDBlZmQwM2ZkMDdmZDBkZmQwY2ZkMDRmZDA2ZmQwM2ZkMDlmZDBiZmQwM2ZkMDhmZDAxZmQwOWZkMDVmZjA2ZmQwNWZkMDVmZDA0ZmMwNWZkMDVmZDA1ZmQwZGZkMDRmZDA3ZmQwM2ZkMDZmZDA0ZmQwN2ZkMDNmZDA3ZmQwNWZmMDdmZDBjZmQwNGZkMDZmZDAzZmQwOWZkMGJmZDAzZmQwOGZkMDJmZDA4ZmQwNGZlMDZmZDA1ZmQwNWZkMDVmZDA2ZmQwM2ZkMDZmZDBkZmQwNGZkMDdmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZkMDhmZDA0ZmUwN2ZkMGRmZDAzZmQwNmZkMDNmZDA5ZmQwYmZkMDNmZDA4ZmQwM2ZkMDdmZDAzZmQwNmZkMDVmZDA1ZmQwNWZkMDdmZDAxZmQwN2ZkMGRmZDA0ZmQwNmY3MDlmOTA3ZjgwOGY2MDZmYjBkZjgwNmZkMDNmZDA3ZjkwYWY5MDhmYzAzZmQwNmY2MDZmZDA1ZmQwNWZkMDVmZDA4ZmIwYWY4N2U3ZTdlN2U3ZTdlN2U2OGZlMWFmNzBhZmIwOGY3MDhmODA3ZjUwNWZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNWZkMDNmZDA3ZmQwM2ZkMDdmNjA4ZjkwN2ZmMTFmOTBhZmMxYWZkMDNmZDA3ZmMwMWZjMDdmZDAzZmQwNmZkMDRmZDA2ZmUwMmZkMDJmZTA1ZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwM2ZkMDdmZDAzZmQwN2ZkMDRmZDA4ZmQwYmZlMTRmZDA5ZmExOWZkMDNmZDA3ZmQwM2ZkMDdmZDAzZmQwNmZkMDRmZDA2ZmYwM2ZkMDNmZjA1ZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA1ZmQwM2ZkMDdmZDAzZmQwN2ZlMDVmZDA4ZmQwYmZkMTNmZDA4ZmQwMmZkMThmZDAzZmQwNmZkMDVmZDA2ZmQwM2ZkMDZmZDA0ZmQwYWZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDZmZDAxZmQwOGZkMDNmZDA3ZmYwNWZkMDlmZDBjZmQxMmZkMDdmZDA0ZmQxN2ZkMDNmZDA2ZmQwNWZkMDZmZDAzZmQwNmZkMTFmZDA5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDVmZDA3ZmIwOWZkMDNmZDBjZmQwYWZkMGRmZDExZmQyOGY4MDdmZDA1ZmQwNmY4MDhmOTBjZmQwOWZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmYwMmZkMDhmZDBiZmQwMWZkMGNmZDBiZmQwZWZkMTBmZDI4ZjgwN2ZkMDVmZDA2ZjgwOWY5MGJmZDA5ZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwOGZkMGNmYjBjZmQwY2ZkMGZmZDBmZmQyOGZkMGNmZDAzZmIwNmZkMDJmZDBlZmQwYWZkMDlmZDAzZmQwN2ZkMDNmZDA3ZmQwMmZmMDJmZDA3ZmIwY2ZkMGNmZDBkZmQxMGZkMGVmZDI4ZmQwY2ZkMDJmYTA2ZmQwM2ZkMDZmZDA0ZmQwYWZkMDlmZDAzZmQwN2ZkMDNmZDA4ZjcwN2ZkMDFmZDBiZmQwYmZkMDVmZjA4ZmQxMWZkMGRmZDI4ZmQwZGY3MDdmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA4ZmQwMWZkMDlmYzAxZmMwNmZkMDNmZDBhZmQwYWZkMDVmZTA4ZmQxMmZkMGNmZDI4ZmQwZGY3MDdmZDAzZmQwNmZkMDRmZDBhZmQwOWZkMDNmZDA5ZmIwYmZkMDFmZDA3ZmQwM2ZkMGFmZDBhZmQwNGZkMDhmZDEzZmQwYmZkMjdmYjEyZmQwNmZjMDNmZDA3ZjgwOWY5MDhmOTBiZmQwY2ZkMDFmZDA3ZmQwM2ZkMDhmOTA4ZjYwOGY5MTBmZDA2ZjkzY2ZhN2U1NGYwN2U3MmYwN2U3ZTdlN2UwYmZkMWRmYzIxZmIxOWZiMThmYzEwZmQwZmZkMDdmYzBkZmEzOWZkMWVmZDIyZmQxOWZkMDFmZDE4ZmQxMGZkMGZmZDA4ZmQxMGZkM2JmZDFjZmQyMmZkMTlmZDAxZmQxOGZkMTBmZDBmZmQwOGZkMTBmZDNiZmQxY2ZkMjJmZDE5ZmQxY2ZkMmRmZDEwZmQ0YWY5MDlmODA4ZjkwOWY4MDhmOTBhZmQwY2ZiMDJmZTA3ZmQwMWZjMDhmYTBjZmEwOGZkMDNmZDBhZmQwOWY2MDZmODA5ZjkxZWZkMDhmZDAzZmQwNmZkMDNmZDA3ZmQwM2ZkMDdmZDAzZmQwN2Y4MDhmZDAzZmQwOGZjMDJmZDBhZmQwZmZkMDhmZDAyZmQwYmZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDFkZmQwOGZkMDNmZDA2ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA3ZjgwOGZkMDNmZDA4ZmMwMmZkMGFmZDBmZmQwOGZkMDFmZDBjZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMThmODA4ZmQwM2ZkMDZmZDBkZmQwM2ZkMDdmNzA5ZmQwYmZkMDNmZDA4ZmQwM2ZkMGFmZDBmZmQwOGZhMGRmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxN2ZkMDNmZDA4ZmQwM2ZkMDZmZDBkZmQwM2ZkMDdmZDBmZmQwYmZkMDNmZDA4ZmQwM2ZkMGFmZDBmZmQwOGZkMDFmZDBjZmQwOWZkMDJmZjAyZmQwNWZkMDNmZDA3ZmQwM2ZkMTdmZDAzZmQwOGZkMDNmZDA2ZmQwM2ZkMDdmZDAzZmQwN2ZkMDNmZDA5ZmQwY2Y4MDhmZDAzZmQwYWZkMGZmZDA4ZmQwMmZkMGJmZDA5ZmQwMmZmMDJmZDA1ZmQwM2ZkMDdmZDAzZmQxN2ZkMDNmZDA4ZmQwM2ZkMDZmZDAzZmQwN2ZkMDNmZDA3ZmQwM2ZkMDlmZDBkZjkwOGZkMDNmZDBhZmQwZmZkMDhmZDAzZmQwYWZkMDlmZDAyZmYwMmZkMDVmZDAzZmQwN2ZkMDNmZDE4ZmIwMmZlMDZmZTAyZmIwOGY5MDlmYjAyZmUwN2Y5MDhmOTBmZmQwN2ZjMDNmZDA3ZjcwNmZkMDNmZDA3ZmMwM2ZkMDdmNzA2ZmQwNWZkMDVmZDAzZmQwOGY5NzhmZDAzZmQyN2ZkMDNmZDdlNGFmOTJhZmE3ZTdlN2U3ZTdlN2UxOGZhMDlmYzA5ZmExZWZlNGVmZjZlZmQwZGZjMGRmZDFjZmM0Y2ZlNmVmZDBkZmMwZGZkMWJmYTRhZmQ2ZWZkMGRmYzBkZmQxYWZkMDJmZDA3ZmUwMmZiMDdmYjAyZmUwN2ZjMDJmZDA4ZjkwOGY3MDdmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDVmZDAyZmQwOWZkMDNmZDA2ZjgwYWZkMGVmYzBlZmQwOGZiMDNmZDA1ZmQwNGZkMDdmZDAzZmQwNWZkMDNmZDA5ZjcwNmZkMDRmZTA5ZmQwYmZkMDNmZDA3ZmQwM2ZkMDdmZDA1ZmQwNWZkMDJmZDA5ZmQwM2ZkMDZmZTAzZmQwOGZkMjRmZDA1ZmQwMWZkMDJmZDA1ZmUwNmZlMDdmZDAzZmQwNWZkMDNmZDA5ZmMwMmZkMDZmZDA0ZmUwOWZkMGJmZDAzZmQwN2ZkMDNmZDA3ZmQwNWZkMDZmYTBhZmQwM2ZkMDZmZjAzZmQwOWZkMjRmZDA1ZmQwMmZkMDFmZDA1ZmUwNmZlMDdmZDAzZmQwNWZkMDNmZDA5ZmQwZGZiMGNmZDBiZmQwM2ZkMDdmZDAzZmQwN2ZkMDJmZjAyZmQwN2ZjMGJmZDAzZmQwOWZkMGNmZDBlZmMwZWZkMDdmZDAzZmIwNmZlMDZmZTA3ZmQwM2ZkMDVmZDAzZmQwOWZkMGZmYjBhZmQwYmZkMDNmZDA3ZmQwM2ZkMDdmZDAyZmYwMmZkMDdmYzBiZmQwM2ZkMDhmZDBlZmQwZGZjMGRmZDE5ZmUwNmZlMDdmZDAzZmQwNWZkMDNmZDA5ZmQwY2ZlMDRmZDA5ZmQwMWZkMDdmZDAzZmQwOGZkMDFmZDA5ZmMwMWZjMDdmYTBiZjkwOGZkMDNmZjBiZmQwZGZjMGRmZDE5ZmUwNmZlMDdmODA3ZjgwOWZkMGNmZTA0ZmQwOWZkMDFmZDA3ZmQwM2ZkMDlmYjBiZmQwMWZkMDdmZDAyZmQwYmZiMDhmZDAzZmUwYmZkMGRmYzBkZmQxOWY2MDdmZDExZmQwOGZiMGNmOTBiZmIwOWZiMDJmZTA5ZmQwY2ZkMDFmZDA3ZmQwMmZkMGRmZDA4ZjgwY2ZhMDlmYzA5ZmExYWY2MDdmZDExZmQ3Y2ZkNjlmYjBmZmI3N2ZhJztcbiIsCiAgImltcG9ydCAqIGFzIHdlYmdsMiBmcm9tICcuLi8uLi8uLi9ncmFwaGljcy93ZWJnbDInO1xuXG4vLyBpbXBvcnQgKiBhcyBzaGFkZXJzIGZyb20gJy4vc2hhZGVycyc7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB0ZXh0UmVuZGVyZXJWZXJ0ZXggZnJvbSAnLi9zaGFkZXJzL3RleHQtcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB0ZXh0UmVuZGVyZXJGcmFnbWVudCBmcm9tICcuL3NoYWRlcnMvdGV4dC1yZW5kZXJlci5nbHNsLmZyYWcnO1xuXG5pbXBvcnQgeyBhc2NpaVRleHR1cmVIZXggfSBmcm9tICcuL2ludGVybmFscy9hc2NpaVRleHR1cmVIZXgnO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuY29uc3Qga19ncmlkU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMiA9IFsxNiwgNl07XG5jb25zdCBrX3RleENvb3JkOiBnbG0uUmVhZG9ubHlWZWMyID0gWzEgLyBrX2dyaWRTaXplWzBdLCAxIC8ga19ncmlkU2l6ZVsxXV07XG5cbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDkgKiAxMDI0ICogNDtcblxudHlwZSBIb3Jpem9udGFsVGV4dEFsaWduID0gJ2xlZnQnIHwgJ2NlbnRlcmVkJyB8ICdyaWdodCc7XG50eXBlIFZlcnRpY2FsVGV4dEFsaWduID0gJ3RvcCcgfCAnY2VudGVyZWQnIHwgJ2JvdHRvbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRleHRSZW5kZXJlciB7XG4gIHNldFRleHRBbGlnbihcbiAgICBpbkhvcml6b250YWxUZXh0QWxpZ246IEhvcml6b250YWxUZXh0QWxpZ24sXG4gICAgaW5WZXJ0aWNhbFRleHRBbGlnbjogVmVydGljYWxUZXh0QWxpZ25cbiAgKTogdGhpcztcbiAgc2V0VGV4dFNjYWxlKGluU2NhbGU6IG51bWJlcik6IHRoaXM7XG4gIHNldFRleHRDb2xvcihpblJlZDogbnVtYmVyLCBpbkdyZWVuOiBudW1iZXIsIGluQmx1ZTogbnVtYmVyKTogdGhpcztcblxuICBwdXNoVGV4dChpbk1lc3NhZ2U6IHN0cmluZywgaW5Qb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMik6IHRoaXM7XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQpOiB0aGlzO1xuICBjbGVhcigpOiB0aGlzO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dFJlbmRlcmVyIGltcGxlbWVudHMgSVRleHRSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogd2ViZ2wyLklVbmJvdW5kU2hhZGVyO1xuICBwcml2YXRlIF9nZW9tZXRyeTogd2ViZ2wyLkdlb21ldHJ5V3JhcHBlci5HZW9tZXRyeTtcbiAgcHJpdmF0ZSBfdGV4dHVyZTogd2ViZ2wyLklVbmJvdW5kVGV4dHVyZSA9IG5ldyB3ZWJnbDIuVGV4dHVyZSgpO1xuICBwcml2YXRlIF90ZXhDb29yZE1hcDogTWFwPHN0cmluZywgZ2xtLlJlYWRvbmx5VmVjMj47XG5cbiAgcHJpdmF0ZSBfYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShrX2J1ZmZlclNpemUpO1xuICBwcml2YXRlIF9jdXJyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIF90ZXh0U2NhbGU6IG51bWJlciA9IDE0O1xuICBwcml2YXRlIF90ZXh0Q29sb3I6IGdsbS52ZWMzID0gWzEsIDEsIDFdO1xuXG4gIHByaXZhdGUgX2hvcml6b250YWxUZXh0QWxpZ246IEhvcml6b250YWxUZXh0QWxpZ24gPSAnbGVmdCc7XG4gIHByaXZhdGUgX3ZlcnRpY2FsVGV4dEFsaWduOiBWZXJ0aWNhbFRleHRBbGlnbiA9ICd0b3AnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NoYWRlciA9IG5ldyB3ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnVGV4dFJlbmRlcmVyJywge1xuICAgICAgdmVydGV4U3JjOiB0ZXh0UmVuZGVyZXJWZXJ0ZXgsXG4gICAgICBmcmFnbWVudFNyYzogdGV4dFJlbmRlcmVyRnJhZ21lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICdhX3ZlcnRleF9wb3NpdGlvbicsXG4gICAgICAgICdhX3ZlcnRleF90ZXhDb29yZCcsXG4gICAgICAgICdhX29mZnNldF9wb3NpdGlvbicsXG4gICAgICAgICdhX29mZnNldF90ZXhDb29yZCcsXG4gICAgICAgICdhX29mZnNldF9jb2xvcicsXG4gICAgICAgICdhX29mZnNldF9zY2FsZSdcbiAgICAgIF0sXG4gICAgICB1bmlmb3JtczogWyd1X2NvbXBvc2VkTWF0cml4JywgJ3VfdGV4dHVyZSddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZXMnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuc2V0U3RyaWRlKDQgKiA0KVxuICAgICAgLmFkZFZibygpXG4gICAgICAuc2V0VmJvQXNEeW5hbWljKClcbiAgICAgIC5zZXRWYm9Bc0luc3RhbmNlZCgpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9jb2xvcicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9zY2FsZScsICdmbG9hdCcpXG4gICAgICAuc2V0U3RyaWRlKDkgKiA0KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IHdlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcblxuICAgIHR5cGUgVmVydGV4ID0geyBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMjsgdGV4Q29vcmQ6IGdsbS5SZWFkb25seVZlYzIgfTtcblxuICAgIGNvbnN0IHZlcnRpY2VzOiBbVmVydGV4LCBWZXJ0ZXgsIFZlcnRleCwgVmVydGV4XSA9IFtcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsrMC41LCAtMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMSwga190ZXhDb29yZFsxXSAqIDFdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogWy0wLjUsIC0wLjVdLFxuICAgICAgICB0ZXhDb29yZDogW2tfdGV4Q29vcmRbMF0gKiAwLCBrX3RleENvb3JkWzFdICogMV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbKzAuNSwgKzAuNV0sXG4gICAgICAgIHRleENvb3JkOiBba190ZXhDb29yZFswXSAqIDEsIGtfdGV4Q29vcmRbMV0gKiAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFstMC41LCArMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMCwga190ZXhDb29yZFsxXSAqIDBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGluZGljZXMgPSBbMSwgMCwgMiwgMSwgMiwgM107XG5cbiAgICBjb25zdCBsZXR0ZXJWZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGljZXMpIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHZlcnRpY2VzW2luZGV4XTtcbiAgICAgIGxldHRlclZlcnRpY2VzLnB1c2goXG4gICAgICAgIHZlcnRleC5wb3NpdGlvblswXSxcbiAgICAgICAgdmVydGV4LnBvc2l0aW9uWzFdLFxuICAgICAgICB2ZXJ0ZXgudGV4Q29vcmRbMF0sXG4gICAgICAgIHZlcnRleC50ZXhDb29yZFsxXVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9tZXRyeS5hbGxvY2F0ZUJ1ZmZlcigwLCBsZXR0ZXJWZXJ0aWNlcywgbGV0dGVyVmVydGljZXMubGVuZ3RoKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudChsZXR0ZXJWZXJ0aWNlcy5sZW5ndGggLyA0KTtcblxuICAgIHRoaXMuX3RleENvb3JkTWFwID0gbmV3IE1hcDxzdHJpbmcsIGdsbS5SZWFkb25seVZlYzI+KFtcbiAgICAgIFsnICcsIFswICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnIScsIFsxICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXCInLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyMnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyQnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyUnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJyYnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbXCInXCIsIFs3ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKCcsIFs4ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKScsIFs5ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnKicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJysnLCBbMTEgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycsJywgWzEyICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnLScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDAgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJy4nLCBbMTQgKiBrX3RleENvb3JkWzBdLCAwICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycvJywgWzE1ICoga190ZXhDb29yZFswXSwgMCAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWycwJywgWzAgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycxJywgWzEgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWycyJywgWzIgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyczJywgWzMgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc0JywgWzQgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc1JywgWzUgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc2JywgWzYgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc3JywgWzcgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc4JywgWzggKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc5JywgWzkgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc6JywgWzEwICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnOycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJzwnLCBbMTIgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyc9JywgWzEzICoga190ZXhDb29yZFswXSwgMSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnPicsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDEgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJz8nLCBbMTUgKiBrX3RleENvb3JkWzBdLCAxICoga190ZXhDb29yZFsxXV1dLFxuXG4gICAgICBbJ0AnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0EnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0InLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0MnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0QnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0UnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0YnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0cnLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0gnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0knLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ0onLCBbMTAgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydLJywgWzExICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnTCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ00nLCBbMTMgKiBrX3RleENvb3JkWzBdLCAyICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydOJywgWzE0ICoga190ZXhDb29yZFswXSwgMiAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnTycsIFsxNSAqIGtfdGV4Q29vcmRbMF0sIDIgKiBrX3RleENvb3JkWzFdXV0sXG5cbiAgICAgIFsnUCcsIFswICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUScsIFsxICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUicsIFsyICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnUycsIFszICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVCcsIFs0ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVScsIFs1ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVicsIFs2ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnVycsIFs3ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWCcsIFs4ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWScsIFs5ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnWicsIFsxMCAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ1snLCBbMTEgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydcXFxcJywgWzEyICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnXScsIFsxMyAqIGtfdGV4Q29vcmRbMF0sIDMgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ14nLCBbMTQgKiBrX3RleENvb3JkWzBdLCAzICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydfJywgWzE1ICoga190ZXhDb29yZFswXSwgMyAqIGtfdGV4Q29vcmRbMV1dXSxcblxuICAgICAgWydgJywgWzAgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydhJywgWzEgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydiJywgWzIgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydjJywgWzMgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydkJywgWzQgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydlJywgWzUgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydmJywgWzYgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydnJywgWzcgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydoJywgWzggKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydpJywgWzkgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydqJywgWzEwICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnaycsIFsxMSAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ2wnLCBbMTIgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWydtJywgWzEzICoga190ZXhDb29yZFswXSwgNCAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnbicsIFsxNCAqIGtfdGV4Q29vcmRbMF0sIDQgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ28nLCBbMTUgKiBrX3RleENvb3JkWzBdLCA0ICoga190ZXhDb29yZFsxXV1dLFxuXG4gICAgICBbJ3AnLCBbMCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3EnLCBbMSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3InLCBbMiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3MnLCBbMyAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3QnLCBbNCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3UnLCBbNSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3YnLCBbNiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3cnLCBbNyAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3gnLCBbOCAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3knLCBbOSAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ3onLCBbMTAgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd7JywgWzExICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXSxcbiAgICAgIFsnfCcsIFsxMiAqIGtfdGV4Q29vcmRbMF0sIDUgKiBrX3RleENvb3JkWzFdXV0sXG4gICAgICBbJ30nLCBbMTMgKiBrX3RleENvb3JkWzBdLCA1ICoga190ZXhDb29yZFsxXV1dLFxuICAgICAgWyd+JywgWzE0ICoga190ZXhDb29yZFswXSwgNSAqIGtfdGV4Q29vcmRbMV1dXVxuICAgIF0pO1xuXG4gICAgY29uc3Qgd2lkdGggPSAyNTY7XG4gICAgY29uc3QgaGVpZ2h0ID0gOTY7XG4gICAgY29uc3QgaW1hZ2VQaXhlbHMgPSBuZXcgVWludDhBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpO1xuICAgIHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgYXNjaWlUZXh0dXJlSGV4Lmxlbmd0aDsgaWkgKz0gMikge1xuICAgICAgICBsZXQgY3VyclNpemUgPVxuICAgICAgICAgIHBhcnNlSW50KGAke2FzY2lpVGV4dHVyZUhleC5zdWJzdHJpbmcoaWksIGlpICsgMil9MDAwMDAwYCwgMTYpID4+IDI0O1xuXG4gICAgICAgIGxldCBjdXJyVmFsID0gMDtcbiAgICAgICAgaWYgKGN1cnJTaXplIDwgMCkge1xuICAgICAgICAgIGN1cnJTaXplID0gLWN1cnJTaXplO1xuICAgICAgICAgIGN1cnJWYWwgPSAyNTU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgY3VyclNpemU7ICsraWkpIHtcbiAgICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAwXSA9IGN1cnJWYWw7XG4gICAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMV0gPSBjdXJyVmFsO1xuICAgICAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDJdID0gY3VyclZhbDtcbiAgICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAzXSA9IGN1cnJWYWw7XG4gICAgICAgICAgKytpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3RleHR1cmUuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuX3RleHR1cmUuYmluZCgoYm91bmRUZXh0dXJlKSA9PiB7XG4gICAgICBib3VuZFRleHR1cmUubG9hZEZyb21NZW1vcnkod2lkdGgsIGhlaWdodCwgaW1hZ2VQaXhlbHMpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VGV4dEFsaWduKFxuICAgIGluSG9yaXpvbnRhbFRleHRBbGlnbjogSG9yaXpvbnRhbFRleHRBbGlnbixcbiAgICBpblZlcnRpY2FsVGV4dEFsaWduOiBWZXJ0aWNhbFRleHRBbGlnblxuICApOiB0aGlzIHtcbiAgICB0aGlzLl9ob3Jpem9udGFsVGV4dEFsaWduID0gaW5Ib3Jpem9udGFsVGV4dEFsaWduO1xuICAgIHRoaXMuX3ZlcnRpY2FsVGV4dEFsaWduID0gaW5WZXJ0aWNhbFRleHRBbGlnbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRleHRTY2FsZShpblNjYWxlOiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl90ZXh0U2NhbGUgPSBpblNjYWxlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGV4dENvbG9yKGluUmVkOiBudW1iZXIsIGluR3JlZW46IG51bWJlciwgaW5CbHVlOiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl90ZXh0Q29sb3JbMF0gPSBpblJlZDtcbiAgICB0aGlzLl90ZXh0Q29sb3JbMV0gPSBpbkdyZWVuO1xuICAgIHRoaXMuX3RleHRDb2xvclsyXSA9IGluQmx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1c2hUZXh0KGluTWVzc2FnZTogc3RyaW5nLCBpblBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMyKTogdGhpcyB7XG4gICAgLy9cbiAgICAvLyB2YWxpZGF0ZVxuICAgIC8vXG5cbiAgICBpZiAoaW5NZXNzYWdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl90ZXh0U2NhbGUgPD0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsTGluZVdpZHRoOiBudW1iZXJbXSA9IFswXTtcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgaW5NZXNzYWdlLmxlbmd0aDsgKytpaSkge1xuICAgICAgaWYgKGluTWVzc2FnZVtpaV0gPT0gJ1xcbicpIHtcbiAgICAgICAgYWxsTGluZVdpZHRoLnB1c2goMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxMaW5lV2lkdGhbYWxsTGluZVdpZHRoLmxlbmd0aCAtIDFdICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFsbExpbmVXaWR0aC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBmb3IgKGNvbnN0IGN1cnJMaW5lIG9mIGFsbExpbmVXaWR0aCkge1xuICAgIC8vICAgaWYgKGN1cnJMaW5lID09PSAwKSB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIGxldCBsaW5lSW5kZXggPSAwO1xuXG4gICAgY29uc3QgY3VyclBvczogZ2xtLnZlYzIgPSBbMCwgMF07XG5cbiAgICAvL1xuICAgIC8vIHByZSBwcm9jZXNzXG4gICAgLy9cblxuICAgIGNvbnN0IGhTY2FsZSA9IHRoaXMuX3RleHRTY2FsZSAqIDAuNTtcblxuICAgIHN3aXRjaCAodGhpcy5faG9yaXpvbnRhbFRleHRBbGlnbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGN1cnJQb3NbMF0gPSBpblBvc2l0aW9uWzBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcmVkJzpcbiAgICAgICAgY3VyclBvc1swXSA9IGluUG9zaXRpb25bMF0gLSBhbGxMaW5lV2lkdGhbbGluZUluZGV4XSAqIGhTY2FsZSArIGhTY2FsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGN1cnJQb3NbMF0gPVxuICAgICAgICAgIGluUG9zaXRpb25bMF0gLVxuICAgICAgICAgIGFsbExpbmVXaWR0aFtsaW5lSW5kZXhdICogdGhpcy5fdGV4dFNjYWxlICtcbiAgICAgICAgICB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5fdmVydGljYWxUZXh0QWxpZ24pIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIGN1cnJQb3NbMV0gPSBpblBvc2l0aW9uWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcmVkJzpcbiAgICAgICAgY3VyclBvc1sxXSA9IGluUG9zaXRpb25bMV0gKyBhbGxMaW5lV2lkdGgubGVuZ3RoICogaFNjYWxlIC0gaFNjYWxlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGN1cnJQb3NbMV0gPVxuICAgICAgICAgIGluUG9zaXRpb25bMV0gLSAoYWxsTGluZVdpZHRoLmxlbmd0aCAtIDEpICogdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHByb2Nlc3NcbiAgICAvL1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGluTWVzc2FnZS5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGNvbnN0IGxldHRlciA9IGluTWVzc2FnZVtpaV07XG5cbiAgICAgIGlmIChsZXR0ZXIgPT0gJ1xcbicpIHtcbiAgICAgICAgbGluZUluZGV4ICs9IDE7XG5cbiAgICAgICAgLy8gZ28gYmFja1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2hvcml6b250YWxUZXh0QWxpZ24pIHtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGN1cnJQb3NbMF0gPSBpblBvc2l0aW9uWzBdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2VudGVyZWQnOlxuICAgICAgICAgICAgY3VyclBvc1swXSA9XG4gICAgICAgICAgICAgIGluUG9zaXRpb25bMF0gLSBhbGxMaW5lV2lkdGhbbGluZUluZGV4XSAqIGhTY2FsZSArIGhTY2FsZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIGN1cnJQb3NbMF0gPVxuICAgICAgICAgICAgICBpblBvc2l0aW9uWzBdIC1cbiAgICAgICAgICAgICAgYWxsTGluZVdpZHRoW2xpbmVJbmRleF0gKiB0aGlzLl90ZXh0U2NhbGUgK1xuICAgICAgICAgICAgICB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJQb3NbMV0gLT0gdGhpcy5fdGV4dFNjYWxlOyAvLyBnbyBkb3duXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wdXNoTGV0dGVyKGxldHRlciwgY3VyclBvcyk7XG4gICAgICAgIC8vIGdvIHJpZ2h0XG4gICAgICAgIGN1cnJQb3NbMF0gKz0gdGhpcy5fdGV4dFNjYWxlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgX3B1c2hMZXR0ZXIoaW5DaGFyYWN0ZXI6IHN0cmluZywgaW5Qb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMikge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDkgKiAxMCA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGV4Q29vcmQgPSB0aGlzLl90ZXhDb29yZE1hcC5nZXQoaW5DaGFyYWN0ZXIpO1xuXG4gICAgaWYgKCF0ZXhDb29yZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbCB0byBmaW5kIGEgbGV0dGVyLCBsZXR0ZXI9JHtpbkNoYXJhY3Rlcn1gKTtcblxuICAgIGZvciAobGV0IHl5ID0gLTE7IHl5IDw9IDE7ICsreXkpIHtcbiAgICAgIGZvciAobGV0IHh4ID0gLTE7IHh4IDw9IDE7ICsreHgpIHtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblswXSArIDIgKiB4eDtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblsxXSArIDIgKiB5eTtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gLTAuMTtcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGV4Q29vcmRbMF07XG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRleENvb3JkWzFdO1xuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSAwOyAvLyBibGFja0NvbG9yXG4gICAgICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IDA7IC8vIGJsYWNrQ29sb3JcbiAgICAgICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gMDsgLy8gYmxhY2tDb2xvclxuICAgICAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0U2NhbGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5Qb3NpdGlvblswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblBvc2l0aW9uWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IDAuMDtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0ZXhDb29yZFswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0ZXhDb29yZFsxXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0Q29sb3JbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dENvbG9yWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRoaXMuX3RleHRDb2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0U2NhbGU7XG4gIH1cblxuICBmbHVzaChjb21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCk6IHRoaXMge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fc2hhZGVyLmJpbmQoKGJvdW5kU2hhZGVyKSA9PiB7XG4gICAgICBib3VuZFNoYWRlci5zZXRNYXRyaXg0VW5pZm9ybSgndV9jb21wb3NlZE1hdHJpeCcsIGNvbXBvc2VkTWF0cml4KTtcbiAgICAgIGJvdW5kU2hhZGVyLnNldFRleHR1cmVVbmlmb3JtKCd1X3RleHR1cmUnLCB0aGlzLl90ZXh0dXJlLCAwKTtcblxuICAgICAgdGhpcy5fZ2VvbWV0cnkuYWxsb2NhdGVCdWZmZXIoMSwgdGhpcy5fYnVmZmVyLCB0aGlzLl9jdXJyZW50U2l6ZSk7XG4gICAgICB0aGlzLl9nZW9tZXRyeS5zZXRJbnN0YW5jZWRDb3VudCh0aGlzLl9jdXJyZW50U2l6ZSAvIDkpO1xuICAgICAgdGhpcy5fZ2VvbWV0cnkucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICB3ZWJnbDIuVGV4dHVyZS51bmJpbmQoKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xlYXIoKTogdGhpcyB7XG4gICAgLy8gcmVzZXQgdmVydGljZXNcbiAgICB0aGlzLl9jdXJyZW50U2l6ZSA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsCiAgImltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi4vLi4vLi4vc3lzdGVtL2Jyb3dzZXInO1xuaW1wb3J0ICogYXMgcmVuZGVyZXJzIGZyb20gJy4uLy4uLy4uL2dyYXBoaWNzL3JlbmRlcmVycyc7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5pbnRlcmZhY2UgSW5kaWNhdG9yIHtcbiAgY2VudGVyOiBnbG0uUmVhZG9ubHlWZWMyO1xuICBzaXplOiBnbG0uUmVhZG9ubHlWZWMyO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBsaW5lcz86IHtcbiAgICBhOiBnbG0uUmVhZG9ubHlWZWMyO1xuICAgIGI6IGdsbS5SZWFkb25seVZlYzI7XG4gICAgdGhpY2tuZXNzOiBudW1iZXI7XG4gICAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG4gIH1bXTtcbiAgY29sb3I6IGdsbS5SZWFkb25seVZlYzM7XG59XG5cbmNvbnN0IGRlZmF1bHRDb2xvcjogZ2xtLlJlYWRvbmx5VmVjMyA9IFswLjIsIDAuMiwgMC4yXTtcbmNvbnN0IGFjdGl2YXRlZENvbG9yOiBnbG0uUmVhZG9ubHlWZWMzID0gWzAuMiwgMC42LCAwLjJdO1xuXG5jb25zdCBfcmVuZGVySW5kaWNhdG9yID0gKFxuICBjdXJySW5kaWNhdG9yOiBJbmRpY2F0b3IsXG4gIHN0YWNrUmVuZGVyZXJzOiByZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IHJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcbiAgY29uc3QgeyBjZW50ZXIgfSA9IGN1cnJJbmRpY2F0b3I7XG5cbiAgc3RhY2tSZW5kZXJlcnMucHVzaENlbnRlcmVkUmVjdGFuZ2xlKFxuICAgIGdsbS52ZWMzLmZyb21WYWx1ZXMoY2VudGVyWzBdLCBjZW50ZXJbMV0sIC0wLjMpLFxuICAgIGN1cnJJbmRpY2F0b3Iuc2l6ZSxcbiAgICBbMCwgMCwgMF1cbiAgKTtcblxuICBzdGFja1JlbmRlcmVycy5wdXNoQ2VudGVyZWRSZWN0YW5nbGUoXG4gICAgZ2xtLnZlYzMuZnJvbVZhbHVlcyhjZW50ZXJbMF0sIGNlbnRlclsxXSwgLTAuMiksXG4gICAgW2N1cnJJbmRpY2F0b3Iuc2l6ZVswXSAtIDIsIGN1cnJJbmRpY2F0b3Iuc2l6ZVsxXSAtIDJdLFxuICAgIGN1cnJJbmRpY2F0b3IuY29sb3JcbiAgKTtcblxuICBpZiAoY3VyckluZGljYXRvci50ZXh0KSB7XG4gICAgdGV4dFJlbmRlcmVyXG4gICAgICAuc2V0VGV4dFNjYWxlKDE2KVxuICAgICAgLnNldFRleHRBbGlnbignY2VudGVyZWQnLCAnY2VudGVyZWQnKVxuICAgICAgLnB1c2hUZXh0KGN1cnJJbmRpY2F0b3IudGV4dCwgY2VudGVyKVxuICAgICAgLnNldFRleHRBbGlnbignbGVmdCcsICd0b3AnKTtcbiAgfVxuXG4gIGlmIChjdXJySW5kaWNhdG9yLmxpbmVzKSB7XG4gICAgY3VyckluZGljYXRvci5saW5lcy5mb3JFYWNoKChjdXJyTGluZSkgPT4ge1xuICAgICAgc3RhY2tSZW5kZXJlcnMucHVzaFRoaWNrTGluZShcbiAgICAgICAgW2NlbnRlclswXSArIGN1cnJMaW5lLmFbMF0sIGNlbnRlclsxXSArIGN1cnJMaW5lLmFbMV0sIDBdLFxuICAgICAgICBbY2VudGVyWzBdICsgY3VyckxpbmUuYlswXSwgY2VudGVyWzFdICsgY3VyckxpbmUuYlsxXSwgMF0sXG4gICAgICAgIGN1cnJMaW5lLnRoaWNrbmVzcyxcbiAgICAgICAgY3VyckxpbmUuY29sb3JcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRLZXlTdHJva2VzV2lkZ2V0cyA9IChcbiAgaW5Qb3M6IGdsbS5SZWFkb25seVZlYzIsXG4gIHN0YWNrUmVuZGVyZXJzOiByZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzLFxuICB0ZXh0UmVuZGVyZXI6IHJlbmRlcmVycy5JVGV4dFJlbmRlcmVyXG4pID0+IHtcbiAgX3JlbmRlckluZGljYXRvcihcbiAgICB7XG4gICAgICBjZW50ZXI6IFtpblBvc1swXSwgaW5Qb3NbMV1dLFxuICAgICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgICB0ZXh0OiAnQVxcblEnLFxuICAgICAgY29sb3I6IGJyb3dzZXIuR2xvYmFsS2V5Ym9hcmRNYW5hZ2VyLmlzUHJlc3NlZCgnQScsICdRJylcbiAgICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgICA6IGRlZmF1bHRDb2xvclxuICAgIH0sXG4gICAgc3RhY2tSZW5kZXJlcnMsXG4gICAgdGV4dFJlbmRlcmVyXG4gICk7XG5cbiAgX3JlbmRlckluZGljYXRvcihcbiAgICB7XG4gICAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMSwgaW5Qb3NbMV1dLFxuICAgICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgICB0ZXh0OiAnUycsXG4gICAgICBjb2xvcjogYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdTJylcbiAgICAgICAgPyBhY3RpdmF0ZWRDb2xvclxuICAgICAgICA6IGRlZmF1bHRDb2xvclxuICAgIH0sXG4gICAgc3RhY2tSZW5kZXJlcnMsXG4gICAgdGV4dFJlbmRlcmVyXG4gICk7XG5cbiAgX3JlbmRlckluZGljYXRvcihcbiAgICB7XG4gICAgICBjZW50ZXI6IFtpblBvc1swXSArIDQ1ICogMSwgaW5Qb3NbMV0gKyA0NV0sXG4gICAgICBzaXplOiBbNDAsIDQwXSxcbiAgICAgIHRleHQ6ICdXXFxuWicsXG4gICAgICBjb2xvcjogYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdXJywgJ1onKVxuICAgICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICAgIDogZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBzdGFja1JlbmRlcmVycyxcbiAgICB0ZXh0UmVuZGVyZXJcbiAgKTtcblxuICBfcmVuZGVySW5kaWNhdG9yKFxuICAgIHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUgKiAyLCBpblBvc1sxXV0sXG4gICAgICBzaXplOiBbNDAsIDQwXSxcbiAgICAgIHRleHQ6ICdEJyxcbiAgICAgIGNvbG9yOiBicm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0QnKVxuICAgICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICAgIDogZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBzdGFja1JlbmRlcmVycyxcbiAgICB0ZXh0UmVuZGVyZXJcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRBcnJvd1N0cm9rZXNXaWRnZXRzID0gKFxuICBpblBvczogZ2xtLlJlYWRvbmx5VmVjMixcbiAgc3RhY2tSZW5kZXJlcnM6IHJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIHRleHRSZW5kZXJlcjogcmVuZGVyZXJzLklUZXh0UmVuZGVyZXJcbikgPT4ge1xuICAvLyBhcnJvdyBsZWZ0XG4gIF9yZW5kZXJJbmRpY2F0b3IoXG4gICAge1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0sIGluUG9zWzFdXSxcbiAgICAgIHNpemU6IFs0MCwgNDBdLFxuICAgICAgbGluZXM6IFtcbiAgICAgICAgeyBhOiBbMTUsIDBdLCBiOiBbLTgsIDBdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfSxcbiAgICAgICAgeyBhOiBbMCwgMTBdLCBiOiBbLTEyLCAtMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgICB7IGE6IFswLCAtMTBdLCBiOiBbLTEyLCAyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH1cbiAgICAgIF0sXG4gICAgICBjb2xvcjogYnJvd3Nlci5HbG9iYWxLZXlib2FyZE1hbmFnZXIuaXNQcmVzc2VkKCdBcnJvd0xlZnQnKVxuICAgICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICAgIDogZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBzdGFja1JlbmRlcmVycyxcbiAgICB0ZXh0UmVuZGVyZXJcbiAgKTtcblxuICAvLyBhcnJvdyBkb3duXG4gIF9yZW5kZXJJbmRpY2F0b3IoXG4gICAge1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSwgaW5Qb3NbMV1dLFxuICAgICAgc2l6ZTogWzQwLCA0MF0sXG4gICAgICBsaW5lczogW1xuICAgICAgICB7IGE6IFswLCAxNV0sIGI6IFswLCAtOF0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgICB7IGE6IFsxMCwgMF0sIGI6IFstMiwgLTEyXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICAgIHsgYTogWy0xMCwgMF0sIGI6IFsyLCAtMTJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgICAgXSxcbiAgICAgIGNvbG9yOiBicm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93RG93bicpXG4gICAgICAgID8gYWN0aXZhdGVkQ29sb3JcbiAgICAgICAgOiBkZWZhdWx0Q29sb3JcbiAgICB9LFxuICAgIHN0YWNrUmVuZGVyZXJzLFxuICAgIHRleHRSZW5kZXJlclxuICApO1xuXG4gIC8vIGFycm93IHVwXG4gIF9yZW5kZXJJbmRpY2F0b3IoXG4gICAge1xuICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyA0NSwgaW5Qb3NbMV0gKyA0NV0sXG4gICAgICBzaXplOiBbNDAsIDQwXSxcbiAgICAgIGxpbmVzOiBbXG4gICAgICAgIHsgYTogWzAsIC0xNV0sIGI6IFswLCA4XSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICAgIHsgYTogWzEwLCAwXSwgYjogWy0yLCAxMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgICB7IGE6IFstMTAsIDBdLCBiOiBbMiwgMTJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgICAgXSxcbiAgICAgIGNvbG9yOiBicm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93VXAnKVxuICAgICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICAgIDogZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBzdGFja1JlbmRlcmVycyxcbiAgICB0ZXh0UmVuZGVyZXJcbiAgKTtcblxuICAvLyBhcnJvdyByaWdodFxuICBfcmVuZGVySW5kaWNhdG9yKFxuICAgIHtcbiAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgNDUgKiAyLCBpblBvc1sxXV0sXG4gICAgICBzaXplOiBbNDAsIDQwXSxcbiAgICAgIGxpbmVzOiBbXG4gICAgICAgIHsgYTogWy0xNSwgMF0sIGI6IFs4LCAwXSwgdGhpY2tuZXNzOiA2LCBjb2xvcjogWzEsIDEsIDFdIH0sXG4gICAgICAgIHsgYTogWzAsIDEwXSwgYjogWzEyLCAtMl0sIHRoaWNrbmVzczogNiwgY29sb3I6IFsxLCAxLCAxXSB9LFxuICAgICAgICB7IGE6IFswLCAtMTBdLCBiOiBbMTIsIDJdLCB0aGlja25lc3M6IDYsIGNvbG9yOiBbMSwgMSwgMV0gfVxuICAgICAgXSxcbiAgICAgIGNvbG9yOiBicm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5pc1ByZXNzZWQoJ0Fycm93UmlnaHQnKVxuICAgICAgICA/IGFjdGl2YXRlZENvbG9yXG4gICAgICAgIDogZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBzdGFja1JlbmRlcmVycyxcbiAgICB0ZXh0UmVuZGVyZXJcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRLZXlzVG91Y2hlc1dpZGdldHMgPSAoXG4gIGluQ2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMyLFxuICBzdGFja1JlbmRlcmVyczogcmVuZGVyZXJzLklTdGFja1JlbmRlcmVycyxcbiAgdGV4dFJlbmRlcmVyOiByZW5kZXJlcnMuSVRleHRSZW5kZXJlclxuKSA9PiB7XG4gIGlmIChicm93c2VyLkdsb2JhbFRvdWNoTWFuYWdlci5pc1N1cHBvcnRlZChpbkNhbnZhc0VsZW1lbnQpKSB7XG4gICAgX3JlbmRlckluZGljYXRvcihcbiAgICAgIHtcbiAgICAgICAgY2VudGVyOiBbaW5Qb3NbMF0gKyAxMTUsIGluUG9zWzFdXSxcbiAgICAgICAgc2l6ZTogWzIzMCwgNjBdLFxuICAgICAgICB0ZXh0OiAnVG91Y2ggRXZlbnRzXFxuU3VwcG9ydGVkXFxuKGRvdWJsZSB0YXApJyxcbiAgICAgICAgY29sb3I6IFswLCAwLjUsIDBdXG4gICAgICB9LFxuICAgICAgc3RhY2tSZW5kZXJlcnMsXG4gICAgICB0ZXh0UmVuZGVyZXJcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIF9yZW5kZXJJbmRpY2F0b3IoXG4gICAgICB7XG4gICAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTE1LCBpblBvc1sxXV0sXG4gICAgICAgIHNpemU6IFsyMzAsIDYwXSxcbiAgICAgICAgdGV4dDogJ1RvdWNoIEV2ZW50c1xcbk5vdCBTdXBwb3J0ZWQnLFxuICAgICAgICBjb2xvcjogWzAuNSwgMCwgMF1cbiAgICAgIH0sXG4gICAgICBzdGFja1JlbmRlcmVycyxcbiAgICAgIHRleHRSZW5kZXJlclxuICAgICk7XG4gIH1cblxuICBpZiAoYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuY2FuQmVQb2ludGVyTG9ja2VkKGluQ2FudmFzRWxlbWVudCkpIHtcbiAgICBfcmVuZGVySW5kaWNhdG9yKFxuICAgICAge1xuICAgICAgICBjZW50ZXI6IFtpblBvc1swXSArIDEwNSwgaW5Qb3NbMV0gKyA3MF0sXG4gICAgICAgIHNpemU6IFsyMTAsIDYwXSxcbiAgICAgICAgdGV4dDogJ01vdXNlXFxuU3VwcG9ydGVkJyxcbiAgICAgICAgY29sb3I6IFswLCAwLjUsIDBdXG4gICAgICB9LFxuICAgICAgc3RhY2tSZW5kZXJlcnMsXG4gICAgICB0ZXh0UmVuZGVyZXJcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIF9yZW5kZXJJbmRpY2F0b3IoXG4gICAgICB7XG4gICAgICAgIGNlbnRlcjogW2luUG9zWzBdICsgMTA1LCBpblBvc1sxXSArIDcwXSxcbiAgICAgICAgc2l6ZTogWzIxMCwgNjBdLFxuICAgICAgICB0ZXh0OiAnTW91c2UgRXZlbnRzXFxuTm90IFN1cHBvcnRlZCcsXG4gICAgICAgIGNvbG9yOiBbMC41LCAwLCAwXVxuICAgICAgfSxcbiAgICAgIHN0YWNrUmVuZGVyZXJzLFxuICAgICAgdGV4dFJlbmRlcmVyXG4gICAgKTtcbiAgfVxufTtcblxuLy8gZXhwb3J0IGNvbnN0IHJlbmRlckNvbnRyb2xzID0gKFxuLy8gICBpbkNhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50LFxuLy8gICBzdGFja1JlbmRlcmVyczogcmVuZGVyZXJzLklTdGFja1JlbmRlcmVycyxcbi8vICAgdGV4dFJlbmRlcmVyOiByZW5kZXJlcnMuSVRleHRSZW5kZXJlclxuLy8gKSA9PiB7XG4vLyAgIC8vIGNvbnN0IGFsbEluZGljYXRvcjogSW5kaWNhdG9yW10gPSBbXTtcblxuLy8gICBjb25zdCBrZXlFdmVudHNQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNyArIDIwLCAxNjVdO1xuLy8gICBjb25zdCB0b3VjaEV2ZW50c1BvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3ICsgMjAsIDI2MF07XG4vLyAgIGNvbnN0IGJvYXJkUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcsIDM1XTtcblxuLy8gICBhZGRLZXlTdHJva2VzV2lkZ2V0cyhrZXlFdmVudHNQb3MsIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuLy8gICBhZGRBcnJvd1N0cm9rZXNXaWRnZXRzKHRvdWNoRXZlbnRzUG9zLCBzdGFja1JlbmRlcmVycywgdGV4dFJlbmRlcmVyKTtcbi8vICAgYWRkS2V5c1RvdWNoZXNXaWRnZXRzKGluQ2FudmFzRWxlbWVudCwgYm9hcmRQb3MsIHN0YWNrUmVuZGVyZXJzLCB0ZXh0UmVuZGVyZXIpO1xuLy8gfTtcbiIsCiAgImltcG9ydCB7IHN5c3RlbSwgZ3JhcGhpY3MgfSBmcm9tICcuLi8uLi8uLic7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyRnBzTWV0ZXIgPSAoXG4gIGluUG9zOiBnbG0uUmVhZG9ubHlWZWMzLFxuICBpblNpemU6IGdsbS5SZWFkb25seVZlYzIsXG4gIGluRnJhbWVQcm9maWxlcjogc3lzdGVtLm1ldHJpY3MuSUZyYW1lUHJvZmlsZXIsXG4gIGluU3RhY2tSZW5kZXJlcnM6IGdyYXBoaWNzLnJlbmRlcmVycy5JU3RhY2tSZW5kZXJlcnMsXG4gIGluVGV4dFJlbmRlcmVyOiBncmFwaGljcy5yZW5kZXJlcnMuSVRleHRSZW5kZXJlcixcbiAgaW5TaG93RnBzID0gZmFsc2VcbikgPT4ge1xuICAvLyBmcHMgbWV0ZXJcblxuICBjb25zdCBrX2RpdmlkZXIgPSA1O1xuICBjb25zdCBrX3ZlcnRpY2FsU2l6ZSA9XG4gICAgTWF0aC5jZWlsKGluRnJhbWVQcm9maWxlci5tYXhEZWx0YSAvIGtfZGl2aWRlcikgKiBrX2RpdmlkZXI7XG5cbiAge1xuICAgIC8vIGJvcmRlclxuXG4gICAgaW5TdGFja1JlbmRlcmVycy5wdXNoT3JpZ2luQm91bmRSZWN0YW5nbGUoaW5Qb3MsIGluU2l6ZSwgWzAsIDAsIDAsIDAuNV0pO1xuXG4gICAgY29uc3QgYWxsVmVydGljZXM6IFtcbiAgICAgIGdsbS5SZWFkb25seVZlYzMsXG4gICAgICBnbG0uUmVhZG9ubHlWZWMzLFxuICAgICAgZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICAgIGdsbS5SZWFkb25seVZlYzNcbiAgICBdID0gW1xuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAwLCAwXSxcbiAgICAgIFtpblBvc1swXSArIGluU2l6ZVswXSAqIDEsIGluUG9zWzFdICsgaW5TaXplWzFdICogMCwgMF0sXG4gICAgICBbaW5Qb3NbMF0gKyBpblNpemVbMF0gKiAxLCBpblBvc1sxXSArIGluU2l6ZVsxXSAqIDEsIDBdLFxuICAgICAgW2luUG9zWzBdICsgaW5TaXplWzBdICogMCwgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiAxLCAwXVxuICAgIF07XG5cbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzBdLCBhbGxWZXJ0aWNlc1sxXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzFdLCBhbGxWZXJ0aWNlc1syXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzJdLCBhbGxWZXJ0aWNlc1szXSwgWzEsIDEsIDFdKTtcbiAgICBpblN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKGFsbFZlcnRpY2VzWzNdLCBhbGxWZXJ0aWNlc1swXSwgWzEsIDEsIDFdKTtcbiAgfSAvLyBib3JkZXJcblxuICB7XG4gICAgLy8gZGl2aWRlcnNcblxuICAgIGZvciAoXG4gICAgICBsZXQgY3VyckRpdmlkZXIgPSBrX2RpdmlkZXI7XG4gICAgICBjdXJyRGl2aWRlciA8IGtfdmVydGljYWxTaXplO1xuICAgICAgY3VyckRpdmlkZXIgKz0ga19kaXZpZGVyXG4gICAgKSB7XG4gICAgICBjb25zdCByYXRpbyA9IGN1cnJEaXZpZGVyIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgIGNvbnN0IHBvaW50QTogZ2xtLlJlYWRvbmx5VmVjMyA9IFtcbiAgICAgICAgaW5Qb3NbMF0gKyAwLFxuICAgICAgICBpblBvc1sxXSArIGluU2l6ZVsxXSAqIHJhdGlvLFxuICAgICAgICAwXG4gICAgICBdO1xuICAgICAgY29uc3QgcG9pbnRCOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICBpblBvc1swXSArIGluU2l6ZVswXSxcbiAgICAgICAgaW5Qb3NbMV0gKyBpblNpemVbMV0gKiByYXRpbyxcbiAgICAgICAgMFxuICAgICAgXTtcblxuICAgICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShwb2ludEEsIHBvaW50QiwgWzAuNSwgMC41LCAwLjVdKTtcbiAgICB9XG4gIH0gLy8gZGl2aWRlcnNcblxuICB7XG4gICAgLy8gY3VydmVcblxuICAgIGlmIChpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoID49IDIpIHtcbiAgICAgIGNvbnN0IHdpZHRoU3RlcCA9IGluU2l6ZVswXSAvIGluRnJhbWVQcm9maWxlci5mcmFtZXNEZWx0YS5sZW5ndGg7XG5cbiAgICAgIGxldCBwcmV2RGVsdGEgPSBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGFbMF07XG4gICAgICBsZXQgcHJldkNvb3JkWCA9IDA7XG4gICAgICBsZXQgcHJldkNvb3JkWSA9IChpblNpemVbMV0gKiBwcmV2RGVsdGEpIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgIGZvciAobGV0IGlpID0gMTsgaWkgPCBpbkZyYW1lUHJvZmlsZXIuZnJhbWVzRGVsdGEubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJEZWx0YSA9IGluRnJhbWVQcm9maWxlci5mcmFtZXNEZWx0YVtpaV07XG4gICAgICAgIGNvbnN0IGN1cnJDb29yZFggPSBpaSAqIHdpZHRoU3RlcDtcbiAgICAgICAgY29uc3QgY3VyckNvb3JkWSA9IChpblNpemVbMV0gKiBjdXJyRGVsdGEpIC8ga192ZXJ0aWNhbFNpemU7XG5cbiAgICAgICAgY29uc3QgcG9pbnRBOiBnbG0uUmVhZG9ubHlWZWMzID0gW1xuICAgICAgICAgIGluUG9zWzBdICsgcHJldkNvb3JkWCxcbiAgICAgICAgICBpblBvc1sxXSArIHByZXZDb29yZFksXG4gICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBwb2ludEI6IGdsbS5SZWFkb25seVZlYzMgPSBbXG4gICAgICAgICAgaW5Qb3NbMF0gKyBjdXJyQ29vcmRYLFxuICAgICAgICAgIGluUG9zWzFdICsgY3VyckNvb3JkWSxcbiAgICAgICAgICAwXG4gICAgICAgIF07XG5cbiAgICAgICAgaW5TdGFja1JlbmRlcmVycy5wdXNoTGluZShwb2ludEEsIHBvaW50QiwgWzEsIDEsIDFdKTtcblxuICAgICAgICBwcmV2RGVsdGEgPSBjdXJyRGVsdGE7XG4gICAgICAgIHByZXZDb29yZFggPSBjdXJyQ29vcmRYO1xuICAgICAgICBwcmV2Q29vcmRZID0gY3VyckNvb3JkWTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gY3VydmVcblxuICB7XG4gICAgLy8gY291bnRlclxuXG4gICAgY29uc3Qga190ZXh0U2NhbGUgPSAxNDtcbiAgICBjb25zdCBrX3RleHRIU2NhbGUgPSBrX3RleHRTY2FsZSAqIDAuNTtcblxuICAgIGNvbnN0IGF2ZXJhZ2VWYWx1ZSA9IGluRnJhbWVQcm9maWxlci5hdmVyYWdlRGVsdGE7XG4gICAgY29uc3QgbWF4VmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIubWF4RGVsdGE7XG4gICAgY29uc3QgbWluVmFsdWUgPSBpbkZyYW1lUHJvZmlsZXIubWluRGVsdGE7XG5cbiAgICBsZXQgYXZlcmFnZVN0ciA9IGB+JHthdmVyYWdlVmFsdWUudG9GaXhlZCgwKX1tc2A7XG4gICAgbGV0IG1heFN0ciA9IGA8JHttYXhWYWx1ZX1tc2A7XG4gICAgbGV0IG1pblN0ciA9IGA+JHttaW5WYWx1ZX1tc2A7XG5cbiAgICBpZiAoaW5TaG93RnBzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBfZ2V0RnBzU3RyID0gKGluVmFsOiBudW1iZXIpID0+XG4gICAgICAgIGluVmFsIDwgOTk5ID8gaW5WYWwudG9GaXhlZCgwKSA6ICc/Pz8nO1xuXG4gICAgICBhdmVyYWdlU3RyICs9IGBcXG5+JHtfZ2V0RnBzU3RyKDEwMDAgLyBhdmVyYWdlVmFsdWUpfWZwc2A7XG4gICAgICBtYXhTdHIgKz0gYFxcbjwke19nZXRGcHNTdHIoMTAwMCAvIG1heFZhbHVlKX1mcHNgO1xuICAgICAgbWluU3RyICs9IGBcXG4+JHtfZ2V0RnBzU3RyKDEwMDAgLyBtaW5WYWx1ZSl9ZnBzYDtcbiAgICB9XG5cbiAgICBpblRleHRSZW5kZXJlclxuICAgICAgLnNldFRleHRTY2FsZShrX3RleHRTY2FsZSlcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAndG9wJylcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAxLjAsIDAuNzUpXG4gICAgICAucHVzaFRleHQoYXZlcmFnZVN0ciwgW2luUG9zWzBdICsgNywgaW5Qb3NbMV0gLSA4XSlcbiAgICAgIC5zZXRUZXh0QWxpZ24oJ2xlZnQnLCAnY2VudGVyZWQnKVxuICAgICAgLnNldFRleHRDb2xvcigxLjAsIDAuNzUsIDAuNzUpXG4gICAgICAucHVzaFRleHQobWF4U3RyLCBbXG4gICAgICAgIGluUG9zWzBdICsgaW5TaXplWzBdICsga190ZXh0SFNjYWxlLFxuICAgICAgICBpblBvc1sxXSArIGluU2l6ZVsxXSAtIGtfdGV4dEhTY2FsZSAqIDFcbiAgICAgIF0pXG4gICAgICAuc2V0VGV4dENvbG9yKDAuNzUsIDEuMCwgMC43NSlcbiAgICAgIC5wdXNoVGV4dChtaW5TdHIsIFtcbiAgICAgICAgaW5Qb3NbMF0gKyBpblNpemVbMF0gKyBrX3RleHRIU2NhbGUsXG4gICAgICAgIGluUG9zWzFdICsga190ZXh0SFNjYWxlICogMVxuICAgICAgXSlcbiAgICAgIC5zZXRUZXh0Q29sb3IoMS4wLCAxLjAsIDEuMCk7XG4gIH0gLy8gY291bnRlclxufTtcbiIsCiAgImV4cG9ydCBjb25zdCBnZXRJbWFnZUZyb21VcmwgPSAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgfTtcbiAgICBpbWFnZS5zcmMgPSB1cmw7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoSW1hZ2VCdWZmZXIgPSBhc3luYyAoXG4gIHVybDogc3RyaW5nLFxuICBvblByb2dyZXNzPzogKHJlY2VpdmVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpID0+IHZvaWRcbik6IFByb21pc2U8eyBidWZmZXI6IFVpbnQ4QXJyYXksIHR5cGU6IHN0cmluZyB9PiA9PiB7XG5cbiAgLy8gU3RlcCAxOiBzdGFydCB0aGUgZmV0Y2ggYW5kIG9idGFpbiBhIHJlYWRlclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkhLmdldFJlYWRlcigpO1xuXG4gIC8vIFN0ZXAgMjogZ2V0IHRvdGFsIGxlbmd0aFxuICBjb25zdCBjb250ZW50TGVuZ3RoID0gK3Jlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LUxlbmd0aCcpITtcbiAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykhO1xuXG4gIGxldCBsYXN0UGVyY2VudCA9IDA7XG5cbiAgLy8gU3RlcCAzOiByZWFkIHRoZSBkYXRhXG4gIGxldCByZWNlaXZlZExlbmd0aCA9IDA7IC8vIHJlY2VpdmVkIHRoYXQgbWFueSBieXRlcyBhdCB0aGUgbW9tZW50XG4gIGxldCBjaHVua3MgPSBbXTsgLy8gYXJyYXkgb2YgcmVjZWl2ZWQgYmluYXJ5IGNodW5rcyAoY29tcHJpc2VzIHRoZSBib2R5KVxuICB3aGlsZSh0cnVlKSB7XG4gICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG5cbiAgICBpZiAoZG9uZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2h1bmtzLnB1c2godmFsdWUpO1xuICAgIHJlY2VpdmVkTGVuZ3RoICs9IHZhbHVlLmxlbmd0aDtcblxuICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAvLyBjb25zdCBjdXJyZW50UGVyY2VudCA9IE1hdGguZmxvb3IocmVjZWl2ZWRMZW5ndGggLyBjb250ZW50TGVuZ3RoICogMTAwKTtcbiAgICAgIC8vIGlmIChsYXN0UGVyY2VudCAhPT0gY3VycmVudFBlcmNlbnQpIHtcbiAgICAgIC8vICAgbGFzdFBlcmNlbnQgPSBjdXJyZW50UGVyY2VudDtcbiAgICAgICAgb25Qcm9ncmVzcyhyZWNlaXZlZExlbmd0aCwgY29udGVudExlbmd0aCk7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYFJlY2VpdmVkICR7cmVjZWl2ZWRMZW5ndGh9IG9mICR7Y29udGVudExlbmd0aH1gKTtcbiAgfVxuXG4gIC8vIFN0ZXAgNDogY29uY2F0ZW5hdGUgY2h1bmtzIGludG8gc2luZ2xlIFVpbnQ4QXJyYXlcbiAgY29uc3QgY2h1bmtzQWxsID0gbmV3IFVpbnQ4QXJyYXkocmVjZWl2ZWRMZW5ndGgpOyAvLyAoNC4xKVxuICBsZXQgcG9zaXRpb24gPSAwO1xuICBmb3IobGV0IGNodW5rIG9mIGNodW5rcykge1xuICAgIGNodW5rc0FsbC5zZXQoY2h1bmssIHBvc2l0aW9uKTsgLy8gKDQuMilcbiAgICBwb3NpdGlvbiArPSBjaHVuay5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJ1ZmZlcjogY2h1bmtzQWxsLFxuICAgIHR5cGU6IGNvbnRlbnRUeXBlXG4gIH07XG5cbiAgLy8gLy8gU3RlcCA1OiBkZWNvZGUgaW50byBhIHN0cmluZ1xuICAvLyBsZXQgcmVzdWx0ID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIikuZGVjb2RlKGNodW5rc0FsbCk7XG5cbiAgLy8gLy8gV2UncmUgZG9uZSFcbiAgLy8gbGV0IGNvbW1pdHMgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gIC8vIGFsZXJ0KGNvbW1pdHNbMF0uYXV0aG9yLmxvZ2luKTtcblxufTtcblxuZXhwb3J0IGNvbnN0IGdldEltYWdlRnJvbUJ1ZmZlciA9IGFzeW5jIChidWZmZXI6IFVpbnQ4QXJyYXksIHR5cGU6IHN0cmluZyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4gPT4ge1xuICAvLyBmZXRjaEltYWdlQnVmZmVyKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHsgcmVzb2x2ZShpbWFnZSk7IH07XG4gICAgaW1hZ2Uuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICAgIG5ldyBCbG9iKFtidWZmZXJdLCB7IHR5cGUgfSAvKiAoMSkgKi8pXG4gICAgKTtcblxuICB9KTtcblxuICAvLyBjb25zdCB0bXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAvLyB0bXBJbWFnZS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKFxuICAvLyAgIG5ldyBCbG9iKFtidWZmZXJdLCB7IHR5cGUgfSAvKiAoMSkgKi8pXG4gIC8vICk7XG5cbiAgLy8gcmV0dXJuIHRtcEltYWdlO1xufTtcblxuLy8gLy8gU21hbGwgcmVkIGRvdCBpbWFnZVxuLy8gY29uc3QgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFsxMzcsIDgwLCA3OCwgNzEsIDEzLCAxMCwgMjYsIDEwLCAwLCAwLCAwLCAxMywgNzMsIDcyLCA2OCwgODIsIDAsIDAsIDAsIDUsIDAsIDAsIDAsIDUsIDgsIDYsIDAsIDAsIDAsIDE0MSwgMTExLCAzOCwgMjI5LCAwLCAwLCAwLCAyOCwgNzMsIDY4LCA2NSwgODQsIDgsIDIxNSwgOTksIDI0OCwgMjU1LCAyNTUsIDYzLCAxOTUsIDEyNywgNiwgMzIsIDUsIDE5NSwgMzIsIDE4LCAxMzIsIDIwOCwgNDksIDI0MSwgMTMwLCA4OCwgMjA1LCA0LCAwLCAxNCwgMjQ1LCA1MywgMjAzLCAyMDksIDE0MiwgMTQsIDMxLCAwLCAwLCAwLCAwLCA3MywgNjksIDc4LCA2OCwgMTc0LCA2NiwgOTYsIDEzMF0pO1xuXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktaW1nJykuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChcbi8vICAgbmV3IEJsb2IoW2NvbnRlbnQuYnVmZmVyXSwgeyB0eXBlOiAnaW1hZ2UvcG5nJyB9IC8qICgxKSAqLylcbi8vICk7XG4iLAogICJcbmltcG9ydCB7SVZlcnRleH0gZnJvbSAnLi9JVmVydGV4JztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSVZlcnRleCB7XG4vLyAgIHBvczogZ2xtLnZlYzM7XG4vLyAgIG5vcm1hbDogZ2xtLnZlYzM7XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBtYWtlQm94ID0gKGluU2l6ZTogZ2xtLlJlYWRvbmx5VmVjMyk6IElWZXJ0ZXhbXSA9PiB7XG5cbiAgY29uc3QgaFNpemVYID0gaW5TaXplWzBdICogMC41O1xuICBjb25zdCBoU2l6ZVkgPSBpblNpemVbMV0gKiAwLjU7XG4gIGNvbnN0IGhTaXplWiA9IGluU2l6ZVsyXSAqIDAuNTtcblxuICBjb25zdCBhbGxOb3JtYWxzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXTtcbiAgYWxsTm9ybWFscy5wdXNoKFstMSwgMCwgMF0pOyAvLyAwXG4gIGFsbE5vcm1hbHMucHVzaChbKzEsIDAsIDBdKTsgLy8gMVxuICBhbGxOb3JtYWxzLnB1c2goWzAsIC0xLCAwXSk7IC8vIDJcbiAgYWxsTm9ybWFscy5wdXNoKFswLCArMSwgMF0pOyAvLyAzXG4gIGFsbE5vcm1hbHMucHVzaChbMCwgMCwgLTFdKTsgLy8gNFxuICBhbGxOb3JtYWxzLnB1c2goWzAsIDAsICsxXSk7IC8vIDVcblxuICBjb25zdCBhbGxWZXJ0aWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW107XG4gIGFsbFZlcnRpY2VzLnB1c2goWy1oU2l6ZVgsIC1oU2l6ZVksIC1oU2l6ZVpdKTsgLy8gMFxuICBhbGxWZXJ0aWNlcy5wdXNoKFsraFNpemVYLCAtaFNpemVZLCAtaFNpemVaXSk7IC8vIDFcbiAgYWxsVmVydGljZXMucHVzaChbLWhTaXplWCwgK2hTaXplWSwgLWhTaXplWl0pOyAvLyAyXG4gIGFsbFZlcnRpY2VzLnB1c2goWytoU2l6ZVgsICtoU2l6ZVksIC1oU2l6ZVpdKTsgLy8gM1xuICBhbGxWZXJ0aWNlcy5wdXNoKFstaFNpemVYLCAtaFNpemVZLCAraFNpemVaXSk7IC8vIDRcbiAgYWxsVmVydGljZXMucHVzaChbK2hTaXplWCwgLWhTaXplWSwgK2hTaXplWl0pOyAvLyA1XG4gIGFsbFZlcnRpY2VzLnB1c2goWy1oU2l6ZVgsICtoU2l6ZVksICtoU2l6ZVpdKTsgLy8gNlxuICBhbGxWZXJ0aWNlcy5wdXNoKFsraFNpemVYLCAraFNpemVZLCAraFNpemVaXSk7IC8vIDdcblxuICAvL1xuXG4gIGNvbnN0IGFsbEluZGljZXM6IGdsbS5SZWFkb25seVZlYzRbXSA9IFtdO1xuXG4gIC8vIC16IDAxMjNcbiAgYWxsSW5kaWNlcy5wdXNoKFswLCAyLCAxLCAvKm5vcm1hbCA9PiAqLyA0XSk7XG4gIGFsbEluZGljZXMucHVzaChbMiwgMywgMSwgLypub3JtYWwgPT4gKi8gNF0pO1xuICAvLyAreiA0NTY3XG4gIGFsbEluZGljZXMucHVzaChbNCwgNSwgNiwgLypub3JtYWwgPT4gKi8gNV0pO1xuICBhbGxJbmRpY2VzLnB1c2goWzYsIDUsIDcsIC8qbm9ybWFsID0+ICovIDVdKTtcblxuICAvLyAreCAxMzU3XG4gIGFsbEluZGljZXMucHVzaChbMSwgMywgNSwgLypub3JtYWwgPT4gKi8gMV0pO1xuICBhbGxJbmRpY2VzLnB1c2goWzUsIDMsIDcsIC8qbm9ybWFsID0+ICovIDFdKTtcbiAgLy8gLXggMDI0NlxuICBhbGxJbmRpY2VzLnB1c2goWzAsIDQsIDIsIC8qbm9ybWFsID0+ICovIDBdKTtcbiAgYWxsSW5kaWNlcy5wdXNoKFs0LCA2LCAyLCAvKm5vcm1hbCA9PiAqLyAwXSk7XG5cbiAgLy8gK3kgMjM2N1xuICBhbGxJbmRpY2VzLnB1c2goWzIsIDYsIDMsIC8qbm9ybWFsID0+ICovIDNdKTtcbiAgYWxsSW5kaWNlcy5wdXNoKFs2LCA3LCAzLCAvKm5vcm1hbCA9PiAqLyAzXSk7XG4gIC8vIC15IDAxNDVcbiAgYWxsSW5kaWNlcy5wdXNoKFswLCAxLCA0LCAvKm5vcm1hbCA9PiAqLyAyXSk7XG4gIGFsbEluZGljZXMucHVzaChbNCwgMSwgNSwgLypub3JtYWwgPT4gKi8gMl0pO1xuXG4gIC8vIGNvbnN0IGZpbmFsVmVydGljZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IHZlcnRpY2VzOiBJVmVydGV4W10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGluZGV4IG9mIGFsbEluZGljZXMpIHtcblxuICAgIHZlcnRpY2VzLnB1c2goe1xuICAgICAgcG9zOiBnbG0udmVjMy5jb3B5KFswLDAsMF0sIGFsbFZlcnRpY2VzW2luZGV4WzBdXSksXG4gICAgICBub3JtYWw6IGdsbS52ZWMzLmNvcHkoWzAsMCwwXSwgYWxsTm9ybWFsc1tpbmRleFszXV0pLFxuICAgIH0pO1xuICAgIHZlcnRpY2VzLnB1c2goe1xuICAgICAgcG9zOiBnbG0udmVjMy5jb3B5KFswLDAsMF0sIGFsbFZlcnRpY2VzW2luZGV4WzFdXSksXG4gICAgICBub3JtYWw6IGdsbS52ZWMzLmNvcHkoWzAsMCwwXSwgYWxsTm9ybWFsc1tpbmRleFszXV0pLFxuICAgIH0pO1xuICAgIHZlcnRpY2VzLnB1c2goe1xuICAgICAgcG9zOiBnbG0udmVjMy5jb3B5KFswLDAsMF0sIGFsbFZlcnRpY2VzW2luZGV4WzJdXSksXG4gICAgICBub3JtYWw6IGdsbS52ZWMzLmNvcHkoWzAsMCwwXSwgYWxsTm9ybWFsc1tpbmRleFszXV0pLFxuICAgIH0pO1xuXG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzBdXVswXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzBdXVsxXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzBdXVsyXSk7XG5cbiAgICAvLyBpZiAoaW5BZGROb3JtYWxzKSB7XG4gICAgLy8gICBmaW5hbFZlcnRpY2VzLnB1c2goYWxsTm9ybWFsc1tpbmRleFszXV1bMF0pO1xuICAgIC8vICAgZmluYWxWZXJ0aWNlcy5wdXNoKGFsbE5vcm1hbHNbaW5kZXhbM11dWzFdKTtcbiAgICAvLyAgIGZpbmFsVmVydGljZXMucHVzaChhbGxOb3JtYWxzW2luZGV4WzNdXVsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzFdXVswXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzFdXVsxXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzFdXVsyXSk7XG5cbiAgICAvLyBpZiAoaW5BZGROb3JtYWxzKSB7XG4gICAgLy8gICBmaW5hbFZlcnRpY2VzLnB1c2goYWxsTm9ybWFsc1tpbmRleFszXV1bMF0pO1xuICAgIC8vICAgZmluYWxWZXJ0aWNlcy5wdXNoKGFsbE5vcm1hbHNbaW5kZXhbM11dWzFdKTtcbiAgICAvLyAgIGZpbmFsVmVydGljZXMucHVzaChhbGxOb3JtYWxzW2luZGV4WzNdXVsyXSk7XG4gICAgLy8gfVxuXG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzJdXVswXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzJdXVsxXSk7XG4gICAgLy8gZmluYWxWZXJ0aWNlcy5wdXNoKGFsbFZlcnRpY2VzW2luZGV4WzJdXVsyXSk7XG5cbiAgICAvLyBpZiAoaW5BZGROb3JtYWxzKSB7XG4gICAgLy8gICBmaW5hbFZlcnRpY2VzLnB1c2goYWxsTm9ybWFsc1tpbmRleFszXV1bMF0pO1xuICAgIC8vICAgZmluYWxWZXJ0aWNlcy5wdXNoKGFsbE5vcm1hbHNbaW5kZXhbM11dWzFdKTtcbiAgICAvLyAgIGZpbmFsVmVydGljZXMucHVzaChhbGxOb3JtYWxzW2luZGV4WzNdXVsyXSk7XG4gICAgLy8gfVxuXG4gIH1cblxuICByZXR1cm4gdmVydGljZXM7XG59O1xuIiwKICAiXG5pbXBvcnQge0lWZXJ0ZXh9IGZyb20gJy4vSVZlcnRleCc7XG5cbmltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElWZXJ0ZXgge1xuLy8gICBwb3M6IGdsbS52ZWMzO1xuLy8gICBub3JtYWw6IGdsbS52ZWMzO1xuLy8gfVxuXG5jb25zdCBfZHJhd1NwaGVyZVBhdGNoID0gKFxuICB2ZXJ0aWNlczogSVZlcnRleFtdLFxuICBxdWFsaXR5OiBudW1iZXIsXG4gIHJhZGl1czogbnVtYmVyLFxuICB2MDE6IGdsbS5SZWFkb25seVZlYzMsXG4gIHYwMjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgdjAzOiBnbG0uUmVhZG9ubHlWZWMzXG4pID0+IHtcbiAgaWYgKHF1YWxpdHkgPD0gMCkge1xuICAgIC8vIGhhY2s6IHBvc2l0aW9uID0gbm9ybWFsXG4gICAgdmVydGljZXMucHVzaCh7XG4gICAgICBwb3M6IGdsbS52ZWMzLnNjYWxlKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDEsIHJhZGl1cyksXG4gICAgICBub3JtYWw6IGdsbS52ZWMzLmNvcHkoZ2xtLnZlYzMuY3JlYXRlKCksIHYwMSlcbiAgICB9KTtcbiAgICB2ZXJ0aWNlcy5wdXNoKHtcbiAgICAgIHBvczogZ2xtLnZlYzMuc2NhbGUoZ2xtLnZlYzMuY3JlYXRlKCksIHYwMywgcmFkaXVzKSxcbiAgICAgIG5vcm1hbDogZ2xtLnZlYzMuY29weShnbG0udmVjMy5jcmVhdGUoKSwgdjAzKVxuICAgIH0pO1xuICAgIHZlcnRpY2VzLnB1c2goe1xuICAgICAgcG9zOiBnbG0udmVjMy5zY2FsZShnbG0udmVjMy5jcmVhdGUoKSwgdjAyLCByYWRpdXMpLFxuICAgICAgbm9ybWFsOiBnbG0udmVjMy5jb3B5KGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDIpXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdjEyID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDEsIHYwMiwgMC41KVxuICAgICk7XG4gICAgY29uc3QgdjIzID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDIsIHYwMywgMC41KVxuICAgICk7XG4gICAgY29uc3QgdjMxID0gZ2xtLnZlYzMubm9ybWFsaXplKFxuICAgICAgZ2xtLnZlYzMuY3JlYXRlKCksXG4gICAgICBnbG0udmVjMy5sZXJwKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDMsIHYwMSwgMC41KVxuICAgICk7XG5cbiAgICBxdWFsaXR5IC09IDE7XG5cbiAgICBfZHJhd1NwaGVyZVBhdGNoKHZlcnRpY2VzLCBxdWFsaXR5LCByYWRpdXMsIHYwMSwgdjEyLCB2MzEpO1xuICAgIF9kcmF3U3BoZXJlUGF0Y2godmVydGljZXMsIHF1YWxpdHksIHJhZGl1cywgdjEyLCB2MDIsIHYyMyk7XG4gICAgX2RyYXdTcGhlcmVQYXRjaCh2ZXJ0aWNlcywgcXVhbGl0eSwgcmFkaXVzLCB2MzEsIHYyMywgdjAzKTtcbiAgICBfZHJhd1NwaGVyZVBhdGNoKHZlcnRpY2VzLCBxdWFsaXR5LCByYWRpdXMsIHYxMiwgdjIzLCB2MzEpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZVNwaGVyZSA9IChcbiAgcXVhbGl0eTogbnVtYmVyLFxuICByYWRpdXM6IG51bWJlcixcbiAgLy8gbW9kZWxNYXQ0OiBnbG0uUmVhZG9ubHlNYXQ0XG4pOiBJVmVydGV4W10gPT4ge1xuICBjb25zdCBrX2ljeCA9IDAuNTI1NzMxMTEyMTE5MTMzNjA2O1xuICBjb25zdCBrX2ljeiA9IDAuODUwNjUwODA4MzUyMDM5OTMyO1xuXG4gIGNvbnN0IHRtcFZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgWy1rX2ljeCwgMC4wLCAra19pY3pdLFxuICAgIFsra19pY3gsIDAuMCwgK2tfaWN6XSxcbiAgICBbLWtfaWN4LCAwLjAsIC1rX2ljel0sXG4gICAgWytrX2ljeCwgMC4wLCAta19pY3pdLFxuICAgIFswLjAsICtrX2ljeiwgK2tfaWN4XSxcbiAgICBbMC4wLCAra19pY3osIC1rX2ljeF0sXG4gICAgWzAuMCwgLWtfaWN6LCAra19pY3hdLFxuICAgIFswLjAsIC1rX2ljeiwgLWtfaWN4XSxcbiAgICBbK2tfaWN6LCAra19pY3gsIDAuMF0sXG4gICAgWy1rX2ljeiwgK2tfaWN4LCAwLjBdLFxuICAgIFsra19pY3osIC1rX2ljeCwgMC4wXSxcbiAgICBbLWtfaWN6LCAta19pY3gsIDAuMF1cbiAgXTtcblxuICBjb25zdCB0bXBJbmRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXG4gICAgWzAsIDQsIDFdLFxuICAgIFswLCA5LCA0XSxcbiAgICBbOSwgNSwgNF0sXG4gICAgWzQsIDUsIDhdLFxuICAgIFs0LCA4LCAxXSxcbiAgICBbOCwgMTAsIDFdLFxuICAgIFs4LCAzLCAxMF0sXG4gICAgWzUsIDMsIDhdLFxuICAgIFs1LCAyLCAzXSxcbiAgICBbMiwgNywgM10sXG4gICAgWzcsIDEwLCAzXSxcbiAgICBbNywgNiwgMTBdLFxuICAgIFs3LCAxMSwgNl0sXG4gICAgWzExLCAwLCA2XSxcbiAgICBbMCwgMSwgNl0sXG4gICAgWzYsIDEsIDEwXSxcbiAgICBbOSwgMCwgMTFdLFxuICAgIFs5LCAxMSwgMl0sXG4gICAgWzksIDIsIDVdLFxuICAgIFs3LCAyLCAxMV1cbiAgXTtcblxuICBjb25zdCB2ZXJ0aWNlczogSVZlcnRleFtdID0gW107XG5cbiAgZm9yIChjb25zdCBpbmRleCBvZiB0bXBJbmRpY2VzKSB7XG4gICAgX2RyYXdTcGhlcmVQYXRjaChcbiAgICAgIHZlcnRpY2VzLFxuICAgICAgcXVhbGl0eSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzBdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzFdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzJdXVxuICAgICk7XG4gIH1cblxuICAvLyBjb25zdCBuZXdQb3MgPSBnbG0udmVjMy5jcmVhdGUoKTtcbiAgLy8gLy8gY29uc3QgbmV3Tm9ybSA9IGdsbS52ZWMzLmNyZWF0ZSgpO1xuICAvLyAvLyBjb25zdCBtb2RlbE1hdDMgPSBnbG0ubWF0My5mcm9tTWF0NChnbG0ubWF0My5jcmVhdGUoKSwgbW9kZWxNYXQ0KTtcblxuICAvLyBmb3IgKGNvbnN0IHZlcnRleCBvZiB2ZXJ0aWNlcykge1xuICAvLyAgIGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQobmV3UG9zLCB2ZXJ0ZXgucG9zLCBtb2RlbE1hdDQpO1xuICAvLyAgIGdsbS52ZWMzLmNvcHkodmVydGV4LnBvcywgbmV3UG9zKTtcbiAgLy8gfVxuXG4gIHJldHVybiB2ZXJ0aWNlcztcblxuICAvLyByZXR1cm4gdmVydGljZXMubWFwKCh2ZXJ0ZXgpID0+IHtcblxuICAvLyAgIGdsbS52ZWMzLnRyYW5zZm9ybU1hdDQobmV3UG9zLCB2ZXJ0ZXgucG9zLCBtb2RlbE1hdDQpO1xuICAvLyAgIC8vIGdsbS52ZWMzLnRyYW5zZm9ybU1hdDMobmV3Tm9ybSwgdmVydGV4Lm5vcm1hbCwgbW9kZWxNYXQzKTtcblxuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBwb3M6IGdsbS52ZWMzLmNvcHkoZ2xtLnZlYzMuY3JlYXRlKCksIG5ld1BvcyksXG4gIC8vICAgfVxuICAvLyAgIC8vICAgbmV3UG9zWzBdLFxuICAvLyAgIC8vICAgbmV3UG9zWzFdLFxuICAvLyAgIC8vICAgbmV3UG9zWzJdLFxuICAvLyAgIC8vICAgdmVydGV4Lm5vcm1hbFswXSxcbiAgLy8gICAvLyAgIHZlcnRleC5ub3JtYWxbMV0sXG4gIC8vICAgLy8gICB2ZXJ0ZXgubm9ybWFsWzJdXG4gIC8vICAgLy8gXTtcbiAgLy8gfSlcbiAgLy8gICAvLyAuZmxhdCgpO1xufTtcbiIsCiAgImltcG9ydCAqIGFzIGdsbSBmcm9tICdnbC1tYXRyaXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnRleCB7XG4gIHBvc2l0aW9uOiBnbG0uUmVhZG9ubHlWZWMzO1xuICBub3JtYWw6IGdsbS5SZWFkb25seVZlYzM7XG59XG5cbmNvbnN0IF9kcmF3U3BoZXJlUGF0Y2ggPSAoXG4gIHZlcnRpY2VzOiBWZXJ0ZXhbXSxcbiAgcXVhbGl0eTogbnVtYmVyLFxuICByYWRpdXM6IG51bWJlcixcbiAgdjAxOiBnbG0uUmVhZG9ubHlWZWMzLFxuICB2MDI6IGdsbS5SZWFkb25seVZlYzMsXG4gIHYwMzogZ2xtLlJlYWRvbmx5VmVjM1xuKSA9PiB7XG4gIGlmIChxdWFsaXR5IDw9IDApIHtcbiAgICAvLyBoYWNrOiBwb3NpdGlvbiA9IG5vcm1hbFxuICAgIHZlcnRpY2VzLnB1c2goe1xuICAgICAgcG9zaXRpb246IGdsbS52ZWMzLnNjYWxlKGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDEsIHJhZGl1cyksXG4gICAgICBub3JtYWw6IGdsbS52ZWMzLmNvcHkoZ2xtLnZlYzMuY3JlYXRlKCksIHYwMSlcbiAgICB9KTtcbiAgICB2ZXJ0aWNlcy5wdXNoKHtcbiAgICAgIHBvc2l0aW9uOiBnbG0udmVjMy5zY2FsZShnbG0udmVjMy5jcmVhdGUoKSwgdjAzLCByYWRpdXMpLFxuICAgICAgbm9ybWFsOiBnbG0udmVjMy5jb3B5KGdsbS52ZWMzLmNyZWF0ZSgpLCB2MDMpXG4gICAgfSk7XG4gICAgdmVydGljZXMucHVzaCh7XG4gICAgICBwb3NpdGlvbjogZ2xtLnZlYzMuc2NhbGUoZ2xtLnZlYzMuY3JlYXRlKCksIHYwMiwgcmFkaXVzKSxcbiAgICAgIG5vcm1hbDogZ2xtLnZlYzMuY29weShnbG0udmVjMy5jcmVhdGUoKSwgdjAyKVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHYxMiA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAxLCB2MDIsIDAuNSlcbiAgICApO1xuICAgIGNvbnN0IHYyMyA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAyLCB2MDMsIDAuNSlcbiAgICApO1xuICAgIGNvbnN0IHYzMSA9IGdsbS52ZWMzLm5vcm1hbGl6ZShcbiAgICAgIGdsbS52ZWMzLmNyZWF0ZSgpLFxuICAgICAgZ2xtLnZlYzMubGVycChnbG0udmVjMy5jcmVhdGUoKSwgdjAzLCB2MDEsIDAuNSlcbiAgICApO1xuXG4gICAgcXVhbGl0eSAtPSAxO1xuXG4gICAgX2RyYXdTcGhlcmVQYXRjaCh2ZXJ0aWNlcywgcXVhbGl0eSwgcmFkaXVzLCB2MDEsIHYxMiwgdjMxKTtcbiAgICBfZHJhd1NwaGVyZVBhdGNoKHZlcnRpY2VzLCBxdWFsaXR5LCByYWRpdXMsIHYxMiwgdjAyLCB2MjMpO1xuICAgIF9kcmF3U3BoZXJlUGF0Y2godmVydGljZXMsIHF1YWxpdHksIHJhZGl1cywgdjMxLCB2MjMsIHYwMyk7XG4gICAgX2RyYXdTcGhlcmVQYXRjaCh2ZXJ0aWNlcywgcXVhbGl0eSwgcmFkaXVzLCB2MTIsIHYyMywgdjMxKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3BoZXJlVmVydGljZXMgPSAoXG4gIHF1YWxpdHk6IG51bWJlcixcbiAgcmFkaXVzOiBudW1iZXJcbik6IFZlcnRleFtdID0+IHtcbiAgY29uc3Qga19pY3ggPSAwLjUyNTczMTExMjExOTEzMzYwNjtcbiAgY29uc3Qga19pY3ogPSAwLjg1MDY1MDgwODM1MjAzOTkzMjtcblxuICBjb25zdCB0bXBWZXJ0aWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFsta19pY3gsIDAuMCwgK2tfaWN6XSxcbiAgICBbK2tfaWN4LCAwLjAsICtrX2ljel0sXG4gICAgWy1rX2ljeCwgMC4wLCAta19pY3pdLFxuICAgIFsra19pY3gsIDAuMCwgLWtfaWN6XSxcbiAgICBbMC4wLCAra19pY3osICtrX2ljeF0sXG4gICAgWzAuMCwgK2tfaWN6LCAta19pY3hdLFxuICAgIFswLjAsIC1rX2ljeiwgK2tfaWN4XSxcbiAgICBbMC4wLCAta19pY3osIC1rX2ljeF0sXG4gICAgWytrX2ljeiwgK2tfaWN4LCAwLjBdLFxuICAgIFsta19pY3osICtrX2ljeCwgMC4wXSxcbiAgICBbK2tfaWN6LCAta19pY3gsIDAuMF0sXG4gICAgWy1rX2ljeiwgLWtfaWN4LCAwLjBdXG4gIF07XG5cbiAgY29uc3QgdG1wSW5kaWNlczogZ2xtLlJlYWRvbmx5VmVjM1tdID0gW1xuICAgIFswLCA0LCAxXSxcbiAgICBbMCwgOSwgNF0sXG4gICAgWzksIDUsIDRdLFxuICAgIFs0LCA1LCA4XSxcbiAgICBbNCwgOCwgMV0sXG4gICAgWzgsIDEwLCAxXSxcbiAgICBbOCwgMywgMTBdLFxuICAgIFs1LCAzLCA4XSxcbiAgICBbNSwgMiwgM10sXG4gICAgWzIsIDcsIDNdLFxuICAgIFs3LCAxMCwgM10sXG4gICAgWzcsIDYsIDEwXSxcbiAgICBbNywgMTEsIDZdLFxuICAgIFsxMSwgMCwgNl0sXG4gICAgWzAsIDEsIDZdLFxuICAgIFs2LCAxLCAxMF0sXG4gICAgWzksIDAsIDExXSxcbiAgICBbOSwgMTEsIDJdLFxuICAgIFs5LCAyLCA1XSxcbiAgICBbNywgMiwgMTFdXG4gIF07XG5cbiAgY29uc3QgdmVydGljZXM6IFZlcnRleFtdID0gW107XG5cbiAgZm9yIChjb25zdCBpbmRleCBvZiB0bXBJbmRpY2VzKSB7XG4gICAgX2RyYXdTcGhlcmVQYXRjaChcbiAgICAgIHZlcnRpY2VzLFxuICAgICAgcXVhbGl0eSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzBdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzFdXSxcbiAgICAgIHRtcFZlcnRpY2VzW2luZGV4WzJdXVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdmVydGljZXM7XG59O1xuIiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxudW5pZm9ybSBtYXQ0IHVfY29tcG9zZWRNYXRyaXg7XG5cbmluIHZlYzMgIGFfdmVydGV4X3Bvc2l0aW9uO1xuXG5pbiB2ZWMzICBhX29mZnNldF9jZW50ZXI7XG5pbiBmbG9hdCBhX29mZnNldF9zY2FsZTtcbmluIHZlYzMgIGFfb2Zmc2V0X2NvbG9yO1xuXG5mbGF0IG91dCB2ZWMzIHZfY29sb3I7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICB2ZWMzIHBvc2l0aW9uID0gYV9vZmZzZXRfY2VudGVyICsgYV92ZXJ0ZXhfcG9zaXRpb24gKiBhX29mZnNldF9zY2FsZTtcblxuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xuXG4gIHZfY29sb3IgPSBhX29mZnNldF9jb2xvcjtcbn1cbmAudHJpbSgpOyIsCiAgImV4cG9ydCBkZWZhdWx0IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5wcmVjaXNpb24gbG93cCBmbG9hdDtcblxuZmxhdCBpbiB2ZWMzIHZfY29sb3I7XG5cbm91dCB2ZWM0IG9fY29sb3I7XG5cbnZvaWQgbWFpbih2b2lkKVxue1xuICBvX2NvbG9yID0gdmVjNCh2X2NvbG9yLCAxLjApO1xufVxuYC50cmltKCk7IiwKICAiXG5pbXBvcnQgeyBzeXN0ZW0sIGdyYXBoaWNzIH0gZnJvbSAnQGxvY2FsLWZyYW1ld29yayc7XG4vLyBpbXBvcnQgeyBTaGFkZXJQcm9ncmFtLCBHZW9tZXRyeVdyYXBwZXIgfSBmcm9tICdAYnJvd3Nlci93ZWJnbDInO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy93aXJlLWZyYW1lLWN1YmVzLXJlbmRlcmVyLmdsc2wudmVydCc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL3dpcmUtZnJhbWUtY3ViZXMtcmVuZGVyZXIuZ2xzbC5mcmFnJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vIGNvbnN0IGtfYnVmZmVyU2l6ZSA9IDcgKiA1MTI7XG5jb25zdCBrX2J1ZmZlclNpemUgPSA3ICogNTEyICogNjtcblxuY29uc3QgZ2VuZXJhdGVXaXJlRnJhbWVDdWJlVmVydGljZXMgPSAoaW5TaXplOiBudW1iZXIpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IGhTaXplID0gaW5TaXplICogMC41O1xuXG4gIGNvbnN0IHZlcnRpY2VzOiBnbG0uUmVhZG9ubHlWZWMzW10gPSBbXTtcblxuICB2ZXJ0aWNlcy5wdXNoKFsraFNpemUsICtoU2l6ZSwgK2hTaXplXSk7XG4gIHZlcnRpY2VzLnB1c2goWy1oU2l6ZSwgK2hTaXplLCAraFNpemVdKTtcbiAgdmVydGljZXMucHVzaChbK2hTaXplLCAtaFNpemUsICtoU2l6ZV0pO1xuICB2ZXJ0aWNlcy5wdXNoKFstaFNpemUsIC1oU2l6ZSwgK2hTaXplXSk7XG5cbiAgdmVydGljZXMucHVzaChbK2hTaXplLCAraFNpemUsIC1oU2l6ZV0pO1xuICB2ZXJ0aWNlcy5wdXNoKFstaFNpemUsICtoU2l6ZSwgLWhTaXplXSk7XG4gIHZlcnRpY2VzLnB1c2goWytoU2l6ZSwgLWhTaXplLCAtaFNpemVdKTtcbiAgdmVydGljZXMucHVzaChbLWhTaXplLCAtaFNpemUsIC1oU2l6ZV0pO1xuXG4gIC8vXG5cbiAgY29uc3QgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcblxuICBpbmRpY2VzLnB1c2goMCwgMSwgMSwgMywgMywgMiwgMiwgMCk7XG4gIGluZGljZXMucHVzaCg0LCA1LCA1LCA3LCA3LCA2LCA2LCA0KTtcbiAgaW5kaWNlcy5wdXNoKDAsIDQsIDEsIDUsIDMsIDcsIDIsIDYpO1xuXG4gIC8vXG5cbiAgY29uc3QgZmluYWxWZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcblxuICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgaW5kaWNlcy5sZW5ndGg7ICsraWkpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpbmRpY2VzW2lpXV07XG5cbiAgICBmaW5hbFZlcnRpY2VzLnB1c2godmVydGV4WzBdKTtcbiAgICBmaW5hbFZlcnRpY2VzLnB1c2godmVydGV4WzFdKTtcbiAgICBmaW5hbFZlcnRpY2VzLnB1c2godmVydGV4WzJdKTtcbiAgfVxuXG4gIHJldHVybiBmaW5hbFZlcnRpY2VzO1xufTtcblxuLy9cbi8vXG4vL1xuXG5leHBvcnQgaW50ZXJmYWNlIElXaXJlRnJhbWVDdWJlc1JlbmRlcmVyIHtcbiAgcHVzaENlbnRlcmVkQ3ViZShcbiAgICBpbkNlbnRlcjogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblNjYWxlOiBudW1iZXIsXG4gICAgaW5Db2xvcjogZ2xtLlJlYWRvbmx5VmVjM1xuICApOiB2b2lkO1xuXG4gIHB1c2hPcmlnaW5Cb3VuZEN1YmUoXG4gICAgaW5PcmlnaW46IGdsbS5SZWFkb25seVZlYzMsXG4gICAgaW5TY2FsZTogbnVtYmVyLFxuICAgIGluQ29sb3I6IGdsbS5SZWFkb25seVZlYzNcbiAgKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFdpcmVGcmFtZUN1YmVzUmVuZGVyZXIgaW1wbGVtZW50cyBJV2lyZUZyYW1lQ3ViZXNSZW5kZXJlciB7XG4gIHByaXZhdGUgX3NoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLlNoYWRlclByb2dyYW07XG4gIHByaXZhdGUgX2dlb21ldHJ5OiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5O1xuXG4gIHByaXZhdGUgX2J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoa19idWZmZXJTaXplKTtcbiAgcHJpdmF0ZSBfY3VycmVudFNpemU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc2hhZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5TaGFkZXJQcm9ncmFtKCdXaXJlRnJhbWVDdWJlc1JlbmRlcmVyJywge1xuICAgICAgdmVydGV4U3JjOiB2ZXJ0ZXhTaGFkZXIsXG4gICAgICBmcmFnbWVudFNyYzogZnJhZ21lbnRTaGFkZXIsXG4gICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICdhX3ZlcnRleF9wb3NpdGlvbicsXG4gICAgICAgICdhX29mZnNldF9jZW50ZXInLFxuICAgICAgICAnYV9vZmZzZXRfc2NhbGUnLFxuICAgICAgICAnYV9vZmZzZXRfY29sb3InXG4gICAgICBdLFxuICAgICAgdW5pZm9ybXM6IFsndV9jb21wb3NlZE1hdHJpeCddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCdsaW5lcycpXG4gICAgICAuYWRkVmJvKClcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2FfdmVydGV4X3Bvc2l0aW9uJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm8oKVxuICAgICAgLnNldFZib0FzRHluYW1pYygpXG4gICAgICAuc2V0VmJvQXNJbnN0YW5jZWQoKVxuICAgICAgLmFkZFZib0F0dHJpYnV0ZSgnYV9vZmZzZXRfY2VudGVyJywgJ3ZlYzNmJylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X3NjYWxlJywgJ2Zsb2F0JylcbiAgICAgIC5hZGRWYm9BdHRyaWJ1dGUoJ2Ffb2Zmc2V0X2NvbG9yJywgJ3ZlYzNmJyk7XG5cbiAgICB0aGlzLl9nZW9tZXRyeSA9IG5ldyBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5KFxuICAgICAgdGhpcy5fc2hhZGVyLFxuICAgICAgZ2VvQnVpbGRlci5nZXREZWYoKVxuICAgICk7XG5cbiAgICBjb25zdCB2ZXJ0aWNlcyA9IGdlbmVyYXRlV2lyZUZyYW1lQ3ViZVZlcnRpY2VzKDEpO1xuXG4gICAgdGhpcy5fZ2VvbWV0cnkuYWxsb2NhdGVCdWZmZXIoMCwgdmVydGljZXMsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgdGhpcy5fZ2VvbWV0cnkuc2V0UHJpbWl0aXZlQ291bnQodmVydGljZXMubGVuZ3RoIC8gMyk7XG4gIH1cblxuICBwdXNoQ2VudGVyZWRDdWJlKFxuICAgIGluQ2VudGVyOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2NhbGU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgPj0ga19idWZmZXJTaXplKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMF0gPSBpbkNlbnRlclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyAxXSA9IGluQ2VudGVyWzFdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDJdID0gaW5DZW50ZXJbMl07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgM10gPSBpblNjYWxlO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDRdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA1XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNl0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2N1cnJlbnRTaXplICs9IDc7XG4gIH1cblxuICBwdXNoT3JpZ2luQm91bmRDdWJlKFxuICAgIGluT3JpZ2luOiBnbG0uUmVhZG9ubHlWZWMzLFxuICAgIGluU2NhbGU6IG51bWJlcixcbiAgICBpbkNvbG9yOiBnbG0uUmVhZG9ubHlWZWMzXG4gICkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDcgPj0ga19idWZmZXJTaXplKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMF0gPSBpbk9yaWdpblswXSArIGluU2NhbGUgKiAwLjU7XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMV0gPSBpbk9yaWdpblsxXSArIGluU2NhbGUgKiAwLjU7XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgMl0gPSBpbk9yaWdpblsyXSArIGluU2NhbGUgKiAwLjU7XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgM10gPSBpblNjYWxlO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSArIDRdID0gaW5Db2xvclswXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUgKyA1XSA9IGluQ29sb3JbMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplICsgNl0gPSBpbkNvbG9yWzJdO1xuICAgIHRoaXMuX2N1cnJlbnRTaXplICs9IDc7XG4gIH1cblxuICBmbHVzaChcbiAgICBjb21wb3NlZE1hdHJpeDogZ2xtLlJlYWRvbmx5TWF0NCxcbiAgICBjbGVhclN0YWNrOiBib29sZWFuID0gdHJ1ZVxuICApIHtcbiAgICB0aGlzLl9zaGFkZXIuYmluZCgoYm91bmRTaGFkZXIpID0+IHtcbiAgICAgIGJvdW5kU2hhZGVyLnNldE1hdHJpeDRVbmlmb3JtKCd1X2NvbXBvc2VkTWF0cml4JywgY29tcG9zZWRNYXRyaXgpO1xuXG4gICAgICBpZiAodGhpcy5fY3VycmVudFNpemUgPiAwKSB7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5LmFsbG9jYXRlQnVmZmVyKDEsIHRoaXMuX2J1ZmZlciwgdGhpcy5fY3VycmVudFNpemUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ2VvbWV0cnkuc2V0SW5zdGFuY2VkQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA3KTtcbiAgICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgaWYgKGNsZWFyU3RhY2sgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICAvLyByZXNldCB2ZXJ0aWNlc1xuICAgIHRoaXMuX2N1cnJlbnRTaXplID0gMDtcbiAgfVxuXG59XG4iLAogICJcbmltcG9ydCB7IHN5c3RlbSwgZ3JhcGhpY3MgfSBmcm9tICdAbG9jYWwtZnJhbWV3b3JrJztcblxuaW1wb3J0IHsgVmVydGV4LCBnZW5lcmF0ZVNwaGVyZVZlcnRpY2VzIH0gZnJvbSAnLi91dGlscy9nZW5lcmF0ZVNwaGVyZVZlcnRpY2VzJztcblxuaW1wb3J0IHtcbiAgV2lyZUZyYW1lQ3ViZXNSZW5kZXJlcixcbiAgSVdpcmVGcmFtZUN1YmVzUmVuZGVyZXIsXG59IGZyb20gJy4vcmVuZGVyZXJzJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8vXG5cbmludGVyZmFjZSBJRGVmaW5pdGlvbiB7XG4gIGNhbnZhc0RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlciB7XG4gIHByaXZhdGUgX2RlZjogSURlZmluaXRpb247XG5cbiAgcHJpdmF0ZSBfdmlld3BvcnRTaXplOiBnbG0udmVjMjtcblxuICBwcml2YXRlIF9mcnVzdHVtQ3VsbGluZzogZ3JhcGhpY3MuY2FtZXJhLkZydXN0dW1DdWxsaW5nO1xuXG4gIHByaXZhdGUgX21haW5DYW1lcmEgPSBuZXcgZ3JhcGhpY3MuY2FtZXJhLkNhbWVyYSgpO1xuICBwcml2YXRlIF9tYWluSHVkQ2FtZXJhID0gbmV3IGdyYXBoaWNzLmNhbWVyYS5DYW1lcmEoKTtcblxuICBwcml2YXRlIG9uQ29udGV4dExvc3Q6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uQ29udGV4dFJlc3RvcmVkOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF90ZXh0UmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5UZXh0UmVuZGVyZXI7XG4gIHByaXZhdGUgX3dpcmVGcmFtZUN1YmVzUmVuZGVyZXI6IFdpcmVGcmFtZUN1YmVzUmVuZGVyZXI7XG4gIHByaXZhdGUgX3N0YWNrUmVuZGVyZXJzOiBncmFwaGljcy5yZW5kZXJlcnMuU3RhY2tSZW5kZXJlcnM7XG4gIC8vIHByaXZhdGUgX2dlb21ldHJ5U3RhY2tSZW5kZXJlcjogR2VvbWV0cnlTdGFja1JlbmRlcmVyO1xuICBwcml2YXRlIF9nZW9tZXRyeVN0YWNrUmVuZGVyZXI6IGdyYXBoaWNzLnJlbmRlcmVycy5HZW9tZXRyeVJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogSURlZmluaXRpb24pIHtcbiAgICB0aGlzLl9kZWYgPSBkZWY7XG5cbiAgICB0aGlzLl92aWV3cG9ydFNpemUgPSBbXG4gICAgICB0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudC53aWR0aCxcbiAgICAgIHRoaXMuX2RlZi5jYW52YXNEb21FbGVtZW50LmhlaWdodFxuICAgIF07XG5cbiAgICB0aGlzLnJlc2l6ZSh0aGlzLl92aWV3cG9ydFNpemVbMF0sIHRoaXMuX3ZpZXdwb3J0U2l6ZVsxXSk7XG5cbiAgICBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmluaXRpYWxpemUodGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQpO1xuXG4gICAgdGhpcy5fZGVmLmNhbnZhc0RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd3ZWJnbGNvbnRleHRsb3N0JyxcbiAgICAgIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbnRleHQgaXMgbG9zdCcpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uQ29udGV4dExvc3QpIHRoaXMub25Db250ZXh0TG9zdCgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX2RlZi5jYW52YXNEb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnd2ViZ2xjb250ZXh0cmVzdG9yZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY29udGV4dCBpcyByZXN0b3JlZCcpO1xuXG4gICAgICAgIGdyYXBoaWNzLndlYmdsMi5XZWJHTENvbnRleHQuaW5pdGlhbGl6ZSh0aGlzLl9kZWYuY2FudmFzRG9tRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMub25Db250ZXh0UmVzdG9yZWQpIHRoaXMub25Db250ZXh0UmVzdG9yZWQoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICB0aGlzLl9mcnVzdHVtQ3VsbGluZyA9IG5ldyBncmFwaGljcy5jYW1lcmEuRnJ1c3R1bUN1bGxpbmcoKTtcblxuICAgIHRoaXMuX3RleHRSZW5kZXJlciA9IG5ldyBncmFwaGljcy5yZW5kZXJlcnMuVGV4dFJlbmRlcmVyKCk7XG4gICAgdGhpcy5fd2lyZUZyYW1lQ3ViZXNSZW5kZXJlciA9IG5ldyBXaXJlRnJhbWVDdWJlc1JlbmRlcmVyKCk7XG4gICAgdGhpcy5fc3RhY2tSZW5kZXJlcnMgPSBuZXcgZ3JhcGhpY3MucmVuZGVyZXJzLlN0YWNrUmVuZGVyZXJzKCk7XG5cbiAgICAvLyB0aGlzLl9nZW9tZXRyeVN0YWNrUmVuZGVyZXIgPSBuZXcgR2VvbWV0cnlTdGFja1JlbmRlcmVyKCk7XG4gICAgdGhpcy5fZ2VvbWV0cnlTdGFja1JlbmRlcmVyID0gbmV3IGdyYXBoaWNzLnJlbmRlcmVycy5HZW9tZXRyeVJlbmRlcmVyKCk7XG4gICAgLy8gY29uc3QgZ2VvVmVydGljZXMgPSBncmFwaGljcy5nZW9tZXRyaWVzLm1ha2VTcGhlcmUoMSwxKTtcbiAgICBjb25zdCBnZW9WZXJ0aWNlcyA9IGdyYXBoaWNzLmdlb21ldHJpZXMubWFrZUJveChbMSwxLDFdKTtcbiAgICB0aGlzLl9nZW9tZXRyeVN0YWNrUmVuZGVyZXIuc2V0R2VvbWV0cnlWZXJ0aWNlcyhnZW9WZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBhbGxWZXJ0aWNlczogVmVydGV4W10gPSBbXTtcbiAgICB7XG4gICAgICBjb25zdCB2ZXJ0aWNlcyA9IGdlbmVyYXRlU3BoZXJlVmVydGljZXMoMywgNjApO1xuICAgICAgY29uc3QgYWxsUG9zTWFwID0gbmV3IE1hcDxnbG0uUmVhZG9ubHlWZWMzLCBWZXJ0ZXg+KCk7XG4gICAgICB2ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHtcbiAgICAgICAgYWxsUG9zTWFwLnNldCh2ZXJ0ZXgucG9zaXRpb24sIHZlcnRleCk7XG4gICAgICB9KTtcbiAgICAgIGFsbFZlcnRpY2VzLnB1c2goLi4uWy4uLmFsbFBvc01hcC52YWx1ZXMoKV0pO1xuICAgIH1cblxuICB9XG5cbiAgLy9cblxuICBhc3luYyBpbml0aWFsaXplKCkge1xuICAgIGNvbnN0IGdsID0gZ3JhcGhpY3Mud2ViZ2wyLldlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBhd2FpdCB0aGlzLl9zY2VuZS5jaHVua3NSZW5kZXJlci5pbml0aWFsaXplKHRtcEN1YmVNYXBCdWlsZGVyLmdldEN1YmVNYXAoKSk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gaW5pdFxuXG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgIGdsLmNsZWFyRGVwdGgoMS4wKTtcblxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVTUyk7XG5cbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQ09MT1IpO1xuXG4gICAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzFdID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fdmlld3BvcnRTaXplWzFdID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5fbWFpbkNhbWVyYS5zZXRWaWV3cG9ydFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5fbWFpbkNhbWVyYS5zZXRBc1BlcnNwZWN0aXZlKHsgZm92eTogNzAsIG5lYXI6IDEsIGZhcjogMzAwIH0pO1xuICAgIHRoaXMuX21haW5DYW1lcmEuY29tcHV0ZU1hdHJpY2VzKCk7XG5cbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLnNldFZpZXdwb3J0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLnNldEFzT3J0aG9nb25hbCh7XG4gICAgICBsZWZ0OiAtd2lkdGggKiAwLjUsXG4gICAgICByaWdodDogK3dpZHRoICogMC41LFxuICAgICAgdG9wOiAtaGVpZ2h0ICogMC41LFxuICAgICAgYm90dG9tOiAraGVpZ2h0ICogMC41LFxuICAgICAgbmVhcjogLTIwMCxcbiAgICAgIGZhcjogMjAwXG4gICAgfSk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5zZXRFeWUoWyt3aWR0aCAqIDAuNSwgK2hlaWdodCAqIDAuNSwgMV0pO1xuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuc2V0VGFyZ2V0KFsrd2lkdGggKiAwLjUsICtoZWlnaHQgKiAwLjUsIDBdKTtcbiAgICB0aGlzLl9tYWluSHVkQ2FtZXJhLnNldFVwQXhpcyhbMCwgMSwgMF0pO1xuICAgIHRoaXMuX21haW5IdWRDYW1lcmEuY29tcHV0ZU1hdHJpY2VzKCk7XG4gIH1cblxuICAvL1xuXG4gIHRvZ2dsZUNvbnRleHRMb3NzKCkge1xuICAgIGNvbnN0IGdsID0gZ3JhcGhpY3Mud2ViZ2wyLldlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG4gICAgY29uc3QgZXh0ZW5zaW9uTG9zZUNvbnRleHQgPSBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmdldEV4dGVuc2lvbkxvc2VDb250ZXh0KCk7XG5cbiAgICBpZiAoZXh0ZW5zaW9uTG9zZUNvbnRleHQpIHtcbiAgICAgIGlmIChnbC5pc0NvbnRleHRMb3N0KCkpIHtcbiAgICAgICAgZXh0ZW5zaW9uTG9zZUNvbnRleHQucmVzdG9yZUNvbnRleHQoKTsgLy8gcmVzdG9yZXMgdGhlIGNvbnRleHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4dGVuc2lvbkxvc2VDb250ZXh0Lmxvc2VDb250ZXh0KCk7IC8vIHRyaWdnZXIgYSBjb250ZXh0IGxvc3NcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb250ZXh0SXNMb3N0KCkge1xuICAgIGNvbnN0IGdsID0gZ3JhcGhpY3Mud2ViZ2wyLldlYkdMQ29udGV4dC5nZXRDb250ZXh0KCk7XG5cbiAgICByZXR1cm4gZ2wuaXNDb250ZXh0TG9zdCgpO1xuICB9XG5cbiAgc2V0T25Db250ZXh0TG9zdChjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Db250ZXh0TG9zdCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgc2V0T25Db250ZXh0UmVzdG9yZWQoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ29udGV4dFJlc3RvcmVkID0gY2FsbGJhY2s7XG4gIH1cblxuICAvL1xuXG4gIGxvb2tBdChcbiAgICBpbkV5ZTogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblRhcmdldDogZ2xtLlJlYWRvbmx5VmVjMyxcbiAgICBpblVwQXhpczogZ2xtLlJlYWRvbmx5VmVjM1xuICApIHtcbiAgICB0aGlzLl9tYWluQ2FtZXJhLmxvb2tBdChpbkV5ZSwgaW5UYXJnZXQsIGluVXBBeGlzKTtcbiAgICB0aGlzLl9tYWluQ2FtZXJhLmNvbXB1dGVNYXRyaWNlcygpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX21haW5DYW1lcmEuY29tcHV0ZUNvbXBvc2VkTWF0cml4KCk7XG4gICAgdGhpcy5fbWFpbkh1ZENhbWVyYS5jb21wdXRlQ29tcG9zZWRNYXRyaXgoKTtcblxuICAgIHRoaXMuX2ZydXN0dW1DdWxsaW5nLmNhbGN1bGF0ZUZydXN0dW0oXG4gICAgICB0aGlzLl9tYWluQ2FtZXJhLmdldFByb2plY3Rpb25NYXRyaXgoKSxcbiAgICAgIHRoaXMuX21haW5DYW1lcmEuZ2V0Vmlld01hdHJpeCgpXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlclNjZW5lKGNhbGxiYWNrOiAoY2FtZXJhOiBncmFwaGljcy5jYW1lcmEuSUNhbWVyYSwgZnJ1c3R1bUN1bGxpbmc6IGdyYXBoaWNzLmNhbWVyYS5JRnJ1c3R1bUN1bGxpbmcpID0+IHZvaWQpIHtcbiAgICBjb25zdCBnbCA9IGdyYXBoaWNzLndlYmdsMi5XZWJHTENvbnRleHQuZ2V0Q29udGV4dCgpO1xuICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IHRoaXMuX3ZpZXdwb3J0U2l6ZTtcblxuICAgIGNvbnN0IG1vZGVsTWF0NCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICAgIGdsbS5tYXQ0LmlkZW50aXR5KG1vZGVsTWF0NCk7XG4gICAgLy8gZ2xtLm1hdDQudHJhbnNsYXRlKG1vZGVsTWF0NCwgbW9kZWxNYXQ0LCB0aGlzLl9tYWluQ2FtZXJhLmdldEV5ZSgpKTtcbiAgICBnbG0ubWF0NC50cmFuc2xhdGUobW9kZWxNYXQ0LCBtb2RlbE1hdDQsIFsxMCwxMCwwXSk7XG4gICAgLy8gZ2xtLm1hdDQucm90YXRlWChtb2RlbE1hdDQsIG1vZGVsTWF0NCwgTWF0aC5QSSAqIDAuNSk7IC8vIHVwIGF4aXMgaXMgWlxuXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy9cblxuICAgIGNhbGxiYWNrKHRoaXMuX21haW5DYW1lcmEsIHRoaXMuX2ZydXN0dW1DdWxsaW5nKTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fd2lyZUZyYW1lQ3ViZXNSZW5kZXJlci5mbHVzaCh0aGlzLl9tYWluQ2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCkpO1xuICAgIHRoaXMuX3N0YWNrUmVuZGVyZXJzLmZsdXNoKHRoaXMuX21haW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgLy8gdGhpcy5fZ2VvbWV0cnlTdGFja1JlbmRlcmVyLmZsdXNoKHRoaXMuX21haW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSk7XG4gICAgdGhpcy5fZ2VvbWV0cnlTdGFja1JlbmRlcmVyLmZsdXNoKHRoaXMuX21haW5DYW1lcmEpO1xuICB9XG5cbiAgcmVuZGVySFVEKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gdGhpcy5fdmlld3BvcnRTaXplO1xuXG4gICAgY29uc3QgZ2wgPSBncmFwaGljcy53ZWJnbDIuV2ViR0xDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgIGNvbnN0IGh1ZFByb2plY3Rpb25NYXRyaXggPSBnbG0ubWF0NC5jcmVhdGUoKTtcbiAgICBnbG0ubWF0NC5vcnRobyhcbiAgICAgIGh1ZFByb2plY3Rpb25NYXRyaXgsXG4gICAgICAtd2lkdGggKiAwLjUsXG4gICAgICArd2lkdGggKiAwLjUsXG4gICAgICAtaGVpZ2h0ICogMC41LFxuICAgICAgK2hlaWdodCAqIDAuNSxcbiAgICAgIC0yMDAsXG4gICAgICAyMDBcbiAgICApO1xuXG4gICAgY29uc3QgaHVkVmlld01hdHJpeCA9IGdsbS5tYXQ0LmNyZWF0ZSgpO1xuICAgIGdsbS5tYXQ0Lmxvb2tBdChcbiAgICAgIGh1ZFZpZXdNYXRyaXgsXG4gICAgICBbK3dpZHRoICogMC41LCAraGVpZ2h0ICogMC41LCAxXSxcbiAgICAgIFsrd2lkdGggKiAwLjUsICtoZWlnaHQgKiAwLjUsIDBdLFxuICAgICAgWzAsIDEsIDBdXG4gICAgKTtcblxuICAgIGNvbnN0IGh1ZENvbXBvc2VkTWF0cml4ID0gZ2xtLm1hdDQuY3JlYXRlKCk7XG4gICAgZ2xtLm1hdDQubXVsdGlwbHkoaHVkQ29tcG9zZWRNYXRyaXgsIGh1ZFByb2plY3Rpb25NYXRyaXgsIGh1ZFZpZXdNYXRyaXgpO1xuXG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfRFNUX0FMUEhBKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgICB0aGlzLl9zdGFja1JlbmRlcmVycy5mbHVzaChodWRDb21wb3NlZE1hdHJpeCk7XG4gICAgdGhpcy5fdGV4dFJlbmRlcmVyLmZsdXNoKGh1ZENvbXBvc2VkTWF0cml4KTtcblxuICAgIGdsLmRpc2FibGUoZ2wuQkxFTkQpO1xuXG4gICAgZ3JhcGhpY3Mud2ViZ2wyLlNoYWRlclByb2dyYW0udW5iaW5kKCk7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBnbG0uUmVhZG9ubHlWZWMyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRTaXplO1xuICB9XG4gIGdldCBtYWluQ2FtZXJhKCk6IFJlYWRvbmx5PGdyYXBoaWNzLmNhbWVyYS5JQ2FtZXJhPiB7XG4gICAgcmV0dXJuIHRoaXMuX21haW5DYW1lcmE7XG4gIH1cbiAgZ2V0IGh1ZENhbWVyYSgpOiBSZWFkb25seTxncmFwaGljcy5jYW1lcmEuSUNhbWVyYT4ge1xuICAgIHJldHVybiB0aGlzLl9tYWluSHVkQ2FtZXJhO1xuICB9XG4gIGdldCBzdGFja1JlbmRlcmVycygpOiBncmFwaGljcy5yZW5kZXJlcnMuSVN0YWNrUmVuZGVyZXJzIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2tSZW5kZXJlcnM7XG4gIH1cbiAgZ2V0IHRleHRSZW5kZXJlcigpOiBncmFwaGljcy5yZW5kZXJlcnMuSVRleHRSZW5kZXJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHRSZW5kZXJlcjtcbiAgfVxuICBnZXQgZnJ1c3R1bUN1bGxpbmcoKTogZ3JhcGhpY3MuY2FtZXJhLklGcnVzdHVtQ3VsbGluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZydXN0dW1DdWxsaW5nO1xuICB9XG4gIGdldCB3aXJlRnJhbWVDdWJlc1JlbmRlcmVyKCk6IElXaXJlRnJhbWVDdWJlc1JlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fd2lyZUZyYW1lQ3ViZXNSZW5kZXJlcjtcbiAgfVxuICAvLyBnZXQgZ2VvbWV0cnlTdGFja1JlbmRlcmVyKCk6IElHZW9tZXRyeVN0YWNrUmVuZGVyZXIge1xuICAvLyAgIHJldHVybiB0aGlzLl9nZW9tZXRyeVN0YWNrUmVuZGVyZXI7XG4gIC8vIH1cbiAgZ2V0IGdlb21ldHJ5U3RhY2tSZW5kZXJlcigpOiBncmFwaGljcy5yZW5kZXJlcnMuSUdlb21ldHJ5UmVuZGVyZXIge1xuICAgIHJldHVybiB0aGlzLl9nZW9tZXRyeVN0YWNrUmVuZGVyZXI7XG4gIH1cbn1cbiIsCiAgImV4cG9ydCBpbnRlcmZhY2UgSUZyYW1lUHJvZmlsZXIge1xuICBmcmFtZXNEZWx0YTogUmVhZG9ubHlBcnJheTxudW1iZXI+O1xuICBhdmVyYWdlRGVsdGE6IG51bWJlcjtcbiAgbWluRGVsdGE6IG51bWJlcjtcbiAgbWF4RGVsdGE6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZyYW1lUHJvZmlsZXIgaW1wbGVtZW50cyBJRnJhbWVQcm9maWxlciB7XG4gIHByaXZhdGUgX2ZyYW1lc0RlbHRhOiBudW1iZXJbXSA9IFtdO1xuICBwcml2YXRlIF9hdmVyYWdlRGVsdGE6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pbkRlbHRhOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9tYXhEZWx0YTogbnVtYmVyID0gMDtcblxuICBwdXNoRGVsdGEoaW5EZWx0YTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lc0RlbHRhLmxlbmd0aCA+PSAxMDApIHtcbiAgICAgIHRoaXMuX2ZyYW1lc0RlbHRhLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZnJhbWVzRGVsdGEucHVzaChpbkRlbHRhKTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fbWluRGVsdGEgPSArOTk5OTk5OTk5O1xuICAgIHRoaXMuX21heERlbHRhID0gLTk5OTk5OTk5OTtcbiAgICB0aGlzLl9hdmVyYWdlRGVsdGEgPSAwO1xuXG4gICAgZm9yIChjb25zdCBjdXJyRGVsdGEgb2YgdGhpcy5fZnJhbWVzRGVsdGEpIHtcbiAgICAgIHRoaXMuX21pbkRlbHRhID0gTWF0aC5taW4odGhpcy5fbWluRGVsdGEsIGN1cnJEZWx0YSk7XG4gICAgICB0aGlzLl9tYXhEZWx0YSA9IE1hdGgubWF4KHRoaXMuX21heERlbHRhLCBjdXJyRGVsdGEpO1xuICAgICAgdGhpcy5fYXZlcmFnZURlbHRhICs9IGN1cnJEZWx0YTtcbiAgICB9XG4gICAgdGhpcy5fYXZlcmFnZURlbHRhIC89IHRoaXMuX2ZyYW1lc0RlbHRhLmxlbmd0aDtcbiAgfVxuXG4gIGdldCBmcmFtZXNEZWx0YSgpOiBSZWFkb25seUFycmF5PG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9mcmFtZXNEZWx0YTtcbiAgfVxuICBnZXQgYXZlcmFnZURlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2F2ZXJhZ2VEZWx0YTtcbiAgfVxuICBnZXQgbWluRGVsdGEoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGVsdGE7XG4gIH1cbiAgZ2V0IG1heERlbHRhKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heERlbHRhO1xuICB9XG59XG4iLAogICJjb25zdCBSQU5EX01BWCA9IDIxNDc0ODM2NDggfCAwO1xuXG5leHBvcnQgY2xhc3MgRGV0ZXJtaW5pc3RpY1JuZyB7XG4gIHByaXZhdGUgX3NlZWQ6IG51bWJlciA9IDEgfCAwO1xuXG4gIHJhbmRvbSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9zZWVkID09IDApIHtcbiAgICAgIHRoaXMuX3NlZWQgPSAxMjM0NTk4NzYgfCAwO1xuICAgIH1cblxuICAgIGNvbnN0IGhpID0gKHRoaXMuX3NlZWQgLyAxMjc3NzMpIHwgMDtcbiAgICBjb25zdCBsbyA9IHRoaXMuX3NlZWQgJSAxMjc3NzMgfCAwO1xuICAgIGxldCB4ID0gKDE2ODA3ICogbG8gLSAyODM2ICogaGkpIHwgMDtcblxuICAgIGlmICh4IDwgMCkge1xuICAgICAgeCArPSAweDdmZmZmZmZmIHwgMDtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWVkID0geDtcblxuICAgIHJldHVybiAoeCAlIChSQU5EX01BWCArIDEpKSAvIC1SQU5EX01BWDtcbiAgfVxuXG4gIHNldFNlZWQoaW5TZWVkOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWVkID0gaW5TZWVkIHwgMDtcbiAgfVxufVxuIiwKICAiY29uc3Qga19ncmFkMzogW251bWJlciwgbnVtYmVyLCBudW1iZXJdW10gPSBbXG4gIFsxLCAxLCAwXSxcbiAgWy0xLCAxLCAwXSxcbiAgWzEsIC0xLCAwXSxcbiAgWy0xLCAtMSwgMF0sXG4gIFsxLCAwLCAxXSxcbiAgWy0xLCAwLCAxXSxcbiAgWzEsIDAsIC0xXSxcbiAgWy0xLCAwLCAtMV0sXG4gIFswLCAxLCAxXSxcbiAgWzAsIC0xLCAxXSxcbiAgWzAsIDEsIC0xXSxcbiAgWzAsIC0xLCAtMV1cbl07XG5cbnR5cGUgR2V0Tm9ybWFsaXplZFJhbmRvbUNhbGxiYWNrID0gKCkgPT4gbnVtYmVyO1xuXG5pbnRlcmZhY2UgSURlZmluaXRpb24ge1xuICByYW5kb21DYWxsYmFjaz86IEdldE5vcm1hbGl6ZWRSYW5kb21DYWxsYmFjaztcbiAgb2N0YXZlczogbnVtYmVyO1xuICBmcmVxdWVuY3k6IG51bWJlcjtcbiAgYW1wbGl0dWRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDbGFzc2ljYWxOb2lzZSB7XG4gIHByaXZhdGUgX29jdGF2ZXM6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX2ZyZXF1ZW5jeTogbnVtYmVyID0gMS4wO1xuICBwcml2YXRlIF9hbXBsaXR1ZGU6IG51bWJlciA9IDAuNTtcbiAgcHJpdmF0ZSBfcGVybTogVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IElEZWZpbml0aW9uKSB7XG4gICAgdGhpcy5fb2N0YXZlcyA9IGRlZi5vY3RhdmVzIHx8IDE7XG4gICAgdGhpcy5fZnJlcXVlbmN5ID0gZGVmLmZyZXF1ZW5jeSB8fCAxO1xuICAgIHRoaXMuX2FtcGxpdHVkZSA9IGRlZi5hbXBsaXR1ZGUgfHwgMC41O1xuXG4gICAgY29uc3QgcmFuZG9tQ2FsbGJhY2sgPSBkZWYucmFuZG9tQ2FsbGJhY2sgfHwgKCgpID0+IE1hdGgucmFuZG9tKCkpO1xuXG4gICAgY29uc3Qga19zYW1wbGVTaXplID0gMjU2O1xuICAgIGNvbnN0IGtfc2FtcGxlRG91YmxlU2l6ZSA9IGtfc2FtcGxlU2l6ZSAqIDI7XG4gICAgY29uc3QgaW5pdGlhbFAgPSBuZXcgVWludDhBcnJheShrX3NhbXBsZVNpemUpO1xuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBrX3NhbXBsZVNpemU7ICsraWkpXG4gICAgICBpbml0aWFsUFtpaV0gPSBNYXRoLmZsb29yKHJhbmRvbUNhbGxiYWNrKCkgKiBrX3NhbXBsZVNpemUpIHwgMDtcblxuICAgIC8vIFRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgaW5kZXggd3JhcHBpbmcsIGRvdWJsZSB0aGUgcGVybXV0YXRpb24gdGFibGUgbGVuZ3RoXG4gICAgdGhpcy5fcGVybSA9IG5ldyBVaW50OEFycmF5KGtfc2FtcGxlRG91YmxlU2l6ZSk7XG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGtfc2FtcGxlRG91YmxlU2l6ZTsgKytpaSlcbiAgICAgIHRoaXMuX3Blcm1baWldID0gaW5pdGlhbFBbaWkgJiAoa19zYW1wbGVTaXplIC0gMSldIHwgMDtcbiAgfVxuXG4gIGdldE5vaXNlKGluWDogbnVtYmVyLCBpblk6IG51bWJlciwgaW5aOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSAwLjA7XG4gICAgbGV0IGFtcCA9IHRoaXMuX2FtcGxpdHVkZTtcblxuICAgIGxldCB4ID0gaW5YICogdGhpcy5fZnJlcXVlbmN5O1xuICAgIGxldCB5ID0gaW5ZICogdGhpcy5fZnJlcXVlbmN5O1xuICAgIGxldCB6ID0gaW5aICogdGhpcy5fZnJlcXVlbmN5O1xuXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHRoaXMuX29jdGF2ZXM7ICsraWkpIHtcbiAgICAgIHJlc3VsdCArPSB0aGlzLl9ub2lzZSh4LCB5LCB6KSAqIGFtcDtcblxuICAgICAgeCAqPSAyLjA7XG4gICAgICB5ICo9IDIuMDtcbiAgICAgIHogKj0gMi4wO1xuXG4gICAgICBhbXAgKj0gMC41O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9kb3QoaTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBnID0ga19ncmFkM1tpXTtcbiAgICByZXR1cm4gZ1swXSAqIHggKyBnWzFdICogeSArIGdbMl0gKiB6O1xuICB9XG5cbiAgcHJpdmF0ZSBfbWl4KGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoMSAtIHQpICogYSArIHQgKiBiO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmFkZSh0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0ICogdCAqIHQgKiAodCAqICh0ICogNiAtIDE1KSArIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgX25vaXNlKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8vIEZpbmQgdW5pdCBncmlkIGNlbGwgY29udGFpbmluZyBwb2ludFxuICAgIGxldCBYID0gTWF0aC5mbG9vcih4KSB8IDA7XG4gICAgbGV0IFkgPSBNYXRoLmZsb29yKHkpIHwgMDtcbiAgICBsZXQgWiA9IE1hdGguZmxvb3IoeikgfCAwO1xuXG4gICAgLy8gR2V0IHJlbGF0aXZlIHh5eiBjb29yZGluYXRlcyBvZiBwb2ludCB3aXRoaW4gdGhhdCBjZWxsXG4gICAgeCA9IHggLSBYO1xuICAgIHkgPSB5IC0gWTtcbiAgICB6ID0geiAtIFo7XG5cbiAgICAvLyBXcmFwIHRoZSBpbnRlZ2VyIGNlbGxzIGF0IDI1NSAoc21hbGxlciBpbnRlZ2VyIHBlcmlvZCBjYW4gYmUgaW50cm9kdWNlZCBoZXJlKVxuICAgIFggPSAoWCAmIDI1NSkgfCAwO1xuICAgIFkgPSAoWSAmIDI1NSkgfCAwO1xuICAgIFogPSAoWiAmIDI1NSkgfCAwO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGEgc2V0IG9mIGVpZ2h0IGhhc2hlZCBncmFkaWVudCBpbmRpY2VzXG4gICAgY29uc3QgZ2kwMDAgPSB0aGlzLl9wZXJtW1ggKyB0aGlzLl9wZXJtW1kgKyB0aGlzLl9wZXJtW1pdXV0gJSAxMiB8IDA7XG4gICAgY29uc3QgZ2kwMDEgPSB0aGlzLl9wZXJtW1ggKyB0aGlzLl9wZXJtW1kgKyB0aGlzLl9wZXJtW1ogKyAxXV1dICUgMTIgfCAwO1xuICAgIGNvbnN0IGdpMDEwID0gdGhpcy5fcGVybVtYICsgdGhpcy5fcGVybVtZICsgMSArIHRoaXMuX3Blcm1bWl1dXSAlIDEyIHwgMDtcbiAgICBjb25zdCBnaTAxMSA9XG4gICAgICB0aGlzLl9wZXJtW1ggKyB0aGlzLl9wZXJtW1kgKyAxICsgdGhpcy5fcGVybVtaICsgMV1dXSAlIDEyIHwgMDtcbiAgICBjb25zdCBnaTEwMCA9IHRoaXMuX3Blcm1bWCArIDEgKyB0aGlzLl9wZXJtW1kgKyB0aGlzLl9wZXJtW1pdXV0gJSAxMiB8IDA7XG4gICAgY29uc3QgZ2kxMDEgPVxuICAgICAgdGhpcy5fcGVybVtYICsgMSArIHRoaXMuX3Blcm1bWSArIHRoaXMuX3Blcm1bWiArIDFdXV0gJSAxMiB8IDA7XG4gICAgY29uc3QgZ2kxMTAgPVxuICAgICAgdGhpcy5fcGVybVtYICsgMSArIHRoaXMuX3Blcm1bWSArIDEgKyB0aGlzLl9wZXJtW1pdXV0gJSAxMiB8IDA7XG4gICAgY29uc3QgZ2kxMTEgPVxuICAgICAgdGhpcy5fcGVybVtYICsgMSArIHRoaXMuX3Blcm1bWSArIDEgKyB0aGlzLl9wZXJtW1ogKyAxXV1dICUgMTIgfCAwO1xuXG4gICAgLy8gQ2FsY3VsYXRlIG5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIG9mIHRoZSBlaWdodCBjb3JuZXJzXG4gICAgY29uc3QgbjAwMCA9IHRoaXMuX2RvdChnaTAwMCwgeCwgeSwgeik7XG4gICAgY29uc3QgbjEwMCA9IHRoaXMuX2RvdChnaTEwMCwgeCAtIDEsIHksIHopO1xuICAgIGNvbnN0IG4wMTAgPSB0aGlzLl9kb3QoZ2kwMTAsIHgsIHkgLSAxLCB6KTtcbiAgICBjb25zdCBuMTEwID0gdGhpcy5fZG90KGdpMTEwLCB4IC0gMSwgeSAtIDEsIHopO1xuICAgIGNvbnN0IG4wMDEgPSB0aGlzLl9kb3QoZ2kwMDEsIHgsIHksIHogLSAxKTtcbiAgICBjb25zdCBuMTAxID0gdGhpcy5fZG90KGdpMTAxLCB4IC0gMSwgeSwgeiAtIDEpO1xuICAgIGNvbnN0IG4wMTEgPSB0aGlzLl9kb3QoZ2kwMTEsIHgsIHkgLSAxLCB6IC0gMSk7XG4gICAgY29uc3QgbjExMSA9IHRoaXMuX2RvdChnaTExMSwgeCAtIDEsIHkgLSAxLCB6IC0gMSk7XG5cbiAgICAvLyBDb21wdXRlIHRoZSBmYWRlIGN1cnZlIHZhbHVlIGZvciBlYWNoIG9mIHgsIHksIHpcbiAgICBjb25zdCB1ID0gdGhpcy5fZmFkZSh4KTtcbiAgICBjb25zdCB2ID0gdGhpcy5fZmFkZSh5KTtcbiAgICBjb25zdCB3ID0gdGhpcy5fZmFkZSh6KTtcblxuICAgIC8vIEludGVycG9sYXRlIGFsb25nIHggdGhlIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIG9mIHRoZSBjb3JuZXJzXG4gICAgY29uc3QgbngwMCA9IHRoaXMuX21peChuMDAwLCBuMTAwLCB1KTtcbiAgICBjb25zdCBueDAxID0gdGhpcy5fbWl4KG4wMDEsIG4xMDEsIHUpO1xuICAgIGNvbnN0IG54MTAgPSB0aGlzLl9taXgobjAxMCwgbjExMCwgdSk7XG4gICAgY29uc3QgbngxMSA9IHRoaXMuX21peChuMDExLCBuMTExLCB1KTtcblxuICAgIC8vIEludGVycG9sYXRlIHRoZSBmb3VyIHJlc3VsdHMgYWxvbmcgeVxuICAgIGNvbnN0IG54eTAgPSB0aGlzLl9taXgobngwMCwgbngxMCwgdik7XG4gICAgY29uc3Qgbnh5MSA9IHRoaXMuX21peChueDAxLCBueDExLCB2KTtcblxuICAgIC8vIEludGVycG9sYXRlIHRoZSB0d28gbGFzdCByZXN1bHRzIGFsb25nIHpcbiAgICBjb25zdCBueHl6ID0gdGhpcy5fbWl4KG54eTAsIG54eTEsIHcpO1xuXG4gICAgcmV0dXJuIG54eXo7XG4gIH1cbn1cbiIsCiAgIlxuaW1wb3J0IHsgRGV0ZXJtaW5pc3RpY1JuZyB9IGZyb20gJy4vaGVscGVycy9EZXRlcm1pbmlzdGljUm5nJztcbmltcG9ydCB7IENsYXNzaWNhbE5vaXNlIH0gZnJvbSAnLi9oZWxwZXJzL0NsYXNzaWNhbE5vaXNlJztcbmltcG9ydCB7IFNpbXBsZXhOb2lzZSB9IGZyb20gJy4vaGVscGVycy9TaW1wbGV4Tm9pc2UnO1xuXG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyIH0gZnJvbSAnLi4vZ3JhcGhpY3MvV2ViR0xSZW5kZXJlcic7XG5pbXBvcnQgeyBUaWxlc1JlbmRlcmVyIH0gZnJvbSAnLi90aWxlcy1yZW5kZXJlci9UaWxlc1JlbmRlcmVyJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNsYXNzIEdyaWRCdWZmZXIge1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yYXdEYXRhOiBVaW50OEFycmF5IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBhbGxvY2F0ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gd2lkdGh8MDtcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHR8MDtcbiAgICB0aGlzLl9yYXdEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fd2lkdGggKiB0aGlzLl9oZWlnaHQpO1xuICAgIHRoaXMuX3Jhd0RhdGEuZmlsbCgwKTtcbiAgfVxuXG4gIGlzQWxsb2NhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9yYXdEYXRhICE9PSBudWxsO1xuICB9XG5cbiAgY29udGFpbnMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gKCEoXG4gICAgICAoeHwwKSA8IDAgfHwgKHh8MCkgPj0gdGhpcy5fd2lkdGggfHxcbiAgICAgICh5fDApIDwgMCB8fCAoeXwwKSA+PSB0aGlzLl9oZWlnaHRcbiAgICApKTtcbiAgfVxuXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH1cbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5faGVpZ2h0OyB9XG5cbiAgZ2V0RGF0YSh4OiBudW1iZXIsIHk6IG51bWJlciwgZGVmYXVsdFZhbHVlOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5pc0FsbG9jYXRlZCgpIHx8XG4gICAgICAhdGhpcy5jb250YWlucyh4LCB5KVxuICAgICkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmF3RGF0YSFbeSAqIHRoaXMuX3dpZHRoICsgeF07XG4gIH1cblxuICBzZXREYXRhKHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNBbGxvY2F0ZWQoKSB8fFxuICAgICAgIXRoaXMuY29udGFpbnMoeCwgeSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9yYXdEYXRhIVsoeXwwKSAqIHRoaXMuX3dpZHRoICsgKHh8MCldID0gdmFsdWU7XG4gIH1cblxufVxuXG5pbnRlcmZhY2UgQ2l0eUdlbmVyYXRvckNvbmZpZyB7XG4gIG1hcFNpemVJbkJsb2NrczogZ2xtLlJlYWRvbmx5VmVjMjsgLy8gZXggLT4gWzEyLCAxMl1cbiAgdGlsZVNpemU6IG51bWJlcjsgLy8gZXggLT4gMS4wXG4gIG5vaXNlOiB7XG4gICAgcm5nU2VlZDogbnVtYmVyOyAvLyBleCAtPiAxXG4gICAgcmVzb2x1dGlvbjogZ2xtLlJlYWRvbmx5VmVjMjsgLy8gZXggLT4gWzEwLCAxMF1cbiAgICBvY3RhdmVzOiBudW1iZXI7IC8vIGV4IC0+IDFcbiAgICBmcmVxdWVuY3k6IG51bWJlcjsgLy8gZXggLT4gMVxuICAgIGFtcGxpdHVkZTogbnVtYmVyOyAvLyBleCAtPiAwLjVcbiAgfTtcbiAgYnVpbGRpbmdTaXplOiBudW1iZXI7IC8vIGV4IC0+IDlcbiAgcm9hZFNpemU6IG51bWJlcjsgLy8gZXggLT4gNVxuICBwYXZlbWVudFNpemU6IG51bWJlcjsgLy8gZXggLT4gMlxuICBibHVlTWF4VmFsOiBudW1iZXI7IC8vIGV4IC0+IDUwO1xuICBncmVlbk1heFZhbDogbnVtYmVyOyAvLyBleCAtPiA1ODtcbn07XG5cbmludGVyZmFjZSBCdWlsZGluZ1Byb3Age1xuICBwb3NYOiBudW1iZXI7XG4gIHBvc1k6IG51bWJlcjtcbiAgdHlwZTogMCB8IDE7XG4gIHNpemVYOiBudW1iZXI7XG4gIHNpemVZOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBub2lzZVZhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZU1hcCB7XG5cbiAgcHJpdmF0ZSBfY29uZmlnOiBDaXR5R2VuZXJhdG9yQ29uZmlnID0ge1xuICAgIG1hcFNpemVJbkJsb2NrczogWzEyLCAxMl0sXG4gICAgdGlsZVNpemU6IDEuMCxcbiAgICBub2lzZToge1xuICAgICAgcm5nU2VlZDogMSxcbiAgICAgIHJlc29sdXRpb246IFsxMCwgMTBdLFxuICAgICAgb2N0YXZlczogMSxcbiAgICAgIGZyZXF1ZW5jeTogMSxcbiAgICAgIGFtcGxpdHVkZTogMC41LFxuICAgIH0sXG4gICAgYnVpbGRpbmdTaXplOiA5LFxuICAgIHJvYWRTaXplOiA1LFxuICAgIHBhdmVtZW50U2l6ZTogMixcbiAgICBibHVlTWF4VmFsOiA1MCxcbiAgICBncmVlbk1heFZhbDogNTgsXG4gIH1cblxuICAvLyAvLyAxMngxMiAtPiA0OHg0OCAoKzEgLT4gNDl4NDkpXG4gIC8vIHByaXZhdGUgX3RpbGVTaXplID0gMS4wO1xuXG4gIHByaXZhdGUgX2dyaWRCdWZmZXIgPSBuZXcgR3JpZEJ1ZmZlcigpO1xuXG4gIHByaXZhdGUgX2J1aWxkaW5nUHJvcHM6IEJ1aWxkaW5nUHJvcFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZ3JpZEJ1ZmZlci5hbGxvY2F0ZSgxMCwxMCk7XG4gIH1cblxuICBnZW5lcmF0ZUNpdHkoaW5UaWxlc1JlbmRlcmVyOiBUaWxlc1JlbmRlcmVyKSB7XG5cbiAgICBjb25zdCBub2lzZUJ1ZmZlciA9IG5ldyBHcmlkQnVmZmVyKCk7XG4gICAgbm9pc2VCdWZmZXIuYWxsb2NhdGUoMTIsIDEyKTtcblxuICAgIHtcbiAgICAgIGNvbnN0IHRtcFJuZyA9IG5ldyBEZXRlcm1pbmlzdGljUm5nKCk7XG4gICAgICB0bXBSbmcuc2V0U2VlZCgxKTtcblxuICAgICAgY29uc3Qgbm9pc2VJbnN0YW5jZSA9IG5ldyBDbGFzc2ljYWxOb2lzZSh7XG4gICAgICAgIHJhbmRvbUNhbGxiYWNrOiAoKSA9PiB0bXBSbmcucmFuZG9tKCksXG4gICAgICAgIG9jdGF2ZXM6IDEsXG4gICAgICAgIGZyZXF1ZW5jeTogMSxcbiAgICAgICAgYW1wbGl0dWRlOiAwLjVcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNvbHV0aW9uWCA9IDEwO1xuICAgICAgY29uc3QgcmVzb2x1dGlvblkgPSAxMDtcblxuICAgICAgZm9yIChsZXQgeXkgPSAwOyB5eSA8IG5vaXNlQnVmZmVyLmdldEhlaWdodCgpOyArK3l5KVxuICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IG5vaXNlQnVmZmVyLmdldFdpZHRoKCk7ICsreHgpIHtcbiAgICAgICAgY29uc3QgY29lZlkgPSB5eSAvIG5vaXNlQnVmZmVyLmdldEhlaWdodCgpICogcmVzb2x1dGlvblg7XG4gICAgICAgIGNvbnN0IGNvZWZYID0geHggLyBub2lzZUJ1ZmZlci5nZXRXaWR0aCgpICogcmVzb2x1dGlvblk7XG5cbiAgICAgICAgY29uc3QgcmF3Tm9pc2VWYWwgPSBub2lzZUluc3RhbmNlLmdldE5vaXNlKGNvZWZYLCBjb2VmWSwgMCk7IC8vIFstMS4uMV1cbiAgICAgICAgY29uc3Qgbm9pc2VWYWwgPSAocmF3Tm9pc2VWYWwgKyAxKSAqIDAuNTsgLy8gWzAuLjFdXG5cbiAgICAgICAgbm9pc2VCdWZmZXIuc2V0RGF0YSh4eCwgeXksIE1hdGguZmxvb3Iobm9pc2VWYWwgKiAxMDApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBidWlsZGluZ1NpemUgPSA5OyAvLyBUT0RPXG4gICAgY29uc3Qgcm9hZFNpemUgPSA1OyAvLyBUT0RPXG4gICAgY29uc3QgcGF2ZW1lbnRTaXplID0gMjsgLy8gVE9ET1xuXG4gICAgY29uc3QgYmxvY2tTaXplID0gYnVpbGRpbmdTaXplICsgcGF2ZW1lbnRTaXplICogMiArIHJvYWRTaXplO1xuICAgIGNvbnN0IHJlc1ggPSBibG9ja1NpemU7XG4gICAgY29uc3QgcmVzWSA9IGJsb2NrU2l6ZTtcblxuICAgIHRoaXMuX2dyaWRCdWZmZXIuYWxsb2NhdGUobm9pc2VCdWZmZXIuZ2V0V2lkdGgoKSAqIHJlc1ggKyByb2FkU2l6ZSwgbm9pc2VCdWZmZXIuZ2V0SGVpZ2h0KCkgKiByZXNZICsgMSk7XG5cbiAgICBjb25zdCBibHVlTWF4VmFsID0gNTA7XG4gICAgY29uc3QgZ3JlZW5NYXhWYWwgPSA1ODtcblxuICAgIHtcbiAgICAgIC8vIGRlZmF1bHQgdG8gcm9hZFxuICAgICAgdGhpcy5fbWFrZVJlY3QoWzAsIDBdLCBbdGhpcy5fZ3JpZEJ1ZmZlci5nZXRXaWR0aCgpLHRoaXMuX2dyaWRCdWZmZXIuZ2V0SGVpZ2h0KCldLCAyKTsgLy8gYmxhY2sgKHJvYWQpXG4gICAgfVxuXG4gICAge1xuICAgICAgLy8gYWRkIHBhdmVtZW50IHJlY3RzXG4gICAgICBmb3IgKGxldCB5eSA9IDA7IHl5IDwgbm9pc2VCdWZmZXIuZ2V0SGVpZ2h0KCk7ICsreXkpXG4gICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbm9pc2VCdWZmZXIuZ2V0V2lkdGgoKTsgKyt4eCkge1xuXG4gICAgICAgIGNvbnN0IHBvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFtcbiAgICAgICAgICB4eCAqIGJsb2NrU2l6ZSArIHJvYWRTaXplLFxuICAgICAgICAgIHl5ICogYmxvY2tTaXplICsgcm9hZFNpemUsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX21ha2VSZWN0KHBvcywgW2J1aWxkaW5nU2l6ZSArIHBhdmVtZW50U2l6ZSoyLGJ1aWxkaW5nU2l6ZSArIHBhdmVtZW50U2l6ZSoyXSwgMyk7IC8vIGdyYXkgKHBhdmVtZW50KVxuICAgICAgfVxuICAgIH1cblxuICAgIHtcblxuICAgICAgLy8gYWRkIGJ1aWxkaW5nIHJlY3RzXG4gICAgICBmb3IgKGxldCB5eSA9IDA7IHl5IDwgbm9pc2VCdWZmZXIuZ2V0SGVpZ2h0KCk7ICsreXkpXG4gICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbm9pc2VCdWZmZXIuZ2V0V2lkdGgoKTsgKyt4eCkge1xuICAgICAgICBjb25zdCBub2lzZVZhbCA9IG5vaXNlQnVmZmVyLmdldERhdGEoeHgsIHl5KTtcblxuICAgICAgICBjb25zdCBwb3M6IGdsbS52ZWMyID0gW1xuICAgICAgICAgIHh4ICogYmxvY2tTaXplICsgcm9hZFNpemUgKyBwYXZlbWVudFNpemUsXG4gICAgICAgICAgeXkgKiBibG9ja1NpemUgKyByb2FkU2l6ZSArIHBhdmVtZW50U2l6ZSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2l6ZTogZ2xtLnZlYzIgPSBbXG4gICAgICAgICAgYnVpbGRpbmdTaXplLFxuICAgICAgICAgIGJ1aWxkaW5nU2l6ZSxcbiAgICAgICAgXTtcblxuICAgICAgICBpZiAobm9pc2VWYWwgPj0gYmx1ZU1heFZhbCAmJiBub2lzZVZhbCA8PSBncmVlbk1heFZhbCkge1xuICAgICAgICAgIC8vIHRoaXMuX21ha2VSZWN0KHBvcywgc2l6ZSwgNCk7IC8vIGdyZWVuXG4gICAgICAgICAgdGhpcy5fbWFrZVJlY3QocG9zLCBzaXplLCA1KTsgLy8gYnJvd25cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9pc2VWYWwgPiBncmVlbk1heFZhbCkge1xuICAgICAgICAgIC8vIHRoaXMuX21ha2VSZWN0KHBvcywgc2l6ZSwgNSk7IC8vIHJlZFxuXG4gICAgICAgICAgdGhpcy5fYnVpbGRpbmdQcm9wcy5wdXNoKHtcbiAgICAgICAgICAgIC8vIHBvc1g6IHh4ICogYmxvY2tTaXplICsgKGJsb2NrU2l6ZStyb2FkU2l6ZSkgKiAwLjUsXG4gICAgICAgICAgICAvLyBwb3NZOiB5eSAqIGJsb2NrU2l6ZSArIChibG9ja1NpemUrcm9hZFNpemUpICogMC41LFxuICAgICAgICAgICAgcG9zWDogcG9zWzBdICsgc2l6ZVswXSAqIDAuNSxcbiAgICAgICAgICAgIHBvc1k6IHBvc1sxXSArIHNpemVbMV0gKiAwLjUsXG4gICAgICAgICAgICBzaXplWDogc2l6ZVswXSxcbiAgICAgICAgICAgIHNpemVZOiBzaXplWzFdLFxuICAgICAgICAgICAgaGVpZ2h0OiBidWlsZGluZ1NpemUgKiAzLFxuICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgIG5vaXNlVmFsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0bXBSbmcgPSBuZXcgRGV0ZXJtaW5pc3RpY1JuZygpO1xuICAgICAgICB0bXBSbmcuc2V0U2VlZChNYXRoLmZsb29yKG5vaXNlVmFsICogMTAwKSk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRYID0gTWF0aC5yb3VuZCh0bXBSbmcucmFuZG9tKCkgKiAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRZID0gTWF0aC5yb3VuZCh0bXBSbmcucmFuZG9tKCkgKiAxKTtcbiAgICAgICAgY29uc3Qgc3RvcFggPSBNYXRoLnJvdW5kKHRtcFJuZy5yYW5kb20oKSAqIDEpO1xuICAgICAgICBjb25zdCBzdG9wWSA9IE1hdGgucm91bmQodG1wUm5nLnJhbmRvbSgpICogMSk7XG4gICAgICAgIGNvbnN0IGV4dHJhSGVpZ2h0ID0gTWF0aC5yb3VuZCh0bXBSbmcucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgICAgcG9zWzBdICs9IHN0YXJ0WDtcbiAgICAgICAgc2l6ZVswXSAtPSBzdGFydFg7XG4gICAgICAgIHNpemVbMF0gLT0gc3RvcFg7XG5cbiAgICAgICAgcG9zWzFdICs9IHN0YXJ0WTtcbiAgICAgICAgc2l6ZVsxXSAtPSBzdGFydFk7XG4gICAgICAgIHNpemVbMV0gLT0gc3RvcFk7XG5cbiAgICAgICAgaWYgKG5vaXNlVmFsIDwgYmx1ZU1heFZhbCkge1xuICAgICAgICAgIC8vIHRoaXMuX21ha2VSZWN0KHBvcywgc2l6ZSwgNSk7IC8vIGJsdWVcblxuICAgICAgICAgIHRoaXMuX2J1aWxkaW5nUHJvcHMucHVzaCh7XG4gICAgICAgICAgICAvLyBwb3NYOiB4eCAqIGJsb2NrU2l6ZSArIChibG9ja1NpemUrcm9hZFNpemUpICogMC41LFxuICAgICAgICAgICAgLy8gcG9zWTogeXkgKiBibG9ja1NpemUgKyAoYmxvY2tTaXplK3JvYWRTaXplKSAqIDAuNSxcbiAgICAgICAgICAgIHBvc1g6IHBvc1swXSArIHNpemVbMF0gKiAwLjUsXG4gICAgICAgICAgICBwb3NZOiBwb3NbMV0gKyBzaXplWzFdICogMC41LFxuICAgICAgICAgICAgc2l6ZVg6IHNpemVbMF0sXG4gICAgICAgICAgICBzaXplWTogc2l6ZVsxXSxcbiAgICAgICAgICAgIGhlaWdodDogYnVpbGRpbmdTaXplICogMS4wICsgZXh0cmFIZWlnaHQsXG4gICAgICAgICAgICB0eXBlOiAwLFxuICAgICAgICAgICAgbm9pc2VWYWxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIGlmIChub2lzZVZhbCA+IGdyZWVuTWF4VmFsKSB7XG4gICAgICAgIC8vICAgdGhpcy5fbWFrZVJlY3QocG9zLCBzaXplLCA1KTsgLy8gcmVkXG5cbiAgICAgICAgLy8gICB0aGlzLl9idWlsZGluZ1Byb3BzLnB1c2goe1xuICAgICAgICAvLyAgICAgLy8gcG9zWDogeHggKiBibG9ja1NpemUgKyAoYmxvY2tTaXplK3JvYWRTaXplKSAqIDAuNSxcbiAgICAgICAgLy8gICAgIC8vIHBvc1k6IHl5ICogYmxvY2tTaXplICsgKGJsb2NrU2l6ZStyb2FkU2l6ZSkgKiAwLjUsXG4gICAgICAgIC8vICAgICBwb3NYOiBwb3NbMF0gKyBzaXplWzBdICogMC41LFxuICAgICAgICAvLyAgICAgcG9zWTogcG9zWzFdICsgc2l6ZVsxXSAqIDAuNSxcbiAgICAgICAgLy8gICAgIHNpemVYOiBzaXplWzBdLFxuICAgICAgICAvLyAgICAgc2l6ZVk6IHNpemVbMV0sXG4gICAgICAgIC8vICAgICBoZWlnaHQ6IGJ1aWxkaW5nU2l6ZSAqIDMsXG4gICAgICAgIC8vICAgICB0eXBlOiAxLFxuICAgICAgICAvLyAgICAgbm9pc2VWYWxcbiAgICAgICAgLy8gICB9KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgLy8gbWVyZ2UgZGlydCByZWN0c1xuXG4gICAgICBjb25zdCB0bXBSbmcgPSBuZXcgRGV0ZXJtaW5pc3RpY1JuZygpO1xuICAgICAgdG1wUm5nLnNldFNlZWQoMSk7XG5cbiAgICAgIGNvbnN0IGFsbENvb3JkczogW2dsbS52ZWMyLCBnbG0udmVjMl1bXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB5eSA9IDA7IHl5IDwgbm9pc2VCdWZmZXIuZ2V0SGVpZ2h0KCk7ICsreXkpXG4gICAgICBmb3IgKGxldCB4eCA9IDA7IHh4IDwgbm9pc2VCdWZmZXIuZ2V0V2lkdGgoKTsgKyt4eCkge1xuICAgICAgICBjb25zdCBub2lzZVZhbCA9IG5vaXNlQnVmZmVyLmdldERhdGEoeHgsIHl5KTtcblxuICAgICAgICBpZiAobm9pc2VWYWwgPCBibHVlTWF4VmFsIHx8IG5vaXNlVmFsID4gZ3JlZW5NYXhWYWwpIHtcbiAgICAgICAgICBjb250aW51ZTsgLy8gbm90IGEgZGlydCBwYXRjaCAtPiBza2lwXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpYWdvbmFsID0gZmFsc2U7XG4gICAgICAgIGlmICh4eCA+IDApIHtcbiAgICAgICAgICBjb25zdCB0bXBOb2lzZVZhbCA9IG5vaXNlQnVmZmVyLmdldERhdGEoeHggLSAxLCB5eSk7XG4gICAgICAgICAgaWYgKHRtcE5vaXNlVmFsID49IGJsdWVNYXhWYWwgJiYgdG1wTm9pc2VWYWwgPD0gZ3JlZW5NYXhWYWwpIHtcbiAgICAgICAgICAgIGhvcml6b250YWwgPSB0cnVlOyAvLyBpcyBhIGRpcnQgcGF0Y2hcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeXkgPiAwKSB7XG4gICAgICAgICAgY29uc3QgdG1wTm9pc2VWYWwgPSBub2lzZUJ1ZmZlci5nZXREYXRhKHh4LCB5eSAtIDEpO1xuICAgICAgICAgIGlmICh0bXBOb2lzZVZhbCA+PSBibHVlTWF4VmFsICYmIHRtcE5vaXNlVmFsIDw9IGdyZWVuTWF4VmFsKSB7XG4gICAgICAgICAgICB2ZXJ0aWNhbCA9IHRydWU7IC8vIGlzIGEgZGlydCBwYXRjaFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3Jpem9udGFsICYmIHZlcnRpY2FsKSB7XG4gICAgICAgICAgY29uc3QgdG1wTm9pc2VWYWwgPSBub2lzZUJ1ZmZlci5nZXREYXRhKHh4IC0gMSwgeXkgLSAxKTtcbiAgICAgICAgICBpZiAodG1wTm9pc2VWYWwgPj0gYmx1ZU1heFZhbCAmJiB0bXBOb2lzZVZhbCA8PSBncmVlbk1heFZhbCkge1xuICAgICAgICAgICAgZGlhZ29uYWwgPSB0cnVlOyAvLyBpcyBhIGRpcnQgcGF0Y2hcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlhZ29uYWwpIHtcbiAgICAgICAgICBhbGxDb29yZHMucHVzaChbIFt4eCx5eV0sIFsyLDJdIF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2UgaWYgKGhvcml6b250YWwgJiYgdmVydGljYWwpIHtcbiAgICAgICAgLy8gICAvLyByYW5kb21seSBzZWxlY3Qgb25lXG4gICAgICAgIC8vICAgaWYgKHRtcFJuZy5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAvLyAgICAgYWxsQ29vcmRzLnB1c2goWyBbeHgseXldLCBbMiwxXSBdKTsgLy8gaG9yaXpvbnRhbFxuICAgICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBhbGxDb29yZHMucHVzaChbIFt4eCx5eV0sIFsxLDJdIF0pOyAvLyB2ZXJ0aWNhbFxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgYWxsQ29vcmRzLnB1c2goWyBbeHgseXldLCBbMiwxXSBdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgICAgICBhbGxDb29yZHMucHVzaChbIFt4eCx5eV0sIFsxLDJdIF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHBhdmVtZW50IHBhdGNoZXNcblxuICAgICAgZm9yIChjb25zdCBjdXJyQ29vcmQgb2YgYWxsQ29vcmRzKSB7XG5cbiAgICAgICAgY29uc3QgcmF3UG9zID0gY3VyckNvb3JkWzBdO1xuICAgICAgICBjb25zdCByYXdTaXplID0gY3VyckNvb3JkWzFdO1xuXG4gICAgICAgIGNvbnN0IHBvczogZ2xtLnZlYzIgPSBbXG4gICAgICAgICAgcmF3UG9zWzBdICogYmxvY2tTaXplICsgcm9hZFNpemUsXG4gICAgICAgICAgcmF3UG9zWzFdICogYmxvY2tTaXplICsgcm9hZFNpemUsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNpemU6IGdsbS52ZWMyID0gW2J1aWxkaW5nU2l6ZSArIHBhdmVtZW50U2l6ZSAqIDIsIGJ1aWxkaW5nU2l6ZSArIHBhdmVtZW50U2l6ZSAqIDJdO1xuXG4gICAgICAgIGlmIChyYXdTaXplWzBdID4gMSkge1xuICAgICAgICAgIHBvc1swXSA9IChyYXdQb3NbMF0gLSAxKSAqIGJsb2NrU2l6ZSArIHJvYWRTaXplO1xuICAgICAgICAgIHNpemVbMF0gKz0gYmxvY2tTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhd1NpemVbMV0gPiAxKSB7XG4gICAgICAgICAgcG9zWzFdID0gKHJhd1Bvc1sxXSAtIDEpICogYmxvY2tTaXplICsgcm9hZFNpemU7XG4gICAgICAgICAgc2l6ZVsxXSArPSBibG9ja1NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYWtlUmVjdChwb3MsIHNpemUsIDMpOyAvLyBncmF5XG4gICAgICB9XG5cblxuICAgICAgLy8gc2V0IGRpcnQgcGF0Y2hlc1xuXG4gICAgICBmb3IgKGNvbnN0IGN1cnJDb29yZCBvZiBhbGxDb29yZHMpIHtcblxuICAgICAgICBjb25zdCByYXdQb3MgPSBjdXJyQ29vcmRbMF07XG4gICAgICAgIGNvbnN0IHJhd1NpemUgPSBjdXJyQ29vcmRbMV07XG5cbiAgICAgICAgY29uc3QgcG9zOiBnbG0udmVjMiA9IFtcbiAgICAgICAgICByYXdQb3NbMF0gKiBibG9ja1NpemUgKyByb2FkU2l6ZSArIHBhdmVtZW50U2l6ZSxcbiAgICAgICAgICByYXdQb3NbMV0gKiBibG9ja1NpemUgKyByb2FkU2l6ZSArIHBhdmVtZW50U2l6ZSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2l6ZTogZ2xtLnZlYzIgPSBbYnVpbGRpbmdTaXplLCBidWlsZGluZ1NpemVdO1xuXG4gICAgICAgIGlmIChyYXdTaXplWzBdID4gMSkge1xuICAgICAgICAgIHBvc1swXSA9IChyYXdQb3NbMF0gLSAxKSAqIGJsb2NrU2l6ZSArIHJvYWRTaXplICsgcGF2ZW1lbnRTaXplO1xuICAgICAgICAgIHNpemVbMF0gKz0gYmxvY2tTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhd1NpemVbMV0gPiAxKSB7XG4gICAgICAgICAgcG9zWzFdID0gKHJhd1Bvc1sxXSAtIDEpICogYmxvY2tTaXplICsgcm9hZFNpemUgKyBwYXZlbWVudFNpemU7XG4gICAgICAgICAgc2l6ZVsxXSArPSBibG9ja1NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYWtlUmVjdChwb3MsIHNpemUsIDUpOyAvLyBicm93blxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gZm9yIChsZXQgeXkgPSAwOyB5eSA8IG5vaXNlQnVmZmVyLmdldEhlaWdodCgpOyArK3l5KVxuICAgIC8vIGZvciAobGV0IHh4ID0gMDsgeHggPCBub2lzZUJ1ZmZlci5nZXRXaWR0aCgpOyArK3h4KSB7XG4gICAgLy8gICBjb25zdCBub2lzZVZhbCA9IG5vaXNlQnVmZmVyLmdldERhdGEoeHgsIHl5KTtcblxuICAgIC8vICAgaWYgKG5vaXNlVmFsIDwgYmx1ZU1heFZhbCkge1xuICAgIC8vICAgICB0aGlzLl9idWlsZGluZ1Byb3BzLnB1c2goe1xuICAgIC8vICAgICAgIHBvc1g6IHh4ICogYmxvY2tTaXplICsgKGJsb2NrU2l6ZStyb2FkU2l6ZSkgKiAwLjUsXG4gICAgLy8gICAgICAgcG9zWTogeXkgKiBibG9ja1NpemUgKyAoYmxvY2tTaXplK3JvYWRTaXplKSAqIDAuNSxcbiAgICAvLyAgICAgICBzaXplOiBidWlsZGluZ1NpemUsXG4gICAgLy8gICAgICAgaGVpZ2h0OiBidWlsZGluZ1NpemUgKiAxLjI1LFxuICAgIC8vICAgICAgIHR5cGU6IDAsXG4gICAgLy8gICAgICAgbm9pc2VWYWxcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gICBlbHNlIGlmIChub2lzZVZhbCA+IGdyZWVuTWF4VmFsKSB7XG4gICAgLy8gICAgIHRoaXMuX2J1aWxkaW5nUHJvcHMucHVzaCh7XG4gICAgLy8gICAgICAgcG9zWDogeHggKiBibG9ja1NpemUgKyAoYmxvY2tTaXplK3JvYWRTaXplKSAqIDAuNSxcbiAgICAvLyAgICAgICBwb3NZOiB5eSAqIGJsb2NrU2l6ZSArIChibG9ja1NpemUrcm9hZFNpemUpICogMC41LFxuICAgIC8vICAgICAgIHNpemU6IGJ1aWxkaW5nU2l6ZSxcbiAgICAvLyAgICAgICBoZWlnaHQ6IGJ1aWxkaW5nU2l6ZSAqIDMsXG4gICAgLy8gICAgICAgdHlwZTogMSxcbiAgICAvLyAgICAgICBub2lzZVZhbFxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICB0aGlzLl9zZXR1cEdlb21ldHJ5KGluVGlsZXNSZW5kZXJlcik7XG4gIH1cblxuICBwcml2YXRlIF9tYWtlUmVjdChwb3M6IGdsbS5SZWFkb25seVZlYzIsIHNpemU6IGdsbS5SZWFkb25seVZlYzIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCB5eSA9IHBvc1sxXTsgeXkgPCBwb3NbMV0rc2l6ZVsxXTsgKyt5eSlcbiAgICBmb3IgKGxldCB4eCA9IHBvc1swXTsgeHggPCBwb3NbMF0rc2l6ZVswXTsgKyt4eCkge1xuICAgICAgdGhpcy5fZ3JpZEJ1ZmZlci5zZXREYXRhKHh4LCB5eSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdlbmVyYXRlSnVuZ2xlKCkge1xuXG4gIC8vICAgY29uc3QgdG1wUm5nID0gbmV3IERldGVybWluaXN0aWNSbmcoKTtcbiAgLy8gICB0bXBSbmcuc2V0U2VlZCgxKTtcblxuICAvLyAgIGNvbnN0IG5vaXNlSW5zdGFuY2UgPSBuZXcgQ2xhc3NpY2FsTm9pc2Uoe1xuICAvLyAgICAgcmFuZG9tQ2FsbGJhY2s6ICgpID0+IHRtcFJuZy5yYW5kb20oKSxcbiAgLy8gICAgIG9jdGF2ZXM6IDEsXG4gIC8vICAgICBmcmVxdWVuY3k6IDEsXG4gIC8vICAgICBhbXBsaXR1ZGU6IDAuNVxuICAvLyAgIH0pO1xuXG4gIC8vICAgY29uc3QgcmVzb2x1dGlvbiA9IDExO1xuICAvLyAgIGNvbnN0IHdhdGVyVGhyZXNob2xkID0gMC40MjtcbiAgLy8gICBjb25zdCByb2NrVGhyZXNob2xkID0gMC41NTtcblxuICAvLyAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB0aGlzLl9oZWlnaHQ7ICsreXkpXG4gIC8vICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IHRoaXMuX3dpZHRoOyArK3h4KSB7XG5cbiAgLy8gICAgIGNvbnN0IGNvZWZZID0geXkgLyB0aGlzLl9oZWlnaHQgKiByZXNvbHV0aW9uO1xuICAvLyAgICAgY29uc3QgY29lZlggPSB4eCAvIHRoaXMuX3dpZHRoICogcmVzb2x1dGlvbjtcblxuICAvLyAgICAgY29uc3QgcmF3Tm9pc2VWYWwgPSBub2lzZUluc3RhbmNlLmdldE5vaXNlKGNvZWZYLCBjb2VmWSwgMCk7IC8vIFstMS4uMV1cbiAgLy8gICAgIGNvbnN0IG5vaXNlVmFsID0gKHJhd05vaXNlVmFsICsgMSkgKiAwLjU7IC8vIFswLi4xXVxuXG4gIC8vICAgICBpZiAobm9pc2VWYWwgPCB3YXRlclRocmVzaG9sZCkge1xuICAvLyAgICAgICB0aGlzLl9yYXdEYXRhW3l5ICogdGhpcy5fd2lkdGggKyB4eF0gPSAyO1xuICAvLyAgICAgfVxuICAvLyAgICAgZWxzZSBpZiAobm9pc2VWYWwgPiByb2NrVGhyZXNob2xkKSB7XG4gIC8vICAgICAgIHRoaXMuX3Jhd0RhdGFbeXkgKiB0aGlzLl93aWR0aCArIHh4XSA9IDE7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBHZW9tZXRyeShpblRpbGVzUmVuZGVyZXI6IFRpbGVzUmVuZGVyZXIpIHtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgY29uc3QgY2VsbHNNYXRyaXhIOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSA9IFswLDAsMCwwLDAsMCwwXTtcbiAgICBjb25zdCBjZWxsc01hdHJpeFY6IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdID0gWzAsMCwwLDAsMCwwLDBdO1xuXG4gICAgY29uc3QgX2NvbXBhcmVDZWxsMk1hdHJpeCA9IChcbiAgICAgIHJvd0g6IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLFxuICAgICAgcm93VjogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sXG4gICAgKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChyb3dIWzBdIDwgMCB8fCByb3dIWzBdID09PSBjZWxsc01hdHJpeEhbMF0pICYmXG4gICAgICAgIChyb3dIWzFdIDwgMCB8fCByb3dIWzFdID09PSBjZWxsc01hdHJpeEhbMV0pICYmXG4gICAgICAgIChyb3dIWzJdIDwgMCB8fCByb3dIWzJdID09PSBjZWxsc01hdHJpeEhbMl0pICYmXG4gICAgICAgIChyb3dIWzNdIDwgMCB8fCByb3dIWzNdID09PSBjZWxsc01hdHJpeEhbM10pICYmXG4gICAgICAgIChyb3dIWzRdIDwgMCB8fCByb3dIWzRdID09PSBjZWxsc01hdHJpeEhbNF0pICYmXG4gICAgICAgIChyb3dIWzVdIDwgMCB8fCByb3dIWzVdID09PSBjZWxsc01hdHJpeEhbNV0pICYmXG4gICAgICAgIChyb3dIWzZdIDwgMCB8fCByb3dIWzZdID09PSBjZWxsc01hdHJpeEhbNl0pXG4gICAgICAgICYmXG4gICAgICAgIChyb3dWWzBdIDwgMCB8fCByb3dWWzBdID09PSBjZWxsc01hdHJpeFZbMF0pICYmXG4gICAgICAgIChyb3dWWzFdIDwgMCB8fCByb3dWWzFdID09PSBjZWxsc01hdHJpeFZbMV0pICYmXG4gICAgICAgIChyb3dWWzJdIDwgMCB8fCByb3dWWzJdID09PSBjZWxsc01hdHJpeFZbMl0pICYmXG4gICAgICAgIChyb3dWWzNdIDwgMCB8fCByb3dWWzNdID09PSBjZWxsc01hdHJpeFZbM10pICYmXG4gICAgICAgIChyb3dWWzRdIDwgMCB8fCByb3dWWzRdID09PSBjZWxsc01hdHJpeFZbNF0pICYmXG4gICAgICAgIChyb3dWWzVdIDwgMCB8fCByb3dWWzVdID09PSBjZWxsc01hdHJpeFZbNV0pICYmXG4gICAgICAgIChyb3dWWzZdIDwgMCB8fCByb3dWWzZdID09PSBjZWxsc01hdHJpeFZbNl0pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgY29uc3QgY2VsbHNNYXRyaXg6IFtudW1iZXIsbnVtYmVyLG51bWJlciwgbnVtYmVyLG51bWJlcixudW1iZXIsIG51bWJlcixudW1iZXIsbnVtYmVyXSA9IFswLDAsMCwwLDAsMCwwLDAsMF07XG5cbiAgICBjb25zdCBfY29tcGFyZUNlbGxNYXRyaXggPSAoXG4gICAgICByb3cwOiBbbnVtYmVyLG51bWJlcixudW1iZXJdLFxuICAgICAgcm93MTogW251bWJlcixudW1iZXIsbnVtYmVyXSxcbiAgICAgIHJvdzI6IFtudW1iZXIsbnVtYmVyLG51bWJlcl1cbiAgICApID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKHJvdzBbMF0gPCAwIHx8IHJvdzBbMF0gPT09IGNlbGxzTWF0cml4WzAqMyArIDBdKSAmJlxuICAgICAgICAocm93MFsxXSA8IDAgfHwgcm93MFsxXSA9PT0gY2VsbHNNYXRyaXhbMCozICsgMV0pICYmXG4gICAgICAgIChyb3cwWzJdIDwgMCB8fCByb3cwWzJdID09PSBjZWxsc01hdHJpeFswKjMgKyAyXSkgJiZcbiAgICAgICAgKHJvdzFbMF0gPCAwIHx8IHJvdzFbMF0gPT09IGNlbGxzTWF0cml4WzEqMyArIDBdKSAmJlxuICAgICAgICAocm93MVsxXSA8IDAgfHwgcm93MVsxXSA9PT0gY2VsbHNNYXRyaXhbMSozICsgMV0pICYmXG4gICAgICAgIChyb3cxWzJdIDwgMCB8fCByb3cxWzJdID09PSBjZWxsc01hdHJpeFsxKjMgKyAyXSkgJiZcbiAgICAgICAgKHJvdzJbMF0gPCAwIHx8IHJvdzJbMF0gPT09IGNlbGxzTWF0cml4WzIqMyArIDBdKSAmJlxuICAgICAgICAocm93MlsxXSA8IDAgfHwgcm93MlsxXSA9PT0gY2VsbHNNYXRyaXhbMiozICsgMV0pICYmXG4gICAgICAgIChyb3cyWzJdIDwgMCB8fCByb3cyWzJdID09PSBjZWxsc01hdHJpeFsyKjMgKyAyXSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vXG5cbiAgICBpblRpbGVzUmVuZGVyZXIuY2xlYXIoKTtcblxuICAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB0aGlzLl9ncmlkQnVmZmVyLmdldEhlaWdodCgpOyArK3l5KVxuICAgIGZvciAobGV0IHh4ID0gMDsgeHggPCB0aGlzLl9ncmlkQnVmZmVyLmdldFdpZHRoKCk7ICsreHgpIHtcblxuICAgICAgY29uc3QgY2VsbFZhbHVlID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4LCB5eSk7XG5cbiAgICAgIC8vIGNvbnN0IHRtcFNjYWxlID0gdGhpcy5fY29uZmlnLnRpbGVTaXplICogMC45O1xuICAgICAgY29uc3QgdG1wU2NhbGUgPSB0aGlzLl9jb25maWcudGlsZVNpemUgKiAxLjA7XG5cbiAgICAgIGNvbnN0IHRtcFBvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFtcbiAgICAgICAgeHggKiB0aGlzLl9jb25maWcudGlsZVNpemUgKyB0aGlzLl9jb25maWcudGlsZVNpemUgKiAwLjUsXG4gICAgICAgIHl5ICogdGhpcy5fY29uZmlnLnRpbGVTaXplICsgdGhpcy5fY29uZmlnLnRpbGVTaXplICogMC41XG4gICAgICBdO1xuXG4gICAgICBpZiAoY2VsbFZhbHVlID09PSAwKSB7XG4gICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbMCwwXSwgdG1wU2NhbGUpOyAvLyBibGFja1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2VsbFZhbHVlID09PSAxKSB7XG4gICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbMS84LDBdLCB0bXBTY2FsZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjZWxsVmFsdWUgPT09IDIpIHtcblxuICAgICAgICBjZWxsc01hdHJpeEhbMF0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgtMywgeXksICAyKSA9PSAyID8gMiA6IDA7XG4gICAgICAgIGNlbGxzTWF0cml4SFsxXSA9IHRoaXMuX2dyaWRCdWZmZXIuZ2V0RGF0YSh4eC0yLCB5eSwgIDIpID09IDIgPyAyIDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhIWzJdID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4LTEsIHl5LCAgMikgPT0gMiA/IDIgOiAwO1xuICAgICAgICBjZWxsc01hdHJpeEhbM10gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMCwgeXksICAyKSA9PSAyID8gMiA6IDA7XG4gICAgICAgIGNlbGxzTWF0cml4SFs0XSA9IHRoaXMuX2dyaWRCdWZmZXIuZ2V0RGF0YSh4eCsxLCB5eSwgIDIpID09IDIgPyAyIDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhIWzVdID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4KzIsIHl5LCAgMikgPT0gMiA/IDIgOiAwO1xuICAgICAgICBjZWxsc01hdHJpeEhbNl0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMywgeXksICAyKSA9PSAyID8gMiA6IDA7XG5cbiAgICAgICAgY2VsbHNNYXRyaXhWWzBdID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4LCB5eS0zLCAgMikgPT0gMiA/IDIgOiAwO1xuICAgICAgICBjZWxsc01hdHJpeFZbMV0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgsIHl5LTIsICAyKSA9PSAyID8gMiA6IDA7XG4gICAgICAgIGNlbGxzTWF0cml4VlsyXSA9IHRoaXMuX2dyaWRCdWZmZXIuZ2V0RGF0YSh4eCwgeXktMSwgIDIpID09IDIgPyAyIDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhWWzNdID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4LCB5eSswLCAgMikgPT0gMiA/IDIgOiAwO1xuICAgICAgICBjZWxsc01hdHJpeFZbNF0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgsIHl5KzEsICAyKSA9PSAyID8gMiA6IDA7XG4gICAgICAgIGNlbGxzTWF0cml4Vls1XSA9IHRoaXMuX2dyaWRCdWZmZXIuZ2V0RGF0YSh4eCwgeXkrMiwgIDIpID09IDIgPyAyIDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhWWzZdID0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXREYXRhKHh4LCB5eSszLCAgMikgPT0gMiA/IDIgOiAwO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBfY29tcGFyZUNlbGwyTWF0cml4KFxuICAgICAgICAgICAgWzAsMiwyLDIsMiwyLDBdLFxuICAgICAgICAgICAgWy0xLDIsMiwyLDIsMiwtMV0sXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzEvOCwxLzhdLCB0bXBTY2FsZSk7XG4gICAgICAgICAgdGhpcy5fZ3JpZEJ1ZmZlci5zZXREYXRhKHh4LCB5eSwgIDkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsMk1hdHJpeChcbiAgICAgICAgICAgIFstMSwyLDIsMiwyLDIsLTFdLFxuICAgICAgICAgICAgWzAsMiwyLDIsMiwyLDBdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFswLzgsMS84XSwgdG1wU2NhbGUpO1xuICAgICAgICAgIHRoaXMuX2dyaWRCdWZmZXIuc2V0RGF0YSh4eCwgeXksICA5KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbMi84LDBdLCB0bXBTY2FsZSk7XG4gICAgICAgIH1cblxuXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjZWxsVmFsdWUgPT09IDMpIHtcbiAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFszLzgsMF0sIHRtcFNjYWxlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNlbGxWYWx1ZSA9PT0gNCkge1xuICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzQvOCwwXSwgdG1wU2NhbGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2VsbFZhbHVlID09PSA1KSB7XG5cbiAgICAgICAgY2VsbHNNYXRyaXhbMCozICsgMF0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgtMSwgeXkrMSwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMCozICsgMV0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMCwgeXkrMSwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMCozICsgMl0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMSwgeXkrMSwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMSozICsgMF0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgtMSwgeXkrMCwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMSozICsgMV0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMCwgeXkrMCwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMSozICsgMl0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMSwgeXkrMCwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMiozICsgMF0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgtMSwgeXktMSwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMiozICsgMV0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMCwgeXktMSwgIDUpID09IDUgPyA1IDogMDtcbiAgICAgICAgY2VsbHNNYXRyaXhbMiozICsgMl0gPSB0aGlzLl9ncmlkQnVmZmVyLmdldERhdGEoeHgrMSwgeXktMSwgIDUpID09IDUgPyA1IDogMDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2VsbHNNYXRyaXgnLCBjZWxsc01hdHJpeClcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWy0xLCswLC0xXSxcbiAgICAgICAgICAgIFsrMCwrNSwrMF0sXG4gICAgICAgICAgICBbLTEsKzAsLTFdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs2LzgsMy84XSwgdG1wU2NhbGUpOyAvLyBicm93biAodW5pLWNlbGwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWys1LCs1LCs1XSxcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgICBbKzUsKzUsKzVdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs3LzgsMy84XSwgdG1wU2NhbGUpOyAvLyBicm93biAoZnVsbC1jZWxsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgIF9jb21wYXJlQ2VsbE1hdHJpeChcbiAgICAgICAgICAgIFstMSwrMCwtMV0sXG4gICAgICAgICAgICBbKzAsKzUsKzVdLFxuICAgICAgICAgICAgWy0xLCs1LCs1XSxcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbNi84LDYvOF0sIHRtcFNjYWxlKTsgLy8gYnJvd24gKG91dGVyLWNvcm5lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICBfY29tcGFyZUNlbGxNYXRyaXgoXG4gICAgICAgICAgICBbLTEsKzAsLTFdLFxuICAgICAgICAgICAgWys1LCs1LCswXSxcbiAgICAgICAgICAgIFsrNSwrNSwtMV0sXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzcvOCw2LzhdLCB0bXBTY2FsZSk7IC8vIGJyb3duIChvdXRlci1jb3JuZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWys1LCs1LC0xXSxcbiAgICAgICAgICAgIFsrNSwrNSwrMF0sXG4gICAgICAgICAgICBbLTEsKzAsLTFdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs3LzgsNy84XSwgdG1wU2NhbGUpOyAvLyBicm93biAob3V0ZXItY29ybmVyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgIF9jb21wYXJlQ2VsbE1hdHJpeChcbiAgICAgICAgICAgIFstMSwrNSwrNV0sXG4gICAgICAgICAgICBbKzAsKzUsKzVdLFxuICAgICAgICAgICAgWy0xLCswLC0xXSxcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbNi84LDcvOF0sIHRtcFNjYWxlKTsgLy8gYnJvd24gKG91dGVyLWNvcm5lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICBfY29tcGFyZUNlbGxNYXRyaXgoXG4gICAgICAgICAgICBbKzAsKzUsKzVdLFxuICAgICAgICAgICAgWys1LCs1LCs1XSxcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzYvOCw0LzhdLCB0bXBTY2FsZSk7IC8vIGJyb3duIChpbm5lci1jb3JuZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWys1LCs1LCs1XSxcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgICBbKzAsKzUsKzVdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs2LzgsNS84XSwgdG1wU2NhbGUpOyAvLyBicm93biAoaW5uZXItY29ybmVyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgIF9jb21wYXJlQ2VsbE1hdHJpeChcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgICBbKzUsKzUsKzVdLFxuICAgICAgICAgICAgWys1LCs1LCswXSxcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbNy84LDUvOF0sIHRtcFNjYWxlKTsgLy8gYnJvd24gKGlubmVyLWNvcm5lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICBfY29tcGFyZUNlbGxNYXRyaXgoXG4gICAgICAgICAgICBbKzUsKzUsKzBdLFxuICAgICAgICAgICAgWys1LCs1LCs1XSxcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzcvOCw0LzhdLCB0bXBTY2FsZSk7IC8vIGJyb3duIChpbm5lci1jb3JuZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWy0xLCswLC0xXSxcbiAgICAgICAgICAgIFsrNSwrNSwrNV0sXG4gICAgICAgICAgICBbKzUsKzUsKzVdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs0LzgsNi84XSwgdG1wU2NhbGUpOyAvLyBicm93biAoZWRnZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICBfY29tcGFyZUNlbGxNYXRyaXgoXG4gICAgICAgICAgICBbKzUsKzUsKzVdLFxuICAgICAgICAgICAgWys1LCs1LCs1XSxcbiAgICAgICAgICAgIFstMSwrMCwtMV0sXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzQvOCw3LzhdLCB0bXBTY2FsZSk7IC8vIGJyb3duIChlZGdlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgIF9jb21wYXJlQ2VsbE1hdHJpeChcbiAgICAgICAgICAgIFsrNSwrNSwtMV0sXG4gICAgICAgICAgICBbKzUsKzUsKzBdLFxuICAgICAgICAgICAgWys1LCs1LC0xXSxcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGluVGlsZXNSZW5kZXJlci5wdXNoSW5zdGFuY2UodG1wUG9zLCBbNS84LDcvOF0sIHRtcFNjYWxlKTsgLy8gYnJvd24gKGVkZ2UpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgX2NvbXBhcmVDZWxsTWF0cml4KFxuICAgICAgICAgICAgWy0xLCs1LCs1XSxcbiAgICAgICAgICAgIFsrMCwrNSwrNV0sXG4gICAgICAgICAgICBbLTEsKzUsKzVdLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs1LzgsNi84XSwgdG1wU2NhbGUpOyAvLyBicm93biAoZWRnZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBpblRpbGVzUmVuZGVyZXIucHVzaEluc3RhbmNlKHRtcFBvcywgWzUvOCwwXSwgdG1wU2NhbGUpOyAvLyBicm93biAoZGVmYXVsdCBzcXVhcmUpXG4gICAgICAgICAgaW5UaWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZSh0bXBQb3MsIFs3LzgsMy84XSwgdG1wU2NhbGUpOyAvLyBicm93biAoZGVmYXVsdCBzcXVhcmUpXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcihpblJlbmRlcmVyOiBXZWJHTFJlbmRlcmVyLCBpblRpbGVzUmVuZGVyZXI6IFRpbGVzUmVuZGVyZXIsIHRpbGVTY2FsZTogbnVtYmVyKSB7XG5cbiAgICAvLyBpZiAoaW5UaWxlc1JlbmRlcmVyLmdldFNpemUoKSA9PT0gMCkge1xuICAgIC8vICAgdGhpcy5fc2V0dXBHZW9tZXRyeShpblRpbGVzUmVuZGVyZXIpO1xuICAgIC8vIH1cblxuICAgIGluVGlsZXNSZW5kZXJlci5mbHVzaChpblJlbmRlcmVyLm1haW5DYW1lcmEuZ2V0Q29tcG9zZWRNYXRyaXgoKSwgeyBkb05vdENsZWFyOiB0cnVlLCBzY2FsZTogdGlsZVNjYWxlIH0pO1xuXG4gICAgLy8gY29uc3QgZGVidWdaID0gMC4xO1xuXG4gICAgLy8gZm9yIChsZXQgeHggPSAwOyB4eCA8PSB0aGlzLl9ncmlkQnVmZmVyLmdldFdpZHRoKCk7ICsreHgpIHtcbiAgICAvLyAgIGluUmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoXG4gICAgLy8gICAgIFt4eCAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSwgdGhpcy5fZ3JpZEJ1ZmZlci5nZXRIZWlnaHQoKSAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSAqIDAsIGRlYnVnWl0sXG4gICAgLy8gICAgIFt4eCAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSwgdGhpcy5fZ3JpZEJ1ZmZlci5nZXRIZWlnaHQoKSAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSAqIDEsIGRlYnVnWl0sXG4gICAgLy8gICAgIFswLjQsMC40LDAuNF0pO1xuICAgIC8vIH1cblxuICAgIC8vIGZvciAobGV0IHl5ID0gMDsgeXkgPD0gdGhpcy5fZ3JpZEJ1ZmZlci5nZXRIZWlnaHQoKTsgKyt5eSkge1xuICAgIC8vICAgaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAvLyAgICAgW3RoaXMuX2dyaWRCdWZmZXIuZ2V0V2lkdGgoKSAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSAqIDAsIHl5ICogdGhpcy5fY29uZmlnLnRpbGVTaXplLCBkZWJ1Z1pdLFxuICAgIC8vICAgICBbdGhpcy5fZ3JpZEJ1ZmZlci5nZXRXaWR0aCgpICogdGhpcy5fY29uZmlnLnRpbGVTaXplICogMSwgeXkgKiB0aGlzLl9jb25maWcudGlsZVNpemUsIGRlYnVnWl0sXG4gICAgLy8gICAgIFswLjQsMC40LDAuNF0pO1xuICAgIC8vIH1cblxuICAgIGZvciAoY29uc3QgY3VyckJ1aWxkaW5nIG9mIHRoaXMuX2J1aWxkaW5nUHJvcHMpIHtcblxuICAgICAgLy8gY29uc3QgdG1wU2NhbGUgPSB0aGlzLl9jb25maWcudGlsZVNpemUgKiAwLjk7IC8vIGRlYnVnXG4gICAgICBjb25zdCB0bXBTY2FsZSA9IHRoaXMuX2NvbmZpZy50aWxlU2l6ZSAqIDEuMDsgLy8gcmVsZWFzZVxuXG4gICAgICBjb25zdCB0bXBTaXplWCA9IGN1cnJCdWlsZGluZy5zaXplWCAqIHRtcFNjYWxlO1xuICAgICAgY29uc3QgdG1wU2l6ZVkgPSBjdXJyQnVpbGRpbmcuc2l6ZVkgKiB0bXBTY2FsZTtcbiAgICAgIGlmIChjdXJyQnVpbGRpbmcudHlwZSA9PSAwKSB7XG5cbiAgICAgICAgaW5SZW5kZXJlci5nZW9tZXRyeVN0YWNrUmVuZGVyZXIucHVzaChcbiAgICAgICAgICBbY3VyckJ1aWxkaW5nLnBvc1ggKiB0aGlzLl9jb25maWcudGlsZVNpemUsIGN1cnJCdWlsZGluZy5wb3NZICogdGhpcy5fY29uZmlnLnRpbGVTaXplLCBjdXJyQnVpbGRpbmcuaGVpZ2h0ICogdGhpcy5fY29uZmlnLnRpbGVTaXplICogMC41XSxcbiAgICAgICAgICBbMCwwLDEsMF0sXG4gICAgICAgICAgWzAuNSwwLjUsMC41XSxcbiAgICAgICAgICBbdG1wU2l6ZVgsIHRtcFNpemVZLCBjdXJyQnVpbGRpbmcuaGVpZ2h0ICogdGhpcy5fY29uZmlnLnRpbGVTaXplXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGluUmVuZGVyZXIuZ2VvbWV0cnlTdGFja1JlbmRlcmVyLnB1c2goXG4gICAgICAgICAgW2N1cnJCdWlsZGluZy5wb3NYICogdGhpcy5fY29uZmlnLnRpbGVTaXplLCBjdXJyQnVpbGRpbmcucG9zWSAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSwgY3VyckJ1aWxkaW5nLmhlaWdodCAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZSAqIDAuNV0sXG4gICAgICAgICAgWzAsMCwxLDBdLFxuICAgICAgICAgIFswLjIsMC4yLDAuMl0sXG4gICAgICAgICAgW3RtcFNpemVYLCB0bXBTaXplWSwgY3VyckJ1aWxkaW5nLmhlaWdodCAqIHRoaXMuX2NvbmZpZy50aWxlU2l6ZV1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5SZW5kZXJlci5zdGFja1JlbmRlcmVycy5wdXNoTGluZShcbiAgICAgIC8vICAgW2N1cnJCdWlsZGluZy5wb3NYLCBjdXJyQnVpbGRpbmcucG9zWSwgMF0sXG4gICAgICAvLyAgIFtjdXJyQnVpbGRpbmcucG9zWCwgY3VyckJ1aWxkaW5nLnBvc1ksIGN1cnJCdWlsZGluZy5ub2lzZVZhbCAqIDAuMjVdLFxuICAgICAgLy8gICBbMSwxLDFdKTtcbiAgICB9XG5cblxuICB9XG5cbn07XG4iLAogICJleHBvcnQgZGVmYXVsdCBgXG4jdmVyc2lvbiAzMDAgZXNcblxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG51bmlmb3JtIG1hdDQgdV9jb21wb3NlZE1hdHJpeDtcbnVuaWZvcm0gZmxvYXQgdV9zY2FsZTtcblxuaW4gdmVjMiBhX3ZlcnRleF9wb3NpdGlvbjtcbmluIHZlYzIgYV92ZXJ0ZXhfdGV4Q29vcmQ7XG5pbiB2ZWMzIGFfb2Zmc2V0X3Bvc2l0aW9uO1xuaW4gdmVjMiBhX29mZnNldF90ZXhDb29yZDtcbmluIGZsb2F0IGFfb2Zmc2V0X3NjYWxlO1xuXG5vdXQgdmVjMiB2X3RleENvb3JkO1xuXG52b2lkIG1haW4odm9pZClcbntcbiAgdmVjMyBwb3NpdGlvbiA9IHZlYzMoYV92ZXJ0ZXhfcG9zaXRpb24sIDAuMCkgKiBhX29mZnNldF9zY2FsZSAqIHVfc2NhbGUgKyBhX29mZnNldF9wb3NpdGlvbjtcblxuICBnbF9Qb3NpdGlvbiA9IHVfY29tcG9zZWRNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xuXG4gIHZfdGV4Q29vcmQgPSBhX3ZlcnRleF90ZXhDb29yZCArIGFfb2Zmc2V0X3RleENvb3JkO1xufVxuYC50cmltKCk7IiwKICAiZXhwb3J0IGRlZmF1bHQgYFxuI3ZlcnNpb24gMzAwIGVzXG5cbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG51bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmU7XG5cbmluIHZlYzIgdl90ZXhDb29yZDtcblxub3V0IHZlYzQgb19jb2xvcjtcblxudm9pZCBtYWluKHZvaWQpXG57XG4gIHZlYzQgdGV4dHVyZUNvbG9yID0gdGV4dHVyZSh1X3RleHR1cmUsIHZfdGV4Q29vcmQpO1xuICBpZiAodGV4dHVyZUNvbG9yLmEgPCAwLjAxKVxuICB7XG4gICAgZGlzY2FyZDtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBvX2NvbG9yID0gdGV4dHVyZUNvbG9yO1xuICB9XG59XG5gLnRyaW0oKTsiLAogICJcbmltcG9ydCB7IHN5c3RlbSwgZ3JhcGhpY3MgfSBmcm9tICdAbG9jYWwtZnJhbWV3b3JrJztcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdGlsZXMtcmVuZGVyZXIuZ2xzbC52ZXJ0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdGlsZXMtcmVuZGVyZXIuZ2xzbC5mcmFnJztcblxuaW1wb3J0ICogYXMgZ2xtIGZyb20gJ2dsLW1hdHJpeCc7XG5cbmNvbnN0IGtfZ3JpZFNpemU6IGdsbS5SZWFkb25seVZlYzIgPSBbOCwgOF07XG5jb25zdCBrX3RleENvb3JkOiBnbG0uUmVhZG9ubHlWZWMyID0gWzEgLyBrX2dyaWRTaXplWzBdLCAxIC8ga19ncmlkU2l6ZVsxXV07XG5cbmNvbnN0IGtfYnVmZmVyU2l6ZSA9IDEwMjQgKiAxMDI0ICogMjA7IC8vIDIwTW9cblxuZXhwb3J0IGNsYXNzIFRpbGVzUmVuZGVyZXIge1xuXG4gIHByaXZhdGUgX3NoYWRlcjogZ3JhcGhpY3Mud2ViZ2wyLlNoYWRlclByb2dyYW07XG4gIHByaXZhdGUgX2dlb21ldHJ5OiBncmFwaGljcy53ZWJnbDIuR2VvbWV0cnlXcmFwcGVyLkdlb21ldHJ5O1xuICBwcml2YXRlIF90ZXh0dXJlOiBncmFwaGljcy53ZWJnbDIuSVVuYm91bmRUZXh0dXJlID0gbmV3IGdyYXBoaWNzLndlYmdsMi5UZXh0dXJlKCk7XG5cbiAgcHJpdmF0ZSBfYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShrX2J1ZmZlclNpemUpO1xuICBwcml2YXRlIF9jdXJyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuX3NoYWRlciA9IG5ldyBncmFwaGljcy53ZWJnbDIuU2hhZGVyUHJvZ3JhbSgnVGlsZXNSZW5kZXJlcicsIHtcbiAgICAgIHZlcnRleFNyYzogdmVydGV4U2hhZGVyLFxuICAgICAgZnJhZ21lbnRTcmM6IGZyYWdtZW50U2hhZGVyLFxuICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAnYV92ZXJ0ZXhfcG9zaXRpb24nLFxuICAgICAgICAnYV92ZXJ0ZXhfdGV4Q29vcmQnLFxuICAgICAgICAnYV9vZmZzZXRfcG9zaXRpb24nLFxuICAgICAgICAnYV9vZmZzZXRfdGV4Q29vcmQnLFxuICAgICAgICAnYV9vZmZzZXRfc2NhbGUnXG4gICAgICBdLFxuICAgICAgdW5pZm9ybXM6IFsndV9jb21wb3NlZE1hdHJpeCcsICd1X3RleHR1cmUnLCAndV9zY2FsZSddXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZW9CdWlsZGVyID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnlCdWlsZGVyKCk7XG4gICAgZ2VvQnVpbGRlclxuICAgICAgLnJlc2V0KClcbiAgICAgIC5zZXRQcmltaXRpdmVUeXBlKCd0cmlhbmdsZXMnKVxuICAgICAgLmFkZFZibygpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF9wb3NpdGlvbicsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX3ZlcnRleF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuc2V0U3RyaWRlKDQgKiA0KVxuICAgICAgLmFkZFZibygpXG4gICAgICAuc2V0VmJvQXNEeW5hbWljKClcbiAgICAgIC5zZXRWYm9Bc0luc3RhbmNlZCgpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9wb3NpdGlvbicsICd2ZWMzZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF90ZXhDb29yZCcsICd2ZWMyZicpXG4gICAgICAuYWRkVmJvQXR0cmlidXRlKCdhX29mZnNldF9zY2FsZScsICdmbG9hdCcpXG4gICAgICAuc2V0U3RyaWRlKDYgKiA0KTtcblxuICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IGdyYXBoaWNzLndlYmdsMi5HZW9tZXRyeVdyYXBwZXIuR2VvbWV0cnkoXG4gICAgICB0aGlzLl9zaGFkZXIsXG4gICAgICBnZW9CdWlsZGVyLmdldERlZigpXG4gICAgKTtcblxuICAgIHR5cGUgVmVydGV4ID0geyBwb3NpdGlvbjogZ2xtLlJlYWRvbmx5VmVjMjsgdGV4Q29vcmQ6IGdsbS5SZWFkb25seVZlYzIgfTtcblxuICAgIGNvbnN0IHZlcnRpY2VzOiBbVmVydGV4LCBWZXJ0ZXgsIFZlcnRleCwgVmVydGV4XSA9IFtcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsrMC41LCAtMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMSwga190ZXhDb29yZFsxXSAqIDFdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogWy0wLjUsIC0wLjVdLFxuICAgICAgICB0ZXhDb29yZDogW2tfdGV4Q29vcmRbMF0gKiAwLCBrX3RleENvb3JkWzFdICogMV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbKzAuNSwgKzAuNV0sXG4gICAgICAgIHRleENvb3JkOiBba190ZXhDb29yZFswXSAqIDEsIGtfdGV4Q29vcmRbMV0gKiAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcG9zaXRpb246IFstMC41LCArMC41XSxcbiAgICAgICAgdGV4Q29vcmQ6IFtrX3RleENvb3JkWzBdICogMCwga190ZXhDb29yZFsxXSAqIDBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGluZGljZXMgPSBbMSwgMCwgMiwgMSwgMiwgM107XG5cbiAgICBjb25zdCBsZXR0ZXJWZXJ0aWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGljZXMpIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHZlcnRpY2VzW2luZGV4XTtcbiAgICAgIGxldHRlclZlcnRpY2VzLnB1c2goXG4gICAgICAgIHZlcnRleC5wb3NpdGlvblswXSxcbiAgICAgICAgdmVydGV4LnBvc2l0aW9uWzFdLFxuICAgICAgICB2ZXJ0ZXgudGV4Q29vcmRbMF0sXG4gICAgICAgIHZlcnRleC50ZXhDb29yZFsxXVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9tZXRyeS5hbGxvY2F0ZUJ1ZmZlcigwLCBsZXR0ZXJWZXJ0aWNlcywgbGV0dGVyVmVydGljZXMubGVuZ3RoKTtcbiAgICB0aGlzLl9nZW9tZXRyeS5zZXRQcmltaXRpdmVDb3VudChsZXR0ZXJWZXJ0aWNlcy5sZW5ndGggLyA0KTtcblxuXG5cblxuICAgIGNvbnN0IHdpZHRoID0gODtcbiAgICBjb25zdCBoZWlnaHQgPSA4O1xuICAgIGNvbnN0IGltYWdlUGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KTtcbiAgICB7XG5cbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCB5eSA9IDA7IHl5IDwgaGVpZ2h0OyArK3l5KVxuICAgICAgZm9yIChsZXQgeHggPSAwOyB4eCA8IHdpZHRoOyArK3h4KSB7XG5cbiAgICAgICAgLy8gbGV0IGN1cnJWYWwgPSAoKCh4eCArIHl5KSAlIDIpID09IDApID8gMjU1IDogMTI4O1xuICAgICAgICAvLyBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAwXSA9IGN1cnJWYWw7XG4gICAgICAgIC8vIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDFdID0gY3VyclZhbDtcbiAgICAgICAgLy8gaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMl0gPSBjdXJyVmFsO1xuICAgICAgICAvLyBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAzXSA9IDI1NTtcbiAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMF0gPSAwO1xuICAgICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAxXSA9IDA7XG4gICAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDJdID0gMDtcbiAgICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgM10gPSAwO1xuICAgICAgICArK2luZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAwXSA9IDI1NSAqIDAuMDtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDFdID0gMjU1ICogMC41O1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMl0gPSAyNTUgKiAwLjA7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAzXSA9IDI1NTtcbiAgICB9XG4gICAge1xuICAgICAgbGV0IGluZGV4ID0gMTtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDBdID0gMjU1ICogMC4zO1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMV0gPSAyNTUgKiAwLjM7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAyXSA9IDI1NSAqIDAuMztcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDNdID0gMjU1O1xuICAgIH1cbiAgICB7XG4gICAgICBsZXQgaW5kZXggPSAyO1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMF0gPSAyNTUgKiAwLjA7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAxXSA9IDI1NSAqIDAuMDtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDJdID0gMjU1ICogMS4wO1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgM10gPSAyNTU7XG4gICAgfVxuICAgIHtcbiAgICAgIGxldCBpbmRleCA9IDM7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAwXSA9IDI1NSAqIDAuMTtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDFdID0gMjU1ICogMC4xO1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMl0gPSAyNTUgKiAwLjE7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAzXSA9IDI1NTtcbiAgICB9XG4gICAge1xuICAgICAgbGV0IGluZGV4ID0gNDtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDBdID0gMjU1ICogMC41O1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMV0gPSAyNTUgKiAwLjA7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAyXSA9IDI1NSAqIDAuMDtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDNdID0gMjU1O1xuICAgIH1cbiAgICB7XG4gICAgICBsZXQgaW5kZXggPSA1O1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgMF0gPSAyNTUgKiAwLjA7XG4gICAgICBpbWFnZVBpeGVsc1tpbmRleCAqIDQgKyAxXSA9IDI1NSAqIDAuMDtcbiAgICAgIGltYWdlUGl4ZWxzW2luZGV4ICogNCArIDJdID0gMjU1ICogMC41O1xuICAgICAgaW1hZ2VQaXhlbHNbaW5kZXggKiA0ICsgM10gPSAyNTU7XG4gICAgfVxuXG4gICAgdGhpcy5fdGV4dHVyZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5fdGV4dHVyZS5iaW5kKChib3VuZFRleHR1cmUpID0+IHtcbiAgICAgIGJvdW5kVGV4dHVyZS5sb2FkRnJvbU1lbW9yeSh3aWR0aCwgaGVpZ2h0LCBpbWFnZVBpeGVscyk7XG4gICAgICAvLyBib3VuZFRleHR1cmUubG9hZCgsKTtcbiAgICB9KTtcblxuICAgIGdyYXBoaWNzLmltYWdlcy5nZXRJbWFnZUZyb21VcmwoXCIuL2Fzc2V0cy9ncmFwaGljcy90ZXh0dXJlcy9zcHJpdGVzaGVldC5wbmdcIilcbiAgICAgIC50aGVuKChpbWcpID0+IHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZS5iaW5kKChib3VuZFRleHR1cmUpID0+IHtcbiAgICAgICAgICBib3VuZFRleHR1cmUubG9hZChpbWcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVzaEluc3RhbmNlKGluUG9zaXRpb246IGdsbS5SZWFkb25seVZlYzIsIGluVGV4Q29vcmQ6IGdsbS5SZWFkb25seVZlYzIsIGluU2NhbGU6IG51bWJlcikge1xuICAgIC8vIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDkgKiAxMCA+PSB0aGlzLl9idWZmZXIubGVuZ3RoKSB7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuICAgIGlmICh0aGlzLl9jdXJyZW50U2l6ZSArIDYgPj0gdGhpcy5fYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IHRleENvb3JkID0gdGhpcy5fdGV4Q29vcmRNYXAuZ2V0KGluQ2hhcmFjdGVyKTtcblxuICAgIC8vIGlmICghdGV4Q29vcmQpXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYGZhaWwgdG8gZmluZCBhIGxldHRlciwgbGV0dGVyPSR7aW5DaGFyYWN0ZXJ9YCk7XG5cbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblBvc2l0aW9uWzBdO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluUG9zaXRpb25bMV07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gMC4wO1xuICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IGluVGV4Q29vcmRbMF07XG4gICAgdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gaW5UZXhDb29yZFsxXTtcbiAgICAvLyB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSB0aGlzLl90ZXh0Q29sb3JbMF07XG4gICAgLy8gdGhpcy5fYnVmZmVyW3RoaXMuX2N1cnJlbnRTaXplKytdID0gdGhpcy5fdGV4dENvbG9yWzFdO1xuICAgIC8vIHRoaXMuX2J1ZmZlclt0aGlzLl9jdXJyZW50U2l6ZSsrXSA9IHRoaXMuX3RleHRDb2xvclsyXTtcbiAgICB0aGlzLl9idWZmZXJbdGhpcy5fY3VycmVudFNpemUrK10gPSBpblNjYWxlO1xuICB9XG5cbiAgZmx1c2goY29tcG9zZWRNYXRyaXg6IGdsbS5SZWFkb25seU1hdDQsIG9wdHM/OiB7IGRvTm90Q2xlYXI/OiBib29sZWFuOyBzY2FsZTogbnVtYmVyIH0pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuX3NoYWRlci5iaW5kKChib3VuZFNoYWRlcikgPT4ge1xuICAgICAgYm91bmRTaGFkZXIuc2V0TWF0cml4NFVuaWZvcm0oJ3VfY29tcG9zZWRNYXRyaXgnLCBjb21wb3NlZE1hdHJpeCk7XG5cbiAgICAgIGJvdW5kU2hhZGVyLnNldEZsb2F0MVVuaWZvcm0oJ3Vfc2NhbGUnLCBvcHRzPy5zY2FsZSA/PyAxLjApO1xuXG4gICAgICBib3VuZFNoYWRlci5zZXRUZXh0dXJlVW5pZm9ybSgndV90ZXh0dXJlJywgdGhpcy5fdGV4dHVyZSwgMCk7XG5cbiAgICAgIHRoaXMuX2dlb21ldHJ5LmFsbG9jYXRlQnVmZmVyKDEsIHRoaXMuX2J1ZmZlciwgdGhpcy5fY3VycmVudFNpemUpO1xuICAgICAgdGhpcy5fZ2VvbWV0cnkuc2V0SW5zdGFuY2VkQ291bnQodGhpcy5fY3VycmVudFNpemUgLyA2KTtcbiAgICAgIHRoaXMuX2dlb21ldHJ5LnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgZ3JhcGhpY3Mud2ViZ2wyLlRleHR1cmUudW5iaW5kKCk7XG5cbiAgICBjb25zdCBkb05vdENsZWFyID0gb3B0cz8uZG9Ob3RDbGVhciA9PT0gdHJ1ZTtcbiAgICBpZiAoIWRvTm90Q2xlYXIpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsZWFyKCk6IHRoaXMge1xuICAgIC8vIHJlc2V0IHZlcnRpY2VzXG4gICAgdGhpcy5fY3VycmVudFNpemUgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2l6ZTtcbiAgfVxuXG59O1xuIiwKICAiaW1wb3J0ICogYXMgY29uZmlndXJhdGlvbiBmcm9tICcuLi9jb25maWd1cmF0aW9uJztcblxuaW1wb3J0IHsgc3lzdGVtLCBncmFwaGljcyB9IGZyb20gJ0Bsb2NhbC1mcmFtZXdvcmsnO1xuXG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyIH0gZnJvbSAnLi9ncmFwaGljcy9XZWJHTFJlbmRlcmVyJztcblxuaW1wb3J0IHsgRnJhbWVQcm9maWxlciB9IGZyb20gJy4vdXRpbGl0aWVzL0ZyYW1lUHJvZmlsZXInO1xuXG5pbXBvcnQgeyBHYW1lTWFwIH0gZnJvbSAnLi9sb2dpYy9HYW1lTWFwJztcbmltcG9ydCB7IFRpbGVzUmVuZGVyZXIgfSBmcm9tICcuL2xvZ2ljL3RpbGVzLXJlbmRlcmVyL1RpbGVzUmVuZGVyZXInO1xuXG5pbXBvcnQgKiBhcyBnbG0gZnJvbSAnZ2wtbWF0cml4JztcblxuZXhwb3J0IGNsYXNzIFdlYkdMRXhwZXJpbWVudCB7XG4gIHByaXZhdGUgX2NhbnZhc0VsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyO1xuXG4gIHByaXZhdGUgX2ZyZWVGbHlDb250cm9sbGVyOiBzeXN0ZW0uY29udHJvbGxlcnMuRnJlZUZseUNvbnRyb2xsZXI7XG5cbiAgcHJpdmF0ZSBfZ2FtZU1hcCA9IG5ldyBHYW1lTWFwKCk7XG4gIHByaXZhdGUgX3RpbGVzUmVuZGVyZXI6IFRpbGVzUmVuZGVyZXI7XG5cbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZXJyb3JHcmFwaGljQ29udGV4dDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9jdXJyRnJhbWVUaW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuICBwcml2YXRlIF9mcmFtZVByb2ZpbGVyID0gbmV3IEZyYW1lUHJvZmlsZXIoKTtcblxuICBwcml2YXRlIF90aW1lOiBudW1iZXIgPSAwO1xuXG4gIHByaXZhdGUgX2RlYnVnU2NhbGVPbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLl9jYW52YXNFbGVtZW50ID0gY2FudmFzRWxlbWVudDtcblxuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzRG9tRWxlbWVudDogY2FudmFzRWxlbWVudFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZnJlZUZseUNvbnRyb2xsZXIgPSBuZXcgc3lzdGVtLmNvbnRyb2xsZXJzLkZyZWVGbHlDb250cm9sbGVyKHtcbiAgICAgIHBvc2l0aW9uOiBnbG0udmVjMy5mcm9tVmFsdWVzKDI1ICogMi4wLCAtMSAqIDIuMCwgMzAgKiAyLjApLFxuICAgICAgY29vcmRpbmF0ZXM6IFsnWCcsICdZJywgJ1onXSxcbiAgICAgIHRoZXRhOiBNYXRoLlBJICogMC41LFxuICAgICAgcGhpOiBNYXRoLlBJICogLTAuMzUsXG4gICAgICBtb3VzZVNlbnNpYmlsaXR5OiBjb25maWd1cmF0aW9uLmNvbnRyb2xsZXJNb3VzZVNlbnNpYmlsaXR5LFxuICAgICAgbW92aW5nU3BlZWQ6IGNvbmZpZ3VyYXRpb24uY29udHJvbGxlck1vdmluZ1NwZWVkLFxuICAgICAga2V5Ym9hcmRTZW5zaWJpbGl0eTogY29uZmlndXJhdGlvbi5jb250cm9sbGVyS2V5Ym9hcmRTZW5zaWJpbGl0eSxcbiAgICAgIHRvdWNoU2Vuc2liaWxpdHk6IGNvbmZpZ3VyYXRpb24uY29udHJvbGxlclRvdWNoU2Vuc2liaWxpdHlcbiAgICB9KTtcblxuICAgIC8vXG4gICAgLy9cblxuICAgIHtcbiAgICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbEtleWJvYXJkTWFuYWdlci5hY3RpdmF0ZSgpO1xuICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsVG91Y2hNYW5hZ2VyLmFjdGl2YXRlKHRoaXMuX2NhbnZhc0VsZW1lbnQpO1xuXG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuYWxsb3dQb2ludGVyTG9ja2VkT25DbGlja0V2ZW50KGNhbnZhc0VsZW1lbnQpO1xuICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsUG9pbnRlckxvY2tNYW5hZ2VyLmFkZE9uTG9ja0NoYW5nZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzTG9ja2VkID1cbiAgICAgICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuaXNQb2ludGVyTG9ja2VkKGNhbnZhc0VsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpc0xvY2tlZCkge1xuICAgICAgICAgIC8vIGdfbG9nZ2VyLmxvZygnVGhlIHBvaW50ZXIgbG9jayBzdGF0dXMgaXMgbm93IGxvY2tlZCcpO1xuXG4gICAgICAgICAgc3lzdGVtLmJyb3dzZXIuR2xvYmFsTW91c2VNYW5hZ2VyLmFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZ19sb2dnZXIubG9nKCdUaGUgcG9pbnRlciBsb2NrIHN0YXR1cyBpcyBub3cgdW5sb2NrZWQnKTtcblxuICAgICAgICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbE1vdXNlTWFuYWdlci5kZWFjdGl2YXRlKCk7XG5cbiAgICAgICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuYWxsb3dQb2ludGVyTG9ja2VkT25DbGlja0V2ZW50KFxuICAgICAgICAgICAgY2FudmFzRWxlbWVudFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzeXN0ZW0uYnJvd3Nlci5HbG9iYWxQb2ludGVyTG9ja01hbmFnZXIuYWRkT25Mb2NrRXJyb3IoKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIGdfbG9nZ2VyLmxvZyhcbiAgICAgICAgLy8gICBgVGhlIHBvaW50ZXIgbG9jayBzZW50IGFuIGVycm9yLCBldmVudDogXCIke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1cImBcbiAgICAgICAgLy8gKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9lcnJvckdyYXBoaWNDb250ZXh0ID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRPbkNvbnRleHRMb3N0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdvbl9jb250ZXh0X2xvc3QnKTtcblxuICAgICAgdGhpcy5fZXJyb3JHcmFwaGljQ29udGV4dCA9IHRydWU7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldE9uQ29udGV4dFJlc3RvcmVkKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdvbl9jb250ZXh0X3Jlc3RvcmVkJyk7XG5cbiAgICAgIHRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuXG4gICAgdGhpcy5fdGlsZXNSZW5kZXJlciA9IG5ldyBUaWxlc1JlbmRlcmVyKCk7XG5cbiAgICB0aGlzLl9nYW1lTWFwLmdlbmVyYXRlQ2l0eSh0aGlzLl90aWxlc1JlbmRlcmVyKTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgYXdhaXQgdGhpcy5fcmVuZGVyZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgdG9nZ2xlRGVidWdTY2FsZSgpIHtcbiAgICB0aGlzLl9kZWJ1Z1NjYWxlT24gPSAhdGhpcy5fZGVidWdTY2FsZU9uO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKCkpIHJldHVybjtcblxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5fdGljaygpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XG4gIH1cblxuICBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3J1bm5pbmcgJiYgIXRoaXMuX2Vycm9yR3JhcGhpY0NvbnRleHQ7XG4gIH1cblxuICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvL1xuICAvL1xuICAvL1xuXG4gIHByaXZhdGUgX3RpY2soKSB7XG4gICAgY29uc3QgdGljayA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fcnVubmluZyB8fCB0aGlzLl9lcnJvckdyYXBoaWNDb250ZXh0KSByZXR1cm47XG5cbiAgICAgIHRoaXMuX21haW5Mb29wKCk7XG5cbiAgICAgIC8vIHBsYW4gdGhlIG5leHQgZnJhbWVcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgfTtcblxuICAgIHRpY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21haW5Mb29wKCkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGVsdGFTZWNUaW1lID0gTWF0aC5tYXgoMCwgY3VycmVudFRpbWUgLSB0aGlzLl9jdXJyRnJhbWVUaW1lKTtcbiAgICB0aGlzLl9jdXJyRnJhbWVUaW1lID0gY3VycmVudFRpbWU7XG4gICAgdGhpcy5fZnJhbWVQcm9maWxlci5wdXNoRGVsdGEoZGVsdGFTZWNUaW1lKTtcblxuICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLnVwZGF0ZShkZWx0YVNlY1RpbWUgLyAxMDAwKTtcblxuICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbE1vdXNlTWFuYWdlci5yZXNldERlbHRhcygpO1xuICAgIHN5c3RlbS5icm93c2VyLkdsb2JhbFRvdWNoTWFuYWdlci5yZXNldERlbHRhcygpO1xuXG4gICAgdGhpcy5fdGltZSArPSBkZWx0YVNlY1RpbWUgLyAxMDAwO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIubG9va0F0KFxuICAgICAgdGhpcy5fZnJlZUZseUNvbnRyb2xsZXIuZ2V0UG9zaXRpb24oKSxcbiAgICAgIHRoaXMuX2ZyZWVGbHlDb250cm9sbGVyLmdldFRhcmdldCgpLFxuICAgICAgdGhpcy5fZnJlZUZseUNvbnRyb2xsZXIuZ2V0VXBBeGlzKClcbiAgICApO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIudXBkYXRlKCk7XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8vLy8vIHJlbmRlciAzZCBzY2VuZVxuXG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyU2NlbmUoKGNhbWVyYTogZ3JhcGhpY3MuY2FtZXJhLklDYW1lcmEsIGZydXN0dW1DdWxsaW5nOiBncmFwaGljcy5jYW1lcmEuSUZydXN0dW1DdWxsaW5nKSA9PiB7XG5cbiAgICAgIGNvbnN0IHN0YWNrUmVuZGVyZXJzID0gdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnM7XG4gICAgICBzdGFja1JlbmRlcmVycy5wdXNoTGluZShbMCwwLDBdLCBbMTAwLDAsMF0sIFsxLDAsMF0pO1xuICAgICAgc3RhY2tSZW5kZXJlcnMucHVzaExpbmUoWzAsMCwwXSwgWzAsMTAwLDBdLCBbMCwxLDBdKTtcbiAgICAgIHN0YWNrUmVuZGVyZXJzLnB1c2hMaW5lKFswLDAsMF0sIFswLDAsMTAwXSwgWzAsMCwxXSk7XG5cbiAgICAgIGNvbnN0IHRpbGVTY2FsZSA9IHRoaXMuX2RlYnVnU2NhbGVPbiA/IDAuOSA6IDE7XG5cbiAgICAgIHRoaXMuX2dhbWVNYXAucmVuZGVyKHRoaXMuX3JlbmRlcmVyLCB0aGlzLl90aWxlc1JlbmRlcmVyLCB0aWxlU2NhbGUpO1xuXG4gICAgICAvLyB0aGlzLl90aWxlc1JlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAvLyB0aGlzLl90aWxlc1JlbmRlcmVyLnB1c2hJbnN0YW5jZShbMSwxXSwgWzAsMF0sIDEwKTtcbiAgICAgIC8vIHRoaXMuX3RpbGVzUmVuZGVyZXIuZmx1c2goY2FtZXJhLmdldENvbXBvc2VkTWF0cml4KCkpO1xuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vLy8vLyBIVURcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlckhVRCgoKSA9PiB7XG5cbiAgICAgIHtcbiAgICAgICAgY29uc3Qga2V5RXZlbnRzUG9zOiBnbG0uUmVhZG9ubHlWZWMyID0gWzcgKyAyMCwgMTY1XTtcbiAgICAgICAgY29uc3QgdG91Y2hFdmVudHNQb3M6IGdsbS5SZWFkb25seVZlYzIgPSBbNyArIDIwLCAyNjBdO1xuICAgICAgICBjb25zdCBib2FyZFBvczogZ2xtLlJlYWRvbmx5VmVjMiA9IFs3LCAzNV07XG5cbiAgICAgICAgZ3JhcGhpY3MucmVuZGVyZXJzLndpZGdldHMuYWRkS2V5U3Ryb2tlc1dpZGdldHMoXG4gICAgICAgICAga2V5RXZlbnRzUG9zLFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnRleHRSZW5kZXJlclxuICAgICAgICApO1xuICAgICAgICBncmFwaGljcy5yZW5kZXJlcnMud2lkZ2V0cy5hZGRBcnJvd1N0cm9rZXNXaWRnZXRzKFxuICAgICAgICAgIHRvdWNoRXZlbnRzUG9zLFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnN0YWNrUmVuZGVyZXJzLFxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnRleHRSZW5kZXJlclxuICAgICAgICApO1xuICAgICAgICBncmFwaGljcy5yZW5kZXJlcnMud2lkZ2V0cy5hZGRLZXlzVG91Y2hlc1dpZGdldHMoXG4gICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudCxcbiAgICAgICAgICBib2FyZFBvcyxcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zdGFja1JlbmRlcmVycyxcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci50ZXh0UmVuZGVyZXJcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZ3JhcGhpY3MucmVuZGVyZXJzLndpZGdldHMucmVuZGVyRnBzTWV0ZXIoXG4gICAgICAgIFsxMCwgdGhpcy5fY2FudmFzRWxlbWVudC5oZWlnaHQgLSA2MCwgMF0sXG4gICAgICAgIFsxMDAsIDUwXSxcbiAgICAgICAgdGhpcy5fZnJhbWVQcm9maWxlcixcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc3RhY2tSZW5kZXJlcnMsXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnRleHRSZW5kZXJlcixcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwKICAiXG4vLyBpbXBvcnQgeyBHbG9iYWxGdWxsU2NyZWVuTWFuYWdlciB9IGZyb20gJ0Bicm93c2VyJztcblxuaW1wb3J0IHsgV2ViR0xFeHBlcmltZW50IH0gZnJvbSAnLi9leHBlcmltZW50L1dlYkdMRXhwZXJpbWVudCc7XG5cbmxldCBkZW1vOiBXZWJHTEV4cGVyaW1lbnQgfCBudWxsID0gbnVsbDtcblxuY29uc3QgX3F1ZXJ5SHRtbEVsZW1lbnQgPSA8VCBleHRlbmRzIEVsZW1lbnQ+KGluTmFtZTogc3RyaW5nKTogVCA9PiB7XG4gIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPFQ+KGluTmFtZSk7XG4gIGlmICghbmV3RWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgaHRtbCBlbGVtZW50IFwiJHtpbk5hbWV9XCIgbm90IGZvdW5kYCk7XG4gIH1cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgY2FudmFzRWxlbWVudCA9IF9xdWVyeUh0bWxFbGVtZW50PEhUTUxDYW52YXNFbGVtZW50PignI21haW4tY2FudmFzJyk7XG5cbiAgZGVtbyA9IG5ldyBXZWJHTEV4cGVyaW1lbnQoY2FudmFzRWxlbWVudCk7XG5cbiAgYXdhaXQgZGVtby5pbml0KCk7XG4gIGRlbW8uc3RhcnQoKTtcblxuXG4gIGNvbnN0IGJ0bl9kZWJ1Z1NjYWxlID0gX3F1ZXJ5SHRtbEVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KFwiI2J0bi1kZWJ1Zy1zY2FsZVwiKTtcblxuICBidG5fZGVidWdTY2FsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRlbW8hLnRvZ2dsZURlYnVnU2NhbGUoKTtcbiAgfSk7XG5cbiAgLy9cbiAgLy9cbiAgLy8gR1VJIChmdWxsc2NyZWVuIGJ1dHRvbilcblxuICAvLyBjb25zdCBndWlGdWxsc2NyZWVuID0gX3F1ZXJ5SHRtbEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCcjZ3VpX2Z1bGxzY3JlZW4nKTtcblxuICAvLyBpZiAoR2xvYmFsRnVsbFNjcmVlbk1hbmFnZXIuaXNDb21wYXRpYmxlKGNhbnZhc0VsZW1lbnQpKSB7XG4gIC8vICAgZ3VpRnVsbHNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgLy8gICAgIEdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyLnJlcXVlc3RGdWxsU2NyZWVuKGNhbnZhc0VsZW1lbnQpO1xuICAvLyAgIH0pO1xuXG4gIC8vICAgR2xvYmFsRnVsbFNjcmVlbk1hbmFnZXIuYWRkT25GdWxsU2NyZWVuQ2hhbmdlKCgpID0+IHtcbiAgLy8gICAgIGlmICghZGVtbykge1xuICAvLyAgICAgICByZXR1cm47XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIGxldCBjdXJyZW50V2lkdGggPSBudWxsO1xuICAvLyAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBudWxsO1xuXG4gIC8vICAgICBjb25zdCBpc0luRnVsbFNjcmVlbiA9XG4gIC8vICAgICAgIEdsb2JhbEZ1bGxTY3JlZW5NYW5hZ2VyLmlzRnVsbFNjcmVlbihjYW52YXNFbGVtZW50KTtcblxuICAvLyAgICAgaWYgKGlzSW5GdWxsU2NyZWVuKSB7XG4gIC8vICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gIC8vICAgICAgIGN1cnJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAvLyAgICAgICBjdXJyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cbiAgLy8gICAgICAgY3VycmVudFdpZHRoID0gODAwO1xuICAvLyAgICAgICBjdXJyZW50SGVpZ2h0ID0gNjAwO1xuICAvLyAgICAgfVxuXG4gIC8vICAgICBjYW52YXNFbGVtZW50LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgLy8gICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG5cbiAgLy8gICAgIGNhbnZhc0VsZW1lbnQud2lkdGggPSBjdXJyZW50V2lkdGg7XG4gIC8vICAgICBjYW52YXNFbGVtZW50LmhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG5cbiAgLy8gICAgIGRlbW8ucmVzaXplKGN1cnJlbnRXaWR0aCwgY3VycmVudEhlaWdodCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvLyBHVUkgKGZ1bGxzY3JlZW4gYnV0dG9uKVxuICAvL1xuICAvL1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgaWYgKGRlbW8pIHtcbiAgICBkZW1vLnN0b3AoKTtcbiAgfVxufSk7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Q0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBR0gsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsT0FBTztBQUFBLEVBR1AsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsVUFBVTtBQUFBLEVBR1YsS0FBSztBQUFBLEVBQ0wsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBR1osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVB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O0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFO0FBQ1osU0FBTztBQUFBO0FBVUYsU0FBUyxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQzNCLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFO0FBQ1gsTUFBSSxNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFO0FBQ1osU0FBTztBQUFBO0FBd0JGLFNBQVMsVUFBVSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDekcsTUFBSSxNQUFNLElBQWEsV0FBVyxFQUFFO0FBQ3BDLE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksS0FBSztBQUNULE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWLFNBQU87QUFBQTtBQXlCRixTQUFTLEdBQUcsQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDdkcsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBU0YsU0FBUyxRQUFRLENBQUMsS0FBSztBQUM1QixNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLEtBQUs7QUFDVCxNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixNQUFJLE1BQU07QUFDVixTQUFPO0FBQUE7QUFVRixTQUFTLFNBQVMsQ0FBQyxLQUFLLEdBQUc7QUFFaEMsTUFBSSxRQUFRLEdBQUc7QUFDYixRQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUs7QUFDVCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU07QUFDVixRQUFJLE1BQU07QUFDVixRQUFJLE1BQU07QUFBQSxFQUNaLE9BQU87QUFDTCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksS0FBSyxFQUFFO0FBQ1gsUUFBSSxLQUFLLEVBQUU7QUFDWCxRQUFJLEtBQUssRUFBRTtBQUNYLFFBQUksTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUNaLFFBQUksTUFBTSxFQUFFO0FBQ1osUUFBSSxNQUFNLEVBQUU7QUFDWixRQUFJLE1BQU0sRUFBRTtBQUFBO0FBR2QsU0FBTztBQUFBO0FBVUYsU0FBUyxNQUFNLENBQUMsS0FBSyxHQUFHO0FBQzdCLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFFNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUU1RSxPQUFLLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sSUFBTTtBQUNaLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDL0MsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQy9DLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUMvQyxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxNQUFJLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFDaEQsTUFBSSxPQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ2hELE1BQUksT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTztBQUNoRCxTQUFPO0FBQUE7QUFVRixTQUFTLE9BQU8sQ0FBQyxLQUFLLEdBQUc7QUFDOUIsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLEtBQUssT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ2xHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNsRyxNQUFJLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3BHLE1BQUksT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDcEcsTUFBSSxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNsRyxNQUFJLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3BHLE1BQUksS0FBSyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbEcsTUFBSSxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNsRyxNQUFJLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3BHLE1BQUksTUFBTSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbkcsTUFBSSxRQUFRLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNyRyxNQUFJLFFBQVEsT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ3JHLE1BQUksTUFBTSxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDbkcsTUFBSSxRQUFRLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxNQUFNLE1BQU0sTUFBTTtBQUNyRyxNQUFJLE1BQU0sT0FBTyxNQUFNLE1BQU0sTUFBTSxPQUFPLE9BQU8sTUFBTSxNQUFNLE1BQU0sT0FBTyxPQUFPLE1BQU0sTUFBTSxNQUFNO0FBQ25HLFNBQU87QUFBQTtBQVNGLFNBQVMsV0FBVyxDQUFDLEdBQUc7QUFDN0IsTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixNQUFJLE1BQU0sTUFBTSxNQUFNLE1BQU07QUFDNUIsTUFBSSxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzVCLE1BQUksTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUU1QixTQUFPLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUFBO0FBV3BFLFNBQVMsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQ2xDLE1BQUksTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFLElBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUUsSUFDUixNQUFNLEVBQUU7QUFDWixNQUFJLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxJQUNSLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBRVosTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUMvQyxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxPQUFLLEVBQUU7QUFDUCxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxNQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSztBQUNoRCxTQUFPO0FBQUE7QUFXRixTQUFTLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUNuQyxNQUFJLElBQUksRUFBRSxJQUNOLElBQUksRUFBRSxJQUNOLElBQUksRUFBRTtBQUNWLE1BQUksS0FBSyxLQUFLLEtBQUs7QUFDbkIsTUFBSSxLQUFLLEtBQUssS0FBSztBQUNuQixNQUFJLEtBQUssS0FBSyxLQUFLO0FBRW5CLE1BQUksTUFBTSxLQUFLO0FBQ2IsUUFBSSxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDN0MsUUFBSSxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDN0MsUUFBSSxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUU7QUFDOUMsUUFBSSxNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUU7QUFBQSxFQUNoRCxPQUFPO0FBQ0wsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsVUFBTSxFQUFFO0FBQ1IsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxNQUFNO0FBQ1YsUUFBSSxNQUFNO0FBQ1YsUUFBSSxNQUFNLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLEVBQUU7QUFDMUMsUUFBSSxNQUFNLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLEVBQUU7QUFDMUMsUUFBSSxNQUFNLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLEVBQUU7QUFDMUMsUUFBSSxNQUFNLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLEVBQUU7QUFBQTtBQUc1QyxTQUFPO0FBQUE7QUFXRixTQUFTLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUMvQixNQUFJLElBQUksRUFBRSxJQUNOLElBQUksRUFBRSxJQUNOLElBQUksRUFBRTtBQUNWLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FB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Q1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBY0YsU0FBUyxhQUFhLENBQUMsS0FBSyxLQUFLO0FBQ3RDLE1BQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNwQixNQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7QUFFcEIsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxLQUFLO0FBQ1QsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxNQUFNO0FBQ1YsU0FBTztBQUFBO0FBa0JGLFNBQVMsdUJBQXVCLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFFakQsTUFBSSxJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUUsSUFDTixJQUFJLEVBQUU7QUFDVixNQUFJLEtB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LEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUc7QUFBQTtBQVdqSCxTQUFTLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUM3QixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsU0FBTztBQUFBO0FBV0YsU0FBUyxRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixNQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEIsTUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLFNBQU87QUFBQTtBQVdGLFNBQVMsY0FBYyxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQ3hDLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixNQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLE1BQUksS0FBSyxFQUFFLEtBQUs7QUFDaEIsTUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixNQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsTUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixNQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLE1BQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsU0FBTztBQUFBO0FBWUYsU0FBUyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFPO0FBQ3JELE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQ3ZCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLE1BQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQzFCLFNBQU87QUFBQTtBQVVGLFNBQVMsV0FBVyxDQUFDLEdBQUcsR0FBRztBQUNoQyxTQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQUE7QUFVdlIsU0FBUyxNQUFNLENBQUMsR0FBRyxHQUFHO0FBQzNCLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFO0FBQ1gsTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLE1BQU0sRUFBRSxLQUNSLE1BQU0sRUFBRTtBQUNaLE1BQUksTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUUsSUFDUCxLQUFLLEVBQUU7QUFDWCxNQUFJLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRSxJQUNQLEtBQUssRUFBRTtBQUNYLE1BQUksS0FBSyxFQUFFLElBQ1AsS0FBSyxFQUFFLElBQ1AsTUFBTSxFQUFFLEtBQ1IsTUFBTSxFQUFFO0FBQ1osTUFBSSxNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUUsS0FDUixNQUFNLEVBQUU7QUFDWixTQUFPLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBYyxVQUFVLEtBQUssSUFBSSxHQUFLLEtBQUssSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUss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QUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixTQUFPO0FBQUE7QUFXRixTQUFTLFNBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUNsQyxNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsU0FBTztBQUFBO0FBV0YsU0FBUyxTQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFDbEMsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLFNBQU87QUFBQTtBQVdGLFNBQVMsT0FBTSxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQ2hDLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixNQUFJLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDbEIsTUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLE1BQUksS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNsQixTQUFPO0FBQUE7QUFVRixTQUFTLEtBQUksQ0FBQyxLQUFLLEdBQUc7QUFDM0IsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsTUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDdkIsU0FBTztBQUFBO0FBVUYsU0FBUyxNQUFLLENBQUMsS0FBSyxHQUFHO0FBQzVCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1BQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxFQUFFO0FBQ3hCLE1B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QUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BRTdDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM5QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUU3QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDN0MsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzdDLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM3QyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFFN0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFDNUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUFBLE1BQzVDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7QUFBQSxNQUM1QyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQUEsTUFD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QUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFDM0Usc0JBQVksS0FBVyxLQUFLLFlBQVksUUFBUSxLQUFHLEdBQUcsS0FBRyxHQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7QUFJM0UsY0FDRSxtQkFDRSxFQUFDLEdBQUcsSUFBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULEVBQUMsR0FBRyxJQUFHLENBQUUsQ0FDWCxHQUNBO0FBQ0EsNEJBQWdCLGFBQWEsUUFBUSxDQUFDLE1BQUksS0FBRyxHQUFHLFFBQVE7QUFBQSxVQUMxRCxXQUVFLG1CQUNFLENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxDQUNYLEdBQ0E7QUFDQSw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsT0FBSSxLQUFHLEdBQUcsUUFBUTtBQUFBLFVBQzFELFdBRUUsbUJBQ0UsRUFBQyxHQUFHLElBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxFQUFDLEdBQUcsR0FBRyxDQUFFLENBQ1gsR0FDQTtBQUNBLDRCQUFnQixhQUFhLFFBQVEsQ0FBQyxNQUFJLElBQUcsR0FBRyxRQUFRO0FBQUEsVUFDMUQsV0FFRSxtQkFDRSxFQUFDLEdBQUcsSUFBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxJQUFHLENBQUUsQ0FDWCxHQUNBO0FBQ0EsNEJBQWdCLGFBQWEsUUFBUSxDQUFDLE9BQUksSUFBRyxHQUFHLFFBQVE7QUFBQSxVQUMxRCxXQUVFLG1CQUNFLENBQUMsR0FBRyxJQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsRUFBQyxHQUFHLElBQUcsQ0FBRSxDQUNYLEdBQ0E7QUFDQSw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsT0FBSSxLQUFHLEdBQUcsUUFBUTtBQUFBLFVBQzFELFdBRUUsbUJBQ0UsRUFBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxFQUFDLEdBQUcsSUFBRyxDQUFFLENBQ1gsR0FDQTtBQUNBLDRCQUFnQixhQUFhLFFBQVEsQ0FBQyxNQUFJLEtBQUcsR0FBRyxRQUFRO0FBQUEsVUFDMUQsV0FFRSxtQkFDRSxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsQ0FDWCxHQUNBO0FBQ0EsNEJBQWdCLGFBQWEsUUFBUSxDQUFDLE1BQUksR0FBRyxHQUFHLFFBQVE7QUFBQSxVQUMxRCxXQUVFLG1CQUNFLENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxDQUNYLEdBQ0E7QUFDQSw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsTUFBSSxLQUFHLEdBQUcsUUFBUTtBQUFBLFVBQzFELFdBRUUsbUJBQ0UsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLENBQ1gsR0FDQTtBQUNBLDRCQUFnQixhQUFhLFFBQVEsQ0FBQyxPQUFJLEtBQUcsR0FBRyxRQUFRO0FBQUEsVUFDMUQsV0FFRSxtQkFDRSxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsQ0FDWCxHQUNBO0FBQ0EsNEJBQWdCLGFBQWEsUUFBUSxDQUFDLE9BQUksR0FBRyxHQUFHLFFBQVE7QUFBQSxVQUMxRCxXQUVFLG1CQUNFLEVBQUMsR0FBRyxJQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxDQUNYLEdBQ0E7QUFDQSw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsS0FBSSxJQUFHLEdBQUcsUUFBUTtBQUFBLFVBQzFELFdBRUUsbUJBQ0UsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxFQUFDLEdBQUcsSUFBRyxDQUFFLENBQ1gsR0FDQTtBQUNBLDRCQUFnQixhQUFhLFFBQVEsQ0FBQyxLQUFJLEtBQUcsR0FBRyxRQUFRO0FBQUEsVUFDMUQsV0FFRSxtQkFDRSxDQUFDLEdBQUcsSUFBRyxDQUFFLEdBQ1QsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxHQUNULENBQUMsR0FBRyxJQUFHLENBQUUsQ0FDWCxHQUNBO0FBQ0EsNEJBQWdCLGFBQWEsUUFBUSxDQUFDLE9BQUksS0FBRyxHQUFHLFFBQVE7QUFBQSxVQUMxRCxXQUVFLG1CQUNFLEVBQUMsR0FBRyxHQUFHLENBQUUsR0FDVCxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQ1QsRUFBQyxHQUFHLEdBQUcsQ0FBRSxDQUNYLEdBQ0E7QUFDQSw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsT0FBSSxJQUFHLEdBQUcsUUFBUTtBQUFBLFVBQzFELE9BQ0s7QUFFSCw0QkFBZ0IsYUFBYSxRQUFRLENBQUMsT0FBSSxLQUFHLEdBQUcsUUFBUTtBQUFBO0FBQUEsUUFHNUQ7QUFBQSxNQUNGO0FBQUE7QUFBQSxFQUdGLE1BQU0sQ0FBQyxZQUEyQixpQkFBZ0MsV0FBbUI7QUFNbkYsb0JBQWdCLE1BQU0sV0FBVyxXQUFXLGtCQUFrQixHQUFHLEVBQUUsWUFBWSxNQUFNLE9BQU8sVUFBVSxDQUFDO0FBa0J2RyxlQUFXLGdCQUFnQixLQUFLLGdCQUFnQjtBQUc5QyxZQUFNLFdBQVcsS0FBSyxRQUFRLFdBQVc7QUFFekMsWUFBTSxXQUFXLGFBQWEsUUFBUTtBQUN0QyxZQUFNLFdBQVcsYUFBYSxRQUFRO0FBQ3RDLFVBQUksYUFBYSxRQUFRLEdBQUc7QUFFMUIsbUJBQVcsc0JBQXNCLEtBQy9CLENBQUMsYUFBYSxPQUFPLEtBQUssUUFBUSxVQUFVLGFBQWEsT0FBTyxLQUFLLFFBQVEsVUFBVSxhQUFhLFNBQVMsS0FBSyxRQUFRLFdBQVcsR0FBRyxHQUN4SSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FDUixDQUFDLEtBQUksS0FBSSxHQUFHLEdBQ1osQ0FBQyxVQUFVLFVBQVUsYUFBYSxTQUFTLEtBQUssUUFBUSxRQUFRLENBQ2xFO0FBQUEsTUFDRixPQUNLO0FBQ0gsbUJBQVcsc0JBQXNCLEtBQy9CLENBQUMsYUFBYSxPQUFPLEtBQUssUUFBUSxVQUFVLGFBQWEsT0FBTyxLQUFLLFFBQVEsVUFBVSxhQUFhLFNBQVMsS0FBSyxRQUFRLFdBQVcsR0FBRyxHQUN4SSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FDUixDQUFDLEtBQUksS0FBSSxHQUFHLEdBQ1osQ0FBQyxVQUFVLFVBQVUsYUFBYSxTQUFTLEtBQUssUUFBUSxRQUFRLENBQ2xFO0FBQUE7QUFBQSxJQU9KO0FBQUE7QUFLSjs7O0FDanlCQSxJQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBd0JiLEtBQUs7OztBQ3hCUCxJQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXVCYixLQUFLOzs7QUNiUCxJQUFNLGNBQStCLENBQUMsR0FBRyxDQUFDO0FBQzFDLElBQU0sY0FBK0IsQ0FBQyxJQUFJLFlBQVcsSUFBSSxJQUFJLFlBQVcsRUFBRTtBQUUxRSxJQUFNLGdCQUFlO0FBRWQ7QUFBQSxNQUFNLGNBQWM7QUFBQSxFQUVqQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQTRDLElBQUksaUJBQVMsT0FBTztBQUFBLEVBRWhFLFVBQVUsSUFBSSxhQUFhLGFBQVk7QUFBQSxFQUN2QyxlQUF1QjtBQUFBLEVBRS9CLFdBQVcsR0FBRztBQUVaLFNBQUssVUFBVSxJQUFJLGlCQUFTLE9BQU8sY0FBYyxpQkFBaUI7QUFBQSxNQUNoRSxXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVLENBQUMsb0JBQW9CLGFBQWEsU0FBUztBQUFBLElBQ3ZELENBQUM7QUFFRCxVQUFNLGFBQWEsSUFBSSxpQkFBUyxPQUFPLGdCQUFnQjtBQUN2RCxlQUNHLE1BQU0sRUFDTixpQkFBaUIsV0FBVyxFQUM1QixPQUFPLEVBQ1AsZ0JBQWdCLHFCQUFxQixPQUFPLEVBQzVDLGdCQUFnQixxQkFBcUIsT0FBTyxFQUM1QyxVQUFVLEVBQUssRUFDZixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixnQkFBZ0IscUJBQXFCLE9BQU8sRUFDNUMsZ0JBQWdCLHFCQUFxQixPQUFPLEVBQzVDLGdCQUFnQixrQkFBa0IsT0FBTyxFQUN6QyxVQUFVLEVBQUs7QUFFbEIsU0FBSyxZQUFZLElBQUksaUJBQVMsT0FBTyxnQkFBZ0IsU0FDbkQsS0FBSyxTQUNMLFdBQVcsT0FBTyxDQUNwQjtBQUlBLFVBQU0sV0FBNkM7QUFBQSxNQUNqRDtBQUFBLFFBQ0UsVUFBVSxDQUFDLE1BQU0sR0FBSTtBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxZQUFXLEtBQUssR0FBRyxZQUFXLEtBQUssQ0FBQztBQUFBLE1BQ2pEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsVUFBVSxFQUFDLE1BQU0sR0FBSTtBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxZQUFXLEtBQUssR0FBRyxZQUFXLEtBQUssQ0FBQztBQUFBLE1BQ2pEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsVUFBVSxDQUFDLEtBQU0sR0FBSTtBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxZQUFXLEtBQUssR0FBRyxZQUFXLEtBQUssQ0FBQztBQUFBLE1BQ2pEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsVUFBVSxFQUFDLEtBQU0sR0FBSTtBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxZQUFXLEtBQUssR0FBRyxZQUFXLEtBQUssQ0FBQztBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBRWpDLFVBQU0saUJBQTJCLENBQUM7QUFDbEMsZUFBVyxTQUFTLFNBQVM7QUFDM0IsWUFBTSxTQUFTLFNBQVM7QUFDeEIscUJBQWUsS0FDYixPQUFPLFNBQVMsSUFDaEIsT0FBTyxTQUFTLElBQ2hCLE9BQU8sU0FBUyxJQUNoQixPQUFPLFNBQVMsRUFDbEI7QUFBQSxJQUNGO0FBRUEsU0FBSyxVQUFVLGVBQWUsR0FBRyxnQkFBZ0IsZUFBZSxNQUFNO0FBQ3RFLFNBQUssVUFBVSxrQkFBa0IsZUFBZSxTQUFTLENBQUM7QUFLMUQsVUFBTSxRQUFRO0FBQ2QsVUFBTSxTQUFTO0FBQ2YsVUFBTSxjQUFjLElBQUksV0FBVyxRQUFRLFNBQVMsQ0FBQztBQUNyRDtBQUVFLFVBQUksUUFBUTtBQUNaLGVBQVMsS0FBSyxFQUFHLEtBQUssVUFBVTtBQUNoQyxpQkFBUyxLQUFLLEVBQUcsS0FBSyxTQUFTLElBQUk7QUFPakMsc0JBQVksUUFBUSxJQUFJLEtBQUs7QUFDN0Isc0JBQVksUUFBUSxJQUFJLEtBQUs7QUFDN0Isc0JBQVksUUFBUSxJQUFJLEtBQUs7QUFDN0Isc0JBQVksUUFBUSxJQUFJLEtBQUs7QUFDN0IsWUFBRTtBQUFBLFFBQ0o7QUFBQSxJQUNGO0FBRUE7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUFBLElBQy9CO0FBQ0E7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUFBLElBQy9CO0FBQ0E7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUFBLElBQy9CO0FBQ0E7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUFBLElBQy9CO0FBQ0E7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUFBLElBQy9CO0FBQ0E7QUFDRSxVQUFJLFFBQVE7QUFDWixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3QixrQkFBWSxRQUFRLElBQUksS0FBSztBQUM3Qixr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
