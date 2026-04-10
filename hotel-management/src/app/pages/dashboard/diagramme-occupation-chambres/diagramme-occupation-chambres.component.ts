import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
  computed,
} from "@angular/core";
 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {
  Chart,
  ChartData,
  ChartOptions,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
} from 'chart.js';
import { StatutDonneesChambres } from "../../../shared/modeles/statut-donnees-chambres";
import { DiagrammeCirculaireService } from "../../../shared/services/externes/diagramme-circulaire-service";
 
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);
 
@Component({
  selector: 'app-diagramme-occupation-chambres',
  standalone: true,
  templateUrl: './diagramme-occupation-chambres.component.html',
  styleUrls: ['./diagramme-occupation-chambres.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
})
export class DiagrammeOccupationChambresComponent implements OnInit, AfterViewInit, OnDestroy {
 
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private chart: Chart<'doughnut'> | null = null;
 
  // ── Signals ──
  selectedPeriod = signal<'today' | 'week' | 'month'>('today');
  hoveredIndex   = signal<number | null>(null);
 
  constructor(private diagrammeCirculaireService: DiagrammeCirculaireService) {}
 
  // ── Computed ──
  statusData = computed<StatutDonneesChambres[]>(
    () => this.diagrammeCirculaireService.obtenirDonneesParPeriode()[this.selectedPeriod()]
  );
 
  totalChambres = computed(() =>
    this.statusData().reduce((s, d) => s + d.compteur, 0)
  );
 
  occupancyRate = computed(() => {
    const data     = this.statusData();
    const occupied = data.find(d => d.label === 'Occupées')?.compteur ?? 0;
    return Math.round((occupied / this.totalChambres()) * 100);
  });
 
  revpar = computed(() =>
    Math.round((this.occupancyRate() / 100) * 126)
  );
 
  public ngOnInit(): void {}
 
  public ngAfterViewInit(): void {
    this.buildChart();
  }
 
  public ngOnDestroy(): void {
    this.chart?.destroy();
  }
 
  // ── Build / rebuild chart ──
  public buildChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
 
    const data = this.statusData();
    const ctx  = this.chartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;
 
    // ── Plugin texte central ──────────────────────────────────
    const centerTextPlugin = {
      id: 'centerText',
      afterDraw: (chart: any) => {
        const { ctx, chartArea: { top, bottom, left, right } } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        const rate    = this.occupancyRate();
 
        ctx.save();
 
        // Pourcentage
        ctx.font         = 'bold 28px sans-serif';
        ctx.fillStyle    = '#ffffff'; // ← couleur du chiffre
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${rate}%`, centerX, centerY - 10);
 
        // Sous-label "occupation"
        ctx.font      = '11px sans-serif';
        ctx.fillStyle = '#aaaaaa'; // ← couleur du label
        ctx.fillText('occupation', centerX, centerY + 14);
 
        ctx.restore();
      },
    };
    // ─────────────────────────────────────────────────────────
 
    const chartData: ChartData<'doughnut'> = {
      labels: data.map(d => d.label),
      datasets: [{
        data:                 data.map(d => d.compteur),
        backgroundColor:      data.map(d => d.color),
        hoverBackgroundColor: data.map(d => d.color),
        borderColor:          '#ffffff',
        borderWidth:          3,
        hoverOffset:          8,
        hoverBorderWidth:     3,
      }],
    };
 
    const options: ChartOptions<'doughnut'> = {
      responsive:          true,
      maintainAspectRatio: false,
      cutout:              '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = ctx.parsed;
              const pct = Math.round((val / this.totalChambres()) * 100);
              return `  ${val} chambres (${pct}%)`;
            },
          },
          backgroundColor: 'rgba(26,26,24,0.92)',
          titleColor:      '#fff',
          bodyColor:       '#ccc',
          padding:         10,
          cornerRadius:    8,
        },
      },
      onHover: (_, elements) => {
        this.hoveredIndex.set(elements.length ? elements[0].index : null);
      },
    };
 
    this.chart = new Chart(ctx, {
      type:    'doughnut',
      data:    chartData,
      options: options,
      plugins: [centerTextPlugin], // ← plugin texte central
    });
  }
 
  // ── Period change ──
  public onPeriodChange(period: 'today' | 'week' | 'month'): void {
    this.selectedPeriod.set(period);
    setTimeout(() => this.buildChart(), 0);
  }
 
  // ── Helpers ──
  public getPercentage(count: number): number {
    return Math.round((count / this.totalChambres()) * 100);
  }
 
  public trendLabel(trend: number): string {
    if (trend === 0) return '=';
    return trend > 0 ? `+${trend}%` : `${trend}%`;
  }
 
  public trendColor(trend: number): string {
    if (trend === 0) return '#aaa';
    return trend > 0 ? '#057a55' : '#c81e1e';
  }
 
  public trendIcon(trend: number): string {
    if (trend === 0) return 'remove';
    return trend > 0 ? 'trending_up' : 'trending_down';
  }
 
  public periodLabel(): string {
    return {
      today: "Aujourd'hui",
      week:  'Cette semaine',
      month: 'Ce mois',
    }[this.selectedPeriod()];
  }
}