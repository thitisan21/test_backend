import express from 'express';
import http from 'http';
import cors from "cors";
import { urlencoded, json } from 'body-parser';

import routerUsers from './routes/routeUser'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

app.use('/api', routerUsers)

const httpServer = http.createServer(app)
httpServer.listen(3001, "0.0.0.0", () => {
    console.log('Server is running on port 3001')
})