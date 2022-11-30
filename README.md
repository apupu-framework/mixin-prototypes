
 `multiple-inheritance.js`
================================================================================

Yet another suicidal module to implement multiple inheritance with JavaScript.

```javascript
  class TObject {
    hello_world() {
      console.error('hello, world!');
    }
  }
  class IFoo {
    foo() {
      console.error('FOO!');
    }
  }
  class IBar {
    bar() {
      console.error('BAR!');
    }
  }
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  const foo_bar = new TFooBar();
  foo_bar.hello_world(); // hello, world!
  foo_bar.foo();         // FOO!;
  foo_bar.foo();         // BAR!;
```

 Principle
--------------------------------------------------------------------------------

The object which is retuned by `inheritMultipleClasses()` function  has
`source` property. This property is the source code to generate the class which
has just created by the function.

```javascript
  // ...
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
>    class TFooBar extends TObject {
>
>      constructor(...args) {
>        super(...args);
>        this.init(...args);
>      }
>
>      init(...args) {
>      }
>
>    }
>
>    Object.defineProperties( TFooBar.prototype, {
>
>      foo:{
>        value : IFoo.prototype.foo,
>        enumerable   : false,
>        configurable : true,
>        writable     : true,
>      },
>
>      bar:{
>        value : IBar.prototype.bar,
>        enumerable   : false,
>        configurable : true,
>        writable     : true,
>      },
>
>    });
```

 Initializers
--------------------------------------------------------------------------------
You can define a method which name is `init()` on each class which are to be
inherited. The generated class call every init() methods on its parent classes
whenever the class is instantiated.


```javascript
  class TObject {
  }
  class IFoo {
    foo() {
      console.error(`${this.foo_name}!`);
    }
    init() {
      this.foo_name = 'FOOO';
    }
  }
  class IBar {
    bar() {
      console.error(`${this.bar_name}!`);
    }
    init() {
      this.bar_name = 'BAAR';
    }
  }
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar();
  foo_bar.foo();         // FOOO!;
  foo_bar.bar();         // BAAR!;

  console.log( foo_bar.source );

>   class TFooBar extends TObject {
> 
>      constructor(...args) {
>        super(...args);
>        this.init(...args);
>      }
> 
>      init(...args) {
>        IFoo.prototype.init.apply( this, args );
>        IBar.prototype.init.apply( this, args );
>      }
> 
>    }
> 
>    Object.defineProperties( TFooBar.prototype, {
> 
>      foo:{
>        value : IFoo.prototype.foo,
>        enumerable   : false,
>        configurable : true,
>        writable     : true,
>      },
> 
>      bar:{
>        value : IBar.prototype.bar,
>        enumerable   : false,
>        configurable : true,
>        writable     : true,
>      },
> 
>    });
```

The value which is passed to the constructor of the generated class are passed
to the init() methods.  You may want to pass named arguments to the constructor
via inherence of multiple inheritance.

```javascript
  class TObject {
  }
  class IFoo {
    foo() {
      console.error(`${this.foo_name}!`);
    }
    init(nargs) {
      this.foo_name = nargs.foo;
    }
  }
  class IBar {
    bar() {
      console.error(`${this.bar_name}!`);
    }
    init(nargs) {
      this.bar_name = nargs.bar;
    }
  }
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar({foo:'FOOOO', bar:'BAAAR' });
  foo_bar.foo();         // FOOOO!;
  foo_bar.bar();         // BAAAR!;
```


Please not that the `init()` method of the direct parent will be implicitly
overriden and not executed.

```javascript
  class TObject {
  // what if define init() on the direct parent class;
    init(){
      console.error('hello!');
    }
  }
  class IFoo {
    foo() {
      console.error(`${this.foo_name}!`);
    }
    init() {
      this.foo_name = 'FOOO';
    }
  }
  class IBar {
    bar() {
      console.error(`${this.bar_name}!`);
    }
    init() {
      this.bar_name = 'BAAR';
    }
  }
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  // TObject.init is overriden by the system and not executed.
  const foo_bar = new TFooBar(); 
  foo_bar.foo();         // FOOO!;
  foo_bar.bar();         // BAAR!;
```


 History
--------------------------------------------------------------------------------
- Released v1.0.0 (Wed, 30 Nov 2022 19:46:02 +0900)


 Conclusion
--------------------------------------------------------------------------------
Thank you for your attention.


