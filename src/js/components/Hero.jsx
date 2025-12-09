import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, setCurrency } from '../redux/actions/actions';
import localization from '../../../assets/json/localization.json';

const HeroSection = ({ scrollToServices, currencies, callForm, supportedLangs }) => {
    const dispatch = useDispatch();

    const urlLang = window.location.pathname.startsWith('/') ? window.location.pathname.split('/')[1] : null;
    const savedLang = useSelector((state) => state.language?.currentLang);
    const currentLang = savedLang || (supportedLangs.includes(urlLang) ? urlLang : 'en');

    const savedCurrency = useSelector((state) => state.currency?.currentCurrency);
    const currentCurrency = savedCurrency || 'dollar';

    const [langListVisible, setLangListVisible] = useState(false);
    const [currencyListVisible, setCurrencyListVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const currencySelectRef = useRef(null);
    const langSelectRef = useRef(null);
    const backgroundRef = useRef(null);
    const orbRef = useRef(null);
    const orbCanvasRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentLang !== savedLang) {
            dispatch(setLanguage(currentLang));
        }
    }, [currentLang, savedLang, dispatch]);

    useEffect(() => {
        if (currentCurrency !== savedCurrency) {
            dispatch(setCurrency(currentCurrency));
        }
    }, [currentCurrency, savedCurrency, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (currencySelectRef.current && !currencySelectRef.current.contains(event.target)) {
                setCurrencyListVisible(false);
            }
            if (langSelectRef.current && !langSelectRef.current.contains(event.target)) {
                setLangListVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const canvas = orbCanvasRef.current;
        const orbEl = orbRef.current;
        if (!canvas || !orbEl) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let animationId;
        let width = 0;
        let height = 0;
        let radius = 0;
        let centerX = 0;
        let centerY = 0;

        const bandCount = 6;
        const bandState = Array.from({ length: bandCount }).map((_, i) => ({
            angle: (Math.PI * 2 * i) / bandCount,
            speed: (Math.random() * 0.004 + 0.0015) * (i % 2 ? 1 : -1), // slower rotation
            widthFactor: Math.random() * 0.14 + 0.2, // narrower bands
            heightFactor: Math.random() * 0.7 + 1.2,
            offsetX: (Math.random() - 0.5) * 0.7, // shift so not all strips cross center
            offsetY: (Math.random() - 0.5) * 0.5,
            lean: (Math.random() - 0.5) * 0.18,
        }));

        const bandColors = [
            'rgba(219, 255, 0, 0.5)', // corporate green
            'rgba(120, 255, 204, 0.45)',
            'rgba(98, 191, 255, 0.42)',
            'rgba(198, 128, 255, 0.38)',
            'rgba(255, 178, 86, 0.25)',
        ];

        const resize = () => {
            const rect = orbEl.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            radius = Math.min(width, height) / 2;
            centerX = width / 2;
            centerY = height / 2;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const drawBase = () => {
            const base = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
            base.addColorStop(0, 'rgba(64, 255, 210, 0.85)');
            base.addColorStop(0.45, 'rgba(54, 181, 214, 0.8)');
            base.addColorStop(1, 'rgba(8, 21, 38, 0.7)');
            ctx.fillStyle = base;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawBands = () => {
            bandState.forEach((band, idx) => {
                band.angle += band.speed;

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(band.angle);
                ctx.translate(band.offsetX * radius, band.offsetY * radius);
                ctx.transform(1, 0, band.lean, 1, 0, 0);
                ctx.scale(1.1, 1);

                const bandWidth = radius * band.widthFactor;
                const bandHeight = radius * band.heightFactor;
                const grad = ctx.createLinearGradient(-bandWidth / 2, 0, bandWidth / 2, 0);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.35, bandColors[idx % bandColors.length]);
                grad.addColorStop(0.65, bandColors[(idx + 1) % bandColors.length]);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = grad;
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.rect(-bandWidth / 2, -bandHeight * 0.6, bandWidth, bandHeight);
                ctx.fill();
                ctx.restore();
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();

            drawBase();
            drawBands();

            ctx.restore();
            animationId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const formatTime = (time) => {
        return currentLang === 'en'
            ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            : currentLang === 'tj'
                ? time.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false })
                : time.toLocaleTimeString(currentLang, { hour: 'numeric', minute: 'numeric', hour12: false });
    };

    const getGreeting = (lang, time) => {
        const hour = time.getHours();
        let greetingKey = 'greetingMorning';

        if (hour >= 6 && hour < 12) {
            greetingKey = 'greetingMorning';
        } else if (hour >= 12 && hour < 18) {
            greetingKey = 'greetingAfternoon';
        } else if (hour >= 18 && hour < 24) {
            greetingKey = 'greetingEvening';
        } else if (hour >= 0 && hour < 6) {
            greetingKey = 'greetingNight';
        }

        return localization[lang][greetingKey];
    };

    const handleScrollDown = () => {
        scrollToServices();
    };

    const handleCurrencySelectClick = () => {
        setCurrencyListVisible(!currencyListVisible);
    };

    const handleCurrencySelect = (currency) => {
        setCurrencyListVisible(false);
        dispatch(setCurrency(currency));
    };

    const handleLangSelectClick = () => {
        setLangListVisible(!langListVisible);
    };

    const handleLanguageSelect = (lang) => {
        setLangListVisible(!langListVisible);
        dispatch(setLanguage(lang));
        window.location.pathname = `/${lang}${window.location.pathname.replace(/^\/(en|ru|tj)/, '')}`;
    };

    const openForm = () => {
        callForm();
    };

    return (
        <section className="section hero">
                <div className="hero__background" ref={backgroundRef}>
                    <div className="hero__glow hero__glow--left"></div>
                    <div className="hero__glow hero__glow--right"></div>
                    <div className="hero__orb" ref={orbRef}>
                        <canvas className="hero__orb-canvas" ref={orbCanvasRef} aria-hidden="true" />
                    </div>
                    <div className="hero__orb-shadow"></div>
                </div>
            <div className="container container__medium hero__container">
                <div className="hero__wrapper">
                    <div className="hero__topbar">
                        <div className="hero__brand">
                            <svg className="hero__logo" aria-label="1st Dev logo">
                                <use xlinkHref="#LogoMain" />
                            </svg>
                        </div>
                        <button className="hero__cta" onClick={openForm}>
                            {localization[currentLang].start}
                        </button>
                        <div className="hero__controls">
                            <div className="hero__select" ref={currencySelectRef}>
                                <div className="hero__select--active" onClick={handleCurrencySelectClick}>
                                    {currencies[currentCurrency]?.symbol || 'N/A'}
                                </div>
                                <div className={'hero__select--list' + (currencyListVisible ? ' visible' : '')}>
                                    {Object.keys(currencies).map((currency) => (
                                        <div
                                            className={'hero__select--item' + (currency === currentCurrency ? ' active' : '')}
                                            onClick={() => handleCurrencySelect(currency)}
                                            key={currency}
                                        >
                                            {currencies[currency]?.symbol || 'N/A'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hero__select hero__select--lang" ref={langSelectRef}>
                                <div className="hero__select--active" onClick={handleLangSelectClick}>{currentLang}</div>
                                <div className={'hero__select--list' + (langListVisible ? ' visible' : '')}>
                                    {supportedLangs.map((lang) => (
                                        <div
                                            className={'hero__select--item' + (lang === currentLang ? ' active' : '')}
                                            onClick={() => handleLanguageSelect(lang)}
                                            key={lang}
                                        >
                                            {lang.toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero__content">
                        <div className="hero__copy">
                            <h1 className="hero__title">
                                <span>{localization[currentLang].title1}</span>
                                <span className="hero__title--accent">{localization[currentLang].title2}</span>
                            </h1>
                            <div className="hero__subtitle">{localization[currentLang].title3}</div>
                            <div className="hero__badge-mobile">resident of Dushanbe IT Park</div>
                            <div className="hero__meta">
                                <div className="hero__date--time">{formatTime(currentTime)}</div>
                                <div className="hero__date--text">{getGreeting(currentLang, currentTime)}</div>
                            </div>
                        </div>
                        <div className="hero__visual">
                            <button className="hero__arrow" onClick={handleScrollDown} aria-label="Scroll to services">
                                <div className="hero__arrow--line"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
