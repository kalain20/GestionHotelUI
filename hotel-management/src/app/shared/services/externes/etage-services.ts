import { computed, Injectable, signal } from "@angular/core";
import { Etage } from "../../modeles/etage.interface";
import { Chambre } from "../../modeles/chambre.interface";
import { Observable, of } from "rxjs";





@Injectable({
    providedIn: 'root'
})
export class EtageServices {
    constructor() {
       
    } 
    
    readonly chambresLibres = signal(0);
    readonly chambresOccupees = signal(0);
    readonly chambresHorsService = signal(0);  
    readonly chambresLibreNettoyees = signal(0);
    readonly chambresANettoyer = signal(0);
    readonly chambresTotal = signal(0);
    private etages : Etage[] = [
        {
            id: 1,
            numero: '1er étage',
            chambres: [
                       { id: 101, etage: '1er étage', numero: 'Chambre 101', type: 'Simple', status: 'libre', prix: 100 },
                       { id: 102, etage: '1er étage', numero: 'Chambre 102', type: 'Double', status: 'occupee', prix: 150 },
                       { id: 103, etage: '1er étage', numero: 'Chambre 103', type: 'Suite', status: 'maintenance', prix: 300 },
                       { id: 104, etage: '1er étage', numero: 'Chambre 104', type: 'Simple', status: 'libre', prix: 100 },
                       { id: 105, etage: '1er étage', numero: 'Chambre 105', type: 'Double', status: 'occupee', prix: 150 },
                       { id: 106, etage: '1er étage', numero: 'Chambre 106', type: 'Suite', status: 'libreNettoyee', prix: 350 },
                        ],
        },
        {
            id: 2,
            numero: '2e étage',
            chambres: [
                       { id: 201, etage: '2e étage', numero: 'Chambre 201', type: 'Simple', status: 'libre', prix: 100 }, 
                       { id: 202, etage: '2e étage', numero: 'Chambre 202', type: 'Double', status: 'occupee', prix: 150 },
                       { id: 203, etage: '2e étage', numero: 'Chambre 203', type: 'Suite', status: 'maintenance', prix: 300 },
                       { id: 204, etage: '2e étage', numero: 'Chambre 204', type: 'Simple', status: 'libre', prix: 100 }, 
                       { id: 205, etage: '2e étage', numero: 'Chambre 205', type: 'Double', status: 'occupee', prix: 150 },
                       { id: 206, etage: '2e étage', numero: 'Chambre 206', type: 'Suite', status: 'aNettoyer', prix: 350 },
                 ],
        },
        {
            id: 3,
            numero: '3e étage',
            chambres: [
                        { id: 301, etage: '3e étage', numero: 'Chambre 301', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 302, etage: '3e étage', numero: 'Chambre 302', type: 'Double', status: 'occupee', prix: 150 },
                        { id: 303, etage: '3e étage', numero: 'Chambre 303', type: 'Suite', status: 'maintenance', prix: 300 },
                        { id: 304, etage: '3e étage', numero: 'Chambre 304', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 305, etage: '3e étage', numero: 'Chambre 305', type: 'Double', status: 'occupee', prix: 150 },
                        { id: 306, etage: '3e étage', numero: 'Chambre 306', type: 'Double', status: 'aNettoyer', prix: 150 },
            ],
        },
        {
            id: 4,
            numero: '4e étage',
            chambres: [
                        { id: 401, etage: '4e étage', numero: 'Chambre 401', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 402, etage: '4e étage', numero: 'Chambre 402', type: 'Double', status: 'occupee', prix: 150 },
                        { id: 403, etage: '4e étage', numero: 'Chambre 403', type: 'Suite', status: 'maintenance', prix: 300 },
                        { id: 404, etage: '4e étage', numero: 'Chambre 404', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 405, etage: '4e étage', numero: 'Chambre 405', type: 'Double', status: 'occupee', prix: 150 }, 
                        { id: 406, etage: '4e étage', numero: 'Chambre 406', type: 'Double', status: 'aNettoyer', prix: 150 },  
            ],
        },
        {
            id: 5,
            numero: '5e étage',
            chambres: [
                        { id: 501, etage: '5e étage', numero: 'Chambre 501', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 502, etage: '5e étage', numero: 'Chambre 502', type: 'Double', status: 'occupee', prix: 150 },
                        { id: 503, etage: '5e étage', numero: 'Chambre 503', type: 'Suite', status: 'maintenance', prix: 300 },
                        { id: 504, etage: '5e étage', numero: 'Chambre 504', type: 'Simple', status: 'libre', prix: 100 },
                        { id: 505, etage: '5e étage', numero: 'Chambre 505', type: 'Double', status: 'occupee', prix: 150 }, 
                        { id: 506, etage: '5e étage', numero: 'Chambre 506', type: 'Suite', status: 'libreNettoyee', prix: 350 },
            ],
        },
    ];
    

   public getEtages(): Observable<Etage[]> {
        return of(this.etages);
    }
    
   
    //   public compterChambresParStatus(): void 
    //   {
    //     // On réinitialise les compteurs avant de compter
    //     let disponible = 0; let reservee = 0; let maintenance = 0; let libreNettoyee = 0; let aNettoyer = 0; let total = 0; 
        
    //     this.etages.forEach(etage => {
    //         total += etage.chambres.length; // Compte le total de chambres
    //         etage.chambres.forEach(chambre => {
    //             if (chambre.status === 'libre') disponible++;
    //             if (chambre.status === 'occupee') reservee++;
    //             if (chambre.status === 'maintenance') maintenance++;
    //             if (chambre.status === 'libreNettoyee') libreNettoyee++;
    //             if (chambre.status === 'aNettoyer') aNettoyer++            
    //         });
    //     });

    //     // On met à jour les signaux
    //     this.chambresLibres.set(disponible);
    //     this.chambresOccupees.set(reservee);
    //     this.chambresHorsService.set(maintenance);
    //     this.chambresLibreNettoyees.set(libreNettoyee);
    //     this.chambresANettoyer.set(aNettoyer);
    //     this.chambresTotal.set(total);
    // }
       
    // public obtenirChambres(etages : Etage[]): Chambre[] {
    //     let chambres: Chambre[] = [];
    //     etages.forEach(etage => {
    //         chambres = chambres.concat(etage.chambres);
    //     });
    //     console.log(`Total de chambres récupérées: ${chambres.length}`);
    //     return chambres;
    // }
}
