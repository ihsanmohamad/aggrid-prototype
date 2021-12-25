import  { useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * @param TableEditOption
 * handle morevert icon option
*/

export const useTableEdit = () => {
    const [isEditing, setIsEditing] = useState(null)

    const { gridApi } = useSelector(state => state.agGrid)

    const onStopEdit = () => {
        setIsEditing(false)
        
    }
    const onStartEdit = (id, colKey) => {
        setIsEditing(true)
        gridApi.setFocusedCell(id, colKey)
        gridApi.startEditingCell({
            rowIndex: id,
            colKey: colKey
        })
    }

    return {
        isEditing,
        onStopEdit,
        onStartEdit        
    }

}