---
title: IRIS - IoT Study · 2차시
published: 2026-05-02
description: Arduino practice session
tags: [IoT, Arduino, IRIS, Study]
category: Notes
---

#### 1. 부저란?

![Study image](/study-assets/iot-study-2-1.jpg)

능동부저: 다리의 길이가 다르고 한 가지의 음만 낼 수 있다. 전원만 공급하면 바로 소리가 난다.

![Study image](/study-assets/iot-study-2-2.jpg)

수동부저: 다리의 길이가 같으며 주파수 범위 내에서 다양한 소리를 낼 수 있다.

#### 2. 택트스위치

![Study image](/study-assets/iot-study-2-3.webp)

푸시버튼을 눌렀을떄 연결되고, 누르지 않을 때는 연결되지 않아 작동하지 않는다.

Floating 현상: 아무것도 연결되어 있지 않아 전압을 모르는 상태이다.

방지하기 위해서는 풀업 저항이나 풀다운 저항 사용해야한다.

방
PULL UP 저항
PULL DOWN 저항 
누가 더 많이 사용?

버튼 눌렀을 때
1
0
PULL UP 

버튼 누르지 않았을 때
0
1


풀다운보다는 풀업이 노이즈나 충격에 강하기 때문에 풀업 방식을 더 많이 사용하고, 소프트웨어인 풀업도 가능하기 때문이다.

#### 3. 가변저항

가변저항 실습.mp4
6.46MB

#### 4. 초음파 센서

![Study image](/study-assets/iot-study-2-4.png)

초음파를 보내서 거리를 측정하는 센서이다.

초음파 센서
아두이노

VCC
5V

Trig
디지털~3

Echo
디지털 2

GND
GND

---

[Original post on Tistory](https://leeparang10.tistory.com/22)
