import { useState } from 'react';
 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { makeStyles } from '@material-ui/core/styles';

import FilterListIcon from '@material-ui/icons/FilterList';

import CustomChip from '../Chip/CustomChip';

const useStyles = makeStyles({
    customAccordion: {
        '&:before, &:after': {
            display: 'none',
            cursor: 'default'
        },
        cursor: 'default'
    },
    customAccordionSummary: {
        color: '#0521D8',
        fontWeight: 'bold',
        justifyContent: "flex-end",
        gap: '10px',
        cursor: 'default'
    },
    customAccordionDetails: {
        backgroundColor: '#F8FAFB'
    }
  })

  const ChipData = [
      {
          'label': 'Make', 
          'clickable': true
      },
      {
          'label': 'Model', 
          'clickable': true
      },
      {
          'label': 'Price', 
          'clickable': true
      },
      {
          'label': 'Model', 
          'clickable': true
      },
      {
          'label': 'Price', 
          'clickable': true
      },
      {
          'label': 'Model', 
          'clickable': true
      },
      {
          'label': 'Price', 
          'clickable': true
      },
  ]

  
const FilterMenu = () => {
    const classes = useStyles();

    const [expand, setExpand] = useState(false);
    const toggleAcordion = () => {
        setExpand((prev) => !prev);
    };

    return (
        <Accordion 
            classes={{root: classes.customAccordion}} 
            disableGutters
            elevation={0} 
            expanded={expand}
        > 
            <AccordionSummary
                classes={{ content: classes.customAccordionSummary }}
                aria-controls="panel1a-content"
                id="panel1a-header"
            ><FilterListIcon onClick={toggleAcordion}/> Filter 
               
            </AccordionSummary>
            <AccordionDetails classes={{root: classes.customAccordionDetails}}>
            <div className="filter-chips">    
                {ChipData.map((data) => <CustomChip {...data}/>)}
                <p className="text-action">Clear Filter(s)</p>
            </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default FilterMenu