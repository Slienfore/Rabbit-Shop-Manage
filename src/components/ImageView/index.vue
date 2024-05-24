<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core";
import { ref, watch } from "vue";

// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg",
];

// 小图切换大图显示
const activeIndex = ref(0);

const handleMouseEnter = (i) => {
  activeIndex.value = i;
};

const box = ref();

// 获取鼠标在盒子中的位置
const { elementX, elementY, isOutside } = useMouseInElement(box);
// 蒙版的移动范围计算 -> 鼠标总是处于蒙版的"中心", 蒙版距离盒子的距离就是 -> (鼠标位置 - 盒子"宽/高"一半)
// -> X: left = elementX - 蒙版宽度一半  => 鼠标移动范围: (layerWidth / 2) < elementX < (boxWidth - (layerWidth / 2))
// -> Y: top = elementY - 蒙版高度一半   => 鼠标移动范围: (layerHeight / 2) < elementY < (boxHeight - (layerHeight / 2))
// 如果鼠标超过该界限, 则将数值固定!

// 假设: box{ width: 400, height: 400 } layer{ width: 200, height: 200 }

const left = ref(0),
  top = ref(0);

const positionX = ref(0),
  positionY = ref(0);

watch([elementX, elementY], () => {
  // 鼠标没有移入
  if (isOutside.value) return;

  // 蒙版边界内移动
  if (elementX.value > 100 && elementX.value < 300)
    left.value = elementX.value - 100;

  if (elementY.value > 100 && elementY.value < 300)
    top.value = elementY.value - 100;

  // 蒙版超出边界
  if (elementX.value > 300) left.value = 200;
  if (elementX.value < 100) left.value = 0;
  if (elementY.value < 100) top.value = 0;
  if (elementY.value > 300) top.value = 200;

  // 控制大图: 反方向 + 2倍移动距离
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div ref="box" class="middle">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div
        v-show="!isOutside"
        class="layer"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        @mouseenter="handleMouseEnter(i)"
        v-for="(img, i) in imageList"
        :key="i"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div
      v-show="!isOutside"
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
