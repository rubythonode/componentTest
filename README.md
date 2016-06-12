

# 사용

1. `git clone https://github.com/g6ling/componentTest.git`
2. `npm install`
3. `rnpm link`  https://github.com/rnpm/rnpm 들어가서 rnpm 설치후 link실행
4. `react-native run-ios`
5. `git checkout -b 형이원하는이름`


# Todo
##UI
- [x] ~~수업 클릭 후 수업 상세 페이지~~
- [ ] 시간표 누르면 커스터 마이징 되게 (이름 같은거 바꿀수 잇게) - 위에거 만들면서 같이
- [ ] 수업 평가 페이지
- [x] ~~스케쥴(달력) 페이지~~ -> 디자인은 좀더 나중에
- [x] ~~탭바 아이콘 + 색깔 변경~~
- [x] ~~수업 Setting에 알맞게 숫자조정~~
- [x] ~~설정(더보기) 화면 - 하는중, 애브리타임 처럼.~~
- [ ] 커뮤니티(게시판) UI


##기능
- [x] ~~소셜 로그인 추가~~
- [ ] 스케쥴에 나만의 스케쥴 저장
- [ ] 타임라인 만들기
- [ ] 수업 상세 페이지 에서 서버에 요청해서 수업 정보 가져오기
- [ ] 강의 평가 페이지에서 서버에 post로 데이터 보내기
- [ ] 수업 상세 페이지 에서 타임라인 글쓰기
- [ ] 수업 상세 페이지 에서 수업이름 바꾸기


##서버
- [x] ~~회원가입 서버부분~~ -> /users/signin - POST
- [x] ~~유저 정보 변경~~ -> /users/edit - POST
- [x] ~~시간표 데이터 받으면 수업DB에 저장~~ -> /users/editTimeTable - POST
- [x] ~~강의평가 데이터 받으면 수업DB에서 알맞은 수업 찾아서 강의평가 저장~~ -> /lecture/:school/:lectureCode/eval - POST
- [ ] 타임라인 데이터 받으면 수업DB에서 알맞은 수업 찾아서 타임라인 저장 => 대충은 함, 나중에 photo부분은 GCS(google cloud storage)랑 연동해서 사진 저장 가능하게 -> /lecture/:school/:lectureCode/timeLine - POST
- [x] ~~수업 get 요청 받으면 수업DB에서 알맞은 수업 찾아서 수업 Data 줌~~ -> /lecture/:school/:lectureCode - GET
- [ ] 커뮤니티 글쓰기, 보기


##api

###/users
#####/signin POST
로그인
```js
{
    uid: Int,
    email: String,
    provider: String,
} =>
{
    // 받는 Data형식은 항상 user Object
}
```

#####/edit POST
자기 정보를 바꿀땐 여기서 바꿈
```js
{
    uid: uid,
    name: String,
    nickName: String,
} =>
{
  // 받는 Data형식은 user Object
}
```

#####/editTimeTable
post로 이러한 Data가 들어옴 -> 이 액션은 수업을 학교에서 받아올때만 실행, 나중에 시간표를 자기가 수정할 때는 실행하지 않음
```js
{
    uid: uid,
    school: String,
    timeTable: Array
    // timeTable을 받어서 얘가 어떤 수업을 듣는지 파악, 그 후 듣는 수업의 timeLine에
    // 이벤트가 추가될 경우 알림.(아마?)
} =>
'ok'
```

###/lecture
#####/:school/:lectureCode GET
=> 수업Object 돌려줌

#####/:school/:lectureCode/eval POST
```js
{
    report: Boolean,
    reportCnt: Number,
    test: Boolean,
    testCnt: Number,
    easy: Number,
    totalEval: Number
} => 'lecture Object 돌려줌'
```
#####/:school/:lectureCode/timeLine POST일단 사진 빼고 저장.
타임라인은 5종류가 있다고 생각 -> HomeWork, Report, Test, Print, etc
```js
{
    category: enum('HomeWork, Report, Test, Print, etc')
    title: String,
    context: String,
    Photo: Blob, // 아마? 이 부분은 나중에 다시
    schedule: Date or String
} => 'lecture Object 돌려줌'
```
여기에 혹시 해야 할게 있다면 추가.
