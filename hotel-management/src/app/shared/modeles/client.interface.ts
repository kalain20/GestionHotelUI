import { StatusClient } from "./status-client";

export interface Client {
    id: number;
    nom: string;
    prenom: string;
    initiales: string;
    email: string;
    telephone: string;
    typeLogement: string;
    status: StatusClient;
    coleurAvatar: string;
  }