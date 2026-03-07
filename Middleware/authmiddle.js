import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const authm = (req, res, next) => {
  
    const token = req.header("Authorization");
      console.log(token);
    if (!token) return res.status(401).send("authorization failed")
    console.log(token)
    try { 
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        console.log(decode)
        req.user = decode;
        next();

    } catch (err) {
    res.status(401).send("invalid token")
}
  
    
}

export default authm;