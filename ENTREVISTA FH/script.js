// Configuración para Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    // Tu URL de Google Apps Script ya configurada
    scriptUrl: 'https://script.google.com/macros/s/AKfycbxcfKXBwtSxlpxcF3g6dG_KJ4hjNC4vsJcWNpYEJoGnb8gX6Y70MttJLOTopkKJx_-Y/exec',
    sheetName: 'Evaluaciones'
};

// Variables globales
let currentScore = {
    total: 0,
    accounting: 0,
    excel: 0,
    secretarial: 0
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    randomizeAnswers();
    setupEventListeners();
    updateScoreDisplay();
    
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
            calculateScore();
            updateScoreDisplay();
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
        accounting: 0,
        excel: 0,
        secretarial: 0
    };
    
    // Preguntas de contabilidad (q1-q5)
    for (let i = 1; i <= 5; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.accounting += parseInt(answer.value);
        }
    }
    
    // Preguntas de Excel (q6-q10)
    for (let i = 6; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.excel += parseInt(answer.value);
        }
    }
    
    // Preguntas secretariales (q11-q15)
    for (let i = 11; i <= 15; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            currentScore.secretarial += parseInt(answer.value);
        }
    }
    
    currentScore.total = currentScore.accounting + currentScore.excel + currentScore.secretarial;
}

function updateScoreDisplay() {
    // Función modificada para ocultar puntuación del usuario por seguridad
    // Solo mantiene el cálculo interno sin mostrar nada visible
    
    // Los elementos están ocultos en CSS, pero por seguridad adicional,
    // evitamos actualizar el DOM completamente
    
    // Solo mantenemos el cálculo del porcentaje para uso interno
    const percentage = (currentScore.total / 150) * 100;
    
    // Log interno para debugging (solo visible en consola de desarrollador)
    console.log('Puntuación actual (oculta al usuario):', {
        accounting: currentScore.accounting,
        excel: currentScore.excel,
        secretarial: currentScore.secretarial,
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
    for (let i = 1; i <= 15; i++) {
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
    data.excelScore = currentScore.excel;
    data.secretarialScore = currentScore.secretarial;
    data.totalScore = currentScore.total;
    data.percentage = Math.round((currentScore.total / 150) * 100);
    
    // Recomendación
    data.recommendation = getRecommendationLevel();
    
    return data;
}

function getRecommendationLevel() {
    const percentage = (currentScore.total / 150) * 100;
    if (percentage >= 90) return 'Excelente - Altamente recomendado';
    if (percentage >= 80) return 'Muy Bueno - Recomendado';
    if (percentage >= 70) return 'Bueno - Recomendado con capacitación';
    if (percentage >= 50) return 'Regular - No recomendado';
    return 'Insuficiente - No recomendado';
}

// Función para generar recomendaciones detalladas
function getDetailedRecommendation(scores, level) {
    const accPercentage = (scores.accounting / 50) * 100;
    const excelPercentage = (scores.excel / 50) * 100;
    const secretarialPercentage = (scores.secretarial / 50) * 100;
    const totalPercentage = (scores.total / 150) * 100;
    
    let recommendation = '';
    let strengths = [];
    let weaknesses = [];
    let suggestions = [];
    
    // Identificar fortalezas y debilidades
    if (accPercentage >= 80) strengths.push('Contabilidad');
    else if (accPercentage < 60) weaknesses.push('Contabilidad');
    
    if (excelPercentage >= 80) strengths.push('Excel');
    else if (excelPercentage < 60) weaknesses.push('Excel');
    
    if (secretarialPercentage >= 80) strengths.push('Habilidades Secretariales');
    else if (secretarialPercentage < 60) weaknesses.push('Habilidades Secretariales');
    
    // Generar recomendaciones específicas
    if (weaknesses.includes('Contabilidad')) {
        suggestions.push('Capacitación en principios contables básicos y manejo de cuentas');
    }
    if (weaknesses.includes('Excel')) {
        suggestions.push('Entrenamiento en funciones avanzadas de Excel y análisis de datos');
    }
    if (weaknesses.includes('Habilidades Secretariales')) {
        suggestions.push('Desarrollo de habilidades de comunicación y organización documental');
    }
    
    switch (level) {
        case 'excelente':
            recommendation = `
                <div class="recommendation-detail">
                    <h4><i class="fas fa-star"></i> Excelente Desempeño</h4>
                    <p><strong>Puntuación General:</strong> ${scores.total}/150 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/50 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/50 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
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
                    <p><strong>Puntuación General:</strong> ${scores.total}/150 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/50 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/50 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
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
                    <p><strong>Puntuación General:</strong> ${scores.total}/150 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/50 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/50 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
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
                    <p><strong>Puntuación General:</strong> ${scores.total}/150 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/50 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/50 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
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
                    <p><strong>Puntuación General:</strong> ${scores.total}/150 (${totalPercentage.toFixed(1)}%)</p>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span class="area">Contabilidad:</span>
                            <span class="points">${scores.accounting}/50 (${accPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Excel:</span>
                            <span class="points">${scores.excel}/50 (${excelPercentage.toFixed(1)}%)</span>
                        </div>
                        <div class="score-item">
                            <span class="area">Secretarial:</span>
                            <span class="points">${scores.secretarial}/50 (${secretarialPercentage.toFixed(1)}%)</span>
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

async function submitForm() {
    const submitButton = document.querySelector('.btn-primary');
    const originalText = submitButton.innerHTML;
    
    // Validar que se hayan respondido todas las preguntas requeridas
    if (!validateForm()) {
        showError('Por favor, complete todos los campos requeridos.');
        return;
    }
    
    // Mostrar estado de carga
    submitButton.innerHTML = '<span class="loading"></span> Enviando...';
    submitButton.disabled = true;
    
    try {
        const formData = collectFormData();
        
        // Intentar enviar a Google Sheets con diferentes métodos
        const success = await sendToGoogleSheets(formData);
        
        if (success) {
            showSuccess('Evaluación enviada exitosamente. Gracias por completar la prueba.');
            clearFormAndProgress(); // Limpiar formulario y progreso guardado
            
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
                addVerificationButton();
                
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

// Guardar progreso en localStorage
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
        
        Object.keys(progress).forEach(key => {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'radio') {
                    const radio = document.querySelector(`[name="${key}"][value="${progress[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    element.value = progress[key];
                }
            }
        });
        
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
    scores = { accounting: 0, excel: 0, secretarial: 0 };
    updateScoreDisplay();
    
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
