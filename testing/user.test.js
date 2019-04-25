process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/user');


describe('Test the paths for Race', () => {
    test('Should be defined', () => {
        expect(create).toBeDefined();
        request(create)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Should be defined', () => {
        // request(app.login);
        expect(login).toBeDefined();
        request(login)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Should be defined', () => {
        // request(app.update);
        expect(update).toBeDefined();
        request(update)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Should be defined', () => {
        // request(app.logout);
        expect(logout).toBeDefined();
        request(logout)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Should be defined', () => {
        // request(app.deleteUser);
        expect(deleteUser).toBeDefined();
        request(deleteUser)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Should be defined', () => {
        // request(app.findById);
        expect(findById).toBeDefined();
        request(findById)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test("Create a User, Expetc 201 POST users /", () => {
        let data = {
            "id": 100,
            "first_name": "Test ",
            "last_name": "User",
            "email": "abc@abc.com",
            "password": "abcdefg",
            "age": 20,
            "desired_pace": "14:16",
            "city": "Austin",
            "state": "TX",
            "zipcode": 78758,
            "phone": "(512)463-2366",
            "admin": 0
        }
        request(app)
            .post('/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });

    test("Create User Expect an Error(500) due do already existing id POST users /", () => {
        let data = {
            "id": 100,
            "first_name": "Test ",
            "last_name": "User",
            "email": "abc@abc.com",
            "password": "abcdefg",
            "age": 20,
            "desired_pace": "14:16",
            "city": "Austin",
            "state": "TX",
            "zipcode": 78758,
            "phone": "(512)463-2366",
            "admin": 1
        }
        request(app)
            .post('/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });

    test("Create Admin POST users /", () => {
        let data = {
            "id": 102,
            "first_name": "Admin ",
            "last_name": "User",
            "email": "admin@abc.com",
            "password": "admin123",
            "age": 20,
            "desired_pace": "14:16",
            "city": "Austin",
            "state": "TX",
            "zipcode": 78758,
            "phone": "(512)463-2366",
            "admin": 1
        }
        request(app)
            .post('/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });


    test("Update User  /:id", () => {
        let data = {
            "id": 102,
            "first_name": "Admin ",
            "last_name": "Admin_Last_name",
            "email": "admin@abc.com",
            "password": "admin123",
            "age": 20,
            "desired_pace": "14:16",
            "city": "Austin",
            "state": "TX",
            "zipcode": 78758,
            "phone": "(512)463-2366",
            "admin": 1
        }
        request(app)
            .post('/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });
});