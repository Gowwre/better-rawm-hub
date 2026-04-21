<template>
  <div id="download-panel" class="download-panel">
    <table>
      <tbody>
        <tr>
          <td>
            <img src="https://hub.miracletek.net/hub/img/pc.png" width="32px" />
          </td>
          <td>
            <a target="_blank" href="https://static.miracletek.net/pc/RAWMHUB.zip" class="download-link">
              {{ $t('STRID_WEBHUB_DOWNLOAD_APP_PC') }}
            </a>
          </td>
        </tr>
        <tr>
          <td colspan="2"><hr /></td>
        </tr>
        <tr>
          <td>
            <img src="https://hub.miracletek.net/hub/img/android.png" width="32px" />
          </td>
          <td>
            <a target="_blank" href="https://static.miracletek.net/android/RAWMHUB.apk" class="download-link">
              {{ $t('STRID_WEBHUB_DOWNLOAD_APP_ANDROID') }}
            </a>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: center;">
            <img src="https://hub.miracletek.net/hub/img/android_qrcode.png?v=20240929" style="width: 200px;" />
          </td>
        </tr>
        <tr>
          <td colspan="2"><hr /></td>
        </tr>
        <tr>
          <td>
            <img src="https://hub.miracletek.net/hub/img/apple.png" width="32px" />
          </td>
          <td>
            <a target="_blank" href="https://apps.apple.com/cn/app/rawmhub/id1638249393" class="download-link">
              {{ $t('STRID_WEBHUB_DOWNLOAD_APP_IOS') }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.download-panel {
  position: fixed;
  top: 60px;
  right: 10px;
  background-color: #202020;
  border-radius: 8px;
  padding: 15px;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.download-panel table {
  border-collapse: collapse;
}

.download-panel td {
  padding: 8px;
  vertical-align: middle;
}

.download-panel hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 5px 0;
}

.download-link {
  color: #1E9FFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}

.download-link:hover {
  text-decoration: underline;
}
</style>
