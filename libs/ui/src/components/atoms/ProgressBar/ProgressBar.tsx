import { LinearProgress, LinearProgressProps } from '@mui/material'

export const ProgressBar = (props: LinearProgressProps) => {
  return (
    <LinearProgress
      classes={{
        // bar: 'bg-black/10',
        colorPrimary: 'bg-primary/30',
        bar1Determinate: 'bg-primary',
        bar1Indeterminate: 'bg-primary',
      }}
      {...props}
    />
  )
}
