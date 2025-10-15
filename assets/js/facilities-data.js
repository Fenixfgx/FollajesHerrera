// Facilities Data - Follajes Herrera
// Este archivo contiene la información de las instalaciones

const facilitiesData = [
    {
        id: 1,
        title: {
            es: 'Nuestras Fincas',
            en: 'Our Farms'
        },
        description: {
            es: 'Más de 50 hectáreas dedicadas al cultivo especializado de follajes ornamentales con sistemas de riego de última generación y técnicas agrícolas sostenibles.',
            en: 'More than 50 hectares dedicated to specialized cultivation of ornamental foliage with state-of-the-art irrigation systems and sustainable agricultural techniques.'
        },
        image: 'assets/img/fincas/f2.jpg',
        imagePosition: 'left', // left or right
        icon: 'fa-leaf'
    },
    {
        id: 2,
        title: {
            es: 'Invernaderos de Precisión',
            en: 'Precision Greenhouses'
        },
        description: {
            es: 'Instalaciones con control climático avanzado que garantizan condiciones óptimas durante todo el año, permitiendo un crecimiento constante y uniforme de nuestros follajes.',
            en: 'Facilities with advanced climate control that guarantee optimal conditions year-round, allowing constant and uniform growth of our foliage.'
        },
        image: 'assets/img/fincas/cover.jpg',
        imagePosition: 'right',
        icon: 'fa-home'
    },
    {
        id: 3,
        title: {
            es: 'Centro de Procesamiento',
            en: 'Processing Center'
        },
        description: {
            es: 'Equipamiento de última generación para la selección, limpieza y empaque de nuestros productos con estándares internacionales que aseguran la calidad hasta su destino final.',
            en: 'State-of-the-art equipment for selection, cleaning, and packaging of our products with international standards that ensure quality to its final destination.'
        },
        image: 'assets/img/about/A (3).jpg',
        imagePosition: 'left',
        icon: 'fa-box'
    },
    {
        id: 4,
        title: {
            es: 'Revisión Minuciosa',
            en: 'Thorough Review'
        },
        description: {
            es: 'Control riguroso de todos los procesos para asegurar la máxima calidad y frescura en cada producto mediante análisis constantes y certificaciones internacionales.',
            en: 'Rigorous control of all processes to ensure maximum quality and freshness in each product through constant analysis and international certifications.'
        },
        image: 'assets/img/about/A (1).jpg',
        imagePosition: 'right',
        icon: 'fa-flask'
    }
];

// Función para obtener todas las instalaciones
function getAllFacilities() {
    return facilitiesData;
}

// Función para obtener una instalación por ID
function getFacilityById(id) {
    return facilitiesData.find(facility => facility.id === id);
}

// Clase para cargar las instalaciones dinámicamente
class FacilitiesLoader {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
    }

    // Cargar instalaciones
    loadFacilities() {
        const facilitiesContainer = document.getElementById('facilities-container');
        if (!facilitiesContainer) return;

        facilitiesContainer.innerHTML = '';

        facilitiesData.forEach(facility => {
            const section = document.createElement('div');
            section.className = 'row align-items-center mb-5 facility-item';
            
            const imageCol = `
                <div class="col-lg-6 mb-4 mb-lg-0 facility-image-col">
                    <div class="facility-image-container">
                        <img src="${facility.image}" alt="${facility.title[this.currentLanguage]}" 
                            class="img-fluid rounded shadow-lg" 
                            style="object-fit: cover; height: 400px; width: 100%;">
                    </div>
                </div>
            `;

            const textCol = `
                <div class="col-lg-6 facility-text-col">
                    <div class="${facility.imagePosition === 'left' ? 'ps-lg-4' : 'pe-lg-4'}">
                        <div class="facility-badge mb-3">
                            <i class="fas ${facility.icon} me-2"></i>
                            <span class="badge bg-success">Instalación ${facility.id}</span>
                        </div>
                        <h3 class="fw-bold mb-4 text-dark">${facility.title[this.currentLanguage]}</h3>
                        <p class="text-dark lead" style="line-height: 1.8;">
                            ${facility.description[this.currentLanguage]}
                        </p>
                    </div>
                </div>
            `;

            // Alternar posición de imagen y texto
            if (facility.imagePosition === 'left') {
                section.innerHTML = imageCol + textCol;
            } else {
                section.innerHTML = textCol + imageCol;
            }
            
            facilitiesContainer.appendChild(section);
        });
    }

    // Actualizar idioma
    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.loadFacilities();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const facilitiesLoader = new FacilitiesLoader();
    facilitiesLoader.loadFacilities();

    // Escuchar cambios de idioma
    $(document).on('languageChanged', function(event, lang) {
        facilitiesLoader.updateLanguage(lang);
    });
});
