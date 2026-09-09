---
title: IRIS - Python Study · 2차시
published: 2026-06-02
description: Lists, tuples, and dictionaries
tags: [Python, Programming, IRIS, Study]
category: Notes
---

이번 파이썬 수업에서는 여러 데이터를 효율적으로 관리할 수 있는 자료형인 리스트, 튜플, 딕셔너리를 배웠다. 또한 반복문을 간결하게 표현할 수 있는 리스트 컴프리헨션도 함께 살펴보았다.

1. 리스트(List)

리스트는 여러 개의 데이터를 하나로 묶어서 관리하는 자료형이다.

데이터에 순서가 있으며, 대괄호를 사용해 만든다.

python
shopping_list = ["우유", "빵", "계란", "사과"]
numbers = [1, 2, 3, 4, 5]
mixed = ["안녕", 42, True]

리스트는 다음과 같은 특징을 가진다.

- 데이터에 순서가 있으며 첫 번째 위치는 `0`번이다.
- 생성한 뒤에도 원소를 수정할 수 있다.
- 같은 값을 여러 번 저장할 수 있다.
- 서로 다른 자료형의 데이터를 함께 저장할 수 있다.

리스트 원소 접근하기

리스트의 각 원소에는 인덱스를 이용해 접근할 수 있다. 음수 인덱스를 사용하면 뒤에서부터 접근할 수도 있다.

python
fruits = ["사과", "바나나", "오렌지", "포도"]

print(fruits[0])   # 사과
print(fruits[1])   # 바나나
print(fruits[-1])  # 포도

리스트의 주요 메서드

python
fruits.append("딸기")     # 리스트 끝에 원소 추가
fruits.remove("바나나")   # 특정 원소 삭제
print(len(fruits))        # 리스트 길이 확인

append()는 새로운 값을 추가하고, remove()는 원하는 값을 삭제한다. `len()`을 사용하면 리스트에 저장된 원소의 길이를 알 수 있다.

2. 리스트 컴프리헨션(List Comprehension)

리스트 컴프리헨션은 반복문으로 리스트를 만드는 과정을 한 줄로 간결하게 표현하는 방법이다.
조건을 추가하거나 문자열 메서드와 함께 사용할 수도 있다.
리스트 컴프리헨션은 코드를 짧고 명확하게 만들 수 있지만, 조건이 너무 복잡하면 일반 반복문이 더 읽기 쉬울 수 있다.

3. 튜플(Tuple)

튜플은 리스트와 비슷하게 순서가 있는 여러 데이터를 저장하지만, 생성한 후에는 값을 수정할 수 없다. 소괄호 `()`를 사용하며, 좌표나 색상처럼 변하지 않아야 하는 데이터를 저장할 때 유용하다.

python
point = (3, 5)
colors = ("빨강", "초록", "파랑")
red = (255, 0, 0)

4. 딕셔너리(Dictionary)

딕셔너리는 키(key)와 값(value)을 한 쌍으로 묶어 저장하는 자료형이다. 사전에서 단어를 찾듯이 키를 사용해 원하는 값을 빠르게 찾을 수 있으며, 중괄호 `{}`를 사용한다.

python
student = {
    "이름": "김철수",
    "나이": 20,
    "전공": "컴퓨터공학"
}

딕셔너리의 값은 키를 이용해 조회하거나 수정할 수 있다.

python
print(student["이름"])  # 김철수

student["학년"] = 2     # 새로운 데이터 추가
student["나이"] = 21    # 기존 값 수정
del student["전공"]     # 데이터 삭제

딕셔너리 주요 메서드

python
student.keys()          # 모든 키
student.values()        # 모든 값
student.items()         # 키와 값의 쌍
student.get("이름")     # 키에 해당하는 값
student.clear()         # 모든 데이터 삭제

5. 정리

![Study image](/study-assets/python-study-2-1.png)

마무리

이번 수업을 통해 여러 데이터를 상황에 맞게 저장하고 관리하는 방법을 배웠다. 값의 순서와 수정이 필요하다면 리스트, 변경되면 안 되는 데이터라면 튜플, 이름이나 속성처럼 키를 기준으로 값을 찾고 싶다면 딕셔너리를 사용하는 것이 좋다.

---

[Original post on Tistory](https://leeparang10.tistory.com/25)
