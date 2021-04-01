# 아침미팅 QR 스캐너 / 생성기 애플리케이션

## 프로젝트 생성방법

CRA2 를 이용해서 생성한 프로젝트입니다. 다음과 같이 할 수 있습니다.

```shell
$ npx create-react-app qr-reader
```

## 프로젝트 구조

```
1. node_modules : yarn install 후에 생성되는 node modules 디렉토리 (소스코드 및 git 에서 제외되어야 함)
$ yarn install 을 수행하면 node_modules 파일이 생성되고 package.json 내의 dependencies 에 포함된 package 들이 포함되게 됨

2. public : html 파일 및 assets 파일들이 위치
$ yarn build 를 하면 react 를 컴파일하고 javascript 로 만든 뒤 public 안의 build 라는 폴더로 이동
$ yarn eject 는 사용할 필요없음 (yarn eject 는 CRA2 - Create React App 이 제공하는 모든 기능을 노출시킴)
$ yarn start 는 로컬에서 프로그램을 띄워볼때 사용
$ yarn build 는 React 를 배포환경으로 만들기 위해 실행 (하지만, github 와 vercel 이 자동으로 해주기 때문에 할 필요없음)

3. src : React 코드가 위치함 (시작파일은 index.js)

4. package.json : 의존성 관리 파일

5. package-lock.json : 무시해도 됨 (npm install 했을 때 나오는 파일) - git 에 무시하라는 말은 아님

6. yarn.lock : 무시해도 됨 (yarn install 했을 때 나오는 파일) - git 에 무시하라는 말은 아님
```

## 이제부터 React 프로젝트

React 프로젝트의 Root 디렉토리는 src 입니다.

1. 신규 프로젝트 생성

새로운 React 프로젝트는 다음의 명령을 수행하면 됩니다.

```shell
$ npx create-react-app qr-reader
```
