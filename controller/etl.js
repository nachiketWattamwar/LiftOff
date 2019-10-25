const fs = require("mz/fs");
const csv = require("fast-csv");

const { Schema } = (mongoose = require("mongoose"));

var myfunc = function() {
  const uri =
    "mongodb+srv://nachiket:nachiket@cmpe280-emqpv.mongodb.net/test?retryWrites=true&w=majority";

  mongoose.Promise = global.Promise;
  mongoose.set("debug", true);

  const agencySchema = new Schema({
    name: String,
    descp: String
  });

  const Agency = mongoose.model("Agency", agencySchema);

  const log = data => console.log(JSON.stringify(data, undefined, 2));

  (async function() {
    try {
      console.log("inside etl");
      const conn = await mongoose.connect(uri);

      await Promise.all(
        Object.entries(conn.models).map(([k, m]) => m.remove())
      );

      let headers = Object.keys(Agency.schema.paths).filter(
        k => ["_id", "__v", "count"].indexOf(k) === -1
      );

      console.log(headers);

      await new Promise((resolve, reject) => {
        let buffer = [],
          counter = 0;

        let stream = fs
          .createReadStream("public/assets/data/agencies.csv")
          .pipe(csv.parse({ headers: true }))
          .on("error", reject)
          .on("data", async doc => {
            stream.pause();
            console.log(
              "========================================================"
            );
            console.log(doc["name"]);
            doc["name"] = doc["name"].toUpperCase();
            console.log(doc);
            console.log(
              "========================================================="
            );
            buffer.push(doc);
            counter++;
            //log(doc);
            try {
              if (counter > 10000) {
                await Agency.insertMany(buffer);
                buffer = [];
                counter = 0;
              }
            } catch (e) {
              stream.destroy(e);
            }

            stream.resume();
          })
          .on("end", async () => {
            try {
              if (counter > 0) {
                await Agency.insertMany(buffer);
                buffer = [];
                counter = 0;
                resolve();
              }
            } catch (e) {
              stream.destroy(e);
            }
          });
      });
    } catch (e) {
      console.error(e);
    } finally {
      //process.exit();
    }
  })();
};
module.exports = { Schema };
module.exports = { myfunc };
