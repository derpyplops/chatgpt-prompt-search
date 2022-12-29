import React, { Component } from 'react'
import { Card, CardHeader, Heading, Tag } from '@chakra-ui/react'
import '../EntryList.css'
import Prompt from './Prompt'
import { Entry } from '../types/entry'
import { getEntries } from '../firebase'

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
class EntryList extends Component<{}, { entries: Entry[] }> {
    constructor() {
        super({})
        this.state = {
            entries: [],
        }
    }

    async componentDidMount() {
        const entries = await getEntries()
        this.setState({ entries })
        console.log(`Entries: ${entries.length} entries loaded.`)
    }

    render() {
        return (
            <div className="entry-list">
                {this.state.entries.map(renderEntry)}
            </div>
        )
    }
}

export default EntryList
