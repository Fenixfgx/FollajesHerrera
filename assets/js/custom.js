$(document).ready(function() {
    // Pause carousel for 30 seconds when arrows are clicked
    $('.carousel-control-prev, .carousel-control-next').click(function() {
        var carousel = $('#template-mo-zay-hero-carousel');
        carousel.carousel('pause');
        setTimeout(function() {
            carousel.carousel('cycle');
        }, 30000); // 30 seconds
    });

    // Hide top nav on scroll down, show only when at top
    var topNav = $('#templatemo_nav_top');
    var mainNav = $('.navbar.navbar-expand-lg.navbar-light.shadow');
    var body = $('body');
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        
        if (scrollTop > 50) {
            // When scrolled down, hide top nav and move main nav to top
            topNav.addClass('navbar-hide');
            mainNav.addClass('navbar-main-top');
            body.addClass('body-nav-top');
        } else {
            // When at top, show top nav and position main nav below it
            topNav.removeClass('navbar-hide');
            mainNav.removeClass('navbar-main-top');
            body.removeClass('body-nav-top');
        }
    });
    
    // ====================================
    // COIN FLIP SLIDER - Productos Móvil
    // ====================================
    
    var CoinFlipSlider = {
        currentIndex: 0,
        totalSlides: 3,
        isAnimating: false,
        autoPlayInterval: null,
        autoPlayDelay: 4000, // 4 segundos entre cambios
        
        init: function() {
            var self = this;
            
            // Solo inicializar en móvil
            if ($(window).width() < 768) {
                // Click en indicadores
                $('.coin-flip-indicators .indicator').on('click', function() {
                    if (!self.isAnimating) {
                        var targetIndex = $(this).data('slide');
                        if (targetIndex !== self.currentIndex) {
                            self.goToSlide(targetIndex);
                        }
                    }
                });
                
                // Swipe táctil
                self.setupTouchEvents();
                
                // Auto-play
                self.startAutoPlay();
                
                // Pausar auto-play cuando el usuario interactúa
                $('.coin-flip-container').on('touchstart mouseenter', function() {
                    self.stopAutoPlay();
                });
                
                // Reanudar auto-play cuando termina la interacción
                $('.coin-flip-container').on('touchend mouseleave', function() {
                    self.startAutoPlay();
                });
            }
        },
        
        goToSlide: function(targetIndex) {
            var self = this;
            
            if (self.isAnimating || targetIndex === self.currentIndex) return;
            
            self.isAnimating = true;
            
            var $currentCard = $('.coin-flip-card[data-index="' + self.currentIndex + '"]');
            var $targetCard = $('.coin-flip-card[data-index="' + targetIndex + '"]');
            
            // Iniciar animación de salida
            $currentCard.removeClass('active').addClass('flipping-out');
            
            // Iniciar animación de entrada
            $targetCard.addClass('flipping-in');
            
            // Actualizar indicadores
            $('.coin-flip-indicators .indicator').removeClass('active');
            $('.coin-flip-indicators .indicator[data-slide="' + targetIndex + '"]').addClass('active');
            
            // Después de la animación, limpiar clases
            setTimeout(function() {
                $currentCard.removeClass('flipping-out');
                $targetCard.removeClass('flipping-in').addClass('active');
                self.currentIndex = targetIndex;
                self.isAnimating = false;
            }, 1000); // Duración de la animación actualizada a 1 segundo
        },
        
        nextSlide: function() {
            var nextIndex = (this.currentIndex + 1) % this.totalSlides;
            this.goToSlide(nextIndex);
        },
        
        prevSlide: function() {
            var prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
            this.goToSlide(prevIndex);
        },
        
        setupTouchEvents: function() {
            var self = this;
            var touchStartX = 0;
            var touchEndX = 0;
            var minSwipeDistance = 50;
            
            $('.coin-flip-container').on('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
            });
            
            $('.coin-flip-container').on('touchend', function(e) {
                touchEndX = e.changedTouches[0].clientX;
                self.handleSwipe(touchStartX, touchEndX, minSwipeDistance);
            });
        },
        
        handleSwipe: function(startX, endX, minDistance) {
            var distance = endX - startX;
            
            if (Math.abs(distance) > minDistance && !this.isAnimating) {
                if (distance > 0) {
                    // Swipe derecha - slide anterior
                    this.prevSlide();
                } else {
                    // Swipe izquierda - siguiente slide
                    this.nextSlide();
                }
            }
        },
        
        startAutoPlay: function() {
            var self = this;
            self.stopAutoPlay(); // Limpiar cualquier intervalo existente
            
            self.autoPlayInterval = setInterval(function() {
                self.nextSlide();
            }, self.autoPlayDelay);
        },
        
        stopAutoPlay: function() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    };
    
    // Inicializar el slider
    CoinFlipSlider.init();
    
    // Reinicializar al cambiar el tamaño de la ventana
    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            if (!CoinFlipSlider.autoPlayInterval) {
                CoinFlipSlider.init();
            }
        } else {
            CoinFlipSlider.stopAutoPlay();
        }
    });
});