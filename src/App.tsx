import React from 'react'
import './App.css'
import EntryList from './components/EntryList'
import { Input } from '@chakra-ui/react'

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <Input placeholder="Search" />
            </header>
            <EntryList />
        </div>
    )
}

export default App
