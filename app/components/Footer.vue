<script setup lang="ts">
// ============================================================
// Footer —— 页脚
// 预留：替换姓名、邮箱、社交链接即可。
// ============================================================
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container-page footer__inner">
      <p class="footer__copy">© {{ year }} 麦锐玲 · 交互式 3D-IP 个人简历</p>

      <div class="footer__links">
        <a href="mailto:1037111360@qq.com" class="footer__link">
          <Icon name="mdi:email-outline" :size="16" /> Email
        </a>
        <a href="tel:13714294135" class="footer__link">
          <Icon name="mdi:phone-outline" :size="16" /> 电话
        </a>
      </div>
    </div>
  </footer>
</template>
