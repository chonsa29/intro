import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJEslN7lCVRPFBQlLPmoCvHBtHmyAbxr0",
  authDomain: "intro-ce7c2.firebaseapp.com",
  projectId: "intro-ce7c2",
  storageBucket: "intro-ce7c2.firebasestorage.app",
  messagingSenderId: "52941824344",
  appId: "1:52941824344:web:917e0834257d6d9d23452d",
  measurementId: "G-E4ZH77NP5T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUser() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

async function saveUser(user) {
  await addDoc(collection(db, "users"), user);
}

const Register = {
  template: `
    <div class="write-container"><br><br><br>
      <h1 style="margin-top: 0;">&nbsp;&nbsp;회원가입</h1>
      <form @submit.prevent="submitUser">
        <div class="text"><label>이름: <input id="name" v-model="name"></label></div>
        <div class="text"><label>아이디: <input id="userId" v-model="userId"></label></div>
        <div class="text"><label>사용자 이름: <input id="username" v-model="username"></label></div>
        <div class="text"><label>패스워드: <input id="pwd" type="password" v-model="userPwd"></label></div>
        <div class="text"><label>패스워드 확인: <input id="confirmPwd" type="password" v-model="confirmPwd"></label></div>
            <div class="text"><label>성별: 
          <select id="gender" v-model="gender">
            <option value="">선택하세요</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </label></div>
        <button type="submit">등록</button>
      </form>
    </div>
  `,
  data() {
    return {
      users: [],
      name: '',
      userId: '',
      username: '',
      gender: '',
      userPwd: '',
      confirmPwd: '',
    };
  },
  async created(){
    this.users = await getUser();
  },
  methods: {
    async submitUser() {
        const pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        const pattern2 =  /^(?=.*?[#?!@$ %^&*-]).{6,}$/;
        const upper = /^[A-Z]+$/;
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const number = /^[0-9]*$/;

       if (pattern.test(this.userId) || upper.test(this.userId) || korean.test(this.userId)) {
            alert("아이디는 숫자와 영어 소문자만 사용 가능합니다.");
            return;
        }
        if (this.userId.length < 6) {
            alert("아이디는 6글자 이상이여야 합니다.");
            return;
        }
        if (this.userPwd != this.confirmPwd) {
            alert("비밀번호가 다릅니다.");
            return;
        }
        if (this.userPwd.length < 6) {
            alert("비밀번호는 6글자 이상이여야 합니다.");
            return;
        }
        if(!pattern2.test(this.userPwd)){
            alert("비밀번호는 특수문자를 하나 포함해야 합니다.");
            return;
        }
        if(!this.gender){
            alert("성별을 선택하세요.");
            return;
        }
     
      const newUser = {
        name: this.name,
        userId: this.userId,
        username: this.username,
        gender: this.gender,
        userPwd: this.userPwd
      };

      await saveUser(newUser);
      alert('등록되었습니다!');
      window.close();
    },
    
  }
};

const routes = [
  { path: '/', component: Register },
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router
});
