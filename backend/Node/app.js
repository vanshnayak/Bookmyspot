const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors())
app.use(express.json()) //to accept data as json...


//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const eventRoutes = require("./src/routes/EventRoutes")
app.use("/event",eventRoutes)

//const venueRoutes = require("./src/routes/VenueRoutes")
//app.use("/event",venueRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/Node").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3200
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})
