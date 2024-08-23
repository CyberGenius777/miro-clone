'use client'
import { useOrganization } from '@clerk/nextjs'

import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'react-toastify'

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { isLoading, mutate } = useApiMutation(api.board.create)

  const onClickHandler = () => {
    if (!organization) return

    mutate({
      orgId: organization?.id,
      title: 'Без названия',
    })
      .then((id) => {
        toast.success('Доска создана')
      })
      .catch(() => toast.error('Не удалось создать доску'))
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>Пока нет досок</h2>

      <p className='text-muted-foreground text-sm mt-2'>Начните работу создав первую доску</p>

      <div className='mt-6'>
        <Button disabled={isLoading} size='lg' onClick={onClickHandler}>
          Создать доску
        </Button>
      </div>
    </div>
  )
}
