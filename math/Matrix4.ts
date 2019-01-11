import { mat4 } from 'gl-matrix';

import Vector3 from '@math/Vector3';
import Quaternion from '@math/Quaternion';

export default class Matrix4 extends Float32Array {
    
    public static get Identity(): Matrix4 {
        return new Matrix4();
    }
    
    public static fromRotation(r: Quaternion): Matrix4 {
        let result = new Matrix4();
        mat4.fromQuat(result as any, r as any);
        return result;
    }
    
    public static fromXRotation(radians: number): Matrix4 {
        let result = new Matrix4();
        mat4.fromXRotation(result as any, radians as any);
        return result;
    }
    
    public static fromYRotation(radians: number): Matrix4 {
        let result = new Matrix4();
        mat4.fromYRotation(result as any, radians as any);
        return result;
    }
    
    public static fromZRotation(radians: number): Matrix4 {
        let result = new Matrix4();
        mat4.fromZRotation(result as any, radians as any);
        return result;
    }
    
    public static fromAxisRotation(radians: number, axis: Vector3): Matrix4 {
        let result = new Matrix4();
        mat4.fromRotation(result as any, radians, axis as any);
        return result;
    }
    
    public static fromTranslation(t: Vector3): Matrix4 {
        let result = new Matrix4();
        mat4.fromTranslation(result as any, t as any);
        return result;
    }
    
    public static fromScaling(s: Vector3): Matrix4 {
        let result = new Matrix4();
        mat4.fromScaling(result as any, s as any);
        return result;
    }
    
    public static fromRotationTranslationScale(r: Quaternion, t: Vector3, s: Vector3): Matrix4 {
        let result = new Matrix4();
        mat4.fromRotationTranslationScale(result as any, r as any, t as any, s as any);
        return result;
    }
    
    public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        let result = new Matrix4();
        mat4.frustum(result as any, left, right, bottom, top, near, far);
        return result;
    }
    
    public static lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4 {
        let result = new Matrix4();
        mat4.lookAt(result as any, eye as any, center as any, up as any);
        return result;
    }
    
    public static orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        let result = new Matrix4();
        mat4.ortho(result as any, left, right, bottom, top, near, far)
        return result;
    }
    
    public static perspective(fovy: number, aspect: number, near: number, far: number): Matrix4 {
        let result = new Matrix4();
        mat4.perspective(result as any, fovy, aspect, near, far);
        return result;
    }
    
    public static equals(a: Matrix4, b: Matrix4): boolean {
        return mat4.equals(a as any, b as any);
    }
    
    public static adjoint(m4: Matrix4): Matrix4 {
        return new Matrix4(m4).adjoint();
    }
    
    public static invert(m4: Matrix4): Matrix4 {
        return new Matrix4(m4).invert();
    }
    
    public static transpose(m4: Matrix4): Matrix4 {
        return new Matrix4(m4).transpose();
    }
    
    public static add(a: Matrix4, b: Matrix4): Matrix4 {
        return new Matrix4(a).add(b);
    }
    
    public static subtract(a: Matrix4, b: Matrix4): Matrix4 {
        return new Matrix4(a).subtract(b);
    }
    
    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        return new Matrix4(a).multiply(b);
    }
    
    public static rotate(m4: Matrix4, r: Quaternion): Matrix4 {
        return new Matrix4(m4).rotate(r);
    }
    
    public static rotateX(m4: Matrix4, radians: number): Matrix4 {
        return new Matrix4(m4).rotateX(radians);
    }
    
    public static rotateY(m4: Matrix4, radians: number): Matrix4 {
        return new Matrix4(m4).rotateY(radians);
    }
    
    public static rotateZ(m4: Matrix4, radians: number): Matrix4 {
        return new Matrix4(m4).rotateZ(radians);
    }
    
    public static rotateAxis(m4: Matrix4, radians: number, axis: Vector3): Matrix4 {
        return new Matrix4(m4).rotateAxis(radians, axis);
    }
    
    public static translate(m4: Matrix4, t: Vector3): Matrix4 {
        return new Matrix4(m4).translate(t);
    }
    
    public static scale(m4: Matrix4, s: Vector3): Matrix4 {
        return new Matrix4(m4).scale(s);
    }
    
    public get determinant(): number {
        return mat4.determinant(this as any);
    }
    
    public get frobenius(): number {
        return mat4.frob(this as any);
    }
    
    public get rotation(): Quaternion {
        let result = new Quaternion();
        mat4.getRotation(result as any, this as any);
        return result;
    }
    
    public get translation(): Vector3 {
        let result = new Vector3();
        mat4.getTranslation(result as any, this as any);
        return result;
    }
    
    public get scaling(): Vector3 {
        let result = new Vector3();
        mat4.getScaling(result as any, this as any);
        return result;
    }
    
    public constructor(...args: any[]) {
        super(16);
		if (args.length === 16) {
			this.set(args as any);
		} else if (args[0] && args[0] instanceof Float32Array) {
			this.copy(args[0] as any);
		} else {
			this.identity();
		}
    }
    
    public toString(): string {
        const array = [...this];
        let result = [];
        for (let i = 0; i < array.length; i += 4) {
            result.push(`  ${array.slice(i, i + 4).join(' ')}`);
        }
        return result.join('\n');
    }
    
    public copy(m4: Matrix4): this {
        mat4.copy(this as any, m4 as any);
        return this;
    }
    
    public identity(): this {
        mat4.identity(this as any);
        return this;
    }
    
    public equals(m4: Matrix4): boolean {
        return Vector3.equals(this as any, m4 as any);
    }
    
    public adjoint(): this {
        mat4.adjoint(this as any, this as any);
        return this;
    }
    
    public invert(): this {
        mat4.invert(this as any, this as any);
        return this;
    }
    
    public transpose(): this {
        mat4.transpose(this as any, this as any);
        return this;
    }
    
    public add(m4: Matrix4): this {
        mat4.add(this as any, this as any, m4 as any);
        return this;
    }
    
    public subtract(m4: Matrix4): this {
        mat4.subtract(this as any, this as any, m4 as any);
        return this;
    }
    
    public multiply(m4: Matrix4): this {
        mat4.multiply(this as any, this as any, m4 as any);
        return this;
    }
    
    public rotate(r: Quaternion): this {
        return this.multiply(Matrix4.fromRotation(r));
    }
    
    public rotateX(radians: number): this {
        mat4.rotateX(this as any, this as any, radians);
        return this;
    }
    
    public rotateY(radians: number): this {
        mat4.rotateY(this as any, this as any, radians);
        return this;
    }
    
    public rotateZ(radians: number): this {
        mat4.rotateZ(this as any, this as any, radians);
        return this;
    }
    
    public rotateAxis(radians: number, axis: Vector3): this {
        mat4.rotate(this as any, this as any, radians, axis as any);
        return this;
    }
    
    public translate(t: Vector3): this {
        mat4.translate(this as any, this as any, t as any);
        return this;
    }
    
    public scale(s: Vector3): this {
        mat4.scale(this as any, this as any, s as any);
        return this;
    }
    
}