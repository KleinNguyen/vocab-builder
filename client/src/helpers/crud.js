import axios from "axios";
import url from "./api.js";

const crudUrl = url + 'vocabs/'

export const getAllVocab = async()=>{
    try{
        const response = await axios.get(crudUrl)
        return response.data
    }catch(err){
        console.error(err)
        return null;
    }
}

export const getVocabById = async(id)=>{
    try{
        const response = await axios.get(crudUrl + id)
        return response.data
    }catch(err){
        console.error(err)
        return null
    }
}

export const deleteVocabById = async(id)=>{
    try{
        const response = await axios.delete(crudUrl + id)
        return response.data
    } catch(err){
        console.log(err);
        return null;
    }
}

export const updateVocab = async(id, word)=>{
    try{
        const response = await axios.put(crudUrl + id, word)
        return response.data
    }catch(err){
        console.error(err)
        return null
    }
}

export const addNewVocab = async(word)=>{
    try{
        const response = await axios.post(crudUrl, word)
        return response.data
    } catch(err){
        console.error(err)
        return null
    }
}


