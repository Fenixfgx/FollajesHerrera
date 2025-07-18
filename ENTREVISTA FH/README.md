# Formulario de Evaluación para Auxiliar Contable

## Descripción del Proyecto

Este es un sistema completo de evaluación para candidatos a auxiliar contable en Colombia. El formulario evalúa conocimientos contables, habilidades en hojas de cálculo y competencias secretariales, proporcionando una puntuación automática y recomendaciones para la contratación.

## Características Principales

### 🎯 Evaluación Integral
- **Conocimientos Contables**: Preguntas sobre contabilidad básica, legislación tributaria colombiana
- **Habilidades en Excel**: Evaluación de competencias en hojas de cálculo
- **Competencias Secretariales**: Evaluación de habilidades administrativas y de oficina

### 📊 Sistema de Puntuación
- Puntuación automática en tiempo real
- Desglose por categorías (Contabilidad, Excel, Secretarial)
- Recomendaciones automáticas basadas en el rendimiento
- Indicadores visuales de progreso

### 🎨 Interfaz Moderna
- Diseño limpio y profesional
- Responsive (adaptado a móviles y tablets)
- Animaciones suaves y feedback visual
- Colores corporativos elegantes

### 🔗 Integración con Google Sheets
- Almacenamiento automático de resultados
- Notificaciones por email
- Dashboard de análisis (configurable)
- Exportación de datos

## Estructura del Proyecto

```
ENTREVISTA FH/
├── index.html                          # Página principal del formulario
├── styles.css                          # Estilos CSS
├── script.js                           # Lógica JavaScript
├── INSTRUCCIONES_GOOGLE_APPS_SCRIPT.md # Guía de configuración
└── README.md                          # Documentación (este archivo)
```

## Sistema de Puntuación

### Distribución de Puntos
- **Conocimientos Contables**: 50 puntos máximo (5 preguntas × 10 puntos)
- **Habilidades Excel**: 50 puntos máximo (5 preguntas × 10 puntos)
- **Competencias Secretariales**: 50 puntos máximo (5 preguntas × 10 puntos)
- **Total**: 150 puntos máximo

### Niveles de Rendimiento
- **Excelente (135-150 puntos)**: 90-100% - Altamente recomendado
- **Muy Bueno (120-134 puntos)**: 80-89% - Recomendado
- **Bueno (105-119 puntos)**: 70-79% - Recomendado con capacitación
- **Regular (75-104 puntos)**: 50-69% - No recomendado
- **Insuficiente (0-74 puntos)**: 0-49% - No recomendado

## Preguntas de Evaluación

### Conocimientos Contables
1. Ecuación fundamental de la contabilidad
2. Concepto de "debe" en contabilidad
3. Régimen tributario para pequeñas empresas en Colombia
4. Definición de IVA
5. Tasa general del IVA en Colombia

### Habilidades en Excel
6. Fórmula para sumar rangos
7. Función de búsqueda en tablas
8. Referencias absolutas
9. Funciones de conteo condicional
10. Creación de tablas dinámicas

### Competencias Secretariales
11. Prioridades en gestión de correspondencia
12. Organización de archivos
13. Manejo de llamadas telefónicas
14. Tratamiento de información confidencial
15. Estructura de cartas comerciales

## Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para Google Sheets)
- Cuenta de Google (para configurar Apps Script)

### Instalación Local
1. Descarga o clona todos los archivos
2. Abre `index.html` en tu navegador
3. El formulario funcionará localmente (sin integración a Google Sheets)

### Configuración Completa
1. Sigue las instrucciones en `INSTRUCCIONES_GOOGLE_APPS_SCRIPT.md`
2. Configura Google Apps Script como backend
3. Actualiza la URL del script en `script.js`
4. Prueba el formulario completo

## Funcionalidades Avanzadas

### Guardado Automático
- El progreso se guarda automáticamente en el navegador
- Los datos se recuperan si se cierra accidentalmente

### Validación
- Campos obligatorios marcados claramente
- Validación de formato de email
- Verificación de respuestas mínimas

### Experiencia de Usuario
- Indicadores de progreso visual
- Retroalimentación inmediata
- Navegación suave entre secciones
- Responsive design

### Exportación de Datos
- Envío automático a Google Sheets
- Generación de reportes
- Notificaciones por email
- Backup local opcional

## Personalización

### Modificar Preguntas
Edita el archivo `index.html` para:
- Cambiar el texto de las preguntas
- Ajustar las opciones de respuesta
- Modificar los valores de puntuación

### Actualizar Estilos
Modifica `styles.css` para:
- Cambiar colores corporativos
- Ajustar tipografía
- Modificar layout y espaciado

### Agregar Funcionalidades
Extiende `script.js` para:
- Nuevas validaciones
- Funciones de análisis
- Integraciones adicionales

## Métricas y Análisis

### Datos Recopilados
- Información personal del candidato
- Respuestas detalladas a cada pregunta
- Puntuaciones por categoría
- Tiempo de completado (implementable)
- Nivel de autoevaluación

### Análisis Disponibles
- Rendimiento promedio por área
- Identificación de áreas de mejora común
- Comparación entre candidatos
- Tendencias temporales

## Seguridad y Privacidad

### Protección de Datos
- Datos almacenados en Google Drive
- Acceso controlado por permisos
- Posibilidad de anonimizar datos
- Cumplimiento con GDPR (configurable)

### Buenas Prácticas
- No almacenar información sensible innecesaria
- Comunicar claramente el uso de datos
- Implementar políticas de retención
- Backup regular de información

## Soporte y Mantenimiento

### Actualizaciones Regulares
- Revisión de preguntas según cambios legislativos
- Actualización de referencias técnicas
- Mejoras en la interfaz
- Optimizaciones de rendimiento

### Solución de Problemas
- Logs detallados en Google Apps Script
- Validación de datos en tiempo real
- Mensajes de error claros
- Documentación de problemas comunes

## Contribuciones

Para mejorar este formulario:
1. Identifica áreas de mejora
2. Propone nuevas preguntas relevantes
3. Sugiere mejoras en la interfaz
4. Reporta errores encontrados

## Licencia

Este proyecto está diseñado para uso empresarial interno. Puedes modificarlo según las necesidades específicas de tu organización.

## Contacto y Soporte

Para preguntas técnicas o solicitudes de personalización, consulta la documentación técnica o contacta al equipo de desarrollo.

---

**Versión**: 1.0  
**Última actualización**: Julio 2025  
**Compatibilidad**: Todos los navegadores modernos  
**Tecnologías**: HTML5, CSS3, JavaScript ES6+, Google Apps Script
