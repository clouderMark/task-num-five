import {useEffect} from 'react';
import {TableCell, TableRow} from '@mui/material';
import {selectConrol} from '../../redux/controlSlice';
import {useGetAllUsersMutation} from '../../redux/dataApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {showAlert} from '../../redux/alertSlice';
import {Board} from '../Board';
import TableCells from '../bar/TableCells';
import {headCells} from './headCells';
import {closeLoader} from '../../redux/loaderSlice';

const UserList = () => {
  const dispatch = useAppDispatch();
  const [getData, {data, isError, error, isSuccess}] = useGetAllUsersMutation();
  const {region, errors, seed} = useAppSelector(selectConrol);

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(showAlert({message: error.data.message, statusCode: error.status}));
      dispatch(closeLoader());
    }
  }, [isError]);

  useEffect(() => {
    if (seed) {
      getData({region, errors, seed});
    }
  }, [region, errors, seed]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeLoader());
    }
  }, [isSuccess]);

  console.log(data);

  return (
    <>
      {data?.length ? (
        <Board
          tableHeadCells={<TableCells cells={headCells} />}
          tableBodyCells={
            <>
              {data.map((el, i) => (
                <TableRow hover key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.name} {el.surname}</TableCell>
                  <TableCell>{el.address}</TableCell>
                  <TableCell>{el.phone}</TableCell>
                </TableRow>
              ))}
            </>
          }
        />
      ) : null}
    </>
  );
};

export default UserList;
