import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ScrapAPI from '../../../shared/apis/ScrapAPI';

const SettingsPage = () => {
  const [scraps, setScraps] = useState([]);

  useEffect(async () => {
    let response = await ScrapAPI.getScraps();
    setScraps(response.data);
  }, [])

  return (
    <Box>
      <h1>{scraps.toString()}</h1>
    </Box>
  )
}

export default SettingsPage