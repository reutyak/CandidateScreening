export class Node{
    private dataID: string;
    private dataScore: number;

    public constructor(dataID:string, dataScore:number){
        this.dataID = dataID;
        this.dataScore = dataScore;
    }

    public getDataScore(){
        return this.dataScore
    }

    public getDataID(){
        return this.dataID
    }
}