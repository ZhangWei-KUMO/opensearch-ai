'use client'
import React, { useEffect, useRef, useState } from "react";
import styles from './style.module.css';
import { Session } from "next-auth";


function Dashboard({ user }: { user: Session | null }) {
  
  return (
    <div className={styles.markdown}>
      
    </div>
  );
}

export default Dashboard

