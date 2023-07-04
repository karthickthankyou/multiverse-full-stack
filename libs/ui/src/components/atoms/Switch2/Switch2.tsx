import { Switch } from '@headlessui/react'
import { ReactNode } from 'react'

export interface Switch2Props {
  label: ReactNode
  children?: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Switch2 = ({
  label,
  children,
  checked,
  onChange,
}: Switch2Props) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-2">{label}</Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-primary-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          >
            {children}
          </span>
        </Switch>
      </div>
    </Switch.Group>
  )
}
