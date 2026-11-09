// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

const express = require('express');

const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/greet', (req, res) => {
    const timestamp = new Date().toISOString();

    res.json({
        msg: `hi from get endpoint ${timestamp}`
    })
})

app.get('/greet/:name', (req, res) => {
    const name = req.params.name
    console.log(`i got name: ${name}`)

    res.json({
        msg: `got name: ${name}`
    })
})

app.get('/test', async (req, res) => {
    const response = await fetch("http://localhost:3000/greet/Bob")
    const data = await response.json()
    data.msg === "got name: Bob" ? res.json({ result: "ok" }) : res.json({ result: "fail" })
})


app.post(`/action`, async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ msg: "body is malformed" })
    }

    const act = req.body.action

    if (act === "joke") {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode')
        const data = await response.json()
        return res.json({ joke: data.joke.toUpperCase() })

    }

    if (act === "cat fact") {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', { headers: { "x-api-key": "live_Z5Ae5g2Cq2rJElkfVrXE29xFTdwie7W1xzIFsnq1pDsOdovr9VvuK5LSoW9N5xFp" } })
        const data = await response.json()
        return res.json({ "length": data.length })
    }

    else {
        return res.status(400).json({ msg: "body is malformed" })
    }

})

