exports.sortTopQuestions = (questions) => {
    let topQuestions = [];

    topQuestions = questions;
    topQuestions = topQuestions.sort((a, b) => a.views + b.views);

    return  topQuestions.slice(0,3);;
}

exports.sortRecentQuestions = (questions) => {
    return questions.sort((a, b) => a.created_at - b.created_at);
  }