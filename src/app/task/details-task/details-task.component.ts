import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {

  Id: any;
  oneTask:any;
  errorMassage: any;
  constructor(private activeRout: ActivatedRoute,
    private router: Router,
    private item:TaskService) { }


  ngOnInit(): void {
    this.activeRout.paramMap.subscribe((params) => {
      this.Id = params.get('id');
    });

    this.item.getTaskById(this.Id).subscribe(
      (data) => {
        this.oneTask = data;
      },
      (error) => {
        this.errorMassage = error;
      }
    );
  }

  BackToTask(){
    this.router.navigate(["/task"]);

  }
  getStatusBadge(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'overdue':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }


}
