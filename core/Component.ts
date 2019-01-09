import Entity from '@core/Entity';
import Event, { IEvent } from '@core/Event';
import Storage, { IStorage } from '@core/Storage';
import System from '@core/System';
import Unique from '@core/Unique';

export default class Component extends Unique {
    
    public static On<E extends Event>(type: IEvent<E>): (target: any, identifier: string, descriptor: PropertyDescriptor) => void {
        return System.on(type);
    }
    
    public entity: Entity;
    
    public constructor(entity: Entity) {
        super();
        this.entity = entity;
    }
    
}

export interface IComponent<C extends Component> {
    new (entity: Entity): C;
    storage?: IStorage<C, Storage<C>>;
}