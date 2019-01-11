import { vec3 } from 'gl-matrix';

import Matrix4 from '@math/Matrix4';
import Quaternion from '@math/Quaternion';

export default class Vector3 extends Float32Array {
    
    public static get Zero(): Vector3 {
        return new Vector3();
    }
    
    public static get UnitX(): Vector3 {
        return new Vector3(1.0, 0.0, 0.0);
    }
    
    public static get Left(): Vector3 {
        return new Vector3(-1.0, 0.0, 0.0);
    }
    
    public static get Right(): Vector3 {
        return new Vector3(1.0, 0.0, 0.0);
    }
    
    public static get UnitY(): Vector3 {
        return new Vector3(0.0, 1.0, 0.0);
    }
    
    public static get Up(): Vector3 {
        return new Vector3(0.0, 1.0, 0.0);
    }
    
    public static get Down(): Vector3 {
        return new Vector3(0.0, -1.0, 0.0);
    }
    
    public static get UnitZ(): Vector3 {
        return new Vector3(0.0, 0.0, 1.0);
    }
    
    public static get Forward(): Vector3 {
        return new Vector3(0.0, 0.0, 1.0);
    }
    
    public static get Backward(): Vector3 {
        return new Vector3(0.0, 0.0, -1.0);
    }
    
    public static get Random(): Vector3 {
        let result = new Vector3();
        vec3.random(result as any);
        return result;
    }
    
    public static dot(a: Vector3, b: Vector3): number {
        return vec3.dot(a as any, b as any);
    }
    
    public static cross(a: Vector3, b: Vector3): Vector3 {
        let result = new Vector3();
        vec3.cross(result as any, a as any, b as any);
        return result;
    }
    
    public static bezier(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number): Vector3 {
        let result = new Vector3();
        vec3.bezier(result as any, a as any, b as any, c as any, d as any, t);
        return result;
    }
    
    public static hermite(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number): Vector3 {
        let result = new Vector3();
        vec3.hermite(result as any, a as any, b as any, c as any, d as any, t);
        return result;
    }
    
    public static lerp(a: Vector3, b: Vector3, t: number): Vector3 {
        let result = new Vector3();
        vec3.lerp(result as any, a as any, b as any, t);
        return result;
    }
    
    public static max(a: Vector3, b: Vector3): Vector3 {
        let result = new Vector3();
        vec3.max(result as any, a as any, b as any);
        return result;
    }
    
    public static min(a: Vector3, b: Vector3): Vector3 {
        let result = new Vector3();
        vec3.min(result as any, a as any, b as any);
        return result;
    }
    
    public static equals(a: Vector3, b: Vector3): boolean {
        return vec3.equals(a as any, b as any);
    }
    
    public static angle(a: Vector3, b: Vector3): number {
        return vec3.angle(a as any, b as any);
    }
    
    public static distance(a: Vector3, b: Vector3): number {
        return vec3.distance(a as any, b as any);
    }
    
    public static distanceSquared(a: Vector3, b: Vector3): number {
        return vec3.sqrDist(a as any, b as any);
    }
    
    public static inverse(v3: Vector3): Vector3 {
        return new Vector3(v3).inverse();
    }
    
    public static negate(v3: Vector3): Vector3 {
        return new Vector3(v3).negate();
    }
    
    public static normalize(v3: Vector3): Vector3 {
        return new Vector3(v3).normalize();
    }
    
    public static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a).add(b);
    }
    
    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a).subtract(b);
    }
    
    public static multiply(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a).multiply(b);
    }
    
    public static divide(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a).divide(b);
    }
    
    public static ceil(v3: Vector3): Vector3 {
        return new Vector3(v3).ceil();
    }
    
    public static floor(v3: Vector3): Vector3 {
        return new Vector3(v3).floor();
    }
    
    public static round(v3: Vector3): Vector3 {
        return new Vector3(v3).round();
    }
    
    public static rotate(v3: Vector3, r: Quaternion): Vector3 {
        return new Vector3(v3).rotate(r);
    }
    
    public static scale(v3: Vector3, s: number): Vector3 {
        return new Vector3(v3).scale(s);
    }
    
    public static transform(v3: Vector3, m4: Matrix4): Vector3 {
        return new Vector3(v3).transform(m4);
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
    
    public get len(): number {
        return vec3.length(this as any);
    }
    
    public get lenSquared(): number {
        return vec3.sqrLen(this as any);
    }
    
    public constructor(...args: any[]) {
        super(3);
		if (args.length === 3) {
			this.set(args as any);
		} else if (args[0] && args[0] instanceof Float32Array) {
			this.copy(args[0] as any);
		}
    }
    
    public toString(): string {
        return this.join(' ');
    }
    
    public copy(v3: Vector3): this {
        vec3.copy(this as any, v3 as any);
        return this;
    }
    
    public equals(v3: Vector3): boolean {
        return Vector3.equals(this, v3);
    }
    
    public angle(v3: Vector3): number {
        return Vector3.angle(this, v3);
    }
    
    public distance(v3: Vector3): number {
        return Vector3.distance(this, v3);
    }
    
    public distanceSquared(v3: Vector3): number {
        return Vector3.distanceSquared(this, v3);
    }
    
    public inverse(): this {
        vec3.inverse(this as any, this as any);
        return this;
    }
    
    public negate(): this {
        vec3.negate(this as any, this as any);
        return this;
    }
    
    public normalize(): this {
        vec3.normalize(this as any, this as any);
        return this;
    }
    
    public add(v3: Vector3): this {
        vec3.add(this as any, this as any, v3 as any);
        return this;
    }
    
    public subtract(v3: Vector3): this {
        vec3.subtract(this as any, this as any, v3 as any);
        return this;
    }
    
    public multiply(v3: Vector3): this {
        vec3.multiply(this as any, this as any, v3 as any);
        return this;
    }
    
    public divide(v3: Vector3): this {
        vec3.divide(this as any, this as any, v3 as any);
        return this;
    }
    
    public ceil(): this {
        vec3.ceil(this as any, this as any);
        return this;
    }
    
    public floor(): this {
        vec3.floor(this as any, this as any);
        return this;
    }
    
    public round(): this {
        vec3.round(this as any, this as any);
        return this;
    }
    
    public rotate(r: Quaternion): this {
        vec3.transformQuat(this as any, this as any, r as any);
        return this;
    }
    
    public scale(s: number): this {
        vec3.scale(this as any, this as any, s);
        return this;
    }
    
    public transform(m4: Matrix4): this {
        vec3.transformMat4(this as any, this as any, m4 as any);
        return this;
    }
    
}