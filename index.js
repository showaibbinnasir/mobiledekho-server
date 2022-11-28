const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config();



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const brandCollection = client.db('mobileDekho').collection('brands')
        const productCollection = client.db('mobileDekho').collection('allProducts')
        const orderCollection = client.db('mobileDekho').collection('orders')
        const userCollection = client.db('mobileDekho').collection('users')
        app.get('/brands', async(req,res)=>{
            const query = {}
            const result = await brandCollection.find(query).toArray();
            res.send(result)
        })
        app.post('/products', async(req,res)=>{
            const product = req.body
            const result = await productCollection.insertOne(product);
            res.send(result);
        })
        app.get('/products', async(req,res)=>{
            const query = {}
            const result = await productCollection.find(query).toArray();
            res.send(result)
        })
        app.delete('/products/:id', async(req,res)=>{
            const data = req.params.id;
            const query = {_id : ObjectId(data)};
            const result = await productCollection.deleteOne(query);
            res.send(result)
        })
        app.put('/products/update/:id', async(req,res)=>{
            const id= req.params.id;
            const filter = { _id : ObjectId(id)}
            const user = req.body;
            const option = { upsert : true}
            const updatedUser = {
                $set : {
                    verification : user.verification,
                }
            }
            const result = await productCollection.updateOne(filter, updatedUser, option);
            res.send(result);
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

        app.delete('/users/:id', async(req,res)=>{
            const data = req.params.id;
            const query = {_id : ObjectId(data)};
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })
        app.get('/orders', async(req,res)=>{
            const email = req.query.email;
            let query = {}
            if(email){
                query = {email};
            }

            const result = await orderCollection.find(query).toArray()
            res.send(result);
        })

        app.post('/users', async(req,res)=>{
            const user = req.body
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        app.get('/users', async(req,res)=>{
            const query = {}
            const result = await userCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/users/admin/:email' , async(req,res)=>{
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query);
            res.send({isAdmin : user?.role === 'admin'})
        })
        app.get('/users/seller/:email', async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const seller = await userCollection.findOne(query);
            res.send({isSeller : seller?.role === 'Seller'})
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