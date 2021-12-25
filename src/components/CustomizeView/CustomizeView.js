import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {Chip, Menu, Paper, InputBase, Divider, IconButton, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useMenu } from '../../useMenu';

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

const CustomizeView = (props) => {
    const classes = useStyles();
    
    const { open, handleClose } = useMenu();

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                horizontal: 'left',
                              }}
            >
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
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Draft" />       
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Accepted" />       
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Out-bid" />       
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Rejected by Bank" />       
                        
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
            </Menu>
        </div>
    )
}

export default CustomizeView