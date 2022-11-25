const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config();



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const brandCollection = client.db('mobileDekho').collection('brands')
        const productCollection = client.db('mobileDekho').collection('allProducts')
        const orderCollection = client.db('mobileDekho').collection('orders')
        app.get('/brands', async(req,res)=>{
            const query = {}
            const result = await brandCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/products', async(req,res)=>{
            const query = {}
            const result = await productCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {brand_id : id}
            const result = await productCollection.find(query).toArray();
            res.send(result)
        })
        app.post('/orders', async(req, res) => {
            const order = req.body
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
        
    }
    finally{

    }
}

run().catch(console.log)


app.get('/', (req,res)=>{
    res.send('api is running')
})



app.listen(port, ()=>{
    console.log(`Api is running on port ${port}`)
})