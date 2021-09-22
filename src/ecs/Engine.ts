import Component from "./Component";
import World from "./World";
import Entity from "./Entity";

export default class Engine {
    public components: typeof Component[] = [];
    public world: World;
    public entities: Entity[] = [];

    public registerComponent(componentDeclaration: typeof Component) {
        this.components.push(componentDeclaration);
    }

    public createWorld(): World {
        this.world = new World();
        return this.world;
    }

    public createEntity(): Entity {
        const entity = new Entity();
        this.entities.push(entity);
        return entity;
    }
}