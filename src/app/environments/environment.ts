export const environment = {
    firebase: {
      projectId: 'iavante-community',
      appId: '1:76314511625:web:613a185dd74f3f32262bd8',
      storageBucket: 'iavante-community.appspot.com',
      apiKey: 'AIzaSyALfsQ8TN8mE5ctau_iMA9Qf-p1HDgUqac',
      authDomain: 'iavante-community.firebaseapp.com',
      messagingSenderId: '76314511625',
    },
    news: {
      mediastack: {
        science:'http://api.mediastack.com/v1/news?access_key=fd433c8f8de79f6cb56eb3f497994796&categories=science&keywords=simulation',
        health:'http://api.mediastack.com/v1/news?access_key=fd433c8f8de79f6cb56eb3f497994796&categories=health&keywords=hospital',
      }
    }
};