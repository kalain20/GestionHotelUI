import { Chambre } from "./chambre.interface";

export interface Etage {
  id: number;
  numero: string;
  chambres: Chambre[];
}