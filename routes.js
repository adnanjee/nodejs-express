const fs = require('fs');
const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>My First Page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">');
        res.write('Send Data</button>')
        res.write('</body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {

            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>My First Page</title></head>')
    res.write('<body><h1>Hello From My Server</h1></body>')
    res.write('</html>')
    res.end();

};

module.exports = requestHandler;