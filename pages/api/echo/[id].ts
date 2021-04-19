import { NextApiRequest, NextApiResponse } from 'next';

interface IIdNextApiRequest extends NextApiRequest {
    query: {
        id?: string
    }
}

export default function getById(req: IIdNextApiRequest, res: NextApiResponse) {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json')
    // res.end(req.query.id)
    res.json({ id: req.query.id });
}
