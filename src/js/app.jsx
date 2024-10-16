import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';

const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const LeadForm = lazy(() => import('./components/Form'));

const Loading = () => <div>Loading...</div>;

const App = () => {
    const currencies = [
        {
            name: 'dollar',
            symbol: '$',
        },
        {
            name: 'ruble',
            symbol: '₽',
        },
        {
            name: 'yuan',
            symbol: '¥',
        },
    ];

    const servicesRef = useRef(null);
    const [currentLang, setCurrentLang] = useState('en');
    const [selectedCurrency, setSelectedCurrency] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (window.appSettings && window.appSettings.lang) {
            setCurrentLang(window.appSettings.lang);
        }
    }, []);

    useEffect(() => {
        const body = document.body;

        if (isFormVisible) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }

        return () => {
            body.classList.remove('no-scroll');
        };
    }, [isFormVisible]);

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const changeCurrency = (index) => {
        setSelectedCurrency(index);
    };

    const openForm = () => {
        setIsFormVisible(true);
    }

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Hero 
                    currentLang={currentLang} 
                    selectedCurrency={selectedCurrency} 
                    currencies={currencies} 
                    changeCurrency={changeCurrency} 
                    callForm={openForm} 
                    scrollToServices={scrollToServices} 
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Services 
                    ref={servicesRef} 
                    currentLang={currentLang} 
                    callForm={openForm} 
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Projects 
                    currentLang={currentLang} 
                    callForm={openForm} 
                />
            </Suspense>
            {isFormVisible && (
                <Suspense fallback={<Loading />}>
                    <LeadForm 
                        currencies={currencies} 
                        currentLang={currentLang} 
                        selectedCurrency={selectedCurrency} 
                        afterSubmit={() => setIsFormVisible(false)}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default App;