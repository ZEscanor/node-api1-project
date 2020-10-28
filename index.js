const express = require("express")
const { generate } = require("shortid")
const shortid = require("shortid").generate

const app = express()
app.use(express.json())

const PORT = 5000

let user =
[
    {
    id: generate(), // hint: use the shortid npm package to generate it
    name: "Jane The Swordsman", // String, required
    bio: "there once was a swordsman named Jane who was the strongest in the land",  // String, required
  }

]

app.get('/api/user', (req,res)=>{
    try{
        res.status(200).json(user)
    }
    catch{
        res.status(500).json({errorMessage: "I cant I just cant"})
    }
})

app.get('/api/user/:id', (req,res)=>{
    const {id} = req.params
    const findOurId = useZ =>{
        return useZ.id == id
    }
    const ourUser = user.find(findOurId)
    if(!ourUser){
        res.status(400).json({errorMessage:"sorry ID doesnt exist"})
    }
    else{
        res.json(ourUser)
    }
})

app.post('/api/user',(req,res)=>{
    const newUser = req.body
    //console.log("this is req body",req.body)
    if(!(newUser.bio)){
        res.status(400).json({errorMessage:"please you need a bio"})
    }
    try{
        const notANew = user.find(useZ=>useZ.name=== req.body.name)
        if(!notANew){
            newUser.id = generate()
            user.push(newUser)
            res.status(201).json({successMessage:"Congrats you have a new user",newUser})
        }
        else{
            res.status(400).json({errorMessage:"Sorry that user already exists"})
        }
    }
    catch{
        res.status(500).json({errorMessage:"Server not working"})
    }
})
app.delete('/api/user/:id',(req,res)=>{
    const {id} = req.params
    console.log("this is params",req.params)
    const findOurId = useZ =>{
        return useZ.id == id
       
    }
    const ourUser = user.find(findOurId)
    if(!ourUser){
        res.status(400).json({errorMessage:"sorry ID doesnt exist"})
    }
    else{
        user = user.filter((useZ)=>{
            return useZ.id != id
        })
        res.json({deleted:ourUser})
    }

})

app.put("/api/user/:id",(req,res)=>{
    const modUser = req.body // this just gets out request body
    const {id} = req.params //this will get our id
    console.log("body and ID",req.body,id)
    const findIdIndex = user.findIndex(f=>f.id == id); // we will find the index of thing we want to change
    if(findIdIndex > -1){ // we check that our Index is positive or exists
        const ourUser = {...user[findIdIndex], ...modUser}; 
        // we create a variable which the spread operator splits all the key value pairs and then adds the pairs created in our request body
       // here is where we  slice things up which will not affect anything other that the thing we are changing
        user = [
            ...user.slice(0,findIdIndex),
            ourUser,
            ...user.slice(findIdIndex + 1)
        ];
        res.send(user);
    }
    else{
        res.status(404).send({msg:"User not found"})
    }
})
app.use('*',(req,res)=>{
    res.status(200).json({message:"Hello It LIVES"})
}) //the start would b e good for all endpoints but if we want an error to displat use just '/'
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})