import React from 'react'
import { DownloadSectionProps } from './interface'
import { Button } from '@chakra-ui/react'

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  title,
  price,
  status,
  version,
  downloadUrl,
  onCartAdd,
  onCartRemove,
}) => {
  const onClick = () => {
    if (status === 'add-to-cart') {
      onCartAdd()
    } else if (status === 'remove-from-cart') {
      onCartRemove()
    }
  }
  
  const colorScheme = () => {
    if (status === 'download') {
      return 'teal'
    } else if (status === 'add-to-cart') {
      return 'orange'
    } else if (status === 'remove-from-cart') {
      return 'red'
    }
  }
  
  return (
    <div className="pt-[24px] w-full flex justify-center items-center">
      <div className="w-full lg:w-[960px] p-3 text-white border-white border-2 rounded-xl overflow-hidden flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Downloads</h2>
        <div className="p-2 flex flex-row justify-between items-center border-white border-2 rounded-xl">
          <span>{title} - Version {version}</span>
          {
            status !== 'login' ?
            (
              status !== 'download' ?
              <Button
                colorScheme={colorScheme()}
                variant="solid"
                onClick={onClick}
              >
                { status === 'add-to-cart' && `Add to Cart: ${price}` }
                { status === 'remove-from-cart' && `Remove from Cart: ${price}` }
              </Button>
              :
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  colorScheme={colorScheme()}
                  variant="solid"
                  onClick={onClick}
                >
                  Download
                </Button>
              </a>
            )
            
            :
            <span>Login to Download</span>
          }
        </div>
      </div>
    </div>
  )
}