import express from 'express'
import mongoose from 'mongoose';
const app = express();
const PORT = 8000;
import cors from 'cors';

app.use(cors());

app.use(express.json());

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/multistep_form')
.then(() => {
  console.log('DB Connected Successfully!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB: ', error);
});

//user schema
const userSchema = new mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  }, 
  nickName:{
    type:String
  },
  emailAddress:{
    type:String
  },
  phoneNumber:{
    type:String
  },
  alternatePhone:{
    type:String
  },
  address1:{
    type:String
  }, 
  address2:{
    type:String
  }, 
  country:{
    type:String
  }, 
  cardNumber:{
    type:String
  }, 
  cardMonth:{
    type:String
  }, 
  cardYear:{
    type:String
  }, 
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema)

//submit details
app.post("/data", async(req, res)=>{ 
  try {
    const bodyData=req.body; 
    const user = new User(bodyData); 
    const userData = await user.save(); 
    console.log(userData);
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
})

//read all details
app.get('/data',async(req,res) => {
    try {
      const userData = await User.find();
      res.send(userData);
    } catch (error) {
      res.send(error);
    }
    });
  



app.listen(PORT, () => {
    console.log(`server is running on ...${PORT}`);
  });
