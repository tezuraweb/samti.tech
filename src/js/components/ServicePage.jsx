import React, { lazy, Suspense, useEffect, useState } from 'react';

const LeadForm = lazy(() => import('./Form'));
const FloatingButton = lazy(() => import('./FloatingButton'));

const serviceData = {
    'web-development': {
        slug: 'web-development',
        title: 'Samti Tech Web Development',
        tagline: 'Build. Launch. Scale.',
        highlights: [
            {
                label: 'Kickoff',
                text: 'Start in 48 hours with a short, structured intake.',
            },
            {
                label: 'Delivery',
                text: 'Clean builds, staging links, and transparent timelines.',
            },
            {
                label: 'Handoff',
                text: 'Docs, repos, and support so you are never locked out.',
            },
        ],
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
    'mobile-apps-bots': {
        slug: 'mobile-apps-bots',
        title: 'Mobile Apps & Bots',
        tagline: 'Automate workflows and engage users where they already are.',
        highlights: [
            { label: 'Reliable', text: 'Built for production, not just demos — with monitoring and support.' },
            { label: 'Integrated', text: 'Apps and bots that plug into your existing systems securely.' },
            { label: 'Practical', text: 'Focused on automation, usability, and measurable impact.' },
        ],
        intro: [
            'We design and develop mobile applications and custom bots that simplify operations, automate routine tasks, and improve interaction with your systems.',
            'Solutions are built for reliability, scalability, and real-world usage.',
        ],
        sections: [
            {
                heading: 'What We Build',
                items: [
                    { title: 'Mobile Applications', desc: 'Native and cross-platform apps for performance, usability, and seamless backend integration.' },
                ],
                paragraphs: [
                    'Use cases include: client and internal apps, data collection and reporting, dashboards and monitoring tools, service and booking applications.',
                ],
            },
            {
                heading: 'Custom Bots (Telegram & More)',
                items: [
                    { title: 'Messaging automation', desc: 'Bots that automate communication, processes, and data exchange inside messaging platforms.' },
                ],
                paragraphs: [
                    'Typical bot functionality: notifications and alerts; form submissions and data collection; CRM and system integrations; user support and onboarding; admin and operational tools.',
                ],
            },
            {
                heading: 'Why Bots & Mobile Apps',
                items: [
                    'Reduce manual work and human error.',
                    'Speed up internal and external communication.',
                    'Improve user engagement and retention.',
                    'Provide instant access to services and data.',
                    'Scale easily as your business grows.',
                ],
            },
            {
                heading: 'How We Work',
                paragraphs: [
                    'We start by understanding your process and identifying where automation or mobile access creates the most value. Then we design, build, and integrate solutions that fit your infrastructure.',
                    'Our approach includes:',
                ],
                items: [
                    'Process analysis',
                    'UX/UI design',
                    'Backend integration',
                    'Secure deployment',
                    'Testing and support',
                ],
            },
            {
                heading: 'Platforms & Technologies',
                items: [
                    'Telegram Bot API',
                    'REST & webhook integrations',
                    'iOS / Android (native or cross-platform)',
                    'Secure backend services',
                    'Analytics and monitoring',
                ],
                paragraphs: ['All solutions are built with future expansion and maintenance in mind.'],
            },
        ],
    },
    seo: {
        slug: 'seo',
        title: 'Targeting & SEO',
        tagline: 'Drive measurable growth through search and precision targeting.',
        highlights: [
            { label: 'Measurable', text: 'Every action is tracked, reported, and iterated for ROI.' },
            { label: 'Integrated', text: 'SEO, content, targeting, and analytics work together.' },
            { label: 'Data-first', text: 'Built on search intent, audience behavior, and conversion data.' },
        ],
        intro: [
            'We help businesses attract the right audience, increase visibility, and convert traffic into results.',
            'Our approach combines technical SEO, content structure, and data-driven targeting — focused on performance, not assumptions.',
        ],
        sections: [
            {
                heading: 'What You Get',
                items: [
                    { title: 'Proven results from SEO & targeting', desc: 'Increase qualified traffic, improve conversion rates, and build long-term visibility. Every action is optimized.' },
                    { title: 'Integrated growth approach', desc: 'SEO, content, targeting, and analytics working together for faster iteration and better ROI.' },
                    { title: 'Data-driven decisions', desc: 'Strategies based on search intent, audience behavior, conversion metrics, and performance analytics.' },
                ],
            },
            {
                heading: 'How We Deliver Results',
                paragraphs: [
                    'We start by understanding your product, market, and users. From there, we build and execute a clear plan focused on growth.',
                    'Our work includes:',
                ],
                items: [
                    'Technical SEO audits and fixes',
                    'Keyword research and search intent analysis',
                    'On-page and structural SEO',
                    'Content optimization',
                    'Conversion tracking and analytics setup',
                    'Ongoing performance monitoring and improvements',
                ],
            },
            {
                heading: 'Advertising Platforms & GEO Targeting',
                paragraphs: [
                    'We work with a wide range of advertising platforms and adapt strategies based on regional availability, regulations, and audience behavior.',
                    'Supported platforms include:',
                    'We select platforms based on target country and region, product type and audience fit, budget efficiency, and platform availability or restrictions. This keeps campaigns compliant, effective, and scalable across markets.',
                ],
                items: [
                    'Meta Ads (Facebook / Instagram)',
                    'Google Ads (Search, Display, YouTube)',
                    'TikTok Ads',
                    'LinkedIn Ads',
                    'Regional ad networks (based on GEO)',
                ],
            },
            {
                heading: 'Performance You Can Measure',
                items: [
                    'Traffic growth',
                    'Conversion rate',
                    'Cost per lead / acquisition',
                    'ROI by channel',
                ],
                paragraphs: ['You always know what works, what does not, and why.'],
            },
        ],
    },
    'business-analysis': {
        slug: 'business-analysis',
        title: 'Business Analysis',
        tagline: 'Turn data into decisions that drive growth.',
        highlights: [
            { label: 'Clarity', text: 'Decisions backed by market, customer, and operational data.' },
            { label: 'Efficiency', text: 'Identify bottlenecks and optimize workflows with measurable outcomes.' },
            { label: 'Scalable', text: 'Insights and automation that grow with your data and business.' },
        ],
        intro: [
            'We provide data-driven business analysis to help organizations understand their market, optimize processes, and make informed strategic decisions.',
            'Our work focuses on clarity, efficiency, and measurable outcomes.',
        ],
        sections: [
            {
                heading: 'What We Do',
                items: [
                    { title: 'Market & Business Analysis', desc: 'Analyze your model, position, and operations to uncover opportunities and risks.' },
                ],
                paragraphs: [
                    'Includes: market and competitor research; customer segmentation and behavior analysis; process and workflow analysis; KPI definition and performance tracking.',
                ],
            },
            {
                heading: 'Strategic Planning',
                items: [
                    { title: 'Actionable strategy', desc: 'Translate insight into clear growth plans aligned to your goals.' },
                ],
                paragraphs: [
                    'Includes: growth and optimization strategies; product and service positioning; digital transformation planning; roadmaps and prioritization.',
                ],
            },
            {
                heading: 'AI-Powered Analysis & Automation',
                items: [
                    { title: 'Smarter insights with AI-driven tools', desc: 'Use AI where it adds real value to improve accuracy, speed, and scalability.' },
                ],
                paragraphs: [
                    'AI-powered solutions include: predictive analytics and trend forecasting; automated data processing and reporting; intelligent dashboards and insights generation; anomaly detection and performance monitoring; AI-assisted decision support systems.',
                ],
            },
            {
                heading: 'How It Helps Your Business',
                items: [
                    'Better, faster decision-making.',
                    'Reduced operational inefficiencies.',
                    'Improved forecasting and planning.',
                    'Data-backed strategies instead of assumptions.',
                    'Scalable insights as your data grows.',
                ],
            },
            {
                heading: 'How We Work',
                paragraphs: [
                    'We combine domain knowledge, analytics, and AI tools to deliver insights that are practical and actionable — not theoretical reports.',
                    'Our approach integrates seamlessly with your existing systems and data sources.',
                ],
            },
        ],
    },
    smm: {
        slug: 'smm',
        title: 'SMM Marketing',
        tagline: 'Build visibility and engagement across social platforms.',
        highlights: [
            { label: 'Strategic', text: 'Platform-specific plans tied to goals, audiences, and KPIs.' },
            { label: 'Consistent', text: 'Content, engagement, and optimization in one cadence.' },
            { label: 'Measured', text: 'Analytics-led iterations for steady growth.' },
        ],
        intro: [
            'We develop and manage social media strategies that strengthen brand presence, engage the right audience, and support business goals.',
            'Our approach combines content, analytics, and platform-specific tactics for consistent growth.',
        ],
        sections: [
            {
                heading: 'What We Do',
                items: [
                    { title: 'Social Media Strategy', desc: 'Goals, audiences, and content direction with platform selection, positioning, schedules, and KPIs.' },
                    { title: 'Content Creation', desc: 'Posts, stories, short-form content, visuals, copy, and campaign assets aligned to your brand.' },
                    { title: 'Community & Engagement', desc: 'Comment/message management, moderation, feedback collection, and brand voice consistency.' },
                    { title: 'Management & Optimization', desc: 'Analytics, reporting, content optimization, engagement and reach analysis, continuous improvement.' },
                ],
            },
            {
                heading: 'Platforms',
                paragraphs: [
                    'We work with major platforms and adapt per audience and GEO.',
                    'Platform selection is based on your business type, market, and regional availability.',
                ],
                items: [
                    'Instagram',
                    'Facebook',
                    'TikTok',
                    'LinkedIn',
                    'X (Twitter)',
                    'Regional platforms (where applicable)',
                ],
            },
            {
                heading: 'How It Helps Your Business',
                items: [
                    'Increased brand visibility.',
                    'Stronger audience engagement.',
                    'Consistent brand communication.',
                    'Data-driven content decisions.',
                    'Measurable growth over time.',
                ],
            },
            {
                heading: 'How We Work',
                paragraphs: [
                    'We start with analysis, build a clear content and engagement plan, execute consistently, and refine based on performance — keeping your social presence aligned with your broader digital strategy.',
                ],
            },
        ],
    },
    design: {
        slug: 'design',
        title: 'Custom UI/UX Design by Samti Tech',
        tagline: 'Design interfaces that are clear, functional, and built for real users.',
        intro: [
            'At Samti Tech, UI/UX design is not decoration — it is a problem-solving tool that improves usability, conversion, and long-term product success.',
            'Our design decisions are grounded in research, logic, and real business goals.',
            'We design for clarity, reduce friction, and make products people actually enjoy using.',
        ],
        sections: [
            {
                heading: 'Our UI/UX Design Services',
                items: [
                    { title: 'Mobile App Design', desc: 'User-friendly mobile interfaces optimized for performance, clarity, and scalability.' },
                    { title: 'Web App Design', desc: 'Structured, intuitive layouts for dashboards, platforms, and interactive systems.' },
                    { title: 'Responsive Web Design', desc: 'Consistent experience across desktop, tablet, and mobile devices.' },
                    { title: 'Functional UI', desc: 'Interfaces for internal tools, enterprise systems, and complex workflows.' },
                    { title: 'Graphic Design', desc: 'Supporting visuals, icons, and brand assets aligned with your product.' },
                    { title: '3D Design', desc: 'Product visualization, animations, or marketing where it adds real value.' },
                ],
            },
            {
                heading: 'Why Samti Tech',
                paragraphs: [
                    'Businesses need more than aesthetics — they need clarity, logic, and results. That is where Samti Tech comes in.',
                    'We believe in practical design: decisions made to reduce friction and increase efficiency.',
                    'We solve real problems with designers working closely with developers and product owners, ensuring designs are realistic and implementation-ready.',
                    'We value long-term partnerships, thinking in systems, scalability, and future growth. You own the result — files, assets, and guidelines with no lock-in.',
                    'Trust through transparency: clear communication, predictable timelines, and honest feedback at every stage.',
                ],
            },
            {
                heading: 'Our Design Process',
                steps: [
                    'Discover — define the problem, business goals, user needs, constraints, and existing data.',
                    'Explore — brainstorm, map user journeys, information architecture, and early concepts to pick the best direction.',
                    'Create — build user flows, wireframes, layouts, and visual styles aligned with your brand; iterate with feedback.',
                    'Build (Design → Development) — documentation, UI components, assets, and QA with developers for a smooth handoff.',
                ],
            },
            {
                heading: 'Design Capabilities',
                items: [
                    'User research',
                    'Market research',
                    'User journeys',
                    'User / job stories',
                    'Storyboarding',
                    'Information architecture',
                    'Prototyping',
                    'Usability testing',
                    'A/B testing',
                ],
                paragraphs: ['Flexible design processes for every project. We focus on delivering maximum value, not unnecessary documentation.'],
            },
        ],
    },
};

const ServicePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const slug = window.appSettings?.serviceSlug || 'web-development';
    const lang = window.appSettings?.lang || 'en';
    const service = serviceData[slug] || serviceData['web-development'];
    const designCapabilities = slug === 'design'
        ? service.sections.find((section) => section.heading === 'Design Capabilities')
        : null;
    const otherServices = Object.values(serviceData).filter((svc) => svc.slug !== (service?.slug || slug));
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

    useEffect(() => {
        const body = document.body;
        if (isFormVisible) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
        return () => body.classList.remove('no-scroll');
    }, [isFormVisible]);

    const openForm = (pkg) => {
        const pending = { serviceSlug: slug };
        if (pkg) {
            pending.budget = `Package: ${pkg.name} (${pkg.price})`;
        }
        setPendingForm(pending);
        window.dispatchEvent(new CustomEvent('openLeadForm'));
        setIsFormVisible(true);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section className="section service-detail">
                <div className="container container__medium service-detail__hero">
                    <div className="service-detail__header-row">
                        <div className="service-detail__back">
                            <a className="link-back" href={`/${lang}`}>Return to main page</a>
                        </div>
                        <div className="service-detail__nav">
                            {otherServices.map((svc) => (
                                <a key={svc.slug} href={`/${lang}/services/${svc.slug}`} className="service-detail__nav-link">
                                    {svc.title}
                                </a>
                            ))}
                        </div>
                    </div>
                    <h1 className="section__title">
                        <div className="section__title--text">{service.title}</div>
                    </h1>
                    <div className="service-detail__hero-grid">
                        <div className="service-detail__intro-group">
                            <div className="service-detail__tagline">{service.tagline}</div>
                            <div className="service-detail__intro">
                                {service.intro.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {service.highlights && (
                                <div className="service-detail__highlights">
                                    {service.highlights.map((item) => (
                                        <div className="service-detail__highlight" key={item.label}>
                                            <div className="service-detail__pill">{item.label}</div>
                                            <div className="service-detail__highlight-text">{item.text}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="service-detail__cta-panel">
                            <div className="service-detail__cta-title">Let’s build together</div>
                            <p className="service-detail__cta-text">Share your goals, timeline, and budget. We respond with a lean plan, no pressure.</p>
                            <ul className="service-detail__cta-points">
                                <li>Fast discovery call</li>
                                <li>Clear scope + roadmap</li>
                                <li>Direct chat with the team</li>
                            </ul>
                            <button className="cta" onClick={() => openForm()}>Start a project</button>
                            <div className="service-detail__cta-note">No spam. We only reach out to schedule the first conversation.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section service-detail__body">
                <div className="container container__medium service-detail__stack">
                    {service.sections.map((section) => {
                        if (slug === 'design' && section.heading === 'Our Design Process') {
                            return (
                                <div className="service-detail__design-flow" key="design-flow">
                                    <div className="service-detail__process service-detail__process--compact">
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
                                    {designCapabilities && (
                                        <div className="service-detail__block service-detail__block--flush">
                                            <div className="service-detail__card-title">// {designCapabilities.heading}</div>
                                            <ul className="service-detail__list service-detail__list--grid service-detail__list--dense service-detail__list--capabilities">
                                                {designCapabilities.items?.map((item) => (
                                                    <li key={item}>
                                                        <div className="service-detail__item-title">{item}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                            {designCapabilities.paragraphs && (
                                                <div className="service-detail__paragraphs">
                                                    {designCapabilities.paragraphs.map((text, idx) => (
                                                        <p key={idx}>{text}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        if (slug === 'design' && section.heading === 'Design Capabilities') {
                            return null;
                        }

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
                                    <ul className={`service-detail__list service-detail__list--grid ${section.heading === 'Challenges We Solve' ? 'service-detail__list--muted' : ''}`}>
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
                    {service.packages?.length ? (
                        <>
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
                        </>
                    ) : (
                        <div className="service-detail__note">Tell us about your product and we will tailor a design plan for you.</div>
                    )}
                </div>
            </section>

            <Suspense fallback={null}>
                <FloatingButton onClick={() => openForm()} onScrollTop={scrollToTop} />
            </Suspense>

            {isFormVisible && (
                <Suspense fallback={null}>
                    <LeadForm afterSubmit={() => setIsFormVisible(false)} />
                </Suspense>
            )}
        </>
    );
};

export default ServicePage;
