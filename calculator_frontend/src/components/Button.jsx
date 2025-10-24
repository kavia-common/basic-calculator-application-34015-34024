import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button renders a calculator button with accessible labeling and style variants.
 * Props:
 * - label: string (visual text)
 * - ariaLabel: string (screen reader label)
 * - onClick: () => void
 * - variant: 'default' | 'op' | 'equals' | 'accent' | 'error'
 * - span: number (grid column span)
 */
const Button = ({ label, ariaLabel, onClick, variant = 'default', span = 1 }) => {
  const classes = ['btn'];
  if (variant !== 'default') classes.push(variant);
  if (span === 2) classes.push('span-2');

  return (
    <button
      type="button"
      className={classes.join(' ')}
      aria-label={ariaLabel || label}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
