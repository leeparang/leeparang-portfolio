---
title: IRIS - Computer Vision Study · 7차시
published: 2026-08-07
description: CNN fundamentals and image classification practice
tags: [Computer Vision, AI, CNN, IRIS, Study]
category: Notes
---

#### **1. 컴퓨터는 사진을 어떻게 볼까?**

컴퓨터는 이미지를 사람처럼 직접 인식하는 것이 아니라 숫자 데이터로 처리한다.

이미지는 수많은 픽셀(Pixel)로 구성되어 있으며, 각 픽셀에는 밝기나 색상을 나타내는 숫자가 저장되어 있다.

**(1) 픽셀이란?**

- 이미지를 구성하는 가장 작은 점

- 각 픽셀에는 밝기 또는 색상 정보가 저장됨.

- 여러 픽셀이 모여 하나의 이미지를 구성함.

**(2) 컴퓨터의 이미지 인식**

사람이 보는 이미지: 고양이 사진

컴퓨터가 보는 이미지: 숫자로 이루어진 배열

![Study image](/study-assets/computer-vision-study-7-1.png)

각 숫자는 픽셀의 밝기 정보를 나타낸다 &rarr; CNN은 이러한 숫자 데이터를 분석하여 이미지의 특징을 찾아낸다.

#### **2. CNN의 기본 구조**

CNN은 이미지에서 특징을 추출하는 부분과 추출한 특징을 이용하여 최종 결과를 판단하는 부분으로 구성된다.

**(1) 입력 이미지(Input Image)**

분석할 사진을 CNN에 입력하는 단계이다.

**(2) 합성곱층(Convolution Layer)**

필터를 이용하여 이미지의 선, 모서리, 형태 등의 특징을 추출한다.

**(3) 풀링층(Pooling Layer)**

특징 맵의 크기를 줄여 중요한 정보를 요약하고 계산량을 감소시킨다.

**(4) 완전연결층(Fully Connected Layer)**

추출한 특징들을 종합하여 이미지가 어떤 종류인지 최종적으로 판단한다.

**전체 처리 과정**

입력 이미지 &rarr; 합성곱층 &rarr; 풀링층 &rarr; 완전연결층 &rarr; 분류 결과

※ 실제 CNN에서는 여러 합성곱층과 풀링층을 반복하여 사용할 수 있으며, 완전연결층에 전달하기 전에 평탄화 과정을 거칠 수 있다.

#### **3. 합성곱(Convolution)**

합성곱은 필터를 이미지 위에서 조금씩 이동시키면서 숫자를 계산하는 과정이다.

이미지의 각 영역에 필터를 적용하여 특정 특징이 얼마나 강하게 나타나는지 계산한다.

**(1) 합성곱 처리 과정**

- 입력 이미지에 필터를 겹친다.

- 겹쳐진 영역의 숫자들을 계산한다.

- 계산 결과를 새로운 배열에 저장한다.

- 필터를 다음 위치로 이동한다.

- 모든 영역에 반복하여 적용한다.

**(2) 합성곱의 결과**

합성곱 연산을 수행하면 새로운 숫자 배열이 만들어지며, 이를 특징 맵(Feature Map)이라고 한다.

입력 이미지 &rarr; 필터 적용 &rarr; 합성곱 계산 &rarr; 특징 맵 생성

&rarr; 합성곱은 CNN에서 이미지의 특징을 추출하는 핵심 연산이다.

#### **4. 풀링(Pooling)**

풀링은 특징 맵의 크기를 줄이면서 중요한 정보를 요약하는 과정이다.

합성곱 연산을 통해 만들어진 특징 맵에 적용하여 데이터의 양과 계산량을 줄인다.

**(1) 풀링의 목적**

- 특징 맵의 크기 축소

- 계산량 감소

- 중요한 특징 요약

- 이미지의 작은 위치 변화에 대한 민감도 감소에 도움

**(2) 풀링의 종류**

대표적인 풀링 방식에는 두 가지가 있다.

- 최대 풀링(Max Pooling): 영역에서 가장 큰 값 선택

- 평균 풀링(Average Pooling): 영역의 평균값 계산

#### **5. 최대 풀링(Max Pooling)**

최대 풀링은 일정한 영역에서 가장 큰 숫자 하나만 선택하는 방식이다.

![Study image](/study-assets/computer-vision-study-7-2.png)

**(1) 최대 풀링의 과정**

- 특징 맵을 작은 영역으로 나눈다.

- 각 영역에서 가장 큰 값을 찾는다.

- 최댓값만 남겨 새로운 특징 맵을 생성한다.

#### **6. 평균 풀링(Average Pooling)**

평균 풀링은 일정한 영역에 포함된 숫자들의 평균값을 계산하는 방식이다.

![Study image](/study-assets/computer-vision-study-7-3.png)

**(1) 평균 풀링의 과정**

- 특징 맵을 작은 영역으로 나눈다.

- 각 영역의 숫자를 모두 더한다.

- 숫자의 개수로 나누어 평균을 계산한다.

- 평균값을 새로운 특징 맵에 저장한다.

**(2) 최대 풀링과 평균 풀링 비교**

| 구분 | 최대 풀링 | 평균 풀링 |
| --- | --- | --- |
| 계산 방식 | 최댓값 선택 | 평균값 계산 |
| 특징 | 강한 특징 유지 | 전체적인 특징 요약 |
| 결과 | 영역의 최댓값 | 영역의 평균값 |

#### **7. 평탄화(Flatten)**

평탄화는 여러 행과 열로 이루어진 특징 맵을 하나의 긴 숫자 배열로 변환하는 과정이다.

CNN에서 추출한 특징을 완전연결층에 전달하기 위해 사용한다.

![Study image](/study-assets/computer-vision-study-7-4.png)

**(1) 평탄화의 특징**

- 다차원 특징 맵을 1차원 벡터로 변환

- 특징값을 한 줄로 정리

- 완전연결층에서 사용할 수 있도록 데이터 형태 변경

&rarr; 평탄화는 추출한 특징을 최종 분류 단계에 전달하기 위한 데이터 변환 과정이다.

#### **8. 순전파(Forward Propagation)**

순전파는 입력 데이터가 신경망의 각 계층을 차례대로 통과하여 최종 예측 결과를 만드는 과정이다.

![Study image](/study-assets/computer-vision-study-7-5.png)

**(1) 순전파 과정**

- 이미지 입력

- 합성곱을 통한 특징 추출

- 풀링을 통한 특징 요약

- 평탄화를 통한 데이터 변환

- 최종 분류 결과 출력

입력 이미지 &rarr; 합성곱 &rarr; 풀링 &rarr; 평탄화 &rarr; 분류

**(2) 순전파 예시**

고양이 사진 입력 &rarr; 특징 분석 &rarr; 고양이일 확률 90% 예측

&rarr; 순전파는 입력 데이터를 이용하여 예측 결과를 생성하는 과정이다.

#### **9. 역전파(Backpropagation)**

역전파는 신경망의 예측 결과와 실제 정답의 차이를 이용하여 가중치를 조정하는 학습 과정이다.

![Study image](/study-assets/computer-vision-study-7-6.png)

**(1) 역전파 과정**

- 순전파를 통해 예측 결과 생성

- 예측 결과와 실제 정답 비교

- 오차 계산

- 오차를 줄이기 위한 가중치 조정

- 조정된 가중치로 다음 학습 진행

**(2) 역전파 예시**

- 입력 이미지: 고양이

- AI 예측: 강아지

- 실제 정답: 고양이

예측이 틀렸으므로 오차를 계산하고, 다음에는 더 정확하게 예측할 수 있도록 가중치를 조정한다.

**(3) 순전파와 역전파 비교**

| 구분 | 순전파 | 역전파 |
| --- | --- | --- |
| 목적 | 예측 결과 생성 | 오차를 줄이도록 학습 |
| 역할 | 입력 데이터를 이용한 계산 | 가중치 조정 |
| 특징 | 예측 수행 | 예측 성능 개선 |

&rarr; 순전파는 예측하는 과정이고, 역전파는 예측의 오차를 줄이기 위해 학습하는 과정이다.

#### **10. 에포크(Epoch)**

에포크는 전체 훈련 데이터를 한 번 학습하는 것을 의미한다.

CNN은 데이터를 반복적으로 학습하면서 가중치를 조정하고 성능을 개선한다.

![Study image](/study-assets/computer-vision-study-7-7.png)

**(1) 에포크의 개념**

1 Epoch = 전체 훈련 데이터를 한 번 학습

예시)

- 1 Epoch: 전체 학습 데이터 1회 학습

- 2 Epoch: 전체 학습 데이터 2회 학습

- 3 Epoch: 전체 학습 데이터 3회 학습

**(2) 반복 학습의 목적**

- 예측 오차 감소

- 가중치 조정

- 이미지 특징 학습

- 예측 성능 향상

반복 학습을 통해 성능이 개선될 수 있지만, 에포크를 늘린다고 항상 성능이 좋아지는 것은 아니다.

너무 많은 에포크를 한다면 과적합이 생길 수 있다.

#### **11. 실습**

**(1) 실습 환경 세팅**

```python
import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt
import numpy as np

print("TensorFlow 버전:", tf.__version__)
```

TensorFlow를 이용해 CNN 모델을 구현하기 위해 필요한 라이브러리를 불러오는 코드이다. TensorFlow는 딥러닝 모델의 생성과 학습에 사용되며, Keras의 layers와 models는 신경망의 층을 구성하고 모델을 만드는 데 사용된다. Matplotlib은 이미지와 학습 결과를 시각화하고, NumPy는 배열 및 수치 연산을 처리하는 역할을 한다. 마지막으로 현재 설치된 TensorFlow의 버전을 출력하여 실행 환경을 확인한다.

**(2) 데이터 준비 및 정규화**

```python
mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# [미션 1] 픽셀 값을 255.0으로 나누어 정규화하세요.
x_train, x_test = x_train / 255.0, x_test / 255.0

# [미션 2] CNN 입력을 위해 차원을 1차원 확장(np.newaxis)하세요.
x_train = x_train[..., np.newaxis]
x_test = x_test[..., np.newaxis]

print(f"학습 데이터 모양: {x_train.shape}")
print(f"테스트 데이터 모양: {x_test.shape}")

# 샘플 이미지 출력해보기
plt.figure(figsize=(5, 5))
for i in range(4):
    plt.subplot(2, 2, i + 1)
    plt.imshow(x_train[i].reshape(28, 28), cmap='gray')
    plt.title(f"Label: {y_train[i]}")
    plt.axis('off')
plt.tight_layout()
plt.show()
```

MNIST 손글씨 숫자 데이터셋을 불러와 학습 데이터와 테스트 데이터로 나누는 코드이다. 이미지의 픽셀 값은 0~255 범위이므로 255.0으로 나누어 0~1 사이의 값으로 정규화한다. 이후 CNN 모델에 입력할 수 있도록 np.newaxis를 사용해 채널 차원을 추가하여 이미지 데이터를 (28, 28, 1) 형태로 변환한다. 마지막으로 데이터의 크기를 확인하고, 학습 데이터 중 4개의 이미지를 출력하여 실제 손글씨 숫자와 정답 레이블을 시각적으로 확인한다.

![Study image](/study-assets/computer-vision-study-7-8.png)

**(3) CNN 모델 구축**

```python
model = models.Sequential([
    # 1. 특징 추출
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    # [미션 1] MaxPooling2D 레이어 작성 (2, 2)
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),

    # 2. 1차원 변환
    # [미션 2] Flatten 레이어 작성
    layers.Flatten(),

    # 3. 최종 분류
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.summary()
```

CNN 모델을 구성하여 손글씨 숫자 이미지의 특징을 추출하고 분류하는 코드이다. Conv2D 레이어는 이미지에서 선이나 모양 등의 특징을 추출하며, MaxPooling2D는 중요한 특징을 유지하면서 데이터의 크기를 줄인다. 이후 Flatten 레이어를 사용해 2차원 특징 데이터를 1차원으로 변환하고, Dense 레이어를 통해 숫자를 분류한다. 마지막 출력층에서는 softmax 함수를 사용하여 0부터 9까지 각 숫자일 확률을 계산한다. model.summary()를 통해 모델의 구조와 각 레이어의 출력 형태, 파라미터 수를 확인할 수 있다.

![Study image](/study-assets/computer-vision-study-7-9.png)

**(4) 모델 학습**

```python
# [미션 1] 학습 옵션 설정 (compile)
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# [미션 2] 모델 학습 실행 (fit, epochs=5)
history = model.fit(x_train, y_train, epochs=5,validation_data=(x_test, y_test))
```

CNN 모델의 학습 옵션을 설정하고 실제 학습을 진행하는 코드이다. optimizer='adam'은 학습 과정에서 모델의 가중치를 조정하는 최적화 알고리즘이며, loss='sparse_categorical_crossentropy'는 예측값과 실제 정답의 차이를 계산하는 손실 함수이다. metrics=['accuracy']는 모델의 정확도를 평가하는 데 사용된다. 이후 model.fit()을 통해 학습 데이터를 5번 반복 학습하고, 테스트 데이터를 이용해 매 학습 단계마다 모델의 성능을 확인한다. 학습 결과는 history에 저장된다.

![Study image](/study-assets/computer-vision-study-7-10.png)

**(5) 성능 평가 및 예측 테스트**

```python
# 테스트 데이터셋 평가
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f"\n테스트 데이터 최종 정확도: {test_acc * 100:.2f}%")

# 샘플 예측 시각화
sample_img = x_test[0]
prediction = model.predict(sample_img[np.newaxis, ...])
predicted_label = np.argmax(prediction)

plt.imshow(sample_img.reshape(28, 28), cmap='gray')
plt.title(f"Predicted: {predicted_label} (Actual: {y_test[0]})")
plt.axis('off')
plt.show()
```

학습이 완료된 CNN 모델의 성능을 평가하고 예측 결과를 시각화하는 코드이다. model.evaluate()를 사용하여 테스트 데이터에 대한 손실값과 정확도를 계산하고, 최종 정확도를 백분율로 출력한다. 이후 테스트 데이터에서 첫 번째 이미지를 선택하고 model.predict()를 통해 숫자를 예측한다. np.argmax()는 예측 확률이 가장 높은 숫자를 선택하는 역할을 한다. 마지막으로 Matplotlib을 이용해 손글씨 이미지를 출력하고, 모델의 예측값과 실제 정답을 비교하여 학습 결과를 확인한다.

![Study image](/study-assets/computer-vision-study-7-11.png)

---

[Tistory 원문 보기 · CNN 실습](https://leeparang10.tistory.com/42)
