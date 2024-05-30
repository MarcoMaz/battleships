import { ChangeEvent, FunctionComponent } from 'react';

import styles from './InputCoordinate.module.css';

type InputCoordinateComponentProps = {
  coordinatesInstructionsLabel: string;
  coordinatesButtonLabel: string;
  inputValue: string;
  isGameOver: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleHitButtonClick: () => void;
};

const InputCoordinate: FunctionComponent<InputCoordinateComponentProps> = ({
  coordinatesInstructionsLabel,
  coordinatesButtonLabel,
  inputValue,
  isGameOver,
  handleInputChange,
  handleKeyDown,
  handleHitButtonClick,
}) => {
  return (
    <div className={styles.coordinates}>
      <p className={styles['coordinates-instructions']}>
        {coordinatesInstructionsLabel}
      </p>
      <input
        className={styles['coordinates-input']}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter value'
        disabled={isGameOver}
      />
      <button
        className={styles['coordinates-button']}
        onClick={handleHitButtonClick}
        disabled={isGameOver}
      >
        {coordinatesButtonLabel}
      </button>
    </div>
  );
};

export default InputCoordinate;
