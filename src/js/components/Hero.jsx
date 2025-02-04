import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, setCurrency } from '../redux/actions/actions';

// import Sparkle from './Sparkle';
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

    const formatTime = (time) => {
        return currentLang === 'en' ?
            time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) :
            currentLang === 'tj' ?
                time.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false }) :
                time.toLocaleTimeString(currentLang, { hour: 'numeric', minute: 'numeric', hour12: false });
    };

    const getGreeting = (currentLang, currentTime) => {
        const hour = currentTime.getHours();
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

        return localization[currentLang][greetingKey];
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
    }

    return (
        <section className="section hero">
            {/* <Sparkle /> */}

            <div className="hero__background" ref={backgroundRef}>
                <div className='wave -three'></div>
                <div className='wave -four'></div>
                <div className='wave -one'></div>
                <div className='wave -two'></div>
            </div>
            <div className="container container__medium hero__container">
                <div className="hero__wrapper">
                    <div className="hero__top">
                        <div className="hero__date">
                            <div className="hero__date--time">
                                {formatTime(currentTime)}
                            </div>
                            <div className="hero__date--text">
                                {getGreeting(currentLang, currentTime)}
                            </div>
                        </div>
                        <button className="hero__button" onClick={() => openForm()}>
                            {localization[currentLang].start}
                        </button>
                        <div className="hero__select">
                            <div className="hero__select--block" ref={currencySelectRef}>
                                <div className="hero__select--active" onClick={() => handleCurrencySelectClick()}>
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
                            <div className="hero__select--block" ref={langSelectRef}>
                                <div className="hero__select--active" onClick={() => handleLangSelectClick()}>{currentLang}</div>
                                <div className={'hero__select--list' + (langListVisible ? ' visible' : '')}>
                                    {supportedLangs.map((lang) => (
                                        <div className={'hero__select--item' + (lang === currentLang ? ' active' : '')} onClick={() => handleLanguageSelect(lang)}>
                                            {lang.toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero__bottom">
                        <h1 className="hero__title">{localization[currentLang].title1}<br /><span className="hero__title--big">{localization[currentLang].title2}</span><br />{localization[currentLang].title3}</h1>
                        <div className="hero__links">
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