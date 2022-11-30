let IS_DELEGATION = false;

function enableDelegation( value ) {
  if ( typeof value !== 'boolean' ) {
    throw new TypeError( 'is not a boolean value' );
  }
  IS_DELEGATION = value;
}

function makeInstanceOf( f ) {
  if ( ! ( f instanceof Function ) ) {
    throw new TypeError( 'the object is not function' );
  } 
  Object.defineProperty( f, Symbol.hasInstance, {
    value : f,
  });
  return f;
}

function isAsyncFunction( f ) {
  // Note that if `f` is either null or undefined, this expression results false.
  return ( typeof f === 'function' && f.constructor.name === 'AsyncFunction' );
}

function getMethods( T ) {
  const target = T.prototype;
  const enumAndNonenum = [
    ...Object.getOwnPropertyNames( target ),
    ...Object.getOwnPropertySymbols( target ),
  ]
  return enumAndNonenum.map(e=>[e,target[e]]);
}


function inheritMultipleClasses( className, directParentClass,  ...multipleParentClasses ) {
  let codeBegin = `
      class ${className} extends ${directParentClass.name} {
  `;
  let codeConstructor = `
        constructor(...args) {
          super(...args);
          this.init(...args);
        }
  `;
  const codeInitBegin = `
        init(...args) {`;


  let codeInitBody = ''
  let codeMethods  = '';
  let codeDirectMethods  = '';

  for ( let i=0; i<multipleParentClasses.length; i++ ) {
    const T = multipleParentClasses[i];
    const className = T.name;
    const methods =  getMethods(T);

    for ( let j=0; j<methods.length; j++ ) {
      let [methodName, methodValue] = methods[j];

      // console.error( methodName );
      if ( methodName === 'constructor' ) {
        continue;
      }

      if ( methodName === 'init' ) {
        if ( isAsyncFunction( methodValue ) ) {
          throw new TypeError( 'init cannot be a async function' );
        }
        codeInitBody += `
          ${className}.prototype.${methodName}.apply( this, args );`;
        continue;
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
      codeMethods += `
        ${declareAsync}${methodName}(...args) {
          return ${declareAwait}(${className}.prototype${dot}${methodName}.apply( this, args ));
        }
      `;
      codeDirectMethods += `
        ${methodName}:{
          value : ${className}.prototype${dot}${methodName},
          enumerable   : false,
          configurable : true,
          writable     : true,
        },
      `;
    }
  }
  const codeInitEnd = `
        }
  `;
  let codeEnd = `
      }
  `;

  const codeDirectMethodsBegin = `
      Object.defineProperties( ${className}.prototype, {
  `;
  const codeDirectMethodsBody = codeDirectMethods;
  const codeDirectMethodsEnd = `
      });
  `;

  if ( IS_DELEGATION ) {
    codeDirectMethods = '';
  } else {
    codeMethods = '';
  }

  const code = 
    codeBegin + 
    codeConstructor + codeInitBegin + codeInitBody + codeInitEnd + 
    codeMethods + 
    codeEnd + 
    codeDirectMethodsBegin + codeDirectMethodsBody + codeDirectMethodsEnd;

  // console.error( code );

  const result= (
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
}

function verticallyInheritMultipleClasses( className, directParentClass,  ...multipleParentClasses  ) {
  let T = directParentClass;
  for ( let i=0; i<multipleParentClasses.length; i++ ) {
    const targetClass = multipleParentClasses[i];
    T = inheritMultipleClasses( className, T, targetClass );
  }
  return T;
}



