import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/accountlazyloading.getAccounts';
import loadMoreData from '@salesforce/apex/accountlazyloading.loadMoreData';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
     { label: 'Rating', fieldName: 'Rating' }

    
];


export default class Lazyloading extends LightningElement {

    data=[];
    columns = columns;
    

    connectedCallback(){
        this.loadData();
    }
    async loadData(){
        try{
            this.data= await getAccounts();
        }
        catch(error){
            console.log("Error "+ error);

        }
        

    }
    async loadMoreData(event){
        try{
            const{target} = event;
            target.isLoading = true;
            let currentRecords = this.data;
            let lastRecord = currentRecords[currentRecords.length -1];
            let newRecords =await loadMoreData({
                lastName : "lastRecord.Name",
                lastId : "lastRecord.Id"
            });
            this.data = [...currentRecords , ...newRecords];
            target.isLoading = false;
        }
        catch(error){
            console.log(Error);
        }
    }

    
}