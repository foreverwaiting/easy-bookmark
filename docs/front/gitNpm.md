# 版本控制等

## git svn

### git基础操作

git仓库可以记录你对文件的一切操作，并还原，适合多人开发项目使用

git 只能跟踪纯文本文件，文本是有编码的，为了统一，强烈寻底使用utf-8

git安装，下载git，安装好之后，右键就有Git Bash Here

安装git后配置名字和邮箱，所有git仓库都会使用这个配置

git config --global user.name 'tom' 定义用户名
git config --global user.email 'tom@qq.com' 定义邮箱
配置好了名字和邮箱，则创建git仓库，在选好的文件夹内打开右键打开Git Bash Here

git init 初始化这个文件夹为git仓库
当你在这个仓库中创建文件还是对文件的修改以及删除，都会被记录在内，当然，每次操作，需要命令记录下来，这又分为工作区，暂存区，版本库

工作区：在文件夹直接修改的区域

暂存区：已经将工作区修改的内容提交的区域

版本库：将暂存区的内容提交过来，使得版本库和工作区相同，其实版本库才是记录所有文件的修改记录

提交至暂存区，提交到版本库，一定要先提交暂存区，再提交版本库

git add a.txt 将修改的文件添加到暂存区
git add * 将修改的所有文件都会添加到暂存区
git commit -m '修改了文件' 将暂存区的文件全部提交到git仓库，使得git仓库和工作区相同，-m 是描述对此次提交文件
git rm a.txt 在工作区删除了文件，不需要添加到暂存区，直接使用这个命令会记录删除文件的信息，再使用git commit -m '删除了文件' 提交删除文件的记录
还原文件

git log 查看过去历史，就是所有对文件的操作，都显示出来，会有一个序列号，通过序列号还原到那次对文件的操作
git reflog 查看所有历史
git reset --hard 序列号 序列号不需要全部填写，前面的一小部分就行
查看版本库的状态

git status 查看版本库的状态，工作区修改有没有添加到暂存区，暂存区有文件有没有提交版本库
git diff a.txt 查看工作区和暂存区不同
git diff --staged a.txt 查看暂存区和版本库的不同
git diff head -- a.txt 查看工作区和版本库的不同
克隆远程库，下载网上的git仓库

git clone https://github.com/Lonely-Yu/Rain.git 克隆远程库，记住在你想放库的文件夹打开Git Bash Here来执行
当然你要修改你自己的远程库，需要推送和拉取，这时候需要账号和密码，也是先添加到本地的暂存区，再提交到本地的版本库，再拉取一下远程库，再推送过去

git add * 添加到暂存区
git commit -m '描述' 提交到版本库
git pull 拉取远程库，因为怕其他人在我克隆库之后修改了库，拉取远程库的话，会把他修改的文件重新拉取过去，如果没有修改，并不会再次拉取
git push 推送本地库到远程库，将本地库的文件覆盖远程库的文件

- [git基础](http://rogerdudler.github.io/git-guide/index.zh.html)

- [git liaoxuefeng](https://www.liaoxuefeng.com/wiki/896043488029600)

### Gitlab Github git小乌龟 Jenkins自动化部署

## npm yarn

- [AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)