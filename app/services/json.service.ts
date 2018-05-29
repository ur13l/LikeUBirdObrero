import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';



@Injectable()
export class JsonService {
    public documents;

    constructor() {
        this.documents = fs.knownFolders.currentApp();
    }

    readJSON(path: string)  {
        var jsonFile = this.documents.getFile(path);
        return new Promise<any>((resolve, reject) => {
            try {
                
                jsonFile.readText().then((content: string) => {
                    let data = <Response<any>>JSON.parse(content);
                    resolve(data);   
                });
                        
            }
            catch (err) {
                reject(err);
            }
        });
    }   

}
