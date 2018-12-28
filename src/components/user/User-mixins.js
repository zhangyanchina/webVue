export default {
  data() {
    return {
      // 用户列表数据
      userList: [],
      // 关键字
      keyword: '',
      // 现在页数
      nowPage: 1,
      // 每页显示多少条
      pageSize: 2,
      // 总条数
      total: 0,
      // 添加用户的对话框显示和隐藏
      addUserDialogVisible: false,
      // 分配角色的对话框
      roleDialogVisible: false,
      // 编辑用户对话框的显示隐藏
      editUserDialogVisible: false,
      // 添加用户的数据对象
      addUserRuleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      selectRolt: '',
      // 添加用户的验证规则
      addUserRules: {
        username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }, { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }]
      },
      // 编辑用户的数据对象
      editUserRuleForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 编辑用户的数据规则
      editUserRules: {
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }]
      },
      // 用户新角色的id
      setUser: {
        newRoleId: ''
      },
      roleList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    //   获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: {
          // 关键字
          query: this.keyword,
          // 当前页
          pagenum: this.nowPage,
          // 每页显示的条数
          pagesize: this.pageSize
        }
      })

      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.total = res.data.total
    },

    // 改变事件
    async changeUserStatus(userInfo) {
      // 字符串拼接
      // const { data: res } = await this.$http.put('users/' + userInfo.id + '/state/' + userInfo.mg_state + '')

      // 使用模板字符串
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

      if (res.meta.status !== 200) return this.$message.error('修改失败')
      this.$message.success('修改状态成功')
    },
    // 每页显示的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getUserList()
    },
    // 当前页数
    handleCurrentChange(nowPage) {
      this.nowPage = nowPage
      this.getUserList()
    },
    // 删除功能
    async removeUser(scope) {
      const id = scope.row.id
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUserList()
    },
    // 新增用户关闭
    addCloseBox() {
      this.$refs.addRuleForm.resetFields()
    },
    // 提交新增用户
    addUser() {
      this.$refs.addRuleForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserRuleForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.getUserList()
        this.addUserDialogVisible = false
      })
    },
    // 关闭编辑对话框重置里面数据
    editCloseBox() {
      this.$refs.editRuleForm.resetFields()
    },
    // 点击编辑按钮时，获取当前数据渲染表格上面
    async editUser(scope) {
      const id = scope.row.id
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取用户数据失败')
      this.editUserDialogVisible = true
      // 同步数据
      this.editUserRuleForm.username = res.data.username
      this.editUserRuleForm.email = res.data.email
      this.editUserRuleForm.mobile = res.data.mobile
      this.editUserRuleForm.id = id
    },
    // 点击确定时，验证表单，提交数据
    upDateUser() {
      this.editUserDialogVisible = false

      const id = this.editUserRuleForm.id
      this.$refs.editRuleForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + id, {
          email: this.editUserRuleForm.email,
          mobile: this.editUserRuleForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('编辑失败')

        this.$message.success('编辑成功')
        this.getUserList()
      })
    },
    // 点击分配角色按钮弹出框
    async roleBtn(scope) {
      const id = scope.row.id
      const { data: res } = await this.$http.get('users/' + id)
      this.setUser.id = res.data.id
      this.setUser.username = res.data.username
      this.setUser.role_name = scope.row.role_name
      this.roleDialogVisible = true
      const { data: role } = await this.$http.get('roles')

      this.roleList = role.data
      console.log(role.data)
    },
    async editRole() {
      const { data: res } = await this.$http.put(`users/${this.setUser.id}/role`, {
        rid: this.setUser.newRoleId
      })
      if (res.meta.status !== 200) return this.$message.error('编辑失败')
      this.$message.success('编辑成功')
      this.getUserList()
      this.roleDialogVisible = false
    }
  }
}
