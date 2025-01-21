import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Job } from '@src/store/slices/jobsSlice/models';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { scrollStyle } from '@src/utils';
import { memo, useMemo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material/styles';
import { removeJobsAction } from '@src/store/slices/jobsSlice/epics/removeJobsEpic';
import { updateJobsAction } from '@src/store/slices/jobsSlice/epics/updateJobsEpic';
import React from 'react';

interface Props {}

export const Jobs = memo((props: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const jobs = useAppSelector((s) => s.jobs.jobs);
  const displayMode = useAppSelector((s) => s.jobs.displayMode);

  const displayedJobs = useMemo(() => {
    const sorted = [...jobs].sort((a, b) => a.created - b.created);

    if (displayMode === 'all') return sorted;

    const filteredByCompleted = sorted.filter((t) => {
      if (displayMode === 'active') return !t.completed;
      if (displayMode === 'completed') return t.completed;
    });
    return filteredByCompleted;
  }, [jobs, displayMode]);

  const toggleCompleted = (job: Job, completed: boolean) => {
    const { created, updated, ...forUpdate } = job;
    forUpdate.completed = completed;
    dispatch(updateJobsAction({ jobs: [forUpdate] }));
  };

  return (
    <Stack
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100% - 100px)',
        ...scrollStyle,
      }}
    >
      {displayedJobs.map((job) => (
        <Stack
          key={job.id}
          direction={'row'}
          sx={{
            alignItems: 'center',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            px: 2,
          }}
        >
          <FormControlLabel
            label={job.title}
            control={<Checkbox checked={job.completed} onChange={(_, v) => toggleCompleted(job, v)} />}
            sx={{ flexGrow: 1, textDecoration: job.completed ? 'line-through' : '', color: job.completed ? 'grey' : '', py: 1 }}
          />
          <IconButton
            size='small'
            onClick={() => dispatch(removeJobsAction({ ids: [job.id] }))}
            sx={{
              '&:hover': {
                color: theme.palette.error.dark,
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
});
