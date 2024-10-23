import express, { Request, Response, Express } from "express";
const app: Express = express();

app.get("/saif", (req: Request, res: Response): any => {
  return res.status(200).json({ message: "Success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
