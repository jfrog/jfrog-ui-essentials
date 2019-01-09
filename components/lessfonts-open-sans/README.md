# [LessFonts: Open Sans](http://github.com/sethlilly/lessfonts-open-sans)

LessFonts: Open Sans is a font-face kit for [Open Sans](http://www.google.com/fonts/specimen/Open+Sans) written in Less with compiled and minified CSS available.

## Installation

LessFonts: Open Sans can be installed via [Bower](http://bower.io):

```bower install lessfonts-open-sans```

Or cloned via GitHub:

```git clone https://github.com/sethlilly/lessfonts-open-sans.git```

## Customizing

1. Install [Node.js](http://nodejs.org) if it isn't already installed
1. `npm install -g grunt-cli`
1. `npm install`
1. `grunt`

**ProTip:** If `npm` requires `root` or `sudo` to run, this may indicate a permissions issue on `~/.npm`. To reset the permissions, use ```sudo chown -R `whoami` ~/.npm```.

Edit the Less files in `src/less` while `grunt` is running and you'll get an instantly compiled and minified `open-sans.min.css` file in the `dist/css` directory.

**Of course, if you prefer to manually edit the compiled CSS**, you may. However, you should avoid running `grunt` after doing so; your changes will be overwritten unless you move your changed files to another directory.

## Releases

| Version | Release Date |
| :-----: | :----------: |
| 1.0.2 | 2014-09-06 |
| 1.0.1 | 2014-09-05 |
| 1.0.0 | 2014-09-05 |

## Versioning

This repository will be maintained according to the Semantic Versioning guidelines as often as is practical.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>[-<build>]`

And constructed using the following guidelines:

* A new major release indicates a large change where backwards compatibility is broken.
* A new minor release indicates a normal change that maintains backwards compatibility.
* A new patch release indicates a bugfix or small change which does not affect compatibility.
* A new build release indicates this is a pre-release of the version.

Build numbers are constructed using the following date format:

`yymmddhhmm`

## Copyright

Copyright &copy; 2014 [Seth Lilly](http://sethlilly.com) - Released under [The MIT License](LICENSE)  
[Open Sans](http://www.google.com/fonts/specimen/Open+Sans) is Copyright &copy; [Steve Matteston](http://www.monotype.com/studio/steve-matteson) and is released under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)