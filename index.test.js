
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
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  const foo_bar = new TFooBar();
  foo_bar.hello_world(); // hello, world!
  foo_bar.foo(); // FOO!;
  foo_bar.foo(); // BAR!;

  console.log( TFooBar.source );
});

//  console.log( TFooBar.source );

test('test2' , ()=>{
  class TObject {
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
});


test( 'symbolic properties', ()=>{
  class TObject {
  }
  class IFoo {
    [Symbol.for('symbolic-foo')]() {
      console.error(`${this.foo_name}!`);
    }
    init(nargs) {
      this.foo_name = nargs.foo;
    }
  }
  class IBar {
    [Symbol.for('symbolic-bar')]() {
      console.error(`${this.bar_name}!`);
    }
    init(nargs) {
      this.bar_name = nargs.bar;
    }
  }
  const TFooBar = inheritMultipleClasses( 'TFooBar', TObject, IFoo, IBar );
  console.log( TFooBar.source );
  const foo_bar = new TFooBar({foo:'symfoo', bar:'symbar' });
  foo_bar[Symbol.for('symbolic-foo')]();         // symfoo!;
  foo_bar[Symbol.for('symbolic-bar')]();         // symbar!;
});


//////////                               class TObject {
//////////                                 foo() {
//////////                                 }
//////////                                 bar() {
//////////                                 }
//////////                                 [Symbol.for('test-symbol')]() {
//////////                                   console.error('TEST!');
//////////                                 }
//////////                               }
//////////                               
//////////                               console.error( Object.getOwnPropertyDescriptor(  TObject.prototype,'foo' ) );
//////////                               
//////////                               
//////////                               // console.error( TObject.prototype.foo.name );
//////////                               
//////////                               class IObject1 {
//////////                                 yes() {
//////////                                   console.error( 'YES' );
//////////                                 }
//////////                                 init({foo=(()=>{throw new Error('foo is required')})()}) {
//////////                                   this.foo = foo;
//////////                                 }
//////////                               }
//////////                               
//////////                               class IObject2 {
//////////                                 no() {
//////////                                   console.error( 'NOOO!' );
//////////                                 }
//////////                                 init({bar=(()=>{throw new Error('bar is required')})()}) {
//////////                                   this.bar = bar;
//////////                                 }
//////////                                 async asyncproc(){
//////////                                   console.error( 'async!');
//////////                                 }
//////////                               }
//////////                               class IObject3 {
//////////                                 [Symbol.for('symbolic')]() {
//////////                                   console.error( 'SYMBOL!' );
//////////                                 }
//////////                                 init({bar=(()=>{throw new Error('bar is required')})()}) {
//////////                                   this.bar = bar;
//////////                                 }
//////////                               }
//////////                               
//////////                               // new TObject()[Symbol.for('test-symbol')]();
//////////                               
//////////                               {
//////////                                 console.error( 'horizontal' );
//////////                                 const TObject2 = inheritMultipleClasses( 'TObject2', TObject, IObject1, IObject2, IObject3 );
//////////                                 console.error( TObject2.source );
//////////                                 new TObject2({foo:'he',bar:'wo'}).yes();
//////////                                 new TObject2({foo:'he',bar:'wo'}).no();
//////////                                 (new TObject2({foo:'he',bar:'wo'}).asyncproc());
//////////                               
//////////                                 console.error( 'new TObject2() instanceof TObject ', new TObject2({foo:'hel',bar:'wo'}) instanceof TObject );
//////////                                 console.error( 'new TObject2() instanceof IObject1', new TObject2({foo:'hel',bar:'wo'}) instanceof IObject1 );
//////////                                 console.error( 'new TObject2().foo', new TObject2({foo:'foo',bar:'bar'}).foo );
//////////                               }
//////////                               
//////////                               
//////////                               
//////////                               // console.error( Object.getOwnPropertyNames( new TObject() ) )
//////////                               // console.error( Object.getOwnPropertyNames( TObject.prototype ) )
//////////                               // console.error( ( new TObject () ) )
//////////                               // console.error( ( new TObject.prototype.constructor() ) )
//////////                               // console.error( TObject.prototype.constructor === TObject  )
//////////                                
//////////                               if (false) {
//////////                                 class A {
//////////                                   foo() {
//////////                                   }
//////////                                   bar() {
//////////                                   }
//////////                                 }
//////////                                 class B extends A {
//////////                                   foo(){
//////////                                   }
//////////                                   bar(){
//////////                                   }
//////////                                 }
//////////                                 console.error( getMethods( B ) );
//////////                               }
//////////                               
//////////                               
//////////                               // const t = makeInstanceOf( (v)=>v==='bar' );
//////////                               
