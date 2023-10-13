import baseRoutes from './baseRoutes.js'
import userRoutes from './userRoutes.js'

import cors from 'cors'

const constructorMethod = (app) => {
    app.use(cors())
    app.use('/index.html',baseRoutes);
    app.use('/api', baseRoutes);
    app.use('/api/users', userRoutes);
    app.use('*',(req,res) => {
        res.status(404).json({error: "Not Found!"})
    })
}

export default constructorMethod;