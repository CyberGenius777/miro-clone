'use client'

import { FormEventHandler, useEffect, useState } from 'react'

import { useRenameModal } from '@/store'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'react-toastify'

export const RenameModal = () => {
  const { mutate, isLoading } = useApiMutation(api.board.update)

  const { initialValues, isOpen, onClose } = useRenameModal()

  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Доска переименована')
        onClose()
      })
      .catch(() => toast.error('Ошибка при изменении названия доски'))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать название доски</DialogTitle>
        </DialogHeader>

        <DialogDescription>Изменить название</DialogDescription>

        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            disabled={isLoading}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Название доски'
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Отменить
              </Button>
            </DialogClose>

            <Button disabled={isLoading} type='submit'>
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
