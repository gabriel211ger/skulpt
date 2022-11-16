const Sk = require("skulpt");

var $builtinmodule = function (name) {
    var request = {};


    function getResultFromResponse(r)
    {
        var result = {
            status: r.status,
            ok: r.ok,
            statusText: r.statusText,
            content: r.text() 
        };
        return result;
    }


    function getResponseObj(r)
    {
        var obj = Sk.misceval.buildClass(request, function($gbl, $loc) {
            $loc.__init__ = new Sk.builtin.func(function(self) {
             self.r = r;
            });
          
            $loc.__getattr__ = new Sk.builtin.func(function (self, name) {
             if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
              var _name = name;
              if (Sk.builtin.checkString(name)) {
               _name = Sk.ffi.remapToJs(name);
              }
              switch (_name) {
               case 'x':
                 return self.x;
              }
             } 
            });
          
            $loc.__setattr__ = new Sk.builtin.func(function (self, name, value) {
             if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
              var _name = name;
              if (Sk.builtin.checkString(name)) {
               _name = Sk.ffi.remapToJs(name);
              }
              switch (_name) {
               case 'x':
                self.x = value;
                return;
              }
             }
            });
           
             $loc.getx = new Sk.builtin.func(function(self) {
              return self.x;
             });
            },
            'Actor', []);
        return obj;    
    }

    request.Actor = Sk.misceval.buildClass(request, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
         self.x = 1;
        });
      
        $loc.__getattr__ = new Sk.builtin.func(function (self, name) {
         if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
          var _name = name;
          if (Sk.builtin.checkString(name)) {
           _name = Sk.ffi.remapToJs(name);
          }
          switch (_name) {
           case 'x':
             return self.x;
          }
         } 
        });
      
        $loc.__setattr__ = new Sk.builtin.func(function (self, name, value) {
         if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
          var _name = name;
          if (Sk.builtin.checkString(name)) {
           _name = Sk.ffi.remapToJs(name);
          }
          switch (_name) {
           case 'x':
            self.x = value;
            return;
          }
         }
        });
       
         $loc.getx = new Sk.builtin.func(function(self) {
          return self.x;
         });
        },
        'Actor', []);


    function getResultFromResponse(r)
    {
        var content = r.text();
        var result = {
            status: r.status,
            ok: r.ok,
            statusText: r.statusText,
            //content: content 
        };
        return result;
    }

    //~ Module functions ........................................................

    request.getTest = new Sk.builtin.func(function (url, params, headers, cookies, auth, timeout) {
        //return request.Actor;
        return getResponseObj("test");
    });

    request.get = new Sk.builtin.func(function (url, params, headers, cookies, auth, timeout) {
        var config = {
            mode: 'cors'
        };
        if(window.systemAuthorization != null)
        {
            config.headers = {
                Authorization: 'Basic ' + window.systemAuthorization
            }
        }
        var status = 0;

        return new Sk.misceval.promiseToSuspension(fetch(url.v, config)
            .then(function(r){
                return r.text()
            })
            .then(function(r){
                //return Sk.ffi.remapToPy(r);
                var resultObject = new Sk.builtin.object();
                resultObject.r = "test";
                return resultObject;

                //var text = r.content;
                //r.bla = text;
                var result = {
                    status: 1,
                    content: r
                }
                //return result;
                return Sk.ffi.remapToPy(result);
            })
        );

        
        return new Sk.misceval.promiseToSuspension(fetch(url.v, config).then((r) => r.text()).then((r) => Sk.ffi.remapToPy(r)));
        return new Sk.misceval.promiseToSuspension(fetch(url.v, config).then((r) => getResultFromResponse(r)).then(function(r){
            //return Sk.ffi.remapToPy(r);
            //var text = r.content;
            //r.bla = text;
            return r;
        }));
    });

    request.post = new Sk.builtin.func(function (url, data, headers) {

        var config = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        };
        if(window.systemAuthorization != null)
        {
            config.headers = {
                Authorization: 'Basic ' + window.systemAuthorization
            }
        }
        return new Sk.misceval.promiseToSuspension(fetch(url.v, config).then((r) => r.text()).then((r) => Sk.ffi.remapToPy(r)));

    });


    return request;
};
