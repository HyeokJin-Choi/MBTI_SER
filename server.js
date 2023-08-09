const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const MBTI = require('./mbti');

app.use(bodyParser.json());

app.listen(3000, function(){
    console.log('listening on 3000')
});

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', function(요청,응답){
    응답.sendFile(path.join(__dirname, 'html', '/index.html'));
});

const uri = 'mongodb+srv://mbtitest:qwer1234@mbtitest.d1yubad.mongodb.net/';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// MBTI 값을 저장하는 API
app.post('/save-mbti', async (req, res) => {
    try {
        const { selectedMBTI, userInputMBTI } = req.body;
        // MBTI 모델을 사용하여 데이터를 생성하고 저장
        const newMBTI = new MBTI({ selected: selectedMBTI, user_input: userInputMBTI });
        await newMBTI.save();
        res.status(200).json({ message: 'MBTI 값 저장 완료' });
    } catch (error) {
        res.status(500).json({ message: '오류 발생: ' + error.message });
    }
});