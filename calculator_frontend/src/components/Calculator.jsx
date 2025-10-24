import React, { useEffect, useMemo, useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

/**
 * PUBLIC_INTERFACE
 * Calculator component provides a modern themed calculator with basic arithmetic operations,
 * operation chaining, keyboard support, and safe division-by-zero handling.
 */
const Calculator = () => {
  // calculator state
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState(null);

  // format number for display with grouping, avoid scientific for normal range
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 12,
      }),
    []
  );

  const formatDisplay = (value) => {
    if (value === null || value === undefined) return '0';
    if (value === 'Error') return 'Error';
    const [int, dec] = String(value).split('.');
    const formattedInt = Number.isNaN(Number(int)) ? '0' : formatter.format(Number(int));
    return dec !== undefined ? `${formattedInt}.${dec.slice(0, 12)}` : formattedInt;
  };

  const compute = (aStr, bStr, op) => {
    const a = parseFloat(aStr);
    const b = parseFloat(bStr);
    if (Number.isNaN(a) || Number.isNaN(b)) return aStr || bStr || '0';
    switch (op) {
      case '+':
        return String(a + b);
      case '-':
        return String(a - b);
      case '*':
        return String(a * b);
      case '/':
        if (b === 0) return 'Error';
        return String(a / b);
      default:
        return bStr;
    }
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(false);
    setError(null);
  };

  const handleDelete = () => {
    if (overwrite || error) {
      setCurrentValue('0');
      setOverwrite(false);
      setError(null);
      return;
    }
    if (currentValue.length <= 1) {
      setCurrentValue('0');
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const inputDigit = (digit) => {
    if (error) {
      // after error, start new entry
      setError(null);
      setCurrentValue(digit);
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      if (currentValue === '0') {
        setCurrentValue(digit);
      } else {
        setCurrentValue(currentValue + digit);
      }
    }
  };

  const inputDot = () => {
    if (error) {
      setError(null);
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }
    if (currentValue.includes('.')) return; // prevent multiple decimals
    setCurrentValue(currentValue + '.');
  };

  const chooseOperator = (nextOp) => {
    if (error) return;

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (!overwrite) {
      const result = compute(previousValue, currentValue, operator);
      if (result === 'Error') {
        setError('Error');
        setCurrentValue('Error');
        setPreviousValue(null);
        setOperator(null);
        setOverwrite(true);
        return;
      }
      setPreviousValue(result);
      setCurrentValue(result);
    }
    setOperator(nextOp);
    setOverwrite(true);
  };

  const evaluate = () => {
    if (error) return;
    if (operator === null || previousValue === null) return;

    const result = compute(previousValue, currentValue, operator);
    if (result === 'Error') {
      setError('Error');
      setCurrentValue('Error');
      setPreviousValue(null);
      setOperator(null);
      setOverwrite(true);
      return;
    }
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  // keyboard handlers
  useEffect(() => {
    const onKeyDown = (e) => {
      const { key } = e;

      if ((key >= '0' && key <= '9')) {
        e.preventDefault();
        inputDigit(key);
        return;
      }

      if (key === '.' || key === ',') {
        e.preventDefault();
        inputDot();
        return;
      }

      if (['+', '-', '*', '/'].includes(key)) {
        e.preventDefault();
        chooseOperator(key);
        return;
      }

      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        evaluate();
        return;
      }

      if (key === 'Backspace') {
        e.preventDefault();
        handleDelete();
        return;
      }

      if (key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentValue, operator, previousValue, overwrite, error]); // dependencies ensure latest closures

  return (
    <section className="calculator" aria-label="Calculator">
      <div className="calc-header" role="presentation">
        <div className="calc-title">Ocean Calc</div>
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="calc-dot" />
          <div className="calc-dot" />
          <div className="calc-dot" />
        </div>
      </div>
      <Display
        value={formatDisplay(currentValue)}
        previous={previousValue !== null ? `${formatDisplay(previousValue)} ${operator ?? ''}`.trim() : ''}
        error={error}
      />
      <Keypad
        onDigit={inputDigit}
        onDot={inputDot}
        onOperator={chooseOperator}
        onEquals={evaluate}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <div className="footer">
        <span>Retro · Modern</span>
        <span>⌨ Keyboard Ready</span>
      </div>
    </section>
  );
};

export default Calculator;
