<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
  import { onMounted, computed, ref, watch } from 'vue';
  //引入vue中常用功能
  //onMounted 生命周期
  //computed variable computer 监控变量然后计算某些变量
  //ref 设置reference variable引用变量
  //watch variable change then action监控变量发生变化则做出相应动作
  import { useStore } from 'vuex';
  //引入vuex use store

  import i18n from '@/locales';
  //引入local langauge table
  import { useRouter } from 'vue-router';
  //引入vue-router中use router
  const locale = i18n.global.locale;
  //get local lanague setting, from cookies or web api navigator
  //get vuex store
  const store = useStore();
  //accroding code running enviroment and local lanague setting to config lanague
  //here use vue compute method to set
  //?? why local.value and local different
  const localLanguage = computed(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) return i18n.global.messages.value[locale.value];
    else return i18n.global.messages[locale];
  });
  //define el-scrollbar ref var scroll
  const scroll = ref(null);
  //define router for user router
  const router = useRouter();
  //on mounted call back function
  onMounted(() => {
    //acrroding broswer body size to change display size
    changeBodyWidth();
    //set monitor broswer resize event
    window.addEventListener('resize', changeResize);
  });
  //if router change, it will adjust scroll bar to top
  watch(
    () => router.currentRoute.value,
    () => {
      scroll.value.setScrollTop(0);
    }
  );
  //if width < 992, it will show mobile mode
  const changeBodyWidth = () => {
    const flag = document.body.getBoundingClientRect().width - 1 < 992;
    store.dispatch('setting/changeMobile', flag);
  };
  //define resize event call back function
  const changeResize = () => {
    changeBodyWidth();
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: $base-font-size-default;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
