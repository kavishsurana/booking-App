const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const { default: mongoose } = require('mongoose');
dotenv.config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'yourSecretKey'

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/test', (req, res) => {
  res.json('Hello World');
});

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        }) 
        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post('/login', async (req,res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            jwt.sign({email: userDoc.email, id: userDoc._id} , jwtSecret, {} , (err,token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }else{
            res.status(422).json('password not OK')
        }
    }else{
        res.json('not found')
    }
})

app.get('/profile' , (req,res) => {
    const {token} = req.cookies
    console.log("API.get/profile")
    console.log(token)
    if(token){
        jwt.verify(token, jwtSecret, async (err, userData) => {
            if(err) throw err;
            console.log("Decoded Token: ", userData);
            const {name,email,_id} = await User.findById(userData.id)
            console.log("verify token" + userDoc)
            console.log(name,email,_id)
            res.json(name,email,_id)
        })
    }else{
        console.log("no token")
        res.json(null)
    }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});