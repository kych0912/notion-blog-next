"use client"
import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {NotionPageHeader} from './NotionPageHeader'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

export default function NotionPage({recordMap, rootDomain, rootPageId, user} : {recordMap: any,rootDomain: string,rootPageId:string,user:string}){
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

  console.log(user)
  return(
    <div>
        <NotionRenderer 
          recordMap={recordMap} 
          rootDomain={rootDomain} 
          rootPageId={rootPageId}
          mapPageUrl={(pageId) => `/${user}/${pageId}`}
          disableHeader={true}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Equation,
            Pdf,
            Modal,
            Collection,
            Header: NotionPageHeader
          }}
          fullPage={true} 
          darkMode={false} 
          previewImages
        />
    </div>
  )
}