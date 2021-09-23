import Component, {ComponentConstructor} from "./Component";

export default class Entity {
    public components: {[key: string]: Component} = {};

    public addComponent(componentDeclaration: ComponentConstructor, properties: {}) {
        const instance = new componentDeclaration(properties);
        this.components[instance.constructor.name] = instance;
    }

    public getComponent(componentName: string) {
        return this.components[componentName];
    }

    // public fireEvent(eventName: string, properties: {}) {
    //     for (const name in this.components) {
    //         this.components[name].notify(eventName, properties);
    //     }
    // }
}