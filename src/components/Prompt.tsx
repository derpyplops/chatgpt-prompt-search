import React from 'react'
import '../Prompt.css'
import { IconButton } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

export interface Props {
    text: string
}

function Prompt(props: Props): JSX.Element {
    const writeToKeyboard = () => {
        navigator.clipboard
            .writeText(props.text)
            .catch((err) => console.error(err))
    }
    return (
        <div className="prompt">
            <div className="prompt-text">{props.text}</div>
            <IconButton
                color="blue"
                aria-label="Search database"
                icon={<CopyIcon />}
                alignSelf="flex-end"
                onClick={writeToKeyboard}
            />
        </div>
    )
}

export default Prompt
