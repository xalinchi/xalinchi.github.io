/* Shared GESP learning resources; independent progress keys per level. */
(function resourcesMain(){
'use strict';
const D=window.GESP_RESOURCES;if(!D)return;
const $=id=>document.getElementById(id),h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key=`gesp${D.level}ResourcesV1`;
let progress;
try{progress=JSON.parse(localStorage.getItem(key)||'{}');}catch{progress={};}
if(!progress||typeof progress!=='object'||Array.isArray(progress))progress={};
for(const field of ['checklist','syllabus','sessions','drafts'])if(!progress[field]||typeof progress[field]!=='object')progress[field]={};
function persist(){try{localStorage.setItem(key,JSON.stringify(progress));}catch{const n=$('resourceStorage');if(n)n.textContent='浏览器未能保存进度，请保留页面并下载代码草稿。';}}
function link(url,label){return /^https:\/\//.test(url||'')?`<a href="${h(url)}" target="_blank" rel="noopener noreferrer">${h(label)}</a>`:'';}
function inline(s){
 const tokens=[];const protect=html=>'\u0001'+(tokens.push(html)-1)+'\u0001';
 s=s.replace(/`([^`]+)`/g,(_,v)=>protect('<code>'+h(v)+'</code>'));
 s=s.replace(/\$([^$\n]+)\$/g,(_,v)=>{
  try{return protect(window.katex.renderToString(v,{throwOnError:false,trust:false,output:'mathml'}));}catch{return protect(h(v));}
 });
 s=h(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 return s.replace(/\u0001(\d+)\u0001/g,(_,i)=>tokens[Number(i)]);
}
function markdown(s){
 return String(s||'').split(/```[^\n]*\n([\s\S]*?)```/g).map((part,i)=>i%2?'<pre><code>'+h(part)+'</code></pre>':part.split('\n').map(line=>/^#{1,4} /.test(line)?'<h4>'+inline(line.replace(/^#+ /,''))+'</h4>':inline(line.replace(/^> /,''))).join('<br>')).join('');
}
function section(id,label){
 let el=$(id);
 if(!el){el=document.createElement('section');el.id=id;el.className='view';document.querySelector('main').append(el);}
 let b=document.querySelector(`[data-view="${id}"]`);
 if(!b){b=document.createElement('button');b.className='tab';b.dataset.view=id;b.textContent=label;document.querySelector('nav').append(b);}
 b.onclick=()=>switchView(id);return el;
}
section('papers','历年真题');section('syllabus','考试提纲');section('checklist','练习清单');section('exercises','编程练习');
const message=document.createElement('p');message.id='resourceStorage';message.className='muted';message.setAttribute('role','status');document.querySelector('main').append(message);
let current=null,currentIndex=0;
function openView(id){switchView(id);$(id).scrollIntoView({behavior:'smooth',block:'start'});}
function navigationCard(title,description,actions){
 const box=document.createElement('div');box.className='card resource-entry';
 const heading=document.createElement('h3');heading.textContent=title;box.append(heading);
 const p=document.createElement('p');p.className='muted';p.textContent=description;box.append(p);
 const row=document.createElement('div');row.className='actions';
 actions.forEach(([label,id])=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>openView(id);row.append(b);});box.append(row);return box;
}
$('home').prepend(navigationCard(`C++ ${D.level}级 · 真题与练习资料`,'按考纲学习 → 勾选练习 → 限时做真题 → 回看错题。进度保存在本浏览器。',[['历年真题','papers'],['考试提纲','syllabus'],['练习清单','checklist'],['编程练习','exercises']]));
$('examIntro').append(navigationCard('按真实试卷练习','真题整卷计时120分钟，25道客观题共50分；另有2道编程题。',[['选择历年真题','papers']]));
$('map').prepend(navigationCard('对照考试提纲','查看本级学习目标，并进入已有专项练习。',[['打开考试提纲','syllabus']]));
$('drill').append(navigationCard('编程专项与练习计划','编程真题提供完整题面和草稿区，配套题单提供题目与题解入口。',[['练习清单','checklist'],['编程练习','exercises']]));
if($('selfstudy'))$('selfstudy').prepend(navigationCard('课程配套资料','结合考纲目标、练习清单和历年真题复习。',[['考试提纲','syllabus'],['练习清单','checklist']]));
function renderSyllabus(){
 $('syllabus').innerHTML=`<div class="card"><h2>GESP C++ ${D.level}级考试提纲</h2><p>依据官方大纲整理的学习目标摘要。${link(D.official,'官方大纲发布页')} · ${link(D.syllabusPDF+'#page='+(D.level===3?17:19),'查看本级大纲原文')}</p><p>120分钟 · 单选15题×2分 · 判断10题×2分 · 编程2题×25分</p><p class="muted">${D.level===3?'三级核心范围是编码、进制、位运算、数组、字符串、枚举和模拟。站内函数专项可作为衔接扩展，不列为三级新增核心考点。':'递推属于四级核心；递归及跨级算法练习作为拓展，按自己的基础选做。'}</p><p id="syllabusProgress"></p></div><div class="grid resource-grid">${D.syllabus.map(x=>`<article class="card span6"><h3>${h(x.name)}</h3><p>${h(x.goal)}</p><label class="resource-check"><input type="checkbox" data-syllabus="${x.id}" ${progress.syllabus[x.id]?'checked':''}>已完成本项复习</label><div class="actions"><button data-drill="${x.topic}">客观题专项</button><button data-topic="${x.topic}">对应练习清单</button></div></article>`).join('')}</div>`;
 updateSyllabusProgress();
}
function updateSyllabusProgress(){$('syllabusProgress').textContent=`已复习 ${D.syllabus.filter(x=>progress.syllabus[x.id]).length} / ${D.syllabus.length} 项`;}
$('syllabus').addEventListener('change',e=>{if(e.target.dataset.syllabus){progress.syllabus[e.target.dataset.syllabus]=e.target.checked;persist();updateSyllabusProgress();}});
$('syllabus').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.drill)setDrill(b.dataset.drill);if(b.dataset.topic){$('listTopic').value=b.dataset.topic;$('listGroup').value='';$('listSearch').value='';renderChecklist();openView('checklist');}});
const topicOptions=()=>Object.entries(topics).map(([k,v])=>`<option value="${k}">${h(v)}</option>`).join('');
$('checklist').innerHTML=`<div class="card"><h2>C++ ${D.level}级练习清单</h2><p>整理自 ${link(`https://github.com/lihongzheshuai/yummy-code/blob/master/GESP${D.level}.md`,'yummy-code 对应级别题单')}。勾选表示你已完成，不代表在线评测通过。跨级及其他赛事题标注为拓展。</p><div class="resource-filters"><label>知识点<select id="listTopic"><option value="">全部知识点</option>${topicOptions()}</select></label><label>类型<select id="listGroup"><option value="">全部类型</option><option>GESP编程真题</option><option>考纲配套练习</option><option>拓展练习</option></select></label><label>搜索<input id="listSearch" type="search" placeholder="题号或题目名称"></label><label class="resource-check"><input id="listPending" type="checkbox">仅看未完成</label></div><p id="listProgress" role="status"></p><div id="listRows"></div></div>`;
function renderChecklist(){
 const search=$('listSearch').value.toLowerCase(),t=$('listTopic').value,g=$('listGroup').value,pending=$('listPending').checked;
 const items=D.practice.filter(x=>(!t||x.topic===t)&&(!g||x.group===g)&&(!search||(x.id+' '+x.name).toLowerCase().includes(search))&&(!pending||!progress.checklist[x.id]));
 $('listProgress').textContent=`总进度 ${D.practice.filter(x=>progress.checklist[x.id]).length}/${D.practice.length} · 当前显示 ${items.length} 项`;
 $('listRows').innerHTML=items.map(x=>`<article class="resource-row"><label class="resource-check"><input type="checkbox" data-check="${h(x.id)}" ${progress.checklist[x.id]?'checked':''}><strong>${h(x.name)}</strong></label><p class="muted">${h(x.id)} · ${h(x.point)} · ${h(x.date||x.group)}${x.extension?' · 拓展选做':''}</p><div class="actions">${x.paper?`<button data-program="${x.paper}:${x.question}">站内题目与草稿</button>`:''}${link(x.url,'题目 / 在线提交')}${link(x.solution,'查看题解')}</div></article>`).join('')||'<p>没有符合条件的题目，请调整筛选。</p>';
}
['listTopic','listGroup','listPending'].forEach(id=>$(id).onchange=renderChecklist);$('listSearch').oninput=renderChecklist;
$('listRows').onchange=e=>{if(e.target.dataset.check){progress.checklist[e.target.dataset.check]=e.target.checked;persist();renderChecklist();}};
$('listRows').onclick=e=>{const b=e.target.closest('[data-program]');if(b){const [id,q]=b.dataset.program.split(':');openProgram(id,Number(q));}};
function paperList(){
 $('papers').innerHTML=`<div class="card"><h2>C++ ${D.level}级历年真题</h2><p>12套站内试卷（2023年6月—2026年3月），另提供2026年6月、9月官方原卷。每套站内卷有25道客观题和2道编程题。</p><p class="muted">社区整理的题面与答案可能存在转录问题，以官方原卷为准；部分题目需结合原卷中的代码或图片。编程题保存草稿，使用外部平台运行评测。客观题得分不会冒充整卷总分。</p><label>年份 <select id="paperYear"><option value="">全部年份</option>${[2026,2025,2024,2023].map(y=>`<option>${y}</option>`).join('')}</select></label><div id="paperCards" class="grid resource-grid"></div></div>`;
 $('paperYear').onchange=renderPaperCards;renderPaperCards();
}
function renderPaperCards(){
 const year=$('paperYear').value;
 $('paperCards').innerHTML=D.papers.filter(p=>!year||p.date.startsWith(year)).map(p=>{
 const saved=progress.sessions[p.id],assisted=p.questions.filter(q=>q.needsOriginal).length;
 return `<article class="card span6"><h3>${h(p.title)}</h3><p>${p.pdfOnly?'官方PDF原卷 · 暂未转为站内作答':'25道客观题 + 2道编程题 · 120分钟'}</p>${assisted?`<p class="muted">${assisted}题需结合原卷代码或图片</p>`:''}${saved?`<p class="tag">${saved.submitted?'已交卷 · 客观题 '+score(p,saved)+' / 50分':'有未交卷记录'}</p>`:''}<div class="actions">${!p.pdfOnly?`<button class="primary" data-paper="${p.id}">${saved?'继续 / 查看记录':'开始真题'}</button>`:''}${link(p.pdf,'官方原卷 PDF')}${link(p.source,'资料来源')}</div></article>`;
 }).join('');
}
$('papers').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.paper)openPaper(b.dataset.paper);
 if(b.dataset.jump!==undefined){currentIndex=Number(b.dataset.jump);renderQuestion();}
 if(b.dataset.answer!==undefined)answer(b.dataset.answer);
 if(b.dataset.move){currentIndex=Math.max(0,Math.min(26,currentIndex+Number(b.dataset.move)));renderQuestion();}
 if(b.hasAttribute('data-submit')){if(confirm('确认交卷？未作答的客观题计0分，交卷后可查看参考答案。'))submitPaper();}
 if(b.hasAttribute('data-back')){current=null;paperList();}
 if(b.hasAttribute('data-restart')){if(confirm('重新开始会覆盖本套作答记录，代码草稿会保留。是否继续？')){delete progress.sessions[current.id];persist();openPaper(current.id);}}
 if(b.dataset.download)downloadCode(b.dataset.download);
});
function session(){return progress.sessions[current.id];}
function openPaper(id){
 const p=D.papers.find(x=>x.id===id);if(!p||p.pdfOnly)return;
 current=p;
 if(!progress.sessions[id]){progress.sessions[id]={answers:{},deadline:Date.now()+120*60*1000,submitted:false,idx:0};persist();}
 const s=session();currentIndex=Math.max(0,Math.min(26,Number(s.idx)||0));openView('papers');
 if(!s.submitted&&Date.now()>=s.deadline)submitPaper();else renderQuestion();
}
function score(p,s){return p.questions.filter(q=>q.type!=='program').reduce((n,q)=>n+(s.answers[q.id]===String(q.answer)?q.score:0),0);}
function renderQuestion(){
 const s=session(),q=current.questions[currentIndex];s.idx=currentIndex;persist();
 const options=q.type==='judge'?[{key:'True',text:'正确'},{key:'False',text:'错误'}]:q.options||[];
 const selected=s.answers[q.id];
 $('papers').innerHTML=`<div class="card"><div class="examtop"><h2>${h(current.title)}</h2><span id="realTimer" class="timer"></span></div><div class="actions"><button data-back>返回试卷列表</button>${link(current.pdf,'官方原卷 PDF')}<button data-restart>重新开始本卷</button></div>${s.submitted?`<div class="feedback"><strong>客观题 ${score(current,s)} / 50分</strong><p>编程题共50分，需另行评测；此处不是整卷总分。${s.expired?'本次因计时结束自动交卷。':''}</p></div>`:'<p class="muted">交卷前不显示答案；作答与倒计时会保留，刷新或离开页面不暂停。编程题可先保存草稿再去评测。</p>'}<div class="qnav resource-nav">${current.questions.map((x,i)=>`<button data-jump="${i}" class="qdot ${s.answers[x.id]!==undefined?'done':''} ${i===currentIndex?'current':''}" aria-label="第${i+1}题" aria-current="${i===currentIndex?'step':'false'}">${i+1}</button>`).join('')}</div><p class="tag">第 ${currentIndex+1} / 27 题 · ${q.type==='program'?'编程题':q.type==='judge'?'判断题':'单选题'} · ${q.score}分</p>${q.needsOriginal?`<div class="feedback resource-warning">本题的代码、图片或选项在社区整理版中不完整。请先${link(current.pdf,'打开官方原卷')}查看${q.type==='judge'?'判断':'单选'}第${q.type==='judge'?q.id-15:q.id}题，再作答。</div>`:''}<div class="resource-content">${markdown(q.content)}</div>${q.type==='program'?programEditor(current,q):`<div class="options">${options.map(o=>`<button class="option ${selected===o.key?'selected':''} ${s.submitted&&o.key===String(q.answer)?'correct':''} ${s.submitted&&selected===o.key&&selected!==String(q.answer)?'wrong':''}" data-answer="${h(o.key)}" ${s.submitted?'disabled':''}><span class="letter">${h(o.key==='True'?'✓':o.key==='False'?'✗':o.key)}</span><span class="resource-content">${markdown(o.text||'请查看官方原卷中此选项')}</span></button>`).join('')}</div>${s.submitted?`<div class="feedback">${selected===String(q.answer)?'回答正确':selected===undefined?'未作答':'回答错误'} · 参考答案：${h(q.type==='judge'?(q.answer==='True'?'正确':'错误'):q.answer)}<p class="muted">答案来自社区整理；如有疑问请核对官方原卷。</p><button onclick="setDrill('${q.topic}')">进入相关专项复习</button></div>`:''}`}<div class="actions resource-bottom"><button data-move="-1" ${currentIndex===0?'disabled':''}>上一题</button><button data-move="1" ${currentIndex===26?'disabled':''}>下一题</button>${!s.submitted?'<button class="primary" data-submit>交卷并查看客观题成绩</button>':''}</div></div>`;
 bindEditor($('papers'));tick();
}
function answer(value){
 const s=session();if(s.submitted)return;
 if(Date.now()>=s.deadline){submitPaper(true);return;}
 const q=current.questions[currentIndex];if(q.type==='program')return;
 s.answers[q.id]=value;persist();renderQuestion();
}
function submitPaper(expired=false){
 if(!current||session().submitted)return;
 const s=session();s.submitted=true;s.expired=expired;s.submittedAt=Date.now();persist();renderQuestion();renderResourceMistakes();
}
function tick(){
 if(!current)return;const s=session(),el=$('realTimer');if(!el)return;
 if(s.submitted){el.textContent='已交卷';return;}
 const remaining=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
 if(!remaining){submitPaper(true);return;}
 el.textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;
}
setInterval(tick,1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
function draftKey(p,q){return p.id+':'+q.id;}
function programEditor(p,q){
 const id=draftKey(p,q),code=progress.drafts[id]||'';
 return `<div class="resource-editor"><p>${link(q.url,'在洛谷查看 / 提交代码')} ${link(q.solution,'查看题解')} ${link(p.pdf,'官方原卷')}</p><p class="muted">本页不执行C++代码，也不自动判编程题分数。请在本地编译器或评测平台测试。</p><label>代码草稿<textarea spellcheck="false" data-draft="${id}" aria-label="代码草稿">${h(code)}</textarea></label><p class="muted" data-save-note>草稿保存在本浏览器</p><button data-download="${id}">下载 .cpp 草稿</button>${q.practiceId?`<label class="resource-check"><input type="checkbox" data-program-check="${h(q.practiceId)}" ${progress.checklist[q.practiceId]?'checked':''}>我已完成此题（手动记录）</label>`:''}</div>`;
}
function bindEditor(root){
 const textarea=root.querySelector('[data-draft]');
 if(textarea)textarea.oninput=()=>{progress.drafts[textarea.dataset.draft]=textarea.value;persist();root.querySelector('[data-save-note]').textContent='草稿已保存';};
 const checkbox=root.querySelector('[data-program-check]');
 if(checkbox)checkbox.onchange=()=>{progress.checklist[checkbox.dataset.programCheck]=checkbox.checked;persist();renderChecklist();};
}
function downloadCode(id){
 const blob=new Blob([progress.drafts[id]||''],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=`GESP-Cpp-${D.level}-${id.replace(':','-')}.cpp`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('exercises').innerHTML=`<div class="card"><h2>C++ ${D.level}级编程练习</h2><p>已收录24道站内编程真题，包含输入输出要求、样例与代码草稿。更多配套练习见练习清单。</p><div class="resource-filters"><label>知识点<select id="programTopic"><option value="">全部知识点</option>${topicOptions()}</select></label><button id="morePractice">打开完整练习清单</button></div><div id="programRows"></div><div id="programDetail"></div></div>`;
$('morePractice').onclick=()=>openView('checklist');$('programTopic').onchange=renderPrograms;
function renderPrograms(){
 const t=$('programTopic').value;
 $('programRows').innerHTML=D.papers.flatMap(p=>p.questions.filter(q=>q.type==='program'&&(!t||q.topic===t)).map(q=>`<article class="resource-row"><h3>${h(q.name)}</h3><p class="muted">${h(p.date)} · ${h(topics[q.topic])}</p><button data-open-program="${p.id}:${q.id}">阅读题目 / 写代码</button></article>`)).join('')||'<p>该知识点暂无站内编程题，可到练习清单或弱项强化练习。</p>';
}
function openProgram(id,qid){
 const p=D.papers.find(p=>p.id===id),q=p?.questions.find(q=>q.id===qid&&q.type==='program');if(!q)return;
 openView('exercises');
 $('programDetail').innerHTML=`<article class="card resource-detail"><h3>${h(p.title)} · ${h(q.name)}</h3><div class="resource-content">${markdown(q.content)}</div>${programEditor(p,q)}</article>`;
 bindEditor($('programDetail'));$('programDetail').scrollIntoView({behavior:'smooth'});
}
$('exercises').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.openProgram){const [p,q]=b.dataset.openProgram.split(':');openProgram(p,Number(q));}if(b.dataset.download)downloadCode(b.dataset.download);};
const mistakesCard=document.createElement('div');mistakesCard.id='resourceMistakes';mistakesCard.className='card resource-entry';$('mistakes').append(mistakesCard);
const reportCard=document.createElement('div');reportCard.id='resourceReport';reportCard.className='card resource-entry';$('report').append(reportCard);
function renderResourceMistakes(){
 const completed=D.papers.filter(p=>!p.pdfOnly&&progress.sessions[p.id]?.submitted);
 const wrong=completed.flatMap(p=>p.questions.filter(q=>q.type!=='program'&&progress.sessions[p.id].answers[q.id]!==String(q.answer)).map(q=>({p,q})));
 mistakesCard.innerHTML=`<h3>历年真题错题 / 未作答</h3><p>已交卷 ${completed.length} 套，待复盘 ${wrong.length} 题。这里保留最近一次交卷记录，与原有20题训练错题分开统计。</p>${wrong.map(({p,q})=>`<div class="resource-row"><b>${h(p.title)} · ${q.type==='judge'?'判断第'+(q.id-15):'单选第'+q.id}题</b><p>${h(q.content.slice(0,100))}</p><button data-wrong="${p.id}:${q.id}">回看题目与答案</button></div>`).join('')}`;
 reportCard.innerHTML=`<h3>历年真题学习记录</h3><p>练习清单已完成 ${D.practice.filter(x=>progress.checklist[x.id]).length}/${D.practice.length} 项</p>${completed.map(p=>`<p>${h(p.title)}：客观题 ${score(p,progress.sessions[p.id])}/50分（编程题待另行评测）</p>`).join('')||'<p>尚无已交卷的真题记录。</p>'}`;
}
mistakesCard.onclick=e=>{const b=e.target.closest('[data-wrong]');if(!b)return;const [p,q]=b.dataset.wrong.split(':');openPaper(p);currentIndex=Number(q)-1;renderQuestion();};
const originalSwitchView=switchView;
switchView=function(v){originalSwitchView(v);if(v==='mistakes'||v==='report')renderResourceMistakes();if(v==='checklist')renderChecklist();};
const sources=document.createElement('p');sources.className='footer';sources.innerHTML=`资料更新 ${D.version} · ${link('https://github.com/sirwym/olympiad-practice-system','真题整理来源')} · ${link('https://github.com/lihongzheshuai/yummy-code','练习清单来源')} · <a href="../gesp-resources/SOURCES.md">来源与许可说明</a>`;
document.querySelector('main').append(sources);
renderSyllabus();renderChecklist();paperList();renderPrograms();renderResourceMistakes();
})();
