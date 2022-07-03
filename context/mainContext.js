import { createContext, useContext, useReducer, useState } from 'react'

export const mainContext = createContext()

export const MainProvider = ({ children }) => {
	return <mainContext.Provider value={{ cartTotal: 3 }}>{children}</mainContext.Provider>
}
export const useMain = () => {
	return useContext(mainContext)
}
