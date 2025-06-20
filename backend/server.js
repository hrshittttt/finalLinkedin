const express = require('express')
const cors  = require('cors')
const { Console } = require('console')
require('dotenv').config()
const userRoutes = require('./routes/user.routes')
const profileRoutes = require('./routes/profile.routes')
const aiMockInterviewRoutes = require('./routes/aiMockInterview.routes')
const roadMap = require('./routes/aiRoadMap.routes')
const PORT  = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/users",userRoutes)
app.use("/profile",profileRoutes)
app.use("/interview",aiMockInterviewRoutes)
app.use("/roadmap", roadMap)



app.get("/",(req,res)=>{
    res.send("harshit gandmrra hai")
})

app.listen(PORT,()=>console.log(`server connected success at ${PORT}`))

