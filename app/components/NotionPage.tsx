"use client"
import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

export default function NotionPage({recordMap, rootId} : {recordMap: any,rootId: string}){
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

  return(
    <div>
        <NotionRenderer recordMap={recordMap} rootPageId={rootId} fullPage={true} darkMode={false} previewImages/>
    </div>
  )
}