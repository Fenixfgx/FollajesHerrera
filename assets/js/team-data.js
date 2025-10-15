// Team Data - Follajes Herrera
// Este archivo contiene la información del equipo

const teamData = [
    {
        id: 1,
        name: {
            es: 'Daniel Herrera',
            en: 'Daniel Herrera'
        },
        position: {
            es: 'Director General',
            en: 'Chief Executive Officer'
        },
        bio: {
            es: 'Con más de 25 años de experiencia en el sector, lidera nuestra visión de excelencia y expansión internacional.',
            en: 'With over 25 years of experience in the sector, he leads our vision of excellence and international expansion.'
        },
        image: 'assets/img/team/Daniel.jpg'
    },
    {
        id: 2,
        name: {
            es: 'Carlos Rodríguez',
            en: 'Carlos Rodríguez'
        },
        position: {
            es: 'Director de Operaciones',
            en: 'Operations Director'
        },
        bio: {
            es: 'Experto en gestión agrícola sostenible y optimización de procesos productivos.',
            en: 'Expert in sustainable agricultural management and production process optimization.'
        },
        image: 'assets/img/team/user.png'
    },
    {
        id: 3,
        name: {
            es: 'Ana Martínez',
            en: 'Ana Martínez'
        },
        position: {
            es: 'Gerente de Calidad',
            en: 'Quality Manager'
        },
        bio: {
            es: 'Especialista en estándares internacionales de calidad y control fitosanitario.',
            en: 'Specialist in international quality standards and phytosanitary control.'
        },
        image: 'assets/img/team/user.png'
    },
    {
        id: 4,
        name: {
            es: 'Jorge Silva',
            en: 'Jorge Silva'
        },
        position: {
            es: 'Director de Exportaciones',
            en: 'Export Director'
        },
        bio: {
            es: 'Responsable de nuestras relaciones comerciales internacionales y logística global.',
            en: 'Responsible for our international business relationships and global logistics.'
        },
        image: 'assets/img/team/user.png'
    }
];

// Función para obtener todos los miembros del equipo
function getAllTeamMembers() {
    return teamData;
}

// Función para obtener un miembro del equipo por ID
function getTeamMemberById(id) {
    return teamData.find(member => member.id === id);
}

// Clase para cargar el equipo dinámicamente
class TeamLoader {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
    }

    // Cargar miembros del equipo
    loadTeamMembers() {
        const teamContainer = document.getElementById('team-members-container');
        if (!teamContainer) return;

        teamContainer.innerHTML = '';

        teamData.forEach(member => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3';
            
            col.innerHTML = `
                <div class="team-card card h-100 border-0 shadow-lg" style="transition: all 0.4s ease; overflow: hidden;">
                    <div class="team-image-container">
                        <img src="${member.image}" alt="${member.name[this.currentLanguage]}"
                            class="team-member-img w-100"
                            style="height: 280px; object-fit: cover; transition: transform 0.4s ease;">
                    </div>
                    <div class="card-body text-center p-4" style="background: #ffffff;">
                        <h5 class="card-title fw-bold mb-2 text-dark">${member.name[this.currentLanguage]}</h5>
                        <p class="text-success fw-semibold mb-3 small">${member.position[this.currentLanguage]}</p>
                        <p class="card-text text-muted small lh-base">${member.bio[this.currentLanguage]}</p>
                    </div>
                </div>
            `;
            
            teamContainer.appendChild(col);
        });
    }

    // Actualizar idioma
    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.loadTeamMembers();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const teamLoader = new TeamLoader();
    teamLoader.loadTeamMembers();

    // Escuchar cambios de idioma
    $(document).on('languageChanged', function(event, lang) {
        teamLoader.updateLanguage(lang);
    });
});
