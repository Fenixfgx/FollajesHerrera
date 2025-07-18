# Dashboard de Administrador - Evaluaciones

## Descripción
El dashboard de administrador permite visualizar y analizar los resultados de las evaluaciones de auxiliar contable de forma centralizada y en tiempo real.

## Características del Dashboard

### 📊 **Estadísticas Generales**
- **Total de Evaluaciones**: Número total de candidatos evaluados
- **Puntuación Promedio**: Puntuación media de todas las evaluaciones
- **Candidatos Recomendados**: Número de candidatos que obtuvieron 70% o más
- **Tasa de Recomendación**: Porcentaje de candidatos recomendados

### 📈 **Estadísticas por Categoría**
- **Contabilidad**: Promedio de puntuaciones en conocimientos contables
- **Excel**: Promedio de puntuaciones en habilidades de hojas de cálculo
- **Secretarial**: Promedio de puntuaciones en competencias administrativas

### 📝 **Lista de Evaluaciones**
- Tabla con las evaluaciones más recientes
- Información de cada candidato: nombre, fecha, puntuación total, recomendación
- Códigos de color para identificar niveles de rendimiento rápidamente

## Cómo Usar el Dashboard

### 1. **Configuración Inicial**
- Asegúrate de que el Google Apps Script esté desplegado correctamente
- Verifica que la URL del script esté actualizada en `dashboard.html`
- El dashboard usa la misma URL que el formulario de evaluación

### 2. **Acceso al Dashboard**
- Abre `dashboard.html` en cualquier navegador web
- Los datos se cargan automáticamente al abrir la página
- No requiere autenticación adicional (usa la misma configuración del formulario)

### 3. **Funcionalidades Disponibles**
- **Actualizar**: Recarga las evaluaciones más recientes
- **Ver Todas**: Muestra todas las evaluaciones disponibles
- **Actualización Automática**: Los datos se cargan automáticamente al abrir

## API Endpoints Disponibles

Tu Google Apps Script ahora funciona como una API completa con los siguientes endpoints:

### **Obtener Estadísticas**
```
GET: TU_URL_DE_SCRIPT?action=getStats
```
**Respuesta:**
```json
{
  "success": true,
  "stats": {
    "totalEvaluations": 25,
    "averageScore": 118,
    "recommendedCandidates": 18,
    "recommendationRate": 72,
    "averageByCategory": {
      "accounting": 38,
      "excel": 42,
      "secretarial": 38
    }
  }
}
```

### **Obtener Todas las Evaluaciones**
```
GET: TU_URL_DE_SCRIPT?action=getAllData
```
**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "Fecha y Hora": "2025-07-18T10:30:00Z",
      "Nombre Completo": "Juan Pérez",
      "Email": "juan@email.com",
      "Puntuación Total": 128,
      "Porcentaje": 85,
      "Recomendación": "Muy Bueno - Recomendado"
    }
  ],
  "total": 25
}
```

### **Obtener Evaluaciones Recientes**
```
GET: TU_URL_DE_SCRIPT?action=getRecentEvaluations&limit=10
```

### **Obtener Evaluación Específica**
```
GET: TU_URL_DE_SCRIPT?action=getEvaluationById&id=2
```

## Código de Colores del Dashboard

### **Puntuaciones**
- 🟢 **Verde (Excelente)**: 90-100% (135-150 puntos)
- 🔵 **Azul (Muy Bueno)**: 80-89% (120-134 puntos)
- 🟡 **Amarillo (Bueno)**: 70-79% (105-119 puntos)
- 🔴 **Rojo (Insuficiente)**: 0-69% (0-104 puntos)

## Personalización

### **Modificar Límites de Puntuación**
En `dashboard.html`, función `getScoreClass()`:
```javascript
function getScoreClass(percentage) {
    if (percentage >= 90) return 'score-excellent';
    if (percentage >= 80) return 'score-good';
    if (percentage >= 70) return 'score-fair';
    return 'score-poor';
}
```

### **Cambiar Colores**
En el CSS del dashboard:
```css
.score-excellent { background: #10b981; } /* Verde */
.score-good { background: #3b82f6; }      /* Azul */
.score-fair { background: #f59e0b; }      /* Amarillo */
.score-poor { background: #ef4444; }      /* Rojo */
```

### **Agregar Nuevas Estadísticas**
1. Modifica la función `getStatistics()` en Google Apps Script
2. Actualiza el HTML para mostrar las nuevas estadísticas
3. Actualiza el JavaScript para cargar y mostrar los datos

## Seguridad y Acceso

### **Consideraciones de Seguridad**
- El dashboard usa la misma URL pública que el formulario
- Los datos son de solo lectura para el dashboard
- No hay autenticación adicional requerida
- Considera implementar autenticación si necesitas restringir el acceso

### **Acceso Privado (Opcional)**
Si necesitas restringir el acceso al dashboard:
1. Modifica el Google Apps Script para verificar tokens de acceso
2. Implementa un sistema de login simple
3. Usa parámetros de URL para autenticación

## Resolución de Problemas

### **Dashboard No Carga Datos**
1. Verifica que la URL del script esté correcta
2. Asegúrate de que el Google Apps Script esté desplegado
3. Revisa la consola del navegador para errores
4. Confirma que hay datos en la hoja de cálculo

### **Estadísticas Incorrectas**
1. Verifica que los encabezados de la hoja coincidan con el script
2. Asegúrate de que los datos estén en el formato correcto
3. Revisa los logs de Google Apps Script

### **Problemas de CORS**
1. Asegúrate de que el script esté configurado para "Cualquier usuario"
2. Verifica que el deployment esté actualizado
3. Intenta hacer un nuevo deployment si es necesario

## Próximas Mejoras

### **Funcionalidades Sugeridas**
- Gráficos interactivos con Chart.js
- Filtros por fecha y puntuación
- Exportación de reportes en PDF
- Notificaciones en tiempo real
- Comparación entre periodos

### **Integración Avanzada**
- Conexión con sistemas de RRHH
- Integración con calendarios para programar entrevistas
- Sistema de comentarios para cada evaluación
- Seguimiento del proceso de contratación

---

**Archivos del Dashboard:**
- `dashboard.html` - Interfaz principal del dashboard
- `INSTRUCCIONES_GOOGLE_APPS_SCRIPT.md` - Código del backend actualizado
- `DASHBOARD_ADMIN.md` - Esta documentación

¡Tu dashboard está listo para usar! 🎉
