// 创建一个宏命令
var MacroCommand = function () {
  return {
    // 宏命令的子命令列表
    commandsList: [],
    // 添加命令到子命令列表
    add: function (command) {
      this.commandsList.push(command);
    },
    // 依次执行子命令列表里面的命令
    execute: function () {
      for (var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
};

// <!--打开空调命令--> //
var openAcCommand = {
  execute: function () { console.log('打开空调') }
};

// <!--打开电视和音响--> //
var openTvCommand = {
  execute: function () { console.log('打开电视') }
};
var openSoundCommand = {
  execute: function () { console.log('打开音响') }
};
//创建一个宏命令
var macroCommand1 = MacroCommand();
//把打开电视装进这个宏命令里
macroCommand1.add(openTvCommand)
//把打开音响装进这个宏命令里
macroCommand1.add(openSoundCommand)

// <!--关门、打开电脑和打登录QQ的命令--> // 
var closeDoorCommand = {
  execute: function () { console.log('关门') }
};
var openPcCommand = {
  execute: function () { console.log('开电脑') }
};
var openQQCommand = {
  execute: function () { console.log('登录QQ') }
};

//创建一个宏命令
var macroCommand2 = MacroCommand();
//把关门命令装进这个宏命令里
macroCommand2.add(closeDoorCommand);
//把开电脑命令装进这个宏命令里
macroCommand2.add(openPcCommand);
//把登录QQ命令装进这个宏命令里
macroCommand2.add(openQQCommand);

// <!--把各宏命令装进一个超级命令中去--> //
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

macroCommand.execute()