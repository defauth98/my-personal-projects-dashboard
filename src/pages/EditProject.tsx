import {
  Button,
  Checkbox,
  Container,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { ArrowLeft } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { api } from '../api/api'
import { useAuth } from '../contexts/authContext'
import Header from '../features/Header/Header'

import { ProjectType } from '../types/Project.dto'

type Tag = {
  id: number
  name: string
}

const CDN_LINK = 'https://personal-projects.defauth98.com/'

export default function EditProject() {
  const { handleSubmit, register, setValue } = useForm()

  const [submitingThumb, setsubmitingThumb] = useState(false)
  const [submitingGif, setsubmitingGif] = useState(false)
  const [submiting, setsubmiting] = useState(false)
  const [avaliableTags, setAvailableTags] = useState<Tag[]>([])
  const [projectTags, setProjectTags] = useState<string[]>([])

  const { projectId } = useParams()

  const navigation = useNavigate()

  const { user, retrieveDataFromLocalStorage } = useAuth()

  async function getAvailableTags() {
    const tagResponse = await api.get<Tag[]>('tag')

    setAvailableTags(tagResponse.data)
  }

  async function submitProject(values: any) {
    setsubmiting(true)

    const { name, description, link, repoLink, faviconLink } = values

    await api.put(`/projects/${projectId}`, {
      name,
      description,
      link,
      repoLink,
      faviconLink,
    })

    setsubmiting(false)
  }

  async function onSubmitThumbnail(values: any) {
    setsubmitingThumb(true)

    const thumbnail = values.thumbnail[0]

    const file = thumbnail.name.split('.')

    const {
      data: { url, fileName },
    } = await api.post(`uploadFile?filetype=${file[1]}&filePrefix=${file[0]}`)

    await axios.put(url, thumbnail, {
      headers: { Accept: 'application/json', 'Content-Type': thumbnail.type },
    })

    await api.put(`/projects/${projectId}`, {
      thumbnailPath: CDN_LINK + fileName,
    })

    setsubmitingThumb(false)
  }

  async function onSubmitGif(values: any) {
    setsubmitingGif(true)

    const thumbnail = values.thumbnail[0]

    const file = thumbnail.name.split('.')

    const {
      data: { url, fileName },
    } = await api.post(`uploadFile?filetype=${file[1]}&filePrefix=${file[0]}`)

    await axios.put(url, thumbnail, {
      headers: { Accept: 'application/json', 'Content-Type': thumbnail.type },
    })

    await api.put(`/projects/${projectId}`, {
      gifPath: CDN_LINK + fileName,
    })

    setsubmitingGif(false)
  }

  function handleGoBack() {
    navigation('/projects')
  }

  async function getProjectData() {
    const response = await api.get<ProjectType>(`/projects/${projectId}`)

    const keys = Object.keys(response.data) as Array<keyof typeof response.data>

    for (const key of keys) {
      if (key === 'ProjectHasTags') {
        const projectTags = response.data.ProjectHasTags.map((projectTag) => {
          return projectTag.tag.name
        })

        setProjectTags(projectTags)
      }

      if (key !== 'hidden' && key !== 'createdAt' && key !== 'updatedAt') {
        setValue(key, response.data[key])
      }
    }
  }

  async function toggleProjectTag(tag: Tag, projectAlreadyHas: boolean) {
    if (projectAlreadyHas) {
      await api.delete(`/project/${projectId}/tag/${tag.id}`)

      setProjectTags(projectTags.filter((item) => item !== tag.name))
    } else {
      await api.post(`/project/${projectId}/tag`, { tag_id: tag.id })
      setProjectTags([...projectTags, tag.name])
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

  useEffect(() => {
    getAvailableTags()
  }, [])

  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Button margin="2rem 0" onClick={handleGoBack}>
          <ArrowLeft size={32} />
        </Button>

        <form onSubmit={handleSubmit(submitProject)}>
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
            <Text mb="4px">Tags</Text>

            {avaliableTags.map((tag) => {
              const checked = projectTags.includes(tag.name)

              return (
                <Checkbox
                  key={tag.id}
                  {...register(`tag-${tag.id}`)}
                  isChecked={checked}
                  onChange={() => toggleProjectTag(tag, checked)}
                >
                  {tag.name}
                </Checkbox>
              )
            })}
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={submiting}
              type="submit"
            >
              Salvar projeto
            </Button>
          </Flex>
        </form>

        <form onSubmit={handleSubmit(onSubmitThumbnail)}>
          <Flex flexDirection="column" mt="16px">
            <Text mb="4px">Thumbnail</Text>
            <Input padding="6px" type="file" {...register('thumbnail')} />
          </Flex>

          <Flex flexDirection="column" mt="16px">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={submitingThumb}
              type="submit"
            >
              Salvar thumbnail
            </Button>
          </Flex>
        </form>

        <form onSubmit={handleSubmit(onSubmitGif)}>
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
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={submitingGif}
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
