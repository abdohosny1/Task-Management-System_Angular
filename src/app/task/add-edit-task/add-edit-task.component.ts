import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent  implements OnInit {

  task:any={
    id:0,
    name:"",
    title: "",
    description: "",
    status:   "",
    dueDate:Date

  };

  onClose:any;
  submitted = false;
  selectedVlue:any;

  constructor(
    public  bsModel: BsModalRef,
    private fb:FormBuilder,
    private taskServices:TaskService

  ) { }

  registerForm = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    dueDate: ['', [Validators.required]]
  });

  get title(){
    return this.registerForm.get('title');
  }
  get status(){
    return this.registerForm.get('status');
  }
  get dueDate(){
    return this.registerForm.get('dueDate');
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
     if(this.task.id==0){
      this.taskServices.AddTask(this.task).subscribe(
        taskAdd=>{
          console.log("done add"+taskAdd);
          this.onClose(taskAdd);
          this.bsModel.hide();
        },
        error=>{console.log(error);}
      );
     }else{
      this.taskServices.UpdateTask(this.task.id,this.task).subscribe(
        taskupdare=>{
          console.log("id"+this.task.id);
          console.log("emp"+this.task);

          console.log(taskupdare);
          this.onClose(taskupdare);
          this.bsModel.hide();
        },
        error=>{console.log(error);}
      );

     }
    }
  }

  // onAddEmployee(){

  //   // let confirmAdd=confirm("Add Employee?");
  //   // if(confirmAdd){
  //     this.departmentServices.AddDepartment(this.department).subscribe(
  //       taskAdd=>{
  //         console.log("done add"+taskAdd);
  //         this.onClose(taskAdd);
  //         this.bsModel.hide();
  //       },
  //       error=>{console.log(error);}
  //     );
  //   // }

  // }
  // onEditEmployee(){

  //   // let confirmAdd=confirm("Edit Employee?");
  //   // if(confirmAdd){
  //     this.departmentServices.UpdateDepartment(this.department.id,this.department).subscribe(
  //       taskupdare=>{
  //         console.log("id"+this.department.id);
  //         console.log("emp"+this.department);

  //         console.log(taskupdare);
  //         this.onClose(taskupdare);
  //         this.bsModel.hide();
  //       },
  //       error=>{console.log(error);}
  //     );
  //   }
  // }
}
function ForBiddenName(arg0: RegExp): any {
  throw new Error('Function not implemented.');
}
