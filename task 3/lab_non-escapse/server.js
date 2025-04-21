const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// cấu hình CORS
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Form nhập</title>
    </head>
    <body>
      <h1>Nhập thông tin</h1>
      <form method="POST" action="/generate">
        <label>Họ tên: <input type="text" name="name" /></label><br><br>
        <label>Nội dung: <textarea name="content"></textarea></label><br><br>
        <button type="submit">Gửi</button>
      </form>
    </body>
    </html>
  `);
});

// convert
app.post('/generate', (req, res) => {
  const { name, content } = req.body;

  // Set cookie 
  res.cookie('session_id', 'abc123', {
    httpOnly: false,
    sameSite: 'Lax'
  });

  res.cookie('temp_name', name, { httpOnly: false }); 
  res.cookie('temp_content', content, { httpOnly: false });

  res.redirect('/preview');
});

app.get('/preview', (req, res) => {
  const { temp_name, temp_content } = req.cookies;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>XSS Preview</title>
    </head>
    <body>
      <h1>PDF</h1>
      <p><strong>Họ tên:</strong> ${temp_name}</p>
      <p><strong>Nội dung:</strong> ${temp_content}</p>
    </body>
    </html>
  `);
});

app.listen(9725, () => {
  console.log('Server chạy tại http://localhost:9725');
});
