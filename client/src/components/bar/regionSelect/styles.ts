import {theme} from '../../../styles/theme';

export const styles = {
  control: {
    m: 1,
    minWidth: 120,
    backgroundColor: theme.palette.third.main,
    borderRadius: '3.5px',
  },
  label: {
    color: theme.palette.first.main,
    fontWeight: 500,
    mt: '5px',
  },
  select: {
    '&.MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
    },
  },
};
