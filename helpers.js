


var register = function(Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        grouped_each: function(every, context, options) {
            var out = "", subcontext = [], i;
            if (context && context.length > 0) {
                for (i = 0; i < context.length; i++) {
                    if (i > 0 && i % every === 0) {
                        out += options.fn(subcontext);
                        subcontext = [];
                    }
                    subcontext.push(context[i]);
                }
                out += options.fn(subcontext);
            }
            return out;
        },
        format_date: function(datetime) {
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // new Date(races[i].date).toLocaleDateString('en-US', options)
            return new Date(datetime).toLocaleDateString('en-US', options);
        }
    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      for (var prop in helpers) {
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }
  
  };
  
  module.exports.register = register;
  module.exports.helpers = register(null); 