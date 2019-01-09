import Event, { IEvent } from '@core/Event';

type Callback<E extends Event> = (event: E) => void;

export default class Dispatcher {
    
    private events: Event[][] = [];
    private listeners: Map<IEvent<any>, Callback<any>[]> = new Map();
    
    public on<E extends Event>(type: IEvent<E>): (callback: Callback<E>) => void {
        return (callback: Callback<E>): void => {
            if (!this.listeners.has(type)) this.listeners.set(type, []);
            const listeners = this.listeners.get(type) as Callback<E>[];
            listeners.push(callback);
        }
    }
    
    public emit<E extends Event>(event: E): void {
        const type = event.constructor as IEvent<E>;
        if (!type.Priority) this.consume(event);
        else this.queue(event);
    }
    
    public dispatch(): void {
        this.events.forEach((events: Event[]): void => events.forEach(this.consume.bind(this)));
    }
    
    private consume<E extends Event>(event: E): void {
        const type = event.constructor as IEvent<E>;
        const listeners = this.listeners.get(type);
        if (listeners) listeners.forEach((listener: Callback<E>): void => listener(event));
    }
    
    private queue<E extends Event>(event: E): void {
        const type = event.constructor as IEvent<E>;
        const Priority = type.Priority as number;
        if (!this.events[Priority]) this.events[Priority] = [];
        const events = this.events[Priority] as Event[];
        events.push(event);
    }
    
}