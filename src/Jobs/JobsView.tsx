import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { Footer } from './Footer';
import { Jobs } from './Jobs';
import { createJob } from '@src/store/slices/jobsSlice/epics/createJobEpic';
import React from 'react';

export function sum(a: number, b: number) {
  return a + b;
}

interface Props {}

export function JobsView(props: Props) {
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const jobs = useAppSelector((s) => s.jobs.jobs);

  const handleInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;

    const alreadyExist = jobs.some((t) => t.title.toLowerCase() === inputText.toLowerCase());
    if (alreadyExist) {
      setError('A job with this title already exists');
      return;
    } else {
      setError('');
    }

    dispatch(
      createJob({
        title: inputText,
        description: '',
        completed: false,
      }),
    );
    setInputText('');
  };

  return (
    <Stack sx={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ width: 600, height: 500, justifyContent: 'center' }}>
        <Stack>
          <TextField
            error={!!error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='What needs to be done?'
            onKeyDown={handleInput}
            helperText={error}
            autoComplete={'off'}
          />
        </Stack>

        <Jobs />

        <Footer />
      </Paper>
    </Stack>
  );
}
