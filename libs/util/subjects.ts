import { Subject } from 'rxjs'
import { NotificationType } from '@multiverse-org/types'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
