'use client'
import DefaultLayout from "@/app/Layout/DefaultLayout";
import WritePostLayout from "@/app/Layout/WritePostLayout";
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WritePostLayout>
            {children}
    </WritePostLayout>
  );
}
