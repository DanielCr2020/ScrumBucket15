import baseRoutes from './baseRoutes.js'
import userRoutes from './userRoutes.js'
import eventRoutes from './eventRoutes.js'
import skillRoutes from './skillRoutes.js'

const constructorMethod = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/events', eventRoutes)
    app.use('/api/skills',skillRoutes)
    app.use('/',baseRoutes);
    app.use('*',(req,res) => {
        res.status(404).json({error: `${req.originalUrl} Not Found`})
    })
}

export default constructorMethod;