# **📑 Google Dogs**
<br>

> **Google Dogs**는 MERN(MongoDB, Express, React, Node.js) 스택과 **Socket.IO**를 사용하여 구축된 **문서 협업 애플리케이션**입니다.
> 실시간으로 여러 사용자가 협업할 수 있도록 설계되었습니다.
<br>

## Getting Started / Installation

Google Dogs를 로컬에서 실행하는 방법

### **1\. 리포지토리 클론**

```sh
git clone https://github.com/LeeSeGyeong/fullstack-bootcamp18-test.git
```

### **2\. 서버 및 클라이언트 설치**

```sh
# 서버 설치
cd server
npm install
```

```sh
# 클라이언트 설치
cd ../client
npm install
```

### **3\. 환경 변수 설정**

`.env` 파일을 생성하고 다음 값을 입력합니다

```sh
# 서버 환경 변수
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret_id
MONGO_URI=your_mongodb_uri

# 클라이언트 환경 변수
REACT_APP_GOOGLE_ID=your_google_client_id
REACT_APP_REDIRECT_URI=your_redirect_uri
REACT_APP_GOOGLE_SCOPE=email profile
```

### **4\. 실행**

```sh
# 서버 실행
cd server
npm start

# 클라이언트 실행
cd ../client
npm start
```

브라우저에서 `http://localhost:3000`를 입력하면 접속 가능합니다

<br />

## **Developing**

```sh
npm run build
```

<br />

## **Features**

**사용자 인증**

* JWT(JSON Web Tokens)를 이용한 인증 보호
* Google OAuth 2.0 로그인 지원
* MongoDB를 활용한 문서 자동 저장 기능

**실시간 문서 협업**

* Socket.IO를 이용하여 다중 사용자 지원
* 실시간 커서 공유 및 텍스트 입력 반영

**상태 관리**

* Zustand를 이용한 전역 상태 관리

**문서 저장**

* MongoDB를 활용한 문서 자동 저장 기능
* 20초마다 자동 저장

<br />

## Configuration

설정 값: 설명

- `MONGO_URI`: MongoDB 데이터베이스 URI

- `JWT_SECRET`: JWT 서명에 사용되는 시크릿 키

- `PORT`: 서버가 실행될 포트 번호

- `REACT_APP_GOOGLE_ID`: Google OAuth 클라이언트 ID

- `REACT_APP_REDIRECT_URI`: OAuth 인증 후 리디렉트될 URL

<br />

## Usage
브라우저에서 페이지를 엽니다.

1. 로그인:
구글을 이용한 소셜 로그인을 진행하세요.

2. 문서 생성:
로그인 이후 작업할 문서를 생성하세요.

3. 문서 작업:
텍스트 기반 문서를 작성하고 내용 저장 가능

<br />

## **구현 사항**

### **1. 핵심 기능**

* JWT 인증을 활용한 로그인 구현
* Zustand를 사용한 상태 관리
* MongoDB를 이용한 데이터 저장

### **2. 페이지별 기능**

#### **로그인 페이지 (`/login`)**

* 구글 로그인 화면 제공
* 로그인 버튼 클릭 시 Google OAuth2.0으로 인증
* 로그인 성공 시 메인 페이지(`/`)로 이동
* 로그인 실패 시 에러 페이지(`/error`)로 이동
* 로그인하지 않은 사용자는 메인 페이지 이외의 페이지를 방문할 수 없음

#### **메인 화면 (`/`)**

* 로그인한 사용자는 본인이 생성한 문서 목록을 확인 가능
* 문서 클릭 시 문서 작업 페이지(`/docs/:id`)로 이동
* 비회원은 "로그인 후 이용해주세요" 메시지 표시
* 문서 생성 버튼 제공 (`/newDoc`로 이동)

#### **문서 작업 (`/docs/:id`)**

* 문서 생성 시 고유한 URL이 부여됨
* 기본적인 텍스트 입력 가능
* 작업 문서 저장 기능 지원
* 이전 저장된 문서 불러오기 지원

<br />

## Support Link
질문이나 다른 문의는 [Reports](https://github.com/LeeSeGyeong/fullstack-bootcamp18-test/issues) 링크를 사용해 주세요.

