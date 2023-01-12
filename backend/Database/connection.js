const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.port, () => console.log(`Server is running on port ${port}`))
}).catch((error) => console.log(`${error} did not connect`))