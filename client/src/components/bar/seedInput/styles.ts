import {theme} from '../../../styles/theme';

export const styles = {
  text: {
    color: theme.palette.third.main,
    mr: 2,
  },
  input: {
    mr: 2,
    backgroundColor: theme.palette.third.main,
    borderRadius: '3.5px',
    width: '150px',
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
    },
  },
  button: {
    backgroundColor: theme.palette.third.main,
    '&:hover': {
      backgroundColor: theme.palette.third.light,
    },
  },
};
