import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';

const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const LeadForm = lazy(() => import('./components/Form'));

const Loading = () => <div class="loader"></div>;

const App = () => {
    const currencies = {
        dollar: { symbol: '$' },
        ruble: { symbol: '₽' },
        somoni: { symbol: 'сом' }
    };

    const supportedLangs = ['en', 'ru', 'tj'];

    const servicesRef = useRef(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    const openForm = () => {
        setIsFormVisible(true);
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Hero
                    currencies={currencies}
                    supportedLangs={supportedLangs}
                    callForm={openForm} 
                    scrollToServices={scrollToServices} 
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Services 
                    ref={servicesRef} 
                    callForm={openForm} 
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Projects 
                    callForm={openForm} 
                />
            </Suspense>
            {isFormVisible && (
                <Suspense>
                    <LeadForm 
                        afterSubmit={() => setIsFormVisible(false)}
                    />
                </Suspense>
            )}
        </>
    );
};

export default App;