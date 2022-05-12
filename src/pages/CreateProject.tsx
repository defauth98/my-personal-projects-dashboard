import { Button, Container, Flex, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'phosphor-react'
import { api } from '../api/api'
import { useNavigate } from 'react-router'

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

  const navigation = useNavigate()

  async function onSubmit(values: any) {
    const projectData = new FormData()

    const keys = Object.keys(values)

    for (const key of keys) {
      const value = values[key]

      if (typeof value === 'object') {
        projectData.append(key, value[0])
      } else {
        projectData.append(key, value)
      }
    }

    api.defaults.headers.common.Authorization = import.meta.env.VITE_API_TOKEN

    try {
      await api.post('/projects', projectData)
      navigation('/projects')
    } catch (error) {
      alert(error)
    }
  }

  function handleGoBack() {
    navigation('/projects')
  }

  return (
    <Container maxW="container.xl">
      <Button margin="2rem 0" onClick={handleGoBack}>
        <ArrowLeft size={32} />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column">
          <Text mb="4px">Nome do projeto</Text>
          <Input {...register('name')} />
        </Flex>

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Descrição</Text>
          <Input {...register('description')} />
        </Flex>

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Link do repositório</Text>
          <Input type="url" {...register('repoLink')} />
        </Flex>

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Link do projeto</Text>
          <Input type="url" {...register('link')} />
        </Flex>

        {/* <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Thumnail</Text>
          <Input type="file" {...register('thumbnail')} />
        </Flex>

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Gif</Text>
          <Input type="file" marginTop="4px" {...register('gif')} />
        </Flex> */}

        <Flex flexDirection="column" mt="16px">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Criar projeto
          </Button>
        </Flex>
      </form>
    </Container>
  )
}