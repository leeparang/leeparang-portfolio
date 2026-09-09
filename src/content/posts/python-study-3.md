---
title: IRIS - Python Study · 3차시
published: 2026-06-03
description: Object-oriented programming
tags: [Python, Programming, IRIS, Study]
category: Notes
---

객체지향 프로그래밍(OOP, Object-Oriented Programming)은 현실 세계의 사물이나 개념을 프로그램 안의 객체(Object) 로 표현하여 개발하는 방식입니다.

객체는 단순한 데이터가 아니라 데이터(속성) 와 기능(메서드) 을 하나로 묶은 것입니다. 즉, 객체는 상태와 행동을 함께 가지고 있습니다.

예를 들어 사람을 객체로 표현한다면 이름, 나이, 직업과 같은 데이터(속성)가 있고, 걷기, 생각하기, 눕기와 같은 기능(행동)이 있습니다. 이처럼 관련된 데이터와 기능을 하나로 묶은 것이 객체입니다.

객체지향 프로그래밍에서는 이러한 객체들을 중심으로 프로그램을 설계합니다. 객체들은 서로 정보를 주고받으며 필요한 기능을 수행하고, 이를 통해 복잡한 프로그램도 체계적으로 구성할 수 있습니다.

객체지향 프로그래밍이 등장하기 전에는 주로 절차지향 프로그래밍을 사용했습니다. 절차지향 프로그래밍에서는 데이터와 기능이 분리되어 있어 프로그램 규모가 커질수록 관리가 어렵고, 코드 재사용이 힘들다는 단점이 있습니다.

반면 객체지향 프로그래밍은 데이터와 기능을 하나로 묶어 관리하기 때문에 유지보수가 쉽고, 코드의 재사용성이 높으며, 대규모 프로그램 개발에 유리합니다. 이러한 이유로 현재는 웹, 게임, 앱, 인공지능 등 다양한 분야에서 객체지향 프로그래밍이 널리 사용되고 있습니다.

![Study image](/study-assets/python-study-3-1.png)

기존 방식은 많은 사람들을 하나하나 작성해야 한다는 단점이 있어 관리가 불가능하다.

![Study image](/study-assets/python-study-3-2.png)

객체지향을 사용하면 하나의 객체로 표현 할 수 있다.

#### 클래스(Class)

- 객체를 만들기 위한 설계도

- 클래스로부터 객체(인스턴스)를 생성함

Ex. "야구 선수 클래스"

데이터(속성)

- 이름

- 등번호

- 포지션

- 타율

- 홈런 수

기능(동작)

- 타격한다

- 수비한다

- 주루한다

- 훈련한다

![Study image](/study-assets/python-study-3-3.png)

#### 속성과 메서드: 객체의 데이터와 행동

![Study image](/study-assets/python-study-3-4.png)

hit()은 객체가 수행할 수 있는 메서드(Method) 로, 객체의 행동이나 기능을 의미한다.

player1 = BaseballPlayer("양의지")를 통해 BaseballPlayer 클래스로부터 player1이라는 객체를 생성하였다.

player1.hit()을 실행하면 hit() 메서드가 호출되어 "안타!"가 출력된다.

#### 객체지향의 핵심 4가지

캡슐화 (Encapsulation)

캡슐화는 객체의 데이터를 외부에서 함부로 접근하지 못하도록 보호하고, 필요한 기능을 통해서만 접근하도록 만드는 것이다.

예를 들어 야구 선수의 연봉 정보를 아무 곳에서나 수정할 수 없게 하고, 정해진 메서드를 통해서만 조회하거나 변경하도록 만들 수 있다.

![Study image](/study-assets/python-study-3-5.png)

상속 (Inheritance)

상속은 기존 클래스의 속성과 메서드를 물려받아 새로운 클래스를 만드는 것이다.

![Study image](/study-assets/python-study-3-6.png)

다형성 (Polymorphism)

다형성은 같은 이름의 메서드가 객체에 따라 다른 방식으로 동작하는 것이다.

예를 들어 투수와 타자 모두 play() 메서드를 사용할 수 있지만 수행하는 행동은 다를 수 있다.

 

![Study image](/study-assets/python-study-3-7.png)

추상화 (Abstraction)

추상화는 객체의 중요한 특징만 보여주고 복잡한 내부 구현은 숨기는 것이다.

예를 들어 자동차의 운전자는 엔진의 모든 동작 원리를 몰라도 핸들과 페달만으로 운전할 수 있다.

![Study image](/study-assets/python-study-3-8.png)

---

[Original post on Tistory](https://leeparang10.tistory.com/27)
