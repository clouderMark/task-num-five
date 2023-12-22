import {UIEvent, useEffect, useState} from 'react';
import {TableCell, TableRow} from '@mui/material';
import {selectConrol} from '../../redux/controlSlice';
import {useGetAllUsersMutation} from '../../redux/dataApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {showAlert} from '../../redux/alertSlice';
import {Board} from '../Board';
import TableCells from '../bar/TableCells';
import {headCells} from './headCells';
import {selectUserList, setRows} from '../../redux/userListSlice';
import {USER} from '../../types/types';

const UserList = () => {
  const dispatch = useAppDispatch();
  const [getData, {isError, error}] = useGetAllUsersMutation();
  const {region, errors, seed, waitInputChange} = useAppSelector(selectConrol);
  const {rows} = useAppSelector(selectUserList);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(showAlert({message: error.data.message, statusCode: error.status}));
    }
  }, [isError]);

  useEffect(() => {
    if (!waitInputChange) {
      const {length} = rows;

      dispatch(setRows([]));
      getData({region, errors, seed, from: 0, to: !length ? USER.AMOUNT : length});
      setFirstLoad(false);
    }
  }, [errors, waitInputChange]);

  useEffect(() => {
    if (!firstLoad && !waitInputChange) {
      dispatch(setRows([]));
      getData({region, errors, seed, from: 0, to: USER.AMOUNT});
    }
  }, [seed, region]);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const {currentTarget} = event;

    if (currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.clientHeight) {
      getData({region, errors, seed, from: rows.length, to: USER.AMOUNT + rows.length});
    }
  };

  return (
    <>
      {rows.length ? (
        <Board
          tableHeadCells={<TableCells cells={headCells} />}
          tableBodyCells={
            <>
              {rows.map((el, i) => (
                <TableRow hover key={i} sx={{height: '53px'}}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>
                    {el.name} {el.surname}
                  </TableCell>
                  <TableCell>
                    {el.city}, {el.street}, д: {el.house}
                  </TableCell>
                  <TableCell>{el.phone}</TableCell>
                </TableRow>
              ))}
            </>
          }
          sx={{height: `${56.5 + 53.02 * 9}px`}}
          onScroll={handleScroll}
        />
      ) : null}
    </>
  );
};

export default UserList;
