import Entity from "./Entity";
import World from "./World";

export type SystemConstructor = new (world: World, properties?: {}) => System;

interface ISystemProps {
    fps: number;
}

export default abstract class System {
    public timeDiff: number = 0;
    public timeThen: number = 0;
    public fps: number = 0;
    private fpsElapsed: number = 0;

    protected constructor(protected world: World, public properties: ISystemProps) {
        this.fps = properties.fps;
    }

    public isFrequencySatisfied(now: number): boolean {

        this.fpsElapsed++;

        if (this.fpsElapsed === this.fps) {
            this.fpsElapsed = 0;
            return true;
        }

        return false;
    }

    public abstract update(now: number, entities: Entity[]);
}