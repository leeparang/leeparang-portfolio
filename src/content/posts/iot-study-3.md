---
title: IRIS - IoT Study · 3차시
published: 2026-05-03
description: Arduino practice session
tags: [IoT, Arduino, IRIS, Study]
category: Notes
---

#### 1.LCD

![Study image](/study-assets/iot-study-3-1.jpg)

데이터 출력 가능하고, 사용자의 인터페이로 사용 가능하다.

모니터 같은 것이 없어도 확인 가능하다.

#### 2.온습도센서

![Study image](/study-assets/iot-study-3-2.jpg)

온도,습도를 확인 할 수 있는 센서이다.

#### 3.CDS조도센서

![Study image](/study-assets/iot-study-3-3.jpg)

센서에 입력되는 밝기에 따라 저항이 변한다.
빛이 밝아지면 저항이 낮아지고, 어두워지면 저항이 높아진다.
풀 다운 저항을 만들어야한다. 
저항 커진 상태 &rarr; 0

#### 3-1.실습

```bash
#include 

#define LIGHTPIN A0      
#define SERVO_PIN 3     

Servo myServo;

void setup() {
  Serial.begin(9600);
  myServo.attach(SERVO_PIN); 
}

void loop() {
  int lightValue = analogRead(LIGHTPIN);
  Serial.print("현재 밝기(조도): ");
  Serial.println(lightValue);

  if (lightValue > 500) {
    myServo.write(90);  
  } else {
    myServo.write(0);  
  }

  delay(500);
}
```

실습 영상.mp4
2.47MB

#### 

#### 4.서브 모터

![Study image](/study-assets/iot-study-3-4.png)

4-1. 준비하기

프로펠러 조립하기

4-2. 서브 모터란?

- 일반 DC 모터와 달리 원하는 각도까지 회전한 뒤 그 위치에 멈출 수 있다.

- 서보모터 내부에는 가변저항이 있어 현재 축의 위치(각도)를 측정한다.

- 제어 회로가 목표 각도와 현재 각도를 비교하여 모터를 움직이고, 목표 위치에 도달하면 멈춘다.

- 전압의 크기보다는 PWM신호를 이용해 목표 각도를 지정한다.

- 디지털 신호는 0과 1만 표현하지만, PWM은 켜져 있는 시간의 비율을 바꿔 다양한 각도 정보를 전달할 수 있다.

- 서보모터는 일정한 주기로 PWM 신호를 받아 목표 위치를 확인하고, 오차가 발생하면 자동으로 보정할 수 있다.

선의 색
역할

검은색
GND(-)

빨간색
VCC(+)

노란색
PWM 제어 신호

4-3. 일반 DC 모터와의 차이

기능/모터 종류
서브 모터
일반 모터

제어 목표
각도와 위치를 제어한다
속도와 방향을 제어한다

회전 범위
0~180도 (정밀)
0~360도 (무한)

제어 신호
PWM
전압 크기와 PWM

구성
모터,기어,위치센서 (가변저항)
순수 모터 본

피드백 여부
오차가 발생하면 스스로 보정
X

#### 5.조이스틱

![Study image](/study-assets/iot-study-3-5.jpg)

조이스틱은 X축,Y축 방향을 측정하는 두 개의 아날로그 가변저항과 누름 동작을 감지하는 하나의 디지털 스위치로 구성되고, 아날로그 값은 0~1023 범위로 측정된다.

---

[Original post on Tistory](https://leeparang10.tistory.com/23)
