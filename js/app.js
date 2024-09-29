// Escucha el evento de carga del documento y ejecuta la función cuando esté listo
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Inicializa la función de scroll suave
    const initSmoothScroll = () => {
        // Crea una instancia de Lenis con configuración personalizada
        const lenis = new Lenis({
            duration: 1.2, // Duración del scroll
            lerp: 0.2, // Velocidad de interpolación
            smoothWheel: true, // Activar scroll suave con la rueda del mouse
        });

        // Función de animación por frames (requestAnimationFrame)
        const raf = time => {
            lenis.raf(time); // Actualiza la posición del scroll
            requestAnimationFrame(raf); // Solicitud de nuevo frame
        };

        // Inicia la animación por frames
        requestAnimationFrame(raf);

        // Actualiza ScrollTrigger en cada scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Sincroniza Lenis con el ticker de GSAP
        gsap.ticker.add(time => {
            lenis.raf(time * 1000);
        });
    };

    // Función para configurar la animación de la página
    const scorlllPage = () => {
        // Selección del contenedor de columnas
        const grid = document.querySelector('.colums');

        // Selección de columnas individuales
        const colums = [...grid.querySelectorAll('.colum')];

        // Mapeo de elementos dentro de cada columna
        const items = colums.map((column, pos) => {
            return [...column.querySelectorAll('.colum__item')].map(item => ({
                element: item, // Elemento individual
                column: pos, // Índice de columna
                wrapper: item.querySelectorAll('.colum__item-imgwrap'), // Contenedor de imagen
                image: item.querySelectorAll('.colum__item-img'), // Imagen
            }));
        });

        // Unión de elementos de todas las columnas
        const margedItem = items.flat();

        // Animación de la columna 2 (segunda columna)
        gsap.to(colums.at(1), {
            ease: 'none', // Sin easing
            scrollTrigger: {
                trigger: grid, // Disparador de la animación
                start: 'clamo(top bottom)', // Inicio de la animación
                end: 'clamo(bottom top)', // Fin de la animación
                pin: true, // Fija la posición durante la animación
                scrub: true, // Sincroniza con el scroll
            },
            yPercent: -20, // Desplazamiento vertical
        });

        // Animación de elementos individuales
        margedItem.forEach(item => {
            // Salta la columna 2
            if (item.column === 1) return;

            // Animación del contenedor de imagen
            gsap.to(item.wrapper, {
                ease: 'none', // Sin easing
                startAt: {
                    // Origen de transformación
                    transformOrigin:
                        item.column === 0 ? '0% 100%' : '100% 100%',
                },
                scrollTrigger: {
                    trigger: item.element, // Disparador de la animación
                    start: 'clamp(top bottom)', // Inicio de la animación
                    end: 'clamp(bottom top)', // Fin de la animación
                    scrub: true, // Sincroniza con el scroll
                },
                rotation: item.column === 0 ? -20 : 20, // Rotación
                xPercent: item.column === 0 ? -10 : 10, // Desplazamiento horizontal
            });
        });
    };

    // Inicializa el scroll suave
    initSmoothScroll();

    // Configura la animación de la página
    scorlllPage();
});
