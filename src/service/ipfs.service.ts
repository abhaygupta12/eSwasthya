import { Injectable } from '@angular/core';
import { create, IPFSHTTPClient } from "ipfs-http-client";

@Injectable({
    providedIn: 'root'
})
export class IpfsService {
    ipfs!: IPFSHTTPClient;

    // projectId = '<API_KEY>';
    // projectSecret = '<API_KEY_SECRET>';
    // auth =
    //     'Basic ' + Buffer.from(this.projectId + ':' + this.projectSecret).toString('base64');

    constructor() {
        this.ipfs = create({ url: "http://127.0.0.1:5001/api/v0" });
        // this.ipfs = create({
        //     host: 'ipfs.infura.io',
        //     port: 5001,
        //     protocol: 'https',
        //     headers: {
        //         authorization: this.auth,
        //     },
        // });
    }

    getIPFS() {
        return this.ipfs;
    }

}
