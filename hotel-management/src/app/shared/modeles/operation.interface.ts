import { Chambre } from "./chambre.interface";
import { Client } from "./client.interface";
import { typeOperation } from "./type-operation";

export interface Operation {
    id: number;
    type: typeOperation;
    montant: number;
    date: Date;
    chambre: Chambre;
    client: Client
}