# 해커톤 4조 레파짓  
## **주요기능**  
### **위치 및 증상 기반 응급실 정보 렌더링**    
<img width="80%" src="https://user-images.githubusercontent.com/81761524/185782569-1e4aa492-1b98-4154-87e0-60bbb3ab366d.gif"/>  

### **조건에 부합한 응급실 리스트**     
<img width="80%" src="https://user-images.githubusercontent.com/81761524/185782622-c255ead4-9c12-499e-8560-1bc338bdf49a.gif"/>    

### **사용 위치부터 선택한 응급실 까지의 경로 추천**       
<img width="80%" src="https://user-images.githubusercontent.com/81761524/185782711-0ad3b60d-c803-481c-98ac-8f1ffec15f48.gif"/>  

### **해당 응급실에 전화 연결**     
<img width="80%" src="https://user-images.githubusercontent.com/81761524/185782589-e4eaa0b2-5496-408c-854d-4b1b66ca0870.gif"/>  




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
