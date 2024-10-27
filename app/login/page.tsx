'use client'

import { Box, Card, Inset, Strong, Text, Button, TextField, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Await the login call
    } catch (error) {
      toast.error("Error in login Please try after some time!"); // Show error message if login fails
    }
  };

  return (
   <div className='flex justify-center items-center h-[80vh] w-full'>
     <Box minWidth="240px" maxWidth="400px" >
     
      <Card size="5">
      <Flex gap={"3"} align={"center"} direction={"column"}>
          <Text  size="4" >
            Login
          </Text>
        {/* <div  className='flex justify-center mb-6'>
        </div> */}
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
          <Box>
            <TextField.Root
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              size={"3"}
            />
          </Box>
          <Box>
            <TextField.Root
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              size={"3"}
            />
          </Box>
          <div className='flex justify-center'>
          <Button type="submit" className='self-center' style={{cursor:'pointer'}}>
            Login
          </Button>
          </div>
        </form>
        </Flex>
      </Card>
    </Box>
   </div>
  );
};

export default Login;

