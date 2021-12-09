import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { makeStyles } from '@material-ui/core/styles';

import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
    customAccordionSummary: {
        color: '#0521D8',
        justifyContent: "flex-end",
        gap: '10px'
    }

  })

const FilterMenu = () => {
    const classes = useStyles();
    return (
        <Accordion>
            <AccordionSummary
                classes={{ content: classes.customAccordionSummary }}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >Filter <FilterListIcon />
            </AccordionSummary>
            <AccordionDetails>
               
            </AccordionDetails>
        </Accordion>
    )
}

export default FilterMenu


