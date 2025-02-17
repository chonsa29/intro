// 유틸 함수 정의
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
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
      <nav-bar></nav-bar>
      <h1>홈</h1>
      <div class="container">
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
      <nav-bar></nav-bar>
      <h1>게시판</h1>
      <div class="container">
        <section class="board-info">
          <div class="board-img">
            <img src="your_board_image_url" alt="Board Image" />
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
    posts() {
      return getPosts();
    },
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
    <div class="write-container">
      <h1 style="margin-top: 0;">글쓰기</h1>
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
    updateViews() {
      const posts = this.posts.map(p => (p.id === this.post.id ? { ...p, views: p.views + 1 } : p));
      savePosts(posts);
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


// VueRouter 설정
const routes = [
  { path: '/', component: Home },
  { path: '/board/:category', component: Board }, // 카테고리에 따라 다른 게시판을 표시
  { path: '/write', component: Write },
  { path: '/post/:id', component: PostDetail } // PostDetail 라우트 추가
];

const router = new VueRouter({ routes });

// Vue 인스턴스 생성
new Vue({
  el: '#app',
  router
});
