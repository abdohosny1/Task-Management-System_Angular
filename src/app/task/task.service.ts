import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITask } from '../SHARED/model/ITask';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTaskById(id:number){
    return this.http.get(environment.BASE_URL+environment.TASKS+"/"+id);
  }

  RemoveTask(id:number){
    return this.http.delete(environment.BASE_URL+environment.TASKS+"/"+id);
  }

  AddTask(task:ITask){
    return this.http.post(environment.BASE_URL+environment.TASKS,task);
  }

  UpdateTask(id:number,task:ITask){
    console.log("task : "+task.status)
    return this.http.put(environment.BASE_URL+environment.TASKS+"/"+id,task);
  }

  getAllTask(){
    console.log("base url ");
    console.log(environment.BASE_URL+environment.TASKS);
    return this.http.get<ITask[]>(environment.BASE_URL+environment.TASKS);

  }
}
