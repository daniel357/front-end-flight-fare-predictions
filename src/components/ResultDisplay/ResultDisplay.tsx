// components/ResultDisplay.tsx
import React from 'react';
import styles from './ResultDisplay.module.scss';

interface ResultDisplayProps {
  optimalDate: string;
  confidence: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ optimalDate, confidence }) => {
  return (
    <div className={styles.result}>
      <h2>Prediction Result</h2>
      <p>Optimal Purchase Date: <strong>{optimalDate}</strong></p>
      <p>Model Confidence: <strong>{confidence}%</strong></p>
    </div>
  );
};

export default ResultDisplay;
