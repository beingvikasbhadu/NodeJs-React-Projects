import {atom} from 'recoil'

console.log("categores Atom re-rendering")
export const categoriesAtom=atom({
    key:"categoriesAtom",
    default:[]
})