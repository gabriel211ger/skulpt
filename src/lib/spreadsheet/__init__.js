var $builtinmodule = function (name) {

    var mod = {};

    var injector;
    var service;
    var rootScope;

    function init() {
        injector = angular.element(document.querySelector('[ng-app]')).injector();
        service = injector.get('spreadsheet');
        rootScope = injector.get('$rootScope');
    }

    function apply() {
        rootScope.$digest();
    }


    //Initializes the spreadsheet component. Use this if you need more then 2000 rows before calling any other spreadsheet function
    var initialize = function (sheetName, numberOfRows) {
        init();
        var sname = sheetName != null ? sheetName.v : "";
        var numOfRows = numberOfRows != null ? numberOfRows.v : 2000;
        service.init(sname, numOfRows);
        apply();
    }
    mod.init = new Sk.builtin.func(initialize);

    //Hides the spreadsheet window.
    var hide = function () {
        init();
        service.hide();
        apply();
    }
    mod.hide = new Sk.builtin.func(hide);


    //Use to open a spreadsheet with json data provided at specific url.
    //Use listPropertyName on complexe structures to define the entry property point. Use sheetName to insert the data within a specific worksheet.
    var open_from_url = function (url, listPropertyName, sheetName) {
        Sk.builtin.pyCheckArgs("open_from_url", arguments, 1, 3, false, false);
        init();
        var lpn = listPropertyName != null ? listPropertyName.v : null;
        var sn = sheetName != null ? sheetName.v : null;
        service.openFromUrl(url.v, lpn, sn);
        apply();
    }
    mod.open_from_url = new Sk.builtin.func(open_from_url);

    //Use to open a spreadsheet with json data and shows it
    //Use sheetName to insert the data within a specific worksheet and startRange if you want to insert the data at a specific position like "B3"
    var open_from_json = function (json, sheetName, startRange) {
        Sk.builtin.pyCheckArgs("open_from_json", arguments, 1, 3, false, false);
        init();
        var sn = sheetName != null ? sheetName.v : null;
        var sr = startRange != null ? startRange.v : null;
        service.openFromJson(json.v, sn, sr);
        apply();
    }
    mod.open_from_json = new Sk.builtin.func(open_from_json);

    //Exports the spreadsheet to a local file by opening a "select file dialog". Use filename to predefine the name of the exported file. 
    var exprt = function (filename) {
        init();
        var fn = filename != null ? filename.v : null;
        service.export(fn);
        apply();
    }
    mod.export_to_file = new Sk.builtin.func(exprt);


    //Creates a new spreadsheet from json provided by an url and exports it to a local file.
    //Use listPropertyName on complexe structures to define the entry property point.
    //Use sheetName to insert the data within a specific worksheet.
    //Use filename to predefine the name of the exported file. 
    var export_from_url = function (url, listPropertyName, sheetName, filename) {
        Sk.builtin.pyCheckArgs("export_from_url", arguments, 1, 4, false, false);
        init();
        var lpn = listPropertyName != null ? listPropertyName.v : null;
        var sn = sheetName != null ? sheetName.v : null;
        var fn = filename != null ? filename.v : null;
        service.exportFromUrl(url.v, lpn, sn, fn);
        apply();
    }
    mod.export_from_url = new Sk.builtin.func(export_from_url);

    //Creates a new worksheet with the given name
    var insert_sheet = function (name) {
        Sk.builtin.pyCheckArgs("insert_sheet", arguments, 1, 1, false, false);
        init();
        service.insertSheet(name.v);
        apply();
    }
    mod.insert_sheet = new Sk.builtin.func(insert_sheet);

    //Inserts json data from the given url. The spreadsheet is not shown afterwards.
    //Use listPropertyName on complexe structures to define the entry property point.
    //Use sheetName to define where the data shall be inserted. 
    var load_from_url = function (url, listPropertyName, sheetName) {
        Sk.builtin.pyCheckArgs("load_from_url", arguments, 1, 3, false, false);
        init();
        var lpn = listPropertyName != null ? listPropertyName.v : null;
        var sn = sheetName != null ? sheetName.v : null;
        service.loadFromUrl(url.v, lpn, sn);
        apply();
    }
    mod.load_from_url = new Sk.builtin.func(load_from_url);

    //Inserts the given json into the worksheet. The spreadsheet is not shown afterwards.
    //Use sheetName to insert the data within a specific worksheet and startRange if you want to insert the data at a specific position like "B3"
    var load_from_json = function (json, sheetName, startRange) {
        Sk.builtin.pyCheckArgs("load_from_json", arguments, 1, 3, false, false);
        init();
        var sn = sheetName != null ? sheetName.v : null;
        var sr = startRange != null ? startRange.v : null;
        service.loadFromJson(json.v, sn, sr);
        apply();
    }
    mod.load_from_json = new Sk.builtin.func(load_from_json);

    //Opens the spreadsheet window.
    var show = function () {
        init();
        service.show();
        apply();
    }
    mod.show = new Sk.builtin.func(show);


    //Clears the whole sheet by the given index. If no index is given the active worksheet will be cleared
    var clear = function (sheetIndex) {
        init();
        var si = sheetIndex != null ? sheetIndex.v : null;
        service.clear(si);
        apply();
    }
    mod.clear = new Sk.builtin.func(clear);


    //Resets the whole spreadsheet to an empty, single worksheet.
    var reset = function (name) {
        init();
        var nam = name != null ? name.v : null;
        service.reset(nam);
        apply();
    }
    mod.reset = new Sk.builtin.func(reset);

    var set_value = function (sheetname, range, value) {
        Sk.builtin.pyCheckArgs("set_value", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).value(value.v);
        apply();
    }
    mod.set_value = new Sk.builtin.func(set_value);

    var merge = function (sheetname, range) {
        Sk.builtin.pyCheckArgs("merge", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).merge();
        apply();
    }
    mod.merge = new Sk.builtin.func(merge);

    var set_bold = function (sheetname, range, set) {
        Sk.builtin.pyCheckArgs("set_bold", arguments, 3, 3, false, false);
        init();
        var doSet = set != null ? set.v : true;
        service.getSheetByName(sheetname.v).range(range.v).bold(doSet);
        apply();
    }
    mod.set_bold = new Sk.builtin.func(set_bold);

    var set_italic = function (sheetname, range, set) {
        Sk.builtin.pyCheckArgs("set_italic", arguments, 3, 3, false, false);
        init();
        var doSet = set != null ? set.v : true;
        service.getSheetByName(sheetname.v).range(range.v).italic(doSet);
        apply();
    }
    mod.set_italic = new Sk.builtin.func(set_italic);

    var set_background = function (sheetname, range, color) {
        Sk.builtin.pyCheckArgs("set_background", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).background(color.v);
        apply();
    }
    mod.set_background = new Sk.builtin.func(set_background);

    var set_color = function (sheetname, range, color) {
        Sk.builtin.pyCheckArgs("set_color", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).color(color.v);
        apply();
    }
    mod.set_color = new Sk.builtin.func(set_color);

    var set_fontsize = function (sheetname, range, size) {
        Sk.builtin.pyCheckArgs("set_fontsize", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).fontSize(size.v);
        apply();
    }
    mod.set_fontsize = new Sk.builtin.func(set_fontsize);

    var set_fontfamily = function (sheetname, range, family) {
        Sk.builtin.pyCheckArgs("set_fontfamily", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).fontFamily(family.v);
        apply();
    }
    mod.set_fontfamily = new Sk.builtin.func(set_fontfamily);

    var set_align = function (sheetname, range, align) {
        Sk.builtin.pyCheckArgs("set_align", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).textAlign(align.v);
        apply();
    }
    mod.set_align = new Sk.builtin.func(set_align);

    var set_valign = function (sheetname, range, align) {
        Sk.builtin.pyCheckArgs("set_valign", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).verticalAlign(align.v);
        apply();
    }
    mod.set_valign = new Sk.builtin.func(set_valign);

    var set_format = function (sheetname, range, format) {
        Sk.builtin.pyCheckArgs("set_format", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).format(format.v);
        apply();
    }
    mod.set_format = new Sk.builtin.func(set_format);

    var set_dateformat = function (sheetname, range, dateformat) {
        Sk.builtin.pyCheckArgs("set_dateformat", arguments, 3, 3, false, false);
        init();
        var value = service.getSheetByName(sheetname.v).range(range.v).value();
        var momObject = moment(value);
        var formatedValue = momObject.format(dateformat.v);
        service.getSheetByName(sheetname.v).range(range.v).value(formatedValue);
        apply();
    }
    mod.set_dateformat = new Sk.builtin.func(set_dateformat);

    var set_colwidth = function (sheetname, col, width) {
        Sk.builtin.pyCheckArgs("set_colwidth", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).columnWidth(col.v, width.v);
        apply();
    }
    mod.set_colwidth = new Sk.builtin.func(set_colwidth);

    var set_formula = function (sheetname, range, formula) {
        Sk.builtin.pyCheckArgs("set_formula", arguments, 3, 3, false, false);
        init();
        service.getSheetByName(sheetname.v).range(range.v).formula(formula.v);
        apply();
    }
    mod.set_formula = new Sk.builtin.func(set_formula);



    return mod;
};