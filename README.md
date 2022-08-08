# 해커톤 4조 레파짓  

## **Commit convention**  

Feat: 새로운 기능 추가  
Fix: 버그 수정  
Docs: 문서,주석 수정  
Style: 코드 포맷 변경, 세미콜론 누락, 코드 변경 없음  
Refactor: 프로덕션 코드 리팩터링  
Test: 테스트 추가, 테스트 코드 리팩터링, 프로덕션 코드 변경 없음  
Chore: 빌드 테스크 업데이트, 패키지 매니저 환경설정, 프로덕션 코드 변경 없음  
Merge : 합병 및 깃 충돌 해결 커밋 메시지

  
## **Branch convention** 

기능 구현 -> Featuring_컴포넌트명 or 페이지명  
스타일링 -> Styling_컴포넌트명 or 페이지명  
테스트 -> Testing_컴포넌트명 or 페이지명  


## **스택**  
 

사용언어 -> Html, Javascript, scss

프레임워크 -> React  

라이브러리 -> react-router, scss, dotenv, recoil, react-icons, axios, react-transition-group 

사용 API -> Geo Location, Kakao maps, Kakao mobility  

메인 이슈 -> 서버와의 연동 및 렌더링의 싱크 처리, UI 디자인
  

 
## **폴더구조**는 다음과 같습니다.

```
src
├── Atoms -> 필요 정보들은 모두 전역 상태로 관리하려고 합니다.
│   └── atoms.js
│
├── Components
│   ├── AidInfo.js
│   ├── Detailinfo.js
│   ├── DropBox.js
│   ├── Info.js
│   ├── LoadRoute.js
│   ├── Select.js
│   ├── TestLocation.js -> 추후 컴포넌트명 수정 계획 중 입니다. 
│   └── Title.js
├── Datas
│   ├── image.jpg
│   ├── locationData.js
│   └── marker.png
├── Pages
│   ├── DetailPage.js
│   ├── FirstAidPage.js
│   ├── ListPage.js
│   └── MainPages.js
├──Syltes -> 컴포넌트 관련 scss 파일인데 추후 취합 후에 업데이트 하겠습니다. 
│   
└── else
``` 
