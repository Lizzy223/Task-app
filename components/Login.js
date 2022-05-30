import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import Api from '../pages/api/api'
  import {useRouter} from 'next/router'
  
  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const router = useRouter()


    const logInUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const input = {
          email: email,
          password: password,
        };
        try {
          const data = await Api("user/token", "POST", input);
          console.log(data);
          if (data.status) {
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(data.data));
            setUser(data.data);
            router.push("/dashboard");
            return;
          }
          setLoading(false);
          setMessage(data.message);
        } catch (error) {}
      };


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form>
                <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                    </Stack>
                    <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    onClick={(e) => logInUser(e)}
                    >
                    Sign in
                    </Button>
                </Stack>
            </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }