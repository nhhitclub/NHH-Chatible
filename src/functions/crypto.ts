import SHA256 from "crypto-js/sha256";
import { AES, HmacSHA1, HmacSHA3, enc } from "crypto-js";
import { timingSafeEqual } from "crypto";

export default class CryptoService{

    private static hash(uid: string, cid: string, tid: string, oid: string): string{
        return SHA256(uid + cid + HmacSHA1(tid, oid)).toString();
    }
    
    public static encrypt(uid: string, cid: string, tid: string, oid: string, tstmp: Date): string{
        return AES.encrypt(
                CryptoService.hash(uid, cid, tid, oid) + 'X' + tstmp.getTime(), process.env.PRIVATE_KEY
            ).toString()
    }

    public static decrypt(cipher: string){
        return AES.decrypt(cipher, process.env.PRIVATE_KEY).toString(enc.Utf8)
    }

    public static validate(cipher: string, uid: string, cid: string, tid: string, oid: string): boolean{
        let bool = true;
        const msg = CryptoService.decrypt(cipher)
        
        bool = msg[64] == 'X';
        
        const hash = msg.slice(0, 64);
        
        bool = bool && timingSafeEqual(
            Buffer.from(CryptoService.hash(uid, cid, tid, oid)), 
            Buffer.from(hash)
        )

        //avoid timing attack, not "making colors"
        return bool;
    }

    public static generateReportLink(uid: string, cid: string, tid: string, oid: string, tstmp: Date): string{
        const token = CryptoService.encrypt(uid, cid, tid, oid, tstmp);


        return `/report?uid=${uid}&cid=${cid}&tk=${encodeURIComponent(token)}`;
    }

    public static extractDate(cipher: string): number{
        return parseInt(CryptoService.decrypt(cipher).slice(65));
    }
}