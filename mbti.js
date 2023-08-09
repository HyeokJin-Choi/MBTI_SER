const mongoose = require('mongoose');

// MBTI 스키마 정의
const mbtiSchema = new mongoose.Schema({
    selected: String,
    user_input: String
});

// MBTI 모델 생성
const MBTI = mongoose.model('MBTI', mbtiSchema);

module.exports = MBTI;
