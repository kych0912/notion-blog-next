'use client';

import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import NotionPageHeader from './NotionPageHeader'
import { useRouter } from 'next/navigation'
import { Loading } from './Loading'

import "../styles/notion.css"

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

export default function NotionPage({recordMap, rootDomain, rootPageId, user} : {recordMap: any,rootDomain: string,rootPageId:string,user:string}){

  const router = useRouter()

    if (!recordMap) {
      return null
    }
  return(
    <div>
        <NotionRenderer 
          recordMap={recordMap} 
          rootDomain={rootDomain} 
          rootPageId={rootPageId}
          mapPageUrl={(pageId) => `/${user}/${pageId}`}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Collection,
            Equation,
            Pdf,
            Modal,
            Header: NotionPageHeader,
          }}
          fullPage={true} 
          darkMode={false} 
          previewImages={true}
        />
    </div>
  )
}