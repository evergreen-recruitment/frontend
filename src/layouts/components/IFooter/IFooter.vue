<script lang="ts" setup>
import { getAssetsFile } from '@/utils/utils'
</script>

<template>
  <div class="footer">
    <div class="footer-logo">
      <div class="title">
        <a href="/">
          <img :src="getAssetsFile('images/logo1-white.png')" alt="" />
        </a>
      </div>
    </div>
    <div class="footer-down">
      <div class="inner">
        <div class="left">
          <div>友情链接：<a href="/">Vue.js官网</a></div>
          <div><a href="/">常青大学生智慧招聘平台</a></div>
          <div>Created by pepedd 2024</div>
        </div>
        <div class="right">
          <a href="/" target="_blank">网站地图</a>
          <div>版权所有@2024 <a href="/" rel="nofollow" target="_blank">pepedd</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.footer {
  @apply relative w-full mt-5 z-[99];

  @include useTheme {
    background: rgba((adjust-hue(hsl(0, 40%, 5%), hue(getColor('primary')))), 1);
  }

  a {
    @apply no-underline;
  }

  .footer-logo {
    padding: 38px 0;
    border-bottom: 1px solid #fff;

    @media screen and (max-width: 768px) {
      padding: 20px 0;
    }

    .title {
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      max-width: 1200px;
      //text-shadow: 0 0 10px #fff;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0 5px 0 10px;
        @media screen and (max-width: 1280px) {
          margin: 0 5px;
        }

        img {
          height: 70px;
          width: 100%;
          object-fit: cover;
          object-position: left center;
        }
      }
    }
  }

  .footer-down {
    @include useTheme {
      background: rgba((adjust-hue(hsl(0, 40%, 10%), hue(getColor('primary')))), 1);
    }
    padding: 26px 0;
    font-size: 14px;
    line-height: 24px;

    @media screen and (max-width: 768px) {
      padding: 12px 0;
      font-size: 12px;
    }

    .inner {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      max-width: 1200px;
      clear: both;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }

      div,
      span,
      a {
        color: #fff;
      }

      .left {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 768px) {
          margin-bottom: 10px;
          align-items: center;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 768px) {
          align-items: center;
        }
      }
    }
  }
}
</style>
