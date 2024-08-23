export const EmptyFavorites = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>Пока в избранных ничего нет</h2>

      <p className='text-muted-foreground text-sm mt-2'>
        Здесь появится список ваших избранных досок
      </p>
    </div>
  )
}
