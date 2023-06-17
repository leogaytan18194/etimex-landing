import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { HeroBackground } from '../../styles/Styles';

const HeroContainer = ({ backgroundImage, text }) => {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef();

    // Configurar IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5,
            }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    // Crear una animación de opacidad
    const fade = useSpring({
        opacity: isVisible ? 1 : 0,
        delay: 300,
    });
    const fadeSlide = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
        delay: isVisible ? 300 + 300 : 0,
    });
    const moveDown = useSpring({
        from: { transform: isVisible ? "translateY(-100%)" : "translateY(0)" },
        to: { transform: "translateY(0)" },
        delay: isVisible ? 300 : 0,
    });

    const moveRight = useSpring({
        from: { transform: "translateX(100px)" },
        to: { transform: "translateX(0)" },
        delay: isVisible ? 100 : 0, // Aumentar el delay
    });

    const spinZoom = useSpring({
        from: { transform: isVisible ? "scale(0) rotate(0deg)" : "scale(1) rotate(360deg)" },
        to: { transform: "scale(1) rotate(360deg)" },
        delay: isVisible ? 300 : 0,
    });

    // Estas dos animaciones son infinitas, por lo que no es útil agregar la condición `isVisible`
    // Ya que, sin importar si el elemento es visible o no, la animación se ejecutará continuamente   

    const slideInFromLeft = useSpring({
        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
        delay: isVisible ? 500 : 0,
        opacity: isVisible ? 1 : 0,
    });

    const slideInFromBottom = useSpring({
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        delay: isVisible ? 500 : 0,
    });
    return (
        <HeroBackground>
            <div className='hero' style={{ backgroundImage: `url(${backgroundImage})` }} ref={heroRef}>
                <p className='hero-text'>
                    <animated.span style={slideInFromBottom}>Se único</animated.span> <animated.span style={slideInFromLeft}>, se audaz</animated.span>
                </p>
            </div>
        </HeroBackground>
    );
};

export default HeroContainer;
