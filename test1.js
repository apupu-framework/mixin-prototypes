
function makeInstanceOf( f ) {
  if ( ! ( f instanceof Function ) ) {
    throw new TypeError( 'the object is not function' );
  } 
  Object.defineProperty( f, Symbol.hasInstance, {
    value : f,
  });
  return f;
}

const a = {
  [Symbol.hasInstance] : (instance)=>{
    return instance==='hello';
  },
};

const t = makeInstanceOf( (v)=>v==='world' );


// console.error( 'hello' instanceof a );
// console.error( 'world' instanceof a );
console.error( 'hello' instanceof t );
console.error( 'world' instanceof t );

if ( false ) {
  function hello( O ) {
    for ( let i=0; i<10; i++ ) {
      class TObject extends O {
        hello() {
          super.hello();
          console.error( 'hello' , i );
        }
      }
      O = TObject;
    }
    return O;
  }
  const H = ( hello( class T { hello() { console.error('hello') } } ) );
  new H().hello();
}

if ( false ) {
  function hello( O ) {
    for ( let i=1; i<11; i++ ) {
      const OO = new Function(`O${i-1}`, `
      return (
        class O${i} extends O${i-1} {
          hello() {
            console.error( 'hello' , ${i} );
            super.hello();
          }
        }
      )
      `)(O)
      O = OO;
    }
    return O;
  }
  const H = ( hello( class T { hello() { console.error('hello') } } ) );
  new H().hello();
  console.error( H.toString() );
}


class TObject {
  hello() {
  }
  world() {
  }
  [Symbol.for('test-symbol')]() {
    console.error('TEST!');
  }
}



for ( i of Object.getOwnPropertyNames( TObject.prototype ) ) {
  console.error(  i );
}

console.error( TObject.prototype );




















