import { quat } from 'gl-matrix';

import Vector3 from '@math/Vector3';

export default class Quaternion extends Float32Array {
    
    public static get Identity(): Quaternion {
        return new Quaternion();
    }
    
    public static fromEuler(x: number, y: number, z: number): Quaternion {
        let result = new Quaternion();
        quat.fromEuler(result as any, x, y, z);
        return result;
    }
    
    public static fromAxes(forward: Vector3, right: Vector3, up: Vector3): Quaternion {
        let result = new Quaternion();
        quat.setAxes(result as any, forward as any, right as any, up as any);
        return result;
    }
    
    public static rotationTo(a: Vector3, b: Vector3): Quaternion {
        let result = new Quaternion();
        quat.rotationTo(result as any, a as any, b as any);
        return result;
    }
    
    public static lerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        let result = new Quaternion();
        quat.lerp(result as any, a as any, b as any, t);
        return result;
    }
    
    public static sqlerp(a: Quaternion, b: Quaternion, c: Quaternion, d: Quaternion, t: number): Quaternion {
        let result = new Quaternion();
        quat.sqlerp(result as any, a as any, b as any, c as any, d as any, t)
        return result;
    }
    
    public static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        let result = new Quaternion();
        quat.slerp(result as any, a as any, b as any, t);
        return result;
    }
    
    public static equals(a: Quaternion, b: Quaternion): boolean {
        return quat.equals(a as any, b as any);
    }
    
    public static dot(a: Quaternion, b: Quaternion): number {
        return quat.dot(a as any, b as any);
    }
    
    public static conjugate(q: Quaternion): Quaternion {
        return new Quaternion(q).conjugate();
    }
    
    public static invert(q: Quaternion): Quaternion {
        return new Quaternion(q).invert();
    }
    
    public static normalize(q: Quaternion): Quaternion {
        return new Quaternion(q).normalize();
    }
    
    public static add(a: Quaternion, b: Quaternion): Quaternion {
        return new Quaternion(a).add(b);
    }
    
    public static multiply(a: Quaternion, b: Quaternion): Quaternion {
        return new Quaternion(a).multiply(b);
    }
    
    public static rotateX(q: Quaternion, radians: number): Quaternion {
        return new Quaternion(q).rotateX(radians);
    }
    
    public static rotateY(q: Quaternion, radians: number): Quaternion {
        return new Quaternion(q).rotateY(radians);
    }
    
    public static rotateZ(q: Quaternion, radians: number): Quaternion {
        return new Quaternion(q).rotateZ(radians);
    }
    
    public static scale(q: Quaternion, s: number): Quaternion {
        return new Quaternion(q).scale(s);
    }
    
    public get x(): number {
        return this[0];
    }
    
    public set x(value: number) {
        this[0] = value;
    }
    
    public get y(): number {
        return this[1];
    }
    
    public set y(value: number) {
        this[1] = value;
    }
    
    public get z(): number {
        return this[2];
    }
    
    public set z(value: number) {
        this[2] = value;
    }
    
    public get w(): number {
        return this[3];
    }
    
    public set w(value: number) {
        this[3] = value;
    }
    
    public get len(): number {
        return quat.length(this as any);
    }
    
    public get lenSquared(): number {
        return quat.sqrLen(this as any);
    }
    
    public get axisAngle(): { axis: Vector3, angle: number } {
        let axis = new Vector3();
        const angle = quat.getAxisAngle(axis as any, this as any);
        return {
            axis,
            angle
        };
    }
    
    public constructor(...args: any[]) {
        super(4);
		if (args.length === 4) {
			this.set(args as any);
		} else if (args[0] && args[0] instanceof Float32Array) {
			this.copy(args[0] as any);
		} else {
			this.identity();
		}
    }
    
    public toString(): string {
        return this.join(' ');
    }
    
    public copy(q: Quaternion): Quaternion {
        quat.copy(this as any, q as any);
        return this;
    }
    
    public identity(): Quaternion {
        quat.identity(this as any);
        return this;
    }
    
    public equals(q: Quaternion): boolean {
        return Quaternion.equals(this, q);
    }
    
    public conjugate(): this {
        quat.conjugate(this as any, this as any);
        return this;
    }
    
    public invert(): this {
        quat.invert(this as any, this as any);
        return this;
    }
    
    public normalize(): this {
        quat.normalize(this as any, this as any);
        return this;
    }
    
    public add(q: Quaternion): this {
        quat.add(this as any, this as any, q as any);
        return this;
    }
    
    public multiply(q: Quaternion): this {
        quat.multiply(this as any, this as any, q as any);
        return this;
    }
    
    public rotateX(radians: number): this {
        quat.rotateX(this as any, this as any, radians);
        return this;
    }
    
    public rotateY(radians: number): this {
        quat.rotateY(this as any, this as any, radians);
        return this;
    }
    
    public rotateZ(radians: number): this {
        quat.rotateZ(this as any, this as any, radians);
        return this;
    }
    
    public scale(s: number): this {
        quat.scale(this as any, this as any, s);
        return this;
    }
    
}