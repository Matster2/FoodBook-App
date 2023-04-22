import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Stack, List } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import DatePickerOption from '../components/DatePickerOption/DatePickerOption';
import { areDatesTheSameDay } from '../utils/utils';

export default () => {
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    claims: { userId },
  } = useAuth();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [planner, setPlanner] = useState();

  useEffect(() => {
    const dateToday = new Date();
    const startDate = new Date();
    startDate.setDate(dateToday.getDate() - 7);

    const dates = [];

    for (let i = 0; i <= 14; i += 1) {
      const date = new Date();
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    setAvailableDates(dates);
  }, []);

  const fetchPlanner = async () => {
    try {
      const { data } = await api.getUserPlanner(userId, {
        dateFrom: selectedDate.toISOString().split('T')[0],
        dateTo: selectedDate.toISOString().split('T')[0],
      });
      setPlanner(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPlanner();
  }, [selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <CssBaseline />

      <List style={{ overflow: 'auto' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          {availableDates.map((date) => (
            <DatePickerOption date={date} active={areDatesTheSameDay(date, selectedDate)} onClick={handleDateClick} />
          ))}
        </Stack>
      </List>
    </Container>
  );
};
