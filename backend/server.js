import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
const port = process.env.PORT || 5000

connectDB(); // Connect to MongoDB

const app = express()

app.get('/', (req, res) => {
	res.send('API is running...')
})

app.use('/api/products', productRoutes) // Use the router

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.listen(port, () => {
	console.log('Server is running on port 5000...')
})
