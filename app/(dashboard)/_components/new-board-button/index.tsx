'use client'

import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import { toast } from 'react-toastify'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, isLoading } = useApiMutation(api.board.create)

  const onCreate = () => {
    mutate({
      orgId,
      title: 'Без названия',
    })
      .then((id) => {
        toast.success('Доска создана')
      })
      .catch(() => toast.error('Ошибка при создании доски'))
  }

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onCreate}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (disabled || isLoading) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed',
      )}
    >
      <div />
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New Board</p>
    </button>
  )
}
