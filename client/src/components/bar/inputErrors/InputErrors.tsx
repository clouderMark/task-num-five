import {Box, Grid, Input, Slider, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {handleBlurErrors, selectConrol, setErrors, setInputDelay} from '../../../redux/controlSlice';
import {styles} from './styles';

const InputErrors = () => {
  const dispatch = useAppDispatch();
  const {errors} = useAppSelector(selectConrol);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    dispatch(setInputDelay());
    dispatch(setErrors(newValue as number));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputDelay());
    dispatch(setErrors(event.target.value === '' ? 0 : +event.target.value));
  };

  return (
    <Box sx={styles.box}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography id="input-slider" gutterBottom sx={styles.text}>
            Errors:
          </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={errors}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={0.25}
            max={10}
            sx={styles.slider}
          />
        </Grid>
        <Grid item>
          <Input
            value={errors}
            size="small"
            onChange={handleInputChange}
            onBlur={() => dispatch(handleBlurErrors())}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            sx={styles.input}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputErrors;
