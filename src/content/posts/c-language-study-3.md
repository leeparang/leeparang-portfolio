---
title: IRIS - C Language Study · 3차시
published: 2026-04-03
description: Dynamic memory allocation in C
tags: [C, Programming, IRIS, Study]
category: Notes
---

#### 1. 동적할당이란?

프로그램 실행 중에 필요한 만큼 메모리를 빌려 쓰는 것이다.

사용이 끝나면 반납하고 다음에 요구하면 다시 할당 가능하다.

![Study image](/study-assets/c-language-study-3-1.png)

malloc 함수를 사용한다.

장점: 메모리 조절이 자유롭다.

단점: 쓰지 않을 때 free로 해주어야 한다.

#### 2. 쓰는 이유?

메모리는 무한한 자원이 아니어서 한정되어 있고, 1000byte 사이즈의 메모리를 할당해 놓고 실제로 더 낮은 btye를 사용하게 되면 비효율적이기 때문이다.

#### 3. 예제

#include 
#include 

int main() {

int cnt = 0;

char *arr = malloc(1001 * sizeof(char));
scanf("%s",arr);

for(int i = 0;arr[i] != '\0';i++){
    if(arr[i] == 'A' || arr[i] == 'a' 
    || arr[i] == 'E' || arr[i] == 'e'
    || arr[i] == 'I' || arr[i] == 'i'
    || arr[i] == 'O'|| arr[i] == 'o'
    || arr[i] == 'U'|| arr[i] == 'u')
        cnt +=1;
}

printf("%d",cnt);
free(arr);
    return 0;
}

![Study image](/study-assets/c-language-study-3-2.png)

malloc을 사용해 데이터 크기를 정해주고 있다.

            

                    


---

[Original post on Tistory](https://leeparang10.tistory.com/17)
