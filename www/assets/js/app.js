/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class UploadForm {
    constructor(form) {
        this.form = form;
        this.form.on('submit', (event) => {
            this.handleSubmit(event);
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        // get File info
        //noinspection TypeScriptUnresolvedVariable
        let file = this.form.find('#icsFile')[0].files[0];
        if (this.validateFile(file)) {
            this.file = file;
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = (event) => {
                this.onFileUploaded(event);
            };
        }
        else {
            console.log('invalid file');
        }
    }
    validateFile(file) {
        return (file && file.type == 'text/calendar' && file.size < 1000000);
    }
    onFileUploaded(event) {
        //noinspection TypeScriptUnresolvedVariable
        var result = event.target.result;
        this.onSucces(result);
    }
}
/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class Calendar {
    constructor(data) {
        //   protected courses: {[key: string]: number; } = {};
        this.courses = new Map();
        let jcalData = ICAL.parse(data);
        this.vcalendar = new ICAL.Component(jcalData);
        let events = this.vcalendar.getAllSubcomponents('vevent');
        for (var vevent of events) {
            var event = new ICAL.Event(vevent);
            let courseCode = this.readCourseCode(event.summary);
            if (!this.courses.has(courseCode)) {
                let codeParts = courseCode.split('/');
                this.courses.set(courseCode, new Course(codeParts[0], codeParts[1]));
            }
        }
    }
    readCourseCode(sumary) {
        let result = sumary.match(/^([A-Z]+)\/([A-Z0-9]+)/);
        return result[1] + '/' + result[2];
    }
    loadCoursesDetails() {
        let params = new Array();
        for (var course of this.courses.values()) {
            params.push(course);
        }
        $.getJSON('proxy.php', { courses: params }, (data, textStatus, jqXHR) => {
            for (var course of this.courses.values()) {
                let index = course.toString();
                if (data.hasOwnProperty(index)) {
                    course.setInfo(data[index]);
                }
            }
            this.prepareDownload();
        });
    }
    prepareDownload() {
        let events = this.vcalendar.getAllSubcomponents('vevent');
        let selectedFormat = $("#titleFormat").val();
        for (var vevent of events) {
            var event = new ICAL.Event(vevent);
            let courseCode = this.readCourseCode(event.summary);
            let course = this.courses.get(courseCode);
            event.summary = this.formatTitle(event, course, selectedFormat);
        }
        $("#download")
            .attr('href', 'data:text/calendar;charset=UTF-8,' + encodeURIComponent(this.vcalendar.toString()))
            .removeClass('hidden');
    }
    formatTitle(event, course, format) {
        let title = new Array();
        if (format % Calendar.FORMAT_CODE == 0) {
            title.push(course.getCode());
        }
        if (format % Calendar.FORMAT_NAME == 0) {
            title.push(course.getName());
        }
        if (format % Calendar.FORMAT_SUFFIX == 0) {
            let suffix = event.summary.split(' - ');
            title.push(suffix[1]);
        }
        return title.join(' - ');
    }
}
Calendar.FORMAT_CODE = 2;
Calendar.FORMAT_NAME = 3;
Calendar.FORMAT_SUFFIX = 5;
/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
/// <reference path="Components/UploadForm.ts"/>
/// <reference path="Components/Calendar.ts"/>
class Application {
    constructor() {
        this.createUploadForm();
    }
    createUploadForm() {
        let uploadForm = new UploadForm($('#uploadForm'));
        uploadForm.onSucces = (data) => {
            let calendar = new Calendar(data);
            calendar.loadCoursesDetails();
        };
    }
}
try {
    let application = new Application();
}
catch (ex) {
    console.log(ex);
}
/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class Course {
    constructor(faculty, number) {
        this.faculty = faculty;
        this.number = number;
    }
    toString() {
        return this.faculty + '/' + this.number;
    }
    setInfo(data) {
        this.info = data;
    }
    getName() {
        return this.info['nazev'];
    }
    getCode() {
        return this.toString();
    }
}
