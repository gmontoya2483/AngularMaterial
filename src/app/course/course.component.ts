import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import {Lesson} from "../model/lesson";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    lessons: Lesson[] = [];
    loading: boolean = false;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    selection = new SelectionModel<Lesson>(true, []);



    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService,
                public _MatPaginatorIntl: MatPaginatorIntl) {

    }


    displayedColumns = ['select','seqNo',"description", "duration"];
    expandedLesson: Lesson = null

    ngOnInit() {
      // this._MatPaginatorIntl.itemsPerPageLabel = 'your custom text 1';
      // this._MatPaginatorIntl.firstPageLabel = 'your custom text 2';
      // this._MatPaginatorIntl.itemsPerPageLabel = 'your custom text 3';
      // this._MatPaginatorIntl.lastPageLabel = 'your custom text 4';
      // this._MatPaginatorIntl.nextPageLabel = 'your custom text 5';
      // this._MatPaginatorIntl.previousPageLabel = 'your custom text 6';

      this.course = this.route.snapshot.data["course"];
        this.loadLessonPage();



    }

    loadLessonPage() {
      this.loading = true;
      this.coursesService.findLessons(
        this.course.id,
        this.sort?.direction ?? 'asc',
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 3,
        this.sort?.active ?? "seqNo")
        .pipe(
          tap(lessons => this.lessons = lessons),
          catchError(err => {
            console.error("Error loading lessons",err);
            alert("Error loading lessons.");

            return throwError(err);

          }),
          finalize(()=>this.loading = false)
        )
        .subscribe();


    }

    ngAfterViewInit() {

      const sort$ = this.sort.sortChange.pipe(tap(()=>{this.paginator.pageIndex = 0}));

      merge(sort$, this.paginator.page)
        .pipe(
          tap(()=> this.loadLessonPage())
        )
        .subscribe()


    }

  onToggleLesson(lesson) {
      if(lesson == this.expandedLesson) {
        this.expandedLesson = null;
      } else {
        this.expandedLesson = lesson;
      }
  }

  onLessonToggle(lesson: Lesson) {

      console.log("selection")
      this.selection.toggle(lesson);
      console.log(this.selection.selected)

  }

  isAllSelected() {
    return (this.selection.selected?.length == this.lessons?.length)
  }

  onToggleAll() {
      if(this.isAllSelected()){
        this.selection.clear();
      } else {
        this.selection.select(...this.lessons)
      }

  }
}
