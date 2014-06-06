declare module 'crypto' {
    export function createHash(algorithm: string): any;
    export function update(data: any): any;
    export function digest(encoding: string): any;
}