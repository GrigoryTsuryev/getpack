
    import { Document } from 'mongoose';

    
    export interface CreateCourierDTO extends Document{
        readonly name: string
        readonly counter: number
        readonly viechle: string
        readonly date: string
        readonly revenue: number
    }