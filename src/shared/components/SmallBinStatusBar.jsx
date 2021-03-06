import React from 'react'
import "../../styles/SmallBinStatusBar.css";

function SmallBinStatusBar({binGauge}) {
  return (
    <div className='small-bin-container'>
        <div className="small-top-cover"></div>
        <div className="small-bin-cover"></div>
        <div className='small-bin-wrapper'>
            <div className="small-bin-status"></div>
            <div className='small-bin-gauge'>
                <h2>{binGauge}%</h2>
            </div>
        </div>
    </div>
  )
}

export default SmallBinStatusBar