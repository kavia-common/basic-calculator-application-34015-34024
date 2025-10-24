import React from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * Keypad renders the calculator keys and wires to handler callbacks.
 * Props:
 * - onDigit(d: string)
 * - onDot()
 * - onOperator(op: '+'|'-'|'*'|'/')
 * - onEquals()
 * - onClear()
 * - onDelete()
 */
const Keypad = ({ onDigit, onDot, onOperator, onEquals, onClear, onDelete }) => {
  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      <Button label="C" ariaLabel="Clear" onClick={onClear} variant="accent" />
      <Button label="DEL" ariaLabel="Delete last" onClick={onDelete} variant="error" />
      <Button label="÷" ariaLabel="Divide" onClick={() => onOperator('/')} variant="op" />
      <Button label="×" ariaLabel="Multiply" onClick={() => onOperator('*')} variant="op" />

      <Button label="7" onClick={() => onDigit('7')} />
      <Button label="8" onClick={() => onDigit('8')} />
      <Button label="9" onClick={() => onDigit('9')} />
      <Button label="−" ariaLabel="Minus" onClick={() => onOperator('-')} variant="op" />

      <Button label="4" onClick={() => onDigit('4')} />
      <Button label="5" onClick={() => onDigit('5')} />
      <Button label="6" onClick={() => onDigit('6')} />
      <Button label="+" ariaLabel="Plus" onClick={() => onOperator('+')} variant="op" />

      <Button label="1" onClick={() => onDigit('1')} />
      <Button label="2" onClick={() => onDigit('2')} />
      <Button label="3" onClick={() => onDigit('3')} />
      <Button label="=" ariaLabel="Equals" onClick={onEquals} variant="equals" />

      <Button label="0" onClick={() => onDigit('0')} span={2} />
      <Button label="." ariaLabel="Decimal point" onClick={onDot} />
      <span aria-hidden="true" style={{ display: 'none' }} />
    </div>
  );
};

export default Keypad;
