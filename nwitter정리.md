1. firebase app 

2. securing key
   
   - env 파일를 만들어 github에 key 노출 막음
   
   - REACT_APP_KEY

3. Route Setup
   
   - login 되어 있으면 Home, login 안되어 있으면 Auth routes를 보여줌

4. Firebase Auth이용
   
   - auth에서 제공하는 currentUser 로 로그인한 사용자 정보를 가져올 수 있음, 로그인하지 않으면 null
   
   ```js
    firebase 8.8.0버전
   import "firebase/auth";
   
    firebase.initializeApp(firebaseConfig);
   
   export const authService = firebase.auth(); //authService만 export 가능 
   
   
   ```

5. jsconfig.js 
   
   - 최상위 폴더에 jsconfig.json파일을 추가한 뒤 src를 기본경로로 절대경로 세팅
   
   ```json
   {
       "compilerOptions": {
           "baseUrl": "src"
       },
       "include": ["src"]
   }
   ```


