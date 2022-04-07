import React from 'react'
import "../../styles/BinStatusBar.css";
import CircularProgress from '@mui/material/CircularProgress';

function BinStatusBar({binGauge, loading}) {
  return (
    <div className='bin-container'>
        <div className="top-cover"></div>
        <div className="bin-cover"></div>
        <div className='bin-wrapper'>
            <div className="bin-status"></div>
            <div className='bin-gauge'>
                    {!loading ? <h2>{binGauge}%</h2> :  <CircularProgress sx={{color: "#ffffff"}} className="loading-bin"/>}
            </div>
        </div>
    </div>
  )
}

export default BinStatusBar