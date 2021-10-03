import Entity from "./Entity";

export type SystemConstructor = new (properties?: {}) => System;

interface ISystemProps {
    fps: number;
}

export default abstract class System {
    public timeDiff: number = 0;
    public timeThen: number = 0;
    public fps: number = 0;

    protected constructor(public properties: ISystemProps) {
        this.fps = properties.fps;
    }

    public isFrequencySatisfied(now: number): boolean {

        // Loop (FPS).
        // this.loopTimeDiff = now - this.loopTimeThen;
        // if (this.timerDiff > 1000) {
        //     GameApi.loopFps = Math.round(1000 / this.loopTimeDiff);
        // }
        // this.loopTimeThen = now;

        this.timeDiff = now - this.timeThen;
        if (Math.round(1000 / this.timeDiff) <= this.fps) {
            this.timeThen = now;
            return true;
        }
        return false;
    }

    public abstract update(now: number, entities: Entity[]);
}