import {  Injectable } from "@angular/core";
import { StatutDonneesChambres } from "../../modeles/statut-donnees-chambres";

@Injectable({ providedIn: 'root' })
export class DiagrammeCirculaireService { 

   private dataByPeriod: Record<string, StatutDonneesChambres[]> = {
    today: [
      { label: 'Occupées',    compteur: 24, color: '#60a5fa', lightColor: '#e8f0fe', icon: 'hotel',        trend: +4  },
      { label: 'Libres',      compteur: 6,  color: '#057a55', lightColor: '#def7ec', icon: 'check_circle', trend: -2  },
      { label: 'Réservées',   compteur  : 5,  color: '#6c2bd9', lightColor: '#edebfe', icon: 'event',        trend: +1  },
      { label: 'Ménage',      compteur: 4,  color: '#b45309', lightColor: '#fef3c7', icon: 'cleaning_services', trend: 0 },
      { label: 'Maintenance', compteur: 3,  color: '#c81e1e', lightColor: '#fde8e8', icon: 'build',        trend: -1  },
    ],
    week: [
      { label: 'Occupées',    compteur: 22, color: '#60a5fa', lightColor: '#e8f0fe', icon: 'hotel',        trend: +6  },
      { label: 'Libres',      compteur: 8,  color: '#34d399', lightColor: '#def7ec', icon: 'check_circle', trend: -3  },
      { label: 'Réservées',   compteur  : 7,  color: '#6c2bd9', lightColor: '#edebfe', icon: 'event',        trend: +2  },
      { label: 'Ménage',      compteur: 3,  color: '#b45309', lightColor: '#fef3c7', icon: 'cleaning_services', trend: +1 },
      { label: 'Maintenance', compteur: 2,  color: '#c81e1e', lightColor: '#fde8e8', icon: 'build',        trend: 0   },
    ],
    month: [
      { label: 'Occupées',    compteur: 20, color: '#60a5fa', lightColor: '#e8f0fe', icon: 'hotel',        trend: +10 },
      { label: 'Libres',      compteur: 9,  color: '#057a55', lightColor: '#def7ec', icon: 'check_circle', trend: -5  },
      { label: 'Réservées',   compteur  : 8,  color: '#6c2bd9', lightColor: '#edebfe', icon: 'event',        trend: +3  },
      { label: 'Ménage',      compteur: 3,  color: '#ff0000', lightColor: '#fef3c7', icon: 'cleaning_services', trend: 0 },
      { label: 'Maintenance', compteur: 2,  color: '#f59e0b', lightColor: '#fde8e8', icon: 'build',        trend: -2  },
    ],
  };

  public obtenirDonneesParPeriode(): Record<string, StatutDonneesChambres[]>{
    return this.dataByPeriod;
  }

}