const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Types.ObjectId, required: true, ref: 'Place'},
    user: {type: mongoose.Types.ObjectId, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    numberOfGuests: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: {type: Number}
})

const BookingModle = mongoose.model('Booking', bookingSchema)

module.exports = BookingModle