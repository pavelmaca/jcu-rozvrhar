/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */


/// <reference path="Components/UploadForm.ts"/>
/// <reference path="Components/Calendar.ts"/>
class Application {
    constructor() {
        this.createUploadForm()
    }

    protected createUploadForm() {
        let uploadForm = new UploadForm($('#uploadForm'));
        uploadForm.onSucces = (data: String) => {
            let calendar = new Calendar(data);
            calendar.loadCoursesDetails();
        };
    }
}

try {
    let application = new Application();
} catch (ex) {
    console.log(ex);
}
