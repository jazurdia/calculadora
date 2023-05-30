import React, { useState } from 'react';
import styles from './App.module.css';
import NumericButton from './components/NumericButton/NumericButton';
import InputBar from './components/InputBar/InputBar';
import OperatorButton from './components/OperatorButton/OperatorButton';

function App() {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    const [num1, operator, num2] = operation.split(' ');
    let calcResult;
    switch (operator) {
      case '+':
        calcResult = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        calcResult = parseFloat(num1) - parseFloat(num2);
        break;
      case '*':
        calcResult = parseFloat(num1) * parseFloat(num2);
        break;
      case '/':
        if (parseFloat(num2) === 0) {
          console.log('No se puede dividir por cero');
          return;
        }
        calcResult = parseFloat(num1) / parseFloat(num2);
        break;
      default:
        console.log('Operador no soportado');
        return;
    }
    setResult(calcResult);
  };

  const handleButtonClick = (value) => {
    if (!Number.isNaN(Number(value))) {
      setOperation((prev) => prev + value);
    } else {
      setOperation((prev) => `${prev} ${value} `);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <InputBar resultado={result} texto="" />
        <div className={styles.botones}>
          <div className={styles.numeros}>
            <div className={styles.fila}>
              <NumericButton number="9" onClick={handleButtonClick} />
              <NumericButton number="8" onClick={handleButtonClick} />
              <NumericButton number="7" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="6" onClick={handleButtonClick} />
              <NumericButton number="5" onClick={handleButtonClick} />
              <NumericButton number="4" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="3" onClick={handleButtonClick} />
              <NumericButton number="2" onClick={handleButtonClick} />
              <NumericButton number="1" onClick={handleButtonClick} />
            </div>
            <div className={styles.fila}>
              <NumericButton number="0" onClick={handleButtonClick} />
            </div>
          </div>
          <div className={styles.operadores}>
            <OperatorButton operator="*" onClick={handleButtonClick} />
            <OperatorButton operator="/" onClick={handleButtonClick} />
            <OperatorButton operator="+" onClick={handleButtonClick} />
            <OperatorButton operator="-" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
      <div className={styles.resultado}>
        <OperatorButton operator="=" onClick={calculateResult} />
      </div>
    </div>
  );
}

export default App;
