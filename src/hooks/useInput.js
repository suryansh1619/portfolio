import React,{useState} from "react"

function useInput(initialVal){
    const [value,setValue]=useState(initialVal)

    const update=(e)=>{
        setValue(e.target.value)
    }
    const reset=()=>{
        setValue("")
    }
    return [value,update,reset];
}

export default useInput;