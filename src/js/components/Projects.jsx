import React from 'react';
import { useSelector } from 'react-redux';

import localization from '../../../assets/json/localization.json';

const Projects = () => {
    const currentLang = useSelector((state) => state.language?.currentLang || 'en');

    const projects = [
        {
            id: 'webdev',
            link: '/web-development',
            title: localization[currentLang].proj1Title,
            summary: localization[currentLang].proj1Desc,
            cover: '/img/main/emismain-preview.webp',
        },
        {
            id: 'zentro',
            link: '/zentro',
            title: localization[currentLang].proj2Title,
            summary: localization[currentLang].proj2Desc,
            cover: '/img/main/zentro-preview.webp',
        },
        {
            id: 'interface',
            link: '/rimera',
            title: localization[currentLang].proj3Title,
            summary: localization[currentLang].proj3Desc,
            cover: '/img/main/rimera-preview.webp',
        },
        {
            id: 'mobileapp',
            link: '/mobileapp',
            title: localization[currentLang].proj4Title,
            summary: localization[currentLang].proj4Desc,
            cover: '/img/main/bus-preview.webp',
        }
    ];

    return (
        <section className="section portfolio" id="cards">
            <div className="container container__medium">
                <header className="portfolio__header">
                    <h2 className="portfolio__title">{localization[currentLang].projectsTitle}</h2>
                    <p className="portfolio__subtitle">{localization[currentLang].projectsSubtitle || ''}</p>
                </header>
            </div>
            <div className="container container__medium">
                <div className="portfolio__grid">
                    {projects.map((project) => (
                        <a key={project.id} href={project.link} className="portfolio__card" aria-label={`Open ${project.title}`}>
                            <div className="portfolio__image-link">
                                <img
                                    className="portfolio__image"
                                    src={project.cover}
                                    alt={project.title}
                                    loading="lazy"
                                />
                            </div>
                            <div className="portfolio__info">
                                <div className="portfolio__tag">// {localization[currentLang].projectTag || 'project'}</div>
                                <h3 className="portfolio__card-title">{project.title}</h3>
                                <p className="portfolio__card-summary">{project.summary}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
