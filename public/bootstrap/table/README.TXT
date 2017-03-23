/*
 注意接受的数据格式 :1.客户端分页(默认) {code:200,msg:'success',fixedScroll:false,data:[ {userId:1,createTime:'2017/03/23'...},...]}
                  2.服务端分页: {code:200,msg:'success',fixedScroll:false,total:150,rows:[ {userId:1,createTime:'2017/03/23'...},...]}
 *.滚动条(取值:response.fixedScroll)即是是否固定滚动条
 *.如果是客户端分页(取值:response.data),
 *.如果是server端分页就需要注意配置名字 data-total-field='total' (取值:response.total)
   列表数据注意配置名字  data-data-field='rows'(取值:response.rows)
 非常好用的table工具,只需要提供后端接口~
 自带分页,编辑,排序,详情,导出等功能~
 API:http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
*/