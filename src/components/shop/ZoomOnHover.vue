<template>
  <div class="zoom-on-hover" @mousemove="move" @mouseenter="zoom" @mouseleave="unzoom">
    <img class="normal" ref="normal" :src="imgNormal"/>
    <img class="zoom" ref="zoom" :src="imgZoom || imgNormal" height="950px" width="auto"/>
  </div>
</template>

<script>
/* this component displays an image with the width of the parent element and on hover
      shows the full image or a scaled image in the image area.
      features: activate/deactivate method, active/inactive on load, scale parameter, separate zoom image */
export default {
  props:
      ['imgNormal', 'imgZoom', 'scale', 'disabled'],
  data () {
    return {
      scaleFactor: 1
    }
  },
  methods: {
    zoom () {
      if (this.disabled || !this.$refs.zoom || !this.$refs.normal) return
      this.$refs.zoom.style.opacity = 1
      this.$refs.normal.style.opacity = 0
    },
    unzoom () {
      if (this.disabled || !this.$refs.zoom || !this.$refs.normal) return
      this.$refs.zoom.style.opacity = 0
      this.$refs.normal.style.opacity = 1
    },
    move (event) {
      if (this.disabled || !this.$refs.zoom || !this.$refs.normal) return
      let offset = this.pageOffset(this.$el)
      let zoom = this.$refs.zoom
      let normal = this.$refs.normal
      let relativeX = event.clientX - offset.x + window.scrollX
      let relativeY = event.clientY - offset.y + window.scrollY
      let normalPercentX = relativeX / normal.offsetWidth
      let normalPercentY = relativeY / normal.offsetHeight
      let x = normalPercentX * (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth)
      let y = normalPercentY * (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight)
      zoom.style.left = -x + 'px'
      zoom.style.top = -y + 'px'
    },
    pageOffset (el) {
      // -> {x: number, y: number}
      // get the left and top offset of a dom block element
      let rect = el.getBoundingClientRect()
      let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return {y: rect.top + scrollTop, x: rect.left + scrollLeft}
    }
  },
  mounted () {
    if (this.$props.scale) {
      this.scaleFactor = parseInt(this.$props.scale)
      this.$refs.zoom.style.transform = 'scale(' + this.scaleFactor + ')'
    }
  }
}
</script>

<style>

  .zoom-on-hover {
    position: relative;
    overflow: hidden;
  }

  .zoom-on-hover .normal {
    width: 100%;
    height: 527px;
    object-fit: cover;
  }

  .zoom-on-hover .zoom {
    cursor: crosshair;
    position: absolute;
    opacity: 0;
    transform-origin: top left;
  }
</style>
