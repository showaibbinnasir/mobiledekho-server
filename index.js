const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())


// db-user : mobileDekho
// db-pass : ryErWXqr6rSOG35P


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mobileDekho:ryErWXqr6rSOG35P@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const brandCollection = client.db('mobileDekho').collection('brands')
        app.get('/brands', async(req,res)=>{
            const query = {}
            const result = await brandCollection.find(query).toArray();
            res.send(result)
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