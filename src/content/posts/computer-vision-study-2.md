---
title: IRIS - Computer Vision Study · 2차시
published: 2026-08-02
description: Computer vision practice
tags: [Computer Vision, AI, IRIS, Study]
category: Notes
---

#### 1. 사용 라이브러리

OpenCV (cv2)
이미지를 읽고, 자르고, 크기 조절 및 보정하는 등 이미지 처리와 조작에 사용

Matplotlib (plt)
처리한 이미지를 화면에 출력하고 데이터를 시각적으로 표현하는 데 사용

#### 2. 이미지 불러오기

!wget -O image.jpg 이미지 링크
원하는 이미지를 불러올 수 있습니다.

(1) 이미지 출력 준비

plt.imread()
(2) 이미지 출력

plt.imshow()

![Study image](/study-assets/computer-vision-study-2-1.png)

#### 3. 이미지에 효과 적용하기

(1) 흑백

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
아까 불러온 이미지에 흑백 처리를 할 수 있습니다.

![Study image](/study-assets/computer-vision-study-2-2.png)

(2) 블러

blurred = cv2.GaussianBlur(gray, (필터, 크기), 0) // 0 부분은 표준 편차인데 0으로 설정하면 자동으로 설정해준다.

![Study image](/study-assets/computer-vision-study-2-3.png)

사진이 흐려진 것을 확인할 수 있다.

(3) 엣지 따기

edges = cv2.Canny(gray, 상한값,하한값)

![Study image](/study-assets/computer-vision-study-2-4.png)

이런 식으로 선이 따지는 것을 볼 수 있다.

(4) 이미지 크기 재설정

resized = cv2.resize(image, (크기, 크기)) // 가로 , 세로

![Study image](/study-assets/computer-vision-study-2-5.png)

이미지의 크기를 바꿀 수 있는 것을 확인할 수 있다.

(5) 색 반전

inverted = 255 - image //(픽셀 최대값) - (현재값)

![Study image](/study-assets/computer-vision-study-2-6.png)

이렇게 사진의 색이 반전되는 것을 볼 수 있다.

(6) 좌우 반전

flipped = np.fliplr(image)

![Study image](/study-assets/computer-vision-study-2-7.png)

이미지가 좌우 반전 된 것을 확인할 수 있다.

(7) 이미지 밝게 만들기

brighter = np.clip(image * 밝기값, 0, 255).astype(np.uint8)
곱해지는 밝기 값이 핵심이다.

![Study image](/study-assets/computer-vision-study-2-8.png)

이미지가 밝아진 것을 확인 할 수 있다.

(8) 모자이크 처리하기

h, w = image.shape[:2]
mosaic = cv2.resize(cv2.resize(image, (w // 10, h // 10)), (w, h), interpolation=cv2.INTER_NEAREST)
이미지를 모자이크 처리하는 코드이다.

![Study image](/study-assets/computer-vision-study-2-9.png)

이렇게 모자이크 처리 된 것을 확인할 수 있다.

(9) 제목 달기

plt.imshow(image)
plt.title("영어로 작성")
plt.axis('off') # 테두리 축 숨기기
plt.show()

![Study image](/study-assets/computer-vision-study-2-10.png)

상단에 적은 제목이 뜬다.

---

[Original post on Tistory](https://leeparang10.tistory.com/31)
