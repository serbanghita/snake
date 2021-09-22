export type ComponentConstructor = new (properties: {}) => Component

export default abstract class Component {
    protected constructor(public properties: {}) {
    }

    public abstract notify(eventName: string, properties: {});
}