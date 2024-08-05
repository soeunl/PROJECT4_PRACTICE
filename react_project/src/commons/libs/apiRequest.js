export function apiRequest(url, method = 'GET', data, headers) {
  // url - http://naver.com https://naver.com -> 외부 자원이다.
  if (!/^http[s]?:/i.test(url)) {
    // API 서버로 요청 보내는 주소인 경우
    // http[s]?:로 시작하면 외부 자원이다.
    url = process.env.REACT_APP_API_URL + url;
    // /account -> http://localhost:3000/api/v1/account
  }

  const options = {
    mod: 'no-cors',
    method,
  };

  // BODY가 있는 요청인 경우
  if (['POST', 'PUT', 'PATCH'].includes(method.toLocaleUpperCase()) && data) {
    headers = headers ?? {};
    headers['Content-Type'] = 'application/json';
    // BODY 가 있는 경우 Content-Type이 json이라고 헤더에서 알려준다.
    options.headers = headers;
    options.body = JSON.stringify(data); // 요청 데이터를 JSON타입의 문자열로 전송
  }

  return new Promise((reslove, reject) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => reslove(json))
      .catch((err) => reject(err));
  }); // 범용 기능을 편하게 쓰기 위해 만들었다.
}
