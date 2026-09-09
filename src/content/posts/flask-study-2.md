---
title: Flask Study · 2차시
published: 2025-09-02
description: Dynamic HTML with Jinja2
tags: [Flask, Web, Study]
category: Notes
---

![Study image](/study-assets/flask-study-2-1.gif)

안녕하세요. 오늘은 Jinja2 + HTML 렌더링에 대해 알아보겠습니다.
!파이썬(py)은 이미 깔려 있다는 가정 하에 진행합니다!

##### 목차

-  I.Jinja2란?
-  II.Jinja + HTML

(1) 구조
(2) flask
(3) HTML + Jinja2
(4) 렌더링

-  III. 마무리

#### I. Jinja2란?

Jinja2는 Python 기반의 템플릿 엔진
웹 개발에서 HTML 파일을 동적으로 생성할 때 주로 사용됩니다. Flask, Django 등 Python 웹 프레임워크와 함께 자주 쓰임.

![Study image](/study-assets/flask-study-2-2.gif)

Jinja2 가 무엇인지 알아보았기 때문에, 이제 Jinja2 + HTML 렌더링을 시작해 보도록 하자.

#### II. Jinja + HTML

##### 1. 구조

![Study image](/study-assets/flask-study-2-3.png)

flask + HTML 기본 구조

##### 2. Flask

```bash
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    name = "Flask"    #name을 정의                 
    items = ["사과", "바나나", "체리"] #items를 정의     
    return render_template("index.html", name=name, items=items) # html로 정의 된 것을 넘김 

if __name__ == '__main__':
    app.run(debug=True)
```

flask 예시 코드

##### 3. HTML + Jinja2

```bash

Flask + Jinja2 예시

## 안녕하세요, {{ name }}님!

 #넘어 온 name 출력

### 오늘의 과일 목록:

{% for item in items %} #아이템 목록에서

- {{ item }} #넘어온 아이템들 출력
{% endfor %}

{% if "체리" in items %} #만약 체리가 아이템들 안에 있다면

오늘은 체리가 포함되어 있습니다

 #출력
{% else %} #아니면

오늘 체리는 없네요

 #출력
{% endif %}

```

HTML + Jinja2 예시 코드

##### 4. 렌더링

![Study image](/study-assets/flask-study-2-4.png)

HTML + Jinja2 렌더링

만약에 리스트 안에 체리가 없었다면 '오늘 체리는 없네요' 문장이 출력 되었겠죠?

#### III. 마무리

![Study image](/study-assets/flask-study-2-5.gif)

이상으로 Jinja2 + HTML 렌더링에 대해 마칩니다.

---

[Original post on Tistory](https://leeparang10.tistory.com/2)
