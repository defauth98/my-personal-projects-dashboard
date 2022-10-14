import { Flex, GridItem, Heading, Link, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

type ApiStatusAndDbProp = {
  link: string
  name: string
}

type ApiStatusResponse = {
  api: string
  db: string
}

export default function ApiStatusAndDb({ link, name }: ApiStatusAndDbProp) {
  const [response, setResponse] = useState<ApiStatusResponse>()

  async function getStatus() {
    try {
      const response = await axios.get<ApiStatusResponse>(link)

      setResponse(response.data)
    } catch (error) {
      setResponse({ api: 'off', db: 'off' })
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  const apiColor = response?.api === 'on' ? '#1D804A' : '#FF0000'
  const dbColor = response?.db === 'on' ? '#1D804A' : '#FF0000'

  const gridItemColor =
    response?.api === 'on' && response.db === 'on' ? '#D6EBCC' : '#EBDDCC'

  return (
    <GridItem
      background={gridItemColor}
      width="100%"
      height="130px"
      borderRadius="8px"
      padding="8px"
      border="1px solid #C5C5C5"
    >
      <Heading as="h5" size="sm" color="black">
        {name}
      </Heading>

      <Link href={link} fontSize="12px" color="#9F9F9F" target="_blank">
        {link}
      </Link>

      <Flex
        backgroundColor="#D7D1D1"
        borderRadius="16px"
        width="fit-content"
        marginTop="0.3rem"
      >
        <Text color="#9F9F9F" paddingLeft="8px">
          API Status:{' '}
        </Text>
        <Text color={apiColor} margin=" 0 0.5rem" fontWeight="bold">
          {response?.api === 'on' ? 'on' : 'off'}
        </Text>
      </Flex>

      <Flex
        backgroundColor="#D7D1D1"
        borderRadius="16px"
        width="fit-content"
        marginTop="0.6rem"
      >
        <Text color="#9F9F9F" paddingLeft="8px">
          DB Status:{' '}
        </Text>
        <Text color={dbColor} margin=" 0 0.5rem" fontWeight="bold">
          {response?.db === 'on' ? 'on' : 'off'}
        </Text>
      </Flex>
    </GridItem>
  )
}
