import CryptoService from "../../functions/crypto";
import { Request, Response, NextFunction } from "express";
import { submittedToken } from "./onSubmitHandle";


export default async function tokenValidateMiddleware(req: Request, res: Response, next: NextFunction){
    const current = new Date();
    const q = req.query

    if(submittedToken.some((i: any) => i.token === q.tk.toString())){
      res.status(200).redirect('/report-done');
      return;
    }

    const validation = CryptoService.validate(
      q.tk.toString(), 
      q.uid.toString(), 
      q.cid.toString(), 
      q.tid.toString(), 
      q.oid.toString())

    const stdate = new Date(CryptoService.extractDate(q.tk.toString()));
    const expDate = new Date();
    expDate.setTime(stdate.getTime() + parseInt(process.env.TOKEN_DURATION))
    const expired = current.getTime() > expDate.getTime();


    if(!validation || expired){
        res.status(403).redirect('/report-failed');
        return;
    }

    next();
}