import Entity from '@core/Entity';

export default class Event {
    
    public entity?: Entity;
    
    public constructor(entity?: Entity) {
        this.entity = entity;
    }
    
}

export interface IEvent<E> {
    new (...args: any[]): E;
    Priority?: number;
}