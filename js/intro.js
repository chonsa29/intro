import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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


// 유틸 함수 정의
async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  let posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
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
        <li><router-link to="/board/free" class="lists">게시판</router-link></li>
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
            <div class="post-details">
              <div class="post-views">조회수: {{ post.views }}</div>
              <div class="post-likes">👍 {{ post.likes }}</div>
              <div class="post-dislikes">👎 {{ post.dislikes }}</div>
            </div>
          </li>
        </ul>
        <h2>인기글</h2>
        <ul>
          <li v-for="post in popularPosts" :key="post.id" class="post">
            <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
            <div class="post-details">
              <div class="post-views">조회수: {{ post.views }}</div>
              <div class="post-likes">👍 {{ post.likes }}</div>
              <div class="post-dislikes">👎 {{ post.dislikes }}</div>
            </div>
          </li>
        </ul>
      </section>
      </div>
    </div>
  `,
  data() {
    return {
      posts: []
    };
  },
  async created() {
    this.posts = await getPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts]
        .filter(post => post.title && post.content)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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
            <div class="post-details">
              <div class="post-views">조회수: {{ post.views }}</div>
              <div class="post-likes">👍 {{ post.likes }}</div>
              <div class="post-dislikes">👎 {{ post.dislikes }}</div>
            </div>
          </li>
        </ul>
        <h2>공지사항</h2>
        <ul>
          <li v-for="post in noticeBoard" :key="post.id" class="post">
            <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
            <div class="post-details">
              <div class="post-views">조회수: {{ post.views }}</div>
              <div class="post-likes">👍 {{ post.likes }}</div>
              <div class="post-dislikes">👎 {{ post.dislikes }}</div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
  `,
  data() {
    return {
      posts: []
    };
  },
  async created() {
    this.posts = await getPosts();
  },
  computed: {
    freeBoard() {
      return this.posts.filter(post => post.category === '자유게시판');
    },
    noticeBoard() {
      return this.posts.filter(post => post.category === '공지사항');
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
    return {
      title: '',
      content: '',
      category: ''
    };
  },
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
      this.$router.push(`/board/${this.category}`);
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
      <div class="post-votes">
        <button @click="likePost">👍 추천 {{ post.likes }}</button>
        <button @click="dislikePost">👎 비추천 {{ post.dislikes }}</button>
      </div>
      <div v-if="isEditing" class="edit-form">
        <form @submit.prevent="updatePost">
          <input type="text" v-model="editTitle" required>
          <textarea v-model="editContent" required></textarea>
          <button type="submit">수정 완료</button>
        </form>
      </div>
    </div>
  `, data() {
    return {
      post: {},
      isEditing: false,
      editTitle: '',
      editContent: ''
    };
  },
  async created() {
    const posts = await getPosts();
    this.post = posts.find(post => post.id === this.$route.params.id);
    
    if (this.post) {
      this.post.views += 1; // 조회수 증가
      await this.updateViews();
    }
  },
  methods: {
    async updateViews() {
      const postRef = doc(db, "posts", this.post.id);
      await updateDoc(postRef, { views: this.post.views });
    },
    editPost() {
      this.isEditing = true;
      this.editTitle = this.post.title;
      this.editContent = this.post.content;
    },
    async updatePost() {
      const postRef = doc(db, "posts", this.post.id);
      await updateDoc(postRef, { title: this.editTitle, content: this.editContent });

      this.post.title = this.editTitle;
      this.post.content = this.editContent;
      this.isEditing = false;
    },
    async deletePost() {
      const postRef = doc(db, "posts", this.post.id);
      await deleteDoc(postRef);
      alert('삭제되었습니다!');
      this.$router.push('/board');
    },
    async likePost() {
      const postRef = doc(db, "posts", this.post.id);
      const newLikes = this.post.likes + 1;
      await updateDoc(postRef, { likes: newLikes });
      this.post.likes = newLikes;
    },
    async dislikePost() {
      const postRef = doc(db, "posts", this.post.id);
      const newDislikes = this.post.dislikes + 1;
      await updateDoc(postRef, { dislikes: newDislikes });
      this.post.dislikes = newDislikes;
    }
  }
};

//마이페이지 컴포넌트
const MyPage = {
  template: `
  <div>
    <nav-bar></nav-bar><br><br><br>
    <h1>&nbsp;&nbsp;마이페이지</h1>
    <div class="container2">
      <div class="profile-section">
        <img :src="profileImage" alt="Profile Picture" class="profile-image">
        <input type="file" @change="handleFileUpload">
      </div>
      <div class="profile-info">
        <div class="form-group">
          <label for="name">이름:</label>
          <input type="text" v-model="name">
        </div>
        <div class="form-group">
          <label for="name">이름:</label>
          <input type="text" v-model="name" :disabled="!isEditing">
        </div>
        <div class="form-group">
          <label for="username">아이디:</label>
          <input type="text" v-model="username" disabled>
        </div>
        <div class="form-group">
          <label for="password">비밀번호:</label>
          <input type="password" v-model="password" :disabled="!isEditing">
        </div>
        <button @click="toggleEdit">{{ isEditing ? '수정 완료' : '수정' }}</button>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      name: '천상욱',
      username: 'test1234',
      password: 'asdfasdf',
      profileImage: 'https://github.com/chonsa29/intro/blob/main/media/1.png',
      profileImageFile: null,
      isEditing: false
    };
  },
  async created() {
    const userDoc = await getDoc(doc(db, "users", "user_id")); // 사용자 ID로 변경하세요
    if (userDoc.exists()) {
      const userData = userDoc.data();
      this.name = userData.name;
      this.username = userData.username;
      this.password = userData.password;
      this.profileImage = userData.profileImage;
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.profileImageFile = file;
      this.profileImage = URL.createObjectURL(file);
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.updateProfile();
      }
    },
    async updateProfile() {
      if (this.profileImageFile) {
        const storageRef = ref(storage, 'profileImages/' + this.profileImageFile.name);
        await uploadBytes(storageRef, this.profileImageFile);
        this.profileImage = await getDownloadURL(storageRef);
      }

      const userRef = doc(db, "users", "user_id"); // 사용자 ID로 변경하세요
      await updateDoc(userRef, {
        name: this.name,
        username: this.username,
        password: this.password,
        profileImage: this.profileImage
      });

      alert('프로필이 수정되었습니다.');
    }
  }
};
// VueRouter 설정
const routes = [
  { path: '/', component: Home },
  { path: '/board/:category', component: Board },
  { path: '/write', component: Write },
  { path: '/post/:id', component: PostDetail },
  { path: '/mypage', component: MyPage }
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router
});

