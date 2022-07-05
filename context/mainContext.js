import { createContext, useContext, useReducer, useState } from 'react'

export const mainContext = createContext()

export const MainProvider = ({ children }) => {
	return <mainContext.Provider value={{ main: 'true' }}>{children}</mainContext.Provider>
}
export const useMain = () => {
	return useContext(mainContext)
}
