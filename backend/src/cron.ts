import { CronJob } from "cron";
import https from "https";

const backendUrl = "https://recall-d6bw.onrender.com";
export const job = new CronJob("*/14 * * * *", function () {
  console.log("restarting server");
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.error("Failed to restart server");
      }
    })
    .on("error", (err) => {
      console.error("Error during restart");
    });
});
