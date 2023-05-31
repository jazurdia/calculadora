/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './OperatorButton.module.css';

function OperatorButton({ operator, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    onClick(operator);
    setTimeout(() => setIsClicked(false), 400); // reset after 200ms
  };

  const buttonStyle = isClicked ? styles.clickedOperatorButton : styles.OperatorButton;

  return (
    <div className={styles.containerButton}>
      <div className={buttonStyle} onClick={handleButtonClick}>
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
