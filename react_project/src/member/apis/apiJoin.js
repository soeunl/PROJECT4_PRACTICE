import apiRequest from '../../commons/libs/apiRequest';

export const apiJoin = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/account', 'POST', form)
      .then((res) => {
        if (res.status !== 201) {
          // 검증 실패
          // 우리가 정의한 json데이터 형식
          reject(res.data);
          return; // 400대이면 아래로 유입이 안된다.
        }
        resolve(res.data); // 성공
      })
      .catch((err) => {
        reject(err);
      });
  });
