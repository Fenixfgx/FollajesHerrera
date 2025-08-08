// Configuración para Google Sheets - SISTEMA AGRÍCOLA ACTUALIZADO
const GOOGLE_SHEETS_CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyjAm7Yeex05wr166SAlW0s3EJMbq2vJFK5_5A44No19ohdwuP-NrSv0LvN-DvTH4ys/exec',
    sheetName: 'EvaluacionesAgricolas'
};

// Variables globales
let currentScore = {
    total: 0,
    knowledge: 0,
    personality: 0,
    lifestyle: 0,
    logic: 0,
    availability: 0,
    interpersonal: 0
};

// Análisis psicológico encubierto con porcentajes
let psychProfile = {
    // Trastornos principales
    psychopathy: 0,      // Psicopatía
    sociopathy: 0,       // Sociopatía  
    narcissism: 0,       // Narcisismo
    antisocial: 0,       // Trastorno antisocial
    
    // Adicciones y sustancias
    substanceUse: 0,     // Uso problemático de sustancias
    alcoholism: 0,       // Alcoholismo
    
    // Otros trastornos
    anxiety: 0,          // Ansiedad
    aggression: 0,       // Agresividad
    compulsiveness: 0,   // Comportamiento obsesivo-compulsivo
    
    // Cualidades positivas
    empathy: 0,          // Empatía
    stability: 0,        // Estabilidad emocional
    reliability: 0,      // Confiabilidad
    intelligence: 0,     // Inteligencia
    integrity: 0         // Integridad
};

// Variables del timer
let timeRemaining = 20 * 60;
let timerInterval;
let isTimeUp = false;
let timerStarted = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    randomizeAnswers();
    setupEventListeners();
    updateScoreDisplay();
    showConfigurationStatus();
});

function initializeForm() {
    const stressSlider = document.getElementById('stressLevel');
    if (stressSlider) {
        stressSlider.addEventListener('input', function() {
            this.nextElementSibling.textContent = this.value;
        });
    }

    const form = document.getElementById('evaluationForm');
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

function randomizeAnswers() {
    const questionGroups = document.querySelectorAll('.question-group');
    
    questionGroups.forEach(group => {
        const radioGroup = group.querySelector('.radio-group');
        if (radioGroup) {
            const labels = Array.from(radioGroup.querySelectorAll('label'));
            
            const options = labels.map(label => ({
                element: label,
                text: label.textContent.trim(),
                value: label.querySelector('input').value,
                name: label.querySelector('input').name
            }));
            
            // Fisher-Yates shuffle
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            
            radioGroup.innerHTML = '';
            options.forEach(option => {
                radioGroup.appendChild(option.element);
            });
        }
    });
}

function setupEventListeners() {
    const form = document.getElementById('evaluationForm');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (!timerStarted) {
                startTimer();
                timerStarted = true;
                
                const timerContainer = document.getElementById('timerContainer');
                timerContainer.classList.add('active');
                
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
            saveProgress();
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });
}

function calculateScore() {
    // Reset scores
    currentScore = {
        total: 0,
        knowledge: 0,
        personality: 0,
        lifestyle: 0,
        logic: 0,
        availability: 0,
        interpersonal: 0
    };
    
    // Reset psychological profile
    psychProfile = {
        psychopathy: 0,
        sociopathy: 0,
        narcissism: 0,
        antisocial: 0,
        substanceUse: 0,
        alcoholism: 0,
        anxiety: 0,
        aggression: 0,
        compulsiveness: 0,
        empathy: 0,
        stability: 0,
        reliability: 0,
        intelligence: 0,
        integrity: 0
    };
    
    // Conocimientos sobre follajes (q1-q6)
    for (let i = 1; i <= 6; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.knowledge += parseInt(answer.value);
            analyzeKnowledgeTrait(answer);
        }
    }
    
    // Personalidad (q7-q14)
    for (let i = 7; i <= 14; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.personality += parseInt(answer.value);
            analyzePersonalityTrait(answer);
        }
    }
    
    // Hábitos y estilo de vida (q15-q20)
    for (let i = 15; i <= 20; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.lifestyle += parseInt(answer.value);
            analyzeLifestyleTrait(answer);
        }
    }
    
    // Razonamiento y lógica (q21-q24)
    for (let i = 21; i <= 24; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.logic += parseInt(answer.value);
            analyzeLogicalTrait(answer);
        }
    }
    
    // Disponibilidad (q25-q28)
    for (let i = 25; i <= 28; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.availability += parseInt(answer.value);
            analyzeAvailabilityTrait(answer);
        }
    }
    
    // Competencias interpersonales (q29-q32)
    for (let i = 29; i <= 32; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.interpersonal += parseInt(answer.value);
            analyzeInterpersonalTrait(answer);
        }
    }
    
    currentScore.total = currentScore.knowledge + currentScore.personality + 
                        currentScore.lifestyle + currentScore.logic + 
                        currentScore.availability + currentScore.interpersonal;
    
    // Calcular porcentajes de trastornos
    calculateDisorderPercentages();
}

// Análisis de rasgos por sección
function analyzeKnowledgeTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    if (trait === 'knowledge' || trait === 'analytical' || trait === 'observant') {
        psychProfile.intelligence += (value / 10) * 2;
    }
}

function analyzePersonalityTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'integrity':
        case 'honesty':
            psychProfile.integrity += (value / 10) * 4;
            psychProfile.psychopathy += (10 - value) / 10 * 3;
            break;
        case 'empathy':
            psychProfile.empathy += (value / 10) * 4;
            psychProfile.psychopathy += (10 - value) / 10 * 3;
            psychProfile.sociopathy += (10 - value) / 10 * 2;
            break;
        case 'antisocial':
            psychProfile.antisocial += (10 - value) / 10 * 4;
            psychProfile.sociopathy += (10 - value) / 10 * 3;
            break;
        case 'psychopathic':
            psychProfile.psychopathy += (10 - value) / 10 * 5;
            break;
        case 'manipulative':
            psychProfile.psychopathy += (10 - value) / 10 * 3;
            psychProfile.narcissism += (10 - value) / 10 * 2;
            break;
        case 'remorse':
            psychProfile.psychopathy += (10 - value) / 10 * 4;
            break;
        case 'stable':
            psychProfile.stability += (value / 10) * 3;
            psychProfile.antisocial += (10 - value) / 10 * 2;
            break;
        case 'rebellious':
            psychProfile.antisocial += (10 - value) / 10 * 3;
            break;
        // Psicología del color - análisis profundo de personalidad
        case 'peaceful-color':
            // Azul/Verde - personas pacíficas, empáticas y estables
            psychProfile.empathy += (value / 10) * 3;
            psychProfile.stability += (value / 10) * 3;
            psychProfile.aggression += ((10 - value) / 10) * 2;
            psychProfile.anxiety += ((10 - value) / 10) * 1;
            break;
        case 'warm-color':
            // Amarillo/Naranja - personalidad extrovertida, optimista y confiable
            psychProfile.empathy += (value / 10) * 2;
            psychProfile.reliability += (value / 10) * 2;
            psychProfile.stability += (value / 10) * 1;
            break;
        case 'intense-color':
            // Rojo/Púrpura - personalidad intensa, posible agresividad o narcisismo
            psychProfile.aggression += ((10 - value) / 10) * 2;
            psychProfile.narcissism += ((10 - value) / 10) * 2;
            psychProfile.antisocial += ((10 - value) / 10) * 1;
            break;
        case 'dark-color':
            // Negro/Gris - posibles tendencias depresivas, antisociales o psicopáticas
            psychProfile.psychopathy += ((10 - value) / 10) * 3;
            psychProfile.antisocial += ((10 - value) / 10) * 3;
            psychProfile.stability += ((10 - value) / 10) * 2;
            psychProfile.empathy += ((10 - value) / 10) * 2;
            break;
    }
}

function analyzeLifestyleTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'dependency':
            // Gasto alto en entretenimiento nocturno indica posible consumo
            psychProfile.substanceUse += (10 - value) / 10 * 5;
            psychProfile.alcoholism += (10 - value) / 10 * 4;
            break;
        case 'sobriety':
            // Gastos bajos y actividades saludables indican sobriedad
            psychProfile.substanceUse += (value / 10) * (-2);
            psychProfile.alcoholism += (value / 10) * (-2);
            psychProfile.stability += (value / 10) * 2;
            break;
        case 'addiction':
            // Faltas los lunes o problemas de salud frecuentes
            psychProfile.substanceUse += (10 - value) / 10 * 4;
            psychProfile.alcoholism += (10 - value) / 10 * 3;
            psychProfile.reliability += (value / 10) * (-2);
            break;
        case 'clean':
            // Razones legítimas para faltar al trabajo
            psychProfile.reliability += (value / 10) * 3;
            psychProfile.integrity += (value / 10) * 2;
            break;
        case 'substance':
            // Socializar con gente de vida nocturna intensa
            psychProfile.substanceUse += (10 - value) / 10 * 4;
            psychProfile.alcoholism += (10 - value) / 10 * 3;
            break;
        case 'healthy':
            // Socializar con familia y gente que practica deportes
            psychProfile.empathy += (value / 10) * 2;
            psychProfile.stability += (value / 10) * 3;
            break;
        case 'violent':
            psychProfile.aggression += (10 - value) / 10 * 4;
            psychProfile.antisocial += (10 - value) / 10 * 3;
            break;
        case 'poor':
            psychProfile.aggression += (10 - value) / 10 * 3;
            break;
        case 'troubled':
            // Horarios irregulares o no dormir en casa
            psychProfile.substanceUse += (10 - value) / 10 * 3;
            psychProfile.stability += ((10 - value) / 10) * 2;  // Corregido: mayor problema = menor estabilidad
            break;
        case 'stable':
            // Horarios regulares de sueño
            psychProfile.stability += (value / 10) * 3;
            psychProfile.reliability += (value / 10) * 2;
            break;
        case 'experimental':
            // Malestar después de eventos sociales (posible resaca)
            psychProfile.substanceUse += (10 - value) / 10 * 2;
            psychProfile.alcoholism += (10 - value) / 10 * 2;
            break;
        case 'irregular':
            // Trasnochar frecuentemente los fines de semana
            psychProfile.substanceUse += (10 - value) / 10 * 2;
            psychProfile.stability += ((10 - value) / 10) * 1;  // Corregido: mayor irregularidad = menor estabilidad
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
            psychProfile.compulsiveness += (10 - value) / 10 * 3;
            break;
        case 'indecisive':
            psychProfile.anxiety += (10 - value) / 10 * 2;
            break;
        // Nuevos traits de animales - análisis psicológico profundo
        case 'peaceful':
            // Vaca/herbívoro - personalidad pacífica y estable
            psychProfile.empathy += (value / 10) * 3;
            psychProfile.stability += (value / 10) * 2;
            psychProfile.aggression += ((10 - value) / 10) * 1;
            break;
        case 'industrious':
            // Ardilla - trabajador, organizado, previsor
            psychProfile.reliability += (value / 10) * 3;
            psychProfile.integrity += (value / 10) * 2;
            break;
        case 'opportunistic':
            // Cuervo - oportunista, puede indicar tendencias antisociales leves
            psychProfile.antisocial += ((10 - value) / 10) * 1;
            break;
        case 'predatory':
            // León/depredador - dominante, potencialmente agresivo/psicopático
            psychProfile.psychopathy += ((10 - value) / 10) * 4;
            psychProfile.aggression += ((10 - value) / 10) * 3;
            psychProfile.antisocial += ((10 - value) / 10) * 2;
            break;
        case 'calm':
            // Tortuga - calmado bajo estrés, estable
            psychProfile.stability += (value / 10) * 3;
            psychProfile.anxiety += ((10 - value) / 10) * 2;
            break;
        case 'protective':
            // Oso - protector pero controlado
            psychProfile.empathy += (value / 10) * 2;
            psychProfile.reliability += (value / 10) * 2;
            break;
        case 'reactive':
            // Gato defensivo - reactivo, posible ansiedad
            psychProfile.anxiety += ((10 - value) / 10) * 2;
            psychProfile.aggression += ((10 - value) / 10) * 1;
            break;
        case 'aggressive':
            // Serpiente - impredecible, potencial psicopatía
            psychProfile.psychopathy += ((10 - value) / 10) * 4;
            psychProfile.antisocial += ((10 - value) / 10) * 3;
            psychProfile.stability += ((10 - value) / 10) * 2;
            break;
        case 'cooperative':
            // Abeja - trabajo en equipo, empático
            psychProfile.empathy += (value / 10) * 3;
            psychProfile.reliability += (value / 10) * 2;
            break;
        case 'loyal':
            // Perro pastor - leal, confiable
            psychProfile.integrity += (value / 10) * 3;
            psychProfile.reliability += (value / 10) * 2;
            break;
        case 'solitary':
            // Gato - independiente, posible antisocial leve
            psychProfile.antisocial += ((10 - value) / 10) * 1;
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
        case 'unstable':
            psychProfile.stability += ((10 - value) / 10) * 2;  // Corregido: mayor inestabilidad = menor estabilidad
            break;
    }
}

function analyzeInterpersonalTrait(answer) {
    const trait = answer.getAttribute('data-trait');
    const value = parseInt(answer.value);
    
    switch(trait) {
        case 'helpful':
        case 'trustworthy':
            psychProfile.empathy += (value / 10) * 3;
            psychProfile.integrity += (value / 10) * 2;
            break;
        case 'observant':
            // Búho - observador, cuidadoso, inteligente
            psychProfile.intelligence += (value / 10) * 2;
            psychProfile.empathy += (value / 10) * 1;
            break;
        case 'indifferent':
            // Gato montés - solitario, falta de empatía
            psychProfile.empathy += ((10 - value) / 10) * 2;
            psychProfile.antisocial += ((10 - value) / 10) * 1;
            break;
        case 'exploitative':
            psychProfile.psychopathy += (10 - value) / 10 * 4;
            break;
        case 'aggressive':
            psychProfile.aggression += (10 - value) / 10 * 4;
            break;
        case 'dismissive':
            psychProfile.narcissism += (10 - value) / 10 * 3;
            break;
    }
}

function calculateDisorderPercentages() {
    // Normalizar a porcentajes (0-100%)
    const maxScore = 20; // Puntuación máxima teórica por trastorno
    
    // Trastornos principales
    psychProfile.psychopathy = Math.min(100, Math.max(0, (psychProfile.psychopathy / maxScore) * 100));
    psychProfile.sociopathy = Math.min(100, Math.max(0, (psychProfile.sociopathy / maxScore) * 100));
    psychProfile.narcissism = Math.min(100, Math.max(0, (psychProfile.narcissism / maxScore) * 100));
    psychProfile.antisocial = Math.min(100, Math.max(0, (psychProfile.antisocial / maxScore) * 100));
    
    // Adicciones
    psychProfile.substanceUse = Math.min(100, Math.max(0, (psychProfile.substanceUse / maxScore) * 100));
    psychProfile.alcoholism = Math.min(100, Math.max(0, (psychProfile.alcoholism / maxScore) * 100));
    
    // Otros trastornos
    psychProfile.anxiety = Math.min(100, Math.max(0, (psychProfile.anxiety / maxScore) * 100));
    psychProfile.aggression = Math.min(100, Math.max(0, (psychProfile.aggression / maxScore) * 100));
    psychProfile.compulsiveness = Math.min(100, Math.max(0, (psychProfile.compulsiveness / maxScore) * 100));
    
    // Cualidades positivas
    psychProfile.empathy = Math.min(100, Math.max(0, (psychProfile.empathy / maxScore) * 100));
    psychProfile.stability = Math.min(100, Math.max(0, (psychProfile.stability / maxScore) * 100));
    psychProfile.reliability = Math.min(100, Math.max(0, (psychProfile.reliability / maxScore) * 100));
    psychProfile.intelligence = Math.min(100, Math.max(0, (psychProfile.intelligence / maxScore) * 100));
    psychProfile.integrity = Math.min(100, Math.max(0, (psychProfile.integrity / maxScore) * 100));
}

function updateScoreDisplay() {
    // Actualizar puntuaciones por sección
    document.getElementById('personalityScore').textContent = `${currentScore.personality}/80`;
    document.getElementById('lifestyleScore').textContent = `${currentScore.lifestyle}/60`;
    document.getElementById('logicScore').textContent = `${currentScore.logic}/40`;
    document.getElementById('availabilityScore').textContent = `${currentScore.availability}/40`;
    document.getElementById('interpersonalScore').textContent = `${currentScore.interpersonal}/40`;
    
    // Actualizar puntuación total
    document.querySelector('.score-number').textContent = currentScore.total;
    
    // Calcular porcentaje
    const maxPossible = 320; // Nueva puntuación máxima
    const percentage = (currentScore.total / maxPossible) * 100;
    
    // Actualizar barra de progreso
    const levelBar = document.querySelector('.level-bar');
    levelBar.style.width = percentage + '%';
    
    // Actualizar texto de nivel
    const levelText = document.querySelector('.level-text');
    if (percentage >= 90) {
        levelText.textContent = 'Excelente - Candidato altamente recomendado';
        levelBar.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
    } else if (percentage >= 80) {
        levelText.textContent = 'Muy Bueno - Candidato recomendado';
        levelBar.style.background = 'linear-gradient(90deg, #3498db, #5dade2)';
    } else if (percentage >= 70) {
        levelText.textContent = 'Bueno - Candidato con potencial';
        levelBar.style.background = 'linear-gradient(90deg, #f39c12, #f8c471)';
    } else if (percentage >= 60) {
        levelText.textContent = 'Aceptable - Requiere evaluación adicional';
        levelBar.style.background = 'linear-gradient(90deg, #e67e22, #f4d03f)';
    } else {
        levelText.textContent = 'No apto para el puesto';
        levelBar.style.background = 'linear-gradient(90deg, #e74c3c, #ec7063)';
    }
    
    // Generar recomendación
    updateRecommendation();
    
    // Log detallado para administradores
    console.log('🧠 ANÁLISIS PSICOLÓGICO DETALLADO:', {
        'TRASTORNOS PRINCIPALES': {
            'Psicopatía': psychProfile.psychopathy.toFixed(1) + '%',
            'Sociopatía': psychProfile.sociopathy.toFixed(1) + '%',
            'Narcisismo': psychProfile.narcissism.toFixed(1) + '%',
            'Trastorno Antisocial': psychProfile.antisocial.toFixed(1) + '%'
        },
        'ADICCIONES': {
            'Uso Problemático de Sustancias': psychProfile.substanceUse.toFixed(1) + '%',
            'Alcoholismo': psychProfile.alcoholism.toFixed(1) + '%'
        },
        'OTROS TRASTORNOS': {
            'Ansiedad': psychProfile.anxiety.toFixed(1) + '%',
            'Agresividad': psychProfile.aggression.toFixed(1) + '%',
            'Comportamiento Obsesivo-Compulsivo': psychProfile.compulsiveness.toFixed(1) + '%'
        },
        'CUALIDADES POSITIVAS': {
            'Empatía': psychProfile.empathy.toFixed(1) + '%',
            'Estabilidad Emocional': psychProfile.stability.toFixed(1) + '%',
            'Confiabilidad': psychProfile.reliability.toFixed(1) + '%',
            'Inteligencia': psychProfile.intelligence.toFixed(1) + '%',
            'Integridad': psychProfile.integrity.toFixed(1) + '%'
        }
    });
}

function updateRecommendation() {
    const recommendationText = document.querySelector('.recommendation-text');
    
    // Identificar riesgos críticos
    const criticalRisks = [];
    const moderateRisks = [];
    const strengths = [];
    
    // Evaluar trastornos críticos
    if (psychProfile.psychopathy > 30) criticalRisks.push('PSICOPATÍA ELEVADA');
    if (psychProfile.sociopathy > 30) criticalRisks.push('SOCIOPATÍA ELEVADA');
    if (psychProfile.antisocial > 40) criticalRisks.push('TRASTORNO ANTISOCIAL');
    if (psychProfile.substanceUse > 40) criticalRisks.push('PROBLEMA DE SUSTANCIAS');
    if (psychProfile.aggression > 50) criticalRisks.push('AGRESIVIDAD PROBLEMÁTICA');
    
    // Evaluar riesgos moderados
    if (psychProfile.narcissism > 40) moderateRisks.push('Narcisismo elevado');
    if (psychProfile.alcoholism > 30) moderateRisks.push('Posible alcoholismo');
    if (psychProfile.anxiety > 60) moderateRisks.push('Ansiedad alta');
    if (psychProfile.compulsiveness > 50) moderateRisks.push('Comportamiento obsesivo');
    
    // Evaluar fortalezas
    if (psychProfile.empathy > 60) strengths.push('Alta empatía');
    if (psychProfile.integrity > 70) strengths.push('Gran integridad');
    if (psychProfile.reliability > 60) strengths.push('Muy confiable');
    if (psychProfile.intelligence > 60) strengths.push('Inteligencia superior');
    if (psychProfile.stability > 60) strengths.push('Estabilidad emocional');
    
    // Generar recomendación
    let recommendation = '';
    
    if (criticalRisks.length > 0) {
        recommendation = `🚨 CANDIDATO NO APTO: Se detectaron riesgos críticos (${criticalRisks.join(', ')}). NO CONTRATAR. Se requiere evaluación psicológica profesional.`;
    } else if (moderateRisks.length > 2) {
        recommendation = `⚠️ ALTO RIESGO: Múltiples áreas de preocupación detectadas (${moderateRisks.join(', ')}). Evaluación psicológica profesional recomendada antes de continuar.`;
    } else if (moderateRisks.length > 0) {
        recommendation = `🔍 PRECAUCIÓN: Se detectaron algunas áreas de riesgo (${moderateRisks.join(', ')}). Entrevista profunda y verificación exhaustiva de referencias requeridas.`;
    } else if (strengths.length > 2) {
        recommendation = `✅ CANDIDATO IDEAL: Perfil psicológico excelente con múltiples fortalezas (${strengths.join(', ')}). ALTAMENTE RECOMENDADO para contratación.`;
    } else {
        recommendation = `👤 CANDIDATO ACEPTABLE: Perfil dentro de parámetros normales. Apto para continuar con proceso de selección estándar.`;
    }
    
    recommendationText.textContent = recommendation;
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById('timer');
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const totalTime = 20 * 60;
    const percentage = (timeRemaining / totalTime) * 100;
    const timerBar = document.getElementById('timerBar');
    timerBar.style.width = percentage + '%';
    
    const timerDisplay = document.querySelector('.timer-display');
    if (timeRemaining <= 300) {
        timerDisplay.classList.add('critical');
        timerBar.classList.add('critical');
    } else if (timeRemaining <= 600) {
        timerDisplay.classList.add('warning');
        timerBar.classList.add('warning');
    }
}

function timeUp() {
    clearInterval(timerInterval);
    isTimeUp = true;
    
    document.getElementById('timeOutModal').style.display = 'flex';
    
    document.getElementById('timeOutSubmitBtn').onclick = function() {
        submitForm();
    };
}

// Form functions
function submitForm() {
    if (!validateForm()) {
        return;
    }
    
    const data = collectFormData();
    
    Swal.fire({
        title: 'Enviando evaluación...',
        text: 'Por favor espere mientras procesamos su información.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    sendToGoogleSheets(data);
}

function validateForm() {
    const requiredFields = ['fullName', 'phone'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            missingFields.push(element.previousElementSibling.textContent);
            element.classList.add('error');
        }
    });
    
    if (missingFields.length > 0) {
        Swal.fire({
            title: 'Campos requeridos',
            text: `Por favor complete: ${missingFields.join(', ')}`,
            icon: 'warning'
        });
        return false;
    }
    
    return true;
}

function collectFormData() {
    const formData = new FormData(document.getElementById('evaluationForm'));
    const data = {};
    
    // Información personal
    data.timestamp = new Date().toISOString();
    data.fullName = formData.get('fullName');
    data.phone = formData.get('phone');
    data.experience = formData.get('experience');
    
    // Respuestas
    for (let i = 1; i <= 32; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        data[`question_${i}`] = answer ? answer.value : '0';
    }
    
    // Autoevaluación
    data.stressLevel = formData.get('stressLevel');
    data.communicationStyle = formData.get('communicationStyle');
    data.personalChallenges = formData.get('personalChallenges');
    
    // Preferencias
    const environmentCheckboxes = document.querySelectorAll('input[name="environment"]:checked');
    data.workEnvironment = Array.from(environmentCheckboxes).map(cb => cb.value).join(', ');
    
    const motivationCheckboxes = document.querySelectorAll('input[name="motivation"]:checked');
    data.motivations = Array.from(motivationCheckboxes).map(cb => cb.value).join(', ');
    
    // Puntuaciones
    data.knowledgeScore = currentScore.knowledge;
    data.personalityScore = currentScore.personality;
    data.lifestyleScore = currentScore.lifestyle;
    data.logicScore = currentScore.logic;
    data.availabilityScore = currentScore.availability;
    data.interpersonalScore = currentScore.interpersonal;
    data.totalScore = currentScore.total;
    data.percentage = Math.round((currentScore.total / 320) * 100);
    
    // Análisis psicológico (CRÍTICO - Solo para administradores)
    data.psychologicalAnalysis = {
        psychopathy: psychProfile.psychopathy.toFixed(1) + '%',
        sociopathy: psychProfile.sociopathy.toFixed(1) + '%',
        narcissism: psychProfile.narcissism.toFixed(1) + '%',
        antisocial: psychProfile.antisocial.toFixed(1) + '%',
        substanceUse: psychProfile.substanceUse.toFixed(1) + '%',
        alcoholism: psychProfile.alcoholism.toFixed(1) + '%',
        aggression: psychProfile.aggression.toFixed(1) + '%',
        empathy: psychProfile.empathy.toFixed(1) + '%',
        integrity: psychProfile.integrity.toFixed(1) + '%',
        stability: psychProfile.stability.toFixed(1) + '%'
    };
    
    // Información del tiempo
    const totalTime = 20 * 60;
    const timeUsed = totalTime - timeRemaining;
    data.timeUsedMinutes = Math.floor(timeUsed / 60);
    data.timeUsedSeconds = timeUsed % 60;
    data.timeUpSubmission = isTimeUp ? 'Sí' : 'No';
    
    return data;
}

function sendToGoogleSheets(data) {
    fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        clearInterval(timerInterval);
        localStorage.removeItem('evaluationProgress');
        
        Swal.fire({
            title: '¡Evaluación Enviada!',
            text: 'Gracias por completar la evaluación. Sus respuestas han sido registradas exitosamente.',
            icon: 'success',
            confirmButtonText: 'Entendido'
        }).then(() => {
            document.getElementById('evaluationForm').style.display = 'none';
            showCompletionMessage();
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error de envío',
            text: 'Hubo un problema al enviar la evaluación. Por favor, contacte al administrador.',
            icon: 'error'
        });
    });
}

function showCompletionMessage() {
    const container = document.querySelector('.form-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #27ae60; margin-bottom: 20px;"></i>
            <h2>¡Evaluación Completada!</h2>
            <p>Gracias por su tiempo. Sus respuestas han sido registradas y serán revisadas por nuestro equipo.</p>
            <p>Nos pondremos en contacto con usted pronto.</p>
        </div>
    `;
}

function saveProgress() {
    const progress = {
        timestamp: Date.now(),
        answers: {},
        timeRemaining: timeRemaining
    };
    
    for (let i = 1; i <= 32; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            progress.answers[`q${i}`] = answer.value;
        }
    }
    
    localStorage.setItem('evaluationProgress', JSON.stringify(progress));
}

function showConfigurationStatus() {
    console.log('🔧 SISTEMA DE EVALUACIÓN AGRÍCOLA ACTIVADO');
    console.log('📊 Análisis psicológico encubierto habilitado');
    console.log('🧠 Detección SUTIL de trastornos: Psicopatía, Sociopatía, Narcisismo, Antisocial');
    console.log('🕵️ Detección INDIRECTA de adicciones: Alcohol, Drogas, Sustancias');
    console.log('🎭 Preguntas disfrazadas como preferencias sociales, gastos y hábitos de sueño');
    console.log('💚 URL Google Sheets:', GOOGLE_SHEETS_CONFIG.scriptUrl);
}
