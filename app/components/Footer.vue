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
      <p class="footer__copy">© {{ year }} 你的名字 · 交互式 3D-IP 个人简历</p>

      <div class="footer__links">
        <!-- 预留：社交 / 联系链接 -->
        <a href="mailto:you@example.com" class="footer__link">
          <Icon name="mdi:email-outline" :size="16" /> Email
        </a>
        <a href="#" class="footer__link">
          <Icon name="mdi:github" :size="16" /> GitHub
        </a>
        <a href="#" class="footer__link">
          <Icon name="mdi:linkedin" :size="16" /> LinkedIn
        </a>
      </div>
    </div>
  </footer>
</template>
