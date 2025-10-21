import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { TableComponent, TableColumn } from '@shared/components/table/table.component';
import { SearchableSelectComponent, SelectOption } from '@shared/components/searchable-select/searchable-select.component';
import { ReportService, Report, ReportFilters, ReportPdfResponse } from '@core/services/report.service';
import { ClientService } from '@core/services/client.service';
import { NotificationService } from '@core/services/notification.service';
import { ClientResponse } from '@core/models/client.model';

/**
 * Componente de página de reportes
 * Implementa la funcionalidad de generación y descarga de reportes de movimientos
 * Incluye filtros por fecha, cliente y descarga en formato PDF
 */
@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent, 
    InputComponent, 
    TableComponent,
    SearchableSelectComponent
  ],
  template: `
    <div class="reports-page">
      <!-- Header de la página -->
      <div class="page-header">
        <h1 class="page-title">Reportes</h1>
        <div class="page-actions">
          <app-button 
            type="primary" 
            (clicked)="generateReport()"
            [disabled]="reportForm.invalid || loading">
            Generar Reporte
          </app-button>
          <app-button 
            *ngIf="reportData.length > 0"
            type="secondary" 
            (clicked)="downloadPdf()"
            [disabled]="loading">
            Descargar PDF
          </app-button>
        </div>
      </div>

      <!-- Formulario de filtros -->
      <div class="filters-section">
        <form [formGroup]="reportForm" class="filters-form">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Cliente *</label>
              <app-searchable-select
                formControlName="clientId"
                [options]="clientOptions"
                placeholder="Buscar cliente...">
              </app-searchable-select>
              <div *ngIf="getFieldError('clientId')" class="error-message">
                {{ getFieldError('clientId') }}
              </div>
            </div>

            <app-input
              label="Fecha Inicio"
              type="date"
              formControlName="startDate"
              [required]="true"
              [errorMessage]="getFieldError('startDate')">
            </app-input>

            <app-input
              label="Fecha Fin"
              type="date"
              formControlName="endDate"
              [required]="true"
              [errorMessage]="getFieldError('endDate')">
            </app-input>
          </div>
        </form>
      </div>

      <!-- Resumen del reporte -->
      <div *ngIf="reportData.length > 0" class="report-summary">
        <div class="summary-cards">
          <div class="summary-card">
            <h3>Saldo Inicial</h3>
            <p class="summary-value">{{ reportData[0]?.initialBalance | currency:'USD':'symbol':'1.2-2' }}</p>
          </div>
          <div class="summary-card">
            <h3>Total Depósitos</h3>
            <p class="summary-value positive">{{ getTotalDeposits() | currency:'USD':'symbol':'1.2-2' }}</p>
          </div>
          <div class="summary-card">
            <h3>Total Retiros</h3>
            <p class="summary-value negative">{{ getTotalWithdrawals() | currency:'USD':'symbol':'1.2-2' }}</p>
          </div>
          <div class="summary-card">
            <h3>Saldo Final</h3>
            <p class="summary-value">{{ reportData[reportData.length - 1]?.availableBalance | currency:'USD':'symbol':'1.2-2' }}</p>
          </div>
        </div>
      </div>

      <!-- Tabla de reporte -->
      <div *ngIf="reportData.length > 0" class="report-table">
        <app-table
          [data]="reportData"
          [columns]="tableColumns"
          [showPagination]="true"
          [pageSize]="pageSize"
          title="Movimientos del Reporte">
        </app-table>
      </div>

      <!-- Mensaje cuando no hay datos -->
      <div *ngIf="reportData.length === 0 && !loading" class="no-data">
        <div class="no-data-content">
          <h3>No hay datos para mostrar</h3>
          <p>Seleccione un rango de fechas y genere un reporte para ver los movimientos.</p>
        </div>
      </div>

      <!-- Loading indicator -->
      <div *ngIf="loading" class="loading">
        <div class="loading-content">
          <div class="spinner"></div>
          <p>Generando reporte...</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  reportData: Report[] = [];
  clients: ClientResponse[] = [];
  clientOptions: SelectOption[] = [];
  loading = false;
  pageSize = 25;

  // Configuración de la tabla
  tableColumns: TableColumn[] = [
    { key: 'date', label: 'Fecha', sortable: true, type: 'date' },
    { key: 'client', label: 'Cliente', sortable: true },
    { key: 'accountNumber', label: 'Número Cuenta', sortable: true },
    { key: 'type', label: 'Tipo', sortable: true },
    { key: 'initialBalance', label: 'Saldo Inicial', sortable: true, type: 'currency' },
    { key: 'status', label: 'Estado', sortable: true, type: 'boolean' },
    { key: 'movement', label: 'Movimiento', sortable: true, type: 'currency' },
    { key: 'availableBalance', label: 'Saldo Disponible', sortable: true, type: 'currency' }
  ];

  // Formulario reactivo
  reportForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private reportService: ReportService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadClients();
    this.setDefaultDateRange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Crea el formulario reactivo
   */
  private createForm(): FormGroup {
    return this.fb.group({
      clientId: ['', Validators.required],  // Ahora es obligatorio
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  /**
   * Establece el rango de fechas por defecto (mes actual)
   */
  private setDefaultDateRange(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(1); // Primer día del mes actual

    this.reportForm.patchValue({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }

  /**
   * Carga la lista de clientes
   */
  loadClients(): void {
    this.clientService.getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (clients: ClientResponse[]) => {
          this.clients = clients;
          // Convertir clientes a opciones para el searchable-select
          this.clientOptions = clients.map(client => ({
            value: client.clientId,
            label: client.name,
            secondaryLabel: `ID: ${client.identification}`
          }));
        },
        error: (error: Error) => {
          console.error('Error cargando clientes:', error);
          this.notificationService.showError('Error', 'No se pudieron cargar los clientes');
        }
      });
  }

  /**
   * Genera el reporte de movimientos
   */
  generateReport(): void {
    if (this.reportForm.valid) {
      this.loading = true;
      const formData = this.reportForm.value;

      const filters: ReportFilters = {
        clientId: parseInt(formData.clientId),  // Ahora siempre se envía
        startDate: formData.startDate,
        endDate: formData.endDate
      };

      this.reportService.generateAccountStatement(filters)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: Report[]) => {
            this.reportData = [...data];
            this.loading = false;
            this.notificationService.showSuccess('Éxito', `Reporte generado: ${data.length} movimientos`);
          },
          error: (error: Error) => {
            console.error('Error generando reporte:', error);
            this.notificationService.showError('Error', 'No se pudo generar el reporte: ' + error.message);
            this.loading = false;
          }
        });
    }
  }

  /**
   * Descarga el reporte en formato PDF
   */
  downloadPdf(): void {
    if (this.reportData.length === 0) {
      this.notificationService.showWarning('Advertencia', 'No hay datos para descargar');
      return;
    }

    this.loading = true;
    const formData = this.reportForm.value;

    const filters: ReportFilters = {
      clientId: parseInt(formData.clientId),
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    this.reportService.downloadAccountStatementPdf(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ReportPdfResponse) => {
          // Convertir Base64 a Blob
          const blob = this.base64ToBlob(response.pdfBase64, 'application/pdf');
          
          // Descargar el archivo
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `estado-cuenta-${formData.clientId}-${formData.startDate}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
          
          this.loading = false;
          this.notificationService.showSuccess('Éxito', 'PDF descargado correctamente');
        },
        error: (error: Error) => {
          console.error('Error descargando PDF:', error);
          this.notificationService.showError('Error', 'No se pudo descargar el PDF: ' + error.message);
          this.loading = false;
        }
      });
  }

  /**
   * Convierte una cadena Base64 a Blob
   */
  private base64ToBlob(base64: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }


  /**
   * Calcula el total de depósitos
   */
  getTotalDeposits(): number {
    return this.reportData
      .filter(item => item.movement > 0)
      .reduce((total, item) => total + item.movement, 0);
  }

  /**
   * Calcula el total de retiros
   */
  getTotalWithdrawals(): number {
    return Math.abs(this.reportData
      .filter(item => item.movement < 0)
      .reduce((total, item) => total + item.movement, 0));
  }

  /**
   * Calcula el saldo neto
   */
  getNetBalance(): number {
    return this.getTotalDeposits() - this.getTotalWithdrawals();
  }

  /**
   * Obtiene el mensaje de error para un campo del formulario
   */
  getFieldError(fieldName: string): string {
    const field = this.reportForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
    }
    return '';
  }
}
