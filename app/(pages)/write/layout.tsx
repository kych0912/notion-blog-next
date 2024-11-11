'use client'
import DefaultLayout from "@/app/components/Layout/DefaultLayout";
import WritePostLayout from "@/app/components/Layout/WritePostLayout";
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
