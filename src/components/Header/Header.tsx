import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <h1 onClick={() => router.push('/')} className={styles.title}>
        Flight Fare Prediction
      </h1>
    </header>
  );
};

export default Header;
