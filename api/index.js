const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking')
const { default: mongoose } = require('mongoose');
dotenv.config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'yourSecretKey'

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://booking-app-1-aqqh.onrender.com', 'https://booking-app-7epm.vercel.app'],
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

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }


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
                console.log(userDoc)
                res.cookie('token', token).json(userDoc)

            })
        }else{
            res.status(422).json('password not OK')
        }
    }else{
        res.json('not found')
    }
})

app.post('/logout', (req,res) => {
    res.clearCookie('token');
    
    // Send a response indicating successful logout
    res.status(200).send('Logged out successfully');

})

app.get('/profile' , (req,res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, jwtSecret, async (err, userData) => {
            if(err) throw err;
            const userDoc = await User.findById(userData.id)
            res.json(userDoc)
        })
    }else{
        res.json(null)
    }
})


app.post('/upload-by-link' , async(req,res) => {
    const {link} = req.body
    const newName = Date.now() + '.jpg'    
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })

    res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads'})
app.post('/upload', photosMiddleware.array('photos', 100) , (req,res) => {
    const uploadedFilea = []
    for(let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFilea.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFilea)
})


app.post('/places' , async (req,res) => {
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        res.json(placeDoc)
    })
})


app.get('/user-places', (req,res) => {
    const {token} = req.cookies
    console.log('token', token)
    jwt.verify(token, jwtSecret,{}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner: id}))
    })
})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

app.put('/places', async (req,res) => {
    const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body
    const {token} = req.cookies
    console.log('token', token)
    jwt.verify(token, jwtSecret, {} , async (err,userData) => {
        console.log("Inside verify")
        if(err) throw err;
        const placeDoc = await Place.findById(id)
        console.log(userData.id, placeDoc.owner.toString())
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            })
            placeDoc.save()
            res.json('ok')
        }
    })
})


app.get('/places', async (req,res) => {
    res.json( await Place.find())
})


app.post('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req)
    const {place, checkIn, checkOut,numberOfGuests, name, phone, price} = req.body
    Booking.create({
        place, checkIn, checkOut,numberOfGuests, name, phone, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err;
    })
})




app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req)
    console.log("userData"+userData)
    console.log("userData.id"+userData.id)
    res.json(await Booking.find({user: userData.id}).populate('place'))
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});