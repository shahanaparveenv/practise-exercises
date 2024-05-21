import React, { createContext, useState } from 'react'

const UseContext = createContext({});
export const UserDataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <UseContext.Provider value={{user, setUser}}>
            {children}
        </UseContext.Provider>
    );
};
export default UseContext;
