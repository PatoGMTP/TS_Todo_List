import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild("todoEdit") input_element!: ElementRef;

  id: number = 0;

  input = new FormControl("");

  target: {todo:string, id:number} = {todo: "", id: -1};

  show_deleted: boolean;

  // mode: "edit" | "new";

  myvar: boolean = true;

  name: string;

  list: {todo:string, completed:boolean, id: number}[];

  deleted_list: {todo:string, completed:boolean, id: number}[];

  constructor() {
    this.show_deleted = false;
    // this.mode = "new";
    this.name = "Pato";
    this.list = [
      {todo: "Fill this list", completed: false, id: this.id},
      {todo: "Walk the dog", completed: false, id: this.id},
      {todo: "kete", completed: false, id: this.id},
      {todo: "eat", completed: false, id: this.id},
      {todo: "sleep", completed: false, id: this.id},
    ];
    this.deleted_list = [];
    console.log(this.input_element);
    this.id++;
  }

  ngOnInit(): void {
  }

  addItem(): void
  {
    this.list.push({todo: this.target.todo, completed: false, id: this.id});
    // this.list.push({todo: this.target.todo, completed: true});

    console.log(this.id);
    this.id++;
    console.log(this.id);

    console.log(this.list)

    this.target.todo = "";
  }

  toggleCompletion(index: number): void
  {
    this.list[index].completed = !this.list[index].completed;
  }

  deleteItem(index: number): void
  {
    this.list.splice(index, 1);
  }

  saveEdits(): void
  {
    console.log(this.target, this.list);
    console.log(this.input_element.nativeElement.value, this.target.id);
    // this.list[this.target.id].todo = this.target.todo;
    // this.list.find(item => item.id == this.target.id)!.todo = this.target.todo;
    this.list.find(item => item.id == this.target.id)!.todo = this.input_element.nativeElement.value;
    this.toggleMode();
  }

  enterEditMode(li: HTMLLIElement): void
  {
    // if (this.mode == "new")
    if (this.myvar)
    {
      this.toggleMode();
      // this.target.todo = li.innerHTML;
      this.target.id = parseInt(li.id);
      // console.log(this.input);
      // console.log("Notice that this is empty! Not yet filled for some reason: this.input.value =",this.input.value);
      console.log(this.input_element);
      console.log(this.input_element.nativeElement);
      // this.input_element.nativeElement.value = li.innerText.trim();
      this.input_element.nativeElement.value = li.getAttribute("data-value");

      // JS IS SINGLE-THREADED SO THIS FAILS!!!!!
      this.input_element.nativeElement.focus();

      //Solution: Delay! This lets the browser 'do some work' AKA re-render the screen
      setTimeout(() => {this.input_element.nativeElement.focus();}, 10);

      console.log(this.input_element.nativeElement);
    }
  }

  // ngOnChanges()
  // {
  //   console.log(this.input_element);
  //   console.log(this.input_element.nativeElement);
  // }
  
  // ngAfterViewInit()
  // {
  //   console.log(this.input_element);
  //   console.log(this.input_element.nativeElement);
  // }

  cancelEdit(): void
  {
    this.toggleMode();
  }

  toggleMode(): void
  {
    // if (this.mode == "edit") this.mode = "new";
    // else this.mode = "edit";
    this.myvar = !this.myvar;
  }
}
