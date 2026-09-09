---
title: Flask Study · 1차시
published: 2025-09-01
description: Flask basics and HTML rendering
tags: [Flask, Web, Study]
category: Notes
---

![Study image](/study-assets/flask-study-1.gif)

안녕하세요. 오늘은 Flask 기초와 HTML 렌더링 방법에 대해 알아보겠습니다.
!파이썬(py)은 이미 깔려 있다는 가정 하에 진행합니다!

##### 목차

-  I.Flask란?
-  II.Flask 시작하기

(1) Flask 설치하기
(2) app.py 만들기
(3) Flask 예시 코드 작성하기
(4) Flask 서버 열기

-  III.Flask를 이용한 HTML 렌더링 하기

(1) Flask 예시 코드 작성하기
(2) HTML 예시 코드 작성하기
(3) Flask 서버 열기
(4) Flask를 이용해 HTML 렌더링 하기

-  IV. 마무리

##### I. Flask란?

Flask란 Python으로 웹사이트나 웹 애플리케이션을 만들 수 있게 해주는 웹 프레임워크
간단히 말해, Flask는 &ldquo;Python으로 웹사이트를 만들 수 있게 도와주는 도구&rdquo;라고 할 수 있다.

![Study image](/study-assets/flask-study-2.gif)

Flask가 무엇인지 알아보았기 때문에, 이제 Flask를 시작해 보도록 하자.

##### II. Flask 시작하기

1.Flask 설치하기

![Study image](/study-assets/flask-study-3.png)

flask 를 설치하는 사진

pip install flask 명령어를 터미널에 입력하여 Flask를 설치한다.

2. app.py 만들기

(1) VSC( Visual Studio Code)를 열어 자신의 파일로 연다
(2) app.py 파일을 만든다.

![Study image](/study-assets/flask-study-4.png)

app.py 만들기

표시된 빨간 부분을 누르고 app.py를 만든다.

![Study image](/study-assets/flask-study-5.png)

app.py 가 만들어진 모습

3.Flask 예시 코드  작성하기

![Study image](/study-assets/flask-study-6.png)

Flask 기본 예시 코드

화면과 같이 코드를 작성해 준다.

4. Flask 서버 열기
Flask를 실행하기 위해 터미널에 flask run을 입력한다.

![Study image](/study-assets/flask-study-7.png)

Flask 서버가 열린 모습

CTRL + C를 눌러 서버를 닫을 수 있다.

![Study image](/study-assets/flask-study-8.gif)

이처럼 Flask의 기본에 대해 알아보았다. 이제, 'Flask를 이용한 HTML 렌더링 하기'로 넘어가 보도록 하자.

##### III. Flask를 이용한 HTML 렌더링 하기

1. Flask + HTML 예시 작성하기

![Study image](/study-assets/flask-study-9.png)

Flask + HTML의 기본 예시 코드

화면과 같이 코드를 작성해 준다.

2. index.html에 'START FLASK'를 띄우기 위해 HTML에 이렇게 작성한다.

![Study image](/study-assets/flask-study-10.png)

HTML

화면과 같이 코드를 작성해 준다.

3. flask run 명령어를 터미널에 입력하여, Flask 서버를 연다.

![Study image](/study-assets/flask-study-11.png)

flask 서버를 열린 모습

CTRL + C를 눌러 서버를 닫을 수 있다.

4. Running on http://127.0.0.1:5000을 누르거나 직접 입력하여 접속하면,

![Study image](/study-assets/flask-study-12.png)

HTML 화면의 글씨

아까 HTML에서 작성한 'START FLASK'라는 문구가 화면에 렌더링 된다.

##### IV. 마무리

![Study image](/study-assets/flask-study-13.gif)

이상으로 Flask 시작과 Flask를 이용한 HTML 렌더링에 대해 마친다.

---

[Original post on Tistory](https://leeparang10.tistory.com/1)
