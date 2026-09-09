---
title: IRIS - IoT Study · 1차시
published: 2026-05-01
description: Arduino fundamentals and practice
tags: [IoT, Arduino, IRIS, Study]
category: Notes
---

#### 1. 아두이노란?

하드웨어 및 소프트웨어를 기반, 오픈소스 마이크로컨트롤러 플랫폼이다.

IoT이다.

종류는 아래 사진처럼 있으며 여기서는 Uno를 사용한다.

![Study image](/study-assets/iot-study-1.png)

#### 2. 기본 부품

2-1. 디지털과 아날로그

![Study image](/study-assets/iot-study-2.png)

디지털은 1 , 0으로 1은 HIGH(켜짐) 0은 LOW(꺼짐)

아두이노에서의 아날로그는 0 ~1023이다.

2-2. 점퍼 케이블

![Study image](/study-assets/iot-study-3.png)

앞이 뾰족한 핀이 수 핀, 없는 핀이 암핀이다. 수 핀이 암핀 쪽에 넣는 형식으로 연결한다.

2-3. 브레드보드(빵판)

![Study image](/study-assets/iot-study-4.webp)

같은 줄이 같은 방향으로 전기가 흐른다.

2-4. 저항

![Study image](/study-assets/iot-study-5.png)

전류의 흐름을 방해해서 전압과 전류를 조절하는 역할을 한다.

2-5. LED

![Study image](/study-assets/iot-study-6.png)

전기를 통과시킬 때 빛을 발산하는 반도체의 소자이다.

#### 3. 아두이노  IDE

3-1. 아두이노 IDE

아두이노 IDE 다운로드 (https://www.arduino.cc/en/software/)

앱 실행 후 앱 좌측 상단 Select Boad 클릭 아래 나오는 글 클릭

아두이노 장치 선택, 연결한 포트 선택을 하면 세팅이 완료된다.

3-2. 입력과 출력

입력: 키보드 , 마우스 등..

출력: 모니터 등..

#### 4. 실습 정리

int led1 = 10;
int led2 = 9;
int led3 = 8;
int led4 = 7;
int led5 = 6;
int led6 = 5;

void setup() {

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(led5, OUTPUT);
  pinMode(led6, OUTPUT);

}

void loop() {

  // 오른쪽
  digitalWrite(led1, HIGH);
  delay(100);
  digitalWrite(led1, LOW);

  digitalWrite(led2, HIGH);
  delay(100);
  digitalWrite(led2, LOW);

  digitalWrite(led3, HIGH);
  delay(100);
  digitalWrite(led3, LOW);

  digitalWrite(led4, HIGH);
  delay(100);
  digitalWrite(led4, LOW);

  digitalWrite(led5, HIGH);
  delay(100);
  digitalWrite(led5, LOW);

  digitalWrite(led6, HIGH);
  delay(100);
  digitalWrite(led6, LOW);

  // 왼쪽
  digitalWrite(led5, HIGH);
  delay(100);
  digitalWrite(led5, LOW);

  digitalWrite(led4, HIGH);
  delay(100);
  digitalWrite(led4, LOW);

  digitalWrite(led3, HIGH);
  delay(100);
  digitalWrite(led3, LOW);

  digitalWrite(led2, HIGH);
  delay(100);
  digitalWrite(led2, LOW);

}
먼저 led 6개를 사용 할 것이기에 led 1~6까지 아두이노에 꽃은 번호를 적어 선언해줍니다.

모든 LED가 OUTPUT 할 수 있도록 세팅 해주고

0.1초 마다 1~6,6~1까지 좌우로 움직이며 불이 켜지도록 코드를 작성해줍니다.

![Study image](/study-assets/iot-study-7.png)

    
    실습 영상.mp4
0.68MB

---

[Original post on Tistory](https://leeparang10.tistory.com/21)
