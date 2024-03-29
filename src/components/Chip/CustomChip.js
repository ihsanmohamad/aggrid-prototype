import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {Chip, Menu, Paper, InputBase, Divider, IconButton, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useDispatch,useSelector } from 'react-redux';
import { getColumns } from '../../redux/actions/agGrid'

const useStyles = makeStyles({
    section: {
        padding: '8px 20px',
    },
    checkbox: {
        padding: '8px 20px',
        display: 'flex',
        flexDirection: 'column',
        height: '200px',
        overflowY: 'scroll',
    },
    action: {
        display: 'flex',
        padding: '8px 20px',
        justifyContent: 'space-between',
        color: '#2139DC',
    },
    item: {
        color: '',
        display: 'flex',
        flexDirection: 'row',
        gap: '25px' 
    },
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        margin: 4,
        width: '100%',
    },
    customChip: {
        background: 'white',
        border: '1px solid gray',
        color: 'black',
        '&:hover, &:active, &:focus, &:enabled': {
            background: '#00A4E6',
            color: 'white'
        }
    }
  })

  const MenuInterface = () => {
    const classes = useStyles();
    
    const { columns } = useSelector(state => state.agGrid)
    const buto = ['test', 'test']
    return (
        <>
        <InputBase
        classes={{root: classes.section, input: classes.input}}
        placeholder="Filter by Bid Status *"
        inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
    </IconButton>
    <Divider className={classes.divider} orientation="horizontal" />
        <FormGroup row className={classes.checkbox}>
            {buto.map(() => {
            <FormControlLabel control={<Checkbox name="test" />} label="test" /> 
        })}
        </FormGroup>
    <Divider className={classes.divider} orientation="horizontal" />
    <div className={classes.action}>
        <div>
        <p>Cancel</p>
        </div>
        <div className={classes.item}>
        <p>Clear</p>
        <p><strong>Apply</strong></p>
        </div>
    </div>
    </>
      )
  }

const CustomChip = (props) => {
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = useState(null);


    const [test, setTest]  = useState([])

    const dispatch = useDispatch()

    const handleClick = (event) => {
        dispatch(getColumns())
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
     
    return (
        <div>
            <Chip classes={{root: classes.customChip}} {...props} onClick={handleClick}/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                horizontal: 'left',
                              }}
            >
              <MenuInterface />
            </Menu>
        </div>
    )
}

export default CustomChip