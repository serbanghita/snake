import Entity from "./Entity";

export type SystemConstructor = new (properties?: {}) => System

export default abstract class System {
    protected constructor(public properties?: {}) {
    }

    public abstract update(entities: Entity[]);
}