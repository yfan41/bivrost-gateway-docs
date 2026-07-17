---
title: "6.2. 命令格式"
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

## 6.2.1. PLC 数据任务 {#plc-task}

PLC 数据任务格式如下，多组数据以 ";" 分隔。

```
区域,起始地址[|标签],数据数量,数据类型[,前置条件,任务间隔,后处理];
```

其中区域，起始地址，数据数量，数据类型为必须项，用于指定数据的来源和形式；标签，前置条件，任务间隔，后处理为可选项。

- **标签**用于在 MQTT，数据库等通讯中标识数据，如没有设置，会根据任务顺序和数据长度自动分配。
- **前置条件**为此条命令的前置条件，先判断此条件，满足则执行，如不设置则默认执行，与 [5.3.1.2.1. 前置条件](/usage/machines/#precondition)中的一致。格式详见 [6.2.2. 前置条件](#precondition)。
- **任务间隔**为此条命令的间隔设置，如不设置，则默认为 [5.5.1. 机台任务间隔设置](/usage/tasks/#machine-intervals)与 [5.5.2. 机组任务间隔设置](/usage/tasks/#group-intervals)中相应的任务间隔，格式详见 [6.2.3. 任务间隔](#interval)。
- **后处理**可以有多个，每个后处理对此次任务或其它任务获取的数据处理后以新标签上传，详见 [6.2.4. 后处理](#post-processing)。

以 [CNC]FANUC 发那科 [Oi-F] 为例：

```
R,0,9,Byte;
R,100|数据2,6,Byte,$COND$CNCStatus_cncStatus = "AUTO_RUN"$COND$;
R,200|rawData0,1,Byte,$INTERVAL$1000$INTERVAL$,$POST$___PLC_TrawData0___[0]>0$POST$|心跳信号;
```

- `R,0,9,Byte` 代表读取设备 PLC 地址位 R0 开始（包括 R0）的 9 个类型为 Byte 的数据，没有设置标签。
- `R,100|数据2,6,Byte` 代表读取设备 PLC 地址位 R100 开始（包括 R100）的 6 个类型为 Byte 的数据，标签为"数据 2"，前置条件为 `CNCStatus_cncStatus = "AUTO_RUN"`，即当机台状态为自动运行时。前置条件相关内容详见 [6.2.2. 前置条件](#precondition)。
- `R,200|rawData0,1,Byte` 代表读取设备 PLC 地址位 R200 类型为 Byte 的数据，标签为 "rawData0"；`$INTERVAL$1000$INTERVAL$` 代表此条任务间隔设为 1000 毫秒；`$POST$___PLC_TrawData0___[0]>0$POST$|心跳信号`，是后处理命令与其标签。在后处理中判断 rawData0 得到的值是否大于 0，将结果以"心跳信号"为标签上传。后处理相关内容详见 [6.2.4. 后处理](#post-processing)。

以 [PLC]Simatic 西门子 [S300] 为例：

```
DB1,1,3,Byte;DB10,100|Float数据,10,Float;
```

- `DB1,1,3,Byte` 代表读取设备 PLC 地址位 DB1.1 开始（包括 DB1.1）的 3 个类型为 Byte 的数据，没有标签；
- `DB10,100|Float数据,10,Float` 代表读取设备 PLC 地址位 DB10.100 开始（包括 DB10.100）的 10 个类型为 Float 的数据，标签为 "Float 数据"。

部分设备支持以变量名形式读取数据，以 [PLC]Allen-Bradlley 罗克韦尔 [1783] 为例：

```
$TAG$|name=AB.C[0],,8,Float;
```

`$TAG$|name=AB.C[0],,8,Float` 代表以标签方式读取设备 PLC 变量名为 AB.C 的 Float 数组的第 0 位到第 7 位。注意其中格式上对应起始地址的内容留空。

对于区域，起始地址，数据数量，数据类型等参数的更详细介绍请参考《通讯协议》2.5.1.18. readPlcData 读取 PLC 数据中关于请求参数的介绍。

用户可以查找设备手册或联系设备厂家以获取目标 PLC 数据的区域地址以及目标数据的类型。

## 6.2.2. 前置条件 {#precondition}

前置条件设定任务执行的前提，只有满足设定的条件时，才会执行对应的采集任务。如为空白，则默认无前置条件，直接执行任务。

非 PLC 数据任务可通过 [5.3.1.2.1. 前置条件](/usage/machines/#precondition)设置前置条件，PLC 数据任务在命令中，添加前置条件命令，格式为：

```
$COND$前置条件$COND$
```

前置条件本质为逻辑判断。单条前置条件命令格式如下：

```
a > 100              //变量 a 大于 100
b < 50.0f            //变量 b 小于 50.0f
c = "AUTO_RUN"       //变量 c 为字符串 "AUTO_RUN"
d <> 0               //变量 d 不等于 0
e >= 12.34f          //变量 e 大于等于 12.34f
f <= g               //变量 f 小于等于变量 g
not h in (1,2,3)     //变量 h 不在 (1,2,3) 之间
```

多条前置条件命令之间，可以用 and, or, () 运算，如：

```
a > 100 and (b < 50.0f or c = "AUTO_RUN")
```

目前可用于逻辑判断的变量为：`<type>_<tag>` 与 `prev_<type>_<tag>`。其中 `<type>` 是数据类；`<tag>` 是数据标签；prev 代表数据前值。`<type>` 与 `<tag>` 的具体介绍详见《通讯协议》1.2. 数据说明。

## 6.2.3. 任务间隔 {#interval}

任务间隔用于设置指定任务的间隔，如不设置，默认为 [5.5.1. 机台任务间隔设置](/usage/tasks/#machine-intervals)与 [5.5.2. 机组任务间隔设置](/usage/tasks/#group-intervals)中相应的任务间隔。格式如下：

```
$INTERVAL$间隔$INTERVAL$
```

其中间隔为数字，单位为毫秒。

## 6.2.4. 后处理 {#post-processing}

用户可以使用后处理命令对获取的原始数据进行处理。后处理目前有两种：

### 6.2.4.1. $DA$ 直接获取 {#da}

$DA$，即直接获取左侧读取到的数据中的指定位置的一个数据，以指定标签上传，不能进行计算处理，但可以合并数据点位相邻的 PLC 任务，减少 PLC 任务数量，以提高执行效率。例如：

```
R,2036|count,4,Int32,
$DA$0$DA$|工件计数,
$DA$3$DA$|工件计数-合格数,
$DA$4$DA$|工件计数-不合格数;
```

读取 R2036 开始的 4 个 Int32 数据，其结果为一个长度为 4 的数组。$DA$ 获取其中第 0 个数，标签为工件计数；获取第 3 个数，标签为工件计数-合格数；获取第 4 个数，标签为工件计数-不合格数；上传这三个数据。

如果 $DA$ 标签未指定，默认标签为：`原始数据标签_数字`，这里的数字为 $DA$ 指定的位置。如上面这个例子 $DA$ 未设置标签，则这三个数的默认标签为 `count_0`，`count_3`，`count_4`。

### 6.2.4.2. $POST$ 后处理 {#post}

$POST$，即对指定已获取的一个或多个数据进行计算/比较等处理，将处理后的结果上传。

网关会保存最近的任务数据为变量。同一机台的变量可以在 $POST$ 中访问，变量格式 `___变量名___`，在变量名的前后各添加三个下划线以标记开始与结束。以 `___PLC_TrawData2_data___` 为例，其中 PLC 为数据类型 type，T 是标签缩写，rawData2 是数据的标签，data 是 PLC 数据类的字段，是个数组。合起来变量名为 `PLC_TrawData2_data`，代表 PLC 数据类，标签 T 为 rawData2，字段 data 这个数组。最后在按照变量格式在变量名的前后各添加三个下划线，得到 `___PLC_TrawData2_data___`。数据类，数据标签，字段等详细说明可以参考《通讯协议》1.2. 数据说明。通过这种方式用户可以在 $POST$ 中使用所有已启用任务获取到的数据。

网关最多保存最近两次的任务数据，最近一次如上介绍，再之前一次，可在对应变量名之前添加前缀 `prev_`，如 `___prev_PLC_TrawData2_data___`。

**示例 1：**

```
R,2000|rawData2,1,Byte,
$INTERVAL$900$INTERVAL$,
$POST$(___PLC_TrawData2_data___[0] and 1>0$POST$|心跳信号;
```

每隔 900 毫秒，读取 R2000 开始的个 Byte 数据，其结果为一个长度为 1 的数组，以标签 rawData2 保存。$POST$ 中，取这个 rawData2 数据中的第 0 位，如果其大于 0，则结果为 True，否则结果为 False，将结果以心跳信号为标签上传。

用户可以在一个 PLC 数据任务中使用多个 $POST$ 做不同的计算处理，如示例 2，示例 3：

**示例 2：**

```
R,3012|rawData3,3,Int32,
$POST$___PLC_TrawData3_data___[0]*0.1f$POST$|刀对刀换刀时间,
$POST$___PLC_TrawData3_data___[1]*0.1f$POST$|总换刀时间,
$POST$___PLC_TrawData3_data___[2]*0.1f$POST$|刀具加工时间;
```

原始数据是单位为 [0.1 秒] 的 Int32，分别乘以 0.1f 转化为单位为 [秒] 的 Float。

**示例 3：**

```
R,2003|rawData4,1,Byte,
$POST$(___PLC_TrawData4_data___[0] and (1<<4))>0$POST$|数据准备完成,
$POST$(___PLC_TrawData4_data___[0] and (1<<5))>0$POST$|工件数据准备完成,
$POST$(___PLC_TrawData4_data___[0] and (1<<6))>0$POST$|工件正常,
$POST$(___PLC_TrawData4_data___[0] and (1<<7))>0$POST$|工件异常;
```

原始数据为 1 个 Byte，其中每一位代表不同的含义，取这个 Byte 第 4 位（第 0 位是最低位），与 0 比较，得到 True 或 False，标签位数据准备完成；比较第 5 位是否大于 0，标签为工件数据准备完成；比较第 6 位是否大于 0，标签为工件正常；比较第 7 位是否大于 0，标签为工件异常。

除了常见的 +, -, \*, /, and, or, \<, \>, = 等运算，网关也支持嵌套 if 逻辑判断，如示例 4 根据 PLC 数据数值判断当前状态。

**示例 4：**

```
D,0|rawData0,1,Int16,
$POST$if(___PLC_TrawData0_data___[0] = 1, "AUTO_RUN",
if(___PLC_TrawData0_data___[0] = 2,"MANUAL_HOLD",
if(___PLC_TrawData0_data___[0] = 4, "EMERGENCY", "WAIT")))$POST$|机台状态,
$POST$if(___PLC_TrawData0_data___[0] = 4, "ALARM",
if(___PLC_TrawData0_data___[0] = 5, "ALARM", "NO_ALARM"))$POST$|警报状态;
```

D0 的数值代表机台的状态，D0=1：自动运行；D0=2：暂停；D0=4：紧急停止；D0=5 有告警。D0=其他值：待机。其中 D0=4 或 5 都属于警报状态。

### 6.2.4.3. $POST$ 后处理可用函数 {#post-functions}

在 $POST$ 命令中支持使用 Encoding，Enumberable，BitConverter，Math 等 .Net 静态成员下的方法。

支持通过以下函数从原数组中取子数组，不同名称的函数适用于含对应元素类型的数组：

```
PGetSubBytes,
PGetSubSBytes,
PGetSubChars,
PGetSubShorts,
PGetSubUShorts,
PGetSubInts,
PGetSubUInts,
PGetSubFloats,
PGetSubLongs,
PGetSubULongs,
PGetSubDoubles;
```

| 输入量 | 类型 | 说明 |
| --- | --- | --- |
| source | Object[] | （必需）原数组 |
| startIndex | Int32 | （必需）起始位置 |
| count | Int32 | （必需）数量 |
| isReverse | Bool | 是否反转顺序，默认为 False |
| isSwap | Bool | 是否成对交换，默认为 False |
| step | Int32 | 步长，取元素的间隔，默认为 0 |

这些函数用于从原始数组中，从起始位置元素开始，每隔指定数量（默认为 0），取下一个元素，共取指定数量的元素，组成子数组。然后根据设置，先将子数组逆序（默认不用），再将子数组中的元素位置成对交换（默认不用）。

**PGetSubBytes 示例：**

```
source = {0x01, 0x02, 0x30, 0x40, 0x66, 0x88},
startIndex = 1,
count = 3,
isReverse = True,
isSwap = True,
step = 1,
```

取出位置为 1 开始的间隔为 1 的三个元素 `{0x02, 0x40, 0x88}`，逆序排列，得到 `{0x88, 0x40, 0x02}`，成对交换，注意长度为 3 是奇数，最后 1 个元素不参与成对交换。得到 `{0x40, 0x88, 0x02}`。

这类函数，适用于使用一个 PLC 数据任务读取了大段数据，从中解析出每一段具体的数据作为后处理结果分别上报。这样处理能极大提高通信效率。如下例，从西门子 PLC 中一次读取了 198 个 Byte，根据地址位，分别转化为对应的 String/Bool/UInt16/Float/UInt32 等不同类型的数据。

```
DB500,0|rawData0,198,Byte,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 0, 8))$POST$|生产线,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 8, 6))$POST$|工序号,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 14, 1))$POST$|机床号,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 18, 20))$POST$|系统设备编号,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 38, 2, true), 0)$POST$|设备状态,
$POST$(___PLC_TrawData0_data___[40] and 1)>0$POST$|设备开机,
$POST$(___PLC_TrawData0_data___[40] and (1<<1))>0$POST$|设备关机,
$POST$(___PLC_TrawData0_data___[40] and (1<<3))>0$POST$|急停,
$POST$(___PLC_TrawData0_data___[40] and (1<<4))>0$POST$|设备异常停机,
$POST$(___PLC_TrawData0_data___[40] and (1<<6))>0$POST$|其他模式,
$POST$(___PLC_TrawData0_data___[40] and (1<<7))>0$POST$|通过模式,
$POST$(___PLC_TrawData0_data___[41] and 1)>0$POST$|自动模式,
$POST$(___PLC_TrawData0_data___[41] and (1<<1))>0$POST$|非自动模式,
$POST$(___PLC_TrawData0_data___[41] and (1<<2))>0$POST$|循环启动,
$POST$(___PLC_TrawData0_data___[41] and (1<<3))>0$POST$|循环停止,
$POST$(___PLC_TrawData0_data___[41] and (1<<4))>0$POST$|特殊模式,
$POST$(___PLC_TrawData0_data___[41] and (1<<5))>0$POST$|空运转,
$POST$(___PLC_TrawData0_data___[41] and (1<<6))>0$POST$|堵料,
$POST$(___PLC_TrawData0_data___[41] and (1<<7))>0$POST$|待料,
$POST$(___PLC_TrawData0_data___[42] and 1)>0$POST$|生产中,
$POST$(___PLC_TrawData0_data___[42] and (1<<1))>0$POST$|设备报警,
$POST$(___PLC_TrawData0_data___[42] and (1<<2))>0$POST$|安全门开,
$POST$(___PLC_TrawData0_data___[42] and (1<<3))>0$POST$|安全门关,
$POST$(___PLC_TrawData0_data___[44] and 1)>0$POST$|工位1请求上料,
$POST$(___PLC_TrawData0_data___[44] and (1<<1))>0$POST$|工位1请求下料,
$POST$(___PLC_TrawData0_data___[44] and (1<<2))>0$POST$|工位1有工件,
$POST$(___PLC_TrawData0_data___[46] and 1)>0$POST$|工位2请求上料,
$POST$(___PLC_TrawData0_data___[46] and (1<<1))>0$POST$|工位2请求下料,
$POST$(___PLC_TrawData0_data___[46] and (1<<2))>0$POST$|工位2有工件,
$POST$(___PLC_TrawData0_data___[48] and 1)>0$POST$|工位3请求上料,
$POST$(___PLC_TrawData0_data___[48] and (1<<1))>0$POST$|工位3请求下料,
$POST$(___PLC_TrawData0_data___[48] and (1<<2))>0$POST$|工位3有工件,
$POST$(___PLC_TrawData0_data___[50] and 1)>0$POST$|工位4请求上料,
$POST$(___PLC_TrawData0_data___[50] and (1<<1))>0$POST$|工位4请求下料,
$POST$(___PLC_TrawData0_data___[50] and (1<<2))>0$POST$|工位4有工件,
$POST$(___PLC_TrawData0_data___[52] and 1)>0$POST$|工位5请求上料,
$POST$(___PLC_TrawData0_data___[52] and (1<<1))>0$POST$|工位5请求下料,
$POST$(___PLC_TrawData0_data___[52] and (1<<2))>0$POST$|工位5有工件,
$POST$(___PLC_TrawData0_data___[54] and 1)>0$POST$|上料站请求上料,
$POST$(___PLC_TrawData0_data___[54] and (1<<1))>0$POST$|上料站请求下料,
$POST$(___PLC_TrawData0_data___[54] and (1<<2))>0$POST$|上料站有工件,
$POST$(___PLC_TrawData0_data___[56] and 1)>0$POST$|下料站请求上料,
$POST$(___PLC_TrawData0_data___[56] and (1<<1))>0$POST$|下料站请求下料,
$POST$(___PLC_TrawData0_data___[56] and (1<<2))>0$POST$|下料站有工件,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 58, 2, true), 0)$POST$|各轴位置_TY,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 60, 2, true), 0)$POST$|各轴位置_TZ1,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 62, 2, true), 0)$POST$|各轴位置_TZ2,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 64, 2, true), 0)$POST$|各轴位置_TX1,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 66, 2, true), 0)$POST$|各轴位置_TX2,
$POST$(___PLC_TrawData0_data___[68] and 1)>0$POST$|夹爪1夹紧,
$POST$(___PLC_TrawData0_data___[68] and (1<<1))>0$POST$|夹爪2夹紧,
$POST$ToSingle(PGetSubBytes(___PLC_TrawData0_data___, 70, 4, true), 0)$POST$|节拍（不含等待）,
$POST$(___PLC_TrawData0_data___[74] and 1)>0$POST$|数据准备完成,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 76, 28))$POST$|工件二维码,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 104, 10))$POST$|RFID_工序号,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 114, 2))$POST$|RFID_主轴号,
$POST$ToUInt16(PGetSubBytes(___PLC_TrawData0_data___, 116, 2, true), 0)$POST$|RFID_工件状态,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 118, 2))$POST$|RFID_送检信息,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 120, 12))$POST$|加工时间,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 130, 4, true), 0)$POST$|报警代码1,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 134, 4, true), 0)$POST$|报警代码2,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 138, 4, true), 0)$POST$|报警代码3,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 142, 4, true), 0)$POST$|报警代码4,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 146, 4, true), 0)$POST$|报警代码5,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 150, 4, true), 0)$POST$|报警代码6,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 154, 4, true), 0)$POST$|报警代码7,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 158, 4, true), 0)$POST$|报警代码8,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 162, 4, true), 0)$POST$|报警代码9,
$POST$ToUInt32(PGetSubBytes(___PLC_TrawData0_data___, 166, 4, true), 0)$POST$|报警代码10,
$POST$UTF8.GetString(PGetSubBytes(___PLC_TrawData0_data___, 170, 28))$POST$|工位1工件二维码;
```

### 6.2.4.4. $MOCK$ 模拟任务 {#mock}

$MOCK$ 任务返回指定数量与类型的虚拟值，返回值没有实际意义，仅用于一些特殊场合。如后处理不可单独出现，必须出现在一个 PLC 任务的必须部分之后。然而有些情况下后处理与数据读取需要的间隔不同，或者其他原因，需要把后处理单独设置为一个任务。这种情况下可以使用 $MOCK$ 任务。

```
$MACRO$,500|macro1_500_515,16,Double,
$DA$0$DA$,$DA$1$DA$,$DA$2$DA$,$DA$3$DA$,$DA$4$DA$,$DA$5$DA$,$DA$6$DA$,
$DA$7$DA$,$DA$8$DA$,$DA$9$DA$,$DA$10$DA$,$DA$11$DA$,$DA$12$DA$,$DA$13$DA$,
$DA$14$DA$,$DA$15$DA$;
$MOCK$,1,1,Byte,
$INTERVAL$60000$INTERVAL$,
$POST$(___PLC_Tmacro1_500_515_8_pDouble___ - ___PLC_Tmacro1_500_515_0_pDouble___)<=10$POST$|切断刀剩余寿命不足;
```

这里第 1 个任务读取机台宏变量 500~515，默认间隔每隔 5 秒。第 2 个任务每隔 1 分钟，用前一个任务中获得的宏变量 507 减去宏变量 500，判断得到的差是否小于等于 10，结果为 True 或 False，以标签"切断刀剩余寿命不足"为标签上传。

## 6.2.5. 外部 PLC 数据任务 {#external-plc}

网关支持通过添加外部 PLC 的方式对机台的周边设备进行数据采集。

![外部 PLC 标签页](/img/manual/command-format/external-plc-tab.png)

命令分为三个部分，外部 PLC 的相关参数，通讯协议相关参数，和 PLC 数据读取命令。

外部 PLC 的相关参数说明：

| 参数 | 说明 |
| --- | --- |
| source | 数据源，可选值为：COM1，COM2，COM3 等，对应网关 1-3 号串口。 |
| protocol | 通讯协议，可选值为：modbusRTU。 |
| baudRate | 串口波特率，默认值为 9600。 |
| parity | 奇偶校验位，可选值为：none，odd，even，默认为 none。 |
| dataBits | 数据位，默认为 8。 |
| stopBits | 停止位，可选值为：1，1.5，2，默认为 1。 |

支持的通讯协议说明：

**modbusRTU**

| 参数 | 说明 |
| --- | --- |
| slaveID | 从站 ID，默认为 1。 |
| plcAddresses | 是否 PLC 地址，可选值为 false，true，默认为 false。当该值为 true 时，modbus 地址位从 1 开始；当该值为 false 时，modbus 地址位从 0 开始。 |
| encoding | 编码，默认为 GBK。 |
| bit32TypeFormat | 32 位型格式，可选值为：ABCD，CDAB，BADC，DCBA，默认为 DCBA。 |
| bit64TypeFormat | 64 位型格式，可选值为：ABCDEFGH，GHEFCDAB，BADCFEHG，HGFEDCBA，默认为 HGFEDCBA。 |

PLC 数据读取命令详见 [6.2.1. PLC 数据任务](#plc-task)。

**示例：**

机台串口 1 装有一个温度传感器，串口 2 装有一个智能电表时，可以设置两个外部 PLC 任务命令，分别用于采集机床的温度和能耗。

```
source=COM1|protocal=modbusRTU;4x,0,1,Int16;
source=COM2|protocal=modbusRTU|baudRate=14400|encoding=ASCII;4x,0,1,Int16;4x,10,2,Int32;
```

不同的数据源使用换行符隔开。

- 第一段：通过网关串口 1，以 modbusRTU 协议；读取 4x 区，0 位开始 1 个 Int16。
- 第二段：通过网关串口 2，以 modbusRTU 协议，波特率设为 14400，编码为 ASCII；读取 4x 区，0 位开始 1 个 Int16；10 位开始 2 个 Int32。

## 6.2.6. 外部机台 {#external-machine}

通过添加外部机台的方式，可以将其它网关的机台添加到本网关的机组。需要先在云平台设置或 Hub 设置处做相关设置，关联其它网关。

![启用外部机台](/img/manual/command-format/external-machine.png)

命令格式如下：

```
UID,MachineID[|countMultiplier=COUNTMULTIPLIER|name=NAME,...];...
```

其中 UID 是已关联的另一台网关的 UID；MachineID 是另一台网关下的机台的机台号；countMultiplier 是产量系数，可选输入，默认为 0；name 是机台名，可选输入，默认与 MachineID 相同。多台外部机台，用 ";" 分隔。如：

```
iotgw1,1;iotgw2,100010|countMultiplier=1|name=加工中心10;
```

## 6.2.7. 受保护 API 与授权 API {#protected-api}

API 命令用于设置受保护 API 和授权 API。

命令格式如下：

```
命令类型,API地址前缀或API地址;
```

API 地址为《通讯协议》2.5. 数据读写接口 ~ 2.10. 网关功能接口中各接口的地址取 "/api" 后的部分。多组命令以 ";" 分隔。

命令类型分为前缀指定和具体指定。

**1. 前缀指定**，所有以指定前缀开头的 API 地址，如下：

```
prefix,/cnc;prefix,/analysis;prefix,/config;
```

其中 prefix 代表前缀指定，/cnc 代表所有地址以 /cnc 开头的 API，即《通讯协议》2.5 数据读写接口，2.6. 文件管理接口；/analysis 代表所有地址以 /analysis 开头的 API，即《通讯协议》2.7 数据分析接口；/config 代表所有地址以 /config 开头的 API，即《通讯协议》2.9 网关配置接口。

:::note[注意]
以下命令代表所有 API 接口：

```
prefix,/;
```

留白代表无任何 API 接口。

:::

**2. 具体指定**，指定具体一个 API 的地址，如下：

```
exact,/cnc/writeOffsetData;exact,/cnc/writePlcData;
```

其中 exact 代表具体指定，/cnc/writeOffsetData 是写入刀具补偿数据接口的地址，参考《通讯协议》2.5.1.14. writeOffsetData 写入刀补数据；/cnc/writePlcData 是写入 PLC 数据接口的地址，参考《通讯协议》2.5.1.19. writePlcData 写入 PLC 数据。
