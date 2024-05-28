import { FunctionComponent } from 'react';

import styles from './Heading.module.css';

const Heading: FunctionComponent = () => {
  const HEADING_LABEL: string = 'Battleships';

  return <h1 className={styles.heading}>{HEADING_LABEL}</h1>;
};

export default Heading;
