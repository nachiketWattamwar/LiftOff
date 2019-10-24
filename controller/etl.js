const fs = require('mz/fs');
const csv = require('fast-csv');

const { Schema } = mongoose = require('mongoose');



var myfunc = function(){


const uri = "mongodb+srv://nachiket:nachiket@cmpe280-emqpv.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const agencySchema = new Schema({
    agency: String,
    count: Number, 
    ucode: String, 
    state_code: String, 
    type: String, 
    class: String, 
    tstart: String, 
    tstop: String, 
    short_name: String, 
    name: String, 
    location: String, 
    longitude: String, 
    latitude: String, 
    error: String, 
    parent: String, 
    short_english_name: String, 
    english_name: String, 
    unicode_name: String,

});

const Agency = mongoose.model('Agency', agencySchema); 

const log = data => console.log(JSON.stringify(data, undefined, 2));

(async function() {

    try {
        console.log("inside etl");
      const conn = await mongoose.connect(uri);
  
      await Promise.all(Object.entries(conn.models).map(([k,m]) => m.remove()));
  
      let headers = Object.keys(Agency.schema.paths)
        .filter(k => ['_id','__v'].indexOf(k) === -1);
    
      console.log("above head")
      console.log(headers);
  
      await new Promise((resolve,reject) => {
  
        let buffer = [],
            counter = 0;
  
        let stream = fs.createReadStream('public/assets/data/agencies.csv')
          //.pipe(csv({ headers }))
          .on("error", reject)
          .on("data", async doc => {
            stream.pause();
            buffer.push(doc);
            counter++;
            //log(doc);
            try {
              if ( counter > 10000 ) {
                await Agency.insertMany(buffer);
                buffer = [];
                counter = 0;
              }
            } catch(e) {
              stream.destroy(e);
            }
  
            stream.resume();
  
          })
          .on("end", async () => {
            try {
              if ( counter > 0 ) {
                await Agency.insertMany(buffer);
                buffer = [];
                counter = 0;
                resolve();
              }
            } catch(e) {
              stream.destroy(e);
            }
          });
  
      });
  
  
    } catch(e) {
      console.error(e)
    } finally {
      process.exit()
    }
  

  })()
}
  module.exports = { Schema };
  module.exports = {myfunc };