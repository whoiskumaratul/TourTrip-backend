const { ObjectId } = require('mongodb')
const express = require('express')
const dbConnect2 = require('../server/mongodb/mongodb')


const mongoDB = require('mongodb')
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/pnrcheck', async (req, resp) => {
    let data = await dbConnect2();
    data = await data.find().toArray();
    resp.send(data)
})


app.get('/pnrcheck/:_id', async (req, resp) =>  {
    try {
        const data = await dbConnect();
    const ObjectId = new ObjectId(req.params._id);

    const result2 = await data.find({ _id: ObjectId }).toArray();

   
    if (result2.length > 0) {
        resp.send(result2[0]);
    } else {
        resp.status(404).send({ error: "Document not found" });
    }
} catch (error) {
    console.error("Error retrieving document:", error);
    resp.status(500).send({ error: "Internal Server Error" });
}
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})