import Component, { IComponent } from '@core/Component';
import Entity from '@core/Entity';
import Event, { IEvent } from '@core/Event';
import Scene from '@core/Scene';
import Storage from '@core/Storage';
import System from '@core/System';

import Matrix4 from '@math/Matrix4';
import Quaternion from '@math/Quaternion';
import Vector3 from '@math/Vector3';

import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';
import Core from '@common/systems/Core';

class UpdateEvent extends Event {
    
    public static Priority: number = 1024;
    
    public constructor() {
        super();
    }
    
}

class RenderEvent extends Event {
    
    public static Priority: number = 2048;
    
    public constructor() {
        super();
    }
    
}

class CollisionEvent extends Event {
    
    public static Priority: number = 4096;
    
    public other: Entity;
    
    public constructor(entity: Entity, other: Entity) {
        super(entity);
        this.other = other;
    }
    
}

class Body extends Component {
    
    public acceleration: number = 0.0;
    public velocity: number = 0.0;
    public mass: number = 1.0;
    
    @Component.On(UpdateEvent)
    public update(event: UpdateEvent): void {
        console.log(event);
    }
    
    @Component.On(RenderEvent)
    public render(event: RenderEvent): void {
        console.log(event);
    }
    
    @Component.On(CollisionEvent)
    public collision(event: CollisionEvent): void {
        console.log(event);
    }
    
}

class CustomStorage<C extends Component> extends Storage<C> {
    
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

class PhysicsSystem extends System {
    
    public constructor(scene: Scene) {
        super(scene);
        scene.dispatcher.on(UpdateEvent)(this.update.bind(this));
    }
    
    public update(event: UpdateEvent) {
        const transforms = this.scene.components.all(Transform);
        const bodies = this.scene.components.all(Body);
        if (bodies) {
            bodies.forEach((body: Body): void => console.log(body));
        }
    }
    
}

const scene = new Scene();

scene.systems.add(Core);

scene.register(Hierarchy);
scene.register(Transform);

const e0 = scene.entities.add();
const h0 = e0.components.get(Hierarchy) as Hierarchy;

const e01 = scene.entities.add();
e01.hierarchy.move(e0);

const e02 = scene.entities.add();
e02.hierarchy.move(e0);

const e1 = scene.entities.add();

scene.entities.remove(e0);

let hierarchies = scene.components.all(Hierarchy);
if (hierarchies) {
    hierarchies.forEach((hierarchy: Hierarchy): void => console.log(hierarchy.entity.id, hierarchy.parent ? hierarchy.parent.id : 'no parent', hierarchy.children.map((child: Entity) => child.id).join(',')))
}



// scene.register(Body);

// scene.systems.add(PhysicsSystem);

// const e0 = scene.entities.add();
// const b0 = e0.components.add(Body);

// const e1 = scene.entities.add();
// const b1 = e1.components.add(Body);

// scene.dispatcher.emit(new UpdateEvent());
// scene.dispatcher.emit(new RenderEvent());

// scene.dispatcher.dispatch();



const v3 = Vector3.UnitX;

const m4 = Matrix4.Identity;
console.log(m4.toString());