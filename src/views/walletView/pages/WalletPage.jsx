import { Box, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import UserAPI from '../../../shared/apis/UserAPI';
import { AuthContext } from '../../../shared/contexts/AuthContext';

const WalletPage = () => {
  const auth = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [cashout, setCashout] = useState(0);

  useEffect(async () => {
    let user = await UserAPI.getUserData(auth.userId);
    setBalance(user.data.points);
  }, []);

  const cashoutHandler = () => {

  }

  return (
    <Box>
      <h1>{balance}</h1>
      <Button variant='contained' onClick={cashoutHandler}>PROCESS</Button>
    </Box>
  )
}

export default WalletPage