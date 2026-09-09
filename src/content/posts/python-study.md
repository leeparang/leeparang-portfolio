---
title: IRIS - Python Study · 1차시
published: 2026-06-01
description: Python review
tags: [Python, Programming, IRIS, Study]
category: Notes
---

![Study image](/study-assets/python-study-1.webp)

##### 1. Python이란?

파이썬(Python)은 문법이 쉽고 읽기 편한 프로그래밍 언어로, 변수&middot;조건문&middot;반복문&middot;함수를 사용하며 인공지능(AI), 웹 개발, 데이터 분석 등 다양한 분야에서 활용된다.

##### 2. 변수

(1) 자료형

![Study image](/study-assets/python-study-2.png)

자료형은 프로그램에서 데이터를 어떤 형태로 저장하고 처리할지를 구분하는 종류이다. 파이썬은 숫자, 문자, 참/거짓뿐만 아니라 여러 데이터를 묶어 저장하는 자료형까지 다양하게 제공하며, 상황에 맞는 자료형을 선택해 사용할 수 있다.

##### 3. 입출력

(1) 입력

input()

(2) 출력

print()

##### 4. 조건문과 반복문

(1) 조건문

주어진 조건의 참(True)과 거짓(False)을 판단하여 실행할 코드를 선택하는 문법이다. if는 조건이 참일 때 실행되고, elif는 다른 조건을 추가로 확인하며, else는 모든 조건이 거짓일 때 실행된다.

```python
age = 18

if age >= 20:
    print("유료 입장입니다.")
```

(2) 반복문

같은 작업을 여러 번 실행하는 문법이다. for는 정해진 횟수만큼 반복하고, while은 조건이 참인 동안 반복한다. 또한 break는 반복문을 즉시 종료하고, continue는 현재 반복을 건너뛰고 다음 반복을 수행한다.

```python
for i in range(3):
    print(i)
```

```python
count = 1

while count  [0, 1, 2, 3, 4]

##### 6. 함수와 라이브러리

(1) 함수(Function)

특정 작업을 수행하는 코드를 하나로 묶은 것으로, 필요할 때 호출하여 반복해서 사용할 수 있다.

```python
def hello():
    print("안녕하세요!")

hello()
```

(2) 매개변수(Parameter)

함수가 전달받은 값을 저장하는 변수이다.

```python
def hello(name):
    print(name)

hello("IRIS")
```

(3) 인자(Argument)

함수를 호출할 때 전달하는 실제 값이다.

return은 함수에서 처리한 결과를 호출한 곳으로 돌려주는 역할을 한다.

```python
def add(a, b):
    return a + b

print(add(2, 3))
```

(4) 라이브러리(Library)

미리 작성된 기능을 모아 놓은 것으로, 필요한 기능을 가져와 사용할 수 있다.

- import는 라이브러리 전체를 가져올 때 사용하는 문법이다.

- from import는 라이브러리에서 필요한 기능만 가져올 때 사용하는 문법이다.

- as는 라이브러리나 모듈의 이름을 짧게 바꿔 사용할 때 사용하는 문법이다.

---

[Original post on Tistory](https://leeparang10.tistory.com/28)
