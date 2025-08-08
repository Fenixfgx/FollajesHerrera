# Sistema de Evaluación Actitudinal - Follajes Herrera

## Descripción General

Este sistema de evaluación ha sido transformado de una prueba técnica a una **evaluación actitudinal sofisticada** que incluye análisis psicológico encubierto para identificar características de personalidad, tendencias comportamentales y posibles señales de alerta en candidatos.

## Características Principales

### 🧠 Evaluación Psicológica Encubierta

El sistema evalúa de manera discreta los siguientes aspectos:

#### Detección de Sustancias y Adicciones
- Patrones de consumo de alcohol
- Dependencia a sustancias para el manejo del estrés
- Hábitos de consumo social vs. problemático

#### Análisis de Trastornos de Personalidad
- **Tendencias Antisociales**: Falta de empatía, manipulación, desprecio por normas
- **Rasgos Narcisistas**: Grandiosidad, necesidad de admiración, falta de empatía
- **Comportamientos Psicopáticos**: Falta de remordimiento, manipulación, encanto superficial
- **Tendencias Paranoicas**: Desconfianza excesiva, suspicacia

#### Evaluación de Trastornos del Neurodesarrollo
- **Indicadores de Autismo**: Rigidez de pensamiento, dificultades sociales, patrones repetitivos
- **TDAH**: Hiperactividad, dificultades de atención, impulsividad
- **Trastornos Obsesivo-Compulsivos**: Perfeccionismo excesivo, rituales, necesidad de control

#### Análisis de Capacidades Cognitivas
- Nivel de inteligencia y razonamiento lógico
- Capacidad de análisis y resolución de problemas
- Flexibilidad cognitiva

## Secciones de Evaluación

### 1. **Evaluación de Personalidad** (80 puntos)
Preguntas diseñadas para evaluar:
- Manejo de conflictos
- Empatía y habilidades sociales
- Tendencias agresivas o manipuladoras
- Estabilidad emocional

### 2. **Hábitos y Estilo de Vida** (40 puntos)
Detecta:
- Uso de sustancias
- Patrones de sueño
- Honestidad y transparencia
- Estabilidad personal

### 3. **Razonamiento y Lógica** (60 puntos)
Evalúa:
- Capacidad analítica
- Flexibilidad mental
- Toma de decisiones
- Manejo de detalles

### 4. **Disponibilidad y Compromiso** (50 puntos)
Mide:
- Confiabilidad laboral
- Flexibilidad horaria
- Estabilidad en el empleo
- Compromiso organizacional

### 5. **Competencias Interpersonales** (50 puntos)
Analiza:
- Trabajo en equipo
- Manejo de confidencialidad
- Resolución de conflictos
- Cumplimiento de normas

## Sistema de Análisis Psicológico

### Variables Analizadas
```javascript
psychProfile = {
    substanceUse: 0,      // Uso problemático de sustancias
    antisocial: 0,        // Tendencias antisociales
    empathy: 0,           // Nivel de empatía
    stability: 0,         // Estabilidad emocional
    narcissism: 0,        // Rasgos narcisistas
    anxiety: 0,           // Trastornos de ansiedad
    compulsiveness: 0,    // Comportamientos obsesivo-compulsivos
    aggression: 0,        // Niveles de agresividad
    reliability: 0,       // Confiabilidad
    intelligence: 0,      // Capacidad cognitiva
    autism: 0,           // Indicadores del espectro autista
    manipulation: 0       // Tendencias manipuladoras
}
```

### Interpretación de Resultados

#### 🚨 **Señales de Alerta Críticas**
- `substanceUse > 2`: Posibles problemas con sustancias
- `antisocial > 2`: Tendencias antisociales significativas
- `narcissism > 2`: Rasgos narcisistas elevados
- `manipulation > 2`: Comportamientos manipuladores
- `aggression > 2`: Niveles problemáticos de agresividad

#### ⚠️ **Áreas de Preocupación**
- `anxiety > 3`: Posibles trastornos de ansiedad
- `compulsiveness > 3`: Comportamientos obsesivo-compulsivos
- `reliability < 1`: Baja confiabilidad

#### ✅ **Fortalezas Identificadas**
- `empathy > 2`: Alta capacidad empática
- `reliability > 2`: Muy confiable
- `intelligence > 2`: Capacidad analítica superior
- `stability > 2`: Estabilidad emocional

## Recomendaciones del Sistema

### 🚫 **No Recomendado** (Múltiples alertas > 2)
- Evaluación psicológica profesional requerida
- Alto riesgo para el ambiente laboral
- No proceder con contratación

### ⚠️ **Precaución** (1-2 alertas)
- Entrevistas adicionales recomendadas
- Verificación exhaustiva de referencias
- Período de prueba extendido

### ✅ **Altamente Recomendado** (Múltiples fortalezas)
- Perfil psicológico estable
- Candidato ideal para el puesto
- Proceder con contratación

### 👤 **Aceptable** (Perfil normal)
- Dentro de parámetros normales
- Continuar proceso de selección
- Entrevista estándar

## Consideraciones Éticas

- **Confidencialidad**: Los resultados psicológicos son confidenciales
- **Uso Profesional**: Solo para uso de profesionales de RRHH capacitados
- **No Discriminación**: Los resultados son orientativos, no determinantes
- **Transparencia**: El candidato sabe que está siendo evaluado (aunque no conoce los criterios específicos)

## Acceso a Resultados

Los resultados detallados del perfil psicológico están disponibles en:
- **Consola del navegador** (para evaluadores técnicos)
- **Google Sheets** (registro completo)
- **Interfaz de usuario** (recomendación general)

## Implementación Técnica

- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Backend**: Google Apps Script
- **Almacenamiento**: Google Sheets
- **Análisis**: Algoritmos propietarios de evaluación psicológica

---

**⚠️ IMPORTANTE**: Este sistema debe ser utilizado únicamente por profesionales capacitados en evaluación psicológica y selección de personal. Los resultados son orientativos y deben complementarse con entrevistas profesionales y verificación de referencias.
