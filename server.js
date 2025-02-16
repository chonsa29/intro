const express = require('express');
const oracledb = require('oracledb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정 (모든 도메인 허용)
app.use(cors());
app.use(express.json());

// Oracle DB 연결 설정
async function initDB() {
    try {
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
app.get('/board', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT * FROM board ORDER BY created_at DESC');
        res.json(result.rows);
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
