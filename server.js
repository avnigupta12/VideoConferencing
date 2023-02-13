const express = require("express");
const path = require("path");
const axios = require("axios");
const config = require("./config");
const { response } = require("express");

const app = express();
const PORT = config.PORT;

app.use("/", express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//   });
// });

//create meeting room
app.post("/create-meeting-room", async (req, res) => {
  const options = {
    method: "post",
    url: `https://${config.METERED_DOMAIN}/api/v1/room`,
    params: {
      secretKey: config.METERED_SECRET_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    res.send({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.send({
      success: false,
      error,
    });
  }
});

app.get("/validate-meeting", async (req, res) => {
  const options = {
    method: "get",
    url: `https://${config.METERED_DOMAIN}/api/v1/room/${req.query.meetingId}`,
    params: {
      secretKey: config.METERED_SECRET_KEY,
    },
  };
  try {
    const response = await axios.request(options);
    res.send({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.send({
      success: false,
      error,
    });
  }
});

//return metered domain to front end
app.get("/metered-domain", (req, res) => {
  res.send({
    domain: config.METERED_DOMAIN,
  });
});

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
