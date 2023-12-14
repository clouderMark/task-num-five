import {theme} from '../../../styles/theme';

export const styles = {
  slider: {
    '& .MuiSlider-thumb': {
      color: theme.palette.third.main,
    },
    '& .MuiSlider-track': {
      color: theme.palette.third.light,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.third.light,
    },
  },
  input: {
    color: theme.palette.third.main,
    '::after': {borderBottomColor: theme.palette.third.main},
    ':before': {borderBottomColor: theme.palette.third.light},
  },
  box: {
    width: 300,
    ml: 5,
  },
  text: {
    color: theme.palette.third.main,
  },
};
