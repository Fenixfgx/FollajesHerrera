// === CONFIGURACIÓN GENERAL ===
const SHEET_ID = '1SX44yC7N6ZdkJQBnSdiLVMeCsGS5ECgWdjLCzbtdDbE'; // Reemplaza con tu ID real
const SHEET_NAME = 'Entrevistas';         // Opcional: Cambia si tu hoja tiene otro nombre

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
      // Información personal
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.experience,
      
      // Todas las 36 preguntas
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
      data.question_16,
      data.question_17,
      data.question_18,
      data.question_19,
      data.question_20,
      data.question_21,
      data.question_22,
      data.question_23,
      data.question_24,
      data.question_25,
      data.question_26,
      data.question_27,
      data.question_28,
      data.question_29,
      data.question_30,
      data.question_31,
      data.question_32,
      data.question_33,
      data.question_34,
      data.question_35,
      data.question_36,
      
      // Información adicional
      data.excelLevel,
      data.softwareKnowledge,
      data.additionalSkills,
      
      // Puntuaciones por categoría
      data.accountingScore,
      data.salesScore,
      data.excelScore,
      data.secretarialScore,
      data.logicScore,
      data.psychologyScore,
      data.healthScore,
      data.totalScore,
      data.percentage,
      
      // Información de tiempo
      data.timeUsedMinutes,
      data.timeUsedSeconds,
      data.timeRemainingMinutes,
      data.timeRemainingSeconds,
      data.timeUpSubmission,
      data.totalTimeAllowed,
      
      // Recomendación
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
          sales: 0,
          excel: 0,
          secretarial: 0,
          logic: 0,
          psychology: 0,
          health: 0
        }
      }
    };
  }
  
  // Calcular estadísticas basadas en las nuevas columnas
  const totalEvaluations = rows.length;
  let totalScore = 0;
  let totalAccounting = 0;
  let totalSales = 0;
  let totalExcel = 0;
  let totalSecretarial = 0;
  let totalLogic = 0;
  let totalPsychology = 0;
  let totalHealth = 0;
  let recommendedCount = 0;
  
  rows.forEach(row => {
    // Las puntuaciones están en las columnas después de las 36 preguntas + 3 campos adicionales
    const accountingScore = parseInt(row[42]) || 0;    // Columna AQ (Puntuación Contabilidad)
    const salesScore = parseInt(row[43]) || 0;         // Columna AR (Puntuación Ventas)
    const excelScore = parseInt(row[44]) || 0;         // Columna AS (Puntuación Excel)
    const secretarialScore = parseInt(row[45]) || 0;   // Columna AT (Puntuación Secretarial)
    const logicScore = parseInt(row[46]) || 0;         // Columna AU (Puntuación Lógica)
    const psychologyScore = parseInt(row[47]) || 0;    // Columna AV (Puntuación Psicológica)
    const healthScore = parseInt(row[48]) || 0;        // Columna AW (Puntuación Salud)
    const total = parseInt(row[49]) || 0;              // Columna AX (Puntuación Total)
    const percentage = parseInt(row[50]) || 0;         // Columna AY (Porcentaje)
    
    totalScore += total;
    totalAccounting += accountingScore;
    totalSales += salesScore;
    totalExcel += excelScore;
    totalSecretarial += secretarialScore;
    totalLogic += logicScore;
    totalPsychology += psychologyScore;
    totalHealth += healthScore;
    
    // Consideramos recomendado si el porcentaje >= 70%
    if (percentage >= 70) {
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
        sales: Math.round(totalSales / totalEvaluations),
        excel: Math.round(totalExcel / totalEvaluations),
        secretarial: Math.round(totalSecretarial / totalEvaluations),
        logic: Math.round(totalLogic / totalEvaluations),
        psychology: Math.round(totalPsychology / totalEvaluations),
        health: Math.round(totalHealth / totalEvaluations)
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
  const expectedHeaders = [
    // Información personal
    'Fecha y Hora',
    'Nombre Completo',
    'Email',
    'Teléfono',
    'Experiencia',
    
    // Preguntas de Contabilidad (1-7)
    'P1 - ¿Cuál es la ecuación fundamental de la contabilidad?',
    'P2 - ¿Qué significa el término "debe" en contabilidad?',
    'P3 - ¿Cuál es el régimen tributario más común para pequeñas empresas en Colombia?',
    'P4 - ¿Qué es el IVA en Colombia?',
    'P5 - ¿Cuál es la tasa general del IVA en Colombia actualmente?',
    'P6 - ¿Sobre qué monto se aplica la exención del 1.5% en Colombia?',
    'P7 - ¿Sobre qué monto se aplica la exención del 2.5% en Colombia?',
    
    // Preguntas de Ventas y Proveedores (8-11)
    'P8 - ¿Cuál es el primer paso en el proceso de ventas?',
    'P9 - ¿Qué información es esencial al registrar un nuevo proveedor?',
    'P10 - ¿Cuál es la mejor práctica para el seguimiento de facturas de proveedores?',
    'P11 - ¿Qué es importante considerar al evaluar un proveedor?',
    
    // Preguntas de Excel (12-21)
    'P12 - ¿Cuál es la fórmula correcta para sumar un rango de celdas A1 a A10?',
    'P13 - ¿Qué función utilizarías para buscar un valor en una tabla?',
    'P14 - ¿Cómo se bloquea una celda para que no cambie al copiar una fórmula?',
    'P15 - ¿Qué función utilizarías para contar celdas que cumplan una condición?',
    'P16 - ¿Cuál es la combinación de teclas para crear una tabla dinámica en Excel?',
    'P17 - ¿Qué función utilizarías para calcular el promedio de un rango de celdas?',
    'P18 - ¿Cómo se aplica un filtro automático en Excel?',
    'P19 - ¿Qué función usarías para unir texto de diferentes celdas?',
    'P20 - ¿Cuál es la mejor función para combinar datos de dos tablas con un campo común?',
    'P21 - ¿Cómo se pueden conectar datos de diferentes hojas de un mismo archivo?',
    
    // Preguntas Secretariales (22-26)
    'P22 - ¿Cuál es la prioridad más alta en la gestión de correspondencia?',
    'P23 - ¿Qué información debe incluir un archivo de documentos bien organizado?',
    'P24 - ¿Cuál es la mejor práctica para el manejo de llamadas telefónicas?',
    'P25 - ¿Cómo se debe manejar información confidencial?',
    'P26 - ¿Cuál es la estructura correcta de una carta comercial?',
    
    // Preguntas de Lógica (27-29)
    'P27 - Si 5 personas pueden realizar un trabajo en 10 días, ¿cuántas personas se necesitan para realizar el mismo trabajo en 2 días?',
    'P28 - ¿Cuál es el siguiente número en la secuencia: 2, 6, 12, 20, 30, ?',
    'P29 - Si un producto cuesta $100 y se le aplica un descuento del 20%, luego un impuesto del 19%, ¿cuál es el precio final?',
    
    // Preguntas Psicológicas (30-32)
    'P30 - ¿Cómo maneja situaciones de estrés en el trabajo?',
    'P31 - ¿Cómo prefiere trabajar?',
    'P32 - ¿Cómo reacciona ante los cambios en el trabajo?',
    
    // Preguntas de Salud y Disponibilidad (33-36)
    'P33 - ¿Tiene alguna condición de salud que pueda afectar su desempeño laboral?',
    'P34 - ¿Con qué frecuencia ha faltado al trabajo en su último empleo?',
    'P35 - ¿Tiene responsabilidades familiares que puedan afectar su horario laboral?',
    'P36 - ¿Qué tan estable es su situación personal actual?',
    
    // Información adicional
    'Nivel Excel (1-10)',
    'Software Conocido',
    'Habilidades Adicionales',
    
    // Puntuaciones por categoría
    'Puntuación Contabilidad',
    'Puntuación Ventas',
    'Puntuación Excel',
    'Puntuación Secretarial',
    'Puntuación Lógica',
    'Puntuación Psicológica',
    'Puntuación Salud',
    'Puntuación Total',
    'Porcentaje',
    
    // Información de tiempo
    'Tiempo Usado (Minutos)',
    'Tiempo Usado (Segundos)',
    'Tiempo Restante (Minutos)',
    'Tiempo Restante (Segundos)',
    'Entrega por Tiempo Agotado',
    'Tiempo Total Permitido',
    
    // Recomendación
    'Recomendación'
  ];

  const firstRow = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];

  // Verifica si los encabezados actuales son distintos de los esperados
  const headersMatch = expectedHeaders.every((header, index) => header === firstRow[index]);

  if (!headersMatch || sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

    const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setWrap(true);
    sheet.autoResizeColumns(1, expectedHeaders.length);
    sheet.setFrozenRows(1);

    console.log('Encabezados corregidos o creados automáticamente');
  }
}

// === FUNCIÓN MEJORADA DE NOTIFICACIÓN POR EMAIL ===
function sendNotificationEmail(data) {
  const EMAIL_RECIPIENT = 'forddex@hotmail.com';
  const subject = `📋 Nueva Evaluación de Auxiliar Contable: ${data.fullName}`;

  // Logo de la empresa
  const logoUrl = 'https://i.postimg.cc/8P8gp5kW/319068467-708280470557603-1456894316421742412-n-removebg-preview-1.png';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 30px;">
      <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); padding: 30px;">
        
        <div style="text-align: center;">
          <img src="${logoUrl}" alt="Logo" style="max-width: 120px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50;">Nueva Entrevista Registrada en Follajes Herrera</h2>
        </div>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

        <h3 style="color: #3366cc; margin-bottom: 10px;">🧑 Información del Candidato</h3>
        <p><strong>Nombre:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Experiencia:</strong> ${data.experience} años</p>
        <p><strong>Nivel Excel autodeclarado:</strong> ${data.excelLevel}/10</p>
        <p><strong>Software conocido:</strong> ${data.softwareKnowledge}</p>
        <p><strong>Habilidades adicionales:</strong> ${data.additionalSkills}</p>

        <h3 style="color: #3366cc; margin-top: 30px;">📊 Resultados Detallados</h3>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Área de Evaluación</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Puntuación</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Porcentaje</strong></td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;">🧮 Contabilidad</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.accountingScore}/70</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.accountingScore/70)*100)}%</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;">🤝 Ventas y Proveedores</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.salesScore}/40</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.salesScore/40)*100)}%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;">📊 Excel</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.excelScore}/80</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.excelScore/80)*100)}%</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;">📋 Competencias Secretariales</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.secretarialScore}/50</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.secretarialScore/50)*100)}%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;">🧠 Lógica y Razonamiento</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.logicScore}/30</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.logicScore/30)*100)}%</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd;">❤️ Evaluación Psicológica</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.psychologyScore}/30</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.psychologyScore/30)*100)}%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;">✅ Salud y Disponibilidad</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.healthScore}/40</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${Math.round((data.healthScore/40)*100)}%</td>
          </tr>
          <tr style="background-color: #e3f2fd;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>🎯 TOTAL GENERAL</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>${data.totalScore}/340</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>${data.percentage}%</strong></td>
          </tr>
        </table>

        <h3 style="color: #3366cc; margin-top: 30px;">⏱️ Información de Tiempo</h3>
        <p><strong>Tiempo utilizado:</strong> ${data.timeUsedMinutes}:${String(data.timeUsedSeconds).padStart(2, '0')}</p>
        <p><strong>Tiempo restante:</strong> ${data.timeRemainingMinutes}:${String(data.timeRemainingSeconds).padStart(2, '0')}</p>
        <p><strong>Entrega por tiempo agotado:</strong> ${data.timeUpSubmission}</p>

        <div style="margin: 30px 0; padding: 20px; background-color: ${data.percentage >= 70 ? '#d4edda' : '#f8d7da'}; border-radius: 8px; border-left: 4px solid ${data.percentage >= 70 ? '#28a745' : '#dc3545'};">
          <h3 style="color: ${data.percentage >= 70 ? '#155724' : '#721c24'}; margin-bottom: 10px;">🔍 Recomendación Final</h3>
          <p style="color: ${data.percentage >= 70 ? '#155724' : '#721c24'}; font-size: 16px; margin: 0;"><strong>${data.recommendation}</strong></p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <p style="margin: 0; color: #6c757d;">
            📋 Puedes consultar esta evaluación y todas las estadísticas en el Dashboard administrativo.
          </p>
        </div>

        <footer style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
          Este mensaje fue generado automáticamente por el sistema de evaluaciones de Follajes Herrera.<br>
          No respondas a este correo.
        </footer>
      </div>
    </div>
  `;

  try {
    GmailApp.sendEmail(EMAIL_RECIPIENT, subject, '', {
      htmlBody: htmlBody
    });
    console.log('Email de notificación enviado correctamente');
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
  console.log('Hoja inicializada con encabezados para las 36 preguntas');
}

function clearTestData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    console.log('Datos de prueba eliminados');
  }
}

// === FUNCIÓN ADICIONAL PARA MIGRAR DATOS EXISTENTES ===
function migrateExistingData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    console.log('No hay datos para migrar');
    return;
  }
  
  // Crear nueva hoja con el formato actualizado
  const newSheetName = SHEET_NAME + '_Migrada';
  let newSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(newSheetName);
  
  if (!newSheet) {
    newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(newSheetName);
  }
  
  setupHeaders(newSheet);
  
  console.log('Hoja migrada creada. Datos antiguos preservados en la hoja original.');
  console.log('Recuerda actualizar SHEET_NAME a "' + newSheetName + '" en la configuración.');
}
