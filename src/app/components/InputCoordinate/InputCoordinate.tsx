import { ChangeEvent, FunctionComponent } from 'react';

import styles from './InputCoordinate.module.css';

type InputCoordinateComponentProps = {
  inputValue: string;
  isGameOver: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleHitButtonClick: () => void;
};

const InputCoordinate: FunctionComponent<InputCoordinateComponentProps> = ({
  inputValue,
  isGameOver,
  handleInputChange,
  handleKeyDown,
  handleHitButtonClick,
}) => {
  const COORDINATES_INSTRUCTIONS_LABEL: string = `Enter coordinates in the format: Column, Row (e.g., A5) and hit the
  button.`;
  const COORDINATES_BUTTON_LABEL: string = `HIT`;

  return (
    <div className={styles.coordinates}>
      <p className={styles['coordinates-instructions']}>
        {COORDINATES_INSTRUCTIONS_LABEL}
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
        {COORDINATES_BUTTON_LABEL}
      </button>
    </div>
  );
};

export default InputCoordinate;
