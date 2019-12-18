# BASIC-JS-Interpreter
BASIC-JS-Interpretor is a Basic to Javascript Interpretor can be used in FORMULA parsing.
  - Written in Typescript
  - Runs on Netsuite's Rhino
  - Amd Module support
  - Supports MultiLine Script Parsing
  - Supports Function
  - Supports Loop statements
  - Advanced syntax validator

# New Features!

  - Netusite Suitescript 2.0 Import support added
  - greater than less than syntax error has been fixed
  - Runs on Netsuite's Rhino Chrome Firefox


### Tech

Basic-JS uses a number of open source projects to work properly:

* [Typescript](https://www.typescriptlang.org/) - A Superset of javascript
* [VisualStudio Code](https://code.visualstudio.com/) - awesome windows-based text editor and light ide
* [Twitter Bootstrap](https://getbootstrap.com/) - great UI boilerplate for example web apps
*  [jQuery] - Used in examples

### Installation

Basic-Js requires [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) to run.

[Netsuite]
Copy the dist scripts to FileCabinet
and in Scripts
```sh
require(["./basic"],function(interpretor){
  var basic = new interpreter.basic();
  var result = basic.run("test","2+3");
  log.debug("output",result.value.elements);
})
```
[Browser]
Reference [Require](https://requirejs.org/) for loading the modules.
Copy the dist scripts to root directory of the application 
and in html file
```sh
require(["./basic"],function(interpreter){
  var basic = new interpreter.basic();
  var result = basic.run("test","2+3");
  console.log("output",result.value.elements);
})
```

### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!
Basic-js uses Typescript and VisualStudio Code for fast developing.

Open your favorite Terminal and run these commands.

#### Building for source
For production release please change the tsconfig file according to your need:
```sh
tsc
```


### Todos

 - Write Tests
 - Add comments

License
----

MIT

### Credits
This is typescript version of Basic PROGRAMMING Language inspired from codepulse work
you can check his videos from here [CODEPULSE](https://www.youtube.com/channel/UCUVahoidFA7F3Asfvamrm7w)

