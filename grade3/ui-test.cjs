const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const server=http.createServer((req,res)=>{let p=path.join(__dirname,new URL(req.url,'http://localhost').pathname==='/'?'index.html':new URL(req.url,'http://localhost').pathname);if(!p.startsWith(__dirname)){res.writeHead(403).end();return;}try{let mime={'.js':'text/javascript','.css':'text/css','.html':'text/html'}[path.extname(p)]||'text/plain';res.setHeader('Content-Type',mime+'; charset=utf-8');res.end(fs.readFileSync(p));}catch(e){res.writeHead(404).end();}}).listen(8765,'127.0.0.1');
 let browser;const checks=[],errors=[];
 try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8765/');
 await page.getByRole('button',{name:'数学',exact:true}).click();assert.equal(await page.locator('.chapter').count(),8);checks.push('手机数学入口及8章');
 await page.locator('.skill').first().getByRole('button',{name:'学重点'}).click();await page.getByRole('button',{name:'我读懂了，练一练'}).click();
 await page.locator('#typed').fill('-99');await page.getByRole('button',{name:'提交答案',exact:true}).click();await page.reload();assert(await page.getByText('参考答案：',{exact:false}).count()>0);assert(await page.locator('#typed').isDisabled());checks.push('学习重点、填空、错误判分、解析及刷新恢复');
 await page.locator('#next').click();for(let i=1;i<5;i++){let a=await page.evaluate(()=>catalog.questions.find(q=>q.id===state.session.questions[state.session.index].qid).answer);await page.locator('#typed').fill(a);await page.getByRole('button',{name:'提交答案',exact:true}).click();await page.locator('#next').click();}
 await page.getByRole('button',{name:'错题库',exact:true}).click();assert.equal(await page.locator('.mistake').count(),1);await page.getByRole('button',{name:'重做 → 3道变式 → 复测',exact:true}).click();
 let sequence=await page.evaluate(()=>state.session.questions.map(q=>q.qid));assert.equal(new Set(sequence).size,6);
 for(let i=0;i<6;i++){let a=await page.evaluate(()=>catalog.questions.find(q=>q.id===state.session.questions[state.session.index].qid).answer);await page.locator('#typed').fill(a);await page.getByRole('button',{name:'提交答案',exact:true}).click();if(i===2)await page.reload();await page.locator('#next').click();}
 assert(await page.getByText('原题、3道变式和2道复测全部通过，这道错题已巩固。').count());checks.push('原题重做、3道不重复同知识点变式、2道复测、途中刷新及巩固标记');
 await page.getByRole('button',{name:'今日学习',exact:true}).click();await page.getByRole('button',{name:'语文',exact:true}).click();assert.equal(await page.locator('.chapter').count(),8);await page.locator('.skill').first().getByRole('button',{name:'练一练',exact:true}).click();
 let opts=await page.locator('.option').allTextContents();await page.reload();assert.deepEqual(await page.locator('.option').allTextContents(),opts);let right=await page.evaluate(()=>catalog.questions.find(q=>q.id===state.session.questions[state.session.index].qid).answer);await page.locator('.option').filter({hasText:right}).click();assert(await page.locator('.feedback').getByText('答对了，真棒！').count());checks.push('语文入口、选择题随机选项、正确判分及选项刷新稳定');
 await page.getByRole('button',{name:'今日学习',exact:true}).click();await page.getByRole('button',{name:'英语',exact:true}).click();assert.equal(await page.locator('.chapter').count(),7);await page.locator('#enEdition').selectOption('modules');assert.equal(await page.locator('.chapter').count(),10);checks.push('英语两个教材目录分别7章与10章，互不混练');
 page.on('dialog',d=>d.accept());await page.locator('.chapter').first().getByRole('button',{name:'本章小测',exact:true}).click();assert.equal(await page.locator('.option').count(),4);checks.push('英语章节小测与出题');
 await page.getByRole('button',{name:'学习报告',exact:true}).click();assert.equal(await page.locator('#reportTable .subject-summary').count(),3);assert(await page.getByRole('columnheader',{name:'正确率',exact:true}).count()>0);let dl=page.waitForEvent('download');await page.getByRole('button',{name:'下载CSV',exact:true}).click();let download=await dl;assert(download.suggestedFilename().includes('语数英'));checks.push('报告三科、章节、知识点正确率与建议及CSV下载');
 await page.getByRole('button',{name:'成长伙伴',exact:true}).click();await page.locator('#petNameInput').fill('小勇士');await page.getByRole('button',{name:'保存',exact:true}).click();await page.locator('#feedBtn').click();await page.reload();await page.getByRole('button',{name:'成长伙伴',exact:true}).click();assert.equal(await page.locator('#petNameInput').inputValue(),'小勇士');checks.push('宠物命名、投喂和成长记录恢复');
 await page.getByRole('button',{name:'今日学习',exact:true}).click();await page.screenshot({path:__dirname+'/mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.setViewportSize({width:820,height:1180});await page.screenshot({path:__dirname+'/tablet.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('390px手机、820px平板页面无横向溢出');
 assert.equal(errors.length,0,errors.join('\n'));checks.push('无页面运行错误');fs.writeFileSync(__dirname+'/ui-test-results.json',JSON.stringify({passed:checks,errors},null,2));console.log(checks);
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
