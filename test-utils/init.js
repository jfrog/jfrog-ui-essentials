import * as angular from 'angular';
import jQuery from 'jquery';

Object.defineProperty(window, 'jQuery', {value: jQuery});
Object.defineProperty(window, '$', {value: jQuery});
Object.defineProperty(window, 'angular', {value: angular});

import 'angular-mocks';
import '../specs/spec_helper';