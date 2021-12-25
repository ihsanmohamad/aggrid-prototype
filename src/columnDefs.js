import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMenu } from './useMenu'
import { useTableEdit } from './useTableEdit'

const ColumnDef = (props) => {

  const { open, handleClick, handleClose } = useMenu()
  const { isEditing, onStartEdit, onStopEdit } = useTableEdit()  

  return (
    <>
    <IconButton onClick={handleClick}><MoreVertIcon /></IconButton>
        <Menu 
          id="table-option"
          anchorEl={open}
          keepMounted
          open={Boolean(open)}
          onClose={handleClose}  
        >
          <MenuItem onClick={() => onStartEdit( props.params.node, 'make')}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Revise</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
    </>
  )
}

export const columnDefs = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        colId: "selection-col",
        maxWidth: 50,
        pdfExportOptions: {
          skipColumn: true
        },
        lockPosition: true,
        pinned: true        
    },
    {
      headerName: "Bidder ID / Name",
      field: "id",
      suppressMovable: true,
      lockPosition: true
    },
    { headerName: "Vehicle Cat.", field: "vehcat", colId: "vehcat" },
    { headerName: "Bid Qty", field: "bidqty", colId: "bidqty"  },
    { headerName: "Reserve Price (SGD)", field: "resprice", colId: "resprice"  },
    { headerName: "Bid Status", field: "bidstatus", colId: "bidstatus"  },
    { headerName: "Ack Code / Bank Ref", field: "ackcode", colId: "ackcode"  },
    { headerName: "Remarks", field: "remarks", colId: "remarks"  },
    { headerName: "", field: "action", editable: false, colId: "action", cellRendererFramework: params => <ColumnDef params={params} />  },
]
