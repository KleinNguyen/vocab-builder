import axios from "axios";
import url from "./api.js";

const testUrl = url + 'tests/'
// const testTyping = testUrl + 'typing/'

export const getAllTest = async()=>{
    try{
        const response = await axios.get(testUrl)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}

export const createTest = async(test)=>{
    try{
        const response = await axios.post(testUrl, test)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}

export const deleteTestById = async(id)=>{
    try{
        const response = await axios.delete(testUrl + id)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}

export const runTest = async(id)=>{
    try{
        const response = await axios.get(testUrl + id)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}