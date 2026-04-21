<template>
  <svg viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="mouse-placeholder">
    <!-- Mouse body -->
    <ellipse cx="100" cy="180" rx="70" ry="110" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" stroke-width="2"/>
    
    <!-- Left button -->
    <path d="M35 140 Q35 80 65 60 L85 75 Q70 100 70 140 Z" fill="url(#btnGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
    
    <!-- Right button -->
    <path d="M165 140 Q165 80 135 60 L115 75 Q130 100 130 140 Z" fill="url(#btnGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
    
    <!-- Scroll wheel -->
    <rect x="92" y="55" width="16" height="30" rx="4" fill="url(#wheelGrad)" stroke="#333" stroke-width="1"/>
    <line x1="96" y1="58" x2="96" y2="82" stroke="#222" stroke-width="1"/>
    <line x1="100" y1="58" x2="100" y2="82" stroke="#222" stroke-width="1"/>
    <line x1="104" y1="58" x2="104" y2="82" stroke="#222" stroke-width="1"/>
    
    <!-- DPI button (behind wheel) -->
    <ellipse cx="100" cy="48" rx="8" ry="5" fill="#1a1a2e" stroke="#333" stroke-width="1"/>
    
    <!-- Side buttons left -->
    <rect x="28" y="150" width="8" height="20" rx="3" fill="url(#btnGrad)" stroke="#333" stroke-width="1"/>
    <rect x="28" y="175" width="8" height="20" rx="3" fill="url(#btnGrad)" stroke="#333" stroke-width="1"/>
    
    <!-- Bottom button -->
    <ellipse cx="100" cy="275" rx="12" ry="6" fill="url(#btnGrad)" stroke="#333" stroke-width="1"/>
    
    <!-- Gloss highlight -->
    <ellipse cx="100" cy="130" rx="40" ry="60" fill="url(#glossGrad)" opacity="0.3"/>
    
    <!-- Gradients -->
    <defs>
      <linearGradient id="bodyGrad" x1="100" y1="60" x2="100" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#2a2a3e"/>
        <stop offset="50%" stop-color="#1a1a2e"/>
        <stop offset="100%" stop-color="#0f0f1a"/>
      </linearGradient>
      <linearGradient id="btnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a3a5e"/>
        <stop offset="100%" stop-color="#22223e"/>
      </linearGradient>
      <linearGradient id="wheelGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#444"/>
        <stop offset="100%" stop-color="#222"/>
      </linearGradient>
      <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#16B777"/>
        <stop offset="100%" stop-color="#1E9FFF"/>
      </linearGradient>
      <radialGradient id="glossGrad" cx="100" cy="130" r="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped>
.mouse-placeholder {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 320px;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
}
</style>
