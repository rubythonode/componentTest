var DOMParser = require('react-native-html-parser').DOMParser

var KyotoUniv = {
    timeTableUrl : 'https://www.k.kyoto-u.ac.jp/student/la/entry/zenki',

    url: 'https://student.iimc.kyoto-u.ac.jp/',
    loginUrl : 'https://authidp1.iimc.kyoto-u.ac.jp/idp/Authn/UserPassword',


    login: (id, pw) => {
      let constId = 'a0131867'
      let constPW = 'dusrbals1'
      return `document.getElementsByName("j_username")[0].value="${constId}";
              document.getElementsByName("j_password")[0].value=${constPW}";
              document.getElementsByTagName("input")[2].click();`
    },


    parseTimeTable: (html)=>{




        let doc = new DOMParser().parseFromString(html,'text/html')

        let student = {

        }

        let lectureTimeTable = [[],[],[],[],[],[]]
        let lectureTimes = doc.querySelect('tr[valign="top"]')
        lectureTimes.forEach((lectureTime, index) => {
                if(index<5){
                    for(let i =3 ; i<=11 ; i+=2){
                        let lecture = lectureTime.childNodes[i]
                        let lectureObject = {
                            lectureName: 'None'
                        }
                        if(lecture.getAttribute('class') == "entry_null"){
                            lectureTimeTable[index].push(lectureObject)
                        }else {
                            let lectureName = lecture.childNodes[1].textContent
                            lectureName = lectureName.slice(25, lectureName.length)
                            let lectureTeacher = lecture.childNodes[5].textContent
                            lectureTeacher = lectureTeacher.slice(101, lectureTeacher.length)
                            let lectureRoom = lecture.childNodes[9].textContent
                            lectureRoom = lectureRoom.slice(26, lectureRoom.length)


                            lectureObject = {
                                lectureName: lectureName,
                                lectureTeacher: lectureTeacher,
                                lectureRoom: lectureRoom
                            }
                            lectureTimeTable[index].push(lectureObject)
                        }
                    }
                }
            })

        student["timeTable"] = lectureTimeTable
        console.log(student)
        return student
    }


}

export default KyotoUniv
