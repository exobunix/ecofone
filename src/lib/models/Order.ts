import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  customer: { type: String, required: true },
  device: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, enum: ['sell', 'buy'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = models.Order || model('Order', OrderSchema);
