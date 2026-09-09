---
title: IRIS - C Language Study · 2차시
published: 2026-04-02
description: Pointers in C
tags: [C, Programming, IRIS, Study]
category: Notes
---

#### 1. 포인터란?

포인터는 메모리에 저장된 데이터의 위치(주소)를 값으로 가지는 변수이다.

포인터는 * 기호로 선언하며, & 연산자를 사용해 변수의 주소를 얻는다.

#### 2. 포인터의 구조

![Study image](/study-assets/c-language-study-2-1.png)

출처:https://www.memoengine.com/blog/c-language-pointer-variable/

p의 값을 출력하면 주소값인 1234가 출력될 것이고, *p의 값을 출력하면 1234번지 속의 값인 Z가 출력될 것입니다.

#### 3-1. 예제

```bash
#include 

int main() {
    int a = 5;
    int *p = &a;   

    printf("a의 값: %d\n", a);
    printf("a의 주소: %p\n", &a);
    printf("p의 값(주소): %p\n", p);
    printf("p가 가리키는 값: %d\n", *p);

    return 0;
}
```

일단 a의 값을 지정해 주고, int *p;로 포인터를 선언해 줍니다.

int *p = &a;를 통해 a의 주소를 p에 저장합니다.

printf("a의 값: %d\n", a); 여기서는 그냥 a의 값이 출력될 것입니다. (5)

printf("a의 주소: %p\n", &a); 여기서는 a의 주소 값이 출력될 것입니다. (주소가 만약에 1234라고 가정하면 1234 출력)

printf("p의 값(주소): %p\n", p); 여기서는 p의 값이 출력되는데, 포인터가 아닌 그냥 p는 주소가 출력됩니다. ( 주소가 만약에 1234라고 가정하면 1234 출력)

printf("p가 가리키는 값: %d\n", *p); 여기서는 *p를 출력하기 때문의 a의 주소에 저장된 값을 출력할 것입니다. (5)

#### 3-2. 예제

```bash
#include 

void change(int *x);   // 함수 선언

int main() {
    int a = 5;

    printf("변경 전: %d\n", a);

    change(&a);   // a의 주소 전달

    printf("변경 후: %d\n", a);

    return 0;
}

void change(int *x) {
    *x = 10;   // a의 값을 직접 변경
}
```

일단 int a = 5;를 통해 변수 a의 값을 5로 지정해 줍니다.

그리고 change(&a);를 통해 a의 주소를 함수로 전달합니다.

함수 선언 부분인 void change(int *x);에서 알 수 있듯이, 함수는 주소를 받기 위해 포인터 매개변수 x를 사용합니다.

이후 change 함수가 실행되면, 전달받은 a의 주소가 x에 저장됩니다.

함수 내부에서 *x = 10;을 수행하게 되는데, 이는 x가 가리키는 주소에 있는 값을 10으로 변경하는 것이므로, 결국 a의 값이 10으로 바뀌게 됩니다.

따라서 함수 실행이 끝난 후 printf("변경 후: %d\n", a);에서 a의 값이 10으로 출력됩니다.

---

[Original post on Tistory](https://leeparang10.tistory.com/14)
