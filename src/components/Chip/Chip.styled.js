import { styled } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


export const StyledChip = styled(Chip)({
   
    background: 'white',
    border: '1px solid gray',
    color: 'black',
    '&:hover, &:active': {
        background: '#00A4E6',
        color: 'white'
    }
})
