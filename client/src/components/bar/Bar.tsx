import {useEffect} from 'react';
import {AppBar, Container, Toolbar} from '@mui/material';
import {useAppDispatch} from '../../redux/hooks';
import {theme} from '../../styles/theme';
import {useGetAllUsersMutation} from '../../redux/dataApi';
import {showAlert} from '../../redux/alertSlice';
import {setRows} from '../../redux/tableSlice';
import RegionSelect from './regionSelect/RegionSelect';

const Bar = () => {
  const dispatch = useAppDispatch();
  const [, {data, isError, error, isSuccess}] = useGetAllUsersMutation();

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(showAlert({message: error.data.message, statusCode: error.status}));
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setRows(data));
    }
  }, [isSuccess]);

  return (
    <Container maxWidth={false}>
      <AppBar sx={{backgroundColor: theme.palette.first.dark, height: '70px'}}>
        <Toolbar sx={{display: 'flex', alignItems: 'flex-start'}}>
          <RegionSelect />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Bar;
