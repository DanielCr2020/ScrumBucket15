import baseRoutes from './baseRoutes.js'
import userRoutes from './userRoutes.js'
import eventRoutes from './eventRoutes.js'

const constructorMethod = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/events', eventRoutes)
    app.use('/',baseRoutes);
    app.use('*',(req,res) => {
        res.status(404).json({error: "Not Found!"})
    })
}

export default constructorMethod;