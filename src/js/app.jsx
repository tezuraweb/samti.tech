import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const LeadForm = lazy(() => import('./components/Form'));
const Map = lazy(() => import('./components/Map'));

const Loading = () => <div>Loading...</div>;

const MainLayout = ({ openForm, scrollToServices, servicesRef, isFormVisible, setIsFormVisible }) => (
  <>
    <Suspense fallback={<Loading />}>
      <Hero
        currencies={{
          dollar: { symbol: '$' },
          ruble: { symbol: '₽' },
          somoni: { symbol: 'сом' },
        }}
        supportedLangs={['en', 'ru', 'tj']}
        callForm={openForm}
        scrollToServices={scrollToServices}
      />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <Services ref={servicesRef} callForm={openForm} />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <Projects callForm={openForm} />
    </Suspense>
    {isFormVisible && (
      <Suspense fallback={<Loading />}>
        <LeadForm afterSubmit={() => setIsFormVisible(false)} />
      </Suspense>
    )}
  </>
);

const App = () => {
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
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                openForm={openForm}
                scrollToServices={scrollToServices}
                servicesRef={servicesRef}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
              />
            }
          />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
