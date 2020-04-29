const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
require('dotenv').config();

const targetURL = process.env.URL

main();

async function main (){
  const excelfile = xlsx.readFile('registrationInformation.xlsx')
  const sheet_name_list = excelfile.SheetNames
  const memberlist = xlsx.utils.sheet_to_json( excelfile.Sheets[sheet_name_list[0]] )
  const activeMemberList = memberlist.filter(member => member.Used === 1)
  console.log("アクティブメンバー", activeMemberList);

  // registerメソッドの処理が終わるまで待ってから次のメンバーのアカウントで処理をする
  for (let count in activeMemberList) {
    await register(activeMemberList[count]);
  }
}

async function register (activeMember){
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 対象のホームページを開く
  await page.goto(targetURL);
  await page.click('#login');

  // ID、パスワードを入力する画面に遷移する。5000ms待つのはDOMのレンダリングを待つため。
  await page.waitFor(3000)
  console.log(activeMember)
  await page.type('#userid', String(activeMember.RegistrationId));
  await page.type('#passwd', String(activeMember.Password));
  await page.waitFor(3000)
  // ログインする。
  await page.click('#login');

  // 「新規抽選を申し込む」をクリックする。
  console.log(page.url());
  await page.waitFor(3000);
  await page.click('#goLotSerach');

  const ev = await page.evaluate(() => {
   document.querySelectorAll('input[id="clscd"]')[0];
  });
  await browser.close();
};
