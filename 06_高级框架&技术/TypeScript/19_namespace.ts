namespace TS_19{
    namespace A {
        export const Animal = 70
    }
    // 两个命名空间不会产生冲突
    namespace B {
        export const Animal = 60
    }
    console.log(A.Animal) // 70
    console.log(B.Animal) // 60
}