import {
  Button,
  Checkbox,
  Container,
  Flex,
  Input,
  Text,
  useToast
} from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { ArrowLeft } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { api } from '../api/api'
import { githubAPI } from '../api/githubApi'
import Header from '../features/Header/Header'
type tag = {
  id: number
  name: string
}

interface projectCreateResponse {
  id?: string
  message?: string
}

const CDN_LINK = 'https://personal-projects.defauth98.com/'

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

  const toast = useToast()

  const navigation = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectRepoLink, setProjectRepoLink] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [tags, setTags] = useState<tag[]>([])

  async function getProjectFromGithub() {
    const githubResponse = await githubAPI.get(
      `/repos/defauth98/${projectName}`
    )

    setProjectDescription(githubResponse.data.description)
    setProjectRepoLink(githubResponse.data.html_url)
    setProjectLink(githubResponse.data.homepage)
  }

  async function getAvailableTags() {
    const tagResponse = await api.get<tag[]>('tag')

    setTags(tagResponse.data)
  }

  useEffect(() => {
    if (projectName.length >= 5) {
      getProjectFromGithub()
    }
  }, [projectName])

  useEffect(() => {
    getAvailableTags()
  }, [])

  async function uploadThumbnail(values: any) {
    if (values.thumbnail.length >= 1) {
      toast({
        title: 'Fazendo upload da thumbnail',
        duration: 1500,
        status: 'info',
        position: 'top-right',
      })

      const {
        data: { url, fileName },
      } = await api.post(`uploadFile?filetype=png&projectName=${values.name}`)

      await axios.put(url, values.thumbnail[0])

      toast({
        title: 'Upload da thumbnail realizado com sucesso',
        duration: 1500,
        status: 'success',
        position: 'top-right',
      })

      return CDN_LINK + fileName
    }
  }

  async function uploadGif(values: any) {
    if (values.gif.length >= 1) {
      toast({
        title: 'Fazendo upload do gif',
        duration: 1500,
        status: 'info',
        position: 'top-right',
      })

      const {
        data: { url, fileName },
      } = await api.post(`uploadFile?filetype=png&projectName=${values.name}`)

      await axios.put(url, values.thumbnail[0])

      toast({
        title: 'Upload do gif realizado com sucesso',
        duration: 1500,
        status: 'success',
        position: 'top-right',
      })

      return CDN_LINK + fileName
    }
  }

  async function onSubmit(values: any) {
    const thumbnailFileName = await uploadThumbnail(values)
    const gifFileName = await uploadGif(values)

    const keys = Object.keys(values)

    let tags = keys.filter((key) => {
      if (values[key] === true) {
        return true
      }

      return false
    })

    try {
      toast({
        title: 'Criando o projeto',
        duration: 1500,
        status: 'info',
        position: 'top-right',
      })

      const project = {
        thumbnailPath: thumbnailFileName,
        gifPath: gifFileName,
        description: values.description,
        faviconLink: values.faviconLink,
        link: values.link,
        name: values.name,
        repoLink: values.repoLink,
      }

      const response: AxiosResponse<projectCreateResponse> = await api.post(
        '/projects',
        project
      )

      if (response.data.message) {
        alert(response.data.message)
      } else {
        tags = tags.map((tag) => tag.split('-')[1])

        const promises = tags.map(async (tag) => {
          await api.post(`/project/${response.data.id}/tag`, {
            tag_id: Number(tag),
          })
        })

        await Promise.all(promises)

        navigation('/projects')
      }

      toast({
        title: 'Projeto criado com sucesso',
        duration: 1500,
        status: 'success',
        position: 'top-right',
      })
    } catch (error: any) {
      toast({
        title: 'Erro ao criar o projeto',
        description: error.message,
        duration: 500,
        status: 'error',
        position: 'top-right',
      })
    }
  }

  function handleGoBack() {
    navigation('/projects')
  }

  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Button margin="2rem 0" onClick={handleGoBack}>
          <ArrowLeft size={32} />
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column">
            <Text mb="4px">Nome do projeto</Text>
            <Input
              {...register('name')}
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Descrição</Text>
            <Input
              {...register('description')}
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Link do repositório</Text>
            <Input
              type="url"
              {...register('repoLink')}
              value={projectRepoLink}
              onChange={(event) => setProjectRepoLink(event.target.value)}
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Link do projeto</Text>
            <Input
              type="url"
              {...register('link')}
              value={projectLink}
              onChange={(event) => setProjectLink(event.target.value)}
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Link do favicon</Text>
            <Input type="url" {...register('faviconLink')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Thumbnail</Text>
            <Input
              padding="6px"
              type="file"
              {...register('thumbnail')}
              name="thumbnail"
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Gif</Text>
            <Input
              padding="6px"
              type="file"
              marginTop="4px"
              {...register('gif')}
            />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Tags</Text>

            {tags.map((tag) => (
              <Checkbox key={tag.id} {...register(`tag-${tag.id}`)}>
                {tag.name}
              </Checkbox>
            ))}
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
    </>
  )
}
