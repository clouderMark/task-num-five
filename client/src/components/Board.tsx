import {TableContainer, Paper, Table, TableHead, TableRow, TableBody, SxProps} from '@mui/material';
import {UIEvent} from 'react';

interface IProps {
  tableHeadCells?: JSX.Element;
  tableBodyCells: JSX.Element;
  sx?: SxProps;
  onScroll?(event: UIEvent<HTMLElement>): void;
}

export const Board = (props: IProps) => (
  <TableContainer component={Paper} sx={{mt: 2, mb: 2, ...props.sx}} onScroll={props.onScroll}>
    <Table>
      {props.tableHeadCells ? (
        <TableHead>
          <TableRow>{props.tableHeadCells}</TableRow>
        </TableHead>
      ) : null}
      {props.tableBodyCells ? <TableBody>{props.tableBodyCells}</TableBody> : null}
    </Table>
  </TableContainer>
);
