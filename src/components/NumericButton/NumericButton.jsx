import PropTypes from 'prop-types';
import React from 'react';
import styles from './NumericButton.module.css';

function NumericButton({ number }) { //
  return (
    <div className={styles.NumericButton}>
      <div className={styles.content}>
        {number}
      </div>
    </div>
  );
}

NumericButton.propTypes = {
  number: PropTypes.string.isRequired,
};

export default NumericButton;
