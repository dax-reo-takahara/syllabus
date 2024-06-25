<template lang="pug">
.gap-fill
  input#title-input(type="text")

  #card-list.bl-cardList
    .bl-frontCard
      .bl-frontCard-header
        .bl-frontCard-header-label
          .bl-frontCard-header-label-text
          .bl-tooltip
        button.bl-frontCard-header-btn
      .bl-frontCard-body
        .bl-frontCard-body-inner

    .bl-frontCard
      .bl-frontCard-header
        .bl-frontCard-header-label
          .bl-frontCard-header-label-text
          .bl-tooltip
        button.bl-frontCard-header-btn
      .bl-frontCard-body
        .bl-frontCard-body-inner

    .bl-frontCard
      .bl-frontCard-header
        .bl-frontCard-header-label
          .bl-frontCard-header-label-text
          .bl-tooltip
        button.bl-frontCard-header-btn
      .bl-frontCard-body
        .bl-frontCard-body-inner

    .bl-frontCard
      .bl-frontCard-header
        .bl-frontCard-header-label
          .bl-frontCard-header-label-text
          .bl-tooltip
        button.bl-frontCard-header-btn
      .bl-frontCard-body
        .bl-frontCard-body-inner

</template>
<script>
import { defineComponent, onMounted } from "@vue/composition-api";

export default defineComponent({
  name: "GapFill",

  props: {
    cardList: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const value1 = 0;
    const value2 = 1;
    const value3 = "1";
    const value4 = "2";

    onMounted(() => {
      // ここに回答を記載
    });
  },
});
</script>

<style lang="scss" scoped>
// styleを記入
</style>
