
test('test', ()=>{

});

class TObject {
  hello() {
  }
  world() {
  }
  [Symbol.for('test-symbol')]() {
    console.error('TEST!');
  }
}
// console.error( TObject.prototype.hello.name );

class IObject1 {
  yes() {
    console.error( 'YES' );
  }
  init({hello=(()=>{throw new Error('hello is required')})()}) {
    this.hello = hello;
  }
}

class IObject2 {
  no() {
    console.error( 'NOOO!' );
  }
  init({world=(()=>{throw new Error('world is required')})()}) {
    this.world = world;
  }
  async asyncproc(){
    console.error( 'async!');
  }
}
class IObject3 {
  [Symbol.for('symbolic')]() {
    console.error( 'SYMBOL!' );
  }
  init({world=(()=>{throw new Error('world is required')})()}) {
    this.world = world;
  }
}

// new TObject()[Symbol.for('test-symbol')]();

{
  console.error( 'horizontal' );
  const TObject2 = multipleClassDelegation( 'TObject2', TObject, IObject1, IObject2, IObject3 );
  console.error( TObject2.source );
  new TObject2({hello:'he',world:'wo'}).yes();
  new TObject2({hello:'he',world:'wo'}).no();
  (new TObject2({hello:'he',world:'wo'}).asyncproc());

  console.error( 'new TObject2() instanceof TObject ', new TObject2({hello:'hel',world:'wo'}) instanceof TObject );
  console.error( 'new TObject2() instanceof IObject1', new TObject2({hello:'hel',world:'wo'}) instanceof IObject1 );
  console.error( 'new TObject2().hello', new TObject2({hello:'hello',world:'world'}).hello );
}



// console.error( Object.getOwnPropertyNames( new TObject() ) )
// console.error( Object.getOwnPropertyNames( TObject.prototype ) )
// console.error( ( new TObject () ) )
// console.error( ( new TObject.prototype.constructor() ) )
// console.error( TObject.prototype.constructor === TObject  )
 
if (false) {
  class A {
    hello() {
    }
    world() {
    }
  }
  class B extends A {
    foo(){
    }
    bar(){
    }
  }
  console.error( getMethods( B ) );
}


// const t = makeInstanceOf( (v)=>v==='world' );

