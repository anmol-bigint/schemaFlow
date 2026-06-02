import express, { urlencoded } from 'express'
import {connect} from './db/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import schemaRoutes from './routes/schemaRoutes.js'

const app = express();
connect()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))

app.get('/health',(req,res)=>{
    res.status(200).json({
        success: true,
        data: "Ok"
    })
})

app.use('/api/user', userRoutes);
app.use("/api/schema", schemaRoutes);
    

// Only listen in non-production/local environments to prevent conflicts on serverless deploys
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000,()=>{
      console.log(`Server running on port 3000`)
  })
}

export default app;