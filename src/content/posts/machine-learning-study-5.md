---
title: IRIS - Machine Learning Study · 5차시
published: 2026-10-20
description: KNN을 활용한 손글씨 이미지 분류 실습 기록
tags: [Machine Learning, Image Classification, KNN, AI, IRIS, Study]
category: Notes
---

## 1. 필요한 라이브러리 불러오기

```python
from sklearn.datasets import load_digits # 손글씨
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
```

**코드 설명:**

- `load_digits`는 실습에 사용할 손글씨 숫자 데이터를 불러오는 함수다. 숫자 0부터 9까지의 이미지와 각 이미지의 정답이 함께 들어 있다.
- `train_test_split`은 데이터를 학습용과 테스트용으로 나눌 때 사용한다. 모델을 만든 뒤에는 학습에 사용하지 않은 데이터로 성능을 확인해야 한다.
- `KNeighborsClassifier`는 KNN 분류 모델을 만드는 도구다. KNN은 새로운 데이터와 가까운 학습 데이터들을 참고해 정답을 예측한다.
- `accuracy_score`는 모델이 맞힌 비율을 계산한다. 실제 정답과 예측 결과를 비교해 정확도를 구할 수 있다.
- `matplotlib.pyplot`은 이미지와 그래프를 화면에 표시하는 라이브러리다. 뒤에서 손글씨 이미지를 확인하고 K값별 정확도를 그릴 때 사용한다.

## 2. 손글씨 데이터의 크기 확인하기

```python
digits = load_digits()

x = digits.data # 8 x 8
y = digits.target # 정답

print(x.shape)
print(y.shape)
```

**코드 설명:**

- `load_digits()`를 실행하면 손글씨 숫자 데이터가 `digits`에 저장된다. 여기에는 이미지 데이터뿐 아니라 정답과 이미지 형태의 데이터도 포함되어 있다.
- `digits.data`는 모델에 입력할 이미지 데이터다. 이미지 한 장이 8×8 픽셀로 이루어져 있는데, 모델에 입력하기 쉽도록 64개의 숫자로 펼쳐져 있다.
- `digits.target`에는 각 이미지가 나타내는 실제 숫자가 저장되어 있다. 예를 들어 어떤 이미지가 숫자 3이라면 해당 정답 값은 3이다.
- `x.shape`의 출력 결과는 `(1797, 64)`다. 손글씨 이미지가 1,797장이고, 이미지마다 64개의 값이 있다는 뜻이다.
- `y.shape`의 출력 결과는 `(1797,)`다. 이미지 1,797장 각각에 대응하는 정답도 1,797개 있다는 것을 확인할 수 있다.

## 3. 첫 번째 손글씨 이미지 보기

```python
plt.imshow(digits.images[0],cmap='gray')
plt.title(f"label: {y[0]}")
plt.axis('off')
plt.show()
```

**코드 설명:**

- `digits.images[0]`은 데이터에 들어 있는 첫 번째 손글씨 이미지다. `digits.data[0]`과 달리 8×8 모양으로 저장되어 있어 바로 이미지로 표시할 수 있다.
- `plt.imshow()`는 숫자로 저장된 픽셀 데이터를 실제 이미지처럼 화면에 보여준다. 데이터를 눈으로 확인하면 모델이 어떤 자료를 학습하는지 이해하기 쉽다.
- `cmap='gray'`는 이미지를 흑백으로 표시한다는 뜻이다. 손글씨 숫자의 모양을 확인하는 데 적합하다.
- `plt.title(f"label: {y[0]}")`은 이미지 위에 첫 번째 데이터의 정답을 표시한다. 이렇게 하면 보이는 숫자와 데이터에 기록된 정답을 함께 확인할 수 있다.
- `plt.axis('off')`는 이미지 주변의 좌표축을 숨기고, `plt.show()`는 완성된 이미지를 출력한다.

## 4. 이미지의 실제 데이터 살펴보기

```python
print("이미지 1개 크기:", digits.images[0].shape)
print("X 데이터 1개:",x[0])
print("정답:",y[0])
```

**코드 설명:**

- 첫 번째 출력은 이미지 한 장의 크기를 보여준다. 결과인 `(8, 8)`은 가로 8칸, 세로 8칸으로 이루어진 이미지라는 뜻이다.
- 두 번째 출력인 `x[0]`은 같은 이미지를 64개의 숫자로 펼친 결과다. 이미지의 각 픽셀은 밝기를 나타내는 숫자 값으로 표현된다.
- 화면에서 볼 때는 손글씨 그림이지만, 모델은 그림 자체를 보는 것이 아니라 이 숫자 값들을 입력받아 비교한다.
- `digits.images[0]`과 `x[0]`은 서로 다른 이미지가 아니다. 같은 데이터를 각각 8×8 형태와 길이 64인 형태로 나타낸 것이다.
- 마지막 출력인 `y[0]`은 첫 번째 이미지의 정답이다. 실행 결과 첫 번째 이미지의 정답은 0으로 표시된다.

## 5. 학습 데이터와 테스트 데이터 나누기

```python
X_train, X_test, y_train, y_test = train_test_split( # 테스트 데이터 학습 데이터 구분
    x,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("학습 데이터:", X_train.shape)
print("테스트 데이터:", X_test.shape)
```

**코드 설명:**

- 모델의 성능을 확인하려면 데이터를 두 부분으로 나누어야 한다. `X_train`, `y_train`은 학습에 사용하고, `X_test`, `y_test`는 학습 후 성능을 확인하는 데 사용한다.
- `test_size=0.2`는 전체 데이터의 20%를 테스트용으로 지정한다는 뜻이다. 나머지 80%는 학습용 데이터가 된다.
- `random_state=42`는 데이터를 나눌 때 적용되는 무작위 과정을 고정한다. 같은 코드를 다시 실행해도 동일하게 나뉘므로 결과를 재현하기 쉽다.
- `stratify=y`는 숫자 0부터 9까지의 비율이 학습 데이터와 테스트 데이터에서 비슷하게 유지되도록 한다. 특정 숫자가 한쪽에 지나치게 몰리는 상황을 줄여 준다.
- 출력 결과 학습 데이터는 `(1437, 64)`, 테스트 데이터는 `(360, 64)`다. 즉, 1,437장의 이미지로 학습하고 360장으로 성능을 확인한다.

## 6. KNN 모델 학습시키기

```python
model = KNeighborsClassifier(n_neighbors=3)

model.fit(X_train,y_train)

print("모델 학습 완료!")
```

**코드 설명:**

- `KNeighborsClassifier()`를 이용해 손글씨 숫자를 분류할 KNN 모델을 만든다. 이 모델은 데이터 사이의 거리를 이용해 비슷한 사례를 찾는다.
- `n_neighbors=3`은 새로운 이미지의 숫자를 예측할 때 가장 가까운 학습 이미지 3개를 참고한다는 뜻이다.
- 가까운 이미지 3개의 정답 중 가장 많이 나타나는 숫자를 새로운 이미지의 예측 결과로 선택한다. 예를 들어 가까운 이미지의 정답이 2, 2, 7이라면 2로 예측한다.
- `model.fit(X_train, y_train)`은 학습 이미지와 그 정답을 모델에 전달한다. KNN은 이 데이터를 바탕으로 나중에 새로운 이미지와의 거리를 비교한다.
- 마지막의 `모델 학습 완료!`는 `fit()` 실행이 끝났음을 확인하기 위한 출력이다.

## 7. 테스트 데이터 예측하기

```python
pred = model.predict(X_test)
print(pred[:10])
```

**코드 설명:**

- `model.predict(X_test)`는 앞에서 학습시킨 모델에 테스트 이미지들을 입력한다. 모델은 이미지마다 0부터 9까지의 숫자 중 하나를 예측한다.
- `X_test`에는 360장의 이미지가 있으므로 `pred`에도 예측 숫자 360개가 저장된다. 예측 결과의 순서는 테스트 이미지의 순서와 같다.
- `pred[:10]`은 전체 예측 결과 중 앞의 10개만 출력한다. 모든 결과를 한 번에 보여주는 것보다 간단하게 예측값을 확인할 수 있다.
- 이 셀에서는 모델이 어떤 숫자를 예측했는지만 확인한다. 실제 정답과 비교해 얼마나 맞혔는지는 다음 셀에서 계산한다.
- 출력된 숫자 하나하나는 각각 `X_test`에 들어 있는 이미지 한 장에 대한 모델의 판단이다.

## 8. 모델의 정확도 계산하기

```python
acc = accuracy_score(y_test,pred)

print("accuracy:",acc)
print("정확도:",round(acc * 100,2), "%")
```

**코드 설명:**

- `y_test`에는 테스트 이미지의 실제 정답이, `pred`에는 모델이 예측한 숫자가 들어 있다. `accuracy_score()`는 두 값을 순서대로 비교한다.
- 정확도는 전체 테스트 데이터 중 올바르게 예측한 데이터의 비율이다. 예측을 많이 맞힐수록 1에 가까워진다.
- 이 노트북에서 출력된 `accuracy` 값은 약 0.9861이다. 이를 백분율로 바꾸면 약 **98.61%**가 된다.
- `acc * 100`은 비율을 퍼센트로 바꾸는 계산이고, `round(..., 2)`는 소수점 둘째 자리까지 표시하기 위한 코드다.
- 테스트 이미지 360장 중 355장을 올바르게 분류한 결과다. 다만 이 정확도는 이번에 나눈 테스트 데이터에서 측정한 값이다.

## 9. 이미지 한 장의 예측 결과 확인하기

```python
index = 0

plt.imshow(X_test[index].reshape(8,8),cmap='gray')
plt.axis('off')
plt.show()

answer = y_test[index]
predict = model.predict([X_test[index]])

print("정답:",answer)
print("예측:",predict)
```

**코드 설명:**

- `index = 0`은 테스트 데이터의 첫 번째 이미지를 확인하겠다는 뜻이다. 다른 이미지를 보고 싶다면 이 숫자를 변경하면 된다.
- `X_test[index]`는 64개의 값으로 펼쳐진 이미지 데이터다. `reshape(8,8)`로 모양을 바꾸면 다시 8×8 이미지로 표시할 수 있다.
- `answer = y_test[index]`에는 해당 이미지의 실제 정답을 저장한다. 화면에 보이는 숫자와 정답을 직접 비교할 수 있다.
- `model.predict([X_test[index]])`는 이미지 한 장을 모델에 입력해 숫자를 예측한다. 바깥의 대괄호는 모델에 이미지 한 장을 입력 데이터의 묶음으로 전달하기 위한 것이다.
- 이 셀의 실행 결과는 정답이 5, 예측이 `[5]`다. 예측 결과가 배열 형태로 출력되지만 그 안의 숫자 5가 실제 예측값이므로 모델이 맞힌 것이다.

## 10. 처음 5개 이미지의 예측 비교하기

```python
for i in range(5):
  plt.imshow(X_test[i].reshape(8,8), cmap = 'gray')
  plt.axis('off')
  plt.show()

  answer = y_test[i]
  predict = model.predict([X_test[i]]) [0]

  print("정답:",answer,"예측:",predict)
  print()
```

**코드 설명:**

- `for i in range(5)`는 i를 0부터 4까지 바꾸며 같은 작업을 다섯 번 반복한다. 따라서 테스트 이미지의 처음 5장을 차례대로 확인한다.
- 반복할 때마다 `reshape(8,8)`로 이미지의 모양을 복원하고, `plt.imshow()`로 화면에 보여준다.
- `y_test[i]`에서 실제 정답을 가져오고, `model.predict()`로 모델이 예측한 숫자를 구한다.
- 예측 코드 끝의 `[0]`은 예측 결과 배열에서 첫 번째 숫자만 꺼내기 위한 것이다. 덕분에 결과가 `[5]` 같은 배열 형태가 아니라 5처럼 출력된다.
- 노트북에 저장된 실행 결과에서는 처음 5개 이미지의 정답과 예측이 모두 일치했다. 이미지를 보면서 결과를 확인할 수 있다는 점이 이 셀의 장점이다.

## 11. 예측이 맞았는지 표시하기

```python
for i in range(10):
  answer = y_test[i]
  predict = model.predict([X_test[i]]) [0]

  plt.imshow(X_test[i].reshape(8,8), cmap = 'gray')
  plt.axis('off')
  plt.show()

  if answer == predict:
    print("정답:",answer,"예측:",predict, "good")
  else:
    print("정답:",answer,"예측:",predict, "bad")

  print()
```

**코드 설명:**

- 이번에는 `range(10)`을 사용해 테스트 이미지의 처음 10장을 확인한다. 앞의 셀보다 확인하는 이미지 수가 늘었다.
- 각 이미지의 실제 정답과 모델의 예측값을 구한 뒤, 이미지를 화면에 출력한다. 숫자 모양과 예측 결과를 함께 살펴볼 수 있다.
- `if answer == predict`는 정답과 예측이 같은지 검사한다. 조건이 참이면 모델이 해당 이미지를 올바르게 분류한 것이다.
- 정답을 맞혔을 때는 `good`, 틀렸을 때는 `bad`를 출력한다. 정답과 예측 숫자도 함께 출력하므로 어떤 결과였는지 바로 알 수 있다.
- 저장된 실행 결과에서는 확인한 10개 이미지가 모두 `good`으로 표시됐다. 이는 처음 10개에 대한 결과이며, 전체 정확도는 앞의 셀에서 계산한 98.61%다.

## 12. K값에 따른 정확도 비교하기

```python
k_list = [1,3,5,7]

for k in k_list:
  model = KNeighborsClassifier(n_neighbors=k)
  model.fit(X_train,y_train)

  pred = model.predict(X_test)
  acc = accuracy_score(y_test,pred)

  print("k=",k,"/정확도=",round(acc * 100,2), "%")
```

**코드 설명:**

- KNN에서 K는 예측할 때 참고하는 가까운 데이터의 개수다. 이 셀에서는 K를 1, 3, 5, 7로 바꾸면서 결과를 비교한다.
- 반복문은 `k_list`에 있는 값을 하나씩 가져온다. K값마다 새 모델을 만들고 같은 학습 데이터로 학습시킨다.
- 각 모델은 같은 테스트 데이터인 `X_test`를 예측한다. 이후 `accuracy_score()`로 실제 정답과 비교해 정확도를 계산한다.
- 실행 결과 K가 1일 때와 3일 때는 98.61%, K가 5일 때와 7일 때는 **98.33%**였다. 실험한 네 가지 K값 모두 높은 정확도를 보였다.
- K가 클수록 정확도가 항상 높아지는 것은 아니다. 이번 실습에서도 K를 3에서 5로 늘렸을 때 측정된 정확도가 조금 낮아졌다.

## 13. K값과 정확도를 그래프로 나타내기

```python
k_list = [1, 3, 5, 7]
accuracy_list = []

for k in k_list:
    model = KNeighborsClassifier(n_neighbors=k)
    model.fit(X_train, y_train)

    pred = model.predict(X_test)
    acc = accuracy_score(y_test, pred)

    accuracy_list.append(acc)

plt.plot(k_list, accuracy_list, marker='o')
plt.xlabel("K")
plt.ylabel("Accuracy")
plt.title("K value vs Accuracy")
plt.xticks(k_list)
plt.show()
```

**코드 설명:**

- `accuracy_list = []`는 K값마다 계산한 정확도를 저장하기 위한 빈 목록을 만든다.
- 반복문에서 K가 1, 3, 5, 7인 모델을 각각 학습시키고, 테스트 데이터의 정확도를 계산한다. 계산된 값은 `append()`를 사용해 목록에 순서대로 추가한다.
- `plt.plot(k_list, accuracy_list, marker='o')`는 K값을 가로축, 정확도를 세로축으로 하는 선 그래프를 그린다. `marker='o'`는 각 측정 지점을 동그라미로 표시한다.
- `xlabel`, `ylabel`, `title`은 각각 가로축 이름, 세로축 이름, 그래프 제목을 지정한다. `xticks(k_list)`는 가로축에 실험한 K값이 표시되도록 한다.
- 그래프를 통해 K가 1과 3일 때의 정확도가 같고, K가 5와 7일 때는 그보다 조금 낮다는 점을 한눈에 볼 수 있다.

## 마무리

이번 실습에서는 8×8 크기의 손글씨 숫자 이미지를 64개의 숫자 값으로 표현하고, 이를 이용해 KNN 모델을 만들었다. 학습에 사용하지 않은 테스트 이미지 360장으로 성능을 확인한 결과, K가 3일 때 **98.61%의 정확도**를 얻었다.

또한 K값을 1, 3, 5, 7로 바꾸어 비교하면서, 모델의 설정값에 따라 정확도가 달라질 수 있다는 점도 확인했다. 숫자로 출력한 결과를 이미지 및 그래프와 함께 살펴보니 모델이 어떤 데이터를 입력받고 어떻게 예측 결과를 내는지 더 쉽게 이해할 수 있었다.

[Tistory 원문 보기 · 머신러닝 5차시, 이미지 분류 실습](https://leeparang10.tistory.com/37)
