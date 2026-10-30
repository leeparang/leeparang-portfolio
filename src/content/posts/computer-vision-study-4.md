---
title: IRIS - Computer Vision Study · 4차시
published: 2026-08-04
description: Real-time data processing with YOLO and SSD
tags: [Computer Vision, AI, Deep Learning, IRIS, Study]
category: Notes
---

#### **1. 실시간 데이터 처리란?**

**실시간 데이터 처리**란 데이터가 발생하는 즉시 또는 매우 짧은 시간 내에 데이터를 수집·분석·처리하여 결과를 제공하는 기술을 말한다. **데이터가 발생하면 기다리지 않고 바로 처리하는 방식**이다.

#### **2. 실시간 데이터 처리의 예**

**(1) 금융** 주식 가격 변동을 실시간으로 분석

![Study image](/study-assets/computer-vision-study-4-1.png)

**(2) SNS**

새로운 메시지나 알림을 즉시 전달

![Study image](/study-assets/computer-vision-study-4-2.jpg)

이 외에도 많은 분야에서 실시간 데이터 처리가 사용된다.

#### **3. 실시간 데이터 처리 VS 이미지 처리**

**(1) 실시간 데이터 처리**

실시간 데이터 처리란 **데이터가 발생하는 즉시 또는 정해진 짧은 시간 내에 데이터를 분석하고 처리하여 결과를 출력하는 기술**이다.

데이터의 양뿐만 아니라 처리 속도와 응답 시간이 중요하다.

예를 들어 자율주행 자동차는 카메라와 센서에서 끊임없이 입력되는 데이터를 빠르게 분석하여 장애물을 감지하고 주행 방향을 결정해야 한다.

**핵심: 데이터를 얼마나 빠르게 처리하고 결과를 출력할 수 있는지**

**(2) 이미지 처리**

이미지 처리란 **이미지를 구성하는 수많은 픽셀 데이터를 컴퓨터에 입력하여 분석하거나 변환하고, 원하는 결과를 출력하는 기술**이다.

디지털 이미지는 아주 작은 픽셀(Pixel)들이 모여 만들어진 거대한 숫자 배열이다.

예를 들어 1920 × 1080 크기의 컬러 이미지 한 장은 다음과 같은 데이터를 포함한다.

- 픽셀 수: 약 207만 개

- RGB 채널을 포함한 데이터: 약 622만 개의 숫자

- 이미지 1,000장: 약 62억 개의 숫자

이처럼 **아주 작은 픽셀들의 거대한 배열인 이미지를 무수히 많이 컴퓨터에 입력하고, 이를 분석 및 처리하여 결과를 얻는 것**이 이미지 처리의 주요 목적 중 하나이다.

**핵심: 방대한 이미지 데이터를 얼마나 효율적이고 정확하게 처리할 수 있는지**

#### **4. yolo**

YOLO는 **컴퓨터 비전에서 사용되는 딥러닝 기반 객체 탐지 모델**이다.

이미지를 한 번의 신경망 연산 과정(Forward Pass)에 통과시켜 객체의 종류와 위치를 빠르게 찾아내는 기술이다.

객체 탐지 과정에서 **바운딩 박스**와 **클래스 확률**을 예측한다. 빠른 처리 속도를 바탕으로 실시간 객체 탐지에 활용된다.

**I. 단일 단계 방식**

**(1) 기존 R-CNN 방식**

R-CNN은 객체 탐지를 여러 단계로 수행하는 방식이다.

- 먼저 객체가 존재할 가능성이 있는 영역을 제안한다.

- 제안된 영역에서 특징을 추출하고 객체를 분류한다.

- 여러 단계를 거치므로 처리 시간이 상대적으로 길다.

**(2) YOLO 방식**

반면 YOLO는 별도의 영역 제안 단계를 거치지 않고, 하나의 신경망을 통해 객체의 위치와 종류를 예측한다.

원래 YOLO 모델은 입력 이미지를 여러 개의 **그리드 셀**로 나누어 처리한다.

각 그리드 셀을 바탕으로 다음 정보를 예측한다.

- **바운딩 박스:** 객체가 존재하는 위치와 크기

- **클래스 확률:** 객체가 어떤 종류에 속하는지 나타내는 확률

- **신뢰도 점수(Confidence Score):** 예측한 바운딩 박스에 대한 신뢰도

즉, **한 번의 신경망 순전파를 통해 객체의 위치와 종류를 함께 예측하기 때문에 빠른 처리가 가능하다.**

**II. 실시간 처리 방식(FPS)**

YOLO의 대표적인 특징은 빠른 객체 탐지 속도이다.

FPS(Frames Per Second)는 **1초 동안 처리할 수 있는 이미지 프레임의 수**를 의미한다.

예를 들어 30FPS는 1초에 30장의 프레임을 처리한다는 의미이다.

FPS가 높을수록 동일한 시간에 더 많은 프레임을 처리할 수 있다.

이러한 특징으로 인해 다양한 분야에서 활용된다.

- 자율주행 자동차의 보행자 및 차량 탐지

- CCTV를 이용한 실시간 객체 감지

- 로봇의 물체 인식

- 공장 자동화 및 불량품 검출

단, 실제 FPS는 모델의 종류, 입력 이미지 크기, GPU 성능 등에 따라 달라진다.

#### **5. yolo의 기본 구조**

YOLO는 기본적으로 **CNN**을 기반으로 하는 객체 탐지 모델이다.

##### **I. CNN 구조 복습**

CNN은 입력층, 여러 은닉층, 출력층으로 구성된다.

은닉층에서는 주로 다음과 같은 연산이 수행된다.

**(1) Conv 계층(Convolution Layer)**

- 필터(Filter)를 사용하여 이미지의 특징을 추출한다.

- 이미지의 경계선, 형태, 패턴 등을 학습한다.

**(2) ReLU 계층(Rectified Linear Unit)**

- 활성화 함수를 적용하는 계층이다.

- 비선형성을 추가하여 복잡한 특징을 학습할 수 있도록 한다.

**(3) Pooling 계층(Pooling Layer)**

- 특징 맵의 공간적 크기를 축소한다.

- 데이터의 크기와 연산량을 줄이는 역할을 한다.

- 대표적으로 Max Pooling이 있다.

CNN의 기본적인 처리 흐름은 다음과 같다.

**입력 이미지 → Conv → ReLU → Pooling → 특징 추출 → 출력**

단, 실제 CNN과 YOLO의 계층 구성은 모델에 따라 다르며, 모든 모델이 Pooling 계층을 사용하는 것은 아니다.

**II. YOLO의 그리드 셀(Grid Cell)**

그리드 셀은 **입력 이미지를 일정한 격자 형태로 나눈 구역**이다.

원래 YOLO(YOLOv1)는 이미지를 S × S개의 그리드 셀로 구분한다.

예를 들어 7 × 7로 나누면 총 49개의 그리드 셀이 생성된다.

**객체의 중심점이 특정 그리드 셀 안에 들어가면, 해당 그리드 셀이 그 객체를 검출할 책임을 갖는다.**

예를 들어 이미지에 자동차가 존재한다고 가정하자.

- 입력 이미지를 여러 그리드 셀로 나눈다.

- 자동차의 중심점이 포함된 그리드 셀을 확인한다.

- 해당 그리드 셀이 자동차의 위치와 크기를 예측한다.

- 바운딩 박스, 신뢰도 점수, 클래스 확률을 출력한다.

여기서 중요한 점은 **그리드 셀이 객체 전체를 포함할 필요는 없으며, 객체의 중심점이 어느 셀에 위치하는지가 기준**이라는 것이다.

이는 YOLOv1의 기본 원리이며, 이후 YOLO 버전에서는 객체 예측 방식이 발전하였다.

**III. 예측 데이터와 신뢰도 점수**

YOLOv1의 각 그리드 셀은 바운딩 박스 정보와 신뢰도 점수, 클래스 확률을 예측한다.

**(1) 바운딩 박스(Bounding Box)**

객체의 위치와 크기를 나타내는 사각형이다.

주요 정보는 다음과 같다.

- x: 바운딩 박스 중심의 가로 좌표

- y: 바운딩 박스 중심의 세로 좌표

- w: 바운딩 박스의 너비(Width)

- h: 바운딩 박스의 높이(Height)

**(2) 신뢰도 점수(Confidence Score)**

예측한 바운딩 박스에 객체가 존재하는지와 박스의 위치가 얼마나 정확한지를 반영하는 값이다.

**(3) 클래스 확률(Class Probability)**

탐지한 객체가 사람, 자동차, 동물 등 어떤 클래스에 속하는지 나타내는 확률이다.

#### **6. SSD**

**딥러닝 기반 객체 탐지 모델**로, 이미지를 한 번의 신경망 연산으로 분석하여 객체의 **위치와 클래스**를 동시에 예측한다.

**(1) 다중 스케일 특징 맵**

- CNN의 여러 계층에서 서로 다른 크기의 특징 맵 추출

- 큰 특징 맵 → 작은 객체 탐지

- 작은 특징 맵 → 큰 객체 탐지

- 각 특징 맵의 예측 결과를 통합

**(2) One-Stage 방식**

- 별도의 영역 제안 없이 한 번에 객체 탐지

- 초기 YOLO보다 정확도가 높고, 기존 Two-Stage 모델보다 빠른 처리 가능

- **빠른 속도 + 높은 정확도**가 장점

**(3) 비최대 억제(NMS)**

- 동일한 객체에 대한 중복 바운딩 박스 제거

- 신뢰도가 가장 높은 박스를 우선 선택

- **IoU가 임계값(예: 0.5)을 초과하는 중복 박스 제거**

**예시**

![Study image](/study-assets/computer-vision-study-4-3.png)

**Box 1)** COCO 클래스에는 `ice cube`라는 명확한 객체 카테고리가 없으므로 얼음을 배경이나 `glass` 등으로 잘못 탐지할 수 있다.

**Box 2)** 데이터셋에 고양이 클래스가 존재하므로 높은 신뢰도로 `cat`을 탐지한다.

#### **7. 실습**

**(1) 라이브러리 설치**

```python
!pip install -U transformers
```

**코드 설명**

- pip install : 파이썬 라이브러리를 설치하는 명령어

- -U : 라이브러리를 최신 버전으로 업데이트

- transformers : 딥러닝 모델을 쉽게 불러오고 사용할 수 있도록 지원하는 라이브러리

&rarr; 객체 탐지 모델을 사용하기 위한 라이브러리 설치 과정이다.

**(2) 라이브러리 불러오기**

```python
import torch
import cv2
import os

from PIL import Image
from collections import Counter
from transformers import pipeline
from google.colab import files
from IPython.display import Video, display
```

**코드 설명**

- torch : 딥러닝 연산 및 GPU 사용

- cv2 : 동영상 읽기, 이미지 처리, 바운딩 박스 표시

- os : 파일 경로 및 파일명 처리

- PIL.Image : 이미지를 모델 입력 형태로 변환

- Counter : 객체별 탐지 횟수 계산

- pipeline : 사전 학습된 딥러닝 모델 불러오기

- files : Colab에 파일 업로드 및 다운로드

- Video, display : 분석 결과 영상 출력

&rarr; 영상 분석에 필요한 라이브러리를 불러오는 과정이다.

**(3) 객체 탐지 모델 불러오기**

```python
device = 0 if torch.cuda.is_available() else -1

detector = pipeline(
    "object-detection",
    model="hustvl/yolos-tiny",
    device=device
)
```

**코드 설명**

**torch.cuda.is_available()**

- GPU 사용 가능 여부 확인

- GPU 사용 가능 &rarr; device = 0

- GPU 사용 불가능 &rarr; device = -1 (CPU 사용)

**pipeline("object-detection")**

- 객체 탐지 기능을 수행하는 파이프라인 생성

**model="hustvl/yolos-tiny"**

- 사전 학습된 YOLOS-Tiny 모델 사용

- Transformer 기반 객체 탐지 모델

- 이미지에서 객체의 위치와 클래스를 예측

&rarr; GPU 또는 CPU를 이용하여 객체 탐지 모델을 실행할 준비를 하는 과정이다.

**(4) 동영상 업로드 및 저장 경로 설정**

```python
uploaded = files.upload()

video_path = next(iter(uploaded.keys()))

output_path = "/content/result_" + os.path.splitext(
    os.path.basename(video_path)
)[0] + ".mp4"
```

**코드 설명**

**files.upload()**

- Colab에 분석할 동영상 파일 업로드

**next(iter(uploaded.keys()))**

- 업로드된 파일의 이름을 가져옴

**video_path**

- 분석할 원본 영상의 경로 저장

**output_path**

- 객체 탐지 결과를 저장할 영상의 경로 설정

- 원본 파일명 앞에 result_ 추가

예시:

- 입력: video.mp4

- 출력: result_video.mp4

&rarr; 입력 영상과 결과 영상의 저장 경로를 설정하는 과정이다.

**(5) 동영상 정보 불러오기**

```python
cap = cv2.VideoCapture(video_path)

fps = cap.get(cv2.CAP_PROP_FPS)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print("원본 프레임 수:", int(cap.get(cv2.CAP_PROP_FRAME_COUNT)))
```

**코드 설명**

**cv2.VideoCapture()**

- 동영상 파일을 불러오는 함수

- 영상을 프레임 단위로 읽을 수 있음

**CAP_PROP_FPS**

- 초당 프레임 수(FPS) 확인

- 예: 30FPS &rarr; 1초에 30프레임

**CAP_PROP_FRAME_WIDTH**

- 영상의 가로 크기 확인

**CAP_PROP_FRAME_HEIGHT**

- 영상의 세로 크기 확인

**CAP_PROP_FRAME_COUNT**

- 영상의 전체 프레임 수 확인

&rarr; 객체 탐지에 필요한 영상의 크기와 프레임 정보를 가져오는 과정이다.

**(6) 결과 영상 저장 및 객체 개수 변수 생성**

```python
if fps <= 0:
    fps = 30.0

out = cv2.VideoWriter(
    output_path,
    cv2.VideoWriter_fourcc(*"mp4v"),
    fps,
    (w, h)
)

object_counts = Counter()
```

**cv2.VideoWriter()**

- 분석한 프레임을 새로운 동영상으로 저장하는 함수

**VideoWriter_fourcc(*"mp4v")**

- MP4 영상 저장을 위한 코덱 설정

**fps, (w, h)**

- 출력 영상의 프레임 속도와 크기 설정

**Counter()**

- 객체 종류별 탐지 횟수를 저장하는 자료구조

예시:

```python
object_counts = {
    "person": 15,
    "car": 8,
    "dog": 3
}
```

&rarr; 분석 결과 영상을 저장하고, 객체별 탐지 횟수를 계산할 준비를 하는 과정이다.

**(7) 프레임 단위로 영상 읽기**

```python
while True:
    ret, frame = cap.read()

    if not ret:
        break

    image = Image.fromarray(
        cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    )

    results = detector(image, threshold=0.5)

    for obj in results:
        label = obj["label"]
        score = obj["score"]
        box = obj["box"]

        x1, y1 = int(box["xmin"]), int(box["ymin"])
        x2, y2 = int(box["xmax"]), int(box["ymax"])

        cv2.rectangle(
            frame, (x1, y1), (x2, y2),
            (0, 255, 0), 2
        )

        cv2.putText(
            frame, f"{label} {score:.2f}",
            (x1, max(20, y1 - 5)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6, (0, 255, 0), 2
        )

        object_counts[label] += 1

    out.write(frame)
```

이 부분이 **객체 탐지를 실제로 수행하는 핵심 코드**이다.

① 영상 프레임 읽기

```python
while True:
    ret, frame = cap.read()

    if not ret:
        break
```

- while True : 영상을 끝까지 반복 처리

- cap.read() : 영상에서 프레임을 한 장씩 읽음

- ret : 프레임을 정상적으로 읽었는지 확인

- frame : 읽어 온 이미지 데이터

- break : 더 이상 프레임이 없으면 반복 종료

&rarr; 동영상을 이미지 단위로 분리하는 과정이다.

② 이미지 변환

```python
image = Image.fromarray(
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
)
```

- cv2.cvtColor() : 이미지 색상 형식 변환

- COLOR_BGR2RGB : OpenCV의 BGR 형식을 RGB로 변환

- Image.fromarray() : NumPy 배열을 PIL 이미지로 변환

&rarr; 객체 탐지 모델에 입력하기 적합한 이미지 형태로 변환한다.

③ 객체 탐지 수행

```python
results = detector(image, threshold=0.5)
```

- detector(image) : 객체 탐지 모델에 이미지 입력

- threshold=0.5 : 신뢰도 점수가 0.5 이상인 객체만 반환

- results : 탐지된 객체의 정보 저장

&rarr; 객체의 위치, 종류, 신뢰도를 예측하는 과정이다.

④ 객체 정보 추출

```python
for obj in results:
    label = obj["label"]
    score = obj["score"]
    box = obj["box"]

    x1, y1 = int(box["xmin"]), int(box["ymin"])
    x2, y2 = int(box["xmax"]), int(box["ymax"])
```

- label : 객체의 종류 (person, car 등)

- score : 예측 신뢰도

- box : 바운딩 박스 좌표

- x1, y1 : 바운딩 박스 왼쪽 위 좌표

- x2, y2 : 바운딩 박스 오른쪽 아래 좌표

&rarr; 탐지된 객체의 클래스와 위치 정보를 가져온다.

⑤ 바운딩 박스 표시

```python
cv2.rectangle(
    frame, (x1, y1), (x2, y2),
    (0, 255, 0), 2
)
```

- cv2.rectangle() : 객체 주변에 사각형 표시

- (x1, y1), (x2, y2) : 바운딩 박스 좌표

- (0, 255, 0) : 초록색

- 2 : 선 두께

&rarr; 탐지된 객체의 위치를 사각형으로 표시한다.

⑥ 객체 이름 및 신뢰도 표시

```python
cv2.putText(
    frame, f"{label} {score:.2f}",
    (x1, max(20, y1 - 5)),
    cv2.FONT_HERSHEY_SIMPLEX,
    0.6, (0, 255, 0), 2
)
```

- cv2.putText() : 이미지에 글자 표시

- label : 객체 이름

- score:.2f : 신뢰도를 소수점 둘째 자리까지 표시

- FONT_HERSHEY_SIMPLEX : 글꼴 설정

- 0.6 : 글자 크기

출력 예시:

```python
person 0.98
car 0.92
dog 0.87
```

&rarr; 객체 이름과 예측 신뢰도를 영상에 표시한다.

⑦ 객체 탐지 횟수 계산 및 영상 저장

```python
object_counts[label] += 1

out.write(frame)
```

- object_counts[label] += 1 : 해당 객체 클래스의 탐지 횟수 1 증가

- out.write(frame) : 분석한 프레임을 결과 영상에 저장

&rarr; 객체별 탐지 횟수를 누적하고, 처리된 프레임을 저장한다.

**주의:** 같은 객체가 여러 프레임에 등장하면 등장한 프레임마다 횟수가 증가한다.

**(8) 분석 종료 및 객체 탐지 결과 출력**

```python
cap.release()
out.release()

print("분석 완료")
print("\n[객체별 탐지 횟수]")

for label, count in object_counts.most_common():
    print(f"{label}: {count}회")
```

**코드 설명**

**cap.release()**

- 원본 영상 파일 읽기 종료

**out.release()**

- 결과 영상 저장 종료

**object_counts.most_common()**

- 객체별 탐지 횟수를 많은 순서대로 정렬

**print()**

- 객체별 탐지 횟수를 화면에 출력

출력 예시:

```python
분석 완료

[객체별 탐지 횟수]
person: 150회
car: 85회
bicycle: 23회
dog: 12회
```

&rarr; 영상 분석을 종료하고 객체별 탐지 횟수를 출력하는 과정이다.

**(9) 결과 영상 출력 및 다운로드**

```python
display(Video(output_path, embed=True))

files.download(output_path)
```

**코드 설명**

**Video(output_path, embed=True)**

- 분석 결과 영상을 Colab에서 재생할 수 있도록 표시

**display()**

- 결과 영상을 화면에 출력

**files.download(output_path)**

- 분석된 MP4 영상 파일 다운로드

&rarr; 객체 탐지 결과가 표시된 영상을 확인하고 저장하는 과정이다.

---

[Tistory 원문 보기 · 실시간 데이터 처리](https://leeparang10.tistory.com/39)
