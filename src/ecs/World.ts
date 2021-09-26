import Entity from "./Entity";
import Component from "./Component";
import System, {SystemConstructor} from "./System";

export interface IQueryFilters {
    any?: typeof Component[];
    all?: typeof Component[];
    none?: typeof Component[];
}

export default class World {
    public entities: Entity[] = [];
    public systems: System[] = [];
    private queries: [] = [];

    public createEntity(): Entity {
        const entity = new Entity();
        this.entities.push(entity);
        return entity;
    }

    public addSystem(systemDeclaration: SystemConstructor, properties?: {}): System {
        const instance = new systemDeclaration(properties);
        this.systems[instance.constructor.name] = instance;

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