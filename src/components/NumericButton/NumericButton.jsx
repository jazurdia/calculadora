/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './NumericButton.module.css';

function NumericButton({ number, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    onClick(number);
    setTimeout(() => setIsClicked(false), 400); // reset after 200ms
  };

  const buttonStyle = isClicked ? styles.clickedNumericButton : styles.NumericButton;

  return (
    <div className={styles.containernButton}>
      <div className={buttonStyle} onClick={handleButtonClick}>
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
