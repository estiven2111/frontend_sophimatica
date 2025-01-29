import React, {createContext, useState} from "react";

export const ThemeContext = createContext({})

export const ThemeProvider = ({children}) => {

    const [inputValue, setInputValue] = useState("")
    const finalValue = (input) => {
        setInputValue(input)
    }

    const resetInputValue = () => {
        setInputValue("")
    }
    
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const persistStartTime = (input) => {
        setStartTime(input)
    }
    const persistEndTime = (input) => {
        setEndTime(input)
    }

    const [infoProject, setInfoProject] = useState({})
    const setProjectData = (input) => {
        setInfoProject({
            ...infoProject,
            input
        })
    }

    const [searchText, setSearchText] = useState('');
    const globalSearch = (input) => {
        setSearchText(input)
    }
    const [showOptions, setShowOptions] = useState(false);
    const globalOptions = (input) => {
        setShowOptions(input)
    }

    const [anticipos, setAnticipos] = useState([]);
    const todosAnticipos = (input) => {
        setAnticipos(input)
    }

    const [fechasIndicadores, setFechasIndicadores] = useState([])
    const todasLasFechas = (input) => {
        setFechasIndicadores(input)
    }

    const [finishedUpdate, setFinishedUpdate] = useState(false);
    const finishedHandler = (input) => {
        setFinishedUpdate(input)
    }

    const [indice, setIndice] = useState(false)
    const setindexProject = (input) => {
        setIndice(input)
    }

    const [response, setResponse] = useState([]);
    const setNewResponse = (input) => {
        setResponse(input)
    }

    const [doc, setDoc] = useState('');
    const setDocument = (input) => {
        setDoc(input)
    }

    const [proyectos, setProyectos] = useState([])
    const setAllProjects = (input) => {
        setProyectos(input)
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setAuthenticated = (input) => {
        setIsAuthenticated(input)
    }


    return(
        <ThemeContext.Provider value={{finalValue, inputValue, startTime, persistStartTime, endTime, persistEndTime, resetInputValue, infoProject, setProjectData, searchText, globalSearch, showOptions, globalOptions, anticipos, todosAnticipos, fechasIndicadores, todasLasFechas, finishedUpdate, finishedHandler, indice, setindexProject, response, setNewResponse, doc, setDocument, proyectos, setAllProjects, isAuthenticated, setAuthenticated }}>
            {children}
        </ThemeContext.Provider>
    )
}

// export default ThemeProvider