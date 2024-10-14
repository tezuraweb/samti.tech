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
    .route('/thesouth')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'thesouth' });
    });

router
    .route('/rimera')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'rimera' });
    });

router
    .route('/zippy')
    .get((req, res) => {
        res.render('nodes/portfolio', { language: 'en', pageType: 'zippy' });
    });

module.exports = router;