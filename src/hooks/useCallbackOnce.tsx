import React, { useEffect, useRef } from 'react'

type Props = {
  callback: () => any
  sessionKey?: string
}

const useCallbackOnce: React.FC<Props> = ({ callback, sessionKey }) => {
  const invoked = useRef<boolean>(false)

  useEffect(() => {
    const hasBeenInvoked = sessionKey ? sessionStorage.getItem(sessionKey) : invoked.current

    if (!hasBeenInvoked) {
      callback()
      invoked.current = true
    }

    if (sessionKey) {
      sessionStorage.setItem(sessionKey, 'true')
    }

  }, [callback, sessionKey])

  return null
}

export default useCallbackOnce
