import Entity from "./Entity";
import Component from "./Component";
import System, {SystemConstructor} from "./System";

export interface IQueryFilters {
    any?: typeof Component[];
    all?: typeof Component[];
    none?: typeof Component[];
}

export default class World {
    public entities: Entity[] = []; // @todo: Convert to Map.
    public systems: Map<string, System> = new Map();
    private queries: [] = [];

    public createEntity(): Entity {
        const entity = new Entity();
        this.entities.push(entity);
        return entity;
    }

    public addSystem<T extends System>(systemDeclaration: new (props: any) => T, properties?: {}): T {
        const instance = new systemDeclaration(properties);
        this.systems.set(systemDeclaration.name, instance as T);

        return instance;
    }

    public createQuery(filters: IQueryFilters): Entity[] {
        const fAny = filters.any || [];
        const fAll = filters.all || [];
        const fNone = filters.none || [];

        let result: Entity[] = [];

        const isSatisfyingFilterAll = (entity: Entity) => {
            const componentNotFound = fAll.find((value) => {
                return !entity.components[value.name];
            });

            return typeof componentNotFound === "undefined";
        };

        if (fAll.length > 0) {
            result = this.entities.filter((entity) => isSatisfyingFilterAll(entity));
        }

        return result;
    }
}