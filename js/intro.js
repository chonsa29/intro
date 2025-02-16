// Home 컴포넌트 정의
const Home = {
    template: `
      <div>
        <h1>홈</h1>
        <section>
          <h2>최근 추가된 글</h2>
          <ul>
            <li v-for="post in posts" :key="post.id">{{ post.title }} - {{ post.content }}</li>
          </ul>
        </section>
        <section>
          <h2>인기 글</h2>
          <ul>
            <!-- 인기 글 목록 표시 -->
          </ul>
        </section>
      </div>
    `,
    data() {
      return {
        posts: JSON.parse(localStorage.getItem('posts')) || []
      };
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
            <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
          </li>
        </ul>
        <h2>공지사항</h2>
        <ul>
          <li v-for="post in noticeBoard" :key="post.id">
            <router-link :to="'/post/' + post.id">{{ post.title }} - {{ post.content }}</router-link>
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
          <textarea v-model="content" placeholder="내용을 입력하세요" required></textarea>
          <select v-model="category" required>
            <option disabled value="">카테고리를 선택하세요</option>
            <option value="자유게시판">자유게시판</option>
            <option value="공지사항">공지사항</option>
          </select>
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
        const post = {
          id: Date.now(),
          title: this.title,
          content: this.content,
          category: this.category,
          attachment: this.attachment ? this.attachment.name : ''
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