import {Injectable} from "@angular/core";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root',
})

export class UtilsService {

    /*
     * This function retrieves the string associated to an error code thrown by a form field validator.
     */
    public hasError(form: FormGroup, field: string, key: string): boolean {
        let control = form.get(field)
        if (control) {
            return control.hasError(key)
        } else {
            return false
        }
    }

    public getErrorMessage(form: FormGroup, field: string, key: string): string {
        switch (key) {
            case 'min':
                return form.get(field).errors[key][key]
            case 'max':
                return form.get(field).errors[key][key]
        }

    }

    public capitalize(word: string) {
        if (!word) return word;
        let text = word.split("-")
        let str = ""
        for (word of text) str = str + " " + word[0].toUpperCase() + word.substr(1).toLowerCase();
        return str.trim()
    }

    public getSelectionCharacterOffsetWithin(element) {
        let start = 0;
        let end = 0;
        let doc = element.ownerDocument || element.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.startContainer, range.startOffset);
                start = preCaretRange.toString().length;
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                end = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToStart", textRange);
            start = preCaretTextRange.text.length;
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            end = preCaretTextRange.text.length;
        }
        return {start: start, end: end};
    }

    public positiveOrZeroNumber(control: FormControl) {
        if (Number(control.value) < 0) {
            return {invalid: true};
        } else {
            return null;
        }
    }

    public positiveNumber(control: FormControl) {
        if (Number(control.value) < 1) {
            return {invalid: true};
        } else {
            return null;
        }
    }

}
