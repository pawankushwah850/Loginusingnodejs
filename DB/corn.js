const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_DB_LOCAL_URL,
    {
        useCreateIndex: true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((response)=>
    {
        console.log("connected to mongo db")
    }).catch((error)=>
    {
        console.error(error);
        process.exit(1)
    })
