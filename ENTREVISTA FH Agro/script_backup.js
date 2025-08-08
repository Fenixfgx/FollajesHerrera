// Configuración para Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    // Tu URL de Google Apps Script ya configurada
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyRiygrDFfGL-9rVFPhxaNBEUqOglEbSfK3X0lpiePIiLIbl65Pcq7FhBUwG3OOTAhkZA/exec',
    sheetName: 'Evaluaciones'
};

// Variables globales
let currentScore = {
    total: 0,
    personality: 0,
    lifestyle: 0,
    logic: 0,
    availability: 0,
    interpersonal: 0
};

// Análisis psicológico encubierto
let psychProfile = {
    substanceUse: 0,
    antisocial: 0,
    empathy: 0,
    stability: 0,
    narcissism: 0,
    anxiety: 0,
    compulsiveness: 0,
    aggression: 0,
    reliability: 0,
    intelligence: 0,
    autism: 0,
    manipulation: 0
};

// Variables del timer
let timeRemaining = 20 * 60; // 20 minutos en segundos
let timerInterval;
let isTimeUp = false;
let timerStarted = false; // Nueva variable para controlar si ya inició el timer
// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    randomizeAnswers();
    setupEventListeners();
    updateScoreDisplay();
    // NO iniciamos el timer automáticamente - se inicia al responder primera pregunta
    // startTimer(); // REMOVIDO
    
    // Mostrar estado de configuración
    showConfigurationStatus();
    
    // Ocultar botón de prueba en producción
    // addTestButton(); // Comentado para ocultar el botón
});

// Función para agregar botón de prueba
function addTestButton() {
    const testBtn = document.createElement('button');
    testBtn.type = 'button';
    testBtn.className = 'btn btn-secondary';
    testBtn.style.marginRight = '10px';
    testBtn.innerHTML = '<i class="fas fa-vial"></i> Probar Conexión';
    
    testBtn.onclick = function() {
        testGoogleAppsScript();
    };
    
    // Agregar el botón antes del botón de envío
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.parentNode.insertBefore(testBtn, submitBtn);
}

function initializeForm() {
    // Configurar el slider de Excel
    const excelSlider = document.getElementById('excelLevel');
    const rangeValue = document.querySelector('.range-value');
    
    excelSlider.addEventListener('input', function() {
        rangeValue.textContent = this.value;
    });
    
    // Configurar fecha actual
    const today = new Date().toISOString().split('T')[0];
    
    // Añadir animación de carga inicial
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
}

// Función para aleatorizar el orden de las respuestas
function randomizeAnswers() {
    const questionGroups = document.querySelectorAll('.question-group');
    
    questionGroups.forEach(group => {
        const radioGroup = group.querySelector('.radio-group');
        if (radioGroup) {
            const labels = Array.from(radioGroup.querySelectorAll('label'));
            
            // Crear un array con los datos de las opciones
            const options = labels.map(label => ({
                element: label,
                text: label.textContent.trim(),
                value: label.querySelector('input').value,
                name: label.querySelector('input').name
            }));
            
            // Mezclar las opciones usando Fisher-Yates shuffle
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            
            // Limpiar el radio group
            radioGroup.innerHTML = '';
            
            // Agregar las opciones mezcladas
            options.forEach(option => {
                radioGroup.appendChild(option.element);
            });
        }
    });
}
function setupEventListeners() {
    const form = document.getElementById('evaluationForm');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    // Listener para cambios en respuestas
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Iniciar timer al responder la primera pregunta
            if (!timerStarted) {
                startTimer();
                timerStarted = true;
                
                // Mostrar el timer container
                const timerContainer = document.getElementById('timerContainer');
                timerContainer.classList.add('active');
                
                // Mostrar notificación de que el timer inició
                Swal.fire({
                    title: '⏰ ¡Timer Iniciado!',
                    text: 'Tienes 20 minutos para completar la evaluación.',
                    icon: 'info',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            }
            
            calculateScore();
            updateScoreDisplay();
            saveProgress(); // Guardar progreso
        });
    });
    
    // Listener para envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });
}

function calculateScore() {
    currentScore = {
        total: 0,
        personality: 0,
        lifestyle: 0,
        logic: 0,
        availability: 0,
        interpersonal: 0
    };
    
    // Reset psychological profile
    psychProfile = {
        substanceUse: 0,
        antisocial: 0,
        empathy: 0,
        stability: 0,
        narcissism: 0,
        anxiety: 0,
        compulsiveness: 0,
        aggression: 0,
        reliability: 0,
        intelligence: 0,
        autism: 0,
        manipulation: 0
    };
    
    // Preguntas de personalidad (q1-q8)
    for (let i = 1; i <= 8; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.personality += parseInt(answer.value);
            analyzePersonalityTrait(answer);
        }
    }
    
    // Preguntas de hábitos y estilo de vida (q9-q12)
    for (let i = 9; i <= 12; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.lifestyle += parseInt(answer.value);
            analyzeLifestyleTrait(answer);
        }
    }
    
    // Preguntas de razonamiento y lógica (q13-q18)
    for (let i = 13; i <= 18; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.logic += parseInt(answer.value);
            analyzeLogicalTrait(answer);
        }
    }
    
    // Preguntas de disponibilidad y compromiso (q19-q23)
    for (let i = 19; i <= 23; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.availability += parseInt(answer.value);
            analyzeAvailabilityTrait(answer);
        }
    }
    
    // Preguntas de competencias interpersonales (q24-q28)
    for (let i = 24; i <= 28; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.interpersonal += parseInt(answer.value);
            analyzeInterpersonalTrait(answer);
        }
    }
    
    // Calcular puntuación total
    currentScore.total = currentScore.personality + currentScore.lifestyle + 
                        currentScore.logic + currentScore.availability + 
                        currentScore.interpersonal;
}

// Funciones de análisis psicológico encubierto
function analyzePersonalityTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'empathy':
            psychProfile.empathy += (value / 10) * 3;
            break;
        case 'aggression':
            psychProfile.aggression += (10 - value) / 10 * 3;
            break;
        case 'manipulation':
            psychProfile.manipulation += (10 - value) / 10 * 2;
            break;
        case 'antisocial':
            psychProfile.antisocial += (10 - value) / 10 * 3;
            break;
        case 'obsessive':
            psychProfile.compulsiveness += (10 - value) / 10 * 2;
            break;
        case 'narcissistic':
            psychProfile.narcissism += (10 - value) / 10 * 3;
            break;
        case 'paranoid':
            psychProfile.anxiety += (10 - value) / 10 * 2;
            break;
        case 'hyperactive':
            psychProfile.autism += (10 - value) / 10 * 1;
            break;
        case 'focus':
            psychProfile.intelligence += (value / 10) * 2;
            break;
    }
}

function analyzeLifestyleTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'dependency':
            psychProfile.substanceUse += (10 - value) / 10 * 4;
            break;
        case 'regular':
            psychProfile.substanceUse += (10 - value) / 10 * 2;
            break;
        case 'sobriety':
            psychProfile.substanceUse += (value / 10) * (-1);
            break;
        case 'stability':
            psychProfile.stability += (value / 10) * 3;
            break;
        case 'deceptive':
            psychProfile.antisocial += (10 - value) / 10 * 3;
            break;
        case 'accountability':
            psychProfile.reliability += (value / 10) * 3;
            break;
    }
}

function analyzeLogicalTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'analytical':
        case 'methodical':
        case 'logic':
            psychProfile.intelligence += (value / 10) * 2;
            break;
        case 'obsessive':
            psychProfile.compulsiveness += (10 - value) / 10 * 2;
            break;
        case 'rigid':
            psychProfile.autism += (10 - value) / 10 * 1;
            break;
        case 'scattered':
            psychProfile.anxiety += (10 - value) / 10 * 2;
            break;
    }
}

function analyzeAvailabilityTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'committed':
        case 'reliable':
            psychProfile.reliability += (value / 10) * 3;
            break;
        case 'resistant':
            psychProfile.antisocial += (10 - value) / 10 * 2;
            break;
        case 'unstable':
            psychProfile.stability += (value / 10) * (-2);
            break;
    }
}

function analyzeInterpersonalTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'helpful':
        case 'trustworthy':
        case 'empathy':
            psychProfile.empathy += (value / 10) * 3;
            break;
        case 'exploitative':
        case 'manipulative':
            psychProfile.manipulation += (10 - value) / 10 * 3;
            break;
        case 'aggressive':
            psychProfile.aggression += (10 - value) / 10 * 3;
            break;
        case 'dismissive':
            psychProfile.narcissism += (10 - value) / 10 * 2;
            break;
        case 'rebellious':
            psychProfile.antisocial += (10 - value) / 10 * 2;
            break;
    }
}
    
    // Preguntas secretariales (q22-q26)
    for (let i = 22; i <= 26; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.secretarial += parseInt(answer.value);
        }
    }
    
    // Preguntas de lógica (q27-q29)
    for (let i = 27; i <= 29; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.logic += parseInt(answer.value);
        }
    }
    
    // Preguntas psicológicas (q30-q32)
    for (let i = 30; i <= 32; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.psychology += parseInt(answer.value);
        }
    }
    
    // Preguntas de salud y disponibilidad (q33-q36)
    for (let i = 33; i <= 36; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.health += parseInt(answer.value);
        }
    }
    
    currentScore.total = currentScore.accounting + currentScore.sales + currentScore.excel + 
                        currentScore.secretarial + currentScore.logic + currentScore.psychology + currentScore.health;
}

function updateScoreDisplay() {
    // Función modificada para ocultar puntuación del usuario por seguridad
    // Solo mantiene el cálculo interno sin mostrar nada visible
    
    // Los elementos están ocultos en CSS, pero por seguridad adicional,
    // evitamos actualizar el DOM completamente
    
    // Solo mantenemos el cálculo del porcentaje para uso interno
    const percentage = (currentScore.total / 360) * 100;
    
    // Log interno para debugging (solo visible en consola de desarrollador)
    console.log('Puntuación actual (oculta al usuario):', {
        accounting: currentScore.accounting,
        sales: currentScore.sales,
        excel: currentScore.excel,
        secretarial: currentScore.secretarial,
        logic: currentScore.logic,
        psychology: currentScore.psychology,
        health: currentScore.health,
        total: currentScore.total,
        percentage: percentage.toFixed(1) + '%'
    });
    
    // No actualizamos elementos visuales para mantener la evaluación confidencial
}

function collectFormData() {
    const formData = new FormData(document.getElementById('evaluationForm'));
    const data = {};
    
    // Información personal
    data.timestamp = new Date().toISOString();
    data.fullName = formData.get('fullName');
    data.email = formData.get('email');
    data.phone = formData.get('phone');
    data.experience = formData.get('experience');
    
    // Respuestas de evaluación
    for (let i = 1; i <= 36; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        data[`question_${i}`] = answer ? answer.value : '0';
    }
    
    // Autoevaluación
    data.excelLevel = formData.get('excelLevel');
    data.additionalSkills = formData.get('additionalSkills');
    
    // Software conocido
    const softwareCheckboxes = document.querySelectorAll('input[name="software"]:checked');
    data.softwareKnowledge = Array.from(softwareCheckboxes).map(cb => cb.value).join(', ');
    
    // Puntuaciones
    data.accountingScore = currentScore.accounting;
    data.salesScore = currentScore.sales;
    data.excelScore = currentScore.excel;
    data.secretarialScore = currentScore.secretarial;
    data.logicScore = currentScore.logic;
    data.psychologyScore = currentScore.psychology;
    data.healthScore = currentScore.health;
    data.totalScore = currentScore.total;
    data.percentage = Math.round((currentScore.total / 360) * 100);
    
    // Información del tiempo
    const totalTime = 20 * 60;
    const timeUsed = totalTime - timeRemaining;
    data.timeUsedMinutes = Math.floor(timeUsed / 60);
    data.timeUsedSeconds = timeUsed % 60;
    data.timeRemainingMinutes = Math.floor(timeRemaining / 60);
    data.timeRemainingSeconds = timeRemaining % 60;
    data.timeUpSubmission = isTimeUp ? 'Sí' : 'No';
    data.totalTimeAllowed = '20:00';
    
    // Recomendación
    data.recommendation = getRecommendationLevel();
    
    return data;
}

// Función para recopilar solo las respuestas del formulario sin evaluaciones
function collectPureResponsesData() {
    const formData = new FormData(document.getElementById('evaluationForm'));
    const responses = {};
    
    // Información básica
    responses.fecha_hora = new Date().toLocaleString('es-CO');
    responses.nombre_completo = formData.get('fullName') || '';
    responses.email = formData.get('email') || '';
    responses.telefono = formData.get('phone') || '';
    responses.experiencia = formData.get('experience') || '';
    
    // Definir las preguntas tal como aparecen en el formulario
    const questions = [
        // Contabilidad (Preguntas 1-7)
        "¿Cuál es la ecuación fundamental de la contabilidad?",
        "¿Qué significa el término \"debe\" en contabilidad?", 
        "¿Cuál es el régimen tributario más común para pequeñas empresas en Colombia?",
        "¿Qué es el IVA en Colombia?",
        "¿Cuál es la tasa general del IVA en Colombia actualmente?",
        "¿Sobre qué monto se aplica la exención del 1.5% en Colombia?",
        "¿Sobre qué monto se aplica la exención del 2.5% en Colombia?",
        
        // Ventas y Proveedores (Preguntas 8-11)
        "¿Cuál es el primer paso en el proceso de ventas?",
        "¿Qué información es esencial al registrar un nuevo proveedor?",
        "¿Cuál es la mejor práctica para el seguimiento de facturas de proveedores?",
        "¿Qué es importante considerar al evaluar un proveedor?",
        
        // Excel (Preguntas 12-21)
        "¿Cuál es la fórmula correcta para sumar un rango de celdas A1 a A10?",
        "¿Qué función utilizarías para buscar un valor en una tabla?",
        "¿Cómo se bloquea una celda para que no cambie al copiar una fórmula?",
        "¿Qué función utilizarías para contar celdas que cumplan una condición?",
        "¿Cuál es la combinación de teclas para crear una tabla dinámica en Excel?",
        "¿Qué función utilizarías para calcular el promedio de un rango de celdas?",
        "¿Cómo se aplica un filtro automático en Excel?",
        "¿Qué función usarías para unir texto de diferentes celdas?",
        "¿Cuál es la mejor función para combinar datos de dos tablas con un campo común?",
        "¿Cómo se pueden conectar datos de diferentes hojas de un mismo archivo?",
        
        // Secretarial (Preguntas 22-26)
        "¿Cuál es la prioridad más alta en la gestión de correspondencia?",
        "¿Qué información debe incluir un archivo de documentos bien organizado?",
        "¿Cuál es la mejor práctica para el manejo de llamadas telefónicas?",
        "¿Cómo se debe manejar información confidencial?",
        "¿Cuál es la estructura correcta de una carta comercial?",
        
        // Lógica (Preguntas 27-29)
        "Si 5 personas pueden realizar un trabajo en 10 días, ¿cuántas personas se necesitan para realizar el mismo trabajo en 2 días?",
        "¿Cuál es el siguiente número en la secuencia: 2, 6, 12, 20, 30, ?",
        "Si un producto cuesta $100 y se le aplica un descuento del 20%, luego un impuesto del 19%, ¿cuál es el precio final?",
        
        // Psicológica (Preguntas 30-32)
        "¿Cómo maneja situaciones de estrés en el trabajo?",
        "¿Cómo prefiere trabajar?",
        "¿Cómo reacciona ante los cambios en el trabajo?",
        
        // Salud y Disponibilidad (Preguntas 33-36)
        "¿Tiene alguna condición de salud que pueda afectar su desempeño laboral?",
        "¿Con qué frecuencia ha faltado al trabajo en su último empleo?",
        "¿Tiene responsabilidades familiares que puedan afectar su horario laboral?",
        "¿Qué tan estable es su situación personal actual?"
    ];
    
    // Recopilar respuestas pregunta por pregunta
    responses.respuestas = {};
    for (let i = 1; i <= 36; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        const questionText = questions[i-1] || `Pregunta ${i}`;
        
        // Obtener todas las opciones disponibles para esta pregunta
        const allOptions = document.querySelectorAll(`input[name="q${i}"]`);
        const opciones = Array.from(allOptions).map(option => {
            return {
                valor: option.value,
                texto: option.nextElementSibling?.textContent?.trim() || option.value
            };
        });
        
        responses.respuestas[`pregunta_${i}`] = {
            pregunta: questionText,
            opciones_disponibles: opciones,
            respuesta_seleccionada: {
                valor: answer ? answer.value : null,
                texto: answer ? answer.nextElementSibling?.textContent?.trim() || answer.value : 'No respondida'
            },
            respondida: !!answer
        };
    }
    
    // Autoevaluación adicional
    responses.autoevaluacion = {
        nivel_excel_autodeclarado: formData.get('excelLevel') || '',
        habilidades_adicionales: formData.get('additionalSkills') || ''
    };
    
    // Software conocido
    const softwareCheckboxes = document.querySelectorAll('input[name="software"]:checked');
    responses.software_conocido = Array.from(softwareCheckboxes).map(cb => cb.value);
    
    // Información de tiempo
    const totalTime = 20 * 60;
    const timeUsed = totalTime - timeRemaining;
    responses.informacion_tiempo = {
        tiempo_total_permitido: '20:00',
        tiempo_usado_minutos: Math.floor(timeUsed / 60),
        tiempo_usado_segundos: timeUsed % 60,
        tiempo_restante_minutos: Math.floor(timeRemaining / 60),
        tiempo_restante_segundos: timeRemaining % 60,
        entrega_por_tiempo_agotado: isTimeUp
    };
    
    return responses;
}

// Función para descargar las respuestas como JSON
function downloadResponsesJSON() {
    try {
        const responses = collectPureResponsesData();
        const fileName = `respuestas_${responses.nombre_completo.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.json`;
        
        // Crear blob con el JSON
        const jsonString = JSON.stringify(responses, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Crear enlace de descarga
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        
        // Hacer clic automáticamente para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpiar URL
        URL.revokeObjectURL(url);
        
        console.log('JSON de respuestas descargado:', fileName);
    } catch (error) {
        console.error('Error al descargar JSON de respuestas:', error);
    }
}

function getRecommendationLevel() {
    const percentage = (currentScore.total / 360) * 100;
    if (percentage >= 90) return 'Excelente - Altamente recomendado';
    if (percentage >= 80) return 'Muy Bueno - Recomendado';
    if (percentage >= 70) return 'Bueno - Recomendado con capacitación';
    if (percentage >= 50) return 'Regular - No recomendado';
    return 'Insuficiente - No recomendado';
}

// Función para generar recomendaciones detalladas
function getDetailedRecommendation(scores, level) {
    const accPercentage = (scores.accounting / 70) * 100;
    const salesPercentage = (scores.sales / 40) * 100;
    const excelPercentage = (scores.excel / 100) * 100;
    const secretarialPercentage = (scores.secretarial / 50) * 100;
    const logicPercentage = (scores.logic / 30) * 100;
    const psychologyPercentage = (scores.psychology / 30) * 100;
    const healthPercentage = (scores.health / 40) * 100;
    const totalPercentage = (scores.total / 360) * 100;
    
    let recommendation = '';
    let strengths = [];
    let weaknesses = [];
    let suggestions = [];
    
    // Identificar fortalezas y debilidades
    if (accPercentage >= 80) strengths.push('Contabilidad');
    else if (accPercentage < 60) weaknesses.push('Contabilidad');
    
    if (salesPercentage >= 80) strengths.push('Ventas y Proveedores');
    else if (salesPercentage < 60) weaknesses.push('Ventas y Proveedores');
    
    if (excelPercentage >= 80) strengths.push('Excel');
    else if (excelPercentage < 60) weaknesses.push('Excel');
    
    if (secretarialPercentage >= 80) strengths.push('Habilidades Secretariales');
    else if (secretarialPercentage < 60) weaknesses.push('Habilidades Secretariales');
    
    if (logicPercentage >= 80) strengths.push('Lógica y Razonamiento');
    else if (logicPercentage < 60) weaknesses.push('Lógica y Razonamiento');
    
    if (psychologyPercentage >= 80) strengths.push('Evaluación Psicológica');
    else if (psychologyPercentage < 60) weaknesses.push('Evaluación Psicológica');
    
    if (healthPercentage >= 80) strengths.push('Salud y Disponibilidad');
    else if (healthPercentage < 60) weaknesses.push('Salud y Disponibilidad');
    
    // Generar recomendaciones específicas
    if (weaknesses.includes('Contabilidad')) {
        suggestions.push('Capacitación en principios contables básicos y manejo de cuentas');
    }
    if (weaknesses.includes('Ventas y Proveedores')) {
        suggestions.push('Entrenamiento en técnicas de ventas y gestión de proveedores');
    }
    if (weaknesses.includes('Excel')) {
        suggestions.push('Entrenamiento en funciones avanzadas de Excel y análisis de datos');
    }
    if (weaknesses.includes('Habilidades Secretariales')) {
        suggestions.push('Desarrollo de habilidades de comunicación y organización documental');
    }
    if (weaknesses.includes('Lógica y Razonamiento')) {
        suggestions.push('Desarrollo de habilidades de pensamiento analítico y resolución de problemas');
    }
    if (weaknesses.includes('Evaluación Psicológica')) {
        suggestions.push('Desarrollo de habilidades de manejo del estrés y trabajo en equipo');
    }
    if (weaknesses.includes('Salud y Disponibilidad')) {
        suggestions.push('Evaluación de disponibilidad y condiciones de trabajo');
    }
    
    switch (level) {
        case 'excelente':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-star"></i> Excelente Desempeño</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/360 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/70 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Ventas y Proveedores:</span>
                            <span class="points">${scores.sales}/40 (${salesPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/100 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Lógica:</span>
                            <span class="points">${scores.logic}/30 (${logicPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Psicología:</span>
                            <span class="points">${scores.psychology}/30 (${psychologyPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Salud:</span>
                            <span class="points">${scores.health}/40 (${healthPercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div class="recommendation-verdict">
                        <strong><i class="fas fa-check-circle"></i> Recomendación:</strong> 
                        <span class="verdict-excellent">ALTAMENTE RECOMENDADO</span>
                    </div>
                    <p class="recommendation-text">
                        El candidato demuestra dominio excepcional en todas las áreas evaluadas. 
                        Posee las competencias técnicas y profesionales necesarias para desempeñarse 
                        exitosamente como auxiliar contable desde el primer día.
                    </p>
                    ${strengths.length > 0 ? `<p><strong>Fortalezas destacadas:</strong> ${strengths.join(', ')}</p>` : ''}
                    <p><strong>Perfil ideal para:</strong> Auxiliar contable senior, manejo de múltiples tareas contables, 
                    análisis de datos financieros, y apoyo en procesos de cierre contable.</p>
                </div>
            `;
            break;
            
        case 'muy_bueno':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-thumbs-up"></i> Muy Buen Desempeño</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/360 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/70 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Ventas y Proveedores:</span>
                            <span class="points">${scores.sales}/40 (${salesPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/100 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Lógica:</span>
                            <span class="points">${scores.logic}/30 (${logicPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Psicología:</span>
                            <span class="points">${scores.psychology}/30 (${psychologyPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Salud:</span>
                            <span class="points">${scores.health}/40 (${healthPercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div class="recommendation-verdict">
                        <strong><i class="fas fa-check-circle"></i> Recomendación:</strong> 
                        <span class="verdict-good">RECOMENDADO</span>
                    </div>
                    <p class="recommendation-text">
                        El candidato muestra sólidos conocimientos en la mayoría de áreas. 
                        Con orientación inicial mínima, puede desempeñarse efectivamente en el puesto.
                    </p>
                    ${strengths.length > 0 ? `<p><strong>Fortalezas:</strong> ${strengths.join(', ')}</p>` : ''}
                    ${suggestions.length > 0 ? `<p><strong>Áreas de mejora:</strong> ${suggestions.join('; ')}</p>` : ''}
                    <p><strong>Tiempo estimado de adaptación:</strong> 1-2 semanas con supervisión moderada.</p>
                </div>
            `;
            break;
            
        case 'bueno':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-info-circle"></i> Desempeño Satisfactorio</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/360 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/70 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Ventas y Proveedores:</span>
                            <span class="points">${scores.sales}/40 (${salesPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/100 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Lógica:</span>
                            <span class="points">${scores.logic}/30 (${logicPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Psicología:</span>
                            <span class="points">${scores.psychology}/30 (${psychologyPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Salud:</span>
                            <span class="points">${scores.health}/40 (${healthPercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div class="recommendation-verdict">
                        <strong><i class="fas fa-exclamation-triangle"></i> Recomendación:</strong> 
                        <span class="verdict-conditional">RECOMENDADO CON CAPACITACIÓN</span>
                    </div>
                    <p class="recommendation-text">
                        El candidato tiene conocimientos básicos pero necesita fortalecimiento en áreas específicas. 
                        Con capacitación adecuada, puede desarrollar las competencias necesarias.
                    </p>
                    ${strengths.length > 0 ? `<p><strong>Fortalezas:</strong> ${strengths.join(', ')}</p>` : ''}
                    ${suggestions.length > 0 ? `<p><strong>Capacitación requerida:</strong> ${suggestions.join('; ')}</p>` : ''}
                    <p><strong>Tiempo estimado de capacitación:</strong> 2-4 semanas con entrenamiento estructurado.</p>
                    <p><strong>Inversión recomendada:</strong> Considerar si hay recursos disponibles para capacitación.</p>
                </div>
            `;
            break;
            
        case 'regular':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-exclamation-triangle"></i> Conocimientos Limitados</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/360 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/70 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Ventas y Proveedores:</span>
                            <span class="points">${scores.sales}/40 (${salesPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/100 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Lógica:</span>
                            <span class="points">${scores.logic}/30 (${logicPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Psicología:</span>
                            <span class="points">${scores.psychology}/30 (${psychologyPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Salud:</span>
                            <span class="points">${scores.health}/40 (${healthPercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div class="recommendation-verdict">
                        <strong><i class="fas fa-times-circle"></i> Recomendación:</strong> 
                        <span class="verdict-poor">NO RECOMENDADO</span>
                    </div>
                    <p class="recommendation-text">
                        El candidato muestra deficiencias significativas en varias áreas importantes. 
                        No cumple con los requisitos mínimos para el puesto de auxiliar contable.
                    </p>
                    ${weaknesses.length > 0 ? `<p><strong>Áreas deficientes:</strong> ${weaknesses.join(', ')}</p>` : ''}
                    <p><strong>Alternativas:</strong> Considerar para roles de menor responsabilidad o con capacitación extensiva.</p>
                    <p><strong>Capacitación requerida:</strong> Programa integral de 1-3 meses antes de reconsiderar.</p>
                </div>
            `;
            break;
            
        case 'insuficiente':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-times-circle"></i> Conocimientos Insuficientes</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/360 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/70 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Ventas y Proveedores:</span>
                            <span class="points">${scores.sales}/40 (${salesPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/100 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Lógica:</span>
                            <span class="points">${scores.logic}/30 (${logicPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Psicología:</span>
                            <span class="points">${scores.psychology}/30 (${psychologyPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Salud:</span>
                            <span class="points">${scores.health}/40 (${healthPercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <div class="recommendation-verdict">
                        <strong><i class="fas fa-ban"></i> Recomendación:</strong> 
                        <span class="verdict-rejected">NO RECOMENDADO</span>
                    </div>
                    <p class="recommendation-text">
                        El candidato no cumple con los requisitos mínimos para el puesto. 
                        Requiere capacitación fundamental antes de considerar para el rol.
                    </p>
                    <p><strong>Recomendación:</strong> Buscar candidatos con mayor preparación o invertir en capacitación extensiva.</p>
                    <p><strong>Capacitación requerida:</strong> Programa completo de formación de 3-6 meses.</p>
                </div>
            `;
            break;
    }
    
    return recommendation;
}


// ===============================
// FUNCIONES DEL TIMER
// ===============================

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    const timerBar = document.getElementById('timerBar');
    const timeOutModal = document.getElementById('timeOutModal');
    const timeOutSubmitBtn = document.getElementById('timeOutSubmitBtn');
    
    // Configurar evento del botón de envío en el modal
    timeOutSubmitBtn.addEventListener('click', function() {
        submitForm();
    });
    
    timerInterval = setInterval(function() {
        if (isTimeUp) return;
        
        timeRemaining--;
        updateTimerDisplay();
        
        // Calcular porcentaje de tiempo restante
        const totalTime = 20 * 60;
        const percentage = (timeRemaining / totalTime) * 100;
        
        // Actualizar barra de progreso
        timerBar.style.width = percentage + '%';
        
        // Cambiar colores según el tiempo restante
        updateTimerColors(percentage);
        
        // Cuando el tiempo se agota
        if (timeRemaining <= 0) {
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerColors(percentage) {
    const timerDisplay = document.querySelector('.timer-display');
    const timerBar = document.getElementById('timerBar');
    
    // Remover clases anteriores
    timerDisplay.classList.remove('warning', 'critical');
    timerBar.classList.remove('warning', 'critical');
    
    if (percentage <= 20) { // Últimos 3 minutos
        timerDisplay.classList.add('critical');
        timerBar.classList.add('critical');
    } else if (percentage <= 40) { // Últimos 6 minutos
        timerDisplay.classList.add('warning');
        timerBar.classList.add('warning');
    }
}

function timeUp() {
    isTimeUp = true;
    clearInterval(timerInterval);
    
    // Bloquear el formulario
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.add('form-disabled');
    
    // Mostrar modal de tiempo agotado
    const timeOutModal = document.getElementById('timeOutModal');
    timeOutModal.classList.add('show');
    
    // Opcional: Reproducir sonido de alerta
    playTimeUpSound();
    
    // Mostrar notificación SweetAlert2
    Swal.fire({
        title: '⏰ ¡Tiempo Agotado!',
        text: 'El tiempo para completar la evaluación ha terminado.',
        icon: 'warning',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
}

function playTimeUpSound() {
    // Crear un sonido simple usando Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
    } catch (error) {
        console.log('Audio no disponible:', error);
    }
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function resumeTimer() {
    if (!isTimeUp) {
        startTimer();
    }
}

// Función para agregar tiempo extra (solo para testing/debugging)
function addExtraTime(minutes) {
    if (!isTimeUp) {
        timeRemaining += minutes * 60;
        updateTimerDisplay();
    }
}

// Prevenir que el usuario cierre la página accidentalmente cuando hay poco tiempo
window.addEventListener('beforeunload', function(e) {
    if (!isTimeUp && timeRemaining > 0 && timeRemaining < 300) { // Últimos 5 minutos
        e.preventDefault();
        e.returnValue = '¿Estás seguro de que quieres salir? Perderás tu progreso en la evaluación.';
    }
});

// Detectar cuando el usuario cambia de pestaña (opcional)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && !isTimeUp && timeRemaining < 300) {
        // El usuario cambió de pestaña en los últimos 5 minutos
        console.log('Usuario cambió de pestaña con poco tiempo restante');
    }
});

async function submitForm() {
    const submitButton = document.querySelector('.btn-primary') || document.getElementById('timeOutSubmitBtn');
    const originalText = submitButton.innerHTML;
    
    // Detener el timer si está corriendo
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    try {
        // Validar que se hayan respondido al menos algunas preguntas si el tiempo se agotó
        if (isTimeUp) {
            // Para tiempo agotado, enviar lo que esté respondido
            console.log('Enviando evaluación por tiempo agotado');
        } else {
            // Validación normal para envío manual
            if (!validateForm()) {
                showError('Por favor, complete todos los campos requeridos.');
                return;
            }
        }
        
        const formData = collectFormData();
        
        // Intentar enviar a Google Sheets con diferentes métodos
        const success = await sendToGoogleSheets(formData);
        
        if (success) {
            // Descargar JSON con respuestas puras antes de mostrar mensaje de éxito
            downloadResponsesJSON();
            
            showSuccess('Evaluación enviada exitosamente. Gracias por completar la prueba.');
            clearFormAndProgress(); // Limpiar formulario y progreso guardado
            
            // Cerrar modal de tiempo agotado si está abierto
            const timeOutModal = document.getElementById('timeOutModal');
            if (timeOutModal) {
                timeOutModal.classList.remove('show');
            }
            
            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } else {
            throw new Error('Error al enviar los datos');
        }
        
    } catch (error) {
        console.error('Error:', error);
        
        // Mostrar error específico según el tipo
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Error de conexión. Verifique que el script de Google Apps esté configurado correctamente y permita acceso externo.');
        } else {
            showError('Error al enviar la evaluación. Por favor, intente nuevamente.');
        }
        
        // Ofrecer descarga local como alternativa
        offerLocalDownload();
        
    } finally {
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Función mejorada para enviar datos con múltiples intentos
async function sendToGoogleSheets(formData) {
    // Mostrar los datos que se están enviando en la consola
    console.log('Datos a enviar:', formData);
    
    const methods = [
        // Método 1: Fetch con mode no-cors (más confiable para Google Apps Script)
        async () => {
            console.log('Enviando con método no-cors...');
            const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            console.log('Respuesta no-cors:', response);
            return true; // no-cors siempre retorna opaque response
        },
        
        // Método 2: Fetch tradicional con mejor manejo de errores
        async () => {
            console.log('Enviando con fetch tradicional...');
            const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            console.log('Respuesta fetch tradicional:', response);
            
            if (response.ok) {
                const result = await response.json();
                console.log('Resultado del servidor:', result);
                return result.success;
            }
            return false;
        },
        
        // Método 3: XMLHttpRequest con logging detallado
        async () => {
            console.log('Enviando con XMLHttpRequest...');
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', GOOGLE_SHEETS_CONFIG.scriptUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                
                xhr.onload = function() {
                    console.log('XHR Status:', xhr.status);
                    console.log('XHR Response:', xhr.responseText);
                    
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const result = JSON.parse(xhr.responseText);
                            console.log('XHR Resultado parseado:', result);
                            resolve(result.success);
                        } catch (e) {
                            console.log('XHR Sin respuesta JSON válida, asumiendo éxito');
                            resolve(true);
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.responseText}`));
                    }
                };
                
                xhr.onerror = function() {
                    console.log('XHR Error de red');
                    reject(new Error('Network error'));
                };
                
                xhr.send(JSON.stringify(formData));
            });
        },
        
        // Método 4: Usando form submission con parámetros GET
        async () => {
            console.log('Enviando con form submission...');
            const url = new URL(GOOGLE_SHEETS_CONFIG.scriptUrl);
            
            // Enviar algunos datos como parámetros GET para prueba
            url.searchParams.append('test', 'true');
            url.searchParams.append('name', formData.fullName);
            url.searchParams.append('email', formData.email);
            url.searchParams.append('score', formData.totalScore);
            
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url.toString();
            document.body.appendChild(iframe);
            
            // Limpiar después de 5 segundos
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 5000);
            
            return true;
        }
    ];
    
    // Intentar cada método
    for (let i = 0; i < methods.length; i++) {
        try {
            console.log(`🔄 Intentando método ${i + 1}...`);
            const result = await methods[i]();
            if (result) {
                console.log(`✅ Método ${i + 1} exitoso`);
                
                // Mostrar mensaje de confirmación específico
                showSuccess(`Datos enviados exitosamente usando método ${i + 1}. Verifique la hoja de cálculo.`);
                
                // Agregar botón para verificar la hoja
                // addVerificationButton(); // Comentado para ocultar el botón
                
                return true;
            }
        } catch (error) {
            console.log(`❌ Método ${i + 1} falló:`, error.message);
            
            // Si es el último método, intentar una vez más con timeout
            if (i === methods.length - 1) {
                try {
                    console.log('🔄 Intento final con timeout...');
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos
                    
                    const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    console.log('✅ Intento final exitoso');
                    return response.ok;
                } catch (finalError) {
                    console.log('❌ Intento final falló:', finalError.message);
                }
            }
        }
    }
    
    console.log('❌ Todos los métodos fallaron');
    return false;
}

// Función para agregar botón de verificación
function addVerificationButton() {
    // Verificar si ya existe el botón
    if (document.querySelector('.verify-button')) return;
    
    const verifyBtn = document.createElement('button');
    verifyBtn.className = 'btn btn-secondary verify-button';
    verifyBtn.style.marginTop = '10px';
    verifyBtn.style.marginLeft = '10px';
    verifyBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Verificar en Google Sheets';
    
    verifyBtn.onclick = function() {
        // Intentar abrir la hoja de cálculo
        const sheetId = extractSheetId();
        if (sheetId) {
            const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
            window.open(sheetUrl, '_blank');
        } else {
            showError('No se pudo determinar el ID de la hoja. Verifique la configuración.');
        }
    };
    
    document.querySelector('.form-actions').appendChild(verifyBtn);
}

// Función para extraer el ID de la hoja desde la URL del script
function extractSheetId() {
    // Esta función intentará obtener el ID de la hoja si está configurado
    // Por ahora, mostrar instrucciones al usuario
    return null;
}

// Función para mostrar el estado de la configuración
function showConfigurationStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'config-status';
    statusDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1000;
    `;
    
    const scriptConfigured = GOOGLE_SHEETS_CONFIG.scriptUrl && 
                            GOOGLE_SHEETS_CONFIG.scriptUrl !== 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUÍ';
    
    statusDiv.innerHTML = `
        <strong>Estado de configuración:</strong><br>
        Script URL: ${scriptConfigured ? '✅ Configurado' : '❌ No configurado'}<br>
        <small>URL: ${GOOGLE_SHEETS_CONFIG.scriptUrl.substring(0, 50)}...</small>
    `;
    
    document.body.appendChild(statusDiv);
    
    // Quitar después de 5 segundos
    setTimeout(() => {
        statusDiv.remove();
    }, 5000);
}

// Función para test directo del Google Apps Script
async function testGoogleAppsScript() {
    console.log('🧪 Probando conexión con Google Apps Script...');
    
    const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Prueba de conexión'
    };
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('✅ Prueba enviada. Verifique la hoja de cálculo.');
        showSuccess('Datos de prueba enviados. Verifique si aparecen en la hoja de cálculo.');
        
    } catch (error) {
        console.error('❌ Error en prueba:', error);
        showError('Error en la prueba de conexión: ' + error.message);
    }
}

// Función para ofrecer descarga local como alternativa
function offerLocalDownload() {
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-secondary';
    downloadBtn.style.marginTop = '10px';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar Evaluación';
    
    downloadBtn.onclick = function() {
        const data = collectFormData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `evaluacion_${data.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccess('Evaluación descargada. Puede enviar este archivo manualmente.');
        downloadBtn.remove();
    };
    
    document.querySelector('.form-actions').appendChild(downloadBtn);
}

function validateForm() {
    const requiredFields = ['fullName', 'email', 'phone'];
    
    for (let field of requiredFields) {
        const input = document.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
            input.focus();
            return false;
        }
    }
    
    // Verificar que se hayan respondido las preguntas principales
    let answeredQuestions = 0;
    for (let i = 1; i <= 15; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) answeredQuestions++;
    }
    
    if (answeredQuestions < 10) {
        showError('Por favor, responda al menos 10 preguntas de la evaluación.');
        return false;
    }
    
    return true;
}

function showSuccess(message) {
    Swal.fire({
        title: '¡Éxito!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#667eea',
        background: 'rgba(255, 255, 255, 0.95)',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function showError(message) {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#ef4444',
        background: 'rgba(255, 255, 255, 0.95)',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function hideMessages() {
    // Esta función ya no es necesaria con SweetAlert2, pero la mantenemos por compatibilidad
    Swal.close();
}

// Funciones adicionales para mejorar la experiencia
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollTop = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            section.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
        } else {
            section.style.backgroundColor = 'transparent';
        }
    });
}

// Scroll suave para navegación
window.addEventListener('scroll', highlightCurrentSection);

// Prevenir envío accidental del formulario
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.type !== 'submit' && e.target.type !== 'textarea') {
        e.preventDefault();
    }
});

// Función para guardar progreso
function saveProgress() {
    const formData = new FormData(document.getElementById('evaluationForm'));
    const progress = {};
    
    for (let [key, value] of formData.entries()) {
        progress[key] = value;
    }
    
    localStorage.setItem('evaluationProgress', JSON.stringify(progress));
}

// Cargar progreso guardado
function loadProgress() {
    const saved = localStorage.getItem('evaluationProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        let hasAnswers = false;
        
        Object.keys(progress).forEach(key => {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'radio') {
                    const radio = document.querySelector(`[name="${key}"][value="${progress[key]}"]`);
                    if (radio) {
                        radio.checked = true;
                        hasAnswers = true;
                    }
                } else {
                    element.value = progress[key];
                }
            }
        });
        
        // Si hay respuestas guardadas, iniciar el timer
        if (hasAnswers && !timerStarted) {
            startTimer();
            timerStarted = true;
            
            // Mostrar el timer container
            const timerContainer = document.getElementById('timerContainer');
            timerContainer.classList.add('active');
        }
        
        calculateScore();
        updateScoreDisplay();
    }
}

// Guardar progreso cada vez que se hace un cambio
document.addEventListener('change', saveProgress);

// Cargar progreso al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    enforceScoreHiding(); // Forzar ocultamiento de puntuaciones
});

// Función para forzar el ocultamiento de puntuaciones
function enforceScoreHiding() {
    const scoreContainer = document.querySelector('.score-container');
    if (scoreContainer) {
        // Forzar ocultamiento con múltiples métodos para mayor seguridad
        scoreContainer.style.display = 'none';
        scoreContainer.style.visibility = 'hidden';
        scoreContainer.style.opacity = '0';
        scoreContainer.style.position = 'absolute';
        scoreContainer.style.left = '-9999px';
        scoreContainer.setAttribute('aria-hidden', 'true');
        
        // Crear un observador para evitar que se muestre si alguien trata de modificar el CSS
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    scoreContainer.style.display = 'none';
                    scoreContainer.style.visibility = 'hidden';
                    scoreContainer.style.opacity = '0';
                }
            });
        });
        
        observer.observe(scoreContainer, { 
            attributes: true, 
            attributeFilter: ['style', 'class'] 
        });
    }
    
    // Verificar cada 2 segundos para mantener oculto
    setInterval(function() {
        const scoreEl = document.querySelector('.score-container');
        if (scoreEl && scoreEl.style.display !== 'none') {
            scoreEl.style.display = 'none';
            scoreEl.style.visibility = 'hidden';
            scoreEl.style.opacity = '0';
        }
    }, 2000);
}

// Limpiar progreso al enviar exitosamente
function clearProgress() {
    localStorage.removeItem('evaluationProgress');
}

// Limpiar formulario completo y progreso
function clearFormAndProgress() {
    // Limpiar localStorage
    localStorage.removeItem('evaluationProgress');
    
    // Limpiar el formulario
    const form = document.getElementById('evaluationForm');
    form.reset();
    
    // Limpiar todos los campos específicamente
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Resetear puntuación
    currentScore = {
        total: 0,
        accounting: 0,
        sales: 0,
        excel: 0,
        secretarial: 0,
        logic: 0,
        psychology: 0,
        health: 0
    };
    updateScoreDisplay();
    
    // Resetear timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timeRemaining = 20 * 60;
    isTimeUp = false;
    timerStarted = false;
    
    // Ocultar timer container
    const timerContainer = document.getElementById('timerContainer');
    timerContainer.classList.remove('active');
    
    // Resetear display del timer
    updateTimerDisplay();
    
    // Mostrar todas las secciones de nuevo
    const sections = document.querySelectorAll('.question-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Resetear el progreso visual si existe
    const progressBars = document.querySelectorAll('.progress-bar, .progress-fill');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    console.log('Formulario y progreso limpiados completamente');
}

// Función para exportar resultados (opcional)
function exportResults() {
    const data = collectFormData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluacion_${data.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
