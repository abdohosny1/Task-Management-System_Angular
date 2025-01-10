import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/SHARED/model/ITask';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks:Array<ITask>=[];
  bsModelresf? :BsModalRef;

  constructor(
    private taskService:TaskService,
    private router:Router,
    private bsmodalService: BsModalService,
    ) { }
  ngOnInit(): void {
    this.getAllTask()
  }
  getAllTask(){
    this.taskService.getAllTask().subscribe(
       (response)=>{
         console.log(response);
         console.log("result");
         this.tasks=response
       },
       (error)=>{
        console.log(error);
       }
    )
  }


  onDetails(details:any){
    this.router.navigate(["/DetailsTask",details.id]);

  }
  onDelete(deleteEmp:number){
    this.router.navigate(["/deleteTask",deleteEmp]);

  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'ToDo':
        return 'bg-primary text-white'; // Blue badge
      case 'InProgress':
        return 'bg-warning text-dark'; // Yellow badge
      case 'Done':
        return 'bg-success text-white'; // Green badge
      default:
        return 'bg-secondary text-white'; // Gray badge
    }
  }


  addTask(){
    this.bsModelresf=this.bsmodalService.show(AddEditTaskComponent);
    this.bsModelresf.content.onClose=(add:any)=>{
      if(add){
        this.getAllTask();
      }
    }
  }

  onEditTask(task:any)
  {

    this.bsModelresf=this.bsmodalService.show(AddEditTaskComponent,{initialState:{task}});
    this.bsModelresf.content.onClose=(update:any)=>{
      if(update){
        this.getAllTask();
      }
    }
  }

  onDeleteTask(id:number){

    let confirmDelete=confirm("Are you sure  Delete?")
    if(confirmDelete){
       this.taskService.RemoveTask(id).subscribe(
         done=>{
          this.getAllTask()
          console.log("done");

         },
         error=>{console.log(error);}
       )


   }

}
}
