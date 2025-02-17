import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ✅ Firebase 설정 (Firebase 콘솔에서 복사한 정보 입력)
const firebaseConfig = {
  apiKey: "AIzaSyBJEslN7lCVRPFBQlLPmoCvHBtHmyAbxr0",
  authDomain: "intro-ce7c2.firebaseapp.com",
  projectId: "intro-ce7c2",
  storageBucket: "intro-ce7c2.firebasestorage.app",
  messagingSenderId: "52941824344",
  appId: "1:52941824344:web:917e0834257d6d9d23452d",
  measurementId: "G-E4ZH77NP5T"
};

// ✅ Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// 유틸 함수 정의
async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function savePost(post) {
  await addDoc(collection(db, "posts"), post);
}

// 네비게이션 바
Vue.component('nav-bar', {
  template: `
    <nav>
      <ul class="nav">
        <li><router-link to="/" class="lists">홈</router-link></li>
        <li class="dropdown">
          <router-link to="/board/free" class="lists">게시판</router-link>
          <ul class="submenu">
            <li><router-link to="/board/free">자유게시판</router-link></li>
            <li><router-link to="/board/notice">공지사항</router-link></li>
          </ul>
        </li>
        <li><router-link to="/write" class="lists">글쓰기</router-link></li>
        <li><router-link to="/mypage" class="lists">마이페이지</router-link></li>
        <li><a href="#" @click="logout">로그아웃</a></li>
      </ul>
    </nav>
  `,
  methods: {
    logout() {
      alert('로그아웃 되었습니다.');
      location.href = "home.html";
    }
  }
});

//홈 컴포넌트
const Home = {
  template: `
    <div>
      <nav-bar></nav-bar><br><br><br>
      <h1>&nbsp;&nbsp;홈</h1>
      <div class="container">
        <section class="photo-info">
          <div class="photo">
            <img src="../media/1.png" alt="My Photo" />
          </div>
          <div class="info">
            <p>이름: 천상욱</p>
            <p>생일: 2000-09-04</p>
            <p>나이: 24</p>
            <p>성별: 남</p>
          </div>
        </section>
        <section class="main-content">
          <h2>최근 추가된 글</h2>
          <ul>
            <li v-for="post in sortedPosts" :key="post.id" class="post">
              <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
          <h2>인기글</h2>
          <ul>
            <li v-for="post in popularPosts" :key="post.id" class="post">
              <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  `,
  computed: {
    posts() {
      return getPosts();
    },
    sortedPosts() {
      return [...this.posts]
        .filter(post => post.title && post.content)
        .sort((a, b) => b.id - a.id);
    },
    popularPosts() {
      return [...this.posts]
        .filter(post => post.title && post.content)
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
    }
  }
};

//보드 컴포넌트
const Board = {
  template: `
    <div>
      <nav-bar></nav-bar><br><br><br>
      <h1>&nbsp;&nbsp;게시판</h1>
      <div class="container">
        <section class="board-info">
          <div class="board-img">
            <img src="../media/1.png" alt="Board Image" />
          </div>
          <div class="board-details">
            <p>게시판 설명</p>
            <p>게시판 규칙 등</p>
          </div>
        </section>
        <section class="main-content">
          <h2>자유게시판</h2>
          <ul>
            <li v-for="post in freeBoard" :key="post.id" class="post">
              <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
          <h2>공지사항</h2>
          <ul>
            <li v-for="post in noticeBoard" :key="post.id" class="post">
              <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  `,
  computed: {
    async posts() {
      return await getPosts();
    },
    async freeBoard() {
      return (await this.posts).filter(post => post.category === '자유게시판');
    },
    async noticeBoard() {
      return (await this.posts).filter(post => post.category === '공지사항');
    }
  }
};



// Write 컴포넌트

const Write = {
  template: `
    <div class="write-container"><br><br><br>
      <h1 style="margin-top: 0;">&nbsp;&nbsp;글쓰기</h1>
      <form @submit.prevent="submitPost">
        <input type="text" v-model="title" placeholder="제목을 입력하세요" required>
        <select v-model="category" required>
          <option disabled value="">카테고리를 선택하세요</option>
          <option value="자유게시판">자유게시판</option>
          <option value="공지사항">공지사항</option>
        </select>
        <textarea v-model="content" placeholder="내용을 입력하세요" required></textarea>
        <button type="submit">등록</button>
      </form>
    </div>
  `,
  data() {
    return { title: '', content: '', category: '' };
  },
  methods: {
    methods: {
      async submitPost() {
        if (!this.title || !this.content) {
          alert('제목과 내용을 입력하세요.');
          return;
        }

        const newPost = {
          title: this.title,
          content: this.content,
          category: this.category,
          views: 0,
          createdAt: new Date()
        };

        await savePost(newPost);
        alert('등록되었습니다!');
        this.$router.push('/board/free');
      }
    }
  }
};

// PostDetail 컴포넌트
const PostDetail = {
  template: `
    <div class="post-detail">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <p class="post-views">조회수: {{ post.views }}</p>
      <div class="post-actions">
        <button @click="editPost">수정</button>
        <button @click="deletePost">삭제</button>
      </div>
      <div v-if="isEditing" class="edit-form">
        <form @submit.prevent="updatePost">
          <input type="text" v-model="editTitle" required>
          <textarea v-model="editContent" required></textarea>
          <button type="submit">수정 완료</button>
        </form>
      </div>
    </div>
  `,
  data() {
    return { post: {}, isEditing: false, editTitle: '', editContent: '' };
  },
  computed: {
    posts() {
      return getPosts();
    },
    currentPost() {
      return this.posts.find(post => post.id === parseInt(this.$route.params.id));
    }
  },
  created() {
    if (this.currentPost) {
      this.post = { ...this.currentPost, views: this.currentPost.views + 1 };
      this.updateViews();
    }
  },
  methods: {
    async updateViews() {
      const postRef = doc(db, "posts", this.post.id);
      await updateDoc(postRef, { views: this.post.views + 1 });
    },
    editPost() {
      this.isEditing = true;
      this.editTitle = this.post.title;
      this.editContent = this.post.content;
    },
    updatePost() {
      const posts = this.posts.map(p => (p.id === this.post.id ? { ...p, title: this.editTitle, content: this.editContent } : p));
      savePosts(posts);
      this.isEditing = false;
    },
    deletePost() {
      savePosts(this.posts.filter(p => p.id !== this.post.id));
      this.$router.push('/board');
    }
  }
};

//마이페이지 컴포넌트
const MyPage = {
  template: `
    <div>
      <nav-bar></nav-bar><br><br><br>
      <h1>&nbsp;&nbsp;마이페이지</h1>
      <div class="container">
        <div class="my-img">
          <img src="../media/1.png" alt="Photo" />
          
  `,
  computed: {
    posts() {
      return getPosts();
    }
  }
};

// VueRouter 설정
const routes = [
  { path: '/', component: Home },
  { path: '/board/:category', component: Board }, // 카테고리에 따라 다른 게시판을 표시
  { path: '/write', component: Write },
  { path: '/post/:id', component: PostDetail }, // PostDetail 라우트 추가
  { path: '/mypage', component: MyPage }
];

const router = new VueRouter({ routes });

// Vue 인스턴스 생성
new Vue({
  el: '#app',
  router
});
