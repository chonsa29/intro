const express = require('express');
const oracledb = require('oracledb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정 (모든 도메인 허용)
app.use(cors());
app.use(express.json());

app.get('/TBL_BOARD', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM TBL_BOARD');

        console.log("🔍 DB 응답 데이터:", result.rows); // 데이터 출력 확인

        res.json({ data: result.rows }); // JSON 형식으로 감싸서 반환
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) await connection.close();
    }
});

// Oracle DB 연결 설정
async function initDB() {
    try {
        console.log("🔍 DB_HOST:", process.env.DB_HOST); // 디버깅용 로그 추가
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_HOST,
        });
        console.log('✅ Oracle DB 연결 성공');
    } catch (err) {
        console.error('❌ DB 연결 실패:', err);
    }
}

// 게시글 목록 API
app.get('/TBL_BOARD', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM TBL_BOARD`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }   
        );

        console.log("🔍 변환된 JSON 데이터:", result.rows);
        res.json(result.rows); // JSON 응답
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) await connection.close();
    }
});



// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
    initDB();
});
