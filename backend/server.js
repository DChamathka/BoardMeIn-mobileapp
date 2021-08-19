const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const gprofileRoutes = require('./routes/gProfileRoutes');
const oprofileRoutes = require('./routes/oProfileRoutes');
const propertyRoutes = require('./routes/pRoutes');
const bookingRoutes = require('./routes/bookRoutes');
const inquiryRoutes = require("./routes/inquiryRoutes");
const dotenv = require('dotenv');
dotenv.config();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const connectDB = require('./db/db');

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', gprofileRoutes);
app.use('/api/ownerprofile', oprofileRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/property', bookingRoutes);
app.use("/user", inquiryRoutes);
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/categoryRoutes'))
app.use('/api', require('./routes/commentRoutes'))
app.use('/api', require('./routes/paymentRoutes'))

connectDB();

app.get('/', (req, res) => {
  res.send('inside server');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
