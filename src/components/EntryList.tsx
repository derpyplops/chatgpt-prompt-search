import React, { Component } from 'react'
import { Card, CardHeader, Heading, Tag } from '@chakra-ui/react'
import '../EntryList.css'
import Prompt from './Prompt'
import { Entry } from '../types/entry'
import PropTypes from 'prop-types'

interface Props {
    entries: Entry[]
}

const renderEntry = (entry: Entry) => {
    return (
        <Card
            size="xs"
            color="white"
            backgroundColor="#343541"
            marginBottom="20px"
            padding="20px"
        >
            <CardHeader display="flex" alignItems="center">
                <Heading>{entry.title}</Heading>
                {entry.tags.map((tag: string) => (
                    <Tag marginLeft="5px" key={tag}>
                        {tag}
                    </Tag>
                ))}
            </CardHeader>
            <Prompt text={entry.template} />
        </Card>
    )
}
class EntryList extends Component<Props, {}> {
    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    render() {
        return (
            <div className="entry-list">
                {this.props.entries.map(renderEntry)}
            </div>
        )
    }
}

export default EntryList
