.ejs  node_modules/ejs/bin/ejs.js kiherélve !!!!! az alábbiak szerint !!!!
https://github.com/visionmedia/ejs/issues/93



orig node_modules/ejs/bin/ejs.js 161 sor:
  if (0 == js.trim().indexOf('include')) {
    var name = js.trim().slice(7).trim();
    if (!filename) throw new Error('filename option is required for includes');
    var path = resolveInclude(name, filename);
    include = read(path, 'utf8');
    include = exports.parse(include, { filename: path, _with: false, open: open, close: close, compileDebug: compileDebug });
    buf.push("' + (function(){" + include + "})() + '");
    js = '';
  }

  erre:

         if (0 == js.trim().indexOf('include')) {
              var name = js.trim().slice(7).trim();
              if (!filename) throw new Error('filename option is required for includes');
              // If it is not path, but variable name (Added)
              if(options[name])
                  var path = resolveInclude(options[name], filename);
              else
                  var path = resolveInclude(name, filename);
              include = read(path, 'utf8');
              include = exports.parse(include, options); // Added transfer whole options
              console.log(buf)
             /// buf.push("' + (function(){" + include + "})() + '");
              buf += "' + (function(){" + include + "})() + '";
              js = '';
          }