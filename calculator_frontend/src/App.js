import React from 'react';
import './styles/global.css';
import './styles/theme.css';
import Calculator from './components/Calculator';

/**
 * PUBLIC_INTERFACE
 * App is the root component that renders the Calculator within a themed container.
 */
function App() {
  return (
    <div className="app-root">
      <main className="app-center">
        <Calculator />
      </main>
    </div>
  );
}

export default App;
