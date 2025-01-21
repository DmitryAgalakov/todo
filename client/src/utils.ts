export const scrollStyle = {
  '&::-webkit-scrollbar-track': {
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar': {
    borderRadius: 5,
    height: 8,
    width: 8,
    backgroundColor: '#515151',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
    backgroundColor: '#6d6d6d',
    border: '1px solid #515151',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'transparent',
  },
};

export const toMs = (date: number) => new Date(date).getTime();
