<template>
  <div class="crm">
    <div class="main-tpl">
      <div class="menu-tpl" />
      <div class="content-tpl">
        <Menu />
        <router-view class="view" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CrmApp.ts" />

<style lang="scss"></style>
