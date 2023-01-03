
test( 'test1', ()=>{
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
  foo_bar.foo(); // FOO!;
  foo_bar.foo(); // BAR!;

  console.log( TFooBar.source );
});

//  console.log( TFooBar.source );

test('test2' , ()=>{
  class TObject {
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
  const foo_bar = new TFooBar();
  foo_bar.foo();         // FOOO!;
  foo_bar.bar();         // BAAR!;
  console.log( foo_bar.source );
});

test( 'test3', ()=>{
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
});


test( 'symbolic properties', ()=>{
  class TObject {
  }
  class IFoo {
    [Symbol.for('symbolic-foo')]() {
      console.error(`${this.foo_name}!`);
    }
    ctor(nargs) {
      this.foo_name = nargs.foo;
    }
  }
  class IBar {
    [Symbol.for('symbolic-bar')]() {
      console.error(`${this.bar_name}!`);
    }
    ctor(nargs) {
      this.bar_name = nargs.bar;
    }
  }
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar({foo:'symfoo', bar:'symbar' });
  foo_bar[Symbol.for('symbolic-foo')]();         // symfoo!;
  foo_bar[Symbol.for('symbolic-bar')]();         // symbar!;
});


test( 'symbolic properties', ()=>{
  class TObject {
    constructor() {
    }
  }
  class IFoo {
    static hello_foo() {
      console.error('hello foo');
    }
    static [Symbol.for('hello-symbolic-foo')]() {
      console.error('hello symbolic foo');
    }
  }
  class IBar {
    static hello_bar() {
      console.error('hello bar');
    }
    static [Symbol.for('hello-symbolic-bar')]() {
      console.error(`${this.bar}!`);
    }
  }
  const TFooBar = mixin( 'TFooBar', TObject, IFoo, IBar );
  console.log( 'static TFooBar', TFooBar.source );
  TFooBar['hello_foo']();
  TFooBar['hello_bar']();
  TFooBar[Symbol.for('hello-symbolic-foo')]();  
  TFooBar[Symbol.for('hello-symbolic-bar')](); 
});

