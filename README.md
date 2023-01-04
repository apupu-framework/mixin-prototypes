
 `mixin-prototypes`
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
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  const foo_bar = new TFooBar();
  foo_bar.hello_world(); // hello, world!
  foo_bar.foo();         // FOO!;
  foo_bar.foo();         // BAR!;
```

 Principle
--------------------------------------------------------------------------------

The object which is retuned by `mixin()` function  has
`source` property. This property is the source code to generate the class which
has just created by the function.

```javascript
  // ...
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
>    class TFooBar extends TObject {
>
>      constructor(...args) {
>        super(...args);
>        this.ctor(...args);
>      }
>
>      ctor(...args) {
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
You can define a method which name is `ctor()` on each class which are to be
inherited. The generated class will call every `ctor()` methods on its parent classes
whenever the class is instantiated.


```javascript
  class TObject {
  }
  class IFoo {
    foo() {
      console.error( `${this.foo_name}!` );
    }
    ctor() {
      this.foo_name = 'FOOO';
    }
  }
  class IBar {
    bar() {
      console.error( `${this.bar_name}!` );
    }
    ctor() {
      this.bar_name = 'BAAR';
    }
  }
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar();
  foo_bar.foo();         // FOOO!;
  foo_bar.bar();         // BAAR!;

  console.log( foo_bar.source );

>   class TFooBar extends TObject {
> 
>      constructor(...args) {
>        super(...args);
>        this.ctor(...args);
>      }
> 
>      ctor(...args) {
>        IFoo.prototype.ctor.apply( this, args );
>        IBar.prototype.ctor.apply( this, args );
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
to the `ctor()` methods.  You may want to pass named arguments to the
constructor to avoid name conflicts because the same arguments are passed
multiple times to each of the `ctor()` method.


```javascript
  class TObject {
  }
  class IFoo {
    foo() {
      console.error(`${this.foo_name}!`);
    }
    ctor(nargs) {
      this.foo_name = nargs.foo;
    }
  }
  class IBar {
    bar() {
      console.error(`${this.bar_name}!`);
    }
    ctor(nargs) {
      this.bar_name = nargs.bar;
    }
  }
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar({foo:'FOOOO', bar:'BAAAR' });
  foo_bar.foo();         // FOOOO!;
  foo_bar.bar();         // BAAAR!;
```


Please not that the `ctor()` method of the direct parent will be implicitly
overriden and not executed.

```javascript
  class TObject {
  // what if define ctor() on the direct parent class;
    ctor(){
      console.error('hello!');
    }
  }
  class IFoo {
    foo() {
      console.error(`${this.foo_name}!`);
    }
    ctor() {
      this.foo_name = 'FOOO';
    }
  }
  class IBar {
    bar() {
      console.error(`${this.bar_name}!`);
    }
    ctor() {
      this.bar_name = 'BAAR';
    }
  }
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  // TObject.ctor is overriden by the system and not executed.
  const foo_bar = new TFooBar(); 
  foo_bar.foo();         // FOOO!;
  foo_bar.bar();         // BAAR!;
```


 History
--------------------------------------------------------------------------------
- Released v1.0.0 (Wed, 30 Nov 2022 19:50:50 +0900)
- Released v1.0.1 (Tue, 03 Jan 2023 11:38:21 +0900)
  renamed `multiple-inheritance.js` to `mixi-prototypes` and updated to `v1.0.1`.
- Released v1.0.2 (Tue, 03 Jan 2023 14:01:53 +0900)
  renamed `inheritMultipleClasses()` to `mixin()`.
- Released v1.0.3 (Tue, 03 Jan 2023 15:57:28 +0900)
  supported inheritting static methods.
- Released v1.0.4 (Wed, 04 Jan 2023 11:46:38 +0900)
  removed unnecessary log output.
- Released v1.0.5 (Wed, 04 Jan 2023 11:50:09 +0900)
  this time, it has been rebuilt.

 Conclusion
--------------------------------------------------------------------------------
Thank you for your attention.


