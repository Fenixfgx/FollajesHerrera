# 📊 GUÍA COMPLETA DE SEO PARA FOLLAJES HERRERA
# Instrucciones paso a paso para posicionamiento en Google

## ✅ ARCHIVOS YA CREADOS Y OPTIMIZADOS

### 1. index.html
- ✓ Meta tags completos (title, description, keywords)
- ✓ Open Graph para redes sociales
- ✓ Twitter Cards
- ✓ Schema.org JSON-LD (Organization, LocalBusiness, Product)
- ✓ Meta tags geográficos (Zipacón, Cundinamarca)
- ✓ Canonical URL
- ✓ Alternate hreflang (español/inglés)

### 2. robots.txt
- ✓ Configurado para permitir acceso a motores de búsqueda
- ✓ Referencias al sitemap
- ✓ Reglas específicas para Googlebot, Bingbot, etc.

### 3. sitemap.xml
- ✓ Todas las páginas indexadas
- ✓ Todas las imágenes incluidas
- ✓ Prioridades configuradas
- ✓ Frecuencias de actualización

### 4. .htaccess
- ✓ Forzar HTTPS
- ✓ Redirección WWW
- ✓ Compresión GZIP
- ✓ Caché del navegador
- ✓ Headers de seguridad

---

## 🚀 PASOS PARA ACTIVAR EL SEO

### PASO 1: GOOGLE SEARCH CONSOLE (Obligatorio)
1. Ve a: https://search.google.com/search-console
2. Haz clic en "Añadir propiedad"
3. Selecciona "Prefijo de URL": https://www.follajesherrera.com
4. Verificación (escoge uno):
   
   **Opción A - Archivo HTML:**
   - Descarga el archivo de verificación (google[código].html)
   - Súbelo a la raíz del sitio web
   - Haz clic en "Verificar"
   
   **Opción B - Etiqueta HTML:**
   - Copia la meta tag que te dan
   - Pégala en el <head> de index.html después de las meta tags
   - Ejemplo: <meta name="google-site-verification" content="código_aquí" />
   - Guarda y sube el archivo
   - Haz clic en "Verificar"

5. Después de verificar:
   - Ve a "Sitemaps" en el menú lateral
   - Añade: https://www.follajesherrera.com/sitemap.xml
   - Haz clic en "Enviar"

### PASO 2: GOOGLE BUSINESS PROFILE (Muy importante para local SEO)
1. Ve a: https://www.google.com/business/
2. Crea/reclama tu perfil: "Follajes Herrera"
3. Completa toda la información:
   - Nombre: Follajes Herrera S.A.S
   - Categoría: Exportador de productos agrícolas, Vivero
   - Dirección: Vereda Laguna Verde, Zipacón, Cundinamarca
   - Teléfono: +57 315 263 5408
   - Sitio web: https://www.follajesherrera.com
   - Horario: Lun-Vie 8:00-18:00, Sáb 9:00-14:00
4. Sube fotos de alta calidad:
   - Logo
   - Fachada/instalaciones
   - Productos (follajes)
   - Equipo de trabajo
5. Solicita verificación por código postal o llamada

### PASO 3: GOOGLE ANALYTICS 4 (Tracking)
1. Ve a: https://analytics.google.com
2. Crea una propiedad nueva
3. Copia el código de seguimiento (gtag.js)
4. Pégalo en TODAS las páginas HTML antes de </head>:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### PASO 4: BING WEBMASTER TOOLS
1. Ve a: https://www.bing.com/webmasters
2. Añade el sitio
3. Verifica con archivo HTML o meta tag (igual que Google)
4. Envía el sitemap.xml

### PASO 5: SCHEMA MARKUP VALIDATOR
1. Ve a: https://validator.schema.org/
2. Pega la URL: https://www.follajesherrera.com
3. Verifica que no haya errores en el Schema.org
4. Google Rich Results Test: https://search.google.com/test/rich-results

---

## 🎯 PALABRAS CLAVE PRINCIPALES (Ya incluidas en el código)

### Internacional:
- ornamental foliage
- tropical foliage exporters
- decorative plants
- fresh foliage
- wholesale foliage
- foliage suppliers
- Colombia foliage export
- tropical plants wholesale

### Colombia/Local:
- follajes ornamentales Colombia
- exportadores follajes Colombia
- follajes tropicales
- follajes frescos Bogotá
- plantas ornamentales Colombia
- follajes decoración
- venta follajes al por mayor
- follajes Cundinamarca

### Long-tail keywords:
- "exportadores de follajes ornamentales en Colombia"
- "follajes tropicales de alta calidad"
- "donde comprar follajes ornamentales al por mayor"
- "tropical foliage from Colombia"
- "best ornamental foliage exporters"

---

## 📝 ESTRATEGIA DE CONTENIDO (Próximos pasos)

### 1. Blog Section (Muy recomendado)
Crea una sección de blog con artículos como:
- "Guía completa de follajes ornamentales tropicales"
- "Cómo cuidar follajes cortados para que duren más"
- "Tendencias en decoración con follajes 2025"
- "Proceso de exportación de follajes desde Colombia"
- "10 follajes más populares para arreglos florales"

### 2. Optimizar imágenes
- Renombrar: "follaje-tropical-helecho-colombia.jpg" (no "IMG_1234.jpg")
- Añadir ALT text descriptivo en todas las imágenes
- Comprimir imágenes (usa TinyPNG o similar)
- Convertir a WebP cuando sea posible

### 3. Enlaces externos (Backlinks)
- Directorios de empresas: Google Business, Páginas Amarillas
- Cámaras de comercio
- Asociaciones del sector agrícola
- Portales B2B (Alibaba, TradeKey, etc.)
- Redes sociales activas

---

## 🔗 REDES SOCIALES (Link Building)

### Ya vinculadas:
- ✓ Facebook: https://www.facebook.com/p/Comercializadora-Follajes-Herrera-100088673201963/
- ✓ Instagram: (añadir URL real)

### Recomendadas:
- LinkedIn (perfil de empresa)
- Pinterest (ideal para productos visuales como follajes)
- YouTube (videos del proceso de cultivo)
- TikTok (contenido viral sobre plantas)

---

## 📈 MÉTRICAS A MONITOREAR

### Google Search Console:
- Impresiones (cuántas veces apareces en búsquedas)
- Clics (cuántas veces hacen clic en tu resultado)
- CTR (porcentaje de clics)
- Posición promedio (meta: top 3)
- Palabras clave que te encuentran

### Google Analytics:
- Usuarios nuevos vs recurrentes
- Páginas más visitadas
- Tiempo en el sitio
- Tasa de rebote
- Conversiones (contactos, cotizaciones)

### Objetivos de tráfico (primer año):
- Mes 1-3: 100-500 visitas/mes
- Mes 4-6: 500-1,500 visitas/mes
- Mes 7-12: 1,500-5,000 visitas/mes

---

## ⚡ VELOCIDAD DEL SITIO

### Herramientas de análisis:
1. Google PageSpeed Insights: https://pagespeed.web.dev/
2. GTmetrix: https://gtmetrix.com/
3. WebPageTest: https://www.webpagetest.org/

### Optimizaciones ya aplicadas:
- ✓ Compresión GZIP
- ✓ Caché del navegador
- ✓ Preconnect a Google Fonts
- ✓ DNS Prefetch

### Próximas optimizaciones:
- Lazy loading para imágenes
- Minificar CSS y JavaScript
- CDN (Cloudflare) para servir archivos estáticos

---

## 🌍 SEO INTERNACIONAL

### Ya configurado:
- ✓ hreflang tags (español/inglés)
- ✓ Contenido bilingüe
- ✓ Meta tags en ambos idiomas

### Recomendación:
- Crear subdirectorio /en/ para versión en inglés
- Mantener URLs limpias: /en/about.html, /en/shop.html

---

## 📧 EMAIL MARKETING (Recomendado)

### Plataformas sugeridas:
- Mailchimp (gratis hasta 500 contactos)
- SendinBlue/Brevo
- ConvertKit

### Estrategia:
- Newsletter mensual con nuevos productos
- Promociones especiales
- Contenido educativo sobre follajes

---

## 🎨 MEJORAS DE CONVERSIÓN (CRO)

### Ya implementado:
- ✓ Botones de contacto claros
- ✓ WhatsApp flotante
- ✓ Información de contacto visible
- ✓ Diseño responsive

### Sugerencias adicionales:
- Formulario de cotización simplificado
- Chat en vivo (Tawk.to gratis)
- Testimonios de clientes
- Certificaciones visibles (si las tienen)
- Galería de proyectos realizados

---

## 📋 CHECKLIST SEMANAL DE MANTENIMIENTO

### Semana 1:
- [ ] Verificar posiciones en Google Search Console
- [ ] Revisar errores de rastreo
- [ ] Publicar contenido nuevo (si tienes blog)
- [ ] Responder comentarios en redes sociales

### Semana 2:
- [ ] Analizar tráfico en Google Analytics
- [ ] Actualizar productos si hay nuevos
- [ ] Solicitar reseñas a clientes satisfechos
- [ ] Revisar velocidad del sitio

### Semana 3:
- [ ] Buscar nuevas palabras clave
- [ ] Optimizar páginas con bajo rendimiento
- [ ] Crear/compartir contenido en redes sociales
- [ ] Verificar enlaces rotos

### Semana 4:
- [ ] Análisis mensual completo
- [ ] Planificar contenido del próximo mes
- [ ] Revisar competencia
- [ ] Actualizar información si es necesario

---

## 🏆 COMPETENCIA A ANALIZAR

### Investiga estos competidores:
- Otros exportadores de follajes Colombia
- Viveros internacionales
- Proveedores de follajes en USA/Europa

### Herramientas:
- SEMrush (análisis de competencia)
- Ahrefs (backlinks de competidores)
- Google Trends (tendencias de búsqueda)

---

## 💡 TIPS FINALES

1. **Consistencia**: El SEO toma 3-6 meses en mostrar resultados significativos
2. **Contenido de calidad**: Mejor 1 artículo excelente que 10 mediocres
3. **Mobile-first**: 70% de búsquedas son desde móviles
4. **User experience**: Google prioriza sitios que los usuarios aman
5. **Local SEO**: Fundamental para búsquedas en Colombia
6. **Actualizaciones**: Mantén el contenido fresco y actualizado

---

## 📞 PRÓXIMOS PASOS INMEDIATOS

1. [ ] Subir sitio web a servidor con HTTPS
2. [ ] Verificar Google Search Console
3. [ ] Enviar sitemap.xml
4. [ ] Crear Google Business Profile
5. [ ] Instalar Google Analytics 4
6. [ ] Añadir meta tag de verificación a index.html
7. [ ] Optimizar imágenes (ALT text)
8. [ ] Crear contenido para blog (mínimo 3 artículos)
9. [ ] Solicitar primeras reseñas de clientes
10. [ ] Configurar campañas en redes sociales

---

## 🌟 METAS DE POSICIONAMIENTO

### 3 meses:
- Aparecer en primera página para "follajes ornamentales Colombia"
- 500+ visitas mensuales
- 5+ palabras clave en top 10

### 6 meses:
- Top 3 para "exportadores follajes Colombia"
- 2,000+ visitas mensuales
- 15+ palabras clave en top 10
- 10+ leads mensuales

### 12 meses:
- Top 1 para múltiples keywords locales
- 5,000+ visitas mensuales
- Presencia internacional (USA, Europa)
- 50+ leads mensuales

---

¡Éxito con el posicionamiento de Follajes Herrera! 🌿🚀

Documentación creada: Octubre 2025
