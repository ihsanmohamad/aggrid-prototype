import  { useState } from 'react'

/**
 * @param MenuOption
 * handle morevert icon option
*/

export const useMenu = () => {
    const [open, setOpen] = useState(null)

    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = () => {
        setOpen(null)
    }

    return {
        open,
        handleClick,
        handleClose
    }

}