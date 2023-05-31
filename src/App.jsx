import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import NumericButton from './components/NumericButton/NumericButton';
import InputBar from './components/InputBar/InputBar';
import OperatorButton from './components/OperatorButton/OperatorButton';

function App() {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [inputHistory, setInputHistory] = useState([]);
  const [afterOperation, setAfterOperation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [operationSign, setOperationSign] = useState('');

  useEffect(() => {
    if (isError) {
      setTimeout(() => setIsError(false), 1000);
    }
  }, [isError]);

  const handleClear = () => {
    setOperation('');
    setResult('');
    setInputHistory([]);
    setAfterOperation(false);
  };

  const calculateResult = () => {
    try {
      let calcResult;
      // ESTO ES POR RAZONES DE SEGURIDAD CON EVAL
      // eslint-disable-next-line no-new-func
      calcResult = new Function(`return ${operation}`)();

      const operators = operation.match(/[*/+-]/g);
      const lastOperator = operators ? operators[operators.length - 1] : null;

      let strResult = calcResult.toString();

      // Check if the result length is more than 9
      if (strResult.length > 9) {
        // If the operation was division, approximate the result
        if (lastOperator === '/') {
          if (strResult.includes('.') && strResult.length > 9) {
            strResult = strResult.slice(0, 9);
            calcResult = Number(strResult);
          }
        } else {
          // For operations other than division, throw error
          throw new Error('Result length is more than 9');
        }
      }

      // Check if the result is negative
      if (calcResult < 0) {
        throw new Error('Result is negative');
      }

      setResult(calcResult);
      setOperation('');
      setAfterOperation(true);
    } catch (error) {
      setResult('Error');
      setIsError(true);
    }
    setOperationSign('');
  };

  const handleSignChange = () => {
    const numbers = operation.split(/[\s+*\-/]/);
    const lastNumber = numbers[numbers.length - 1];
    const newSign = operationSign === '' ? '-' : '';
    setOperation((prev) => prev.slice(0, -lastNumber.length) + (Number(lastNumber) * -1));
    setOperationSign(newSign);
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

  const containerClass = isError ? `${styles.container} ${styles.containerError}` : styles.container;

  return (
    <div className={styles.App}>
      <div className={containerClass}>
        <InputBar resultado={result} texto={inputHistory.join('')} />
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
  );
}

export default App;
