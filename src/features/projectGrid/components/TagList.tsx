import { Box, Image } from '@chakra-ui/react'
import { ProjectTag } from '../../../types/Project.dto'

import CssLogo from '../../images/devicons/css3-original.svg'
import HtmlLogo from '../../images/devicons/html5-original.svg'
import JavascriptLogo from '../../images/devicons/javascript-original.svg'
import NodeLogo from '../../images/devicons/nodejs-original.svg'
import ReactLogo from '../../images/devicons/react-original.svg'
import TypescriptLogo from '../../images/devicons/typescript-original.svg'

interface tagListProps {
  tags: ProjectTag[]
}

function TagList({ tags }: tagListProps) {
  return (
    <Box display="flex" gap="0.4rem">
      {tags.map(({ tag }) => {
        if (tag.name === 'js') {
          return (
            <Image
            src={JavascriptLogo}
            alt="Javascript Logo"
            placeholder="blurred"
            width={{ base: '1.3rem' }}
            height={{ base: '1.3rem' }}
          />
          )
        }

        if (tag.name === 'ts') {
          return (
            <Image
            src={TypescriptLogo}
            alt="Typescript logo"
            placeholder="blurred"
            width={{ base: '1.3rem' }}
            height={{ base: '1.3rem' }}
          />
          )
        }

        if (tag.name === 'html') {
          return (
            <Image
          src={HtmlLogo}
          alt="HTML Logo"
          placeholder="blurred"
          width={{ base: '1.3rem' }}
          height={{ base: '1.3rem' }}
        />
          )
        }

        if (tag.name === 'css') {
          return (
            <Image
            src={CssLogo}
            alt="CSS Logo"
            placeholder="blurred"
            width={{ base: '1.3rem' }}
            height={{ base: '1.3rem' }}
          />
          )
        }

        if (tag.name === 'react') {
          return (
            <Image
            src={ReactLogo}
            alt="React Logo"
            placeholder="blurred"
            width={{ base: '1.3rem' }}
            height={{ base: '1.3rem' }}
          />
          )
        }

        if (tag.name === 'node') {
          return (
            <Image
              src={NodeLogo}
              alt="NodeJS Logo"
              placeholder="blurred"
              width={{ base: '1.3rem' }}
              height={{ base: '1.3rem' }}
            />
          )
        }

        return null
      })}

    </Box>
  )
}

export default TagList
