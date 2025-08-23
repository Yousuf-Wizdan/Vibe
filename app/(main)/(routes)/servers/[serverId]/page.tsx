import React from 'react'

const ServerPage = async ({params}: {params: Promise<{serverId: string}>}) => {

  const serverId = (await params).serverId

  return (
    <div>ServerPage: {serverId}</div>
  )
}

export default ServerPage