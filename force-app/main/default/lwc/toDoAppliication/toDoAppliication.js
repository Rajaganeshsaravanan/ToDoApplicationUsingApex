import { LightningElement } from 'lwc';

export default class ToDoAppliication extends LightningElement {
    taskValue = '';
    taskDate= null;
    incompleteTask= [];
    completeTask= [];
    //shallowcopy= [];

    inputtaskdetail(event){
        ///console.log('inputtaskdetail called');
        //console.log(event.target.value);
        //this.taskValue = event.target.value;
        //console.log('taskValue set:', this.taskValue);
        let{value, name } = event.target;
        if(name === 'taskName'){
            this.taskValue = value;
            console.log('taskValue:', this.taskValue);
        }else if(name === 'taskDate'){
            this.taskDate = value;
            //alert('taskDate set:', this.taskDate);
            console.log('taskDate:', this.taskDate);
        }

    }
    addTaskHandler(event){
        console.log('Add Task Handler called');


       console.log('Task Value:', this.taskValue, 'Task Date:', this.taskDate);
        if(this.validateTask()){

            console.log('inside validateTask');
            // Add the task to incompleteTask array
            this.incompleteTask = [
                ...this.incompleteTask,
                {
                    
                    taskName: this.taskName,
                    taskDate: this.taskDate
                }
            ];
            this.clearTaskHandler();
            let sortedArray = this.sortTask(this.incompleteTask);
            this.incompleteTask = [...sortedArray];
            console.log('Sorted Array:', this.incompleteTask);
            
           alert('Task Added');
            console.log('Task Added:', this.taskName, this.taskDate,this.incompleteTask);
        }
    }
    clearTaskHandler(event){
        this.taskName = '';
        this.taskDate = null;
    }

    validateTask(){
        console.log('validateTask called');
        let isValid= true;
        let element = this.template.querySelector('.taskname');
        console.log('element:', element);
        if(!this.taskName){
            isValid = false;
        }
        else{
            let taskItem = this.incompleteTask.find(currItem => currItem.taskName === this.taskName && currItem.taskDate === this.taskDate); 
            console.log('taskItem:', taskItem);
            if(taskItem){
                isValid = false;
                element.setCustomValidity('Task already exists');
            
            } 
        }
        if(isValid){
            element.setCustomValidity('');
        }
        element.reportValidity();

        return isValid;
    }

    sortTask(inputTasks){
       let sortedArray = inputTasks.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    }
}