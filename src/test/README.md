# Pruebas Unitarias - Arquetipo MFA Nexus Portal Web

Este directorio contiene todas las pruebas unitarias del proyecto, organizadas en una estructura que replica la arquitectura de `src/app/`.

## 📁 Estructura

```
src/test/
├── core/
│   └── services/
│       ├── client.service.spec.ts       (PRIORIDAD: CRÍTICA)
│       ├── movement.service.spec.ts     (PRIORIDAD: CRÍTICA)
│       └── account.service.spec.ts      (PRIORIDAD: ALTA)
├── features/
│   └── movements/
│       └── pages/
│           └── movements-page/
│               └── movements-page.component.spec.ts (PRIORIDAD: ALTA)
└── README.md
```

## 🎯 Cobertura de Pruebas

### ✅ PRIORIDAD CRÍTICA

#### 1. **ClientService** (`core/services/client.service.spec.ts`)
**Cobertura:** 15 pruebas
- ✅ CRUD completo de clientes
- ✅ Hash SHA-256 de contraseñas (seguridad)
- ✅ Validación de duplicados (nombre e identificación)
- ✅ Actualización de contraseñas
- ✅ Actualización de estado
- ✅ Manejo de errores

**Casos de prueba clave:**
- Creación de clientes con contraseña hasheada
- Actualización sin cambiar contraseña
- Actualización con nueva contraseña hasheada
- Verificación de identificación existente (con/sin exclusión)
- Verificación de nombre existente (con/sin exclusión)
- Consistencia del algoritmo SHA-256

#### 2. **MovementService** (`core/services/movement.service.spec.ts`)
**Cobertura:** 16 pruebas
- ✅ CRUD completo de movimientos
- ✅ Manejo de depósitos (montos positivos)
- ✅ Manejo de retiros (montos negativos)
- ✅ Cálculo de saldos
- ✅ Preservación de fecha original en actualizaciones
- ✅ Filtros por cuenta, cliente y fechas
- ✅ Manejo de errores (saldo insuficiente, movimiento inexistente)

**Casos de prueba clave:**
- Depósitos con montos positivos
- Retiros con montos negativos
- Actualización manteniendo fecha original
- Recalculo de saldos al editar
- Validación de saldo insuficiente
- Múltiples transacciones consecutivas

### ✅ PRIORIDAD ALTA

#### 3. **AccountService** (`core/services/account.service.spec.ts`)
**Cobertura:** 17 pruebas
- ✅ CRUD completo de cuentas
- ✅ Validación de número de cuenta (6 dígitos exactos)
- ✅ Verificación de duplicados
- ✅ Tipos de cuenta (Ahorros/Corriente)
- ✅ Actualización de estado
- ✅ Consulta de saldo
- ✅ Filtros por cliente
- ✅ Manejo de errores

**Casos de prueba clave:**
- Validación de formato 6 dígitos (exacto)
- Rechazo de formatos inválidos (<6, >6, no numéricos)
- Verificación de número existente (con/sin exclusión)
- Creación de cuentas de ahorros y corrientes
- Manejo de error de número duplicado (409)
- Inclusión de clientId en actualizaciones

#### 4. **MovementsPageComponent** (`features/movements/pages/movements-page/`)
**Cobertura:** 19 pruebas
- ✅ Cálculo de saldo para depósitos
- ✅ Cálculo de saldo para retiros
- ✅ Validación de saldo insuficiente
- ✅ Conversión de montos con signo correcto
- ✅ Preservación de fecha original en ediciones
- ✅ Recálculo de saldo al editar
- ✅ Uso de transactionType vs movementType
- ✅ Validación de formulario
- ✅ Integración con servicios

**Casos de prueba clave:**
- Cálculo correcto de saldo (depósito: +, retiro: -)
- Detección de saldo insuficiente (solo en creación)
- Conversión de monto a negativo para WITHDRAWAL
- Mantener fecha original al editar
- Recalcular saldo al cambiar monto o tipo
- Mostrar valores absolutos en formulario
- Validar transactionType en API

## 🚀 Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas específicas
```bash
# Solo servicios
npm test -- --include="**/core/services/**"

# Solo componentes
npm test -- --include="**/features/**"

# Un archivo específico
npm test -- --include="**/client.service.spec.ts"
```

### Generar reporte de cobertura
```bash
npm test -- --coverage
```

## 📊 Métricas de Cobertura

| Módulo | Tests | Estado |
|--------|-------|--------|
| **ClientService** | 15 | ✅ |
| **MovementService** | 16 | ✅ |
| **AccountService** | 17 | ✅ |
| **MovementsPageComponent** | 19 | ✅ |
| **TOTAL** | **67** | ✅ |

## 🔧 Configuración

Las pruebas utilizan:
- **Jasmine**: Framework de testing
- **Karma**: Test runner
- **HttpClientTestingModule**: Para simular peticiones HTTP
- **TestBed**: Para configuración de módulos de Angular
- **Spies**: Para mockear servicios y dependencias

## 📝 Convenciones

1. **Nombres de archivos**: `*.spec.ts`
2. **Estructura de describe**:
   - Nivel 1: Nombre del servicio/componente
   - Nivel 2: Métodos o funcionalidades
   - Nivel 3: Casos específicos (si es necesario)

3. **Nombres de pruebas**: Descriptivos en español, usando "debe..."
   ```typescript
   it('debe crear un cliente con contraseña hasheada', ...)
   ```

4. **Arrange-Act-Assert**: Patrón AAA en cada prueba
   ```typescript
   it('debe...', () => {
     // Arrange: Preparar datos y mocks
     const mockData = {...};
     
     // Act: Ejecutar la acción
     service.doSomething().subscribe(...);
     
     // Assert: Verificar resultados
     expect(result).toBe(expected);
   });
   ```

## 🎓 Buenas Prácticas Implementadas

### ✅ Seguridad
- Validación de hash SHA-256 para contraseñas
- Nunca enviar contraseñas en texto plano

### ✅ Integridad de Datos
- Validación de duplicados (clientes, cuentas)
- Validación de formatos (número de cuenta: 6 dígitos)
- Preservación de fechas originales

### ✅ Lógica de Negocio
- Cálculo correcto de saldos
- Manejo de signos (depósitos +, retiros -)
- Validación de saldo insuficiente

### ✅ Manejo de Errores
- Pruebas para errores 400, 404, 409, 500
- Validación de respuestas de error
- Mensajes de error específicos

## 🐛 Debugging

Para debug de pruebas individuales:

```typescript
fdescribe('TestSuite', () => {  // Solo ejecuta este suite
  fit('debe...', () => {         // Solo ejecuta esta prueba
    // ...
  });
});
```

## 📚 Recursos

- [Jasmine Documentation](https://jasmine.github.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Última actualización:** Octubre 2025  
**Mantenido por:** Equipo de Desarrollo

