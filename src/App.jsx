import React from 'react';
import styles from './App.module.css';
import NumericButton from './components/NumericButton/NumericButton';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <NumericButton />
      </div>
    </div>
  );
}

export default App;
