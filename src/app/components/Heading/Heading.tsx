import { FunctionComponent } from 'react';

import styles from './Heading.module.css';

type HeadingProps = {
  label: string;
}

const Heading: FunctionComponent<HeadingProps> = ({ label }) => {
  return <h1 className={styles.heading}>{label}</h1>;
};

export default Heading;
