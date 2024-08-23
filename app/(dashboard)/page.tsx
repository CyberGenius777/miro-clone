'use client'

import { useOrganization } from '@clerk/nextjs'
import { BoardList, NoOrg } from './_components'

interface IDashboardPage {
  searchParams: {
    search?: string
    favorites?: string
  }
}

const DashboardPage = ({ searchParams }: IDashboardPage) => {
  const { organization } = useOrganization()

  if (!organization) {
    return (
      <div className=' flex-1 h-[calc(100%-80px)] p-6'>
        <NoOrg />
      </div>
    )
  }

  return (
    <div className=' flex-1 h-[calc(100%-80px)] p-6'>
      <BoardList orgId={organization.id} query={searchParams} />
    </div>
  )
}

export default DashboardPage
