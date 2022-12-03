import { Box, Button, Card, CardBody, Grid, GridItem, Link, Spinner, Text } from '@chakra-ui/react'
import styles from './index.module.scss'
import { useSession, signIn, signOut } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useWeb3 } from '@3rdweb/hooks';
import { useToast } from '@chakra-ui/react'
import { useAppSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import { minting, setPayload } from '@/app/store/reducers/app';

const Index = () => {
  const { data: session } = useSession();
  const recaptchaRef: any = React.createRef();

  const { google, captcha } = useAppSelector((state) => state?.app)
  
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
      dispatch(setPayload({
        property: 'captcha',
        linking: true
      }))
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
        dispatch(setPayload({
          property: 'captcha',
          linked: true,
          linking: false
        }))
      } else {
        // Else throw an error with the message returned
        // from the API
        dispatch(setPayload({
          property: 'captcha',
          linked: false,
          linking: false
        }))
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


  useEffect(() => {
    if (session) {
      dispatch(setPayload({
        property: 'google',
        linked: true,
        linking: false
      }))
    }
  }, [session])

  // const [minting, setMinting] = useState(false)
  const dispatch = useDispatch()
  const mint = (property: string) => {
    try {
      dispatch(minting({
        property,
        minting: true,
        address
      }))
    } catch(e) {
      
    }
  }

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6} className={styles.container}>
      <GridItem>
        {google || !google?.minting || !google?.loading ? <Card className={styles.itemcontainer}>
          <Button
            onClick={() => {
              !session ? signIn(): signOut()}}
          >
            {session ? 'Logout': 'Login with Email'}
          </Button>
            {google?.linked && !google?.minting  ? <Button
            onClick={() => mint('google')}
          >Mint</Button>: google?.minting ? <Spinner />: null}
        </Card>: <Spinner />}
      </GridItem>
      <GridItem>
        {captcha || !captcha?.minting || !captcha?.loading  ? <Card className={styles.itemcontainer}>
          <ReCAPTCHA
            ref={recaptchaRef}
            // size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
          />
          {captcha?.linked && !captcha?.minting ? <Button
            onClick={() => mint('captcha')}
          >Mint</Button>: captcha?.minting ? <Spinner />: null}
        </Card>: <Spinner />}
            
      </GridItem>
    </Grid>
  )
}

export default Index