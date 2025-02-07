<script lang="ts" setup></script>

<template>
  <div class="w-full h-full flex">
    <!-- 左侧菜单 -->
    <div class="duration-300">
      <app-menu />
    </div>

    <!-- 右侧内容区域 -->
    <section class="duration-300 flex-1">
      <header class="sticky z-10 top-0 bg-white">
        <app-header />
        <app-tabs />
      </header>

      <main class="p-[10px] overflow-hidden">
        <blank-layout />
      </main>
    </section>
  </div>
</template>
