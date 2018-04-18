<template>
	<!-- 头部header -->
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu 
				:default-active="$route.path" 
				class="el-menu-vertical-demo" 
				@open="handleopen" 
				@close="handleclose" 
				@select="handleselect" 
				:unique-opened="false" 
				router 
				v-show="!collapsed">
					<template 
					v-for="(item,index) in $router.options.routes" 
					v-if="!item.hidden">

						<el-submenu 
						:index="index+''" 
						v-if="!item.leaf">

							<template slot="title">
								<i :class="item.iconCls"></i>
								{{item.name}}
							</template>

							<el-menu-item 
							v-for="child in item.children" 
							:index="child.path" 
							:key="child.path" 
							v-if="!child.hidden" 
							@click="handMenu(child)">
								{{child.name}}
							</el-menu-item>

						</el-submenu>

						<!-- 单节点测试 -->
						<el-menu-item 
						v-if="item.leaf&&item.children.length>0" 
						:index="item.children[0].path">
						<i :class="item.iconCls"></i>
							{{item.children[0].name}}
						</el-menu-item>

					</template>
				</el-menu>
			</aside>
			<!-- Tabs标签 -->
			 <section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-tabs 
						type="card"
						:value="this.$store.state.editableTabsValue"
						@tab-remove="removeTab"  
						@tab-click="handTabsClick"
					>
					  <el-tab-pane
					    v-for="(item, index) in this.$store.state.editableTabs"
					    :key="item.name"
					    :label="item.title"
					    :name="item.name"
					    :closable="item.closable"
					    :content="item.content"
					  >
					  </el-tab-pane>
					</el-tabs>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section> 
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				sysName:'vue管理框架',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			//tabs控制路由
			handTabsClick(tab){
				let path = this.activeIndex;
				this.$router.push({path: tab.$attrs.content});
			},
			//添加一个tabs
			handMenu(child){
				this.$store.commit('ADD_TABS',child)
			},
			//删除一个tabs
			removeTab(targetName) {
			  this.$store.commit('DELETE_TABS',targetName)
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				console.log('handleopen');
			},
			handleclose() {
				console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			handleSelect(key, keyPath) {
		       console.log(key, keyPath);
		    },
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
		},
		mounted() {
			// 刷新时以当前路由做为tab加入tabs
			if(this.$route.path !=='/'){
			  this.$store.commit('ADD_TABS', {path: this.$route.path , name: this.$route.name });
			  this.$store.commit('SET_ACTIVE_INDEX', this.$route.name);
		  }
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			console.log(this)
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 50px;
			line-height: 50px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:50px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:200px;
			}
			.logo-collapse-width{
				width:50px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
			}
		}
		.el-tabs__header{
			margin:0px;
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 50px;
			bottom: 0px;
			overflow: hidden;

			aside {
				flex:0 0 200px;
				width: 200px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:50px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:50px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.el-submenu .el-menu-item{
				height: 40px;
				line-height: 40px;
			}

			.menu-collapsed{
				flex:0 0 50px;
				width: 50px;
			}
			.menu-expanded{
				flex:0 0 200px;
				width: 200px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>