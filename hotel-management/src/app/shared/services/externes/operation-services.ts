import { Injectable } from "@angular/core";
import { Operation } from "../../modeles/operation.interface";
import { typeOperation } from "../../modeles/type-operation";
import { StatusClient } from "../../modeles/status-client";
import { StatusChambre } from "../../modeles/status-chambre";
import { Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class OperationService {
    constructor() {} 

    public operations: Operation[] = [{
    id: 1,
    type: typeOperation.CheckIn,
    montant: 150, 
    date: new Date('2024-06-01T14:00:00'),
    chambre: {
        id: 101,  
        etage: '1er étage',  
        numero: '101',
        type: 'Simple',
        status: 'libre',
        prix: 100
    },
    client: {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        initiales: 'JD',
        email: 'john.doe@example.com',
        telephone: '123-456-7890',
        typeLogement: 'Hôtel',
        status: StatusClient.Arrivé,
        coleurAvatar: '#FF5733'
    }

},
{
    id: 2,
    type: typeOperation.Maintenance,
    montant: 150, 
    date: new Date('2024-06-01T14:00:00'),
    chambre: {
        id: 101,  
        etage: '1er étage',  
        numero: '201',
        type: 'Simple',
        status: 'libre',
        prix: 120
    },
    client: {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        initiales: 'JD',
        email: 'john.doe@example.com',
        telephone: '123-456-7890',
        typeLogement: 'Hôtel',
        status: StatusClient.Actif,
        coleurAvatar: '#d5e342'
    }
},
{
    id: 3,
    type: typeOperation.CheckOut,
    montant: 130, 
    date: new Date('2024-06-01T14:00:00'),
    chambre: {
        id: 301,  
        etage: '2ème étage',  
        numero: '301',
        type: 'Simple',
        status: 'occupee',
        prix: 120
    },
    client: {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        initiales: 'JD',
        email: 'john.doe@example.com',
        telephone: '123-456-7890',
        typeLogement: 'Hôtel',
        status: StatusClient.Départ,
        coleurAvatar: '#d5e342'
    }
}



];

  public ajouterOperation(operation: Operation): void {
        this.operations.push(operation);
    }

   public getOperations():Observable< Operation[] > {
        return of(this.operations);
    }
}