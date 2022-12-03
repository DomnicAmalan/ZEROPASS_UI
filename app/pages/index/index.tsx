import { Box, Button, Card, CardBody, Grid, Link, Text } from '@chakra-ui/react'
import styles from './index.module.scss'
import { useSession, signIn, signOut } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useWeb3 } from '@3rdweb/hooks';
import { useToast } from '@chakra-ui/react'

const Index = () => {
  const { data: session } = useSession();
  const recaptchaRef: any = React.createRef();
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    recaptchaRef.current.execute();
  };

  // useEffect(() => {
  //   // if(recaptchaRef.current) {
  //   //   recaptchaRef.current.execute();
  //   // }
  // }, [])

  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false)
  const { connectWallet, address } = useWeb3()
  const toast = useToast()

  const onReCAPTCHAChange = async(captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/auth/verifycaptcha", {
        method: "POST",
        body: JSON.stringify({ captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        // alert("Captach Verified successfully");
        setCaptchaVerified(true)
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message)
      }
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      // recaptchaRef.current.reset();
      // setEmail("");
    }
  }

  const [minting, setMinting] = useState(false)

  return (
    <Grid className={styles.container}>
      {!captchaVerified ? <ReCAPTCHA
        ref={recaptchaRef}
        // size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />: null}
      <Card>
        <CardBody className={styles.itemcontainer}>
          <Button
            onClick={() => {
              !session ? signIn(): signOut()}}
          >
            {session ? 'Logout': 'Login with Email'}
          </Button>
          <Button onClick={!captchaVerified ? handleSubmit: () => {}}>
            {!captchaVerified ? 'Verify Captcha': 'Captcha verified'}
          </Button>
          <Button disabled={minting} onClick={async () => {
            try {
              if (!minting) {
                setMinting(true)
                const {data} = await Axios.post('http://localhost:3001/mint', {address})
                toast({
                  position: 'bottom-left',
                  render: () => (
                    <Box color='white' p={3} bg='blue.500'>
                      {data?.message}
                      <Link href={data?.link} color='white' p={3} bg='blue.500'>
                        here
                      </Link>
                    </Box>
                  ),
                })
                setMinting(false)
              }
            } catch(e) {
              console.log(e)
              setMinting(false)
            }
            // console.log(data?.link)
          }}>
            {minting ? 'Loading...': 'Mint'}
          </Button>
        </CardBody>
      </Card>
    </Grid>
  )
}

export default Index