/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import styles from './style.module.css';
import { auth } from '@/server/auth';
import { redirect } from "next/navigation";
import Client from './client';

export default async function Dashboard() {
  const user = await auth();
  
  if(!user){
    // 跳转首页
    redirect('/')
  }
  return (
    <div className={styles.markdown}>
      <Client user={user}/>
    </div>
  );
}

