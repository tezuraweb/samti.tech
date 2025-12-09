import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import IconSprite from '../includes/IconSprite';
import localization from '../../../assets/json/localization.json';

const Services = forwardRef(({ callForm }, ref) => {
    const currentLang = useSelector((state) => state.language?.currentLang || 'en');

    const services = [
        {
            type: 'webdev',
            title: localization[currentLang].webdevTitle,
            summary: localization[currentLang].webdevDesc,
            icons: [
                {
                    name: 'ReactIcon',
                    width: 80,
                    height: 70,
                },
                {
                    name: 'VueIcon',
                    width: 70,
                    height: 70,
                },
                {
                    name: 'NestIcon',
                    width: 70,
                    height: 79,
                },
                {
                    name: 'NodeIcon',
                    width: 169,
                    height: 50,
                },
                {
                    name: 'NextIcon',
                    width: 176,
                    height: 35,
                },
            ],
            href: '/services/web-development'
        },
        {
            type: 'tg',
            title: localization[currentLang].tgTitle,
            summary: localization[currentLang].tgDesc,
            icons: [
                {
                    name: 'AppleIcon',
                    width: 66,
                    height: 80,
                },
                {
                    name: 'AndroidIcon',
                    width: 66,
                    height: 80,
                },
            ],
            href: '/services/mobile-apps-bots'
        },
        {
            type: 'smm',
            title: localization[currentLang].smmTitle,
            summary: localization[currentLang].smmDesc,
            icons: [
                {
                    name: 'FacebookIcon',
                },
                {
                    name: 'InstagramIcon',
                },
                {
                    name: 'WhatsappIcon',
                },
                {
                    name: 'LinkedinIcon',
                },
                {
                    name: 'YoutubeIcon',
                },
                {
                    name: 'PinterestIcon',
                },
            ],
            href: '/services/smm'
        },
        {
            type: 'seo',
            title: localization[currentLang].seoTitle,
            summary: localization[currentLang].seoDesc,
            icons: [],
            href: '/services/seo'
        },
        {
            type: 'design',
            title: localization[currentLang].designTitle,
            summary: localization[currentLang].designDesc,
            icons: [
                {
                    name: 'PhotoshopIcon',
                    width: 83,
                    height: 80,
                },
                {
                    name: 'IndesignIcon',
                    width: 83,
                    height: 80,
                },
                {
                    name: 'AiIcon',
                    width: 83,
                    height: 80,
                },
                {
                    name: 'FigmaIcon',
                    width: 53,
                    height: 80,
                },
                {
                    name: 'BlenderIcon',
                    width: 98,
                    height: 80,
                },
            ],
            href: '/services/design'
        },
        {
            type: 'analytics',
            title: localization[currentLang].analyticsTitle,
            summary: localization[currentLang].analyticsDesc,
            icons: [],
            href: '/services/business-analysis'
        },
    ];

    return (
        <section className="section services" ref={ref}>
            <div className="container container__noPadding services__container">
                <div className="services__grid">
                    {services.map((service, index) => (
                        <article
                            key={service.type}
                            className={`services__card services__card--${service.type} ${index < 2 ? 'services__card--priority' : ''}`}
                        >
                            <header className="services__card-header">
                                <h3 className="services__card-title">{service.title}</h3>
                                <button
                                    className="services__card-arrow"
                                    onClick={() => window.open(service.href, '_self')}
                                    aria-label={`Open ${service.title}`}
                                >
                                    <IconSprite selector="ArrowCard" width={20} height={20} />
                                </button>
                            </header>
                            <p className="services__card-summary">{service.summary}</p>
                            <div className={`services__icons services__icons--${service.type}`}>
                                {service.icons.map((icon) => (
                                    <IconSprite
                                        key={icon.name}
                                        selector={icon.name}
                                        width={icon.width || 64}
                                        height={icon.height || 64}
                                    />
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Services;
