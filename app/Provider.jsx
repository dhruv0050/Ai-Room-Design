"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from './_context/UserDetailContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({ children }) {

  const { user } = useUser()
  const [userDetail, setUserDetail] = useState([])
  useEffect(() => {
    user && VerifyUser()
  }, [user])
  const VerifyUser = async () => {
    const dataResult = await axios.post('/api/verify-user', {
      user: user
    })
    setUserDetail(dataResult.data.result)
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, currency: "USD" }}>
        <div>
          {children}
        </div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider
