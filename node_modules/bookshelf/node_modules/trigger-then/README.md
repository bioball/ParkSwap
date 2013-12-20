# triggerThen

Adding promises to Backbone event triggers, resolving when 
everything that needs triggering has completed. Allows returning
values or promises from the listeners, where a failed promise will
reject the events.

## Initializing:

Provide two arguments to the `trigger-then` library when required: 
the copy of `Backbone` to mixin the `triggerThen` function, and the
promise library (assuming it has a `reject` and `all` function).

```
require('trigger-then')(Backbone, When);

var Model = new Backbone.Model();

Model.triggerThen('change').then(function(resp) {

  // success!

}, function(e) {
  
  // error!
  console.log(e.stack);

});
```

## License

MIT