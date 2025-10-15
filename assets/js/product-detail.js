// Product Detail Page - Follajes Herrera
// Este archivo carga los detalles del producto seleccionado

class ProductDetailLoader {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
        this.productId = this.getProductIdFromURL();
    }

    // Obtener ID del producto desde la URL
    getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }

    // Cargar detalles del producto
    loadProductDetails() {
        const product = getProductById(this.productId);
        
        if (!product) {
            console.error('Producto no encontrado');
            return;
        }

        // Actualizar título de la página
        document.title = `${product.name[this.currentLanguage]} - Follajes Herrera`;

        // Actualizar nombre del producto
        const productNameElement = document.getElementById('product-name');
        if (productNameElement) {
            productNameElement.textContent = product.name[this.currentLanguage];
            productNameElement.setAttribute('data-translate', product.translateKey);
        }

        // Actualizar nombre científico
        const scientificNameElement = document.getElementById('product-scientific-name');
        if (scientificNameElement) {
            scientificNameElement.textContent = product.scientificName;
        }

        // Actualizar imagen principal
        const mainImageElement = document.getElementById('product-main-image');
        if (mainImageElement) {
            mainImageElement.src = product.image;
            mainImageElement.alt = product.name[this.currentLanguage];
        }

        // Actualizar todas las imágenes del carrusel
        this.updateCarousel(product);

        // Actualizar medidas disponibles
        this.updateSizes(product.sizes);

        // Actualizar descripción del producto
        this.updateDescription(product);

        // Actualizar características del producto
        this.updateCharacteristics(product);
    }

    // Actualizar imágenes del carrusel
    updateCarousel(product) {
        const carouselImages = document.querySelectorAll('.carousel-product-image');
        const mainImage = document.getElementById('product-main-image');
        
        if (!carouselImages || carouselImages.length === 0) return;

        // Si el producto tiene un array de imágenes, usarlo
        const images = product.images || [product.image, product.image, product.image];
        
        carouselImages.forEach((img, index) => {
            if (images[index]) {
                img.src = images[index];
                img.dataset.fullImage = images[index]; // Guardar la URL completa
            } else {
                img.src = images[0]; // Usar la primera imagen como fallback
                img.dataset.fullImage = images[0];
            }
            img.alt = product.name[this.currentLanguage];
            
            // Agregar evento click para cambiar la imagen principal
            img.addEventListener('click', function(e) {
                e.preventDefault();
                if (mainImage) {
                    mainImage.src = this.dataset.fullImage;
                    
                    // Remover clase active de todas las miniaturas
                    carouselImages.forEach(thumb => thumb.classList.remove('active'));
                    
                    // Agregar clase active a la miniatura seleccionada
                    this.classList.add('active');
                }
            });
        });
        
        // Marcar la primera miniatura como activa por defecto
        if (carouselImages[0]) {
            carouselImages[0].classList.add('active');
        }
    }

    // Actualizar medidas disponibles
    updateSizes(sizes) {
        const sizesContainer = document.getElementById('product-sizes');
        if (!sizesContainer) return;

        sizesContainer.innerHTML = sizes.map(size => `
            <li class="list-inline-item">
                <span class="btn btn-success btn-size" style="background: linear-gradient(135deg, #59ab6e 0%, #4a9d5f 100%); border: none;">
                    ${size} cm
                </span>
            </li>
        `).join('');
    }

    // Actualizar descripción del producto
    updateDescription(product) {
        const descriptionElement = document.getElementById('product-description');
        if (!descriptionElement) return;

        // Si el producto tiene descripción personalizada, usarla
        if (product.description && product.description[this.currentLanguage]) {
            descriptionElement.textContent = product.description[this.currentLanguage];
        } else {
            // Descripción genérica por defecto
            const descriptions = {
                es: `Este hermoso follaje ornamental es ideal para arreglos florales, decoración de eventos y proyectos de paisajismo. 
                     Cultivado con técnicas especializadas que garantizan su frescura y vitalidad excepcional.`,
                en: `This beautiful ornamental foliage is ideal for floral arrangements, event decoration and landscaping projects. 
                     Cultivated with specialized techniques that guarantee its freshness and exceptional vitality.`
            };
            descriptionElement.textContent = descriptions[this.currentLanguage];
        }
    }

    // Actualizar características del producto
    updateCharacteristics(product) {
        const characteristicsElement = document.getElementById('product-characteristics');
        if (!characteristicsElement) return;

        // Si el producto tiene características personalizadas, usarlas
        if (product.characteristics && product.characteristics[this.currentLanguage]) {
            const characteristics = product.characteristics[this.currentLanguage];
            characteristicsElement.innerHTML = characteristics.map(characteristic => 
                `<li>✓ ${characteristic}</li>`
            ).join('');
        } else {
            // Características genéricas por defecto
            const defaultCharacteristics = {
                es: [
                    'Follaje fresco y de alta calidad',
                    'Cultivado en condiciones óptimas',
                    'Ideal para arreglos florales',
                    'Larga duración',
                    'Disponible en varios tamaños'
                ],
                en: [
                    'Fresh and high quality foliage',
                    'Grown in optimal conditions',
                    'Ideal for floral arrangements',
                    'Long lasting',
                    'Available in various sizes'
                ]
            };
            const characteristics = defaultCharacteristics[this.currentLanguage];
            characteristicsElement.innerHTML = characteristics.map(characteristic => 
                `<li>✓ ${characteristic}</li>`
            ).join('');
        }
    }

    // Actualizar idioma
    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.loadProductDetails();
        this.loadRelatedProducts(); // Recargar productos relacionados con el nuevo idioma
    }

    // Cargar productos relacionados (todos excepto el actual)
    loadRelatedProducts() {
        const container = $('#carousel-related-product');
        if (!container.length) return;

        const allProducts = getAllProducts();
        const relatedProducts = allProducts.filter(p => p.id !== this.productId);

        // Destruir el slider anterior si existe
        if (container.hasClass('slick-initialized')) {
            container.slick('unslick');
        }

        // Generar HTML de los productos
        container.html(relatedProducts.map(product => `
            <div class="p-2 pb-3">
                <div class="product-wap card rounded-0">
                    <div class="card rounded-0">
                        <img class="card-img rounded-0 img-fluid" src="${product.image}" alt="${product.name[this.currentLanguage]}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul class="list-unstyled">
                                <li>
                                    <a class="btn btn-success text-white" href="shop-single.html?id=${product.id}">
                                        <i class="far fa-eye"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html?id=${product.id}" class="h3 text-decoration-none product-name">
                            ${product.name[this.currentLanguage]}
                        </a>
                        <p class="product-scientific-name">${product.scientificName}</p>
                        <div class="text-center">
                            ${product.sizes.map(size => `
                                <span class="product-size">${size} cm</span>
                            `).join(' ')}
                        </div>
                    </div>
                </div>
            </div>
        `).join(''));

        // Inicializar Slick Carousel
        container.slick({
            infinite: true,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 3,
            dots: true,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

    // Inicializar funcionalidad del modal de cotización
    initQuoteModal() {
        const whatsappBtn = document.getElementById('quoteWhatsappBtn');
        const emailBtn = document.getElementById('quoteEmailBtn');
        const product = getProductById(this.productId);

        if (whatsappBtn && product) {
            whatsappBtn.addEventListener('click', () => {
                this.sendQuoteViaWhatsapp(product);
            });
        }

        if (emailBtn && product) {
            emailBtn.addEventListener('click', () => {
                this.sendQuoteViaEmail(product);
            });
        }
    }

    // Enviar cotización por WhatsApp
    sendQuoteViaWhatsapp(product) {
        const message = translations[this.currentLanguage].whatsapp_message.replace('{product}', product.name[this.currentLanguage]);
        const whatsappUrl = `https://wa.me/573152635408?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
        modal.hide();
    }

    // Enviar cotización por Email
    sendQuoteViaEmail(product) {
        const subject = translations[this.currentLanguage].email_subject.replace('{product}', product.name[this.currentLanguage]);
        const body = translations[this.currentLanguage].email_body.replace('{product}', product.name[this.currentLanguage]);
        const emailUrl = `mailto:info@follajesherrera.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = emailUrl;
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
        modal.hide();
    }

    // Actualizar idioma del modal
    updateModalLanguage() {
        // El modal ya usa data-translate, así que se actualizará automáticamente con el sistema de traducciones
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const detailLoader = new ProductDetailLoader();
    detailLoader.loadProductDetails();
    detailLoader.loadRelatedProducts(); // Cargar productos relacionados
    detailLoader.initQuoteModal(); // Inicializar modal de cotización

    // Escuchar cambios de idioma
    $(document).on('languageChanged', function(event, lang) {
        detailLoader.updateLanguage(lang);
        detailLoader.updateModalLanguage(); // Actualizar idioma del modal
    });
});
