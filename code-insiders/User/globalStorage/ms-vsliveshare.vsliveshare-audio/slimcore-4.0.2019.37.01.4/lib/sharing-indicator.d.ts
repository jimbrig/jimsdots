export namespace SharingIndicator {

    interface Position {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface Color {
        red: number;
        green: number;
        blue: number;
        alpha: number;
    }

    interface ConstructorArgs {
        position?: Position;
        borderColor: Color;
        lineWidth: number;
    }
}

export namespace ControlInjector {
    const enum Mode {
        Disabled,
        Seamless,
        Classic
    }

    interface Config {
        mode: Mode;
        numVirtualCursors?: number;
        noMotionTimeoutMs?: number;
        noMotionSharerTimeoutMs?: number;
    }

    interface CursorConfig {
        pointerWidth?: number;
        pointerHeight?: number;
        avatarWidth?: number;
        avatarHeight?: number;
        avatarOffsetX?: number;
        avatarOffsetY?: number;
    }
}

interface Disposable {
    dispose(): void;
}

export class SharingIndicator implements Disposable {
    constructor(args: SharingIndicator.ConstructorArgs);
    dispose(): void;

    setPosition(position: SharingIndicator.Position): void;
    setWindow(windowId: number): void;
    setToolbarWindow(windowId: number): void;
}

export class ControlInjector implements Disposable {
    constructor(logPath?: string);
    dispose(): void;

    injectRawInput(buffer: Uint8Array, sourceId: number): void;
    setInjectionRect(rect: SharingIndicator.Position): void;
    setInjectorConfig(config: ControlInjector.Config): void;
    setAvatar(base64Buffer: Uint8Array, sourceId: number): void;
    allowSingleController(sourceId: number): void;
    setCursorConfig(cursorConfig: ControlInjector.CursorConfig): void;
}

// This API is currently only available on Windows
export function displayVideoDeviceSetting(parentWindowHandle: Buffer, deviceId: string): void;
