'use client'
import { Box, Card } from "@mui/material";
import CardLayout from "@/app/Layout/CardLayout";
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <CardLayout>
        <Suspense>
            {children}
        </Suspense>
    </CardLayout>
  );
}
