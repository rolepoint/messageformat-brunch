# messageformat-brunch

A brunch plugin for messageformat.js.

## Usage
1. Add ```"messageformat-brunch": "git://github.com/bc-luke/messageformat-brunch.git"``` to ```package.json``` of your brunch app.
2. Create a directory named ```lang``` and sub-directories using the language key, e.g. ```en```.
3. Place messageformat/JSON-encoded language files for a particular language in the directory with the corresponding language key, e.g. ```lang/en/foo/bar.json```.
4. Configure your brunch application to compile the json files into the location of your choice using the templates key, e.g.

        templates:
          joinTo:
            'javascripts/app.js': /^app\/templates/
            'javascripts/i18n/en.js': /^app\/lang\/en\/.*\.json/
            'javascripts/i18n/fr.js': /^app\/lang\/fr\/.*\.json/

5. Call messageformat functions using ```window.i18n['foo/bar']['messageKey']({ARG1: 1, ARG2: 2})```.