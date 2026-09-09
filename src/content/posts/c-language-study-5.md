---
title: IRIS - C Language Study · 5차시
published: 2026-04-05
description: Structures in C
tags: [C, Programming, IRIS, Study]
category: Notes
---

#### 1. 구조체란?

C언어의 구조체는 여러 개의 서로 다른 타입의 데이터를 하나로 묶을 수 있는 사용자 정의 자료형이다.

관련된 여러 데이터 하나의 묶음으로 관리할 수 있도록 해주기 때문 복잡한 정보를 효율적으로 다룰 수 있다.

구조체는 관련된 데이터를 묶을 수 있으며, 코드를 깔끔하게 관리하면서 재사용을 할 수 있도록 하며, 확장성을 가지고 있다.

#### 2. 구조체의 구조

![Study image](/study-assets/c-language-study-5-1.png)

typedef struct 구조체 이름

혹은 struct 구조체 이름으로 구성 가능하다.

#### 3. 구조체 예제

#include 
#include 

// 구조체 정의
struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    struct Student s1;

    // 문자열 복사
    strcpy(s1.name, "Kim");

    s1.age = 20;
    s1.score = 95.5;

    printf("이름: %s\n", s1.name);
    printf("나이: %d\n", s1.age);
    printf("점수: %.1f\n", s1.score);

    return 0;
}
struct 구조체 이름을 통해 구조체를 정의해주었고 , 이름, 나이, 점수를 선언해 둡니다.

int main() 함수에서 Student 구조체를 s1이라고 바꾸어 주고

s1.age 이런 형식으로 변수에 값을 넣어줍니다.

그리고 구조체에 들어간 값을 출력해 줍니다.

            

                    


---

[Original post on Tistory](https://leeparang10.tistory.com/19)
