import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if (req.method == "GET"){
        const {category, sort} = req.query; 
        res.status(200).json({ category: category, sort: sort })   
        return;    
    }
    if (req.method == "POST"){
        const {category, sort} = req.body; 
        res.status(200).json({ category: category, sort: sort })   
        return;    
    }
    res.status(405).json({ error: 'method not supported' })

    
  }
  