// Renderizador de productos - Follajes Herrera
// Este archivo se encarga de generar dinámicamente las tarjetas de productos

class ProductRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentLanguage = 'es';
    }

    // Establecer idioma actual
    setLanguage(lang) {
        this.currentLanguage = lang;
    }

    // Renderizar un solo producto
    renderProduct(product) {
        const productName = product.name[this.currentLanguage];
        
        // Generar los badges de medidas
        const sizesBadges = product.sizes.map(size => 
            `<span class="product-size">${size}</span>`
        ).join('');

        return `
            <div class="col-md-3">
                <div class="card mb-4 product-wap rounded-0 shadow-sm">
                    <div class="card rounded-0">
                        <img class="card-img rounded-0 img-fluid" src="${product.image}" alt="${productName}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html?id=${product.id}"><i class="far fa-eye"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html?id=${product.id}" class="h3 text-decoration-none product-name" data-translate="${product.translateKey}">${productName}</a>
                        <p class="product-scientific-name">${product.scientificName}</p>
                        <div class="product-sizes-container">
                            <span class="sizes-label">Medidas (cm):</span>
                            <div class="sizes-wrapper">
                                ${sizesBadges}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar todos los productos
    renderAll() {
        if (!this.container) {
            console.error('Contenedor de productos no encontrado');
            return;
        }

        const products = getAllProducts();
        const productsHTML = products.map(product => this.renderProduct(product)).join('');
        this.container.innerHTML = productsHTML;
    }

    // Actualizar idioma y re-renderizar
    updateLanguage(lang) {
        this.setLanguage(lang);
        this.renderAll();
    }
}

// Inicializar el renderizador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia del renderizador
    const renderer = new ProductRenderer('products-container');
    
    // Detectar idioma inicial
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    renderer.setLanguage(savedLanguage);
    
    // Renderizar productos
    renderer.renderAll();
    
    // Escuchar cambios de idioma
    $(document).on('languageChanged', function(event, lang) {
        renderer.updateLanguage(lang);
    });
});
