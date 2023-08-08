var mongoose = require('mongoose');
var BookingTypes = require('../common/enums/BookingType')
var schema = mongoose.Schema;

const bookingSchema = new schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotels', required: true },
    bookingType: { type: number, enum: [BookingTypes.HOURLY, BookingTypes.OVERNIGHT], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    billingDetails: {
        // Define the structure for billing information (e.g., name, address, etc.)
        // Example:
        name: { type: String, required: true },
        address: { type: String, required: true },
        // Add more fields as needed
    },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Bookings",bookingSchema)