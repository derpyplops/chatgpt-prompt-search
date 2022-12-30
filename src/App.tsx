import React, { Component } from 'react'
import './App.css'
import EntryList from './components/EntryList'
import { Input } from '@chakra-ui/react'
import { getEntries } from './firebase'
import { Entry } from './types/entry'

// has no props
class App extends Component<{}, { entries: Entry[]; entriesView: Entry[] }> {
    constructor() {
        super({})
        this.state = {
            entries: [],
            entriesView: [],
        }
    }

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputElement = event.target as HTMLInputElement
            this.setState((state) => {
                return {
                    entriesView: state.entries.filter((entry) =>
                        entry.title
                            .toLowerCase()
                            .includes(inputElement.value.toLowerCase()),
                    ),
                }
            })
        }
    }

    async componentDidMount() {
        const entries = await getEntries()
        this.setState({ entries, entriesView: entries })
        console.log(`Entries: ${entries.length} entries loaded.`)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Input
                        placeholder="Search"
                        onKeyDown={this.handleKeyDown}
                    />
                </header>
                <EntryList entries={this.state.entriesView} />
            </div>
        )
    }
}

export default App
