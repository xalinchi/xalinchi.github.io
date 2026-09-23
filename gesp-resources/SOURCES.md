# GESP 三级、四级资料来源

更新：2026-09-21

- 真题结构化数据：[sirwym/olympiad-practice-system](https://github.com/sirwym/olympiad-practice-system)，导入时 README 声明 MIT，未发现独立 LICENSE 文件。试题原始出处为 CCF GESP，编程题面由该项目从洛谷整理。各套试卷保留官方原卷及上游链接。
- 练习清单：[lihongzheshuai/yummy-code](https://github.com/lihongzheshuai/yummy-code)，MIT，Copyright (c) 2024 OneCoder。完整许可见 [yummy-code-LICENSE.txt](yummy-code-LICENSE.txt)。导入题目索引及题解链接，没有将原作者的完成状态作为用户进度。其他赛事与跨级练习标为拓展。
- 官方大纲：[发布页](https://gesp.ccf.org.cn/101/1008/10012.html)；[PDF](https://gesp.ccf.org.cn/101/attach/1725701770182688.pdf)。站内为学习目标摘要，三级参考第17—18页，四级第19—21页。
- 最新官方试卷：[2026年6月](https://gesp.ccf.org.cn/101/1010/10284.html)、[2026年9月](https://gesp.ccf.org.cn/101/1010/10300.html)，提供官方PDF入口，未转为站内客观题。
- KaTeX：来自上游 assets/js/katex.min.js，采用原生 MathML 输出。MIT，许可见 [KaTeX-LICENSE.txt](KaTeX-LICENSE.txt)。

## 数据处理与计分

保留社区题面和答案；不编造缺失代码或图片。需结合原卷的题显示提示，争议以官方原卷为准。客观题25道，每题2分，满分50分；编程题提供题面、草稿及外部提交入口，不生成自动判题成绩。整卷计时120分钟，与原有20题训练分开统计。

进度保存在本机浏览器，各等级独立，不修改原有练习和宠物数据。重新开始一套试卷会覆盖该套作答记录，保留编程草稿。
# 开源适配编程题

- [AlajeBash/2023_Summer_Cpp_Challenge](https://github.com/AlajeBash/2023_Summer_Cpp_Challenge)：100 道初学者 C++ 练习，MIT License。本站从中筛选与 GESP C++ 三级、四级考纲匹配的题目，并将英文练习目标整理为中文题面；原文件链接保留在每道题内。
- 许可证副本：[summer-LICENSE.txt](summer-LICENSE.txt)

## 三级客观题强化来源

- [rambasnet/CPP-Fundamentals](https://github.com/rambasnet/CPP-Fundamentals)：Colorado Mesa University 教授维护的 CS1 C++ 课程，MIT License。本站参考其基础概念、数组、字符串、函数和练习组织方式编写三级原创客观题。
- [Viztruth/C-and-Cpp-Practice-problems-with-solutions](https://github.com/Viztruth/C-and-Cpp-Practice-problems-with-solutions)：面向初学者及计算机实验课的 C/C++ 练习仓库，MIT License。本站参考其数组统计、字符串处理和基础算法题型结构编写原创变式。
- [AlajeBash/2023_Summer_Cpp_Challenge](https://github.com/AlajeBash/2023_Summer_Cpp_Challenge)：100 道初学者 C++ 练习，MIT License。客观题扩充参考其进制、函数、循环、数组及字符串主题分布。
- 新增题目不是上游题目的中文复制。三级大学课程题型强化题库共500道，包含选择和判断题；每个知识点均含“基础辨析、相近模拟、举一反三”和扩展训练，题面、选项和中文解析均为本站原创，并限制在 GESP C++ 三级考纲范围内。

## 四级客观题强化来源

- [rambasnet/CPP-Fundamentals](https://github.com/rambasnet/CPP-Fundamentals)：大学 CS1 C++ 课程，MIT License。参考函数、数组、算法分析及文件处理知识结构。
- [rougier/CPP-Crash-Course](https://github.com/rougier/CPP-Crash-Course)：C++ 公开课程及考试示例，MIT License。参考指针、引用、结构体、异常和文件流知识结构。
- [gammasoft71/modern_cpp_course](https://github.com/gammasoft71/modern_cpp_course)：免费开源现代 C++ 课程，MIT License。参考数组与指针、结构体、引用、函数及异常的课程组织方式。
- [AlajeBash/2023_Summer_Cpp_Challenge](https://github.com/AlajeBash/2023_Summer_Cpp_Challenge)：100 道初学者 C++ 练习，MIT License。参考函数、矩阵、排序及数组函数题型分布。
- 四级大学课程题型强化题库共520道，按八个四级知识点各65题均衡分布。题目按“基础辨析、相近模拟、举一反三”和扩展训练组织，题干和中文解析为本站原创，并排除类继承、模板、STL高级容器等超出四级范围的内容。


## 2026-09-23 去重与功能精简

- 对上游当前三级、四级各12套试卷逐套核对，共648道题（600道客观题、48道编程题），原卷题序及分值保留。
- 原训练库三级981条、四级735条；合并重复后分别769、631条。题干、选项集合及答案一起核对，保留同题干不同选项的题；数值不同的有效变式不作为重复题删除。
- 将题面完整、选项有效的真题并入随机训练，三级新增258道、四级新增253道。最终训练库三级1027道、四级884道。原卷中的重复出现只保留考试归属，不重复建立训练题正文；跨级10道相同题共用一份正文，并保留各级知识点映射。
- 77道原卷题被上游标记为代码/图片不完整，另3道选项异常，不加入随机训练；仍保留原卷核对入口。没有猜测补写缺失题目。
- Yummy三级87条、四级56条题目索引均保留；另补充原题单中3个知识讲解/拓展参考链接。编程题与原卷条目按题号/链接归并，统一编程题库三级103道、四级72道，含原有开源适配题各16道。
- 主导航从各13项收拢为6项；保留原有知识点、重点、技巧、易错点和四级12课视频。三级基础在四级中明确标为衔接回顾，不删除教学内容。
- 修正2024年9月四级判断题第5、6题社区转录答案，已对照官方PDF第6页答案表：第5题正确、第6题错误。修正旧训练题 `string s="abc10"; s.size()` 的答案为5，并与同题合并。
- 修复三级重复交卷重复奖励、训练刷新恢复、计时过期标记、专项/复习重复点击和异常本地存储恢复。历史学习记录与宠物共享余额沿用原存储键。

去重明细见 `tests/dedup-audit.json`，功能回归见 `tests/regression.cjs` 和 `tests/results.json`。该测试覆盖软件逻辑，并不等同于逐题重新命题审校全部社区真题。
