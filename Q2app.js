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
function delData(index) {
    const filename= "data.json"
    const jsonContent= fs.readFileSync(filename, "utf-8")
    students=JSON.parse(jsonContent)
    students.splice(index, 1)
    saveData()
}
app.get("/students", (req,res)=>{
    readData()
    res.send(JSON.stringify(students))
})
app.get("/students/:id", (req, res)=>{
    const studentid=req.params.id
    if(students.length == 0){
        readData()
    }
    let foundRec= students.find((s)=>s.studentId == studentid)
    if(foundRec == null){
        throw "Student not found"
    }
    res.send(JSON.stringify(foundRec))
})
app.put("/students", (req, res)=>{
    alert("In put")
    if(students.length == 0){
        readData()
    }
    // console.log("Inside");
    let body= req.body
    for(let index= 0;index< students.length;index++){
        let element= students[index]
        if(element.studentId == body.studentId){
            element.studentName= body.studentName
            element.studentBranch= body.studentBranch
            element.studentPhone= body.studentPhone
            saveData()
            res.send("Student updated successfully")
        }
    }
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
app.delete("/students", (req, res)=>{
    //console.log("Inside");
    if(students.length == 0){
        readData()
    }
    let body= req.body
    for(let index= 0;index< students.length;index++){
        let element= students[index]
        if(element.studentId == body.studentId){
            delData(index)
            res.send("Student deleted successfully")
        }
    }
    let foundRec= students.find((s)=>s.studentId == body.studentId)
    if(foundRec == null){
        throw "Student not found"
    }
    res.send(JSON.stringify(foundRec))
})
app.listen(1234, ()=>{
    console.log("Server available at 1234");
})