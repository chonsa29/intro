function noExists() {
    alert("없어요");
}

//벚꽃
function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 5; // 3초~8초 지속
    const delay = Math.random() * 5; // 랜덤한 지연 시간

    petal.style.left = `${startX}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `-${delay}s`;

    document.body.appendChild(petal);

    // 애니메이션이 끝나면 제거
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

function createPetals() {
    setInterval(createPetal, 150); 
}

createPetals();

// //별 배경
// function createStars() {
//     const numStars = 800; // 별 개수
//     const container = document.querySelector(".star-container");
//     const pageHeight = document.documentElement.scrollHeight;

//     for (let i = 0; i < numStars; i++) {
//         let star = document.createElement("div");
//         star.className = "stars";

//         let x = Math.random() * window.innerWidth;
//         let y = Math.random() * pageHeight;
//         let delay = Math.random() * 2;
//         let size = Math.random() * 3 + 1; 

//         star.style.left = `${x}px`;
//         star.style.top = `${y}px`;
//         star.style.animationDelay = `${delay+1}s`;
//         star.style.width = `${size+2}px`;
//         star.style.height = `${size+2}px`;

//         container.appendChild(star);
//     }
// }

// createStars();

//시간
function getTime() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + today.getMonth() + 1).slice(-2);
    let date = ('0' + today.getDate()).slice(-2);
    let day = ['일', '월', '화', '수', '목', '금', '토'];
    let datestr = year + '-' + month + '-' + date + "(" + day[(today.getDay())] + "요일)";

    let hours = ('0' + today.getHours()).slice(-2);
    let mins = ('0' + today.getMinutes()).slice(-2);
    let secs = ('0' + today.getSeconds()).slice(-2);
    let timestr = "현재시간: " + hours + ":" + mins + ":" + secs;

    document.querySelector("#date").innerHTML = datestr;
    document.querySelector("#time").innerHTML = timestr;

    setTimeout(getTime, 1000);
}

function hide() {
    let date = document.querySelector("#date");
    let time = document.querySelector("#time");
    let hide = document.querySelector("#hide");

    if (hide.innerHTML == "시간 숨기기") {
        date.style.display = "none";
        time.style.display = "none";
        hide.innerHTML = "시간 표시";
    } else {
        date.style.display = "block";
        time.style.display = "block";
        hide.innerHTML = "시간 숨기기";
    }
}
//로딩화면
let page1 = document.querySelector("#page1");
let page2 = document.querySelector("#page2");
let page3 = document.querySelector("#page3");
let page4 = document.querySelector("#page4");
let page5 = document.querySelector("#page5");
let a = document.querySelector("#a");
let b = document.querySelector("#b");
let day = document.querySelector("#day");

function loading() {
    let loader = document.querySelector(".loader");

    setTimeout(function () {
        loader.style.display = "none";
        page1.style.display = "block";
        page2.style.display = "block";
        page3.style.display = "block";
        page4.style.display = "block";
        page5.style.display = "block";
        page1.classList.add("show");
        page2.classList.add("show");
        page3.classList.add("show");
        page4.classList.add("show");
        page5.classList.add("show");

        loading1();
        loading2();
    }, 0);
}
function loading1() {
    a.style.transform = "translateX(-120%)";
    setTimeout(function () {
        a.style.display = "none";
        getTime();
        day.style.display = "block";
    }, 1800)
}

function loading2() {
    b.style.transform = "translateX(120%)";
    setTimeout(function () {
        b.style.display = "none";
    }, 1800)
}

//다크모드
function fnMode() {
    let button = document.querySelector("#dark_mode");
    let button2 = document.querySelector("#light_mode");

    let sidebar = document.querySelector("#sidebar");
    let content = document.querySelector("#content");

    sidebar.classList.toggle('side_dark');
    sidebar.classList.toggle('side_light');
    content.classList.toggle('content_dark');
    content.classList.toggle('content_light');
    button.classList.toggle('mode1');
    button.classList.toggle('mode2');
    if (button.classList.contains('mode1')) {
        button2.style.display = "none";
        button.style.display = "inline";
    } else {
        button.style.display = "none";
        button2.style.display = "inline";
        button2.style.color = "white";
    }
}
//자기소개 페이지
let pageNo = document.querySelector("#pageNo");
let introTitle = document.querySelector("#introTitle");
let contents = document.querySelector("#contents");
function prev() {
    if (pageNo.innerHTML < 2) {
        alert("처음 페이지입니다.");
        return;
    }
    else {
        pageNo.innerHTML = (parseInt(pageNo.innerHTML) - 1);
        contents.innerHTML = "";
        changePage();
    }
}

function next() {
    if (pageNo.innerHTML > 3) {
        alert("마지막 페이지입니다.");
        return;
    }
    else {
        pageNo.innerHTML = (parseInt(pageNo.innerHTML) + 1);
        contents.innerHTML = "";
        changePage();
    }
}

function changePage() {
    if (pageNo.innerHTML == 1) {
        introTitle.innerHTML = "자기소개";
        let text = document.createElement("p");
        text.innerHTML = "신입 풀스택 개발자 천상욱입니다." +
                        "웹 개발에 대한 열정과 지속적인 학습을 바탕으로 프론트엔드와 백엔드를 아우르는 풀스택 개발자로 성장하고 있습니다."+
                        "현재까지 다양한 코딩 테스트를 통해 알고리즘 및 문제 해결 능력을 키워왔으며, 실무 프로젝트 경험을 쌓기 위해 적극적으로 학습하고 있습니다."+
                        "프론트엔드에서는 HTML, CSS, JavaScript를 활용한 웹 페이지 제작에 관심이 있으며,"+
                        "React와 같은 라이브러리를 익히며 사용자 친화적인 UI를 구현하는 데 집중하고 있습니다."+
                        "백엔드에서는 Node.js, Express, MySQL 등을 활용하여 서버 구축 및 데이터베이스 설계에 대해 공부하고 있습니다."+
                        "아직 실무 경험은 부족하지만, 새로운 기술을 배우고 적용하는 것을 즐기며,"+
                        "팀워크와 원활한 커뮤니케이션을 통해 성장하는 개발자가 되고자 합니다. 끊임없이 도전하며,"+
                        "사용자에게 가치 있는 서비스를 제공하는 개발자로 나아가겠습니다.";
        contents.appendChild(text);
    } else if (pageNo.innerHTML == 2) {
        introTitle.innerHTML = "Experience";
        let ul1 = document.createElement("ul");
        let ul2 = document.createElement("ul");
        let li1_1 = document.createElement("li");
        let li1_2 = document.createElement("li");
        let li1_3 = document.createElement("li");
        let li2_1 = document.createElement("li");
        let li2_2 = document.createElement("li");

        ul1.innerHTML = "프론트엔드";
        ul2.innerHTML = "백엔드";
        li1_1.innerHTML = "HTML/CSS/JAVASCRIPT";
        li1_2.innerHTML = "웹 페이지 못 만든다";
        li1_3.innerHTML = "다 못함...";
        li2_1.innerHTML = "자바 조금함";
        li2_2.innerHTML = "오라클도 조금 함";
        contents.appendChild(ul1);
        contents.appendChild(ul2);
        ul1.appendChild(li1_1);
        ul1.appendChild(li1_2);
        ul1.appendChild(li1_3);
        ul2.appendChild(li2_1);
        ul2.appendChild(li2_2);

    } else if (pageNo.innerHTML == 3) {
        introTitle.innerHTML = "보유 기술";
        contents.innerHTML = "<ul>" +
            "<li>자바<br>" +
            "<progress class=\"progress\" value=\"10\" min=\"0\" max=\"100\"></progress>" +
            "<li>오라클<br>" +
            "<progress class=\"progress\" value=\"15\" min=\"0\" max=\"100\"></progress>" +
            "<li>HTML<br>" +
            "<progress class=\"progress\" value=\"5\" min=\"0\" max=\"100\"></progress>" +
            "<li>C++<br>" +
            "<progress class=\"progress\" value=\"50\" min=\"0\" max=\"100\"></progress>"
            ;
    } else if (pageNo.innerHTML == 4) {
        introTitle.innerHTML = "Education";
        contents.innerHTML =
            "<table>" +
            "<caption>학력 사항</caption>" +
            "<thead>" +
            "<tr>" +
            "<th>출신학교</th>" +
            "<th>전공</th>" +
            "<th>기간</th>" +
            "<th>구분</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td>인하대학교</td>" +
            "<td>컴퓨터공학과</td>" +
            "<td>2019.3 ~ </td>" +
            "<td>휴학</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Korean International School Philippines</td>" +
            "<td> 이과 </td>" +
            "<td>2017.3 ~ 2019.2</td>" +
            "<td>졸업</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>"
            ;

    }
}

/*로그인*/
function login() {
    let id = document.querySelector("#userId").value;
    let pwd = document.querySelector("#pwd").value;

    console.log(id + pwd);
    if (id == "test1234" && pwd == "test1234") {
        alert("로그인 성공!");
        location.href = "intro.html";
    } else {
        alert("로그인 실패");
    }
}

/*회원가입*/
function showPopup() {
    window.open("register.html", "register", "width=500, height =300, left = 100, top = 50")
}

/*페이지 자동 전환*/

let timer;
let value2;


document.addEventListener("wheel", () => {

    let value1 = value2;
    value2 = document.documentElement.scrollTop;
    let height = document.querySelector("#page1").offsetHeight;

    if (value2 > 0 && value2 < height && value2 > value1) {
        location.href = "#page2";
    } else if (value2 > 0 && value2 < height && value2 < value1) {
        location.href = "#page1";
    } else if (value2 > height && value2 < height * 2 && value2 > value1) {
        location.href = "#page3";
    } else if (value2 > height && value2 < height * 2 && value2 < value1) {
        location.href = "#page2";
    } else if (value2 > height * 2 && value2 < height * 3 && value2 > value1) {
        location.href = "#page4";
    } else if (value2 > height * 2 && value2 < height * 3 && value2 < value1) {
        location.href = "#page3";
    } else if (value2 > height * 3 && value2 < height * 4 && value2 > value1) {
        location.href = "#page5";
    } else if (value2 > height * 3 && value2 < height * 4 && value2 < value1) {
        location.href = "#page4";
    }

})

/*플레이리스트*/
function togglePlaylist() {
    let playlist = document.getElementById("playlist");
    if (playlist.style.height == "0px" || playlist.style.height =="") {
        playlist.style.height = "30vh";
    } else {
        playlist.style.height = "0px";
    }
}
var app = new Vue({
    el: '#app',

    data: {
        title: "",
        singer: "",
        inf: "",
        songCover: {
            background: "black",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        },
        songList: {
            width: "",
            height: "",
            left: "",
            opacity: ""
        },
        albumCover: {
            background: "",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        source: {
            link: ""
        },
        arr: [
            {
                song: {
                    title: "노래1",
                    singer: "가수1",
                    info: "설명1",
                    background: "url(\"./media/song1.jpg\")",
                    link: "./media/song1.mp3",
                }
            },
            {
                song: {
                    title: "노래2",
                    singer: "가수2",
                    info: "설명2",
                    background: "url(\"./media/song2.jpg\")",
                    link: "./media/song2.mp3",
                }
            },
            {
                song: {
                    title: "노래3",
                    singer: "가수3",
                    info: "설명3",
                    background: "orange",
                    link: "./media/song3.mp3",
                }
            },
            {
                song: {
                    title: "노래4",
                    singer: "가수4",
                    info: "설명4",
                    background: "yellow",
                    link: "./media/song4.mp3",
                }
            },
            {
                song: {
                    title: "노래5",
                    singer: "가수5",
                    info: "설명5",
                    background: "green",
                    link: "./media/song5.mp3",
                }
            }
        ]
    },
    methods: {
        info: function (title, singer, inf, background) {
            this.title = title
            this.singer = singer
            this.inf = inf
            this.songCover.background = background
            this.songList.width = "15vw"
            this.songList.height = "60vh"
            this.songList.left = "23%"
            this.songList.opacity = "1"

        },
        mouseout: function () {
            this.songList.width = ""
            this.songList.height = ""
            this.songList.left = ""
            this.songList.opacity = ""
        },
        changeSong: function (background, link) {
            this.albumCover.background = background
            this.source.link = link
            this.$refs.audioPlayer.play();
            this.$nextTick(() => {
                if (this.$refs.audioPlayer) {
                    this.$refs.audioPlayer.play();
                } else {
                    console.error("audioPlayer 참조가 없습니다!");
                }
            });
        }
    }//methods
});

