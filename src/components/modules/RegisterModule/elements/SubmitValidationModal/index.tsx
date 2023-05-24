import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

type Props = {
  isOpenProp: boolean
  onCloseProp: () => void
  onSubmitProp: () => void
}

const Overlay = () => <ModalOverlay bg="white.300" backdropFilter="blur(6px)" />

export const SubmitValidationModal = ({
  isOpenProp,
  onCloseProp,
  onSubmitProp,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<Overlay />)

  // Menggunakan isOpenProp untuk mengontrol keadaan modal
  useEffect(() => {
    if (isOpenProp) {
      setOverlay(<Overlay />)
      onOpen()
    }
  }, [isOpenProp])

  // // Menggunakan onCloseProp untuk menutup modal dari elemen induk
  const handleClose = () => {
    onClose()
    onCloseProp()
  }

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleClose}
        motionPreset="slideInBottom"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center">
            Are you sure the data is correct?
          </ModalHeader>
          <ModalBody className="flex justify-center">
            <p>We will register you after pressing the yes button.</p>
          </ModalBody>
          <ModalFooter className="flex justify-center gap-3">
            <Button colorScheme="teal" onClick={onSubmitProp}>
              Yes
            </Button>
            <Button colorScheme="gray" mr={3} onClick={handleClose}>
              Check Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
