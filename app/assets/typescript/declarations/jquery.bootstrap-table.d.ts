/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */

/*
interface JQueryBootstrapTableOptions {
    classes:string
    height:number
    undefinedText:string
    striped:boolean
    sortName:string
    sortOrder:string
    sortStable:boolean
    iconsPrefix:string
    iconSize:string
    buttonsClass:string
    icons:Object
    columns:JQueryBootstrapTableColumnOptions
    data:any;
    dataField:string
    //  ajax	: Object
    method:string
    url:string
    cache:boolean
    contentType:string
    dataType:string
    ajaxOptions:JQueryAjaxSettings
    queryParams:(params)=>any;
    queryParamsType:string
    responseHandler:(res) => any;
    pagination:boolean;
    onlyInfoPagination:boolean;
    sidePagination:string;
    pageNumber:number;
    pageSize:number;
    pageList:number[];
    selectItemName:string;
    smartDisplay:boolean;
    escape:boolean;
    search:boolean;
    searchOnEnterKey:boolean;
    strictSearch:boolean;
    searchText:string;
    searchTimeOut:number;
    trimOnSearch:boolean;
    showHeader:boolean;
    showFooter:boolean;
    showColumns:boolean;
    showRefresh:boolean;
    showToggle:boolean;
    showPaginationSwitch:boolean;
    minimumCountColumns:number;
    idField:string;
    uniqueId:string;
    cardView:boolean;
    detailView:boolean;
    detailFormatter:(index, row, element) => any;
    searchAlign:string;
    buttonsAlign:string;
    toolbarAlign:string;
    paginationVAlign:string;
    paginationHAlign:string;
    paginationDetailHAlign:string;
    paginationPreText:string;
    paginationNextText:string;
    clickToSelect:boolean;
    singleSelect:boolean;
    toolbar:string | Node;
    checkboxHeader:boolean;
    maintainSelected:boolean;
    sortable:boolean;
    silentSort:boolean;
    rowStyle:(row, index) => any;
    rowAttributes:(row, index) => any;
    customSearch:(text) => any
    customSort:(sortName, sortOrder) => any
    locale:string;
    footerStyle:(row, index) => any;

    // events
    onAll:(name, args)=>any;
    onClickRow:(row, $element)=>any;
    onDblClickRow:(row, $element)=>any;
    onClickCell:(field, value, row, $element)=>any;
    onDblClickCell:(field, value, row, $element)=>any;
    onSort:(name, order)=>any;
    onCheck:(row, $element)=>any;
    onUncheck:(row, $element)=>any;
    onCheckAll:(rows)=>any;
    onUncheckAll:(rows)=>any;
    onCheckSome:(rows)=>any;
    onUncheckSome:(rows)=>any;
    onLoadSuccess:(data)=>any;
    onLoadError:(status, res)=>any;
    onColumnSwitch:(field, checked)=>any;
    onColumnSearch:(field, text)=>any;
    onPageChange:(number, size)=>any;
    onSearch:(text)=>any;
    onToggle:(cardView)=>any;
    onPreBody:(data)=>any;
    onPostBody:(data)=>any;
    onPostHeader:()=>any;
    onExpandRow:(index, row, $detail)=>any;
    onCollapseRow:(index, row)=>any;
    onRefreshOptions:(options)=>any;
    onResetView:()=>any;
    onRefresh:(params)=>any;

    // Localizations
    formatLoadingMessage:()=>any;
    formatRecordsPerPage:(pageNumber)=>any;
    formatShowingRows:(pageFrom, pageTo, totalRows)=>any;
    formatDetailPagination:(totalRows)=>any;
    formatSearch:()=>any;
    formatNoMatches:()=>any;
    formatRefresh:()=>any;
    formatToggle:()=>any;
    formatColumns:()=>any;
    formatAllRows:()=>any;
}
*/
/*
interface JQueryBootstrapTableColumnOptions {
    radio:boolean;
    checkbox:boolean;
    field:string;
    title:string;
    titleTooltip:string;
    class:string;
    rowspan:number;
    colspan:number;
    align:string;
    halign:string;
    falign:string;
    valign:string;
    width:number;
    sortable:boolean;
    order:string;
    visible:boolean;
    cardVisible:boolean;
    switchable:boolean;
    clickToSelect:boolean;
    formatter:(value, row, index) =>any;
    footerFormatter:(data) =>any;
    events:(event, value, row, index:number) => any;
    sorter:(a, b) => any
    sortName:string;
    cellStyle:(value, row, index, field) => any;
    searchable:boolean;
    searchFormatter:boolean;

}*/


interface JQuery {
    bootstrapTable(method?:any):JQuery;
    bootstrapTable(method?:any, parametr?:any):JQuery;
}