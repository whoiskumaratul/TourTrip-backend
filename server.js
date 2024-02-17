const { ObjectId, ObjectId2 } = require('mongodb');
const express = require('express');
const {dbConnect, dbConnect2, dbConnect3, dbConnect4} = require('../server/mongodb/mongodb')
//const dbConnect2 = require('../server/mongodb/mongodb')

const mongoDB = require('mongodb');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

 

app.get('/', async (req, resp) => {
    let data = await dbConnect();
    data = await data.find().toArray();
    resp.send(data)
    //resp.json({message: "Hello from Server"});
    
})



app.get('/:_id', async (req, resp) => {
    try {
        const data = await dbConnect();
        //const collection = data.collection('traindata'); // Replace with your actual collection name
        
        // Convert the string _id to ObjectId, assuming you're using ObjectId as the type for _id
        const objectId = new ObjectId(req.params._id);

        const result = await data.find({ _id: objectId }).toArray();

        if (result.length > 0) {
            resp.send(result[0]);
        } else {
            resp.status(404).send({ error: "Document not found" });
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});
 


app.post('/post', async (req, resp) => {
    let data = await dbConnect();
    let result = await data.insertOne(req.body);
    resp.send(result);
})

// app.put('/:_id', async (req, resp) => {
//     let data = await dbConnect();
//     let result = await data.updateOne(
//         {_id: req.params.id},
//         {$set: req.body}
//     )
//     resp.send({result: 'Updated'})
// })

// app.put("/:_id",  async (req, resp) => {
//     console.log("------>" , req.body)
//     let data = await dbConnect();
//     let result =  await data.updateOne(
//         // {TrainName: "ds"},
//         //  { $set : {coach: "mera coach"} }
//         {id: req.body._id},
//         { $set : req.body }
//     )
//     resp.send({result: "updated"})
// })

//this code is for update data through postmand to mongodb
// app.put("/:_id", async (req, resp) => {
//     console.log(req.body)
//     let data = await dbConnect();
//     let result = await data.updateOne(
//         {id: req.body._id },  //condition means kiske through update krna chahte ho
//         { $set : req.body}
//     )
//     resp.send({result: "Updated"})
// })


app.put("/:id", async (req, resp) => {
    console.log(req.body)
    let data = await dbConnect();
    let result = await data.updateOne(
        {_id: req.params.id },  //condition means kiske through update krna chahte ho
        { $set : req.body}
    )
    resp.send({result: "Updated"})
})


app.delete("/:id", async (req, resp) => {
    console.log(req.params.id)
    const data = await dbConnect();
    const result = await data.deleteOne({_id: new mongoDB.ObjectId(req.params.id)})
    resp.send(result)
})


app.get('/post/pnr/', async (req, resp) => {
    let data = await dbConnect2();
    data = await data.find().toArray();
    resp.send(data)
    //resp.json({message: "Hello from Server"});
    console.log(data)
})

app.get('/post/bookingid', async (req, resp) => {
    let data = await dbConnect2();
    data = await data.find().toArray();
    resp.send(data)
    console.log(data)
})



app.get('/post/pnr/:PnrNumber', async (req, resp) => {
    try {
        let data = await dbConnect2();
        const PnrNumber = parseInt(req.params.PnrNumber, 10);
        data = await data.find({ PnrNumber: { $eq : PnrNumber}}).toArray();
        console.log('Found data', data)
        resp.send(data)
    }

    catch(error) {
        console.log('Error ', error);
        resp.status(500).send("Internal Server Error")
    }
})


app.get('/post/bookingid/:bookingID/:emailid', async (req, resp) => {
    try {
        let data = await dbConnect2();
        const bookingID = req.params.bookingID;
        const emailid = req.params.emailid;
        data = await data.find({
            
            bookingID: { $eq: bookingID },
            emailid : { $eq : emailid}
        
    }).toArray();
    if (data.length > 0 ) {
        resp.send(data)
    } else {
    resp.status(500).send("No matching found")
    }
   
        
    }
   
    catch(error) {
        console.log('Error', error);
        resp.status(500).send("Internal server error")
    }
})



app.get('/post/pnr/:PnrNumber/:emailid', async(req, resp) => {
    try {
        let data = await dbConnect2();
        const PnrNumber = parseInt(req.params.PnrNumber, 10);
        const emailid = req.params.emailid;
    

        data = await data.find({
            
                 PnrNumber: { $eq:  PnrNumber },
                emailid: { $eq: emailid }
            
        }).toArray();

        console.log('Found Data : ', data);
        if (data.length > 0) {
            resp.send(data)
        }
        else {
            resp.status(500).send("No matching found")
        }

    } catch (error) {
        console.log('Error', error);
        resp.status(500).send("Internal Server Error");
    }
});

// app.get('/post/pnr/:PnrNumber/:emailid', async(req, resp) => {
//     try {
//         let data = await dbConnect2();
//         const PnrNumber = parseInt(req.params.PnrNumber, 10);
//         const emailid = req.params.emailid;
    

//         data = await data.find({
            
//                  PnrNumber: { $eq:  PnrNumber },
//                 emailid: { $eq: emailid }
            
//         }).toArray();
         

        

//         console.log('Found Data : ', data);
//         if (data.length > 0) {
//             resp.send(data)
//         }
//         else {
//             resp.status(500).send("No matching found")
//         }

//     } catch (error) {
//         console.log('Error', error);
//         resp.status(500).send("Internal Server Error");
//     }
// });

// app.get('/post/pnr/:PnrNumber/:bookingID', async (req, resp) => {
//     try {
//         let data = await dbConnect2();
//         const PnrNumber = parseInt(req.params.PnrNumber, 10);
//         data = await data.find({ PnrNumber: { $eq: PnrNumber } }).toArray();
//         console.log('Found data:', data);
//         resp.send(data)
//         //resp.json({message: "Hello from Server"});
//     }
//     catch (error) {
//         console.log('Error', error);
//         resp.status(500).send("Internal Server Error")
//     }
//     }) 


  
//   app.post('/post/loginsignup', async (req, resp) => {
//     let data = await dbConnect4();
//     result = await data.insertOne(req.body)
//     resp.send(result)
//     console.log(result)
//   })



app.post('/post/loginsignup/', async (req, res) => {
    let data = await dbConnect4();
  const { name, email, phoneno, password } = req.body;

  // Check if user already exists in the database
  const existingUser = await data.findOne({ email: req.body.email });


  if (existingUser) {
    // User exists, perform login
    if (existingUser.email === email) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // User doesn't exist, perform registration
    const newUser = { name, email, phoneno, password };
    let result = await data.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  }
});



    app.get('/post/livestatus', async (req, resp) => {
        let data = await dbConnect3();
        data = await data.find().toArray();
        resp.send(data)
        console.log(data)
    })


    app.get('/post/livestatus/:TrainNumber', async (req, resp) => {
        try {
            let data = await dbConnect3();
            const TrainNumber = parseInt(req.params.TrainNumber, 10);
            data = await data.find({ TrainNumber: { $eq: TrainNumber } }).toArray();
            console.log('Found data:', data);
            resp.send(data)
            //resp.json({message: "Hello from Server"});
}


catch (error) {
    console.log('Error', error);
    resp.status(500).send("Internal Server Error")
}
}) 




// app.get(`/pnrcheck/:_id`, async (req, resp) => {
//     try {
//         const data2 = await dbConnect2();
    
//         // Convert the string _id to ObjectId, assuming you're using ObjectId as the type for _id
//         const objectId2 = new ObjectId(req.params._id);

//         const result2 = await data2.find({ _id: objectId2 }).toArray();

   
//     if (result2.length > 0) {
//         resp.send(result2[0]);
//     } else {
//         resp.status(404).send({ error: "Document not found" });
//     }
// } catch (error) {
//     console.error("Error retrieving document:", error);
//     resp.status(500).send({ error: "Internal Server Error" });
// }
// });


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})