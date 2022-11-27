const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const bookingCollection= client.db('SellCell').collection('Booking');


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

app.get('/buyers', async (req, res) => {
  const buyer = req.query.buyer
  
  const query = {role : buyer}
  const buyers = await usersCollection.find(query).toArray()
  res.send(buyers);
})
app.delete('/buyer/:id',  async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const filter = { _id: ObjectId(id) };
  const result = await usersCollection.deleteOne(filter);
  res.send(result);
})


app.get('/sellers', async (req, res) => {
  const seller = req.query.seller
  
  const query = {role : seller}
  const sellers = await usersCollection.find(query).toArray()
  res.send(sellers);
})
app.delete('/seller/:id',  async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const filter = { _id: ObjectId(id) };
  const result = await usersCollection.deleteOne(filter);
  res.send(result);
})


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

app.get('/products', async (req, res) => {
  const email = req.query.email;
  

  const query = { email: email };
  const products = await productsCollection.find(query).toArray();
  res.send(products);
});

app.delete('/product/:id',  async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const filter = { _id: ObjectId(id) };
  const result = await productsCollection.deleteOne(filter);
  res.send(result);
})



//  category get
app.get("/category/:id", async (req, res) => {
  
        
  
  let query = {};

  if (req.params.id)
    query = {
      categoryId: req.params.id,
    };

  const cursor = productsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});

// Booking

app.post('/booking', async (req, res) => {
  const product = req.body;
  
  const result = await bookingCollection.insertOne(product);
  return res.send(result);
});

app.get('/orders', async (req, res) => {
  const email = req.query.email;
  

  const query = { email: email };
  const bookings = await bookingCollection.find(query).toArray();
  res.send(bookings);
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