
import { TypeStatutChambre } from "./type-statut-chambre";
export interface Chambre {
    id: number;
    etage: string;
    numero: string;
    type: string;
    status: TypeStatutChambre;
    prix: number;
  }