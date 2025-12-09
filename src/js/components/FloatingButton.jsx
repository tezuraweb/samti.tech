import React from 'react';
import IconSprite from '../includes/IconSprite';

const FloatingButton = ({ onClick, onScrollTop }) => {
    return (
        <div className="floating-btns">
            <button className="floating-btn floating-btn--up" onClick={onScrollTop} aria-label="Scroll to top">
                <IconSprite selector="ArrowCard" width="18" height="18" className="floating-btn__arrow-icon" />
            </button>
            <button className="floating-btn floating-btn--form" onClick={onClick} aria-label="Open contact form">
                <span className="floating-btn__text">//st</span>
            </button>
        </div>
    );
};

export default FloatingButton;
