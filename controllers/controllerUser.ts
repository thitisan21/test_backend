import { Request, Response } from 'express'
import fs from 'fs'
import interfaceUser from '../interfaces/interfaceUser'

function paginate(array: [], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export const getUser = (req: Request, res: Response) => {
    try {
        let search = req.query.search || null
        let skip = Number(req.query.skip) || 1
        let limit = Number(req.query.limit) || 1
        skip = limit * (skip - 1) <= 0 ? 1 : limit * (skip - 1)

        let resultFile = JSON.parse(fs.readFileSync(`${__dirname}/../files/db.txt`, "utf8"));
        let dataReponse: object
        if (search == null) {
            let data = paginate(resultFile, limit, skip)
            dataReponse = {
                size: resultFile.length,
                data: data.sort((a: any, b: any) => a.id - b.id)
            }
        } else {
            resultFile = resultFile.filter((item: any) => item.name.includes(search) || item.email.includes(search))
            let data = paginate(resultFile, limit, skip)
            dataReponse = {
                size: resultFile.length,
                data: data.sort((a: any, b: any) => a.id - b.id)
            }
        }
        res.status(200).send(dataReponse)
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something has error!!")
    }
}

export const createUser = (req: Request, res: Response) => {
    try {
        let data = <interfaceUser>req.body;

        let resultFile = JSON.parse(fs.readFileSync(`${__dirname}/../files/db.txt`, "utf8"));
        let checkUsername = resultFile.find((item: any) => item.username === data.username)

        if (checkUsername != undefined) {
            return res.status(500).send("Username already exists.")
        }

        resultFile = resultFile.sort((a: any, b: any) => b.id - a.id)
        data.id = resultFile[0].id + 1

        resultFile.push(data)

        fs.writeFileSync(`${__dirname}/../files/db.txt`, JSON.stringify(resultFile))

        return res.status(200).send("Success.")
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something has error!!")
    }
}

export const updateUser = (req: Request, res: Response) => {
    try {
        let data = <interfaceUser>req.body;
        let id = req.query.id
        let resultFile = JSON.parse(fs.readFileSync(`${__dirname}/../files/db.txt`, "utf8"));
        let resultFindById = resultFile.find((item: any) => item.id.toString() === id)

        if(resultFindById == undefined){
            return res.status(404).send("ID not found.")
        }

        let dataUpdate = { ...resultFindById, ...data }
        const ix = resultFile.findIndex((item: any) => item.id.toString() === id);
        resultFile.splice(ix, ix >= 0 ? 1 : 0);

        resultFile.push(dataUpdate)
        fs.writeFileSync(`${__dirname}/../files/db.txt`, JSON.stringify(resultFile))

        return res.status(200).send("Success.")
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something has error!!")
    }
}

export const deleteUser = (req: Request, res: Response) => {
    try {
        let id = req.query.id
        let resultFile = JSON.parse(fs.readFileSync(`${__dirname}/../files/db.txt`, "utf8"));

        const ix = resultFile.findIndex((item: any) => item.id.toString() === id);
        resultFile.splice(ix, ix >= 0 ? 1 : 0);
        // console.log(resultFile)
        fs.writeFileSync(`${__dirname}/../files/db.txt`, JSON.stringify(resultFile))

        return res.status(200).send("Success.")
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something has error!!")
    }
}