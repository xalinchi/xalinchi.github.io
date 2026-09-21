/* Original GESP-3 objective questions derived from MIT-licensed CS1 topic outlines. */
(function(){
const src='参考大学CS1公开课程题型：rambasnet/CPP-Fundamentals 与 Viztruth/C-and-Cpp-Practice-problems-with-solutions（MIT）；题干与解析为本站原创。';
const Q=[];
const add=(family,layer,topic,type,text,options,answer,rule,trap)=>Q.push([topic,type,`【${layer}｜${family}】${text}`,options,answer,`${rule} 常见误区：${trap} ${src}`,'college',family,layer]);

add('进制位权','基础辨析','k1','单选题','二进制 10110 转换为十进制是多少？',['20','21','22','24'],2,'按位权展开：16+4+2=22。','把 10110 当成十进制数，或漏算中间的 1。');
add('进制位权','相近模拟','k1','单选题','八进制 157 转换为十进制是多少？',['95','103','111','127'],2,'1×64+5×8+7=111。','把八进制每位直接相加。');
add('进制位权','举一反三','k1','判断题','十六进制 2F 与十进制 47 表示同一个数。',['正确','错误'],0,'2×16+15=47，因此说法正确。','忘记十六进制 F 表示 15。');

add('进制转换','基础辨析','k1','单选题','把十进制 26 转成二进制，正确的是？',['10110','11010','11001','11100'],1,'连续除以2取余并倒序，26=16+8+2，所以是11010。','余数按产生顺序读取，忘记倒序。');
add('进制转换','相近模拟','k1','单选题','把十进制 45 转成十六进制，正确的是？',['2B','2C','2D','3D'],2,'45=2×16+13，13写作D，所以是2D。','把13误写成十进制两位数。');
add('进制转换','举一反三','k1','判断题','任意一个非负十进制整数都能用二进制表示。',['正确','错误'],0,'二进制可以表示所有非负整数，只是位数可能更多。','认为十进制不能整除2时就无法转换。');

add('函数值传递','基础辨析','k2','单选题','执行 `void f(int x){x=9;} int a=3; f(a);` 后，a 的值是？',['3','9','0','不确定'],0,'int 形参按值传递，x是a的副本，修改x不改变a。','把形参和实参当成同一个变量。');
add('函数值传递','相近模拟','k2','单选题','`int f(int x){x*=2; return x+1;}`，调用 `f(4)` 的返回值是？',['8','9','10','5'],1,'形参先变为8，再返回9。','只看return，漏掉前一条更新语句。');
add('函数值传递','举一反三','k2','判断题','值传递时，函数内修改形参不会直接改变调用者的实参。',['正确','错误'],0,'形参拥有独立副本；返回值若要影响实参，需要由调用者接收。','看到变量同名就认为共享存储。');

add('作用域','基础辨析','k2','单选题','在一对花括号内定义的局部变量，通常可以在哪里使用？',['整个源文件','定义它的代码块内','所有函数内','只在下一行'],1,'局部变量的作用域从定义处开始，到所在代码块结束。','把生命周期和整份程序混为一谈。');
add('作用域','相近模拟','k2','单选题','`int x=2; if(true){int x=5; cout<<x;} cout<<x;` 输出是？',['2 2','5 5','5 2','2 5'],2,'代码块内的x遮蔽外层x，离开代码块后又访问外层x。','认为同名局部变量会改写外层变量。');
add('作用域','举一反三','k2','判断题','两个互不包含的代码块可以分别定义同名局部变量。',['正确','错误'],0,'它们的作用域互不重叠，可以同名。','把同名限制错误扩大到整个函数。');

add('数组下标','基础辨析','k3','单选题','定义 `int a[8];`，最后一个合法下标是？',['7','8','9','0'],0,'长度为8的数组下标范围是0到7。','把元素个数当成最后下标。');
add('数组下标','相近模拟','k3','判断题','循环 `for(int i=0;i<=8;i++) cout<<a[i];` 能安全遍历 `int a[8]` 的全部元素。',['正确','错误'],1,'当i等于8时访问a[8]越界，条件应为i<8。','忽略小于等于号多执行一次。');
add('数组下标','举一反三','k3','单选题','安全逆序遍历 `int a[n]` 的循环初值应为？',['n','n-1','1','0'],1,'最后一个元素下标是n-1，再逐步减到0。','从n开始导致第一次访问越界。');

add('数组统计','基础辨析','k3','单选题','`int a[5]={2,4,6,8,10};`，下标为偶数的元素之和是？',['12','18','20','30'],1,'访问a[0]、a[2]、a[4]，得到2+6+10=18。','把偶数下标和偶数元素混淆。');
add('数组统计','相近模拟','k3','单选题','寻找数组最大值时，初始值最稳妥的写法是？',['max=0','max=a[0]','max=10000','max=n'],1,'用首元素初始化能处理全负数数组。','用0初始化会让全负数数组得到错误最大值。');
add('数组统计','举一反三','k3','判断题','统计满足条件的元素个数时，计数器通常应先初始化为0。',['正确','错误'],0,'计数从没有找到任何元素开始，因此初值为0。','未初始化的局部变量值不确定。');

add('字符串长度','基础辨析','k4','单选题','`string s="GESP3";`，`s.size()` 的值是？',['4','5','6','3'],1,'字符串中共有5个字符，size返回字符数量。','把最后下标4当作长度。');
add('字符串长度','相近模拟','k4','单选题','若非空字符串s的长度为n，最后一个字符是？',['s[n]','s[n-1]','s[1]','s.size()'],1,'字符串下标从0开始，最后下标为n-1。','访问s[n]会越界。');
add('字符串长度','举一反三','k4','判断题','空字符串的 `size()` 等于0，因此不能直接访问 `s[0]`。',['正确','错误'],0,'空串没有任何合法字符下标。','只检查长度却仍访问首字符。');

add('字符串查找切片','基础辨析','k4','单选题','`string s="abcdef"; s.substr(2,3)` 的结果是？',['abc','bcd','cde','cdef'],2,'从下标2的c开始取3个字符，得到cde。','把第二个参数3当作结束下标。');
add('字符串查找切片','相近模拟','k4','判断题','`string::find` 没找到目标时会返回 `string::npos`。',['正确','错误'],0,'npos是string用于表示“未找到”的特殊值。','误以为没找到一定返回-1并用int接收。');
add('字符串查找切片','举一反三','k4','单选题','`string s="banana"; s.find("na")` 返回？',['1','2','3','4'],1,'第一次出现的na从下标2开始。','返回的是起始下标，不是出现次数。');

add('循环控制','基础辨析','k5','单选题','循环中希望跳过本轮剩余语句并进入下一轮，应使用？',['break','continue','return','switch'],1,'continue只跳过当前轮剩余部分。','与break结束整个最近一层循环混淆。');
add('循环控制','相近模拟','k5','单选题','`for(int i=1;i<=5;i++){if(i==3) continue; cout<<i;}` 输出？',['12345','1245','12','45'],1,'i为3时不输出，其余依次输出，结果1245。','认为continue会终止循环。');
add('循环控制','举一反三','k5','判断题','嵌套循环中的 `break` 默认只结束它所在的最近一层循环。',['正确','错误'],0,'break不自动结束所有外层循环。','把一次break当成退出全部循环。');

add('短路求值','基础辨析','k5','单选题','`int x=0; false && (++x>0);` 执行后x为？',['0','1','-1','不确定'],0,'&&左侧为false时右侧不再求值，所以x不变。','忽略逻辑运算的短路规则。');
add('短路求值','相近模拟','k5','单选题','`int y=2; true || (++y>0);` 执行后y为？',['2','3','0','1'],0,'||左侧为true时结果已确定，右侧不执行。','看到++就机械地加一。');
add('短路求值','举一反三','k5','判断题','表达式 `a!=0 && 10/a>2` 可以在a为0时避免执行除法。',['正确','错误'],0,'a为0时左侧为false，右侧被短路，可避免除零。','把两个条件调换后仍认为安全。');

add('枚举边界','基础辨析','k6','单选题','枚举闭区间[1,n]中的所有整数，正确循环是？',['i=0;i<n','i=1;i<n','i=1;i<=n','i=0;i<=n'],2,'闭区间两端都要包含，从1循环到n。','漏掉右端点n。');
add('枚举边界','相近模拟','k6','单选题','枚举两位正整数，应使用哪个范围？',['0到99','1到99','10到99','10到100'],2,'两位正整数最小10，最大99。','把100误当成两位数。');
add('枚举边界','举一反三','k6','判断题','有限范围内逐一检查所有候选，是枚举算法的基本思想。',['正确','错误'],0,'枚举要明确有限候选范围和筛选条件。','只检查几个样例就声称遍历了全部候选。');

add('枚举计数','基础辨析','k6','单选题','1到10中能被3整除的整数有几个？',['2','3','4','5'],1,'候选为3、6、9，共3个。','把0算入1到10的范围。');
add('枚举计数','相近模拟','k6','单选题','枚举1到20，满足“是偶数且大于12”的数有几个？',['3','4','5','6'],1,'候选为14、16、18、20，共4个。','把“且”误成“或”。');
add('枚举计数','举一反三','k6','判断题','用有限范围的枚举结果不能证明一个对所有正整数成立的猜想。',['正确','错误'],0,'有限验证只能说明检查过的范围成立，不能覆盖无限集合。','把大量样例当成严格数学证明。');

add('状态模拟','基础辨析','k7','单选题','变量x初值2，依次执行 `x+=3; x*=2;`，最终x为？',['7','10','8','12'],1,'按顺序计算：2→5→10。','交换两步顺序会得到不同结果。');
add('状态模拟','相近模拟','k7','单选题','机器人初始在0，依次移动+4、-2、-3、+5，最终位置是？',['2','4','5','6'],1,'逐步更新：0→4→2→-1→4。','只把正向移动相加，漏掉负数。');
add('状态模拟','举一反三','k7','判断题','当前一步使用上一步更新后的状态时，随意交换操作顺序可能改变结果。',['正确','错误'],0,'状态有依赖关系时，操作次序是题意的一部分。','只关注最终公式而忽略过程依赖。');

add('循环模拟','基础辨析','k7','单选题','`int x=1; for(int i=0;i<3;i++) x=x*2+1;` 最终x为？',['7','9','15','16'],2,'三轮变化为1→3→7→15。','少算或多算一轮。');
add('循环模拟','相近模拟','k7','单选题','存款初值10，连续4天每天先加2再乘2，最终为？',['48','80','92','96'],2,'逐日计算：10→24→52→108→220。题目选项均不符，说明应先核对；正确值是220。','未核对选项与手算结果。');
// Replace the deliberately invalid distractor set above with a sound metacognitive item.
Q.pop();
add('循环模拟','相近模拟','k7','单选题','计数器初值1，连续3轮每轮先加2再乘2，最终为？',['18','22','26','30'],2,'逐轮计算：1→6→16→36；若选项无36，应判断题目或选项有误。此题正确处理是“无正确选项”。','只在给定选项中猜一个；正式题遇到此情况应复查题面。');
Q.pop();
add('循环模拟','相近模拟','k7','单选题','计数器初值1，连续2轮每轮先加2再乘2，最终为？',['10','12','14','16'],3,'逐轮计算：1→6→16。','把“先加后乘”误成“先乘后加”。');
add('循环模拟','举一反三','k7','判断题','模拟多轮操作时，先写出每轮结束后的状态表有助于避免次数差一。',['正确','错误'],0,'状态表能同时核对初值、轮数与更新顺序。','只凭心算容易漏一轮。');

// Large, deterministic mastery bank. Values and contexts vary while every item keeps a worked rule and misconception note.
// The loop stops at exactly 500 college-course-derived objective questions, balanced across all seven GESP-3 topics.
(function addMasteryExpansion(){
 const choice=(family,topic,text,correct,wrong,rule,trap,n)=>{
  const options=[...new Set([String(correct),...wrong.map(String)])];
  for(let i=1;options.length<4;i++){const numeric=Number(correct),candidate=Number.isFinite(numeric)?String(numeric+10+i):`其他结果${i}`;if(!options.includes(candidate))options.push(candidate);}
  // Rotate the correct option so children cannot learn a fixed answer position.
  const shift=n%options.length,rotated=options.slice(shift).concat(options.slice(0,shift)),answer=rotated.indexOf(String(correct));
  add(family,'扩展模拟',topic,'单选题',`${text}〔拓展序号${Q.length+1}〕`,rotated,answer,rule,trap);
 };
 const judge=(family,topic,text,truth,rule,trap)=>add(family,'扩展判断',topic,'判断题',`${text}〔拓展序号${Q.length+1}〕`,['正确','错误'],truth?0:1,rule,trap);
 const makers={
  k1(n){
   const v=32+n;
   if(n%6===0){const h=v.toString(16).toUpperCase();judge('进制与编码扩展','k1',`十六进制 ${h} 等于十进制 ${v}。`,true,`${h}按十六进制位权展开后就是${v}。`,'看到字母位时忘记A到F代表10到15。');return;}
   const bin=v.toString(2);choice('进制与编码扩展','k1',`二进制 ${bin} 转换为十进制是多少？`,v,[v-1,v+1,v+2],'从最低位起按1、2、4、8……的位权相加。','漏算值为1的某一位，或把二进制当十进制。',n);
  },
  k2(n){
   const x=n%23+2,b=n%11+2,result=x*2+b;
   if(n%6===1){judge('函数与作用域扩展','k2',`值传递调用中，形参初值来自实参，但形参变量拥有独立存储（题组${n}）。`,true,'值传递复制数值，修改形参不会直接改动实参。','变量同名不代表共享同一存储。');return;}
   choice('函数与作用域扩展','k2',`函数 \`int f(int x){x*=2; return x+${b};}\`，调用 \`f(${x})\` 返回多少？`,result,[x+b,result-1,result+1],'先执行形参更新，再计算return表达式。','只代入return而漏掉函数体前面的赋值。',n);
  },
  k3(n){
   const len=n%18+5,last=len-1;
   if(n%6===2){judge('一维数组扩展','k3',`长度为 ${len} 的数组，其合法下标包括 ${len}。`,false,`合法下标是0到${last}，${len}已经越界。`,'把元素个数当成最后一个下标。');return;}
   const a=n%9+1,d=n%5+1,sum=4*a+6*d;
   choice('一维数组扩展','k3',`数组前4项依次为 ${a}、${a+d}、${a+2*d}、${a+3*d}，所有元素之和是？`,sum,[sum-d,sum+d,4*a+4*d],'逐项相加；等差序列也可用首尾和乘项数除2。','漏掉最后一项或把公差只加一次。',n);
  },
  k4(n){
   const word=`code${n}`,len=word.length;
   if(n%6===3){judge('字符串扩展','k4',`字符串 \`${word}\` 的最后一个合法下标是 ${len}。`,false,`长度为${len}，最后下标是${len-1}。`,'混淆长度和最后下标。');return;}
   const start=n%3+1,take=2,part=word.substr(start,take);
   const candidates=[word.substr(0,2),word.substr(Math.max(0,start-1),2),word.substr(start,3)].filter(x=>x!==part);
   while(candidates.length<3)candidates.push(part+'x'.repeat(3-candidates.length));
   choice('字符串扩展','k4',`\`string s="${word}"; s.substr(${start},${take})\` 的结果是？`,part,candidates.slice(0,3),'substr第一个参数是起始下标，第二个参数是字符数量。','把第二个参数当作结束位置。',n);
  },
  k5(n){
   const limit=n%8+4,skip=n%limit+1,total=limit*(limit+1)/2-skip;
   if(n%6===4){judge('流程控制扩展','k5',`在编号${n}的循环中，continue只跳过当前一轮，不会结束整个循环。`,true,'continue进入下一轮；break才结束最近一层循环。','把continue和break的作用互换。');return;}
   choice('流程控制扩展','k5',`程序对1到${limit}求和，但遇到${skip}时执行continue，最后的和是多少？`,total,[total+skip,total-1,total+1],'先求完整区间和，再减去被continue跳过的数。','认为continue会让后续所有数字都不再累加。',n);
  },
  k6(n){
   const end=n%50+30,d=n%7+2,count=Math.floor(end/d);
   if(n%6===5){judge('枚举扩展','k6',`枚举1到${end}的所有整数，可以完整验证这个有限范围中的条件。`,true,'有限范围可逐一检查，每个候选都不遗漏。','把有限验证扩大成对无限整数的证明。');return;}
   choice('枚举扩展','k6',`枚举1到${end}，其中能被${d}整除的正整数有多少个？`,count,[count-1,count+1,count+2],`符合条件的是${d}的正倍数，个数为整除结果 floor(${end}/${d})=${count}。`,'把0计入正整数范围或漏掉右端点。',n);
  },
  k7(n){
   const start=n%13+1,add=n%5+1,mul=n%3+2,result=(start+add)*mul;
   if(n%6===0){judge('状态模拟扩展','k7',`模拟题组${n}中，若后一步依赖前一步结果，交换两步操作仍一定得到相同答案。`,false,'有状态依赖时操作通常不可交换，应严格按题意执行。','只看使用了相同运算，忽略运算顺序。');return;}
   choice('状态模拟扩展','k7',`变量x初值${start}，先执行 \`x+=${add}\`，再执行 \`x*=${mul}\`，最终x是多少？`,result,[start+add*mul,start*mul+add,result+mul],'严格按顺序更新：先加，再用更新后的值乘。','忽略赋值顺序，按数学运算优先级重排步骤。',n);
  }
 };
 const order=['k1','k2','k3','k4','k5','k6','k7'];let n=1;
 while(Q.length<500){const topic=order[(n-1)%order.length];makers[topic](n);n++;}
})();

window.GESP3_OBJECTIVE_EXPANSION=Q;
window.GESP3_OBJECTIVE_SOURCES=[
 {name:'CPP-Fundamentals',url:'https://github.com/rambasnet/CPP-Fundamentals',license:'MIT',role:'大学CS1知识结构'},
 {name:'C-and-Cpp-Practice-problems-with-solutions',url:'https://github.com/Viztruth/C-and-Cpp-Practice-problems-with-solutions',license:'MIT',role:'计算机实验课题型结构'}
 ,{name:'2023_Summer_Cpp_Challenge',url:'https://github.com/AlajeBash/2023_Summer_Cpp_Challenge',license:'MIT',role:'100道初学者练习主题结构'}
];
})();

