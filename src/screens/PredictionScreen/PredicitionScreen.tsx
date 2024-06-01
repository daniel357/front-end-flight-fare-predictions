import type { NextPage } from 'next';
import styles from './PredictionScreen.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import PredictionForm from '../../components/PredictionForm/PredictionForm';

const Predictions: NextPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.container}>
        <h1>Get Your Flight Fare Predictions</h1>
        <PredictionForm />
      </div>
    </div>
  );
};

export default Predictions;
