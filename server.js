import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const userCredentials = {
  userName: "John",
  password: "123",
  image: "https://via.placeholder.com/150",
};

app.post("/login", (req, res) => {
  if (
    req.body.userName === userCredentials.userName &&
    req.body.password === userCredentials.password
  ) {
    res.status(200).send({ token: "John_123", name: "John", image: userCredentials.image });
  } else {
    res.status(401).send("Noto'g'ri kirish ma'lumotlari");
  }
});
app.listen(8080, () => console.log("Server 8080-portda ishga tushdi"));

// Exporting the handler
export default async (req, res) => {
  return new Promise((resolve) => {
    app(req, res, resolve);
  });
};

