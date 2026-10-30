---
title: IRIS - Computer Vision Study · 5차시
published: 2026-08-05
description: Real-time object detection and confidence thresholds
tags: [Computer Vision, AI, YOLO, IRIS, Study]
category: Notes
---

#### **1. 신뢰도 임계값이란?**

AI 모델이 예측한 결과를 **최종 결과로 인정할지, 버릴지 결정하는 기준값**이다.

- 범위: **0~1**

- 객체 탐지 모델에서는 **0.25**를 자주 사용함.

- 예측 결과를 걸러내는 **필터 역할**을 함.

**(1) 예시**

신뢰도 임계값이 **0.25**일 때

| 예측 결과 | 신뢰도 | 최종 판단 |
| --- | --- | --- |
| 고양이 | 0.90 | 유지 |
| 강아지 | 0.65 | 유지 |
| 자동차 | 0.30 | 유지 |
| 사람 | 0.15 | 제거 |

→ **임계값을 초과하는 예측 결과만 유지한다.**

**(2) 임계값에 따른 차이**

| 구분 | 임계값 높음 ⬆️ | 임계값 낮음 ⬇️ |
| --- | --- | --- |
| 판단 기준 | 엄격함 | 관대함 |
| 정밀도(Precision) | 대체로 증가 | 대체로 감소 |
| 재현율(Recall) | 감소 | 증가 |
| 오탐(False Positive) | 감소 | 증가 |
| 실제 객체를 놓칠 가능성 | 증가 | 감소 |

※ 정밀도의 변화는 데이터에 따라 달라질 수 있음.

![Study image](/study-assets/computer-vision-study-5-1.png)

#### **2. 실습1**

**(1) Ultralytics 라이브러리 설치**

```python
!pip -q install ultralytics
```

**코드 설명**

`ultralytics`는 YOLO 객체 탐지 모델을 실행하는 데 필요한 라이브러리입니다. `!`는 Colab에서 터미널 명령을 실행한다는 뜻이고, `-q`는 설치 과정의 출력 메시지를 줄입니다.

**(2) 필요한 라이브러리 불러오기**

```python
from ultralytics import YOLO
from google.colab import files
from PIL import Image
from IPython.display import display
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
```

**코드 설명**

`YOLO`는 객체 탐지 모델을 불러오고, `files`는 이미지 업로드에 사용합니다. `pandas`는 결과를 표로 정리하고, `matplotlib.pyplot`은 탐지 결과를 이미지로 보여줍니다. `Path`는 파일 확장자를 확인합니다. `display`는 완성된 표를 화면에 출력합니다.
Image도 불러왔지만 아래 코드에서는 직접 사용하지 않습니다.

**(3) YOLO 모델 및 신뢰도 임계값 설정**

```python
model = YOLO("yolo11n.pt")

CONFIDENCE_THRESHOLD = 0.3
print("모델 준비 완료")
```

**코드 설명**

`YOLO("yolo11n.pt")`로 사전 학습된 YOLO11 nano 모델을 불러옵니다. `CONFIDENCE_THRESHOLD = 0.3`은 신뢰도 점수가 0.3 이상인 탐지 결과를 사용하도록 기준을 정한 것입니다.
두 이미지에 같은 모델과 임계값을 적용해야 탐지 결과를 같은 조건에서 비교할 수 있습니다.

**(4) 비교할 이미지 2장 업로드**

```python
uploaded = files.upload()

image_paths = [
    name for name in uploaded.keys()
    if Path(name).suffix.lower() in [".jpg", ".png", ".jpeg"]
]

if len(image_paths) != 2:
    raise ValueError("이미지 파일을 정확히 2장 업로드해 주세요.")

image_A_path, image_B_path = image_paths
print("이미지 A:", image_A_path)
print("이미지 B:", image_B_path)
```

**코드 설명**

`files.upload()`로 이미지를 업로드합니다. 업로드한 파일 중 JPG, PNG, JPEG 파일만 선택하고, 이미지가 정확히 2장인지 확인합니다. 조건에 맞지 않으면 오류를 표시합니다.
선택한 두 파일의 이름을 image_A_path와 image_B_path에 저장합니다.

**(5) 두 이미지의 객체 탐지 실행**

```python
results_A = model(
    source=image_A_path,
    conf=CONFIDENCE_THRESHOLD,
    verbose=False
)[0]

results_B = model(
    source=image_B_path,
    conf=CONFIDENCE_THRESHOLD,
    verbose=False
)[0]

print("탐지 완료")
```

**코드 설명**

동일한 YOLO 모델을 이미지 A와 B에 각각 적용합니다. `source`에는 분석할 이미지 경로를 넣고, `conf`에는 앞에서 정한 신뢰도 임계값을 적용합니다. `verbose=False`는 자세한 실행 로그를 생략합니다.
모델이 반환한 결과 목록에서 [0]으로 해당 이미지의 탐지 결과를 꺼내 results_A, results_B에 저장합니다.

**(6) 객체 탐지 결과 시각화**

```python
def show_result(result, title):
    plotted = result.plot()
    plotted_rgb = plotted[:, :, ::-1]

    plt.figure(figsize=(10, 6))
    plt.imshow(plotted_rgb)
    plt.title(title)
    plt.axis("off")
    plt.show()

show_result(results_A, "A: Background 1")
show_result(results_B, "B: Background 2")
```

**코드 설명**

`result.plot()`은 탐지된 객체의 바운딩 박스와 정보를 이미지에 그립니다. `plotted[:, :, ::-1]`은 이미지의 색상 채널 순서를 BGR에서 RGB로 바꿔 matplotlib에서 올바른 색으로 표시하도록 합니다.
`show_result()` 함수를 두 번 호출해 이미지 A와 B의 탐지 결과를 각각 보여줍니다. **바운딩 박스**는 탐지된 객체의 위치와 크기를 나타내는 사각형입니다.

**(7) 탐지 결과를 표로 정리하기**

```python
# 탐지된 객체와 신뢰도를 표로 정리
def result_to_rows(result, image_label):
    rows = []
    names = result.names

    if result.boxes is None or len(result.boxes) == 0:
        return [{
            "이미지": image_label,
            "탐지 객체": "탐지 없음",
            "신뢰도": None,
            "중심 x": None,
            "중심 y": None,
            "너비": None,
            "높이": None
        }]

    for box in result.boxes:
        class_id = int(box.cls.item())
        confidence = float(box.conf.item())
        x1, y1, x2, y2 = box.xyxy[0].tolist()

        rows.append({
            "이미지": image_label,
            "탐지 객체": names[class_id],
            "신뢰도": round(confidence, 3),
            "중심 x": round((x1 + x2) / 2, 1),
            "중심 y": round((y1 + y2) / 2, 1),
            "너비": round(x2 - x1, 1),
            "높이": round(y2 - y1, 1)
        })

    return rows

rows = (
    result_to_rows(results_A, "A: 배경 1")
    + result_to_rows(results_B, "B: 배경 2")
)

comparison_df = pd.DataFrame(rows)
display(comparison_df)
```

**코드 설명**

`result_to_rows()`는 탐지 결과를 표에 넣을 수 있는 데이터로 바꿉니다. 탐지된 객체가 없으면 **탐지 없음**이라는 행을 만듭니다.

객체가 있으면 box.cls에서 객체 종류, box.conf에서 신뢰도, box.xyxy에서 바운딩 박스의 네 좌표를 가져옵니다. 좌표 x1, y1은 왼쪽 위, x2, y2는 오른쪽 아래를 뜻합니다.

중심 좌표는 양 끝 좌표의 평균으로 계산하고, 너비와 높이는 양 끝 좌표의 차이로 계산합니다. 마지막으로 두 이미지의 결과를 합쳐 comparison_df 표로 출력합니다. 원문에서 A와 B의 배경 표기가 앞 단계와 달라, 여기서는 **A: 배경 1**, **B: 배경 2**로 통일했습니다.

**(8) 실습 결과 비교 및 분석**

![Study image](/study-assets/computer-vision-study-5-2.png)

모두 임계값 0.3을 넘었다.

**(9) 실습 결론**

동일한 YOLO 모델과 신뢰도 임계값으로 이미지 2장을 분석한 결과, 두 이미지 모두 고양이가 탐지되었습니다. 다만 신뢰도 점수와 바운딩 박스의 위치·크기에는 차이가 있었습니다.

이 실습을 통해 같은 종류의 객체라도 이미지 조건에 따라 탐지 결과가 달라질 수 있음을 확인했습니다.

#### **3. 실습2**

**(1) MediaPipe 설치하기**

```python
%pip install mediapipe==0.10.35
```

**코드 설명**

손의 관절 위치를 인식하는 `mediapipe` 라이브러리의 0.10.35 버전을 설치합니다. `%pip`은 현재 Colab 노트북 환경에 패키지를 설치하는 명령입니다.

**(2) 필요한 라이브러리 불러오기**

```python
import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
import random
import urllib.request
from pathlib import Path
from google.colab import files
from IPython.display import display
from google.colab.patches import cv2_imshow

print("MediaPipe 버전:", mp.__version__)
print("Python 환경 준비 완료")
```

**코드 설명**

`cv2`는 영상을 읽고, `mediapipe`는 손을 인식합니다. `numpy`는 이미지 배열 처리, `pandas`는 분석 결과를 표로 정리할 때 사용합니다. `random`은 컴퓨터의 가위바위보 선택에 쓰입니다.
urllib.request와 Path는 손 인식 모델을 다운로드하고 파일 상태를 확인하는 데 사용합니다. files는 Colab에 영상을 업로드하고, display는 결과 표를 보여줍니다. 마지막 두 줄은 MediaPipe 버전과 준비 완료 메시지를 출력합니다. cv2_imshow는 불러왔지만 이 노트북의 이후 코드에서는 사용하지 않습니다.

**(3) 영상 파일 불러오기**

```python
uploaded = files.upload()
video_paths = [
    name for name in uploaded.keys()
    if Path(name).suffix.lower() in [".mp4", ".mov", ".avi", ".m4v"]
]
if not video_paths:
    raise ValueError("영상 파일(.mp4, .mov, .avi, .m4v)을 업로드해 주세요.")

video_path = video_paths[0]
print("선택한 영상:", video_path)
```

**코드 설명**

`files.upload()`로 분석할 영상을 Colab에 업로드합니다. 업로드한 파일 중 확장자가 `.mp4`, `.mov`, `.avi`, `.m4v`인 파일만 골라냅니다.
영상 파일이 없으면 오류 메시지를 표시합니다. 여러 영상을 올렸다면 첫 번째 영상만 video_path에 저장해 분석 대상으로 사용합니다.

**(4) 손 인식 모델 불러오기**

```python
MODEL_PATH = "/content/hand_landmarker.task"
MODEL_URL = (
    "https://storage.googleapis.com/mediapipe-models/"
    "hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
)

# 파일이 없거나 너무 작으면 다시 다운로드
if not Path(MODEL_PATH).exists() or Path(MODEL_PATH).stat().st_size < 1_000_000:
    if Path(MODEL_PATH).exists():
        Path(MODEL_PATH).unlink()
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)

model_size =Path(MODEL_PATH).stat().st_size
print("모델 경로:", MODEL_PATH)
print("모델 크기:", f"{model_size:,}", "bytes")

if model_size < 1_000_000:
    raise RuntimeError("모델 파일 크기가 너무 작습니다. 다운로드가 정상적으로 끝났는지 확인해 주세요.")
```

**코드 설명**

손의 관절 위치를 찾는 Hand Landmarker 모델의 저장 경로와 다운로드 주소를 지정합니다. 모델 파일이 없거나 크기가 100만 바이트보다 작으면 다시 다운로드합니다.
다운로드한 모델의 경로와 크기를 출력합니다. 파일 크기가 지나치게 작으면 다운로드가 제대로 끝나지 않았을 가능성이 있어 오류를 발생시킵니다.

**(5) 손 인식 옵션 설정하고 영상 정보 확인하기**

```python
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

BaseOptions = python.BaseOptions

options = vision.HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=vision.RunningMode.VIDEO,
    num_hands=2,
    min_hand_detection_confidence=0.2,
    min_hand_presence_confidence=0.2,
    min_tracking_confidence=0.2,
)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    raise ValueError("영상을 열 수 없습니다.")

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
if not fps or fps <= 0:
    fps = 30.0

print("FPS:", fps, "| 전체 프레임:", total_frames)
print("영상 길이(초):", round(total_frames / fps, 2))
cap.release()
```

**코드 설명**

앞에서 다운로드한 모델을 영상 분석 모드로 설정합니다. 한 화면에서 최대 두 손을 찾도록 하고, 손 검출·존재·추적 신뢰도 기준을 각각 0.2로 지정합니다.
이후 영상을 열어 FPS(초당 프레임 수)와 전체 프레임 수를 확인합니다. FPS를 읽을 수 없으면 30으로 계산합니다. 정보를 출력한 뒤 cap.release()로 영상 파일을 닫습니다.

**(6) 가위·바위·보 판별 함수 만들기**

```python
def classify_gesture(hand_landmarks):
    lm = hand_landmarks

    # 검지·중지·약지·새끼 손가락 끝과 관절의 y 좌표 (비교)
    finger_tips = [8, 12, 16, 20]
    finger_pips = [6, 10, 14, 18]

    extended = [
        lm[tip].y < lm[pip].y
        for tip, pip in zip(finger_tips, finger_pips)
    ]

    index_up, middle_up, ring_up, pinky_up = extended

    if not any(extended):
        return "바위"
    if all(extended):
        return "보"
    if index_up and middle_up and not ring_up and not pinky_up:
        return "가위"
    return "판정 불가"
```

**코드 설명**

검지·중지·약지·새끼손가락의 끝과 중간 관절의 세로 좌표를 비교해 각 손가락이 펴졌는지 판단합니다.
네 손가락이 모두 접혔으면 **바위**, 모두 펴졌으면 **보**, 검지와 중지만 펴졌으면 **가위**를 반환합니다. 어느 조건에도 해당하지 않으면 **판정 불가**로 처리합니다. 이 함수는 엄지손가락을 판정에 사용하지 않으며, 손이 많이 기울거나 회전하면 좌표 비교가 부정확할 수 있습니다.

**(7) 영상에서 손동작 분석하기**

```python
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    raise ValueError("영상을 열 수 없습니다.")

fps = cap.get(cv2.CAP_PROP_FPS)
if not fps or fps <= 0:
    fps = 30.0

sample_every = max(1, int(round(fps / 5)))
records = []
frame_index = 0
last_timestamp_ms = -1

with vision.HandLandmarker.create_from_options(options) as landmarker:
    while True:
        ok, frame = cap.read()
        if not ok:
            break

        if frame_index % sample_every == 0:
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(
                image_format=mp.ImageFormat.SRGB,
                data=np.ascontiguousarray(rgb)
            )

            timestamp_ms = int(frame_index * 1000 / fps)
            timestamp_ms = max(timestamp_ms, last_timestamp_ms + 1)
            last_timestamp_ms = timestamp_ms

            result = landmarker.detect_for_video(mp_image, timestamp_ms)
            timestamp = frame_index / fps
            hand_count = len(result.hand_landmarks) if result.hand_landmarks else 0

            if hand_count:
                # 한 프레임에서 첫 번째 검출 손을 분류
                gesture = classify_gesture(result.hand_landmarks[0])
            else:
                gesture = "손 미검출"

            records.append({
                "시간(초)": round(timestamp, 2),
                "판정 결과": gesture,
                "검출 손 수": hand_count
            })

        frame_index += 1

cap.release()

df = pd.DataFrame(records)
display(df.head(40))
print("분석한 프레임 수:", len(df))
if len(df):
    print("손이 검출된 프레임 수:", int((df["검출 손 수"] > 0).sum()))
    print("손 검출률:", f"{(df['검출 손 수'] > 0).mean() * 100:.1f}%")
```

**코드 설명**

영상을 다시 열고 초당 약 5개 프레임을 골라 분석합니다. 선택한 프레임을 MediaPipe에서 사용할 수 있도록 RGB 이미지로 변환합니다.
각 프레임에서 손을 검출한 뒤, 손이 있으면 앞에서 만든 함수로 첫 번째 손의 자세를 분류합니다. 손이 없으면 손 미검출**로 기록합니다. 분석 시간, 판정 결과, 검출한 손의 수를 표로 만들고 앞 40행과 손 검출률을 출력합니다. 두 손이 잡혀도 자세 판정에는 첫 번째 손만 사용합니다.

**(8) 연속된 손동작 구간 정리하기**

```python
VALID_GESTURES = ["가위", "바위", "보"]
MIN_FRAMES = 2

if not df.empty:
    valid = df[df["판정 결과"].isin(VALID_GESTURES)].copy()
else:
    valid = pd.DataFrame(columns=["시간(초)", "판정 결과"])

if not valid.empty:
    valid = valid.sort_values("시간(초)").reset_index(drop=True)
    valid["구간"] = (valid["판정 결과"] != valid["판정 결과"].shift()).cumsum()

    gestures = (
        valid.groupby("구간", sort=True)
        .agg(
            시작_시간=("시간(초)", "first"),
            종료_시간=("시간(초)", "last"),
            손동작=("판정 결과", "first"),
            프레임수=("판정 결과", "size")
        )
        .reset_index(drop=True)
    )
    gestures = gestures[gestures["프레임수"] >= MIN_FRAMES].reset_index(drop=True)
else:
    gestures = pd.DataFrame(
        columns=["시작_시간", "종료_시간", "손동작", "프레임수"]
    )

display(gestures)
print("인식된 동작 구간:", len(gestures))
if len(gestures) == 0:
    print("유효한 가위·바위·보 구간이 없습니다. 위 표의 손 검출률과 판정 결과를 확인하세요.")
```

**코드 설명**

분석 결과에서 **가위·바위·보**로 판정된 행만 남기고 시간순으로 정렬합니다. 앞 행과 다른 손동작이 나오면 새 구간으로 구분합니다.

구간별 시작 시간, 종료 시간, 손동작, 프레임 수를 계산한 뒤 최소 2개 프레임에서 확인된 구간만 인정합니다. 다만 **판정 불가**와 **손 미검출** 행을 먼저 제외하므로, 중간에 손 검출이 끊겨도 앞뒤 손동작이 같다면 하나의 구간으로 묶일 수 있습니다.

**(9) 컴퓨터와 가위바위보 결과 계산하기**

```python
choices = ["가위", "바위", "보"]

def judge(player, computer):
    if player == computer:
        return "무승부"
    if (
        (player == "가위" and computer == "보")
        or (player == "바위" and computer == "가위")
        or (player == "보" and computer == "바위")
    ):
        return "승리"
    return "패배"

game_rows = []
for _, row in gestures.iterrows():
    player = row["손동작"]
    computer = random.choice(choices)
    game_rows.append({
        "시간(초)": row["시작_시간"],
        "내 손동작": player,
        "컴퓨터": computer,
        "결과": judge(player, computer)
    })

game_df = pd.DataFrame(
    game_rows,
    columns=["시간(초)", "내 손동작", "컴퓨터", "결과"]
)
display(game_df)

if len(game_df):
    wins = int((game_df["결과"] == "승리").sum())
    ties = int((game_df["결과"] == "무승부").sum())
    losses = int((game_df["결과"] == "패배").sum())
    print("승리:", wins)
    print("무승부:", ties)
    print("패배:", losses)
    print("승률(무승부 제외):", f"{wins / max(1, wins + losses) * 100:.1f}%")
else:
    print("유효한 손동작을 찾지 못했습니다.")
```

**코드 설명**

인식된 손동작 구간마다 컴퓨터가 가위·바위·보 중 하나를 무작위로 고릅니다. `judge()` 함수가 내 손동작과 컴퓨터의 선택을 비교해 **승리·패배·무승부**를 결정합니다.

각 경기의 시간과 결과를 표로 출력하고, 승리·무승부·패배 횟수를 셉니다. 승률은 **무승부를 제외한 경기 중 이긴 비율**입니다. 컴퓨터의 선택은 무작위이므로 코드를 다시 실행하면 결과가 바뀔 수 있습니다.

---

[Tistory 원문 보기 · 실시간 시뮬레이션](https://leeparang10.tistory.com/40)
