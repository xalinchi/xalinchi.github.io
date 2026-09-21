/* Original exercises. Every item belongs to exactly one textbook unit and skill. */
const catalog={subjects:{zh:'语文',math:'数学',en:'英语'},chapters:[],skills:{},questions:[]};
function chapter(subject,id,title,lessons,edition){catalog.chapters.push({subject,id,title,lessons,edition});}
function skill(chapterId,id,title,learn,example,tip){catalog.skills[id]={id,chapter:chapterId,title,learn,example,tip};}
function item(s,prompt,answer,wrong,explanation){let k=catalog.skills[s],c=catalog.chapters.find(c=>c.id===k.chapter);catalog.questions.push({id:s+'-'+(catalog.questions.filter(q=>q.skill===s).length+1),subject:c.subject,chapter:c.id,skill:s,prompt,answer:String(answer),options:wrong?[String(answer),...wrong.map(String)]:null,explanation:explanation||k.learn});}
const mathUnits=['混合运算','观察物体','加与减','乘与除','周长','乘法','年、月、日','认识小数'];
mathUnits.forEach((x,i)=>chapter('math','m'+(i+1),'第'+(i+1)+'单元 · '+x,['小熊购物、买文具、过河','看一看（一）、看一看（二）','捐书活动、运白菜、节余多少钱、里程表','小树有多少棵、需要多少钱、丰收了、植树','什么是周长、长方形周长','蚂蚁做操、去游乐园、乘火车、去奶奶家','看日历、一天的时间、时间表','文具店、货比三家、存零用钱、寄书'][i],'北师大版三上 · 混合运算起始版'));
skill('m1','m1-order','先乘除后加减','有乘除又有加减，先算乘除，再算加减。','6+3×4=6+12=18。','不要从左到右一律依次计算。');
skill('m1','m1-bracket','有括号的两步运算','先算小括号里面，再算括号外面。','(18+6)÷3=24÷3=8。','检查括号有没有先算。');
skill('m2','m2-view','观察方向与可见的面','同一物体，从不同方向观察，看到的面可能不同。','盒子正面有猫、右面有鸟，从右面看见鸟。','先确定观察者的位置。');
skill('m2','m2-position','根据观察结果判断位置','根据物体各面的标记，判断观察者站在哪个方向。','从上方只看到盒子的顶面。','物体不转动，改变的是观察位置。');
skill('m3','m3-add','三位数连加与进位','相同数位对齐，从个位算起，满十进一。','125+236+114=361+114=475。','把进位也加上。');
skill('m3','m3-sub','连减与加减混合','只有加减时按从左到右的顺序算；退位后该位少1。','600-125-175=475-175=300。','里程表路段距离=后一次读数-前一次读数。');
skill('m4','m4-multiply','整十整百数乘一位数','先算几个十或几个百相乘，再换成原来的计数单位。','30×4=120，因为3个十×4=12个十。','不要漏掉计数单位。');
skill('m4','m4-divide','整十整百数除以一位数','按计数单位平均分，也可以用乘法检查。','240÷3=80，因为80×3=240。','注意商的末尾是否有0。');
skill('m5','m5-rectangle','长方形周长','周长是封闭图形一周的长度。长方形周长=(长+宽)×2。','长8厘米宽3厘米，周长22厘米。','周长是长度，不是里面的大小。');
skill('m5','m5-square','正方形周长','正方形4条边相等，周长=边长×4。','边长6厘米，周长24厘米。','求边长时，用周长÷4。');
skill('m6','m6-product','两三位数乘一位数','从个位乘起，哪一位满几十，就向前一位进几。','123×3=369；26×3=78。','每一位都要乘，别漏进位。');
skill('m6','m6-zero','乘法中的0','0乘任何数都得0；中间有0也要占位并处理进位。','203×3=609。','不要把609写成69。');
skill('m7','m7-calendar','认识年、月、日','大月31天，小月30天；平年2月28天，闰年2月29天。','4月有30天，5月有31天。','2月不能按大月小月记。');
skill('m7','m7-time','24时记时与经过时间','下午时刻转换成24时记时法，小时加12；经过时间=结束-开始。','下午3时是15时；14时到16时经过2小时。','时间单位要一致。');
skill('m8','m8-decimal','元角分与小数大小','1元=10角=100分；比较小数先比整数部分，再依次比小数位。','3元5角是3.5元；3.8元大于3.5元。','比较钱数时统一单位。');
skill('m8','m8-money','简单小数加减','计算钱数时把元和元、角和角对齐，也就是小数点对齐。','2.5元+1.3元=3.8元。','满10角进1元，不够减向元借1。');
for(let i=1;i<=24;i++){
 let a=i%7+2,b=i%6+2,c=i+3;
 item('m1-order',`${c}+${a}×${b}=？`,c+a*b,null,`先算${a}×${b}=${a*b}，再算${c}+${a*b}=${c+a*b}。`);
 item('m1-bracket',`(${a*b-c%a}+${c%a})÷${a}=？`,b,null,`括号内是${a*b}，${a*b}÷${a}=${b}。`);
 let x=110+7*i,y=120+3*i,z=105+2*i;
 item('m3-add',`图书角原有${x}本书，又收到${y}本和${z}本。现在有多少本？`,x+y+z,null,`${x}+${y}+${z}=${x+y+z}（本）。`);
 item('m3-sub',`仓库有${900+i}箱牛奶，上午运走${120+i}箱，下午运走${210+2*i}箱。还剩多少箱？`,570-2*i,null,`${900+i}-${120+i}-${210+2*i}=${570-2*i}（箱）。`);
 item('m4-multiply',`${i*10}×${a}=？`,i*10*a,null,`${i}个十×${a}=${i*a}个十，即${i*10*a}。`);
 item('m4-divide',`${i*a*10}÷${a}=？`,i*10,null,`用乘法检查：${i*10}×${a}=${i*a*10}。`);
 item('m5-rectangle',`长方形卡片长${i+4}厘米、宽${i%5+2}厘米，一周有多少厘米？`,2*(i+6+i%5),null,`(${i+4}+${i%5+2})×2=${2*(i+6+i%5)}（厘米）。`);
 item('m5-square',i%2?`正方形边长${i+2}厘米，周长是多少厘米？`:`正方形周长${(i+2)*4}厘米，边长是多少厘米？`,i%2?(i+2)*4:i+2,null,i%2?`${i+2}×4=${(i+2)*4}。`:`${(i+2)*4}÷4=${i+2}。`);
 item('m6-product',`${112+i*3}×${a}=？`,(112+i*3)*a,null,`个位、十位、百位分别乘${a}，注意进位，结果是${(112+i*3)*a}。`);
 let n=(i%4+1)*100+(i%9+1);
 item('m6-zero',`${n}×${b}=？`,n*b,null,`分开算：${n-n%100}×${b}+${n%100}×${b}=${n*b}。`);
 let cents=10+i*3,other=12+i;
 item('m8-money',i%2?`铅笔${(cents/10).toFixed(1)}元，橡皮${(other/10).toFixed(1)}元，一共多少元？`:`有${((cents+other)/10).toFixed(1)}元，花掉${(other/10).toFixed(1)}元，还剩多少元？`,i%2?((cents+other)/10).toFixed(1):(cents/10).toFixed(1),null,`换成角计算：${i%2?`${cents}+${other}=${cents+other}`:`${cents+other}-${other}=${cents}`}角，再换回元。`);
 item('m8-decimal',i%2?`${i}元${a}角写成小数是多少元？`:`比较${i}.${a}元和${i}.${a+1}元，较大的钱数是多少元？`,`${i}.${i%2?a:a+1}`,null,i%2?'元写在整数部分，角写在十分位。':'整数部分相同，比角数。');
}
const marks=['小猫','小鸟','小鱼','小树','小花','太阳','月亮','星星'];
marks.forEach((m,i)=>{
 let r=marks[(i+1)%8],top=marks[(i+2)%8];
 item('m2-view',`盒子不转动：正面画${m}，右面画${r}，顶面画${top}。从右面正对着看，看见什么？`,r,[m,top,marks[(i+3)%8]],'观察者在右面，正对的是盒子的右面。');
 item('m2-position',`盒子正面写${i+1}，右面写${i+11}，顶面写${i+21}。小乐只看见写${i+21}的面，他从哪里看？`,'上方',['正前方','右方','正后方'],'写在顶面的数字，要从上方看。');
});
for(let m=1;m<=12;m++)item('m7-calendar',`平年的${m}月有多少天？`,m===2?28:[4,6,9,11].includes(m)?30:31,null,m===2?'平年的2月有28天。':[4,6,9,11].includes(m)?'4、6、9、11月是小月，每月30天。':'1、3、5、7、8、10、12月是大月，每月31天。');
item('m7-calendar','闰年的2月有多少天？',29,null,'闰年的2月比平年多1天。');
item('m7-calendar','平年全年共有多少天？',365,null,'12个月的天数合起来是365天。');
item('m7-calendar','闰年全年共有多少天？',366,null,'比平年多1天，为366天。');
for(let h=1;h<=11;h++){
 item('m7-time',`${h>=7?'晚上':'下午'}${h}时，用24时记时法是几时？`,h+12,null,`${h}+12=${h+12}（时）。`);
 item('m7-time',`活动从${h+7}时开始，${h+9}时30分结束，经过多少分钟？`,150,null,'经过2小时30分，2×60+30=150分钟。');
}
// English editions remain separate; changing the selection never mixes their reports.
const legacyEn=[
 ['Module 1 · Greetings','I’m Sam. / How are you?','hello:你好|goodbye:再见|I:我|am:是（与I搭配）|fine:很好|thank:感谢','greetings'],
 ['Module 2 · Introductions','I’m Ms Smart. / What’s your name?','morning:早晨|name:名字|your:你的|afternoon:下午|boy:男孩|girl:女孩','name'],
 ['Module 3 · Classroom','Point to the door. / Point to the desk.','point:指|door:门|window:窗户|blackboard:黑板|desk:书桌|chair:椅子','commands'],
 ['Module 4 · Colours','It’s red. / It’s a black dog.','red:红色|blue:蓝色|yellow:黄色|green:绿色|black:黑色|dog:狗','colours'],
 ['Module 5 · Numbers','How many? / Nine girls?','one:一|two:二|three:三|four:四|five:五|six:六|seven:七|eight:八|nine:九|ten:十|eleven:十一|twelve:十二','numbers'],
 ['Module 6 · Birthday and age','Happy birthday! / How old are you?','birthday:生日|cake:蛋糕|present:礼物|happy:快乐的|old:岁的|here:这里','age'],
 ['Module 7 · School','What’s this? / What’s that?','school:学校|classroom:教室|pupil:小学生|teacher:老师|this:这个|that:那个','things'],
 ['Module 8 · Is it…?','Is it a monster? / Where’s the cat?','bag:包|book:书|pen:钢笔|pencil:铅笔|cat:猫|kite:风筝','isit'],
 ['Module 9 · Family','This is my mother. / He’s a doctor.','mother:母亲|father:父亲|sister:姐妹|brother:兄弟|grandpa:爷爷或外公|grandma:奶奶或外婆|doctor:医生|nurse:护士','family'],
 ['Module 10 · Body','This is his head. / Point to her nose.','head:头|arm:手臂|leg:腿|foot:脚|eye:眼睛|ear:耳朵|nose:鼻子|mouth:嘴','body']
];
const newEn=[
 ['Welcome to school','Hello. / What’s your name?','hello:你好|goodbye:再见|name:名字|morning:早晨|school:学校|teacher:老师','name'],
 ['Unit 1 · Let’s be friends!','Nice to meet you. / Let’s play together.','friend:朋友|meet:认识|together:一起|play:玩|sing:唱歌|help:帮助','friends'],
 ['Unit 2 · My school things','What’s this? / Here you are.','schoolbag:书包|pencil:铅笔|ruler:尺子|crayon:蜡笔|book:书|pen:钢笔','things'],
 ['Unit 3 · It’s a colourful world!','What colour is it? / It’s red.','red:红色|blue:蓝色|yellow:黄色|green:绿色|black:黑色|white:白色','colours'],
 ['Unit 4 · Fun with numbers','How many…?','one:一|two:二|three:三|four:四|five:五|six:六|seven:七|eight:八|nine:九|ten:十|eleven:十一|twelve:十二','numbers'],
 ['Unit 5 · We’re family','Who’s he? / Who’s she?','father:爸爸|mother:妈妈|brother:兄弟|sister:姐妹|grandfather:祖父或外祖父|grandmother:祖母或外祖母','family'],
 ['Unit 6 · My sweet home','Where is…? / It’s in/on/under…','bedroom:卧室|kitchen:厨房|bathroom:浴室|living room:客厅|table:桌子|bed:床','where']
];
const patterns={
 greetings:['见面问候','Hello! 可以用于见面打招呼。How are you? 询问身体状况。','别人问How are you? 可以答I’m fine, thank you.'],
 name:['询问和介绍姓名','询问姓名用What’s your name?；介绍自己用My name is…或I’m…。','My name is Amy. 意思是我的名字叫Amy。'],
 commands:['课堂指令','Point to…表示指向；Stand up表示起立；Sit down表示坐下。','Point to the door. 指向门。'],
 colours:['描述颜色','It’s + 颜色词，描述物品的颜色。','It’s blue. 它是蓝色的。'],
 numbers:['询问和表达数量','How many…? 询问数量，用数词回答。','How many pencils? Three.'],
 age:['询问年龄','How old are you? 询问年龄；I’m nine. 表示我九岁。','生日祝福Happy birthday! 回答Thank you.'],
 things:['指认物品','What’s this? 问近处物品；What’s that? 问远处物品。','It’s a book. 它是一本书。'],
 isit:['一般疑问句','Is it a…? 用Yes, it is. 或No, it isn’t.回答。','Is it a cat? Yes, it is.'],
 family:['介绍家庭成员','This is my…介绍家人；he用于男性，she用于女性。','This is my mother. She’s my mother.'],
 body:['身体部位与所属','his表示他的，her表示她的；Point to…表示指向某部位。','This is his head. 这是他的头。'],
 friends:['结识朋友','Nice to meet you. 回答Nice to meet you too.；Let’s…提出一起做某事。','Let’s play together! 让我们一起玩吧！'],
 where:['物品位置','Where is…? 问位置；in在里面，on在上面，under在下面。','The ball is under the table. 球在桌子下面。']
};
function english(units,edition){units.forEach((u,i)=>{
 let ch='e'+edition+i,ws=ch+'-words',ss=ch+'-sentences',words=u[2].split('|').map(x=>x.split(':')),pat=patterns[u[3]];
 chapter('en',ch,u[0],u[1],edition==='modules'?'外研版（三起）三上 · Module版':'外研版三上 · Welcome / Unit版');
 catalog.chapters.at(-1).enEdition=edition;
 skill(ch,ws,'词汇认读与拼写',words.map(x=>x.join('：')).join('；'),words[0].join(' = '),'先理解意思，再逐字母拼写。');
 skill(ch,ss,pat[0],pat[1],pat[2],'先看情景，再选与提问相符的表达。');
 words.forEach((w,j)=>{let wrong=[1,2,3].map(k=>words[(j+k)%words.length][1]);item(ws,`“${w[0]}”是什么意思？`,w[1],wrong,`${w[0]}：${w[1]}。`);item(ws,`请写出“${w[1]}”的英文。`,w[0],null,`逐个核对：${w[0]}。`);});
 for(let j=0;j<8;j++){
 let names=['Amy','Sam','Daming','Lingling','Tom','Lily','Lucy','Jack'],name=names[j],n=j+3;
 const scenarios={
 greetings:[`${name}对你说“How are you?”，你应该怎样回应？`,"I'm fine, thank you.",["I'm nine.","It's a pen.","It's red."]],
 name:[`你叫${name}。别人问“What’s your name?”，你怎样介绍自己？`,`My name is ${name}.`,["I'm fine.","It's a desk.","Goodbye!"]],
 commands:[`老师请${name}${j%2?'坐下':'起立'}，应说哪句？`,j%2?'Sit down, please.':'Stand up, please.',j%2?['Stand up, please.','Point to the door.','Good morning.']:['Sit down, please.','Point to the desk.','Goodbye.']],
 colours:[`${name}拿着${['红','蓝','黄','绿','黑','红','蓝','黄'][j]}色的笔，问“What colour is it?”。应答？`,`It's ${['red','blue','yellow','green','black','red','blue','yellow'][j]}.`,['I am fine.','It is a cat.','Three.']],
 numbers:[`${name}有${n}支铅笔。问“How many pencils?”，回答？`,['Three.','Four.','Five.','Six.','Seven.','Eight.','Nine.','Ten.'][j],['Two.','One.','Twelve.']],
 age:[`${name}今年${n}岁。问“How old are you?”，${name}怎样回答？`,`I'm ${['three','four','five','six','seven','eight','nine','ten'][j]}.`,["I'm fine.","It's a cake.","Thank you."]],
 things:[`${name}指着${j%2?'远处':'手边'}的书，想问“那/这是什么？”，应说？`,j%2?"What's that?":"What's this?",[j%2?"What's this?":"What's that?","How old are you?","How are you?"]],
 isit:[`${name}指着${j%2?'书':'猫'}问“Is it a cat?”，按情景回答。`,j%2?"No, it isn't.":'Yes, it is.',[j%2?'Yes, it is.':"No, it isn't.",'I am nine.','Good morning.']],
 family:[`${name}介绍自己的${j%2?'妈妈':'爸爸'}：This is my ____.`,j%2?'mother':'father',[j%2?'father':'mother','sister','brother']],
 body:[`${name}指着${j%2?'女孩':'男孩'}的鼻子：This is ____ nose.`,j%2?'her':'his',[j%2?'his':'her','I','you']],
 friends:[`${name}初次见面说“Nice to meet you.”，你怎样回应？`,'Nice to meet you too.',['Goodbye.','It is red.','Three pencils.']],
 where:[`${name}把球放在桌子${['上面','下面','里面'][j%3]}。The ball is ____ the table.`,['on','under','in'][j%3],[['under','in','to'],['on','in','to'],['on','under','to']][j%3]]
 };
 let q=scenarios[u[3]];item(ss,q[0],q[1],q[2],pat[1]);
 }
});}
english(legacyEn,'modules');english(newEn,'units');
if(typeof module!=='undefined')module.exports=catalog;
