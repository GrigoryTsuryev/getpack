import { Document } from 'mongoose';

export interface Delivery extends Document {
    readonly packageSize: number
    readonly cost:number
    readonly description: string
    readonly date: number
    readonly courier: string
    readonly sender: string
    readonly assigned: boolean

}