document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const initSmoothScroll = () => {
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.2,
            smoothWheel: true,
        });

        const raf = time => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => {
            lenis.raf(time * 1000);
        });
    };

    const scorlllPage = () => {
        const grid = document.querySelector('.colums');
        const colums = [...grid.querySelectorAll('.colum')];

        const items = colums.map((column, pos) => {
            return [...column.querySelectorAll('.colum__item')].map(item => ({
                element: item,
                column: pos,
                wrapper: item.querySelectorAll('.colum__item-imgwrap'),
                image: item.querySelectorAll('.colum__item-img'),
            }));
        });
        const margedItem = items.flat();

        gsap.to(colums.at(1), {
            ease: 'none',
            scrollTrigger: {
                trigger: grid,
                start: 'clamo(top bottom) ',
                end: 'clamo(bottom top)',
                pin: true,
                scrub: true,
            },
            yPercent: -20,
        });

        margedItem.forEach(item => {
            if (item.column === 1) return;

            gsap.to(item.wrapper, {
                ease: 'none',
                startAt: {
                    transformOrigin:
                        item.column === 0 ? '0% 100%' : '100% 100%',
                },
                scrollTrigger: {
                    trigger: item.element,
                    start: 'clamp(top bottom) ',
                    end: 'clamp(bottom top)',
                    scrub: true,
                },
                rotation: item.column === 0 ? -6 : 6,
                xporcent: item.column === 0 ? -10 : 10,
            });
        });
    };

    initSmoothScroll();

    scorlllPage();
});
