import Component, {ComponentConstructor} from "./Component";

export default class Entity {
    public components: {[key: string]: Component} = {};

    public addComponent(componentDeclaration: ComponentConstructor, properties?: {}) {
        const instance = new componentDeclaration(properties);
        this.components[instance.constructor.name] = instance;
    }

    public getComponent<T>(componentDeclaration: new (props: any) => T): T {
        return this.components[componentDeclaration.name] as T;
    }

    public hasComponent(componentDeclaration: ComponentConstructor): boolean {
        return !!this.components[componentDeclaration.name];
    }
}