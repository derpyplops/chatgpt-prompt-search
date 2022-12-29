import React from 'react'
import { Card, CardHeader, Heading, Tag } from '@chakra-ui/react'
import '../EntryList.css'
import Prompt from './Prompt'

function EntryList(): JSX.Element {
    const data = [
        {
            template: 'abc',
            title: 'Prompt',
            views: 0,
            likes: 0,
            tags: ['potato'],
        },
        {
            template: 'asdf',
            title: 'DANK MEMES',
            views: 1,
            likes: 2,
            tags: ['potato', 'tomato'],
        },
        {
            template: 'Sarcasm',
            title: 'Sarcasm',
            views: 1,
            likes: 2,
            tags: ['potato', 'tomato'],
        },
    ]
    const renderEntry = (entry: any) => {
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
    return <div className="entry-list">{data.map(renderEntry)}</div>
}

export default EntryList
