
import {allKeys} from "./keys"

export class KeyboardHandler{

    // here we assume small number of entries
    // -> red black tree map (an object) feels more suitable that hashmap (Map)
    private _wasPressed: Record<string, boolean> = {};
    private _isPressed: Record<string, boolean> = {};

    private _activated = false;
    private _handleKeyDown: (event: KeyboardEvent) => void;
    private _handleKeyUp: (event: KeyboardEvent) => void;
    constructor() {

        const handleKeyDown = (event: KeyboardEvent) => { this._isPressed[event.key] = true; };
        const handleKeyUp = (event: KeyboardEvent) => { this._isPressed[event.key] = false; };

        this._handleKeyDown = handleKeyDown.bind(this);
        this._handleKeyUp = handleKeyUp.bind(this);
    }

    //

    update() {
        this._wasPressed = this._isPressed;
        this._isPressed = {};
    }

    wasPressed(key: allKeys) {
        return this._wasPressed[key];
    }
    isPressed(key: allKeys) {
        return this._isPressed[key];
    }

    //

    activate() {

        if (this._activated)
            return;
        this._activated = true;

        document.addEventListener('keydown', this._handleKeyDown);
        document.addEventListener('keyup',   this._handleKeyUp);
    }

    deactivate() {

        if (!this._activated)
            return;
        this._activated = false;

        document.removeEventListener('keydown', this._handleKeyDown);
        document.removeEventListener('keyup',   this._handleKeyUp);
    }
};
