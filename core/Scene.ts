import Component, { IComponent } from '@core/Component';
import Dispatcher from '@core/Dispatcher';
import Entity, { IEntity } from '@core/Entity';
import Event from '@core/Event';
import Storage, { Default as DefaultStorage, IStorage } from '@core/Storage';
import System, { Default as DefaultSystem, ISystem } from '@core/System';

export class EntityAddedEvent extends Event {
    public static Priority: number = 0;
}

export class EntityRemovedEvent extends Event {
    public static Priority: number = 0;
}

class Entities<E extends Entity> {
    
    private type: IEntity<any>;
    private scene: Scene;
    
    public constructor(scene: Scene, type?: IEntity<any>) {
        this.scene = scene;
        this.type = type || Entity;
    }
    
    public add(): E {
        const entity = new this.type(this.scene);
        const event = new EntityAddedEvent(entity);
        this.scene.dispatcher.emit(event);
        return entity;
    }
    
    public remove(entity: E): boolean {
        const event = new EntityRemovedEvent(entity);
        this.scene.dispatcher.emit(event);
        return this.scene.components.remove(entity);
    }
    
}

export class ComponentAddedEvent<C extends Component> extends Event {
    
    public static Priority: number = 0;
    
    public type: IComponent<C>;
    
    public constructor(entity: Entity, type: IComponent<C>) {
        super(entity);
        this.type = type;
    }
    
}

export class ComponentRemovedEvent<C extends Component> extends Event {
    
    public static Priority: number = 0;
    
    public type: IComponent<C>;
    
    public constructor(entity: Entity, type: IComponent<C>) {
        super(entity);
        this.type = type;
    }
    
}

class Components {
    
    private scene: Scene;
    private components: Map<IComponent<any>, Storage<any>> = new Map();
    
    public constructor(scene: Scene) {
        this.scene = scene;
    }
    
    public register<C extends Component>(type: IComponent<C>): void {
        const components = new DefaultStorage<C>(type);
        this.components.set(type, components);
    }
    
    public add<C extends Component>(type: IComponent<C>): (entity: Entity) => C {
        const components = this.components.get(type);
        if (components) {
            return (entity: Entity): C => {
                const component = components.add(entity);
                this.scene.dispatcher.emit(new ComponentAddedEvent(entity, type));
                return component;
            }
        } else throw new Error();
    }
    
    public remove(...args: any[]): any {
        if (args[0] instanceof Entity) return this.removeByEntity(args[0]);
        else if (args[0].prototype instanceof Component) return this.removeByType(args[0]);
        else throw new Error();
    }
    
    private removeByEntity(entity: Entity): boolean {
        var result: boolean = false;
        this.components.forEach(
            (components: Storage<any>): void => {
                result = result || components.remove(entity);
            }
        );
        return result;
    }
    
    private removeByType<C extends Component>(type: IComponent<C>): (entity: Entity) => boolean {
        const components = this.components.get(type);
        if (components) {
            return (entity: Entity): boolean => {
                const result = components.remove(entity);
                if (result) this.scene.dispatcher.emit(new ComponentRemovedEvent(entity, type));
                return result;
            }
        } else throw new Error();
    }
    
    public get<C extends Component>(type: IComponent<C>): (entity: Entity) => Optional<C> {
        const components = this.components.get(type);
        if (components) return components.get.bind(components);
        else throw new Error();
    }
    
    public all<C extends Component>(type: IComponent<C>): Optional<Storage<C>> {
        return this.components.get(type);
    }
    
}

class Systems {
    
    private scene: Scene;
    private systems: Map<Type, System> = new Map();
    
    public constructor(scene: Scene) {
        this.scene = scene;
    }
    
    public register<C extends Component>(type: IComponent<C>): void {
        const system = new DefaultSystem<C>(this.scene, type);
        this.systems.set(type, system);
    }
    
    public add<S extends System>(type: ISystem<S>): S {
        const system = new type(this.scene);
        this.systems.set(type, system);
        return system;
    }
    
    public remove<S extends System>(type: ISystem<S>): boolean {
        return this.systems.delete(type);
    }
    
    public get(type: Type): Optional<System> {
        return this.systems.get(type);
    }
    
}

export default class Scene<E extends Entity = Entity> {
    
    public entities: Entities<E>;
    public components: Components = new Components(this);
    public systems: Systems = new Systems(this);
    public dispatcher: Dispatcher = new Dispatcher();
    
    public constructor(entityType?: IEntity<E>) {
        this.entities = new Entities<E>(this, entityType);
    }
    
    public register<C extends Component>(type: IComponent<C>): void {
        this.components.register(type);
        this.systems.register(type);
    }
    
}