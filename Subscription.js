const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  planId: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'paypal', 'bkash'],
  },
  transactionId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // Optional - can be null for anonymous subscriptions
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    // Will be set to startDate + 1 month
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Set end date to 1 month from start date
subscriptionSchema.pre('save', function(next) {
  if (this.isNew) {
    this.endDate = new Date(this.startDate);
    this.endDate.setMonth(this.endDate.getMonth() + 1);
  }
  next();
});

module.exports = mongoose.model("Subscription", subscriptionSchema);