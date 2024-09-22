import instance from "../config/axios"

export const GetAllColor = async ()=>{
    try{
        const {data} = await instance.get('colors')
        return data
    }catch(err){
        console.log(err)
    }
}

export const GetColorById = async (id: string) => {
    try{
        const {data} = await instance.get(`colors/${id}`)
        return data
    }catch(err){
        console.log(err)
    }
}

export const CreateColor = async (name: string, hex: string) => {
    try{
        const {data} = await instance.post('colors', {name, hex})
        return data
    }catch(err){
        console.log(err)
    }
}

export const UpdateColor = async (id: string, name: string, hex: string) => {
    try{
        const {data} = await instance.put(`colors/${id}`, {name, hex})
        return data
    }catch(err){
        console.log(err)
    }
}

export const DeleteColor = async (id: string) => {
    try{
        await instance.delete(`colors/${id}`)
    }catch(err){
        console.log(err)
    }
}