var DOMParser = require('react-native-html-parser').DOMParser

var OsakaUniv = {
    timeTableUrl : 'https://koan.osaka-u.ac.jp/koan/campus?view=view.menu&func=function.rishu.refer',
    scoreUrl : 'https://koan.osaka-u.ac.jp/koan/campus?view=view.menu&func=function.seiseki.tani.span',
    url : 'https://koan.osaka-u.ac.jp',

    getScoreJS : `nextCall('2')`,
    scoreCondition : '単位修得状況照会 [KOAN]',

    injectID: (id) => {
        return 'document.getElementById("USER_ID").value="'+ 'u385811a' + '";'
    },

    injectPW: (pw) => {
        return 'document.getElementById("USER_PASSWORD").value="'+ 'Chaos6324' + '";'
    },
    login: (id, pw) => {
      return `document.getElementById("USER_ID").value="${id}";
              document.getElementById("USER_PASSWORD").value="${pw}";
              LoginSubmit("Login");`
    }

    loginCondition : (navState) =>{
        if(navState.title == '個人ポータル [KOAN]'){
          return true
        } else{
          return false
        }
    },
    loginButton : 'LoginSubmit("Login");',

    parseScore: (html) => {

        let doc = new DOMParser().parseFromString(html,'text/html')
        let trNodes = doc.querySelect('tr');
        let subjects = {
            category: 'subjectScore',
            data: []
        };

        trNodes.forEach(function (trNode, index) {
            if(trNode.getAttribute('onmouseout')){
                let subject = {
                    category: trNode.childNodes[3].textContent,
                    title: trNode.childNodes[5].textContent,
                    tani: trNode.childNodes[11].textContent,
                    year: trNode.childNodes[13].textContent,
                    semester: trNode.childNodes[15].textContent,
                    grade: trNode.childNodes[17].textContent,
                    pass: trNode.childNodes[19].textContent
                }
                subjects.data.push(subject);
            }
        })

        return subjects

    },

    parseTimeTable: (html)=>{
        // 여기에 domParser로 잘 만듬 그전엔 findClassName도 만들어야함.

        let doc = new DOMParser().parseFromString(html,'text/html')

        let rishus = doc.querySelect('tr.rishu')
        let studentInfo = rishus[0].childNodes
        let studentName = studentInfo[3].textContent;
        let studentNumber = studentInfo[7].textContent;
        studentInfo = rishus[1].childNodes
        let studentCourse = studentInfo[3].textContent;
        let studentGrade  = studentInfo[7].textContent;

        let student = {
            'category': 'student',
            'name': studentName,
            'number': studentNumber,
            'course': studentCourse,
            'grade': studentGrade
        }

        let lectureTimes = [].slice.call(doc.getElementsByClassName('rishu-koma-inner'))
        let lectureTimeTable = [[],[],[],[],[],[]]

        lectureTimes.forEach(function(lectureTime, index){
            let childLectureTime =  lectureTime.getElementsByTagName('td');
            let lectureObject = {
                'lectureName': 'None'
            }
            if(childLectureTime.length == 3){
                let lectureCode = childLectureTime[0].textContent;
                let lectureName = childLectureTime[1].textContent;
                let lectureTeacher = childLectureTime[2].childNodes[0].textContent;
                let lectureRoom = childLectureTime[2].childNodes[2].textContent;

                lectureObject = {
                    'lectureCode': lectureCode,
                    'lectureName': lectureName,
                    'lectureTeacher': lectureTeacher,
                    'lectureRoom': lectureRoom
                }
            }
            switch (index%6) {
                case 0:
                    lectureTimeTable[0].push(lectureObject);
                    break;
                case 1:
                    lectureTimeTable[1].push(lectureObject);
                    break;
                case 2:
                    lectureTimeTable[2].push(lectureObject);
                    break;
                case 3:
                    lectureTimeTable[3].push(lectureObject);
                    break;
                case 4:
                    lectureTimeTable[4].push(lectureObject);
                    break;
                case 5:
                    lectureTimeTable[5].push(lectureObject);
                    break;
                default:
                    break;
            }
        })

        student["timeTable"] = lectureTimeTable

        return student
    }


}

export default OsakaUniv
