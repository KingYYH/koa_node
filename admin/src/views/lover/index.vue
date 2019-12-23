<template>
  <div class="lover">
    <i-button type="primary" @click="showModel = true">添加恋人信息</i-button>
      <Modal
        :value="showModel"
        title="添加恋人信息"
        :loading="loading"
        :closable="false"
        :mask-closable="false">
        <i-form :model="formItem" :label-width="80" ref="formValidate" :rules="ruleValidate">
          <Form-item label="姓名" prop="name">
            <i-input v-model="formItem.name" placeholder="请输入"></i-input>
          </Form-item>
          <Form-item label="年龄" prop="age">
            <i-input v-model="formItem.age" placeholder="请输入"></i-input>
          </Form-item>
          <Form-item label="星座" prop="constellation">
            <i-input v-model="formItem.constellation" placeholder="请输入"></i-input>
          </Form-item>
          <Form-item label="座右铭" prop="motto">
            <i-input v-model="formItem.motto" placeholder="请输入"></i-input>
          </Form-item>
          <Form-item label="单选框" >
            <Radio-group v-model="formItem.sex" prop="sex">
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="爱好" prop="hobbies">
            <Checkbox-group v-model="formItem.hobbies" @on-change="SelectQuestionType">
              <Checkbox v-for="item in selectTypes" :label="item.id" :key="item.id">
                {{item.name}}
              </Checkbox>
            </Checkbox-group>
          </Form-item>
          <Form-item label="介绍" prop="intro">
            <i-input v-model="formItem.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
          </Form-item>
          <FormItem>
            <Button @click="handleReset('formValidate')">取消</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
          </FormItem>
      </i-form>
    </Modal>
  </div>
</template>

<script>
import { Modal } from 'iview';
  import {mapActions} from 'vuex';
  export default {
    components: {
      Modal
    },
    data() {
      return {
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '年龄不能为空', trigger: 'blur'}
          ],
          constellation: [
            {required: true, message: '星座不能为空', trigger: 'blur'}
          ],
          motto: [
            {required: true, message: '座右铭不能为空', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '性别不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '介绍不能为空', trigger: 'blur'}
          ]
        },
        formItem: {
        },
        showModel: false,
        loading: false,
        selectTypes: [
          {
            id: 1,
            name: '吃饭'
          },
          {
            id: 2,
            name: '睡觉'
          },
          {
            id: 3,
            name: '跑步'
          },
          {
            id: 4,
            name: '看电影'
          }
        ]
      }
    },
    computed: {
    },
    methods: {
      ...mapActions({
        createLover: 'lover/createLover'
      }),
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          console.log(valid)
          if (valid) {
            this._createLover(name);
          } else {
            console.log(this.formItem)
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.showModel = false
      },
      SelectQuestionType(data) {
        this.formItem.hobbies = data
      },
      async _createLover(name) {
        let res = await this.createLover(this.formItem);
        this.showModel = false
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  .ivu-modal-footer {
    display: none !important;
  }
</style>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
