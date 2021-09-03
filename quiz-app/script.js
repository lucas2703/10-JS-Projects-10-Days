var quizData = [
    {
        question: 'What does HTML stand for?',
        a: 'High Transmittance Markup Legacy',
        b: 'Hyper Transfer Markup Legacy',
        c: 'Hypo Transfer Markup Legacy',
        d: 'Hyper Text Markup Language',
        correct: 'd'
    }, {
        question: 'What was my dream job as a child?',
        a: 'Policeman',
        b: 'Firefighter',
        c: 'Doctor',
        d: 'Teacher',
        correct: 'c'
    }, {
        question: 'Most used programming lanauge in 2021?',
        a: 'Python',
        b: 'JavaScript',
        c: 'C++',
        d: 'C',
        correct: 'a'
    }, {
        question: 'How many bits in a byte?',
        a: '2',
        b: '4',
        c: '8',
        d: '16',
        correct: 'c'
    }, {
        question: 'How many stars in our galaxy?',
        a: '100 million - 400 million',
        b: '100 billion - 400 billion',
        c: '10 million - 40 million',
        d: '1 trillion - 4 trillion',
        correct: 'b'
    }
]

var quiz = document.getElementById('quiz');
var questionNumber = 0;
var correctAnswers = 0;

function loadQuizData() 
{
    let data = quizData[questionNumber];

    document.getElementById('question-header').innerHTML = data.question;
    document.getElementById('qa').innerHTML = data.a;
    document.getElementById('qb').innerHTML = data.b;
    document.getElementById('qc').innerHTML = data.c;
    document.getElementById('qd').innerHTML = data.d;
}

loadQuizData();

function checkAnswer(answer)
{
    let ans = answer.id;
    if (ans == quizData[questionNumber].correct) correctAnswers += 1;
}

// Submit button functionality
document.getElementById('submit').addEventListener('click', () => {
    let answers = document.getElementsByName('answer');
    for (let i = 0; i < answers.length; i++)
    {
        if (answers[i].checked) 
        {
            checkAnswer(answers[i]);
            questionNumber++;
            answers[i].checked = false;
            // If not at the end of the quiz
            if (questionNumber < quizData.length)
            {
                loadQuizData();
            }
            else
            {
                quiz.innerHTML = '<h2>You correctly answered ' + correctAnswers + '/' + quizData.length + ' questions!</h2>';
            }
        }
    }
})