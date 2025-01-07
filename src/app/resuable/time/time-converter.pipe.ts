import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter',
  standalone: true,
})
export class TimeConverterPipe implements PipeTransform {
  transform(value: string | Date, ...args: unknown[]): unknown {
    if (!value) return '';
    const date = new Date(value);
    let HH = date.getHours();
    const MM = date.getMinutes();
    const ampm = HH >= 12 ? 'PM' : 'AM';
    HH = HH % 12;
    HH = HH ? HH : 12;
    return `${HH}:${MM} ${ampm}`;
  }
}
