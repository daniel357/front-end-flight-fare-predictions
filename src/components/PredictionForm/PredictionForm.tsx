import React, { useEffect, useState } from 'react';
import CustomSingleDatePicker from '../SingleDatePicker/SingleDatePicker';
import moment, { Moment } from 'moment';
import { TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import styles from './PredictionForm.module.scss';
import { useHttp } from 'src/hooks/useHttp';
import { FlightDto } from '../../types/flight.types';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const PredictionForm: React.FC = () => {
  const { http } = useHttp({ withLoading: true });
  const [departureDate, setDepartureDate] = useState<Moment | null>(null);
  const [searchDate, setSearchDate] = useState<Moment | null>(null);
  const [departureTime, setDepartureTime] = useState<Moment | null>(null);
  const [arrivalTime, setArrivalTime] = useState<Moment | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [predictedNumberOfDays, setPredictedNumberOfDays] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setIsFormValid(
      searchDate !== null &&
      departureDate !== null &&
      departureTime !== null &&
      arrivalTime !== null
    );
  }, [searchDate, departureDate, departureTime, arrivalTime]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const flightData: FlightDto = {
      searchDate: searchDate ? searchDate.format('YYYY-MM-DD') : null,
      flightDate: departureDate ? departureDate.format('YYYY-MM-DD') : null,
      departureHour: departureTime ? departureTime.hour() : null,
      departureMinute: departureTime ? departureTime.minute() : null,
      arrivalHour: arrivalTime ? arrivalTime.hour() : null,
      arrivalMinute: arrivalTime ? arrivalTime.minute() : null
    };

    try {
      // const response = await http(() => FlightApi.submitFlightDataForPrediction(flightData));
      const response = 4;
      setPredictedNumberOfDays(response);
      setOpen(true);
      console.log(response);
    } catch (error) {
      console.error('Error submitting flight data', error);
    }
  };


  const resetForm = () => {
    setDepartureDate(null);
    setSearchDate(null);
    setDepartureTime(null);
    setArrivalTime(null);
    setPredictedNumberOfDays(null);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const isSearchDateOutsideRange = (day: Moment) => {
    const firstSearchDate = moment('2022-04-17');
    const lastSearchDate = moment('2022-10-05');
    return !day.isBetween(firstSearchDate, lastSearchDate, 'day', '[]') ||
      (departureDate && day.isAfter(departureDate, 'day'));
  };

  const isDepartureDateOutsideRange = (day: Moment) => {
    const firstFlightDate = moment('2022-05-01');
    const lastFlightDate = moment('2022-11-09');
    return !day.isBetween(firstFlightDate, lastFlightDate, 'day', '[]') ||
      (searchDate && day.isBefore(searchDate, 'day'));
  };

  const handleSearchDateChange = (date: Moment | null) => {
    setSearchDate(date);
    if (departureDate && date && date.isAfter(departureDate, 'day')) {
      setDepartureDate(null);
    }
  };

  const handleDepartureDateChange = (date: Moment | null) => {
    setDepartureDate(date);
    if (searchDate && date && date.isBefore(searchDate, 'day')) {
      setSearchDate(null);
    }
  };

  const getInitialSearchDateVisibleMonth = () => {
    if (departureDate) {
      return departureDate;
    }
    return moment('2022-04', 'YYYY-MM');
  };

  const getInitialDepartureDateVisibleMonth = () => {
    if (searchDate) {
      return searchDate;
    }
    return moment('2022-05', 'YYYY-MM');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor='searchDate'>Search Date</label>
            <CustomSingleDatePicker
              date={searchDate}
              onDateChange={handleSearchDateChange}
              initialVisibleMonth={getInitialSearchDateVisibleMonth}
              isOutsideRange={isSearchDateOutsideRange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='departureDate'>Departure Date</label>
            <CustomSingleDatePicker
              date={departureDate}
              onDateChange={handleDepartureDateChange}
              initialVisibleMonth={getInitialDepartureDateVisibleMonth}
              isOutsideRange={isDepartureDateOutsideRange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className={styles.field}>
              <label htmlFor='departureTime'>Departure Time</label>
              <TimePicker
                value={departureTime}
                onChange={(newValue) => setDepartureTime(newValue)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='arrivalTime'>Arrival Time</label>
              <TimePicker
                value={arrivalTime}
                onChange={(newValue) => setArrivalTime(newValue)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <button type='submit' className={styles.button} disabled={!isFormValid}>Predict</button>
        {predictedNumberOfDays !== null && (
          <div className={styles.result}>
            <p>
              For the flight on {departureDate?.format('YYYY-MM-DD')}
              departing at {departureTime?.format('HH:mm')},
              you should buy it {predictedNumberOfDays} days before it departs.
            </p>
          </div>
        )}
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='prediction-result-title'
        aria-describedby='prediction-result-description'
        className={styles.modal}
      >
        <div className={styles.modalContent}>
          <CloseIcon className={styles.closeIcon} onClick={handleClose} />
          <h2 id='prediction-result-title'>Optimal Purchase Time</h2>
          <p id='prediction-result-description'>
            For the flight on {departureDate?.format('MMMM Do, YYYY')} departing at {departureTime?.format('hh:mm A')}, it is recommended to purchase your ticket {predictedNumberOfDays} days before departure for the best fare.
          </p>
        </div>
      </Modal>
    </>
  );
};
export default PredictionForm;