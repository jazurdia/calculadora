import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputBar.module.css';

function InputBar({ resultado, texto }) {
  return (
    <div className={styles.InputBar}>
      <div className={styles.result}>
        <p>{resultado}</p>
      </div>
      <div className={styles.text}>
        <p>{texto}</p>
      </div>
    </div>
  );
}

InputBar.propTypes = {
  resultado: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default InputBar;
