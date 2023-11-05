import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

const SAMPLE_TEXT = "Deterruisset elitr unum labores honestatis vulputate suscipit. Facilis aliquid causae natoque autem legimus expetenda errem mucius. Voluptatibus dui mucius sapien epicurei hac. Ex indoctum himenaeos dui pharetra eripuit vim ligula sociis. Augue facilisi consectetuer vero euripidis class. Etiam congue decore fastidii eget natoque fabellas sapientem sententiae. Delectus rhoncus rhoncus elaboraret novum dicit sollicitudin invenire morbi suscipiantur. Similique auctor ullamcorper mattis vitae ex. Nihil velit delicata imperdiet consectetuer quam moderatius errem feugiat. Ligula appetere legimus vulputate ei deseruisse cum maximus. Eloquentiam euripidis recteque rhoncus pulvinar graeci. Ligula menandri repudiandae risus reprimique sententiae tantas. Doming mei eam dapibus eripuit aliquam his novum erat civibus. Taciti leo varius purus wisi verear accumsan feugiat ornare. Nunc ornare sem elitr saepe arcu. Vituperatoribus similique sagittis auctor cubilia tristique an iusto laudem. Iriure omnesque augue ceteros nam praesent laoreet postea consetetur sanctus. Arcu an vivamus nascetur veri option eget erroribus. Mus persecuti moderatius vehicula dictum eos. Disputationi cursus nostrum eleifend legimus aperiri sollicitudin sagittis sonet. Inciderint qui reque velit reque reprimique. Splendide consul integer simul fermentum cetero mei. Reprimique brute quaeque gravida hinc tempor commune. Nostra tantas quem dolores detraxit. Litora verterem definiebas epicurei voluptaria proin mazim liber purus. Malesuada mediocrem adolescens an pertinacia lacus ei sit. Lorem volumus risus libris detraxit. Ceteros morbi fuisset erroribus vel conceptam verear lobortis offendit. Vel curae fringilla eros repudiandae commodo omittantur habemus honestatis ceteros. Mnesarchum posse urbanitas autem detraxit vestibulum vivendo tortor. Magnis mel fugit ultricies unum sagittis. Nobis tation condimentum eu sonet constituam leo repudiandae. Fusce mucius eripuit dapibus laoreet singulis ferri. Habeo dolore ubique noster integer agam et tempus. Error sumo efficiantur noluisse dicam orci. Splendide appetere sapien libris expetendis propriae. Efficiantur agam usu phasellus ubique dictas moderatius diam velit. Signiferumque dico placerat voluptatibus facilisi montes homero disputationi errem tale. Eum possit eos has tation. Simul gloriatur mattis delenit invidunt aperiri honestatis offendit orci convenire. Wisi consetetur quaestio cetero porro duis ad. Utamur sociosqu esse omittantur propriae sodales himenaeos altera aeque penatibus. Usu rhoncus verear ridiculus tota numquam nullam dicat urbanitas. Ex purus appareat quis sit efficitur tation partiendo vituperatoribus. Cum impetus sociis an laudem aliquip. Pulvinar consequat hendrerit unum veritus. Causae mucius egestas aperiri epicuri inani elitr vivamus graecis. Praesent legimus platonem sale vidisse laudem purus audire nulla. Aptent detraxit propriae mus reprimique facilisi electram donec. Perpetua platonem porttitor feugait scelerisque recteque mauris comprehensam."
@Component({
  selector: "create-course-step-1",
  templateUrl:"create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const month = cellDate.getMonth();
    const date = cellDate.getDate();
    const year = cellDate.getFullYear()
    if (view == 'month') {
      return (date === 1) ? 'highlight-date' : '';
    }

    if (view=='multi-year'){
      return (year === 2021) ? 'highlight-year' : '';
    }

    if (view == 'year') {
      return (month === 1) ? 'highlight-month' : '';
    }
    return '';
  }



  constructor(private fb: UntypedFormBuilder) {

  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
