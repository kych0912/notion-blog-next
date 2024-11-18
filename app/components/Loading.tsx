import * as React from 'react'

import { LoadingIcon } from './LoadingIcon'
import './styles.module.css'

export const Loading: React.FC = () => (
  <div className="loadingContainer">
    <LoadingIcon />
  </div>
)