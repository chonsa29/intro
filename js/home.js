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
    petal.style.animationDelay = `-${delay}s`; // 자연스럽게 생성되도록

    document.body.appendChild(petal);

    // 애니메이션이 끝나면 제거
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

function createPetals() {
    setInterval(createPetal, 150); // 0.3초마다 새로운 벚꽃 생성
}

createPetals();
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
        text.innerHTML = "저는 문제 해결과 논리적인 사고를 바탕으로 성장하는 개발자가 되고 싶어 소프트웨어 개발을 공부하게 되었습니다." +
            " 비록 실무 경험은 부족하지만, 꾸준한 학습과 도전을 통해 빠르게 성장할 자신이 있습니다.";
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


document.addEventListener("scroll", () => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
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
    }, 50);
})

/*플레이리스트*/
function togglePlaylist() {
    var playlist = document.getElementById("playlist");
    if (playlist.style.maxHeight === "0px" || playlist.style.maxHeight === "") {
        playlist.style.maxHeight = "21vh";
    } else {
        playlist.style.maxHeight = "0px";
    }
}

