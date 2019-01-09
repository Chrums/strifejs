interface Type {
    new (...args: any[]): any;
    name: string;
}

type Optional<T> = T | undefined;