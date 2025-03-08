import  express  from "express";

const app = express();
const port = 5000;


export const listen = (port, () => {
  console.log(`Server is running on port ${port}`);
});

