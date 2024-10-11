import React, { useEffect, useState, useRef, useCallback } from 'react';

const SparklingBackground = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const svgRefs = useRef([]);
    const pathRefs = useRef([]);
    const animationTimeoutRef = useRef(null);

    const svgData = [
        { id: 'starSvg1', viewBox: "0 0 42 46" },
        { id: 'starSvg2', viewBox: "0 0 40 40" },
        { id: 'starSvg3', viewBox: "0 0 56 56" },
        { id: 'starSvg4', viewBox: "0 0 37 37" },
        { id: 'starSvg5', viewBox: "0 0 73 74" },
        { id: 'starSvg6', viewBox: "0 0 37 47" },
        { id: 'starSvg7', viewBox: "0 0 51 37" },
        { id: 'starSvg8', viewBox: "0 0 58 58" },
        { id: 'starSvg9', viewBox: "0 0 62 43" },
        { id: 'starSvg10', viewBox: "0 0 48 66" }
    ];

    useEffect(() => {
        svgRefs.current = svgRefs.current.slice(0, svgData.length);
        pathRefs.current = pathRefs.current.map(refs => refs.slice(0, refs.length));

        pathRefs.current.forEach((paths, svgIndex) => {
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                // path.style.stroke = 'url(#gradient)';
            });
        });

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    const animateSvgGroup = useCallback(() => {
        svgRefs.current.forEach(svg => {
            if (svg) {
                svg.style.opacity = '0';
                svg.style.transform = isMobile ? 'translateY(0) scale(1)' : 'scale(1) translate(0px, 0px)';
            }
        });

        const numberOfSvgsToAnimate = Math.floor(Math.random() * 3) + 2;
        const selectedIndices = new Set();

        while (selectedIndices.size < numberOfSvgsToAnimate) {
            const randomIndex = Math.floor(Math.random() * svgData.length);
            selectedIndices.add(randomIndex);
        }

        Array.from(selectedIndices).forEach(index => {
            const svg = svgRefs.current[index];
            if (svg) {
                const randomDelay = Math.random() * 1000 + 1000;

                setTimeout(() => {
                    svg.style.opacity = '1';
                    svg.style.animation = 'none';

                    requestAnimationFrame(() => {
                        if (isMobile) {
                            svg.style.animation = 'fallDown 9s ease-in-out forwards';
                            const randomX = Math.random() * (window.innerWidth - svg.clientWidth);
                            svg.style.left = `${randomX}px`;
                        } else {
                            svg.style.animation = 'fadeAndMove 9s ease-in-out forwards';
                            const translateX = Math.random() * 25 + 5;
                            const translateY = Math.random() * 15 + 5;
                            svg.style.setProperty('--translate-x', `${translateX}px`);
                            svg.style.setProperty('--translate-y', `${translateY}px`);
                        }
                    });

                    pathRefs.current[index].forEach(path => {
                        path.style.animation = 'moveDashes 90000ms linear infinite';
                    });
                }, randomDelay);
            }
        });

        animationTimeoutRef.current = setTimeout(() => {
            Array.from(selectedIndices).forEach(index => {
                const svg = svgRefs.current[index];
                if (svg) {
                    svg.style.opacity = '0';
                }
            });
            animateSvgGroup();
        }, 9000);
    }, [isMobile]);

    useEffect(() => {
        animateSvgGroup();
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [animateSvgGroup]);

    return (
        <div className="sparkle">
            <svg ref={el => svgRefs.current[0] = el} class="star-svg" id="starSvg1" width="42" height="46" viewBox="0 0 42 46" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_997_3367)">
                    <path
                        d="M13.9 21.5L13.9501 20.9989C13.9799 20.7012 14.1994 20.4557 14.4915 20.3908V20.3908C20.0072 19.1651 25.8015 19.6535 31.0261 21.8049V21.8049C31.3075 21.9207 31.4798 22.2072 31.4502 22.51L31.4024 23M13.9 21.5V21.5C19.2442 23.1494 24.8679 23.695 30.4295 23.1035L31.4024 23M13.9 21.5L13.45 26M31.4024 23L30.9146 28M30.9146 28L30.0428 28.0926C24.4244 28.6894 18.7443 27.973 13.45 26V26M30.9146 28L30.4756 32.5M13.45 26L12.95 31M30.4756 32.5V32.5C24.6128 33.4798 18.5589 32.968 12.95 31V31M30.4756 32.5L29.9878 37.5M12.95 31L12.475 35.75M29.9878 37.5L29.5716 41.7665C29.5299 42.194 29.1931 42.5341 28.7662 42.5815V42.5815C23.3356 43.1849 17.8239 42.5555 12.6714 40.737V40.737C12.2773 40.5979 12.0293 40.2074 12.0708 39.7915L12.475 35.75M29.9878 37.5V37.5C24.1022 38.4823 18.0506 37.8756 12.475 35.75V35.75"
                        stroke="url(#gradient1)"
                        ref={el => {
                            if (!pathRefs.current[0]) pathRefs.current[0] = [];
                            pathRefs.current[0][0] = el;
                        }} />
                    <path
                        d="M8.5 25.5L6.81072 24.8665C5.34914 24.3184 4.21322 23.1397 3.7196 21.6588V21.6588C3.26107 20.2832 3.40093 18.7783 4.10511 17.5108L4.32679 17.1118C5.08139 15.7535 6.31774 14.7274 7.79182 14.2361L8.5 14M13 15.5L12.215 15.029C11.0928 14.3557 9.8087 14 8.5 14V14M8.5 14L8.5 12.2771C8.5 11.4298 8.61809 10.5867 8.85086 9.772V9.772C9.27659 8.28194 10.075 6.92496 11.1708 5.82916L11.5 5.5L12.7018 4.53858C13.5626 3.84995 14.5201 3.29195 15.5436 2.88255V2.88255C16.1799 2.62805 16.8381 2.43238 17.51 2.29799L18.1676 2.16649C18.7212 2.05577 19.2844 2 19.8489 2V2C20.9396 2 22.0203 2.20812 23.033 2.61319L24 3L24.7351 3.36754C25.5729 3.78644 26.3377 4.33767 27 5V5C27.6623 5.66233 28.2136 6.42712 28.6325 7.26491L29 8L29.4299 8.85982C29.8083 9.61656 30.0841 10.4204 30.25 11.25V11.25M29 17.5L29.5525 16.5792C30.1725 15.5458 30.5 14.3634 30.5 13.1584V13.1584C30.5 12.7205 30.4568 12.2838 30.3709 11.8544L30.25 11.25M30.25 11.25L31.1495 11.1215C31.7144 11.0408 32.287 11.0287 32.8549 11.0855L32.9224 11.0922C33.9602 11.196 34.9601 11.5375 35.8445 12.0903L35.9759 12.1724C36.3242 12.3901 36.6466 12.6466 36.9371 12.9371V12.9371C37.6326 13.6326 38.126 14.5041 38.3646 15.4583L38.5 16L38.7283 17.1416C38.9072 18.036 38.8852 18.959 38.664 19.8439V19.8439C38.555 20.28 38.3986 20.7028 38.1976 21.1049L37.5 22.5M37.5 22.5V22.5C37.1712 22.1712 36.7703 21.9234 36.3292 21.7764L35.5 21.5M37.5 22.5V22.5C37.8272 22.8272 38.0593 23.2371 38.1715 23.686L38.2628 24.0512C38.4185 24.6741 38.4185 25.3259 38.2628 25.9488L38.18 26.2799C38.0622 26.7511 37.8186 27.1814 37.4751 27.5249V27.5249C36.8632 28.1368 35.9934 28.4156 35.1397 28.2733L33.5 28"
                        stroke="url(#gradient1)" stroke-linecap="round"
                        ref={el => {
                            if (!pathRefs.current[0]) pathRefs.current[0] = [];
                            pathRefs.current[0][1] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_997_3367">
                        <rect width="36.8021" height="41.6627" fill="white" transform="translate(4.82709) rotate(5.57324)" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[1] = el} class="star-svg" id="starSvg2" width="40" height="40" viewBox="0 0 40 40" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1013_3405)">
                    <path
                        d="M20.9044 34.1773C29.2337 34.1773 35.9859 27.4251 35.9859 19.0958C35.9859 10.7666 29.2337 4.0144 20.9044 4.0144C12.5751 4.0144 5.82281 10.7666 5.82281 19.0958C5.82281 27.4251 12.5751 34.1773 20.9044 34.1773Z"
                        stroke="url(#gradient2)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[1]) pathRefs.current[1] = [];
                            pathRefs.current[1][0] = el;
                        }} />
                    <path
                        d="M4.36562 26.4394L1 39L13.5607 35.6344C20.2027 38.5816 28.2544 37.337 33.6999 31.8912C40.7667 24.8245 40.7667 13.3668 33.6999 6.30004C26.6331 -0.766681 15.1753 -0.766681 8.10852 6.30004C2.66273 11.7461 1.41839 19.7975 4.36562 26.4394Z"
                        stroke="url(#gradient2)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[1]) pathRefs.current[1] = [];
                            pathRefs.current[1][1] = el;
                        }} />
                    <path
                        d="M30.2961 14.8172C26.0506 20.283 21.6172 24.6107 17.1541 27.959C14.6597 29.8305 9.47937 25.927 10.7616 24.6447L14.8375 20.5689C15.2553 20.1511 15.9324 20.1511 16.3502 20.5689C16.8674 21.086 17.5754 21.6571 17.6586 22.8692C20.2448 21.022 22.5668 18.6997 24.6253 15.9025C23.4138 15.8194 22.8412 15.1107 22.3249 14.5942C21.9072 14.1764 21.9072 13.4993 22.3249 13.0815L26.7692 8.63732C28.4048 7.00169 31.8657 12.7963 30.2961 14.8172Z"
                        stroke="url(#gradient2)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[1]) pathRefs.current[1] = [];
                            pathRefs.current[1][2] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_1013_3405">
                        <rect width="40" height="40" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[2] = el} class="star-svg" id="starSvg3" width="56" height="56" viewBox="0 0 56 56" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                </defs>
                <path
                    d="M8.49999 29L6.59499 27.64C6.16875 27.3357 5.87887 26.8764 5.78762 26.3607C5.69637 25.845 5.81104 25.3141 6.10699 24.882L10.347 18.684C10.4972 18.4643 10.6898 18.2768 10.9134 18.1325C11.1371 17.9882 11.3873 17.89 11.6493 17.8436C11.9114 17.7972 12.1801 17.8036 12.4397 17.8624C12.6993 17.9212 12.9445 18.0312 13.161 18.186L15 19.5M47.5 25L49.405 26.36C49.8312 26.6643 50.1211 27.1236 50.2124 27.6393C50.3036 28.155 50.1889 28.6859 49.893 29.118L45.653 35.316C45.5028 35.5357 45.3102 35.7232 45.0865 35.8675C44.8629 36.0118 44.6127 36.11 44.3507 36.1564C44.0886 36.2028 43.8199 36.1964 43.5603 36.1376C43.3007 36.0788 43.0555 35.9688 42.839 35.814L41 34.5M34.5 45.5L35.598 46.379C35.9829 46.687 36.2405 47.1263 36.3214 47.6127C36.4022 48.099 36.3006 48.598 36.036 49.014L33.5 53M20.5 9.5L19.402 8.621C19.0171 8.31299 18.7595 7.87366 18.6786 7.38734C18.5978 6.90102 18.6994 6.40198 18.964 5.986L21.5 2"
                    stroke="url(#gradient3)" stroke-linecap="round"
                    ref={el => {
                        if (!pathRefs.current[2]) pathRefs.current[2] = [];
                        pathRefs.current[2][0] = el;
                    }} />
                <path
                    d="M25.98 7.22195L46.81 21.0489C46.9204 21.1223 46.9972 21.2365 47.0235 21.3665C47.0497 21.4964 47.0233 21.6315 46.95 21.7419L43.244 27.3239C43.1707 27.4344 43.0564 27.5112 42.9265 27.5374C42.7965 27.5637 42.6615 27.5373 42.551 27.4639L21.722 13.6369C21.6672 13.6006 21.62 13.5538 21.5833 13.4993C21.5466 13.4447 21.521 13.3835 21.508 13.319C21.495 13.2545 21.4948 13.1881 21.5075 13.1236C21.5202 13.0591 21.5455 12.9977 21.582 12.9429L25.288 7.36195C25.3613 7.2515 25.4756 7.17471 25.6055 7.14845C25.7355 7.1222 25.8705 7.14863 25.981 7.22195H25.98ZM19.675 16.9699L40.502 30.7969C40.6124 30.8703 40.6892 30.9845 40.7155 31.1145C40.7417 31.2444 40.7153 31.3795 40.642 31.4899L36.937 37.0719C36.8637 37.1824 36.7494 37.2592 36.6195 37.2854C36.4895 37.3117 36.3545 37.2853 36.244 37.2119L15.416 23.3849C15.3612 23.3486 15.314 23.3018 15.2773 23.2473C15.2406 23.1927 15.215 23.1315 15.202 23.067C15.189 23.0025 15.1888 22.9361 15.2015 22.8716C15.2142 22.8071 15.2395 22.7457 15.276 22.6909L18.982 17.1099C19.0553 16.9995 19.1696 16.9227 19.2995 16.8965C19.4295 16.8702 19.5645 16.8966 19.675 16.9699ZM13.369 26.9699L34.196 40.7969C34.3064 40.8703 34.3832 40.9845 34.4095 41.1145C34.4357 41.2444 34.4093 41.3795 34.336 41.4899L30.631 47.0719C30.5947 47.1268 30.5479 47.1739 30.4933 47.2106C30.4388 47.2473 30.3775 47.2729 30.313 47.2859C30.2486 47.2989 30.1822 47.2991 30.1176 47.2864C30.0531 47.2737 29.9917 47.2484 29.937 47.2119L9.11 33.3849C9.05517 33.3486 9.00805 33.3018 8.97133 33.2473C8.93461 33.1927 8.90902 33.1315 8.89601 33.067C8.88301 33.0025 8.88285 32.9361 8.89554 32.8716C8.90824 32.8071 8.93354 32.7457 8.97 32.6909L12.675 27.1099C12.7113 27.0551 12.7581 27.008 12.8127 26.9713C12.8672 26.9346 12.9285 26.909 12.9929 26.896C13.0574 26.883 13.1238 26.8828 13.1883 26.8955C13.2529 26.9082 13.3143 26.9335 13.369 26.9699Z"
                    stroke="url(#gradient3)"
                    ref={el => {
                        if (!pathRefs.current[2]) pathRefs.current[2] = [];
                        pathRefs.current[2][1] = el;
                    }} />
            </svg>

            <svg ref={el => svgRefs.current[3] = el} class="star-svg" id="starSvg4" width="37" height="37" viewBox="0 0 37 37" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_997_3388)">
                    <path d="M5 7.5V7.5C11.9789 16.0298 25.0211 16.0298 32 7.5V7.5" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[3]) pathRefs.current[3] = [];
                            pathRefs.current[3][0] = el;
                        }} />
                    <path d="M5 30V30C11.9789 21.4702 25.0211 21.4702 32 30V30" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[3]) pathRefs.current[3] = [];
                            pathRefs.current[3][1] = el;
                        }} />
                    <path d="M18.5 1V1C31.4245 8.52451 31.9931 26.9892 19.5561 35.2947L18.5 36" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[3]) pathRefs.current[3] = [];
                            pathRefs.current[3][2] = el;
                        }} />
                    <path d="M19 1V1C6.07554 8.52451 5.50692 26.9892 17.9439 35.2947L19 36" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[3]) pathRefs.current[3] = [];
                            pathRefs.current[3][3] = el;
                        }} />
                    <path d="M1 18.5H36" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[3]) pathRefs.current[3] = [];
                            pathRefs.current[3][4] = el;
                        }} />
                    <path
                        d="M18.5 36C28.165 36 36 28.165 36 18.5C36 8.83501 28.165 1 18.5 1C8.83502 1 1 8.83501 1 18.5C1 28.165 8.83502 36 18.5 36Z"
                        stroke="url(#gradient4)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[4]) pathRefs.current[4] = [];
                            pathRefs.current[3][5] = el;
                        }} />
                    <path d="M18.5 1V36" stroke="url(#gradient4)"
                        ref={el => {
                            if (!pathRefs.current[4]) pathRefs.current[4] = [];
                            pathRefs.current[3][6] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_997_3388">
                        <rect width="37" height="37" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[4] = el} class="star-svg" id="starSvg5" width="73" height="74" viewBox="0 0 73 74" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_997_3333)">
                    <path
                        d="M55.5 52L53.5523 50.3305C52.5303 49.4545 51.7163 48.3618 51.1696 47.1317V47.1317C50.4086 45.4195 50.1973 43.5134 50.5648 41.676L50.7036 40.9819C50.9003 39.9984 51.2273 39.0454 51.6759 38.1483L53 35.5L55.5 31L57.0806 27.8389C57.3596 27.2808 57.5863 26.6981 57.7577 26.0982L57.9432 25.4487C58.308 24.1721 58.3305 22.8219 58.0085 21.5338V21.5338C57.6757 20.203 56.9876 18.9876 56.0176 18.0176L55.5301 17.5301C54.5133 16.5133 53.3844 15.6152 52.165 14.8531L51.2617 14.2886C50.4243 13.7652 49.5207 13.3562 48.5749 13.0725L48.2214 12.9664C46.1316 12.3395 43.8938 12.4148 41.8509 13.1809V13.1809C41.2848 13.3932 40.7392 13.6565 40.2208 13.9675L39.7127 14.2724C38.9073 14.7556 38.1642 15.3358 37.5 16V16M37.5 16V16C31.7125 12.6929 24.339 14.7306 21.0711 20.5403L10.3653 39.5727C7.1271 45.3296 9.17345 52.6217 14.9341 55.8533V55.8533C20.549 59.0031 27.65 57.1385 30.9931 51.6364L42.2646 33.0853C45.9114 27.0833 43.7265 19.2486 37.5 16V16Z"
                        stroke="url(#gradient5)" stroke-linecap="round"
                        ref={el => {
                            if (!pathRefs.current[4]) pathRefs.current[4] = [];
                            pathRefs.current[4][0] = el;
                        }} />
                    <path d="M35 21L29.5 30.5" stroke="url(#gradient5)" stroke-linecap="round"
                        ref={el => {
                            if (!pathRefs.current[4]) pathRefs.current[4] = [];
                            pathRefs.current[4][1] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_997_3333">
                        <rect width="51" height="56" fill="white" transform="translate(28) rotate(30)" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[5] = el} class="star-svg" id="starSvg6" width="37" height="47" viewBox="0 0 37 47" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                </defs>
                <path
                    d="M10.5 1H34C35.1046 1 36 1.89543 36 3V43C36 44.1046 35.1046 45 34 45H3.5C2.39543 45 1.5 44.1046 1.5 43V9M10.5 1L1.5 9M10.5 1V9H1.5"
                    stroke="url(#gradient6)"
                    ref={el => {
                        if (!pathRefs.current[5]) pathRefs.current[5] = [];
                        pathRefs.current[5][0] = el;
                    }} />
                <path d="M26 27.5L27 25.3571M27 25.3571L29.5 20L33 27.5M27 25.3571H29" stroke="url(#gradient6)" stroke-linecap="round"
                    stroke-linejoin="round"
                    ref={el => {
                        if (!pathRefs.current[5]) pathRefs.current[5] = [];
                        pathRefs.current[5][1] = el;
                    }} />
                <path d="M20.5 20H23M25.5 20H23M23 20V27.5" stroke="url(#gradient6)" stroke-linecap="round" stroke-linejoin="round"
                    ref={el => {
                        if (!pathRefs.current[5]) pathRefs.current[5] = [];
                        pathRefs.current[5][2] = el;
                    }} />
                <path d="M13 27.5L14 25.3571M14 25.3571L16.5 20L20 27.5M14 25.3571H16" stroke="url(#gradient6)" stroke-linecap="round"
                    stroke-linejoin="round"
                    ref={el => {
                        if (!pathRefs.current[5]) pathRefs.current[5] = [];
                        pathRefs.current[5][3] = el;
                    }} />
                <path
                    d="M6.5 27.0453V20.4122C6.5 20.1846 6.68456 20 6.91223 20H8.44842C8.48249 20 8.51625 20.0065 8.54789 20.0192L8.70456 20.0818C12.0975 21.439 11.9914 26.278 8.54228 27.4852C8.5143 27.495 8.48485 27.5 8.4552 27.5H6.95466C6.70356 27.5 6.5 27.2964 6.5 27.0453Z"
                    stroke="url(#gradient6)"
                    ref={el => {
                        if (!pathRefs.current[5]) pathRefs.current[5] = [];
                        pathRefs.current[5][4] = el;
                    }} />
            </svg>

            <svg ref={el => svgRefs.current[6] = el} class="star-svg" id="starSvg7" width="51" height="37" viewBox="0 0 51 37" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_997_3328)">
                    <path d="M31 17L39 22L31 27.5" stroke="url(#gradient7)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[6]) pathRefs.current[6] = [];
                            pathRefs.current[6][0] = el;
                        }} />
                    <path d="M29 13L23.5 31.5" stroke="url(#gradient7)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[6]) pathRefs.current[6] = [];
                            pathRefs.current[6][1] = el;
                        }} />
                    <path d="M21.5 16.5L13.5 21.5L21.5 27" stroke="url(#gradient7)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[6]) pathRefs.current[6] = [];
                            pathRefs.current[6][2] = el;
                        }} />
                    <path
                        d="M11 18.5H10.5462C9.51926 18.5 8.49624 18.6259 7.5 18.875V18.875M7.5 18.875V18.875C7.16766 18.9581 6.84542 19.0773 6.53902 19.2305L6.45098 19.2745C6.15094 19.4245 5.865 19.6013 5.59663 19.8025L5.23783 20.0716C4.42038 20.6847 3.72965 21.4506 3.20393 22.3268V22.3268C2.73811 23.1031 2.40924 23.9538 2.23168 24.8416L2.18187 25.0907C2.06092 25.6954 2 26.3106 2 26.9273V27.0727C2 27.6894 2.06092 28.3046 2.18187 28.9093V28.9093C2.39239 29.9619 2.78231 30.9705 3.3346 31.891L3.50123 32.1687C3.83249 32.7208 4.23022 33.2302 4.68549 33.6855V33.6855C5.54995 34.55 6.61223 35.2041 7.77202 35.5907V35.5907C8.58149 35.8605 9.435 36 10.2882 36H45.3374C45.7732 36 46.2029 35.8986 46.5926 35.7037V35.7037C46.8624 35.5688 47.1087 35.3913 47.3221 35.1779L47.6858 34.8142C47.8948 34.6052 48.0825 34.3762 48.2464 34.1303V34.1303C48.7378 33.3933 49 32.5273 49 31.6415V31V30.5996C49 29.8713 48.8826 29.1478 48.6523 28.4568V28.4568C48.5509 28.1527 48.428 27.8561 48.2846 27.5693L48 27M7.5 18.875L7.11898 16.6841C7.03981 16.2289 7 15.7677 7 15.3056V15.0996C7 14.3713 7.11741 13.6478 7.34772 12.9568V12.9568C7.44911 12.6527 7.57197 12.3561 7.71536 12.0693L8 11.5L8.33047 10.6738C8.77562 9.56095 9.33513 8.4973 10 7.5V7.5V7.5C10.6601 6.5098 11.5098 5.66013 12.5 5V5L14 4L14.5858 3.70711C15.5274 3.2363 16.5013 2.83291 17.5 2.5V2.5L17.577 2.47434C18.5195 2.16017 19.5065 2 20.5 2V2H22V2C22.9962 2 23.9887 2.12218 24.9552 2.3638L25.5 2.5L28 3.5L28.7495 3.87476C29.5815 4.29074 30.3743 4.78075 31.1185 5.33885L31.2909 5.46819C31.763 5.82228 32.2094 6.20944 32.6267 6.62675V6.62675C33.2075 7.2075 33.7295 7.84419 34.185 8.52755L34.5 9L35.5 10.5L36 11.5M36.5 15.5V14.5V14.5C36.5 13.5065 36.3398 12.5195 36.0257 11.577L36 11.5M36 11.5L36.3216 11.3928C37.1021 11.1326 37.9194 11 38.7421 11V11C39.2461 11 39.7489 11.0498 40.2432 11.1486L42 11.5L43.0325 11.8442C43.3438 11.9479 43.6473 12.0736 43.9408 12.2204V12.2204C44.3128 12.4064 44.6674 12.6256 45.0002 12.8751L45.2739 13.0804C46.0872 13.6904 46.8096 14.4128 47.4196 15.2261V15.2261C47.8057 15.741 48.1448 16.2896 48.4326 16.8652L48.5 17L48.5654 17.1308C48.8543 17.7085 49.079 18.3161 49.2357 18.9427V18.9427C49.4112 19.6449 49.5 20.366 49.5 21.0898V21.196C49.5 21.7311 49.4558 22.2653 49.3678 22.7931L49.1838 23.8972C49.062 24.6283 48.8315 25.3371 48.5 26V26L48 27M48 27V27C47.3424 26.3424 46.5407 25.8469 45.6584 25.5528L45.5 25.5"
                        stroke="url(#gradient7)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[6]) pathRefs.current[6] = [];
                            pathRefs.current[6][3] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_997_3328">
                        <rect width="50" height="36" fill="white" transform="translate(0.806885 0.857178)" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[7] = el} class="star-svg" id="starSvg8" width="58" height="58" viewBox="0 0 58 58" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1015_15)">
                    <path
                        d="M11.1034 48.9518C6.09466 47.9782 2.82331 43.1283 3.79692 38.1195L9.04829 11.1035C10.0219 6.09472 14.8719 2.82337 19.8807 3.79698L46.8966 9.04835C51.9054 10.022 55.1768 14.8719 54.2031 19.8807L48.9518 46.8967C47.9782 51.9055 43.1282 55.1768 38.1194 54.2032L11.1034 48.9518Z"
                        stroke="url(#gradient8)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[7]) pathRefs.current[7] = [];
                            pathRefs.current[7][0] = el;
                        }} />
                    <path
                        d="M12.4816 45.4135C9.13092 44.7622 6.94253 41.5177 7.59384 38.167L12.6325 12.2453C13.2838 8.89464 16.5282 6.70624 19.8789 7.35755L45.5643 12.3503C48.915 13.0016 51.1034 16.246 50.4521 19.5967L45.4134 45.5184C44.7621 48.8691 41.5177 51.0575 38.167 50.4062L12.4816 45.4135Z"
                        stroke="url(#gradient8)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[7]) pathRefs.current[7] = [];
                            pathRefs.current[7][1] = el;
                        }} />
                    <path
                        d="M26.8043 40.296C33.1081 41.5213 39.2117 37.4044 40.437 31.1006C41.6624 24.7968 37.5454 18.6933 31.2416 17.4679C24.9378 16.2426 18.8343 20.3595 17.609 26.6633C16.3836 32.9671 20.5005 39.0707 26.8043 40.296Z"
                        stroke="url(#gradient8)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[7]) pathRefs.current[7] = [];
                            pathRefs.current[7][2] = el;
                        }} />
                    <path
                        d="M35.8735 31.4079C37.2638 27.6331 35.3307 23.446 31.5559 22.0558C27.7812 20.6656 23.5941 22.5987 22.2039 26.3735C20.8137 30.1482 22.7467 34.3352 26.5215 35.7255C30.2963 37.1157 34.4833 35.1826 35.8735 31.4079Z"
                        stroke="url(#gradient8)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[7]) pathRefs.current[7] = [];
                            pathRefs.current[7][3] = el;
                        }} />
                    <path
                        d="M45.4306 17.5502C47.1548 20.1064 46.1758 23.782 45.0643 24.5314C43.953 25.2813 43.1297 22.8213 41.4056 20.2648C39.6816 17.7083 37.709 16.0241 38.8202 15.2743C39.9318 14.5248 43.7065 14.9941 45.4306 17.5502Z"
                        stroke="url(#gradient8)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[7]) pathRefs.current[7] = [];
                            pathRefs.current[7][4] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_1015_15">
                        <rect width="48" height="48" fill="white" transform="translate(10.0204 0.861572) rotate(11)" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[8] = el} class="star-svg" id="starSvg9" width="62" height="43" viewBox="0 0 62 43" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1015_37)">
                    <path
                        d="M34.5503 14.0503L37.136 11.4645C37.9171 10.6834 37.9171 9.41709 37.136 8.63604L32.9645 4.46446C32.1834 3.68342 30.9171 3.68342 30.136 4.46447L28.4243 6.17622C27.8886 6.71189 26.5575 6.89641 25.8388 6.65685V3C25.8388 1.89543 24.9434 1 23.8388 1L17.9393 1C16.8348 1 15.9393 1.89543 15.9393 3L15.9393 5.42079C15.9393 6.17833 14.8771 6.84238 14.1995 7.18116L11.6137 4.59538C10.8327 3.81433 9.56634 3.81433 8.78529 4.59538L4.61372 8.76695C3.83267 9.548 3.83267 10.8143 4.61372 11.5954L6.32547 13.3071C6.86114 13.8428 6.89641 15.16 6.65685 15.8787H3C1.89543 15.8787 1 16.7741 1 17.8787L1 23.7782C1 24.8827 1.89543 25.7782 3 25.7782H5.42079C6.17833 25.7782 6.71147 27.3727 7.05025 28.0503L4.46447 30.636C3.68342 31.4171 3.68342 32.6834 4.46447 33.4645L8.63604 37.636C9.41709 38.4171 10.6834 38.4171 11.4645 37.636L13.1762 35.9243C13.7119 35.3886 15.1696 35.8075 15.8883 36.0471V39.704C15.8883 40.8085 16.7837 41.7039 17.8883 41.7039H23.7878C24.8924 41.7039 25.7878 40.8085 25.7878 39.7039V37.2832C25.7878 36.5256 26.8727 35.6788 27.5502 35.34L30.4445 38.1945C31.2256 38.9756 32.4919 38.9756 33.273 38.1945L37.4445 34.023C38.2256 33.2419 38.2256 31.9756 37.4445 31.1945L35.0502 28.5503"
                        stroke="url(#gradient9)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[8]) pathRefs.current[8] = [];
                            pathRefs.current[8][0] = el;
                        }} />
                    <path
                        d="M24.0497 20.125H55.0527M61.0503 20C61.0503 21.6569 59.7071 23 58.0503 23C56.3934 23 55.0502 21.6569 55.0502 20C55.0502 18.3431 56.3934 17 58.0503 17C59.7071 17 61.0503 18.3431 61.0503 20ZM24.0503 20.5C24.0503 22.433 22.4833 24 20.5503 24C18.6172 24 17.0502 22.433 17.0502 20.5C17.0502 18.567 18.6172 17 20.5503 17C22.4833 17 24.0503 18.567 24.0503 20.5Z"
                        stroke="url(#gradient9)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[8]) pathRefs.current[8] = [];
                            pathRefs.current[8][1] = el;
                        }} />
                    <path
                        d="M45.6943 15.8575L44.636 16.9142C44.2609 17.2893 43.7522 17.5 43.2218 17.5H32.1206C31.4519 17.5 30.8274 17.1658 30.4565 16.6094C28.7467 13.1285 24.6901 10 20.5502 10C14.7512 10 10.0502 14.701 10.0502 20.5C10.0502 26.299 14.7512 31 20.5502 31C24.6901 31 28.762 27.6097 30.4717 24.1289C30.8058 23.4385 31.5052 23 32.2721 23H42.579C43.2195 23 43.8213 23.3068 44.1976 23.8252L45.5502 25.3411M51.0503 14C51.0503 15.6569 49.7071 17 48.0503 17C46.3934 17 45.0502 15.6569 45.0502 14C45.0502 12.3431 46.3934 11 48.0503 11C49.7071 11 51.0503 12.3431 51.0503 14ZM51.0503 27C51.0503 28.6569 49.7071 30 48.0503 30C46.3934 30 45.0502 28.6569 45.0502 27C45.0502 25.3431 46.3934 24 48.0503 24C49.7071 24 51.0503 25.3431 51.0503 27Z"
                        stroke="url(#gradient9)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[8]) pathRefs.current[8] = [];
                            pathRefs.current[8][2] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_1015_37">
                        <rect width="62" height="43" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <svg ref={el => svgRefs.current[9] = el} class="star-svg" id="starSvg10" width="48" height="66" viewBox="0 0 48 66" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1015_42)">
                    <path
                        d="M23.0455 15.137L21.2114 14.3393C20.1985 13.8987 19.0202 14.3627 18.5797 15.3756L2.227 52.9734C1.78644 53.9863 2.25043 55.1645 3.26334 55.6051L22.0622 63.7814C23.0751 64.222 24.2534 63.758 24.6939 62.7451L41.0466 25.1474C41.4872 24.1344 41.0232 22.9562 40.0103 22.5156L38.1762 21.7179M23.0455 15.137L27.4328 5.04978C27.8733 4.03687 29.0516 3.57288 30.0645 4.01344L41.5272 8.99901C42.5401 9.43957 43.0041 10.6178 42.5636 11.6307L38.1762 21.7179M23.0455 15.137L38.1762 21.7179"
                        stroke="url(#gradient10)" stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[9]) pathRefs.current[9] = [];
                            pathRefs.current[9][0] = el;
                        }} />
                    <path d="M27.3322 11.5489L28.7281 8.33936L32.3962 9.93474L31.0003 13.1443L27.3322 11.5489Z" stroke="url(#gradient10)"
                        stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[9]) pathRefs.current[9] = [];
                            pathRefs.current[9][1] = el;
                        }} />
                    <path d="M34.2099 14.5403L35.6058 11.3307L39.2739 12.9261L37.8779 16.1356L34.2099 14.5403Z" stroke="url(#gradient10)"
                        stroke-linecap="round" stroke-linejoin="round"
                        ref={el => {
                            if (!pathRefs.current[9]) pathRefs.current[9] = [];
                            pathRefs.current[9][2] = el;
                        }} />
                </g>
                <defs>
                    <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#12BCD4" />
                        <stop offset="100%" stop-color="#8E24AA" />
                    </linearGradient>
                    <clipPath id="clip0_1015_42">
                        <rect width="26" height="60" fill="white" transform="translate(24.0442 0.304443) rotate(23.5061)" />
                    </clipPath>
                </defs>
            </svg>
            {/* {svgData.map((svg, index) => (
                <svg
                    key={svg.id}
                    className="star-svg"
                    id={svg.id}
                    viewBox={svg.viewBox}
                    ref={el => svgRefs.current[index] = el}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#12BCD4" />
                            <stop offset="100%" stopColor="#8E24AA" />
                        </linearGradient>
                    </defs>
                    <g>
                        <path
                            d="M21 1L41 21L21 41L1 21L21 1Z"
                            stroke="url(#gradient)"
                            fill="none"
                            ref={el => {
                                if (!pathRefs.current[index]) pathRefs.current[index] = [];
                                pathRefs.current[index][0] = el;
                            }}
                        />
                    </g>
                </svg>
            ))} */}
        </div>
    );
};

export default SparklingBackground;