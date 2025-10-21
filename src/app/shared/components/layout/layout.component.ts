import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de layout principal
 * Implementa la estructura visual del portal bancario con header, sidebar y área de contenido
 * Basado en el diseño proporcionado en la imagen
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-container">
      <!-- Header superior con branding del banco -->
      <header class="header">
        <div class="header-content">
          <h1 class="app-title">Front End</h1>
          <div class="bank-branding">
            <div class="bank-icon">💳</div>
            <span class="bank-name">BANCO</span>
          </div>
        </div>
      </header>

      <div class="main-content">
        <!-- Sidebar de navegación -->
        <nav class="sidebar">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/clients" 
                 routerLinkActive="active" 
                 class="nav-link"
                 [class.active]="isActiveRoute('/clients')">
                Clientes
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/accounts" 
                 routerLinkActive="active" 
                 class="nav-link"
                 [class.active]="isActiveRoute('/accounts')">
                Cuentas
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/movements" 
                 routerLinkActive="active" 
                 class="nav-link"
                 [class.active]="isActiveRoute('/movements')">
                Movimientos
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/reports" 
                 routerLinkActive="active" 
                 class="nav-link"
                 [class.active]="isActiveRoute('/reports')">
                Reportes
              </a>
            </li>
          </ul>
        </nav>

        <!-- Área de contenido principal -->
        <main class="content-area">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() currentRoute = '';

  /**
   * Verifica si una ruta está activa
   * @param route - Ruta a verificar
   * @returns true si la ruta está activa
   */
  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }
}


