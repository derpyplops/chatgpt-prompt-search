// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore, getDocs } from '@firebase/firestore'
import { Entry } from './types/entry'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const addEntry = async (entry: Entry) => {
    const docRef = await addDoc(collection(db, 'entries'), entry)
    console.log('Document written with ID: ', docRef.id)
}

const parseEntry = (doc: any) => {
    const data = doc.data()
    return {
        id: doc.id,
        title: data.title,
        template: data.template,
        tags: data.tags,
        views: data.views,
        likes: 0,
    }
}

const getEntries: () => Promise<Entry[]> = async () => {
    const docs = await getDocs(collection(db, 'entries'))
    const ds: Entry[] = []
    docs.forEach((doc) => {
        ds.push(parseEntry(doc))
    })
    return ds
}

export { addEntry, getEntries }
