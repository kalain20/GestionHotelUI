import { Injectable, computed, signal } from "@angular/core"; // 1. Importer computed
import { CarteStatistique } from "../../modeles/carte-statistique.interface";
import { Observable, of } from "rxjs";
import { EtageServices } from "./etage-services";
import { toObservable } from '@angular/core/rxjs-interop';
import { Chambre } from "../../modeles/chambre.interface";
import { Etage } from "../../modeles/etage.interface";

@Injectable({ providedIn: 'root' })
export class CarteStatistiqueService {
    readonly chambresLibres = signal(0);
    readonly chambresOccupees = signal(0);
    readonly chambresHorsService = signal(0);  
    readonly chambresLibreNettoyees = signal(0);
    readonly chambresANettoyer = signal(0);
    readonly chambresTotal = signal(0);
    public etagesDTOs: Etage[] = [];
    // 2. Utiliser private pour l'injection et "readonly" pour la sécurité
    constructor(private etageService: EtageServices) {
        etageService.getEtages().subscribe((etagesDTOs : Etage[]) => {
            this.etagesDTOs = etagesDTOs;
           console.log('Etages reçus dans CarteStatistiqueService:', etagesDTOs);
           this.compterChambresParStatus(); // Compter les chambres dès que les données sont reçues
        });
    }

    public cartesPerformance = computed<CarteStatistique>(() => {
     return   {
            title: 'Statistiques de l\'hôtel',
            libelle: 'Taux d\'occupation',          
            valeur: this.tauxOccupation(), // Utiliser le taux d'occupation calculé ce calcul doit etre 
            // fait à partir de données receuillies par l'API, l'API va retouner la liste de chambres avec leur status et à partir de cette liste on va calculer le taux d'occupation
            // de cela on va calculer le taux d'occupation des chambres, 
            icone: 'bar_chart',
            typeBadge: 'primary',           
            badge: `Taux d'occupation de ${this.tauxOccupation()}%`,
            cols: 2,
            rows: 1
      }
});
public cartesPerformance$ = toObservable(this.cartesPerformance);
        
         
    // 3. Utiliser "computed" pour que le tableau se mette à jour dès qu'un signal change
    public cartesOperationnelles = computed<CarteStatistique[]>(() => [
        
        {
            title: 'Statistiques de l\'hôtel',
            libelle: 'Chambres Libres',
            // Dès que chambresDisponibles change, TOUT le tableau est recalculé
            valeur: this.chambresLibres(), //Exaactement le même scenario avec le taux d'occupation
            icone: 'bed',
            typeBadge: 'success',
            badge: `${this.chambresLibres()} chambres libres`,
            cols: 1,
            rows: 1
        },
        {  
            title: 'Statistiques de l\'hôtel',
            libelle: 'Chambres Ocupées',
            valeur: this.chambresOccupees(), // Utiliser aussi le signal ici
            icone: 'group',
            typeBadge: 'info',
            badge: `${this.chambresOccupees()} chambres occupées`,
            cols: 1,
            rows: 1
        },
        {  
            title: 'Statistiques de l\'hôtel',
            libelle: 'Chambres Libres et Nettoyées',
            valeur: this.chambresLibreNettoyees(), // Utiliser aussi le signal ici
            icone: 'stars',
            typeBadge: 'secondary',
            badge: `${this.chambresLibreNettoyees()} chambres libres et nettoyées`,
            cols: 1,
            rows: 1
        },
        {
            title: 'Statistiques de l\'hôtel',      
            libelle: 'Chambres à nettoyer',
            valeur: this.chambresANettoyer(), // Utiliser aussi le signal ici  
            icone: 'cleaning_services',
            typeBadge: 'warning',
            badge: `${this.chambresANettoyer()} chambres à nettoyer`,
            cols: 1,
            rows: 1
        },
        // ... vos autres cartes
        {
            title: 'Statistiques de l\'hôtel',      
            libelle: 'Chambres en maintenance',
            valeur: this.chambresHorsService(), // Utiliser aussi le signal ici
            icone: 'build',         
            typeBadge: 'danger',
            badge: `${this.chambresHorsService()} en maintenance`,
            cols: 1,
            rows: 1
        }
    ]);
      public readonly tauxOccupation = computed(() => {
        const totalChambres = this.chambresTotal();
        const chambresOccupees = this.chambresOccupees();
        if(totalChambres === 0) return 0; // Éviter la division par zéro
        console.log(`Calcul du taux d'occupation: ${chambresOccupees} chambres occupées sur ${totalChambres} chambres totales.`);
        return Math.round((chambresOccupees / totalChambres) * 100);
    });

    public compterChambresParStatus(): void 
          {
            // On réinitialise les compteurs avant de compter
            let disponible = 0; let reservee = 0; let maintenance = 0; let libreNettoyee = 0; let aNettoyer = 0; let total = 0; 
            
            this.etagesDTOs.forEach((etage : Etage) => {
    
                  total += etage.chambres.length; // Compte le total de chambres
                  etage.chambres.forEach((chambre : Chambre) => {
                      if (chambre.status === 'libre') disponible++;
                      if (chambre.status === 'occupee') reservee++;
                      if (chambre.status === 'maintenance') maintenance++;
                      if (chambre.status === 'libreNettoyee') libreNettoyee++;
                      if (chambre.status === 'aNettoyer') aNettoyer++            
                  });
            })
       
            // On met à jour les signaux
            this.chambresLibres.set(disponible);
            this.chambresOccupees.set(reservee);
            this.chambresHorsService.set(maintenance);
            this.chambresLibreNettoyees.set(libreNettoyee);
            this.chambresANettoyer.set(aNettoyer);
            this.chambresTotal.set(total);
        }
    // 4. Pour rester compatible avec votre composant qui attend un Observable
    public getCarteStatistiqueOperationnelle(): Observable<CarteStatistique[]> {
        return of(this.cartesOperationnelles());
    }
   
}