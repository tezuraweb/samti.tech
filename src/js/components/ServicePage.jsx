import React, { lazy, Suspense, useEffect, useState } from 'react';

const LeadForm = lazy(() => import('./Form'));

const serviceData = {
    'web-development': {
        slug: 'web-development',
        title: 'Samti Tech Web Development',
        tagline: 'Build. Launch. Scale.',
        intro: [
            'Samti Tech helps businesses launch fast, grow confidently, and scale efficiently through high-quality web solutions.',
            'We combine strong engineering, clean design, and practical deployment strategies to deliver products that work in real markets—not just on paper.',
            'From landing pages to web applications, we focus on speed, reliability, and measurable results.',
        ],
        sections: [
            {
                heading: 'What We Do',
                items: [
                    {
                        title: 'Websites',
                        desc: 'Fast, secure, conversion-focused sites that build trust and generate leads.',
                    },
                    {
                        title: 'eCommerce',
                        desc: 'Scalable storefronts with payments, analytics, and marketing integrations.',
                    },
                    {
                        title: 'Web Applications',
                        desc: 'Interactive dashboards, calculators, and internal tools built for usability and performance.',
                    },
                    {
                        title: 'Content Management Systems',
                        desc: 'Custom CMS tailored to your workflows without lock-in or bloat.',
                    },
                    {
                        title: 'Low-Code & Rapid Development',
                        desc: 'Low-code/no-code where it makes sense for faster MVPs without sacrificing quality.',
                    },
                ],
            },
            {
                heading: 'Our Process',
                steps: [
                    'Consult your idea and clarify objectives.',
                    'Choose the right technology for performance, scalability, and maintainability.',
                    'Design clean UX/UI that guides users to act.',
                    'Develop reliable, well-structured code.',
                    'Reach the market with deploy, analytics, optimization, and support.',
                ],
            },
            {
                heading: 'Challenges We Solve',
                items: [
                    'Fast market entry with stable, production-ready solutions.',
                    'Digital acceleration by extending technical capacity and modernizing systems.',
                    'Product expansion with new modules and functionality for new markets.',
                ],
            },
            {
                heading: 'Why Samti Tech',
                paragraphs: [
                    'Become a digital stand-out with a practical, engineering-driven web development company.',
                    'We cover the full lifecycle: websites/web apps, UX/UI, eCommerce, CMS, backend, QA, deployment, and support. We build for business goals, not over-engineered abstractions.',
                ],
            },
        ],
        packages: [
            {
                name: 'Easy Start',
                target: 'Ideal for startups, personal brands, and fast launches.',
                includes: [
                    'UI/UX design',
                    'One landing page',
                    'Privacy Policy & Cookies Policy',
                    'Domain setup + SSL',
                    'Analytics integration (e.g. Google Analytics)',
                    'Ads pixels installation',
                    'Favicon & basic SEO',
                    'Hosting deployment',
                    'One form (Email / Telegram / other open API)',
                    'CI/CD via FTP',
                    '3 months support (bug fixes & minor issues)',
                ],
                tech: 'JS / HTML / CSS + bundler',
                delivery: 'Up to 3 days',
                price: '$350',
                optional: 'Advertising setup for 1 month — +$100 (max 2 platforms)',
            },
            {
                name: 'Small Site',
                target: 'Perfect for small businesses and service companies.',
                includes: [
                    'UI/UX design',
                    'Up to 5 pages',
                    'Privacy Policy & Cookies Policy',
                    'Domain setup + SSL',
                    'Analytics integration (e.g. Google Analytics)',
                    'Ads pixels installation',
                    'SEO optimization for each page',
                    'Hosting deployment',
                    'Up to 5 forms (Email / Telegram / other open API)',
                    'CI/CD via FTP',
                    '3 months support (bug fixes & minor issues)',
                ],
                tech: 'JS / HTML / CSS + bundler',
                delivery: 'Up to 5 days',
                price: '$500',
                optional: 'Advertising setup for 1 month — +$100 (max 2 platforms)',
            },
            {
                name: 'Web App Mini',
                target: 'For interactive products, MVPs, and internal tools.',
                includes: [
                    'UI/UX design',
                    'Website with database',
                    'Up to 3 interactive pages (catalogs, calculators, interactive forms, etc.)',
                    'Privacy Policy & Cookies Policy',
                    'Backend for content management',
                    'Domain setup + SSL',
                    'Analytics integration (e.g. Google Analytics)',
                    'Ads pixels installation',
                    'VPS deployment',
                    'Forms via Email / Telegram / other open API',
                    'CI/CD via Docker',
                ],
                tech: 'React / Next.js',
                delivery: 'Up to 7 days',
                price: '$800',
                optional: 'Advertising setup for 1 month — +$100 (max 2 platforms)',
            },
        ],
        packagesNote: 'Packages are for small businesses only and can be purchased once per business. New to IT? Start with Easy Start.',
    },
};

const ServicePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const slug = window.appSettings?.serviceSlug || 'web-development';
    const service = serviceData[slug] || serviceData['web-development'];
    const setPendingForm = (payload) => {
        try {
            localStorage.setItem('pendingForm', JSON.stringify(payload || {}));
        } catch (e) {
            // ignore storage failures
        }
    };

    useEffect(() => {
        const handleOpenForm = () => setIsFormVisible(true);
        window.addEventListener('openLeadForm', handleOpenForm);
        return () => window.removeEventListener('openLeadForm', handleOpenForm);
    }, []);

    const openForm = (pkg) => {
        const pending = { serviceSlug: slug };
        if (pkg) {
            pending.budget = `Package: ${pkg.name} (${pkg.price})`;
        }
        setPendingForm(pending);
        window.dispatchEvent(new CustomEvent('openLeadForm'));
        setIsFormVisible(true);
    };

    return (
        <>
            <section className="section service-detail">
                <div className="container container__medium service-detail__hero">
                    <div className="service-detail__back">
                        <a className="link-back" href={`/${window.appSettings?.lang || 'en'}`}>Return to main page</a>
                    </div>
                    <h1 className="section__title">
                        <div className="section__title--text">{service.title}</div>
                    </h1>
                    <div className="service-detail__tagline">{service.tagline}</div>
                    <div className="service-detail__intro">
                        {service.intro.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <div className="service-detail__cta">
                        <button className="cta" onClick={() => openForm()}>Start a project</button>
                    </div>
                </div>
            </section>

            <section className="section service-detail__body">
                <div className="container container__medium service-detail__stack">
                    {service.sections.map((section) => {
                        if (section.heading === 'Our Process') {
                            return (
                                <div className="service-detail__process" key={section.heading}>
                                    <div className="service-detail__card-title">// {section.heading}</div>
                                    <div className="service-detail__process-grid">
                                        {section.steps?.map((step, idx) => (
                                            <div className="service-detail__process-row" key={idx}>
                                                <div className="service-detail__process-num">{String(idx + 1).padStart(2, '0')}</div>
                                                <div className="service-detail__process-text">{step}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (section.heading === 'Why Samti Tech') {
                            return (
                                <div className="service-detail__why" key={section.heading}>
                                    <div className="service-detail__card-title">// {section.heading}</div>
                                    <div className="service-detail__paragraphs">
                                        {section.paragraphs?.map((text, idx) => (
                                            <p key={idx}>{text}</p>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="service-detail__block" key={section.heading}>
                                <div className="service-detail__card-title">// {section.heading}</div>
                                {section.items && (
                                    <ul className="service-detail__list service-detail__list--grid">
                                        {section.items.map((item) => {
                                            const title = typeof item === 'string' ? item : item.title;
                                            const desc = typeof item === 'string' ? '' : item.desc;
                                            return (
                                                <li key={title}>
                                                    <div className="service-detail__item-title">{title}</div>
                                                    {desc && <div className="service-detail__item-desc">{desc}</div>}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                {section.paragraphs && (
                                    <div className="service-detail__paragraphs">
                                        {section.paragraphs.map((text, idx) => (
                                            <p key={idx}>{text}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="section service-detail__packages">
                <div className="container container__medium">
                    <div className="service-detail__packages-header">
                        <div className="service-detail__card-title">// Packages</div>
                        <p className="service-detail__note">{service.packagesNote}</p>
                    </div>
                    <div className="service-detail__packages-grid">
                        {service.packages.map((pkg) => (
                            <div className="service-detail__package" key={pkg.name}>
                                <div className="service-detail__package-head">
                                    <div className="service-detail__package-name">{pkg.name}</div>
                                    <div className="service-detail__package-price">{pkg.price}</div>
                                </div>
                                <div className="service-detail__package-target">{pkg.target}</div>
                                <div className="service-detail__package-block">
                                    <div className="service-detail__package-label">Includes</div>
                                    <ul className="service-detail__package-list">
                                        {pkg.includes.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="service-detail__package-meta">
                                    <div><strong>Tech stack:</strong> {pkg.tech}</div>
                                    <div><strong>Delivery:</strong> {pkg.delivery}</div>
                                    {pkg.optional && <div><strong>Optional:</strong> {pkg.optional}</div>}
                                </div>
                                <button className="cta" onClick={() => openForm(pkg)}>Start with {pkg.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {isFormVisible && (
                <Suspense fallback={null}>
                    <LeadForm afterSubmit={() => setIsFormVisible(false)} />
                </Suspense>
            )}
        </>
    );
};

export default ServicePage;
