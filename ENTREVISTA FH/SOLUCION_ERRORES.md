# Solución de Errores de Conexión - "Failed to fetch"

## 🚨 Error Identificado
**Error:** `TypeError: Failed to fetch`
**Causa:** Problemas de CORS o configuración del Google Apps Script

## 🔧 Soluciones Implementadas

### 1. **Múltiples Métodos de Envío**
El script ahora intenta 4 métodos diferentes:
- Fetch con `mode: 'no-cors'`
- Fetch tradicional
- XMLHttpRequest
- Form submission

### 2. **Manejo de Errores Mejorado**
- Mensajes específicos según el tipo de error
- Reintentos automáticos
- Timeout de 10 segundos
- Descarga local como alternativa

### 3. **Verificaciones Necesarias en Google Apps Script**

#### ✅ Verificar Configuración del Deployment
1. Ve a tu Google Apps Script
2. Haz clic en "Desplegar" > "Administrar implementaciones"
3. Verifica que esté configurado como:
   - **Tipo:** Aplicación web
   - **Ejecutar como:** Yo (tu email)
   - **Acceso:** Cualquier usuario

#### ✅ Verificar que el Script Esté Actualizado
Asegúrate de que tu Google Apps Script tenga el código completo de las instrucciones, incluyendo:
```javascript
// Al inicio del archivo
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // ¡IMPORTANTE: Cambia esto!
const SHEET_NAME = 'Hoja 1';

// Función doPost para recibir datos
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    // ... resto del código
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }));
  }
}
```

#### ✅ Configurar SHEET_ID Correctamente
1. Abre tu Google Sheet
2. Copia el ID de la URL: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`
3. Reemplaza `TU_SHEET_ID_AQUI` en el script

## 🧪 Probar la Solución

### Método 1: Prueba Directa
1. Abre `index.html` en tu navegador
2. Completa el formulario
3. El sistema intentará automáticamente los diferentes métodos

### Método 2: Prueba Manual del Script
1. Ve a tu Google Apps Script
2. Ejecuta la función `setupPermissions()`
3. Autoriza todos los permisos necesarios

### Método 3: Verificar URL
Prueba tu URL directamente en el navegador:
```
https://script.google.com/macros/s/AKfycby1j7WrTypv4mBnF_s0JjPCrAdoKQe8u0lRF2_2MiDZDk01h8pJxPVdFEkSNLbfX9qQ1Q/exec
```

## 🔍 Diagnóstico de Problemas

### Si el Error Persiste:

#### 1. **Crear Nuevo Deployment**
```javascript
// En Google Apps Script:
1. Ir a "Desplegar" > "Nueva implementación"
2. Seleccionar "Aplicación web"
3. Cambiar versión a "Nueva"
4. Configurar acceso como "Cualquier usuario"
5. Copiar la nueva URL
```

#### 2. **Verificar Permisos**
```javascript
// Ejecutar en Google Apps Script:
function testPermissions() {
  try {
    // Probar acceso a Sheets
    const sheet = SpreadsheetApp.openById('TU_SHEET_ID');
    console.log('Sheets: OK');
    
    // Probar acceso a Gmail
    GmailApp.sendEmail(Session.getActiveUser().getEmail(), 'Test', 'Test');
    console.log('Gmail: OK');
    
    return 'Permisos OK';
  } catch (error) {
    console.error('Error de permisos:', error);
    return 'Error: ' + error.toString();
  }
}
```

#### 3. **Verificar Formato de Datos**
```javascript
// Datos que se envían:
{
  "timestamp": "2025-07-18T15:30:00.000Z",
  "fullName": "Juan Pérez",
  "email": "juan@email.com",
  "phone": "+57 300 123 4567",
  "experience": "1-3",
  "question_1": "10",
  // ... más campos
}
```

## 🎯 Alternativas si Nada Funciona

### Opción 1: Descarga Local
- El formulario ahora ofrece descargar el archivo JSON
- Puedes importar manualmente a Google Sheets

### Opción 2: Usar Google Forms
- Crear un Google Form equivalente
- Exportar automáticamente a Google Sheets
- Menos personalización pero más confiable

### Opción 3: Usar un Servicio Alternativo
- Formspree.io
- Netlify Forms
- Zapier

## 🔄 Código de Respaldo

Si necesitas volver al método simple:
```javascript
async function submitFormSimple() {
    const formData = collectFormData();
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Con no-cors, asumimos que funcionó
        showSuccess('Evaluación enviada exitosamente.');
        
    } catch (error) {
        console.error('Error:', error);
        showError('Error al enviar. Descargue el archivo como respaldo.');
        offerLocalDownload();
    }
}
```

## 📋 Checklist de Verificación

- [ ] SHEET_ID configurado correctamente
- [ ] Deployment con acceso "Cualquier usuario"
- [ ] Permisos autorizados en Google Apps Script
- [ ] URL del script actualizada en el formulario
- [ ] Probado en navegador diferente
- [ ] Probado sin extensiones del navegador

## 🆘 Si Todo Falla

1. **Mensaje de Error Detallado**: Revisa la consola del navegador (F12)
2. **Logs de Google Apps Script**: Ve a "Ejecuciones" en Apps Script
3. **Probar con Datos Simples**: Envía un formulario con datos mínimos
4. **Contactar Soporte**: Si el problema persiste, puede ser un issue temporal de Google

¡El sistema ahora es más robusto y debería funcionar correctamente! 🚀
