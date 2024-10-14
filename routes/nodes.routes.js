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
    .route('/meditary')
    .get((req, res) => {
        res.render('includes/portfolio1', { language: 'ru' });
    });

router
    .route('/thesouth')
    .get((req, res) => {
        res.render('includes/portfolio2', { language: 'ru' });
    });

router
    .route('/rimera')
    .get((req, res) => {
        res.render('includes/portfolio3', { language: 'ru' });
    });

router
    .route('/smm')
    .get((req, res) => {
        res.render('includes/portfolio4', { language: 'ru' });
    });

module.exports = router;