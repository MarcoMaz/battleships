import { FunctionComponent } from 'react';

import styles from './Message.module.css';

type MessageComponentProps = {
  message: string;
}

const Message: FunctionComponent<MessageComponentProps> = ({ message }) => {
  return (
    <div className={styles.message}>
      {message && <p className={styles['message-error']}>{message}</p>}
    </div>
  );
};

export default Message;
