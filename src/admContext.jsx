import React from 'react'

// Use const xContext = React.createContext() to create context.
// Pull xContext.Provider and xContext.Consumer out of xContext
// Wrap Provider around your parent component.
// A class can consume with static contextType = xContext
// A functional component can consume with const x = useContext(xContext)
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!

const AdmContext = React.createContext({
  adm: {},
  users: [],
  //fetchUsers: async() => {},
  // updpateUsers: () => {},
  //supdpateUsers: () => {  },
})

export const AdmProvider = AdmContext.Provider
export const AdmConsumer = AdmContext.Consumer
export default AdmContext

