import express from "express";
const app = express();

app.get('/chat',(req,res)=>{
    /// Parse the Chart Data and forward this to LLM to predict the chartpatterns and do analysis
})

app.listen(3000,()=>{
    console.log("Server started on the port 3000");
})