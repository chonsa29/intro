// 유틸 함수 정의
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}
// 네비게이션 바 컴포넌트 추가
Vue.component('nav-bar', {
  template: `
    <nav>
      <ul class="nav">
        <li><router-link to="/" class="lists">홈</router-link></li>
        <li class="dropdown">
          <router-link to="/board" class="lists">게시판</router-link>
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
      this.$router.push('/');
    }
  }
});

const Home = {
  template: `
    <div>
      <nav-bar></nav-bar>
      <h1>홈</h1>
      <section class="photo-info">
        <div class="photo">
          <img src="your_photo_url" alt="My Photo" />
        </div>
        <div class="info">
          <p>이름: 홍길동</p>
          <p>생일: 1990-01-01</p>
          <p>나이: 35</p>
          <p>성별: 남</p>
        </div>
      </section>
      <section class="main-content">
        <h2>최근 추가된 글</h2>
        <ul>
          <li v-for="post in validPosts" :key="post.id">
            <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
            <div class="post-views">조회수: {{ post.views }}</div>
          </li>
        </ul>
      </section>
    </div>
  `,
  computed: {
    posts() {
      return getPosts();
    },
    validPosts() {
      return this.posts.filter(post => post.title && post.content);
    }
  }
};



// Board 컴포넌트
const Board = {
  template: `
    <div>
      <h1>게시판</h1>
      <h2>자유게시판</h2>
      <ul>
        <li v-for="post in freeBoard" :key="post.id">
          <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
          <div class="post-views">조회수: {{ post.views }}</div>
        </li>
      </ul>
    </div>
  `,
  computed: {
    posts() {
      return getPosts();
    },
    freeBoard() {
      return this.posts.filter(post => post.category === '자유게시판');
    }
  }
};

// Write 컴포넌트
const Write = {
  template: `
    <div>
      <h1>글쓰기</h1>
      <form @submit.prevent="submitPost">
        <input type="text" v-model="title" placeholder="제목을 입력하세요" required>
        <select v-model="category" required>
          <option disabled value="">카테고리를 선택하세요</option>
          <option value="자유게시판">자유게시판</option>
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
    submitPost() {
      if (!this.title || !this.content) {
        alert('제목과 내용을 입력하세요.');
        return;
      }
      const posts = getPosts();
      savePosts([...posts, { id: Date.now(), title: this.title, content: this.content, category: this.category, views: 0 }]);
      this.$router.push('/board');
    }
  }
};

// PostDetail 컴포넌트
const PostDetail = {
  template: `
    <div>
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <p>조회수: {{ post.views }}</p>
      <button @click="editPost">수정</button>
      <button @click="deletePost">삭제</button>
      <div v-if="isEditing">
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
    updateViews() {
      const posts = this.posts.map(p => (p.id === this.post.id ? { ...p, views: p.views + 1 } : p));
      savePosts(posts);
    },
    deletePost() {
      savePosts(this.posts.filter(p => p.id !== this.post.id));
      this.$router.push('/board');
    }
  }
};

// VueRouter 설정
const routes = [
  { path: '/', component: Home },
  { path: '/board', component: Board },
  { path: '/board/free', component: Board },
  { path: '/board/notice', component: Board },
  { path: '/write', component: Write },
  { path: '/post/:id', component: PostDetail }
];

const router = new VueRouter({ routes });

// Vue 인스턴스 생성
new Vue({
  el: '#app',
  router
});
