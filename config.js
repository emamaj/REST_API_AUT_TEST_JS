import { faker } from "@faker-js/faker";
import { expect } from "chai";
import request from "supertest";

const appAdress = 'https://rest-api-demo-yxag.onrender.com'
const api = request(appAdress + '/api');
const apiV2 = request(appAdress + '/api/v2');

export { faker, expect, request, api, apiV2 };