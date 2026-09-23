const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),L=require('./engine.js');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(__dirname+'/data.js','utf8'),ctx);const d=vm.runInContext('catalog',ctx),checks=[];
for(const q of d.questions){let s=L.fresh();L.begin(s,[q],'practice');assert(L.submit(s,d.questions,q.answer)?.ok,q.id);assert.equal(L.submit(s,d.questions,q.answer),null);L.next(s);assert.equal(s.session.score,100);s=L.fresh();L.begin(s,[q],'practice');let bad=q.options?q.options.find(o=>o!==q.answer):'错误答案';assert.equal(L.submit(s,d.questions,bad).ok,false,q.id);L.next(s);assert.equal(s.wrong[q.id].count,1);}
checks.push(`全部${d.questions.length}道题：正确/错误判分、重复提交、计分、入错题库`);
for(const k of Object.values(d.skills)){let q=d.questions.find(q=>q.skill===k.id),s=L.fresh();s.wrong[q.id]={qid:q.id,skill:q.skill,count:1,mastered:false};L.review(s,d.questions,q.id);assert.equal(new Set(s.session.questions.map(q=>q.qid)).size,6,k.id);for(let e of s.session.questions){let q=d.questions.find(q=>q.id===e.qid);assert.equal(q.skill,k.id);L.submit(s,d.questions,q.answer);L.next(s);}assert(s.wrong[q.id].mastered,k.id);assert.equal(L.stats(s,k.id).level,'已掌握');}
checks.push(`全部${Object.keys(d.skills).length}个知识点：原题＋3道同类变式＋2道复测、掌握度`);
let malformed=[null,[],{}, {version:3,history:[null],wrong:{}},{version:3,history:[],wrong:{a:null}}];
for(let v of malformed){let raw=JSON.stringify(v),r=L.load({getItem:()=>raw});assert(r.state.readOnly);assert.equal(r.raw,raw);}
let s=L.fresh();s.activePet='invalid';s.names=null;s.food=-8;s.subject='bad';s.enEdition='bad';s.session={questions:[],answers:[],index:99};s=L.validate(s);assert.equal(s.food,0);assert.equal(s.activePet,'rabbit');assert.equal(s.session,null);assert.equal(s.subject,'zh');
checks.push('空值、异常条目、无效宠物、负星星、错误教材、残缺会话恢复');
s=L.fresh();let q=d.questions.find(q=>q.skill.endsWith('-spelling'));s.history=[{qid:q.id,skill:q.chapter+'-words',ok:true}];s.wrong[q.id]={qid:q.id,skill:q.chapter+'-words'};L.reconcile(s,d.questions);assert.equal(s.history[0].skill,q.skill);assert.equal(s.wrong[q.id].skill,q.skill);checks.push('既有英语词汇记录按稳定题ID迁移为认读/拼写两项');
// Independent numerical checks for every math prompt, not only answer-format checks.
let mathCount=0;
for(let q of d.questions.filter(q=>q.subject==='math')){let p=q.prompt,nums=(p.match(/\d+(?:\.\d+)?/g)||[]).map(Number),a;
 if(/^[\d(]/.test(p)&&/^[\d()+×÷=？]+$/.test(p)){a=Function('return '+p.replace('=？','').replaceAll('×','*').replaceAll('÷','/'))();}
 else if(q.skill==='m3-add')a=nums.reduce((a,b)=>a+b,0);
 else if(q.skill==='m3-sub')a=p.includes('里程表')?nums[1]-nums[0]:nums[0]-nums[1]-nums[2];
 else if(q.skill==='m5-rectangle')a=2*(nums[0]+nums[1]);
 else if(q.skill==='m5-square')a=p.includes('边长是多少')?nums[0]/4:nums[0]*4;
 else if(q.skill==='m8-money')a=p.includes('一共')?nums[0]+nums[1]:nums[0]-nums[1];
 else if(q.skill==='m8-decimal')a=p.includes('较大')?Math.max(...nums):nums[0]+nums[1]/10;
 else if(q.skill==='m1-order'&&p.startsWith('带'))a=nums[0]-nums[1]*nums[2];
 else if(q.skill==='m1-bracket'&&p.startsWith('有'))a=(nums[0]+nums[1])/nums[2];
 else if(q.skill==='m7-time'){if(p.includes('24时'))a=nums[0]+12;else if(p.includes('阅读'))a=(nums[2]-nums[0])*60-nums[1];else a=(nums[1]-nums[0])*60+nums[2];}
 else if(q.skill==='m7-calendar'){if(p.includes('全年'))a=p.startsWith('闰')?366:365;else if(p.startsWith('闰'))a=29;else a=nums[0]===2?28:[4,6,9,11].includes(nums[0])?30:31;}
 else if(q.options)continue;
 else throw Error('未覆盖的数学题 '+q.id+' '+p);
 assert(Math.abs(Number(q.answer)-a)<1e-9,q.id+' '+p+' expected '+a);mathCount++;
}
checks.push(`${mathCount}道数学数值题独立重新计算答案`);
fs.writeFileSync(__dirname+'/full-test-results.json',JSON.stringify({passed:checks},null,2));console.log(checks);
