
const app = require('./server').app;
const jwt = require('jsonwebtoken');
const linkSecret = "maxsecret";

app.get('/user-link', (req, res) => {
    const appData = {
        professionalsFullName: "Max, J.D.",
        apptDate: (Date.now() + 500000)
    }

    const token = jwt.sign(appData, linkSecret);
    res.send("https://localhost:3000/join-video?token=" + token);

})

app.post('/validate-link', (req, res) => {
    // get the token from the request body (thanks to express.json())
    const token = req.body.token;
    const decodedData = jwt.verify(token, linkSecret);
    res.json(decodedData);
})