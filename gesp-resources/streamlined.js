/* Shared navigation and training reliability for GESP 3/4. */
(function(){
'use strict';
const L=window.GESP_RESOURCES.level,$=id=>document.getElementById(id),h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups={home:[['home','学习首页'],['pet','成长伙伴']],learn:[['syllabus','考试提纲'],...($('selfstudy')?[['selfstudy','视频自学']]:[]),['map','知识地图'],...($('pitfalls')?[['pitfalls','易错诊断']]:[]),['tips',L===4?'基础回顾与技巧':'重点与技巧']],practice:[['drill','专项训练'],['exam','综合模拟'],['exercises','编程题库']],papers:[['papers','历年真题']],mistakes:[['mistakes','错题巩固']],report:[['report','学习报告']]};
const mainLabels={home:'学习首页',learn:'知识学习',practice:'刷题训练',papers:'历年真题',mistakes:'错题巩固',report:'学习报告'};
const nav=document.querySelector('nav');nav.innerHTML=Object.entries(mainLabels).map(([id,label])=>`<button class="tab" data-group="${id}">${label}</button>`).join('');nav.setAttribute('aria-label','主导航');
const sub=document.createElement('div');sub.className='actions compact-subnav';sub.setAttribute('aria-label','栏目导航');nav.after(sub);
const prevSwitch=switchView;
switchView=function(v){
 if(v==='checklist')v='exercises';if(groups[v])v=groups[v][0][0];
 if(!$(v))return;
 prevSwitch(v);
 const group=Object.keys(groups).find(k=>groups[k].some(x=>x[0]===v))||'home';
 nav.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b.dataset.group===group);b.setAttribute('aria-current',b.dataset.group===group?'page':'false');});
 sub.innerHTML=groups[group].length<2?'':groups[group].map(([id,label])=>`<button data-section="${id}" class="${id===v?'primary':''}" aria-current="${id===v?'page':'false'}">${label}</button>`).join('');
};
nav.onclick=e=>{const b=e.target.closest('[data-group]');if(b)switchView(b.dataset.group);};
sub.onclick=e=>{const b=e.target.closest('[data-section]');if(b)switchView(b.dataset.section);};
const style=document.createElement('style');style.textContent=`.compact-subnav{max-width:1180px;margin:8px auto 16px;padding:0 14px;flex-wrap:wrap}nav{display:flex;flex-wrap:wrap}nav .tab{white-space:normal}main,section,.card,.resource-row{min-width:0}.question,.resource-content{overflow-wrap:anywhere}.resource-content pre{max-width:100%;overflow:auto}.resource-filters input,.resource-filters select{max-width:100%}.grid{min-width:0}.options .option{min-width:0;overflow-wrap:anywhere}@media(max-width:600px){nav .tab{flex:1 1 29%;padding:10px 6px;font-size:14px}.compact-subnav button{font-size:14px}h2{overflow-wrap:anywhere}.resource-filters{display:grid;grid-template-columns:1fr}.resource-editor textarea{box-sizing:border-box;width:100%}}`;
document.head.append(style);
// Correct cross-linked topic buttons while retaining all original teaching text.
if(L===3&&$('pitfalls')){$('pitfalls').querySelectorAll('button').forEach(b=>{if(b.textContent.includes('位运算'))b.onclick=()=>setDrill('k5');});}
const homeNote=document.createElement('div');homeNote.className='card resource-entry';homeNote.innerHTML=`<h3>先学知识，再做练习</h3><p>本级训练题库 ${bank.length} 道，已合并重复题。基础内容和拓展内容均可在知识学习中查阅。</p><div class="actions"><button data-start="learn">知识学习</button><button data-start="practice">开始训练</button><button data-start="pet">成长伙伴</button><a href="../gesp${L===3?4:3}/">切换到 C++ ${L===3?4:3}级</a></div>`;homeNote.onclick=e=>{const b=e.target.closest('[data-start]');if(b)switchView(b.dataset.start);};$('home').querySelector('.resource-entry')?.remove();$('home').prepend(homeNote);
// Wrong records preserve original ids and attempts, merging only the same stem and answer.
function wrongKey(x){return JSON.stringify([String(x.q).trim(),String(x.a).trim()]);}
function consolidateWrong(){const seen=new Map(),result=[];for(const x of state.wrong){const key=wrongKey(x);if(!seen.has(key)){seen.set(key,x);result.push(x);}else{const kept=seen.get(key);kept.attempts=(kept.attempts||1)+(x.attempts||1);kept.previousIds=[...new Set([...(kept.previousIds||[]),x.id,...(x.previousIds||[])])];if(!x.mastered)kept.mastered=false;}}state.wrong=result;}
consolidateWrong();const originalSave=save;save=function(){consolidateWrong();return originalSave();};save();
// Durable timed training, unlike a decrement-only timer, expires correctly after tab sleep.
const sessionKey=`gesp${L}TrainingSessionV2`;let training=null;
function storeTraining(){if(!training)return;training.questions=exam.map(q=>q[10].id);training.answers=answers;training.index=idx;training.finished=examFinished;localStorage.setItem(sessionKey,JSON.stringify(training));}
function liveTimer(){clearInterval(timer);timer=setInterval(()=>{if(!training||examFinished)return;seconds=Math.max(0,Math.ceil((training.deadline-Date.now())/1000));if(seconds===0)finishExam();else renderTimer();},1000);}
const originalStart=startExam,originalPick=pick,originalMove=move,originalFinish=finishExam;
startExam=function(mode){originalStart(mode);training={deadline:Date.now()+60*60*1000,finished:false};storeTraining();liveTimer();};
pick=function(i){if(training&&Date.now()>=training.deadline){finishExam();return;}originalPick(i);storeTraining();};
move=function(d){originalMove(d);storeTraining();};
finishExam=function(){originalFinish();storeTraining();};
try{training=JSON.parse(localStorage.getItem(sessionKey)||'null');}catch{training=null;}
if(training&&!training.finished&&Array.isArray(training.questions)&&training.questions.length===20&&Number.isFinite(training.deadline)){
 const lookup=new Map(bank.map(q=>[q[10].id,q]));const restored=training.questions.map(id=>lookup.get(id));
 if(restored.every(Boolean)&&Array.isArray(training.answers)&&training.answers.length===20){exam=restored;answers=training.answers.map((a,i)=>a&&Number.isInteger(a.pick)&&a.pick>=0&&a.pick<exam[i][3].length?{pick:a.pick,ok:a.pick===exam[i][4]}:null);idx=Math.max(0,Math.min(19,Number(training.index)||0));seconds=Math.max(0,Math.ceil((training.deadline-Date.now())/1000));examFinished=false;$('examIntro').classList.add('hidden');$('examBox').classList.remove('hidden');switchView('exam');if(seconds)renderExam();else finishExam();liveTimer();}
 else{training=null;switchView('home');}
}else{training=null;switchView('home');}
// Redo the original mistake before three fresh related questions.
const oldStartReview=startReview,oldAnswerReview=answerReview,oldNextReview=nextReview;
let redo=false;
startReview=function(i){const x=state.wrong[i];if(!x)return;const q=bank.find(q=>(q[2]===x.q||q[10]?.aliases.includes(x.q))&&q[3][q[4]]===x.a);if(!q){oldStartReview(i);return;}review={source:i,n:0,c:0,seen:[q[2]],q};redo=true;$('mistakeList').innerHTML='';$('mistakePractice').innerHTML=`<div class="eyebrow">第一步 · 重做原题</div><div class="question">${esc(q[2])}</div><div class="options">${q[3].map((o,j)=>`<button class="option" onclick="answerReview(${j},this)"><span class="letter">${String.fromCharCode(65+j)}</span>${h(o)}</button>`).join('')}</div><div id="reviewFeedback"></div>`;};
answerReview=function(i,el){if(!redo)return oldAnswerReview(i,el);if(!el||el.disabled)return;const q=review.q,ok=i===q[4];$('mistakePractice').querySelectorAll('.option').forEach((b,j)=>{b.disabled=true;if(j===q[4])b.classList.add('correct');});if(!ok)el.classList.add('wrong');state.stats[q[0]]??={n:0,c:0,w:0};state.stats[q[0]].n++;state.stats[q[0]].c+=ok?1:0;state.stats[q[0]].w=(state.stats[q[0]].w||0)+(ok?0:1);state.answered++;save();$('reviewFeedback').innerHTML=`<div class="feedback">${ok?'原题已答对，继续做三道类似题。':'请先理解原题，再重新作答。'}<br>${h(q[5])}</div><button class="primary" id="redoNext">${ok?'进入3题巩固':'重做原题'}</button>`;$('redoNext').onclick=()=>{if(ok){redo=false;oldNextReview();}else startReview(review.source);};};
nextReview=function(){redo=false;return oldNextReview();};
// Defend empty legacy topic pools instead of dereferencing an undefined question.
const safeNextReview=nextReview;nextReview=function(){const x=state.wrong[review.source];if(!x||!bank.some(q=>q[0]===x.t&&q[2]!==x.q)){$('mistakePractice').innerHTML='<p>该历史错题暂无同类变式，请先在知识学习中复习对应内容。</p>';return;}return safeNextReview();};
})();
