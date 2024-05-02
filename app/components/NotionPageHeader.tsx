import * as React from 'react'
import * as types from 'notion-types'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import styles from './styles.module.css'

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        <div className='notion-nav-header-rhs breadcrumbs'>

          <Search block={block} title={null} />
        </div>
      </div>
    </header>
  )
}