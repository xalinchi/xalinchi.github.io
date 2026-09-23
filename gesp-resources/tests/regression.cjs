/* Run: NODE_PATH=<path containing jsdom> node gesp-resources/tests/regression.cjs */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
let JSDOM,VirtualConsole;try{({JSDOM,VirtualConsole}=require('jsdom'));}catch{({JSDOM,VirtualConsole}=require('/workspace/scratch/d9c2be09f9e5/qa/node_modules/jsdom'));}
const root=path.resolve(__dirname,'../..'),results=[];let checks=0;
function ok(v,label){assert(v,label);checks++;}
function equal(a,b,label){assert.equal(a,b,label);checks++;}
function load(level,storage={}){
 const errors=[],downloads=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const html=fs.readFileSync(`${root}/gesp${level}/index.html`,'utf8').replace(/<script src="([^"]+)"[^>]*><\/script>/g,(_,url)=>'<script>'+fs.readFileSync(path.resolve(`${root}/gesp${level}`,url.split('?')[0]),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
 const dom=new JSDOM(html,{runScripts:'dangerously',url:`https://xalinchi.github.io/gesp${level}/`,virtualConsole:vc,beforeParse(w){w.HTMLElement.prototype.scrollIntoView=function(){};w.confirm=()=>true;w.URL.createObjectURL=blob=>{downloads.push(blob);return 'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){downloads.push(this.download)};for(const [k,v]of Object.entries(storage))w.localStorage.setItem(k,v);}});
 const w=dom.window,d=w.document;return {w,d,errors,downloads,dom,storage:()=>Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))};
}
function click(app,selector){const b=app.d.querySelector(selector);ok(b,`button exists: ${selector}`);b.click();}
function active(app,id){ok(app.d.getElementById(id).classList.contains('active'),`active ${id}`);equal(app.d.querySelectorAll('.view.active').length,1,'one active content');}
function change(app,id,value){app.d.getElementById(id).value=value;app.d.getElementById(id).dispatchEvent(new app.w.Event('change',{bubbles:true}));}
function input(app,id,value){app.d.getElementById(id).value=value;app.d.getElementById(id).dispatchEvent(new app.w.Event('input',{bubbles:true}));}
for(const L of [3,4]){
 let a=load(L),{w,d}=a;equal(a.errors.length,0,'startup errors');equal(d.querySelectorAll('nav button').length,6,'six main entries');active(a,'home');
 const bank=w.eval('bank'),topics=w.eval('Object.keys(topics)');equal(new Set(bank.map(q=>q[10].id)).size,bank.length,'canonical ids unique');
 for(const q of bank){ok(topics.includes(q[0]),'topic exists');ok(Number.isInteger(q[4])&&q[4]>=0&&q[4]<q[3].length,'answer range');equal(new Set(q[3]).size,q[3].length,'options unique');ok(q[10].sources.length,'source retained');}
 const views=['home','syllabus','map','tips','drill','exam','exercises','papers','mistakes','report','pet',...(L===3?['pitfalls']:['selfstudy'])];
 for(const v of views){w.switchView(v);active(a,v);equal(d.querySelectorAll('nav .active').length,1,'one active nav');}
 w.switchView('checklist');active(a,'exercises');equal(d.querySelectorAll('#programRows [data-catalog-check]').length,L===3?103:72,'merged programming inventory');
 change(a,'programSource','paper');equal(d.querySelectorAll('[data-open-program]').length,24,'24 programming questions');
 change(a,'programSource','');input(a,'programSearch','unlikely-no-such-problem');equal(d.querySelectorAll('#programRows article').length,0,'empty search handled');input(a,'programSearch','');
 const check=d.querySelector('[data-catalog-check]'),cid=check.dataset.catalogCheck;check.checked=true;check.dispatchEvent(new w.Event('change',{bubbles:true}));ok(JSON.parse(w.localStorage.getItem(`gesp${L}ResourcesV1`)).checklist[cid],'checklist persists');
 click(a,'[data-open-program]');active(a,'exercises');const draft=d.querySelector('#programDetail textarea');draft.value='#include <iostream>\nint main(){std::cout<<42;}';draft.dispatchEvent(new w.Event('input'));ok(Object.values(JSON.parse(w.localStorage.getItem(`gesp${L}ResourcesV1`)).drafts).some(x=>x.includes('42')),'draft persisted');
 click(a,'#programDetail [data-download]');ok(a.downloads.some(x=>typeof x==='string'&&x.endsWith('.cpp')),'cpp download');
 // Sampling exercises the non-duplicating sampler and coverage of all original topics.
 for(let run=0;run<30;run++){w.startExam('full');equal(w.eval('exam.length'),20,'20 question sampler');equal(w.eval('new Set(exam.map(q=>q[10].id)).size'),20,'sampler no repeats');equal(w.eval('new Set(exam.map(q=>q[0])).size'),topics.length,'all topics sampled');}
 w.startExam('full');ok(!d.querySelector('#examBox .feedback'),'answers hidden');let answer=w.eval('exam[0][4]');w.pick((answer+1)%w.eval('exam[0][3].length'));equal(w.eval('state.answered'),1,'one answer recorded');w.pick(answer);equal(w.eval('state.answered'),1,'duplicate pick ignored');w.move(1);
 let saved=a.storage();a.dom.window.close();a=load(L,saved);({w,d}=a);active(a,'exam');equal(w.eval('idx'),1,'refresh index restored');equal(w.eval('answers[0].ok'),false,'refresh answer restored');equal(w.eval('state.wrong.length'),1,'wrong persisted');
 // Idempotent finish and pet balance persistence across reload.
 w.startExam('full');for(let i=0;i<20;i++){w.pick(w.eval('exam[idx][4]'));w.move(1);}const food=w.eval('state.food');ok(food>=3,'reward for success');w.finishExam();w.finishExam();equal(w.eval('state.food'),food,'finish reward idempotent');
 w.switchView('report');w.downloadReport('csv');ok(a.downloads.some(x=>typeof x==='string'&&x.endsWith('.csv')),'csv report');w.downloadReport('html');ok(a.downloads.some(x=>typeof x==='string'&&x.endsWith('.html')),'html report');
 // Every topic, both source choices, and double-click defenses.
 for(const t of topics){w.setDrill(t);w.nextDrill();let q=w.eval('drillQ');ok(q,'drill exists');const el=d.querySelectorAll('#drillBox .option')[q[4]],before=w.eval('state.answered');w.answerDrill(q[4],el);w.answerDrill(q[4],el);equal(w.eval('state.answered'),before+1,'drill double answer ignored');}
 w.setDrill(topics[0]);const seen=[];for(let i=0;i<8;i++){w.nextDrill();const key=w.eval('drillQ[10].id');ok(!seen.includes(key),'drill no repeated question before exhaustion');seen.push(key);}
 w.switchView('mistakes');w.startReview(0);ok(d.getElementById('mistakePractice').textContent.includes('重做原题'),'redo original first');let q=w.eval('review.q');click(a,`#mistakePractice .option:nth-child(${q[4]+1})`);click(a,'#redoNext');
 const reviewIds=[];for(let i=0;i<3;i++){q=w.eval('review.q');ok(!reviewIds.includes(q[10].id),'review questions unique');reviewIds.push(q[10].id);click(a,`#mistakePractice .option:nth-child(${q[4]+1})`);if(i<2)w.nextReview();}ok(w.eval('state.wrong[0].mastered'),'three review questions mastered');
 // True exam correctness, 50-point objective score, navigation, refresh and timeout.
 w.switchView('papers');click(a,'[data-paper="2026-03"]');active(a,'papers');ok(!d.querySelector('#papers .feedback'),'no answer before submit');
 const paper=w.GESP_RESOURCES.papers.find(x=>x.id==='2026-03');for(let i=0;i<25;i++){click(a,`[data-jump="${i}"]`);const q=paper.questions[i];click(a,`[data-answer="${q.answer}"]`);}
 click(a,'[data-submit]');ok(d.getElementById('papers').textContent.includes('50 / 50分'),'perfect actual exam 50/50');const st=JSON.parse(w.localStorage.getItem(`gesp${L}ResourcesV1`));ok(st.sessions['2026-03'].submitted,'exam submitted saved');
 click(a,'[data-back]');click(a,'[data-paper="2025-12"]');saved=a.storage();let data=JSON.parse(saved[`gesp${L}ResourcesV1`]);data.sessions['2025-12'].deadline=Date.now()-1000;saved[`gesp${L}ResourcesV1`]=JSON.stringify(data);a.dom.window.close();a=load(L,saved);({w,d}=a);w.switchView('papers');click(a,'[data-paper="2025-12"]');ok(d.getElementById('papers').textContent.includes('计时结束自动交卷'),'expired real exam auto-submit');
 // User-created pet names and shared balance persist without doubling.
 w.switchView('pet');input(a,'petNameInput','测试伙伴');w.savePetName();const balance=w.eval('state.food');w.feedPet();equal(w.eval('state.food'),balance-1,'feed deducts one');saved=a.storage();a.dom.window.close();a=load(L,saved);({w,d}=a);equal(w.eval('state.petNames[state.activePet]'),'测试伙伴','pet name restored');equal(w.eval('state.food'),balance-1,'balance not migrated twice');
 equal(a.errors.length,0,'no runtime errors at end');a.dom.window.close();
 // Tolerant state loading for malformed persisted values.
 a=load(L,{[`gesp${L}State`]:'{"wrong":{},"stats":null,"activePet":"bad"}',gespSharedPetV1:'{bad', [`gesp${L}ResourcesV1`]:'{"sessions":{"bad":null}}'});equal(a.errors.length,0,'malformed state does not crash');a.dom.window.close();
 results.push({level:L,bank:bank.length,topics:topics.length,result:'PASS'});
}
const report={date:'2026-09-23',assertions:checks,results,scope:'JSDOM functional and data regression; browser visual checks reported separately'};fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
