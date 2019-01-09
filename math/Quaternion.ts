import { quat } from 'gl-matrix';

export default class Quaternion extends Float32Array {
    
    public constructor(...args: any[]) {
        super(4);
		if (args.length === 4) {
			this.set.call(this, args as any);
		} else if (args[0]) {
			this.copy(args[0] as any);
		} else {
			this.identity();
		}
    }
    
    public copy(q: Quaternion): Quaternion {
        quat.copy(this as any, q as any);
        return this;
    }
    
    public identity(): Quaternion {
        quat.identity(this as any);
        return this;
    }
    
}