import { Document } from 'mongoose';

export interface Delivery extends Document {
    readonly id: number;
    readonly packageSize: number
    readonly cost:number
    readonly description: string
    readonly date: number
    readonly courier: string
    readonly sender: string
    readonly assigned: boolean

}