<template>
  <div id="not-support-panel" class="not-support-panel">
    <h1 class="slogan">{{ $t('STRID_WEBHUB_RAWM_SLOGAN') }}</h1>
    <p class="desc">{{ $t('STRID_WEBHUB_RAWM_HUB_DESC') }}</p>
    <p class="detail">{{ $t('STRID_WEBHUB_RAWM_HUB_DETAIL') }}</p>
    <p class="warning">{{ $t('STRID_WEBHUB_NOT_SUPPORTED') }}</p>
  </div>
</template>

<style scoped>
.not-support-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 20px;
}

.slogan {
  font-size: 60px;
  margin-bottom: 15px;
}

.desc {
  font-size: 30px;
  margin-bottom: 15px;
  color: #888;
}

.detail {
  font-size: 20px;
  margin-bottom: 80px;
  color: #666;
}

.warning {
  font-size: 18px;
  color: #FA584D;
  max-width: 600px;
}
</style>
