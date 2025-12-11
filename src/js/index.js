import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

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
    }

    const scrollToTopButton = document.querySelector('.footer__button');
    const scrollToProjectsButton = document.querySelector('#startProjectButton');
    const returnToMainButton = document.querySelector('.portfolio__button--home');
    const portfolioScrollTopButton = document.querySelector('.portfolio__button--top');
    const footerYear = document.querySelector('.footer__year');
    const emitOpenLeadForm = () => {
        window.dispatchEvent(new CustomEvent('openLeadForm'));
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
        scrollToProjectsButton.addEventListener('click', emitOpenLeadForm);
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
