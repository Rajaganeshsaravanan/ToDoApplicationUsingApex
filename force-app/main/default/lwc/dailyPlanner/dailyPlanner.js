import { LightningElement } from 'lwc';

export default class DailyPlanner extends LightningElement {

    taskname='';
    taskdate= null;
    incompletetask= [];
    completedtask= [];

    inputtaskdetail(event){
        let { name , value } = event.target;
        console.log(value);
        if( name === 'taskname'){
            this.taskname = value;
        }
         
        else if( name === 'taskdate'){
            this.taskdate = value;
        }
        //console.log( 'Values : ' this.taskname, this.taskdate);
        console.log('TaskName:', this.taskname, 'TaskDate:', this.taskdate);
    }

    clearTaskHandler(event){
        this.taskname = '';
        this.taskdate = null;
    }

    addTaskHandler(event){
        // To be implemented: Add logic to add the current task

        console.log('Add Task:', this.taskname, this.taskdate);
        this.incompletetask.push({ name: this.taskname, date: this.taskdate });
        
        this.incompletetask.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        this.incompletetask = [...this.incompletetask];

        console.log(this.incompletetask);
        this.clearTaskHandler();

    }
    checkbuttonhandler(event)
    {
        console.log('check handdler clicked');

        let index = event.target.name;

        let selectedTask = this.incompletetask[index];

        this.completedtask = [
            ...this.completedtask,
            selectedTask
        ];

        this.incompletetask.splice(index, 1);
        this.incompletetask = [...this.incompletetask];
        





    }

    deletebuttonhandler(event)
    {

        console.log('delete handler');

        console.log('delete handler');

        let index = event.target.name;

        this.incompletetask.splice(index, 1);
        this.incompletetask = [...this.incompletetask];
        
    }


}