import type { NextPage } from 'next';
import styles from './HomeScreen.module.scss';
import Navbar from 'src/components/Navbar/Navbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCalculator } from '@fortawesome/free-solid-svg-icons';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Flight Fare Predictions</h1>
      <p>Find the best time to buy your flight tickets at the lowest price.</p>
      <div className={styles.buttons}>
        <Link href="/prediction" legacyBehavior>
          <a>
            <FontAwesomeIcon icon={faCalculator} size="4x" />
            <span>Predict</span>
          </a>
        </Link>
        <Link href="/statistics" legacyBehavior>
          <a>
            <FontAwesomeIcon icon={faChartLine} size="4x" />
            <span>Statistics</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
