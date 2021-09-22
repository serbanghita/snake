import Component, {ComponentConstructor} from "./Component";

export default class Entity {
    public components: Component[] = [];

    public addComponent(componentDeclaration: ComponentConstructor, properties: {}) {
        const instance = new componentDeclaration(properties);
        this.components.push(instance);
    }

    public fireEvent(eventName: string, properties: {}) {
        this.components.forEach((component) => {
            component.notify(eventName, properties);
        });
    }
}