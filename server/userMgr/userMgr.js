import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const DB_LINK = process.env.DB_LINK;
const SECRET = process.env.SECRET;

const errorCodes = {
    0: "Invalid ID",
    1: "Wrong password",
    2: "User not found",
    3: "User already exists",
}


const userMgr = {
    async login(req, res) {
        try {
            const {username, password} = req.body;

            const dbResponse = await fetch(`${DB_LINK}/users?username=${username}`)
            const [user] = await dbResponse.json();
            if (!user) {
                res.status(400).json({"message": errorCodes["2"], code: 2})
                return;
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({"message": errorCodes["1"], code: 1})
                return;
            }

            res.json({token: "Bearer " + jwt.sign({id: user.id}, SECRET, {expiresIn: "24h"})})
            res.status(200).send()
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server error", error: e});
        }
    },

    async register(req, res) {
        try {
            const candidate = req.body;

            const existenceResponse = await fetch(`${DB_LINK}/users?username=${candidate.username}`).then(res=>res.json())
            if (existenceResponse.length) {
                res.status(400).json({"message": errorCodes["3"], code: 3})
                return;
            }

            const dbResponse = await fetch(`${DB_LINK}/users`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: candidate.username,
                    email: candidate.email,
                    password: bcrypt.hashSync(candidate.password, 5),
                }),
            });
            if (!dbResponse.ok) {
                throw new Error("Database error");
            }

            const user = await dbResponse.json();

            res.json({token: jwt.sign({id: user.id}, SECRET, {expiresIn: "24h"})})
            res.status(200).send()
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server error", error: e});
        }
    },

    async getUserData(req, res){
        try {
            const {userId} = req.params;
            if (!userId) {
                res.status(400).json({"message": errorCodes["0"], code: 0})
            }

            const dbResponse = await fetch(`${DB_LINK}/users/${userId}`);
            if (!dbResponse.ok) {
                res.status(400).json({"message": errorCodes["2"], code: 2})
                return;
            }
            const data = await dbResponse.json();

            res.json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server error", error: e});
        }
    },

    async getMyData(req, res) {
        try {
            if(!"Authorization" in req.headers){
                res.status(401).json({"message": "Provide Authorization header"});
            }
            const jwtToken = decodeURI(req.headers.authorization).split(" ")[1];
            const {id} = jwt.verify(jwtToken, SECRET);

            const dbResponse = await fetch(`${DB_LINK}/users/${id}`);
            if (!dbResponse.ok) {
                res.status(400).json({"message": errorCodes["2"], code: 2})
                return;
            }
            const data = await dbResponse.json();

            res.json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server error", error: e});
        }
    }
}

export default userMgr;
