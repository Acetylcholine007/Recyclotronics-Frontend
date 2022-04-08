import React from 'react'
import "../../styles/ExtraSmallBinStatus.css"

function ExtraSmallBinStatus() {
  return (
    <div className='xs-bin-container'>
        <div className="xs-top-cover"></div>
        <div className="xs-bin-cover"></div>
        <div className='xs-bin-wrapper'>
            <div className="xs-bin-status"></div>
            <div className='xs-bin-gauge'>
            </div>
        </div>
    </div>
  )
}

export default ExtraSmallBinStatus