const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h2> Bienvenidos a mi pagina de inicio </h2>')
  } else if (req.url === '/diagrama.png') {
    fs.readFile('./placa.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h2>500 Internal Server Error </h2>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h2> Contactos ✉️ </h2>')
  } else {
    res.statusCode = 404
    res.end('<h2> 404 </h2>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
