/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import Blobs from "./Blobs";
import Globe from "./Globe";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function HomePage({ user }: { user: Session | null }) {
  return (
    <div className="relative h-screen">
      <div className="absolute flex max-h-screen h-full overflow-hidden items-center justify-center w-full -z-10 blur-xl">
        <Blobs />
      </div>
        <div className="absolute flex min-h-screen items-start justify-center w-full -z-10">
          <Globe />
        </div>

      <main className="min-h-screen flex flex-col items-center justify-between p-4 md:p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-row gap-4">
            <Link target="_blank" href="https://chromewebstore.google.com/detail/tubex-youtube-ai%E5%85%8D%E8%B4%B9%E5%B7%A5%E5%85%B7/bifndkhccndcnabjhllngpdapfakfcif">
              YouTubeBot
            </Link>
            <Link target="_blank" href="https://bot.tubex.chat">
              WechatBot
            </Link>
            <Link target="_blank" href="https://binance.tubex.chat">
              BinanceBot
            </Link>
          </div>
            <div className="fixed bottom-0 left-0 flex flex-col gap-4 h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            {user && user.user ? (
              <div className="flex justify-between">
                <Link href="/dashboard">
                  <button
                      className="px-4 py-2 rounded-full bg-black text-white flex gap-2 justify-between items-center">
                      <img src={`${user.user.image}`} width={30} height={30} alt="user image" style={{borderRadius:20}}/>
                      <p className="text-center mt-1">{user.user.name}</p>
                  </button>
                </Link>
                <button  
                    onClick={()=>signOut()}
                    className="px-4 py-2 rounded-full flex gap-2 justify-between items-center">
                    <p className="text-center mt-1">Exit</p>
                </button>
             </div>
            ) : <div/>}
            </div>

        </div>

          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <div className="text-4xl md:text-6xl mt-50">TubeX</div>
            <div className="text-4xl md:text-6xl"> Build Generative AI bots for the World</div>
            {user && user.user ? (
              <Link href="/dashboard">
             <button  
             className="px-4 py-2 rounded-full bg-black text-white flex gap-2 justify-between items-center">
              <p className="text-center mt-1">Get Started</p>
            </button>
            </Link>
            ) :   
            <div>
              <center>
            <button
            onClick={() => signIn('google')}
            className="px-4 py-2 rounded-full bg-black text-white flex gap-2 justify-between items-center"
          >
            <img
              src={'./google.png'}
              width={20}
              height={20}
              alt="google logo"
            />
            <p className="text-center mt-1">Continue with Google</p>
          </button>
          </center>
            <p className="text-gray-500 mt-10">By signing up, you agree to our 
              <a target="_blank" href="/terms-of-service" className="text-blue-500">Terms of Service</a>
               & 
               <a target="_blank" href="/privacy-pilicy" className="text-blue-500">Privacy Policy</a>
            </p>
         
          </div>
          }
            <p className="text-gray-500 fixed bottom-0 left-0 p-4">
              © 2024 TubeXChat, Inc. All rights reserved.
            </p>

          </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
    </div>
  );
}

export default HomePage;
