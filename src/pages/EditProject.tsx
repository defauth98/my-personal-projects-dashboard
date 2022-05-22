import { Button, Container, Flex, Input, Text } from '@chakra-ui/react'
import { ArrowLeft } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { api } from '../api/api'
import { useAuth } from '../contexts/authContext'
import Header from '../features/Header/Header'

import { ProjectType } from '../features/projectTable/dto/Project.dto'
import createFormData from '../utils/createFormData'

export default function EditProject() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    setValue,
  } = useForm()

  const { projectId } = useParams()

  const navigation = useNavigate()

  const { user, retrieveDataFromLocalStorage } = useAuth()

  async function onSubmitProjectFields(values: any) {
    const projectData = createFormData(values)

    await api.put(`/projects/${projectId}`, projectData)
  }

  async function onSubmitThumbnail(values: any) {
    const projectData = createFormData(values)

    await api.put(`/projects/${projectId}`, projectData)
  }

  async function onSubmitGif(values: any) {
    const projectData = createFormData(values)

    await api.put(`/projects/${projectId}`, projectData)
  }

  function handleGoBack() {
    navigation('/projects')
  }

  async function getProjectData() {
    const response = await api.get<ProjectType>(`/projects/${projectId}`)

    const keys = Object.keys(response.data) as Array<keyof typeof response.data>

    for (const key of keys) {
      if (key !== 'hidden' && key !== 'createdAt' && key !== 'updatedAt') {
        setValue(key, response.data[key])
      }
    }
  }

  useEffect(() => {
    if (user === null) {
      retrieveDataFromLocalStorage()
    }
  }, [user])

  useEffect(() => {
    getProjectData()
  }, [projectId])

  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Button margin="2rem 0" onClick={handleGoBack}>
          <ArrowLeft size={32} />
        </Button>

        <form onSubmit={handleSubmit(onSubmitProjectFields)}>
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
            <Text mb="4px">Link do favicon</Text>
            <Input type="url" {...register('faviconLink')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar projeto
            </Button>
          </Flex>
        </form>

        <form onSubmit={handleSubmit(onSubmitThumbnail)}>
          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Thumbnail</Text>
            <Input type="file" {...register('thumbnail')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar thumbnail
            </Button>
          </Flex>
        </form>

        <form onSubmit={handleSubmit(onSubmitGif)}>
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
              Salvar gif
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  )
}
