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

#include <Servo.h>

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

    
    실습 영상.mp4
2.47MB

---

[Original post on Tistory](https://leeparang10.tistory.com/23)
