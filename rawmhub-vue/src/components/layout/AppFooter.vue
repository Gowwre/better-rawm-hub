<template>
  <footer class="app-footer">
    <p>
      <a href="https://www.rawmtech.com/" target="_blank">©2019 深圳市仁魔电子科技有限公司</a>
      版权所有
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备19106751号</a>
    </p>
  </footer>
</template>

<style scoped>
.app-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  z-index: 999;
  background-color: hsl(var(--background) / 0.9);
  backdrop-filter: blur(4px);
  border-top: 1px solid hsl(var(--border));
  font-size: 13px;
  color: hsl(var(--muted-foreground));
}

.app-footer a {
  color: hsl(var(--primary));
  text-decoration: none;
  margin: 0 5px;
  transition: opacity 0.15s;
}

.app-footer a:hover {
  opacity: 0.8;
  text-decoration: underline;
}
</style>
