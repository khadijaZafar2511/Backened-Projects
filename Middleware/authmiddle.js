import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const authm = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    //  console.log(req.cookies.token);
    if (!token) return res.status(401).send("authorization failed")
    try { 
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        if (decode) {
            console.log(decode)
            req.id = decode.id;
            req.email = decode.email;
           next();

      } else return res.status(401).send("authorization failed")
       
    } catch (err) {
    res.status(401).send("invalid token")
}
  
    
}

export default authm;