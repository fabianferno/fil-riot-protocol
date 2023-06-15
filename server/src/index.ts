import * as dotenv from "dotenv";

dotenv.config();

import server from "./api";

server.listen(parseInt(process.env.PORT || "5000"), "0.0.0.0", () => {
  console.log(
    `The API server has successfully started. \nListening at http://localhost:${
      process.env.PORT || "5000"
    }`
  );
});

process.on("SIGINT", function () {
  process.exit(0);
});
