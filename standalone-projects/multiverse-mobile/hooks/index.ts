import { useState, useEffect } from 'react'
import { catchError, debounceTime, EMPTY, Subject, tap } from 'rxjs'

import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../config/firebase'
import { useUserStore } from '../store/user'

export const useTakeSkip = () => {
  const [take, setTake] = useState(12)
  const [skip, setSkip] = useState(0)

  return { take, skip, setTake, setSkip }
}

const useDebounce = (delay: number = 1000) => {
  const [debouncedSet$] = useState(() => new Subject<() => void>())
  useEffect(() => {
    const subscription = debouncedSet$
      .pipe(
        debounceTime(delay),
        tap((func) => func()),
        catchError(() => EMPTY),
      )
      .subscribe()
    return () => subscription.unsubscribe()
  }, [delay, debouncedSet$])

  return debouncedSet$
}

export const useDebouncedValue = <T>(value: T, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const debouncedSet$ = useDebounce(delay)

  useEffect(() => {
    debouncedSet$.next(() => setDebouncedValue(value))
  }, [debouncedSet$, value])

  return debouncedValue
}

export const useUserListener = () => {
  const { resetUser, setUser } = useUserStore((state) => state)

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (!user) {
          resetUser()
          return
        }

        const tokenResult = await firebaseAuth.currentUser?.getIdTokenResult()
        const roles = tokenResult?.claims.roles || []
        const { displayName, email, uid } = user

        setUser({
          uid,
          email: email || '',
          displayName: displayName || '',
          token: tokenResult?.token,
        })
      }),
    [],
  )
}
