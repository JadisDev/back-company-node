import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },
    cnpj: {
      type: String,
      min: 14,
      max: 14,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model('Company', CompanySchema);
