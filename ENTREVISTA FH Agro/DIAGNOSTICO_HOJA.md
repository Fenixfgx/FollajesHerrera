# Diagnóstico: No se ven cambios en la hoja de cálculo

## 🔍 Problema Identificado
Los datos del formulario no aparecen en la hoja de cálculo después del envío.

## 🛠️ Herramientas de Diagnóstico Agregadas

### 1. **Botón "Probar Conexión"**
- Se ha agregado un botón para probar la conexión con Google Apps Script
- Envía datos de prueba simples
- Aparece antes del botón "Enviar Evaluación"

### 2. **Logging Detallado**
- Todos los métodos de envío ahora muestran información detallada en la consola
- Abre las herramientas de desarrollador (F12) para ver los logs

### 3. **Estado de Configuración**
- Aparece un mensaje en la esquina superior derecha mostrando el estado de la configuración

## 🔧 Pasos para Diagnosticar

### Paso 1: Verificar Google Apps Script
1. Ve a tu Google Apps Script: [script.google.com](https://script.google.com)
2. Asegúrate de que tengas el código actualizado
3. **MUY IMPORTANTE**: Verifica que hayas configurado:
   ```javascript
   const SHEET_ID = 'TU_ID_DE_HOJA_AQUÍ'; // ¡Cambiar esto!
   const SHEET_NAME = 'Hoja 1';
   ```

### Paso 2: Obtener el ID de tu hoja
1. Abre tu Google Sheet
2. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
3. Pégalo en tu Google Apps Script

### Paso 3: Verificar Deployment
1. En Google Apps Script, ve a "Desplegar" > "Administrar implementaciones"
2. Verifica que esté configurado como:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: Yo (tu email)
   - **Acceso**: Cualquier usuario

### Paso 4: Probar la Conexión
1. Abre `index.html` en tu navegador
2. Haz clic en "Probar Conexión"
3. Abre las herramientas de desarrollador (F12) y ve a la consola
4. Verifica si aparecen mensajes de éxito o error

### Paso 5: Verificar la Hoja de Cálculo
1. Abre tu Google Sheet
2. Verifica si aparecen los datos de prueba
3. Los encabezados deberían crearse automáticamente

## 📊 Código de Google Apps Script Correcto

Asegúrate de que tu Google Apps Script tenga este código:

```javascript
// === CONFIGURACIÓN GENERAL ===
const SHEET_ID = '1abc123def456ghi789'; // ¡CAMBIAR POR TU ID REAL!
const SHEET_NAME = 'Hoja 1';

// === FUNCIÓN PRINCIPAL ===
function doPost(e) {
  try {
    console.log('📥 Datos recibidos:', e.postData.contents);
    
    // Acceder a la hoja específica
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Asegurar encabezados
    setupHeaders(sheet);
    
    // Parsear datos
    const data = JSON.parse(e.postData.contents);
    
    // Si es una prueba, registrar solo datos básicos
    if (data.test) {
      const testRow = [
        data.timestamp,
        'PRUEBA DE CONEXIÓN',
        data.message,
        'Test exitoso'
      ];
      sheet.appendRow(testRow);
      console.log('✅ Prueba registrada');
    } else {
      // Datos completos del formulario
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
      
      sheet.appendRow(rowData);
      console.log('✅ Evaluación registrada');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Datos guardados exitosamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// === FUNCIÓN PARA ENCABEZADOS ===
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
    
    // Formato
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setWrap(true);
    sheet.autoResizeColumns(1, headers.length);
    sheet.setFrozenRows(1);
    
    console.log('📋 Encabezados creados');
  }
}
```

## 🚨 Errores Comunes

### 1. **SHEET_ID no configurado**
```javascript
// ❌ Incorrecto
const SHEET_ID = 'TU_SHEET_ID_AQUI';

// ✅ Correcto
const SHEET_ID = '1abc123def456ghi789jkl012mno345pqr678stu901';
```

### 2. **Nombre de hoja incorrecto**
```javascript
// ❌ Si tu hoja se llama "Evaluaciones"
const SHEET_NAME = 'Hoja 1';

// ✅ Correcto
const SHEET_NAME = 'Evaluaciones';
```

### 3. **Deployment no actualizado**
- Cada vez que cambies el código, debes hacer un nuevo deployment
- Usa "Nueva implementación" en lugar de actualizar la existente

### 4. **Permisos no otorgados**
- Ejecuta `setupPermissions()` en Google Apps Script
- Autoriza acceso a Google Sheets

## 🔍 Cómo Verificar si Funciona

1. **Consola del navegador**: Deberías ver logs como:
   ```
   🔄 Intentando método 1...
   ✅ Método 1 exitoso
   ```

2. **Google Apps Script**: Ve a "Ejecuciones" para ver los logs:
   ```
   📥 Datos recibidos: {"timestamp":"2025-07-18..."}
   ✅ Evaluación registrada
   ```

3. **Google Sheets**: Deberías ver una nueva fila con los datos

## 📞 ¿Aún no funciona?

Si después de seguir todos estos pasos aún no funciona:

1. **Verifica la URL**: Asegúrate de que la URL en `script.js` sea exactamente la misma que en Google Apps Script
2. **Crea un nuevo script**: A veces es más fácil empezar desde cero
3. **Usa el modo de prueba**: El botón "Probar Conexión" envía datos simples para verificar la conexión básica

¡Con estas herramientas deberías poder identificar exactamente dónde está el problema! 🕵️‍♂️
