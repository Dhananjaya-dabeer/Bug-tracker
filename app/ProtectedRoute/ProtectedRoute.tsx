'use client'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated, loading} = useAuth()
    const router = useRouter()
    useEffect(() => {
        if(loading) return
        if(!isAuthenticated){
            router.push('/login')
        }
    },[router, isAuthenticated])
  return (
    isAuthenticated ? (<>
        {children}
    </>) : null 
  )
}

export default ProtectedRoute