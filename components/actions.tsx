'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { ConfirmModal } from './confirm-modal'
import { Button } from './ui'
import { useRenameModal } from '@/store'

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { onOpen } = useRenameModal()
  const { mutate, isLoading } = useApiMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() =>
        toast.success('Скопировано', {
          theme: 'light',
        }),
      )
      .catch(() => toast.error('Ошибка при копировании ссылки'))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Доска удалена'))
      .catch(() => toast.error('Ошибка при удалении доски'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className='w-60'
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
          <Link2 className='h-4 w-4 mr-2' />
          Скопировать ссылку на доску
        </DropdownMenuItem>

        <DropdownMenuItem className='p-3 cursor-pointer' onClick={() => onOpen(id, title)}>
          <Pencil className='h-4 w-4 mr-2' />
          Переименовать
        </DropdownMenuItem>

        <ConfirmModal
          header='Удалить доску?'
          description='Удалится доска и все содержимое доски'
          disabled={isLoading}
          onConfirm={onDelete}
        >
          <Button
            variant='ghost'
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Удалить
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
