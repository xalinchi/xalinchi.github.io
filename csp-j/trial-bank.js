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

/* Original GESP-4 objective questions derived from MIT-licensed university C++ course outlines. */
(function(){
const src='参考大学公开课程：rambasnet/CPP-Fundamentals 与 rougier/CPP-Crash-Course（MIT）；题干、选项和解析为本站原创。';
const Q=[];
const add=(family,layer,topic,type,text,options,answer,rule,trap)=>Q.push([topic,type,`【${layer}｜${family}】${text}`,options,answer,`${rule} 常见误区：${trap} ${src}`,'l4','college',family,layer]);
const tri=(family,topic,a,b,c)=>{add(family,'基础辨析',topic,...a);add(family,'相近模拟',topic,...b);add(family,'举一反三',topic,...c);};

tri('函数返回与默认参数','k1',
 ['单选题','`int f(int a,int b=3){return a+b;}`，`f(5)` 的值是？',['5','8','3','编译错误'],1,'省略第二个实参时使用默认值3，所以返回8。','认为默认参数表示没有参数。'],
 ['判断题','有默认值的形参之后，通常不能再出现没有默认值的形参。',['正确','错误'],0,'调用时按从右向左省略实参，因此默认形参应位于参数表右侧。','把默认值放在中间导致调用含义不明确。'],
 ['单选题','`int g(int x=2,int y=4){return x*y;}`，`g(3)` 返回？',['6','8','12','24'],2,'x取实参3，y使用默认值4，结果12。','把实参3赋给最后一个形参。']);
tri('函数重载与作用域','k1',
 ['单选题','函数重载主要依据什么区分？',['函数名不同','参数列表不同','返回值不同','函数体不同'],1,'同名函数可通过参数个数或类型不同构成重载。','只改变返回类型不能构成重载。'],
 ['判断题','`int f(int)` 与 `double f(int)` 可以仅靠返回类型不同构成重载。',['正确','错误'],1,'调用处无法只根据返回类型可靠选择函数，因此不构成合法重载。','把返回类型也当成重载签名的一部分。'],
 ['单选题','已有 `f(int)` 和 `f(double)`，调用 `f(3.5)` 会优先选择？',['f(int)','f(double)','随机选择','均不合法'],1,'3.5是double字面量，与f(double)精确匹配。','忽略实参类型而只看函数名。']);

tri('指针基础','k2',
 ['单选题','`int x=7; int *p=&x;`，表达式 `*p` 的值是？',['x的地址','7','p的地址','0'],1,'p保存x的地址，解引用*p取得x的值7。','混淆地址与地址指向的值。'],
 ['判断题','若p合法指向x，执行 `*p=9` 会把x改为9。',['正确','错误'],0,'通过指针解引用写入，修改的是所指对象。','误以为只修改指针变量本身。'],
 ['单选题','`int x=4; int *p=&x; (*p)++;` 后x为？',['4','5','地址加1','不确定'],1,'括号保证先解引用，再把x的值加1。','把(*p)++误读成p++。']);
tri('引用参数','k2',
 ['单选题','`void inc(int &x){x++;}`，令a=5并调用inc(a)，a变为？',['5','6','0','编译错误'],1,'引用形参是实参的别名，修改x就是修改a。','与值传递形参副本混淆。'],
 ['判断题','引用在定义时必须绑定到一个对象，之后不能改为另一个对象的别名。',['正确','错误'],0,'引用一旦初始化就保持绑定关系。','把引用当成可重新指向的指针。'],
 ['单选题','交换两个int实参且不使用指针，形参应写成？',['int a,int b','int &a,int &b','const int a,const int b','void a,void b'],1,'交换必须修改调用者对象，因此使用非常量引用。','按值传递只能交换副本。']);

tri('结构体成员','k3',
 ['单选题','`Student s;` 访问其成员score应写成？',['s->score','s.score','score.s','*s.score'],1,'结构体对象使用点运算符访问成员。','把对象访问和指针访问混淆。'],
 ['判断题','同一个结构体类型的不同对象，各自拥有独立的成员数据。',['正确','错误'],0,'类型是模板，每个对象都有自己的成员存储。','认为同类型对象共享所有成员值。'],
 ['单选题','`struct P{int x,y;}; P p{2,5};`，`p.x+p.y` 为？',['2','5','7','10'],2,'聚合初始化依声明顺序给x=2、y=5，和为7。','误把花括号内容当数组下标。']);
tri('结构体数组','k3',
 ['单选题','`Student a[10];` 表示什么？',['一个含10个成员的对象','10个Student对象组成的数组','指向Student的指针','二维数组'],1,'数组每个元素都是一个完整Student对象。','把元素个数与成员个数混淆。'],
 ['判断题','`a[i].score` 可访问结构体数组第i个元素的score成员。',['正确','错误'],0,'先用下标选择对象，再用点运算符选成员。','错误写成a.score[i]。'],
 ['单选题','统计3名学生总分，核心累加应写成？',['sum+=a.score','sum+=a[i].score','sum=a[i]','a[i]+=score'],1,'循环中由i选择学生，再累加其score成员。','遗漏数组下标或成员名。']);

tri('二维数组下标','k4',
 ['单选题','`int a[3][4];` 共有多少个int元素？',['7','12','16','34'],1,'3行×4列，共12个元素。','把两个维度相加。'],
 ['判断题','`int a[3][4]` 的合法行下标为0到2，列下标为0到3。',['正确','错误'],0,'每个维度都从0开始，到长度减1结束。','把3和4直接当作合法下标。'],
 ['单选题','遍历3行4列数组，内层循环条件应为？',['j<3','j<=4','j<4','j<=3'],2,'内层按列遍历，列数4对应j=0..3。','误用行数或写成小于等于。']);
tri('二维数组计算','k4',
 ['单选题','矩阵主对角线元素通常满足？',['i+j=0','i==j','i>j','j==0'],1,'主对角线行下标等于列下标。','与副对角线条件混淆。'],
 ['判断题','两个同型矩阵相加时，应把对应行、对应列的元素相加。',['正确','错误'],0,'结果c[i][j]=a[i][j]+b[i][j]。','把矩阵加法写成行列交叉相乘。'],
 ['单选题','2×3矩阵与3×4矩阵相乘，结果矩阵大小是？',['2×4','3×3','2×3','3×4'],0,'外侧维度保留，结果为2行4列。','保留了错误的内侧维度。']);

tri('递推状态','k5',
 ['单选题','数列a1=2，a(n)=a(n-1)+3，则a4是？',['8','9','11','14'],2,'依次为2、5、8、11。','把下标4误当作加3四次。'],
 ['判断题','使用递推计算时，必须先给出足够的初始项。',['正确','错误'],0,'递推式只描述相邻状态关系，初始项决定数列。','只有递推公式没有起点仍认为能唯一确定。'],
 ['单选题','a1=1，a2=2，a(n)=a(n-1)+a(n-2)，a5为？',['5','7','8','10'],2,'数列为1、2、3、5、8。','漏用两个前驱状态。']);
tri('递推与循环','k5',
 ['单选题','用循环实现只依赖前一项的递推，通常至少需要保存？',['当前状态','整个文件','函数地址','排序结果'],0,'每轮由当前状态计算下一状态即可。','无论题目都机械保存全部历史。'],
 ['判断题','递推循环更新多个状态时，赋值顺序可能影响结果。',['正确','错误'],0,'若后一个更新仍需要旧值，应先暂存或调整顺序。','直接覆盖旧状态后继续使用。'],
 ['单选题','已知oldA和oldB，想同时更新为newA=oldB、newB=oldA+oldB，稳妥做法是？',['先改oldA再计算newB','使用临时变量保存旧值','只更新一个变量','交换循环方向'],1,'临时变量能避免旧值被覆盖。','顺序赋值导致newB使用了更新后的oldA。']);

tri('基础排序过程','k6',
 ['单选题','冒泡排序一趟后，通常能把哪个元素放到最终位置？',['当前最大或最小元素','随机元素','中位数','所有元素'],0,'相邻比较交换使一个极值移动到一端。','认为一趟即可全部有序。'],
 ['判断题','选择排序每一趟会从未排序区间选出一个极值放到边界。',['正确','错误'],0,'这是选择排序的核心步骤。','与相邻元素不断交换的冒泡排序混淆。'],
 ['单选题','插入排序处理新元素时，会把它插入哪里？',['已排序区间中的适当位置','数组末尾固定位置','随机位置','未排序区间中间'],0,'前缀保持有序，新元素插入该有序前缀。','认为插入排序不维护有序区间。']);
tri('排序稳定性','k6',
 ['单选题','排序稳定是指什么？',['速度不变','相等关键字元素相对次序不变','空间不变','数组长度不变'],1,'稳定性关注相等元素排序前后的相对顺序。','把稳定误解为运行时间稳定。'],
 ['判断题','标准实现的冒泡排序只交换逆序的相邻元素，因此可以保持稳定。',['正确','错误'],0,'相等元素不交换，其相对顺序得以保留。','使用大于等于进行交换会破坏稳定性。'],
 ['单选题','若记录按分数排序且希望同分学生保持原登记顺序，应优先关注？',['稳定性','递归深度','文件大小','指针地址'],0,'同关键字相对顺序的要求正是排序稳定性。','只比较时间复杂度。']);

tri('时间复杂度','k7',
 ['单选题','单层循环执行n次常数操作，时间复杂度通常为？',['O(1)','O(log n)','O(n)','O(n²)'],2,'操作次数与n成正比。','看到循环就一律判为O(n²)。'],
 ['判断题','两个各执行n次的顺序循环，总复杂度通常仍是O(n)。',['正确','错误'],0,'n+n=2n，忽略常数因子后为O(n)。','把顺序循环误当成嵌套循环相乘。'],
 ['单选题','两层循环各执行n次，循环体为常数操作，复杂度通常为？',['O(1)','O(n)','O(n²)','O(2n)'],2,'总执行次数约为n×n。','把嵌套循环次数相加。']);
tri('复杂度比较','k7',
 ['单选题','当n很大时，下列增长最慢的是？',['O(n²)','O(n)','O(log n)','O(2ⁿ)'],2,'对数增长通常慢于线性、平方和指数增长。','只看表达式字母数量。'],
 ['判断题','大O表示法通常忽略常数倍和低阶项。',['正确','错误'],0,'它关注输入规模增大时的主要增长趋势。','把精确运行毫秒数当成大O。'],
 ['单选题','O(n²+n+5)化简后通常记作？',['O(1)','O(n)','O(n²)','O(n³)'],2,'最高阶项n²主导增长。','保留所有项或选择最低阶。']);

tri('文件流','k8',
 ['单选题','读取文本文件通常使用哪个流类型？',['ofstream','ifstream','ostream','stringstream'],1,'ifstream用于输入文件流。','把输入ifstream与输出ofstream混淆。'],
 ['判断题','打开文件后应检查流状态，确认文件是否成功打开。',['正确','错误'],0,'文件可能不存在或无权限，检查失败能避免继续错误读取。','假设open一定成功。'],
 ['单选题','向文件写入数据通常使用？',['ifstream','ofstream','cin','cerr'],1,'ofstream是输出文件流。','根据“文件”二字误选ifstream。']);
tri('异常处理','k8',
 ['单选题','可能抛出异常的代码通常放在哪个代码块？',['try','catch','else','switch'],0,'try包围受监控代码，catch处理匹配异常。','把catch当成主动执行的主体。'],
 ['判断题','没有匹配的catch时，异常可能继续向调用层传播。',['正确','错误'],0,'异常会沿调用栈寻找匹配处理器。','认为任意catch都会处理所有异常。'],
 ['单选题','`catch(const exception& e)` 中常用哪个成员获取说明文字？',['e.size()','e.what()','e.read()','e.code()'],1,'标准异常的what()返回错误说明。','把容器或文件流成员套到异常对象上。']);

// Expand the focused college-course bank to 520 unique questions: exactly 65 for each level-4 topic.
(function addMasteryExpansion(){
 const choice=(family,topic,text,correct,wrong,rule,trap,n)=>{
  const options=[...new Set([String(correct),...wrong.map(String)])];
  for(let i=1;options.length<4;i++){const value=Number(correct),candidate=Number.isFinite(value)?String(value+20+i):`其他结果${i}`;if(!options.includes(candidate))options.push(candidate);}
  const shift=n%4,rotated=options.slice(shift).concat(options.slice(0,shift)),answer=rotated.indexOf(String(correct));
  add(family,'扩展模拟',topic,'单选题',`${text}〔四级拓展序号${Q.length+1}〕`,rotated,answer,rule,trap);
 };
 const judge=(family,topic,text,truth,rule,trap)=>add(family,'扩展判断',topic,'判断题',`${text}〔四级拓展序号${Q.length+1}〕`,['正确','错误'],truth?0:1,rule,trap);
 const makers={
  k1(n){
   const x=n%29+2,d=n%13+1,result=x+d;
   if(n%7===0){judge('函数设计扩展','k1',`函数重载题组${n}中，仅改变返回类型而保持参数列表相同，不能构成合法重载。`,true,'重载选择依据函数名与参数列表，不依赖返回类型。','把返回类型误当作函数签名的充分区别。');return;}
   choice('函数设计扩展','k1',`函数 \`int f(int x,int d=${d}){return x+d;}\`，调用 \`f(${x})\` 返回多少？`,result,[x,d,result+1],'省略第二个实参时使用默认值，再执行返回表达式。','把默认参数当成0，或把默认值赋给第一个形参。',n);
  },
  k2(n){
   const x=n%37+3,inc=n%8+1,result=x+inc;
   if(n%7===1){judge('指针与引用扩展','k2',`若指针p合法指向变量x，执行 \`*p=${x}\` 修改的是p所指对象的值，而不是p保存的地址。`,true,'解引用后的赋值作用于目标对象。','把p和*p视作同一个含义。');return;}
   choice('指针与引用扩展','k2',`\`int x=${x}; int *p=&x; *p+=${inc};\` 执行后x是多少？`,result,[x,inc,result+1],'p保存x的地址，*p直接访问并修改x。','误以为通过指针修改不会影响原变量。',n);
  },
  k3(n){
   const a=n%31+1,b=n%17+2,result=a+b;
   if(n%7===2){judge('结构体扩展','k3',`结构体数组题组${n}中，表达式 \`students[i].score\` 先选择第i个对象，再访问score成员。`,true,'数组下标运算优先得到结构体对象，点运算符再访问成员。','错误写成students.score[i]。');return;}
   choice('结构体扩展','k3',`\`struct P{int x,y;}; P p{${a},${b}};\`，\`p.x+p.y\` 的值是？`,result,[a,b,a*b],'聚合初始化按成员声明顺序赋值，再读取成员求和。','把花括号误认为数组，或交换成员和值。',n);
  },
  k4(n){
   const rows=n%7+2,cols=n%9+2,total=rows*cols;
   if(n%7===3){judge('多维数组扩展','k4',`\`int a[${rows}][${cols}]\` 的合法列下标包含 ${cols}。`,false,`列下标范围是0到${cols-1}，${cols}越界。`,'把列数直接当成最后下标。');return;}
   choice('多维数组扩展','k4',`二维数组 \`int a[${rows}][${cols}]\` 一共有多少个int元素？`,total,[rows+cols,total-rows,total+cols],'元素总数等于各维长度的乘积。','把行数和列数相加。',n);
  },
  k5(n){
   const first=n%8+1,d=n%6+1,index=n%5+4,result=first+(index-1)*d;
   if(n%7===4){judge('递推扩展','k5',`递推题组${n}只给出 \`a[n]=a[n-1]+${d}\` 而不给任何初始项，仍能唯一确定整个数列。`,false,'递推关系还需要足够的初始状态才能确定具体序列。','把递推公式误当成完整定义。');return;}
   choice('递推扩展','k5',`数列 \`a1=${first}\`，\`a[n]=a[n-1]+${d}\`，则a${index}是多少？`,result,[result-d,result+d,first+index*d],'从第1项到第index项共递推index-1次。','把项号直接当作递推次数，多加一次。',n);
  },
  k6(n){
   const a=n%30+5,b=n%19+1,lo=Math.min(a,b),hi=Math.max(a,b);
   if(n%7===5){judge('排序扩展','k6',`稳定排序题组${n}中，相等关键字记录的相对先后次序应保持不变。`,true,'这正是排序稳定性的定义。','把稳定性理解成运行时间不会变化。');return;}
   choice('排序扩展','k6',`对相邻元素 ${hi}、${lo} 执行冒泡排序的升序比较后，这两个位置应变为？`,`${lo} ${hi}`,[`${hi} ${lo}`,`${lo} ${lo}`,`${hi} ${hi}`],'升序冒泡遇到前大后小时交换相邻元素。','只比较不交换，或把升序当成降序。',n);
  },
  k7(n){
   const loops=n%9+2;
   if(n%7===6){judge('复杂度扩展','k7',`两个先后执行、各循环n次的代码段，总时间复杂度通常是O(n²)（题组${n}）。`,false,'顺序执行次数相加为2n，忽略常数后仍为O(n)。','把顺序循环误按嵌套循环相乘。');return;}
   const powers=[1,2,3,4],p=powers[n%4],label=p===1?'O(n)':`O(n^${p})`;
   choice('复杂度扩展','k7',`${p}层彼此嵌套的循环，每层约执行n次，循环体为常数操作，复杂度通常是？`,label,['O(1)','O(log n)',p===1?'O(n²)':'O(n)'],'嵌套循环的执行次数相乘，n的幂次对应有效嵌套层数。','把循环次数相加，或看到循环就固定回答O(n)。',n+loops);
  },
  k8(n){
   const mode=n%3;
   if(n%7===0){judge('文件与异常扩展','k8',`文件题组${n}中，打开输入文件后检查流状态，可以发现文件不存在或无读取权限等失败。`,true,'文件操作可能失败，使用流的布尔状态或is_open检查。','假设构造ifstream后一定成功。');return;}
   if(mode===0){choice('文件与异常扩展','k8','读取文本文件应优先选择哪种流对象？','ifstream',['ofstream','ostream','cerr'],'ifstream是文件输入流，用于读取。','把输入和输出流名称混淆。',n);return;}
   if(mode===1){choice('文件与异常扩展','k8','向文本文件写入内容应优先选择哪种流对象？','ofstream',['ifstream','istream','cin'],'ofstream是文件输出流，用于写入。','看到file就统一选择ifstream。',n);return;}
   choice('文件与异常扩展','k8','可能抛出异常的语句通常放在哪个代码块中？','try',['catch','else','switch'],'try包围受监控代码，匹配的catch负责处理。','把catch当成主动执行危险语句的位置。',n);
  }
 };
 const order=['k1','k2','k3','k4','k5','k6','k7','k8'];let n=1;
 while(Q.length<520){const topic=order[(n-1)%8];makers[topic](n);n++;}
})();

window.GESP4_OBJECTIVE_EXPANSION=Q;
window.GESP4_OBJECTIVE_SOURCES=[
 {name:'CPP-Fundamentals',url:'https://github.com/rambasnet/CPP-Fundamentals',license:'MIT'},
 {name:'CPP-Crash-Course',url:'https://github.com/rougier/CPP-Crash-Course',license:'MIT'}
 ,{name:'modern_cpp_course',url:'https://github.com/gammasoft71/modern_cpp_course',license:'MIT'}
 ,{name:'2023_Summer_Cpp_Challenge',url:'https://github.com/AlajeBash/2023_Summer_Cpp_Challenge',license:'MIT'}
];
})();

window.cspTrialAudit={"counts":{"total":1008,"checked":378,"pending":627,"blocked":0,"corrected":3},"checked":["GESP3-1","GESP3-43","GESP3-45","GESP3-47","GESP3-48","GESP3-49","GESP3-50","GESP3-52","GESP3-54","GESP3-55","GESP3-56","GESP3-57","GESP3-59","GESP3-61","GESP3-62","GESP3-63","GESP3-64","GESP3-66","GESP3-68","GESP3-69","GESP3-70","GESP3-71","GESP3-73","GESP3-75","GESP3-76","GESP3-77","GESP3-85","GESP3-87","GESP3-89","GESP3-90","GESP3-91","GESP3-92","GESP3-94","GESP3-96","GESP3-97","GESP3-98","GESP3-99","GESP3-101","GESP3-103","GESP3-104","GESP3-105","GESP3-106","GESP3-108","GESP3-110","GESP3-111","GESP3-112","GESP3-113","GESP3-115","GESP3-117","GESP3-118","GESP3-119","GESP3-127","GESP3-129","GESP3-131","GESP3-132","GESP3-133","GESP3-134","GESP3-136","GESP3-138","GESP3-139","GESP3-140","GESP3-141","GESP3-143","GESP3-145","GESP3-146","GESP3-147","GESP3-148","GESP3-150","GESP3-152","GESP3-153","GESP3-154","GESP3-155","GESP3-157","GESP3-159","GESP3-160","GESP3-161","GESP3-169","GESP3-171","GESP3-173","GESP3-174","GESP3-175","GESP3-176","GESP3-178","GESP3-180","GESP3-181","GESP3-182","GESP3-183","GESP3-185","GESP3-187","GESP3-188","GESP3-189","GESP3-190","GESP3-192","GESP3-194","GESP3-195","GESP3-196","GESP3-197","GESP3-199","GESP3-201","GESP3-202","GESP3-203","GESP3-211","GESP3-213","GESP3-215","GESP3-216","GESP3-217","GESP3-218","GESP3-220","GESP3-222","GESP3-223","GESP3-224","GESP3-225","GESP3-227","GESP3-229","GESP3-230","GESP3-231","GESP3-232","GESP3-234","GESP3-236","GESP3-237","GESP3-238","GESP3-239","GESP3-241","GESP3-243","GESP3-244","GESP3-245","GESP3-253","GESP3-255","GESP3-257","GESP3-258","GESP3-259","GESP3-260","GESP3-262","GESP3-264","GESP3-265","GESP3-266","GESP3-267","GESP3-269","GESP3-271","GESP3-272","GESP3-273","GESP3-274","GESP3-276","GESP3-278","GESP3-279","GESP3-280","GESP3-281","GESP3-283","GESP3-285","GESP3-286","GESP3-287","GESP3-295","GESP3-297","GESP3-299","GESP3-300","GESP3-301","GESP3-302","GESP3-304","GESP3-306","GESP3-307","GESP3-308","GESP3-309","GESP3-311","GESP3-313","GESP3-314","GESP3-315","GESP3-316","GESP3-318","GESP3-320","GESP3-321","GESP3-322","GESP3-323","GESP3-325","GESP3-327","GESP3-328","GESP3-329","GESP3-337","GESP3-339","GESP3-341","GESP3-342","GESP3-343","GESP3-344","GESP3-346","GESP3-348","GESP3-349","GESP3-350","GESP3-351","GESP3-353","GESP3-355","GESP3-356","GESP3-357","GESP3-358","GESP3-360","GESP3-362","GESP3-363","GESP3-364","GESP3-365","GESP3-367","GESP3-369","GESP3-370","GESP3-371","GESP3-379","GESP3-381","GESP3-383","GESP3-384","GESP3-385","GESP3-386","GESP3-388","GESP3-390","GESP3-391","GESP3-392","GESP3-393","GESP3-395","GESP3-397","GESP3-398","GESP3-399","GESP3-400","GESP3-402","GESP3-404","GESP3-405","GESP3-406","GESP3-407","GESP3-409","GESP3-411","GESP3-412","GESP3-413","GESP3-421","GESP3-423","GESP3-425","GESP3-426","GESP3-427","GESP3-428","GESP3-430","GESP3-432","GESP3-433","GESP3-434","GESP3-435","GESP3-437","GESP3-439","GESP3-440","GESP3-441","GESP3-442","GESP3-444","GESP3-446","GESP3-447","GESP3-448","GESP3-449","GESP3-451","GESP3-453","GESP3-454","GESP3-455","GESP3-463","GESP3-465","GESP3-467","GESP3-468","GESP3-469","GESP3-470","GESP3-472","GESP3-474","GESP3-475","GESP3-476","GESP3-477","GESP3-479","GESP3-481","GESP3-482","GESP3-483","GESP3-484","GESP3-486","GESP3-488","GESP3-489","GESP3-490","GESP3-491","GESP3-493","GESP3-495","GESP3-496","GESP3-497","GESP4-53","GESP4-54","GESP4-61","GESP4-62","GESP4-69","GESP4-70","GESP4-77","GESP4-78","GESP4-85","GESP4-86","GESP4-93","GESP4-94","GESP4-109","GESP4-110","GESP4-117","GESP4-118","GESP4-125","GESP4-126","GESP4-133","GESP4-134","GESP4-141","GESP4-142","GESP4-149","GESP4-150","GESP4-165","GESP4-166","GESP4-173","GESP4-174","GESP4-181","GESP4-182","GESP4-189","GESP4-190","GESP4-197","GESP4-198","GESP4-205","GESP4-206","GESP4-221","GESP4-222","GESP4-229","GESP4-230","GESP4-237","GESP4-238","GESP4-245","GESP4-246","GESP4-253","GESP4-254","GESP4-261","GESP4-262","GESP4-277","GESP4-278","GESP4-285","GESP4-286","GESP4-293","GESP4-294","GESP4-301","GESP4-302","GESP4-309","GESP4-310","GESP4-317","GESP4-318","GESP4-333","GESP4-334","GESP4-341","GESP4-342","GESP4-349","GESP4-350","GESP4-357","GESP4-358","GESP4-365","GESP4-366","GESP4-373","GESP4-374","GESP4-389","GESP4-390","GESP4-397","GESP4-398","GESP4-405","GESP4-406","GESP4-413","GESP4-414","GESP4-421","GESP4-422","GESP4-429","GESP4-430","GESP4-445","GESP4-446","GESP4-453","GESP4-454","GESP4-461","GESP4-462","GESP4-469","GESP4-470","GESP4-477","GESP4-478","GESP4-485","GESP4-486","GESP4-501","GESP4-502","GESP4-509","GESP4-510","GESP4-517","GESP4-518"],"fixes":{"GESP3-11":{"options":["22","55","52","25"],"answer":"52","explain":"内层 x 为 5，离开代码块后外层 x 为 2。两条 cout 都没输出空格，因此连写为 52。"},"GESP3-15":{"stem":"有一个含 n 个元素的数组，假定 n 是至少为 3 的编译期常量。逆序遍历时，下标 i 的初值应是？","answer":"n-1","explain":"最后一个元素的下标是 n−1。n 是编译期常量，题目适用标准 C++14 数组声明。"},"GESP3-21":{"stem":"在 C++14 中，空 std::string 的 size() 为 0，因此不能把 s[0] 当作字符串中的第一个字符来读写。","answer":"正确","reference":"https://timsong-cpp.github.io/cppwp/n4140/basic.string#string.access","explain":"空字符串没有第一个字符。C++14 的 operator[] 允许在 pos == size() 时读取终止空字符，但它不是字符串内容。练习中应把有效字符下标限定在小于 size() 的范围。"}},"issues":{}};

