const app= require("express")()
const parser= require("body-parser")
const dir= __dirname
const fs= require("fs")
const cors= require("cors")
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())
let students= []
function readData() {
    const filename= "data.json"
    const jsonContent= fs.readFileSync(filename, "utf-8")
    students=JSON.parse(jsonContent)
}
function saveData(){
    const filename= "data.json"
    const jsonData= JSON.stringify(students)
    fs.writeFileSync(filename, jsonData, "utf-8")
}
app.get("/students", (req,res)=>{
    readData()
    res.send(JSON.stringify(students))
})
app.post("/students", (req, res)=>{
    if(students.length == 0){
        readData()
    }
    let body= req.body
    students.push(body)
    saveData()
    res.send("Student added successfully")
})
app.listen(1234, ()=>{
    console.log("Server available at 1234");
})