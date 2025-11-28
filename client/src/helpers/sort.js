import axios from "axios";
import url from "./api.js";

const sortAscUrl = url + '/vocabs/sort-asc'
const sortDescUrl = url + '/vocabs/sort-desc'
const sortByTimeUrl = url + '/vocabs/sortByTime'

export const sortAsc = async()=>{
    try{
        const response = await axios.get(sortAscUrl)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}

export const sortDesc = async()=>{
    try{
        const response = await axios.get(sortDescUrl)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}

export const sortByTime = async()=>{
    try{
        const response = await axios.get(sortByTimeUrl)
        return response.data
    }catch(err){
        console.error(err)
        return(null)
    }
}




