const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING).then(res=>{
    console.log('db connected');

    
})

.catch(err=>{
    console.log("db connection err",err);
    
})
