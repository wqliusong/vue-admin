import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 200; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    onoff:Math.floor(Math.random()*2),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
const tableClm = [{
          type:'selection',
          width:55,
          label:'',
          prop:'',
          sortable:false,
          formatter:'',
        },{
          type:'index',
          width:60,
          label:'',
          prop:'',
          sortable:false,
          formatter:'',
        },{
          type:'',
          width:120,
          label:'姓名',
          prop:'name',
          sortable:true,
          formatter:'',
        },{
          type:'',
          width:100,
          label:'性别',
          prop:'sex',
          sortable:true,
          formatter:'',
        },{
          type:'',
          width:100,
          label:'年龄',
          prop:'age',
          sortable:true,
          formatter:'',
        },{
          type:'',
          width:120,
          label:'生日',
          prop:'birth',
          sortable:true,
          formatter:'',
        },{
          type:'',
          width:180,
          label:'地址',
          prop:'addr',
          sortable:true,
          formatter:'',
        }]
export { LoginUsers, Users, tableClm};

