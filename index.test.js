
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

