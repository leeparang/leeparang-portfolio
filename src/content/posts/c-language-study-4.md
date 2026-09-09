---
title: IRIS - C Language Study · 4차시
published: 2026-04-04
description: Recursive functions in C
tags: [C, Programming, IRIS, Study]
category: Notes
---

#### 1. 재귀 함수

함수가 자기 자신을 호출하는 함수
즉, 함수가 종료될 때 return 값을 자기 자신에게 하는 함수이다.

꼭 필요한 조건

1. 기저 조건: 더 이상 재귀하지 않을 조건

2. 재귀 호출: 자기 자신을 호출

#### 

#### 2. 쓰는 이유?

가독성과 안정성이 올라가고, 코드가 간결해진다. 또한 트리, 분할정복 같은 알고리즘에 적합하다. 하지만 스택 오버플로우가 발생할 수 있어서 반드시 종료조건이 필요하다.

#### 3. 예제

```bash
#include 

int hap(int n){
    if(n <= 1){
        return n;
    }
    return n + hap(n-1);
}

int main() {

int n = 0;
scanf("%d",&n);
printf("%d",hap(n));
    return 0;
}
```

![Study image](/study-assets/c-language-study-4-1.png)

종료 조건 까지 계속 더해준다.

int main()함수에서는 입출력을 담당한다.

---

[Original post on Tistory](https://leeparang10.tistory.com/18)
