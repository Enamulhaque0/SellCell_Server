const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000
const app = express()

// middleware

app.use(cors())
app.use(express.json())











const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vbwpfni.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
 try {

const usersCollection = client.db('SellCell').collection('users');
const Categories= client.db('SellCell').collection('Categories');
const productsCollection= client.db('SellCell').collection('Products');

// users API
app.post('/users', async (req, res) => {
  const userInfo = req.body;
  
  const user= await usersCollection.findOne(userInfo)
  if(user){

    return res.send({message:`welcome ${userInfo?.name}`})
  } 
  
  const result = await usersCollection.insertOne(userInfo);
  return res.send(result);
});

// usersGet
app.get('/category', async (req, res) => {
  const query = {};
  const users = await Categories.find(query).toArray();
  res.send(users);
})



app.post('/product', async (req, res) => {
  const product = req.body;
  
  const result = await productsCollection.insertOne(product);
  return res.send(result);
});















  
 } 
 
 
 finally {

}









}


run()

















app.get("/", async(req,res)=>{

    res.send("sell_cell running..")
})

app.listen(port, ()=>console.log(`Sell_Cell Running On ${port}`))