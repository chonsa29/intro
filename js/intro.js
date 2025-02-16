// Home 컴포넌트 정의
const Home = {
    template: `
      <div>
        <h1>홈</h1>
        <section class="photo-info">
          <div class="photo">
            <!-- 사진 추가 -->
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
              <div class="post-content">
                <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
              </div>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
          <h2>인기 글</h2>
          <ul>
            <li v-for="post in popularPosts" :key="post.id">
              <div class="post-content">
                <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
              </div>
              <div class="post-views">조회수: {{ post.views }}</div>
            </li>
          </ul>
        </section>
      </div>
    `,
    data() {
      return {
        posts: JSON.parse(localStorage.getItem('posts')) || []
      };
    },
    computed: {
      validPosts() {
        return this.posts.filter(post => post.title && post.content);
      },
      popularPosts() {
        return this.validPosts.slice().sort((a, b) => b.views - a.views).slice(0, 5); // 조회수 기준으로 상위 5개 글 표시
      }
    }
  };
  
  // Board 컴포넌트 정의
  const Board = {
    template: `
      <div>
        <h1>게시판</h1>
        <h2>자유게시판</h2>
        <ul>
          <li v-for="post in freeBoard" :key="post.id">
            <div class="post-content">
              <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
            </div>
            <div class="post-views">조회수: {{ post.views }}</div>
          </li>
        </ul>
        <h2>공지사항</h2>
        <ul>
          <li v-for="post in noticeBoard" :key="post.id">
            <div class="post-content">
              <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
            </div>
            <div class="post-views">조회수: {{ post.views }}</div>
          </li>
        </ul>
      </div>
    `,
    data() {
      return {
        posts: JSON.parse(localStorage.getItem('posts')) || []
      };
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
  
  // Write 컴포넌트 정의
  const Write = {
    template: `
      <div>
        <h1>글쓰기</h1>
        <form @submit.prevent="submitPost">
          <input type="text" v-model="title" placeholder="제목을 입력하세요" required>
          <select v-model="category" required>
            <option disabled value="">카테고리를 선택하세요</option>
            <option value="자유게시판">자유게시판</option>
            <option value="공지사항">공지사항</option>
          </select>
          <textarea v-model="content" placeholder="내용을 입력하세요" required></textarea>
          <input type="file" @change="onFileChange">
          <button type="submit">등록</button>
        </form>
      </div>
    `,
    data() {
      return {
        title: '',
        content: '',
        category: '',
        attachment: null
      };
    },
    methods: {
      submitPost() {
        // 제목과 내용이 비어있지 않은지 확인
        if (!this.title || !this.content) {
          alert('제목과 내용을 입력하세요.');
          return;
        }
        const post = {
          id: Date.now(),
          title: this.title,
          content: this.content,
          category: this.category,
          attachment: this.attachment ? this.attachment.name : '',
          views: 0 // 초기 조회수 0으로 설정
        };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        this.$router.push('/board');
      },
      onFileChange(event) {
        this.attachment = event.target.files[0];
      }
    }
  };
  
  // PostDetail 컴포넌트 정의
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
            <input type="text" v-model="editTitle" placeholder="제목을 입력하세요" required>
            <textarea v-model="editContent" placeholder="내용을 입력하세요" required></textarea>
            <button type="submit">수정 완료</button>
          </form>
        </div>
      </div>
    `,
    data() {
      return {
        post: {},
        isEditing: false,
        editTitle: '',
        editContent: ''
      };
    },
    created() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      this.post = posts.find(post => post.id === parseInt(this.$route.params.id));
      this.post.views++; // 조회수 증가
      localStorage.setItem('posts', JSON.stringify(posts)); // 증가된 조회수를 로컬스토리지에 저장
      this.editTitle = this.post.title;
      this.editContent = this.post.content;
    },
    methods: {
      editPost() {
        this.isEditing = true;
      },
      updatePost() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const index = posts.findIndex(post => post.id === this.post.id);
        if (index !== -1) {
          posts[index].title = this.editTitle;
          posts[index].content = this.editContent;
          localStorage.setItem('posts', JSON.stringify(posts));
          this.post.title = this.editTitle;
          this.post.content = this.editContent;
          this.isEditing = false;
        }
      },
      deletePost() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const index = posts.findIndex(post => post.id === this.post.id);
        if (index !== -1) {
          posts.splice(index, 1);
          localStorage.setItem('posts', JSON.stringify(posts));
          this.$router.push('/board');
        }
      }
    }
  };
  
  // MyPage 컴포넌트 정의
  const MyPage = {
    template: `
      <div>
        <h1>마이페이지</h1>
        <p>이름: 홍길동</p>
        <p>생일: 1990-01-01</p>
        <p>나이: 35</p>
        <p>성별: 남</p>
      </div>
    `
  };
  
  // VueRouter 설정
  const routes = [
    { path: '/', component: Home },
    { path: '/board', component: Board },
    { path: '/board/free', component: Board },
    { path: '/board/notice', component: Board },
    { path: '/write', component: Write },
    { path: '/mypage', component: MyPage },
    { path: '/post/:id', component: PostDetail }
  ];
  
  const router = new VueRouter({
    routes
  });
  
  // Vue 인스턴스 생성
  new Vue({
    el: '#app',
    router
  });
  