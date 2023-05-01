import { ICvModel } from "../4-models/cv-model";

export class MaxHeep{
    private myHeap:Array<ICvModel>;

    //take the array of cv and build Max heap
    public constructor(myHeap:Array<ICvModel>){
        this.myHeap = this.buildMaxHeap(myHeap)
    }
     
    //runTime 0(logn)
    //to fix the place of myHeap[i]
    public maxHeapify( myHeap:Array<ICvModel>, i:number){
        const left = 2*i + 1;
        const right = 2*i +2;
        let largest = i
        if (left<=(myHeap.length-1) && myHeap[left].score>myHeap[i].score){
            largest = left
        }
        if (right<=(myHeap.length-1) && myHeap[right].score>myHeap[largest].score){
            largest = right
        }
        if (largest != i){
            const temporary = myHeap[i];
            myHeap[i]=myHeap[largest];
            myHeap[largest] = temporary;
            this.maxHeapify(myHeap, largest)
        }
    }

//runTime O(n)
    public buildMaxHeap(heap:Array<ICvModel>){
        const firstPlaceNotLeaf =Math.floor((heap.length-1)/2)
        for(let i = firstPlaceNotLeaf; i >= 0; i--) {
            this.maxHeapify(heap,i)
          }
        return heap
    }

    //runTime 0(logn)
    public heapExtractMax(){
        if(this.myHeap.length < 1){
            return "heap underflow"
        }else{
        const max = this.myHeap[0];
        this.myHeap[0] = this.myHeap[this.myHeap.length-1]
        this.myHeap.pop();
        this.maxHeapify(this.myHeap, 0)
        return max}
    }

    //runTime O(logn)
    //Insert new node to the max heap
    public maxHeapInsert(newCV:ICvModel){
        let i = this.myHeap.length
        let parentI = Math.floor((i-1)/2);
        this.myHeap.push(newCV);
        while (i > 0 && this.myHeap[parentI]<this.myHeap[i]){
            let temp = this.myHeap[parentI];
            this.myHeap[parentI] = this.myHeap[i];
            this.myHeap[i] = temp;
            i = parentI;
        }
    }

}