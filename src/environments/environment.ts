/**
 * Configuración del entorno de desarrollo
 * Contiene las variables de configuración para el entorno local
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/spf-msa-apex-core-service',
  appName: 'Banking Portal',
  version: '1.0.0',
  enableLogging: true,
  enableMockData: false,
  features: {
    enableReports: true,
    enablePdfDownload: true,
    enableAdvancedSearch: true
  }
};


