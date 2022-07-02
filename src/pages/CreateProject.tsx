import { Button, Checkbox, Container, Flex, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'phosphor-react'
import { api } from '../api/api'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { githubAPI } from '../api/githubApi'
import Header from '../features/Header/Header'
import { AxiosResponse } from 'axios'

type tag = {
  id: number
  name: string
}

interface projectCreateResponse {
  id?: string
  message?: string
}

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

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

  async function onSubmit(values: any) {
    const projectData = new FormData()

    const keys = Object.keys(values)

    for (const key of keys) {
      const value = values[key]

      if (!value.length) {
        switch (key) {
          case 'description':
            projectData.append('description', projectDescription)
            break
          case 'repoLink':
            projectData.append('repoLink', projectRepoLink)
            break
          case 'link':
            projectData.append('link', projectRepoLink)
            break
        }
      } else if (typeof value === 'object') {
        projectData.append(key, value[0])
      } else {
        projectData.append(key, value)
      }
    }

    let tags = keys.filter(key => {
      if (values[key] === true) {
        return true
      }

      return false
    })

    try {
      const response: AxiosResponse<projectCreateResponse> = await api.post(
        '/projects',
        projectData
      )

      if (response.data.message) {
        alert(response.data.message)
      } else {
        tags = tags.map(tag => tag.split('-')[1])

        const promises = tags.map(async tag => {
          await api.post(`/project/${response.data.id}/tag`, {
            tag_id: Number(tag)
          })
        })

        await Promise.all(promises)

        navigation('/projects')
      }
    } catch (error) {
      alert(error)
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
            <Input padding="6px" type="file" {...register('thumbnail')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Gif</Text>
            <Input padding="6px" type="file" marginTop="4px" {...register('gif')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Tags</Text>

            {tags.map(tag => <Checkbox key={tag.id} {...register(`tag-${tag.id}`)}>{tag.name}</Checkbox>)}
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
