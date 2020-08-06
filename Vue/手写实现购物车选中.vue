<!--
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-28 16:06:35
 * @LastEditTime: 2020-07-28 16:06:51
 * @Description: file content
 * @FilePath: /github/StudyNotes/Vue/手写实现购物车选中.vue
--> 
<template>
  <div>
    <input type="checkbox" :value="allchecked" @click="check"/>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <input type="checkbox" :value="item.checked"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allChecked: false,
      list: [
        {
          name: '苹果',
          checked: false,
        },
        {
          name: '香蕉',
          checked: false,
        },
        {
          name: '梨',
          checked: false,
        }
      ]
    }
  },
  watch: {
    list: {
      handle(val) {
        let tem = false;
        for (let i; i < this.list.length; i++) {
          if (!this.list[i].checked) {
            tem = true;
            break;
          }
        }
        if (tem) {
          this.checkAll = false;
        }
      },
      deep: true,
    }
  },
  methods: {
    check() {
      if (!this.allChecked) {
        this.list.forEach(item => {
          item.checkout = true;
        })
      } else {
        this.list.forEach(item => {
          item.checkout = true;
        })
      }
    }
  }
}
</script>

<style>

</style>
