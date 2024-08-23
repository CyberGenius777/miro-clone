import { Button } from '@/components/ui'
import { CreateOrganization } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const NoOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>Добро пожаловать в Board</h2>

      <p className='text-muted-foreground text-sm mt-2'>
        Создайте организацию, чтобы начать работу
      </p>

      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='lg'>Создать организацию</Button>
          </DialogTrigger>

          <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
