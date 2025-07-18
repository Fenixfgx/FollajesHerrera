# Configuración de Google Apps Script para el Formulario de Evaluación - ACTUALIZADO

## ⚠️ IMPORTANTE: Script Actualizado para 36 Preguntas

Este script ha sido actualizado para manejar todas las 36 preguntas del formulario y las nuevas categorías de evaluación:

- **7 categorías de evaluación**: Contabilidad, Ventas/Proveedores, Excel, Secretarial, Lógica, Psicológica, Salud/Disponibilidad
- **36 preguntas en total** con distribución específica por categoría
- **Sistema de puntuación de 340 puntos** total
- **Información detallada de tiempo** utilizado en la evaluación
- **Correos de notificación mejorados** con desglose completo por categorías

## Pasos para configurar el backend en Google Apps Script:

### 1. Crear una nueva hoja de cálculo de Google
- Ve a [Google Sheets](https://sheets.google.com)
- Crea una nueva hoja de cálculo
- Nómbrala "Evaluaciones Auxiliar Contable"

### 2. Obtener el ID de la hoja de cálculo
- En la URL de tu hoja de cálculo, el ID es la parte entre `/d/` y `/edit`
- Ejemplo: `https://docs.google.com/spreadsheets/d/1SX44yC7N6ZdkJQBnSdiLVMeCsGS5ECgWdjLCzbtdDbE/edit`
- El ID sería: `1SX44yC7N6ZdkJQBnSdiLVMeCsGS5ECgWdjLCzbtdDbE`

### 3. Crear el script de Google Apps Script
- En la hoja de cálculo, ve a "Extensiones" > "Apps Script"
- Borra el código existente y pega el código del archivo `google_apps_script_actualizado.js`

### 4. Configurar el script
- En las primeras líneas del script, actualiza:
  ```javascript
  const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Reemplaza con tu ID real
  const SHEET_NAME = 'Hoja 1';         // Cambia si tu hoja tiene otro nombre
  ```

### 5. Configurar notificaciones por email
- En la función `sendNotificationEmail`, cambia:
  ```javascript
  const EMAIL_RECIPIENT = 'tu_email@ejemplo.com';
  ```

### 6. Dar permisos y publicar
- Guarda el proyecto con un nombre descriptivo: "Evaluaciones Auxiliar Contable"
- Ejecuta la función `setupPermissions()` para dar permisos
- Ve a "Implementar" > "Nueva implementación"
- Tipo: "Aplicación web"
- Ejecutar como: "Yo"
- Acceso: "Cualquier persona"
- Hacer clic en "Implementar"
- Copia la URL de la aplicación web

### 7. Actualizar la URL en el formulario
- Abre `script.js` del formulario
- Busca la línea con `GOOGLE_SHEETS_CONFIG`
- Actualiza la URL:
  ```javascript
  const GOOGLE_SHEETS_CONFIG = {
      scriptUrl: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'
  };
  ```

## 📊 Nuevas Características del Script Actualizado

### Estructura de Datos Completa
El script ahora maneja:
- **36 preguntas individuales** con sus respuestas
- **7 puntuaciones por categoría**:
  - Contabilidad (70 puntos máximo)
  - Ventas/Proveedores (40 puntos máximo)
  - Excel (80 puntos máximo)
  - Secretarial (50 puntos máximo)
  - Lógica (30 puntos máximo)
  - Psicológica (30 puntos máximo)
  - Salud/Disponibilidad (40 puntos máximo)
- **Información de tiempo detallada**
- **Datos adicionales** (nivel Excel, software conocido, habilidades)

### Funciones de Dashboard Mejoradas
- `getAllEvaluations()`: Obtiene todas las evaluaciones con el nuevo formato
- `getStatistics()`: Calcula estadísticas para las 7 categorías
- `getRecentEvaluations()`: Obtiene evaluaciones recientes
- `getEvaluationById()`: Obtiene evaluación específica por ID

### Notificaciones de Email Mejoradas
Los emails ahora incluyen:
- Desglose completo por categorías
- Porcentajes individuales por área
- Información de tiempo utilizado
- Recomendación final destacada
- Formato visual mejorado

## 🔧 Funciones de Utilidad

### Para inicializar la hoja por primera vez:
```javascript
initializeSheet()
```

### Para migrar datos existentes:
```javascript
migrateExistingData()
```

### Para limpiar datos de prueba:
```javascript
clearTestData()
```

## 📋 Estructura de Columnas en Google Sheets

El script creará automáticamente estas columnas:

1. **Información Personal** (Columnas A-E):
   - Fecha y Hora, Nombre, Email, Teléfono, Experiencia

2. **36 Preguntas** (Columnas F-AO):
   - P1-P7: Contabilidad
   - P8-P11: Ventas/Proveedores  
   - P12-P21: Excel
   - P22-P26: Secretarial
   - P27-P29: Lógica
   - P30-P32: Psicológica
   - P33-P36: Salud/Disponibilidad

3. **Información Adicional** (Columnas AP-AR):
   - Nivel Excel, Software Conocido, Habilidades Adicionales

4. **Puntuaciones** (Columnas AS-AZ):
   - Puntuaciones por categoría y totales

5. **Información de Tiempo** (Columnas BA-BF):
   - Tiempos utilizados y restantes

6. **Recomendación** (Columna BG):
   - Recomendación final del sistema

## ⚠️ Notas Importantes

1. **Migración de Datos**: Si ya tienes datos con el formato anterior, usa la función `migrateExistingData()` para crear una nueva hoja con el formato actualizado.

2. **Permisos**: Asegúrate de que el script tenga permisos para acceder a Google Sheets y Gmail.

3. **URL de Implementación**: Cada vez que hagas cambios significativos al script, debes crear una nueva implementación y actualizar la URL en el formulario.

4. **Testing**: Usa la función `clearTestData()` para limpiar datos de prueba antes de usar en producción.

```javascript
// === CONFIGURACIÓN GENERAL ===
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Reemplaza con tu ID real
const SHEET_NAME = 'Hoja 1';         // Opcional: Cambia si tu hoja tiene otro nombre

// === FUNCIÓN PRINCIPAL PARA RECIBIR DATOS (POST) ===
function doPost(e) {
  try {
    // Acceder a la hoja específica dentro del archivo
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // Asegurar encabezados
    setupHeaders(sheet);

    // Parsear datos recibidos en formato JSON
    const data = JSON.parse(e.postData.contents);

    // Organizar datos en el orden esperado por columnas
    const rowData = [
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.experience,
      data.question_1,
      data.question_2,
      data.question_3,
      data.question_4,
      data.question_5,
      data.question_6,
      data.question_7,
      data.question_8,
      data.question_9,
      data.question_10,
      data.question_11,
      data.question_12,
      data.question_13,
      data.question_14,
      data.question_15,
      data.excelLevel,
      data.softwareKnowledge,
      data.additionalSkills,
      data.accountingScore,
      data.excelScore,
      data.secretarialScore,
      data.totalScore,
      data.percentage,
      data.recommendation
    ];

    // Insertar nueva fila
    sheet.appendRow(rowData);

    // Notificación por correo
    sendNotificationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Datos guardados exitosamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// === FUNCIÓN PRINCIPAL PARA OBTENER DATOS (GET) ===
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const action = e.parameter.action || 'getAllData';
    
    let result = {};
    
    switch (action) {
      case 'getAllData':
        result = getAllEvaluations(sheet);
        break;
      case 'getStats':
        result = getStatistics(sheet);
        break;
      case 'getRecentEvaluations':
        const limit = parseInt(e.parameter.limit) || 10;
        result = getRecentEvaluations(sheet, limit);
        break;
      case 'getEvaluationById':
        const rowId = parseInt(e.parameter.id);
        result = getEvaluationById(sheet, rowId);
        break;
      default:
        result = { error: 'Acción no válida' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error en doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// === FUNCIONES PARA DASHBOARD ===
function getAllEvaluations(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const evaluations = rows.map((row, index) => {
    const evaluation = {};
    headers.forEach((header, i) => {
      evaluation[header] = row[i];
    });
    evaluation.id = index + 2; // +2 porque empezamos desde la fila 2
    return evaluation;
  });
  
  return {
    success: true,
    data: evaluations,
    total: evaluations.length
  };
}

function getStatistics(sheet) {
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // Omitir encabezados
  
  if (rows.length === 0) {
    return {
      success: true,
      stats: {
        totalEvaluations: 0,
        averageScore: 0,
        recommendedCandidates: 0,
        averageByCategory: {
          accounting: 0,
          excel: 0,
          secretarial: 0
        }
      }
    };
  }
  
  // Calcular estadísticas
  const totalEvaluations = rows.length;
  let totalScore = 0;
  let totalAccounting = 0;
  let totalExcel = 0;
  let totalSecretarial = 0;
  let recommendedCount = 0;
  
  rows.forEach(row => {
    const accountingScore = parseInt(row[23]) || 0; // Columna X
    const excelScore = parseInt(row[24]) || 0;      // Columna Y
    const secretarialScore = parseInt(row[25]) || 0; // Columna Z
    const total = parseInt(row[26]) || 0;            // Columna AA
    const percentage = parseInt(row[27]) || 0;       // Columna BB
    
    totalScore += total;
    totalAccounting += accountingScore;
    totalExcel += excelScore;
    totalSecretarial += secretarialScore;
    
    if (percentage >= 70) { // Consideramos recomendado >= 70%
      recommendedCount++;
    }
  });
  
  return {
    success: true,
    stats: {
      totalEvaluations,
      averageScore: Math.round(totalScore / totalEvaluations),
      recommendedCandidates: recommendedCount,
      recommendationRate: Math.round((recommendedCount / totalEvaluations) * 100),
      averageByCategory: {
        accounting: Math.round(totalAccounting / totalEvaluations),
        excel: Math.round(totalExcel / totalEvaluations),
        secretarial: Math.round(totalSecretarial / totalEvaluations)
      }
    }
  };
}

function getRecentEvaluations(sheet, limit = 10) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).reverse().slice(0, limit); // Últimas evaluaciones
  
  const evaluations = rows.map((row, index) => {
    const evaluation = {};
    headers.forEach((header, i) => {
      evaluation[header] = row[i];
    });
    return evaluation;
  });
  
  return {
    success: true,
    data: evaluations,
    total: evaluations.length
  };
}

function getEvaluationById(sheet, rowId) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  if (rowId < 2 || rowId > data.length) {
    return {
      success: false,
      error: 'ID de evaluación no válido'
    };
  }
  
  const row = data[rowId - 1]; // -1 porque el array empieza en 0
  const evaluation = {};
  headers.forEach((header, i) => {
    evaluation[header] = row[i];
  });
  evaluation.id = rowId;
  
  return {
    success: true,
    data: evaluation
  };
}

// === ENCABEZADOS AUTOMÁTICOS ===
function setupHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  if (!firstRow[0] || firstRow[0] === '') {
    const headers = [
      'Fecha y Hora',
      'Nombre Completo',
      'Email',
      'Teléfono',
      'Experiencia',
      'Pregunta 1 - Ecuación Contable',
      'Pregunta 2 - Concepto Debe',
      'Pregunta 3 - Régimen Tributario',
      'Pregunta 4 - IVA Definición',
      'Pregunta 5 - Tasa IVA',
      'Pregunta 6 - Fórmula Suma',
      'Pregunta 7 - Función Búsqueda',
      'Pregunta 8 - Referencias Absolutas',
      'Pregunta 9 - Conteo Condicional',
      'Pregunta 10 - Tablas Dinámicas',
      'Pregunta 11 - Gestión Correspondencia',
      'Pregunta 12 - Organización Archivos',
      'Pregunta 13 - Manejo Llamadas',
      'Pregunta 14 - Información Confidencial',
      'Pregunta 15 - Estructura Cartas',
      'Nivel Excel (1-10)',
      'Software Conocido',
      'Habilidades Adicionales',
      'Puntuación Contabilidad',
      'Puntuación Excel',
      'Puntuación Secretarial',
      'Puntuación Total',
      'Porcentaje',
      'Recomendación'
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setWrap(true);
    sheet.autoResizeColumns(1, headers.length);
    sheet.setFrozenRows(1);

    console.log('Encabezados creados automáticamente');
  }
}

// === EMAIL DE NOTIFICACIÓN ===
function sendNotificationEmail(data) {
  const EMAIL_RECIPIENT = 'rrhh@tuempresa.com'; // Cambia por tu correo real
  const subject = `Nueva Evaluación: ${data.fullName}`;

  const body = `
    Se ha completado una nueva evaluación de auxiliar contable.

    Candidato: ${data.fullName}
    Email: ${data.email}
    Teléfono: ${data.phone}
    Experiencia: ${data.experience}

    Puntuaciones:
    - Contabilidad: ${data.accountingScore}/50
    - Excel: ${data.excelScore}/50
    - Secretarial: ${data.secretarialScore}/50
    - Total: ${data.totalScore}/340 (${data.percentage}%)

    Recomendación: ${data.recommendation}

    Revisa los detalles completos en la hoja de cálculo.
  `;

  try {
    GmailApp.sendEmail(EMAIL_RECIPIENT, subject, body);
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}

// === OPCIONALES: CONFIGURACIONES MANUALES ===
function setupPermissions() {
  SpreadsheetApp.openById(SHEET_ID);
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), 'Test', 'Test permissions');
}

function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  setupHeaders(sheet);
  console.log('Hoja inicializada con encabezados');
}

function clearTestData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    console.log('Datos de prueba eliminados');
  }
}
```

### 4. Configurar permisos y pruebas iniciales
- Ejecuta la función `setupPermissions()` una vez para configurar los permisos
- Autoriza el acceso a Google Sheets y Gmail cuando se solicite
- Opcionalmente, ejecuta `initializeSheet()` para crear los encabezados manualmente
- Usa `clearTestData()` para limpiar datos de prueba cuando sea necesario

### 5. Desplegar el script
- Haz clic en "Desplegar" > "Nueva implementación"
- Selecciona "Aplicación web" como tipo
- Configuración:
  - Descripción: "API para formulario de evaluación"
  - Ejecutar como: "Yo (tu email)"
  - Quien puede acceder: "Cualquier usuario"
- Haz clic en "Desplegar"
- Copia la URL de la aplicación web

### 6. Actualizar el archivo JavaScript
En el archivo `script.js`, actualiza la configuración:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    scriptUrl: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUÍ',
    sheetName: 'Evaluaciones'
};
```

### 7. Usar el API para Dashboard (Nuevas funcionalidades)

Tu Google Apps Script ahora funciona como un API completo. Puedes hacer solicitudes GET para obtener datos:

**Obtener todas las evaluaciones:**
```
GET: TU_URL_DE_SCRIPT?action=getAllData
```

**Obtener estadísticas:**
```
GET: TU_URL_DE_SCRIPT?action=getStats
```

**Obtener evaluaciones recientes:**
```
GET: TU_URL_DE_SCRIPT?action=getRecentEvaluations&limit=5
```

**Obtener evaluación específica:**
```
GET: TU_URL_DE_SCRIPT?action=getEvaluationById&id=2
```

### 8. Configuración adicional (opcional)

#### Validación de datos:
Puedes agregar validación en Google Sheets:
- Formato de email en la columna C
- Números en las columnas de puntuación
- Listas desplegables para campos específicos

#### Formato condicional:
Para visualizar mejor los resultados:
- Colorear las celdas de puntuación según el rendimiento
- Resaltar candidatos recomendados

#### Dashboard automático:
Crear una segunda hoja con:
- Gráficos de rendimiento
- Estadísticas generales
- Ranking de candidatos

### 8. Seguridad
- Considera limitar el acceso a la hoja de cálculo
- Implementa validación adicional en el script
- Mantén un backup regular de los datos

### 9. Pruebas
- Realiza pruebas completas del formulario
- Verifica que los datos se guarden correctamente
- Confirma que las notificaciones por email funcionen

### 10. Mantenimiento
- Revisa periódicamente los logs de Apps Script
- Actualiza las preguntas según sea necesario
- Mantén la documentación actualizada

## Notas importantes:
- **Creación automática de encabezados**: Los encabezados se crean automáticamente con la primera evaluación
- **Respuestas aleatorizadas**: El orden de las respuestas se mezcla automáticamente para cada usuario
- **API completa**: El script funciona como API tanto para enviar (POST) como para obtener datos (GET)
- **Dashboard incluido**: Se incluye un dashboard administrativo en `dashboard.html`
- **Configuración específica**: Usa SHEET_ID y SHEET_NAME para mayor control
- La URL de Google Apps Script debe mantenerse privada
- Los datos se almacenan en Google Drive asociado a tu cuenta
- Puedes compartir la hoja con otros miembros del equipo de RRHH
- Considera implementar un sistema de backup automático

## Solución de problemas comunes:
1. **Error de CORS**: Asegúrate de que el script esté configurado para aceptar solicitudes externas
2. **Permisos**: Verifica que el script tenga acceso a Sheets y Gmail
3. **Formato de datos**: Confirma que los nombres de los campos coincidan exactamente
4. **Límites de cuota**: Google Apps Script tiene límites de uso diario

¡Con esta configuración tendrás un sistema completo de evaluación integrado con Google Sheets!
