import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const authm = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) return res.status(401).send("authorization failed")
    try { 
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        if (decode) {
           req.user = decode;
           next();

      } else return res.status(401).send("authorization failed")
       
    } catch (err) {
    res.status(401).send("invalid token")
}
  
    
}

export default authm;