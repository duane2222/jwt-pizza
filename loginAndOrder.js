import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 10, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('login and order - https://pizza.duane2222.xyz/', function () {
    // homepage
    response = http.get('https://pizza.duane2222.xyz/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Thu, 31 Oct 2024 21:54:35 GMT',
        'if-none-match': '"4df2acc1fa938cff2b52ad5fa14ed7a3"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(14.3)

    // login
    response = http.put(
      'https://pizza-service.duane2222.xyz/api/auth',
      '{"email":"aa@a","password":"a"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
          'content-type': 'application/json',
          origin: 'https://pizza.duane2222.xyz',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
    console.log(response.body);
    fail('Login was *not* 200');
    }
    const token = response.json().token;
    sleep(8.4)

    // get menu
    response = http.get('https://pizza-service.duane2222.xyz/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
        'content-type': 'application/json',
        origin: 'https://pizza.duane2222.xyz',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    // get franchise
    response = http.get('https://pizza-service.duane2222.xyz/api/franchise', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
        'content-type': 'application/json',
        origin: 'https://pizza.duane2222.xyz',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(13.1)

    // pizza purchase
    response = http.post(
      'https://pizza-service.duane2222.xyz/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json',
          origin: 'https://pizza.duane2222.xyz',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if(!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      console.log(token);
      fail('Order was *not* 200');
    }

    const jwt = response.json().jwt;
    sleep(2.5)

    // verify pizza
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      `{"jwt":${jwt}}`,
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7',
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json',
          origin: 'https://pizza.duane2222.xyz',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
      }
    )
    if(!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      console.log("JWT: ", jwt);
      fail('Verify was *not* 200');
    }
  })
}