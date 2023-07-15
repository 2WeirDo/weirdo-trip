// export default function useScroll(reachBottomCB) {
//   //监听window窗口的滚动
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight;
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     if (clientHeight + scrollTop >= scrollHeight - 1) {
//         if(reachBottomCB)reachBottomCB();
//     }
//   };

//   // 挂载时
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler);
//   });

//   // 移除事件监听 (卸载时)
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler);
//   });
// }

import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";
export default function useScroll(elRef) {
  let el = window;
  const isReachBottom = ref(false); // 是否达到底部

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      isReachBottom.value = true; // 用变量记录达到底部
    }
  }, 100);

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
