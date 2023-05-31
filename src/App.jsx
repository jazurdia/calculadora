import React, { useState } from 'react';
import styles from './App.module.css';
import NumericButton from './components/NumericButton/NumericButton';
import InputBar from './components/InputBar/InputBar';
import OperatorButton from './components/OperatorButton/OperatorButton';

function App() {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [inputHistory, setInputHistory] = useState([]);
  const [afterOperation, setAfterOperation] = useState(false);

  const handleClear = () => {
    setOperation('');
    setResult('');
    setInputHistory([]);
    setAfterOperation(false);
  };

  const calculateResult = () => {
    try {
      // ESTO ES POR RAZONES DE SEGURIDAD CON EVAL
      // eslint-disable-next-line no-new-func
      const calcResult = new Function(`return ${operation}`)();
      if (calcResult.toString().length > 9) {
        setResult('Error');
      } else {
        setResult(calcResult);
        setOperation('');
        setAfterOperation(true);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleSignChange = () => {
    const numbers = operation.split(/[\s+*\-/]/);
    const lastNumber = numbers[numbers.length - 1];
    setOperation((prev) => prev.slice(0, -lastNumber.length) + (Number(lastNumber) * -1));
  };

  const handleButtonClick = (value) => {
    if (afterOperation) {
      handleClear();
      setAfterOperation(false);
    }

    if (value === '.' && operation.includes('.')) {
      return;
    }

    setInputHistory((prev) => [...prev, value]);

    if (!Number.isNaN(Number(value)) || value === '.') {
      setOperation((prev) => prev + value);
    } else {
      setOperation((prev) => `${prev} ${value} `);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <InputBar resultado={result} texto={inputHistory.join('')} />
        <div className={styles.botones}>
          <div className={styles.numeros}>
            <div className={styles.fila}>
              <OperatorButton operator="C" onClick={handleClear} />
              <OperatorButton operator="%" onClick={handleButtonClick} />
              <OperatorButton operator="+/-" onClick={handleSignChange} />
              {/* <OperatorButton operator="del" onClick={calculateResult} /> */}
            </div>
            <div className={styles.fila}>
              <NumericButton number="7" onClick={handleButtonClick} />
              <NumericButton number="8" onClick={handleButtonClick} />
              <NumericButton number="9" onClick={handleButtonClick} />
              <OperatorButton operator="*" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="4" onClick={handleButtonClick} />
              <NumericButton number="5" onClick={handleButtonClick} />
              <NumericButton number="6" onClick={handleButtonClick} />
              <OperatorButton operator="/" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="1" onClick={handleButtonClick} />
              <NumericButton number="2" onClick={handleButtonClick} />
              <NumericButton number="3" onClick={handleButtonClick} />
              <OperatorButton operator="+" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="." onClick={handleButtonClick} />
              <NumericButton number="0" onClick={handleButtonClick} />
              <OperatorButton operator="=" onClick={calculateResult} />
              <OperatorButton operator="-" onClick={handleButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
