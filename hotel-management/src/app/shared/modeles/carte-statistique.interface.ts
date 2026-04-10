import { typeBadge } from "./type-badge";

export interface CarteStatistique {
    title: string;  
    libelle: string;
    valeur: string | number;
    cols: number;
    rows: number;
    badge: string;
    typeBadge: typeBadge;
    icone : string;
}