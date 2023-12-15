import {useEffect} from 'react';
import {TableCell, TableRow} from '@mui/material';
import {selectConrol} from '../../redux/controlSlice';
import {useGetAllUsersMutation} from '../../redux/dataApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {showAlert} from '../../redux/alertSlice';
import {Board} from '../Board';
import TableCells from '../bar/TableCells';
import {headCells} from './headCells';

const UserList = () => {
  const dispatch = useAppDispatch();
  const [getData, {data, isError, error}] = useGetAllUsersMutation();
  const {region, errors, seed} = useAppSelector(selectConrol);

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(showAlert({message: error.data.message, statusCode: error.status}));
    }
  }, [isError]);

  useEffect(() => {
    getData({region, errors, seed});
  }, []);

  return (
    <>
      {data ? (
        <Board
          tableHeadCells={<TableCells cells={headCells} />}
          tableBodyCells={
            <>
              {data.map((el) => (
                <TableRow hover>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.number}</TableCell>
                  <TableCell>{el.name}</TableCell>
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
