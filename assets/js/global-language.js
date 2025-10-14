// Global Language Management System
(function() {
    'use strict';
    
    // Global translations object
    window.translations = {
        es: {
            // Navigation
            home: 'Inicio',
            about: 'Acerca de',
            shop: 'Tienda',
            contact: 'Contacto',
            lang: 'ES',
            
            // Common elements
            search: 'Buscar...',
            subscribe: 'Suscribirse',
            copyright: 'Derechos de autor',
            
            // Banner content
            banner_title_1: 'Follajes Herrera',
            banner_subtitle_1: 'Cultivamos la Naturaleza con Pasión',
            banner_text_1: 'Somos especialistas en el cultivo y distribución de follajes ornamentales de la más alta calidad. Nuestra experiencia de años nos permite ofrecer productos frescos y saludables para embellecer cualquier espacio. Calidad garantizada desde nuestras plantaciones hasta su hogar.',
            
            banner_title_2: 'Calidad Premium',
            banner_subtitle_2: 'Follajes Frescos y Saludables',
            banner_text_2: 'Nuestros follajes son cultivados con técnicas tradicionales y modernas, garantizando productos de primera calidad. Exportamos a nivel internacional con servicio personalizado y atención especializada para cada cliente.',
            
            banner_title_3: 'Innovación Sostenible',
            banner_subtitle_3: 'Cultivo Responsable',
            banner_text_3: 'Innovamos constantemente en técnicas de cultivo sostenible que combinan tecnología avanzada con respeto por la naturaleza. Nuestro enfoque responsable garantiza la preservación del ecosistema mientras producimos follajes ornamentales de calidad excepcional para el mercado global.',
            
            // Categories
            categories_title: 'Nuestras Especialidades',
            categories_text: 'Descubra nuestra amplia variedad de follajes ornamentales, desde plantas tropicales hasta especies nativas',
            view_all: 'Ver Catálogo Completo',
            
            // Products
            featured_title: 'Nuestros Productos',
            featured_text: 'Instalación especializada en el control y aseguramiento de calidad de nuestros follajes ornamentales. Realizamos inspecciones rigurosas y verificaciones de estándares para garantizar productos de excelencia.',
            
            // Footer
            footer_brand: 'Follajes Herrera',
            footer_products: 'Nuestros Productos',
            footer_info: 'Información',
            footer_copyright: 'Todos los derechos reservados',
            footer_location: 'Exportaciones Internacionales',
            footer_phone: '+57 123 456 7890',
            footer_email: 'export@follajesherrera.com',
            footer_farms: 'Nuestras Fincas e Instalaciones',
            
            // Farms section
            farms_title: 'Nuestras Fincas e Instalaciones',
            farms_description: 'Conozca las instalaciones donde cultivamos nuestros follajes con tecnología avanzada y métodos sostenibles',
            
            farm1_title: 'Finca Principal',
            farm1_description: 'Nuestra instalación principal cuenta con invernaderos modernos y sistemas de riego automatizados para garantizar la máxima calidad.',
            farm1_location: 'Ubicada en el Eje Cafetero',
            
            farm2_title: 'Finca Tropical',
            farm2_description: 'Especializada en follajes tropicales y plantas exóticas, con condiciones climáticas ideales para especies delicadas.',
            farm2_location: 'Zona de clima tropical húmedo',
            
            farm3_title: 'Centro de Revisión y Calidad',
            farm3_description: 'Instalación especializada en el control y aseguramiento de calidad de nuestros follajes ornamentales. Realizamos inspecciones rigurosas y verificaciones de estándares para garantizar productos de excelencia.',
            farm3_location: 'Certificamos Calidad Superior',
            
            // Footer new sections
            footer_contact: 'Contacto',
            footer_links: 'Enlaces',
            footer_description: 'Exportadores de follajes ornamentales de la más alta calidad',
            footer_whatsapp: 'WhatsApp',
            footer_home: 'Inicio',
            footer_about: 'Sobre Nosotros',
            footer_products_link: 'Productos',
            footer_contact_link: 'Contacto',
            
            // Hero Slider 1
            hero1_title_left: 'FOLLAJES',
            hero1_subtitle_left: 'Especialistas en Follajes Ornamentales',
            hero1_description_left: 'Más de dos décadas de experiencia en el cultivo sostenible de follajes tropicales. Innovamos constantemente en técnicas de producción para ofrecer variedades únicas y de excepcional calidad.',
            
            hero1_title_right: 'HERRERA',
            hero1_subtitle_right: 'Cultivamos la Naturaleza con Pasión',
            hero1_description_right: 'Distribuimos nuestros productos a nivel global con logística especializada y tiempos de entrega garantizados. Nuestro equipo de expertos asegura que cada cliente reciba asesoría personalizada para sus necesidades específicas. Transformamos espacios con la belleza natural de nuestros follajes cultivados con pasión artesanal.',
            
            // Hero Slider 2
            hero2_title: 'CALIDAD',
            hero2_subtitle: 'Excelencia en Cada Hoja',
            hero2_description: 'Nuestros follajes representan la perfección natural, cultivados con técnicas artesanales que combinan tradición ancestral con innovación tecnológica. Cada planta es seleccionada meticulosamente para garantizar frescura, vitalidad y belleza excepcional. Certificación internacional y procesos de calidad que superan los estándares más exigentes del mercado global. Tu satisfacción es nuestra mayor recompensa.',
            hero2_button: 'Descubre Nuestra Colección',
            
            // Hero Slider 3
            hero3_title: 'Innovación Sostenible',
            hero3_subtitle: 'Cultivo Responsable',
            hero3_description: 'Innovamos constantemente en técnicas de cultivo sostenible que combinan tecnología avanzada con respeto por la naturaleza. Nuestro enfoque responsable garantiza la preservación del ecosistema mientras producimos follajes ornamentales de calidad excepcional para el mercado global.',
            
            // Products Section
            products_title: 'Nuestros Productos',
            products_description: 'Descubra nuestra selección premium de follajes ornamentales, cultivados con los más altos estándares de calidad para exportación',
            product_cat1: 'Follajes Premium',
            product_cat2: 'Plantas Exóticas',
            product_cat3: 'Variedades Especiales',
            products_button: 'Ver Catálogo Completo',
            
            // Additional translations
            learn_more: 'Saber Más',
            contact_us: 'Contáctanos',
            get_quote: 'Solicitar Cotización',
            our_services: 'Nuestros Servicios',
            quality_guarantee: 'Garantía de Calidad',
            fast_delivery: 'Entrega Rápida',
            expert_advice: 'Asesoría Experta'
        },
        en: {
            // Navigation
            home: 'Home',
            about: 'About',
            shop: 'Shop',
            contact: 'Contact',
            lang: 'EN',
            
            // Common elements
            search: 'Search...',
            subscribe: 'Subscribe',
            copyright: 'All rights reserved',
            
            // Banner content
            banner_title_1: 'Follajes Herrera',
            banner_subtitle_1: 'Growing Nature with Passion',
            banner_text_1: 'We are specialists in the cultivation and distribution of ornamental foliage of the highest quality. Our years of experience allow us to offer fresh and healthy products to beautify any space. Quality guaranteed from our plantations to your home.',
            
            banner_title_2: 'Premium Quality',
            banner_subtitle_2: 'Fresh and Healthy Foliage',
            banner_text_2: 'Our foliage is cultivated with traditional and modern techniques, guaranteeing first-class products. We export internationally with personalized service and specialized attention for each client.',
            
            banner_title_3: 'Sustainable Innovation',
            banner_subtitle_3: 'Responsible Cultivation',
            banner_text_3: 'We constantly innovate in sustainable cultivation techniques that combine advanced technology with respect for nature. Our responsible approach ensures ecosystem preservation while producing exceptional quality ornamental foliage for the global market.',
            
            // Categories
            categories_title: 'Our Specialties',
            categories_text: 'Discover our wide variety of ornamental foliage, from tropical plants to native species',
            view_all: 'View Complete Catalog',
            
            // Products
            featured_title: 'Our Products',
            featured_text: 'Specialized facility in quality control and assurance of our ornamental foliage. We perform rigorous inspections and standard verifications to guarantee products of excellence.',
            
            // Footer
            footer_brand: 'Follajes Herrera',
            footer_products: 'Our Products',
            footer_info: 'Information',
            footer_copyright: 'All rights reserved',
            footer_location: 'International Exports',
            footer_phone: '+57 123 456 7890',
            footer_email: 'export@follajesherrera.com',
            footer_farms: 'Our Farms and Facilities',
            
            // Farms section
            farms_title: 'Our Farms and Facilities',
            farms_description: 'Discover the facilities where we grow our foliage with advanced technology and sustainable methods',
            
            farm1_title: 'Main Farm',
            farm1_description: 'Our main facility features modern greenhouses and automated irrigation systems to ensure maximum quality.',
            farm1_location: 'Located in the Coffee Region',
            
            farm2_title: 'Tropical Farm',
            farm2_description: 'Specialized in tropical foliage and exotic plants, with ideal climatic conditions for delicate species.',
            farm2_location: 'Humid tropical climate zone',
            
            farm3_title: 'Quality Control Center',
            farm3_description: 'Facility specialized in quality control and assurance of our ornamental foliage. We perform rigorous inspections and standard verifications to guarantee products of excellence.',
            farm3_location: 'We Certify Superior Quality',
            
            // Footer new sections
            footer_contact: 'Contact',
            footer_links: 'Links',
            footer_description: 'Exporters of ornamental foliage of the highest quality',
            footer_whatsapp: 'WhatsApp',
            footer_home: 'Home',
            footer_about: 'About Us',
            footer_products_link: 'Products',
            footer_contact_link: 'Contact',
            
            // Hero Slider 1
            hero1_title_left: 'FOLIAGE',
            hero1_subtitle_left: 'Ornamental Foliage Specialists',
            hero1_description_left: 'Over two decades of experience in sustainable cultivation of tropical foliage. We constantly innovate in production techniques to offer unique varieties of exceptional quality.',
            
            hero1_title_right: 'HERRERA',
            hero1_subtitle_right: 'Growing Nature with Passion',
            hero1_description_right: 'We distribute our products globally with specialized logistics and guaranteed delivery times. Our team of experts ensures that each customer receives personalized advice for their specific needs. We transform spaces with the natural beauty of our foliage cultivated with artisanal passion.',
            
            // Hero Slider 2
            hero2_title: 'QUALITY',
            hero2_subtitle: 'Excellence in Every Leaf',
            hero2_description: 'Our foliage represents natural perfection, cultivated with artisanal techniques that combine ancestral tradition with technological innovation. Each plant is meticulously selected to guarantee freshness, vitality and exceptional beauty. International certification and quality processes that exceed the most demanding standards of the global market. Your satisfaction is our greatest reward.',
            hero2_button: 'Discover Our Collection',
            
            // Hero Slider 3
            hero3_title: 'Sustainable Innovation',
            hero3_subtitle: 'Responsible Cultivation',
            hero3_description: 'We constantly innovate in sustainable cultivation techniques that combine advanced technology with respect for nature. Our responsible approach ensures ecosystem preservation while producing exceptional quality ornamental foliage for the global market.',
            
            // Products Section
            products_title: 'Our Products',
            products_description: 'Discover our premium selection of ornamental foliage, cultivated with the highest quality standards for export',
            product_cat1: 'Premium Foliage',
            product_cat2: 'Exotic Plants',
            product_cat3: 'Special Varieties',
            products_button: 'View Complete Catalog',
            
            // Additional translations
            learn_more: 'Learn More',
            contact_us: 'Contact Us',
            get_quote: 'Get Quote',
            our_services: 'Our Services',
            quality_guarantee: 'Quality Guarantee',
            fast_delivery: 'Fast Delivery',
            expert_advice: 'Expert Advice'
        }
    };

    // Global language management
    window.LanguageManager = {
        currentLanguage: 'es',
        
        init: function() {
            this.loadSavedLanguage();
            this.setupToggle();
            this.updateLanguage();
        },
        
        loadSavedLanguage: function() {
            var savedLanguage = localStorage.getItem('preferredLanguage');
            if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
                this.currentLanguage = savedLanguage;
            }
        },
        
        setupToggle: function() {
            var self = this;
            $(document).on('change', '#languageToggle', function() {
                self.currentLanguage = this.checked ? 'en' : 'es';
                self.updateLanguage();
            });
        },
        
        updateLanguage: function() {
            var lang = window.translations[this.currentLanguage];
            
            // Update navigation menu
            this.updateNavigation(lang);
            
            // Update toggle state
            $('#languageToggle').prop('checked', this.currentLanguage === 'en');
            
            // Update all elements with data-translate attribute
            this.updateDataTranslateElements(lang);
            
            // Update common elements
            this.updateCommonElements(lang);
            
            // Store language preference
            localStorage.setItem('preferredLanguage', this.currentLanguage);
            
            // Trigger custom event for page-specific updates
            $(document).trigger('languageChanged', [this.currentLanguage, lang]);
        },
        
        updateDataTranslateElements: function(lang) {
            // Find and update all elements with data-translate attribute
            $('[data-translate]').each(function() {
                var key = $(this).attr('data-translate');
                var translation = lang[key];
                
                if (translation) {
                    // Check if element is an input
                    if ($(this).is('input') || $(this).is('textarea')) {
                        $(this).attr('placeholder', translation);
                    } 
                    // Check if element has value attribute
                    else if ($(this).is('[value]')) {
                        $(this).attr('value', translation);
                    }
                    // For paragraphs that might contain HTML tags like <strong>
                    else if ($(this).is('p') && (translation.includes('<strong>') || translation.includes('<b>'))) {
                        $(this).html(translation);
                    }
                    // For all other elements, update text content
                    else {
                        $(this).text(translation);
                    }
                }
            });
        },
        
        updateNavigation: function(lang) {
            $('ul.nav.navbar-nav a[href="index.html"]').text(lang.home);
            $('ul.nav.navbar-nav a[href="about.html"]').text(lang.about);
            $('ul.nav.navbar-nav a[href="shop.html"]').text(lang.shop);
            $('ul.nav.navbar-nav a[href="contact.html"]').text(lang.contact);
        },
        
        updateCommonElements: function(lang) {
            // Update search placeholders
            $('input[placeholder*="Search"], input[placeholder*="Buscar"]').attr('placeholder', lang.search);
            
            // Update subscribe buttons
            $('.input-group-text:contains("Subscribe"), .input-group-text:contains("Suscribirse")').text(lang.subscribe);
            
            // Update banner content - more specific approach
            this.updateBannerContent(lang);
            
            // Update categories section with more specific selectors
            $('h1.h1').filter(function() {
                return $(this).text().trim() === 'Nuestras Especialidades' || $(this).text().trim() === 'Our Specialties';
            }).text(lang.categories_title);
            
            $('p').filter(function() {
                return $(this).text().includes('Descubra') || $(this).text().includes('Discover') || $(this).text().includes('variedad') || $(this).text().includes('variety');
            }).text(lang.categories_text);
            
            $('button').filter(function() {
                return $(this).text().includes('Ver') || $(this).text().includes('View') || $(this).text().includes('Catálogo') || $(this).text().includes('Catalog');
            }).text(lang.view_all);
            
            // Update featured products section with more specific selector
            $('h1.h1').filter(function() {
                return $(this).text().trim() === 'Productos Destacados' || $(this).text().trim() === 'Featured Products';
            }).text(lang.featured_title);
            
            // Update featured products description
            $('p').filter(function() {
                return $(this).text().includes('populares') || $(this).text().includes('popular') || $(this).text().includes('calidad') || $(this).text().includes('quality');
            }).last().text(lang.featured_text);
            
            // Update footer with more specific selectors
            $('.footer-logo, .footer-logo-alt').text(lang.footer_brand);
            $('h2').filter(function() {
                return $(this).text().trim() === 'Nuestros Productos' || $(this).text().trim() === 'Our Products';
            }).text(lang.footer_products);
            $('h2').filter(function() {
                return $(this).text().trim() === 'Información' || $(this).text().trim() === 'Information';
            }).text(lang.footer_info);
            
            // Update footer contact information
            $('li').filter(function() {
                return $(this).text().trim() === 'Exportaciones Internacionales' || $(this).text().trim() === 'International Exports';
            }).html('<i class="fas fa-map-marker-alt fa-fw"></i> ' + lang.footer_location);
            
            $('a[href^="tel:"]').filter(function() {
                return $(this).text().trim() === '+57 123 456 7890';
            }).text(lang.footer_phone);
            
            $('a[href^="mailto:"]').filter(function() {
                return $(this).text().trim() === 'export@follajesherrera.com';
            }).text(lang.footer_email);
            
            $('a').filter(function() {
                return $(this).text().trim() === 'Nuestras Fincas e Instalaciones' || $(this).text().trim() === 'Our Farms and Facilities';
            }).text(lang.footer_farms);
            
            // Update copyright with more specific selector
            $('p').filter(function() {
                return $(this).text().includes('derechos') || $(this).text().includes('rights') || $(this).text().includes('reservados') || $(this).text().includes('reserved');
            }).text('Copyright © 2025 Follajes Herrera S.A.S. | ' + lang.footer_copyright);
            
            // Update any remaining untranslated elements
            this.updateRemainingElements(lang);
            
            // Force update of modal search placeholder
            $('#inputModalSearch, #inputMobileSearch').attr('placeholder', lang.search);
        },
        
        updateRemainingElements: function(lang) {
            // Update any buttons that might have been missed
            $('button, .btn').each(function() {
                var text = $(this).text().trim();
                if (text === 'Ver Catálogo Completo' || text === 'View Complete Catalog') {
                    $(this).text(lang.view_all);
                }
            });
            
            // Update any h1 headings that might be missed
            $('h1').each(function() {
                var text = $(this).text().trim();
                if (text === 'Nuestras Especialidades' || text === 'Our Specialties') {
                    $(this).text(lang.categories_title);
                } else if (text === 'Productos Destacados' || text === 'Featured Products') {
                    $(this).text(lang.featured_title);
                }
            });
            
            // Update any h2 headings in footer
            $('h2').each(function() {
                var text = $(this).text().trim();
                if (text === 'Nuestros Productos' || text === 'Our Products') {
                    $(this).text(lang.footer_products);
                } else if (text === 'Información' || text === 'Information') {
                    $(this).text(lang.footer_info);
                }
            });
        },
        
        updateBannerContent: function(lang) {
            // Update first slide with more specific selectors
            var firstSlide = $('.carousel-item').first();
            firstSlide.find('h1.h1').filter(function() {
                return $(this).text().trim() === 'Follajes Herrera' || $(this).text().trim() === 'Zay' || $(this).text().trim() === 'Zay eCommerce';
            }).text(lang.banner_title_1);
            
            firstSlide.find('h3.h2').filter(function() {
                return $(this).text().includes('Cultivamos') || $(this).text().includes('Growing') || $(this).text().includes('Tiny') || $(this).text().includes('Perfect');
            }).text(lang.banner_subtitle_1);
            
            firstSlide.find('p').filter(function() {
                return $(this).text().length > 20 && ($(this).text().includes('Somos') || $(this).text().includes('We are') || $(this).text().includes('Zay Shop') || $(this).text().includes('template'));
            }).text(lang.banner_text_1);
            
            // Update second slide
            var secondSlide = $('.carousel-item').eq(1);
            secondSlide.find('h1.h1').filter(function() {
                return $(this).text().includes('Calidad') || $(this).text().includes('Premium') || $(this).text().includes('Proident');
            }).text(lang.banner_title_2);
            
            secondSlide.find('h3.h2').filter(function() {
                return $(this).text().includes('Follajes Frescos') || $(this).text().includes('Fresh') || $(this).text().includes('Aliquip');
            }).text(lang.banner_subtitle_2);
            
            secondSlide.find('p').filter(function() {
                return $(this).text().length > 20 && ($(this).text().includes('Nuestros') || $(this).text().includes('Our') || $(this).text().includes('You are'));
            }).text(lang.banner_text_2);
            
            // Update third slide
            var thirdSlide = $('.carousel-item').eq(2);
            thirdSlide.find('h1.h1').filter(function() {
                return $(this).text().includes('Exportación') || $(this).text().includes('Global') || $(this).text().includes('Servicio') || $(this).text().includes('Service') || $(this).text().includes('Repr');
            }).text(lang.banner_title_3);
            
            thirdSlide.find('h3.h2').filter(function() {
                return $(this).text().includes('Colombia') || $(this).text().includes('Mundo') || $(this).text().includes('Finca') || $(this).text().includes('Farm') || $(this).text().includes('Ullamco');
            }).text(lang.banner_subtitle_3);
            
            thirdSlide.find('p').filter(function() {
                return $(this).text().length > 20 && ($(this).text().includes('Exportamos') || $(this).text().includes('mercados') || $(this).text().includes('Ofrecemos') || $(this).text().includes('We offer') || $(this).text().includes('bring you'));
            }).text(lang.banner_text_3);
            
            // Force update of all banner elements as fallback
            this.forceBannerUpdate(lang);
        },
        
        forceBannerUpdate: function(lang) {
            // Direct update of banner elements by position
            $('.carousel-item').each(function(index) {
                var slide = $(this);
                if (index === 0) {
                    slide.find('h1.h1 b').text(lang.banner_title_1);
                    slide.find('h3.h2').text(lang.banner_subtitle_1);
                    slide.find('p').first().html(lang.banner_text_1.replace('<strong>', '<strong>').replace('</strong>', '</strong>'));
                } else if (index === 1) {
                    slide.find('h1.h1').text(lang.banner_title_2);
                    slide.find('h3.h2').text(lang.banner_subtitle_2);
                    slide.find('p').first().html(lang.banner_text_2.replace('<strong>', '<strong>').replace('</strong>', '</strong>'));
                } else if (index === 2) {
                    slide.find('h1.h1').text(lang.banner_title_3);
                    slide.find('h3.h2').text(lang.banner_subtitle_3);
                    slide.find('p').first().html(lang.banner_text_3.replace('<strong>', '<strong>').replace('</strong>', '</strong>'));
                }
            });
        },
        
        // Method to force complete update
        forceUpdate: function() {
            var self = this;
            this.updateLanguage();
            
            // Additional forced updates for stubborn elements with multiple attempts
            setTimeout(function() {
                var lang = window.translations[self.currentLanguage];
                self.updateCommonElements(lang);
                self.updateBannerContent(lang);
                
                // Second attempt after carousel might be fully loaded
                setTimeout(function() {
                    self.updateBannerContent(lang);
                    self.updateRemainingElements(lang);
                    
                    // Final cleanup for any missed elements
                    setTimeout(function() {
                        $('input[placeholder*="Search"], input[placeholder*="Buscar"]').attr('placeholder', lang.search);
                        $('#inputModalSearch, #inputMobileSearch').attr('placeholder', lang.search);
                    }, 200);
                }, 300);
            }, 200);
        },
        
        // Method to get current language
        getCurrentLanguage: function() {
            return this.currentLanguage;
        },
        
        // Method to get translation
        getTranslation: function(key) {
            return window.translations[this.currentLanguage][key] || key;
        }
    };

    // Initialize when DOM is ready
    $(document).ready(function() {
        window.LanguageManager.init();
        
        // Force additional update after a short delay to catch any missed elements
        setTimeout(function() {
            window.LanguageManager.forceUpdate();
        }, 500);
        
        // Additional update after carousel and other dynamic content is loaded
        setTimeout(function() {
            window.LanguageManager.forceUpdate();
        }, 1000);
        
        // Final update to ensure everything is translated
        setTimeout(function() {
            window.LanguageManager.forceUpdate();
        }, 2000);
    });

})();
