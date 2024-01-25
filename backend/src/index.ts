import express, {Response, Request} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import {db} from "./db";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.post('/query', (req: Request, res: Response) => {
    const {sql} = req.body;

    try {
        const isSelectQuery = sql.trim().toLowerCase().startsWith('select');

        const result = isSelectQuery ? db.prepare(sql).all() : db.prepare(sql).run();

        res.json({ success: true, data: result });
    } catch (error) {
        res.json({ success: false, data: (error as Error).message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
