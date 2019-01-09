import Component, { IComponent } from '@core/Component';
import Entity from '@core/Entity';

export default abstract class Storage<C extends Component> {
    
    protected type: IComponent<C>;
    
    public constructor(type: IComponent<C>) {
        this.type = type;
    }
    
    public abstract add(entity: Entity): C;
    public abstract remove(entity: Entity): boolean;
    public abstract get(entity: Entity): Optional<C>;
    public abstract forEach(callback: (component: C, entity: Entity, storage: Storage<C>) => void): void;
    
}

export class Default<C extends Component> extends Storage<C> {
    
    private components: Map<Entity, C> = new Map();
    
    public constructor(type: IComponent<C>) {
        super(type);
    }
    
    public add(entity: Entity): C {
        if (this.components.has(entity)) return this.components.get(entity) as C;
        else {
            const component = new this.type(entity);
            this.components.set(entity, component);
            return component;
        }
    }
    
    public remove(entity: Entity): boolean {
        return this.components.delete(entity);
    }
    
    public get(entity: Entity): Optional<C> {
        return this.components.get(entity);
    }
    
    public forEach(callback: (component: C, entity: Entity, storage: Storage<C>) => void): void {
        this.components.forEach((component: C, entity: Entity): void => callback(component, entity, this));
    }
    
}

export interface IStorage<C extends Component, S extends Storage<C>> {
    new (type: IComponent<C>): S;
}