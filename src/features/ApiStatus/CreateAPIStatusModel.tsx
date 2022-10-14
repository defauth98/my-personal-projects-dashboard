import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { api } from '../../api/api'

export default function CreateAPIStatusModal({
  open,
  closeModal,
  getApis,
}: {
  open: boolean
  closeModal: () => void
  getApis: () => void
}) {
  const { handleSubmit, register } = useForm()

  async function onSubmit(values: any) {
    try {
      await api.post('/api-status', {
        name: values.name,
        link: values.link,
      })
    } catch (error) {
      console.log('error', error)
    }

    closeModal()
    getApis()
  }

  return (
    <>
      <Modal isOpen={open} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar API</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex
                flexDirection="row"
                mt="16px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="1.2rem">Nome: </Text>
                <Input type="text" width="20rem" {...register('name')} />
              </Flex>

              <Flex
                flexDirection="row"
                mt="16px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="1.2rem">Link: </Text>
                <Input type="text" width="20rem" {...register('link')} />
              </Flex>

              <Flex justifyContent="center" marginTop="2rem">
                <Button colorScheme="blue" mr={3} type="submit">
                  Adicionar
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
