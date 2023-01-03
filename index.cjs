'use strict';

function inspect(s) {
  return JSON.stringify( s, null, 2 );
}





const IS_DELEGATION = false;
const ACTUAL_CONSTRUCTOR = 'ctor';

function isAsyncFunction( f ) {
  // Note that if `f` is either null or undefined, this expression results false.
  return ( typeof f === 'function' && f.constructor.name === 'AsyncFunction' );
}
const AsyncFunction = async function () {}.constructor;
const FUNCTION_METHODS =  [
  ...Object.getOwnPropertyNames( Function ),
  ...Object.getOwnPropertySymbols( Function ),
  ...Object.getOwnPropertyNames( AsyncFunction ),
  ...Object.getOwnPropertySymbols( AsyncFunction ),
];
function getMethods( target ) {

  const enumAndNonenum = [
    ...Object.getOwnPropertyNames( target ),
    ...Object.getOwnPropertySymbols( target ),
  ].filter( e=> ! FUNCTION_METHODS.find( e2=>e===e2 ) );
  return enumAndNonenum.map(e=>[e,target[e]]);
}


function mixin( className, directParentClass,  ...multipleParentClasses ) {
  let codeBegin = `
      class ${className} extends ${directParentClass.name} {
  `;
  let codeConstructor = `
        constructor(...args) {
          super(...args);
          this.${ACTUAL_CONSTRUCTOR}(...args);
        }
  `;
  const codeCtorBegin = `
        ${ACTUAL_CONSTRUCTOR}(...args) {`;


  let codeCtorBody = ''
  let codeMethods  = '';
  let codeStaticCtorBody = '' // not used
  let codeStaticMethods  = '';

  for ( let i=0; i<multipleParentClasses.length; i++ ) {
    const T = multipleParentClasses[i];
    const className = T.name;

    const proc = (method,prototypeStr, writeCtorBody, writeMethods,)=>{
      let [methodName, methodValue] = method;

      // console.error( methodName );
      if ( methodName === 'constructor' ) {
        return;
      }

      if ( methodName === ACTUAL_CONSTRUCTOR ) {
        if ( isAsyncFunction( methodValue ) ) {
          throw new TypeError( ACTUAL_CONSTRUCTOR + ' cannot be a async function' );
        }
        writeCtorBody( `
          ${className}${prototypeStr}.${methodName}.apply( this, args );` );

        return
      }

      let dot = '';
      if ( typeof methodName  ==='symbol' ) {
        methodName = `[ Symbol.for( '${Symbol.keyFor( methodName )}' ) ]`;
      } else {
        methodName = `${methodName}`;
        dot = '.';
      }

      let declareAsync = '';
      let declareAwait = '';

      if ( isAsyncFunction( methodValue ) ) {
        declareAsync = 'async ';
        declareAwait = 'await ';
      }
      writeMethods ( `
        ${methodName}:{
          value : ${className}${prototypeStr}${dot}${methodName},
          enumerable   : false,
          configurable : true,
          writable     : true,
        },
      `);
    };

    // execute
    getMethods( T.prototype ).forEach(e=>proc(e, '.prototype', s=>codeCtorBody+=s,       s=>codeMethods+=s       )) ;
    getMethods( T           ).forEach(e=>proc(e, '          ', s=>codeStaticCtorBody+=s, s=>codeStaticMethods+=s )) ;
  }

  const codeCtorEnd = `
        }
  `;
  let codeEnd = `
      }
  `;

  const codeMethodsBegin = `
      Object.defineProperties( ${className}.prototype, {
  `;
  const codeMethodsBody = codeMethods;
  const codeMethodsEnd = `
      });
  `;

  const codeStaticMethodsBegin = `
      Object.defineProperties( ${className}          , {
  `;
  const codeStaticMethodsBody = codeStaticMethods;
  const codeStaticMethodsEnd = `
      });
  `;
  const code = 
    codeBegin + 
    codeConstructor + codeCtorBegin + codeCtorBody + codeCtorEnd + 
    codeEnd + 
    codeMethodsBegin       + codeMethodsBody       + codeMethodsEnd +
    codeStaticMethodsBegin + codeStaticMethodsBody + codeStaticMethodsEnd ;

  console.error( code );

  try {
    const result = (
      new Function(
        directParentClass.name,
        ...multipleParentClasses.map( e=>e.name ),
        `
          ${code}
          return ${className};
        `
      )(directParentClass, ...multipleParentClasses )
    );
    Object.defineProperty( result, 'source', { value: code } );

    return result;
  } catch ( e ) {
    e.message += '\n' + code;
    throw e;
  }
}

function vert_mixin( className, directParentClass,  ...multipleParentClasses  ) {
  let T = directParentClass;
  for ( let i=0; i<multipleParentClasses.length; i++ ) {
    const targetClass = multipleParentClasses[i];
    T = mixin( className, T, targetClass );
  }
  return T;
}








module.exports.inheritMultipleClasses = mixin;
module.exports.mixin = mixin;