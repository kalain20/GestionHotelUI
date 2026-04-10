import { Component, Input, OnInit, computed, signal } from "@angular/core";
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Etage } from "../../../shared/modeles/etage.interface";
import { Chambre } from "../../../shared/modeles/chambre.interface";
import { TypeStatutChambre } from "../../../shared/modeles/type-statut-chambre";
import { EtageServices } from "../../../shared/services/externes/etage-services";
 
const LIMITE_AFFICHAGE = 20;
 
@Component({
  selector: 'app-chambre-carte',
  standalone: true,
  templateUrl: './chambre-carte.component.html',
  styleUrls: ['./chambre-carte.component.scss'],
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    NgClass, MatTooltipModule, MatIcon, MatButtonModule,
  ],
})
export class ChambreCarteComponent implements OnInit {
 
    
  @Input() etages: Etage[] = [];
   public etagesDTOs: Etage[] = [];
  selectionneeChambre: Chambre | null = null;
  voirTout = signal<boolean>(false);
 
  constructor(private etagesService: EtageServices) {
    this.etagesService.getEtages().subscribe((etagesDTOs : Etage[]) => {
            this.etagesDTOs = etagesDTOs;
           console.log('Chambres récupérées du service:', this.etagesDTOs);
        });
  }
 
  ngOnInit(): void {
    console.log('ChambreCarteComponent initialized', this.etages);
  }
 
  // ── Toutes les chambres à plat ──
  private get toutesChambres(): Chambre[] {
    return this.etages.flatMap(e => e.chambres);
  }
 
  // ── Nombre total de chambres ──
  get totalChambres(): number {
    return this.toutesChambres.length;
  }
 
  // ── Chambres visibles selon le mode ──
  get chambresVisibles(): Chambre[] {
    if (this.voirTout()) return this.toutesChambres;
    return this.toutesChambres.slice(0, LIMITE_AFFICHAGE);
  }
 
  // ── Étages filtrés selon les chambres visibles ──
  get etagesFiltres(): Etage[] {
    const visibles = new Set(this.chambresVisibles.map(c => c.numero));
    return this.etages
      .map(etage => ({
        ...etage,
        chambres: etage.chambres.filter(c => visibles.has(c.numero)),
      }))
      .filter(etage => etage.chambres.length > 0);
  }
 
  get chambresRestantes(): number {
    return Math.max(0, this.totalChambres - LIMITE_AFFICHAGE);
  }
 
  public toggleVoirTout(): void {
    this.voirTout.set(!this.voirTout());
    if (!this.voirTout()) {
      this.selectionneeChambre = null;
    }
  }
 
  public recupererTypeClass(statut: TypeStatutChambre): string {
    return statut === 'occupee'       ? 'chip-occupee'        :
           statut === 'libre'         ? 'chip-disponible'     :
           statut === 'aNettoyer'     ? 'chip-a-nettoyer'     :
           statut === 'maintenance'   ? 'chip-maintenance'    :
           statut === 'libreNettoyee' ? 'chip-libre-nettoyee' : '';
  }
 
  public recupererTypeLabel(statut: TypeStatutChambre): string {
    return statut === 'occupee'       ? 'Occupée'        :
           statut === 'libre'         ? 'Libre'          :
           statut === 'aNettoyer'     ? 'À Nettoyer'     :
           statut === 'maintenance'   ? 'Maintenance'    :
           statut === 'libreNettoyee' ? 'Libre Nettoyée' : 'Inconnu';
  }
 
  public chambreClick(chambre: Chambre): void {
    this.selectionneeChambre =
      this.selectionneeChambre?.numero === chambre.numero ? null : chambre;
  }
 
  public trackByNumero(_: number, chambre: Chambre): string {
    return chambre.numero;
  }
 
  public recupererBadgeClass(statut: TypeStatutChambre): string {
    return statut === 'occupee'       ? 'badge-occupee'        :
           statut === 'libre'         ? 'badge-disponible'     :
           statut === 'aNettoyer'     ? 'badge-a-nettoyer'     :
           statut === 'maintenance'   ? 'badge-maintenance'    :
           statut === 'libreNettoyee' ? 'badge-libre-nettoyee' : '';
  }

     
}