import { mat4 } from 'gl-matrix';

import Vector3 from '@math/Vector3';
import Quaternion from '@math/Quaternion';

export default class Matrix4 extends Float32Array {
    
    public static get Identity(): Matrix4 {
        return new Matrix4();
    }
    
    public static fromRotation(r: Quaternion): Matrix4 {
        let m4 = new Matrix4();
        mat4.fromQuat(m4 as any, r as any);
        return m4;
    }
    
    public static fromAxisRotation(radians: number, axis: Vector3): Matrix4 {
        let m4 = new Matrix4();
        mat4.fromRotation(m4 as any, radians, axis as any);
        return m4;
    }
    
    public static fromTranslation(t: Vector3): Matrix4 {
        let m4 = new Matrix4();
        mat4.fromTranslation(m4 as any, t as any);
        return m4;
    }
    
    public static fromScaling(s: Vector3): Matrix4 {
        let m4 = new Matrix4();
        mat4.fromScaling(m4 as any, s as any);
        return m4;
    }
    
    public static fromRotationTranslationScale(r: Quaternion, t: Vector3, s: Vector3): Matrix4 {
        let m4 = new Matrix4();
        mat4.fromRotationTranslationScale(m4 as any, r as any, t as any, s as any);
        return m4;
    }
    
    public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        let m4 = new Matrix4();
        mat4.frustum(m4 as any, left, right, bottom, top, near, far);
        return m4;
    }
    
    public static lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4 {
        let m4 = new Matrix4();
        mat4.lookAt(m4 as any, eye as any, center as any, up as any);
        return m4;
    }
    
    public static orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        let m4 = new Matrix4();
        mat4.ortho(m4 as any, left, right, bottom, top, near, far)
        return m4;
    }
    
    public static perspective(fovy: number, aspect: number, near: number, far: number): Matrix4 {
        let m4 = new Matrix4();
        mat4.perspective(m4 as any, fovy, aspect, near, far);
        return m4;
    }
    
    public get determinant(): number {
        return mat4.determinant(this as any);
    }
    
    public get frobenius(): number {
        return mat4.frob(this as any);
    }
    
    public get rotation(): Quaternion {
        let r = new Quaternion();
        mat4.getRotation(r as any, this as any);
        return r;
    }
    
    public get translation(): Vector3 {
        let t = new Vector3();
        mat4.getTranslation(t as any, this as any);
        return t;
    }
    
    public get scaling(): Vector3 {
        let s = new Vector3();
        mat4.getScaling(s as any, this as any);
        return s;
    }
    
    public constructor(...args: any[]) {
        super(16);
		if (args.length === 16) {
			this.set.call(this, args as any);
		} else if (args[0]) {
			this.copy(args[0] as any);
		} else {
			this.identity();
		}
    }
    
    public copy(m4: Matrix4): Matrix4 {
        mat4.copy(this as any, m4 as any);
        return this;
    }
    
    public identity(): Matrix4 {
        mat4.identity(this as any);
        return this;
    }
    
    public equals(m4: Matrix4): boolean {
        return mat4.equals(this as any, m4 as any);
    }
    
    public adjugate(): Matrix4 {
        mat4.adjoint(this as any, this as any);
        return this;
    }
    
    public invert(): Matrix4 {
        mat4.invert(this as any, this as any);
        return this;
    }
    
    public transpose(): Matrix4 {
        mat4.transpose(this as any, this as any);
        return this;
    }
    
    public add(m4: Matrix4): Matrix4 {
        mat4.add(this as any, this as any, m4 as any);
        return this;
    }
    
    public subtract(m4: Matrix4): Matrix4 {
        mat4.subtract(this as any, this as any, m4 as any);
        return this;
    }
    
    public multiply(m4: Matrix4): Matrix4 {
        mat4.multiply(this as any, this as any, m4 as any);
        return this;
    }
    
    public rotate(r: Quaternion): Matrix4 {
        return this.multiply(Matrix4.fromRotation(r));
    }
    
    public rotateAxis(radians: number, axis: Vector3): Matrix4 {
        mat4.rotate(this as any, this as any, radians, axis as any);
        return this;
    }
    
    public translate(t: Vector3): Matrix4 {
        mat4.translate(this as any, this as any, t as any);
        return this;
    }
    
    public scale(s: Vector3): Matrix4 {
        mat4.scale(this as any, this as any, s as any);
        return this;
    }
    
}