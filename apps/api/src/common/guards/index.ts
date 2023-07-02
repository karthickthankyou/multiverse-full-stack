import { ForbiddenException } from '@nestjs/common'
import { GetUserType, Role } from '@multiverse-org/types'

export const checkRowLevelPermission = (
  user: GetUserType,
  requestedUid?: string | string[],
  roles: Role[] = ['admin'],
) => {
  if (!requestedUid) return false

  if (user.roles?.some((role) => roles.includes(role))) {
    return true
  }

  const uids =
    typeof requestedUid === 'string'
      ? [requestedUid]
      : requestedUid.filter(Boolean)

  if (!uids.includes(user.uid)) {
    throw new ForbiddenException()
  }
}
