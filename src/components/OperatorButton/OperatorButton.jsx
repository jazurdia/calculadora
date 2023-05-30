/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './OperatorButton.module.css';

function OperatorButton({ operator, onClick }) {
  return (
    <div className={styles.containerButton}>
      <div className={styles.OperatorButton} onClick={() => onClick(operator)}>
        <div className={styles.content}>
          {operator}
        </div>
      </div>
    </div>
  );
}

OperatorButton.propTypes = {
  operator: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OperatorButton;
