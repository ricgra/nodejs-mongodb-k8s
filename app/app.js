const express = require('express');
const customerRoutes = require('./routes/customers');
const systemRoutes = require('./routes/system');

const app = express();
app.use(express.json());

app.use('/customer', customerRoutes);
app.use('/system', systemRoutes);

app.listen(3000, () => console.log('Server running on port 3000!'));