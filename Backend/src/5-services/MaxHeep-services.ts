import { ICvModel } from "../4-models/cv-model";

export class MaxHeep{
    private myHeap:Array<ICvModel>;

    public constructor(myHeap:Array<ICvModel>){
        this.myHeap = myHeap
    }
     
    //runTime 0(logn)
    public maxHeapify(i:number){
        const left = 2*i + 1;
        const right = 2*i +2;
        let largest = i
        if (left<=(this.myHeap.length-1) && this.myHeap[left].score>this.myHeap[i].score){
            largest = left
        }
        if (right<=(this.myHeap.length-1) && this.myHeap[right].score>this.myHeap[largest].score){
            largest = right
        }
        if (largest != i){
            const temporary = this.myHeap[i];
            this.myHeap[i]=this.myHeap[largest];
            this.myHeap[largest] = temporary;
            this.maxHeapify(largest)
        }
    }
//runTime O(n)
    public buildMaxHeap(){
        const firstPlaceNotLeaf =Math.floor((this.myHeap.length-1)/2)
        for(let i = firstPlaceNotLeaf; i >= 0; i--) {
            this.maxHeapify(i)
          }
    }

    public heapExtractMax(){
        if(this.myHeap.length<1){
            return "heap underflow"
        }
        const max = this.myHeap[0];
        this.myHeap[0] = this.myHeap[this.myHeap.length-1]
        this.maxHeapify(1)
        return max
    }


}