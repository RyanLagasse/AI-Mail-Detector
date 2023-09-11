const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.zerogpt.com/');

  // Take a screenshot of the page before typing text
  await page.screenshot({ path: 'before-typing.png' });

  // Paste or type text to analyze 
  await page.type('textarea', 'Personalize the email by addressing the recipient by name and using language that is appropriate for your relationship with them. Personalize the email by addressing the recipient by name and using language that is appropriate for your relationship with them.Personalize the email by addressing the recipient by name and using language that is appropriate for your relationship with them. Personalize the email by addressing the recipient by name and using language that is appropriate for your relationship with them.');

  // Take a screenshot of the page before clicking the button
  await page.screenshot({ path: 'before-clicking.png' });

  // Click the "Run GPTZero" button
  await page.waitForSelector('button');
  await page.click('.scoreButton');

  // Take a screenshot of the page after clicking the button
  await page.screenshot({ path: 'after-clicking.png' });

  // Wait for results to load
  await page.waitForSelector('.percentage-div');

  // Extract the prediction results
  const results = await page.evaluate(() => {
    //const aiScoreElement = document.querySelectorAll('.header-text[data-v-262e01d5]');
    const aiScoreElement = document.querySelectorAll('.header-text[data-v-262e01d5]');
    const thirdAiScoreElement = aiScoreElement[2];
    const aiScore = thirdAiScoreElement.innerText;
    return {
      aiScore
    };
  });

  console.log(results);

  await browser.close();

})();