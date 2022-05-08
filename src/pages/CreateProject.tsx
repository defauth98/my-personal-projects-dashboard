import { Button, Container, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { api } from '../api/api'

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

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

    await api.post('/projects', projectData)
  }

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="md" margin="1rem 1.5rem">
        Projetos no portfólio
      </Heading>

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

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Thumnail</Text>
          <Input type="file" {...register('thumbnail')} />
        </Flex>

        <Flex flexDirection="column" mt="16px">
          <Text mb="4px">Gif</Text>
          <Input type="file" marginTop="4px" {...register('gif')} />
        </Flex>

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
