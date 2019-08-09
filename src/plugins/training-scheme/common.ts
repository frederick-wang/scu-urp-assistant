function showLoadingAnimation(containerSelector: string) {
  const template = `
      <div class="loading-container">
        <div class="lds-dual-ring"></div>
        <div class="lds-title">( º﹃º ) 兆基祈祷中……</div>
      </div>
    `
  $('.info-container').remove()
  $('.scheme-container').remove()
  $(containerSelector).append(template)
}

function hideLoadingAnimation() {
  $('.loading-container').remove()
}

export {
  showLoadingAnimation,
  hideLoadingAnimation
}
