import { Pipe, PipeTransform } from '@angular/core';

import { JapanRuby } from './japan-ruby'

@Pipe({ name: 'japanruby' })
export class JapanRubyPipe implements PipeTransform {
  constructor() { }
  transform(content: string) {
    return JapanRuby.convert(content);
  }
}