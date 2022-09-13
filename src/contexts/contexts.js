import React,{createContext,useReducer} from 'react';
import {OriginReducer,DestinationReducer,ServiceReducer} from  '../reducers/reducers'

export const OriginContext = createContext()
export const DestinationContext = createContext()
export const ServiceContext = createContext()


export const OriginContextProvider = (props)=>{
    const[origin,dispatchOrigin] =useReducer(OriginReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <OriginContext.Provider
                value ={{origin,dispatchOrigin}}
            >
            {props.children}
        </OriginContext.Provider>
    )
}


export const DestinationContextProvider = (props)=>{
    const[destination,dispatchDestination] =useReducer(DestinationReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <DestinationContext.Provider
                value ={{destination,dispatchDestination}}
            >
            {props.children}
        </DestinationContext.Provider>
    )
}

export const ServiceContextProvider = (props)=>{
    const[service,dispatchService] =useReducer(ServiceReducer,{
                name: null,
                value: null
    })
    return(
        <ServiceContext.Provider
                value ={{service,dispatchService}}
            >
            {props.children}
        </ServiceContext.Provider>
    )
}