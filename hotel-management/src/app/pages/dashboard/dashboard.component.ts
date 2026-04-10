import { Component, OnInit } from '@angular/core';
import { CarteStatistiqueService } from '../../shared/services/externes/carte-statistique-service';
import { ClientServices } from '../../shared/services/externes/client-services';
import { OperationService } from '../../shared/services/externes/operation-services';   
import { Client } from '../../shared/modeles/client.interface';
import { Operation } from '../../shared/modeles/operation.interface';
import { Etage } from '../../shared/modeles/etage.interface'; 

import { EtageServices } from '../../shared/services/externes/etage-services';
import { CarteStatistique } from '../../shared/modeles/carte-statistique.interface';
import { StatiqueCarteComponent } from "./statistique-carte/statistique-carte.component";
import{AsyncPipe} from "@angular/common";
import { Observable } from 'rxjs';
import { ChambreCarteComponent } from "./chambre-carte/chambre-carte.component";
import { DiagrammeOccupationChambresComponent } from "./diagramme-occupation-chambres/diagramme-occupation-chambres.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [StatiqueCarteComponent, AsyncPipe, ChambreCarteComponent, DiagrammeOccupationChambresComponent],
})
export class DashboardComponent implements OnInit {
 public statistiques: Observable<CarteStatistique[]> | undefined;
  etages$!: Observable<Etage[]>;
  operations$!: Observable<Operation[]>;
  clients$!: Observable<Client[]>;
  public cartesPerformance$: Observable<CarteStatistique> |undefined;

  constructor(private carteStatistiqueService: CarteStatistiqueService,
             private etageService: EtageServices,
              private clientService: ClientServices,
              private operationService: OperationService
              
  ) {
   
  }

  ngOnInit(): void {
    this.statistiques      = this.carteStatistiqueService.getCarteStatistiqueOperationnelle();
    this.etages$     = this.etageService.getEtages();
    this.operations$ = this.operationService.getOperations();
    this.clients$    = this.clientService.getClients();
    this.cartesPerformance$ = this.carteStatistiqueService.cartesPerformance$;
  }
}