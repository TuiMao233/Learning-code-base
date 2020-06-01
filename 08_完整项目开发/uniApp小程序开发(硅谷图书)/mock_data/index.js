export const getCarouselImg = () => [
	'//img13.360buyimg.com/babel/s1580x740_jfs/t1/132883/29/23/159069/5ec790c6E65228f88/58bbd4e01b05a4bb.jpg!cc_1580x740.webp',
	'//img10.360buyimg.com/babel/s1580x740_jfs/t1/115747/35/7751/124233/5ec74650E7161431e/b7d02dae13fd8574.jpg!cc_1580x740.webp',
	'//img10.360buyimg.com/babel/s1580x740_jfs/t1/137356/8/168/201898/5eca203aE89d826fe/973130b821df8f0a.jpg!cc_1580x740.webp',
	'//img14.360buyimg.com/babel/s1580x740_jfs/t1/131460/29/59/92266/5ec7e2e8Ea3092af6/e37f34b3faf86eb0.jpg!cc_1580x740.webp',
	'//img11.360buyimg.com/babel/s1580x740_jfs/t1/117862/10/7973/192365/5ec790b1Edf24cf4d/2ce5fcf3362b056e.jpg!cc_1580x740.webp',
]

const getRandomNum = (a, b, c) => ( ( a + Math.random()*(b-a) ).toFixed(c) )

// 参照世界十大名著
export const getBooks = () => [
	{ // 获取图书的列表
	book_name: "战争与和平",
	author: "托尔斯泰",
	publishing: "中国华侨出版社",
	price: getRandomNum(55, 100, 1),
	date: "一八一二年",
	item_image: "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1435911638,1567083964&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/0df3d7ca7bcb0a468baf01866063f6246a60af84?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U5Mg==,xp_5,yp_5",
	details: '一八一二年，俄、法两国再度交战，安德烈·保尔康斯基在战役中身受重伤，而俄军节节败退，眼见莫斯科将陷于敌人之手了。罗斯托夫将原本用来搬运家产的马车，改去运送伤兵，娜达莎方能于伤兵中发现将要死去的安德烈·保尔康斯基。她向他谢罪并热诚看护他，但一切都是徒劳了，安德烈·保尔康斯基仍然逃不过死亡之神而去世了。彼尔化装成农夫，想伺机刺杀拿破仑，但却被法军逮捕而成为俘虏。其爱妻海伦于战火中，仍继续其放荡行为，最后因误服堕胎药而死亡。几番奋战后，俄国终于赢得胜利，彼尔于莫斯科巧遇娜达莎，便结为夫妇，而安德烈·保尔康斯基的妹妹玛莉亚也与娜达莎之兄尼克拉结婚。',
}, {
	book_name: "巴黎圣母院",
	author: "维克多·雨果",
	publishing: "北京工业大学出版社",
	price: getRandomNum(55, 100, 1),
	date: "1831年1月14日",
	item_image: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3020011102,1201263319&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/503d269759ee3d6d29f31e3a4f166d224f4ade0e?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "丑聋人卡西莫多被巴黎圣母院的神父克罗德收养，做撞钟人，外表正经的克罗德神父自从遇见美丽的吉普赛少女拉·爱斯梅拉达后，被其美色所诱而神魂颠倒，指使卡西莫多强行掳走爱斯梅拉达，途中被福比斯骑兵上尉队长所救，爱斯梅拉达因而爱上了福比斯。但福比斯生性风流，被怀恨在心的克罗德刺杀，却没有死，并嫁祸于爱斯梅拉达，令她被判死刑，行刑时，卡西莫多将爱斯梅拉达救走并藏身于圣母院中，乞丐群众为救爱斯美拉达而冲入教堂，误与卡西莫多大战，爱斯梅拉达被由克罗德带领的军队绞杀在广场上，卡西莫多愤然将克罗德从教堂顶楼推下去，之后抚着爱斯梅拉达的尸体殉情。"
},{
	book_name: "童年",
	author: "马克西姆·高尔基",
	publishing: "上海人民美术出版社",
	price: getRandomNum(55, 100, 1),
	date: "1908年至1910年间",
	item_image: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3292065892,2831985517&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/8326cffc1e178a82f412e164fc03738da877e8cc?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "讲了小主人公高尔基（阿廖沙）在父亲去世后，随母亲寄住在外祖父家中度过的岁月。其间，他得到外祖母的疼爱、呵护，受到外祖母所讲述的优美童话的熏陶，同时也亲眼目睹两个舅舅为争夺家产而争吵打架以及在生活琐事中表现出来的自私、贪婪。高尔基（阿廖沙）就是在这种“令人窒息的、充满可怕景象的狭小天地里”度过了自己的童年。"
},{
	book_name: "呼啸山庄",
	author: "艾米莉·勃朗特",
	publishing: "北京工业大学出版社",
	price: getRandomNum(55, 100, 1),
	date: "1847年",
	item_image: "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1989721133,2147161228&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/738b4710b912c8fc800840f8ff039245d688210f?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "一个爱到极致的男人，做出了疯狂的行为。他用“爱”杀人，却也用爱自杀。凯瑟琳生前死后，他都活在痛苦里。凯瑟琳弥留之际，他还用说话去刺伤她。但是，希斯克力夫承受的却是两份伤痛，他自己的和凯瑟琳的。我很欣赏用情如此的男子。虽说有点变态和残酷，却怎么也恨不起他。还蛮同情他的。甚至很感动于他的疯狂的爱。相对来说，凯瑟琳就太自私了。她爱希斯克力夫，又嫁给富有的林惇，可以说，呼啸山庄和画眉田庄的悲剧有一大部分是她亲手造就的。 希斯克力夫，很疯狂。但很迷人。当然，也不失为一个好丈夫。只是，笨了一点。凯瑟琳：她坏、她自私、可是她对爱的执着，使她也因此散发着好女人与坏女人的混合着的魅力。"
},{
	book_name: "大卫·科波菲尔",
	author: "查尔斯·狄更斯",
	publishing: "中国石化出版社",
	price: getRandomNum(55, 100, 1),
	date: "1849-1850年",
	item_image: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4250625897,4151254306&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/4afbfbedab64034f1abc7ec8a5c379310b551d8e?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《大卫·科波菲尔》通过主人公大卫一生的悲欢离合，多层次地揭示了当时社会的真实面貌，突出地表现了金钱对婚姻、家庭和社会的腐蚀作用。小说中一系列悲剧的形成都是金钱导致的。摩德斯通骗娶大卫的母亲是觊觎她的财产；艾米丽的私奔是经受不起金钱的诱惑；威克菲尔一家的痛苦，海穆的绝望，无一不是金钱造成的恶果。而卑鄙小人希普也是在金钱诱惑下一步步堕落的，最后落得个终身监禁的可耻下场。狄更斯正是从人道主义的思想出发，暴露了金钱的罪恶，从而揭开“维多利亚盛世”的美丽帷幕，显现出隐藏其后的社会真相。"
},{
	book_name: "红与黑",
	author: "司汤达",
	publishing: "四川辞书出版社",
	price: getRandomNum(55, 100, 1),
	date: "1830年",
	item_image: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2909516758,1517229423&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/c83d70cf3bc79f3dc04f50e6b2a1cd11738b29bd?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《红与黑》是19世纪法国乃至欧洲文学的一座丰碑。小说围绕主人公于连的个人奋斗及两次爱情经历的描写，揭示了复辟王朝时期的波澜的阶级大博斗，反映了政治黑暗、教会腐败，贵族反动和资产阶级利欲熏心的广阔生活画面。于连的两次爱情动机都是以爱情占有为出发点最终要达到自己的政治目的。"
},{
	book_name: "悲惨世界",
	author: "维克多·雨果",
	publishing: "",
	price: getRandomNum(55, 100, 1),
	date: "1862年",
	item_image: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3520479190,2193477344&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/3ac79f3df8dcd100ebdebd80708b4710b8122fd4?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《悲惨世界》一书中，雨果以卓越的艺术魅力展示了资本主义社会奴役劳动人民、逼良为娼的残酷现实。雨果的这部传世之作，创造了一部反映法国现代社会生活和政治生活的长篇史话。全书时间跨度长达近半个世纪，个人命运与历史题材的结合，气势磅礴，色彩瑰丽，最大限度地体现了雨果在叙事方面的过人才华。在内容上的丰厚、深广与复杂而言，它无疑在雨果数量众多的作品中居于首位。"
},{
	book_name: "安娜·卡列尼娜",
	author: "托尔斯泰",
	publishing: "人民文学出版社",
	price: getRandomNum(55, 100, 1),
	date: "1877年",
	item_image: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2056449123,2744050203&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/79f0f736afc37931651ccf66e5c4b74543a9110c?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《安娜·卡列尼娜》是俄国著名作家列夫·托尔斯泰的代表作品。本书通过女主人公安娜的追求爱情悲剧，和列文在农村面临危机而进行的改革与探索这两条线索，描绘了俄国从莫斯科到外省乡村广阔而丰富多彩的图景，先后描写了150多个人物，是一部社会百科全书式的作品。"
},{
	book_name: "约翰·克利斯朵夫",
	author: "罗曼·罗兰",
	publishing: "大象出版社",
	price: getRandomNum(55, 100, 1),
	date: "1912年",
	item_image: "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2642641483,2146117536&fm=58",
	image: "https://bkimg.cdn.bcebos.com/pic/e1fe9925bc315c60e129e55086b1cb13485477d5?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《约翰·克利斯朵夫》（Jean-Christophe）是一部通过主人公一生经历去反映现实社会一系列矛盾冲突，宣扬人道主义和英雄主义的长篇小说。小说描写了主人公奋斗的一生，从儿时音乐才能的觉醒、到青年时代对权贵的蔑视和反抗、再到成年后在事业上的追求和成功、最后达到精神宁静的崇高境界。"
},
{
	book_name: "飘",
	author: "玛格丽特·米切尔",
	publishing: "漓江出版社",
	price: getRandomNum(55, 100, 1),
	date: "1936年",
	item_image: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3148191891,2704823548&fm=58",
	image:"https://bkimg.cdn.bcebos.com/pic/b151f8198618367a0f21638721738bd4b21ce5c4?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
	details: "《飘》所讲述的是一个以美国南北战争为背景的爱情故事。小说的主人公思嘉·奥哈拉是美国佐治亚州一位富足且颇有地位的种植园主的女儿。父亲杰拉尔德是爱尔兰的移民。刚到佐治亚州时，杰拉尔德身无分文，靠赌博赢得了塔罗庄园的所有权。于是就开始在这块红色的土地上创业，编织着他的美国之梦。直到43岁的时候，他才和芳龄15的埃伦——一个东海岸法国移民的女儿——结了婚。杰拉尔德心地善良，但脾气暴躁，而年轻的妻子则有着良好的家庭教育和严格的道德观念。她亲手操持着整个庄园的日常事务，甚至还为庄园里的黑奴看病，接生。因此，夫妇俩受到周围白人庄园主的尊敬，也深得黑人奴隶的爱戴。女儿思嘉.奥哈拉（Scarlett·O'Hara）在这种环境中慢慢长大了。"
},
]
