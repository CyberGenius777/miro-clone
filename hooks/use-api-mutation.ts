import { useMutation } from 'convex/react'
import { useState } from 'react'

export const useApiMutation = (mutationFunction: any) => {
  const [isLoading, setLoading] = useState(false)

  const apiMutation = useMutation(mutationFunction)

  const mutate = (payload: any) => {
    setLoading(true)
    return apiMutation(payload)
      .then((result) => result)
      .catch((error) => {
        throw error
      })
      .finally(() => setLoading(false))
  }

  return {
    isLoading,
    mutate,
  }
}
