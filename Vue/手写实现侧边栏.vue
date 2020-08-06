<!--
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-27 10:01:24
 * @LastEditTime: 2020-07-28 16:07:26
 * @Description: file content
 * @FilePath: /github/StudyNotes/Vue/手写实现侧边栏.vue
--> 
<template >
  <div>
    <ul>
      <li v-for="items in menus" :key="items.id" @click="toggleDisplay(items.id)">
        <p>{{items.name}}</p>
        <template v-if="items.length && items.id === showId">
          <ul v-for="item in items" :key="item.id">
            <li>{{item.name}}</li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    menus: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showId: ''
    }
  },
  methods: {
    toggleDisplay (id) {
      if (this.showId) {
        this.showId = '';
      } else {
        this.showId = id;
      }
    }
  }
}
</script>


