---
title: IRIS - Computer Vision Study · 3차시
published: 2026-08-03
description: Computer vision review and object detection with Faster R-CNN
tags: [Computer Vision, AI, Deep Learning, IRIS, Study]
category: Notes
---

#### 1. 컴퓨터 비전이란?

컴퓨터 비전(Computer Vision)은 **컴퓨터가 이미지나 비디오와 같은 시각적 데이터를 이해하고 처리할 수 있도록 하는 기술**이다.

사람이 사진을 보고 고양이를 알아볼 때 눈, 코, 귀, 얼굴 형태 등의 특징을 이용하는 것처럼 컴퓨터도 이미지 속의 **특징(Feature)**을 분석하여 대상을 인식한다. 예를 들어 고양이를 인식할 때 뾰족한 두 귀, 둥근 얼굴, 눈의 위치와 같은 특징이 중요한 단서가 될 수 있다.

#### 2. 과거와 현재의 컴퓨터 비전

**(1) 전통적인 컴퓨터 비전**

딥러닝이 등장하기 전에는 사람이 이미지에서 필요한 특징을 직접 찾아내고, 이를 이용하는 **수학적 알고리즘과 규칙을 만들어 컴퓨터에 적용**했다.

대표적으로 이미지에서 픽셀 값이 급격하게 변하는 부분을 찾아 **선(Edge)**을 검출하는 방법 등이 사용되었다.

하지만 사람이 정해 놓은 규칙에 의존하기 때문에 이미지의 **빛, 각도, 크기 등의 조건이 조금만 달라져도 인식 성능이 크게 떨어지는 한계**가 있었다.

**(2) 딥러닝 이후의 컴퓨터 비전**

딥러닝이 발전하면서 컴퓨터 비전의 방식도 크게 달라졌다. 사람이 특징을 일일이 정해주는 대신 **많은 이미지 데이터와 정답(Label)을 제공하면 모델이 데이터에서 스스로 특징과 규칙을 학습**한다.

특히 CNN과 같은 딥러닝 모델은 여러 개의 층(Layer)을 거치면서 점점 복잡한 특징을 추출한다.

- **얕은 층(Low-level)**
- **중간 층(Mid-level)**
- **깊은 층(High-level)**

이렇게 여러 단계에서 추출한 정보를 바탕으로 최종적으로 이미지가 무엇인지 판단한다.

#### 3. 컴퓨터의 이미지 인식

컴퓨터의 이미지 인식 과정은 크게 세 단계로 볼 수 있다.

**(1) 이미지 입력**

컴퓨터는 이미지를 사람처럼 보는 것이 아니라 **픽셀의 숫자 배열**로 받아들인다.

**(2) 특징 추출**

딥러닝 모델이 이미지의 픽셀 정보를 분석하여 선, 모양, 질감 등 중요한 특징을 찾아낸다.

**(3) 분류**

추출한 특징을 바탕으로 여러 카테고리 중 어떤 것에 해당하는지 예측한다. 예를 들어 고양이 사진이라면 고양이일 확률이 가장 높다고 판단할 수 있다.

즉, 딥러닝을 이용한 컴퓨터 비전에서는 **이미지 입력 -> 특징 추출 -> 분류**의 과정을 모델이 학습을 통해 수행한다.

**핵심은 컴퓨터가 스스로 과정을 진행한다는 것이다.**

#### 4. 컴퓨터 이미지 인식의 활용

컴퓨터 비전은 목적에 따라 다양한 방식으로 활용된다.

1. **이미지 분류**

![Computer vision study image](/study-assets/computer-vision-study-3-01.png)
2. **객체 검출(Object Detection)**

![Computer vision study image](/study-assets/computer-vision-study-3-02.png)
3. **이미지 분할(Image Segmentation)**

![Computer vision study image](/study-assets/computer-vision-study-3-03.png)
4. **행동 인식(Action Recognition)**

![Computer vision study image](/study-assets/computer-vision-study-3-04.png)

#### 5. 컴퓨터 비전에 사용되는 도구

컴퓨터 비전을 구현할 때 다양한 라이브러리와 프레임워크를 사용할 수 있다.

- **OpenCV**

![Computer vision study image](/study-assets/computer-vision-study-3-05.jpg)
- **PyTorch**

![Computer vision study image](/study-assets/computer-vision-study-3-06.jpg)
- **NumPy**

![Computer vision study image](/study-assets/computer-vision-study-3-07.png)

**PyTorch** 외에도 **TensorFlow**와 같은 딥러닝 프레임워크가 사용된다.

![Computer vision study image](/study-assets/computer-vision-study-3-08.png)

#### 6. 이미지를 분류하자

이미지 분류는 컴퓨터가 이미지에 포함된 특징을 분석하여 해당 이미지가 어떤 종류에 속하는지 판단하는 기술이다.

이미지 분류를 위해서는 이미지 데이터를 모델에 적합한 형태로 변환하는 **전처리 과정**이 필요하며, 목적에 따라 다양한 딥러닝 모델을 사용한다.

##### i) 이미지 전처리

**1) 해상도 및 크기 통일**

이미지마다 해상도와 크기가 다르면 모델에 입력할 때 문제가 발생할 수 있다.

딥러닝 모델은 일반적으로 정해진 형태의 입력 텐서를 요구하기 때문에 이미지의 크기가 제각각이라면 연산을 수행하기 어렵다.

따라서 이미지의 크기를 **일정한 규격으로 통일**하는 과정이 필요하다.

예를 들어 크기가 서로 다른 이미지들을 모두 224×224 픽셀로 변환하여 모델에 입력할 수 있다.

**이미지 크기를 통일하는 이유**

- 모델의 입력 규격을 맞추기 위해
- 이미지 데이터를 일관된 형태로 처리하기 위해
- 학습 및 연산 과정을 효율적으로 수행하기 위해

이미지 크기를 조정할 때는 단순히 늘리거나 줄이는 것 외에도 비율을 유지하면서 여백을 추가하거나 일부 영역을 잘라내는 방법을 사용할 수 있다.

**2) 채널 변환**

이미지는 색상 정보를 표현하는 채널(Channel)로 구성된다.

대표적으로 **흑백 이미지와 컬러 이미지**가 있다.

| 구분 | 채널 수 | 특징 |
| --- | --- | --- |
| 흑백 이미지 | 1채널 | 밝기 정보만 사용 |
| 컬러 이미지 | 3채널 | RGB 또는 BGR 색상 정보 사용 |

컬러 이미지는 일반적으로 3개의 채널을 사용하기 때문에 동일한 해상도의 흑백 이미지보다 데이터의 양이 많다.

반면 흑백 이미지는 1개의 채널만 사용하므로 컬러 이미지를 흑백으로 변환하면 **픽셀 데이터의 양을 약 1/3로 줄일 수 있다.**

색상 정보가 중요하지 않거나 사물의 윤곽선(Edge), 형태 등을 중심으로 분석하는 경우 흑백 이미지를 활용할 수 있다.

다만 채널 수가 줄어든다고 모든 모델의 연산량이 정확히 1/3로 감소하는 것은 아니다.

또한 색상이 중요한 분류 작업에서는 흑백 변환으로 인해 필요한 정보가 손실될 수 있다.

#### 7. 컴퓨터 비전에 사용되는 주요 모델

컴퓨터 비전에서는 수행하려는 작업에 따라 다양한 딥러닝 모델을 활용한다.

대표적인 작업에는 **이미지 분류, 객체 탐지, 이미지 분할**이 있다.

**1) CNN 기반 이미지 분류 모델 (VGG / ResNet)**

CNN(Convolutional Neural Network)은 이미지의 특징을 추출하는 데 특화된 신경망이다.

이미지의 모양, 윤곽선, 패턴 등의 특징을 학습하여 이미지를 분류한다.

대표적인 CNN 기반 모델에는 **VGG와 ResNet**이 있다.

- **VGG:**
- **ResNet:**

VGG와 ResNet은 이미지 분류뿐만 아니라 다른 컴퓨터 비전 모델에서 특징 추출을 담당하는 구조로도 사용된다.

**2) R-CNN 계열**

R-CNN(Region-based Convolutional Neural Network)은 **이미지 속 객체의 종류와 위치를 찾아내는 객체 탐지 모델**이다.

이미지에서 객체가 존재할 가능성이 높은 영역을 찾고, CNN을 통해 해당 영역의 특징을 분석한다.

대표적인 R-CNN 계열 모델은 다음과 같다.

- **R-CNN:**
- **Fast R-CNN:**
- **Faster R-CNN:**

R-CNN 계열은 객체의 종류뿐만 아니라 이미지 내 위치까지 파악할 수 있다는 특징이 있다.

**3) SSD (Single Shot MultiBox Detector)**

SSD는 이미지 속 객체의 **종류와 위치를 한 번의 신경망 처리 과정에서 예측하는 객체 탐지 모델**이다.

R-CNN 계열과 달리 별도의 후보 영역 생성 단계를 거치지 않고 객체의 위치와 종류를 예측한다.

이러한 구조로 인해 빠른 객체 탐지가 가능하며, 실시간 영상 분석 등에 활용할 수 있다.

**4) U-Net**

U-Net은 이미지의 각 픽셀이 어떤 영역에 속하는지 구분하는 **이미지 분할(Image Segmentation) 모델**이다.

이미지 전체에 하나의 분류 결과를 부여하는 것이 아니라 픽셀 단위로 영역을 분류한다.

특히 정확한 영역 구분이 필요한 의료 영상 분석 등에 활용된다.

#### 8. R-CNN 알아보기

R-CNN은 이미지에서 객체가 존재할 가능성이 높은 영역을 찾은 뒤 CNN을 활용하여 객체의 종류와 위치를 분석하는 모델이다.

R-CNN의 동작 과정은 크게 **후보 영역 선정 → 특징 추출 → 분류 및 위치 조정**의 3단계로 이루어진다.

**1) 후보 영역 선정 (Region Proposal)**

먼저 이미지에서 객체가 존재할 가능성이 높은 영역을 탐색한다.

이때 **Selective Search**와 같은 알고리즘을 사용하여 객체가 있을 것으로 예상되는 영역을 사각형 박스(Bounding Box) 형태로 선정한다.

이렇게 선정된 영역을 후보 영역(Region Proposal)이라고 한다.

**2) 특징 추출 (Feature Extraction)**

선정된 후보 영역을 잘라낸 뒤 CNN에 입력하여 이미지의 특징을 추출한다.

CNN은 이미지의 윤곽선, 형태, 패턴 등의 정보를 분석하고 이를 **특징 벡터(Feature Vector)**로 변환한다.

특징 벡터는 이미지의 주요 특징을 숫자로 표현한 데이터이다.

CNN 기반 특징 추출 모델로는 VGG, ResNet 등의 구조를 활용할 수 있다.

**3) 분류 및 위치 조정 (Classification & Bounding Box Regression)**

추출한 특징 벡터를 이용하여 해당 영역에 어떤 객체가 존재하는지 분류한다.

원래의 R-CNN에서는 SVM(Support Vector Machine)을 이용해 객체를 분류하며, 별도의 회귀 모델을 사용하여 객체를 감싸는 박스의 위치와 크기를 조정한다.

이후 발전된 R-CNN 계열에서는 완전연결층 등을 이용해 분류와 위치 예측을 수행한다.

이를 통해 모델은 **객체의 종류와 이미지 속 위치**를 함께 예측할 수 있다.

#### 8. 실습

#### 1. 모델 불러오기

```python
import torch
import torchvision
from PIL import Image
import torchvision.transforms as T
import matplotlib.pyplot as plt
import numpy as np

# 사전 학습된 Faster R-CNN 모델 불러오기 (ResNet-50 FPN 백본 사용)
model = torchvision.models.detection.fasterrcnn_resnet50_fpn(
    weights=torchvision.models.detection.FasterRCNN_ResNet50_FPN_Weights.DEFAULT
)
model.eval()  # 평가 모드 전환
```

**설명:** 물체 탐지에 필요한 라이브러리를 불러온다. fasterrcnn_resnet50_fpn()은 이미 학습된 Faster R-CNN 모델을 가져오는 코드다. model.eval()은 모델을 학습이 아닌 이미지 분석용으로 전환한다.

#### 2. 이미지 불러오기

```python
# 코랩 파일 업로드 기능을 쓰거나 URL 이미지를 바로 불러올 수 있음.
import urllib
url = "https://media.istockphoto.com/id/1029265614/photo/black-cat-lying-on-the-grass-in-the-garden-against-purple-flowers.jpg?s=170667a&w=0&k=20&c=Zr9U6W5VTxPWgDKCzoMeemPP61CdZEDYqsAmR4fayVo=" # 고양이 예시 이미지
image_path, _ = urllib.request.urlretrieve(url, "test.jpg")

image = Image.open(image_path).convert("RGB")
transform = T.Compose([T.ToTensor()])
img_tensor = transform(image)

display(image)
```

**설명:** URL의 이미지를 test.jpg로 저장한 뒤 RGB 이미지로 연다. ToTensor()는 이미지를 모델에 입력할 수 있는 숫자 형태로 변환한다. display(image)로 원본 이미지를 확인한다.

![Computer vision study image](/study-assets/computer-vision-study-3-09.png)

#### 3. 물체 탐지 실행

```python
# 모델에 이미지 입력 (배치 차원 추가)
with torch.no_grad():
    predictions = model([img_tensor])

pred = predictions[0]
print("탐지된 객체 수:", len(pred['boxes']))
```

**설명:** 이미지를 모델에 넣어 탐지 결과를 얻는다. torch.no_grad()는 분석 중 학습용 기울기를 계산하지 않게 한다. 결과에는 물체의 위치(boxes), 확신 점수(scores), 종류 번호(labels)가 들어 있다. 출력하는 객체 수에는 확신 점수가 낮은 결과도 포함된다.

#### 4. 탐지 위치 표시

```python
fig, ax = plt.subplots(figsize=(10, 10))
ax.imshow(image)

# 신뢰도(score)가 0.5 이상인 박스만 시각화
for box, score, label in zip(pred['boxes'], pred['scores'], pred['labels']):
    if score > 0.5:
        box = box.detach().numpy()
        rect = plt.Rectangle((box[0], box[1]), box[2]-box[0], box[3]-box[1],
                             linewidth=2, edgecolor='red', facecolor='none')
        ax.add_patch(rect)

plt.axis('off')
plt.show()
```

**설명:** 확신 점수가 0.5보다 높은 물체만 골라 이미지 위에 빨간 사각형을 그린다. box의 네 값은 [x1, y1, x2, y2]로, 사각형의 왼쪽 위와 오른쪽 아래 좌표를 나타낸다.

![Computer vision study image](/study-assets/computer-vision-study-3-10.png)

#### 5. 분석 결과 출력

```python
# COCO 데이터셋 기준 라벨 이름 (Faster R-CNN 기본 모델이 학습한 91개 클래스 중 일부)
COCO_INSTANCE_CATEGORY_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag',
    'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite',
    'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana',
    'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table',
    'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock',
    'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

print("--- [이미지 분석 결과 리포트] ---")
for box, score, label in zip(pred['boxes'], pred['scores'], pred['labels']):
    if score > 0.5:  # 신뢰도 50% 이상인 것만 출력
        class_name = COCO_INSTANCE_CATEGORY_NAMES[label.item()]
        print(f"인식된 물체: {class_name} | 확신 점수(Score): {score.item():.4f}")
        print(f"정밀 박스 좌표 [x1, y1, x2, y2]: {box.detach().numpy()}")
        print(label.item()) #리스트에서 +1된 걸 가리키는 경우 때문에 숫자로 대신함. 고양이가 17번.
```

**설명:** 확신 점수가 0.5보다 높은 결과에 대해 물체 이름, 확신 점수, 박스 좌표, 라벨 번호를 출력한다. 확신 점수는 모델이 그 탐지 결과를 얼마나 확신하는지 나타내며, 1에 가까울수록 높다. 마지막 숫자 출력은 물체 이름과 별개로 모델이 반환한 라벨 번호를 확인하기 위한 것이다.

---

[Tistory 원문 보기 · 컴퓨터비전 복습 및 모델 사용](https://leeparang10.tistory.com/38)
