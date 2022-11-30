

class A {
  m1() {
  }
  static {
    console.error( A.prototype.m1 );
    console.error( A.prototype.m2 );
  }
  m2() {
  }
  static {
    console.error( A.prototype.m1 );
    console.error( A.prototype.m2 );
  }
}

