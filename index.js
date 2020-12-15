import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes'
// import mongodb from 'mongodb'

// Conexión a la BD
mongoose.Promise = global.Promise
const dbUrl = 'mongodb+srv://ddelajara:renato2013@cluster0.3ndti.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(mongoose => console.log('conectado'))
  .catch(e => console.log(e))


// const uri = "mongodb+srv://ddelajara:renato2013@cluster0.3ndti.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const MongoClient = mongodb.MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})