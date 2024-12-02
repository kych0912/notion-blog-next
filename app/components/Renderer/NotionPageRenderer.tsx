'use client'

import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material' 
import { ExtendedRecordMap } from 'notion-types'
import { useRouter } from 'next/navigation'
import { useTransition} from "react"

import "../../styles/notion.css"
import { Loading } from '../Loading'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

// const Collection = dynamic(() =>
//   import('react-notion-x/build/third-party/collection').then(
//     (m) => m.Collection
//   ),
// )

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

export default function NotionPage({
  recordMap,
  user,
  isPreview = false
} : {recordMap: ExtendedRecordMap,user:string,isPreview?:boolean}){
    const router = useRouter()
    const [isPending,startTransition] = useTransition()

    if (!recordMap) {
      return null
    }

    const mapPageUrl = (pageId:string) =>{

      if(isPreview){
        return `/write?pageId=${pageId}`
      }

      return `/${user}/${pageId}`
    }
    
    const PageLink = ({ href, children, ...props }:{
      href:string,
      children:React.ReactNode,
      props:React.HTMLAttributes<HTMLDivElement>
    }) => {
      return (
        <div 
          onClick={() => {
            if(isPreview) {
              router.push(href)
            }else{
              startTransition(()=>{   
                router.push(href)
              })
            }
          }}
          style={{ cursor: 'pointer' }}
          {...props}
        >
          {children}
        </div>
      )
    }
    
  return(
    <Box sx={{
      display:'flex',
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      margin:"0 auto",
      maxWidth:"720px", 
      width:"100%",

    }}>
        <NotionRenderer 
          recordMap={recordMap}
          mapPageUrl={mapPageUrl}
          previewImages={true}
          fullPage={false}
          components={{
            PageLink,
            Code,
            Equation,
            Pdf,
            Modal,  
          }}
          darkMode={false} 
        />
        {
          isPending && <Loading/>   
        }
    </Box>
  )
}