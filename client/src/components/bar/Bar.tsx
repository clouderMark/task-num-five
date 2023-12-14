import {useEffect} from 'react';
import {AppBar, Container, Toolbar} from '@mui/material';
import {useAppDispatch} from '../../redux/hooks';
import {useGetAllUsersMutation} from '../../redux/dataApi';
import {showAlert} from '../../redux/alertSlice';
import {setRows} from '../../redux/tableSlice';
import RegionSelect from './regionSelect/RegionSelect';
import InputErrors from './inputErrors/InputErrors';
import Seed from './seedInput/Seed';

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
      <AppBar>
        <Toolbar>
          <RegionSelect />
          <InputErrors />
          <Seed />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Bar;
