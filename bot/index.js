const puppeteer = require('puppeteer');
const mysql = require('mysql2/promise');
const now = ()=>Math.floor(Date.now() / 1000);

async function bot(uuid, connection) {
    const username = "admin";
    const password = "hspacebabycspadminpassword";

    const browser = await puppeteer.launch({headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox']});
    
    const page = await browser.newPage();
    try {
        await page.goto('http://chall:3000/login');
        await page.evaluate((id, pw) => {
            document.querySelector('#username').value = id;
            document.querySelector('#password').value = pw;
        }, username, password);

        await page.click('#submit');
        //await 

        await page.setCookie({
			name: 'FLAG',
			value: 'FLAG{test}',
			domain: "localhost:3000",
			expires: now() + 20,
		});
        
        await page.goto('http://chall:3000/board/view/' + uuid, {timeout: 2000});
        //await page.waitForResponse(response.status() === 200);

        await new Promise(resolve => setTimeout(resolve, 15000));

        await connection.query("UPDATE board SET admin_viewed = 1 WHERE uuid = ?", uuid)
        await console.log("done " + uuid)
    } catch(e) {
        console.error(e);
    }
    await browser.close();
}

async function main() {
    //console.log("zz")
    const connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'zzlol',
        database: 'babycsp'
    });

    const [rows, fields] = await connection.execute("SELECT * FROM board WHERE admin_viewed = 0")
    if (rows) {
        console.log(rows)
        for (r of rows) {
            await bot(r.uuid, connection);
        }
    }

    await connection.end();
}

main()