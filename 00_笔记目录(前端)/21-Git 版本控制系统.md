# 版本控制

## 什么是版本控制

我们为什么要关心它呢？版本控制是一种记录一个或若干文 件内容变化，以便将来查阅特定版本修订情况的系统

## 为什么要使用版本控制

软件开发中采用版本控制系统是个明智的选择。 有了它你就可以将某个文件回溯到之前的状态，甚至将整个项目都回退到过去某 个时间点的状态。就算你乱来一气把整个项目中的文件改的改删的删，你也照样可以 轻松恢复到原先的样子。但额外增加的工作量却微乎其微。 你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异 问题出现的原因，又是谁在何时报告了某个功能缺陷等等。

## 集中化版本控制

**优点：**每个人都可以在一定程度上看到项目中的其 他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集 中化的版本控制系统; 要远比在各个客户端上维护本地数据库来得轻松容易。

**缺点：**故障时无法协同工作、写代码时不能参考版本代码和对代码进行优化。中央服务器有丢失数据的风险，

## 分布式版本控制

**客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。**这么一 来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本 地仓库恢复。因为每一次的提取操作，实际上都是一次对代码仓库的完整备份

**分布式的版本控制系统在管理项目时 存放的不是项目版本与版本之间 的差异.它存的是索引(**所需磁盘空间很少 所以每个客户端都可以放下整个 项目的历史记录)

**分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:**

1.  断网的情况下也可以进行开发(因为版本控制是在本地进行的) 
2. 使用 github 进行团队协作,哪怕 github 挂了 每个客户端保存 的也都是整个完整的项目(包含历史记录的!!!)

# Git 简述

## Git 简史

Git 是目前世界上最先进的分布式版本控制系统。同生活中的许多伟大事件一样，Git 诞生于一个极富纷争大举创新的年代。Linux 内核开源项目有着为数众广的参与者。绝 大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上（1991－2002 年间）。到 2002 年，整个项目组开始启用分布式版本控制系统 BitKeeper 来管理和维 护代码。

到了 2005 年，开发 BitKeeper 的商业公司同 Linux 内核开源社区的合作关系结 束，他们收回了免费使用 BitKeeper 的权力。这就迫使 Linux 开源社区（特别是 Linux 的缔造者 Linus Torvalds ）不得不吸取教训，只有开发一套属于自己的版本控制系统才 不至于重蹈覆辙。他们对新的系统制订了若干目标：

​				**分支切换速度快，容量小(压缩)，简单的设计，完全分布式 **

​				**对非线性开发模式的强力支持（允许上千个并行开发的分支） **

​				**有能力高效管理类似 Linux 内核一样的超大规模项目（速度和数据量）**

自诞生于 2005 年以来，Git 日臻成熟完善，在高度易用的同时，仍然保留着初期设 定的目标。它的速度飞快，极其适合管理大项目，它还有着令人难以置信的非线性分支管理 系统可以应付各种复杂的项目开发需求。

# Git 知识点（重要）

## Git 的三个概念

工作区、暂存区、版本库

Git对象、树对象、提交对象

本地分支、远程跟踪分支、远程分支



## Git 特点

### 直接记录快照并非差异比较

Git 和其它版本控制系统（包括 Subversion 和近似工具）的主要差别在于 Git 对待数据的方法。 

### 近乎所有操作都是本地执行

在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。

### 保证完整性

Git 中所有数据在存储前都计算校验和，然后以校验和来引用。 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。

### 一般只添加数据

执行的 Git 操作，几乎只往 Git 数据库中增加数据。

### 三种状态

已提交（committed）、已修改（modified）和已暂存（staged）



## 工作流程

每个项目都有一个 Git 目录（.git ）它是 Git 用来保存元数据和对象数据库 的地方。

**一、在工作目录中修改某些文件。**
从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作 目录。这些文件实际上都是从 Git 目录中的压缩对象数据库中提取出来 的，接下来就可以在工作目录中对这些文件进行编辑。

**二、保存到暂存区域，对暂存区做快照**
暂存区域只不过是个简单的文件，一般都放在 Git 目录中。有时候人们 会把这个文件叫做索引文件，不过标准说法还是叫暂存区域。

**三、提交更新**
将保存在暂存区域的文件快照永久转储到本地数据库（Git 目录） 中

我们可以从文件所处的位置来判断状态：如果是 Git 目录中保存着的特定版 本文件，就属于已提交状态；如果作了修改并已放入暂存区域，就属于已暂存 状态；如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。



## 分支的本质

分支的本质就是一个提交对象，所有的分支都会有机会被HEAD所引用。当我们有新的提交的时候，HEAD会携带当前持有的分支往前移动



## 远程协作

**三大概念：**本地分支、远程跟踪分支(remote/分支名)、远程分支

**基本流程**

~~~D
第一步: 项目经理创建一个空的远程仓库
第二步: 项目经理创建一个待推送的本地仓库
第三步: 为远程仓库配别名  配完用户名 邮箱
第四步: 在本地仓库中初始化代码 提交代码
第五步: 推送
第六步: 邀请成员
第七步: 成员克隆远程仓库
第八步: 成员做出修改
第九步: 成员推送自己的修改
第十步: 项目经理拉取成员的修改
~~~

**克隆仓库时 会自动为master做跟踪**

# Git 安装&配置

git 地址 : https://git-scm.com/download/win，下载完安装包之后，双击 exe 安装包，可以看到如下图窗口界面，一直点击下一步，就安装完成了

## Git Base Here基础命令

清除屏幕`clear`，

## 用户设置

**用户名称：**` git config --global user.name "[name]"` 
**用户邮箱：**` git config --global user.email [email]`
**检查已有的配置信息：**`git config --list`
**删除配置信息：** `git config --global --unset user.email`

/etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。若使用 git config 时用 --system 选项，读写的就是这个文件。
~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项，读写的就是这个文件。
.git/config 文件：当前项目的 Git 目录中的配置文件（也就是工作目录 中的 .git/config 文件）这里的配置仅仅针对当前项目有效。

# Git 底层概念（底层命令）

## 基础的 linux 命令 

`git --version`查看版本
`clear` ：清除屏幕
`echo 'test content'`：往控制台输出信息 `echo 'test content' > test.txt` 输出文件
`ll` ：将当前目录下的 子文件&子目录平铺在控制台
`find` 目录名： 将对应目录下的子孙文件&子孙目录平铺在控制台
`find` 目录名 -type f ：将对应目录下的文件平铺在控制台 
`rm` 文件名 ： 删除文件 mv 源文件 重命名文件: 重命名
`cat` 文件的 url : 查看对应文件的内容
`vim` 文件的 url(在英文模式下)
	按 i 进插入模式 进行文件的编辑 
	按 esc 键&按:键 进行命令的执行
		q! 强制退出（不保存）
		wq 保存退出
		set nu 设置行号

## 初始化新仓库 

**执 行：`git init`**，对现有的某个项目开始用 Git 管理，只需到此项目所在的目录

作用：初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要 的数据和资源都存放在这个目录中。不过目前，仅仅是按照既有的结构框架初始化 好了里边所有的文件和目录，但我们还没有开始跟踪管理项目中的任何一个文件。

### .git目录

`hooks` 目录包含客户端或服务端的钩子脚本；
`info` 包含一个全局性排除文件 
`logs` 保存日志信息
**`objects` 目录存储所有数据内容；**
**`refs` 目录存储指向数据的提交对象的指针（分支）**
`config` 文件包含项目特有的配置选项 
`description` 用来显示对仓库的描述信息
 **`HEAD` 文件指示目前被检出的分支**
**`index` 文件保存暂存区信息**

# Git 三大基础对象

## Git对象

### 向数据库写入内容 并返回对应键值

**命令：** `echo 'test content' | git hash-object -w --stdin` 
`-w` 选项指示 hash-object 命令存储数据对象；若不指定此选项，则 该命令仅返回对应的键值 
`-stdin（standard input）`选项则指示该命令从标准输入读取内容； 若不指定此选项，则须在命令尾部给出待存储文件的路径 

**存文件：**`git hash-object -w 文件路径` 
**返回文件对应键值：**`git hash-object 文件路径` 
**根据键值拉取数据：**`git cat-file -p [filehash]` 
	-p 选项可指示该命令自动判断内容的类型，并为我们显示格式友好的内容 

记住文件的每一个版本所对应的 SHA-1 值并不现实，且在 Git 中，文件名并没有被保存——我们仅保存了文件的内容

[^注意 ]:当前的操作都是在对本地数据库进行操作 不涉及暂存区

## 树对象

树对象（tree object），它能解决文件名保存的问题，也允许我们将多个文件 组织到一起。Git 以一种类似于 UNIX 文件系统的方式存储内容。所有内容均以 树对象和数据对象(git 对象)的形式存储，其中树对象对应了 UNIX 中的目录项， 数据对象(git 对象)则大致上对应文件内容。一个树对象包含了一条或多条记录（每条记录含有一个指向 git 对象或者子树对象的 SHA-1 指针，以及相应的模式、类 型、文件名信息）。一个树对象也可以包含另一个树对象。

### 构建树对象

我们可以通过 `update-index`；`write-tree`；`read-tree` 等命令来构建 树对像并塞入到暂存区。

利用 `update-index` 命令 为 `test.txt` 文件的首个版本——创建一个 暂存区。并通过 `write-tree` 命令生成树对像。
`git update-index --add --cacheinfo 100644 83baae61804e65cc73a7201a7252750c76066a30 test.txt` 

**文件模式：**  100644，表明这是一个普通文件 
					100755，表示一个可执行文件
					120000，表示一个符号链接。

**--add 选项：**因为此前该文件并不在暂存区中 首次需要—add 

**--cacheinfo 选项：**因为将要添加的文件位于 Git 数据库中，而不是位于当前 目录下 所有需要—`cacheinfo`

**查看暂存区：**`git ls-files -s`
**查看树对象：**`git cat-file -p master^{tree}（或者是树对象的 hash）` 
**暂存区生成树对象存入库：**`git write-tree` 

新增 new.txt 将 new.txt 和 test.txt 文件的第二个版本塞入暂存区。并通过 write-tree 命令生成树对像。

~~~e
echo 'new file' > new.txt 
git update-index --cacheinfo 100644 / 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt 
git update-index --add new.txt git write-tree 
~~~

将第一个树对象加入第二个树对象，使其成为新的树对象

`git read-tree --prefix=bak 06e21bb0105e2de6c846725a9a7172f57dd1af96`

![最后的树对象](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/最后的树对象.png?raw=true)

现在有三个树对象（执行了三次 write-tree），分别代表了我们想要跟踪 的不同项目快照。然而问题依旧：若想重用这些快照，你必须记住所有三个 SHA-1 哈希值。 并且，你也完全不知道是谁保存了这些快照，在什么时刻保 存的，以及为什么保存这些快照。而以上这些，正是提交对象（commit object） 能为你保存的基本信息

## 提交对象 

我们可以通过调用 commit-tree 命令创建一个提交对象，为此需要指定一个树 对象的 SHA-1 值，以及该提交的父提交对象（如果有的话 第一次将暂存区做快 照就没有父对象）

**创建提交对象：**`echo 'first commit' | git commit-tree [树哈希]` 返回:`fdf4fc3344e67ab068f836878b6c4951e3b15f3d`

**查看提交对象：**`git cat-file -p [提交对象哈希]`

提交对象的格式很简单： 它先指定一个顶层树对象，代表当前项目快照；然后是作者/提交者信息（依 据你的 user.name 和 user.email 配置来设定，外加一个时间戳）；留空 一行，最后是提交注释

![提交对象视图](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/提交对象视图.png?raw=true)

# Git 操作命令集

**创建工作目录 对工作目录进行修改**

1. `git add ./`  将目录下所有文件进行以下操作(存入项目对象，在存入暂存区)
   		`git hash-object -w 文件名`	(修改了多少个文件目录中的文件，次命令就要被执行多少次)
      		`git ipdata-index ....` 		(存入暂存区)
2. `git commit -m "注释内容"`  暂存区存入数据库，并对应创建树对象，提交对象
   		`git write-tree`		创建树对象
      		`git commit-tree`	  提交对象

**存文件：**`git hash-object -w 文件路径` 
**返回文件对应键值：**`git hash-object 文件路径` 
**根据键值拉取数据：**`git cat-file -p [filehash]` 

**查看暂存区：**`git ls-files -s`
**查看树对象：**`git cat-file -p master^{tree}（或者是树对象的 hash）` 
**暂存区生成树对象存入库：**`git write-tree` 

**初始化仓库：**`git init`
**检查当前文件状态：**`git status`

**将修改添加到暂存区：** `git add ./`
**查看哪些更新还没有暂存：**`git diff（不加参数直接输入 git diff）`
**查看哪些更新已暂存准备下次提交：**`git diff –cached 或者 git diff –staged(1.6.1 以上)`
**检查当前文件状态：**`git status`

**将暂存区提交到版本库：** `git commit -m 注释`
**跳过暂存区直接提交到版本库：**`git commit -a`
**跳过暂存区直接提交到版本库并写注释：**：`git commit -a -m 注释`

**删除文件：**`git rm 文件名` 删除工作目录对应的文件，在将修改添加到暂存区
**清空暂存：**`rm .git/index` 删除暂存区的所有文件
**文件改名：**`git mv 文件名 新文件名` 将工作目录的文件名进行修改，在将修改添加到暂存区

**查看历史记录:** `git log`
**查看所有分支的所有操作记录：**`git reflog`

**退回版本并创建、切换该分支**：首先`git reflog`找到旧版本hash值，在调用` git branch -b 分支名 提交对象hash`
**直接退回旧版本：**`git reset [分支hash]`：将`HEAD`、`Index`、`Working`直接跳到所对应分支上

## 提交注释规范

一般情况下，提交 GIT 时的注释可以分成几类，可以用几个动词开始：

- add( 新加入的需求 )
- fixe( 修复 bug )
- change( 完成的任务 )
- update( 完成的任务，或者由于第三方模块变化而做的变化 )

尽量将注释缩减为一句话，不要包含详细的内容。
假如有 Issues 系统，其中可以包含 Issue 的 ID。比如：Issue #123456
包含作者的信息。比如 by Bruce
完整例子：
`git commit -m 'Issue #[issue number] by [username]: [Short summary of the change].'`
Related articles

## 分支操作

**创建分支：** `git branch branchname`
**切换分支：**`git checkout branchname`
**创建&切换分支：**`git checkout -b branchname`
**创建&指定提交对象：**`git branch branchname 提交对象hash` 
**版本穿梭(时光机)：** `git branch branchname commitHash`
**普通删除分支：**`git  branch -d branchname`
**强制删除分支：** `git  branch -D branchname`
**合并分支：**`git merge branchname`
    **快进合并 --> 不会产生冲突**
    **典型合并 --> 有机会产生冲突**
    **解决冲突 --> 打开冲突的文件 进行修改 add commit** 

**查看分支列表：** `git branch`
**查看合并到当前分支的分支列表：** `git branch --merged`
    一旦出现在这个列表中 就应该删除
**查看没有合并到当前分支的分支列表：**`git branch --no-merged`
    一旦出现在这个列表中 就应该观察一下是否需要合并



## 储存操作

在分支上的工作做到一半时 如果有切换分支的需求, 我们应该将现有的工作存储起来
**将当前分支上的工作推到一个栈中：**`git stash` 
分支切换  进行其他工作 完成其他工作后 切回原分支
**将栈顶的工作内容还原：**`git stash apply || git stash apply stash@{2}` 
**删除栈：**`git stash drop`
**git stash apply +  git stash drop：** `git stash pop` 
**查看存储：**`git stash list`



## 远程协助

**推送本地项目到远程仓库：**`git push [远程仓库别名] [分支名]`
**克隆远程仓库到本地：**`git clone [远程仓库url]`
**拉取远程仓库更新：**`git fetch [remote-name]`  [更新到远程跟踪分支]
**推送本地分支&创建远程分支：**`git push origin [本地分支名]`

**在新建分支后，可以指定想要跟踪的远程分支**
`git checkout -b 本地分支名 远程跟踪分支名`
**如果已经拉取数据(`git fatch [remote-name]`)，可以直接指定远程分支名创建本地分支名，并跟踪远程分支。**
`git checkout --track 远程跟踪分支名`
**将当前分支跟踪一个刚刚拉取下来的远程分支**
`git branch -u origin/serverfix （--set-upstream-to）`
**查看分支是否有跟踪远程分支绑定**
`git branch -vv`

**删除远程分支：**`git push origin --delete serverfix`
**列出仍在远程跟踪但是远程已被删除的无用分支：**`git remote prune origin --dry-run` 
**清除上面命令列出来的远程跟踪：**`git remote prune origin`



## Git 配置代码别名

Git 并不会在你输入部分命令时自动推断出你想要的命令。 如果不想每次都输入 完整的 Git 命令，可以通过 git config 文件来轻松地为每一个命令设置一个别名。 `$ git config --global alias.co checkout` 

~~~ja
[查看分支] $ git config --global alias.br branch 			
[进行提交] $ git config --global alias.ci commit				
[查看状态] $ git config --global alias.st status			  
[查看暂存] $ git config --global alias.lifs "ls-files -s"   
[分叉历史] $ git config --global alias.brlog "log --oneline --decorate --graph --all"
~~~

# Git 高层命令（CRUD）

## **初始化仓库:**`git init`（初始化）

**作用：**初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要 的数据和资源都存放在这个目录中。不过目前，仅仅是按照既有的结构框架初始化 好了里边所有的文件和目录，但我们还没有开始跟踪管理项目中的任何一个文件。

工作目录下面的所有文件都不外乎这两种状态：**已跟踪** 或 **未跟踪**

已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它 们的记录，工作一段时间后，它们的状态可能是**已提交**，**已修改**或者**已暂存**

所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在 当前的暂存区域。

初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态 为已提交；在编辑过某些文件之后，Git 将这些文件标为已修改。我们逐步把 这些修改过的文件放到暂存区域，直到最后一次性提交所有这些暂存起来的文 件。使用 Git 时的文件状态变化周期如下图所示

### 检查当前文件状态：`git status`

确定文件当前处于什么状态

**如果创建一个新文件 README,保存退出后运行 git status 会看到该文件出现 在未跟踪文件列表中：**

~~~tcl
On branch master
Untracked files:
 (use "git add <file>..." to include in what will be committed)
 README
nothing added to commit but untracked files present (use "git add" to
track)
~~~

## 跟踪新文件:`git add`（暂存）

**作用：**跟踪一个新文件

**当运行此命令在运行 git status 命令，会看到 README 文件已被跟踪，并处于暂存 状态：**

~~~tex
Changes to be committed:
 (use "git reset HEAD <file>..." to unstage)
 new file: README
~~~

只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。

如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。在 git add 后面可以指明要跟踪的**文件**或**目录路径**。**如果是目录的话，就说明要递归 跟踪该目录下的所有文件。**（译注：其实 git add 的潜台词就是把目标文件快 照放入暂存区域，也就是 add file into staged area，同时未曾跟踪过的文件标 记为已跟踪。）

现在 README 文件都已暂存，下次提交时就会一并记录到仓库。假设此时， 你想要在 README 里再加条注释，重新编辑存盘后，准备好提交。不过且慢，再 运行 git status 看看：

~~~dart
On branch master
Changes to be committed:
 (use "git reset HEAD <file>..." to unstage)
 new file: README
Changes not staged for commit:
 (use "git add <file>..." to update what will be committed)
 (use "git checkout -- <file>..." to discard changes in working directory)
 modified: README
~~~

README 文件出现了两次！一次算已修改，一次算已暂存，这怎么可能呢？ 好吧，实际上 Git 只不过暂存了你运行 git add 命令时的版本，如果现在提交，那 么提交的是添加注释前的版本，而非当前工作目录中的版本。所以，**运行了 git add 之后又作了修订的文件，需要重新运行 git add 把最新版本重新暂存起来**

~~~javascript
$ git add README
$ git status
~~~

git diff 命令.这个命令它已经能解决我们 两个问题了：当前做的哪些更新还没有暂存？有哪些更新已经暂存起来准备 好了下次提交？

### 查看哪些更新还没有暂存

**命令：**`git diff（不加参数直接输入 git diff）`

### 查看哪些更新已暂存准备下次提交

**命令：** `git diff –cached 或者 git diff –staged(1.6.1 以上)`

## 提交更新:`git commit`（提交）

当暂存区域已经准备妥当可以提交时，在此之前，请一定要确认还有什么修改 过的或新建的文件还没有 git add 过，否则提交的时候不会记录这些还没暂存起来 的变化。所以，每次准备提交前，先用 git status 看下，是不是都已暂存起来了， 然后再运行提交命令 `git commit`

**`git commit`会启动文本编辑器**以便输入本次提交的说明 默认的提交消息包含最后一次运行 git status 的输出，放在注释行里， 另外开头还有一空行，供你输入提交说明。你完全可以去掉这些注释行， 不过留着也没关系，多少能帮你回想起这次更新的内容有哪些。

**以用 -m 参数后跟提交说明的方式，在一行命令中提交更新：**`git commit –m “message xxx”`

提交时记录的是放在暂存区域的快照，任何还未暂存的仍然保持已修改状态， 可以在下次提交时纳入版本管理。每一次运行提交操作，都是对你项目作一次快照， 以后可以回到这个状态，或者进行比较

### 跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁 琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交， 从而**跳过 git add 步骤 `git commit -a -m [注释]`**

## 移除文件: `git rm 文件名`（删除）

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中注册删除（确切地说， 是在暂存区域注册删除），然后提交。可以用 **git rm** 命令完成此项工作，并连带 从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

[^注意]:删除并不是真正意义上的删除，rm命令运行后要进行`git add ./ 以及git commit -m 我删除了`，删除操作实际上只是删除了工作空间的文件 ，并且在数据库里面会存着删除的信息

## 文件改名:`git mv 文件名`（改名）

`git mv laoliu.txt laoliuliu.txt`
`git commit -a / git status`

~~~web-idl
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        renamed:    laoliu.txt -> laoliuliu.txt
~~~

**其实，运行 git mv 就相当于运行了下面三条命令：**

~~~elm
$ mv laoliu.txt laoliuliu.txt
$ git rm laoliu.txt
$ git add laoliuliu.txt
~~~

## 查看历史记录: `git log`（提交）

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 `git log` 命令

**默认不用任何参数的话，git log 会按提交时间列出所有的更新**，最近的 更新排在最上面。 正如你所看到的，这个命令会列出每个提交的 `SHA-1` 校验和、 作者的名字和电子邮件地址、提交时间以及提交说明。

**只显示一行：**`git log --pretty=oneline`
**显示一行并截取hash值：**`git log --oneline`

# Git 分支（杀手功能）

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。 在很多版本控制系统中，这是一个略微低效的过程——常常需要完全创建一个源代码目录的副本。对于大项目来说，这样的过程会耗费很多时间。

而 **Git 的分支模型极其的高效轻量的。是 Git 的必杀技特性**，也正因为这一特性，使 得 Git 从众多版本控制系统中脱颖而出

为你创建了一个可以移动的新的指针。 比如，创建一个 testing 分 支：git branch testing。这会在当前所在的提交对象上创建一个指针

![创建分支](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/创建分支.jpg?raw=true)

## 创建&切换分支

### 创建分支

`git branch 分支名` 分支名 创建 一个新分支，并不会自动切换到新分支中去

### 新建且使分支指向提交对象**

`git branch 分支名 提交对象hash` 

### 切换分支 

 `git checkout 分支名`  切回主分支：`git checkout master`

**分支切换会改变你工作目录中的文件**，在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换 到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。如 果 Git 不能干净利落地完成这个任务，它将禁止切换分支

**切换分支会动三个地方：**HEAD、暂存区、工作目录

**注意要点：**每次切换分支前 当前分支一定得是干净的(已提交状态)，以及在切换分支时 如果当前分支上有未暂存的修改(第一次) 或者 有未提交的暂存(第一次)分支可以切换成功  但是这种操作可能会污染其他分支

### 新建分支并切换分支

`git checkout -b 分支名`

## 查看分支

`git branch` 不只是可以创建与删除分支。 如果不加任何参数运行它， 会得到当前所有分支的一个列表

### 查看每个分支最后一次提交

`git branch -v` 

### 查看哪些分支已经合并到当前分支

git branch –merged 查看哪些分支已经合并到当前分支，在这个列表中分支名字前没有 * 号的分支通常可以使用 git branch -d 删除掉；

### 查看所有包含未合并工作的分支

git branch --no-merged 查看所有包含未合并工作的分支 尝试使用 git branch -d 命令删除在这个列表中的分支时会失败。 如果真的想要删除分支并丢掉那些工作，可以使用 -D 选项强制删 除它。

### 查看项目分叉历史

`git log --oneline --decorate --graph --all`

## 删除分支

`git branch -d 分支名` 

## 分支合并

`git merge 分支名`

### 快进`fast-forward`

在合并的时候，有时候会出现"快进（`fast-forward`）"这个词。 由于当 前 master 分支所指向的提交是你当前提交的直接上游，所以 Git 只是简 单的将指针向前移动。 换句话说，当你试图合并两个分支时，如果顺着一个 分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的 将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分 歧——这就叫做 “快进（`fast-forward`）

### 产生文件冲突

有时候合并操作不会如此顺利。 如果你在两个不同的分支中，对同一个 文件的同一个部分进行了不同的修改，Git 就没法干净的合并它们。 如果你 对 #53 问题的修改和有关 hotfix 的修改都涉及到同一个文件的同一 处，在合并它们的时候就会产生合并冲突

此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂 停下来，等待你去解决合并产生的冲突。 你可以在合并冲突后的任意时刻 使用 `git status` 命令来查看那些因包含合并冲突而处于未合并（unmerged） 状态的文件

任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来。

~~~cassandra
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
~~~

在你解决了所有文件里的冲突之后，对每个文件使用 git add 命令来将其 标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记 为冲突已解决

## 分支流程

### 创建分支

<img src="https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/创建分支.jpg?raw=true" alt="创建分支"  />

### 修改分支并提交

<img src="https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/修改分支.jpg?raw=true" alt="修改分支"  />

### 切回主分支

![切回分支](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/切回分支.jpg?raw=true)

## 分支实际案例 

### 工作流

1. 开发某个网站。
2. 为实现某个新的需求，创建一个分支。
3. 在这个分支上开展工作。

### 紧急任务

正在此时，你突然接到一个电话说有个很严重的问题需要紧急修补。 你 将按照如下方式来处理：

1. 切换到你的线上分支（production branch）。
2. 为这个紧急任务新建一个分支，并在其中修复它。
3. 在测试通过之后，切换回线上分支，然后合并这个修补分支，最后将改 动推送到线上分支。
4. 切换回你最初工作的分支上，继续工作。

### 详细流程

**首先，我们假设你正在你的项目上工作，并且已经有一些提交**

![正常工作](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/正常工作.jpg?raw=true)

**现在，你已经决定要解决你的公司使用的问题追踪系统中的 #53 问题。 想要 新建一个分支并同时切换到那个分支上**，你可以运行一个带有 -b 参数的 git checkout 命令
`git checkout -b iss53` **相当于**`git branch iss53 && git checkout iss53`

![创建分支解决问题](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/创建分支解决问题.jpg?raw=true)

**你继续在 #53 问题上工作，并且做了一些提交。** 在此过程中，iss53 分 支在不断的向前推进，因为你已经检出到该分支

![分支提交](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/分支提交.jpg?raw=true)

**！！！现在你接到那个电话，有个紧急问题等待你来解决**

有了 Git 的帮助，你不必把这个紧急问题和 iss53 的修改混在一 起，你也不需要花大力气来还原关于 53# 问题的修改，然后再添加关于这个 紧急问题的修改，最后将这个修改提交到线上分支。 你所要做的仅仅是切换 回 master 分支 但是，在你这么做之前，要留意你的工作目录和暂存区里那些还没有 被提交的修改，它可能会和你即将检出的分支产生冲突从而阻止 Git 切换到 该分支。 最好的方法是，**在你切换分支之前，保持好一个干净的状态。**`git checkout master`（提 交你的所有修改）

这个时候，你的工作目录和你在开始 #53 问题之前一模一样，现在你可 以专心修复紧急问题了。 请牢记：当你**切换分支的时候，Git 会重置你的工 作目录**，使其看起来像回到了你在那个分支上最后一次提交的样子。 Git 会 自动添加、删除、修改文件以确保此时你的工作目录和这个分支最后一次提交 时的样子一模一样。

！！！接下来，你要修复这个紧急问题。 让我们**建立一个针对该紧急问 题的分支（hotfix branch）**，在该分支上工作直到问题解决

`git checkout -b hotfix`**问题解决后：**`git commit -a -m 'fixed the broken email address'`

![问题解决提交](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/问题解决提交.jpg?raw=true)

！！！你可以运行你的测试，确保你的修改是正确的，**然后将其合并回你 的 master 分支来部署到线上。** 你可以使用 `git merge` 命令来达到上 述目的

`git checkout master`		`git merge hotfix`

在合并的时候，有时候会出现"快进（`fast-forward`）"这个词。 由于当 前 master 分支所指向的提交是你当前提交的直接上游，所以 Git 只是简 单的将指针向前移动。 换句话说，当你试图合并两个分支时，如果顺着一个 分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的 将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分 歧——这就叫做 “快进（`fast-forward`）

![问题解决合并分支](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/问题解决合并分支.jpg?raw=true)

！！！关于这个紧急问题的解决方案发布之后，**你准备回到被打断之前时 的工作中**。 然而，你应该先删除 hotfix 分支，因为你已经不再需要它了 —— master 分支已经指向了同一个位置。 你可以使用带 -d 选项的 git branch 命令来删除分支。现在你可以切换回你正在工作的分支继续你的工 作，也就是针对 #53 问题的那个分支

`git branch -d hotfix` 		`git checkout iss53`

![回到分支](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/回到分支.jpg?raw=true)

你在 hotfix 分支上所做的工作并没有包含到 iss53 分支中。 如果你需 要拉取 hotfix 所做的修改，你可以使用 git merge master 命令 **将 master 分支合并入 iss53 分支**，或者你也可以等到 iss53 分支完成其 使命，再将其合并回 master 分支。
`git checkout master`         `git merge iss53`

当前的合并和你之前合并 hotfix 分支的时候看起来有一点不一样。 在 这种情况下，你的开发历史从一个更早的地方开始分叉开来（diverged）。 因 为，master 分支所在提交并不是 iss53 分支所在提交的直接祖先，Git 不 得不做一些额外的工作。 出现这种情况的时候，Git 会使用两个分支的末端 所指的快照（C4 和 C5）以及这两个分支的工作祖先（C2），做一个简单 的三方合并。

![子分支合并主分支](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/子分支合并主分支.jpg?raw=true)

和之前将分支指针向前推进所不同的是，Git 将此次三方合并的结果做了一个新的 快照并且自动创建一个新的提交指向它。 这个被称作一次合并提交，它的特别之处在 于他有不止一个父提交。

![子分支合并主分支2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/实际案例/子分支合并主分支2.jpg?raw=true)

需要指出的是，Git 会自行决定选取哪一个提交作为最优的 共同祖先，并以此作为合并的基础；这和更加古老的 CVS 系 统或者 Subversion （1.5 版本之前）不同，在这些古老的版本 管理系统中，用户需要自己选择最佳的合并基础。 Git 的这个 优势使其在合并操作上比其他系统要简单很多

**最终删除 iss53 号分支：**git branch -d iss53

**冲突：**有时候合并操作不会如此顺利。 如果你在两个不同的分支中，对同一个 文件的同一个部分进行了不同的修改，Git 就没法干净的合并它们。 如果你 对 #53 问题的修改和有关 hotfix 的修改都涉及到同一个文件的同一 处，在合并它们的时候就会产生合并冲突

此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂 停下来，等待你去解决合并产生的冲突。 你可以在合并冲突后的任意时刻 使用 `git status` 命令来查看那些因包含合并冲突而处于未合并（unmerged） 状态的文件

任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来。

~~~cassandra
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
~~~

在你解决了所有文件里的冲突之后，对每个文件使用 git add 命令来将其 标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记 为冲突已解决

## 长期分支 

许多使用 Git 的开发者都喜欢使用这种方式来工作，比如只在 master 分支上保留完 全稳定的代码——有可能仅仅是已经发布或即将发布的代码。 他们还有一些名 为 develop 或者 next 的平行分支，被用来做后续开发或者测试稳定性——这些分支 不必保持绝对稳定，但是一旦达到稳定状态，它们就可以被合并入 master 分支了。， 等待下一次的发布。

![公司常见模式](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/分支模式&原理/公司常见模式.jpg?raw=true)

随着你的提交而不断右移的指针。稳定分支的指针总是在提交历史中落后一大截， 而前沿分支的指针往往比较靠前。

![分支右移](/img/Git/分支模式&原理/分支右移.jpg?raw=true)

## 特性分支

特性分支对任何规模的项目都适用。 特性分支是一种短期分支，它被用来 实现单一特性或其相关工作。 也许你从来没有在其他的版本控制系统（VCS） 上这么做过，因为在那些版本控制系统中创建和合并分支通常很费劲。 然而， 在 Git 中一天之内多次创建、使用、合并、删除分支都很常见。

**实例：** 考虑这样一个例子，你在 master 分支上工作到 C1，这时为了解 决一个问题而新建 iss91 分支，在 iss91 分支上工作到 C2，这时思路 断了，你暂时放弃修复 iss91，切回主分支又工作到了 c3（画了几个页面）。 这时你突然对 iss91 问题有了新的想法，你切回 iss91 继续工作到了 c6。 在完成了对 iss91 的 bug 修复之后。你发现你 C4 之后的修改都没有使用 ES6 语法。于是你再新建一个 iss91v2 分支重新使用 ES6 语法开发到 C8，写 了一会写累了。接着你回到 master 分支又画了一会页面到 C10，画完页面 后你一咬牙切回 iss91v2 完成 es6 版本的修改到 C11. 你又冒出了一个不 太确定的想法，切回 master 后新建一个 dumbidea 分支，并在上面做些实 验。 你的提交历史看起来像下面这个样子：

![提交历史](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/分支模式&原理/提交历史.jpg?raw=true)

现在，我们假设两件事情：你决定使用第二个方案来解决那个问题，即使 用在 iss91v2 分支中方案；另外，你将 dumbidea 分支拿给你的同事看 过之后，结果发现这是个惊人之举。 这时你可以抛弃 iss91 分支（即丢 弃 C5 和 C6 提交），然后把另外两个分支合并入主干分支。 最终你的提交 历史看起来像下面这个样子：

~~~reStructuredText
在 master 分支是先合并 dumbidea 分支
切回 iss91v2 分支合并掉 iss91
删除 iss91
切回 master 分支再合并 iss91v2 分支
~~~

![提交历史2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/分支模式&原理/提交历史2.jpg?raw=true)

## 分支本质

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支 名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对 象的 master 分支。 它会在每次的提交操作中自动向前移动。

**注意 ：**Git 的 “master” 分支并不是一个特殊分支。 它就跟其它分支完全没有区别。 之所 以几乎每一个仓库都有 master 分支，是因为 git init 命令默认创建它，并且大多数 人都懒得去改动它。

![master](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/分支模式&原理/master.jpg?raw=true)

## 分支原理

### .git/refs 目录 

这个目录中保存了分支及其对应的提交对象

### HEAD 引用 

当运行类似于 git branch (branchname) 这样的命令时，Git 会取得当前所在分支最新提交对应的 SHA-1 值，并将其加入你想要创建的 任何新分支中。

当你执行 git branch (branchname) 时，Git 如何知道最新提 交的 SHA-1 值呢？ 答案是 HEAD 文件。

HEAD 文件是一个符号引用（symbolic reference），指向目前所在的分 支。 所谓符号引用，意味着它并不像普通引用那样包含一个 SHA-1 值。 它是一个指向其他引用的指针

# Git 储存

有时，当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状 态，而这时你想要切换到另一个分支做一点别的事情。 问题是，你不想仅仅因为 过会儿回到这一点而为做了一半的工作创建一次提交。 针对这个问题的答案是`git stash` 命令

## 创建储存

命令会将未完成的修改保存到一个栈上，而你 可以在任何时候重新应用这些改动**(git stash apply)**

## 查看存储

`git stash list`
`git stash apply stash@{2}`

如果不指定一个储藏，Git 认为指定的是最近的储藏

## 应用储藏并从栈上清除

`git stash pop`

## 移除储藏

`git stash drop`

# Git 后悔药

## 工作目录文件撤销

**命令：**`git checkout -- 文件名` 
**作用：**将在工作目录中对文件的修改撤销

## 暂存区文件撤销

**命令：**`git reset HEAD 文件名` 
**作用：**将文件从暂存区中撤回到工作目录

## 覆盖提交

**命令：**`git commit --amend` 

**作用：**这个命令会将暂存区中的文件提交，并将上一次提交覆盖

如果你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作
`git commit -m 'initial commit' --->[提交了但发现还有东西要修改]`
`git add forgotten_file ---> [修改后添加入暂存]`
`git commit –amend  ---> [覆盖之前的提交]`
最终你只会有一个提交 - 第二次提交将代替第一次提交的结果

# Git 移动指针（reset）

## 细化基本流程

当我们运行 **git init**，这会创建一个 Git 仓库，其中的 HEAD 引用指向未创建的分支。此时，只有工作目录有内容

![init](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/init.jpg?raw=true)

现在我们想要提交这个文件，所以用 **git add** 来获取工作目录中的内容， 并将其复制到索引中

![add](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/add.jpg?raw=true)

接着运行 **git commit**，它会取得索引中的内容并将它保存为一个永久的快 照，然后创建一个指向该快照的提交对象，最后更新 master 来指向本次提交

![commit](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/commit.jpg?raw=true)

此时如果我们运行 **git status**，会发现没有任何改动，因为现在三棵树完 全相同

现在我们想要对文件进行修改然后提交它。 我们将会经历同样的过程；首先在 工作目录中修改文件。 我们称其为该文件的 **v2** 版本，并将它标记为红色

![editFile](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/editFile.jpg?raw=true)

如果现在运行 **git status**，我们会看到文件显示在 “Changes not staged for commit,” 下面并被标记为红色，因为该条目在索引与工作目录之间存在不同。 接着我们运行 **git add** 来将它暂存到索引中

![addv2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/addv2.jpg?raw=true)

此时，由于索引和 HEAD 不同，若运行 git status 的话就会看到 “Changes to be committed” 下的该文件变为绿色 ——也就是说，现在预期的下 一次提交与上一次提交不同。 最后，我们运行 **git commit** 来完成提交。

![commitv2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/commitv2.jpg?raw=true)

现在运行 git status 会没有输出，因为三棵树又变得相同了

**切换分支或克隆的过程也类似。 当检出一个分支时，它会修改 HEAD 指向新的分支引用，将 索引 填充为该次提交的快照，然后将 索引 的内容复制 到 工作目录 中。**

##  reset 回退三部曲 

reset 做的第一件事是移动 HEAD 的指向，假设我们再次修改了 file.txt 文件并第三次提交它。 现在的历史看 起来是这样

![commitv3](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/commitv3.jpg?raw=true)

### 回退提交

**`git reset –soft HEAD~`，回退指针。**这与改变 HEAD 自身不同（checkout 所做的）；reset 移动 HEAD 指向的分支。

![reset](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/reset.jpg?raw=true)

看一眼上图，理解一下发生的事情：它本质上是**撤销了上一次 git commit 命令**。 当你在运行 git commit 时，Git 会创建一个新的提交，并 移动 HEAD 所指向的分支来使其指向该提交。

当你将它 reset 回 HEAD~（HEAD 的父结点）时，其实就是把该分支移 动回原来的位置，而不会改变索引和工作目录。 现在你可以更新索引并**再次运 行 git commit 来完成 git commit --amend 所要做的事情了。**

### 回退暂存区（索引） 

![resetv2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/resetv2.jpg?raw=true)

**注意： git reset HEAD~ 等同于 git reset –mixed HEAD~**

理解一下发生的事情：它依然会撤销一上次 提交，但还会 取消暂存 所有 的东西。 于是，我们回滚到了所有 git add 和 git commit 的命令执行之前。

### 回退工作目录 

![resetv3](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/resetv3.jpg?raw=true)

**`git reset --hard HEAD~`：你撤销了最后的提交、git add 和 git commit 命令以及工作目录 中的所有工作。**

**必须注意：**--hard 标记是 reset 命令唯一的危险用法，它也是 Git 会 真正地销毁数据的仅有的几个操作之一。 其他任何形式的 reset 调用都可 以轻松撤消，但是 --hard 选项不能，因为它强制覆盖了工作目录中的文件。 在这种特殊情况下，我们的 Git 数据库中的一个提交内还留有该文件的 v3 版 本，**我们可以通过 reflog 来找回它**。但是若该文件还未提交，Git 仍会覆 盖它从而导致无法恢复。

## reset 文件路径

reset 还可以给它提供一个作用路径。 若 指定了一个路径，**reset 将会跳过第 1 步**，并且将它的作用范围限定为指定的文 件或文件集合。 

![resetfile](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/resetfile.jpg?raw=true)

现在，假如我们运行 **git reset file.txt** （这其实是 git reset --mixed HEAD file.txt 的简写形式，），它会：
`移动 HEAD 分支的指向 （因为是文件这一步忽略）`
`将 file.txt 从 HEAD 复制到索引中`

![resetfilev2](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/细化基本流程/resetfilev2.jpg?raw=true)

## reset [bran-hash]（指定指针）

`git reset [分支hash]`：将`HEAD`、`Index`、`Working`直接跳到所对应分支上

## checkout [bran-hash]（指定指针）

**运行 git checkout [branch] 与运行 git reset [branch] 非常相似**，它会更新三者使其看起来像 [branch]，不过有两 点重要的区别

**首先不同于 reset --hard，checkout 对工作目录是安全的**，它会 通过检查来确保不会将已更改的文件弄丢。而 reset --hard 则会不做检 查就全面地替换所有东西。

第二个重要的区别是如何更新 HEAD。 reset 会移动 HEAD 分支的 指向，而 checkout 只会移动 HEAD 自身来指向另一个分支。

### 退回v2版本并创建、切换该分支

`$ git branch -b 分支名 提交对象hash`

# Git 标签（版本号）

**打 tag：**Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会 使用这个功能来标记发布结点（v1.0 等等）。

## 列出标签 

`git tag`

## 创建标签

### 当前分支创建

`git tag 1.0`

### 指定分支创建

`git tag v1.4 commitHash`

### 创建附注标签

[打开文本编辑器添加注释]`git tag -a v1.4`  
[可以指定分支]`git tag -a v1.4 commitHash` 	
[可以单行注释]`git tag -a v1.4 commitHash -m 'my version 1.4'` 

## 查看标签 

`git show` 可以显示任意类型的对象（git 对象 树对象 提交对象 tag 对象）

**git show tagname**

## 远程标签

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完 标签后你必须显式地推送标签到 共享服务器上。你可以运行
`git push origin [tagname]`

## 删除标签

删除标签 要删除掉你本地仓库上的标签，可以使用命令 git tag -d 。 例如，可以使用下面的命令删除掉 一个轻量级标签
`git tag -d v1.4`

**注意：**上述命令并不会从任何远程仓库中移除这个标签，你必须使用 `git push  :refs/tags/` `来更新你的远程仓库`
`git push origin :refs/tags/v1.4`

## 检出标签分支

如果你想查看某个标签所指向的文件版本，可以使用 `git checkout` 命令
`git checkout tagname`

虽然说这会使你的仓库处于“分离 头指针（detacthed HEAD）”状态。在“分 离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化，但你 的新提交将不属于任何 分支，并且将无法访问，除非访问确切的提交哈希。因此， 如果你需要进行更改——比如说你正在修复旧版本的错 误——这通常需要创建一 个新分支：
`git checkout -b version2`

#  Git 统一代码风格

 Git 中结合 Eslint。让代码在没有通过 Eslint 的情况下 禁止提交。 **pre-commit 、哈士奇、eslintignore**

## EditorConfig

在团队开发中，统一的代码格式是必要的。但是不同开发人员使用的编辑工具可能 不同，这样就造成代码的不统一。

目前为止，还是有很多人陷入在 tabs vs spaces 之类的争论中。不是每个人都在严 格要求自己的代码规范和风格，对于多人协作的项目这容易出现问题。毕竟每个人所用 的 IDE 和编辑器都可能不同。

EditorConfig 帮助开发人员定义和维护不同编辑器之间一致的编码风格。 EditorConfig 项目由定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使 编辑器能够读取文件格式并坚持已定义的样式。编辑器配置文件易于阅读，并且可以很 好地与版本控制系统一起工作。

你只需配置一个 .editorconfig 文件，在其中设置好要遵守的代码规范，放在项目 的根目录下，就能够在几乎所有的主流 IDE 和编辑器中复用了，可以将 .editorconfig 文件也提交到版本控制系统中，就不需要针对不同 IDE 和编辑器再单独进行设置了。

### 配置文件

EditorConfig 插件会自动在项目中寻找名为 .editorconfig 的配置文 件，每个文件的样式偏好会自动根据该文件所在文件夹的 .editorconfig 文 件向上寻找所有同名文件，直到某个配置的文件种包含了 root=true。最接 近该文件的配置文件中的设置优先最高

## 具体流程

### 1. 初始化仓库

`git init`

### 2. 安装eslint

**创建项目：**`npm init`
**本地安装：**`npm i eslint --save-dev`
**设置启动命令(package.json)**

~~~json
"scripts": { "lint": "eslint src", "lint:create": "eslint --init" }
~~~

​	[自定义命令名]`eslint src`[校验目录代码]   	[自定义命令名]:`eslint init`[生成配置文件]

### 3. 运行eslint初始化

`npm run lint:create`

### 4. 安装Husky

`npm install husky --save-dev`

### 5. 配置package.json

~~~json
// package.json
"husky": {
    "hooks": {
      // 提交前，执行npm run link 不然不能提交
      "pre-commit": "npm run link",
      "pre-push": "npm test",
    }
}
~~~

### 6 . 忽略module文件

在Git根仓库创建.gitignore文件，写入

~~~javascript
/node_modules
~~~

### 7. Git进行提交

`git commit -m "commit v1"`

这时候，提交时如果检测到js语法的错误，那么提交将会被阻止

# 忽略某些文件

总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪 文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临 时文件等。我们可以**创建一个名为 `.gitignore` 的文件**，列出要忽略的文件模式。

~~~elixir
*.[oa]
*~
~~~

第一行是 Git 忽略所有以 **.o** 或 **.a** 结尾的文件。一般这类对象文件和存档文 件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所 有以波浪符（**~**）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文 件名保存副本。此外，你可能还需要忽略 **log，tmp** 或者 **pid** 目录，以及自动生成 的文档等等。要养成一开始就设置好 `.gitignore` 文件的习惯，以免将来误提交这类 无用的文件

## gitignore 的格式规范

所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。可以使用标准的 **glob 模式**匹配。

~~~makefile
/* 代表匹配任意个字符 
？代表匹配任意一个字符 
** 代表匹配多级目录
匹配模式前跟反斜杠（/） 这个斜杠代表项目根目录
匹配模式最后跟反斜杠（/）说明要忽略的是目录。 
要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
~~~

## 示例

~~~gherkin
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 所有build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt	#（**通配符从 Git 版本 1.8.2 以上已经可以使用）
~~~

## .gitignore 文件列 表

 https://github.com/github/gitignore 

# 远程仓库

## HTTPS远程提交

### 1. 配置本地仓库

`git init.......`

**配置仓库用户信息**

**用户名称：**` git config user.name "[name]"` 
**用户邮箱：**` git config user.email [email]`
**检查已有的配置信息：**`git config --list`
**删除配置信息：** `git config --unset user.email`

`git add ./......git commit......`



### 2. 配置远程仓库别名

`git remote add <shortname> <url>`

**显示远程仓库使用的 Git 别名与其对应的 URL**
`git remote –v`
**查看更多信息**
`git remote show [remote-name]`
**重命名**
`git remote rename pb paul`



### 3. 推送本地项目到远程仓库

`git push [远程仓库别名] [分支名]`



## SSH远程提交

**1. 粘贴以下文本，替换为您的GitHub电子邮件地址。**

`$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

使用提供的电子邮件作为标签，这将创建一个新的ssh密钥。

`> Generating public/private rsa key pair.`

**2. 当提示您“输入要在其中保存密钥的文件”时，请按Enter。这接受默认文件位置。**

`> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]`

**3. 在提示符下，键入一个安全密码。有关更多信息，请参阅[“使用SSH密钥密码短语”](https://help.github.com/en/articles/working-with-ssh-key-passphrases)。**

`> Enter passphrase (empty for no passphrase): [Type a passphrase]`
`> Enter same passphrase again: [Type passphrase again]`

**4. 打开`C:/Users/Administrator/.ssh/id_rsa.pub`，将其添加到GitHub的SSH密匙中**

![add-ssh](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/GitHub-SSH/add-ssh.jpg?raw=true)

**Git绑定连接：**`$ ssh -T git@github.com`

~~~
// 无法确定主机真实性，密匙为......，是否继续连接
The authenticity of host 'github.com (13.229.188.59)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
~~~

**输入安全密码**

~~~
Warning: Permanently added 'github.com,13.229.188.59' (RSA) to the list of known hosts.
Enter passphrase for key '/c/Users/Administrator/.ssh/id_rsa':[Type a passphrase]
~~~

### 1. 配置本地仓库

`git init.......`

**配置仓库用户信息**

**用户名称：**` git config user.name "[name]"` 
**用户邮箱：**` git config user.email [email]`
**检查已有的配置信息：**`git config --list`
**删除配置信息：** `git config --unset user.email`

`git add ./......git commit......`



### 2. 配置远程仓库别名

`git remote add <shortname> <url>`
![ssh-url](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/Git/GitHub-SSH/ssh-url.jpg?raw=true)

**显示远程仓库使用的 Git 别名与其对应的 URL**
`git remote –v`
**查看更多信息**
`git remote show [remote-name]`
**重命名**
`git remote rename pb paul`



### 3. 推送本地项目到远程仓库

`git push [远程仓库别名] [分支名]`



## HTTPS&SHH

**如果我想要给别人的仓库提交代码**

- 我需要把我本机的SSH配置到别人账户下，然后采用SSH方式提交代码
- 把我的账号添加到那个仓库的Collaborators，直接使用https方式提交	

**总结**

使用https方式提交的不需要添加SSH，但是使用SSH方式提交的必须要添加本机的SSH
A账户想要给A账户下的仓库提交代码，直接使用https方式就行
A账户想要给B账户下的仓库提交代码，**1.添加Collaborators使用https方式**，或者 **2.添加SSH，使用SSH方式提交。**



## 克隆远程仓库到本地

`git clone [远程仓库url]（克隆时不需要 git init）`

![git-add-url](img/GitHub-add/git-add-url.jpg?raw=true)

**默认克隆时为远程仓库起的别名为 origin。**
`$ git remote > [origin]`

远程仓库名字 “origin” 与分支名字 “master” 一样，在 Git 中并没有任何特别 的含义一样。 同时 “master” 是当你运行 git init 时默认的起始分支名字，原因仅仅 是它的广泛使用，“origin” 是当你运行 git clone 时默认的远程仓库名字。 如果你运 行 git clone -o booyah，那么你默认的远程仓库别名为 booyah



## 给予提交的权限

如果你想与他人合作，并想给他们提交的权限，你需要把他们添加为 “Collaborators”。 如果 Ben，Jeff，Louise 都在 GitHub 上注册了， 你想给他们推送的权限，你可以将他们添加到你的项目。 这样做会给 他们 “推送” 权限，就是说他们对项目有读写的权限 点击边栏底部的 “Settings” 链接

~~~
GitHub项目 >
 设置(options) > 
	管理访问(Manage access) >
	 邀请合作者(Invite a collaborator) >
		 指定GitHub用户名(或邮箱)
			指定用户接收权限 	或	邀请码链接
				指定用户就可以提交了
~~~



## 拉取远程仓库更新

`git fetch [remote-name]`

访问远程仓库，从中拉取所有你还没有的数据。 执行完后，远程分支就会出现新的内容！！
****它并不会自动合并或修改你当前的工作**。当准备好时你必须手动将其合并入你的工作。**
**合并：**`git merge 远程分支`

`git fetch [remote-name]`

**直接拉取分支数据到当前分支**(需要绑定远程分支)`git branch -u origin/serverfix （--set-upstream-to）`

`git pull`



## 推送其他分支

想要公开分享一个分支时，需要将其推送到有写入权限的远程仓 库上。 本地的分支并不会自动与远程仓库同步 - 你必须显式地推送想要 分享的分支。 这样，你就可以把不愿意分享的内容放到私人分支上，而 将需要和别人协作的内容推送到公开分支。

**推送本地的 serverfix 分支，将其作 为远程仓库的 serverfix 分支**

`git push origin serverfix`

下一次其他协作者从服务器上抓取数据时，他们会在本地生成一个远程跟踪分支 origin/serverfix ， 指向服务器的 serverfix 分支的引用。

[^注意]:当抓取到新的远 程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝）。 换一句话说，这种情况下，不会有一个新的 serverfix 分支 - 只有一 个不可以修改的 origin/serverfix 指针。

**更换远程仓库分支名**

`git push origin serverfix:awesomebranch`



## 跟踪远程分支

### 本地跟踪分支

从一个远程跟踪分支（origin/master）检出一个本地分支会 自动创建一个叫做 “跟踪分支（有时候也叫做 ” “上游分支” ：master）。 **只有主分支 并且 克隆时才会自动建跟踪分支.**

跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上 输入 git pull，Git 能自动地识别去哪个服务器上抓取、合并到哪个 分支。

### 本地分支跟踪远程分支

**在新建分支时，可以指定想要跟踪的远程分支**
`git checkout -b 本地分支名 远程跟踪分支名`

**如果已经拉取数据(`git fatch origin`)，可以直接指定远程分支名创建本地分支名，并跟踪远程分支。**
`git checkout --track 远程跟踪分支名`

**将当前分支跟踪一个刚刚拉取下来的远程分支**
`git branch -u origin/serverfix （--set-upstream-to）`

**查看分支是否有跟踪远程分支绑定**
`git branch -vv`



## 删除远程分支

**删除远程分支：**`git push origin --delete serverfix`

**列出仍在远程跟踪但是远程已被删除的无用分支：**`git remote prune origin --dry-run` 

**清除上面命令列出来的远程跟踪：**`git remote prune origin`



## 派生

如果你想要参与某个项目，但是并没有推送权限，这时可以对这个项 目进行“派生”（Fork）。 派生的意思是指，GitHub 将在你的空间中创 建一个完全属于你的项目副本，且你对其具有推送权限。通过这种方式， 项目的管理者不再需要忙着把用户添加到贡献者列表并给予他们推送权 限。 人们可以派生这个项目，将修改推送到派生出的项目副本中，并通 过创建合并请求（Pull Request）来让他们的改动进入源版本库。

### 基本流程

~~~
1. 从 master 分支中创建一个新分支 （自己 fork 的项目）
2. 提交一些修改来改进项目 （自己 fork 的项目）
3. 将这个分支推送到 GitHub 上 （自己 fork 的项目）
4. 创建一个合并请求
5. 讨论，根据实际情况继续修改
6. 项目的拥有者合并或关闭你的合并请求
~~~

~~~
git remote add <shortname 源仓库> <url 源仓库>
git fetch 远程仓库名字 
git merge 对应的远程跟踪分支
~~~

[^注意]:每次在发起新的 Pull Request 时 要去拉取最新的源仓库的代码 而不是自己 fork 的那个仓库。

