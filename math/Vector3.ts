import { vec3 } from 'gl-matrix';

export default class Vector3 extends Float32Array {
    
    public static get Zero(): Vector3 {
        return new Vector3();
    }
    
    public static get UnitX(): Vector3 {
        return new Vector3(1.0, 0.0, 0.0);
    }
    
    public static get UnitY(): Vector3 {
        return new Vector3(0.0, 1.0, 0.0);
    }
    
    public static get UnitZ(): Vector3 {
        return new Vector3(0.0, 0.0, 1.0);
    }
    
    public constructor(...args: any[]) {
        super(3);
		if (args.length === 3) {
			this.set.call(this, args as any);
		} else if (args[0]) {
			this.copy(args[0] as any);
		}
    }
    
    public copy(v3: Vector3): Vector3 {
        vec3.copy(this as any, v3 as any);
        return this;
    }
    
}