import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'

export interface IAddChoicesDialogProps {}

export const AddChoicesDialog = ({}: IAddChoicesDialogProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="text" size="none" onClick={() => setOpen(true)}>
        Add choices
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Add choices'}>
        Hello there
      </Dialog>
    </div>
  )
}
