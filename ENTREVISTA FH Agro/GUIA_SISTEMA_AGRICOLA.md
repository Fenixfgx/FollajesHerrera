# 🌱 SISTEMA DE EVALUACIÓN PSICOLÓGICA AGRÍCOLA
## Guía Completa de Configuración e Implementación

---

## 📋 **RESUMEN EJECUTIVO**

Este sistema de evaluación psicológica está **completamente transformado** para evaluar trabajadores agrícolas mediante un análisis encubierto que detecta:

### 🎯 **Características Principales**
- ✅ **Evaluación de Conocimiento Agrícola**: 6 preguntas especializadas sobre plantas, riego, plagas
- ✅ **Análisis Psicológico Encubierto**: Detección sutil de trastornos sin que el candidato lo sepa
- ✅ **Detección de Sustancias Indirecta**: Mediante patrones de comportamiento, no preguntas directas
- ✅ **Dashboard Administrativo**: Interface para revisar perfiles de riesgo psicológico
- ✅ **Sistema de Puntuación**: Porcentajes precisos para cada trastorno identificado

---

## 🧠 **ANÁLISIS PSICOLÓGICO ENCUBIERTO**

### **Trastornos Detectados:**
1. **Psicopatía** - Falta de empatía y remordimiento
2. **Sociopatía** - Comportamiento antisocial impulsivo  
3. **Narcisismo** - Grandiosidad y falta de empatía
4. **Trastorno Antisocial** - Violación de derechos de otros
5. **Uso Problemático de Sustancias** ⚠️ (ENCUBIERTO)
6. **Alcoholismo** ⚠️ (ENCUBIERTO)
7. **Agresividad** - Tendencias violentas
8. **Ansiedad** - Niveles de estrés patológicos

### **Cualidades Positivas Medidas:**
- **Empatía** - Capacidad de comprensión emocional
- **Integridad** - Honestidad y valores éticos
- **Estabilidad Emocional** - Control y equilibrio mental

---

## 🔍 **DETECCIÓN ENCUBIERTA DE SUSTANCIAS**

### **Métodos Indirectos Implementados:**

#### **Q15: Gasto en Entretenimiento**
- **Pregunta**: "¿Cuánto gastas semanalmente en entretenimiento?"
- **Detección**: Gastos altos pueden indicar consumo de sustancias
- **Riesgo Alto**: Más de $150 semanales

#### **Q16: Patrones de Ausentismo**  
- **Pregunta**: "¿Cuál sería la razón más probable para faltar al trabajo?"
- **Detección**: Faltas los lunes sugieren consumo de fin de semana
- **Riesgo Alto**: "Malestar/resaca" como opción

#### **Q17: Círculos Sociales**
- **Pregunta**: "¿Con qué tipo de personas prefieres socializar?"
- **Detección**: Preferencia por grupos de "vida nocturna" indica riesgo
- **Riesgo Alto**: Ambientes de fiesta/bar

#### **Q20: Patrones de Sueño**
- **Pregunta**: "¿A qué hora sueles acostarte en días libres?"
- **Detección**: Horarios muy tardíos sugieren consumo nocturno
- **Riesgo Alto**: Después de 2:00 AM regularmente

---

## 📊 **ESTRUCTURA DE ARCHIVOS DEL SISTEMA**

### **Frontend (Evaluación)**
```
📁 ENTREVISTA FH Agro/
├── 📄 index.html                    # Formulario de evaluación principal
├── 📄 script.js                     # Lógica de análisis psicológico
├── 📄 styles.css                    # Estilos del formulario
└── 📄 test-script.html             # Archivo de pruebas
```

### **Backend (Google Apps Script)**
```
📁 Google Apps Script/
└── 📄 google_apps_script_agricola.js  # Script backend actualizado
```

### **Dashboard Administrativo**
```
📁 Dashboard/
└── 📄 dashboard_agricola.html         # Interface administrativa
```

---

## ⚙️ **CONFIGURACIÓN PASO A PASO**

### **1. Configurar Google Apps Script**

#### **A. Crear Nuevo Proyecto:**
1. Ve a [script.google.com](https://script.google.com)
2. Clic en "Nuevo proyecto"
3. Copia todo el contenido de `google_apps_script_agricola.js`
4. Pega en el editor y guarda como "EvaluacionAgricola"

#### **B. Configurar Google Sheets:**
1. Crea una nueva hoja de cálculo
2. Nómbrala "EvaluacionesAgricolas"  
3. Copia el ID de la hoja (desde la URL)
4. Reemplaza `SHEET_ID` en línea 4 del script

#### **C. Desplegar como Web App:**
1. Clic en "Implementar" → "Nueva implementación"
2. Tipo: "Aplicación web"
3. Ejecutar como: "Yo"
4. Acceso: "Cualquier persona"
5. Copia la URL generada

### **2. Actualizar URLs en el Frontend**

#### **En `script.js` (línea 3):**
```javascript
scriptUrl: 'TU_URL_DEL_SCRIPT_AQUI/exec',
```

#### **En `dashboard_agricola.html` (línea 491):**
```javascript
const SHEET_URL = 'TU_URL_DEL_SCRIPT_AQUI/exec';
```

---

## 🧪 **TESTING Y VALIDACIÓN**

### **1. Probar el Sistema Completo:**

#### **A. Ejecutar Evaluación de Prueba:**
1. Abre `index.html` en navegador
2. Completa evaluación con datos ficticios
3. Verifica envío exitoso a Google Sheets

#### **B. Validar Dashboard:**
1. Abre `dashboard_agricola.html`
2. Verifica que carguen los datos
3. Confirma que aparezcan análisis psicológicos

#### **C. Revisar Detección de Sustancias:**
1. Responde Q15 con gasto alto ($200+)
2. Responde Q16 con "Malestar/resaca"  
3. Verifica que el porcentaje de "Uso Problemático Sustancias" sea alto

### **2. Función de Prueba Automática:**
En Google Apps Script, ejecuta:
```javascript
testSystem(); // Genera datos de prueba automáticamente
```

---

## 📈 **INTERPRETACIÓN DE RESULTADOS**

### **Niveles de Riesgo por Porcentaje:**

#### **🚨 RIESGO CRÍTICO (70%+)**
- **Acción**: Rechazar candidato inmediatamente
- **Razón**: Alto riesgo para seguridad laboral

#### **⚠️ RIESGO ALTO (50-69%)**  
- **Acción**: Evaluación adicional requerida
- **Razón**: Necesita análisis más profundo

#### **🟡 RIESGO MEDIO (30-49%)**
- **Acción**: Contratar con supervisión
- **Razón**: Monitoreo constante necesario

#### **✅ RIESGO BAJO (0-29%)**
- **Acción**: Candidato aceptable
- **Razón**: Perfil psicológico estable

### **Interpretación Específica de Sustancias:**
- **60%+**: Probable adicción activa
- **40-59%**: Uso problemático frecuente  
- **20-39%**: Uso ocasional riesgoso
- **0-19%**: Perfil limpio o uso mínimo

---

## 🔒 **SEGURIDAD Y CONFIDENCIALIDAD**

### **Información Clasificada:**
- ⚠️ **NUNCA** revelar el propósito psicológico real
- ⚠️ **NO** mencionar detección de sustancias al candidato
- ⚠️ **CONFIDENCIAL**: Mantener resultados solo para RRHH

### **Protocolo de Manejo:**
1. Solo personal autorizado accede al dashboard
2. Resultados psicológicos no se comparten con candidatos
3. Datos almacenados con máxima seguridad en Google Sheets

---

## 🛠️ **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: "Script no responde"**
**Solución**: Verificar que la URL del script esté actualizada y el script esté desplegado correctamente.

### **Error: "No se cargan candidatos en dashboard"**
**Solución**: Confirmar que la hoja de Google Sheets tenga el nombre correcto: "EvaluacionesAgricolas"

### **Error: "Análisis psicológico muestra 0%"**
**Solución**: Verificar que las preguntas tengan los atributos `data-trait` correctos en el HTML.

### **Error: "Detección de sustancias no funciona"**
**Solución**: Confirmar que las preguntas Q15-Q20 estén configuradas con los valores correctos para detección encubierta.

---

## 📞 **CONTACTO Y SOPORTE**

Para asistencia técnica o dudas sobre la implementación:
- 📧 Contacta al equipo de desarrollo
- 📋 Revisa la documentación técnica en los archivos de código
- 🔧 Ejecuta las funciones de prueba para diagnosticar problemas

---

## ⚖️ **CONSIDERACIONES LEGALES**

⚠️ **IMPORTANTE**: Este sistema debe usarse conforme a las leyes locales de privacidad y empleo. La detección psicológica encubierta debe ser legal en tu jurisdicción y contar con consentimiento apropiado del candidato.

---

*Última actualización: Sistema completamente funcional y listo para producción*
