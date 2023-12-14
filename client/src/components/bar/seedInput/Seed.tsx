import {ChangeEvent, useEffect} from 'react';
import {Box, IconButton, TextField, Typography} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {selectConrol, setSeed} from '../../../redux/controlSlice';
import {styles} from './styles';
import {generateRandomValue} from './generateRandomValue';

const Seed = () => {
  const dispatch = useAppDispatch();
  const {seed} = useAppSelector(selectConrol);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSeed(+e.target.value));
  };

  useEffect(() => {
    setGeneretedSeed();
  }, []);

  const setGeneretedSeed = () => dispatch(setSeed(generateRandomValue()));

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Typography sx={styles.text}>Seed: </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={seed}
        onChange={handleChange}
        type="number"
        sx={styles.input}
      />
      <IconButton sx={styles.button} onClick={() => setGeneretedSeed()}>
        <ShuffleIcon />
      </IconButton>
    </Box>
  );
};

export default Seed;
