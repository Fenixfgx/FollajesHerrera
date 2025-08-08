// === GOOGLE APPS SCRIPT PARA EVALUACIONES PSICOLÓGICAS AGRÍCOLAS ===
// Configuración actualizada para el nuevo sistema

const SHEET_ID = '1bmI7O3ReVoScBuFvyidY-rSMGRL8ZoqJ8znHAM8WxoA'; // Reemplaza con tu ID real
const SHEET_NAME = 'EvaluacionesAgricolas';

// === FUNCIÓN PRINCIPAL PARA MANEJAR REQUESTS ===
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Configurar encabezados si es necesario
    setupPsychologicalHeaders(sheet);
    
    // Parsear datos JSON
    const data = JSON.parse(e.postData.contents);
    
    // Organizar datos para inserción
    const rowData = [
      // Información personal
      data.timestamp,
      data.fullName,
      data.phone,
      data.experience,
      
      // Respuestas a las 32 preguntas del nuevo sistema
      data.question_1 || '0',  // Conocimiento de plantas q1-q6
      data.question_2 || '0',
      data.question_3 || '0',
      data.question_4 || '0',
      data.question_5 || '0',
      data.question_6 || '0',
      
      data.question_7 || '0',   // Personalidad q7-q14
      data.question_8 || '0',
      data.question_9 || '0',
      data.question_10 || '0',
      data.question_11 || '0',
      data.question_12 || '0',
      data.question_13 || '0',
      data.question_14 || '0',
      
      data.question_15 || '0',  // Hábitos/Estilo de vida q15-q20 (ENCUBIERTO)
      data.question_16 || '0',
      data.question_17 || '0',
      data.question_18 || '0',
      data.question_19 || '0',
      data.question_20 || '0',
      
      data.question_21 || '0',  // Razonamiento q21-q24
      data.question_22 || '0',
      data.question_23 || '0',
      data.question_24 || '0',
      
      data.question_25 || '0',  // Disponibilidad q25-q28
      data.question_26 || '0',
      data.question_27 || '0',
      data.question_28 || '0',
      
      data.question_29 || '0',  // Interpersonal q29-q32
      data.question_30 || '0',
      data.question_31 || '0',
      data.question_32 || '0',
      
      // Autoevaluación
      data.stressLevel || '5',
      data.communicationStyle || '',
      data.personalChallenges || '',
      
      // Preferencias
      data.workEnvironment || '',
      data.motivations || '',
      
      // Puntuaciones por sección
      data.knowledgeScore || 0,
      data.personalityScore || 0,
      data.lifestyleScore || 0,
      data.logicScore || 0,
      data.availabilityScore || 0,
      data.interpersonalScore || 0,
      data.totalScore || 0,
      data.percentage || 0,
      
      // *** ANÁLISIS PSICOLÓGICO CRÍTICO - CONFIDENCIAL ***
      // Trastornos principales
      data.psychologicalAnalysis?.psychopathy || '0.0%',
      data.psychologicalAnalysis?.sociopathy || '0.0%',
      data.psychologicalAnalysis?.narcissism || '0.0%',
      data.psychologicalAnalysis?.antisocial || '0.0%',
      
      // Adicciones (DETECCIÓN ENCUBIERTA)
      data.psychologicalAnalysis?.substanceUse || '0.0%',
      data.psychologicalAnalysis?.alcoholism || '0.0%',
      
      // Otros trastornos
      data.psychologicalAnalysis?.aggression || '0.0%',
      data.psychologicalAnalysis?.anxiety || '0.0%',
      
      // Cualidades positivas
      data.psychologicalAnalysis?.empathy || '0.0%',
      data.psychologicalAnalysis?.integrity || '0.0%',
      data.psychologicalAnalysis?.stability || '0.0%',
      
      // Información temporal
      data.timeUsedMinutes || 0,
      data.timeUsedSeconds || 0,
      data.timeUpSubmission || 'No'
    ];
    
    // Insertar fila
    sheet.appendRow(rowData);
    
    // Log para administradores
    console.log('📊 Nueva evaluación psicológica registrada para:', data.fullName);
    console.log('🧠 Análisis psicológico:', data.psychologicalAnalysis);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Evaluación psicológica registrada exitosamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error en doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// === FUNCIÓN PARA RECUPERAR DATOS (GET) ===
function doGet(e) {
  try {
    const action = e.parameter.action || 'get';
    
    if (action === 'get') {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      const data = sheet.getRange(1, 1, sheet.getLastRow(), 62).getValues();
      
      if (data.length <= 1) {
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          data: [],
          message: 'No hay evaluaciones registradas'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const headers = data[0];
      const rows = data.slice(1);
      
      const evaluations = rows.map(row => {
        const evaluation = {};
        headers.forEach((header, index) => {
          evaluation[header] = row[index] || '';
        });
        
        // Estructurar análisis psicológico para el dashboard
        evaluation.psychologicalAnalysis = {
          psychopathy: evaluation['🚨 Psicopatía (%)'] || '0.0%',
          sociopathy: evaluation['🚨 Sociopatía (%)'] || '0.0%',
          narcissism: evaluation['🚨 Narcisismo (%)'] || '0.0%',
          antisocial: evaluation['🚨 Trastorno Antisocial (%)'] || '0.0%',
          substanceUse: evaluation['🍷 Uso Problemático Sustancias (%)'] || '0.0%',
          alcoholism: evaluation['🍷 Alcoholismo (%)'] || '0.0%',
          aggression: evaluation['😠 Agresividad (%)'] || '0.0%',
          anxiety: evaluation['😰 Ansiedad (%)'] || '0.0%',
          empathy: evaluation['💚 Empatía (%)'] || '0.0%',
          integrity: evaluation['🛡️ Integridad (%)'] || '0.0%',
          stability: evaluation['⚖️ Estabilidad Emocional (%)'] || '0.0%'
        };
        
        return evaluation;
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: evaluations
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('❌ Error en doGet:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// === CONFIGURAR ENCABEZADOS ESPECIALIZADOS PARA ANÁLISIS PSICOLÓGICO ===
function setupPsychologicalHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = [
      // Información personal
      'Timestamp',
      'Nombre Completo',
      'Teléfono',
      'Experiencia Agrícola',
      
      // Conocimiento de plantas (q1-q6)
      'Q1: Cuidado Plantas',
      'Q2: Mejor Hora Riego',
      'Q3: Hojas Amarillas',
      'Q4: Herramientas Necesarias',
      'Q5: Detección Plagas',
      'Q6: Planta Infectada',
      
      // Personalidad (q7-q14) - ANÁLISIS PSICOLÓGICO
      'Q7: Trabajo Sin Supervisión',
      'Q8: Compañero Comete Error',
      'Q9: Recibir Órdenes',
      'Q10: Encontrar Dinero',
      'Q11: Ver Sufrimiento',
      'Q12: Problemas Legales',
      'Q13: Razones Para Mentir',
      'Q14: Sentimientos Tras Lastimar',
      
      // Hábitos/Estilo vida (q15-q20) - DETECCIÓN ENCUBIERTA SUSTANCIAS
      'Q15: Gasto Semanal Entretenimiento',
      'Q16: Razón Faltar Trabajo',
      'Q17: Tipo Personas Socializar',
      'Q18: Peleas Físicas',
      'Q19: Control Impulsos',
      'Q20: Horario Dormir Días Libres',
      
      // Razonamiento (q21-q24)
      'Q21: Problema Matemático',
      'Q22: Secuencia Lógica',
      'Q23: Tomar Decisiones',
      'Q24: Aprender Nuevo',
      
      // Disponibilidad (q25-q28)
      'Q25: Horarios Trabajo',
      'Q26: Trabajo Fines Semana',
      'Q27: Trabajo Clima Adverso',
      'Q28: Comodidad Aire Libre',
      
      // Interpersonal (q29-q32)
      'Q29: Ayudar Compañeros',
      'Q30: Manejo Conflictos',
      'Q31: Comunicación Problemas',
      'Q32: Confianza Compañeros',
      
      // Autoevaluación
      'Nivel Estrés (1-10)',
      'Estilo Comunicación',
      'Desafíos Personales',
      
      // Preferencias
      'Ambiente Trabajo Preferido',
      'Motivaciones',
      
      // Puntuaciones
      'Puntuación Conocimiento',
      'Puntuación Personalidad',
      'Puntuación Estilo Vida',
      'Puntuación Lógica',
      'Puntuación Disponibilidad',
      'Puntuación Interpersonal',
      'Puntuación Total',
      'Porcentaje (%)',
      
      // *** ANÁLISIS PSICOLÓGICO CONFIDENCIAL ***
      '🚨 Psicopatía (%)',
      '🚨 Sociopatía (%)',
      '🚨 Narcisismo (%)',
      '🚨 Trastorno Antisocial (%)',
      '🍷 Uso Problemático Sustancias (%)',
      '🍷 Alcoholismo (%)',
      '😠 Agresividad (%)',
      '😰 Ansiedad (%)',
      '💚 Empatía (%)',
      '🛡️ Integridad (%)',
      '⚖️ Estabilidad Emocional (%)',
      
      // Información temporal
      'Tiempo Usado (Minutos)',
      'Tiempo Usado (Segundos)',
      'Enviado Por Tiempo Agotado'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#2d5a27');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setWrap(true);
    
    // Marcar columnas psicológicas críticas
    const psychColumns = sheet.getRange(1, 49, 1, 11); // Columnas de análisis psicológico
    psychColumns.setBackground('#dc3545');
    psychColumns.setNote('⚠️ CONFIDENCIAL: Análisis psicológico encubierto. No compartir con candidatos.');
    
    console.log('✅ Encabezados de análisis psicológico agrícola configurados');
  }
}

// === FUNCIÓN PARA LIMPIAR DATOS DE PRUEBA ===
function clearTestData() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Confirmar antes de borrar
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Confirmar borrado',
      '¿Estás seguro de que quieres borrar todos los datos de evaluación?',
      ui.ButtonSet.YES_NO
    );
    
    if (response === ui.Button.YES) {
      sheet.clear();
      setupPsychologicalHeaders(sheet);
      ui.alert('✅ Datos borrados y encabezados reconfigurados');
    }
    
  } catch (error) {
    console.error('❌ Error al limpiar datos:', error);
  }
}

// === FUNCIÓN PARA GENERAR REPORTE DE RIESGO ===
function generateRiskReport() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getRange(1, 1, sheet.getLastRow(), 62).getValues();
    
    if (data.length <= 1) {
      console.log('No hay datos para generar reporte');
      return;
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    let highRiskCount = 0;
    let substanceRiskCount = 0;
    
    rows.forEach(row => {
      const psychopathy = parseFloat(row[48]) || 0; // Columna Psicopatía
      const sociopathy = parseFloat(row[49]) || 0;  // Columna Sociopatía
      const antisocial = parseFloat(row[50]) || 0;  // Columna Antisocial
      const substanceUse = parseFloat(row[52]) || 0; // Columna Sustancias
      
      if (psychopathy > 30 || sociopathy > 30 || antisocial > 40) {
        highRiskCount++;
      }
      
      if (substanceUse > 40) {
        substanceRiskCount++;
      }
    });
    
    console.log(`📊 REPORTE DE RIESGO PSICOLÓGICO:
    Total evaluados: ${rows.length}
    Alto riesgo psicológico: ${highRiskCount}
    Riesgo de sustancias: ${substanceRiskCount}
    Tasa de riesgo: ${((highRiskCount / rows.length) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Error al generar reporte:', error);
  }
}

// === FUNCIÓN DE PRUEBA ===
function testSystem() {
  console.log('🧪 Probando sistema de evaluación psicológica agrícola...');
  
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Juan Test Agrícola',
    phone: '555-0123',
    experience: '2 años',
    question_1: '10',
    question_15: '0', // Gasto alto en entretenimiento (riesgo sustancias)
    question_16: '0', // Faltas los lunes (riesgo sustancias)
    totalScore: 250,
    percentage: 78,
    psychologicalAnalysis: {
      psychopathy: '25.5%',
      sociopathy: '15.0%',
      substanceUse: '45.0%',
      alcoholism: '35.0%',
      empathy: '65.0%',
      integrity: '70.0%'
    }
  };
  
  try {
    doPost({ postData: { contents: JSON.stringify(testData) } });
    console.log('✅ Prueba completada exitosamente');
  } catch (error) {
    console.error('❌ Error en prueba:', error);
  }
}