import { ID } from "./common.interface";

export interface IDoctor {
    id: ID;
    name: string;
    specialization: string;
    hospital: string;
    phone: string;
    email: string;
    createdAt: string;
}
