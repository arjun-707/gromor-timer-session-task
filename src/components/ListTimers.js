
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { inTens } from '../utils'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export const ListTimers = ({ rows }) => {
  const classes = useStyles();
  return <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Timer Name</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.length ? rows.map((row, i) => (
              <TableRow key={`${row.username}_${i}`}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{`${inTens(row.hours)}:${inTens(row.minutes)}:${inTens(row.seconds)}.${inTens(row.milliSeconds)}`}</TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell component="th" colSpan="2">
                  No Data Available
              </TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}