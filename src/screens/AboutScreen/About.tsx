// pages/about.tsx
import type { NextPage } from 'next';
import styles from './About.module.scss';
import Navbar from '../../components/Navbar/Navbar';

const About: NextPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>About Flight Fare Predictions</h1>
        <p>This application helps you find the optimal time to purchase your flight tickets at the lowest price using advanced machine learning techniques.</p>
      </div>
    </div>
  );
};

export default About;
