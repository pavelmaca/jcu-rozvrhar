/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class UploadForm {
    public onSucces: (data: String) => any;
    protected file: File;
    protected form;

    constructor(form: JQuery) {
        this.form = form;
        this.form.on('submit', (event: Event)=> {
            this.handleSubmit(event);
        });
    }

    public handleSubmit(event: Event) {
        event.preventDefault();

        // get File info
        //noinspection TypeScriptUnresolvedVariable
        let file = this.form.find('#icsFile')[0].files[0];
        if (this.validateFile(file)) {
            this.file = file;
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = (event: Event)=> {
                this.onFileUploaded(event);
            };
        } else {
            console.log('invalid file');
        }
    }

    protected validateFile(file: File) {
        return (file && file.type == 'text/calendar' && file.size < 1000000);
    }

    protected onFileUploaded(event: Event) {
        //noinspection TypeScriptUnresolvedVariable
        var result = event.target.result;
        this.onSucces(result);
    }
}