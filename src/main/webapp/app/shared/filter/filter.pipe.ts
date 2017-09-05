import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: Array<any>, field: string, subfield: string, filter: string): any {
        if (filter && filter.trim().length > 0) {
            return value.filter((a) => a[field][subfield] === filter);
        }
        return value;
    }
}
