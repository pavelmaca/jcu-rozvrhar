/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class Calendar {
    public static FORMAT_CODE = 2;
    public static FORMAT_NAME = 3;
    public static FORMAT_SUFFIX = 5;

    //   protected courses: {[key: string]: number; } = {};
    protected courses: Map<string, Course> = new Map();

    protected vcalendar: ICAL.Component;

    constructor(data: String) {
        let jcalData = ICAL.parse(data);
        this.vcalendar = new ICAL.Component(jcalData);

        let events: ICAL.Component[] = this.vcalendar.getAllSubcomponents('vevent');
        for (var vevent: ICAL.Component of events) {
            var event = new ICAL.Event(vevent);

            let courseCode: string = this.readCourseCode(event.summary);
            if (!this.courses.has(courseCode)) {
                let codeParts = courseCode.split('/');
                let suffix = event.summary.split(' - ');

                this.courses.set(courseCode, new Course(codeParts[0], codeParts[1], suffix[1]));
            }
        }
    }

    protected readCourseCode(sumary: string): string {
        let result = sumary.match(/^([A-Z]+)\/([A-Z0-9]+)/);
        return result[1] + '/' + result[2];
    }

    public loadCoursesDetails() {
        let params: Course[] = new Array();
        for (var course: Course of this.courses.values()) {
            params.push(course);
        }
        $.getJSON('proxy.php', {courses: params}, (data, textStatus, jqXHR)=> {
            for (var course: Course of this.courses.values()) {
                let index = course.toString();
                if (data.hasOwnProperty(index)) {
                    course.setInfo(data[index]);
                }
            }
            this.prepareDownload();
        });
    }

    public prepareDownload() {
        let events: ICAL.Component[] = this.vcalendar.getAllSubcomponents('vevent');
        let selectedFormat = $("#titleFormat").val();

        for (var vevent: ICAL.Component of events) {
            var event = new ICAL.Event(vevent);

            let courseCode = this.readCourseCode(event.summary)
            let course: Course = this.courses.get(courseCode);

            event.summary = this.formatTitle(course, selectedFormat);
        }

        $("#download")
            .attr('href', 'data:text/calendar;charset=UTF-8,' + encodeURIComponent(this.vcalendar.toString()))
            .removeClass('hidden');
    }

    protected formatTitle(course: Course, format: number): string {
        let title: string[] = new Array();

        if (format % Calendar.FORMAT_CODE == 0) {
            title.push(course.getCode());
        }

        if (format % Calendar.FORMAT_NAME == 0) {
            title.push(course.getName());
        }

        if (format % Calendar.FORMAT_SUFFIX == 0) {
            title.push(course.getSuffix());
        }

        return title.join(' - ');
    }
}