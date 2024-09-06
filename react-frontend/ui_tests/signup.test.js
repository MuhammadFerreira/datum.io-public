const puppeteer = require('puppeteer');

// UI tests for the user registration page

let browser;
const app = 'http://localhost:3000/register';

jest.setTimeout(3000000);

// tests dynamic error message when an email with an invalid format is entered 
test('invalid email format', async () => {
    
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(app);

    await page.click('input#inputEmail');
    await page.type('input#inputEmail', 'ga');
    // error message appears when user leaves the email textbox 
    await page.click('input#password'); 

    // grab the new content of the page which should include the error message
    const page_content = await page.$eval('*', (el) => el.innerText);
    
    expect(page_content.includes('Invalid email format')).toBe(true);
    
    await browser.close();
});

// tests dynamic error message when a password with an invalid format is entered 
test('invalid password format', async () => {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
 
    await page.goto(app);

    await page.click('input#password');
    await page.type('input#password', 'pw');
    // error message appears when user leaves the password textbox 
    await page.click('input#inputEmail');
     
    // grab the new content of the page which should include the error message
    const page_content = await page.$eval('*', (el) => el.innerText);
    
    expect(page_content.includes('Invalid password format')).toBe(true);

    await browser.close();
});

// tests if passwords entered by user are the same 
test('password match check', async () => {
    
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(app);

    // entering valid new user information
    await page.click('input#firstName');
    await page.type('input#firstName', 'John');

    await page.click('input#lastName');
    await page.type('input#lastName', 'Doe');

    await page.click('input#inputEmail');
    await page.type('input#inputEmail', 'jd0e1@gmail.com');
    
    await page.click('input#password');
    await page.type('input#password', 'w9M$*j}eP7nh?');

    await page.click('input#password2');
    await page.type('input#password2', 'w9M$*j}eP7nh');
    
    await page.evaluate(()=>document.querySelector('#myCheck').click());
    
    await page.evaluate(()=>document.querySelector('#signUp').click());

    // grab the content of the page which should include the error message
    const page_content = await page.$eval('*', (el) => el.innerText);

    expect(page_content.includes("Password don't match!")).toBe(true);
    
    await browser.close();
});

// tests if a user can be registered. A success message should be displayed if the registration is complete 
test('register user', async () => {
    
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(app);

    // entering valid new user information
    await page.click('input#firstName');
    await page.type('input#firstName', 'John');

    await page.click('input#lastName');
    await page.type('input#lastName', 'Doe');

    await page.click('input#inputEmail');
    await page.type('input#inputEmail', 'jd0e1@gmail.com');
    
    await page.click('input#password');
    await page.type('input#password', 'w9M$*j}eP7nh?');

    await page.click('input#password2');
    await page.type('input#password2', 'w9M$*j}eP7nh?');

    await page.evaluate(()=>document.querySelector('#myCheck').click());
    
    await page.evaluate(()=>document.querySelector('#signUp').click());

    // check if redirected to a page with a success message
    await page.waitForSelector('#success');

    // grab the content of the page which should include the success message
    const page_content = await page.$eval('*', (el) => el.innerText);

    expect(page_content.includes('Success')).toBe(true);
    
    await browser.close();
});