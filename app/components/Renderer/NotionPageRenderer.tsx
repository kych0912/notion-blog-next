'use client';

import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import "../../styles/notion.css"

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

export default function NotionPage({recordMap, user} : {recordMap: any,user:string}){
    if (!recordMap) {
      return null
    }
    
  return(
    <>
        <NotionRenderer 
          recordMap={recordMap} 
          mapPageUrl={(pageId) => `/${user}/${pageId}`}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Collection,
            Equation,
            Pdf,
            Modal,  
          }}
          darkMode={false} 
        />
    </>
  )
}