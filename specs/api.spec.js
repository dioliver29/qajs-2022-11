import axios from "axios";
import {jest} from "@jest/globals";

const username = 'diana_stringg11';
const password = 'Qwerty!2342';

test('add new user', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": username,
            "password": password
          },
        headers: { },
    }
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.status).toEqual(201);
    
});

test('user already exists', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": username,
            "password": password
          },
        headers: { },
    }
    try {
        const resp = await axios(config);
    }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(406);
        expect(e.response.data.code).toEqual('1204');
        expect(e.response.data.message).toEqual('User exists!')
    }
});

test('password doesnt meet requirements', async () => {
    const errMessage = 'Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.'
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "diana_string09",
            "password": "string"
          },
        headers: { },
    }
    try {
        const resp = await axios(config);
    }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(400);
        expect(e.response.data.code).toEqual('1300');
        expect(e.response.data.message).toEqual(errMessage);
    }
});

test('successfully generate token', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": username,
            "password": password
          },
        headers: { },
    }
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.status).toEqual(200);
    expect(resp.data.status).toEqual('Success');
    expect(resp.data.result).toEqual('User authorized successfully.');
});

test('generate token failed', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": username,
            "password": "Qwerty!2"
          },
        headers: { },
    }
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.status).toEqual(200);
    expect(resp.data.status).toEqual('Failed');
    expect(resp.data.result).toEqual('User authorization failed.');
    expect(resp.data.token).toEqual(null);
    expect(resp.data.expires).toEqual(null);

});
