const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.redirect('/en');
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
    .route('/tj')
    .get((req, res) => {
        res.render('nodes/index', { language: 'tj' });
    });

const renderPortfolio = (language, pageType, res) => {
    res.render('nodes/portfolio', { language, pageType });
};

router
    .route('/:lang(en|ru|tj)/:pageType(web-development|zentro|rimera|mobileapp)')
    .get((req, res) => {
        const { lang, pageType } = req.params;
        renderPortfolio(lang, pageType, res);
    });

const serviceSlugs = ['web-development', 'mobile-apps-bots', 'smm', 'seo', 'design', 'business-analysis'];

router
    .route('/:lang(en|ru|tj)/services/:slug')
    .get((req, res) => {
        const { lang, slug } = req.params;
        if (!serviceSlugs.includes(slug)) {
            return res.redirect(`/${lang}`);
        }
        res.render('nodes/service', { language: lang, slug });
    });

router
    .route('/web-development')
    .get((req, res) => {
        renderPortfolio('en', 'web-development', res);
    });

router
    .route('/thesouth')
    .get((req, res) => {
        res.redirect('/zentro');
    });

router
    .route('/zentro')
    .get((req, res) => {
        renderPortfolio('en', 'zentro', res);
    });

router
    .route('/rimera')
    .get((req, res) => {
        renderPortfolio('en', 'rimera', res);
    });

router
    .route('/mobileapp')
    .get((req, res) => {
        renderPortfolio('en', 'mobileapp', res);
    });

router
    .route('/services/:slug')
    .get((req, res) => {
        const { slug } = req.params;
        if (!serviceSlugs.includes(slug)) {
            return res.redirect('/');
        }
        res.render('nodes/service', { language: 'en', slug });
    });

router
    .route('/zippy')
    .get((req, res) => {
        res.redirect('/mobileapp');
    });

router
    .route('/busdriver')
    .get((req, res) => {
        res.redirect('/mobileapp');
    });

module.exports = router;
