const puppeteer = require('puppeteer');

// Template until signin is totally functional

// UI tests for the user signin page

let browser;
const app = process.env.REACT_APP_API_BASE_URL+`/signin`;

jest.setTimeout(3000000);

// tests if a user can log in. The user dashboard should be displayed if the login is successful 
test('user signin', async () => {
    
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(app);

    // entering valid new user information
    await page.click('input#inputemail');
    await page.type('input#inputemail', 'testuser@datum.io');
    
    await page.click('input#password');
    await page.type('input#password', 'test');
    
    await page.click('button#signIn');

    // check if redirected to dashboard
    await page.goto(process.env.REACT_APP_API_BASE_URL+`/signin`);

    // grab the content of the page which should include the success message
    const page_content = await page.$eval('*', (el) => el.innerText);

    expect(page_content.includes('Welcome Back')).toBe(true);
    
    await browser.close();
});