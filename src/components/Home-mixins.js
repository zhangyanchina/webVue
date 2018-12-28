export default {
  data() {
    return {
      // 菜单列表数组
      menuList: [],
      //   字体图标数组
      iconList: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      //   是否折叠，默认不是
      isCollapse: false
    }
  },
  created() {
    //   渲染菜单列表
    this.getMenuList()
  },
  methods: {
    //   获取菜单列表
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')

      if (res.meta.status !== 200) return this.$message.error('获取列表失败')
      this.menuList = res.data
    },
    async loginOut() {
      const res = await this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
      if (res !== 'confirm') return
      this.$message.success('您已退出')
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
