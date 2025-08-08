// Configuración para Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyjAm7Yeex05wr166SAlW0s3EJMbq2vJFK5_5A44No19ohdwuP-NrSv0LvN-DvTH4ys/exec',
    sheetName: 'EvaluacionesAgricolas'
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
    // Agregar listeners para el slider de estrés
    const stressSlider = document.getElementById('stressLevel');
    if (stressSlider) {
        stressSlider.addEventListener('input', function() {
            this.nextElementSibling.textContent = this.value;
        });
    }

    // Validación de formulario
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
            
            // Mezclar las opciones usando Fisher-Yates shuffle
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

function updateScoreDisplay() {
    // Actualizar puntuaciones individuales
    document.getElementById('personalityScore').textContent = `${currentScore.personality}/80`;
    document.getElementById('lifestyleScore').textContent = `${currentScore.lifestyle}/40`;
    document.getElementById('logicScore').textContent = `${currentScore.logic}/60`;
    document.getElementById('availabilityScore').textContent = `${currentScore.availability}/50`;
    document.getElementById('interpersonalScore').textContent = `${currentScore.interpersonal}/50`;
    
    // Actualizar puntuación total
    document.querySelector('.score-number').textContent = currentScore.total;
    
    // Calcular porcentaje
    const percentage = (currentScore.total / 280) * 100;
    
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
        levelText.textContent = 'Aceptable - Requiere desarrollo';
        levelBar.style.background = 'linear-gradient(90deg, #e67e22, #f4d03f)';
    } else {
        levelText.textContent = 'Requiere mejora significativa';
        levelBar.style.background = 'linear-gradient(90deg, #e74c3c, #ec7063)';
    }
    
    // Generar recomendación basada en perfil psicológico
    updateRecommendation();
    
    // Log para análisis interno (solo visible para administradores)
    console.log('Perfil Psicológico Encubierto:', psychProfile);
}

function updateRecommendation() {
    const recommendationText = document.querySelector('.recommendation-text');
    
    // Análisis del perfil psicológico encubierto
    let alerts = [];
    let strengths = [];
    
    // Detectar señales de alerta
    if (psychProfile.substanceUse > 2) {
        alerts.push('Posibles problemas con sustancias');
    }
    if (psychProfile.antisocial > 2) {
        alerts.push('Tendencias antisociales');
    }
    if (psychProfile.narcissism > 2) {
        alerts.push('Rasgos narcisistas elevados');
    }
    if (psychProfile.manipulation > 2) {
        alerts.push('Tendencias manipuladoras');
    }
    if (psychProfile.aggression > 2) {
        alerts.push('Niveles altos de agresividad');
    }
    if (psychProfile.anxiety > 3) {
        alerts.push('Posibles trastornos de ansiedad');
    }
    if (psychProfile.compulsiveness > 3) {
        alerts.push('Comportamientos obsesivo-compulsivos');
    }
    
    // Identificar fortalezas
    if (psychProfile.empathy > 2) {
        strengths.push('Alta empatía');
    }
    if (psychProfile.reliability > 2) {
        strengths.push('Muy confiable');
    }
    if (psychProfile.intelligence > 2) {
        strengths.push('Capacidad analítica superior');
    }
    if (psychProfile.stability > 2) {
        strengths.push('Estabilidad emocional');
    }
    
    // Generar recomendación basada en el análisis
    let recommendation = '';
    
    if (alerts.length > 2) {
        recommendation = '⚠️ CANDIDATO NO RECOMENDADO: Múltiples señales de alerta detectadas. Se sugiere evaluación psicológica profesional antes de considerar la contratación.';
    } else if (alerts.length > 0) {
        recommendation = '🔍 PRECAUCIÓN: Se detectaron algunas áreas de preocupación. Recomendable una entrevista más profunda y referencias laborales.';
    } else if (strengths.length > 2) {
        recommendation = '✅ CANDIDATO ALTAMENTE RECOMENDADO: Perfil psicológico estable con múltiples fortalezas identificadas.';
    } else {
        recommendation = '👤 CANDIDATO ACEPTABLE: Perfil dentro de parámetros normales. Apto para continuar con el proceso de selección.';
    }
    
    recommendationText.textContent = recommendation;
    
    // Log detallado para el evaluador
    console.log('Análisis Psicológico Detallado:', {
        alertas: alerts,
        fortalezas: strengths,
        perfilCompleto: psychProfile,
        recomendacion: recommendation
    });
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
    
    // Actualizar barra de progreso
    const totalTime = 20 * 60;
    const percentage = (timeRemaining / totalTime) * 100;
    const timerBar = document.getElementById('timerBar');
    timerBar.style.width = percentage + '%';
    
    // Cambiar colores según el tiempo restante
    const timerDisplay = document.querySelector('.timer-display');
    if (timeRemaining <= 300) { // 5 minutos
        timerDisplay.classList.add('critical');
        timerBar.classList.add('critical');
    } else if (timeRemaining <= 600) { // 10 minutos
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

// Form submission
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
    const requiredFields = ['fullName', 'email', 'phone'];
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
    data.email = formData.get('email');
    data.phone = formData.get('phone');
    data.experience = formData.get('experience');
    
    // Respuestas de evaluación
    for (let i = 1; i <= 28; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        data[`question_${i}`] = answer ? answer.value : '0';
    }
    
    // Autoevaluación
    data.stressLevel = formData.get('stressLevel');
    data.communicationStyle = formData.get('communicationStyle');
    data.personalChallenges = formData.get('personalChallenges');
    
    // Ambiente de trabajo preferido
    const environmentCheckboxes = document.querySelectorAll('input[name="environment"]:checked');
    data.workEnvironment = Array.from(environmentCheckboxes).map(cb => cb.value).join(', ');
    
    // Motivaciones
    const motivationCheckboxes = document.querySelectorAll('input[name="motivation"]:checked');
    data.motivations = Array.from(motivationCheckboxes).map(cb => cb.value).join(', ');
    
    // Puntuaciones
    data.personalityScore = currentScore.personality;
    data.lifestyleScore = currentScore.lifestyle;
    data.logicScore = currentScore.logic;
    data.availabilityScore = currentScore.availability;
    data.interpersonalScore = currentScore.interpersonal;
    data.totalScore = currentScore.total;
    data.percentage = Math.round((currentScore.total / 280) * 100);
    
    // Perfil psicológico (solo para administradores)
    data.psychProfile = JSON.stringify(psychProfile);
    
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

// Progress saving
function saveProgress() {
    const progress = {
        timestamp: Date.now(),
        answers: {},
        timeRemaining: timeRemaining
    };
    
    for (let i = 1; i <= 28; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            progress.answers[`q${i}`] = answer.value;
        }
    }
    
    localStorage.setItem('evaluationProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('evaluationProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        
        // Verificar si el progreso es reciente (menos de 1 hora)
        if (Date.now() - progress.timestamp < 3600000) {
            Object.keys(progress.answers).forEach(questionName => {
                const input = document.querySelector(`input[name="${questionName}"][value="${progress.answers[questionName]}"]`);
                if (input) {
                    input.checked = true;
                }
            });
            
            timeRemaining = progress.timeRemaining;
            calculateScore();
            updateScoreDisplay();
        }
    }
}

function showConfigurationStatus() {
    console.log('Estado de la configuración:');
    console.log('- URL de Google Apps Script:', GOOGLE_SHEETS_CONFIG.scriptUrl);
    console.log('- Nombre de la hoja:', GOOGLE_SHEETS_CONFIG.sheetName);
    console.log('- Sistema de evaluación psicológica activo');
}
