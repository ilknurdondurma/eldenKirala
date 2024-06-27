import React from 'react'
import ToggleSwitch from '../../../components/toggle'

function BildirimTercihlerim() {
  return (
    <div className='h-full'>
      <ToggleSwitch label="Bildirimlere İzin Ver"/>
      <ToggleSwitch label="E posta Bildirimlerine İzin Ver"/>
      <ToggleSwitch label="SMS Bildirimlerine İzin Ver"/>
      <ToggleSwitch label="Gelen Kutusu Bildirimlerine İzin Ver"/>
      <ToggleSwitch label="İndirim Bildirimlerine İzin Ver"/>



    </div>
  )
}

export default BildirimTercihlerim
