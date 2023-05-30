import PropTypes from 'prop-types';
import React from 'react';
import styles from './NumericButton.module.css';

function NumericButton({ number, onClick }) { //
  return (
    <div className={styles.containernButton}>
      <div className={styles.NumericButton} onClick={() => onClick(number)}>
        <div className={styles.content}>
          {number}
        </div>
      </div>
    </div>

  );
}

NumericButton.propTypes = {
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NumericButton;
