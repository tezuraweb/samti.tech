import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import App from './app';
import ServicePage from './serviceApp';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const serviceRoot = document.getElementById('service-root');

    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }, 500);
        }
    };

    if (root) {
        ReactDOM.render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>,
            root,
            hidePreloader
        );
    } else if (serviceRoot) {
        ReactDOM.render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ServicePage />
                </PersistGate>
            </Provider>,
            serviceRoot,
            hidePreloader
        );
    } else {
        // Ensure the preloader disappears on pages without a React root (e.g., service detail pages).
        hidePreloader();
    }

    const scrollToTopButton = document.querySelector('.footer__button');
    const scrollToProjectsButton = document.querySelector('#startProjectButton');
    const returnToMainButton = document.querySelector('.portfolio__button--home');
    const portfolioScrollTopButton = document.querySelector('.portfolio__button--top');
    const footerYear = document.querySelector('.footer__year');
    const pageServiceSlug = window.appSettings?.serviceSlug;
    const setPendingForm = (payload) => {
        try {
            localStorage.setItem('pendingForm', JSON.stringify(payload || {}));
        } catch (e) {
            // ignore storage failures
        }
    };
    const emitOpenLeadForm = () => {
        window.dispatchEvent(new CustomEvent('openLeadForm'));
        // If React is not mounted on this page, trigger a redirect to home with the pending form.
        if (!root) {
            const pending = {};
            if (pageServiceSlug) pending.serviceSlug = pageServiceSlug;
            setPendingForm(pending);
            window.location.href = `/${window.appSettings?.lang || 'en'}`;
        }
    };

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (scrollToProjectsButton) {
        scrollToProjectsButton.addEventListener('click', () => {
            const pending = {};
            if (pageServiceSlug) {
                pending.serviceSlug = pageServiceSlug;
            }
            setPendingForm(pending);
            emitOpenLeadForm();
        });
    }

    if (returnToMainButton) {
        returnToMainButton.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    if (portfolioScrollTopButton) {
        portfolioScrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
