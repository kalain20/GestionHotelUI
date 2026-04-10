import { Component, computed, Input, signal } from '@angular/core';
import{ CarteStatistique } from "../../../shared/modeles/carte-statistique.interface";
import { MatCardContent, MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgClass} from '@angular/common'; 
import { EtageServices } from '../../../shared/services/externes/etage-services';
import { Etage } from '../../../shared/modeles/etage.interface';
import { Chambre } from '../../../shared/modeles/chambre.interface';

@Component({
  selector: 'app-statistique-carte',
  standalone: true,
  templateUrl: './statistique-carte.component.html',
  styleUrls: ['./statistique-carte.component.scss'],
  imports: [MatCardContent, MatCard, MatIcon, NgClass, MatProgressBarModule],
})
export class StatiqueCarteComponent  {
  @Input() statistiques: CarteStatistique[] = [];
  @Input() cartesPerformance: CarteStatistique | undefined;
public etagesDTOs: Etage[] = [];
    readonly chambresLibres = signal(0);
    readonly chambresOccupees = signal(0);
    readonly chambresHorsService = signal(0);  
    readonly chambresLibreNettoyees = signal(0);
    readonly chambresANettoyer = signal(0);
    readonly chambresTotal = signal(0);
   constructor(private etagesService: EtageServices) {
    this.etagesService.getEtages().subscribe((etagesDtos : Etage[]) => {
      this.etagesDTOs = etagesDtos;
      console.log('Etages reçus dans StatistiqueCarteComponent:', etagesDtos);
      // Vous pouvez également faire d'autres traitements ici si nécessaire
    });

     this.obtenirChambres(this.etagesDTOs); // Appeler la méthode pour obtenir les chambres
  
   }
   
    public readonly tauxOccupation = computed(() => {
        const totalChambres = this.obtenirChambres(this.etagesDTOs).length;
        const chambresOccupees = this.chambresOccupees();
        if(totalChambres === 0) return 0; // Éviter la division par zéro
        console.log(`Calcul du taux d'occupation: ${chambresOccupees} chambres occupées sur ${totalChambres} chambres totales.`);
        return Math.round((chambresOccupees / totalChambres) * 100);
    });
   
   public getCouleurTaux(valeur: number | string): string {
    const v = Number(valeur);
    if (v < 40) 
        return '#f44336';   // rouge
    if (v < 70) 
        return '#ff9800';   // orange
        return '#4caf50';   // vert
    }

    


        
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
       
    public obtenirChambres(etages : Etage[]): Chambre[] {
        let chambres: Chambre[] = [];
        etages.forEach(etage => {
            chambres = chambres.concat(etage.chambres);
        });
        console.log(`Total de chambres récupérées: ${chambres.length}`);
        return chambres;
    }
}