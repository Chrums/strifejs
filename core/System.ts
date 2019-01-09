import Component, { IComponent } from '@core/Component';
import Event, { IEvent } from '@core/Event';
import Scene from '@core/Scene';
import Storage from '@core/Storage';

type Callback<E extends Event> = (event: E) => void;

export default class System {
    
    public static Listeners: Map<IComponent<any>, Map<IEvent<any>, Callback<any>>> = new Map();

    public scene: Scene;
    
    public constructor(scene: Scene) {
        this.scene = scene;
    }
    
    public static on<E extends Event>(type: IEvent<E>): (target: any, identifier: string, descriptor: PropertyDescriptor) => void {
        return function (target: any, identifier: string, descriptor: PropertyDescriptor): void {
            if (!System.Listeners.has(target.constructor)) System.Listeners.set(target.constructor, new Map());
            const listeners = System.Listeners.get(target.constructor) as Map<IEvent<any>, Callback<any>>;
            listeners.set(type, descriptor.value);
        };
    }
    
}

export class Default<C extends Component> extends System {
    
    public type: IComponent<C>;

    public constructor(scene: Scene, type: IComponent<C>) {
        super(scene);
        this.type = type;
        if (System.Listeners.has(type)) {
            const listeners = System.Listeners.get(type) as Map<IEvent<any>, Callback<any>>;
            listeners.forEach((listener: Callback<any>, type: IEvent<any>): void => this.scene.dispatcher.on(type)(this.dispatch.bind(this)));
        }
    }
    
    private dispatch<E extends Event>(event: E): void {
        const type = event.constructor as IEvent<E>;
        const listeners = System.Listeners.get(this.type);
        if (listeners) {
            const listener = listeners.get(type);
            if (listener) {
                if (event.entity) {
                    const component = event.entity.components.get(this.type);
                    if (component) listener.call(component, event);
                } else {
                    const components = this.scene.components.all(this.type);
                    if (components) components.forEach((component: Component) => listener.call(component, event));
                }
            }
        }
    }
    
}

export interface ISystem<S extends System> {
    new (scene: Scene): S;
}