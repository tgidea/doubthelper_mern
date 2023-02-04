import { makeStyles } from "@material-ui/core";
export default makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '100%',
    },
    leftSection: {
      flex: 1,
      padding: '16px',
    },
    rightSection: {
      width: '20%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
    },
  });