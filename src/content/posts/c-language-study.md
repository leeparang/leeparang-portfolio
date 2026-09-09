---
title: IRIS - C Language Study · 1차시
published: 2026-04-01
description: Functions in C
tags: [C, Programming, IRIS, Study]
category: Notes
---

#### 1. 함수란?

특정한 기능을 수행하도록 설계된 재사용 가능한 코드의 집합

![Study image](/study-assets/c-language-study-1.jpg)

출처:https://sejong-kr.libguides.com/c.php?g=942233&p=6822325https://sejong-kr.libguides.com/c.php?g=942233&p=6822325

#### 2. 함수의 구조

![Study image](/study-assets/c-language-study-2.png)

출처:https://sejong-kr.libguides.com/c.php?g=942233&p=6822325https://sejong-kr.libguides.com/c.php?g=942233&p=6822325

형식을 보면 이렇습니다.

![Study image](/study-assets/c-language-study-3.png)

출처:https://sejong-kr.libguides.com/c.php?g=942233&p=6822325https://sejong-kr.libguides.com/c.php?g=942233&p=6822325

반환형을 정해 주고, 함수이름을 정해주며, 매개 변수를 선언해 줍니다.

##### 여기서 매개변수란?

함수가 작업을 수행하는데 필요한 데이터를 받아들이는 함수의 입력 인자입니다.

#### 3. 함수의 반환

return 문을 통해 함수 호출부로 데이터를 전달하는 값.

반환형을 정하고 return 뒤에 값을 지정한다.(a+b.. 등),

void는 반환이 없음을 의미한다.

#### 4. 예제

```bash
#include 

int sum(int a, int b);    // sum 함수 선언

int main()
{
    int x = 3, y = 4;
    int result;

    result = sum(x, y);    // sum 함수 호출
    printf("result는 %d입니다.\n", result);

    return 0;
}

int sum(int a, int b)    // sum 함수 정의
{
    int hap;

    hap = a + b;

    return hap;
}
```

먼저 int sum(int a, int b);를 통해 sum 함수를 선언해 줍니다.

그리고 int main() 함수 안에서 x, y의 값을 3,4로 지정해 줍니다.

그리고 result의 값이 sum(x, y);라고 sum 함수를 호출합니다.

다시 아래로 가 hap = a+b;이고 return hap;을 해주었기 때문에

위 printf("result = %d입니다.", result); 에서 7의 값이 출력될 것입니다.

---

[Original post on Tistory](https://leeparang10.tistory.com/13)
