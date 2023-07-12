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
          <div className="flex gap-1 font-medium">
            <BrandIcon /> M.
          </div>
        ) : (
          <div className="flex items-center gap-1 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <div>Multiverse</div>
                <span className="text-xs">{type}</span>
              </div>
              <div className="text-xs text-gray">Karthick Ragavendran</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
