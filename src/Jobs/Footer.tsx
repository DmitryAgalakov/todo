import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { setDisplayMode } from '@src/store/slices/jobsSlice/jobsSlice';

interface Props {}

export function Footer(props: Props) {
  const dispatch = useAppDispatch();

  const displayMode = useAppSelector((s) => s.jobs.displayMode);

  return (
    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 1, pr: 1 }}>
      <Button variant={displayMode === 'all' ? 'contained' : 'outlined'} onClick={() => dispatch(setDisplayMode('all'))}>
        All
      </Button>

      <Button variant={displayMode === 'active' ? 'contained' : 'outlined'} onClick={() => dispatch(setDisplayMode('active'))}>
        Active
      </Button>

      <Button variant={displayMode === 'completed' ? 'contained' : 'outlined'} onClick={() => dispatch(setDisplayMode('completed'))}>
        Completed
      </Button>
    </Stack>
  );
}
