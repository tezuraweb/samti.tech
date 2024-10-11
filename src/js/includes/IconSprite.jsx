import React, { forwardRef } from 'react';

const IconSprite = forwardRef(({
  selector = '',
  width = 12,
  height = 12,
  fill = 'none',
  classNames = 'Icon-default',
  ...props
}, ref) => {
  return (
    <svg
      className={`Icon-root Icon-${selector} ${classNames}`}
      fill={fill}
      width={width}
      height={height}
      ref={ref}
      {...props}
    >
      <use xlinkHref={`#${selector}`} />
    </svg>
  );
});

IconSprite.displayName = 'IconSprite';

export default IconSprite;