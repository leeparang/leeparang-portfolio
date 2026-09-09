---
title: IRIS - Computer Vision Study · 1차시
published: 2026-08-01
description: Computer vision fundamentals
tags: [Computer Vision, AI, IRIS, Study]
category: Notes
---

#### 1. 컴퓨터 비전이란?

컴퓨터 비전(Computer Vision)은 컴퓨터가 이미지나 비디오와 같은 시각적 데이터를 이해하고 처리할 수 있도록 하는 기술이다.

사람이 사진을 보고 고양이를 알아볼 때 눈, 코, 귀, 얼굴 형태 등의 특징을 이용하는 것처럼 컴퓨터도 이미지 속의 특징(Feature)을 분석하여 대상을 인식한다. 예를 들어 고양이를 인식할 때 뾰족한 두 귀, 둥근 얼굴, 눈의 위치와 같은 특징이 중요한 단서가 될 수 있다.

#### 2. 과거와 현재의 컴퓨터 비전

(1) 전통적인 컴퓨터 비전

딥러닝이 등장하기 전에는 사람이 이미지에서 필요한 특징을 직접 찾아내고, 이를 이용하는 수학적 알고리즘과 규칙을 만들어 컴퓨터에 적용했다.

대표적으로 이미지에서 픽셀 값이 급격하게 변하는 부분을 찾아 선(Edge)을 검출하는 방법 등이 사용되었다.

하지만 사람이 정해 놓은 규칙에 의존하기 때문에 이미지의 빛, 각도, 크기 등의 조건이 조금만 달라져도 인식 성능이 크게 떨어지는 한계가 있었다.

(2) 딥러닝 이후의 컴퓨터 비전

딥러닝이 발전하면서 컴퓨터 비전의 방식도 크게 달라졌다. 사람이 특징을 일일이 정해주는 대신 많은 이미지 데이터와 정답(Label)을 제공하면 모델이 데이터에서 스스로 특징과 규칙을 학습한다.

특히 CNN과 같은 딥러닝 모델은 여러 개의 층(Layer)을 거치면서 점점 복잡한 특징을 추출한다.

- 얕은 층(Low-level): 선, 모서리, 색상 변화 등

- 중간 층(Mid-level): 원, 질감, 눈&middot;코와 같은 부분적인 형태

- 깊은 층(High-level): 얼굴이나 자동차처럼 전체적인 의미

이렇게 여러 단계에서 추출한 정보를 바탕으로 최종적으로 이미지가 무엇인지 판단한다.

#### 3. 컴퓨터의 이미지 인식

컴퓨터의 이미지 인식 과정은 크게 세 단계로 볼 수 있다.

(1) 이미지 입력

컴퓨터는 이미지를 사람처럼 보는 것이 아니라 픽셀의 숫자 배열로 받아들인다.

(2) 특징 추출

딥러닝 모델이 이미지의 픽셀 정보를 분석하여 선, 모양, 질감 등 중요한 특징을 찾아낸다.

(3) 분류

추출한 특징을 바탕으로 여러 카테고리 중 어떤 것에 해당하는지 예측한다. 예를 들어 고양이 사진이라면 고양이일 확률이 가장 높다고 판단할 수 있다.

즉, 딥러닝을 이용한 컴퓨터 비전에서는 이미지 입력 -> 특징 추출 -> 분류의 과정을 모델이 학습을 통해 수행한다.

핵심은 컴퓨터가 스스로 과정을 진행한다는 것이다.

#### 4. 컴퓨터 이미지 인식의 활용

컴퓨터 비전은 목적에 따라 다양한 방식으로 활용된다.

- 이미지 분류
사진 전체가 무엇인지 판별한다.

![Study image](/study-assets/computer-vision-study-1.png)

- 객체 검출(Object Detection)
이미지 속 물체의 위치를 찾아 박스로 표시하면서 어떤 물체인지 함께 인식한다.

![Study image](/study-assets/computer-vision-study-2.png)

- 이미지 분할(Image Segmentation)
이미지의 픽셀 단위로 영역을 나누어 물체의 정확한 경계를 찾는다.

![Study image](/study-assets/computer-vision-study-3.png)

- 행동 인식(Action Recognition)
여러 프레임의 영상을 분석하여 사람이 어떤 행동을 하고 있는지 판단한다.

![Study image](/study-assets/computer-vision-study-4.png)

#### 5. 컴퓨터 비전에 사용되는 도구

컴퓨터 비전을 구현할 때 다양한 라이브러리와 프레임워크를 사용할 수 있다.

- OpenCV: 이미지와 영상을 처리하는 컴퓨터 비전 라이브러리

- ![Study image](/study-assets/computer-vision-study-5.jpg)

- PyTorch: 딥러닝 모델을 만들고 학습시키는 프레임워크

![Study image](/study-assets/computer-vision-study-6.jpg)

- NumPy: 이미지와 같은 수치 데이터를 배열로 처리하는 수치 연산 라이브러리

![Study image](/study-assets/computer-vision-study-7.png)

PyTorch 외에도 TensorFlow와 같은 딥러닝 프레임워크가 사용된다.

![Study image](/study-assets/computer-vision-study-8.png)

#### 6. 실생활 속 컴퓨터 비전

컴퓨터 비전은 이미 다양한 분야에서 활용되고 있다.

- 스마트폰의 얼굴 인식 잠금 해제 및 인물 사진 모드

![Study image](/study-assets/computer-vision-study-9.png)

- SNS의 카메라 필터

- ![Study image](/study-assets/computer-vision-study-10.jpg)

- 단속 카메라와 CCTV의 객체 및 이상 상황 감지 

![Study image](/study-assets/computer-vision-study-11.png)

- 자율주행 자동차의 주변 차량&middot;보행자 인식

![Study image](/study-assets/computer-vision-study-12.png)

- 산업 현장의 제품 불량 및 품질 검사

- 의료 영상 분석을 통한 의료진단 보조

![Study image](/study-assets/computer-vision-study-13.jpg)

#### 마무리

컴퓨터 비전은 컴퓨터가 이미지와 영상을 분석하여 사람처럼 시각적인 정보를 이해하고 판단할 수 있도록 하는 기술이다.

과거에는 사람이 특징과 규칙을 직접 설계해야 했지만, 딥러닝의 발전으로 많은 데이터와 레이블을 이용해 컴퓨터가 스스로 중요한 특징을 학습하는 방식으로 발전했다.

앞으로도 컴퓨터 비전은 자율주행, 의료, 보안, 제조업 등 다양한 분야에서 더욱 활용될 것으로 기대된다.

---

[Original post on Tistory](https://leeparang10.tistory.com/30)
