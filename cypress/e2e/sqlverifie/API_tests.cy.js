import { faker } from '@faker-js/faker';
const apiData = require("../../fixtures/dataForAPI.json");
let token;
let taskText;
let taskAnswer;
let taskTitle;
let taskID;



describe("User registration testing", () => {

    it("Successful new user registration", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.userName(),
                "email": faker.internet.email(),
                "password": faker.internet.password(11),
                "langKey": apiData.langKey
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it("Unsuccessful registration with the same data", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": apiData.studentLogin,
                "email": apiData.studentEmail,
                "password": apiData.studentpPassword,
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with empty login", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": apiData.emptyLogin,
                "email": faker.internet.email(),
                "password": faker.internet.password(11),
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })   
    
    it("Unsuccessful registration with login > 50", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(51),
                "email": faker.internet.email(),
                "password": faker.internet.password(15),
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with empty password", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": apiData.emptyPassword,
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with password < 4", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password(3),
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with password > 100", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password(101),
                "langKey": apiData.langKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with empty langKey", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password(101),
                "langKey": apiData.emptyLangKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful registration with langKey < 2", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password(101),
                "langKey": apiData.langKeyLess2
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    
    it("Unsuccessful registration with numbers in  langKey", () => {
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password(101),
                "langKey": apiData.LangKeyNumber
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
})

describe("Authorization tests", () => {
    
    it("Successful student auth", () => {
        cy.request({
            method: 'POST',
            url: '/api/authenticate',
            body: {
                "username": apiData.studentLogin,
                "password": apiData.studentpPassword,
                "rememberMe": false
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.id_token;
        })
    })

    it("Successful teacher auth", () => {
        cy.request({
            method: 'POST',
            url: '/api/authenticate',
            body: {
                "username": apiData.teacherLogin,
                "password": apiData.teacherPassword,
                "rememberMe": false
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.id_token;
        })
    })

    it("Successful admin auth", () => {
        cy.request({
            method: 'POST',
            url: '/api/authenticate',
            body: {
                "username": apiData.adminLogin,
                "password": apiData.adminPassword,
                "rememberMe": false
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.id_token;
        })
    })

    it("Unsuccessful auth - empty password", () => {
        cy.request({
          method: 'POST',
          url: '/api/authenticate',
          body: {
            "username": apiData.studentEmail,
            "password": apiData.emptyPassword,
            "rememberMe": false
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful auth - empty login", () => {
        cy.request({
          method: 'POST',
          url: '/api/authenticate',
          body: {
            "username": apiData.emptyLogin,
            "password": apiData.studentpPassword,
            "rememberMe": false
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful auth - non-activated user", () => {
        cy.request({
          method: 'POST',
          url: '/api/authenticate',
          body: {
            "username": apiData.loginNotActive,
            "password": apiData.passwordNotActive,
            "rememberMe": false
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(500);
        })
    })

    it("Unsuccessful auth - wrong user data", () => {
        cy.request({
          method: 'POST',
          url: '/api/authenticate',
          body: {
            "username": faker.username(),
            "password": faker.password(40),
            "rememberMe": false
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful auth - empty rememberMe field", () => {
        cy.request({
          method: 'POST',
          url: '/api/authenticate',
          body: {
            "username": apiData.adminLogin,
            "password": apiData.adminPassword,
            "rememberMe": apiData.emptyRememberMe
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })
})

describe("Task creation tests", () => {
    it("Successful task creation by admin", () => {
        cy.request({
          method: 'POST',
          url: '/api/tasks',
          headers: { 'Authorization': `Bearer ${token}` },
          body: {
            "text": taskText = faker.lorem.words(),
            "answer": taskAnswer = faker.lorem.words(),
            "title": taskTitle = faker.lorem.words()
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.text).to.eq(taskText);
          expect(response.body.answer).to.eq(taskAnswer);
          expect(response.body.title).to.eq(taskTitle);
          taskID = response.body.id;
        })
    })

    it("Unsuccessful task creation - empty fields", () => {
        cy.request({
          method: 'POST',
          url: '/api/tasks',
          headers: { 'Authorization': `Bearer ${token}` },
          body: {
            "text": "",
            "answer": "",
            "title": ""
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful task creation - no auth", () => {
        cy.request({
          method: 'POST',
          url: '/api/tasks',
          body: {
            "text": taskText = faker.lorem.words(),
            "answer": taskAnswer = faker.lorem.words(),
            "title": taskTitle = faker.lorem.words()
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
        })
    })

    it("Unsuccessful task creation - int in fields", () => {
        cy.request({
          method: 'POST',
          url: '/api/tasks',
          headers: { 'Authorization': `Bearer ${token}` },
          body: {
            "text": 111,
            "answer": 222,
            "title": 333
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })

    it("Unsuccessful task creation - boolean in fields", () => {
        cy.request({
          method: 'POST',
          url: '/api/tasks',
          headers: { 'Authorization': `Bearer ${token}` },
          body: {
            "text": true,
            "answer": false,
            "title": true
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        })
    })
})

describe("Get creation task tests", () => {
    before("Task creation", () => {
            cy.request({
              method: 'POST',
              url: '/api/tasks',
              headers: { 'Authorization': `Bearer ${token}` },
              body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
              },
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body.text).to.eq(taskText);
              expect(response.body.answer).to.eq(taskAnswer);
              expect(response.body.title).to.eq(taskTitle);
              taskID = response.body.id;
        })
    })
    
    
    it("Successful Get created task", () => {
        cy.request({
            method: 'GET',
            url: '/api/tasks/' + taskID,
            headers:{ 'Authorization': `Bearer ${token}` }, 
         }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id
        })
    })


    it("Unsuccessful Get non-existent task", () => {
        cy.request({
            method: 'GET',
            url: '/api/tasks/' + faker.number.bigInt,
            headers:{ 'Authorization': `Bearer ${token}` }, 
            failOnStatusCode: false
         }).then((response) => {
            expect(response.status).to.eq(404);
        })
    })

    it("Unsuccessful Get task with no auth", () => {
        cy.request({
            method: 'GET',
            url: '/api/tasks/' + taskID, 
            failOnStatusCode: false
         }).then((response) => {
            expect(response.status).to.eq(401);
            taskID = response.body.id
        })
    })
})

describe("Update task tests", () => {
    beforeEach("Task creation", () => {
        cy.request({
            method: 'POST',
            url: '/api/tasks',
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
              "text": taskText = faker.lorem.words(),
              "answer": taskAnswer = faker.lorem.words(),
              "title": taskTitle = faker.lorem.words()
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id;
        })
    })

    it("Successful task update by admin", () => {
        cy.request({
            method: 'PUT',
            url: '/api/tasks/' + taskID,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id;
        })   
    })

    it("Unsuccessful task update - no auth", () => {
        cy.request({
            method: 'PUT',
            url: '/api/tasks/' + taskID,
            body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })   
    })

    it("Unsuccessful task update - non-existent task", () => {
        cy.request({
            method: 'PUT',
            url: '/api/tasks/' + faker.number.bigInt,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })   
    })

    it("Unsuccessful task update - int in fields", () => {
        cy.request({
            method: 'PUT',
            url: '/api/tasks/' + taskID,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "text": taskText = 111,
                "answer": taskAnswer = 222,
                "title": taskTitle = 333
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })   
    })

    it("Unsuccessful task update - boolean in fields", () => {
        cy.request({
            method: 'PUT',
            url: '/api/tasks/' + taskID,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "text": taskText = false,
                "answer": taskAnswer = true,
                "title": taskTitle = false
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })  
    })
})

describe("Partial update task tests", () => {
    beforeEach("Task creation", () => {
        cy.request({
            method: 'POST',
            url: '/api/tasks',
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
              "text": taskText = faker.lorem.words(),
              "answer": taskAnswer = faker.lorem.words(),
              "title": taskTitle = faker.lorem.words()
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id;
        })
    })

    it("Successful all fieilds task update by admin", () => {
        cy.request({
            method: 'PATCH',
            url:'/api/tasks/' + taskID,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id;
        })
    })

    it("Unsuccessful task update - no auth", () => {
        cy.request({
            method: 'PATCH',
            url: '/api/tasks/' + taskID,
            body: {
                "text": taskText = faker.lorem.words(),
                "answer": taskAnswer = faker.lorem.words(),
                "title": taskTitle = faker.lorem.words()
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })   
    })

})

describe("Task deleting tests", () => {
    beforeEach("Task creation", () => {
        cy.request({
            method: 'POST',
            url: '/api/tasks',
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
              "text": taskText = faker.lorem.words(),
              "answer": taskAnswer = faker.lorem.words(),
              "title": taskTitle = faker.lorem.words()
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.text).to.eq(taskText);
            expect(response.body.answer).to.eq(taskAnswer);
            expect(response.body.title).to.eq(taskTitle);
            taskID = response.body.id;
        })
    })
    
    it ("Successful deleting task by admin", () => {
        cy.request({
            method: 'DELETE',
            url:'/api/tasks/' + taskID,
            headers: { 'Authorization': `Bearer ${token}` },
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it ("Unsuccessful deleting task  - no auth", () => {
        cy.request({
            method: 'DELETE',
            url:'/api/tasks/' + taskID,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })
})

describe("Get all tasks tests", () => {
    it("Successful get tasks by admin", () => {
        cy.request({
            method: 'GET',
            url:'/api/tasks?page=0&size=20',
            headers: { 'Authorization': `Bearer ${token}` },
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it("Unsuccessful get tasks  - no auth", () => {
        cy.request({
            method: 'GET',
            url:'/api/tasks?page=0&size=20',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })
})
