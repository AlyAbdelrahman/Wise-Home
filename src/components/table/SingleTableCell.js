import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles({
    imgContainer: {
      width: '3rem',
    },
    image:{
        width: '100%',
        height: '100%'
    }
  });
const SingleTableCell = (props) => {
    const { data, type } = props;
    const classes = useStyles();
    const getCellData = () => {
        switch (type) {
            case 'text':
                return <p>{data}</p>
            case 'array':
                return data.map(el => <p key={uuidv4()}>{el.name}</p>)
            case 'image':
                return <div className={classes.imgContainer}><img className={classes.image} src={data} alt="img" /></div>
            default:
                break;
        }
    }
    return getCellData()
}
export default SingleTableCell;
