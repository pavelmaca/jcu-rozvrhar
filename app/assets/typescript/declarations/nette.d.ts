
interface Nette {
    validateForm(el:any);
    init();
}

interface LiveForm {
    setOptions(options?:any);
}

interface NetteAjax {
    validateForm(el:any);
    init();
}

interface JQueryStatic {
    nette:NetteAjax;
}

declare var Nette: Nette;
declare var LiveForm: LiveForm;