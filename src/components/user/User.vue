  <template>
<div class="user-container">
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<el-card class="box-card">
    <!-- 搜索框部分 -->
    <el-row>
  <el-col :span="8">
          <div>
        <el-input placeholder="请输入内容" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
    </div>
  </el-col>

  <!-- 添加用户按钮  -->
  <el-col :span="4" style="margin-left:20px"><el-button type="primary " @click="addUserDialogVisible=true">添加用户</el-button></el-col>
</el-row>

    <!-- 用户列表部分 -->
 <el-table :data="userList"
    border
    style="width: 100%;margin-top:20px" >
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="120">
    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色"
      width="220">
    </el-table-column>
     <el-table-column
      label="状态"
      width="60">
        <template slot-scope="scope">

            <el-switch v-model="scope.row.mg_state" @change="changeUserStatus(scope.row)">
            </el-switch>
        </template>
    </el-table-column>
    <el-table-column
      label="操作" width="220">
    <template slot-scope="scope">
        <!-- 编辑按钮 -->
        <el-button type="primary"  icon="el-icon-edit" size="mini" @click="editUser(scope)"></el-button>
        <!-- 删除按钮 -->
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUser(scope)"></el-button>
        <!-- 分配角色按钮 -->
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
        <el-button type="warning" size="mini" icon="el-icon-setting" @click="roleBtn(scope)"></el-button>
        </el-tooltip>

    </template>
    </el-table-column>
  </el-table>
  <div class="block">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nowPage"
      :page-sizes="[2, 4, 6, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  <!-- 添加用户的对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="addUserDialogVisible"
  width="50%" @close="addCloseBox"
  >
  <el-form :model="addUserRuleForm" :rules="addUserRules" ref="addRuleForm" label-width="100px" class="demo-ruleForm">

    <!-- 用户名称 -->
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addUserRuleForm.username"></el-input>
  </el-form-item>

  <!-- 密码 -->
  <el-form-item label="密码" prop="password">
    <el-input v-model="addUserRuleForm.password" type="password"></el-input>
  </el-form-item>

  <!-- 邮箱 -->
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addUserRuleForm.email"></el-input>
  </el-form-item>

    <!-- 手机 -->
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="addUserRuleForm.mobile"></el-input>
  </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="addUserDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

  <!-- 编辑用户的对话框 -->
<el-dialog
  title="编辑用户"
  :visible.sync="editUserDialogVisible"
  width="50%" @close="editCloseBox"
  >
  <el-form :model="editUserRuleForm" :rules="editUserRules" ref="editRuleForm" label-width="100px" class="demo-ruleForm">

    <!-- 用户名称 -->
  <el-form-item label="用户名" prop="username">
    <el-input v-model="editUserRuleForm.username" disabled="disabled"></el-input>
  </el-form-item>

  <!-- 邮箱 -->
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editUserRuleForm.email"></el-input>
  </el-form-item>

    <!-- 手机 -->
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editUserRuleForm.mobile"></el-input>
  </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="editUserDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="upDateUser">确 定</el-button>
  </span>
</el-dialog>

<!-- 分配角色的对话框 -->
<el-dialog
  title="分配角色"
  :visible.sync="roleDialogVisible"
  width="50%"
 >
<el-row>
  <el-col :span="3">
  当前的用户：
  </el-col>
  <el-col :span="5">
{{setUser.username}}
  </el-col>
</el-row>

<el-row>
  <el-col :span="3">
  当前的角色：
  </el-col>
  <el-col :span="5">
{{setUser.role_name}}
  </el-col>
</el-row>

<el-row>
  <el-col :span="3">
  分配新角色：
  </el-col>
  <el-col :span="5">
 <el-select v-model="setUser.newRoleId" clearable placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="roleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole">确 定</el-button>
  </span>
</el-dialog>
</el-card>
</div>

</template>

<script>
import mix from './User-mixins'
export default {
  mixins: [mix]
}
</script>

<style>

.user-container {
  min-width: 1024px;
}
.el-row {
  margin-bottom: 30px;
}
</style>
