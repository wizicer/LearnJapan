import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newline' })
export class NewlinePipe implements PipeTransform {
  constructor() { }
  transform(content: string) {
    return content ? content.replace(/\\n/g, '<br />') : null;
  }
}
