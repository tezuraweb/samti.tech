const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('nodes/index');
    });

router
    .route('/en')
    .get((req, res) => {
        res.render('nodes/index', { language: 'en' });
    });

router
    .route('/ru')
    .get((req, res) => {
        res.render('nodes/index', { language: 'ru' });
    });

    router
    .route('/web-development')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'web-development' });
    });

router
    .route('/design')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'design' });
    });

router
    .route('/apps')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'apps' });
    });

router
    .route('/smm')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'smm' });
    });

module.exports = router;