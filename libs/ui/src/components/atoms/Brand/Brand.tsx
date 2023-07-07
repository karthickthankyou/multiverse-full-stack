import { BrandIcon } from '../BrandIcon'
import { Role } from '@multiverse-org/types'

export interface IBrandProps {
  shortForm?: boolean
  className?: string
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <div className="flex gap-1">
            <BrandIcon /> M.
          </div>
        ) : (
          <div className="flex items-center gap-1 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              Multiverse
              <div className="text-xs text-gray">Karthick Ragavendran</div>
            </div>
            <span className="text-xs">{type}</span>
          </div>
        )}
      </div>
    </div>
  )
}
