import Component from "./Component";
import World from "./World";
import System from "./System";

export default class Engine {
    public components: typeof Component[] = [];
    public systems: typeof System[] = [];

    public registerComponent(componentDeclaration: typeof Component) {
        this.components.push(componentDeclaration);
    }

    public registerSystem(systemDeclaration: typeof System) {
        this.systems.push(systemDeclaration);
    }

    public createWorld(): World {
        return new World();
    }
}