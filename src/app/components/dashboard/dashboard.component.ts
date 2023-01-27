import { Component } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  //create variables for hold value
  taskObj: Todo = new Todo();
  taskArr: Todo[] = [];
  addTaskData: string = '';
  edittaskData: string='';


  constructor(private api: TaskService) {

  }
  ngOnInit(): void {

    this.addTaskData=''

    this.edittaskData=''
    this.taskObj = new Todo();
    this.taskArr = [];
    this.getAllTask();

  }
  //create a task
  addTask() {
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskData = ''
    }, err => {
      alert(err);
    }
    )
  }
  // get all task data 
  getAllTask() {
    this.api.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert('unable to find task')
    }

    )
  }
  // edit todo 
  editTask() {
    this.taskObj.task=this.edittaskData
    this.api.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('unable to update task');
    })
  }
  // delete task after
  delete(task: Todo) {
    this.api.delete(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('Failed to delete task')
    })
  }

  // Edit property
  callEdit(task:Todo){
    this.taskObj=task;
    this.edittaskData=task.task;
  }
}