import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Display renders the calculator's current value and previous expression context.
 * Props:
 * - value: string | number - the current value to show
 * - previous: string - previous value with operator
 * - error: string | null - error state to style display accordingly
 */
const Display = ({ value, previous, error }) => {
  return (
    <div className="display" role="region" aria-label="Calculator display">
      <div className="meta" aria-live="polite" aria-atomic="true">
        <span>{previous || '\u00A0'}</span>
        {error ? <span style={{ color: 'var(--error)', fontWeight: 600 }}>Error</span> : <span>&nbsp;</span>}
      </div>
      <div
        className="display-screen"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={error ? { color: 'var(--error)' } : undefined}
      >
        {value}
      </div>
    </div>
  );
};

export default Display;
