import { Injectable } from "@angular/core";
import { Client } from "../../modeles/client.interface";
import { StatusClient } from "../../modeles/statut-client";
import { Observable, of } from "rxjs";

@Injectable({   providedIn: 'root' })
export class ClientServices {
    constructor() {} 
    public clients : Client[] = [
        {
            id: 1,
            nom: 'Doe',
            prenom: 'John',
            initiales: 'JD',
            email: 'john.doe@example.com',
            telephone: '123-456-7890',
            typeLogement: 'Hôtel',
            status: StatusClient.Actif,
            coleurAvatar: '#FF5733'
        },
        {
            id: 2,
            nom: 'Smith',
            prenom: 'Jane',
            initiales: 'JS',
            email: '  jane.smith@example.com',
            telephone: '098-765-4321',
            typeLogement: 'Hôtel',
            status: StatusClient.Actif,
            coleurAvatar: '#d5e342'
        },
        {
            id: 3,
            nom: 'Brown',
            prenom: 'Charlie',
            initiales: 'CB',
            email: '    charlie.brown@example.com',
            telephone: '555-1234',
            typeLogement: 'Hôtel',
            status: StatusClient.Actif,
            coleurAvatar: '#3498db'
        },
        {
            id: 4,
            nom: 'Johnson',
            prenom: 'Emily',
            initiales: 'EJ',
            email: '    emily.johnson@example.com',
            telephone: '555-5678',
            typeLogement: 'Hôtel',
            status: StatusClient.Actif,
            coleurAvatar: '#e74c3c'
            },
            {
            id: 5,
            nom: 'Davis',
            prenom: 'Michael',
            initiales: 'MD',
            email: '  michael.davis@example.com',
            telephone: '555-9012',
            typeLogement: 'Hôtel',
            status: StatusClient.Actif, 
            coleurAvatar: '#9b59b6'
            }

    ];
    public getClients(): Observable<Client[]> {
        return of(this.clients);
    }

    public ajouterClient(client: Client): void {
        if(client !== null) {
            this.clients.push(client);
        }
       
    }
}