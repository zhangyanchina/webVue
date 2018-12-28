export default {
  data() {
    return {
      // 用户名和密码对象形式
      userForm: {
        username: '',
        password: ''
      },
      // 用户名和密码的校验规则
      userRules: {
        username: [{ required: true, message: '请填写完整用户名', trigger: 'blur' }, { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请填写完整密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      },
      isPwd: true
    }
  },

  methods: {
    login() {
      this.$refs.userRuleForm.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整')

        const { data: res } = await this.$http.post('login', this.userForm)

        if (res.meta.status !== 200) return this.$message.error('用户名或密码错误')
        this.$message.success('登陆成功')
        sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetForm() {
      this.$refs.userRuleForm.resetFields()
    }
  }
}
